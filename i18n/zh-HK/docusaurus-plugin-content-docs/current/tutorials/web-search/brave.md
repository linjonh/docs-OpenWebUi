---
sidebar_position: 2
title: "Brave"
---

:::warning
本教程為社區貢獻，並未由 Open WebUI 團隊提供支持。僅用於演示如何根據您的特定使用案例自訂 Open WebUI。想要貢獻？請查閱貢獻教程。
:::

## Brave API

### Docker Compose 設置

將以下環境變數添加到您的 Open WebUI `docker-compose.yaml` 文件中：

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "YOUR_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
