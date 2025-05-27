---
sidebar_position: 400
title: "🔗 APIエンドポイント"
---

このガイドは、当社のモデルを使用してシームレスな統合と自動化を実現するために、APIエンドポイントとの効果的な連携方法に関する重要情報を提供します。これは実験的な設定であり、将来的に更新される可能性があることに注意してください。

## 認証

APIへの安全なアクセスを確保するため、認証が必要です🛡️。Bearer Tokenメカニズムを使用してAPIリクエストを認証することができます。APIキーは、**設定 > アカウント**（Open WebUI内）から取得するか、JSON Web Token (JWT) を使用して認証することも可能です。

## 注目すべきAPIエンドポイント

### 📜 全モデルを取得する

- **エンドポイント**: `GET /api/models`
- **説明**: Open WebUIで作成または追加されたすべてのモデルを取得します。
- **例**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 チャット完了

- **エンドポイント**: `POST /api/chat/completions`
- **説明**: Open WebUIのOllamaモデル、OpenAIモデル、そしてOpen WebUI Functionモデルを含むモデル用のOpenAI API互換のチャット完了エンドポイントとして機能します。

- **Curl例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "なぜ空は青いのですか？"
          }
        ]
      }
  ```
  
- **Python例**:
  ```python
  import requests
  
  def chat_with_model(token):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {
        "model": "granite3.1-dense:8b",
        "messages": [
          {
            "role": "user",
            "content": "なぜ空は青いのですか？"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama APIプロキシサポート

Ollamaモデルとの直接的なやり取り（埋め込み生成や生のプロンプトストリーミングを含む）を希望する場合、Open WebUIはプロキシルート経由でネイティブなOllama APIへの透過的なパススルーを提供します。

- **基本URL**: `/ollama/<api>`
- **参考**: [Ollama APIドキュメント](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 完了を生成（ストリーミング）

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "なぜ空は青いのですか？"
}
```

#### 📦 利用可能なモデル一覧

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 埋め込みを生成

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUIは素晴らしいです！", "埋め込みを生成しましょう。"]
}
```

これは、検索インデックスや検索システム、またはOpen WebUIの背後にあるOllamaモデルを使用したカスタムパイプラインの構築に最適です。

### 🧩 レトリーバル補強生成 (RAG)

レトリーバル補強生成（RAG）機能により、外部ソースからのデータを組み込んで応答を向上させることができます。以下に、APIを介してファイルや知識コレクションを管理する方法と、それらをチャット完了で効果的に使用する方法を示します。

#### ファイルのアップロード

RAG応答で外部データを利用するには、まずファイルをアップロードする必要があります。アップロードされたファイルの内容は自動的に抽出され、ベクターデータベースに保存されます。

- **エンドポイント**: `POST /api/v1/files/`
- **Curl例**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Python例**:

  ```python
  import requests
  
  def upload_file(token, file_path):
      url = http://localhost:3000/api/v1/files/
      headers = {
          Authorization: fBearer {token},
          Accept: application/json
      }
      files = {file: open(file_path, rb)}
      response = requests.post(url, headers=headers, files=files)
      return response.json()
  ```

#### 知識コレクションへのファイル追加

アップロード後、ファイルを知識コレクションにグループ化するか、個々にチャットで参照することができます。

- **エンドポイント**: `POST /api/v1/knowledge/{id}/file/add`
- **Curl例**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Python例**:

  ```python
  import requests

  def add_file_to_knowledge(token, knowledge_id, file_id):
      url = fhttp://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {file_id: file_id}
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

#### チャット完了におけるファイルとコレクションの使用

RAGクエリにおいて、豊富な回答を得るために個々のファイルやコレクション全体を参照することができます。

##### チャット完了で個別のファイルを使用する

特定のファイルのコンテンツに焦点を当ててチャットモデルの回答を生成したい場合に便利な方法です。

- **エンドポイント**: `POST /api/chat/completions`
- **Curlの例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "このドキュメントに記載されている概念を説明してください。"}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Pythonの例**:

  ```python
  import requests

  def chat_with_file(token, model, query, file_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: file, id: file_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

##### チャット完了で知識コレクションを使用する

問い合わせがより広範な文脈や複数のドキュメントを参照することで向上する場合、知識コレクションを活用します。

- **エンドポイント**: `POST /api/chat/completions`
- **Curlの例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "コレクションに記載されている歴史的観点についての洞察を提供してください。"}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Pythonの例**:

  ```python
  import requests
  
  def chat_with_collection(token, model, query, collection_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: collection, id: collection_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

これらの方法によって、アップロードされたファイルやキュレーションされた知識コレクションを効果的に活用し、Open WebUI APIを使用してチャットアプリケーションの能力を向上させることができます。個別もしくは集約されたコレクションを使用することで、特定のニーズに応じてインテグレーションをカスタマイズすることが可能です。

## Open WebUIを統合LLMプロバイダーとして使用する利点

Open WebUIは、開発者や企業にとって次のような多くの利点を提供します:

- **統一されたインターフェース**: 異なるLLMとのやり取りを簡略化し、一体型プラットフォームを提供します。
- **導入の簡易性**: 包括的なドキュメントとコミュニティサポートによる迅速な導入。

## Swaggerドキュメントリンク

:::重要
`ENV`環境変数を`dev`に設定して、これらのサービスのSwaggerドキュメントにアクセスできるようにしてください。この設定が行われていない場合は、ドキュメントにアクセスできません。
:::

Open WebUIが提供するさまざまなサービスに関する詳細なAPIドキュメントにアクセスしてください:

| アプリケーション | ドキュメントパス  |
|-----------------------------|-------------------------|
| Main        | `/docs`                 |


これらのガイドラインに従うことで、迅速にOpen WebUI APIの統合を開始し利用することができます。問題が発生したり質問がある場合は、Discordコミュニティを通じて問い合わせるか、FAQをご確認ください。楽しいコーディングを！🌟
