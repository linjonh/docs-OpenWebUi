---
sidebar_position: 17
title: "External"
---

:::warning
此教學為社群貢獻內容，並未由 Open WebUI 團隊支持。此僅作為如何為您的特定需求客製化 Open WebUI 的展示。想要貢獻？請查看貢獻教學。
:::

## 外部網頁搜尋 API

此選項允許您將 Open WebUI 連接到您自行架設的網頁搜尋 API 端點。這對於以下情況非常有用：

*   整合非 Open WebUI 原生支持的搜尋引擎。
*   實現自定義搜尋邏輯、過濾或結果處理。
*   使用私人或內部搜尋索引。

### Open WebUI 設置

1.  進入 Open WebUI 的 `管理面板`。
2.  前往 `設定` 標籤，然後選擇 `網頁搜尋`。
3.  切換 `啟用網頁搜尋` 到開啟狀態。
4.  從下拉菜單中選擇 `外部` 作為 `網頁搜尋引擎`。
5.  在 `外部搜尋 URL` 欄位中填入您的自定義搜尋 API 端點的完整網址（例如：`http://localhost:8000/search` 或 `https://my-search-api.example.com/api/search`）。
6.  在 `外部搜尋 API 金鑰` 填入與您的自定義搜尋端點進行身份驗證所需的機密 API 金鑰。如果端點不需要身份驗證（不建議對公用端點），可以留空。
7.  點擊 `儲存`。

![Open WebUI Admin panel showing External Search config](/images/tutorial_external_search.png)

### API 規範

Open WebUI 將以下列方式與您的 `外部搜尋 URL` 進行交互：

*   **方法：** `POST`
*   **標頭：**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <您的外部搜尋 API 金鑰>`
*   **請求主體（JSON）：**
    ```json
    {
      "query": "用戶的搜尋查詢字串",
      "count": 5 // 請求的最大搜尋結果數
    }
    ```
    *   `query`（字串）：用戶輸入的搜尋詞。
    *   `count`（整數）：Open WebUI 預期的建議最大返回結果數。如果需要，您的 API 可以返回較少的結果。

*   **預期的回應主體（JSON）：**
    您的 API 端點*必須*返回一個包含搜尋結果物件的 JSON 陣列。每個物件應該具有以下結構：
    ```json
    [
      {
        "link": "搜尋結果的 URL",
        "title": "搜尋結果頁面的標題",
        "snippet": "來自搜尋結果頁面的簡短描述或摘要"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... 最多可達請求的結果數量
    ]
    ```
    *   `link`（字串）：搜尋結果的直接 URL。
    *   `title`（字串）：網頁標題。
    *   `snippet`（字串）：與查詢相關的頁面內容描述或摘要。

    如果出現錯誤或未找到結果，您的端點應優先返回一個空的 JSON 陣列 `[]`。

### 示例實現（Python/FastAPI）

以下是一個使用 Python 與 FastAPI 以及 `duckduckgo-search` 庫的自架設搜尋 API 簡單範例。

```python
import uvicorn
from fastapi import FastAPI, Header, Body, HTTPException
from pydantic import BaseModel
from duckduckgo_search import DDGS

EXPECTED_BEARER_TOKEN = "your_secret_token_here"

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
        raise HTTPException(status_code=401, detail="未經授權")

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
        print(f"DuckDuckGo 搜尋時出現錯誤：{e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```