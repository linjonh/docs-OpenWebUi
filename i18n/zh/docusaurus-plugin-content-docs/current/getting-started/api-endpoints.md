---
sidebar_position: 400
title: "🔗 API 接口"
---

本指南提供了如何有效地与 API 接口交互的必要信息，以通过我们的模型实现无缝集成和自动化。请注意，这是一个实验性设置，将来可能会进行更新以优化。

## 身份验证

为了确保安全访问 API，需要进行身份验证 🛡️。您可以使用 Bearer Token 机制对 API 请求进行身份验证。从 Open WebUI 的 **设置 > 账户** 获取您的 API 密钥，或者使用 JWT（JSON Web Token）进行身份验证。

## 主要 API 接口

### 📜 获取所有模型

- **接口**: `GET /api/models`
- **描述**: 获取所有通过 Open WebUI 创建或添加的模型。
- **示例**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 聊天完成

- **接口**: `POST /api/chat/completions`
- **描述**: 用于 Open WebUI 上的模型（包括 Ollama 模型、OpenAI 模型和 Open WebUI Function 模型）的聊天完成接口，与 OpenAI API 兼容。

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
            "content": "为什么天空是蓝色的？"
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
            "content": "为什么天空是蓝色的？"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama API 代理支持

如果您希望直接与 Ollama 模型交互，包括生成嵌入或原始提示流式传输，Open WebUI 提供了一个透明的通过代理路由到原生 Ollama API 的支持。

- **基础 URL**: `/ollama/<api>`
- **参考**: [Ollama API 文档](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 生成完成（流式传输）

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "为什么天空是蓝色的？"
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
  "input": ["Open WebUI 很棒！", "让我们生成一些嵌入。"]
}
```

这非常适合使用 Open WebUI 背后的 Ollama 模型构建搜索索引、检索系统或定制管道。

### 🧩 检索增强生成（RAG）

检索增强生成（RAG）功能允许通过整合外部数据来增强响应。下面提供了通过 API 管理文件和知识集合的方法，以及如何在聊天完成中有效利用它们。

#### 上传文件

要在 RAG 响应中利用外部数据，首先需要上传文件。上传文件的内容会自动提取并存储在向量数据库中。

- **接口**: `POST /api/v1/files/`
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

#### 将文件添加到知识集合

上传后，您可以将文件分组到一个知识集合中，或者在聊天中单独引用它们。

- **接口**: `POST /api/v1/knowledge/{id}/file/add`
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

#### 在聊天补全中使用文件和集合

您可以在您的 RAG 查询中引用单个文件或整个集合，以获得更丰富的响应。

##### 在聊天补全中使用单个文件

当您希望将聊天模型的响应集中于特定文件的内容时，此方法非常有用。

- **接口**: `POST /api/chat/completions`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "解释本文档中的概念。"}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Python 示例**:

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

##### 在聊天补全中使用知识集合

当查询可能受益于更广泛的上下文或多个文档时，可以利用知识集合来增强响应。

- **接口**: `POST /api/chat/completions`
- **Curl 示例**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "提供该集合所涵盖的历史视角的洞察。"}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Python 示例**:

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

这些方法使通过上传文件和整理的知识集合有效利用外部知识成为可能，增强了使用 Open WebUI API 的聊天应用程序的功能。无论是单独使用文件还是集合，您都可以根据具体需求定制集成方式。

## 使用 Open WebUI 作为统一 LLM 提供商的优势

Open WebUI 提供了众多优势，使其成为开发人员和企业的必备工具：

- **统一界面**: 通过单一、集成的平台简化与不同 LLM 的交互。
- **简易实施**: 快速开始集成，并提供全面的文档和社区支持。

## Swagger 文档链接

:::重要
确保将 `ENV` 环境变量设置为 `dev`，以访问这些服务的 Swagger 文档。没有此配置，文档将不可用。
:::

访问 Open WebUI 提供的不同服务的详细 API 文档：

| 应用程序 | 文档路径             |
|----------|---------------------|
| 主要服务 | `/docs`             |


通过遵循这些指导，您可以迅速集成并开始使用 Open WebUI API。如果遇到任何问题或有疑问，请随时通过我们的 Discord 社区联系我们或查看常见问题解答。祝编码愉快！🌟
