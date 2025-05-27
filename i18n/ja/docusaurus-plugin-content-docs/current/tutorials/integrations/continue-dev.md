---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode ExtensionとOpen WebUIの統合"
---

:::warning
このチュートリアルはコミュニティによる寄稿であり、Open WebUIチームによるサポートはありません。このチュートリアルは、特定のユースケースに応じてOpen WebUIをカスタマイズする方法を示すデモとしてのみ提供されています。貢献したい方はこちらの貢献チュートリアルをご覧ください。
:::

# Continue.dev VSCode ExtensionとOpen WebUIの統合

### 拡張機能のダウンロード

[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)でVSCode拡張機能をダウンロードできます。

インストールが完了すると、サイドバーに「continue」タブが表示されます。これを開いてください。

メインのチャット入力欄の上にあるアシスタントセレクターをクリックします。その後、「Local Assistant」をホバーすると設定アイコン（歯車の形）が表示されるはずです。

設定アイコンをクリックすると、`config.yaml`がエディターに開かれます。

ここで、ContinueをOpen WebUIで使用するように設定することができます。

---

現在、`ollama`プロバイダーは認証をサポートしていないため、Open WebUIと一緒に使用することはできません。

しかし、OllamaとOpen WebUIの両方がOpenAI API仕様と互換性があります。この点についてはOllamaの[ブログ記事](https://ollama.com/blog/openai-compatibility)を参照してください。

Open WebUIの認証トークンを使用できるように、Continueを`openai`プロバイダーで設定することは可能です。

---

## 設定

`config.yaml`で必要なのは以下のオプションを追加または変更することだけです。

### プロバイダーを`openai`に変更

```yaml
provider: openai
```

### `apiBase`の追加または更新

Open WebUIのドメインを指定してください。

```yaml
apiBase: http://localhost:3000/ #「Getting Started Docker」に従った場合
```

### `apiKey`の追加

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # あなたのAPIキーを入力してください
```

APIキーはOpen WebUI -> 設定 -> アカウント -> API Keys から生成および取得できます。

「API Key」をコピーしてください（sk-で始まります）。

## 設定例

`openai`プロバイダーを使用してOpen WebUIを利用するための基本的な`config.yaml`の例を以下に示します。モデルにはGranite Codeを使用しています。
事前にollamaインスタンスにモデルをプルしてください。

```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Model ABC from pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplete
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: ハイライトされたコードのためのユニットテストを作成
    prompt: |
      選択されたコードのための包括的なユニットテストを作成してください。セットアップし、正確性および重要なエッジケースを確認するテストを実行し、テストの終了処理を行います。テストは完全かつ高度なものである必要があります。テストはチャット出力として提供されるべきで、ファイルを編集しないでください。
```

`config.yaml`を保存すれば完了です。

Continueタブのモデル選択にモデルが表示されるはずです。

選択することで、Open WebUI（および設定した[パイプライン](/pipelines)）を介してチャットできるようになります。

使用したいモデルの数だけ設定可能ですが、どのモデルでも動作するものの、コード用に設計されたモデルを使用することをお勧めします。

追加設定についての詳細は、Continueのドキュメントを参照してください。[Continue Documentation](https://docs.continue.dev/reference/Model%20Providers/openai)
