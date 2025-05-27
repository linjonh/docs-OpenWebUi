---
sidebar_position: 400
title: "🔗 API 엔드포인트"
---

이 가이드는 API 엔드포인트와 효과적으로 상호작용하여 우리의 모델을 사용한 원활한 통합 및 자동화를 달성하는 데 필수적인 정보를 제공합니다. 실험적인 설정이므로 향후 업데이트 및 개선이 이루어질 수 있습니다.

## 인증

API에 안전하게 접근하기 위해 인증이 필요합니다 🛡️. Bearer 토큰 메커니즘을 사용하여 API 요청을 인증할 수 있습니다. Open WebUI의 **설정 > 계정**에서 API 키를 획득하거나, 필요시 JSON Web Token(JWT)을 사용하여 인증할 수 있습니다.

## 주요 API 엔드포인트

### 📜 모든 모델 조회

- **엔드포인트**: `GET /api/models`
- **설명**: Open WebUI를 통해 생성되거나 추가된 모든 모델을 가져옵니다.
- **예시**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 채팅 완료

- **엔드포인트**: `POST /api/chat/completions`
- **설명**: Open WebUI 모델, Ollama 모델, OpenAI 모델 및 Open WebUI 기능 모델에 대해 OpenAI API와 호환되는 채팅 완료 엔드포인트를 제공합니다.

- **Curl 예시**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "왜 하늘은 파란색인가요?"
          }
        ]
      }
  ```
  
- **Python 예시**:
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
            "content": "왜 하늘은 파란색인가요?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama API 프록시 지원

Ollama 모델과 직접 상호작용하려면(Open WebUI를 통한 임베딩 생성 또는 Raw 프롬프트 스트리밍 포함), Open WebUI는 프록시 경로를 통해 Ollama API로의 투명한 패스스루를 제공합니다.

- **기본 URL**: `/ollama/<api>`
- **참고자료**: [Ollama API 문서](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 완료 생성(스트리밍)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "왜 하늘은 파란색인가요?"
}
```

#### 📦 사용 가능한 모델 목록 조회

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 임베딩 생성

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI는 정말 뛰어나요!", "임베딩을 생성해봅시다."]
}
```

이는 검색 인덱스, 검색 시스템 또는 Open WebUI 뒤에서 Ollama 모델을 사용하는 맞춤형 파이프라인을 구축할 때 이상적입니다.

### 🧩 검색 증강 생성(RAG)

검색 증강 생성(RAG) 기능은 외부 소스에서 데이터를 통합하여 응답을 향상시킬 수 있도록 합니다. 아래에는 파일 및 지식 컬렉션을 API를 통해 관리하고 이를 채팅 완료 시 효과적으로 사용하는 방법을 설명합니다.

#### 파일 업로드

RAG 응답에 외부 데이터를 활용하려면 먼저 파일을 업로드해야 합니다. 업로드된 파일의 내용이 자동으로 추출되어 벡터 데이터베이스에 저장됩니다.

- **엔드포인트**: `POST /api/v1/files/`
- **Curl 예시**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Python 예시**:

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

#### 파일을 지식 컬렉션에 추가

업로드한 후 파일을 지식 컬렉션에 그룹화하거나 채팅에서 개별적으로 참조할 수 있습니다.

- **엔드포인트**: `POST /api/v1/knowledge/{id}/file/add`
- **Curl 예시**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Python 예시**:

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

#### 채팅 완료에서 파일 및 컬렉션 사용

RAG 쿼리를 통해 풍부한 응답을 얻기 위해 개별 파일 또는 전체 컬렉션을 참조할 수 있습니다.

##### 채팅 완료에서 개별 파일 사용

이 방법은 특정 파일의 내용을 기반으로 채팅 모델의 응답을 집중하고 싶을 때 유용합니다.

- **엔드포인트**: `POST /api/chat/completions`
- **Curl 예제**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "이 문서의 개념을 설명해주세요."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Python 예제**:

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

##### 채팅 완료에서 지식 컬렉션 사용

질문이 보다 넓은 컨텍스트 또는 여러 문서에서 혜택을 볼 수 있는 경우 응답을 강화하려면 지식 컬렉션을 활용하세요.

- **엔드포인트**: `POST /api/chat/completions`
- **Curl 예제**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "컬렉션에서 다루는 역사적 관점에 대한 통찰력을 제공해주세요."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Python 예제**:

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

이러한 방법을 통해 업로드된 파일 및 큐레이션된 지식 컬렉션을 통해 외부 지식을 효과적으로 활용할 수 있도록 하면, Open WebUI API를 사용한 채팅 애플리케이션의 기능을 개선할 수 있습니다. 파일을 개별적으로 사용하거나 컬렉션 내에서 사용하여 특정 요구에 따라 통합을 맞춤화할 수 있습니다.

## 통합적인 LLM 제공자로서의 Open WebUI 사용 이점

Open WebUI는 개발자와 기업 모두에게 필수 도구가 되는 다양한 이점을 제공합니다:

- **통합 인터페이스**: 단일 통합 플랫폼을 통해 다양한 LLM과의 상호작용을 간소화합니다.
- **쉬운 구현**: 포괄적인 문서 및 커뮤니티 지원을 통해 빠르게 통합을 시작할 수 있습니다.

## Swagger 문서 링크

:::important
이 서비스를 위한 Swagger 문서를 액세스하려면 `ENV` 환경 변수를 `dev`로 설정해야 합니다. 이 설정 없이는 문서를 사용할 수 없습니다.
:::

Open WebUI가 제공하는 다양한 서비스에 대한 상세한 API 문서에 액세스하세요:

| 애플리케이션 | 문서 경로              |
|-------------|-------------------------|
| 메인        | `/docs`                 |


위 지침을 따르면 Open WebUI API를 신속하게 통합하고 활용을 시작할 수 있습니다. 문제가 발생하거나 질문이 있으면 Discord 커뮤니티에 문의하거나 FAQ를 참조하세요. 즐거운 코딩 되세요! 🌟
