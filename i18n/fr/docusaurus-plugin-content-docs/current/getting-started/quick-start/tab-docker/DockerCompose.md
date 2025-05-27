# Configuration de Docker Compose

Utiliser Docker Compose simplifie la gestion des applications Docker multi-conteneurs.

Si vous navez pas Docker installé, consultez notre [tutoriel dinstallation de Docker](../../../tutorials/docker-install.md).

Docker Compose nécessite un package supplémentaire, `docker-compose-v2`.

**Attention :** Les anciens tutoriels Docker Compose peuvent faire référence à la syntaxe de la version 1, qui utilise des commandes comme `docker-compose build`. Assurez-vous de bien utiliser la syntaxe de la version 2, qui utilise des commandes comme `docker compose build` (notez lespace au lieu dun trait dunion).

## Exemple de fichier `docker-compose.yml`

Voici un exemple de fichier de configuration pour configurer Open WebUI avec Docker Compose :

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## Démarrage des services

Pour démarrer vos services, exécutez la commande suivante :

```bash
docker compose up -d
```

## Script daide

Un script daide pratique appelé `run-compose.sh` est inclus avec le code source. Ce script aide à choisir les fichiers Docker Compose à inclure dans votre déploiement, simplifiant ainsi le processus de configuration.

---

**Remarque :** Pour le support des GPU Nvidia, remplacez limage `ghcr.io/open-webui/open-webui:main` par `ghcr.io/open-webui/open-webui:cuda` et ajoutez ce qui suit à la définition de votre service dans le fichier `docker-compose.yml` :

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

Cette configuration garantit que votre application peut utiliser les ressources GPU lorsque disponibles.
