---
sidebar_position: 4
title: 🐳 安裝 Docker
---

:::warning
本教程為社群貢獻，並未由 Open WebUI 團隊提供支援。此教程僅作為如何根據特定使用場景自定義 Open WebUI 的示範。想要貢獻嗎？請參考貢獻教程。
:::

# 安裝 Docker

## 適用於 Windows 和 Mac 使用者

- 從 [Docker 的官方網站](https://www.docker.com/products/docker-desktop) 下載 Docker Desktop。
- 按照網站上的安裝說明進行操作。
- 安裝完成後，**打開 Docker Desktop** 確保其正常運行。

---

## 適用於 Ubuntu 使用者

1. **打開終端機。**

2. **設置 Docker 的 apt 來源庫：**

   ```bash
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

:::note
如果使用 **Ubuntu 衍生版本**（例如 Linux Mint），請使用 `UBUNTU_CODENAME` 而非 `VERSION_CODENAME`。
:::

3. **安裝 Docker 引擎：**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **驗證 Docker 安裝：**

   ```bash
   sudo docker run hello-world
   ```

---

## 適用於其他 Linux 發行版

對於其他 Linux 發行版，請參考 [官方 Docker 文檔](https://docs.docker.com/engine/install/)。

---

## 安裝並驗證 Ollama

1. **從 [https://ollama.com/](https://ollama.com/) 下載 Ollama。**

2. **驗證 Ollama 安裝：**
   - 打開瀏覽器並導航到：
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/)。
   - 注意：埠可能根據您的安裝環境有所不同。
