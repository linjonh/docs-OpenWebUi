---
sidebar_position: 2
title: "Valiente"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve únicamente como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## API de Brave

### Configuración de Docker Compose

Agregue las siguientes variables de entorno a su archivo `docker-compose.yaml` de Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "SU_CLAVE_API"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
