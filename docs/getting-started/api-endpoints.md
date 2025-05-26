---
sidebar_position: 400
title: "🔗 API 端点"
---

本指南提供了有关如何有效地与 API 端点交互以实现无缝集成和利用我们的模型进行自动化的基本信息。请注意，这是一个实验性设置，可能会在未来进行更新以增强功能。

## 认证

为了确保安全访问 API，需要进行身份认证 🛡️。您可以使用 Bearer Token 机制对您的 API 请求进行认证。请从 Open WebUI 的 **设置 > 帐户** 获取您的 API 密钥，或者使用 JWT（JSON Web Token）进行认证。

## 主要 API 端点

### 📜 检索所有模型

- **端点**: `GET /api/models`
- **描述**: 获取通过 Open WebUI 创建或添加的所有模型。
- **示例**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 聊天完成

- **端点**: `POST /api/chat/completions`
- **描述**: 一个与 OpenAI API 兼容的聊天完成端点，支持 Open WebUI 的模型，包括 Ollama 模型、OpenAI 模型和 Open WebUI 功能模型。

- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d &apos;{
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "为什么天空是蓝色的？"
          }
        ]
      }&apos;
  ```
  
- **Python 示例**:
  ```python
  import requests
  
  def chat_with_model(token):
      url = &apos;http://localhost:3000/api/chat/completions&apos;
      headers = {
          &apos;Authorization&apos;: f&apos;Bearer {token}&apos;,
          &apos;Content-Type&apos;: &apos;application/json&apos;
      }
      data = {
        "model": "granite3.1-dense:8b",
        "messages": [
          {
            "role": "user",
            "content": "为什么天空是蓝色的？"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama API 代理支持

如果您希望直接与 Ollama 模型交互（包括生成嵌入或原始提示流），Open WebUI 提供了一条透明的代理路由，传递到原生的 Ollama API。

- **基础 URL**: `/ollama/<api>`
- **参考文档**: [Ollama API 文档](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 生成完成（流式）

```bash
curl http://localhost:3000/ollama/api/generate -d &apos;{
  "model": "llama3.2",
  "prompt": "为什么天空是蓝色的？"
}&apos;
```

#### 📦 列出可用模型

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 生成嵌入

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d &apos;{
  "model": "llama3.2",
  "input": ["Open WebUI 很棒！", "让我们生成嵌入。"]
}&apos;
```

这非常适合使用 Ollama 模型在 Open WebUI 背后构建搜索索引、检索系统或自定义管道。

### 🧩 检索增强生成 (RAG)

检索增强生成 (RAG) 功能允许通过整合来自外部数据源的数据来增强响应。以下是通过 API 管理文件和知识集合的方法，以及在聊天完成中有效使用它们的方法。

#### 上传文件

若要在 RAG 响应中使用外部数据，您需要先上传文件。上传文件的内容会自动提取并存储在一个向量数据库中。

- **端点**: `POST /api/v1/files/`
- **Curl 示例**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Python 示例**:

  ```python
  import requests
  
  def upload_file(token, file_path):
      url = &apos;http://localhost:3000/api/v1/files/&apos;
      headers = {
          &apos;Authorization&apos;: f&apos;Bearer {token}&apos;,
          &apos;Accept&apos;: &apos;application/json&apos;
      }
      files = {&apos;file&apos;: open(file_path, &apos;rb&apos;)}
      response = requests.post(url, headers=headers, files=files)
      return response.json()
  ```

#### 将文件添加到知识集合

上传文件后，您可以将文件分组到一个知识集合中，也可以在聊天中单独引用它们。

- **端点**: `POST /api/v1/knowledge/{id}/file/add`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d &apos;{"file_id": "your-file-id-here"}&apos;
  ```

- **Python 示例**:

  ```python
  import requests

  def add_file_to_knowledge(token, knowledge_id, file_id):
      url = f&apos;http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add&apos;
      headers = {
          &apos;Authorization&apos;: f&apos;Bearer {token}&apos;,
          &apos;Content-Type&apos;: &apos;application/json&apos;
      }
      data = {&apos;file_id&apos;: file_id}
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

#### 在聊天完成中使用文件和集合

您可以在RAG查询中参考单个文件或整个集合，以获取丰富的响应。

##### 在聊天完成中使用单个文件

当您希望将聊天模型的响应集中在特定文件的内容上时，此方法非常有用。

- **端点**: `POST /api/chat/completions`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d &apos;{
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "解释此文档中的概念。"}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }&apos;
  ```

- **Python 示例**:

  ```python
  import requests

  def chat_with_file(token, model, query, file_id):
      url = &apos;http://localhost:3000/api/chat/completions&apos;
      headers = {
          &apos;Authorization&apos;: f&apos;Bearer {token}&apos;,
          &apos;Content-Type&apos;: &apos;application/json&apos;
      }
      payload = {
          &apos;model&apos;: model,
          &apos;messages&apos;: [{&apos;role&apos;: &apos;user&apos;, &apos;content&apos;: query}],
          &apos;files&apos;: [{&apos;type&apos;: &apos;file&apos;, &apos;id&apos;: file_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

##### 在聊天完成中使用知识集合

利用知识集合可以增强响应，尤其当查询可能受益于更广泛的上下文或多个文档时。

- **端点**: `POST /api/chat/completions`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d &apos;{
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "提供关于集合中涵盖的历史观点的见解。"}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }&apos;
  ```

- **Python 示例**:

  ```python
  import requests
  
  def chat_with_collection(token, model, query, collection_id):
      url = &apos;http://localhost:3000/api/chat/completions&apos;
      headers = {
          &apos;Authorization&apos;: f&apos;Bearer {token}&apos;,
          &apos;Content-Type&apos;: &apos;application/json&apos;
      }
      payload = {
          &apos;model&apos;: model,
          &apos;messages&apos;: [{&apos;role&apos;: &apos;user&apos;, &apos;content&apos;: query}],
          &apos;files&apos;: [{&apos;type&apos;: &apos;collection&apos;, &apos;id&apos;: collection_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

这些方法使得通过上传的文件和精心策划的知识集合有效利用外部知识成为可能，从而增强使用Open WebUI API的聊天应用程序的功能。无论是单独使用文件还是使用集合，您都可以根据具体需求自定义集成。

## 使用Open WebUI作为统一LLM提供者的优势

Open WebUI提供了多种优势，使其成为开发者和企业的必备工具：

- **统一界面**: 通过单一集成平台简化与不同LLM的交互。
- **实现简单**: 快速开始集成，拥有全面的文档和社区支持。

## Swagger文档链接

:::important
确保将`ENV`环境变量设置为`dev`，以便访问这些服务的Swagger文档。如果没有此配置，文档将不可用。
:::

访问Open WebUI提供的不同服务的详细API文档：

| 应用程序     | 文档路径               |
|-------------|-------------------------|
| 主应用       | `/docs`                |


按照这些指南，您可以快速集成并开始使用Open WebUI API。如果您遇到任何问题或有疑问，请通过我们的Discord社区联系我们，或者查阅常见问题解答。祝您编码愉快！🌟
