---
sidebar_position: 15
title: "SerpApi"
---

:::警告
このチュートリアルはコミュニティ貢献によるものであり、Open WebUIチームによるサポートは提供されていません。このチュートリアルは、Open WebUIを特定の使用ケースに合わせてカスタマイズする方法を示すデモンストレーションとして役立ちます。貢献したい場合は、貢献チュートリアルをご確認ください。
:::

## SerpApi API

[SerpApi](https://serpapi.com/) は高速、簡単、完全なAPIでGoogleやその他の検索エンジンを解析します。 `organic_results` を返す既存または新しいSERPエンジンはサポートされています。デフォルトのウェブ検索エンジンは `google` ですが、 `bing`、 `baidu`、 `google_news`、 `google_scholar`、 `google_patents` などに変更可能です。

### 設定

1. [SerpApi](https://serpapi.com/) にアクセスして、ログインまたは新しいアカウントを作成します。
2. `Dashboard` に移動してAPIキーをコピーします。
3. `APIキー` を使用して `Open WebUI管理パネル` を開き、`設定` タブをクリック、それから `Web Search` をクリックします。
4. `Web Search` を有効化し、`Web Search Engine` を `serpapi` に設定します。
5. `SerpApi API Key` に、ステップ2で [SerpApi](https://serpapi.com/) ダッシュボードからコピーした `APIキー` を入力します。
6. [オプション] クエリしたい `SerpApiエンジン` 名を入力します。例: `google`、`bing`、`baidu`、`google_news`、`google_videos`、`google_scholar`、`google_patents`。デフォルトでは `google` に設定されています。[SerpApiのドキュメント](https://serpapi.com/dashboard)で詳細なオプションを確認してください。
7. `保存` をクリックします。

![Open WebUI管理パネル](/images/tutorial_serpapi_search.png)

#### 注意

[SerpApi](https://serpapi.com/) エンジンを使用してウェブを検索するには、プロンプトフィールドで `Web Search` を有効にする必要があります。

![Web Searchを有効化](/images/enable_web_search.png)
