---
sidebar_position: 10
title: "SearXNG"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration pour personnaliser Open WebUI selon vos besoins spécifiques. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

Ce guide fournit des instructions pour configurer des capacités de recherche web dans Open WebUI en utilisant SearXNG dans Docker.

## SearXNG (Docker)

> "**SearXNG est un métamoteur de recherche gratuit qui agrège les résultats de divers services et bases de données de recherche. Les utilisateurs ne sont ni suivis ni profilés.**"

## 1. Configuration de SearXNG

Pour configurer SearXNG de manière optimale avec Open WebUI, suivez ces étapes :

**Étape 1 : `git clone` SearXNG Docker et naviguez dans le dossier :**

1. Créez un nouveau répertoire `searxng-docker`

Clonez le dépôt searxng-docker. Ce dossier contiendra vos fichiers de configuration de SearXNG. Consultez la [documentation SearXNG](https://docs.searxng.org/) pour des instructions de configuration.

```bash
git clone https://github.com/searxng/searxng-docker.git
```

Accédez au dépôt `searxng-docker` :

```bash
cd searxng-docker
```

**Étape 2 : Localisez et modifiez le fichier `.env` :**

1. Décommentez `SEARXNG_HOSTNAME` du fichier `.env` et définissez-le en conséquence :

```bash
# Par défaut écoute sur https://localhost
# Pour changer ceci :
# * décommentez SEARXNG_HOSTNAME et remplacez <host> par le nom d'hôte de SearXNG
# * décommentez LETSENCRYPT_EMAIL et remplacez <email> par votre email (nécessaire pour créer un certificat Lets Encrypt)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# Optionnel :
# Si vous exécutez une petite ou une grande instance, vous pouvez ajuster le nombre de workers uwsgi et de threads par worker
# Plus de workers (= processus) permettent de gérer plus de requêtes de recherche en même temps, mais cela consomme également plus de ressources

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**Étape 3 : Modifiez le fichier `docker-compose.yaml`**

3. Supprimez la restriction `localhost` en modifiant le fichier `docker-compose.yaml` :

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**Étape 4 : Accordez les permissions nécessaires**

4. Autorisez le conteneur à créer de nouveaux fichiers de configuration en exécutant la commande suivante dans le répertoire racine :

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**Étape 5 : Créez un fichier `limiter.toml` non restrictif**

5. Créez un fichier de configuration non restrictif `searxng-docker/searxng/limiter.toml` :

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# Ce fichier de configuration met à jour le fichier de configuration par défaut
# Voir https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# active la méthode link_token dans la méthode ip_limit
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**Étape 6 : Supprimez le fichier par défaut `settings.yml`**

6. Supprimez le fichier par défaut `searxng-docker/searxng/settings.yml` s'il existe, car il sera régénéré lors du premier démarrage de SearXNG :

```bash
rm searxng-docker/searxng/settings.yml
```

**Étape 7 : Créez un nouveau fichier `settings.yml`**

:::note
Lors de la première exécution, vous devez supprimer `cap_drop: - ALL` du fichier `docker-compose.yaml` pour que le service `searxng` puisse créer avec succès `/etc/searxng/uwsgi`.ini. Cela est nécessaire car la directive `cap_drop: - ALL` supprime toutes les capacités, y compris celles requises pour la création du fichier `uwsgi.ini`. Après la première exécution, vous devez réajouter `cap_drop: - ALL` dans le fichier `docker-compose.yaml` pour des raisons de sécurité.
:::

7. Lancez brièvement le conteneur pour générer un nouveau fichier settings.yml :

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**Étape 8 : Ajoutez des formats et mettez à jour le numéro de port**

8. Ajoutez les formats HTML et JSON au fichier `searxng-docker/searxng/settings.yml` :

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

Générez une clé secrète pour votre instance SearXNG :

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Les utilisateurs de Windows peuvent utiliser le script PowerShell suivant pour générer la clé secrète :

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

Mettez à jour le numéro de port dans la section `server` pour correspondre à celui que vous avez défini précédemment (dans ce cas, `8080`) :

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

Modifiez l'`bind_address` comme désiré :

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### Fichiers de configuration

#### searxng-docker/searxng/settings.yml (Extrait)

Le fichier `settings.yml` par défaut contient de nombreux paramètres de moteur. Voici un extrait de ce à quoi le fichier `settings.yml` par défaut pourrait ressembler :

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# voir https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url est défini dans la variable d'environnement SEARXNG_BASE_URL, voir .env et docker-compose.yml
  secret_key: "ultrasecretkey"  # modifiez ceci !
  limiter: true  # peut être désactivé pour une instance privée
  image_proxy: true
  port: 8080
  bind_address: "0.0.0.0"

ui:
  static_use_hash: true

search:
  safe_search: 0
  autocomplete: ""
  default_lang: ""
  formats:
    - html
    - json # json est requis
  # supprimez les formats pour refuser l'accès, utilisez des lettres minuscules.
  # formats: [html, csv, json, rss]
redis:
  # URL pour se connecter à la base de données redis. Remplacé par ${SEARXNG_REDIS_URL}.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

Le port dans le fichier settings.yml pour SearXNG doit correspondre à celui du fichier docker-compose.yml pour SearXNG.

</details>

**Étape 9 : Mettez à jour le fichier `uwsgi.ini`**

9. Assurez-vous que votre fichier `searxng-docker/searxng/uwsgi.ini` correspond au suivant :

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# Qui exécutera le code
uid = searxng
gid = searxng

# Nombre de travailleurs (généralement le nombre de CPU)
# valeur par défaut : %k (= nombre de cœurs CPU, voir Dockerfile)
workers = %k

# Nombre de threads par travailleur
# valeur par défaut : 4 (voir Dockerfile)
threads = 4

# Les droits accordés sur le socket créé
chmod-socket = 666

# Plugin à utiliser et configuration de l'interpréteur
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# Module à importer
module = searx.webapp

# Chemin du virtualenv et python
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# définit automatiquement les noms de processus à quelque chose de significatif
auto-procname = true

# Désactive la journalisation des requêtes pour la confidentialité
disable-logging = true
log-5xx = true

# Définit la taille maximale d'une requête (hors corps de la requête)
buffer-size = 8192

# Pas de keep-alive
# Voir https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi sert les fichiers statiques
static-map = /static=/usr/local/searxng/searx/static
# expiration définie à un jour
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. Configuration Alternative

Sinon, si vous ne souhaitez pas modifier la configuration par défaut, vous pouvez simplement créer un dossier vide `searxng-docker` et suivre les autres instructions de configuration.

### Configuration de Docker Compose

Ajoutez les variables d’environnement suivantes à votre fichier `docker-compose.yaml` Open WebUI :

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "searxng"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
      SEARXNG_QUERY_URL: "http://searxng:8080/search?q=<query>"
```

Créez un fichier `.env` pour SearXNG :

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

Ensuite, ajoutez ce qui suit au fichier `docker-compose.yaml` de SearXNG :

```yaml
services:
  searxng:
    container_name: searxng
    image: searxng/searxng:latest
    ports:
      - "8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    env_file:
      - .env
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

Votre pile est prête à être lancée avec :

```bash
docker compose up -d
```

:::note
Lors de la première exécution, vous devez supprimer `cap_drop: - ALL` du fichier `docker-compose.yaml` pour le service `searxng` afin de permettre la création réussie de `/etc/searxng/uwsgi.ini`. Cela est nécessaire car la directive `cap_drop: - ALL` supprime toutes les capacités, y compris celles requises pour la création du fichier `uwsgi.ini`. Après la première exécution, vous devez réactiver `cap_drop: - ALL` dans le fichier `docker-compose.yaml` pour des raisons de sécurité.
:::

Alternativement, vous pouvez exécuter SearXNG directement en utilisant `docker run` :

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. Confirmer la Connectivité

Confirmez la connectivité à SearXNG depuis votre instance de conteneur Open WebUI dans votre interface de ligne de commande :

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. Configuration de l'Interface Graphique

1. Naviguez vers : `Panneau d'administration` -> `Paramètres` -> `Recherche Web`
2. Activez `Activer la Recherche Web`
3. Définissez `Moteur de Recherche Web` dans le menu déroulant sur `searxng`
4. Définissez `URL de requête Searxng` sur l'un des exemples suivants :

* `http://searxng:8080/search?q=<query>` (en utilisant le nom du conteneur et le port exposé, adapté aux configurations basées sur Docker)
* `http://host.docker.internal:8080/search?q=<query>` (en utilisant le nom DNS `host.docker.internal` et le port de l'hôte, adapté aux configurations basées sur Docker)
* `http://<searxng.local>/search?q=<query>` (en utilisant un nom de domaine local, adapté à l'accès au réseau local)
* `https://<search.domain.com>/search?q=<query>` (en utilisant un nom de domaine personnalisé pour une instance SearXNG auto-hébergée, adapté à un accès public ou privé)

**Notez bien que la partie `/search?q=<query>` est obligatoire.**

5. Ajustez les valeurs de `Nombre de résultats de recherche` et `Requêtes simultanées` en conséquence
6. Enregistrez les modifications

![Configuration de l'interface graphique SearXNG](/images/tutorial_searxng_config.png)

## 5. Utiliser la recherche Web dans un chat

Pour accéder à la recherche Web, cliquez sur le + à côté du champ de saisie du message.

Ici, vous pouvez activer/désactiver la recherche Web.

![Basculer l'interface utilisateur de la recherche Web](/images/web_search_toggle.png)

En suivant ces étapes, vous aurez configuré avec succès SearXNG avec Open WebUI, vous permettant d'effectuer des recherches Web en utilisant le moteur SearXNG.

#### Remarque

Vous devrez activer/désactiver explicitement cette fonction dans un chat.

Cette fonction est activée par session, par exemple, recharger la page ou changer de chat la désactivera.
