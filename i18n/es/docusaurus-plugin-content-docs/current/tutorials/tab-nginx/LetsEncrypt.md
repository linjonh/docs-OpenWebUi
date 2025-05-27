### Lets Encrypt

Lets Encrypt ofrece certificados SSL gratuitos confiables por la mayoría de los navegadores, ideales para entornos de producción.

#### Requisitos previos

- **Certbot** instalado en tu sistema.
- Registros DNS configurados correctamente para apuntar a tu servidor.

#### Pasos

1. **Crear directorios para los archivos de Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Crear archivo de configuración de Nginx:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name tu_dominio_o_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # Agregar soporte para WebSocket (Necesario para la versión 0.5.0 en adelante)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Desactivar almacenamiento en caché de proxy para una mejor respuesta de flujo de modelos
            proxy_buffering off;

            # (Opcional) Aumentar el tamaño máximo de solicitud para archivos adjuntos grandes y mensajes de audio largos
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Script simplificado de Lets Encrypt:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # Descripción: Script simplificado para obtener e instalar certificados SSL de Lets Encrypt utilizando Certbot.

    DOMAIN="tu_dominio_o_IP"
    EMAIL="tu_email@example.com"

    # Instalar Certbot si no está instalado
    if ! command -v certbot &> /dev/null; then
        echo "Certbot no encontrado. Instalando..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # Obtener el certificado SSL
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Recargar Nginx para aplicar los cambios
    sudo systemctl reload nginx

    echo "El certificado SSL de Lets Encrypt ha sido instalado y Nginx recargado."
    ```

    **Haz que el script sea ejecutable:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Actualizar configuración de Docker Compose:**

    Agrega el servicio Nginx a tu `docker-compose.yml`:

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

5. **Iniciar el servicio Nginx:**

    ```bash
    docker compose up -d nginx
    ```

6. **Ejecutar el script de Lets Encrypt:**

    Ejecuta el script para obtener e instalar el certificado SSL:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### Acceder a la WebUI

Accede a Open WebUI mediante HTTPS en:

[https://tu_dominio_o_IP](https://tu_dominio_o_IP)
