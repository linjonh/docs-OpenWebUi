---
sidebar_position: 400
title: "🔗 API Endpoints"
---

Это руководство предоставляет основную информацию о том, как эффективно взаимодействовать с конечными точками API, чтобы обеспечить бесшовную интеграцию и автоматизацию с использованием наших моделей. Обратите внимание, что это экспериментальная настройка и в будущем могут быть внесены изменения для улучшения.

## Аутентификация

Для обеспечения безопасного доступа к API требуется аутентификация 🛡️. Вы можете аутентифицировать свои запросы к API, используя механизм Bearer Token. Получите свой ключ API, перейдя в **Настройки > Аккаунт** в Open WebUI, или, в качестве альтернативы, используйте JWT (JSON Web Token) для аутентификации.

## Основные конечные точки API

### 📜 Получить все модели

- **Конечная точка**: `GET /api/models`
- **Описание**: Получает все модели, созданные или добавленные через Open WebUI.
- **Пример**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 Завершения чата

- **Конечная точка**: `POST /api/chat/completions`
- **Описание**: Поддерживает OpenAI API для завершения чата для моделей в Open WebUI, включая модели Ollama, модели OpenAI и фунциональные модели Open WebUI.

- **Пример cURL**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "Почему небо голубое?"
          }
        ]
      }
  ```
  
- **Пример на Python**:
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
            "content": "Почему небо голубое?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Поддержка прокси Ollama API

Если вы хотите взаимодействовать непосредственно с моделями Ollama — включая генерацию эмбеддингов или потоковую передачу необработанных подсказок — Open WebUI предлагает прозрачный прокси-доступ к оригинальному API Ollama.

- **Базовый URL**: `/ollama/<api>`
- **Справка**: [Документация Ollama API](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 Генерация завершений (стриминг)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "Почему небо голубое?"
}
```

#### 📦 Список доступных моделей

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 Генерация эмбеддингов

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI замечателен!", "Давайте сгенерируем эмбеддинги."]
}
```

Это идеально подходит для создания поисковых индексов, систем извлечения данных или пользовательских конвейеров с использованием моделей Ollama в Open WebUI.

### 🧩 Ретриевал-Авгментед Генерация (RAG)

Функциональность RAG позволяет улучшать ответы, включая данные из внешних источников. Ниже приведены методы управления файлами и коллекциями знаний через API, а также их использование в завершении чатов.

#### Загрузка файлов

Чтобы использовать внешние данные в ответах RAG, сначала необходимо загрузить файлы. Содержимое загруженного файла автоматически извлекается и сохраняется в векторной базе данных.

- **Конечная точка**: `POST /api/v1/files/`
- **Пример cURL**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Пример на Python**:

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

#### Добавление файлов в коллекции знаний

После загрузки вы можете группировать файлы в коллекцию знаний или ссылаться на них индивидуально в чатах.

- **Конечная точка**: `POST /api/v1/knowledge/{id}/file/add`
- **Пример cURL**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Пример на Python**:

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

#### Использование файлов и коллекций в завершениях чата

Вы можете ссылаться как на отдельные файлы, так и на целые коллекции в ваших запросах RAG для получения богатых ответов.

##### Использование отдельного файла в завершениях чата

Этот метод полезен, если вы хотите сосредоточить ответ модели чата на содержании конкретного файла.

- **Эндпоинт**: `POST /api/chat/completions`
- **Пример с использованием Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Объясните концепции из этого документа."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Пример на Python**:

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

##### Использование коллекции знаний в завершениях чата

Используйте коллекцию знаний для улучшения ответа, если запрос может выиграть от более широкого контекста или нескольких документов.

- **Эндпоинт**: `POST /api/chat/completions`
- **Пример с использованием Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Предоставьте информацию о исторических перспективах, затронутых в коллекции."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Пример на Python**:

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

Эти методы позволяют эффективно использовать внешние знания через загруженные файлы и коллекции знаний, улучшая возможности приложений для чатов с использованием API Open WebUI. Вне зависимости от того, используете ли вы файлы индивидуально или в коллекциях, вы можете настроить интеграцию в зависимости от ваших конкретных потребностей.

## Преимущества использования Open WebUI как унифицированного провайдера LLM

Open WebUI предлагает множество преимуществ, делая его важным инструментом для разработчиков и бизнесов:

- **Унифицированный интерфейс**: Упростите взаимодействие с различными LLM через единую интегрированную платформу.
- **Простота внедрения**: Быстрое начало интеграции с подробной документацией и поддержкой сообщества.

## Ссылки на документацию Swagger

:::важно
Убедитесь, что переменная окружения `ENV` установлена в значение `dev`, чтобы получить доступ к документации Swagger для любого из этих сервисов. Без этой настройки документация будет недоступна.
:::

Получите подробную документацию API для различных сервисов, предоставляемых Open WebUI:

| Приложение   | Путь к документации     |
|-------------|-------------------------|
| Основное    | `/docs`                 |


Следуя этим рекомендациям, вы сможете быстро интегрироваться и начать использовать API Open WebUI. Если вы столкнетесь с проблемами или у вас возникнут вопросы, не стесняйтесь обращаться через наше сообщество Discord или просматривать часто задаваемые вопросы. Удачного кодирования! 🌟
