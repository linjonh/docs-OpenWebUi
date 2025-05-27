# Docker Compose 設定

使用 Docker Compose 可以簡化多容器 Docker 應用程式的管理。

如果尚未安裝 Docker，請查看我們的 [Docker 安裝教程](../../../tutorials/docker-install.md)。

Docker Compose 需要額外的套件 `docker-compose-v2`。

**警告：** 舊版的 Docker Compose 教程可能參考版本 1 的語法，其中使用的命令類似於 `docker-compose build`。確保您使用的是版本 2 的語法，例如 `docker compose build`（注意空格而非連字號）。

## 範例 `docker-compose.yml`

以下是一個使用 Docker Compose 設定 Open WebUI 的範例配置檔案：

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

## 啟動服務

要啟動服務，請執行以下命令：

```bash
docker compose up -d
```

## 輔助腳本

程式碼庫中包含一個名為 `run-compose.sh` 的實用輔助腳本。該腳本有助於選擇在部署時包含哪些 Docker Compose 文件，從而簡化設置流程。

---

**注意：** 如果需要 Nvidia GPU 支援，請將映像從 `ghcr.io/open-webui/open-webui:main` 更改為 `ghcr.io/open-webui/open-webui:cuda`，並在 `docker-compose.yml` 文件的服務定義中新增以下內容：

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

此設定可確保您的應用程式在可用時利用 GPU 資源。
