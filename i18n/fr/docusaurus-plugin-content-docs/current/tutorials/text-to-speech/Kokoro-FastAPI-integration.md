---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI Utilisation avec Docker"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement à démontrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## Qu'est-ce que `Kokoro-FastAPI` ?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) est une interface FastAPI en conteneur Docker pour le modèle de synthèse vocale [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) qui implémente la spécification d'endpoint API d'OpenAI. Il offre une synthèse vocale hautes performances avec des vitesses de génération impressionnantes.

## Caractéristiques principales

- Endpoint vocal compatible OpenAI avec combinaison vocale intégrée
- Inférence accélérée par GPU NVIDIA ou optimisée pour CPU avec Onnx
- Support du streaming avec partitionnement variable
- Support de plusieurs formats audio (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- Interface web intégrée sur localhost:8880/web (ou conteneur supplémentaire dans le dépôt pour gradio)
- Endpoints phonétiques pour la conversion et la génération

## Voix

- af
- af_bella
- af_irulan
- af_nicole
- af_sarah
- af_sky
- am_adam
- am_michael
- am_gurney
- bf_emma
- bf_isabella
- bm_george
- bm_lewis

## Langues

- en_us
- en_uk

## Exigences

- Docker installé sur votre système
- Open WebUI en cours d'exécution
- Pour le support GPU : GPU NVIDIA avec CUDA 12.3
- Pour la version CPU uniquement : aucune exigence particulière

## ⚡️ Démarrage rapide

### Vous pouvez choisir entre les versions GPU ou CPU

### Version GPU (nécessite un GPU NVIDIA avec CUDA 12.8)

Utilisation de la commande docker run :

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

Ou avec Docker Compose, en créant un fichier `docker-compose.yml` et en exécutant `docker compose up`. Par exemple :

```yaml
name: kokoro
services:
    kokoro-fastapi-gpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-gpu:v0.2.1
        restart: always
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
```

:::info
Vous devrez peut-être installer et configurer [le toolkit NVIDIA Container](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### Version CPU (inférence optimisée pour ONNX)

Avec la commande docker run :

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

Avec Docker Compose :

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Configuration d'Open WebUI pour utiliser `Kokoro-FastAPI`

Pour utiliser Kokoro-FastAPI avec Open WebUI, suivez ces étapes :

- Ouvrez le panneau d'administration et accédez à `Paramètres` -> `Audio`
- Configurez vos paramètres TTS pour qu'ils correspondent aux suivants :
- - Moteur de synthèse vocale : OpenAI
  - URL de base de l'API : `http://localhost:8880/v1` # vous pourriez avoir besoin d'utiliser `host.docker.internal` à la place de `localhost`
  - Clé API : `not-needed`
  - Modèle TTS : `kokoro`
  - Voix TTS : `af_bella` # accepte également le mapping des voix existantes OpenAI pour la compatibilité

:::info
La clé API par défaut est la chaîne `not-needed`. Vous n'avez pas besoin de modifier cette valeur si vous n'avez pas besoin d'une sécurité supplémentaire.
:::

## Construction du conteneur Docker

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # ou docker/gpu
docker compose up --build
```

**C'est tout !**

Pour plus d'informations sur la construction du conteneur Docker, notamment le changement de ports, veuillez consulter le dépôt [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)
