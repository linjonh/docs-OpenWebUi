---
sidebar_position: 20
title: "💥 Langfuseによる監視とデバッグ"
---

# Open WebUIとのLangfuse統合

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) は、Open WebUI向けのオープンソースの監視と評価を提供しています。Langfuse統合を有効にすると、Open WebUIの使用を開発、監視、改善するためにアプリケーションデータをLangfuseで追跡できるようになります。例として以下が含まれます:

- アプリケーション[トレース](https://langfuse.com/docs/tracing)
- 使用パターン
- ユーザーやモデルごとのコストデータ
- セッションの再生による問題のデバッグ
- [評価](https://langfuse.com/docs/scores/overview)

## Open WebUIとのLangfuse統合方法

![Langfuse Integration](https://langfuse.com/images/docs/openwebui-integration.gif)
_Langfuse統合手順_

[Pipelines](https://github.com/open-webui/pipelines/)は、Open WebUI内でOpenAI APIプラグインのためのUI非依存型フレームワークです。これにより、ユーザーのプロンプトを最終的なLLMに送信する前にプラグインを挿入し、処理や転送が可能になり、プロンプト処理の制御とカスタマイズが強化されます。

アプリケーションデータをLangfuseで追跡するには、[Langfuseパイプライン](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py)を使用します。これにより、メッセージや対話をリアルタイムでモニタリング・分析することができます。

## クイックスタートガイド

### ステップ1: Open WebUIのセットアップ

Open WebUIを動作させていることを確認してください。そのためには、[Open WebUIドキュメント](https://docs.openwebui.com/)を参照してください。

### ステップ2: Pipelinesのセットアップ

Dockerを使用して[Pipelines](https://github.com/open-webui/pipelines/)を起動します。以下のコマンドを使用してPipelinesを開始します:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### ステップ3: Open WebUIとPipelinesを接続する

_管理設定_で、新しいOpenAI APIタイプの接続を以下の詳細で作成し保存してください:

- **URL:**`http://host.docker.internal:9099` (以前起動したDockerコンテナが動いている場所です)。
- **パスワード:** 0p3n-w3bu! (標準パスワード)

![Open WebUI Settings](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### ステップ4: Langfuseフィルターパイプラインの追加

次に、_管理設定_ -> _Pipelines_に移動し、Langfuseフィルターパイプラインを追加します。Pipelinesが以前設定された`http://host.docker.internal:9099`で待機していることを指定し、以下のURLで_[GitHub URLからインストール]_オプションを使用して[Langfuseフィルターパイプライン](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py)をインストールします:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

次にLangfuseのAPIキーをここに追加してください。まだLangfuseにサインアップしていない場合は、[こちら](https://cloud.langfuse.com)でアカウントを作成してAPIキーを取得できます。

![Open WebUI add Langfuse Pipeline](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**注:** OpenAiモデルのストリーミングが有効な状態で、使用状況（トークンカウント）をキャプチャするには、Open WebUIのモデル設定に移動し、下の_機能_セクションの"使用状況"[ボックス](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586)をチェックしてください。_

### ステップ5: Langfuseでトレースを確認する

これでOpen WebUIアプリケーションと対話できるようになり、Langfuseでトレースを確認できます。

[Langfuse UI内の例トレース](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28):

![Open WebUI Example Trace in Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## 詳細情報

Open WebUI Pipelinesに関する詳細なガイドについては、[こちらの記事](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/)をご覧ください。
