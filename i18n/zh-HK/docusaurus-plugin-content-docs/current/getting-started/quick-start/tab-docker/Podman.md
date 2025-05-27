
# 使用 Podman

Podman 是一款無守護程序的容器引擎，用於開發、管理和運行 OCI 容器。

## 基本命令

- **運行容器：**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **列出正在運行的容器：**

  ```bash
  podman ps
  ```

## 使用 Podman 進行網絡配置

如果出現網絡問題，使用 slirp4netns 調整 Pod 的網絡設置，使容器能訪問您計算機的端口。

確認您已[安裝 slirp4netns](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install)，使用 `podman rm` 刪除已有的容器並啟動新容器：

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

如果您從自己的計算機（未在容器中運行）使用 Ollama，

進入 open-webui後，導航到設置 > 管理設置 > 連接，並創建新的 Ollama API 連接到 `http://10.0.2.2:[OLLAMA PORT]`。默認情況下，Ollama 的端口是 11434。


請參閱 Podman [文檔](https://podman.io/) 了解高級配置。
