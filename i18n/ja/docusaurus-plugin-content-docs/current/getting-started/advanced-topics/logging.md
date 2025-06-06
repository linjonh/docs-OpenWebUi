---
sidebar_position: 5
title: "📜 Open WebUIのログ記録"
---

# Open WebUIログ記録の理解 🪵

ログ記録は、デバッグ、モニタリング、Open WebUIの動作を理解する上で不可欠です。このガイドでは、**ブラウザクライアント**（フロントエンド）と**アプリケーションサーバー/バックエンド**の両方でのログ記録の仕組みを説明します。

## 🖥️ ブラウザクライアントのログ記録（フロントエンド）

フロントエンド開発とデバッグのために、Open WebUIは標準のブラウザコンソールログ記録を利用します。つまり、ウェブブラウザの組み込み開発者ツール内でログを直接確認することができます。

**ブラウザログへのアクセス方法:**

1. **開発者ツールを開く:** 多くのブラウザで開発者ツールを開くには、次のように操作します：
   - Open WebUIページ上の任意の場所で**右クリック**し、「検証」または「要素を調べる」を選択します。
   - **F12**（macOSの場合はCmd+Opt+I）を押します。

2. **「コンソール」タブに移動:** 開発者ツールパネル内で「コンソール」タブを見つけてクリックします。

**ブラウザログの種類:**

Open WebUIは主に[JavaScriptの](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()` をクライアント側のログ記録に使用しています。コンソールには次のようなメッセージが表示されます：

- **情報メッセージ:** アプリケーションの一般的なフローと状態。
- **警告:** 潜在的な問題や重大ではないエラー。
- **エラー:** 機能に影響を及ぼす可能性がある問題。

**ブラウザ固有の開発者ツール:**

異なるブラウザでは開発者ツールが若干異なりますが、どのブラウザもJavaScriptログを表示するためのコンソールを提供しています。有名なブラウザのドキュメントへのリンクを以下に示します：

- **[Blink] Chrome/Chromium（例: Chrome, Edge）:** [Chrome DevTools ドキュメント](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox:** [Firefox Developer Tools ドキュメント](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari:** [Safari Developer Tools ドキュメント](https://developer.apple.com/safari/tools/)

## ⚙️ アプリケーションサーバー/バックエンドのログ記録（Python）

Open WebUIのバックエンドはPythonの組み込み`logging`モジュールを使用して、サーバー側のイベントや情報を記録します。これらのログは、サーバーの動作を理解し、エラーを診断し、パフォーマンスを監視するために重要です。

**主要な概念:**

- **Pythonの`logging`モジュール:** Open WebUIは標準のPython `logging`ライブラリを活用しています。Pythonのログ記録に精通している場合、このセクションは分かりやすいでしょう。（詳細情報については、[Python Logging ドキュメント](https://docs.python.org/3/howto/logging.html#logging-levels)をご覧ください。）
- **コンソール出力:** デフォルトでは、バックエンドのログはコンソール（標準出力）に送られ、ターミナルやDockerコンテナのログで確認可能です。
- **ログ記録レベル:** ログ記録レベルによってログの詳細度が制御されます。これを構成することで、Open WebUIの表示情報の詳細度を調整できます。

### 🚦 ログ記録レベルの説明

Pythonのログ記録は、ログメッセージの深刻度に応じて階層的にレベルを使用します。以下は、最も深刻なものから順に並べたレベルの内訳です：

| レベル         | 数値値       | 説明                                                                     | 使用ケース                                                                 |
| ------------- | ------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `CRITICAL`    | 50           | アプリケーションの終了を招く可能性がある**重大なエラー**。              | 壊滅的な失敗、データ破損。                                               |
| `ERROR`       | 40           | 問題を示す**エラー**だが、アプリケーションはまだ動作する可能性あり。    | 回復可能なエラー、失敗した操作。                                         |
| `WARNING`     | 30           | 調査が必要な**潜在的な問題**や予期しない状況。                         | 廃止予定警告、リソース制約。                                             |
| `INFO`        | 20           | アプリケーションの動作に関する**一般的な情報メッセージ**。              | 起動メッセージ、重要なイベント、通常の操作フロー。                       |
| `DEBUG`       | 10           | 開発者向けの**詳細なデバッグ情報**。                                    | 関数呼び出し、変数値、詳細な実行手順。                                   |
| `NOTSET`      | 0            | **すべてのメッセージが記録される。**  （設定がない場合、通常は`WARNING`がデフォルト）。 | 特定のデバッグのためにすべてを捕捉する場合に役立つ。                   |

**デフォルトレベル:** Open WebUIのデフォルトのログ記録レベルは`INFO`です。

### 🌍 グローバルログ記録レベル（`GLOBAL_LOG_LEVEL`）

`GLOBAL_LOG_LEVEL` 環境変数を使用して、Open WebUIバックエンド全体の**グローバル**ログ記録レベルを変更できます。これにより、全体的なログの詳細度を最も簡単に制御できます。

**動作の仕組み:**

`GLOBAL_LOG_LEVEL`を設定すると、Pythonのルートロガーが構成され、Open WebUI内のすべてのロガーや、一部の[logging.basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig)を使用するサードパーティライブラリにも影響を与えます。この設定は`logging.basicConfig(force=True)`を使用しており、既存のルートロガー構成を上書きします。

**例: `DEBUG`に設定する場合**

- **Dockerパラメータ:**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**影響:** `GLOBAL_LOG_LEVEL`を`DEBUG`に設定すると、開発やトラブルシューティングに役立つ詳細な情報を含む、最も詳細なログが生成されます。運用環境では、ログ量を減らすために`INFO`や`WARNING`がより適切な場合があります。

### ⚙️ アプリ/バックエンド固有のロギングレベル

より細かい制御のために、Open WebUIでは特定のバックエンドコンポーネントのロギングレベルを設定する環境変数を提供しています。ロギングは開発中の作業ですが、これらの環境変数を使用してある程度の制御を行うことが可能です。これにより、アプリケーションの異なる部分のロギングを細かく調整できます。

**利用可能な環境変数:**

| 環境変数名         | コンポーネント/モジュール                                       | 説明                                                                                        |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `AUDIO_LOG_LEVEL`    | 音声処理                                                     | 音声文字起こし（faster-whisper）、音声合成（TTS）、および音声処理関連のログ。              |
| `COMFYUI_LOG_LEVEL`  | ComfyUI統合                                                   | ComfyUIとの連携に関するログ。この統合を使用する場合に適用されます。                        |
| `CONFIG_LOG_LEVEL`   | 設定管理                                                     | Open WebUIの設定ファイルの読み込みと処理に関連するログ。                                    |
| `DB_LOG_LEVEL`       | データベース操作（Peewee）                                   | Peewee ORM（オブジェクトリレーショナルマッパー）を使用したデータベース操作のログ。          |
| `IMAGES_LOG_LEVEL`   | 画像生成（AUTOMATIC1111/Stable Diffusion）                    | 特にAUTOMATIC1111 Stable Diffusion統合を使用した画像生成タスクのログ。                     |
| `MAIN_LOG_LEVEL`     | メインアプリケーション実行（ルートロガー）                    | メインアプリケーションエントリポイントとルートロガーからのログ。                           |
| `MODELS_LOG_LEVEL`   | モデル管理                                                   | 言語モデル（LLMs）の読み込み、管理、認証を含む操作に関連するログ。                          |
| `OLLAMA_LOG_LEVEL`   | Ollamaバックエンド統合                                        | Ollamaバックエンドとの通信や連携に関するログ。                                              |
| `OPENAI_LOG_LEVEL`   | OpenAI API統合                                               | OpenAI API（例：GPTモデル）との連携に関するログ。                                           |
| `RAG_LOG_LEVEL`      | Retrieval-Augmented Generation（RAG）                          | RAGパイプライン（ChromaベクターデータベースやSentence-Transformersを含む）に関するログ。    |
| `WEBHOOK_LOG_LEVEL`  | 認証ウェブフック                                              | 認証ウェブフック機能に関する拡張ログ。                                                     |

**使用方法:**

`GLOBAL_LOG_LEVEL`と同様に、これらの環境変数を設定できます（Dockerパラメータ、またはDocker Composeの`environment`セクション）。例えば、Ollamaのやり取りに関する詳細なログを取得するには、次のように設定します。

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**重要な注意事項:** `GLOBAL_LOG_LEVEL`とは異なり、これらのアプリ固有の変数は、*すべて*のサードパーティモジュールのロギングには影響しない場合があります。主にOpen WebUIのコードベース内でのロギングを制御します。

これらのロギングメカニズムを理解し活用することで、Open WebUIインスタンスを効果的に監視、デバッグし、洞察を得ることができます。
