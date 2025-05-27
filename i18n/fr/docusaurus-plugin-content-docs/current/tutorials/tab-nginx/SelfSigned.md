### Certificat Auto-signé


L'utilisation de certificats auto-signés est adaptée au développement ou à une utilisation interne où la confiance n'est pas une préoccupation cruciale.

#### Étapes

1. **Créer des répertoires pour les fichiers Nginx :**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Créer un fichier de configuration Nginx :**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name votre_domaine_ou_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optionnel) Désactiver la mise en mémoire tampon du proxy pour une meilleure réponse en streaming des modèles
            proxy_buffering off;

            # (Optionnel) Augmenter la taille maximale des requêtes pour les pièces jointes volumineuses et les longs messages audio
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Générer des certificats SSL auto-signés :**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=votre_domaine_ou_IP"
    ```

4. **Mettre à jour la configuration Docker Compose :**

    Ajouter le service Nginx à votre `docker-compose.yml` :

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
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

#### Accéder au WebUI

Accédez à Open WebUI via HTTPS à :

[https://votre_domaine_ou_IP](https://votre_domaine_ou_IP)

---
