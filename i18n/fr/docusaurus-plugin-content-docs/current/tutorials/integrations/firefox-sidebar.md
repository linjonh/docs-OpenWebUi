---
sidebar_position: 4100
title: "🦊 Barre latérale Chatbot AI Firefox"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la personnalisation d'Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

## 🦊 Barre latérale Chatbot AI Firefox

# Intégration d'Open WebUI en tant qu'assistant de navigation AI Chatbot local dans Mozilla Firefox

## Prérequis

Avant d'intégrer Open WebUI en tant qu'assistant de navigation AI Chatbot dans Mozilla Firefox, assurez-vous d'avoir :

* URL de l'instance Open WebUI (locale ou domaine)
* Navigateur Firefox installé

## Activation du Chatbot AI dans Firefox

1. Cliquez sur le bouton hamburger (trois lignes horizontales en haut à droite, juste en dessous du bouton `X`)
2. Ouvrez les paramètres de Firefox
2. Cliquez sur la section `Firefox Labs`
3. Activez l'option `Chatbot AI`

Alternativement, vous pouvez activer le Chatbot AI via la page `about:config` (décrit dans la section suivante).

## Configuration des paramètres about:config

1. Saisissez `about:config` dans la barre d'adresse de Firefox
2. Cliquez sur `Accepter les risques et continuer`
3. Recherchez `browser.ml.chat.enabled` et activez-le à `true` s'il n'est pas déjà activé via Firefox Labs
4. Recherchez `browser.ml.chat.hideLocalhost` et activez-le à `false`

### browser.ml.chat.prompts.#

Pour ajouter des invites personnalisées, suivez ces étapes :

1. Recherchez `browser.ml.chat.prompts.#` (remplacez `#` par un chiffre, par exemple, `0`, `1`, `2`, etc.)
2. Cliquez sur le bouton `+` pour ajouter une nouvelle invite
3. Entrez l'étiquette de l'invite, la valeur et l'ID (par exemple, `{"id":"Mon invite", "value": "Ceci est mon invite personnalisée.", "label": "Mon invite"}`)
4. Répétez le processus pour ajouter autant d'invites que vous le souhaitez

### browser.ml.chat.provider

1. Recherchez `browser.ml.chat.provider`
2. Entrez l'URL de votre instance Open WebUI, y compris les paramètres optionnels (par exemple, `https://mon-instance-open-webui.com/?model=assistant-de-navigation&temporary-chat=true&tools=jina_web_scrape`)

## Paramètres d'URL pour Open WebUI

Les paramètres d'URL suivants peuvent être utilisés pour personnaliser votre instance Open WebUI :

### Modèles et sélection de modèles

* `models`: Spécifiez plusieurs modèles (liste séparée par des virgules) pour la session de chat (par exemple, `/?models=model1,model2`)
* `model`: Spécifiez un seul modèle pour la session de chat (par exemple, `/?model=model1`)

### Transcription YouTube

* `youtube`: Fournissez l'identifiant d'une vidéo YouTube pour transcrire la vidéo dans le chat (par exemple, `/?youtube=VIDEO_ID`)

### Recherche sur le Web

* `web-search`: Activez la fonctionnalité de recherche sur le Web en définissant ce paramètre à `true` (par exemple, `/?web-search=true`)

### Sélection des outils

* `tools` ou `tool-ids`: Spécifiez une liste séparée par des virgules d'identifiants d'outils à activer dans le chat (par exemple, `/?tools=outil1,outil2` ou `/?tool-ids=outil1,outil2`)

### Superposition d'appel

* `call`: Activez une superposition vidéo ou appel dans l'interface de chat en définissant ce paramètre à `true` (par exemple, `/?call=true`)

### Invite de requête initiale

* `q`: Définissez une requête initiale ou une invite pour le chat (par exemple, `/?q=Bonjour%20à%20vous`)

### Sessions de chat temporaires

* `temporary-chat`: Marquez le chat comme une session temporaire en définissant ce paramètre à `true` (par exemple, `/?temporary-chat=true`)

Consultez https://docs.openwebui.com/features/chat-features/url-params pour plus d'informations sur les paramètres d'URL et leur utilisation.

## Paramètres supplémentaires de about:config

Les paramètres suivants de `about:config` peuvent être ajustés pour une personnalisation supplémentaire :

* `browser.ml.chat.shortcuts`: Activez les raccourcis personnalisés pour la barre latérale du Chatbot AI
* `browser.ml.chat.shortcuts.custom`: Activez les touches de raccourcis personnalisées pour la barre latérale du Chatbot AI
* `browser.ml.chat.shortcuts.longPress`: Définissez le délai de pression prolongée pour les touches de raccourcis
* `browser.ml.chat.sidebar`: Activez la barre latérale du Chatbot AI
* `browser.ml.checkForMemory`: Vérifiez la mémoire disponible avant de charger les modèles
* `browser.ml.defaultModelMemoryUsage`: Définissez l'utilisation mémoire par défaut pour les modèles
* `browser.ml.enable`: Activez les fonctionnalités de machine learning dans Firefox
* `browser.ml.logLevel`: Définissez le niveau de journalisation des fonctionnalités de machine learning
* `browser.ml.maximumMemoryPressure`: Définissez le seuil maximal de pression sur la mémoire
* `browser.ml.minimumPhysicalMemory`: Définissez la mémoire physique minimale requise
* `browser.ml.modelCacheMaxSize`: Définissez la taille maximale du cache des modèles
* `browser.ml.modelCacheTimeout`: Définissez le délai d'expiration du cache des modèles
* `browser.ml.modelHubRootUrl`: Définissez l'URL racine du hub de modèles
* `browser.ml.modelHubUrlTemplate`: Définissez le modèle d'URL du hub de modèles
* `browser.ml.queueWaitInterval`: Définissez l'intervalle d'attente en file d'attente
* `browser.ml.queueWaitTimeout`: Définissez le délai d'attente en file d'attente

## Accéder à la barre latérale du Chatbot AI

Pour accéder à la barre latérale du Chatbot AI, utilisez l'une des méthodes suivantes :

* Appuyez sur `CTRL+B` pour ouvrir la barre latérale des favoris et passer au Chatbot AI
* Appuyez sur `CTRL+Alt+X` pour ouvrir directement la barre latérale du Chatbot AI