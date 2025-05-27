### Самоподписанный сертификат


Использование самоподписанных сертификатов подходит для разработки или внутреннего использования, где доверие не является критическим фактором.

#### Шаги

1. **Создайте директории для файлов Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Создайте конфигурационный файл Nginx:**

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

            # (Опционально) Отключение буферизации прокси для улучшения потокового ответа от моделей
            proxy_buffering off;

            # (Опционально) Увеличение максимального размера запроса для больших вложений и длинных аудиосообщений
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Сгенерируйте самоподписанные SSL сертификаты:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **Обновите конфигурацию Docker Compose:**

    Добавьте сервис Nginx в ваш `docker-compose.yml`:

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

5. **Запустите сервис Nginx:**

    ```bash
    docker compose up -d nginx
    ```

#### Доступ к WebUI

Получите доступ к Open WebUI через HTTPS по адресу:

[https://your_domain_or_IP](https://your_domain_or_IP)

---
