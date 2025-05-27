---
sidebar_position: 8
title: "Mojeek"
---

:::warning
本教學由社群貢獻，並未受到 Open WebUI 團隊的支援。它僅作為說明如何為您的特定用例自定義 Open WebUI 的示範。如想貢獻，請參閱貢獻指南。
:::

## Mojeek 搜尋 API

### 設置

1. 請訪問 [Mojeek 搜尋 API 頁面](https://www.mojeek.com/services/search/web-search-api/) 獲取 `API 金鑰`
2. 使用 `API 金鑰`，打開 `Open WebUI 管理面板` 並點擊 `設定` 分頁，然後點擊 `網頁搜索`
3. 啟用 `網頁搜索` 並將 `網頁搜索引擎` 設置為 `mojeek`
4. 在 `Mojeek 搜尋 API 金鑰` 中填入 `API 金鑰`
5. 點擊 `儲存`

### Docker Compose 設置

將以下環境變量添加到 Open WebUI 的 `docker-compose.yaml` 文件中：

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
