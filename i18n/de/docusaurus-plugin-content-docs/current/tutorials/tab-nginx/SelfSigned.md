### Selbstsigniertes Zertifikat


Die Verwendung selbstsignierter Zertifikate ist für die Entwicklung oder interne Nutzung geeignet, bei der Vertrauen keine kritische Rolle spielt.

#### Schritte

1. **Verzeichnisse für Nginx-Dateien erstellen:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx-Konfigurationsdatei erstellen:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name your_domain_or_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optional) Proxy-Buffering deaktivieren für bessere Streaming-Antworten von Modellen
            proxy_buffering off;

            # (Optional) Maximale Anfragegröße für große Anhänge und lange Audiobotschaften erhöhen
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Selbstsignierte SSL-Zertifikate generieren:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **Docker Compose-Konfiguration aktualisieren:**

    Fügen Sie den Nginx-Dienst zu Ihrer `docker-compose.yml` hinzu:

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

5. **Nginx-Dienst starten:**

    ```bash
    docker compose up -d nginx
    ```

#### Zugriff auf die WebUI

Zugriff auf Open WebUI über HTTPS unter:

[https://your_domain_or_IP](https://your_domain_or_IP)

---
