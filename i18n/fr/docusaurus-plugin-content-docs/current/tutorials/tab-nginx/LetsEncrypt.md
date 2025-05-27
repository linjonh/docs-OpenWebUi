### Lets Encrypt

Lets Encrypt fournit des certificats SSL gratuits acceptés par la plupart des navigateurs, idéal pour les environnements de production.

#### Conditions préalables

- **Certbot** installé sur votre système.
- Enregistrements DNS correctement configurés pour pointer vers votre serveur.

#### Étapes

1. **Créer des répertoires pour les fichiers Nginx :**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Créer un fichier de configuration Nginx :**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # Ajouter la prise en charge de WebSocket (Nécessaire pour la version 0.5.0 et supérieure)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optionnel) Désactiver le buffering du proxy pour une meilleure réponse en streaming des modèles
            proxy_buffering off;

            # (Optionnel) Augmenter la taille maximale des requêtes pour les fichiers joints volumineux et les longs messages audio
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Script simplifié de Lets Encrypt :**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # Description : Script simplifié pour obtenir et installer des certificats SSL Lets Encrypt à laide de Certbot.

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # Installer Certbot si non installé
    if ! command -v certbot &> /dev/null; then
        echo "Certbot non trouvé. Installation..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # Obtenir le certificat SSL
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Recharger Nginx pour appliquer les changements
    sudo systemctl reload nginx

    echo "Le certificat SSL Lets Encrypt a été installé et Nginx rechargé."
    ```

    **Rendre le script exécutable :**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Mettre à jour la configuration de Docker Compose :**

    Ajouter le service Nginx à votre `docker-compose.yml` :

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "80:80"
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Démarrer le service Nginx :**

    ```bash
    docker compose up -d nginx
    ```

6. **Exécuter le script de Lets Encrypt :**

    Exécutez le script pour obtenir et installer le certificat SSL :

    ```bash
    ./enable_letsencrypt.sh
    ```

#### Accéder à WebUI

Accédez à Open WebUI via HTTPS à :

[https://your_domain_or_IP](https://your_domain_or_IP)
