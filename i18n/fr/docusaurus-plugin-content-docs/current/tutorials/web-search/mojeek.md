---
sidebar_position: 8
title: "Mojeek"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration pour personnaliser Open WebUI selon votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API de recherche Mojeek

### Configuration

1. Veuillez visiter la [page API de recherche Mojeek](https://www.mojeek.com/services/search/web-search-api/) pour obtenir une `clé API`
2. Avec la `clé API`, ouvrez le `panneau d'administration Open WebUI` et cliquez sur l'onglet `Paramètres`, puis sur `Recherche Web`
3. Activez la `Recherche Web` et définissez `Moteur de recherche Web` sur `mojeek`
4. Remplissez le `clé API de recherche Mojeek` avec la `clé API`
5. Cliquez sur `Enregistrer`

### Configuration de Docker Compose

Ajoutez les variables d'environnement suivantes à votre fichier Open WebUI `docker-compose.yaml` :

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
