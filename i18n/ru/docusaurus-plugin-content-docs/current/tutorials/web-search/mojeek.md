---
sidebar_position: 8
title: "Mojeek"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного случая использования. Хотите внести вклад? Ознакомьтесь с учебником по внесению вкладов.
:::

## API поиска Mojeek

### Настройка

1. Пожалуйста, посетите [страницу API поиска Mojeek](https://www.mojeek.com/services/search/web-search-api/), чтобы получить `ключ API`
2. С `ключом API` откройте `панель администратора Open WebUI` и нажмите вкладку `Настройки`, затем нажмите `Веб-поиск`
3. Включите `Веб-поиск` и установите `Поисковую систему веб-поиска` в значение `mojeek`
4. Заполните поле `Ключ API поиска Mojeek` вашим `ключом API`
5. Нажмите `Сохранить`

### Настройка Docker Compose

Добавьте следующие переменные окружения в ваш файл `docker-compose.yaml` для Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
