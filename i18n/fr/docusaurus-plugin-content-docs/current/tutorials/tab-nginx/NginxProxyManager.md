### Nginx Proxy Manager

Nginx Proxy Manager (NPM) vous permet de gérer facilement les proxys inversés et de sécuriser vos applications locales, comme Open WebUI, avec des certificats SSL valides de Lets Encrypt.
Cette configuration permet un accès HTTPS, nécessaire pour utiliser les fonctionnalités d'entrée vocale sur de nombreux navigateurs mobiles en raison de leurs exigences de sécurité, sans exposer directement le port spécifique de l'application à Internet.

#### Conditions préalables

- Un serveur domestique exécutant Docker et un conteneur open-webui en cours d'exécution.
- Un nom de domaine (options gratuites comme DuckDNS ou payantes comme Namecheap/GoDaddy).
- Connaissances de base en configuration Docker et DNS.

#### Étapes

1. **Créer des répertoires pour les fichiers Nginx:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Configurer Nginx Proxy Manager avec Docker:**

    ```bash
    nano docker-compose.yml
    ```

```yaml
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 81:81
      - 443:443
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Exécutez le conteneur :
```bash
docker-compose up -d
```
3. **Configurer DNS et domaine:**

    * Connectez-vous à votre fournisseur de domaine (par exemple, DuckDNS) et créez un domaine.
    * Pointez le domaine vers l'IP locale de votre proxy (par exemple, 192.168.0.6).
    * Si vous utilisez DuckDNS, obtenez un jeton API depuis leur tableau de bord.

###### Voici un exemple simple de configuration sur https://www.duckdns.org/domains :
    
4. **Configurer les certificats SSL:**
* Accédez à Nginx Proxy Manager à l'adresse http://server_ip:81. Par exemple : ``192.168.0.6:81``
* Connectez-vous avec les identifiants par défaut (admin@example.com / changeme). Changez-les comme demandé.
* Allez à Certificats SSL → Ajouter un certificat SSL → Lets Encrypt.
* Entrez votre email et le nom de domaine obtenu via DuckDNS. Un nom de domaine contient un astérisque et un autre ne le contient pas. Exemple : ``*.hello.duckdns.org`` et ``hello.duckdns.org``.
* Sélectionnez l'option Utiliser un défi DNS, choisissez DuckDNS et collez votre jeton API. Exemple : 
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Acceptez les conditions de Let’s Encrypt et sauvegardez. Modifiez le temps de propagation **si nécessaire** (120 secondes).

5. **Créer des proxys hôtes:**
* Pour chaque service (par exemple, openwebui, nextcloud), allez à Hôtes → Proxys hôtes → Ajouter un proxy hôte.
* Remplissez le nom de domaine (par exemple, openwebui.hello.duckdns.org).
* Définissez le schéma sur HTTP (par défaut), activez ``Support Websockets`` et pointez vers l'IP de votre Docker (si Docker avec open-webui est exécuté sur le même ordinateur que le gestionnaire NGINX, ce sera la même IP que précédemment (exemple : ``192.168.0.6``)
* Sélectionnez le certificat SSL généré précédemment, forcez SSL et activez HTTP/2.
6. **Ajoutez votre URL à open-webui (sinon vous obtiendrez une erreur HTTPS) :**

* Allez à votre open-webui → Panneau d'administration → Paramètres → Général
* Dans le champ de texte **Webhook URL**, entrez votre URL via laquelle vous vous connecterez à votre open-webui via le proxy inverse Nginx. Exemple : ``hello.duckdns.org`` (non essentiel pour celui-ci) ou ``openwebui.hello.duckdns.org`` (essentiel pour celui-ci).

#### Accéder au WebUI :

Accédez à Open WebUI via HTTPS à l'adresse ``hello.duckdns.org`` ou ``openwebui.hello.duckdns.org`` (selon la façon dont vous l'avez configuré).

###### Remarque sur le pare-feu : Sachez que les logiciels de pare-feu locaux (comme Portmaster) peuvent bloquer le trafic réseau interne Docker ou les ports requis. Si vous rencontrez des problèmes, vérifiez les règles de votre pare-feu pour garantir la communication nécessaire à cette configuration.
