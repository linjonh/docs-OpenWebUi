---
sidebar_position: 17
title: "Внешний"
---

:::warning
Этот учебник был создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного случая использования. Хотите внести вклад? Ознакомьтесь с учебником по внесению вклада.
:::

## Внешний API поиска в Интернете

Этот вариант позволяет подключить Open WebUI к вашему собственному API поиска в Интернете, размещённому на собственном сервере. Это полезно, если вы хотите:

*   Интегрировать поисковую систему, которая не поддерживается Open WebUI изначально.
*   Реализовать собственную логику поиска, фильтрацию или обработку результатов.
*   Использовать приватный или внутренний поисковый индекс.

### Настройка Open WebUI

1.  Перейдите в `Панель управления` Open WebUI.
2.  Перейдите к вкладке `Настройки`, затем выберите `Поиск в Интернете`.
3.  Переключите `Включить поиск в Интернете` в положение включено.
4.  Установите `Поисковую систему` из выпадающего меню в `external`.
5.  Заполните поле `URL внешнего поиска` полным URL-адресом вашего пользовательского API поиска (например, `http://localhost:8000/search` или `https://my-search-api.example.com/api/search`).
6.  Заполните поле `API-ключ внешнего поиска` секретным ключом API, необходимым для аутентификации с вашим пользовательским конечным пунктом API. Оставьте поле пустым, если ваш конечный пункт не требует аутентификации (не рекомендуется для публичных конечных пунктов).
7.  Нажмите `Сохранить`.

![Панель управления Open WebUI с настройкой внешнего поиска](/images/tutorial_external_search.png)

### Спецификация API

Open WebUI будет взаимодействовать с вашим `URL внешнего поиска` следующим образом:

*   **Метод:** `POST`
*   **Заголовки:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
*   **Тело запроса (JSON):**
    ```json
    {
      "query": "Строка поискового запроса пользователя",
      "count": 5 // Максимальное количество запрашиваемых результатов поиска
    }
    ```
    *   `query` (строка): Термин поиска, введённый пользователем.
    *   `count` (целое число): Предлагаемое максимальное количество результатов, которое ожидает Open WebUI. Ваш API может вернуть меньше результатов, если необходимо.

*   **Ожидаемое тело ответа (JSON):**
    Ваш конечный пункт API *должен* возвращать JSON-массив объектов результатов поиска. Каждый объект должен иметь следующую структуру:
    ```json
    [
      {
        "link": "URL-адрес результата поиска",
        "title": "Заголовок страницы результата поиска",
        "snippet": "Краткое описание или фрагмент с страницы результата поиска"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... возможно, больше результатов до запрашиваемого количества
    ]
    ```
    *   `link` (строка): Прямой URL-адрес результата поиска.
    *   `title` (строка): Заголовок веб-страницы.
    *   `snippet` (строка): Описательный текст или фрагмент содержимого страницы, релевантный запросу.

    Если произошла ошибка или результаты не найдены, ваш конечный пункт API должен по возможности возвращать пустой массив JSON `[]`.

### Пример реализации (Python/FastAPI)

Пример простого самодостаточного API поиска на Python с использованием FastAPI и библиотеки `duckduckgo-search`.

```python
import uvicorn
from fastapi import FastAPI, Header, Body, HTTPException
from pydantic import BaseModel
from duckduckgo_search import DDGS

EXPECTED_BEARER_TOKEN = "ваш_секретный_токен_здесь"

app = FastAPI()


class SearchRequest(BaseModel):
    query: str
    count: int


class SearchResult(BaseModel):
    link: str
    title: str | None
    snippet: str | None


@app.post("/search")
async def external_search(
    search_request: SearchRequest = Body(...),
    authorization: str | None = Header(None),
):
    expected_auth_header = f"Bearer {EXPECTED_BEARER_TOKEN}"
    if authorization != expected_auth_header:
        raise HTTPException(status_code=401, detail="Unauthorized")

    query, count = search_request.query, search_request.count

    results = []
    try:
        with DDGS() as ddgs:
            search_results = ddgs.text(
                query, safesearch="moderate", max_results=count, backend="lite"
            )

        results = [
            SearchResult(
                link=result["href"],
                title=result.get("title"),
                snippet=result.get("body"),
            )
            for result in search_results
        ]

    except Exception as e:
        print(f"Ошибка во время поиска DuckDuckGo: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```