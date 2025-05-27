---
sidebar_position: 2
title: "Brave"
---

:::warning
このチュートリアルはコミュニティの貢献により作成されたものであり、Open WebUIチームによるサポートはありません。これは特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を示すためのデモンストレーションのみを目的としています。貢献したい場合は、貢献チュートリアルを確認してください。
:::

## Brave API

### Docker Compose セットアップ

次の環境変数をOpen WebUI `docker-compose.yaml` ファイルに追加してください:

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
