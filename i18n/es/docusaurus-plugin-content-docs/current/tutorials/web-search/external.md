---
sidebar_position: 17
title: "Externo"
---

:::advertencia
Este tutorial es una contribución de la comunidad y no es compatible con el equipo de Open WebUI. Sirve solo como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## API de Búsqueda Web Externa

Esta opción le permite conectar Open WebUI a su propio punto de acceso API de búsqueda web autohospedado. Esto es útil si desea:

*   Integrar un motor de búsqueda que no sea compatible nativamente con Open WebUI.
*   Implementar lógica de búsqueda personalizada, filtrado o procesamiento de resultados.
*   Utilizar un índice de búsqueda privado o interno.

### Configuración de Open WebUI

1.  Navegue al `Panel de Administración` de Open WebUI.
2.  Vaya a la pestaña `Configuración` y luego seleccione `Búsqueda Web`.
3.  Active `Habilitar Búsqueda Web`.
4.  Seleccione `Motor de Búsqueda Web` del menú desplegable como `external`.
5.  Complete `URL de Búsqueda Externa` con la URL completa de su punto de acceso API de búsqueda personalizada (por ejemplo, `http://localhost:8000/search` o `https://mi-api-de-busqueda.ejemplo.com/api/search`).
6.  Ingrese `Clave API de Búsqueda Externa` con la clave API secreta necesaria para autenticarse con su punto de acceso de búsqueda personalizado. Déjelo en blanco si su punto de acceso no requiere autenticación (no recomendado para puntos de acceso públicos).
7.  Haga clic en `Guardar`.

![Panel de administración de Open WebUI mostrando configuración de Búsqueda Externa](/images/tutorial_external_search.png)

### Especificación de la API

Open WebUI interactuará con su `URL de Búsqueda Externa` de la siguiente manera:

*   **Método:** `POST`
*   **Encabezados:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <SU_CLAVE_API_DE_BUSQUEDA_EXTERNA>`
*   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
      "query": "La cadena de consulta de búsqueda del usuario",
      "count": 5 // El número máximo de resultados de búsqueda solicitados
    }
    ```
    *   `query` (cadena): El término de búsqueda ingresado por el usuario.
    *   `count` (entero): El número máximo sugerido de resultados que espera Open WebUI. Su API puede devolver menos resultados si es necesario.

*   **Cuerpo de Respuesta Esperado (JSON):**
    Su punto de acceso API *debe* devolver un array JSON de objetos de resultados de búsqueda. Cada objeto debe tener la siguiente estructura:
    ```json
    [
      {
        "link": "URL del resultado de búsqueda",
        "title": "Título de la página del resultado de búsqueda",
        "snippet": "Una breve descripción o fragmento de la página del resultado de búsqueda"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... potencialmente más resultados hasta el número solicitado
    ]
    ```
    *   `link` (cadena): La URL directa al resultado de búsqueda.
    *   `title` (cadena): El título de la página web.
    *   `snippet` (cadena): Un fragmento de texto descriptivo del contenido de la página relevante para la consulta.

    Si ocurre un error o no se encuentran resultados, su punto de acceso debería idealmente devolver un array JSON vacío `[]`.

### Ejemplo de Implementación (Python/FastAPI)

Aquí hay un ejemplo simple de una API de búsqueda autohospedada utilizando Python con FastAPI y la biblioteca `duckduckgo-search`.

```python
import uvicorn
from fastapi import FastAPI, Header, Body, HTTPException
from pydantic import BaseModel
from duckduckgo_search import DDGS

EXPECTED_BEARER_TOKEN = "tu_token_secreto_aquí"

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
        raise HTTPException(status_code=401, detail="No autorizado")

    query, count = search_request.query, search_request.count

    results = []
    try:
        with DDGS() as ddgs:
            search_results = ddgs.text(
                query, safesearch="moderado", max_results=count, backend="lite"
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
        print(f"Error durante la búsqueda en DuckDuckGo: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```