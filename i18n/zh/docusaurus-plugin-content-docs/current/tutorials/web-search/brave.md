---
sidebar_position: 2
title: "Brave"
---

:::warning
本教程由社区贡献，未获得 Open WebUI 团队的支持，仅用于演示如何根据您的具体使用场景定制 Open WebUI。想要贡献？请查看贡献教程。
:::

## Brave API

### Docker Compose 设置

在您的 Open WebUI `docker-compose.yaml` 文件中添加以下环境变量：

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
