---
sidebar_position: 17
title: "Externe"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie man Open WebUI für einen spezifischen Anwendungsfall anpassen kann. Möchten Sie einen Beitrag leisten? Schauen Sie sich das Beitragstutorial an.
:::

## Externe Websuch-API

Diese Option ermöglicht es Ihnen, Open WebUI mit Ihrem eigenen selbst gehosteten Websuch-API-Endpunkt zu verbinden. Dies ist nützlich, wenn Sie:

*   Eine Suchmaschine integrieren möchten, die von Open WebUI nicht nativ unterstützt wird.
*   Eigene Suchlogik, Filterung oder Ergebnisverarbeitung implementieren möchten.
*   Einen privaten oder internen Suchindex verwenden möchten.

### Einrichtung von Open WebUI

1.  Navigieren Sie zum Open WebUI `Admin-Panel`.
2.  Gehen Sie zum Tab `Einstellungen` und wählen Sie dann `Websuche`.
3.  Schalten Sie `Websuche aktivieren` in die Position `Ein`.
4.  Wählen Sie `Websuchmaschine` aus dem Dropdown-Menü und setzen Sie es auf `extern`.
5.  Füllen Sie `Externe Such-URL` mit der vollständigen URL Ihres benutzerdefinierten Such-API-Endpunkts aus (z. B. `http://localhost:8000/search` oder `https://my-search-api.example.com/api/search`).
6.  Füllen Sie `Externe Such-API-Schlüssel` mit dem geheimen API-Schlüssel aus, der erforderlich ist, um sich bei Ihrem benutzerdefinierten Suchendpunkt zu authentifizieren. Lassen Sie das Feld leer, wenn Ihr Endpunkt keine Authentifizierung erfordert (für öffentliche Endpunkte nicht empfohlen).
7.  Klicken Sie auf `Speichern`.

![Open WebUI Admin-Panel zeigt die Konfiguration der externen Suche](/images/tutorial_external_search.png)

### API-Spezifikation

Open WebUI wird mit Ihrer `Externe Such-URL` wie folgt interagieren:

*   **Methode:** `POST`
*   **Header:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <YOUR_EXTERNAL_SEARCH_API_KEY>`
*   **Anfrageinhalt (JSON):**
    ```json
    {
      "query": "Die Suchanfrage des Benutzers",
      "count": 5 // Die maximal angeforderte Anzahl von Suchergebnissen
    }
    ```
    *   `query` (string): Der vom Benutzer eingegebene Suchbegriff.
    *   `count` (integer): Die empfohlene maximale Anzahl von Ergebnissen, die Open WebUI erwartet. Ihre API kann bei Bedarf weniger Ergebnisse liefern.

*   **Erwarteter Antwortinhalt (JSON):**
    Ihr API-Endpunkt *muss* ein JSON-Array von Suchergebnisobjekten zurückgeben. Jedes Objekt sollte die folgende Struktur haben:
    ```json
    [
      {
        "link": "URL des Suchergebnisses",
        "title": "Titel der Suchergebnisseite",
        "snippet": "Eine kurze Beschreibung oder ein Auszug aus der Suchergebnisseite"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... möglicherweise weitere Ergebnisse bis zur angeforderten Anzahl
    ]
    ```
    *   `link` (string): Die direkte URL zum Suchergebnis.
    *   `title` (string): Der Titel der Webseite.
    *   `snippet` (string): Ein beschreibender Textauszug aus dem Seiteninhalt, der für die Abfrage relevant ist.

    Wenn ein Fehler auftritt oder keine Ergebnisse gefunden werden, sollte Ihr Endpunkt idealerweise ein leeres JSON-Array `[]` zurückgeben.

### Beispielimplementierung (Python/FastAPI)

Hier ist ein einfaches Beispiel für eine selbst gehostete Such-API mit Python, FastAPI und der Bibliothek `duckduckgo-search`.

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
        print(f"Fehler bei der DuckDuckGo-Suche: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```