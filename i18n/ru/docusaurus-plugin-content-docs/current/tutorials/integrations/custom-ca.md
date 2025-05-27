---
sidebar_position: 14
title: "🛃 Настройка с пользовательским хранилищем CA"
---

:::warning
Этот учебник создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для ваших особых нужд. Хотите внести вклад? Ознакомьтесь с руководством по внесению изменений.
:::

Если при попытке запустить OI вы получаете ошибку `[SSL: CERTIFICATE_VERIFY_FAILED]`, скорее всего, проблема связана с тем, что вы находитесь в сети, которая перехватывает HTTPS-трафик (например, корпоративная сеть).

Чтобы исправить это, вам нужно добавить новый сертификат в хранилище доверия OI.

**Для готового Docker-образа**:

1. Смонтируйте хранилище сертификатов с вашего хост-компьютера в контейнер, передав `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` в качестве опции командной строки для `docker run`
2. Заставьте Python использовать системное хранилище CA, установив переменную `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` (см. https://docs.docker.com/reference/cli/docker/container/run/#env)

Если переменная окружения `REQUESTS_CA_BUNDLE` не работает, попробуйте установить `SSL_CERT_FILE` (как описано в [документации httpx](https://www.python-httpx.org/environment_variables/#ssl_cert_file)) с тем же значением.

Пример `compose.yaml` от [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210):

```yaml
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - /var/containers/openwebui:/app/backend/data:rw
      - /etc/containers/openwebui/compusrv.crt:/etc/ssl/certs/ca-certificates.crt:ro
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      - WEBUI_NAME=compusrv
      - ENABLE_SIGNUP=False
      - ENABLE_COMMUNITY_SHARING=False
      - WEBUI_SESSION_COOKIE_SAME_SITE=strict
      - WEBUI_SESSION_COOKIE_SECURE=True
      - ENABLE_OLLAMA_API=False
      - REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```

Флаг `ro` монтирует хранилище CA в режиме только для чтения и предотвращает случайные изменения вашего хранилища CA на хосте.
**Для локальной разработки**:

Вы также можете добавить сертификаты в процессе сборки, изменив `Dockerfile`. Это полезно, если вы хотите внести изменения в интерфейс, например.
Так как сборка происходит в [несколько стадий](https://docs.docker.com/build/building/multi-stage/), вы должны добавить сертификат в обе стадии.

1. Фронтенд (стадия `build`):

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. Бэкенд (стадия `base`):

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
