---
sidebar_position: 14
title: "🛃 Configuración con un almacén de CA personalizado"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve solo como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

Si obtienes un error `[SSL: CERTIFICATE_VERIFY_FAILED]` al intentar ejecutar OI, lo más probable es que el problema sea que estás en una red que intercepta el tráfico HTTPS (por ejemplo, una red corporativa).

Para solucionar esto, deberás agregar el nuevo certificado al almacén de confianza de OI.

**Para la imagen Docker preconstruida**:

1. Monta el almacén de certificados de tu máquina host en el contenedor pasando `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` como una opción de línea de comandos a `docker run`
2. Obliga a Python a usar el almacén de confianza del sistema configurando `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` (consulta https://docs.docker.com/reference/cli/docker/container/run/#env)

Si la variable de entorno `REQUESTS_CA_BUNDLE` no funciona, intenta configurar `SSL_CERT_FILE` (según la [documentación de httpx](https://www.python-httpx.org/environment_variables/#ssl_cert_file)) con el mismo valor.

Ejemplo `compose.yaml` de [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210):

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

La bandera `ro` monta el almacén de CA como de solo lectura y evita cambios accidentales en el almacén de CA de tu host.
**Para desarrollo local**:

También puedes agregar los certificados en el proceso de construcción modificando el `Dockerfile`. Esto es útil si deseas hacer cambios en la interfaz de usuario, por ejemplo.
Dado que la construcción se realiza en [múltiples etapas](https://docs.docker.com/build/building/multi-stage/), debes agregar el certificado en ambas:

1. Frontend (etapa `build`):

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. Backend (etapa `base`):

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
