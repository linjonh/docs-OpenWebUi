---
sidebar_position: 17
title: "Externo"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API de Busca Web Externa

Esta opção permite conectar o Open WebUI ao seu próprio endpoint de API de busca web autohospedado. Isso é útil se você deseja:

*   Integrar um mecanismo de busca que não é suportado nativamente pelo Open WebUI.
*   Implementar lógica de busca personalizada, filtragem ou processamento de resultados.
*   Usar um índice de busca privado ou interno.

### Configuração do Open WebUI

1.  Navegue até o `Painel de Administração` do Open WebUI.
2.  Vá para a aba `Configurações` e selecione `Busca Web`.
3.  Ative a opção `Habilitar Busca Web`.
4.  Selecione `Busca Web` no menu suspenso e escolha `externo`.
5.  Preencha o campo `URL de Busca Externa` com a URL completa do endpoint da sua API de busca personalizada (por exemplo, `http://localhost:8000/search` ou `https://minha-api-de-busca.exemplo.com/api/search`).
6.  Preencha `Chave da API de Busca Externa` com a chave secreta da API necessária para autenticar com seu endpoint de busca personalizado. Deixe em branco se o endpoint não exigir autenticação (não recomendado para endpoints públicos).
7.  Clique em `Salvar`.

![Painel de Administração do Open WebUI mostrando a configuração de Busca Externa](/images/tutorial_external_search.png)

### Especificação da API

O Open WebUI interagirá com o seu `URL de Busca Externa` da seguinte forma:

*   **Método:** `POST`
*   **Cabeçalhos:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <SUA_CHAVE_DE_API_DE_BUSCA_EXTERNA>`
*   **Corpo da Solicitação (JSON):**
    ```json
    {
      "query": "A string de consulta inserida pelo usuário",
      "count": 5 // O número máximo de resultados de busca solicitados
    }
    ```
    *   `query` (string): O termo de busca inserido pelo usuário.
    *   `count` (inteiro): O número máximo de resultados sugeridos que o Open WebUI espera. Sua API pode retornar menos resultados, se necessário.

*   **Corpo da Resposta Esperada (JSON):**
    Seu endpoint da API *deve* retornar um array JSON de objetos de resultado de busca. Cada objeto deve ter a seguinte estrutura:
    ```json
    [
      {
        "link": "URL do resultado da busca",
        "title": "Título da página de resultado da busca",
        "snippet": "Uma breve descrição ou trecho da página do resultado da busca"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... mais resultados, potencialmente até o limite solicitado
    ]
    ```
    *   `link` (string): A URL direta para o resultado da busca.
    *   `title` (string): O título da página web.
    *   `snippet` (string): Um trecho descritivo do conteúdo da página relevante para a consulta.

    Se ocorrer um erro ou nenhum resultado for encontrado, seu endpoint deve idealmente retornar um array JSON vazio `[]`.

### Exemplo de Implementação (Python/FastAPI)

Aqui está um exemplo simples de uma API de busca autohospedada usando Python com FastAPI e a biblioteca `duckduckgo-search`.

```python
import uvicorn
from fastapi import FastAPI, Header, Body, HTTPException
from pydantic import BaseModel
from duckduckgo_search import DDGS

EXPECTED_BEARER_TOKEN = "sua_chave_secreta_aqui"

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
        raise HTTPException(status_code=401, detail="Não autorizado")

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
        print(f"Erro durante a busca no DuckDuckGo: {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```