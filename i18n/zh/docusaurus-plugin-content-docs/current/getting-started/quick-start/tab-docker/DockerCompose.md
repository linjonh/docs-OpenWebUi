# Docker Compose 设置

使用 Docker Compose 可以简化多容器 Docker 应用程序的管理。

如果您没有安装 Docker，请查看我们的 [Docker 安装教程](../../../tutorials/docker-install.md)。

Docker Compose 需要额外的包 `docker-compose-v2`。

**警告：** 较旧的 Docker Compose 教程可能引用版本 1 的语法，这些教程使用诸如 `docker-compose build` 的命令。请确保使用版本 2 的语法，该版本使用诸如 `docker compose build` 的命令（注意空格而不是连字符）。

## 示例 `docker-compose.yml`

以下是一个使用 Docker Compose 设置 Open WebUI 的示例配置文件：

```yaml
version: '3'
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

## 启动服务

要启动服务，请运行以下命令：

```bash
docker compose up -d
```

## 辅助脚本

代码库中包含一个名为 `run-compose.sh` 的实用辅助脚本。此脚本帮助选择要在部署中包含哪些 Docker Compose 文件，从而简化设置过程。

---

**注意：** 如果需要 Nvidia GPU 支持，请将镜像从 `ghcr.io/open-webui/open-webui:main` 更改为 `ghcr.io/open-webui/open-webui:cuda` 并在 `docker-compose.yml` 文件的服务定义中添加以下内容：

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

此设置确保您的应用程序能够在可用时利用 GPU 资源。
