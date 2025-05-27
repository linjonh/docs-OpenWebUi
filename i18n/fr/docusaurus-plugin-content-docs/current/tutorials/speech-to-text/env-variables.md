---
sidebar_position: 2
title: "Variables d'environnement"
---


# Liste des variables d'environnement


:::info
Pour obtenir une liste complète de toutes les variables d'environnement de Open WebUI, consultez la page [Configuration des variables d'environnement](/getting-started/env-configuration).
:::

Voici un résumé des variables d'environnement pour la conversion parole en texte (STT).

# Variables d'environnement pour la conversion parole en texte (STT)

| Variable | Description |
|----------|-------------|
| `WHISPER_MODEL` | Définit le modèle Whisper à utiliser pour la conversion locale parole en texte |
| `WHISPER_MODEL_DIR` | Spécifie le répertoire où stocker les fichiers du modèle Whisper |
| `WHISPER_LANGUAGE` | Spécifie la langue ISO 639-1 (ISO 639-2 pour le hawaïen et le cantonais) de conversion parole en texte à utiliser pour Whisper (la langue est prédite à moins qu'elle ne soit définie) |
| `AUDIO_STT_ENGINE` | Spécifie le moteur de conversion parole en texte à utiliser (vide pour Whisper local, ou `openai`) |
| `AUDIO_STT_MODEL` | Spécifie le modèle de conversion parole en texte pour les points d'accès compatibles OpenAI |
| `AUDIO_STT_OPENAI_API_BASE_URL` | Définit l'URL de base compatible OpenAI pour la conversion parole en texte |
| `AUDIO_STT_OPENAI_API_KEY` | Définit la clé API OpenAI pour la conversion parole en texte |