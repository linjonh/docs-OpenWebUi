---
sidebar_position: 400
title: "🔗 API-Endpunkte"
---

Dieser Leitfaden bietet wesentliche Informationen darüber, wie Sie effektiv mit den API-Endpunkten interagieren können, um eine nahtlose Integration und Automatisierung mit unseren Modellen zu erreichen. Bitte beachten Sie, dass dies eine experimentelle Konfiguration ist und in Zukunft für Verbesserungen aktualisiert werden kann.

## Authentifizierung

Um sicheren Zugriff auf die API zu gewährleisten, ist eine Authentifizierung erforderlich 🛡️. Sie können Ihre API-Anfragen mit dem Bearer-Token-Mechanismus authentifizieren. Holen Sie sich Ihren API-Schlüssel unter **Einstellungen > Konto** in der Open WebUI oder verwenden Sie alternativ ein JWT (JSON Web Token) zur Authentifizierung.

## Wichtige API-Endpunkte

### 📜 Alle Modelle abrufen

- **Endpunkt**: `GET /api/models`
- **Beschreibung**: Ruft alle Modelle ab, die über Open WebUI erstellt oder hinzugefügt wurden.
- **Beispiel**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 Chat-Abschlüsse

- **Endpunkt**: `POST /api/chat/completions`
- **Beschreibung**: Dient als OpenAI API-kompatibler Chat-Abschluss-Endpunkt für Modelle in Open WebUI, einschließlich Ollama-Modelle, OpenAI-Modelle und Open WebUI-Funktionsmodelle.

- **Curl-Beispiel**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "Warum ist der Himmel blau?"
          }
        ]
      }
  ```
  
- **Python-Beispiel**:
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
            "content": "Warum ist der Himmel blau?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Ollama API-Proxy-Unterstützung

Wenn Sie direkt mit Ollama-Modellen interagieren möchten, einschließlich der Generierung von Einbettungen oder des Streamens von Roh-Prompts, bietet Open WebUI eine transparente Weiterleitung zur nativen Ollama API über eine Proxy-Route.

- **Basis-URL**: `/ollama/<api>`
- **Referenz**: [Ollama API-Dokumentation](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 Abschluss generieren (Streaming)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "Warum ist der Himmel blau?"
}
```

#### 📦 Verfügbare Modelle auflisten

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 Einbettungen generieren

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI ist großartig!", "Lassen Sie uns Einbettungen generieren."]
}
```

Dies ist ideal zur Erstellung von Suchindizes, Abrufsystemen oder benutzerdefinierten Pipelines unter Verwendung von Ollama-Modellen hinter der Open WebUI.

### 🧩 Informationsabruf mit Generierung (RAG)

Die Funktion "Informationsabruf mit Generierung" (RAG) ermöglicht es Ihnen, Antworten durch Einbindung von Daten aus externen Quellen zu verbessern. Nachfolgend finden Sie die Methoden zum Verwalten von Dateien und Wissenssammlungen über die API sowie zur effektiven Nutzung in Chat-Abschlüssen.

#### Dateien hochladen

Um externe Daten in RAG-Antworten einzubeziehen, müssen Sie zuerst die Dateien hochladen. Der Inhalt der hochgeladenen Datei wird automatisch extrahiert und in einer Vektordatenbank gespeichert.

- **Endpunkt**: `POST /api/v1/files/`
- **Curl-Beispiel**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Python-Beispiel**:

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

#### Dateien zu Wissenssammlungen hinzufügen

Nach dem Hochladen können Sie Dateien in einer Wissenssammlung gruppieren oder sie einzeln in Chats referenzieren.

- **Endpunkt**: `POST /api/v1/knowledge/{id}/file/add`
- **Curl-Beispiel**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Python-Beispiel**:

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

#### Verwendung von Dateien und Sammlungen in Chat-Komplettierungen

Sie können sowohl individuelle Dateien als auch ganze Sammlungen in Ihren RAG-Abfragen referenzieren, um angereicherte Antworten zu erhalten.

##### Verwendung einer individuellen Datei in Chat-Komplettierungen

Diese Methode ist vorteilhaft, wenn Sie die Antwort des Chat-Modells auf den Inhalt einer bestimmten Datei konzentrieren möchten.

- **Endpunkt**: `POST /api/chat/completions`
- **Curl-Beispiel**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Erklären Sie die Konzepte in diesem Dokument."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Python-Beispiel**:

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

##### Verwendung einer Wissenssammlung in Chat-Komplettierungen

Nutzen Sie eine Wissenssammlung, um die Antwort zu verbessern, wenn die Anfrage von einem breiteren Kontext oder mehreren Dokumenten profitieren kann.

- **Endpunkt**: `POST /api/chat/completions`
- **Curl-Beispiel**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Geben Sie Einblicke in die historischen Perspektiven in der Sammlung."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Python-Beispiel**:

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

Diese Methoden ermöglichen die effektive Nutzung von externem Wissen über hochgeladene Dateien und kuratierte Wissenssammlungen und erweitern die Fähigkeiten von Chat-Anwendungen mit der Open-WebUI-API. Egal ob Sie einzelne Dateien oder Sammlungen verwenden, Sie können die Integration basierend auf Ihren spezifischen Anforderungen anpassen.

## Vorteile von Open WebUI als einheitlicher LLM-Anbieter

Open WebUI bietet zahlreiche Vorteile, die es zu einem unverzichtbaren Werkzeug für Entwickler und Unternehmen machen:

- **Einheitliche Schnittstelle**: Vereinfachen Sie Ihre Interaktionen mit verschiedenen LLMs durch eine einzige, integrierte Plattform.
- **Einfache Implementierung**: Schnelle Integration dank umfassender Dokumentation und Unterstützung durch die Community.

## Swagger-Dokumentationslinks

:::wichtig
Stellen Sie sicher, dass die Umgebungsvariable `ENV` auf `dev` gesetzt ist, um auf die Swagger-Dokumentation für einen dieser Dienste zuzugreifen. Ohne diese Konfiguration ist die Dokumentation nicht verfügbar.
:::

Greifen Sie auf detaillierte API-Dokumentationen für die verschiedenen von Open WebUI bereitgestellten Dienste zu:

| Anwendung      | Dokumentationspfad   |
|----------------|----------------------|
| Haupt          | `/docs`              |


Durch das Befolgen dieser Richtlinien können Sie die Open-WebUI-API zügig integrieren und nutzen. Sollten Sie auf Probleme stoßen oder Fragen haben, wenden Sie sich gerne an unsere Discord-Community oder konsultieren Sie die FAQs. Viel Spaß beim Programmieren! 🌟
