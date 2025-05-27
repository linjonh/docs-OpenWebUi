### Использование самоподписанного сертификата и Nginx на Windows без Docker

Для базовой внутренней/разработческой установки можно использовать nginx и самоподписанный сертификат для прокси Open WebUI на https, что позволит использовать функции, такие как ввод микрофона через LAN. (По умолчанию большинство браузеров не позволяет использовать ввод микрофона на незащищённых URL, кроме localhost)

Данный гид предполагает, что вы установили Open WebUI с помощью pip и запустили команду `open-webui serve`

#### Шаг 1: Установка openssl для генерации сертификатов

Сначала вам нужно установить openssl

Вы можете скачать и установить предварительно скомпилированные бинарные файлы с сайта [Shining Light Productions (SLP)](https://slproweb.com/)

Альтернативно, если у вас установлен [Chocolatey](https://chocolatey.org/), вы можете быстро установить OpenSSL с его помощью:

1. Откройте командную строку или PowerShell.
2. Выполните следующую команду для установки OpenSSL:
   ```bash
   choco install openssl -y
   ```

---

### **Проверка установки**
После установки откройте командную строку и введите:
```bash
openssl version
```
Если выводится версия OpenSSL (например, `OpenSSL 3.x.x ...`), установка выполнена корректно.

#### Шаг 2: Установка nginx

Скачайте официальный Nginx для Windows с [nginx.org](https://nginx.org) или воспользуйтесь менеджером пакетов, таким как Chocolatey.
Распакуйте загруженный ZIP-файл в выбранный каталог (например, C:\nginx).

#### Шаг 3: Генерация сертификата

Выполните следующую команду:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

Переместите созданные файлы nginx.key и nginx.crt в выбранную папку или в каталог C:\nginx

#### Шаг 4: Настройка nginx

Откройте C:\nginx\conf\nginx.conf в текстовом редакторе

Если вы хотите, чтобы Open WebUI был доступен через вашу локальную сеть (LAN), обязательно определите ваш локальный IP-адрес с помощью `ipconfig`, например 192.168.1.15

Настройте его следующим образом:

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

    # необходима для корректной обработки веб-сокетов (потоковая передача)
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # Перенаправляйте весь HTTP-трафик на HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # Обработка HTTPS-трафика
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL настройки (убедитесь, что пути правильные)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # Настройки прокси для вашего локального сервиса
        location / {
            # proxy_pass должен указывать на запущенную локальную версию open-webui
            proxy_pass http://localhost:8080;

            # Добавьте поддержку WebSocket (необходимо для версии 0.5.0 и выше)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Необязательно) Отключите буферизацию прокси для лучшего потокового ответа моделей
            proxy_buffering off;

            # (Необязательно) Увеличьте максимальный размер запроса для больших вложений и длинных аудио сообщений
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

Сохраните файл и проверьте, что конфигурация не содержит ошибок или синтаксических проблем, выполнив `nginx -t`. Возможно, потребуется сначала выполнить команду `cd C:\nginx` в зависимости от того, как вы его установили

Запустите nginx, выполнив команду `nginx`. Если сервис nginx уже запущен, вы можете перезагрузить новую конфигурацию, выполнив команду `nginx -s reload`

---

Теперь вы должны иметь возможность получить доступ к Open WebUI через https://192.168.1.15 (или ваш собственный LAN IP при необходимости). Убедитесь, что вы разрешили доступ через брандмауэр Windows, если нужно.
