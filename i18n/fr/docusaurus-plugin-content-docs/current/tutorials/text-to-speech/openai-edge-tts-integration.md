---
sidebar_position: 1
title: "🗨️ Utiliser Edge TTS avec Docker"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration pour personnaliser Open WebUI selon votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Intégrer `openai-edge-tts` 🗣️ avec Open WebUI

## Qu'est-ce que `openai-edge-tts` ? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) est une API de synthèse vocale qui imite le point de terminaison de l'API d'OpenAI, permettant un remplacement direct dans les scénarios où vous pouvez définir l'URL du point de terminaison, comme avec Open WebUI.

Il utilise le package [edge-tts](https://github.com/rany2/edge-tts), qui exploite la fonctionnalité gratuite "Lecture à haute voix" du navigateur Edge pour simuler une requête auprès de Microsoft / Azure afin d'obtenir gratuitement une synthèse vocale de très haute qualité.

[Écoutez des exemples de voix ici](https://tts.travisvn.com)

<details>
  <summary>Quelle est la différence avec 'openedai-speech' ?</summary>

Similaire à [openedai-speech](https://github.com/matatonic/openedai-speech), [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) est un point de terminaison d'API de synthèse vocale qui imite le point de terminaison de l'API d'OpenAI, permettant un remplacement direct dans les scénarios où le point de terminaison d'OpenAI Speech est accessible et où l'URL du point de terminaison serveur peut être configurée.

`openedai-speech` est une option plus complète qui permet une génération complètement hors ligne des voix avec de nombreux choix de modalités.

`openai-edge-tts` est une option plus simple qui utilise un package Python appelé `edge-tts` pour générer l'audio.

</details>

## Prérequis

- Docker installé sur votre système
- Open WebUI en cours d'exécution

## ⚡️ Démarrage rapide

La manière la plus simple de commencer sans avoir à configurer quoi que ce soit est de lancer la commande ci-dessous

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

Cela exécutera le service au port 5050 avec toutes les configurations par défaut

## Configuration d'Open WebUI pour utiliser `openai-edge-tts`

- Ouvrez le panneau d'administration et allez dans `Paramètres` -> `Audio`
- Configurez vos paramètres TTS pour correspondre à la capture d'écran ci-dessous
- _Remarque : vous pouvez spécifier la voix TTS ici_

![Capture d'écran des paramètres administratifs d'Open WebUI pour l'audio en ajoutant les points de terminaison corrects pour ce projet](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
La clé API par défaut est la chaîne `your_api_key_here`. Vous n'avez pas besoin de changer cette valeur si vous n'avez pas besoin de sécurité supplémentaire.
:::

**Et c'est tout ! Vous pouvez vous arrêter ici**

# Veuillez ⭐️ étoiler le dépôt sur GitHub si vous trouvez [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) utile


<details>
  <summary>Exécution avec Python</summary>
  
### 🐍 Exécution avec Python

Si vous préférez exécuter ce projet directement avec Python, suivez ces étapes pour configurer un environnement virtuel, installer les dépendances et démarrer le serveur.

#### 1. Clonez le dépôt

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. Configurez un environnement virtuel

Créez et activez un environnement virtuel pour isoler les dépendances :

```bash
# Pour macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Pour Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. Installez les dépendances

Utilisez `pip` pour installer les packages requis listés dans `requirements.txt` :

```bash
pip install -r requirements.txt
```

#### 4. Configurez les variables d'environnement

Créez un fichier `.env` dans le répertoire racine et définissez les variables suivantes :

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. Exécutez le serveur

Une fois configuré, démarrez le serveur avec :

```bash
python app/server.py
```

Le serveur commencera à fonctionner à l'adresse `http://localhost:5050`.

#### 6. Testez l'API

Vous pouvez maintenant interagir avec l'API à l'adresse `http://localhost:5050/v1/audio/speech` et à d'autres points de terminaison disponibles. Consultez la section Utilisation pour des exemples de requêtes.

</details>

<details>
  <summary>Détails d'utilisation</summary>
  
##### Point de terminaison : `/v1/audio/speech` (alias : `/audio/speech`)

Génère de l'audio à partir du texte d'entrée. Paramètres disponibles :

**Paramètre requis :**

- **input** (string) : Le texte à convertir en audio (jusqu'à 4096 caractères).

**Paramètres optionnels :**

- **model** (string) : Définit sur "tts-1" ou "tts-1-hd" (par défaut : `"tts-1"`).
- **voice** (string) : Une des voix compatibles avec OpenAI (alloy, echo, fable, onyx, nova, shimmer) ou toute voix valide `edge-tts` (par défaut : `"en-US-AvaNeural"`).
- **response_format** (string) : Format audio. Options : `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (par défaut : `mp3`).
- **speed** (number) : Vitesse de lecture (0.25 à 4.0). Par défaut : `1.0`.

:::tip
Vous pouvez parcourir les voix disponibles et écouter des aperçus sur [tts.travisvn.com](https://tts.travisvn.com)
:::

Exemple de requête avec `curl` et enregistrement de la sortie dans un fichier mp3 :

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -d {
    "input": "Bonjour, je suis votre assistant IA ! Dites-moi simplement comment je peux aider à donner vie à vos idées.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

Ou, pour être conforme aux paramètres des points de terminaison de l'API OpenAI:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -d {
    "model": "tts-1",
    "input": "Bonjour, je suis votre assistant IA ! Dites-moi simplement comment je peux aider à donner vie à vos idées.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

Et un exemple dans une langue autre que l'anglais :

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer votre_clé_api_ici" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### Points de terminaison supplémentaires

- **POST/GET /v1/models**: Liste des modèles TTS disponibles.
- **POST/GET /v1/voices**: Liste des voix `edge-tts` pour une langue / région donnée.
- **POST/GET /v1/voices/all**: Liste toutes les voix `edge-tts`, avec des informations sur la prise en charge des langues.

:::info
Le `/v1` est maintenant facultatif.

De plus, il existe des points de terminaison pour **Azure AI Speech** et **ElevenLabs** pour un support futur possible si des points de terminaison API personnalisés sont autorisés pour ces options dans Open WebUI.

Ces derniers peuvent être désactivés en définissant la variable d'environnement `EXPAND_API=False`.
:::

</details>

## 🐳 Configuration rapide pour Docker

Vous pouvez configurer les variables d'environnement dans la commande utilisée pour exécuter le projet

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=votre_clé_api_ici \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
Le texte markdown est désormais passé à travers un filtre pour une meilleure lisibilité et prise en charge.

Vous pouvez désactiver cela en définissant la variable d'environnement `REMOVE_FILTER=True`.
:::

## Ressources supplémentaires

Pour plus d'informations sur `openai-edge-tts`, vous pouvez visiter le [repository GitHub](https://github.com/travisvn/openai-edge-tts)

Pour un support direct, vous pouvez visiter le [Discord Voice AI & TTS](https://tts.travisvn.com/discord)

## 🎙️ Échantillons de voix

[Écouter des échantillons de voix et voir toutes les voix Edge TTS disponibles](https://tts.travisvn.com/)
