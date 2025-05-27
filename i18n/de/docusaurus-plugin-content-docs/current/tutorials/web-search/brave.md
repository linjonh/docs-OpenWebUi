---
sidebar_position: 2
title: "Brave"
---

:::warning
Dieses Tutorial ist ein Beitrag aus der Community und wird nicht vom Open-WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Mitwirken an.
:::

## Brave API

### Docker-Compose-Setup

Fügen Sie die folgenden Umgebungsvariablen zur Datei `docker-compose.yaml` Ihrer Open-WebUI-Umgebung hinzu:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "YOUR_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
