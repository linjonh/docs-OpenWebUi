# Docker Compose 设置

使用 Docker Compose 简化了多容器 Docker 应用程序的管理。

如果您尚未安装 Docker，请查看我们的[Docker 安装教程](../../../tutorials/docker-install.md)。

Docker Compose 需要额外的包 `docker-compose-v2`。

**警告：**较旧的 Docker Compose 教程可能参考版本1语法，例如使用 `docker-compose build` 等命令。请确保使用版本2语法，例如使用 `docker compose build`（注意中间的空格而非连字符）。

## 示例 `docker-compose.yml`

以下是使用 Docker Compose 来设置 Open WebUI 的示例配置文件：

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

代码库中包含一个实用的辅助脚本 `run-compose.sh`。该脚本协助选择部署中要包含的 Docker Compose 文件，从而简化了设置流程。

---

**注意：**如果需要 Nvidia GPU 支持，请将镜像从 `ghcr.io/open-webui/open-webui:main` 更改为 `ghcr.io/open-webui/open-webui:cuda`，并在 `docker-compose.yml` 文件中的服务定义中添加以下内容：

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

此设置确保您的应用能在可用时利用 GPU 资源。
