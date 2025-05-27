## 使用 Docker 🐳 快速開始

按照以下步驟使用 Docker 安裝 Open WebUI。

## 步驟 1：拉取 Open WebUI 映像

首先從 GitHub 容器註冊表拉取最新的 Open WebUI Docker 映像。

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## 步驟 2：運行容器

使用默認設置運行容器。此命令包括卷映射以確保持久數據存儲。

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### 重要標誌

- **卷映射 (`-v open-webui:/app/backend/data`)**：確保您的數據持久存儲。這可以防止容器重新啟動時數據丟失。
- **端口映射 (`-p 3000:8080`)**：在您的本地機器的 3000 端口上公開 WebUI。

### 使用 GPU 支援

對於 Nvidia GPU 支援，將 `--gpus all` 添加到 `docker run` 命令中：

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### 單用戶模式（禁用登錄）

為了在單用戶設置中跳過登錄頁面，將 `WEBUI_AUTH` 環境變數設置為 `False`：

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
進行此更改後，您無法在單用戶模式和多帳號模式之間切換。
:::

#### 高級配置：連接到不同服務器上的 Ollama

要將 Open WebUI 連接到位於其他主機上的 Ollama 服務器，請添加 `OLLAMA_BASE_URL` 環境變數：

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## 訪問 WebUI

運行容器後，訪問 Open WebUI：

[http://localhost:3000](http://localhost:3000)

有關每個 Docker 標誌的詳細幫助，請參閱 [Docker 的文檔](https://docs.docker.com/engine/reference/commandline/run/)。
