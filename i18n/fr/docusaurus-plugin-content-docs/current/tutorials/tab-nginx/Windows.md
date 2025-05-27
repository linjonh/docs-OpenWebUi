### Utilisation d'un certificat auto-signé et de Nginx sous Windows sans Docker

Pour les installations internes/de développement basiques, vous pouvez utiliser nginx et un certificat auto-signé pour proxy Open WebUI en HTTPS, permettant ainsi d'utiliser des fonctionnalités comme l'entrée microphone via LAN. (Par défaut, la plupart des navigateurs n'autorisent pas l'entrée microphone sur des URL non sécurisées non-localhost)

Ce guide suppose que vous avez installé Open WebUI avec pip et que vous exécutez `open-webui serve`

#### Étape 1 : Installer openssl pour la génération de certificat

Vous devez d'abord installer openssl

Vous pouvez télécharger et installer les binaires précompilés depuis le site web [Shining Light Productions (SLP)](https://slproweb.com/).

Alternativement, si vous disposez de [Chocolatey](https://chocolatey.org/) installé, vous pouvez l'utiliser pour installer rapidement OpenSSL :

1. Ouvrez une invite de commande ou PowerShell.
2. Exécutez la commande suivante pour installer OpenSSL :
   ```bash
   choco install openssl -y
   ```

---

### **Vérifier l'installation**
Après l'installation, ouvrez une invite de commande et tapez :
```bash
openssl version
```
Si la version d'OpenSSL s'affiche (par exemple, `OpenSSL 3.x.x ...`), elle est correctement installée.

#### Étape 2 : Installer nginx

Téléchargez la version officielle de Nginx pour Windows depuis [nginx.org](https://nginx.org) ou utilisez un gestionnaire de paquets comme Chocolatey.
 Extrayez le fichier ZIP téléchargé dans un répertoire (par ex., C:\nginx).

#### Étape 3 : Générer le certificat

Exécutez la commande suivante :

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

Déplacez les fichiers nginx.key et nginx.crt générés vers un dossier de votre choix, ou vers le répertoire C:\nginx

#### Étape 4 : Configurer nginx

Ouvrez C:\nginx\conf\nginx.conf dans un éditeur de texte

Si vous souhaitez rendre Open WebUI accessible via votre réseau local (LAN), assurez-vous de noter votre adresse IP LAN en utilisant `ipconfig`, par exemple 192.168.1.15

Configurez-le comme suit :

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  $remote_addr - $remote_user [$time_local] "$request" 
    #                  $status $body_bytes_sent "$http_referer" 
    #                  "$http_user_agent" "$http_x_forwarded_for";

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  120;

    #gzip  on;

    # nécessaire pour gérer correctement les websockets (streaming)
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # Redirige tout le trafic HTTP vers HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # Gérer le trafic HTTPS
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # Paramètres SSL (assurez-vous que les chemins sont corrects)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # Paramètres de proxy vers votre service local
        location / {
            # proxy_pass doit pointer vers votre version localhost en cours d'exécution d'open-webui
            proxy_pass http://localhost:8080;

            # Ajouter la prise en charge des WebSocket (Nécessaire pour la version 0.5.0 et ultérieures)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optionnel) Désactiver le buffering du proxy pour une meilleure réponse streaming des modèles
            proxy_buffering off;

            # (Optionnel) Augmenter la taille maximale des requêtes pour les pièces jointes volumineuses et les messages audio longs
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

Enregistrez le fichier, et vérifiez que la configuration ne contient pas d'erreurs ou de problèmes de syntaxe en exécutant `nginx -t`. Vous devrez peut-être faire `cd C:\nginx` en premier, selon comment vous l'avez installé

Exécutez nginx en lançant la commande `nginx`. Si un service nginx est déjà démarré, vous pouvez recharger la nouvelle configuration en exécutant `nginx -s reload`

---

Vous devriez maintenant pouvoir accéder à Open WebUI sur https://192.168.1.15 (ou votre propre IP LAN selon le cas). Assurez-vous de permettre l'accès au pare-feu Windows si nécessaire.
