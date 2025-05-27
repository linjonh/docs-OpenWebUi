---
sidebar_position: 10
title: "✂️ RAM-Nutzung reduzieren"
---

# RAM-Nutzung reduzieren

Wenn Sie dieses Image in einer RAM-begrenzten Umgebung bereitstellen, gibt es einige Maßnahmen, die Sie ergreifen können, um das Image schlanker zu machen.

Auf einem Raspberry Pi 4 (arm64) mit Version v0.3.10 konnte der Leerlauf-Speicherverbrauch von >1GB auf ~200MB reduziert werden (wie mit `docker container stats` beobachtet).

## TLDR

Setzen Sie die folgenden Umgebungsvariablen (oder die entsprechenden UI-Einstellungen für eine bestehende Bereitstellung): `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`.

## Ausführlichere Erklärung

Ein Großteil des Speicherverbrauchs ist auf geladene ML-Modelle zurückzuführen. Selbst wenn Sie ein externes Sprachmodell (OpenAI oder entbündeltes Ollama) verwenden, können viele Modelle für zusätzliche Zwecke geladen werden.

Ab Version v0.3.10 umfasst dies:

* Sprach-zu-Text (standardmäßig Whisper)
* RAG-Embedding-Engine (standardmäßig lokales SentenceTransformers-Modell)
* Bildgenerierungs-Engine (standardmäßig deaktiviert)

Die ersten 2 sind standardmäßig aktiviert und auf lokale Modelle eingestellt. Sie können die Modelle im Admin-Panel ändern (RAG: Dokumentenkategorie, auf Ollama oder OpenAI einstellen, Sprach-zu-Text: Audio-Bereich, mit OpenAI oder WebAPI arbeiten).
Wenn Sie ein neues Docker-Image bereitstellen, können Sie diese auch mit den folgenden Umgebungsvariablen einstellen: `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`. Beachten Sie, dass diese Umgebungsvariablen keine Auswirkungen haben, wenn bereits eine `config.json` existiert.
