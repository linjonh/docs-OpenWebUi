---
sidebar_position: 5
title: "Google PSE"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## API Google PSE

### Configuration

1. Rendez-vous sur Google Developers, utilisez [Programmable Search Engine](https://developers.google.com/custom-search), et connectez-vous ou créez un compte.
2. Allez sur le [panneau de contrôle](https://programmablesearchengine.google.com/controlpanel/all) et cliquez sur le bouton `Ajouter`.
3. Entrez un nom de moteur de recherche, définissez les autres propriétés selon vos besoins, vérifiez que vous n'êtes pas un robot et cliquez sur le bouton `Créer`.
4. Générez une `clé API` et obtenez l'`ID du moteur de recherche`. (Disponible après la création du moteur.)
5. Avec la `clé API` et l'`ID du moteur de recherche`, ouvrez le `panneau d'administration Open WebUI` et cliquez sur l'onglet `Paramètres`, puis cliquez sur `Recherche Web`.
6. Activez `Recherche Web` et définissez `Moteur de recherche Web` sur `google_pse`.
7. Remplissez `Google PSE API Key` avec la `clé API` et `Google PSE Engine Id` (# 4).
8. Cliquez sur `Enregistrer`.

![Panneau d'administration Open WebUI](/images/tutorial_google_pse1.png)

#### Remarque

Vous devez activer `Recherche Web` dans le champ de saisie en utilisant le bouton plus (`+`).
Recherchez sur le web ;-)

![activer Recherche Web](/images/tutorial_google_pse2.png)
