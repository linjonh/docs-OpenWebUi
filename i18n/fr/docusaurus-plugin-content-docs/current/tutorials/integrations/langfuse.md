---
sidebar_position: 20
title: "💥 Surveillance et Débogage avec Langfuse"
---

# Intégration de Langfuse avec Open WebUI

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) offre une observabilité et des évaluations open source pour Open WebUI. En activant l'intégration Langfuse, vous pouvez tracer les données de votre application avec Langfuse pour développer, surveiller et améliorer l'utilisation d'Open WebUI, y compris :

- [Traces](https://langfuse.com/docs/tracing) de l'application
- Modèles d'utilisation
- Données de coût par utilisateur et modèle
- Sessions de relecture pour déboguer les problèmes
- [Évaluations](https://langfuse.com/docs/scores/overview)

## Comment intégrer Langfuse avec Open WebUI

![Intégration Langfuse](https://langfuse.com/images/docs/openwebui-integration.gif)
_Étapes d'intégration de Langfuse_

[Pipelines](https://github.com/open-webui/pipelines/) dans Open WebUI est un cadre agnostique de l'interface utilisateur pour les plugins OpenAI API. Il permet l'injection de plugins qui interceptent, traitent et transmettent les invites des utilisateurs au modèle linguistique final, offrant un contrôle et une personnalisation renforcés de la gestion des invites.

Pour tracer vos données d'application avec Langfuse, vous pouvez utiliser le [pipeline Langfuse](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py), qui permet une surveillance et une analyse en temps réel des interactions de messages.

## Guide de démarrage rapide

### Étape 1 : Configuration d'Open WebUI

Assurez-vous qu'Open WebUI est en cours d'exécution. Pour ce faire, consultez la [documentation Open WebUI](https://docs.openwebui.com/).

### Étape 2 : Configuration des Pipelines

Lancez [Pipelines](https://github.com/open-webui/pipelines/) en utilisant Docker. Utilisez la commande suivante pour démarrer les Pipelines :

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### Étape 3 : Connecter Open WebUI aux Pipelines

Dans les _Paramètres Administratifs_, créez et enregistrez une nouvelle connexion de type API OpenAI avec les détails suivants :

- **URL :**`http://host.docker.internal:9099` (c'est là que le conteneur Docker lancé précédemment s'exécute).
- **Mot de passe :** 0p3n-w3bu! (mot de passe standard)

![Paramètres Open WebUI](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### Étape 4 : Ajouter le pipeline de filtre Langfuse

Ensuite, dans les _Paramètres Administratifs_ -> _Pipelines_, ajoutez le pipeline de filtre Langfuse. Spécifiez que Pipelines écoute sur`http://host.docker.internal:9099` (comme configuré précédemment) et installez le [pipeline de filtre Langfuse](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py) en utilisant l'option _Install from Github URL_ avec l'URL suivante :

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

Ajoutez ensuite vos clés API Langfuse ci-dessous. Si vous ne vous êtes pas encore inscrit à Langfuse, vous pouvez obtenir vos clés API en créant un compte [ici](https://cloud.langfuse.com).

![Ajouter le Pipeline Langfuse dans Open WebUI](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**Note :** Pour capturer l'utilisation (décompte de tokens) des modèles OpenAI tout en activant le streaming, vous devez naviguer vers les paramètres du modèle dans Open WebUI et cocher la case "Usage" [ci-dessous](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586) _Capacités_._

### Étape 5 : Voir vos traces dans Langfuse

Vous pouvez maintenant interagir avec votre application Open WebUI et voir les traces dans Langfuse.

[Exemple de trace](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) dans l'interface Langfuse :

![Exemple de Trace Open WebUI dans Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## En savoir plus

Pour un guide complet sur les Pipelines Open WebUI, consultez [ce post](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/).
