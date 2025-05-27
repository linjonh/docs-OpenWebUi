### Certificado Auto-firmado


El uso de certificados auto-firmados es adecuado para desarrollo o uso interno donde la confianza no sea una preocupación crítica.

#### Pasos

1. **Crear Directorios para Archivos de Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Crear Archivo de Configuración de Nginx:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name tu_dominio_o_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Desactivar el almacenamiento en búfer del proxy para mejor respuesta de transmisión desde los modelos
            proxy_buffering off;

            # (Opcional) Aumentar el tamaño máximo de solicitud para archivos adjuntos grandes y mensajes de audio largos
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Generar Certificados SSL Auto-Firmados:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=tu_dominio_o_IP"
    ```

4. **Actualizar Configuración de Docker Compose:**

    Agrega el servicio Nginx a tu `docker-compose.yml`:

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

5. **Iniciar el Servicio Nginx:**

    ```bash
    docker compose up -d nginx
    ```

#### Acceder a la WebUI

Accede a Open WebUI vía HTTPS en:

[https://tu_dominio_o_IP](https://tu_dominio_o_IP)

---
