---
sidebar_position: 2
title: "Umgebungsvariablen"
---


# Liste der Umgebungsvariablen


:::info
Eine vollständige Liste aller Open WebUI-Umgebungsvariablen finden Sie auf der Seite [Konfiguration der Umgebungsvariablen](/getting-started/env-configuration).
:::

Im Folgenden finden Sie eine Zusammenfassung der Umgebungsvariablen für Sprache-zu-Text (STT).

# Umgebungsvariablen für Sprache-zu-Text (STT)

| Variable | Beschreibung |
|----------|-------------|
| `WHISPER_MODEL` | Legt das Whisper-Modell fest, das für lokales Sprache-zu-Text verwendet werden soll |
| `WHISPER_MODEL_DIR` | Gibt das Verzeichnis an, in dem Whisper-Modell-Dateien gespeichert werden sollen |
| `WHISPER_LANGUAGE` | Gibt die ISO 639-1-Sprache (ISO 639-2 für Hawaiianisch und Kantonesisch) für Sprache-zu-Text an, die von Whisper verwendet werden soll (die Sprache wird vorhergesagt, falls nicht festgelegt) |
| `AUDIO_STT_ENGINE` | Gibt die Sprache-zu-Text-Engine an (leer für lokales Whisper oder `openai`) |
| `AUDIO_STT_MODEL` | Gibt das Sprache-zu-Text-Modell für OpenAI-kompatible Endpunkte an |
| `AUDIO_STT_OPENAI_API_BASE_URL` | Legt die OpenAI-kompatible Basis-URL für Sprache-zu-Text fest |
| `AUDIO_STT_OPENAI_API_KEY` | Legt den OpenAI-API-Schlüssel für Sprache-zu-Text fest |