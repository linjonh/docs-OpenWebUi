---
sidebar_position: 9
title: "SearchApi"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только примером настройки Open WebUI для вашего конкретного случая использования. Хотите внести вклад? Ознакомьтесь с учебником по участию.
:::

## API SearchApi

[SearchApi](https://searchapi.io) — это коллекция API для поисковых систем в реальном времени. Поддерживаются любые существующие или появляющиеся поисковые системы, которые возвращают `organic_results`. По умолчанию веб-поисковая система — `google`, но ее можно изменить на `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` и другие.

### Настройка

1. Перейдите на [SearchApi](https://searchapi.io) и войдите в систему или создайте новую учетную запись.
2. Перейдите в `Dashboard` и скопируйте API-ключ.
3. Используя `API key`, откройте `Open WebUI Admin panel`, нажмите на вкладку `Settings`, а затем на `Web Search`.
4. Включите `Web search` и установите `Web Search Engine` в значение `searchapi`.
5. Заполните поле `SearchApi API Key` используя `API key`, который вы скопировали на шаге 2 из панели [SearchApi](https://www.searchapi.io/).
6. [Необязательно] Введите имя `SearchApi engine`, которое вы хотите использовать для запроса, например, `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar` и `google_patents.` По умолчанию установлен `google`.
7. Нажмите `Save`.

![Панель администратора Open WebUI](/images/tutorial_searchapi_search.png)

#### Примечание

Вы должны включить `Web search` в поле запроса, используя кнопку плюс (`+`), чтобы осуществлять поиск в интернете с помощью механизмов [SearchApi](https://www.searchapi.io/).

![включить Web search](/images/enable_web_search.png)
