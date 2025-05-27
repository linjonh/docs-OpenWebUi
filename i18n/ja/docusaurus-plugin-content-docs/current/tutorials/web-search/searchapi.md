---
sidebar_position: 9
title: "SearchApi"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートはありません。これは、特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を実演するものです。貢献したい場合は、貢献者向けチュートリアルをご覧ください。
:::

## SearchApi API

[SearchApi](https://searchapi.io)はリアルタイム検索エンジン結果APIのコレクションです。`organic_results`を返す既存または新しい検索エンジンのすべてがサポートされます。デフォルトのウェブ検索エンジンは`google`ですが、`bing`、`baidu`、`google_news`、`bing_news`、`google_scholar`、`google_patents`などに変更できます。

### 設定

1. [SearchApi](https://searchapi.io)にアクセスし、ログオンまたは新しいアカウントを作成します。
2. `Dashboard`に移動してAPIキーをコピーします。
3. `APIキー`を使用して`Open WebUI管理パネル`を開き、`設定`タブをクリックしてから`ウェブ検索`を選択します。
4. `ウェブ検索`を有効にして、`Web 検索エンジン`を`searchapi`に設定します。
5. [SearchApi](https://www.searchapi.io/)のダッシュボードでステップ2でコピーした`APIキー`を使用して`SearchApi APIキー`を入力します。
6. [オプション] 問い合わせたい`SearchApiエンジン`名を入力します。例、`google`、`bing`、`baidu`、`google_news`、`bing_news`、`google_videos`、`google_scholar`、および`google_patents`など。デフォルトでは`google`に設定されています。
7. `保存`をクリックします。

![Open WebUI管理パネル](/images/tutorial_searchapi_search.png)

#### 注意

[SearchApi](https://www.searchapi.io/)エンジンを使用してウェブ検索を行うには、プロンプトフィールドで`ウェブ検索`を有効化し、プラス（`+`）ボタンを使用する必要があります。

![ウェブ検索を有効にする](/images/enable_web_search.png)
