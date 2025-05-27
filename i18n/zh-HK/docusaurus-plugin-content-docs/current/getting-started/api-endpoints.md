---
sidebar_position: 400
title: "🔗 API 端點"
---

此指南提供有關如何有效與 API 端點交互的基本資訊，以使用我們的模型實現無縫整合和自動化。請注意，這是實驗性設定，未來可能會進行更新以進一步改進。

## 身份認證

為了確保安全訪問 API，需要進行身份認證 🛡️。您可以使用 Bearer Token 機制為 API 請求進行身份驗證。從 Open WebUI 的 **Settings > Account** 中獲取 API 金鑰，或者使用 JSON Web Token（JWT）進行身份驗證。

## 主要 API 端點

### 📜 獲取所有模型

- **端點**: `GET /api/models`
- **描述**: 獲取所有通過 Open WebUI 創建或添加的模型。
- **示例**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 聊天完成

- **端點**: `POST /api/chat/completions`
- **描述**: 作為 OpenAI API 兼容聊天完成端點，用於 Open WebUI 的模型，包括 Ollama 模型、OpenAI 模型和 Open WebUI Function 模型。

- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "為什麼天空是藍色的？"
          }
        ]
      }
  ```
  
- **Python 示例**:
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
            "content": "為什麼天空是藍色的？"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama API 代理支持

如果您希望直接與 Ollama 模型交互，包括嵌入生成或原始提示流式處理，Open WebUI 通過代理路由提供到原生 Ollama API 的透明通道。

- **基本 URL**: `/ollama/<api>`
- **參考**: [Ollama API 文件](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 生成完成（流式處理）

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "為什麼天空是藍色的？"
}
```

#### 📦 列出可用模型

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 生成嵌入

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI 太棒了！", "讓我們生成嵌入。"]
}
```

這非常適合使用在 Open WebUI 背後的 Ollama 模型構建搜尋索引、檢索系統或自定義管道。

### 🧩 檢索增強生成（RAG）

檢索增強生成（RAG）功能允許您通過結合來自外部來源的數據來增強響應。在下面，您將找到通過 API 管理文件和知識集合的方法，以及如何在聊天完成中有效使用它們。

#### 上傳文件

為了在 RAG 響應中使用外部數據，您首先需要上傳文件。上傳文件的內容會被自動提取並存儲在向量資料庫中。

- **端點**: `POST /api/v1/files/`
- **Curl 示例**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Python 示例**:

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

#### 將文件添加到知識集合

上傳後，您可以將文件分組到知識集合中或者在聊天中單獨引用它們。

- **端點**: `POST /api/v1/knowledge/{id}/file/add`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Python 示例**:

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

#### 在聊天補全中使用文件與集合

您可以在 RAG 查詢中引用單個文件或整個集合，以獲得更豐富的回應。

##### 在聊天補全中使用個別文件

此方法有助於集中聊天模型的回應在特定文件的內容上。

- **端點**: `POST /api/chat/completions`
- **Curl 範例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "解釋此文檔中的概念。"}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Python 範例**:

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

##### 在聊天補全中使用知識集合

使用知識集合來增強回應，特別是在詢問需要廣泛背景或多個文檔時。

- **端點**: `POST /api/chat/completions`
- **Curl 範例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "提供此集合中涵蓋的歷史觀點的見解。"}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Python 範例**:

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

這些方法使得可以有效利用外部知識，包括已上傳的文件和精心策劃的知識集合，增強聊天應用程序的能力，使用 Open WebUI API。不論是單獨使用文件或集合，您都可以根據特定需求自訂整合方式。

## 使用 Open WebUI 作為統一 LLM 提供者的優勢

Open WebUI 提供無數優勢，使其成為開發者和企業的必備工具：

- **統一介面**: 通過單一、集成平台簡化與不同 LLM 的互動。
- **實施便捷**: 快速集成，擁有完整的文檔和社群支持。

## Swagger 文檔鏈接

:::重要
請確保將 `ENV` 環境變數設置為 `dev`，以便訪問這些服務的 Swagger 文檔。如果未進行此配置，則無法取得文檔。
:::

訪問 Open WebUI 提供的不同服務的詳細 API 文檔：

| 應用程序 | 文檔路徑             |
|-------------|-------------------------|
| 主應用      | `/docs`                 |


通過遵循這些指南，您可以快速集成並開始使用 Open WebUI API。如果您遇到任何問題或有疑問，請隨時通過我們的 Discord 社群聯繫我們，或查閱常見問題解答。祝您編程愉快！🌟
