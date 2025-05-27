---
sidebar_position: 17
title: "Externe"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API de recherche web externe

Cette option vous permet de connecter Open WebUI à votre propre point de terminaison d'API de recherche web auto-hébergée. Cela est utile si vous souhaitez :

*   Intégrer un moteur de recherche non pris en charge nativement par Open WebUI.
*   Implémenter une logique de recherche personnalisée, un filtrage ou un traitement des résultats.
*   Utiliser un index de recherche privé ou interne.

### Configuration d'Open WebUI

1.  Accédez au `Panneau d'administration` d'Open WebUI.
2.  Allez dans l'onglet `Paramètres` puis sélectionnez `Recherche web`.
3.  Basculez l'option `Activer la recherche web` en position activée.
4.  Définissez `Moteur de recherche web` depuis le menu déroulant sur `externe`.
5.  Remplissez `URL de recherche externe` avec l'URL complète de votre point de terminaison d'API de recherche personnalisé (par exemple, `http://localhost:8000/search` ou `https://my-search-api.example.com/api/search`).
6.  Remplissez `Clé API de recherche externe` avec la clé API secrète nécessaire pour s'authentifier auprès de votre point de terminaison de recherche personnalisé. Laissez vide si votre point de terminaison ne nécessite pas d'authentification (non recommandé pour les points de terminaison publics).
7.  Cliquez sur `Sauvegarder`.

![Panneau d'administration Open WebUI affichant la configuration de recherche externe](/images/tutorial_external_search.png)

### Spécification de l'API

Open WebUI interagira avec votre `URL de recherche externe` comme suit :

*   **Méthode :** `POST`
*   **En-têtes :**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <VOTRE_CLÉ_API_DE_RECHERCHE_EXTERNE>`
*   **Corps de la requête (JSON) :**
    ```json
    {
      "query": "La chaîne de requête de recherche de l'utilisateur",
      "count": 5 // Le nombre maximum de résultats de recherche demandés
    }
    ```
    *   `query` (string) : Le terme de recherche saisi par l'utilisateur.
    *   `count` (integer) : Le nombre maximum suggéré de résultats qu'Open WebUI attend. Votre API peut renvoyer moins de résultats si nécessaire.

*   **Corps de réponse attendu (JSON) :**
    Votre point de terminaison d'API *doit* renvoyer un tableau JSON d'objets de résultats de recherche. Chaque objet doit avoir la structure suivante :
    ```json
    [
      {
        "link": "URL du résultat de recherche",
        "title": "Titre de la page du résultat de recherche",
        "snippet": "Une brève description ou extrait de la page du résultat de recherche"
      },
      {
        "link": "...",
        "title": "...",
        "snippet": "..."
      }
      // ... éventuellement plus de résultats jusqu'à la quantité demandée
    ]
    ```
    *   `link` (string) : L'URL direct du résultat de recherche.
    *   `title` (string) : Le titre de la page web.
    *   `snippet` (string) : Un extrait descriptif de contenu de la page pertinent pour la requête.

    En cas d'erreur ou si aucun résultat n'est trouvé, votre point de terminaison doit idéalement renvoyer un tableau JSON vide `[]`.

### Exemple d'implémentation (Python/FastAPI)

Voici un exemple simple d'une API de recherche auto-hébergée utilisant Python avec FastAPI et la bibliothèque `duckduckgo-search`.

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
        raise HTTPException(status_code=401, detail="Non autorisé")

    query, count = search_request.query, search_request.count

    results = []
    try:
        with DDGS() as ddgs:
            search_results = ddgs.text(
                query, safesearch="modéré", max_results=count, backend="léger"
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
        print(f"Erreur lors de la recherche DuckDuckGo : {e}")

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8888)
```