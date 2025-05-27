---
sidebar_position: 400
title: "🔗 Puntos Finales de API"
---

Esta guía proporciona información esencial sobre cómo interactuar efectivamente con los puntos finales de la API para lograr una integración y automatización sin problemas utilizando nuestros modelos. Tenga en cuenta que este es un entorno experimental y puede estar sujeto a futuras actualizaciones para mejoras.

## Autenticación

Para garantizar un acceso seguro a la API, se requiere autenticación 🛡️. Puede autenticar sus solicitudes de API utilizando el mecanismo Bearer Token. Obtenga su clave de API desde **Configuración > Cuenta** en la interfaz web abierta, o alternativamente, use un JWT (Token Web JSON) para la autenticación.

## Puntos Finales Destacados de la API

### 📜 Recuperar Todos los Modelos

- **Punto Final**: `GET /api/models`
- **Descripción**: Recupera todos los modelos creados o agregados mediante la interfaz web abierta.
- **Ejemplo**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 Completaciones de Chat

- **Punto Final**: `POST /api/chat/completions`
- **Descripción**: Actúa como un punto final de completación de chat compatible con la API de OpenAI para modelos en la interfaz web abierta, incluidos los modelos de Ollama, modelos de OpenAI y modelos de Función de Open WebUI.

- **Ejemplo Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "¿Por qué el cielo es azul?"
          }
        ]
      }
  ```
  
- **Ejemplo Python**:
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
            "content": "¿Por qué el cielo es azul?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Soporte Proxy de API de Ollama

Si desea interactuar directamente con modelos de Ollama, incluidos los casos de generación de incrustaciones o transmisión de prompts sin procesar, Open WebUI ofrece un paso transparente a la API nativa de Ollama mediante una ruta proxy.

- **URL Base**: `/ollama/<api>`
- **Referencia**: [Documentación de API de Ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 Generar Completación (Streaming)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "¿Por qué el cielo es azul?"
}
```

#### 📦 Listar Modelos Disponibles

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 Generar Incrustaciones

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI es genial!", "Vamos a generar incrustaciones."]
}
```

Esto es ideal para construir índices de búsqueda, sistemas de recuperación o tuberías personalizadas utilizando modelos de Ollama detrás de la interfaz web abierta.

### 🧩 Generación Aumentada por Recuperación (RAG)

La función Generación Aumentada por Recuperación (RAG) le permite mejorar las respuestas incorporando datos de fuentes externas. A continuación, encontrará los métodos para gestionar archivos y colecciones de conocimientos mediante la API, y cómo usarlos eficazmente en las completaciones de chat.

#### Carga de Archivos

Para utilizar datos externos en respuestas RAG, primero debe cargar los archivos. El contenido del archivo cargado se extrae automáticamente y se almacena en una base de datos vectorial.

- **Punto Final**: `POST /api/v1/files/`
- **Ejemplo Curl**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Ejemplo Python**:

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

#### Agregar Archivos a Colecciones de Conocimientos

Después de cargar, puede agrupar archivos en una colección de conocimientos o referenciarlos individualmente en chats.

- **Punto Final**: `POST /api/v1/knowledge/{id}/file/add`
- **Ejemplo Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Ejemplo Python**:

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

#### Uso de archivos y colecciones en finalizaciones de chat

Puedes referenciar tanto archivos individuales como colecciones completas en tus consultas RAG para obtener respuestas enriquecidas.

##### Utilización de un archivo individual en finalizaciones de chat

Este método es beneficioso cuando deseas enfocar la respuesta del modelo de chat en el contenido de un archivo específico.

- **Endpoint**: `POST /api/chat/completions`
- **Ejemplo en Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Explica los conceptos en este documento."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Ejemplo en Python**:

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

##### Utilización de una colección de conocimiento en finalizaciones de chat

Aprovecha una colección de conocimiento para mejorar la respuesta cuando la consulta pueda beneficiarse de un contexto más amplio o de múltiples documentos.

- **Endpoint**: `POST /api/chat/completions`
- **Ejemplo en Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Proporciona información sobre las perspectivas históricas cubiertas en la colección."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Ejemplo en Python**:

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

Estos métodos permiten la utilización efectiva de conocimientos externos mediante archivos subidos y colecciones de conocimiento, mejorando las capacidades de las aplicaciones de chat mediante la API de Open WebUI. Ya sea utilizando archivos individualmente o dentro de colecciones, puedes personalizar la integración según tus necesidades específicas.

## Ventajas de usar Open WebUI como un proveedor unificado de LLM

Open WebUI ofrece una multitud de beneficios, convirtiéndose en una herramienta esencial para desarrolladores y empresas por igual:

- **Interfaz Unificada**: Simplifica tus interacciones con diferentes LLMs a través de una plataforma única e integrada.
- **Facilidad de Implementación**: Integración rápida con documentación completa y soporte comunitario.

## Enlaces de documentación Swagger

:::importante
Asegúrate de configurar la variable de entorno `ENV` en `dev` para acceder a la documentación Swagger de cualquiera de estos servicios. Sin esta configuración, la documentación no estará disponible.
:::

Accede a la documentación detallada de la API para los diferentes servicios proporcionados por Open WebUI:

| Aplicación | Ruta de la Documentación |
|------------|-------------------------|
| Principal  | `/docs`                 |


Siguiendo estas pautas, puedes integrar y comenzar a utilizar la API de Open WebUI rápidamente. Si encuentras algún problema o tienes preguntas, no dudes en comunicarte a través de nuestra Comunidad de Discord o consultar las preguntas frecuentes. ¡Feliz programación! 🌟
