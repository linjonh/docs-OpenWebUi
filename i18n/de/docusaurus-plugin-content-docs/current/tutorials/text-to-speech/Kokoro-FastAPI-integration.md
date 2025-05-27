---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI Using Docker"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für einen spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

## Was ist `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) ist ein dockerisierter FastAPI-Wrapper für das [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) Text-zu-Sprache-Modell, das die OpenAI-API-Endpunktspezifikation implementiert. Es bietet Hochleistungstext-zu-Sprache mit beeindruckenden Generierungsgeschwindigkeiten.

## Hauptmerkmale

- OpenAI-kompatibler Sprachendpunkt mit Inline-Stimmenkombination
- NVIDIA GPU-beschleunigte oder CPU Onnx-Inferenz
- Streaming-Unterstützung mit variabler Chunk-Größe
- Unterstützung für mehrere Audioformate (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- Integriertes Webinterface auf localhost:8880/web (oder zusätzliches Container im Repo für Gradio)
- Phonem-Endpunkte für Umwandlung und Generierung

## Stimmen

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

## Sprachen

- en_us
- en_uk

## Voraussetzungen

- Docker muss auf Ihrem System installiert sein
- Open WebUI läuft
- Für GPU-Unterstützung: NVIDIA GPU mit CUDA 12.3
- Für CPU-only: Keine speziellen Anforderungen

## ⚡️ Schnellstart

### Sie können zwischen GPU- oder CPU-Versionen wählen

### GPU-Version (Erfordert NVIDIA GPU mit CUDA 12.8)

Mit einem Docker-Run-Befehl:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

Oder mit Docker Compose, indem eine `docker-compose.yml`-Datei erstellt und `docker compose up` ausgeführt wird. Beispiel:

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
Möglicherweise müssen Sie [das NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installieren und konfigurieren.
:::

### CPU-Version (Onnx-optimierte Inferenz)

Mit einem Docker-Run-Befehl:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

Mit Docker Compose:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Einrichtung von Open WebUI zur Nutzung von `Kokoro-FastAPI`

Um Kokoro-FastAPI mit Open WebUI zu verwenden, führen Sie die folgenden Schritte aus:

- Öffnen Sie das Admin-Panel und gehen Sie zu `Settings` -> `Audio`
- Passen Sie Ihre TTS-Einstellungen folgendermaßen an:
- - Text-to-Speech Engine: OpenAI
  - API Base URL: `http://localhost:8880/v1` # Möglicherweise müssen Sie `host.docker.internal` anstelle von `localhost` verwenden
  - API-Schlüssel: `not-needed`
  - TTS Modell: `kokoro`
  - TTS Stimme: `af_bella` # akzeptiert auch Mapping bestehender OAI-Stimmen zur Kompatibilität

:::info
Der Standard-API-Schlüssel ist der String `not-needed`. Sie müssen diesen Wert nicht ändern, wenn Sie keine zusätzliche Sicherheit benötigen.
:::

## Erstellen des Docker-Containers

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # oder docker/gpu
docker compose up --build
```

**Das war's!**

Weitere Informationen zum Erstellen des Docker-Containers, einschließlich Portänderungen, finden Sie im [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) Repository.
