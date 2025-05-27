---
sidebar_position: 2
title: "Brave"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного случая. Хотите внести вклад? Ознакомьтесь с учебником по внесению вклада.
:::

## API Brave

### Настройка Docker Compose

Добавьте следующие переменные окружения в ваш файл `docker-compose.yaml` Open WebUI:

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
