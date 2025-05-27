---
sidebar_position: 17
title: "External"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀의 공식 지원을 받지 않습니다. Open WebUI를 특정 사용 사례에 맞게 커스터마이즈하는 방법을 시연하는 데 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

## 외부 웹 검색 API

이 옵션은 Open WebUI를 자체적으로 호스팅하는 웹 검색 API 엔드포인트에 연결할 수 있도록 합니다. 이는 다음과 같은 경우에 유용합니다:

*   Open WebUI가 기본적으로 지원하지 않는 검색 엔진을 통합하고 싶을 때.
*   사용자 정의 검색 논리, 필터링 또는 결과 처리를 구현하고 싶을 때.
*   개인적인 또는 내부 검색 인덱스를 사용하고 싶을 때.

### Open WebUI 설정

1.  Open WebUI `관리 패널`로 이동하세요.
2.  `설정` 탭으로 이동하여 `웹 검색`을 선택하세요.
3.  `웹 검색 활성화`를 켜기 위치로 전환하세요.
4.  드롭다운 메뉴에서 `웹 검색 엔진`을 `외부`로 설정하세요.
5.  `외부 검색 URL`에 사용자 정의 검색 API 엔드포인트의 전체 URL을 입력하세요 (예: `http://localhost:8000/search` 또는 `https://my-search-api.example.com/api/search`).
6.  `외부 검색 API 키`에 사용자 정의 검색 엔드포인트와 인증할 비밀 API 키를 입력하세요. 인증이 필요 없는 엔드포인트인 경우 빈 칸을 남겨두세요 (공용 엔드포인트에서는 권장되지 않습니다).
7.  `저장`을 클릭하세요.

![Open WebUI 관리 패널에서 외부 검색 설정을 보여주는 화면](/images/tutorial_external_search.png)

### API 사양

Open WebUI는 다음과 같이 `외부 검색 URL`과 상호작용합니다:

*   **방법:** `POST`
*   **헤더:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
*   **요청 본문 (JSON):**
    ```json
    {
      "query": "사용자가 입력한 검색어 문자열",
      "count": 5 // 요청된 검색 결과의 최대 수
    }
    ```
    *   `query` (string): 사용자가 입력한 검색어.
    *   `count` (integer): Open WebUI가 기대하는 최대 결과 수. API는 필요 시 적은 결과를 반환할 수 있습니다.

*   **기대되는 응답 본문 (JSON):**
    API 엔드포인트는 검색 결과 객체의 JSON 배열을 반드시 반환해야 합니다. 각 객체는 다음 구조를 가져야 합니다:
    ```json
    [
      {
        "link": "검색 결과의 URL",
        "title": "검색 결과 페이지의 제목",
        "snippet": "검색 결과 페이지의 간단한 설명 또는 스니펫"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... 요청된 수만큼의 추가 결과
    ]
    ```
    *   `link` (string): 검색 결과로의 직접 URL.
    *   `title` (string): 웹 페이지의 제목.
    *   `snippet` (string): 쿼리와 관련된 페이지 콘텐츠의 설명 텍스트 스니펫.

    에러가 발생하거나 결과가 없을 경우, 엔드포인트는 이상적으로 빈 JSON 배열 `[]`을 반환해야 합니다.

### 예제 구현 (Python/FastAPI)

다음은 Python을 사용하여 FastAPI와 `duckduckgo-search` 라이브러리를 기반으로 한 간단한 자체 호스팅 검색 API 예제입니다.

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
        print(f"Error during DuckDuckGo search: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```