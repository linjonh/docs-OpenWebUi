---
sidebar_position: 1
title: "Bing"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API Bing

### Configuration

1. Allez sur le [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) et créez une nouvelle ressource. Après la création, vous serez redirigé vers la page de vue d'ensemble de la ressource. De là, sélectionnez "Cliquez ici pour gérer les clés." ![cliquez ici pour gérer les clés](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. Sur la page de gestion des clés, localisez Key1 ou Key2 et copiez la clé souhaitée.
3. Ouvrez le panneau d'administration Open WebUI, passez à l'onglet Réglages, puis sélectionnez Recherche Web.
4. Activez l'option de recherche Web et définissez le moteur de recherche Web sur Bing.
5. Remplissez `SearchApi API Key` avec la `clé API` que vous avez copiée à l'étape 2 depuis le tableau de bord [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch).
6. Cliquez sur `Enregistrer`.
