---
sidebar_position: 4
title: "🌍 Configuration des Variables d'Environnement"
---


## Vue d'ensemble

Open WebUI offre une large gamme de variables d'environnement permettant de personnaliser et de configurer
divers aspects de l'application. Cette page sert de référence complète pour toutes les variables d'environnement disponibles, en indiquant leurs types, valeurs par défaut et descriptions.
À mesure que de nouvelles variables sont introduites, cette page sera mise à jour pour refléter les options de configuration croissantes.

:::info

Cette page est à jour avec la version [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9) de Open WebUI, mais reste encore en cours d'amélioration pour inclure des descriptions plus précises, lister les options disponibles pour les variables d'environnement, les valeurs par défaut et améliorer les descriptions.

:::

### Note Importante sur les Variables d'Environnement `PersistentConfig`

:::note

Lors du premier lancement de Open WebUI, toutes les variables d'environnement sont traitées de manière égale et peuvent être utilisées pour configurer l'application. Cependant, pour les variables d'environnement marquées comme `PersistentConfig`, leurs valeurs sont conservées et stockées en interne.

Après le premier lancement, si vous redémarrez le conteneur, les variables d'environnement `PersistentConfig` n'utiliseront plus les valeurs des variables d'environnement externes. Au lieu de cela, elles utiliseront les valeurs stockées en interne.

En revanche, les variables d'environnement régulières continueront d'être mises à jour et appliquées à chaque redémarrage suivant.

Vous pouvez mettre à jour les valeurs des variables d'environnement `PersistentConfig` directement à partir de Open WebUI, et ces modifications seront stockées en interne. Cela vous permet de gérer ces paramètres de configuration indépendamment des variables d'environnement externes.

Veuillez noter que les variables d'environnement `PersistentConfig` sont clairement indiquées comme telles dans la documentation ci-dessous, ce qui vous permet de savoir comment elles se comporteront.

:::

## App/Backend

Les variables d'environnement suivantes sont utilisées par `backend/open_webui/config.py` pour fournir la configuration de démarrage de Open WebUI. Veuillez noter que certaines variables peuvent avoir des valeurs par défaut différentes selon que vous utilisez Open WebUI directement ou via Docker. Pour plus d'informations sur les variables d'environnement liées aux journaux, consultez notre [documentation sur les journaux](https://docs.openwebui.com/getting-started/advanced-topics/logging).

### Général

#### `WEBUI_URL`

- Type : `str`
- Défaut : `http://localhost:3000`
- Description : Spécifie l'URL où Open WebUI est accessible. Actuellement utilisé pour la prise en charge du moteur de recherche.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_SIGNUP`

- Type : `bool`
- Défaut : `True`
- Description : Active ou désactive la création de comptes utilisateur.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_LOGIN_FORM`

- Type : `bool`
- Défaut : `True`
- Description : Active ou désactive les éléments de connexion par email, mot de passe, connexion et "ou" (seulement lorsque `ENABLE_OAUTH_SIGNUP` est activé).
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::danger

Cela ne doit **jamais** être défini sur `False` sauf si [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup)
est également utilisé et défini sur `True`. Sinon, il sera impossible de se connecter.

:::

#### `DEFAULT_LOCALE`

- Type : `str`
- Défaut : `en`
- Description : Définit la langue par défaut de l'application.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DEFAULT_MODELS`

- Type : `str`
- Défaut : Chaîne vide ( ), donc `None`.
- Description : Définit un modèle de langage par défaut.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DEFAULT_USER_ROLE`

- Type : `str`
- Options :
  - `pending` - Les nouveaux utilisateurs sont en attente jusqu'à ce que leurs comptes soient activés manuellement par un administrateur.
  - `user` - Les nouveaux utilisateurs sont automatiquement activés avec des permissions d'utilisateur régulier.
  - `admin` - Les nouveaux utilisateurs sont automatiquement activés avec des permissions d'administrateur.
- Défaut : `pending`
- Description : Définit le rôle par défaut attribué aux nouveaux utilisateurs.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `PENDING_USER_OVERLAY_TITLE`

- Type : `str`
- Défaut : Chaîne vide ( )
- Description : Définit un titre personnalisé pour l'overlay des utilisateurs en attente.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `PENDING_USER_OVERLAY_CONTENT`

- Type : `str`
- Défaut : Chaîne vide ( )
- Description : Définit un contenu textuel personnalisé pour l'overlay des utilisateurs en attente.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_CHANNELS`

- Type : `bool`
- Défaut : `False`
- Description : Active ou désactive la prise en charge des canaux.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEBHOOK_URL`

- Type : `str`
- Description : Définit un webhook pour l'intégration avec Discord/Slack/Microsoft Teams.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_ADMIN_EXPORT`

- Type : `bool`
- Défaut : `True`
- Description : Contrôle si les administrateurs peuvent exporter des données.

#### `ENABLE_ADMIN_CHAT_ACCESS`

- Type : `bool`
- Défaut : `True`
- Description : Permet aux administrateurs d'accéder à tous les chats.

#### `ENABLE_USER_WEBHOOKS`

- Type : `bool`
- Défaut : `True`
- Description : Active ou désactive les webhooks des utilisateurs.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RESPONSE_WATERMARK`

- Type : `str`
- Défaut : Chaîne vide ( )
- Description : Définit un texte personnalisé qui sera inclus lorsque vous copiez un message dans le chat. Ex. `"Ce texte est généré par IA"` -> ajoutera "Ce texte est généré par IA" à chaque message, lorsqu'il est copié.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `THREAD_POOL_SIZE`

- Type : `int`
- Défaut : `0`
- Description : Définit la taille du pool de threads pour les appels FastAPI/AnyIO bloquants. Par défaut (lorsque défini sur 0), FastAPI/AnyIO utilise `40` threads. En cas de grandes instances et de nombreux utilisateurs simultanés, il peut être nécessaire d'augmenter `THREAD_POOL_SIZE` pour éviter les blocages.

#### `SHOW_ADMIN_DETAILS`

- Type : `bool`
- Défaut : `True`
- Description : Active ou désactive l'affichage des détails des administrateurs dans l'interface.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ADMIN_EMAIL`

- Type : `str`
- Description : Définit l'email de l'administrateur affiché par `SHOW_ADMIN_DETAILS`.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENV`

- Type : `str`
- Options :
  - `dev` - Active la documentation de l'API FastAPI sur `/docs`.
  - `prod` - Configure automatiquement plusieurs variables d'environnement.
- Défaut :
  - **Défaut Backend** : `dev`
  - **Défaut Docker** : `prod`
- Description : Configuration de l'environnement.

#### `ENABLE_PERSISTENT_CONFIG`

- Type : `bool`
- Défaut : `True`
- Description : Si défini à `False`, toutes les variables `PersistentConfig` sont traitées comme des variables normales.

#### `CUSTOM_NAME`

- Type : `str`
- Description : Définit `WEBUI_NAME` mais interroge **api.openwebui.com** pour les métadonnées.

#### `WEBUI_NAME`

- Type : `str`
- Défaut : `Open WebUI`
- Description : Définit le nom principal de la WebUI. Ajoute `(Open WebUI)` si surchargé.

#### `PORT`

- Type : `int`
- Défaut : `8080`
- Description : Définit le port pour exécuter Open WebUI.

:::info
Si vous exécutez l'application via Python avec la commande `open-webui serve`, vous ne pouvez pas définir le port avec la configuration `PORT`. Vous devez spécifier ce dernier directement via un argument de ligne de commande en utilisant l'option `--port`. Par exemple :

```bash
open-webui serve --port 9999
```

Cela exécutera l'Open WebUI sur le port `9999`. La variable d'environnement `PORT` est ignorée dans ce mode.
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- Type : `bool`
- Défaut : `False`
- Description : Lorsqu'elle est activée, le système enregistre chaque partie des données de chat diffusées en streaming dans la base de données en temps réel pour assurer une persistance maximale des données. Cette fonctionnalité offre une récupération robuste des données et permet un suivi précis des sessions. Cependant, cela se fait au prix d'une latence accrue, car l'enregistrement dans la base de données introduit un délai. Désactiver cette fonctionnalité peut améliorer les performances et réduire les délais, mais présente des risques de perte de données potentielle en cas de panne ou de crash du système. Utilisez-la en fonction des exigences et des compromis acceptables de votre application.

#### `BYPASS_MODEL_ACCESS_CONTROL`

- Type : `bool`
- Défaut : `False`
- Description : Contourne le contrôle d'accès au modèle.

#### `WEBUI_BUILD_HASH`

- Type : `str`
- Défaut : `dev-build`
- Description : Utilisé pour identifier la SHA Git de la construction pour les versions.

#### `WEBUI_BANNERS`

- Type : `list` de `dict`
- Défaut : `[]`
- Description : Liste des bannières à afficher aux utilisateurs. Le format des bannières est :

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::info

Lors de la définition de cette variable d'environnement dans un fichier `.env`, veillez à échapper les guillemets en encadrant la valeur entière par des guillemets doubles et en utilisant des guillemets échappés (`\"`) pour les guillemets internes. Exemple :

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"Vos messages sont enregistrés.\", \"content\": \"Vos messages sont enregistrés et peuvent être examinés par des humains. LLMs sont sujets aux hallucinations, vérifiez les sources.\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- Type : `bool`
- Défaut : `False`
- Description : Génère l'image Docker avec le support NVIDIA CUDA. Permet l'accélération GPU pour Whisper local et les embeddings.

#### `EXTERNAL_PWA_MANIFEST_URL`

- Type : `str`
- Défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Lorsqu'elle est définie comme une URL pleinement qualifiée (par ex., https://path/to/manifest.webmanifest), les requêtes envoyées à /manifest.json utiliseront le fichier manifeste externe. Lorsqu'elle n'est pas définie, le fichier manifeste.json par défaut sera utilisé.

#### `ENABLE_TITLE_GENERATION`

- Type : `booléen`
- Valeur par défaut : `True`
- Description : Active ou désactive la génération des titres des conversations.
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `LICENSE_KEY`

- Type : `chaîne de caractères`
- Valeur par défaut : `None`
- Description : Spécifie la clé de licence à utiliser (uniquement pour les utilisateurs d'Entreprise).
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `SSL_ASSERT_FINGERPRINT`

- Type : `chaîne de caractères`
- Valeur par défaut : Chaîne vide ( ), car `None` est défini comme valeur par défaut.
- Description : Spécifie l'empreinte SSL assert à utiliser.
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `DEFAULT_PROMPT_SUGGESTIONS`

- Type : `liste` de `dict`
- Valeur par défaut : `[]` (ce qui signifie utiliser les suggestions d'invite intégrées par défaut)
- Description : Liste des suggestions d'invite. Le format des suggestions d'invite est le suivant :

```json
[{"title": ["Partie 1 du titre", "Partie 2 du titre"], "content": "invite"}]
```

### Client AIOHTTP

#### `AIOHTTP_CLIENT_TIMEOUT`

- Type : `entier`
- Valeur par défaut : `300`
- Description : Spécifie la durée du délai d'attente en secondes pour le client AIOHTTP. Cela affecte des connexions telles que celles vers Ollama et les points d'accès OpenAI.

:::info

C'est le délai maximal que le client attendra pour une réponse avant d'expirer.
S'il est défini sur une chaîne vide ( ), le délai sera défini sur `None`, désactivant effectivement le délai d'attente et permettant au client d'attendre indéfiniment.

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- Type : `entier`
- Valeur par défaut : `10`
- Description : Configure le temps d'attente en secondes pour récupérer la liste des modèles. Cela peut être utile dans les cas où une latence réseau nécessite un délai plus long pour récupérer avec succès la liste des modèles.

:::note
Le délai AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST est défini par défaut à 10 secondes pour garantir que toutes les connexions nécessaires sont disponibles lors de l'ouverture de l'interface utilisateur web. Ce délai permet de récupérer la liste des modèles, même en cas de latence réseau élevée. Vous pouvez réduire cette valeur si des délais d'attente plus rapides sont privilégiés, mais notez que cela pourrait entraîner la perte de certaines connexions en fonction des conditions de votre réseau.
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- Type : `entier`
- Description : Configure le temps d'attente en secondes pour récupérer la liste des modèles. Cela peut être utile dans les cas où une latence réseau nécessite un délai plus long pour récupérer avec succès la liste des modèles.

### Répertoires

#### `DATA_DIR`

- Type : `chaîne de caractères`
- Valeur par défaut : `./data`
- Description : Spécifie le répertoire de base pour le stockage des données, y compris les téléchargements, le cache, la base de données vectorielle, etc.

#### `FONTS_DIR`

- Type : `chaîne de caractères`
- Description : Spécifie le répertoire des polices.

#### `FRONTEND_BUILD_DIR`

- Type : `chaîne de caractères`
- Valeur par défaut : `../build`
- Description : Spécifie l'emplacement des fichiers de construction du frontend.

#### `STATIC_DIR`

- Type : `chaîne de caractères`
- Valeur par défaut : `./static`
- Description : Spécifie le répertoire pour les fichiers statiques, tels que le favicon.

### Ollama

#### `ENABLE_OLLAMA_API`

- Type : `booléen`
- Valeur par défaut : `True`
- Description : Active l'utilisation des API Ollama.
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` est déprécié) {#ollama_base_url}

- Type : `chaîne de caractères`
- Valeur par défaut : `http://localhost:11434`
- Valeur par défaut sous Docker :
  - Si `K8S_FLAG` est défini : `http://ollama-service.open-webui.svc.cluster.local:11434`
  - Si `USE_OLLAMA_DOCKER=True` : `http://localhost:11434`
  - Sinon `http://host.docker.internal:11434`
- Description : Configure l'URL du backend Ollama.

#### `OLLAMA_BASE_URLS`

- Type : `chaîne de caractères`
- Description : Configure les hôtes de backend Ollama équilibrés, séparés par `;`. Voir
[`OLLAMA_BASE_URL`](#ollama_base_url). Prend priorité sur [`OLLAMA_BASE_URL`](#ollama_base_url).
- Exemple : `http://host-one:11434;http://host-two:11434`
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `USE_OLLAMA_DOCKER`

- Type : `booléen`
- Valeur par défaut : `False`
- Description : Construit l'image Docker avec une instance Ollama intégrée.

#### `K8S_FLAG`

- Type : `booléen`
- Valeur par défaut : `False`
- Description : Si défini, suppose une déploiement via un Helm chart et définit [`OLLAMA_BASE_URL`](#ollama_base_url) à `http://ollama-service.open-webui.svc.cluster.local:11434`

### OpenAI

#### `ENABLE_OPENAI_API`

- Type : `booléen`
- Valeur par défaut : `True`
- Description : Active l'utilisation des API OpenAI.
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `OPENAI_API_BASE_URL`

- Type : `chaîne de caractères`
- Valeur par défaut : `https://api.openai.com/v1`
- Description : Configure l'URL de base de l'API OpenAI.
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `OPENAI_API_BASE_URLS`

- Type : `chaîne de caractères`
- Description : Prend en charge les URLs d'API OpenAI équilibrés, séparés par des points-virgules.
- Exemple : `http://host-one:11434;http://host-two:11434`
- Persistance : Cette variable d'environnement est une variable de `PersistentConfig`.

#### `OPENAI_API_KEY`

- Type : `chaîne de caractères`
- Description : Définit la clé d'API OpenAI.
- Exemple: `sk-124781258123`
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `OPENAI_API_KEYS`

- Type : `str`
- Description : Prend en charge plusieurs clés API OpenAI, séparées par des points-virgules.
- Exemple : `sk-124781258123;sk-4389759834759834`
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Tâches

#### `TASK_MODEL`

- Type : `str`
- Description : Le modèle par défaut à utiliser pour les tâches telles que la génération de titres et les requêtes de recherche sur le web
lors de l'utilisation des modèles Ollama.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TASK_MODEL_EXTERNAL`

- Type : `str`
- Description : Le modèle par défaut à utiliser pour les tâches telles que la génération de titres et les requêtes de recherche sur le web
lors de l'utilisation de points de terminaison compatibles OpenAI.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- Type : `str`
- Description : Invitation à utiliser lors de la génération de titres de chat.
- Par défaut : La valeur de la variable d'environnement `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE` :

```
### Tâche :
Générer un titre concis, de 3 à 5 mots, avec un emoji résumant l'historique du chat.
### Consignes :
- Le titre doit clairement représenter le thème ou le sujet principal de la conversation.
- Utilisez des emojis qui renforcent la compréhension du sujet, mais évitez les guillemets ou les formats spéciaux.
- Rédigez le titre dans la langue principale du chat; par défaut en anglais si multilingue.
- Priorisez la précision sur la créativité excessive; gardez-le clair et simple.
### Résultat :
Format JSON : { "title": "votre titre concis ici" }
### Exemples :
- { "title": "📉 Tendances du marché boursier" },
- { "title": "🍪 Recette parfaite des biscuits au chocolat" },
- { "title": "Évolution du streaming musical" },
- { "title": "Conseils de productivité pour le travail à distance" },
- { "title": "Intelligence artificielle en santé" },
- { "title": "🎮 Idées sur le développement de jeux vidéo" }
### Historique du chat :
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- Type : `str`
- Description : Invitation à utiliser lors de l'appel des outils.
- Par défaut : La valeur de la variable d'environnement `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`.

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE` :

```
Outils disponibles : {{TOOLS}}

Votre tâche est de choisir et de retourner les outils corrects de la liste des outils disponibles en fonction de la requête. Respectez ces consignes :

- Retournez uniquement l'objet JSON, sans texte ou explication supplémentaire.

- Si aucun outil ne correspond à la requête, retournez un tableau vide : 
   {
     "tool_calls": []
   }

- Si un ou plusieurs outils correspondent à la requête, construisez une réponse JSON contenant un tableau "tool_calls" avec des objets incluant :
   - "name": Le nom de l'outil.
   - "parameters": Un dictionnaire des paramètres requis et leurs valeurs correspondantes.

Le format de la réponse JSON est strictement :
{
  "tool_calls": [
    {"name": "nomOutil1", "parameters": {"clé1": "valeur1"}},
    {"name": "nomOutil2", "parameters": {"clé2": "valeur2"}}
  ]
}
```

- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Exécution de Code

#### `ENABLE_CODE_EXECUTION`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive l'exécution du code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_ENGINE`

- Type : `str`
- Par défaut : `pyodide`
- Description : Spécifie le moteur d'exécution de code à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_URL`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie l'URL Jupyter à utiliser pour l'exécution de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie la méthode d'authentification Jupyter à utiliser pour l'exécution de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie le jeton d'authentification Jupyter à utiliser pour l'exécution de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie le mot de passe d'authentification Jupyter à utiliser pour l'exécution de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- Type : `str`
- Par défaut : chaîne vide ( ), puisque `None` est défini par défaut.
- Description : Spécifie le délai d'attente pour l'exécution de code Jupyter.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Interpréteur de Code

#### `ENABLE_CODE_INTERPRETER`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive l'interpréteur de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `MOTEUR_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : `pyodide`
- Description : Spécifie le moteur interpréteur de code à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `MODÈLE_DE_PROMPT_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie le modèle de prompt à utiliser pour l'interprète de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `URL_JUPYTER_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie l'URL Jupyter à utiliser pour l'interprète de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUTH_JUPYTER_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie la méthode d'authentification Jupyter à utiliser pour l'interprète de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `JETON_AUTH_JUPYTER_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie le jeton d'authentification Jupyter à utiliser pour l'interprète de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `MOT_DE_PASSE_AUTH_JUPYTER_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie le mot de passe d'authentification Jupyter à utiliser pour l'interprète de code.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DÉLAI_JUPYTER_INTERPRÉTEUR_DE_CODE`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie le délai d'attente pour l'interprète de code Jupyter.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Connexions directes (Serveurs OpenAPI/MCPO Tool)

#### `ACTIVER_CONNEXIONS_DIRECTES`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive les connexions directes.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Autocomplétion

#### `ACTIVER_GÉNÉRATION_AUTOCOMPLÉTION`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive la génération d'autocomplétion.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::info

Lors de l'activation de `ACTIVER_GÉNÉRATION_AUTOCOMPLÉTION`, assurez-vous également de configurer `LONGUEUR_MAX_ENTRÉE_GÉNÉRATION_AUTOCOMPLÉTION` et `MODÈLE_DE_PROMPT_GÉNÉRATION_AUTOCOMPLÉTION` en conséquence.

:::

#### `LONGUEUR_MAX_ENTRÉE_GÉNÉRATION_AUTOCOMPLÉTION`

- Type : `int`
- Par défaut : `-1`
- Description : Définit la longueur maximale de l'entrée pour la génération d'autocomplétion.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `MODÈLE_DE_PROMPT_GÉNÉRATION_AUTOCOMPLÉTION`

- Type : `str`
- Par défaut : La valeur de la variable d'environnement `MODÈLE_PROMPT_GÉNÉRATION_AUTOCOMPLÉTION_PAR_DÉFAUT`.

`MODÈLE_PROMPT_GÉNÉRATION_AUTOCOMPLÉTION_PAR_DÉFAUT` :

```
### Tâche :
Vous êtes un système d'autocomplétion. Continuez le texte dans `<text>` en fonction du **type de complétion** dans `<type>` et la langue donnée.

### **Instructions** :
1. Analysez `<text>` pour en comprendre le contexte et le sens.
2. Utilisez `<type>` pour guider votre sortie :
   - **Général** : Fournissez une continuation naturelle et concise.
   - **Recherche** : Complétez comme si vous génériez une requête de recherche réaliste.
3. Commencez comme si vous continuiez directement `<text>`. Ne **répétez**, ne paraphrasez ou ne répondez pas comme un modèle, simplement complétez le texte.
4. Assurez-vous que la continuation :
   - S'enchaîne naturellement avec `<text>`.
   - Évite les répétitions, les explications excessives ou les idées non reliées.
5. En cas d'incertitude, retournez : `{ "text": "" }`.

### **Règles de sortie** :
- Répondez uniquement en format JSON : `{ "text": "<votre_completion>" }`.

### **Exemples** :
#### Exemple 1 :
Entrée :
<type>Général</type>
<text>Le soleil se couchait à l’horizon, peignant le ciel</text>
Sortie :
{ "text": "de teintes vibrantes d’oranges et de roses." }

#### Exemple 2 :
Entrée :
<type>Recherche</type>
<text>Meilleurs restaurants à</text>
Sortie :
{ "text": "New York pour une cuisine italienne." }

---
### Contexte :
<historique_chat>
{{MESSAGES:FIN:6}}
</historique_chat>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### Sortie :
```

- Description : Définit le modèle de prompt pour la génération d’autocomplétion.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Évaluation des modèles d'arène

#### `ACTIVER_MODÈLES_ARÈNE_D'ÉVALUATION`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive les modèles d'arène d'évaluation.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ACTIVER_NOTATION_MESSAGES`

- Type : `bool`
- Par défaut : `True`
- Description : Active la fonctionnalité de notation des messages.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ACTIVER_PARTAGE_COMMUNAUTÉ`

- Type : `bool`
- Par défaut : `True`
- Description : Contrôle si les utilisateurs voient le bouton de partager à la communauté.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Génération de Tags

#### `ENABLE_TAGS_GENERATION`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive la génération de tags.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- Type : `str`
- Par défaut : La valeur de la variable d'environnement `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE` :

```
### Tâche :
Générer 1 à 3 tags larges catégorisant les thèmes principaux de l'historique du chat, ainsi que 1 à 3 tags plus spécifiques sur les sous-thèmes.

### Directives :
- Commencez avec des domaines de haut niveau (par exemple : Science, Technologie, Philosophie, Arts, Politique, Affaires, Santé, Sports, Divertissement, Éducation)
- Pensez à inclure des sous-domaines pertinents si ceux-ci sont fortement représentés tout au long de la conversation
- Si le contenu est trop court (moins de 3 messages) ou trop diversifié, utilisez uniquement ["Général"]
- Utilisez la langue principale du chat ; par défaut à l'anglais si multilingue
- Privilégiez l'exactitude sur la précision

### Résultat :
Format JSON : { "tags": ["tag1", "tag2", "tag3"] }

### Historique du Chat :
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Description : Définit le modèle de message pour la génération de tags.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Restrictions des Points de Terminaison pour les Clés API

#### `ENABLE_API_KEY`

- Type : `bool`
- Par défaut : `True`
- Description : Active l'authentification via clé API.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- Type : `bool`
- Par défaut : `False`
- Description : Active les restrictions des points de terminaison des clés API pour une sécurité et une configurabilité accrues.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `API_KEY_ALLOWED_ENDPOINTS`

- Type : `str`
- Description : Spécifie une liste de points de terminaison API autorisés, séparés par des virgules, lorsque les restrictions des points de terminaison des clés API sont activées.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::note

La valeur de `API_KEY_ALLOWED_ENDPOINTS` doit être une liste séparée par des virgules d'URL de points de terminaison, telles que `/api/v1/messages, /api/v1/channels`.

:::

#### `JWT_EXPIRES_IN`

- Type : `int`
- Par défaut : `-1`
- Description : Définit le temps d'expiration des JWT (JSON Web Tokens) en secondes. Unités de temps valides : `s`, `m`, `h`, `d`, `w` ou `-1` pour aucune expiration.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

## Variables de Sécurité

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- Type : `bool`
- Par défaut : `False`
- Description : Transmet les informations de l'utilisateur (nom, ID, e-mail et rôle) sous forme de X-headers à l'API OpenAI et l'API Ollama.
Si activé, les en-têtes suivants sont transmis :
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- Type : `bool`
- Par défaut : `True`
- Description : Désactive la vérification SSL pour le RAG sur les sites Web.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- Type : `str`
- Options :
  - `lax` - Définit l'attribut `SameSite` à lax, autorisant les cookies de session à être envoyés avec
des requêtes initiées par des sites Web tiers.
  - `strict` - Définit l'attribut `SameSite` à strict, bloquant l'envoi des cookies de session
avec des requêtes initiées par des sites Web tiers.
  - `none` - Définit l'attribut `SameSite` à none, autorisant l'envoi des cookies de session
avec des requêtes initiées par des sites Web tiers, mais uniquement via HTTPS.
- Par défaut : `lax`
- Description : Définit l'attribut `SameSite` pour les cookies de session.

:::warning

Lorsque `ENABLE_OAUTH_SIGNUP` est activé, définir `WEBUI_SESSION_COOKIE_SAME_SITE` sur `strict` peut entraîner des échecs de connexion. Cela est dû au fait que Open WebUI utilise un cookie de session pour valider le retour d'information depuis le fournisseur OAuth, ce qui aide à prévenir les attaques CSRF.

Cependant, un cookie de session `strict` n'est pas envoyé avec la requête de retour d'information, ce qui peut entraîner des problèmes de connexion. Si vous rencontrez ce problème, utilisez plutôt la valeur par défaut `lax`.

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- Type : `bool`
- Par défaut : `False`
- Description : Définit l'attribut `Secure` pour les cookies de session si défini sur `True`.

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- Type : `str`
- Options :
  - `lax` - Définit l'attribut `SameSite` à lax, autorisant les cookies d'authentification à être envoyés avec
des requêtes initiées par des sites Web tiers.
  - `strict` - Définit l'attribut `SameSite` à strict, bloquant l'envoi des cookies d'authentification
avec des requêtes initiées par des sites Web tiers.
  - `none` - Définit l'attribut `SameSite` à none, autorisant l'envoi des cookies d'authentification
avec des requêtes initiées par des sites Web tiers, mais uniquement via HTTPS.
- Par défaut : `lax`
- Description : Définit l'attribut `SameSite` pour les cookies d'authentification.

:::info

Si la valeur n'est pas définie, `WEBUI_SESSION_COOKIE_SAME_SITE` sera utilisé comme valeur de repli.

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- Type : `bool`
- Par défaut : `False`
- Description : Définit l'attribut `Secure` pour les cookies d'authentification si réglé sur `True`.

:::info

Si la valeur n'est pas définie, `WEBUI_SESSION_COOKIE_SECURE` sera utilisé comme solution de remplacement.

:::

#### `WEBUI_AUTH`

- Type : `bool`
- Valeur par défaut : `True`
- Description : Ce paramètre active ou désactive l'authentification.

:::danger

Si réglé sur `False`, l'authentification sera désactivée pour votre instance Open WebUI. Cependant, il est
important de noter que désactiver l'authentification n'est possible que pour les nouvelles installations sans
utilisateurs existants. Si des utilisateurs sont déjà enregistrés, vous ne pouvez pas désactiver directement l'authentification.
Assurez-vous qu'aucun utilisateur n'est présent dans la base de données si vous souhaitez désactiver `WEBUI_AUTH`.

:::

#### `WEBUI_SECRET_KEY`

- Type : `str`
- Valeur par défaut : `t0p-s3cr3t`
- Valeur par défaut pour Docker : Généré aléatoirement au premier démarrage
- Description : Remplace la chaîne générée aléatoirement utilisée pour JSON Web Token.

:::info

Lors du déploiement d'Open-WebUI dans un cluster multi-nœuds avec un équilibreur de charge, vous devez vous assurer que la valeur de WEBUI_SECRET_KEY est la même sur tous les instances afin de permettre aux utilisateurs de continuer à travailler si un nœud est recyclé ou si leur session est transférée à un autre nœud. Sans cela, ils devront se reconnecter chaque fois que le nœud sous-jacent change.

:::

#### `OFFLINE_MODE`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Active ou désactive le mode hors ligne.

#### `RESET_CONFIG_ON_START`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Réinitialise le fichier `config.json` au démarrage.

#### `SAFE_MODE`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Active le mode sécurisé, qui désactive les fonctionnalités potentiellement dangereuses, désactivant toutes les fonctions.

#### `CORS_ALLOW_ORIGIN`

- Type : `str`
- Valeur par défaut : `*`
- Description : Définie les origines autorisées pour le partage de ressources cross-origin (CORS).

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Détermine si les modèles personnalisés définis sur le Hub dans leurs propres fichiers de modélisation sont autorisés.

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Détermine si les modèles personnalisés définis sur le Hub dans leurs propres fichiers
de modélisation pour le reranking sont autorisés.

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- Type : `bool`
- Valeur par défaut : `True`
- Description : Active la mise à jour automatique du modèle Sentence-Transformer.

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- Type : `bool`
- Valeur par défaut : `True`
- Description : Active la mise à jour automatique du modèle de reranking.

## Base de données vectorielle

#### `VECTOR_DB`

- Type : `str`
- Options :
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- Valeur par défaut : `chroma`
- Description : Spécifie quel système de base de données vectorielle utiliser. Ce paramètre détermine quel système de stockage vectoriel sera utilisé pour gérer les embeddings.

### ChromaDB

#### `CHROMA_TENANT`

- Type : `str`
- Valeur par défaut : La valeur de `chromadb.DEFAULT_TENANT` (une constante dans le module `chromadb`)
- Description : Définit le tenant pour ChromaDB utilisé pour les embeddings RAG.

#### `CHROMA_DATABASE`

- Type : `str`
- Valeur par défaut : La valeur de `chromadb.DEFAULT_DATABASE` (une constante dans le module `chromadb`)
- Description : Définit la base de données dans le tenant ChromaDB utilisée pour les embeddings RAG.

#### `CHROMA_HTTP_HOST`

- Type : `str`
- Description : Spécifie le nom d'hôte d'un serveur ChromaDB distant. Utilise une instance ChromaDB locale si elle n'est pas définie.

#### `CHROMA_HTTP_PORT`

- Type : `int`
- Valeur par défaut : `8000`
- Description : Spécifie le port d'un serveur ChromaDB distant.

#### `CHROMA_HTTP_HEADERS`

- Type : `str`
- Description : Une liste de headers HTTP séparés par des virgules à inclure avec chaque requête ChromaDB.
- Exemple : `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`.

#### `CHROMA_HTTP_SSL`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Contrôle si SSL est utilisé pour les connexions au serveur ChromaDB.

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- Type : `str`
- Description : Spécifie un fournisseur d'authentification pour le serveur ChromaDB distant.
- Exemple : `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- Type : `str`
- Description : Spécifie les identifiants d'authentification pour le serveur ChromaDB distant.
- Exemple : `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- Type : `str`
- Valeur par défaut : Chaîne vide (`' '`), puisque `None` est la valeur par défaut.
- Description : Spécifie la clé API Elasticsearch.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ELASTICSEARCH_CA_CERTS`

- Type : `str`
- Valeur par défaut : Chaîne vide (`' '`), puisque `None` est la valeur par défaut.
- Description : Spécifie le chemin des certificats CA pour Elasticsearch.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ELASTICSEARCH_CLOUD_ID`

- Type : `str`
- Valeur par défaut : Chaîne vide (`' '`), puisque `None` est la valeur par défaut.
- Description : Spécifie l'ID cloud Elasticsearch.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ELASTICSEARCH_INDEX_PREFIX`

- Type : `str`
- Valeur par défaut : `open_webui_collections`
- Description : Spécifie le préfixe pour l'index Elasticsearch.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `ELASTICSEARCH_PASSWORD`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie le mot de passe pour Elasticsearch.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `ELASTICSEARCH_URL`

- Type : `str`
- Par défaut : `https://localhost:9200`
- Description : Spécifie l'URL pour l'instance Elasticsearch.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `ELASTICSEARCH_USERNAME`

- Type : `str`
- Par défaut : Chaîne vide ( ), car `None` est défini par défaut.
- Description : Spécifie le nom d'utilisateur pour Elasticsearch.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

### Milvus

#### `MILVUS_URI`

- Type : `str`
- Par défaut : `${DATA_DIR}/vector_db/milvus.db`
- Description : Spécifie l'URI pour se connecter à la base de données vectorielle Milvus. Cela peut pointer vers un serveur Milvus local ou distant en fonction de la configuration du déploiement.

#### `MILVUS_DB`

- Type : `str`
- Par défaut : `default`
- Description : Spécifie la base de données à connecter dans une instance Milvus.

#### `MILVUS_TOKEN`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie un jeton de connexion optionnel pour Milvus.

#### `MILVUS_INDEX_TYPE`

- Type : `str`
- Par défaut : `HNSW`
- Options : `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- Description : Spécifie le type d'index à utiliser lors de la création d'une nouvelle collection dans Milvus. `AUTOINDEX` est généralement recommandé pour Milvus standalone. `HNSW` peut offrir de meilleures performances mais nécessite généralement une configuration Milvus en cluster.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `MILVUS_METRIC_TYPE`

- Type : `str`
- Par défaut : `COSINE`
- Options : `COSINE`, `IP`, `L2`
- Description : Spécifie le type de métrique pour la recherche de similarité vectorielle dans Milvus.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `MILVUS_HNSW_M`

- Type : `int`
- Par défaut : `16`
- Description : Spécifie le paramètre `M` pour le type d'index HNSW dans Milvus. Cela influence le nombre de liens bidirectionnels créés pour chaque nouvel élément pendant la construction. Applicable uniquement si `MILVUS_INDEX_TYPE` est `HNSW`.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `MILVUS_HNSW_EFCONSTRUCTION`

- Type : `int`
- Par défaut : `100`
- Description : Spécifie le paramètre `efConstruction` pour le type d'index HNSW dans Milvus. Cela influence la taille de la liste dynamique pour les plus proches voisins pendant la construction de l'index. Applicable uniquement si `MILVUS_INDEX_TYPE` est `HNSW`.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `MILVUS_IVF_FLAT_NLIST`

- Type : `int`
- Par défaut : `128`
- Description : Spécifie le paramètre `nlist` pour le type d'index IVF_FLAT dans Milvus. C'est le nombre d'unités de clusters. Applicable uniquement si `MILVUS_INDEX_TYPE` est `IVF_FLAT`.
- Persistence : Cette variable d'environnement est une variable de type `PersistentConfig`.

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- Type : `bool`
- Par défaut : `False`
- Description : Active ou désactive la vérification des certificats OpenSearch.

#### `OPENSEARCH_PASSWORD`

- Type : `str`
- Par défaut : `None`
- Description : Définit le mot de passe pour OpenSearch.

#### `OPENSEARCH_SSL`

- Type : `bool`
- Par défaut : `True`
- Description : Active ou désactive SSL pour OpenSearch.

#### `OPENSEARCH_URI`

- Type : `str`
- Par défaut : `https://localhost:9200`
- Description : Définit l'URI pour OpenSearch.

#### `OPENSEARCH_USERNAME`

- Type : `str`
- Par défaut : `None`
- Description : Définit le nom d'utilisateur pour OpenSearch.

### PGVector

#### `PGVECTOR_DB_URL`

- Type : `str`
- Par défaut : La valeur de la variable d'environnement `DATABASE_URL`
- Description : Définit l'URL de la base de données pour le stockage des modèles.

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- Type : `str`
- Par défaut : `1536`
- Description : Spécifie la longueur maximale du vecteur pour l'initialisation de PGVector.

### Qdrant

#### `QDRANT_API_KEY`

- Type : `str`
- Description : Définit la clé API pour Qdrant.

#### `QDRANT_URI`

- Type : `str`
- Description : Définit l'URI pour Qdrant.

#### `QDRANT_ON_DISK`

- Type : `bool`
- Par défaut : `False`
- Description : Active l'utilisation du stockage memmap (également connu sous le nom de stockage sur disque).

#### `QDRANT_PREFER_GRPC`

- Type : `bool`
- Par défaut : `False`
- Description : Utilisez l'interface gRPC chaque fois que possible.

#### `QDRANT_GRPC_PORT`

- Type : `int`
- Par défaut : `6334`
- Description : Définit le numéro de port gRPC pour Qdrant.

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- Type : `bool`
- Par défaut : `False`
- Description : Active le mode de multi-tenance pour la gestion des collections Qdrant, ce qui réduit considérablement l'utilisation de la RAM et les frais de calcul en consolidant les structures de données vectorielles similaires. Recommandé de l'activer.

:::info

Cela déconnectera toutes les collections Qdrant créées selon l'ancien modèle, qui est non multi-tenance. Rendez-vous dans `Paramètres Admin` > `Documents` > `Réindexer la base de connaissances` pour migrer les connaissances existantes.

Les collections Qdrant créées dans le modèle précédent continueront de consommer des ressources.

Actuellement, il n'existe pas de bouton dans l'interface utilisateur pour réinitialiser uniquement la base de données vectorielle. Si vous souhaitez migrer les connaissances vers la multi-tenance :
- Supprimez toutes les collections avec le préfixe `open_webui-knowledge` (ou le préfixe `open_webui` pour supprimer toutes les collections liées à Open WebUI) en utilisant le client natif Qdrant.
- Allez à `Paramètres Admin` > `Documents` > `Indexer à nouveau la base de connaissances` pour migrer la base de connaissances existante.

`Indexer à nouveau la base de connaissances` migrera UNIQUEMENT la base de connaissances.

:::

:::danger

Si vous décidez d'utiliser le modèle de multi-tenance par défaut et que vous n'avez pas besoin de migrer les anciennes connaissances, allez à `Paramètres Admin` > `Documents` pour réinitialiser les vecteurs et les connaissances, ce qui supprimera toutes les collections avec le préfixe `open_webui` et toutes les connaissances stockées.

:::

### Pinecone

Lors de l'utilisation de Pinecone comme base de vecteurs, les variables d'environnement suivantes sont utilisées pour contrôler son comportement. Assurez-vous de définir ces variables dans votre fichier `.env` ou dans l'environnement de déploiement.

#### `PINECONE_API_KEY`

- Type : `str`
- Par défaut : `None`
- Description : Configure la clé API utilisée pour s'authentifier auprès du service Pinecone.

#### `PINECONE_ENVIRONMENT`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie l'environnement Pinecone à connecter (par exemple, `us-west1-gcp`, `gcp-starter`, etc.).

#### `PINECONE_INDEX_NAME`

- Type : `str`
- Par défaut : `open-webui-index`
- Description : Définit le nom de l'index Pinecone qui sera utilisé pour stocker et interroger les embeddings de vecteurs.

#### `PINECONE_DIMENSION`

- Type : `int`
- Par défaut : `1536`
- Description : La dimensionnalité des embeddings de vecteurs. Doit correspondre à la dimension attendue par l'index (couramment 768, 1024, 1536 ou 3072 selon le modèle utilisé).

#### `PINECONE_METRIC`

- Type : `str`
- Par défaut : `cosine`
- Options : `cosine`, `dotproduct`, `euclidean`
- Description : Spécifie la métrique de similarité à utiliser pour les comparaisons de vecteurs dans l'index Pinecone.

#### `PINECONE_CLOUD`

- Type : `str`
- Par défaut : `aws`
- Options : `aws`, `gcp`, `azure`
- Description : Spécifie le fournisseur de cloud où l'index Pinecone est hébergé.

## Moteur d'Extraction de Contenu RAG

#### `CONTENT_EXTRACTION_ENGINE`

- Type : `str`
- Options :
  - Laisser vide pour utiliser le moteur par défaut
  - `external` - Utiliser un chargeur externe
  - `tika` - Utiliser un serveur local Apache Tika
  - `docling` - Utiliser le moteur Docling
  - `document_intelligence` - Utiliser le moteur Document Intelligence
  - `mistral_ocr` - Utiliser le moteur OCR Mistral
- Description : Configure le moteur d'extraction de contenu à utiliser pour l'ingestion de documents.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `MISTRAL_OCR_API_KEY`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie la clé API OCR Mistral à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- Type : `str`
- Par défaut : `None`
- Description : Configure l'URL du service de chargeur de documents externe.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- Type : `str`
- Par défaut : `None`
- Description : Configure la clé API pour l'authentification avec le service de chargeur de documents externe.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TIKA_SERVER_URL`

- Type : `str`
- Par défaut : `http://localhost:9998`
- Description : Configure l'URL pour le serveur Apache Tika.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DOCLING_SERVER_URL`

- Type : `str`
- Par défaut : `http://docling:5001`
- Description : Spécifie l'URL du serveur Docling.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DOCLING_OCR_ENGINE`

- Type : `str`
- Par défaut : `tesseract`
- Description : Spécifie le moteur OCR utilisé par Docling.
  Valeurs prises en charge incluent : `tesseract` (par défaut), `easyocr`, `ocrmac`, `rapidocr`, et `tesserocr`.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DOCLING_OCR_LANG`

- Type : `str`
- Par défaut : `eng,fra,deu,spa` (lors de l'utilisation du moteur par défaut `tesseract`)
- Description : Spécifie la/les langue(s) OCR à utiliser avec le moteur `DOCLING_OCR_ENGINE` configuré.
  Le format et les codes de langue disponibles dépendent du moteur OCR sélectionné.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

## Génération Augmentée par Recherche (RAG)

#### `RAG_EMBEDDING_ENGINE`

- Type : `str`
- Options :
  - Laisser vide pour `Default (SentenceTransformers)` - Utilise SentenceTransformers pour les embeddings.
  - `ollama` - Utilise l'API Ollama pour les embeddings.
  - `openai` - Utilise l'API OpenAI pour les embeddings.
- Description : Permet de choisir le moteur d'embedding à utiliser pour RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_EMBEDDING_MODEL`

- Type : `str`
- Par défaut : `sentence-transformers/all-MiniLM-L6-v2`
- Description : Configure un modèle pour les embeddings. Localement, un modèle Sentence-Transformer est utilisé.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_RAG_HYBRID_SEARCH`

- Type : `bool`
- Par défaut : `False`
- Description : Active l'utilisation de la recherche ensemblée avec `BM25` + `ChromaDB`, avec reranking en utilisant
les modèles `sentence_transformers`.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_TOP_K`

- Type : `int`
- Par défaut : `3`
- Description : Définit le nombre par défaut de résultats à considérer pour l'embedding lors de l'utilisation de RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_TOP_K_RERANKER`

- Type : `int`
- Par défaut : `3`
- Description : Définit le nombre par défaut de résultats à considérer pour le reranker lors de l'utilisation de RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_RELEVANCE_THRESHOLD`

- Type : `float`
- Par défaut : `0.0`
- Description : Définit le seuil de pertinence à considérer pour les documents lorsqu'ils sont utilisés avec le reranking.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_HYBRID_BM25_WEIGHT`

- Type : `float`
- Par défaut : `0.5`
- Description : Définit le poids accordé à la recherche par mots-clés (BM25) lors de la recherche hybride. 1 signifie uniquement recherche par mots-clés, 0 signifie uniquement recherche vectorielle.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_TEMPLATE`

- Type : `str`
- Par défaut : La valeur de la variable d'environnement `DEFAULT_RAG_TEMPLATE`.

`DEFAULT_RAG_TEMPLATE` :

```
### Tâche :
Répondez à la requête de l'utilisateur en utilisant le contexte fourni, en intégrant des citations en ligne au format [id] **uniquement lorsque la balise <source> inclut un attribut id explicite** (par exemple, <source id="1">).

### Directives :
- Si vous ne connaissez pas la réponse, indiquez-le clairement.
- En cas d'incertitude, demandez des précisions à l'utilisateur.
- Répondez dans la même langue que la requête de l'utilisateur.
- Si le contexte est illisible ou de mauvaise qualité, informez l'utilisateur et fournissez la meilleure réponse possible.
- Si la réponse n'est pas présente dans le contexte mais que vous possédez les connaissances, expliquez cela à l'utilisateur et fournissez la réponse en utilisant votre propre compréhension.
- **Incluez uniquement des citations en ligne utilisant [id] (par exemple, [1], [2]) lorsque la balise <source> inclut un attribut id.**
- Ne citez pas si la balise <source> ne contient pas d'attribut id.
- Ne pas utiliser de balises XML dans votre réponse.
- Assurez-vous que les citations sont concises et directement liées à l'information fournie.

### Exemple de citation :
Si l'utilisateur pose une question sur un sujet spécifique et que l'information se trouve dans une source avec un attribut id fourni, la réponse doit inclure la citation comme dans l'exemple suivant :
* "Selon l'étude, la méthode proposée augmente l'efficacité de 20 % [1]."

### Sortie :
Fournissez une réponse claire et directe à la requête de l'utilisateur, incluant des citations en ligne au format [id] uniquement lorsque la balise <source> avec attribut id est présente dans le contexte.

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- Description : Modèle à utiliser pour injecter des documents RAG dans la complétion de chat.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_TEXT_SPLITTER`

- Type : `str`
- Options :
  - `character`
  - `token`
- Par défaut : `character`
- Description : Définit le séparateur de texte pour les modèles RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `TIKTOKEN_CACHE_DIR`

- Type : `str`
- Par défaut : `{CACHE_DIR}/tiktoken`
- Description : Définit le répertoire pour le cache TikToken.

#### `TIKTOKEN_ENCODING_NAME`

- Type : `str`
- Par défaut : `cl100k_base`
- Description : Définit le nom d'encodage pour TikToken.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CHUNK_SIZE`

- Type : `int`
- Par défaut : `1000`
- Description : Définit la taille des morceaux de documents pour les embeddings.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `CHUNK_OVERLAP`

- Type : `int`
- Par défaut : `100`
- Description : Spécifie le chevauchement entre les morceaux.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `PDF_EXTRACT_IMAGES`

- Type : `bool`
- Par défaut : `False`
- Description : Extrait les images des PDFs via OCR lors du chargement des documents.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_FILE_MAX_SIZE`

- Type : `int`
- Description : Définit la taille maximale d'un fichier en mégaoctets pouvant être envoyé pour l'ingestion de documents.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_FILE_MAX_COUNT`

- Type : `int`
- Description : Définit le nombre maximal de fichiers pouvant être envoyés à la fois pour l'ingestion de documents.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::info

Lors de la configuration de `RAG_FILE_MAX_SIZE` et `RAG_FILE_MAX_COUNT`, assurez-vous que les valeurs sont raisonnables afin de prévenir les envois excessifs de fichiers et les problèmes de performance potentiels.

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- Type : `list` de `str`
- Par défaut : `[]` (ce qui signifie que tous les types de fichiers pris en charge sont autorisés)
- Description : Spécifie quelles extensions de fichiers sont autorisées pour le téléchargement.

```json
["pdf,docx,txt"]
```

- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_RERANKING_MODEL`

- Type : `str`
- Description : Définit un modèle pour le reclassement des résultats. Localement, un modèle Sentence-Transformer est utilisé.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_OPENAI_API_BASE_URL`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_BASE_URL}`
- Description : Définit l'URL API de base OpenAI à utiliser pour les embeddings RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_OPENAI_API_KEY`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_KEY}`
- Description : Définit la clé API OpenAI à utiliser pour les embeddings RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- Type : `int`
- Valeur par défaut : `1`
- Description : Définit la taille de lot pour les embeddings OpenAI.

#### `RAG_EMBEDDING_BATCH_SIZE`

- Type : `int`
- Valeur par défaut : `1`
- Description : Définit la taille de lot pour l'embedding dans les modèles RAG (Retrieval-Augmented Generator).
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_OLLAMA_API_KEY`

- Type : `str`
- Description : Définit la clé API pour l'API Ollama utilisée dans les modèles RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_OLLAMA_BASE_URL`

- Type : `str`
- Description : Définit l'URL de base pour l'API Ollama utilisée dans les modèles RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- Type : `bool`
- Valeur par défaut : `True`
- Description : Active ou désactive la génération de requêtes de récupération.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- Type : `str`
- Valeur par défaut : La valeur de la variable d'environnement `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE` :

```
### Tâche :
Analysez l'historique de chat pour déterminer la nécessité de générer des requêtes de recherche, dans la langue donnée. Par défaut, **priorisez la génération de 1 à 3 requêtes de recherche larges et pertinentes** sauf si vous êtes absolument certain qu'aucune information supplémentaire n'est requise. L'objectif est de récupérer des informations complètes, mises à jour et utiles même avec un minimum d'incertitude. Si aucune recherche n'est absolument nécessaire, retournez une liste vide.

### Directives :
- Répondez **EXCLUSIVEMENT** avec un objet JSON. Toute forme de commentaire supplémentaire, explication ou texte additionnel est strictement interdite.
- Lors de la génération de requêtes de recherche, répondez au format : { "queries": ["requête1", "requête2"] }, en veillant à ce que chaque requête soit distincte, concise et pertinente pour le sujet.
- Si et seulement si il est entièrement certain qu'aucun résultat utile ne peut être obtenu par une recherche, retournez : { "queries": [] }.
- Privilégiez la suggestion de requêtes de recherche s'il y a **la moindre chance** qu'elles puissent fournir des informations utiles ou mises à jour.
- Soyez concis et concentrez-vous sur la composition de requêtes de recherche de haute qualité, en évitant les élaborations inutiles, les commentaires ou les suppositions.
- La date du jour est : {{CURRENT_DATE}}.
- Priorisez toujours la fourniture de requêtes actionnables et générales qui maximisent la couverture informationnelle.

### Résultat :
Retournez exclusivement au format JSON : 
{
  "queries": ["requête1", "requête2"]
}

### Historique de chat :
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Description : Définit le modèle de prompt pour la génération de requêtes.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Contourne le processus d'embedding et de récupération.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie l'endpoint pour l'intelligence documentaire.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_KEY`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie la clé pour l'intelligence documentaire.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Active ou désactive la récupération locale sur le web pour RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie le préfixe pour le contenu des embeddings RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie le nom du champ pour le préfixe des embeddings RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_EMBEDDING_QUERY_PREFIX`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie le préfixe pour la requête des embeddings RAG.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `RAG_FULL_CONTEXT`

- Type: `bool`
- Default: `False`
- Description: Spécifie si le contexte complet doit être utilisé pour RAG.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'intégration Google Drive. Si activée, et que `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` sont tous deux configurés, Google Drive apparaîtra comme option de téléversement dans l'interface utilisateur de chat.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

:::info

Lors de l'activation de `GOOGLE_DRIVE_INTEGRATION`, assurez-vous d'avoir correctement configuré `GOOGLE_DRIVE_CLIENT_ID` et `GOOGLE_DRIVE_API_KEY`, et d'avoir examiné les conditions d'utilisation et les directives d'utilisation de Google.

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- Type: `str`
- Description: Définit l'ID client pour Google Drive (le client doit être configuré avec l'API Drive et l'API Picker activées).
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_DRIVE_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'intégration Google Drive.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'intégration OneDrive.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `ONEDRIVE_CLIENT_ID`

- Type: `str`
- Default: `None`
- Description: Spécifie l'ID client pour l'intégration OneDrive.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

## Recherche Web

#### `ENABLE_WEB_SEARCH`

- Type: `bool`
- Default: `False`
- Description: Activer ou désactiver la recherche Web.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_SEARCH_QUERY_GENERATION`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive la génération de requêtes de recherche.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEB_SEARCH_TRUST_ENV`

- Type: `bool`
- Default: `False`
- Description: Active le proxy défini par `http_proxy` et `https_proxy` lors de la récupération du contenu de la recherche Web.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEB_SEARCH_RESULT_COUNT`

- Type: `int`
- Default: `3`
- Description: Nombre maximal de résultats de recherche à explorer.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- Type: `int`
- Default: `10`
- Description: Nombre de requêtes simultanées pour explorer les pages Web retournées par les résultats de recherche.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEB_SEARCH_ENGINE`

- Type: `str`
- Options:
  - `searxng` - Utilise le moteur de recherche [SearXNG](https://github.com/searxng/searxng).
  - `google_pse` - Utilise le moteur de recherche [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/).
  - `brave` - Utilise le moteur de recherche [Brave](https://brave.com/search/api/).
  - `kagi` - Utilise le moteur de recherche [Kagi](https://www.kagi.com/).
  - `mojeek` - Utilise le moteur de recherche [Mojeek](https://www.mojeek.com/).
  - `bocha` - Utilise le moteur de recherche Bocha.
  - `serpstack` - Utilise le moteur de recherche [Serpstack](https://serpstack.com/).
  - `serper` - Utilise le moteur de recherche [Serper](https://serper.dev/).
  - `serply` - Utilise le moteur de recherche [Serply](https://serply.io/).
  - `searchapi` - Utilise le moteur de recherche [SearchAPI](https://www.searchapi.io/).
  - `serpapi` - Utilise le moteur de recherche [SerpApi](https://serpapi.com/).
  - `duckduckgo` - Utilise le moteur de recherche [DuckDuckGo](https://duckduckgo.com/).
  - `tavily` - Utilise le moteur de recherche [Tavily](https://tavily.com/).
  - `jina` - Utilise le moteur de recherche [Jina](https://jina.ai/).
  - `bing` - Utilise le moteur de recherche [Bing](https://www.bing.com/).
  - `exa` - Utilise le moteur de recherche [Exa](https://exa.ai/).
  - `perplexity` - Utilise le moteur de recherche [Perplexity AI](https://www.perplexity.ai/).
  - `sougou` - Utilise le moteur de recherche [Sougou](https://www.sogou.com/).
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- Type: `bool`
- Default: `False`
- Description: Contourne le processus d'intégration et de récupération de la recherche Web.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SEARXNG_QUERY_URL`

- Type: `str`
- Description: L'URL de l'API de recherche [SearXNG](https://docs.searxng.org/dev/search_api.html) supportant une sortie JSON. `<query>` est remplacé par
la requête de recherche. Exemple : `http://searxng.local/search?q=<query>`
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_PSE_API_KEY`

- Type: `str`
- Description: Définit la clé API pour le service Google Programmable Search Engine (PSE).
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_PSE_ENGINE_ID`

- Type: `str`
- Description: L'ID du moteur pour le service Google Programmable Search Engine (PSE).
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `BRAVE_SEARCH_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API Brave Search.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `KAGI_SEARCH_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Kagi.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `MOJEEK_SEARCH_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Mojeek.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPSTACK_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Serpstack.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPSTACK_HTTPS`

- Type: `bool`
- Default: `True`
- Description: Configure l'utilisation de HTTPS pour les requêtes Serpstack. Les requêtes au niveau gratuit sont limitées à HTTP uniquement.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPER_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Serper.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPLY_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Serply.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SEARCHAPI_API_KEY`

- Type: `str`
- Description: Définit la clé API pour SearchAPI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SEARCHAPI_ENGINE`

- Type: `str`
- Description: Définit le moteur SearchAPI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `TAVILY_API_KEY`

- Type: `str`
- Description: Définit la clé API pour l'API de recherche Tavily.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `JINA_API_KEY`

- Type: `str`
- Description: Définit la clé API pour Jina.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `BING_SEARCH_V7_ENDPOINT`

- Type: `str`
- Description: Définit l'endpoint pour l'API Bing Search.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- Type: `str`
- Default: `https://api.bing.microsoft.com/v7.0/search`
- Description: Définit la clé d'abonnement pour l'API Bing Search.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `BOCHA_SEARCH_API_KEY`

- Type: `str`
- Default: `None`
- Description: Définit la clé API pour l'API de recherche Bocha.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `EXA_API_KEY`

- Type: `str`
- Default: `None`
- Description: Définit la clé API pour l'API de recherche Exa.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPAPI_API_KEY`

- Type: `str`
- Default: `None`
- Description: Définit la clé API pour SerpAPI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SERPAPI_ENGINE`

- Type: `str`
- Default: `None`
- Description: Spécifie le moteur de recherche à utiliser pour SerpAPI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SOUGOU_API_SID`

- Type: `str`
- Default: `None`
- Description: Définit l'identifiant SID pour l'API Sogou.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `SOUGOU_API_SK`

- Type: `str`
- Default: `None`
- Description: Définit la clé secrète SK pour l'API Sogou.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `TAVILY_EXTRACT_DEPTH`

- Type: `str`
- Default: `basic`
- Description: Spécifie la profondeur d'extraction pour les résultats de recherche Tavily.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### Configuration du chargeur Web

#### `WEB_LOADER_ENGINE`

- Type: `str`
- Default: `safe_web`
- Description: Spécifie le chargeur à utiliser pour récupérer et traiter le contenu Web.
- Options:
  - `requests` - Utilise le module Requests avec une gestion des erreurs améliorée.
  - `playwright` - Utilise Playwright pour un rendu et une interaction plus avancés des pages web.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

:::info

Lors de l'utilisation de `playwright`, vous avez deux options :

1. Si `PLAYWRIGHT_WS_URI` n'est pas défini, Playwright avec les dépendances Chromium sera automatiquement installé dans le conteneur Open WebUI au lancement.
2. Si `PLAYWRIGHT_WS_URI` est défini, Open WebUI se connectera à une instance de navigateur distant au lieu d'installer les dépendances localement.

:::

#### `PLAYWRIGHT_WS_URL`

- Type: `str`
- Default: `None`
- Description : Spécifie l'URI WebSocket d'une instance de navigateur Playwright distante. Lorsqu'il est défini, Open WebUI utilisera ce navigateur distant au lieu d'installer des dépendances de navigateur localement. Cela est particulièrement utile dans les environnements conteneurisés où vous souhaitez conserver le conteneur Open WebUI léger et séparer les aspects du navigateur. Exemple : `ws://playwright:3000`
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

:::astuce

Utiliser un navigateur Playwright distant via `PLAYWRIGHT_WS_URL` peut être bénéfique pour :

- Réduire la taille du conteneur Open WebUI
- Utiliser un navigateur différent du Chromium par défaut
- Se connecter à un navigateur non headless (GUI)

:::

#### `FIRECRAWL_API_BASE_URL`

- Type : `str`
- Valeur par défaut : `https://api.firecrawl.dev`
- Description : Configure l'URL de base pour l'API Firecrawl.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `FIRECRAWL_API_KEY`

- Type : `str`
- Valeur par défaut : `None`
- Description : Configure la clé API pour l'API Firecrawl.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `PERPLEXITY_API_KEY`

- Type : `str`
- Valeur par défaut : `None`
- Description : Configure la clé API pour l'API Perplexity.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `PLAYWRIGHT_TIMEOUT`

- Type : `int`
- Valeur par défaut : Chaîne vide ( ), puisque `None` est défini comme valeur par défaut.
- Description : Spécifie le délai d'attente pour les requêtes Playwright.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Chargeur YouTube

#### `YOUTUBE_LOADER_PROXY_URL`

- Type : `str`
- Description : Configure l'URL du proxy pour le chargeur YouTube.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `YOUTUBE_LOADER_LANGUAGE`

- Type : `str`
- Valeur par défaut : `en`
- Description : Liste des codes langue séparés par des virgules à essayer lors de la récupération des transcriptions vidéo YouTube, dans l'ordre de priorité.
- Exemple : Si défini sur `es,de`, les transcriptions espagnoles seront tentées en premier, puis allemand si l'espagnol n'était pas disponible, et enfin anglais. Note : Si aucune des langues spécifiées n'est disponible et que `en` ne figurait pas dans votre liste, le système essaiera automatiquement l'anglais comme dernier recours.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

## Audio

### Whisper Speech-to-Text (Local)

#### `WHISPER_MODEL`

- Type : `str`
- Valeur par défaut : `base`
- Description : Configure le modèle Whisper à utiliser pour la conversion Parole-texte. Le backend utilisé est faster_whisper avec quantification en `int8`.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `WHISPER_MODEL_DIR`

- Type : `str`
- Valeur par défaut : `${DATA_DIR}/cache/whisper/models`
- Description : Spécifie le répertoire où stocker les fichiers modèles Whisper.

#### `WHISPER_VAD_FILTER`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Spécifie s'il faut appliquer un filtre de détection d'activité vocale (VAD) à Whisper Speech-to-Text.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `WHISPER_MODEL_AUTO_UPDATE`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Active ou désactive la mise à jour automatique des modèles Whisper.

#### `WHISPER_LANGUAGE`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie la langue ISO 639-1 utilisée par Whisper pour STT (ISO 639-2 pour hawaïen et cantonais). Whisper prédit la langue par défaut.

### Parole-texte (OpenAI)

#### `AUDIO_STT_ENGINE`

- Type : `str`
- Options :
  - Laissez vide pour utiliser le moteur Whisper local intégré pour la conversion Parole-texte.
  - `openai` - Utilise le moteur OpenAI pour la conversion Parole-texte.
  - `deepgram` - Utilise le moteur Deepgram pour la conversion Parole-texte.
  - `azure` Utilise le moteur Azure pour la conversion Parole-texte.
- Description : Spécifie le moteur Parole-texte à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_STT_MODEL`

- Type : `str`
- Valeur par défaut : `whisper-1`
- Description : Spécifie le modèle Parole-texte à utiliser pour les points d'accès compatibles OpenAI.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_BASE_URL}`
- Description : Configure l'URL de base compatible OpenAI à utiliser pour la conversion Parole-texte.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_KEY`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_KEY}`
- Description : Configure la clé API OpenAI à utiliser pour la conversion Parole-texte.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Parole-texte (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie la clé API Azure à utiliser pour la conversion Parole-texte.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_STT_AZURE_REGION`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie la région Azure à utiliser pour la conversion Parole-texte.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_STT_AZURE_LOCALES`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie les paramètres régionaux à utiliser pour Azure Speech-to-Text.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Parole-texte (Deepgram)

#### `DEEPGRAM_API_KEY`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie la clé API Deepgram à utiliser pour la conversion Parole-texte.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Synthèse vocale

#### `AUDIO_TTS_API_KEY`

- Type : `str`
- Description : Définit la clé API pour la synthèse vocale.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_ENGINE`

- Type : `str`
- Options :
  - Laisser vide pour utiliser le moteur WebAPI intégré pour la synthèse vocale.
  - `azure` - Utilise le moteur Azure pour la synthèse vocale.
  - `elevenlabs` - Utilise le moteur ElevenLabs pour la synthèse vocale.
  - `openai` - Utilise le moteur OpenAI pour la synthèse vocale.
  - `transformers` - Utilise SentenceTransformers pour la synthèse vocale.
- Description : Spécifie le moteur de synthèse vocale à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_MODEL`

- Type : `str`
- Valeur par défaut : `tts-1`
- Description : Spécifie le modèle de synthèse vocale OpenAI à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_VOICE`

- Type : `str`
- Valeur par défaut : `alloy`
- Description : Définit la voix de synthèse vocale OpenAI à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_SPLIT_ON`

- Type : `str`
- Valeur par défaut : `punctuation`
- Description : Définit la séparation de la synthèse vocale OpenAI à utiliser.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Synthèse vocale Azure

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- Type : `str`
- Description : Définit la région pour Azure Text-to-Speech.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- Type : `str`
- Description : Définit le format de sortie pour Azure Text-to-Speech.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### Synthèse vocale OpenAI

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_BASE_URL}`
- Description : Définit l'URL de base OpenAI-compatible à utiliser pour la synthèse vocale.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUDIO_TTS_OPENAI_API_KEY`

- Type : `str`
- Valeur par défaut : `${OPENAI_API_KEY}`
- Description : Définit la clé API à utiliser pour la synthèse vocale.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

## Génération d'images

#### `IMAGE_GENERATION_ENGINE`

- Type : `str`
- Options :
  - `openai` - Utilise OpenAI DALL-E pour la génération d'images.
  - `comfyui` - Utilise le moteur ComfyUI pour la génération d'images.
  - `automatic1111` - Utilise le moteur AUTOMATIC1111 pour la génération d'images.
  - `gemini` - Utilise Gemini pour la génération d'images.
- Valeur par défaut : `openai`
- Description : Spécifie le moteur à utiliser pour la génération d'images.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_IMAGE_GENERATION`

- Type : `bool`
- Valeur par défaut : `False`
- Description : Active ou désactive les fonctionnalités de génération d'images.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- Type : `bool`
- Valeur par défaut : `True`
- Description : Active ou désactive la génération de suggestions pour les images.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- Type : `str`
- Valeur par défaut : `None`
- Description : Spécifie le modèle à utiliser pour générer les suggestions d'images.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE` :

```
### Tâche :
Générez une description détaillée pour une tâche de génération d'image basée sur le langage et le contexte donnés. Décrivez l'image comme si vous l'expliquiez à quelqu'un qui ne peut pas la voir. Incluez des détails pertinents, les couleurs, les formes et tout autre élément important.

### Directives :
- Soyez descriptif et détaillé, en vous concentrant sur les aspects les plus importants de l'image.
- Évitez de faire des suppositions ou d'ajouter des informations non présentes dans l'image.
- Utilisez la langue principale du chat ; par défaut à l'anglais si multilingue.
- Si l'image est trop complexe, concentrez-vous sur les éléments les plus proéminents.

### Sortie :
Retournez strictement au format JSON :
{
    "prompt": "Votre description détaillée ici."
}

### Historique du Chat :
<historique_du_chat>
{{MESSAGES:END:6}}
</historique_du_chat>
```

#### `IMAGE_SIZE`

- Type : `str`
- Valeur par défaut : `512x512`
- Description : Définit la taille d'image par défaut à générer.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGE_STEPS`

- Type : `int`
- Valeur par défaut : `50`
- Description : Définit le nombre d'itérations par défaut pour la génération d'images. Utilisé pour ComfyUI et AUTOMATIC1111.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGE_GENERATION_MODEL`

- Type : `str`
- Description : Modèle par défaut à utiliser pour la génération d'images.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- Type : `str`
- Description : Spécifie l'URL de l'API Stable Diffusion d'AUTOMATIC1111.
- Persistance : Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUTOMATIC1111_API_AUTH`

- Type : `str`
- Description: Définit l'authentification de l'API AUTOMATIC1111.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUTOMATIC1111_CFG_SCALE`

- Type: `float`
- Description: Définit l'échelle pour l'inférence AUTOMATIC1111.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUTOMATIC1111_SAMPLER`

- Type: `str`
- Description: Définit le sampler pour l'inférence AUTOMATIC1111.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `AUTOMATIC1111_SCHEDULER`

- Type: `str`
- Description: Définit le scheduler pour l'inférence AUTOMATIC1111.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### ComfyUI

#### `COMFYUI_BASE_URL`

- Type: `str`
- Description: Spécifie l'URL de l'API de génération d'images ComfyUI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `COMFYUI_API_KEY`

- Type: `str`
- Description: Définit la clé API pour ComfyUI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `COMFYUI_WORKFLOW`

- Type: `str`
- Default:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  }
}
```

- Description: Définit le workflow de ComfyUI.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### Gemini

#### `GEMINI_API_BASE_URL`

- Type: `str`
- Default: `None`
- Description: Spécifie l'URL de l'API de Gemini.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GEMINI_API_KEY`

- Type: `str`
- Default: `None`
- Description: Définit la clé API de Gemini.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGES_GEMINI_API_BASE_URL`

- Type: `str`
- Default: `None`
- Description: Spécifie l'URL de l'API de génération d'images de Gemini.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGES_GEMINI_API_KEY`

- Type: `str`
- Default: `None`
- Description: Définit la clé API de Gemini pour la génération d'images.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- Type: `str`
- Default: `${OPENAI_API_BASE_URL}`
- Description: Définit l'URL de base compatible avec OpenAI à utiliser pour la génération d'images DALL-E.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `IMAGES_OPENAI_API_KEY`

- Type: `str`
- Default: `${OPENAI_API_KEY}`
- Description: Définit la clé API à utiliser pour la génération d'images DALL-E.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- Type: `bool`
- Default: `False`
- Description: Permet la création de compte lors de l'inscription via OAuth. Distinct de `ENABLE_SIGNUP`.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

:::danger

`ENABLE_LOGIN_FORM` doit être réglé sur `False` lorsque `ENABLE_OAUTH_SIGNUP` est réglé sur `True`. Ne pas le faire entraînera une impossibilité de se connecter.

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- Type: `bool`
- Default: `False`
- Description: Si activé, fusionne les comptes OAuth avec des comptes existants utilisant la même
adresse email. Cela est considéré comme peu sûr car tous les fournisseurs OAuth ne vérifient pas les adresses email, ce qui pourrait entraîner des prises de contrôle de compte.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- Type: `bool`
- Default: `False`
- Description: Si activé, met à jour la photo de profil local de l'utilisateur avec celle fournie par OAuth lors de la connexion.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- Type: `str`
- Description: Définit l'en-tête de requête de confiance pour l'authentification. Voir [docs SSO](/features/sso).

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- Type: `str`
- Description: Définit l'en-tête de requête de confiance pour le nom d'utilisateur de toute personne s'inscrivant avec l'en-tête
`WEBUI_AUTH_TRUSTED_EMAIL_HEADER`. Voir [docs SSO](/features/sso).

### Google

Voir https://support.google.com/cloud/answer/6158849?hl=en

#### `GOOGLE_CLIENT_ID`

- Type: `str`
- Description: Définit l'identifiant client pour Google OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_CLIENT_SECRET`

- Type: `str`
- Description: Définit le secret client pour Google OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_OAUTH_SCOPE`

- Type: `str`
- Default: `openid email profile`
- Description: Définit le périmètre pour l'authentification Google OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GOOGLE_REDIRECT_URI`

- Type: `str`
- Default: `<backend>/oauth/google/callback`
- Description: Définit l'URI de redirection pour Google OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### Microsoft

Voir https://learn.microsoft.com/fr-fr/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- Type: `str`
- Description: Définit l'identifiant client pour Microsoft OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `MICROSOFT_CLIENT_SECRET`

- Type: `str`
- Description: Définit le secret client pour Microsoft OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `MICROSOFT_CLIENT_TENANT_ID`

- Type: `str`
- Description: Définit l'identifiant du locataire pour Microsoft OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `MICROSOFT_OAUTH_SCOPE`

- Type: `str`
- Default: `openid email profile`
- Description: Définit le périmètre pour l'authentification Microsoft OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `MICROSOFT_REDIRECT_URI`

- Type: `str`
- Default: `<backend>/oauth/microsoft/callback`
- Description: Définit l'URI de redirection pour Microsoft OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### GitHub

Voir https://docs.github.com/fr/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- Type: `str`
- Description: Définit l'identifiant client pour GitHub OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GITHUB_CLIENT_SECRET`

- Type: `str`
- Description: Définit le secret client pour GitHub OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GITHUB_CLIENT_SCOPE`

- Type: `str`
- Default: `user:email`
- Description: Spécifie le périmètre pour l'authentification GitHub OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `GITHUB_CLIENT_REDIRECT_URI`

- Type: `str`
- Default: `<backend>/oauth/github/callback`
- Description: Définit l'URI de redirection pour GitHub OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- Type: `str`
- Description: Définit l'identifiant client pour OIDC.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_CLIENT_SECRET`

- Type: `str`
- Description: Définit le secret client pour OIDC.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OPENID_PROVIDER_URL`

- Type: `str`
- Description: Chemin vers le point d'accès `.well-known/openid-configuration`
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OPENID_REDIRECT_URI`

- Type: `str`
- Default: `<backend>/oauth/oidc/callback`
- Description: Définit l'URI de redirection pour OIDC
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_SCOPES`

- Type: `str`
- Default: `openid email profile`
- Description: Définit le périmètre pour l'authentification OIDC. `openid` et `email` sont obligatoires.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_CODE_CHALLENGE_METHOD`

- Type: `str`
- Default: Chaîne vide ( ), car `None` est défini par défaut.
- Description: Spécifie la méthode de défi de code pour l'authentification OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_PROVIDER_NAME`

- Type: `str`
- Default: `SSO`
- Description: Définit le nom du fournisseur OIDC.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_USERNAME_CLAIM`

- Type: `str`
- Default: `name`
- Description: Définit la revendication de nom d'utilisateur pour OpenID.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_EMAIL_CLAIM`

- Type: `str`
- Default: `email`
- Description: Définir l'attribut email pour OpenID.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_PICTURE_CLAIM`

- Type: `str`
- Default: `picture`
- Description: Définir l'attribut image (avatar) pour OpenID.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_GROUP_CLAIM`

- Type: `str`
- Default: `groups`
- Description: Spécifie l'attribut de groupe pour l'authentification OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- Type: `bool`
- Default: `False`
- Description: Active la gestion des rôles pour la délégation OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive la gestion des groupes OAuth.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_ROLES_CLAIM`

- Type: `str`
- Default: `roles`
- Description: Définir l'attribut des rôles à consulter dans le jeton OIDC.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_ALLOWED_ROLES`

- Type: `str`
- Default: `user,admin`
- Description: Définir les rôles qui ont accès à la plateforme.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_ADMIN_ROLES`

- Type: `str`
- Default: `admin`
- Description: Définir les rôles considérés comme administrateurs.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `OAUTH_ALLOWED_DOMAINS`

- Type: `str`
- Default: `*`
- Description: Spécifie les domaines autorisés pour l'authentification OAuth. (par exemple, "example1.com,example2.com").
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

## LDAP

#### `ENABLE_LDAP`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'authentification LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_SERVER_LABEL`

- Type: `str`
- Description: Définir le label du serveur LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.


#### `LDAP_SERVER_HOST`

- Type: `str`
- Default: `localhost`
- Description: Définir le nom d'hôte du serveur LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_SERVER_PORT`

- Type: `int`
- Default: `389`
- Description: Définir le numéro de port du serveur LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- Type: `str`
- Description: Définir l'attribut à utiliser comme email pour l'authentification LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- Type: `str`
- Description: Définir l'attribut à utiliser comme nom d'utilisateur pour l'authentification LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_APP_DN`

- Type: `str`
- Description: Définir le nom distinctif pour l'application LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_APP_PASSWORD`

- Type: `str`
- Description: Définir le mot de passe de l'application LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_SEARCH_BASE`

- Type: `str`
- Description: Définir la base pour la recherche d'authentification LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_SEARCH_FILTER`

- Type: `str`
- Default: `None`
- Description: Définir un seul filtre pour la recherche LDAP. Alternative à `LDAP_SEARCH_FILTERS`.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_SEARCH_FILTERS`

- Type: `str`
- Description: Définir le filtre pour la recherche LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_USE_TLS`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive TLS pour la connexion LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_CA_CERT_FILE`

- Type: `str`
- Description: Définir le chemin vers le fichier de certificat CA LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_VALIDATE_CERT`

- Type: `bool`
- Description: Définir si le certificat CA LDAP doit être validé.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `LDAP_CIPHERS`

- Type: `str`
- Default: `ALL`
- Description: Définir les chiffres à utiliser pour la connexion LDAP.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

## Permissions utilisateur

### Permissions de Chat

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive la permission des utilisateurs à accéder aux contrôles de chat.
- Persistence: Cette variable d'environnement est une variable `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur de téléverser des fichiers dans les discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_DELETE`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur de supprimer des discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_EDIT`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur de modifier des discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_STT`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser la reconnaissance vocale dans les discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TTS`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser la synthèse vocale dans les discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_CALL`

- Type: `str`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur de passer des appels dans les discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- Type: `str`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser plusieurs modèles dans les discussions.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- Type: `bool`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur de créer des discussions temporaires.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- Type: `str`
- Default: `False`
- Description: Active ou désactive l'application forcée des discussions temporaires pour les utilisateurs.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

### Feature Permissions

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- Type: `str`
- Default: `False`
- Description: Active ou désactive l'autorisation utilisateur d'accéder aux serveurs d'outils directs.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- Type: `str`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser la fonctionnalité de recherche web.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- Type: `str`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser la génération d'images.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- Type: `str`
- Default: `True`
- Description: Active ou désactive l'autorisation utilisateur d'utiliser l'interpréteur de code.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

### Workspace Permissions

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'autorisation utilisateur d'accéder aux modèles de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'autorisation utilisateur d'accéder aux connaissances de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'autorisation utilisateur d'accéder aux invites de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- Type: `bool`
- Default: `False`
- Description: Active ou désactive l'autorisation utilisateur d'accéder aux outils de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- Type: `str`
- Default: `False`
- Description: Active ou désactive le partage public des modèles de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- Type: `str`
- Default: `False`
- Description: Active ou désactive le partage public des connaissances de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- Type: `str`
- Default: `False`
- Description: Active ou désactive le partage public des invites de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- Type: `str`
- Default: `False`
- Description: Active ou désactive le partage public des outils de l'espace de travail.
- Persistence: Cette variable d'environnement est une variable de type `PersistentConfig`.

## Misc Environment Variables

Ces variables ne sont pas spécifiques à Open WebUI mais peuvent être précieuses dans certains contextes.

### Stockage Cloud

#### `STORAGE_PROVIDER`

- Type : `str`
- Options :
  - `s3` - utilise la bibliothèque client S3 et les variables d'environnement mentionnées dans [Stockage Amazon S3](#amazon-s3-storage)
  - `gcs` - utilise la bibliothèque client GCS et les variables d'environnement mentionnées dans [Stockage Google Cloud](#google-cloud-storage)
  - `azure` - utilise la bibliothèque client Azure et les variables d'environnement mentionnées dans [Stockage Microsoft Azure](#microsoft-azure-storage)
- Par défaut : chaîne vide ( ), équivalente à `local`
- Description : Définit le fournisseur de stockage.

#### Stockage Amazon S3

#### `S3_ACCESS_KEY_ID`

- Type : `str`
- Description : Définit l'identifiant de clé d'accès pour le stockage S3.

#### `S3_ADDRESSING_STYLE`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie le style d'adressage à utiliser pour le stockage S3 (par exemple, path, virtual).

#### `S3_BUCKET_NAME`

- Type : `str`
- Description : Définit le nom du bucket pour le stockage S3.

#### `S3_ENDPOINT_URL`

- Type : `str`
- Description : Définit l'URL du point de terminaison pour le stockage S3.

#### `S3_KEY_PREFIX`

- Type : `str`
- Description : Définit le préfixe de clé pour un objet S3.

#### `S3_REGION_NAME`

- Type : `str`
- Description : Définit le nom de la région pour le stockage S3.

#### `S3_SECRET_ACCESS_KEY`

- Type : `str`
- Description : Définit la clé d'accès secrète pour le stockage S3.

#### `S3_USE_ACCELERATE_ENDPOINT`

- Type : `str`
- Par défaut : `False`
- Description : Spécifie si l'on doit utiliser le point de terminaison accéléré pour le stockage S3.

#### `S3_ENABLE_TAGGING`

- Type : `str`
- Par défaut : `False`
- Description : Active le marquage des objets S3 après les téléchargements pour une meilleure organisation, recherche et intégration avec des politiques de gestion de fichiers. Toujours réglé sur `False` lorsque l'on utilise Cloudflare R2, car R2 ne prend pas en charge le marquage des objets.

#### Stockage Google Cloud

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- Type : `str`
- Description : Contenu du fichier JSON contenant les informations d'identification de l'application Google.
  - Facultatif - si non fourni, les identifiants seront récupérés à partir de l'environnement. Identifiants utilisateur si exécuté localement et serveur de métadonnées Google si exécuté sur un moteur de calcul Google.
  - Un fichier peut être généré pour un compte de service en suivant ce [guide.](https://developers.google.com/workspace/guides/create-credentials#service-account)

#### `GCS_BUCKET_NAME`

- Type : `str`
- Description : Définit le nom du bucket pour le stockage Google Cloud. Le bucket doit déjà exister.

#### Stockage Microsoft Azure

#### `AZURE_STORAGE_ENDPOINT`

- Type : `str`
- Description : Définit l'URL du point de terminaison pour le stockage Azure.

#### `AZURE_STORAGE_CONTAINER_NAME`

- Type : `str`
- Description : Définit le nom du conteneur pour le stockage Azure.

#### `AZURE_STORAGE_KEY`

- Type : `str`
- Description : Définit la clé d'accès pour le stockage Azure.
  - Facultatif - si non fourni, les identifiants seront récupérés à partir de l'environnement. Identifiants utilisateur si exécuté localement et Identity Managed si exécuté dans les services Azure.

### Pool de Bases de Données

#### `DATABASE_URL`

- Type : `str`
- Par défaut : `sqlite:///${DATA_DIR}/webui.db`
- Description : Spécifie l'URL de la base de données à laquelle se connecter.

:::info

Prend en charge SQLite et Postgres. Modifier l'URL ne migre pas les données entre les bases de données.
Une documentation sur le schéma d'URL est disponible [ici.](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)

:::

#### `DATABASE_SCHEMA`

- Type : `str`
- Par défaut : `None`
- Description : Spécifie le schéma de base de données auquel se connecter.

#### `DATABASE_POOL_SIZE`

- Type : `int`
- Par défaut : `0`
- Description : Spécifie la taille du pool de la base de données. Une valeur de `0` désactive le pool.

#### `DATABASE_POOL_MAX_OVERFLOW`

- Type : `int`
- Par défaut : `0`
- Description : Spécifie le débordement maximal du pool de la base de données.

:::info

Plus d'informations sur cette configuration sont disponibles [ici.](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)

:::

#### `DATABASE_POOL_TIMEOUT`

- Type : `int`
- Par défaut : `30`
- Description : Spécifie le délai d'attente du pool de base de données en secondes pour obtenir une connexion.

:::info

Plus d'informations sur cette configuration sont disponibles [ici.](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)

:::

#### `DATABASE_POOL_RECYCLE`

- Type : `int`
- Par défaut : `3600`
- Description : Spécifie le temps de recyclage du pool de base de données en secondes.

:::info

Plus d'informations sur cette configuration sont disponibles [ici.](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)

:::

### Redis

#### `REDIS_URL`

- Type : `str`
- Exemple : `redis://localhost:6379/0`
- Description : Spécifie l'URL de l'instance Redis pour l'état de l'application.

:::info

Lors du déploiement d'Open-WebUI dans un cluster multi-nœuds/travailleurs, vous devez vous assurer que la valeur REDIS_URL est définie. Sans cela, des problèmes de session, de persistance et de cohérence dans l'état de l'application se produiront car les travailleurs seront incapables de communiquer.

:::

#### `REDIS_SENTINEL_HOSTS`

- Type : `str`
- Description : Liste des sentinelles Redis séparées par des virgules pour l'état de l'application. Si spécifié, le "hostname" dans `REDIS_URL` sera interprété comme le nom du service Sentinelle.

#### `REDIS_SENTINEL_PORT`

- Type : `int`
- Défaut : `26379`
- Description : Port Sentinel pour l'état Redis de l'application.

#### `ENABLE_WEBSOCKET_SUPPORT`

- Type : `bool`
- Défaut : `True`
- Description : Permet la prise en charge des websockets dans Open WebUI.

:::info

Lors du déploiement d'Open-WebUI dans un cluster multi-nœuds/travailleurs, vous devez vous assurer que la valeur ENABLE_WEBSOCKET_SUPPORT est définie. Sans cela, des problèmes de cohérence et de persistance des websockets se produiront.

:::

#### `WEBSOCKET_MANAGER`

- Type : `str`
- Défaut : `redis`
- Description : Spécifie le gestionnaire de websockets à utiliser (dans ce cas, Redis).

:::info

Lors du déploiement d'Open-WebUI dans un cluster multi-nœuds/travailleurs, vous devez vous assurer que la valeur WEBSOCKET_MANAGER est définie et qu'une base de données NoSQL clé-valeur comme Redis est utilisée. Sans cela, des problèmes de cohérence et de persistance des websockets se produiront.

:::

#### `WEBSOCKET_REDIS_URL`

- Type : `str`
- Défaut : `${REDIS_URL}`
- Description : Spécifie l'URL de l'instance Redis pour la communication par websocket. Elle est distincte de `REDIS_URL` et, en pratique, il est recommandé de définir les deux.

:::info

Lors du déploiement d'Open-WebUI dans un cluster multi-nœuds/travailleurs, vous devez vous assurer que la valeur WEBSOCKET_REDIS_URL est définie et qu'une base de données NoSQL clé-valeur comme Redis est utilisée. Sans cela, des problèmes de cohérence et de persistance des websockets se produiront.

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- Type : `str`
- Description : Liste des sentinelles Redis séparées par des virgules pour le websocket. Si spécifié, le "hostname" dans `WEBSOCKET_REDIS_URL` sera interprété comme le nom du service Sentinelle.

#### `WEBSOCKET_SENTINEL_PORT`

- Type : `int`
- Défaut : `26379`
- Description : Port Sentinelle pour le Redis du websocket.

### Paramètres Uvicorn

#### `UVICORN_WORKERS`

- Type : `int`
- Défaut : `1`
- Description : Contrôle le nombre de processus de travail qu'Uvicorn génère pour gérer les requêtes. Chaque travailleur exécute sa propre instance de l'application dans un processus distinct.

:::info

Lors du déploiement dans des environnements orchestrés comme Kubernetes ou en utilisant des charts Helm, il est recommandé de maintenir UVICORN_WORKERS à 1. Les systèmes d'orchestration de conteneurs fournissent déjà leurs propres mécanismes de mise à l'échelle via la réplication de pods, et l'utilisation de plusieurs travailleurs à l'intérieur des conteneurs peut entraîner des problèmes d'allocation des ressources et compliquer les stratégies de mise à l'échelle horizontale.

Si vous utilisez UVICORN_WORKERS, vous devez également vous assurer que les variables d'environnement associées aux configurations multi-instances évolutives sont définies en conséquence.

:::

### Paramètres de proxy

Open WebUI prend en charge l'utilisation de proxies pour les récupérations HTTP et HTTPS. Pour spécifier les paramètres du proxy,
Open WebUI utilise les variables d'environnement suivantes :

#### `http_proxy`

- Type : `str`
- Description : Définit l'URL du proxy HTTP.

#### `https_proxy`

- Type : `str`
- Description : Définit l'URL du proxy HTTPS.

#### `no_proxy`

- Type : `str`
- Description : Liste les extensions de domaine (ou adresses IP) pour lesquelles le proxy ne doit pas être utilisé,
séparées par des virgules. Par exemple, définir no_proxy à .mit.edu garantit que le proxy est
contourné lors de l'accès à des documents du MIT.

### Installer les paquets Python requis

Open WebUI fournit des variables d'environnement pour personnaliser le processus d'installation pip. Voici les variables d'environnement utilisées par Open WebUI pour ajuster le comportement d'installation des paquets :

#### `PIP_OPTIONS`

- Type : `str`
- Description : Spécifie des options supplémentaires en ligne de commande que pip doit utiliser lors de l'installation des paquets. Par exemple, vous pouvez inclure des options comme `--upgrade`, `--user` ou `--no-cache-dir` pour contrôler le processus d'installation.

#### `PIP_PACKAGE_INDEX_OPTIONS`

- Type : `str`
- Description : Définit le comportement de l'index des paquets personnalisé pour pip. Cela peut inclure la spécification d'URLs d'index supplémentaires ou alternatives (par ex., `--extra-index-url`), des informations d'authentification, ou d'autres paramètres pour gérer la manière dont les paquets sont récupérés à partir de différents emplacements.
