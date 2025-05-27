---
sidebar_position: 15
title: "SerpApi"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он используется только в качестве демонстрации того, как настроить Open WebUI для вашего конкретного варианта использования. Хотите внести свой вклад? Ознакомьтесь с руководством по вкладу.
:::

## API SerpApi

[SerpApi](https://serpapi.com/) Скрапинг Google и других поисковых систем через наш быстрый, простой и полный API. Поддерживаются все существующие или планируемые поисковые движки SERP, которые возвращают `organic_results`. По умолчанию используется поисковая система `google`, но ее можно изменить на `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` и другие.

### Настройка

1. Перейдите на [SerpApi](https://serpapi.com/), войдите или создайте новую учетную запись.
2. Зайдите в `Dashboard` и скопируйте API-ключ.
3. С помощью `API key` откройте `Open WebUI Admin panel`, затем кликните на вкладку `Settings`, а затем на `Web Search`.
4. Включите `Web search` и установите `Web Search Engine` в `serpapi`.
5. В поле `SerpApi API Key` вставьте `API key`, который вы скопировали на шаге 2 из [SerpApi](https://serpapi.com/) dashboard.
6. [Необязательно] Введите название движка `SerpApi`, который вы хотите использовать для запросов. Например, `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar` и `google_patents`. По умолчанию установлено значение `google`. Найдите больше вариантов в [документации SerpApi](https://serpapi.com/dashboard).
7. Нажмите `Save`.

![Open WebUI Admin panel](/images/tutorial_serpapi_search.png)

#### Примечание

Вы должны включить `Web search` в поле запроса, чтобы использовать поисковые движки [SerpApi](https://serpapi.com/).

![enable Web search](/images/enable_web_search.png)
