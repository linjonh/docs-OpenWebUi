---
sidebar_position: 8
title: "Mojeek"
---

:::warning
Este tutorial es una contribución de la comunidad y no es compatible con el equipo de Open WebUI. Sirve únicamente como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Desea contribuir? Consulte el tutorial de contribución.
:::

## API de búsqueda de Mojeek

### Configuración

1. Visite la [página API de búsqueda de Mojeek](https://www.mojeek.com/services/search/web-search-api/) para obtener una `clave API`
2. Con la `clave API`, abra el `panel de administración de Open WebUI` y haga clic en la pestaña `Configuración`, luego haga clic en `Búsqueda en la Web`
3. Habilite la opción `Búsqueda en la Web` y configure el `Motor de búsqueda en la Web` a `mojeek`
4. Complete el campo `Clave API de búsqueda de Mojeek` con la `clave API`
5. Haga clic en `Guardar`

### Configuración con Docker Compose

Agregue las siguientes variables de entorno al archivo `docker-compose.yaml` de su Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "TU_CLAVE_API_MOJEEK"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
