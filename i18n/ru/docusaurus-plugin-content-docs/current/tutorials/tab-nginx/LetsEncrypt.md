### Lets Encrypt

Lets Encrypt предоставляет бесплатные SSL-сертификаты, которые доверяют большинство браузеров, идеально подходят для рабочих сред.

#### Предварительные условия

- **Certbot** установлен на вашей системе.
- DNS-записи правильно настроены для указания на ваш сервер.

#### Шаги

1. **Создайте каталоги для файлов Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Создайте файл конфигурации Nginx:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # Добавьте поддержку WebSocket (необходимо для версии 0.5.0 и выше)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Необязательно) Отключите буферизацию прокси для лучшего потокового ответа от моделей
            proxy_buffering off;

            # (Необязательно) Увеличьте максимальный размер запроса для больших вложений и длинных аудиосообщений
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Упрощенный скрипт Lets Encrypt:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # Описание: Упрощенный скрипт для получения и установки SSL-сертификатов Lets Encrypt с использованием Certbot.

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # Установите Certbot, если он не установлен
    if ! command -v certbot &> /dev/null; then
        echo "Certbot не найден. Установка..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # Получите SSL-сертификат
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Перезагрузите Nginx для применения изменений
    sudo systemctl reload nginx

    echo "SSL-сертификат Lets Encrypt установлен и Nginx перезагружен."
    ```

    **Сделайте скрипт исполнимым:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Обновите конфигурацию Docker Compose:**

    Добавьте сервис Nginx в файл `docker-compose.yml`:

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

5. **Запустите сервис Nginx:**

    ```bash
    docker compose up -d nginx
    ```

6. **Запустите скрипт Lets Encrypt:**

    Выполните скрипт для получения и установки SSL-сертификата:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### Доступ к WebUI

Получите доступ к Open WebUI через HTTPS по адресу:

[https://your_domain_or_IP](https://your_domain_or_IP)
