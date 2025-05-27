## 更新

要將本地的 Docker 安裝更新到最新版本，您可以選擇使用 **Watchtower** 或手動更新容器。

### 選擇 1：使用 Watchtower

使用 [Watchtower](https://containrrr.dev/watchtower/)，您可以自動化更新過程：

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_（如果您的容器名稱不同，請將 `open-webui` 替換為您的容器名稱。）_

### 選擇 2：手動更新

1. 停止並移除當前的容器：

   ```bash
   docker rm -f open-webui
   ```

2. 拉取最新版本：

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. 再次啟動容器：

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

兩種方法都可以讓您的 Docker 實例更新並運行最新版本。
