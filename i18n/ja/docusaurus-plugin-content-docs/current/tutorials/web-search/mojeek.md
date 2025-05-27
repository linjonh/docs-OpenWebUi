---
sidebar_position: 8
title: "Mojeek"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームのサポートを受けていません。これは、特定の利用ケースに合わせてOpen WebUIをカスタマイズする方法を示すデモとしてのみ機能します。貢献したいですか？チュートリアルの貢献方法をご覧ください。
:::

## Mojeek 検索API

### 設定

1. [Mojeek 検索APIページ](https://www.mojeek.com/services/search/web-search-api/)にアクセスし、`APIキー`を取得してください
2. `APIキー`を使用して、`Open WebUI管理パネル`を開き、`設定`タブをクリックした後に`ウェブ検索`をクリックしてください
3. `ウェブ検索`を有効にし、`ウェブ検索エンジン`を`mojeek`に設定してください
4. `Mojeek検索APIキー`に`APIキー`を入力してください
5. `保存`をクリックしてください

### Docker Compose 設定

次の環境変数をOpen WebUIの`docker-compose.yaml`ファイルに追加してください:

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
