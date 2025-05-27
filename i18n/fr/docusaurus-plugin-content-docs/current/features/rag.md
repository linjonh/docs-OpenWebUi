---
sidebar_position: 11
title: "🔎 Génération Augmentée par Recherche (RAG)"
---

:::warning

Si vous utilisez **Ollama**, notez qu'il **par défaut à une longueur de contexte de 2048 tokens**. Cela signifie que les données récupérées peuvent **ne pas être utilisées du tout** parce qu'elles ne rentrent pas dans la fenêtre de contexte disponible. Pour améliorer les performances de la **Génération Augmentée par Recherche (RAG)**, vous devez **augmenter la longueur du contexte** à **8192+ tokens** dans les paramètres de votre modèle Ollama.

:::


La Génération Augmentée par Recherche (RAG) est une technologie de pointe qui améliore les capacités conversationnelles des chatbots en intégrant du contexte à partir de différentes sources. Elle fonctionne en récupérant des informations pertinentes issues d'un large éventail de sources telles que des documents locaux et distants, du contenu web, et même des sources multimédias comme les vidéos YouTube. Le texte récupéré est ensuite combiné avec un modèle RAG prédéfini et préfixé à l'invite de l'utilisateur, fournissant une réponse plus informée et contextuellement pertinente.

Un des principaux avantages de RAG est sa capacité à accéder à et intégrer des informations provenant de diverses sources, ce qui en fait une solution idéale pour des scénarios conversationnels complexes. Par exemple, lorsqu'un utilisateur pose une question relative à un document ou une page web spécifique, RAG peut récupérer et intégrer les informations pertinentes de cette source dans la réponse du chat. RAG peut également récupérer et intégrer des informations provenant de sources multimédias comme les vidéos YouTube. En analysant les transcriptions ou sous-titres de ces vidéos, RAG peut extraire des informations pertinentes et les intégrer dans la réponse.




## Intégration RAG Locale et Distante

Les documents locaux doivent d'abord être téléchargés via la section Documents de la zone de travail pour y accéder en utilisant le symbole `#` avant une requête. Cliquez sur l'URL formatée qui apparaît au-dessus de la boîte de dialogue. Une fois sélectionnée, une icône de document apparaît au-dessus de `Envoyer un message`, indiquant une récupération réussie.

Vous pouvez également charger des documents dans la zone de travail avec leur accès en commençant une invite avec `#`, suivi d'une URL. Cela peut aider à intégrer directement du contenu web dans vos conversations.

## Recherche Web pour RAG

Pour l'intégration de contenu web, commencez une requête dans une conversation avec `#`, suivi de l'URL cible. Cliquez sur l'URL formatée dans la boîte qui apparaît au-dessus de la boîte de dialogue. Une fois sélectionnée, une icône de document apparaît au-dessus de `Envoyer un message`, indiquant une récupération réussie. Open WebUI extrait et analyse les informations de l'URL si cela est possible.

:::tip
Les pages web contiennent souvent des informations superflues telles que la navigation et le pied de page. Pour de meilleurs résultats, liez à une version brute ou adaptée à la lecture de la page.
:::

## Personnalisation du Modèle RAG

Personnalisez le modèle RAG depuis le menu `Panneau d'administration` > `Paramètres` > `Documents`.

## Support d'Intégration RAG

Changez le modèle d'intégration RAG directement dans le menu `Panneau d'administration` > `Paramètres` > `Documents`. Cette fonctionnalité prend en charge les modèles Ollama et OpenAI, vous permettant d'améliorer le traitement de documents selon vos besoins.

## Citations dans la Fonctionnalité RAG

La fonctionnalité RAG permet aux utilisateurs de suivre facilement le contexte des documents fournis aux LLM avec des citations ajoutées comme points de référence. Cela garantit transparence et responsabilité dans l'utilisation des sources externes dans vos chats.

## Pipeline RAG Amélioré

La sous-fonctionnalité de recherche hybride activable pour notre fonctionnalité d'intégration RAG améliore la fonctionnalité RAG via `BM25`, avec un reclassement alimenté par `CrossEncoder`, et des seuils de scores de pertinence configurables. Cela offre une expérience RAG plus précise et adaptée à votre cas d’utilisation spécifique.

## Pipeline RAG pour YouTube

Le pipeline RAG dédié pour résumer les vidéos YouTube via des URLs vidéo permet une interaction fluide avec les transcriptions vidéo directement. Cette fonctionnalité innovante vous permet d'intégrer du contenu vidéo dans vos conversations, enrichissant ainsi votre expérience de dialogue.

## Analyse de Documents

Une variété de parseurs extrait le contenu des documents locaux et distants. Pour plus d'informations, consultez la fonction [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328).

## Intégration Google Drive

Lorsqu'elle est couplée à un projet Google Cloud avec les API Google Picker et Google Drive activées, cette fonctionnalité permet aux utilisateurs d'accéder directement à leurs fichiers Drive depuis l'interface de chat et de télécharger des documents, des diapositives, des feuilles de calcul et plus encore, les ajoutant comme contexte à votre chat. Peut être activée via le menu `Panneau d'administration` > `Paramètres` > `Documents`. Les variables d'environnement [`GOOGLE_DRIVE_API_KEY et GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) doivent être définies pour utiliser cette fonctionnalité.

### Instructions Détaillées
1. Créez un client OAuth 2.0 et configurez à la fois les origines JavaScript autorisées et l'URL de redirection autorisée à être l'URL (inclure le port si applicable) que vous utilisez pour accéder à votre instance Open-WebUI.
1. Notez l'ID client associé à ce client OAuth.
1. Assurez-vous d'activer à la fois l'API Google Drive et l'API Google Picker pour votre projet.
1. Configurez également votre application (projet) en mode Test et ajoutez votre adresse email Google Drive à la liste des utilisateurs.
1. Définissez le périmètre de permission pour inclure tout ce que ces API ont à offrir. Et comme l'application serait en mode Test, aucune vérification n'est requise par Google pour permettre à l'application d'accéder aux données des utilisateurs de test limités.
1. Allez sur la page de l'API Google Picker et cliquez sur le bouton « Créer des identifiants ».
1. Créez une clé API et sous Restrictions d'application, choisissez Sites web. Ajoutez ensuite l'URL de votre instance Open-WebUI, identique aux paramètres des origines JavaScript autorisées et des URI de redirection autorisées à l'étape 1.
1. Configurez des restrictions d'API sur la clé API pour uniquement avoir accès à l'API Google Drive et à l'API Google Picker.
1. Configurez la variable d'environnement `GOOGLE_DRIVE_CLIENT_ID` avec l'ID client du client OAuth de l'étape 2.
1. Configurez la variable d'environnement `GOOGLE_DRIVE_API_KEY` avec la valeur de la clé API configurée à l'étape 7 (et non le secret du client OAuth de l'étape 2).
1. Configurez le `GOOGLE_REDIRECT_URI` avec l'URL de mon instance Open-WebUI (incluez le port, le cas échéant).
1. Relancez ensuite votre instance Open-WebUI avec ces trois variables d'environnement.
1. Après cela, assurez-vous que Google Drive est activé dans `Panneau d'administration` < `Paramètres` < `Documents` < `Google Drive`.
