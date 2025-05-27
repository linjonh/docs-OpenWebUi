---
sidebar_position: 14
title: "🛃 Einrichtung mit benutzerdefiniertem CA-Store"
---

:::warning
Dieses Tutorial ist ein Community-Beitrag und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Contributing-Tutorial an.
:::

Falls Sie beim Ausführen von OI den Fehler `[SSL: CERTIFICATE_VERIFY_FAILED]` erhalten, liegt das Problem höchstwahrscheinlich daran, dass Sie sich in einem Netzwerk befinden, das HTTPS-Traffic abfängt (z. B. einem Firmennetzwerk).

Um dies zu beheben, müssen Sie ein neues Zertifikat in den Vertrauenstore von OI einfügen.

**Für vorkompilierte Docker-Images**:

1. Binden Sie den Zertifikatsspeicher Ihres Host-Systems in den Container ein, indem Sie `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` als Befehlszeilenoption an `docker run` übergeben.
2. Zwingen Sie Python, den System-Vertrauensspeicher zu verwenden, indem Sie `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` setzen (siehe https://docs.docker.com/reference/cli/docker/container/run/#env).

Falls die Umgebungsvariable `REQUESTS_CA_BUNDLE` nicht funktioniert, versuchen Sie, stattdessen `SSL_CERT_FILE` (wie in der [httpx-Dokumentation](https://www.python-httpx.org/environment_variables/#ssl_cert_file) beschrieben) mit demselben Wert zu setzen.

Beispiel `compose.yaml` von [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210):

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

Das `ro`-Flag bindet den CA-Speicher schreibgeschützt ein und verhindert versehentliche Änderungen an Ihrem Host-CA-Speicher.
**Für lokale Entwicklung**:

Sie können die Zertifikate auch während des Build-Prozesses hinzufügen, indem Sie die `Dockerfile` anpassen. Dies ist nützlich, wenn Sie z. B. Änderungen an der Benutzeroberfläche vornehmen möchten.
Da der Build in [mehreren Phasen](https://docs.docker.com/build/building/multi-stage/) erfolgt, müssen Sie das Zertifikat in beiden hinzufügen:

1. Frontend (`build`-Phase):

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. Backend (`base`-Phase):

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
