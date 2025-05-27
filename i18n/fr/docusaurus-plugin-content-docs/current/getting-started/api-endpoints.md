---
sidebar_position: 400
title: "🔗 Points de terminaison de l'API"
---

Ce guide fournit des informations essentielles sur la façon d'interagir efficacement avec les points de terminaison de l'API pour assurer une intégration transparente et une automatisation utilisant nos modèles. Veuillez noter qu'il s'agit d'une configuration expérimentale qui peut être mise à jour ultérieurement pour des améliorations.

## Authentification

Pour garantir un accès sécurisé à l'API, une authentification est requise 🛡️. Vous pouvez authentifier vos requêtes API en utilisant le mécanisme de Bearer Token. Obtenez votre clé API depuis **Paramètres > Compte** dans l'Open WebUI, ou, alternativement, utilisez un JWT (JSON Web Token) pour l'authentification.

## Points de terminaison de l'API notables

### 📜 Récupérer tous les modèles

- **Point de terminaison** : `GET /api/models`
- **Description** : Récupère tous les modèles créés ou ajoutés via Open WebUI.
- **Exemple** :

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 Complétions de Chat

- **Point de terminaison** : `POST /api/chat/completions`
- **Description** : Sert de point de terminaison compatible avec l'API OpenAI pour les complétions de chat pour les modèles d'Open WebUI, y compris les modèles Ollama, OpenAI et les modèles de fonctions d'Open WebUI.

- **Exemple Curl** :

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "Pourquoi le ciel est-il bleu ?"
          }
        ]
      }
  ```
  
- **Exemple Python** :
  ```python
  import requests
  
  def chat_avec_modele(token):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {
        "model": "granite3.1-dense:8b",
        "messages": [
          {
            "role": "user",
            "content": "Pourquoi le ciel est-il bleu ?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Support du proxy API Ollama

Si vous souhaitez interagir directement avec les modèles Ollama — y compris pour la génération d'embeddings ou le streaming brut des invites — Open WebUI offre un passage transparent à l'API native d'Ollama via une route proxy.

- **URL de base** : `/ollama/<api>`
- **Référence** : [Documentation API Ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 Générer une complétion (Streaming)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "Pourquoi le ciel est-il bleu ?"
}
```

#### 📦 Lister les modèles disponibles

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 Générer des embeddings

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI est génial !", "Générons des embeddings."]
}
```

Ceci est idéal pour construire des index de recherche, des systèmes de récupération ou des pipelines personnalisés utilisant les modèles Ollama derrière Open WebUI.

### 🧩 Génération augmentée par récupération (RAG)

La fonctionnalité de Génération augmentée par récupération (RAG) permet d'améliorer les réponses en incorporant des données provenant de sources externes. Ci-dessous, vous trouverez les méthodes pour gérer des fichiers et des collections de connaissances via l'API, et comment les utiliser efficacement dans les complétions de chat.

#### Téléchargement de fichiers

Pour utiliser des données externes dans les réponses RAG, vous devez d'abord télécharger les fichiers. Le contenu du fichier téléchargé est automatiquement extrait et stocké dans une base de données vectorielle.

- **Point de terminaison** : `POST /api/v1/files/`
- **Exemple Curl** :

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Exemple Python** :

  ```python
  import requests
  
  def telecharger_fichier(token, file_path):
      url = http://localhost:3000/api/v1/files/
      headers = {
          Authorization: fBearer {token},
          Accept: application/json
      }
      files = {file: open(file_path, rb)}
      response = requests.post(url, headers=headers, files=files)
      return response.json()
  ```

#### Ajouter des fichiers aux collections de connaissances

Après le téléchargement, vous pouvez regrouper des fichiers dans une collection de connaissances ou les référencer individuellement dans les chats.

- **Point de terminaison** : `POST /api/v1/knowledge/{id}/file/add`
- **Exemple Curl** :

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Exemple Python** :

  ```python
  import requests

  def ajouter_fichier_a_connaissance(token, knowledge_id, file_id):
      url = fhttp://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {file_id: file_id}
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

#### Utilisation des fichiers et des collections dans les complétions de chat

Vous pouvez référencer à la fois des fichiers individuels ou des collections entières dans vos requêtes RAG pour obtenir des réponses enrichies.

##### Utiliser un fichier individuel dans les complétions de chat

Cette méthode est bénéfique lorsque vous souhaitez focaliser la réponse du modèle de chat sur le contenu d'un fichier spécifique.

- **Endpoint** : `POST /api/chat/completions`
- **Exemple Curl** :

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Expliquez les concepts dans ce document."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Exemple Python** :

  ```python
  import requests

  def chat_with_file(token, model, query, file_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: file, id: file_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

##### Utiliser une collection de connaissances dans les complétions de chat

Exploitez une collection de connaissances pour améliorer la réponse lorsque la requête peut bénéficier d'un contexte plus large ou de plusieurs documents.

- **Endpoint** : `POST /api/chat/completions`
- **Exemple Curl** :

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Fournissez des informations sur les perspectives historiques couvertes dans la collection."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Exemple Python** :

  ```python
  import requests
  
  def chat_with_collection(token, model, query, collection_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: collection, id: collection_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

Ces méthodes permettent une utilisation efficace des connaissances externes via des fichiers téléchargés et des collections de connaissances, améliorant ainsi les capacités des applications de chat grâce à l'API Open WebUI. Que vous utilisiez des fichiers individuellement ou au sein de collections, vous pouvez personnaliser l'intégration en fonction de vos besoins spécifiques.

## Avantages d'utiliser Open WebUI comme fournisseur unifié de LLM

Open WebUI offre une myriade d'avantages, en faisant un outil essentiel pour les développeurs et les entreprises :

- **Interface unifiée** : Simplifiez vos interactions avec différents LLMs via une plateforme unique et intégrée.
- **Facilité de mise en œuvre** : Intégration rapide avec une documentation complète et un support communautaire.

## Liens vers la documentation Swagger

:::important
Assurez-vous de définir la variable d'environnement `ENV` sur `dev` afin d'accéder à la documentation Swagger pour l'un de ces services. Sans cette configuration, la documentation ne sera pas accessible.
:::

Accédez à la documentation détaillée de l'API pour différents services fournis par Open WebUI :

| Application | Chemin de la documentation |
|-------------|-----------------------------|
| Principal   | `/docs`                     |


En suivant ces directives, vous pouvez rapidement intégrer et commencer à utiliser l'API Open WebUI. Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à nous contacter via notre communauté Discord ou à consulter la FAQ. Bon codage ! 🌟
