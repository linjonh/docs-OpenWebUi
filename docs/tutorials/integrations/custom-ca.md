---
sidebar_position: 14
title: "🛃 使用自定义 CA 存储进行设置"
---

:::warning
本教程由社区贡献，不受 Open WebUI 团队支持，仅作为如何针对特定用途自定义 Open WebUI 的示例。想要贡献？请查看贡献教程。
:::

如果在尝试运行 OI 时遇到 `[SSL: CERTIFICATE_VERIFY_FAILED]` 错误，很可能是由于您所在的网络会拦截 HTTPS 流量（例如，企业网络）。

要解决此问题，您需要将新的证书添加到 OI 的信任库中。

**对于预构建 Docker 镜像**：

1. 通过将 `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` 作为命令行选项传递给 `docker run`，将主机上的证书存储挂载到容器中。
2. 通过设置 `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` 强制 Python 使用系统信任库（参见 https://docs.docker.com/reference/cli/docker/container/run/#env）。

如果环境变量 `REQUESTS_CA_BUNDLE` 无效，请尝试使用相同的值设置 `SSL_CERT_FILE`（根据 [httpx 文档](https://www.python-httpx.org/environment_variables/#ssl_cert_file)）。

来自 [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210) 的 `compose.yaml` 示例：

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

`ro` 标志将 CA 存储挂载为只读，防止对主机 CA 存储的意外更改。
**对于本地开发**：

您还可以通过修改 `Dockerfile` 在构建过程中添加证书。如果您想修改 UI，这将很有用。
由于构建发生在[多个阶段](https://docs.docker.com/build/building/multi-stage/)中，您需要分别在以下阶段添加证书：

1. 前端（`build` 阶段）：

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. 后端（`base` 阶段）：

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
