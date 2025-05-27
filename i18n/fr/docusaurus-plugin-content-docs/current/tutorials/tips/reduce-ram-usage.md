---
sidebar_position: 10
title: "✂️ Réduire l'utilisation de la RAM"
---

# Réduire l'utilisation de la RAM

Si vous déployez cette image dans un environnement où la RAM est limitée, il existe quelques moyens de réduire la taille de l'image.

Sur un Raspberry Pi 4 (arm64) avec la version v0.3.10, cela a permis de réduire la consommation de mémoire au repos de >1 Go à ~200 Mo (tel qu'observé avec `docker container stats`).

## TLDR

Définissez les variables d'environnement suivantes (ou les paramètres UI respectifs pour un déploiement existant) : `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`.

## Explications plus détaillées

Une grande partie de la consommation de mémoire est due aux modèles de machine learning chargés. Même si vous utilisez un modèle linguistique externe (OpenAI ou ollama non intégré), de nombreux modèles peuvent être chargés à d'autres fins.

À partir de la v0.3.10, cela inclut :

* Reconnaissance vocale (whisper par défaut)
* Moteur d'intégration RAG (modèle local SentenceTransformers par défaut)
* Moteur de génération d'images (désactivé par défaut)

Les 2 premiers sont activés et configurés sur des modèles locaux par défaut. Vous pouvez modifier les modèles dans le panneau administrateur (RAG : catégorie Documents, définissez-le sur Ollama ou OpenAI, Reconnaissance vocale : section Audio, travaillez avec OpenAI ou WebAPI).
Si vous déployez une nouvelle image Docker, vous pouvez également les définir avec les variables d'environnement suivantes : `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`. Notez que ces variables d'environnement n'ont aucun effet si un `config.json` existe déjà.
