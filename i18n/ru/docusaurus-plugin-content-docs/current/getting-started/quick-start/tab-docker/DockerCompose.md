# Настройка Docker Compose

Использование Docker Compose упрощает управление многоконтейнерными приложениями Docker.

Если у вас не установлен Docker, ознакомьтесь с нашим [руководством по установке Docker](../../../tutorials/docker-install.md).

Docker Compose требует установки дополнительного пакета, `docker-compose-v2`.

**Внимание:** Ранние руководства по Docker Compose могут использовать синтаксис версии 1, где команды выглядят как `docker-compose build`. Убедитесь, что вы используете синтаксис версии 2, где команды выглядят как `docker compose build` (обратите внимание на пробел вместо дефиса).

## Пример файла `docker-compose.yml`

Вот пример конфигурационного файла для настройки Open WebUI с помощью Docker Compose:

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## Запуск сервисов

Чтобы запустить сервисы, выполните следующую команду:

```bash
docker compose up -d
```

## Вспомогательный скрипт

В кодовой базе имеется полезный вспомогательный скрипт `run-compose.sh`. Этот скрипт помогает выбрать файлы Docker Compose для включения в вашу настройку, упрощая процесс развертывания.

---

**Примечание:** Для поддержки GPU Nvidia замените образ `ghcr.io/open-webui/open-webui:main` на `ghcr.io/open-webui/open-webui:cuda` и добавьте следующий код в определение вашего сервиса в файле `docker-compose.yml`:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

Эта настройка гарантирует, что ваше приложение сможет использовать ресурсы GPU, если они доступны.
