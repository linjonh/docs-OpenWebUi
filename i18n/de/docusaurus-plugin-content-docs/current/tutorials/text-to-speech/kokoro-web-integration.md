---
sidebar_position: 2
title: "🗨️ Kokoro Web - Mühelose TTS für Open WebUI"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Sie Open WebUI an Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Schauen Sie sich das Beitragen-Tutorial an.
:::

## Was ist `Kokoro Web`?

[Kokoro Web](https://github.com/eduardolat/kokoro-web) bietet eine leichtgewichtige, mit OpenAI kompatible API für das leistungsstarke [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) Text-to-Speech-Modell, das nahtlos mit Open WebUI integriert wird, um Ihre KI-Gespräche mit natürlich klingenden Stimmen zu verbessern.

## 🚀 Zwei-Schritte-Integration

### 1. Kokoro Web API bereitstellen (Ein Befehl)

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # Ändern Sie dies zu einem beliebigen geheimen Schlüssel, der als Ihr OpenAI-kompatibler API-Schlüssel verwendet wird
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

Ausführen mit: `docker compose up -d`

### 2. OpenWebUI verbinden (30 Sekunden)

1. Gehen Sie in OpenWebUI zu `Admin Panel` → `Settings` → `Audio`
2. Konfigurieren Sie:
   - Text-to-Speech-Engine: `OpenAI`
   - API-Basis-URL: `http://localhost:3000/api/v1`  
     (Bei Verwendung von Docker: `http://host.docker.internal:3000/api/v1`)
   - API-Schlüssel: `your-api-key` (aus Schritt 1)
   - TTS-Modell: `model_q8f16` (beste Größe/Qualität-Balance)
   - TTS-Stimme: `af_heart` (standardmäßig warme, natürliche englische Stimme). Sie können dies zu einer anderen Stimme oder Formel aus dem [Kokoro Web Demo](https://voice-generator.pages.dev) ändern.

**Das war's! Ihr OpenWebUI verfügt nun über KI-Sprachfähigkeiten.**

## 🌍 Unterstützte Sprachen

Kokoro Web unterstützt 8 Sprachen mit spezifischen Stimmen, die für jede optimiert sind:

- Englisch (US) - en-us
- Englisch (UK) - en-gb
- Japanisch - ja
- Chinesisch - cmn
- Spanisch - es-419
- Hindi - hi
- Italienisch - it
- Portugiesisch (Brasilien) - pt-br

Jede Sprache hat eigene Stimmen für optimale Aussprache und natürlichen Fluss. Sehen Sie sich das [GitHub-Repository](https://github.com/eduardolat/kokoro-web) für die vollständige Liste der sprachspezifischen Stimmen an oder nutzen Sie das [Kokoro Web Demo](https://voice-generator.pages.dev), um Ihre eigenen benutzerdefinierten Stimmen sofort zu erstellen.

## 💾 Optimierte Modelle für jede Hardware

Wählen Sie das Modell, das Ihren Hardware-Bedürfnissen entspricht:

| Modell-ID | Optimierung | Größe | Ideal für |
|----------|-------------|------|-----------|
| model_q8f16 | Gemischte Präzision | 86 MB | **Empfohlen** - Beste Balance |
| model_quantized | 8-bit | 92.4 MB | Gute CPU-Leistung |
| model_uint8f16 | Gemischte Präzision | 114 MB | Bessere Qualität bei Mittelklasse-CPUs |
| model_q4f16 | 4-bit & fp16 Gewichtungen | 154 MB | Höhere Qualität, dennoch effizient |
| model_fp16 | fp16 | 163 MB | Premium-Qualität |
| model_uint8 | 8-bit & gemischt | 177 MB | Ausgewogene Option |
| model_q4 | 4-bit matmul | 305 MB | Hochwertige Option |
| model | fp32 | 326 MB | Maximale Qualität (langsamer) |

## ✨ Probieren Sie es aus, bevor Sie installieren

Besuchen Sie die [**Kokoro Web Demo**](https://voice-generator.pages.dev), um alle Stimmen sofort auszuprobieren. Dieses Demo:

- **Läuft 100% in Ihrem Browser** - Kein Server erforderlich
- **Immer kostenlos** - Keine Nutzungsbeschränkungen oder Registrierung notwendig
- **Keine Installation** - Besuchen Sie einfach die Website und legen Sie los
- **Alle Funktionen inklusive** - Testen Sie sofort jede Stimme oder Sprache

## Brauchen Sie mehr Hilfe?

Für zusätzliche Optionen, Anleitung zur Sprach-Anpassung und erweiterte Einstellungen besuchen Sie das [GitHub-Repository](https://github.com/eduardolat/kokoro-web).

**Genießen Sie natürliche KI-Stimmen in Ihren OpenWebUI-Gesprächen!**
