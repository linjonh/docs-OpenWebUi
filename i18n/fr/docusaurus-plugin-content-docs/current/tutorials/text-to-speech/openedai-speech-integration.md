---
sidebar_position: 2
title: "🗨️ Openedai-speech Utilisation de Docker"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas supporté par l'équipe d'Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

**Intégration de `openedai-speech` dans Open WebUI avec Docker**
==============================================================

**Qu'est-ce que `openedai-speech` ?**
-------------------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) est un serveur de synthèse vocale compatible avec l'API audio/vocale d'OpenAI.

Il sert le point d'accès `/v1/audio/speech` et offre une expérience de synthèse vocale gratuite et privée avec des capacités de clonage vocal personnalisé. Ce service n'est en aucun cas affilié à OpenAI et ne nécessite pas de clé API OpenAI.
:::

**Prérequis**
-------------

* Docker installé sur votre système
* Open WebUI fonctionnant dans un conteneur Docker
* Compréhension de base de Docker et Docker Compose

**Option 1 : Utilisation de Docker Compose**
-------------------------------------------

**Étape 1 : Créer un nouveau dossier pour le service `openedai-speech`**
-----------------------------------------------------------------------

Créez un nouveau dossier, par exemple, `openedai-speech-service`, pour stocker les fichiers `docker-compose.yml` et `speech.env`.

**Étape 2 : Cloner le dépôt GitHub `openedai-speech`**
-----------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

Cela téléchargera le dépôt `openedai-speech` sur votre machine locale, comprenant les fichiers Docker Compose (`docker-compose.yml`, `docker-compose.min.yml`, et `docker-compose.rocm.yml`) et autres fichiers nécessaires.

**Étape 3 : Renommer le fichier `sample.env` en `speech.env` (Personnaliser si nécessaire)**
------------------------------------------------------------------------------------------

Dans le dossier du dépôt `openedai-speech`, créez un nouveau fichier nommé `speech.env` avec le contenu suivant :

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**Étape 4 : Choisir un fichier Docker Compose**
----------------------------------------------

Vous pouvez utiliser l'un des fichiers Docker Compose suivants :

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml) : Ce fichier utilise l'image `ghcr.io/matatonic/openedai-speech` et se construit à partir de [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile).
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml) : Ce fichier utilise l'image `ghcr.io/matatonic/openedai-speech-min` et se construit à partir de [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min).
  Cette image est une version minimale qui inclut uniquement le support Piper et ne nécessite pas de GPU.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml) : Ce fichier utilise l'image `ghcr.io/matatonic/openedai-speech-rocm` et se construit à partir de [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) avec support ROCm.

**Étape 4 : Construire l'image Docker choisie**
---------------------------------------------

Avant d'exécuter le fichier Docker Compose, vous devez construire l'image Docker :

* **GPU Nvidia (support CUDA)** :

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **GPU AMD (support ROCm)** :

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **CPU uniquement, Sans GPU (uniquement Piper)** :

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**Étape 5 : Exécuter la commande `docker compose up -d` correcte**
-----------------------------------------------------------------

* **GPU Nvidia (support CUDA)** : Exécutez la commande suivante pour démarrer le service `openedai-speech` en mode détaché :

```bash
docker compose up -d
```

* **GPU AMD (support ROCm)** : Exécutez la commande suivante pour démarrer le service `openedai-speech` en mode détaché :

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Apple M-series, Raspberry Pi)** : XTTS possède uniquement un support CPU ici et sera très lent. Vous pouvez utiliser l'image Nvidia pour XTTS avec CPU (lent), ou utiliser l'image uniquement Piper (recommandé) :

```bash
docker compose -f docker-compose.min.yml up -d
```

* **CPU uniquement, Sans GPU (uniquement Piper)** : Pour une image docker minimale avec uniquement le support Piper (< 1GB vs. 8GB) :

```bash
docker compose -f docker-compose.min.yml up -d
```

Cela démarrera le service `openedai-speech` en mode détaché.

**Option 2 : Utilisation des commandes Docker Run**
-------------------------------------------------

Vous pouvez également utiliser les commandes Docker run suivantes pour démarrer le service `openedai-speech` en mode détaché :

* **GPU Nvidia (CUDA)** : Exécutez la commande suivante pour construire et démarrer le service `openedai-speech` :

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (GPU AMD)** : Exécutez la commande suivante pour construire et démarrer le service `openedai-speech` :

> Pour activer la prise en charge de ROCm, décommentez la ligne `#USE_ROCM=1` dans le fichier `speech.env`.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **CPU uniquement, sans GPU (Piper uniquement)** : Exécutez la commande suivante pour construire et démarrer le service `openedai-speech` :

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**Étape 6 : Configurer Open WebUI pour utiliser `openedai-speech` comme TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Ouvrez les paramètres d'Open WebUI et accédez aux paramètres TTS sous **Admin Panel > Settings > Audio**. Ajoutez la configuration suivante :

* **URL de base de l'API** : `http://host.docker.internal:8000/v1`
* **Clé API** : `sk-111111111` (Notez que c'est une clé API fictive, car `openedai-speech` ne nécessite pas de clé API. Vous pouvez utiliser n'importe quel contenu pour ce champ, tant qu'il est rempli.)

**Étape 7 : Choisir une voix**
--------------------------

Sous `TTS Voice` dans le même menu de paramètres audio du panneau d'administration, vous pouvez définir le `TTS Model` à utiliser parmi les choix suivants pris en charge par `openedai-speech`. Les voix de ces modèles sont optimisées pour la langue anglaise.

* `tts-1` ou `tts-1-hd` : `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova` et `shimmer` (`tts-1-hd` est configurable ; utilise des échantillons OpenAI par défaut)

**Étape 8 : Appuyez sur `Save` pour appliquer les modifications et commencez à profiter de voix naturelles**
--------------------------------------------------------------------------------------------

Appuyez sur le bouton `Save` pour appliquer les modifications aux paramètres d'Open WebUI. Actualisez la page pour que les modifications prennent pleinement effet et profitez de l'intégration de `openedai-speech` dans Open WebUI pour lire des réponses textuelles à haute voix avec une voix naturelle.

**Détails du modèle :**
------------------

`openedai-speech` prend en charge plusieurs modèles de synthèse vocale, chacun avec ses propres forces et exigences. Les modèles suivants sont disponibles :

* **Piper TTS** (très rapide, fonctionne sur CPU) : Utilisez vos propres [voix Piper](https://rhasspy.github.io/piper-samples/) via le fichier de configuration `voice_to_speaker.yaml`. Ce modèle est idéal pour les applications nécessitant une faible latence et des performances élevées. Piper TTS prend également en charge des voix [multilingues](https://github.com/matatonic/openedai-speech#multilingual).
* **Coqui AI/TTS XTTS v2** (rapide, mais nécessite environ 4 Go de VRAM GPU et un GPU Nvidia avec CUDA) : Ce modèle utilise la technologie de clonage vocal XTTS v2 de Coqui AI pour générer des voix de haute qualité. Bien qu'il impose des exigences GPU plus élevées, il offre d'excellentes performances et un son de haute qualité. Coqui prend également en charge des voix [multilingues](https://github.com/matatonic/openedai-speech#multilingual).
* **Support Beta Parler-TTS** (expérimental, plus lent) : Ce modèle utilise le framework Parler-TTS pour générer des voix. Bien qu'il soit actuellement en phase bêta, il vous permet de décrire des caractéristiques très basiques de la voix du locuteur. La voix exacte sera légèrement différente à chaque génération, mais devrait être similaire à la description du locuteur fournie. Pour des idées sur la façon de décrire des voix, voir [Text Description to Speech](https://www.text-description-to-speech.com/).

**Dépannage**
-------------------

Si vous rencontrez des problèmes lors de l'intégration de `openedai-speech` avec Open WebUI, suivez ces étapes de dépannage :

* **Vérifiez le service `openedai-speech`** : Assurez-vous que le service `openedai-speech` est en cours d'exécution et que le port que vous avez spécifié dans le fichier docker-compose.yml est exposé.
* **Vérifiez l'accès à host.docker.internal** : Assurez-vous que le nom d'hôte `host.docker.internal` est résolvable depuis le conteneur Open WebUI. Cela est nécessaire car `openedai-speech` est exposé via `localhost` sur votre PC, mais `open-webui` ne peut normalement pas y accéder depuis son conteneur. Vous pouvez ajouter un volume au fichier docker-compose.yml pour monter un fichier du hôte vers le conteneur, par exemple dans un répertoire qui sera desservi par openedai-speech.
* **Vérifiez la configuration de la clé API** : Assurez-vous que la clé API est définie sur une valeur factice ou laissée effectivement non cochée, car `openedai-speech` ne nécessite pas de clé API.
* **Vérifiez la configuration de la voix** : Assurez-vous que la voix que vous essayez d'utiliser pour le TTS existe dans votre fichier `voice_to_speaker.yaml` et que les fichiers correspondants (par exemple, les fichiers XML de voix) sont présents dans le répertoire correct.
* **Vérifiez les chemins des modèles de voix** : En cas de problèmes de chargement des modèles de voix, vérifiez que les chemins dans votre fichier `voice_to_speaker.yaml` correspondent aux emplacements réels de vos modèles de voix.

**Conseils supplémentaires pour le dépannage**
---------------------------------------------

* Consultez les journaux de `openedai-speech` pour identifier les erreurs ou avertissements qui pourraient indiquer où se situe le problème.
* Assurez-vous que le fichier `docker-compose.yml` est correctement configuré pour votre environnement.
* Si vous rencontrez toujours des problèmes, essayez de redémarrer le service `openedai-speech` ou l'ensemble de l'environnement Docker.
* Si le problème persiste, consultez le dépôt GitHub de `openedai-speech` ou demandez de l'aide sur un forum communautaire pertinent.

**FAQ**
-------

**Comment puis-je contrôler la gamme émotionnelle de l'audio généré ?**

Il n'existe aucun mécanisme direct pour contrôler la sortie émotionnelle de l'audio généré. Certains facteurs, tels que la capitalisation ou la grammaire, peuvent influencer la sortie audio, mais les tests internes ont donné des résultats mitigés.

**Où sont stockés les fichiers de voix ? Qu'en est-il du fichier de configuration ?**

Les fichiers de configuration, qui définissent les voix disponibles et leurs propriétés, sont stockés dans le volume de configuration. Plus précisément, les voix par défaut sont définies dans `voice_to_speaker.default.yaml`.

**Ressources supplémentaires**
-----------------------------

Pour plus d'informations sur la configuration d'Open WebUI pour utiliser `openedai-speech`, y compris la définition des variables d'environnement, consultez la [documentation Open WebUI](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech).

Pour en savoir plus sur `openedai-speech`, veuillez consulter le [dépôt GitHub](https://github.com/matatonic/openedai-speech).

**Comment ajouter des voix supplémentaires à `openedai-speech` :**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
Vous pouvez modifier le numéro de port dans le fichier `docker-compose.yml` pour tout port ouvert et utilisable, mais assurez-vous de mettre à jour l'**URL de base de l'API** dans les paramètres audio Admin d'Open WebUI en conséquence.
:::
