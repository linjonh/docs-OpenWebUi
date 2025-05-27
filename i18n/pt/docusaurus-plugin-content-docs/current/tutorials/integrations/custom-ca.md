---
sidebar_position: 14
title: "🛃 Configuração com Loja CA Personalizada"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

Se você receber um erro `[SSL: CERTIFICATE_VERIFY_FAILED]` ao tentar executar o OI, muito provavelmente o problema é que você está em uma rede que intercepta o tráfego HTTPS (por exemplo, uma rede corporativa).

Para corrigir isso, será necessário adicionar o novo certificado ao truststore do OI.

**Para imagem Docker pré-construída**:

1. Monte o repositório de certificados da sua máquina anfitriã no contêiner, passando `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` como uma opção de linha de comando para o `docker run`
2. Force o Python a usar o truststore do sistema configurando `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` (veja https://docs.docker.com/reference/cli/docker/container/run/#env)

Se a variável de ambiente `REQUESTS_CA_BUNDLE` não funcionar, tente configurar `SSL_CERT_FILE` (conforme a [documentação do httpx](https://www.python-httpx.org/environment_variables/#ssl_cert_file)) usando o mesmo valor.

Exemplo de `compose.yaml` de [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210):

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

A flag `ro` monta a loja CA como somente leitura e impede alterações acidentais no truststore CA da máquina anfitriã.
**Para desenvolvimento local**:

Você também pode adicionar os certificados no processo de construção, modificando o `Dockerfile`. Isso é útil se você quiser fazer alterações na interface, por exemplo.
Como a construção ocorre em [várias etapas](https://docs.docker.com/build/building/multi-stage/), você deve adicionar o certificado em ambas:

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
