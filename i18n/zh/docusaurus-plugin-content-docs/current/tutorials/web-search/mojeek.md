---
sidebar_position: 8
title: "Mojeek"
---

:::warning
本教程为社区贡献，并未获得 Open WebUI 团队的支持。它仅作为如何为您的具体使用场景定制 Open WebUI 的一个示例。想要贡献？请查看贡献指南。
:::

## Mojeek 搜索 API

### 设置

1. 请访问 [Mojeek 搜索 API 页面](https://www.mojeek.com/services/search/web-search-api/) 获取 `API 密钥`
2. 使用 `API 密钥`，打开 `Open WebUI 管理面板`，点击 `设置` 标签，然后点击 `网页搜索`
3. 启用 `网页搜索` 并将 `网页搜索引擎` 设置为 `mojeek`
4. 在 `Mojeek 搜索 API 密钥` 中填写 `API 密钥`
5. 点击 `保存`

### Docker Compose 设置

将以下环境变量添加到您的 Open WebUI 的 `docker-compose.yaml` 文件中：

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
