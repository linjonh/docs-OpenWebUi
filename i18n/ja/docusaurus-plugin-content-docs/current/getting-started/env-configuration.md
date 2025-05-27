---
sidebar_position: 4
title: "🌍 環境変数の設定"
---


## 概要

Open WebUIは、アプリケーションのさまざまな側面をカスタマイズおよび構成するための幅広い環境変数を提供します。このページは、利用可能なすべての環境変数の包括的なリファレンスとして機能し、それらのタイプ、デフォルト値、および説明を提供します。

新しい変数が導入されるたびに、このページは更新され、構成オプションの拡大を反映するようになります。

:::info

このページはOpen WebUIのリリースバージョン[v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9)に対応していますが、環境変数の詳細な説明やオプション、デフォルト、説明の改善に向けて作業が進行中です。

:::

### `PersistentConfig` 環境変数に関する重要な注意点

:::note

Open WebUIを初めて起動する際、すべての環境変数は均等に扱われ、アプリケーションを構成するために使用できます。ただし、`PersistentConfig`としてマークされた環境変数の値は保持され、内部に保存されます。

初回起動後、コンテナを再起動すると、`PersistentConfig`環境変数は外部の環境変数の値を使用しなくなり、代わりに内部に保存された値を使用します。

対照的に、通常の環境変数は各再起動時に引き続き更新され、適用されます。

Open WebUI内部から直接`PersistentConfig`環境変数の値を更新することができ、これらの変更は内部に保存されます。この設定により、外部の環境変数とは独立してこれらの構成設定を管理できます。

`PersistentConfig`環境変数は以下のドキュメントで明確にマークされていますので、その動作を理解することができます。

:::

## アプリ/バックエンド

以下の環境変数は`backend/open_webui/config.py`によって使用され、Open WebUIの起動設定を提供します。一部の変数は、Open WebUIを直接実行するかDockerを使用するかに応じて異なるデフォルト値を持つ場合があります。

ログに関する環境変数の詳細については、[ログのドキュメント](https://docs.openwebui.com/getting-started/advanced-topics/logging)をご覧ください。

### 一般

#### `WEBUI_URL`

- タイプ: `str`
- デフォルト: `http://localhost:3000`
- 説明: Open WebUIがアクセス可能なURLを指定します。現在は検索エンジンのサポートに使用されます。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_SIGNUP`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーアカウント作成を切り替えます。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_LOGIN_FORM`

- タイプ: `bool`
- デフォルト: `True`
- 説明: メールアドレス、パスワード、サインイン、`ENABLE_OAUTH_SIGNUP`がTrueに設定されている場合の「または」という要素を切り替えます。
- 保持: この環境変数は`PersistentConfig`変数です。

:::danger

この設定は、[ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup)が使用され、Trueに設定されている場合にのみ`False`に設定する必要があります。そうしないと、ログインができなくなります。

:::

#### `DEFAULT_LOCALE`

- タイプ: `str`
- デフォルト: `en`
- 説明: アプリケーションのデフォルトロケールを設定します。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `DEFAULT_MODELS`

- タイプ: `str`
- デフォルト: 空文字列( )、`None`
- 説明: デフォルトの言語モデルを設定します。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `DEFAULT_USER_ROLE`

- タイプ: `str`
- オプション:
  - `pending`: 新しいユーザーは管理者によって手動でアクティブ化されるまで保留中。
  - `user`: 新しいユーザーは通常のユーザー権限で自動的にアクティブ化されます。
  - `admin`: 新しいユーザーは管理者権限で自動的にアクティブ化されます。
- デフォルト: `pending`
- 説明: 新しいユーザーに割り当てられるデフォルトの役割を設定します。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `PENDING_USER_OVERLAY_TITLE`

- タイプ: `str`
- デフォルト: 空文字列( )
- 説明: 保留中のユーザーオーバーレイのカスタムタイトルを設定します。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `PENDING_USER_OVERLAY_CONTENT`

- タイプ: `str`
- デフォルト: 空文字列( )
- 説明: 保留中のユーザーオーバーレイのカスタムテキストコンテンツを設定します。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_CHANNELS`

- タイプ: `bool`
- デフォルト: `False`
- 説明: チャネルサポートを有効または無効にします。
- 保持: この環境変数は`PersistentConfig`変数です。

#### `WEBHOOK_URL`

- タイプ: `str`
- 説明: Discord/Slack/Microsoft Teamsとの統合のためのWebhookを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `ENABLE_ADMIN_EXPORT`

- 型: `bool`
- デフォルト: `True`
- 説明: 管理者ユーザーがデータをエクスポートできるかどうかを制御します。

#### `ENABLE_ADMIN_CHAT_ACCESS`

- 型: `bool`
- デフォルト: `True`
- 説明: 管理者ユーザーがすべてのチャットにアクセスできるようにします。

#### `ENABLE_USER_WEBHOOKS`

- 型: `bool`
- デフォルト: `True`
- 説明: ユーザーのWebhookを有効化または無効化します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `RESPONSE_WATERMARK`

- 型: `str`
- デフォルト: 空文字列 ( )
- 説明: チャットでメッセージをコピーする際に含まれるカスタムテキストを設定します。例: `"このテキストはAI生成です"` -> メッセージをコピーすると「このテキストはAI生成です」が追加されます。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `THREAD_POOL_SIZE`

- 型: `int`
- デフォルト: `0`
- 説明: FastAPI/AnyIOのブロッキング呼び出しに対するスレッドプールサイズを設定します。デフォルトでは（0が設定された場合）FastAPI/AnyIOは`40`スレッドを使用します。大規模なインスタンスや多数の同時ユーザーの場合、`THREAD_POOL_SIZE`を増やしてブロッキングを防ぐ必要がある場合があります。

#### `SHOW_ADMIN_DETAILS`

- 型: `bool`
- デフォルト: `True`
- 説明: インターフェースで管理者ユーザーの詳細を表示するかどうかを切り替えます。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `ADMIN_EMAIL`

- 型: `str`
- 説明: `SHOW_ADMIN_DETAILS`によって表示される管理者メールを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `ENV`

- 型: `str`
- オプション:
  - `dev` - `/docs`でFastAPIのAPIドキュメントを有効にします。
  - `prod` - 複数の環境変数を自動的に設定します。
- デフォルト:
  - **バックエンドデフォルト**: `dev`
  - **Dockerデフォルト**: `prod`
- 説明: 環境設定。

#### `ENABLE_PERSISTENT_CONFIG`

- 型: `bool`
- デフォルト: `True`
- 説明: `False`に設定されると、すべての`PersistentConfig`変数は通常の変数として扱われます。

#### `CUSTOM_NAME`

- 型: `str`
- 説明: `WEBUI_NAME`を設定しますが、**api.openwebui.com**のメタデータをポールします。

#### `WEBUI_NAME`

- 型: `str`
- デフォルト: `Open WebUI`
- 説明: メインのWebUI名を設定します。上書きされた場合は`(Open WebUI)`を追加します。

#### `PORT`

- 型: `int`
- デフォルト: `8080`
- 説明: Open WebUIを実行するためのポートを設定します。

:::info
Pythonを使用して`open-webui serve`コマンドでアプリケーションを実行している場合、`PORT`構成を使用してポートを設定することはできません。その代わりに、コマンドライン引数として`--port`フラグを使用して直接指定する必要があります。例:

```bash
open-webui serve --port 9999
```

これにより、Open WebUIがポート`9999`で実行されます。このモードでは、`PORT`環境変数は無視されます。
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- 型: `bool`
- デフォルト: `False`
- 説明: 有効化されると、最大限のデータ永続性を確保するため、ストリーミングチャットデータの各チャンクをリアルタイムでデータベースに保存します。この機能は、堅牢なデータ回復を提供し、正確なセッション追跡を可能にします。ただし、データベースに保存することによる遅延があり、レイテンシが増加します。この機能を無効化すると、パフォーマンスが向上し、遅延を減少させることができますが、システム障害やクラッシュ時にデータ損失のリスクがあります。アプリケーションの要件と受け入れ可能なトレードオフに基づいて使用してください。

#### `BYPASS_MODEL_ACCESS_CONTROL`

- 型: `bool`
- デフォルト: `False`
- 説明: モデルアクセス制御を回避します。

#### `WEBUI_BUILD_HASH`

- 型: `str`
- デフォルト: `dev-build`
- 説明: リリース用ビルドのGit SHAを識別するために使用されます。

#### `WEBUI_BANNERS`

- 型: `list` of `dict`
- デフォルト: `[]`
- 説明: ユーザーに表示するバナーのリスト。バナー形式の例:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- 永続性: この環境変数は `PersistentConfig` 変数です。

:::info

`.env`ファイルでこの環境変数を設定する場合、引用符をエスケープするために値全体をダブルクォートで囲み、内部引用符にエスケープされた引用符（`\"`）を使用してください。例:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"あなたのメッセージは保存されています。\", \"content\": \"あなたのメッセージは保存され、人間によってレビューされる可能性があります。LLMは幻覚を起こしやすいので、情報源を確認してください。\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- 型: `bool`
- デフォルト: `False`
- 説明: NVIDIA CUDAのサポートでDockerイメージをビルドします。ローカルWhisperおよび埋め込みのGPUアクセラレーションを有効にします。

#### `EXTERNAL_PWA_MANIFEST_URL`

- 型: `str`
- デフォルト: 空文字列 ( )（デフォルトで`None`が設定されています）。
- 説明: 完全なURL (例: https://path/to/manifest.webmanifest) として定義されている場合、/manifest.jsonへのリクエストは外部のマニフェストファイルを使用します。定義されていない場合、デフォルトのmanifest.jsonファイルが使用されます。

#### `ENABLE_TITLE_GENERATION`

- 種類: `bool`
- デフォルト: `True`
- 説明: チャットタイトル生成を有効または無効にします。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `LICENSE_KEY`

- 種類: `str`
- デフォルト: `None`
- 説明: 使用するライセンスキーを指定します（エンタープライズユーザーのみ）。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `SSL_ASSERT_FINGERPRINT`

- 種類: `str`
- デフォルト: 空文字列（ ）、デフォルトとして`None`が設定されています。
- 説明: 使用するSSLアサートフィンガープリントを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `DEFAULT_PROMPT_SUGGESTIONS`

- 種類: `list` of `dict`
- デフォルト: `[]`（組み込みのデフォルトプロンプト提案を使用することを意味します）
- 説明: プロンプト提案のリスト。プロンプト提案のフォーマットは次の通りです：

```json
[{"title": ["Title part 1", "Title part 2"], "content": "prompt"}]
```

### AIOHTTP クライアント

#### `AIOHTTP_CLIENT_TIMEOUT`

- 種類: `int`
- デフォルト: `300`
- 説明: AIOHTTPクライアントのタイムアウト期間を秒単位で指定します。これには、OllamaやOpenAIエンドポイントへの接続などが含まれます。

:::info

これは、クライアントが応答を待つ最大時間です。
空文字列（ ）を設定すると、タイムアウトが`None`に設定され、タイムアウトが無効になり、
クライアントは無期限に待つことができます。

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- 種類: `int`
- デフォルト: `10`
- 説明: モデルリストを取得するためのタイムアウトを秒単位で設定します。ネットワーク遅延により、モデルリストを正常に取得するために長いタイムアウトが必要な場合に役立ちます。

:::note
AIOHTTP_CLIENT_TIMEOUT_MODEL_LISTはデフォルトで10秒に設定されており、Web UIを開く際に必要なすべての接続が利用可能であることを保証するのに役立ちます。この期間は、ネットワーク遅延が高い場合でもモデルリストを取得するのに十分な時間を許します。より短いタイムアウトを希望する場合は、この値を下げることができますが、ネットワーク状況に応じて一部の接続が切断される可能性があることに注意してください。
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- 種類: `int`
- 説明: モデルリストを取得するためのタイムアウトを秒単位で設定します。ネットワーク遅延が長い場合に成功する可能性を上げるために役立ちます。

### ディレクトリ

#### `DATA_DIR`

- 種類: `str`
- デフォルト: `./data`
- 説明: アップロード、キャッシュ、ベクトルデータベースなどのデータ保存用のベースディレクトリを指定します。

#### `FONTS_DIR`

- 種類: `str`
- 説明: フォントのディレクトリを指定します。

#### `FRONTEND_BUILD_DIR`

- 種類: `str`
- デフォルト: `../build`
- 説明: フロントエンドのビルド済みファイルの場所を指定します。

#### `STATIC_DIR`

- 種類: `str`
- デフォルト: `./static`
- 説明: faviconなどの静的ファイル用ディレクトリを指定します。

### Ollama

#### `ENABLE_OLLAMA_API`

- 種類: `bool`
- デフォルト: `True`
- 説明: Ollama APIの使用を有効化します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL`は非推奨) {#ollama_base_url}

- 種類: `str`
- デフォルト: `http://localhost:11434`
- Dockerのデフォルト:
  - `K8S_FLAG` が設定されている場合: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - `USE_OLLAMA_DOCKER=True` の場合: `http://localhost:11434`
  - その他の場合: `http://host.docker.internal:11434`
- 説明: OllamaバックエンドURLを構成します。

#### `OLLAMA_BASE_URLS`

- 種類: `str`
- 説明: 負荷分散されたOllamaバックエンドホストを `;` で区切って設定します。詳細は
[`OLLAMA_BASE_URL`](#ollama_base_url) を参照。[`OLLAMA_BASE_URL`](#ollama_base_url) より優先されます。
- 例: `http://host-one:11434;http://host-two:11434`
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `USE_OLLAMA_DOCKER`

- 種類: `bool`
- デフォルト: `False`
- 説明: 同梱されたOllamaインスタンスでDockerイメージをビルドします。

#### `K8S_FLAG`

- 種類: `bool`
- デフォルト: `False`
- 説明: 設定されている場合、Helmチャートのデプロイメントを想定し、[`OLLAMA_BASE_URL`](#ollama_base_url)を `http://ollama-service.open-webui.svc.cluster.local:11434` に設定します。

### OpenAI

#### `ENABLE_OPENAI_API`

- 種類: `bool`
- デフォルト: `True`
- 説明: OpenAI APIの使用を有効化します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `OPENAI_API_BASE_URL`

- 種類: `str`
- デフォルト: `https://api.openai.com/v1`
- 説明: OpenAIの基本API URLを構成します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `OPENAI_API_BASE_URLS`

- 種類: `str`
- 説明: 負荷分散対応のOpenAI API URL（セミコロン区切り）をサポートします。
- 例: `http://host-one:11434;http://host-two:11434`
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `OPENAI_API_KEY`

- 種類: `str`
- 説明: OpenAI APIキーを設定します。
- 例: `sk-124781258123`
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OPENAI_API_KEYS`

- 型: `str`
- 説明: 複数のOpenAI APIキーをセミコロンで区切ってサポートします。
- 例: `sk-124781258123;sk-4389759834759834`
- 永続性: この環境変数は`PersistentConfig`変数です。

### タスク

#### `TASK_MODEL`

- 型: `str`
- 説明: Ollamaモデルを使用する場合のタイトル生成やウェブ検索クエリ生成などのタスクに使用するデフォルトモデル。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TASK_MODEL_EXTERNAL`

- 型: `str`
- 説明: OpenAI互換エンドポイントを使用する場合のタイトル生成やウェブ検索クエリ生成などのタスクに使用するデフォルトモデル。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- 型: `str`
- 説明: チャットタイトルを生成する際に使用するプロンプト。
- デフォルト: `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`環境変数の値。

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### タスク:
チャット履歴を要約した簡潔なタイトルを、絵文字を含めて3～5語で生成してください。
### ガイドライン:
- タイトルは会話の主要なテーマまたは内容を明確に表現する必要があります。
- 特殊記号や引用符を使用せず、テーマの理解を深める絵文字を利用してください。
- チャットの主要言語でタイトルを作成し、複数言語の場合はデフォルトで英語にしてください。
- 過度な創造性よりも正確さを優先してください。シンプルで明快に保ちましょう。
### 出力:
JSON形式: { "title": "ここに簡潔なタイトル" }
### 例:
- { "title": "📉 株式市場のトレンド" },
- { "title": "🍪 チョコチップの完璧なレシピ" },
- { "title": "音楽ストリーミングの進化" },
- { "title": "リモートワーク生産性向上のコツ" },
- { "title": "医療における人工知能" },
- { "title": "🎮 ゲーム開発の洞察" }
### チャット履歴:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- 型: `str`
- 説明: ツールを呼び出す際に使用するプロンプト。
- デフォルト: `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`環境変数の値。

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
利用可能なツール: {{TOOLS}}

タスクはクエリに基づき、利用可能なツールのリストから正しいツールを選択して返却することです。以下のガイドラインに従ってください:

- JSONオブジェクトのみを返し、追加のテキストや説明は含めないでください。

- クエリに一致するツールがない場合、空の配列を返してください: 
   {
     "tool_calls": []
   }

- クエリに一致するツールが1つ以上ある場合は、以下を含むJSONレスポンスを作成してください:
   - "name": ツールの名前。
   - "parameters": 必要とされるパラメータおよびその対応する値の辞書。

JSONレスポンス形式は厳密に以下の通りです:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- 永続性: この環境変数は`PersistentConfig`変数です。

### コード実行

#### `ENABLE_CODE_EXECUTION`

- 型: `bool`
- デフォルト: `True`
- 説明: コード実行の有効化または無効化。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_ENGINE`

- 型: `str`
- デフォルト: `pyodide`
- 説明: 使用するコード実行エンジンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_JUPYTER_URL`

- 型: `str`
- デフォルト: `None`
- 説明: コード実行で使用するJupyter URLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_JUPYTER_AUTH`

- 型: `str`
- デフォルト: `None`
- 説明: コード実行で使用するJupyter認証方法を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- 型: `str`
- デフォルト: `None`
- 説明: コード実行で使用するJupyter認証トークンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- 型: `str`
- デフォルト: `None`
- 説明: コード実行で使用するJupyter認証パスワードを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- 型: `str`
- デフォルト: 空文字(' '), デフォルトが`None`であるため。
- 説明: Jupyterコード実行のタイムアウトを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### コードインタプリタ

#### `ENABLE_CODE_INTERPRETER`

- 型: `bool`
- デフォルト: `True`
- 説明: コードインタプリタの有効化または無効化。
- 永続性: この環境変数は`PersistentConfig`変数です。
#### `CODE_INTERPRETER_ENGINE`

- 種類: `str`
- デフォルト: `pyodide`
- 説明: 使用するコードインタプリタエンジンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- 種類: `str`
- デフォルト: `None`
- 説明: コードインタプリタのプロンプトテンプレートを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_JUPYTER_URL`

- 種類: `str`
- デフォルト: 空文字列 ()、デフォルトが`None`のため。
- 説明: コードインタプリタで使用するJupyterのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- 種類: `str`
- デフォルト: 空文字列 ()、デフォルトが`None`のため。
- 説明: コードインタプリタで使用するJupyterの認証方法を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- 種類: `str`
- デフォルト: 空文字列 ()、デフォルトが`None`のため。
- 説明: コードインタプリタで使用するJupyterの認証トークンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- 種類: `str`
- デフォルト: 空文字列 ()、デフォルトが`None`のため。
- 説明: コードインタプリタで使用するJupyterの認証パスワードを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- 種類: `str`
- デフォルト: 空文字列 ()、デフォルトが`None`のため。
- 説明: Jupyterコードインタプリタのタイムアウトを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### 直接接続 (OpenAPI/MCPO ツールサーバー)

#### `ENABLE_DIRECT_CONNECTIONS`

- 種類: `bool`
- デフォルト: `True`
- 説明: 直接接続を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

### 自動補完

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- 種類: `bool`
- デフォルト: `True`
- 説明: 自動補完生成を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

:::info

`ENABLE_AUTOCOMPLETE_GENERATION`を有効にする場合は、`AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`および`AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`も適切に設定する必要があります。

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- 種類: `int`
- デフォルト: `-1`
- 説明: 自動補完生成の最大入力長を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- 種類: `str`
- デフォルト: `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`環境変数の値。

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### タスク:
あなたは自動補完システムです。 `<text>`のテキストを**補完タイプ**`<type>`と指定された言語に基づいて続けてください。

### **指示**:
1. `<text>`を分析して、文脈と意味を理解してください。
2. `<type>`を使用して出力を導きます: 
   - **一般**: 自然で簡潔な続ける内容を提供してください。
   - **検索クエリ**: 現実的な検索クエリの生成方式で補完してください。
3. `<text>`をそのまま続けるように開始してください。 **繰り返したり、言い換えたり、モデルとして応答したりしないでください。**単にテキストを完成させてください。
4. 次の点を確実にして:
   - `<text>`から自然に流れる内容であること。
   - 繰り返し、過剰説明、または無関連なアイデアを避けること。
5. 確信がない場合は: `{ "text": "" }`を返してください。

### **出力ルール**:
- JSON形式だけで応答してください: `{ "text": "<your_completion>" }`。

### **例**:
#### 例 1:  
入力:  
<type>一般</type>  
<text>太陽が地平線に沈むとき、空を塗る</text>  
出力:  
{ "text": "鮮やかなオレンジとピンクの色合いで。" }

#### 例 2:  
入力:  
<type>検索クエリ</type>  
<text>トップ評価のレストラン</text>  
出力:  
{ "text": "イタリア料理のニューヨークシティ内。" }  

---
### コンテキスト:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>  
<text>{{PROMPT}}</text>  
#### 出力:
```

- 説明: 自動補完生成のプロンプトテンプレートを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### 評価アリーナモデル

#### `ENABLE_EVALUATION_ARENA_MODELS`

- 種類: `bool`
- デフォルト: `True`
- 説明: 評価アリーナモデルを有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_MESSAGE_RATING`

- 種類: `bool`
- デフォルト: `True`
- 説明: メッセージ評価機能を有効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_COMMUNITY_SHARING`

- 種類: `bool`
- デフォルト: `True`
- 説明: ユーザーにコミュニティとの共有ボタンを表示するかどうかを制御します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### タグ生成

#### `ENABLE_TAGS_GENERATION`

- 型: `bool`
- デフォルト値: `True`
- 説明: タグ生成の有効化または無効化。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- 型: `str`
- デフォルト値: `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`環境変数の値。

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### タスク:
チャット履歴の主要テーマをカテゴライズする広義のタグを1～3生成し、さらに具体的なサブトピックタグを1～3生成する。

### ガイドライン:
- 高レベルの領域から始める(例: 科学、技術、哲学、芸術、政治、ビジネス、健康、スポーツ、エンターテイメント、教育)
- 会話を通じて強く反映されている場合、関連するサブ分野/サブ領域を含めることを考慮する
- 内容が短すぎる(3メッセージ未満)または多様すぎる場合、["一般"]のみを使用する
- チャットの主な言語を使用する。多言語の場合はデフォルトで英語を選択する
- 正確性を優先し、具体性より重視する

### 出力:
JSON形式: { "tags": ["tag1", "tag2", "tag3"] }

### チャット履歴:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 説明: タグ生成のプロンプトテンプレートを設定する。
- 永続性: この環境変数は`PersistentConfig`変数です。

### APIキーエンドポイント制限

#### `ENABLE_API_KEY`

- 型: `bool`
- デフォルト値: `True`
- 説明: APIキー認証を有効にする。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- 型: `bool`
- デフォルト値: `False`
- 説明: セキュリティと構成のためにAPIキーエンドポイント制限を有効にする。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `API_KEY_ALLOWED_ENDPOINTS`

- 型: `str`
- 説明: APIキーエンドポイント制限が有効な場合に許可されるAPIエンドポイントのカンマ区切りリストを指定。
- 永続性: この環境変数は`PersistentConfig`変数です。

:::注意

`API_KEY_ALLOWED_ENDPOINTS`の値は、エンドポイントURLをカンマ区切りリスト形式で指定する必要があります。例: `/api/v1/messages, /api/v1/channels`。

:::

#### `JWT_EXPIRES_IN`

- 型: `int`
- デフォルト値: `-1`
- 説明: JWTの有効期限を秒単位で設定します。有効な時間単位: `s`, `m`, `h`, `d`, `w` または`-1`(期限なし)。
- 永続性: この環境変数は`PersistentConfig`変数です。

## セキュリティ変数

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- 型: `bool`
- デフォルト値: `False`
- 説明: OpenAI APIおよびOllama APIへのXヘッダーとしてユーザー情報（名前、ID、メールアドレス、役割）を転送。
有効にすると、以下のヘッダーが転送されます:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- 型: `bool`
- デフォルト値: `True`
- 説明: Webサイト上でのRAGのためにSSL検証をバイパス。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- 型: `str`
- オプション:
  - `lax` - `SameSite`属性をlaxとして設定し、サードパーティウェブサイトによる要求でセッションクッキーを送信可能。
  - `strict` - `SameSite`属性をstrictとして設定し、サードパーティウェブサイトによる要求でセッションクッキー送信をブロック。
  - `none` - `SameSite`属性をnoneとして設定し、サードパーティウェブサイトによる要求でセッションクッキーを送信可能(HTTPSのみ)。
- デフォルト値: `lax`
- 説明: セッションクッキーの`SameSite`属性を設定。

:::警告

`ENABLE_OAUTH_SIGNUP`が有効の場合、`WEBUI_SESSION_COOKIE_SAME_SITE`を`strict`に設定するとログインに失敗する可能性あり。
これは、Open WebUIがOAuthプロバイダーからのコールバックを検証するためにセッションクッキーを使用するためであり、CSRF攻撃を防止。

ただし、`strict`セッションクッキーはコールバック要求と共に送信されないため、ログインの問題が発生。問題が発生した場合は、デフォルトの`lax`値を使用してください。

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- 型: `bool`
- デフォルト値: `False`
- 説明: `Secure`属性をセッションクッキーに設定する際に`True`に設定。

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- 型: `str`
- オプション:
  - `lax` - `SameSite`属性をlaxとして設定し、サードパーティウェブサイトによる要求で認証クッキーを送信可能。
  - `strict` - `SameSite`属性をstrictとして設定し、サードパーティウェブサイトによる要求で認証クッキー送信をブロック。
  - `none` - `SameSite`属性をnoneとして設定し、サードパーティウェブサイトによる要求で認証クッキーを送信可能(HTTPSのみ)。
- デフォルト値: `lax`
- 説明: 認証クッキーの`SameSite`属性を設定。

:::情報

値が設定されていない場合は、`WEBUI_SESSION_COOKIE_SAME_SITE`がフォールバックとして使用されます。

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- 型: `bool`
- デフォルト値: `False`
- 説明: `True`に設定すると、認証クッキーに`Secure`属性を設定します。

:::info

値が設定されていない場合、`WEBUI_SESSION_COOKIE_SECURE`が代替として使用されます。

:::

#### `WEBUI_AUTH`

- 型: `bool`
- デフォルト: `True`
- 説明: この設定は認証を有効または無効にします。

:::danger

`False`に設定すると、Open WebUIインスタンスの認証が無効になります。ただし、認証を無効にするには、既存ユーザーがいない新規インストールに限られます。すでに登録されているユーザーがいる場合、認証を直接無効にすることはできません。`WEBUI_AUTH`を無効にする場合は、データベースにユーザーが存在しないことを確認してください。

:::

#### `WEBUI_SECRET_KEY`

- 型: `str`
- デフォルト: `t0p-s3cr3t`
- Dockerデフォルト: 初回起動時にランダム生成
- 説明: JSON Web Tokenに使用されるランダム生成文字列を上書きします。

:::info

複数ノードクラスターおよびロードバランサーを持つOpen-WebUIを展開する場合、ノードが再利用されたり、セッションが別のノードに転送されても、ユーザーが作業を続行できるよう、すべてのインスタンスで`WEBUI_SECRET_KEY`の値を一致させる必要があります。値が一致していない場合、基盤ノードが変わるたびに再度サインインが必要となります。

:::

#### `OFFLINE_MODE`

- 型: `bool`
- デフォルト: `False`
- 説明: オフラインモードを有効または無効にします。

#### `RESET_CONFIG_ON_START`

- 型: `bool`
- デフォルト: `False`
- 説明: 起動時に`config.json`ファイルをリセットします。

#### `SAFE_MODE`

- 型: `bool`
- デフォルト: `False`
- 説明: 潜在的に危険な機能を無効にし、安全モードを有効にします。

#### `CORS_ALLOW_ORIGIN`

- 型: `str`
- デフォルト: `*`
- 説明: クロスオリジンリソース共有（CORS）の許可元を設定します。

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- 型: `bool`
- デフォルト: `False`
- 説明: Hubで独自のモデリングファイルを定義したカスタムモデルを許可するかどうかを決定します。

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- 型: `bool`
- デフォルト: `False`
- 説明: Hubで独自に定義されたモデリングファイルを使用するカスタムモデルを再ランキングのために許可するかを決定します。

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- 型: `bool`
- デフォルト: `True`
- 説明: Sentence-Transformerモデルの自動更新を切り替えます。

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- 型: `bool`
- デフォルト: `True`
- 説明: 再ランキングモデルの自動更新を切り替えます。

## ベクターデータベース

#### `VECTOR_DB`

- 型: `str`
- オプション:
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- デフォルト: `chroma`
- 説明: 使用するベクターデータベースシステムを指定します。この設定によって、埋め込み管理のためのベクター保存システムが決まります。

### ChromaDB

#### `CHROMA_TENANT`

- 型: `str`
- デフォルト: `chromadb`モジュール内の`chromadb.DEFAULT_TENANT`の値
- 説明: RAG埋め込みに使用するChromaDBのテナントを設定します。

#### `CHROMA_DATABASE`

- 型: `str`
- デフォルト: `chromadb`モジュール内の`chromadb.DEFAULT_DATABASE`の値
- 説明: RAG埋め込みに使用するChromaDBテナント内のデータベースを設定します。

#### `CHROMA_HTTP_HOST`

- 型: `str`
- 説明: リモートChromaDBサーバーのホスト名を指定します。設定されていない場合、ローカルのChromaDBインスタンスを使用します。

#### `CHROMA_HTTP_PORT`

- 型: `int`
- デフォルト: `8000`
- 説明: リモートChromaDBサーバーのポートを指定します。

#### `CHROMA_HTTP_HEADERS`

- 型: `str`
- 説明: すべてのChromaDBリクエストに含めるHTTPヘッダーのカンマ区切りリスト。
- 例: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`。

#### `CHROMA_HTTP_SSL`

- 型: `bool`
- デフォルト: `False`
- 説明: ChromaDBサーバー接続にSSLを使用するかどうかを制御します。

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- 型: `str`
- 説明: リモートChromaDBサーバーの認証プロバイダーを指定します。
- 例: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- 型: `str`
- 説明: リモートChromaDBサーバーの認証資格情報を指定します。
- 例: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- 型: `str`
- デフォルト: 空文字列 (' '), デフォルトでは`None`が設定されています。
- 説明: ElasticsearchのAPIキーを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_CA_CERTS`

- 型: `str`
- デフォルト: 空文字列 (' '), デフォルトでは`None`が設定されています。
- 説明: Elasticsearch用のCA証明書へのパスを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_CLOUD_ID`

- 型: `str`
- デフォルト: 空文字列 (' '), デフォルトでは`None`が設定されています。
- 説明: ElasticsearchクラウドIDを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_INDEX_PREFIX`

- 型: `str`
- デフォルト: `open_webui_collections`
- 説明: Elasticsearchインデックスのプレフィックスを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_PASSWORD`

- タイプ: `str`
- デフォルト: 空文字列（ ）、デフォルトとして`None`が設定されています。
- 説明: Elasticsearchのパスワードを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_URL`

- タイプ: `str`
- デフォルト: `https://localhost:9200`
- 説明: ElasticsearchインスタンスのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ELASTICSEARCH_USERNAME`

- タイプ: `str`
- デフォルト: 空文字列（ ）、デフォルトとして`None`が設定されています。
- 説明: Elasticsearchのユーザー名を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Milvus

#### `MILVUS_URI`

- タイプ: `str`
- デフォルト: `${DATA_DIR}/vector_db/milvus.db`
- 説明: Milvusベクトルデータベースへの接続URIを指定します。これは、ローカルまたはリモートのMilvusサーバーを展開構成に応じて指定できます。

#### `MILVUS_DB`

- タイプ: `str`
- デフォルト: `default`
- 説明: Milvusインスタンス内で接続するデータベースを指定します。

#### `MILVUS_TOKEN`

- タイプ: `str`
- デフォルト: `None`
- 説明: Milvus用のオプションの接続トークンを指定します。

#### `MILVUS_INDEX_TYPE`

- タイプ: `str`
- デフォルト: `HNSW`
- オプション: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- 説明: Milvusで新しいコレクションを作成する際に使用するインデックスタイプを指定します。`AUTOINDEX`は一般的にMilvusのスタンドアロンに推奨されます。`HNSW`はより良いパフォーマンスを提供する可能性がありますが、通常はクラスタ化されたMilvusセットアップを必要とします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MILVUS_METRIC_TYPE`

- タイプ: `str`
- デフォルト: `COSINE`
- オプション: `COSINE`, `IP`, `L2`
- 説明: Milvusのベクトル類似性検索で使用するメトリックタイプを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MILVUS_HNSW_M`

- タイプ: `int`
- デフォルト: `16`
- 説明: MilvusのHNSWインデックスタイプ用の`M`パラメーターを指定します。この値は構築中に作成される新しい要素ごとの双方向リンクの数に影響します。`MILVUS_INDEX_TYPE`が`HNSW`の場合にのみ適用されます。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MILVUS_HNSW_EFCONSTRUCTION`

- タイプ: `int`
- デフォルト: `100`
- 説明: MilvusのHNSWインデックスタイプ用の`efConstruction`パラメーターを指定します。この値はインデックス構築中に最も近い隣の動的リストのサイズに影響します。`MILVUS_INDEX_TYPE`が`HNSW`の場合にのみ適用されます。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MILVUS_IVF_FLAT_NLIST`

- タイプ: `int`
- デフォルト: `128`
- 説明: MilvusのIVF_FLATインデックスタイプ用の`nlist`パラメーターを指定します。これはクラスタ単位の数です。`MILVUS_INDEX_TYPE`が`IVF_FLAT`の場合にのみ適用されます。
- 永続性: この環境変数は`PersistentConfig`変数です。

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- タイプ: `bool`
- デフォルト: `False`
- 説明: OpenSearch証明書の検証を有効または無効にします。

#### `OPENSEARCH_PASSWORD`

- タイプ: `str`
- デフォルト: `None`
- 説明: OpenSearchのパスワードを設定します。

#### `OPENSEARCH_SSL`

- タイプ: `bool`
- デフォルト: `True`
- 説明: OpenSearchでSSLを有効または無効にします。

#### `OPENSEARCH_URI`

- タイプ: `str`
- デフォルト: `https://localhost:9200`
- 説明: OpenSearchのURIを設定します。

#### `OPENSEARCH_USERNAME`

- タイプ: `str`
- デフォルト: `None`
- 説明: OpenSearchのユーザー名を設定します。

### PGVector

#### `PGVECTOR_DB_URL`

- タイプ: `str`
- デフォルト: `DATABASE_URL`環境変数の値
- 説明: モデルストレージ用のデータベースURLを設定します。

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- タイプ: `str`
- デフォルト: `1536`
- 説明: PGVector初期化時の最大ベクトル長を指定します。

### Qdrant

#### `QDRANT_API_KEY`

- タイプ: `str`
- 説明: QdrantのAPIキーを設定します。

#### `QDRANT_URI`

- タイプ: `str`
- 説明: QdrantのURIを設定します。

#### `QDRANT_ON_DISK`

- タイプ: `bool`
- デフォルト: `False`
- 説明: memmap（オンディスクとしても知られる）ストレージの使用を有効にします。

#### `QDRANT_PREFER_GRPC`

- タイプ: `bool`
- デフォルト: `False`
- 説明: 可能な場合はgPRCインターフェイスを使用します。

#### `QDRANT_GRPC_PORT`

- タイプ: `int`
- デフォルト: `6334`
- 説明: QdrantのgRPCポート番号を設定します。

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Qdrantコレクション管理のマルチテナンシーパターンを有効にします。これにより、類似ベクトルデータ構造を統合することでRAM使用量と計算オーバーヘッドが大幅に削減されます。オンにすることを推奨します。

:::info

これにより、以前の非マルチテナンシーパターンで作成されたすべてのQdrantコレクションは切断されます。既存の知識を移行するには、`Admin Settings` > `Documents` > `Reindex Knowledge Base`に移動してください。

前のパターンで作成されたQdrantコレクションは引き続きリソースを消費します。

現在、UIにはベクトルDBだけをリセットするボタンはありません。もし知識をマルチテナンシーへ移行したい場合には:
- ネイティブQdrantクライアントを使用して`open_webui-knowledge`プレフィックス（またはOpen WebUIに関連するすべてのコレクションを削除する場合は`open_webui`プレフィックス）のコレクションをすべて削除してください。
- `Admin Settings` > `Documents` > `Reindex Knowledge Base`へ行き、既存の知識ベースを移行してください。

`Reindex Knowledge Base`は知識ベースのみを移行します。

:::

:::danger

デフォルトとしてマルチテナンシーパターンを使用することを決定し、古い知識を移行する必要がない場合は、`Admin Settings` > `Documents`へ行き、ベクトルと知識をリセットしてください。これにより`open_webui`プレフィックスを持つすべてのコレクションおよび保存された知識が削除されます。

:::

### Pinecone

Pineconeをベクトルストアとして使用する場合、以下の環境変数を設定してその動作を制御します。これらの変数を`.env`ファイルまたはデプロイメント環境に設定してください。

#### `PINECONE_API_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: Pineconeサービスとの認証に使用するAPIキーを設定します。

#### `PINECONE_ENVIRONMENT`

- 型: `str`
- デフォルト: `None`
- 説明: 接続するPinecone環境を指定します（例: `us-west1-gcp`, `gcp-starter`など）。

#### `PINECONE_INDEX_NAME`

- 型: `str`
- デフォルト: `open-webui-index`
- 説明: ベクトル埋め込みを保存およびクエリするために使用されるPineconeインデックスの名前を定義します。

#### `PINECONE_DIMENSION`

- 型: `int`
- デフォルト: `1536`
- 説明: ベクトル埋め込みの次元を指定します。インデックスで期待される次元に一致する必要があります（モデルによって768, 1024, 1536, 3072のいずれかが一般的です）。

#### `PINECONE_METRIC`

- 型: `str`
- デフォルト: `cosine`
- オプション: `cosine`, `dotproduct`, `euclidean`
- 説明: Pineconeインデックス内でベクトルを比較する際の類似度メトリックを指定します。

#### `PINECONE_CLOUD`

- 型: `str`
- デフォルト: `aws`
- オプション: `aws`, `gcp`, `azure`
- 説明: Pineconeインデックスがホスティングされているクラウドプロバイダーを指定します。

## RAGコンテンツ抽出エンジン

#### `CONTENT_EXTRACTION_ENGINE`

- 型: `str`
- オプション:
  - 空欄にするとデフォルトを使用
  - `external` - 外部ローダーを使用
  - `tika` - ローカルのApache Tikaサーバーを使用
  - `docling` - Doclingエンジンを使用
  - `document_intelligence` - Document Intelligenceエンジンを使用
  - `mistral_ocr` - Mistral OCRエンジンを使用
- 説明: ドキュメントのインジェスチョンのために使用するコンテンツ抽出エンジンを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MISTRAL_OCR_API_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: Mistral OCR APIキーを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- 型: `str`
- デフォルト: `None`
- 説明: 外部ドキュメントローダーサービスのURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: 外部ドキュメントローダーサービスとの認証に使用するAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TIKA_SERVER_URL`

- 型: `str`
- デフォルト: `http://localhost:9998`
- 説明: Apache TikaサーバーのURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `DOCLING_SERVER_URL`

- 型: `str`
- デフォルト: `http://docling:5001`
- 説明: DoclingサーバーのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `DOCLING_OCR_ENGINE`

- 型: `str`  
- デフォルト: `tesseract`  
- 説明: Doclingで使用するOCRエンジンを指定します。  
  対応する値には、`tesseract`（デフォルト）、`easyocr`、`ocrmac`、`rapidocr`、`tesserocr`があります。  
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `DOCLING_OCR_LANG`

- 型: `str`  
- デフォルト: `eng,fra,deu,spa`（デフォルトの`tesseract`エンジンを使用）  
- 説明: 設定された`DOCLING_OCR_ENGINE`で使用するOCR言語を指定します。  
  フォーマットや利用可能な言語コードは選択したOCRエンジンに依存します。  
- 永続性: この環境変数は`PersistentConfig`変数です。

## Retrieval Augmented Generation (RAG)

#### `RAG_EMBEDDING_ENGINE`

- 型: `str`
- オプション:
  - 空欄にすると`Default (SentenceTransformers)` - SentenceTransformersを使用して埋め込みを生成します。
  - `ollama` - 埋め込みにOllama APIを使用します。
  - `openai` - 埋め込みにOpenAI APIを使用します。
- 説明: RAGに使用する埋め込みエンジンを選択します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_EMBEDDING_MODEL`

- 型: `str`
- デフォルト: `sentence-transformers/all-MiniLM-L6-v2`
- 説明: 埋め込み用のモデルを設定します。ローカルではSentence-Transformerモデルが使用されます。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_RAG_HYBRID_SEARCH`

- 種類: `bool`
- デフォルト値: `False`
- 説明: `BM25`と`ChromaDB`のアンサンブル検索を有効化し、`sentence_transformers`モデルを使用して再ランキングを行います。

- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_TOP_K`

- 種類: `int`
- デフォルト値: `3`
- 説明: RAGを使用する際、埋め込みに使用する結果の数の初期値を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_TOP_K_RERANKER`

- 種類: `int`
- デフォルト値: `3`
- 説明: RAGを使用する際、再ランキングに使用する結果の数の初期値を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_RELEVANCE_THRESHOLD`

- 種類: `float`
- デフォルト値: `0.0`
- 説明: 再ランキングと併用する場合に文書の関連性を考慮する閾値を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_HYBRID_BM25_WEIGHT`

- 種類: `float`
- デフォルト値: `0.5`
- 説明: ハイブリッド検索中にキーワード検索（BM25）に割り当てる重みを設定します。1はキーワード検索のみ、0はベクトル検索のみを意味します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_TEMPLATE`

- 種類: `str`
- デフォルト値: `DEFAULT_RAG_TEMPLATE`環境変数の値。

`DEFAULT_RAG_TEMPLATE`:

```
### タスク:
提供されたコンテキストを使用し、明示的にid属性が含まれる<source>タグがある場合にのみインライン引用形式[id]を組み込んでユーザーの問いに答えてください。

### ガイドライン:
- 答えが分からない場合は、それを明確に述べてください。
- 不確実な場合は、ユーザーに詳細を尋ねてください。
- ユーザーの問いの言語で回答してください。
- コンテキストが読みにくいまたは質が低い場合、ユーザーに知らせつつ可能な限り最善の回答を提供してください。
- コンテキストに答えがないが、それに関する知識を持っている場合は、その旨を説明し、自分の理解をもとに回答を提供してください。
- **id属性を含む<source>タグがある場合のみ、インライン引用形式[id]（例：[1]、[2]）を使用してください。**
- <source>タグにid属性が含まれていない場合は、引用しないでください。
- 回答にXMLタグを使用しないでください。
- 引用は簡潔で提供された情報に直接関連していることを確認してください。

### 引用の例:
ユーザーが特定のトピックについて尋ね、その情報がid属性が付与されたソースにある場合、以下のような形式で引用を含めるべきです:
* "研究によれば、提案された方法によって効率が20%向上します[1]。"

### 出力:
コンテキストにid属性付きの<source>タグがある場合のみ、インライン引用形式[id]を含める形でユーザーの問いに明確かつ直接的に回答してください。

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- 説明: RAG文書をチャット完了時に注入するためのテンプレート
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_TEXT_SPLITTER`

- 種類: `str`
- オプション:
  - `character`
  - `token`
- デフォルト値: `character`
- 説明: RAGモデルのテキスト分割器を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `TIKTOKEN_CACHE_DIR`

- 種類: `str`
- デフォルト値: `{CACHE_DIR}/tiktoken`
- 説明: TikTokenキャッシュのディレクトリを設定します。

#### `TIKTOKEN_ENCODING_NAME`

- 種類: `str`
- デフォルト値: `cl100k_base`
- 説明: TikTokenのエンコーディング名を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `CHUNK_SIZE`

- 種類: `int`
- デフォルト値: `1000`
- 説明: 埋め込み用の文書チャンクサイズを設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `CHUNK_OVERLAP`

- 種類: `int`
- デフォルト値: `100`
- 説明: チャンク間の重複量を指定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `PDF_EXTRACT_IMAGES`

- 種類: `bool`
- デフォルト値: `False`
- 説明: 文書を読み込む際にOCRを使用してPDFから画像を抽出します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_FILE_MAX_SIZE`

- 種類: `int`
- 説明: 文書取り込みのためにアップロード可能なファイルサイズの最大値（MB単位）を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

#### `RAG_FILE_MAX_COUNT`

- 種類: `int`
- 説明: 文書取り込みのために一度にアップロードできるファイル数の最大値を設定します。
- 持続性: この環境変数は`PersistentConfig`変数です。

:::info

`RAG_FILE_MAX_SIZE`と`RAG_FILE_MAX_COUNT`を設定する際、過度なファイルアップロードやパフォーマンス問題を防ぐために値が妥当であることを確認してください。

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- 種類: `list` of `str`
- デフォルト値: `[]`（つまり、対応しているすべてのファイルタイプが許可されます）
- 説明: アップロード可能なファイル拡張子を指定します。

```json
["pdf,docx,txt"]
```

- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_RERANKING_MODEL`

- 型: `str`
- 説明: 結果の再ランク付け用モデルを設定します。ローカル環境では Sentence-Transformer モデルが使用されます。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_OPENAI_API_BASE_URL`

- 型: `str`
- デフォルト: `${OPENAI_API_BASE_URL}`
- 説明: RAG の埋め込み用の OpenAI 基本 API URL を設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_OPENAI_API_KEY`

- 型: `str`
- デフォルト: `${OPENAI_API_KEY}`
- 説明: RAG の埋め込み用 OpenAI API キーを設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- 型: `int`
- デフォルト: `1`
- 説明: OpenAI 埋め込み用のバッチサイズを設定します。

#### `RAG_EMBEDDING_BATCH_SIZE`

- 型: `int`
- デフォルト: `1`
- 説明: RAG（Retrieval-Augmented Generator）モデルの埋め込み用のバッチサイズを設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_OLLAMA_API_KEY`

- 型: `str`
- 説明: RAG モデルで使用される Ollama API の API キーを設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_OLLAMA_BASE_URL`

- 型: `str`
- 説明: RAG モデルで使用される Ollama API の基本 URL を設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- 型: `bool`
- デフォルト: `True`
- 説明: 検索クエリ生成の有効化または無効化を設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- 型: `str`
- デフォルト: `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE` 環境変数の値。

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### タスク:
チャット履歴を分析して、与えられた言語での検索クエリ生成の必要性を判断します。デフォルトで、**1～3個の広範かつ関連性のある検索クエリを生成することを優先**しますが、追加情報が絶対に不要であると確信できる場合を除きます。目的は、わずかな不確実性でも包括的で最新かつ価値ある情報を取得することです。検索が明確に必要ない場合は、空のリストを返します。

### ガイドライン:
- JSON オブジェクト **のみ** で応答します。余計なコメント、説明、追加テキストは厳禁です。
- 検索クエリを生成する場合は、{ "queries": ["query1", "query2"] } の形式で応答し、各クエリが独自で簡潔かつ話題に関連していることを確認してください。
- 検索から有益な結果が完全に得られないと確信できる場合にのみ、{ "queries": [] } という形式で応答します。
- 有用または最新情報を提供する可能性が少しでもある場合には、検索クエリを提案する方向で判断してください。
- 高品質で行動可能な検索クエリを作成することに集中し、不要な説明やコメント、推測は避けてください。
- 今日の日付は: {{CURRENT_DATE}}。
- 常に情報の包括的なカバーを最大化する、実用的かつ広範なクエリを提供することを優先してください。

### 出力:
必ず JSON 形式で応答してください:
{
  "queries": ["query1", "query2"]
}

### チャット履歴:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 説明: 検索クエリ生成用のプロンプトテンプレートを設定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- 型: `bool`
- デフォルト: `False`
- 説明: 埋め込みと検索プロセスをバイパスします。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- 型: `str`
- デフォルト: `None`
- 説明: ドキュメントインテリジェンスのエンドポイントを指定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `DOCUMENT_INTELLIGENCE_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: ドキュメントインテリジェンスのキーを指定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- 型: `bool`
- デフォルト: `False`
- 説明: RAG のローカルウェブ取得を有効化または無効化します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- 型: `str`
- デフォルト: `None`
- 説明: RAG 埋め込みコンテンツの接頭辞を指定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- 型: `str`
- デフォルト: `None`
- 説明: RAG 埋め込み用の接頭辞フィールド名を指定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_EMBEDDING_QUERY_PREFIX`

- 型: `str`
- デフォルト: `None`
- 説明: RAG 埋め込みクエリの接頭辞を指定します。
- 永続性: この環境変数は `PersistentConfig` 型変数です。

#### `RAG_FULL_CONTEXT`

- タイプ: `bool`
- デフォルト: `False`
- 説明: RAGに全体のコンテキストを使用するかどうかを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Google Drive統合を有効または無効にします。`GOOGLE_DRIVE_CLIENT_ID`と`GOOGLE_DRIVE_API_KEY`の両方が設定されている場合、UIでGoogle Driveがアップロードオプションとして表示されます。
- 永続性: この環境変数は`PersistentConfig`変数です。

:::情報

`GOOGLE_DRIVE_INTEGRATION`を有効化する場合、`GOOGLE_DRIVE_CLIENT_ID`と`GOOGLE_DRIVE_API_KEY`が正しく設定されていること、およびGoogleのサービス利用規約や利用ガイドラインを確認済みであることを確認してください。

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- タイプ: `str`
- 説明: Google Drive用のクライアントIDを設定します（クライアントはDrive APIとPicker APIが有効である必要があります）。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_DRIVE_API_KEY`

- タイプ: `str`
- 説明: Google Drive統合用のAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- タイプ: `bool`
- デフォルト: `False`
- 説明: OneDrive統合を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ONEDRIVE_CLIENT_ID`

- タイプ: `str`
- デフォルト: `None`
- 説明: OneDrive統合用のクライアントIDを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

## Web検索

#### `ENABLE_WEB_SEARCH`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Web検索の切り替えを有効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_SEARCH_QUERY_GENERATION`

- タイプ: `bool`
- デフォルト: `True`
- 説明: 検索クエリ生成を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEB_SEARCH_TRUST_ENV`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Web検索中に`http_proxy`および`https_proxy`で設定されたプロキシを有効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEB_SEARCH_RESULT_COUNT`

- タイプ: `int`
- デフォルト: `3`
- 説明: クロールする検索結果の最大数を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- タイプ: `int`
- デフォルト: `10`
- 説明: 検索結果から返されたWebページをクロールする同時リクエスト数。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEB_SEARCH_ENGINE`

- タイプ: `str`
- オプション:
  - `searxng` - [SearXNG](https://github.com/searxng/searxng)検索エンジンを使用します。
  - `google_pse` - [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/)を使用します。
  - `brave` - [Brave検索エンジン](https://brave.com/search/api/)を使用します。
  - `kagi` - [Kagi](https://www.kagi.com/)検索エンジンを使用します。
  - `mojeek` - [Mojeek](https://www.mojeek.com/)検索エンジンを使用します。
  - `bocha` - Bocha検索エンジンを使用します。
  - `serpstack` - [Serpstack](https://serpstack.com/)検索エンジンを使用します。
  - `serper` - [Serper](https://serper.dev/)検索エンジンを使用します。
  - `serply` - [Serply](https://serply.io/)検索エンジンを使用します。
  - `searchapi` - [SearchAPI](https://www.searchapi.io/)検索エンジンを使用します。
  - `serpapi` - [SerpApi](https://serpapi.com/)検索エンジンを使用します。
  - `duckduckgo` - [DuckDuckGo](https://duckduckgo.com/)検索エンジンを使用します。
  - `tavily` - [Tavily](https://tavily.com/)検索エンジンを使用します。
  - `jina` - [Jina](https://jina.ai/)検索エンジンを使用します。
  - `bing` - [Bing](https://www.bing.com/)検索エンジンを使用します。
  - `exa` - [Exa](https://exa.ai/)検索エンジンを使用します。
  - `perplexity` - [Perplexity AI](https://www.perplexity.ai/)検索エンジンを使用します。
  - `sougou` - [Sougou](https://www.sogou.com/)検索エンジンを使用します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Web検索の埋め込みおよび取得プロセスをバイパスします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SEARXNG_QUERY_URL`

- タイプ: `str`
- 説明: JSON出力をサポートする[SearXNG検索API](https://docs.searxng.org/dev/search_api.html)のURLを設定します。`<query>`は検索クエリに置き換えられます。例: `http://searxng.local/search?q=<query>`
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_PSE_API_KEY`

- タイプ: `str`
- 説明: Google Programmable Search Engine (PSE)サービス用のAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_PSE_ENGINE_ID`

- 型: `str`
- 説明: Googleプログラム検索エンジン（PSE）サービスのエンジンID。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `BRAVE_SEARCH_API_KEY`

- 型: `str`
- 説明: Brave検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `KAGI_SEARCH_API_KEY`

- 型: `str`
- 説明: Kagi検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MOJEEK_SEARCH_API_KEY`

- 型: `str`
- 説明: Mojeek検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPSTACK_API_KEY`

- 型: `str`
- 説明: Serpstack検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPSTACK_HTTPS`

- 型: `bool`
- デフォルト値: `True`
- 説明: SerpstackリクエストでHTTPSの使用を構成します。無料プランのリクエストはHTTPに限定されます。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPER_API_KEY`

- 型: `str`
- 説明: Serper検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPLY_API_KEY`

- 型: `str`
- 説明: Serply検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SEARCHAPI_API_KEY`

- 型: `str`
- 説明: SearchAPIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SEARCHAPI_ENGINE`

- 型: `str`
- 説明: SearchAPIエンジンを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TAVILY_API_KEY`

- 型: `str`
- 説明: Tavily検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `JINA_API_KEY`

- 型: `str`
- 説明: JinaのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `BING_SEARCH_V7_ENDPOINT`

- 型: `str`
- 説明: Bing検索APIのエンドポイントを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- 型: `str`
- デフォルト値: `https://api.bing.microsoft.com/v7.0/search`
- 説明: Bing検索APIのサブスクリプションキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `BOCHA_SEARCH_API_KEY`

- 型: `str`
- デフォルト値: `None`
- 説明: Bocha検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `EXA_API_KEY`

- 型: `str`
- デフォルト値: `None`
- 説明: Exa検索APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPAPI_API_KEY`

- 型: `str`
- デフォルト値: `None`
- 説明: SerpAPIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SERPAPI_ENGINE`

- 型: `str`
- デフォルト値: `None`
- 説明: SerpAPIで使用する検索エンジンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SOUGOU_API_SID`

- 型: `str`
- デフォルト値: `None`
- 説明: Sogou APIのSIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `SOUGOU_API_SK`

- 型: `str`
- デフォルト値: `None`
- 説明: Sogou APIのSKを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `TAVILY_EXTRACT_DEPTH`

- 型: `str`
- デフォルト値: `basic`
- 説明: Tavily検索結果の抽出深度を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### ウェブローダー構成

#### `WEB_LOADER_ENGINE`

- 型: `str`
- デフォルト値: `safe_web`
- 説明: ウェブコンテンツの取得および処理に使用するローダーを指定します。
- オプション:
  - `requests` - 拡張されたエラーハンドリングを備えたRequestsモジュールを使用します。
  - `playwright` - 高度なウェブページレンダリングおよび操作を提供するPlaywrightを使用します。
- 永続性: この環境変数は`PersistentConfig`変数です。

:::info

Playwrightを使用する場合、以下の2つのオプションがあります:

1. `PLAYWRIGHT_WS_URI`が設定されていない場合、PlaywrightとChromium依存関係はOpen WebUIコンテナに自動的にインストールされます。
2. `PLAYWRIGHT_WS_URI`が設定されている場合、Open WebUIはローカルで依存関係をインストールする代わりにリモートブラウザインスタンスに接続します。

:::

#### `PLAYWRIGHT_WS_URL`

- 型: `str`
- デフォルト値: `None`
- 説明: リモートのPlaywrightブラウザインスタンスのWebSocket URIを指定します。設定すると、Open WebUIはローカルでブラウザの依存関係をインストールする代わりに、このリモートブラウザを使用します。特に、Open WebUIコンテナーを軽量化し、ブラウザ関連の管理を分離したいコンテナ化環境で便利です。例: `ws://playwright:3000`
- 永続性: この環境変数は`PersistentConfig`変数です。

:::tip

`PLAYWRIGHT_WS_URL`を使用してリモートのPlaywrightブラウザを使用する利点:

- Open WebUIコンテナーのサイズ削減
- デフォルトのChromium以外のブラウザを使用
- ヘッドレスブラウザではない（GUI付き）ブラウザへの接続

:::

#### `FIRECRAWL_API_BASE_URL`

- タイプ: `str`
- デフォルト: `https://api.firecrawl.dev`
- 説明: Firecrawl APIのベースURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `FIRECRAWL_API_KEY`

- タイプ: `str`
- デフォルト: `None`
- 説明: Firecrawl APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `PERPLEXITY_API_KEY`

- タイプ: `str`
- デフォルト: `None`
- 説明: Perplexity APIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `PLAYWRIGHT_TIMEOUT`

- タイプ: `int`
- デフォルト: 空文字列（' '）、デフォルト値は`None`として設定されます。
- 説明: Playwrightリクエストのタイムアウトを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### YouTubeローダー

#### `YOUTUBE_LOADER_PROXY_URL`

- タイプ: `str`
- 説明: YouTubeローダーのプロキシURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `YOUTUBE_LOADER_LANGUAGE`

- タイプ: `str`
- デフォルト: `en`
- 説明: YouTubeビデオの文字起こしを取得するときに優先度順で試す言語コードをカンマ区切りで指定します。
- 例: `es,de`に設定すると、スペイン語の文字起こしが最初に試みられ、スペイン語が利用できない場合は次にドイツ語が試され、最後に英語が試されます。注意: 指定した言語がどれも利用できず、リストに`en`が含まれていない場合、システムは最終的な代替として自動的に英語を試みます。
- 永続性: この環境変数は`PersistentConfig`変数です。

## オーディオ

### Whisper Speech-to-Text（ローカル）

#### `WHISPER_MODEL`

- タイプ: `str`
- デフォルト: `base`
- 説明: 音声からテキストへの変換に使用するWhisperモデルを設定します。バックエンドはfaster_whisperで、`int8`への量子化を使用します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WHISPER_MODEL_DIR`

- タイプ: `str`
- デフォルト: `${DATA_DIR}/cache/whisper/models`
- 説明: Whisperモデルファイルを保存するディレクトリを指定します。

#### `WHISPER_VAD_FILTER`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Whisper Speech-to-Textにボイスアクティビティ検出（VAD）フィルタを適用するかどうかを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WHISPER_MODEL_AUTO_UPDATE`

- タイプ: `bool`
- デフォルト: `False`
- 説明: Whisperモデルの自動更新を切り替えます。

#### `WHISPER_LANGUAGE`

- タイプ: `str`
- デフォルト: `None`
- 説明: Whisperが使用するISO 639-1言語（ハワイ語および広東語の場合はISO 639-2）を指定します。デフォルトではWhisperは言語を予測します。

### Speech-to-Text（OpenAI）

#### `AUDIO_STT_ENGINE`

- タイプ: `str`
- オプション:
  - ローカルの組み込みWhisperエンジンを使用するには空白のままにしてください。
  - `openai` - OpenAIエンジンを使用します。
  - `deepgram`- Deepgramエンジンを使用します。
  - `azure` Azureエンジンを使用します。
- 説明: 使用する音声からテキストへの変換エンジンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUDIO_STT_MODEL`

- タイプ: `str`
- デフォルト: `whisper-1`
- 説明: OpenAI互換のエンドポイントに使用するSpeech-to-Textモデルを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- タイプ: `str`
- デフォルト: `${OPENAI_API_BASE_URL}`
- 説明: Speech-to-Text用に使用するOpenAI互換のベースURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUDIO_STT_OPENAI_API_KEY`

- タイプ: `str`
- デフォルト: `${OPENAI_API_KEY}`
- 説明: Speech-to-Text用に使用するOpenAI APIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Speech-to-Text（Azure）

#### `AUDIO_STT_AZURE_API_KEY`

- タイプ: `str`
- デフォルト: `None`
- 説明: Speech-to-Textに使用するAzure APIキーを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUDIO_STT_AZURE_REGION`

- タイプ: `str`
- デフォルト: `None`
- 説明: Speech-to-Textに使用するAzureのリージョンを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUDIO_STT_AZURE_LOCALES`

- タイプ: `str`
- デフォルト: `None`
- 説明: Azure Speech-to-Textで使用するロケールを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Speech-to-Text（Deepgram）

#### `DEEPGRAM_API_KEY`

- タイプ: `str`
- デフォルト: `None`
- 説明: Speech-to-Textに使用するDeepgram APIキーを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

### テキスト読み上げ (Text-to-Speech)

#### `AUDIO_TTS_API_KEY`

- 種類: `str`
- 説明: テキスト読み上げ用のAPIキーを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_ENGINE`

- 種類: `str`
- オプション:
  - 空欄にして、テキスト読み上げ用の組み込みWebAPIエンジンを使用します。
  - `azure`: Azureエンジンを使用してテキスト読み上げを行います。
  - `elevenlabs`: ElevenLabsエンジンを使用してテキスト読み上げを行います。
  - `openai`: OpenAIエンジンを使用してテキスト読み上げを行います。
  - `transformers`: SentenceTransformersを使用してテキスト読み上げを行います。
- 説明: 使用するテキスト読み上げエンジンを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_MODEL`

- 種類: `str`
- デフォルト値: `tts-1`
- 説明: 使用するOpenAIのテキスト読み上げモデルを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_VOICE`

- 種類: `str`
- デフォルト値: `alloy`
- 説明: 使用するOpenAIテキスト読み上げボイスを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_SPLIT_ON`

- 種類: `str`
- デフォルト値: `punctuation`
- 説明: OpenAIテキスト読み上げの分割基準を設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

### Azure テキスト読み上げ

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- 種類: `str`
- 説明: Azureテキスト読み上げのリージョンを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- 種類: `str`
- 説明: Azureテキスト読み上げの出力フォーマットを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

### OpenAI テキスト読み上げ

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- 種類: `str`
- デフォルト値: `${OPENAI_API_BASE_URL}`
- 説明: テキスト読み上げ用に使用するOpenAI互換のベースURLを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUDIO_TTS_OPENAI_API_KEY`

- 種類: `str`
- デフォルト値: `${OPENAI_API_KEY}`
- 説明: テキスト読み上げで使用するAPIキーを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

## 画像生成

#### `IMAGE_GENERATION_ENGINE`

- 種類: `str`
- オプション:
  - `openai`: OpenAI DALL-Eを使用して画像を生成します。
  - `comfyui`: ComfyUIエンジンを使用して画像を生成します。
  - `automatic1111`: AUTOMATIC1111エンジンを使用して画像を生成します。
  - `gemini`: Geminiを使用して画像を生成します。
- デフォルト値: `openai`
- 説明: 画像生成に使用するエンジンを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `ENABLE_IMAGE_GENERATION`

- 種類: `bool`
- デフォルト値: `False`
- 説明: 画像生成機能を有効または無効にします。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- 種類: `bool`
- デフォルト値: `True`
- 説明: 画像プロンプト生成機能を有効または無効にします。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- 種類: `str`
- デフォルト値: `None`
- 説明: 画像プロンプトを生成するために使用するテンプレートを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### タスク:
与えられた言語とコンテキストに基づいて、画像生成タスクの詳細なプロンプトを作成してください。見えない人に説明するように画像を記述し、関連する詳細、色、形状、およびその他の重要な要素を含めます。

### ガイドライン:
- 画像の最も重要な側面に焦点を当てて詳細に記述してください。
- 画像に存在しない情報を追加したり仮定を避けてください。
- チャットの主要言語を使用し、マルチリンガルの場合は英語をデフォルトとしてください。
- 画像が複雑すぎる場合は、最も目立つ要素に焦点を当ててください。

### 出力:
JSON形式で厳密に返します:
{
    "prompt": "詳細な説明をここに記載してください。"
}

### チャット履歴:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- 種類: `str`
- デフォルト値: `512x512`
- 説明: 生成する画像のデフォルトサイズを設定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `IMAGE_STEPS`

- 種類: `int`
- デフォルト値: `50`
- 説明: 画像生成のデフォルト反復ステップを設定します。ComfyUIとAUTOMATIC1111で使用されます。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `IMAGE_GENERATION_MODEL`

- 種類: `str`
- 説明: 画像生成に使用するデフォルトモデル
- 永続性: この環境変数は `PersistentConfig` 変数です。

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- 種類: `str`
- 説明: AUTOMATIC1111のStable Diffusion APIのURLを指定します。
- 永続性: この環境変数は `PersistentConfig` 変数です。

#### `AUTOMATIC1111_API_AUTH`

- 種類: `str`
- 説明: AUTOMATIC1111のAPI認証を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUTOMATIC1111_CFG_SCALE`

- 型: `float`
- 説明: AUTOMATIC1111推論のスケールを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUTOMATIC1111_SAMPLER`

- 型: `str`
- 説明: AUTOMATIC1111推論のサンプラーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `AUTOMATIC1111_SCHEDULER`

- 型: `str`
- 説明: AUTOMATIC1111推論のスケジューラを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### ComfyUI

#### `COMFYUI_BASE_URL`

- 型: `str`
- 説明: ComfyUI画像生成APIのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `COMFYUI_API_KEY`

- 型: `str`
- 説明: ComfyUIのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `COMFYUI_WORKFLOW`

- 型: `str`
- デフォルト:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  }
}
```

- 説明: ComfyUIのワークフローを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Gemini

#### `GEMINI_API_BASE_URL`

- 型: `str`
- デフォルト: `None`
- 説明: GeminiのAPIのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GEMINI_API_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: GeminiのAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `IMAGES_GEMINI_API_BASE_URL`

- 型: `str`
- デフォルト: `None`
- 説明: Geminiの画像生成APIのURLを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `IMAGES_GEMINI_API_KEY`

- 型: `str`
- デフォルト: `None`
- 説明: 画像生成のためのGemini APIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- 型: `str`
- デフォルト: `${OPENAI_API_BASE_URL}`
- 説明: DALL-E画像生成に使用するOpenAI互換のベースURLを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `IMAGES_OPENAI_API_KEY`

- 型: `str`
- デフォルト: `${OPENAI_API_KEY}`
- 説明: DALL-E画像生成に使用するAPIキーを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- 型: `bool`
- デフォルト: `False`
- 説明: OAuthを介したサインアップ時のアカウント作成を有効にします。`ENABLE_SIGNUP`とは別です。
- 永続性: この環境変数は`PersistentConfig`変数です。

:::danger

`ENABLE_LOGIN_FORM`を`False`に設定する必要があります。`ENABLE_OAUTH_SIGNUP`を`True`に設定した場合、しないとログインができなくなります。

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- 型: `bool`
- デフォルト: `False`
- 説明: 有効にすると、OAuthアカウントが同じメールアドレスの既存アカウントとマージされます。 これはすべてのOAuthプロバイダーがメールアドレスを確認するわけではないため、
アカウント乗っ取りの可能性があるため、安全とは言えません。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- 型: `bool`
- デフォルト: `False`
- 説明: 有効にすると、ログイン時にOAuthが提供する画像でローカルユーザーのプロフィール画像を更新します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- 型: `str`
- 説明: 認証に使用する信頼できるリクエストヘッダーを定義します。[SSO ドキュメント](/features/sso)を参照。

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- 型: `str`
- 説明: `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`ヘッダーを使用して登録するユーザー名を定義する信頼できるリクエストヘッダーを定義します。[SSO ドキュメント](/features/sso)を参照。

### Google

https://support.google.com/cloud/answer/6158849?hl=en を参照してください。

#### `GOOGLE_CLIENT_ID`

- 型: `str`
- 説明: Google OAuthのクライアントIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_CLIENT_SECRET`

- 型: `str`
- 説明: Google OAuthのクライアントシークレットを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_OAUTH_SCOPE`

- 型: `str`
- デフォルト: `openid email profile`
- 説明: Google OAuth認証のスコープを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GOOGLE_REDIRECT_URI`

- 型: `str`
- デフォルト: `<backend>/oauth/google/callback`
- 説明: Google OAuthのリダイレクトURIを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### Microsoft

https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app を参照してください。

#### `MICROSOFT_CLIENT_ID`

- 型: `str`
- 説明: Microsoft OAuthのクライアントIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MICROSOFT_CLIENT_SECRET`

- 型: `str`
- 説明: Microsoft OAuthのクライアントシークレットを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MICROSOFT_CLIENT_TENANT_ID`

- 型: `str`
- 説明: Microsoft OAuthのテナントIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MICROSOFT_OAUTH_SCOPE`

- 型: `str`
- デフォルト: `openid email profile`
- 説明: Microsoft OAuth認証のスコープを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `MICROSOFT_REDIRECT_URI`

- 型: `str`
- デフォルト: `<backend>/oauth/microsoft/callback`
- 説明: Microsoft OAuthのリダイレクトURIを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### GitHub

https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps を参照してください。

#### `GITHUB_CLIENT_ID`

- 型: `str`
- 説明: GitHub OAuthのクライアントIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GITHUB_CLIENT_SECRET`

- 型: `str`
- 説明: GitHub OAuthのクライアントシークレットを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GITHUB_CLIENT_SCOPE`

- 型: `str`
- デフォルト: `user:email`
- 説明: GitHub OAuth認証のスコープを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `GITHUB_CLIENT_REDIRECT_URI`

- 型: `str`
- デフォルト: `<backend>/oauth/github/callback`
- 説明: GitHub OAuthのリダイレクトURIを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- 型: `str`
- 説明: OIDCのクライアントIDを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_CLIENT_SECRET`

- 型: `str`
- 説明: OIDCのクライアントシークレットを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OPENID_PROVIDER_URL`

- 型: `str`
- 説明: `.well-known/openid-configuration`エンドポイントへのパス
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OPENID_REDIRECT_URI`

- 型: `str`
- デフォルト: `<backend>/oauth/oidc/callback`
- 説明: OIDCのリダイレクトURIを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_SCOPES`

- 型: `str`
- デフォルト: `openid email profile`
- 説明: OIDC認証のスコープを設定します。`openid`と`email`は必須です。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_CODE_CHALLENGE_METHOD`

- 型: `str`
- デフォルト: 空文字列（ ）、デフォルトは`None`です。
- 説明: OAuth認証のコードチャレンジ方法を指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_PROVIDER_NAME`

- 型: `str`
- デフォルト: `SSO`
- 説明: OIDCプロバイダーの名前を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_USERNAME_CLAIM`

- 型: `str`
- デフォルト: `name`
- 説明: OpenIDのユーザー名クレームを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_EMAIL_CLAIM`

- 型: `str`
- デフォルト: `email`
- 説明: OpenIDのメールクレームを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_PICTURE_CLAIM`

- タイプ: `str`
- デフォルト値: `picture`
- 説明: OpenIDの写真（アバター）クレームを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_GROUP_CLAIM`

- タイプ: `str`
- デフォルト値: `groups`
- 説明: OAuth認証のグループクレームを指定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- タイプ: `bool`
- デフォルト値: `False`
- 説明: OAuth委任のロール管理を有効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- タイプ: `bool`
- デフォルト値: `False`
- 説明: OAuthグループ管理を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_ROLES_CLAIM`

- タイプ: `str`
- デフォルト値: `roles`
- 説明: OIDCトークンで検索するロールクレームを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_ALLOWED_ROLES`

- タイプ: `str`
- デフォルト値: `user,admin`
- 説明: プラットフォームへのアクセスが許可されるロールを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_ADMIN_ROLES`

- タイプ: `str`
- デフォルト値: `admin`
- 説明: 管理者と見なされるロールを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `OAUTH_ALLOWED_DOMAINS`

- タイプ: `str`
- デフォルト値: `*`
- 説明: OAuth認証で許可されるドメインを指定します。（例: "example1.com,example2.com"）。
- 永続性: この環境変数は`PersistentConfig`変数です。

## LDAP

#### `ENABLE_LDAP`

- タイプ: `bool`
- デフォルト値: `False`
- 説明: LDAP認証を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_SERVER_LABEL`

- タイプ: `str`
- 説明: LDAPサーバーのラベルを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。


#### `LDAP_SERVER_HOST`

- タイプ: `str`
- デフォルト値: `localhost`
- 説明: LDAPサーバーのホスト名を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_SERVER_PORT`

- タイプ: `int`
- デフォルト値: `389`
- 説明: LDAPサーバーのポート番号を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- タイプ: `str`
- 説明: LDAP認証でメールとして使用する属性を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- タイプ: `str`
- 説明: LDAP認証でユーザー名として使用する属性を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_APP_DN`

- タイプ: `str`
- 説明: LDAPアプリケーションの識別名を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_APP_PASSWORD`

- タイプ: `str`
- 説明: LDAPアプリケーションのパスワードを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_SEARCH_BASE`

- タイプ: `str`
- 説明: LDAP認証の検索ベースを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_SEARCH_FILTER`

- タイプ: `str`
- デフォルト値: `None`
- 説明: LDAP検索に使用する単一のフィルタを設定します。`LDAP_SEARCH_FILTERS`の代替。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_SEARCH_FILTERS`

- タイプ: `str`
- 説明: LDAP検索に使用するフィルタを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_USE_TLS`

- タイプ: `bool`
- デフォルト値: `True`
- 説明: LDAP接続のTLSを有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_CA_CERT_FILE`

- タイプ: `str`
- 説明: LDAP CA証明書ファイルへのパスを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_VALIDATE_CERT`

- タイプ: `bool`
- 説明: LDAP CA証明書を検証するかどうかを設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `LDAP_CIPHERS`

- タイプ: `str`
- デフォルト値: `ALL`
- 説明: LDAP接続に使用する暗号化方式を設定します。
- 永続性: この環境変数は`PersistentConfig`変数です。

## ユーザー権限

### チャット権限

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- タイプ: `bool`
- デフォルト値: `True`
- 説明: チャットコントロールへのユーザー権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- タイプ: `bool`
- デフォルト値: `True`
- 説明: ユーザーがチャットにファイルをアップロードする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_DELETE`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーがチャットを削除する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_EDIT`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーがチャットを編集する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_STT`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーがチャットで音声認識（Speech-to-Text）を使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_TTS`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーがチャットで音声合成（Text-to-Speech）を使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_CALL`

- タイプ: `str`
- デフォルト: `True`
- 説明: ユーザーがチャットで通話を行う権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- タイプ: `str`
- デフォルト: `True`
- 説明: ユーザーがチャットで複数のモデルを使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- タイプ: `bool`
- デフォルト: `True`
- 説明: ユーザーが一時的なチャットを作成する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- タイプ: `str`
- デフォルト: `False`
- 説明: ユーザーに対して強制的一時的チャットを有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

### 機能権限

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- タイプ: `str`
- デフォルト: `False`
- 説明: ユーザーが直接ツールサーバーにアクセスする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- タイプ: `str`
- デフォルト: `True`
- 説明: ユーザーがウェブ検索機能を使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- タイプ: `str`
- デフォルト: `True`
- 説明: ユーザーが画像生成機能を使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- タイプ: `str`
- デフォルト: `True`
- 説明: ユーザーがコードインタープリタ機能を使用する権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

### ワークスペース権限

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- タイプ: `bool`
- デフォルト: `False`
- 説明: ユーザーがワークスペースモデルにアクセスする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- タイプ: `bool`
- デフォルト: `False`
- 説明: ユーザーがワークスペース知識にアクセスする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- タイプ: `bool`
- デフォルト: `False`
- 説明: ユーザーがワークスペースプロンプトにアクセスする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- タイプ: `bool`
- デフォルト: `False`
- 説明: ユーザーがワークスペースツールにアクセスする権限を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- タイプ: `str`
- デフォルト: `False`
- 説明: ワークスペースモデルの公開共有を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- タイプ: `str`
- デフォルト: `False`
- 説明: ワークスペース知識の公開共有を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- タイプ: `str`
- デフォルト: `False`
- 説明: ワークスペースプロンプトの公開共有を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- タイプ: `str`
- デフォルト: `False`
- 説明: ワークスペースツールの公開共有を有効または無効にします。
- 永続性: この環境変数は`PersistentConfig`変数です。

## その他の環境変数

これらの変数は、Open WebUIに特化したものではありませんが、特定のコンテキストで価値がある場合があります。

### クラウドストレージ

#### `STORAGE_PROVIDER`

- 種類: `str`
- オプション:
  - `s3` - S3クライアントライブラリと関連する環境変数を使用し、詳細は[Amazon S3 Storage](#amazon-s3-storage)を参照
  - `gcs` - GCSクライアントライブラリと関連する環境変数を使用し、詳細は[Google Cloud Storage](#google-cloud-storage)を参照
  - `azure` - Azureクライアントライブラリと関連する環境変数を使用し、詳細は[Microsoft Azure Storage](#microsoft-azure-storage)を参照
- デフォルト: 空文字 (`' '`), これにより`local`がデフォルトになる
- 説明: ストレージプロバイダーを設定します。

#### Amazon S3ストレージ

#### `S3_ACCESS_KEY_ID`

- 種類: `str`
- 説明: S3ストレージ用のアクセスキーIDを設定します。

#### `S3_ADDRESSING_STYLE`

- 種類: `str`
- デフォルト: `None`
- 説明: S3ストレージで使用するアドレッシングスタイルを指定します（例: `path`, `virtual`）。

#### `S3_BUCKET_NAME`

- 種類: `str`
- 説明: S3ストレージのバケット名を設定します。

#### `S3_ENDPOINT_URL`

- 種類: `str`
- 説明: S3ストレージのエンドポイントURLを設定します。

#### `S3_KEY_PREFIX`

- 種類: `str`
- 説明: S3オブジェクトのキーのプレフィックスを設定します。

#### `S3_REGION_NAME`

- 種類: `str`
- 説明: S3ストレージのリージョン名を設定します。

#### `S3_SECRET_ACCESS_KEY`

- 種類: `str`
- 説明: S3ストレージ用のシークレットアクセスキーを設定します。

#### `S3_USE_ACCELERATE_ENDPOINT`

- 種類: `str`
- デフォルト: `False`
- 説明: S3ストレージで加速エンドポイントを使用するかどうかを指定します。

#### `S3_ENABLE_TAGGING`

- 種類: `str`
- デフォルト: `False`
- 説明: アップロード後のオブジェクトタグ付けを有効にして、よりよい組織化、検索、ファイル管理ポリシーとの統合を実現します。Cloudflare R2を使用している場合は必ず`False`に設定してください。R2はオブジェクトのタグ付けをサポートしていません。

#### Google Cloudストレージ

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- 種類: `str`
- 説明: Google Application Credentials JSONファイルの内容。
  - 任意 - 提供されない場合、資格情報は環境から取得されます。ローカルで実行される場合は、ユーザー資格情報が使用され、Google Compute Engine上で実行される場合はGoogleメタデータサーバーが使用されます。
  - サービスアカウント用のファイルはこの[ガイド](https://developers.google.com/workspace/guides/create-credentials#service-account)に従って生成できます。

#### `GCS_BUCKET_NAME`

- 種類: `str`
- 説明: Google Cloudストレージのバケット名を設定します。バケットは既に存在している必要があります。

#### Microsoft Azureストレージ

#### `AZURE_STORAGE_ENDPOINT`

- 種類: `str`
- 説明: AzureストレージのエンドポイントURLを設定します。

#### `AZURE_STORAGE_CONTAINER_NAME`

- 種類: `str`
- 説明: Azureストレージのコンテナ名を設定します。

#### `AZURE_STORAGE_KEY`

- 種類: `str`
- 説明: Azureストレージのアクセスキーを設定します。
  - 任意 - 提供されない場合、資格情報は環境から取得されます。ローカルで実行される場合はユーザー資格情報が使用され、Azureサービスで実行される場合はManaged Identityが使用されます。

### データベースプール

#### `DATABASE_URL`

- 種類: `str`
- デフォルト: `sqlite:///${DATA_DIR}/webui.db`
- 説明: 接続するデータベースのURLを指定します。

:::info

SQLiteとPostgresをサポートします。URLを変更しても、データベース間でデータは移行されません。
URLスキームに関するドキュメントは[こちら](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)をご覧ください。

:::

#### `DATABASE_SCHEMA`

- 種類: `str`
- デフォルト: `None`
- 説明: 接続するデータベーススキーマを指定します。

#### `DATABASE_POOL_SIZE`

- 種類: `int`
- デフォルト: `0`
- 説明: データベースプールのサイズを指定します。値が`0`の場合、プールは無効になります。

#### `DATABASE_POOL_MAX_OVERFLOW`

- 種類: `int`
- デフォルト: `0`
- 説明: データベースプールの最大オーバーフローを指定します。

:::info

この設定に関する詳細は[こちら](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)をご覧ください。

:::

#### `DATABASE_POOL_TIMEOUT`

- 種類: `int`
- デフォルト: `30`
- 説明: 接続を取得するためのデータベースプールのタイムアウト時間を秒単位で指定します。

:::info

この設定に関する詳細は[こちら](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)をご覧ください。

:::

#### `DATABASE_POOL_RECYCLE`

- 種類: `int`
- デフォルト: `3600`
- 説明: データベースプールのリサイクル時間を秒単位で指定します。

:::info

この設定に関する詳細は[こちら](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)をご覧ください。

:::

### Redis

#### `REDIS_URL`

- 種類: `str`
- 例: `redis://localhost:6379/0`
- 説明: app-state用のRedisインスタンスのURLを指定します。

:::info

Open-WebUIをマルチノード/ワーカークラスターでデプロイする際には、REDIS_URL値を設定する必要があります。設定しない場合、セッションや永続性、状態の一貫性に問題が発生し、ワーカー同士が通信できなくなります。

:::

#### `REDIS_SENTINEL_HOSTS`

- 種類: `str`
- 説明: アプリの状態のためのRedis Sentinelのコンマ区切りリスト。指定された場合、`REDIS_URL`内の「hostname」はSentinelサービス名として解釈されます。

#### `REDIS_SENTINEL_PORT`

- 種類: `int`
- デフォルト: `26379`
- 説明: アプリ状態Redis用のSentinelポート。

#### `ENABLE_WEBSOCKET_SUPPORT`

- 種類: `bool`
- デフォルト: `True`
- 説明: Open WebUIでウェブソケットサポートを有効にします。

:::info

Open-WebUIをマルチノード/ワーカークラスターで展開する場合、ENABLE_WEBSOCKET_SUPPORTの値を必ず設定する必要があります。これがないとウェブソケットの一貫性と持続性に問題が生じます。

:::

#### `WEBSOCKET_MANAGER`

- 種類: `str`
- デフォルト: `redis`
- 説明: 使用するウェブソケットマネージャーを指定します（この場合はRedis）。

:::info

Open-WebUIをマルチノード/ワーカークラスターで展開する場合、WEBSOCKET_MANAGERの値を必ず設定し、RedisのようなキーバリューノーSQLデータベースを使用するようにしてください。これがないと、ウェブソケットの一貫性と持続性に問題が生じます。

:::

#### `WEBSOCKET_REDIS_URL`

- 種類: `str`
- デフォルト: `${REDIS_URL}`
- 説明: ウェブソケット通信用RedisインスタンスのURLを指定します。`REDIS_URL`とは異なり、実際には両方を設定することをお勧めします。

:::info

Open-WebUIをマルチノード/ワーカークラスターで展開する場合、WEBSOCKET_REDIS_URLの値を必ず設定し、RedisのようなキーバリューノーSQLデータベースを使用するようにしてください。これがないと、ウェブソケットの一貫性と持続性に問題が生じます。

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- 種類: `str`
- 説明: ウェブソケット用Redis Sentinelのコンマ区切りリスト。指定された場合、`WEBSOCKET_REDIS_URL`内の「hostname」はSentinelサービス名として解釈されます。

#### `WEBSOCKET_SENTINEL_PORT`

- 種類: `int`
- デフォルト: `26379`
- 説明: ウェブソケット用Redis Sentinelのポート。

### Uvicorn設定

#### `UVICORN_WORKERS`

- 種類: `int`
- デフォルト: `1`
- 説明: Uvicornがリクエストを処理するために生成するワーカープロセスの数を制御します。各ワーカーはアプリケーションの独立したインスタンスを別々のプロセスで実行します。

:::info

KubernetesやHelmチャートのようなオーケストレートされた環境でデプロイする場合、UVICORN_WORKERSを1に設定しておくことをお勧めします。コンテナオーケストレーションプラットフォームは、ポッドの複製を通じて独自のスケーリングメカニズムを提供しており、コンテナ内で複数のワーカーを使用すると、リソースの割り当てに問題が生じたり、水平スケーリング戦略が複雑になることがあります。

UVICORN_WORKERSを使用する場合は、スケーラブルなマルチインスタンスセットアップに関連する環境変数を適切に設定する必要があります。

:::

### プロキシ設定

Open WebUIはHTTPおよびHTTPS取得のためにプロキシをサポートしています。プロキシ設定を指定するために、Open WebUIは以下の環境変数を使用します:

#### `http_proxy`

- 種類: `str`
- 説明: HTTPプロキシのURLを設定します。

#### `https_proxy`

- 種類: `str`
- 説明: HTTPSプロキシのURLを設定します。

#### `no_proxy`

- 種類: `str`
- 説明: プロキシを使用しないドメイン拡張子（またはIPアドレス）のリストをコンマ区切りで指定します。例えば、no_proxyを`.mit.edu`に設定すると、MITからのドキュメントにアクセスする際にプロキシがバイパスされます。

### 必要なPythonパッケージのインストール

Open WebUIはpipインストールプロセスをカスタマイズするための環境変数を提供します。以下は、パッケージインストールの動作を調整するためにOpen WebUIで使用される環境変数です:

#### `PIP_OPTIONS`

- 種類: `str`
- 説明: パッケージをインストールする際にpipが使用する追加のコマンドラインオプションを指定します。例えば、`--upgrade`、`--user`、または`--no-cache-dir`などのフラグを含めてインストールプロセスを制御できます。

#### `PIP_PACKAGE_INDEX_OPTIONS`

- 種類: `str`
- 説明: pipのカスタムパッケージインデックス動作を定義します。これには、追加または代替インデックスURL（例: `--extra-index-url`）、認証情報、またはパッケージを異なる場所から取得する方法を管理するための他のパラメータの指定が含まれます。
