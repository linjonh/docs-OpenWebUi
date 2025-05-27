---
sidebar_position: 15
title: "SerpApi"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API SerpApi

[SerpApi](https://serpapi.com/) Récupérez les résultats de Google et d'autres moteurs de recherche grâce à notre API rapide, facile et complète. Tout moteur SERP existant ou à venir qui retourne des `organic_results` est pris en charge. Le moteur de recherche par défaut est `google`, mais il peut être changé par `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` et autres.

### Configuration

1. Accédez à [SerpApi](https://serpapi.com/) et connectez-vous ou créez un nouveau compte.
2. Allez dans `Dashboard` et copiez la clé API.
3. Avec la `clé API`, ouvrez le `panneau d'administration Open WebUI`, cliquez sur l'onglet `Paramètres`, puis sur `Recherche Web`.
4. Activez la `Recherche Web` et définissez le `Moteur de Recherche Web` sur `serpapi`.
5. Remplissez le champ `Clé API SerpApi` avec la `clé API` que vous avez copiée à l'étape 2 depuis le tableau de bord de [SerpApi](https://serpapi.com/).
6. [Facultatif] Indiquez le nom du moteur SerpApi que vous voulez interroger. Exemple : `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar` et `google_patents`. Par défaut, il est défini sur `google`. Trouvez plus d'options dans la [documentation SerpApi](https://serpapi.com/dashboard).
7. Cliquez sur `Enregistrer`.

![Panneau d'administration Open WebUI](/images/tutorial_serpapi_search.png)

#### Remarque

Vous devez activer la `Recherche Web` dans le champ de saisie pour rechercher sur le web à l'aide des moteurs [SerpApi](https://serpapi.com/).

![Activer la Recherche Web](/images/enable_web_search.png)
