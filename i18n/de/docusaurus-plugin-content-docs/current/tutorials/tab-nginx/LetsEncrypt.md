### Lets Encrypt

Lets Encrypt bietet kostenlose SSL-Zertifikate an, die von den meisten Browsern akzeptiert werden und sich ideal für Produktionsumgebungen eignen.

#### Voraussetzungen

- **Certbot** auf Ihrem System installiert.
- DNS-Einträge korrekt konfiguriert, die auf Ihren Server zeigen.

#### Schritte

1. **Verzeichnisse für Nginx-Dateien erstellen:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx-Konfigurationsdatei erstellen:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # Unterstützung für WebSocket hinzufügen (Notwendig für Version 0.5.0 und höher)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optional) Proxy-Pufferung deaktivieren für bessere Streaming-Antworten von Modellen
            proxy_buffering off;

            # (Optional) Maximale Anfragegröße für große Anhänge und lange Audionachrichten erhöhen
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Vereinfachtes Lets Encrypt-Skript:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # Beschreibung: Vereinfachtes Skript zur Beschaffung und Installation von Lets Encrypt SSL-Zertifikaten mit Certbot.

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # Certbot installieren, falls nicht installiert
    if ! command -v certbot &> /dev/null; then
        echo "Certbot nicht gefunden. Wird installiert..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # SSL-Zertifikat beschaffen
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Nginx neu laden, um Änderungen anzuwenden
    sudo systemctl reload nginx

    echo "Das Lets Encrypt SSL-Zertifikat wurde installiert und Nginx neu geladen."
    ```

    **Machen Sie das Skript ausführbar:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Aktualisieren Sie die Docker-Compose-Konfiguration:**

    Fügen Sie den Nginx-Dienst zu Ihrer `docker-compose.yml` hinzu:

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

5. **Nginx-Dienst starten:**

    ```bash
    docker compose up -d nginx
    ```

6. **Führen Sie das Lets Encrypt-Skript aus:**

    Führen Sie das Skript aus, um das SSL-Zertifikat zu beschaffen und zu installieren:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### Zugriff auf das WebUI

Greifen Sie über HTTPS auf Open WebUI zu unter:

[https://your_domain_or_IP](https://your_domain_or_IP)
