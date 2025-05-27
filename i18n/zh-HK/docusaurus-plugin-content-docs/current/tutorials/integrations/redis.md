---
sidebar_position: 30
title: "🔗 Redis Websocket 支援"
---

:::warning
這篇教學是社群貢獻內容，並不由 Open WebUI 團隊支援。它僅作為教示如何根據您的特定使用案例自訂 Open WebUI。想要貢獻？請查看貢獻教學。
:::

# 🔗 Redis Websocket 支援

## 概覽

此文件頁描述了整合 Redis 與 Open WebUI 以支援 websocket 所需的步驟。透過遵循這些步驟，您將能夠在您的 Open WebUI 實例中啟用 websocket 功能，從而實現客戶端與應用程式之間的即時通訊和更新。

### 先決條件

* 一個有效的 Open WebUI 實例（運行版本需為 1.0 或更高）
* 一個 Redis 容器（在此示例中我們將使用 `docker.io/valkey/valkey:8.0.1-alpine`，它基於最新的 Redis 7.x 發行版）
* 系統中已安裝 Docker Composer（版本 2.0 或更高）
* 用於 Open WebUI 與 Redis 之間通信的 Docker 網路
* 對 Docker、Redis 和 Open WebUI 有基本了解

## 設置 Redis

要設置支援 websocket 的 Redis，您需要創建一個包含以下內容的 `docker-compose.yml` 文件：

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info 注意

`ports` 指令未包含在該配置中，因為在大多數情況下這不是必需的。Redis 服務仍可通過 Open WebUI 服務在 Docker 網路內部訪問。但是，如果您需要從 Docker 網路外部訪問 Redis 實例（例如調試或監控用途），您可以添加 `ports` 指令以公開 Redis 端口（例如 `6379:6379`）。

上述配置設置了一個名稱為 `redis-valkey` 的 Redis 容器，並為數據持久性掛載了一個卷。`healthcheck` 指令確保如果容器未能響應 `ping` 命令則會重新啟動。`--save 30 1` 命令選項使得 Redis 數據庫每 30 分鐘保存到磁碟一次，前提是至少有 1 個鍵發生改變。

:::

要為 Open WebUI 與 Redis 之間的通信創建一個 Docker 網路，請運行以下命令：

```bash
docker network create openwebui-network
```

## 配置 Open WebUI

要在 Open WebUI 中啟用 websocket 支援，您需要為 Open WebUI 實例設置以下環境變數：

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

這些環境變數啟用 websocket 支援，指定 Redis 作為 websocket 管理器，並定義 Redis 的 URL。請確保將 `WEBSOCKET_REDIS_URL` 值替換為您的 Redis 實例的實際 IP 地址。

使用 Docker 運行 Open WebUI 時，需要將其連接到相同的 Docker 網路：

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

將 `127.0.0.1` 替換為 Docker 網路中 Redis 容器的實際 IP 地址。

## 驗證

如果您成功設置了 Redis 並配置了 Open WebUI，啟動您的 Open WebUI 實例時，應該會看到以下日誌訊息：

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

這表明 Open WebUI 正在使用 Redis 進行 websocket 管理。您還可以使用 `docker exec` 命令驗證 Redis 實例是否正在運行並接受連接：

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

如果 Redis 實例運行正常，該命令應輸出 `PONG`。如果該命令失敗，您可以嘗試以下命令：

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## 疑難排解

如果您在 Redis 或 Open WebUI 的 websocket 支援中遇到問題，您可以參考以下資源進行疑難排解：

* [Redis Documentation](https://redis.io/docs)
* [Docker Compose Documentation](https://docs.docker.com/compose/overview/)
* [sysctl Documentation](https://man7.org/linux/man-pages/man8/sysctl.8.html)
