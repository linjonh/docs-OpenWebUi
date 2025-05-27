---
sidebar_position: 14
title: "🛃 使用自定义CA存储进行设置"
---

:::warning
本教程是社区贡献内容，并未得到Open WebUI团队的支持。它仅作为一种展示如何根据您的特定用例自定义Open WebUI的方法。如果想要贡献，请查看贡献教程。
:::

如果在尝试运行OI时遇到`[SSL: CERTIFICATE_VERIFY_FAILED]`错误，很可能是您处于一个会拦截HTTPS流量的网络环境（例如公司网络）。

要解决此问题，您需要将新证书添加到OI的信任存储中。

**对于预构建的Docker镜像**：

1. 通过在`docker run`命令行选项中传递`--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro`，将主机上的证书存储挂载到容器中。
2. 设置`REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt`强制Python使用系统信任存储（详见https://docs.docker.com/reference/cli/docker/container/run/#env）。

如果环境变量`REQUESTS_CA_BUNDLE`不起作用，请尝试设置`SSL_CERT_FILE`（根据[httpx文档](https://www.python-httpx.org/environment_variables/#ssl_cert_file)）并使用相同的值。

来自[@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210)的示例`compose.yaml`：

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

`ro`标志将CA存储挂载为只读，防止意外更改主机CA存储。
**对于本地开发**：

您也可以通过修改`Dockerfile`在构建过程中添加证书。如果您希望例如对UI进行更改，这将很有用。
由于构建采用[多阶段](https://docs.docker.com/build/building/multi-stage/)进行，您需要同时在以下两个阶段添加证书：

1. 前端（`build`阶段）：

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. 后端（`base`阶段）：

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
