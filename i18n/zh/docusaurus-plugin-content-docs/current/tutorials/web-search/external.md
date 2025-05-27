---
sidebar_position: 17
title: "外部"
---

:::警告
本教程由社区贡献，不受Open WebUI团队支持。它仅作为如何为您的特定使用案例自定义Open WebUI的演示。想要贡献？查看贡献教程。
:::

## 外部网页搜索API

该选项允许您将Open WebUI连接到您自己托管的网页搜索API端点。如果您想要:

*   集成Open WebUI原生支持之外的搜索引擎。
*   实现自定义搜索逻辑、过滤或结果处理。
*   使用私人或内部搜索索引。

### Open WebUI配置

1.  进入Open WebUI `管理面板`。
2.  转到 `设置` 标签，然后选择 `网页搜索`。
3.  将 `启用网页搜索` 切换到开启位置。
4.  从下拉菜单中设置 `网页搜索引擎` 为 `external`。
5.  在 `外部搜索URL` 中填入您的自定义搜索API端点的完整URL（例如，`http://localhost:8000/search` 或 `https://my-search-api.example.com/api/search`）。
6.  在 `外部搜索API密钥` 中填入用于与您的自定义搜索端点认证的秘密API密钥。如果端点无需认证，请留空（不建议公开端点的情况下留空）。
7.  点击 `保存`。

![Open WebUI管理面板显示外部搜索配置](/images/tutorial_external_search.png)

### API规范

Open WebUI将与您的 `外部搜索URL` 进行以下交互:

*   **方法:** `POST`
*   **请求头:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
*   **请求主体（JSON）:**
    ```json
    {
      "query": "用户输入的搜索查询字符串",
      "count": 5 // 请求的搜索结果最大数量
    }
    ```
    *   `query` (字符串): 用户输入的搜索词。
    *   `count` (整数): Open WebUI期望的建议结果最大数量。如果需要，您的API可以返回较少的结果。

*   **期望的响应主体（JSON）:**
    您的API端点 *必须* 返回一个包含搜索结果对象的JSON数组。每个对象应具有以下结构:
    ```json
    [
      {
        "link": "搜索结果的URL",
        "title": "搜索结果页面的标题",
        "snippet": "搜索结果页面中的简短描述或摘要"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... 可能还有更多结果最多达到请求的数量
    ]
    ```
    *   `link` (字符串): 搜索结果的直接URL。
    *   `title` (字符串): 网页标题。
    *   `snippet` (字符串): 页面内容中与查询相关的描述性文本片段。

    如果出现错误或未找到结果，您的端点应理想地返回一个空的JSON数组 `[]`。

### 示例实现（Python/FastAPI）

下面是一个使用Python和FastAPI以及`duckduckgo-search`库的自托管搜索API的简单示例。

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
        raise HTTPException(status_code=401, detail="未授权")

    query, count = search_request.query, search_request.count

    results = []
    try:
        with DDGS() as ddgs:
            search_results = ddgs.text(
                query, safesearch="适度", max_results=count, backend="简化"
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
        print(f"DuckDuckGo搜索过程中出错: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```