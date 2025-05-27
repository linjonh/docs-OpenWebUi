---
sidebar_position: 17
title: "外部"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによってサポートされていません。これは、特定のユースケースに合わせてOpen WebUIをカスタマイズする方法のデモンストレーションとして提供されています。貢献したいですか？貢献チュートリアルをチェックしてください。
:::

## 外部ウェブ検索API

このオプションを使用すると、Open WebUIを独自のセルフホスト型ウェブ検索APIエンドポイントに接続できます。これにより次のことが可能になります:

* Open WebUIでネイティブにサポートされていない検索エンジンを統合する。
* カスタム検索ロジック、フィルタリング、または結果処理を実装する。
* プライベートまたは内部検索インデックスを使用する。

### Open WebUIのセットアップ

1. Open WebUIの`管理パネル`に移動します。
2. `設定`タブに進み、`Web検索`を選択します。
3. `ウェブ検索を有効にする`をオンに切り替えます。
4. ドロップダウンメニューから`ウェブ検索エンジン`を`外部`に設定します。
5. `外部検索URL`にカスタム検索APIエンドポイントの完全なURL（例: `http://localhost:8000/search` または `https://my-search-api.example.com/api/search`）を入力します。
6. `外部検索APIキー`には、カスタム検索エンドポイントで認証に必要な秘密のAPIキーを入力します。認証が不要な場合は空白のままにします（公開エンドポイントには推奨されません）。
7. `保存`をクリックします。

![Open WebUI管理パネルでの外部検索設定表示](/images/tutorial_external_search.png)

### API仕様

Open WebUIは次のように`外部検索URL`とやり取りします:

* **メソッド:** `POST`
* **ヘッダー:**
    * `Content-Type: application/json`
    * `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
* **リクエストボディ（JSON形式）:**
    ```json
    {
      "query": "ユーザーの検索クエリ文字列",
      "count": 5 // リクエストされた検索結果の最大数
    }
    ```
    * `query` (string): ユーザーが入力した検索用語。
    * `count` (integer): Open WebUIが期待する最大結果数。必要に応じてAPIはより少ない結果を返すことができます。

* **期待されるレスポンスボディ（JSON形式）:**
    あなたのAPIエンドポイントは検索結果オブジェクトのJSON配列を返す必要があります。各オブジェクトは以下の構造を持つ必要があります:
    ```json
    [
      {
        "link": "検索結果のURL",
        "title": "検索結果ページのタイトル",
        "snippet": "検索結果ページからの簡略な記述またはスニペット"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... 要求された結果数までの可能な補足結果
    ]
    ```
    * `link` (string): 検索結果への直接URL。
    * `title` (string): ウェブページのタイトル。
    * `snippet` (string): クエリに関連するページコンテンツからの説明的なテキストスニペット。

    エラーが発生した場合や結果が見つからない場合、エンドポイントは理想的には空のJSON配列`[]`を返すべきです。

### 実装例（Python/FastAPI）

以下は、PythonのFastAPIと`duckduckgo-search`ライブラリを使用したセルフホスト型検索APIの簡単な例です。

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
        print(f"DuckDuckGo検索中のエラー: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```