---
sidebar_position: 16
title: "🌐 瀏覽器搜索引擎"
---

:::warning
本教程由社區貢獻，並未由 Open WebUI 團隊支持。它僅用於演示如何根據您的特定用例自定義 Open WebUI。想要貢獻？請查看貢獻教程。
:::

# 瀏覽器搜索引擎整合

Open WebUI 允許您直接整合到您的網頁瀏覽器中。本教程將指導您將 Open WebUI 設置為自定義搜索引擎的過程，使您能夠通過瀏覽器的地址欄輕鬆執行查詢。

## 將 Open WebUI 設置為搜索引擎

### 前提條件

開始之前，請確保：

- 您已安裝 Chrome 或其他受支持的瀏覽器。
- `WEBUI_URL` 環境變數已正確設置，可以使用 Docker 環境變數或在 `.env` 文件中設置，具體請參考 [入門指南](/getting-started/env-configuration)。

### 第 1 步：設置 WEBUI_URL 環境變數

設置 `WEBUI_URL` 環境變數確保您的瀏覽器知道將查詢指向何處。

#### 使用 Docker 環境變數

如果您使用 Docker 運行 Open WebUI，可以在 `docker run` 命令中設置環境變數：

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<your-open-webui-url>" \
  ghcr.io/open-webui/open-webui:main
```

或者，您可以將變數添加到 `.env` 文件：

```plaintext
WEBUI_URL=https://<your-open-webui-url>
```

### 第 2 步：將 Open WebUI 添加為自定義搜索引擎

### 對於 Chrome

1. 打開 Chrome 並導航到 **設置**。
2. 從側邊欄選擇 **搜索引擎**，然後點擊 **管理搜索引擎**。
3. 點擊 **添加** 以創建一個新的搜索引擎。
4. 按以下內容填寫詳細信息：
    - **搜索引擎**：Open WebUI Search
    - **關鍵字**：webui（或任何您喜歡的關鍵字）
    - **用 %s 表示查詢的 URL**：

      ```
      https://<your-open-webui-url>/?q=%s
      ```

5. 點擊 **添加** 保存設置。

### 對於 Firefox

1. 在 Firefox 打開 Open WebUI。
2. 點擊地址欄以展開它。
3. 點擊展開地址欄底部一個綠色圓圈中的加號圖標。這將把 Open WebUI 的搜索添加到您的搜索引擎首選項中。

或者：

1. 在 Firefox 中打開 Open WebUI。
2. 右鍵單擊地址欄。
3. 從上下文菜單中選擇"添加 Open WebUI"（或類似選項）。

### 選擇性：使用特定模型

如果您希望使用特定模型進行搜索，可以修改 URL 格式以包含模型 ID：

```
https://<your-open-webui-url>/?models=<model_id>&q=%s
```

**注意：** 模型 ID 需要進行 URL 編碼。特殊字符如空格或斜線需要被編碼（例如，`my model` 變成 `my%20model`）。

## 使用範例

設置好搜索引擎後，您可以直接從地址欄進行搜索。只需輸入您選定的關鍵字，後接您的查詢：

```
webui your search query
```

此命令將把您重定向到 Open WebUI 界面，並顯示您的搜索結果。

## 排除故障

如果您遇到任何問題，檢查以下內容：

- 確保 `WEBUI_URL` 已正確配置，並指向有效的 Open WebUI 實例。
- 再次確認您的瀏覽器設置中輸入的搜索引擎 URL 格式是否正確。
- 確保您的網絡連接正常，且 Open WebUI 服務運行順暢。
