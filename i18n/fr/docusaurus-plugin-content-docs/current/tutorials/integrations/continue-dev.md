---
sidebar_position: 13
title: "⚛️ Extension VSCode Continue.dev avec Open WebUI"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

# Intégration de l'extension VSCode Continue.dev avec Open WebUI

### Télécharger l'extension

Vous pouvez télécharger l'extension VSCode ici sur le [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)

Une fois installée, vous devriez maintenant avoir un onglet continue dans la barre latérale. Ouvrez-le.

Cliquez sur le sélecteur Assistant au-dessus de la zone principale de saisie de chat. Ensuite, passez la souris sur "Assistant Local" et vous devriez voir une icône de réglages (ressemble à un engrenage).

Une fois que vous cliquez sur l'icône de réglages, un fichier `config.yaml` devrait s'ouvrir dans l'éditeur.

Ici, vous pourrez configurer Continue pour utiliser Open WebUI.

---

Actuellement, le fournisseur ollama ne prend pas en charge l'authentification, nous ne pouvons donc pas utiliser ce fournisseur avec Open WebUI.

Cependant, Ollama et Open WebUI sont tous deux compatibles avec la spécification de l'API OpenAI. Vous pouvez consulter un article de blog de Ollama [ici](https://ollama.com/blog/openai-compatibility) à ce sujet.

Nous pouvons tout de même configurer Continue pour utiliser le fournisseur OpenAI, ce qui nous permettra d'utiliser le jeton d'authentification d'Open WebUI.

---

## Configuration

Dans le fichier `config.yaml`, vous devrez simplement ajouter/modifier les options suivantes.

### Modifier le fournisseur en openai

```yaml
provider: openai
```

### Ajouter ou mettre à jour apiBase

Définissez ceci sur votre domaine Open WebUI à la fin.

```yaml
apiBase: http://localhost:3000/ # Si vous avez suivi la configuration de démarrage avec Docker
```

### Ajouter une apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # Remplacez par votre clé API
```

Vous pouvez trouver et générer votre clé API dans Open WebUI -> Paramètres -> Compte -> Clés API.

Vous voudrez copier la "clé API" (elle commence par sk-).

## Exemple de config

Voici un exemple de base de config.yaml utilisant Open WebUI via un fournisseur openai, avec Granite Code comme modèle.
Assurez-vous d'avoir chargé le modèle dans votre/vos instance(s) Ollama au préalable.

```yaml
name: Assistant Local
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Modèle ABC depuis pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplétion
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: Rédiger des tests unitaires pour le code sélectionné
    prompt: |
      Rédigez un ensemble complet de tests unitaires pour le code sélectionné. Configurez-les, exécutez des tests vérifiant la correction, y compris pour des cas limites importants, et désactivez-les. Assurez-vous que les tests sont complets et sophistiqués. Donnez les tests uniquement en sortie de chat, ne modifiez aucun fichier.
```

Enregistrez votre fichier `config.yaml` et c'est tout !

Vous devriez maintenant voir votre modèle dans la sélection de modèle dans l'onglet Continue.

Sélectionnez-le et vous devriez maintenant chatter via Open WebUI (et/ou toute [pipeline](/pipelines) que vous avez configurée).

Vous pouvez faire cela pour autant de modèles que vous souhaitez utiliser, bien que n'importe quel modèle puisse fonctionner, il est recommandé d'utiliser un modèle conçu pour le code.

Consultez la documentation continue pour une configuration continue supplémentaire, [Documentation Continue](https://docs.continue.dev/reference/Model%20Providers/openai)
