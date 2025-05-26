---
sidebar_position: 2
title: "勇敢"
---

:::warning
本教程是社区贡献并未获得 Open WebUI 团队支持。它仅作为示例展示如何根据您的具体使用情况定制 Open WebUI。想要贡献？请查看贡献教程。
:::

## Brave API

### Docker Compose 设置

在 Open WebUI 的 `docker-compose.yaml` 文件中添加以下环境变量：

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
