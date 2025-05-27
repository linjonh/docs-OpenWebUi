---
sidebar_position: 9
title: "SearchApi"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration de la personnalisation d'Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API SearchApi

[SearchApi](https://searchapi.io) est une collection d'APIs SERP en temps réel. Tout moteur SERP existant ou futur qui retourne des `organic_results` est pris en charge. Le moteur de recherche Web par défaut est `google`, mais il peut être changé pour `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` et d'autres.

### Configuration

1. Rendez-vous sur [SearchApi](https://searchapi.io) et connectez-vous ou créez un nouveau compte.
2. Accédez au `Dashboard` et copiez la clé API.
3. Avec la `clé API`, ouvrez le `panneau d'administration Open WebUI`, cliquez sur l'onglet `Paramètres`, puis cliquez sur `Recherche Web`.
4. Activez la `Recherche Web` et définissez le `moteur de recherche Web` sur `searchapi`.
5. Remplissez le champ `clé API SearchApi` avec la `clé API` que vous avez copiée à l'étape 2 depuis le tableau de bord [SearchApi](https://www.searchapi.io/).
6. [Facultatif] Entrez le nom du `moteur SearchApi` que vous souhaitez interroger. Exemple : `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar` et `google_patents.` Par défaut, il est défini sur `google`.
7. Cliquez sur `Enregistrer`.

![Panneau d'administration Open WebUI](/images/tutorial_searchapi_search.png)

#### Remarque

Vous devez activer la `Recherche Web` dans le champ de commande en utilisant le bouton plus (`+`) pour rechercher sur le Web en utilisant les moteurs [SearchApi](https://www.searchapi.io/).

![Activer la Recherche Web](/images/enable_web_search.png)
