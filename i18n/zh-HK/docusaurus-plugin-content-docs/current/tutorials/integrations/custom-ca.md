---
sidebar_position: 14
title: "🛃 設置自定義 CA 存儲"
---

:::warning
此教程是社群貢獻，並未由 Open WebUI 團隊提供支援。它僅僅是一個如何自定義 Open WebUI 以適應特定需求的演示。想要貢獻？查看貢獻教程。
:::

如果在嘗試運行 OI 時出現 `[SSL: CERTIFICATE_VERIFY_FAILED]` 錯誤，那麼很可能是您所在的網路攔截了 HTTPS 流量（如公司網路）。

要解決此問題，您需要將新的憑證添加到 OI 的信任存儲中。

**對於預建的 Docker 映像**：

1. 通過命令行選項 `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` 將主機中的憑證存儲掛載到容器中，並傳遞給 `docker run`
2. 通過設置 `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` 強制 python 使用系統信任存儲（請參閱 https://docs.docker.com/reference/cli/docker/container/run/#env）

如果環境變量 `REQUESTS_CA_BUNDLE` 無效，請嘗試設置 `SSL_CERT_FILE`（根據 [httpx 文檔](https://www.python-httpx.org/environment_variables/#ssl_cert_file)）以使用相同的值。

來自 [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210) 的範例 `compose.yaml`：

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

`ro` 標誌將 CA 存儲掛載為只讀，並防止對主機 CA 存儲的意外更改
**對於本地開發**：

您也可以在構建過程中添加憑證，通過修改 `Dockerfile`。例如，這在您想改變 UI 時會非常有用。
由於構建分為 [多個階段](https://docs.docker.com/build/building/multi-stage/)，您必須將憑證添加到兩個階段中

1. 前端（`build` 階段）：

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. 後端（`base` 階段）：

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
