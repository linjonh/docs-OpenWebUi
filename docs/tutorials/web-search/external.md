---
sidebar_position: 17
title: "外部"
---

:::warning
本教程由社区贡献，未由 Open WebUI 团队提供支持。它仅用作如何根据您的具体用例自定义 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

## 外部网页搜索 API

此选项可让您将 Open WebUI 连接到您自托管的网页搜索 API 端点。如果您希望实现以下内容，这会非常有用：

*   集成 Open WebUI 原生不支持的搜索引擎。
*   实现自定义搜索逻辑、过滤或结果处理。
*   使用私有或内部搜索索引。

### Open WebUI 配置

1.  进入 Open WebUI 的 `管理面板`。
2.  转到 `设置` 标签页，然后选择 `网页搜索`。
3.  切换 `启用网页搜索` 到开启位置。
4.  从下拉菜单中将 `网页搜索引擎` 设置为 `external`。
5.  在 `外部搜索 URL` 中填写您的自定义搜索 API 端点的完整 URL（例如，`http://localhost:8000/search` 或 `https://my-search-api.example.com/api/search`）。
6.  在 `外部搜索 API 密钥` 中填写用于认证到您的自定义搜索端点的秘密 API 密钥。如果端点不需要认证，则保持为空（不推荐公开端点)。
7.  点击 `保存`。

![Open WebUI 管理面板显示外部搜索配置](/images/tutorial_external_search.png)

### API 规范

Open WebUI 将按以下方式与您的 `外部搜索 URL` 进行交互：

*   **方法：** `POST`
*   **请求头：**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
*   **请求体（JSON）：**
    ```json
    {
      "query": "用户的搜索查询字符串",
      "count": 5 // 请求的最大搜索结果数
    }
    ```
    *   `query` (字符串)：用户输入的搜索关键词。
    *   `count` (整数)：Open WebUI 建议的最大结果数量。您的 API 如有需要可以返回更少的结果。

*   **预期响应体（JSON）：**
    您的 API 端点 *必须* 返回一个包含搜索结果对象的 JSON 数组。每个对象应符合以下结构：
    ```json
    [
      {
        "link": "搜索结果的 URL",
        "title": "搜索结果页面的标题",
        "snippet": "搜索结果页面的简短描述或摘要"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ...可能有更多结果，最多达到请求的数量
    ]
    ```
    *   `link` (字符串)：搜索结果的直接 URL。
    *   `title` (字符串)：网页标题。
    *   `snippet` (字符串)：与查询相关的页面内容的描述性文本摘要。

    如果发生错误或未找到结果，您的端点应理想地返回一个空 JSON 数组 `[]`。

### 示例实现（Python/FastAPI）

以下是使用 Python、FastAPI 和 `duckduckgo-search` 库的一个简单自托管搜索 API 示例。

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
        raise HTTPException(status_code=401, detail="未经授权")

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
        print(f"DuckDuckGo 搜索期间发生错误: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```