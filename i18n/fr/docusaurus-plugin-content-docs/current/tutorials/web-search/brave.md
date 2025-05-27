---
sidebar_position: 2
title: "Brave"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API Brave

### Configuration Docker Compose

Ajoutez les variables d'environnement suivantes à votre fichier `docker-compose.yaml` Open WebUI :

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "YOUR_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
