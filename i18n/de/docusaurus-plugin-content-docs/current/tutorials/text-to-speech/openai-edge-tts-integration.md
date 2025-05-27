---
sidebar_position: 1
title: "🗨️ Edge TTS Verwendung mit Docker"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open-WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Sie Open WebUI für Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Mitwirken an.
:::

# Integration von `openai-edge-tts` 🗣️ mit Open WebUI

## Was ist `openai-edge-tts`? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) ist eine Text-zu-Sprache-API, die den OpenAI-API-Endpunkt nachahmt und als direkter Ersatz in Szenarien dient, in denen Sie die Endpunkt-URL festlegen können, wie bei Open WebUI.

Es verwendet das Paket [edge-tts](https://github.com/rany2/edge-tts), das die kostenlose Funktion "Vorlesen" des Edge-Browsers nutzt, um eine Anforderung an Microsoft/Azure zu simulieren und damit qualitativ hochwertige Text-zu-Sprache kostenlos zu erhalten.

[Hier können Sie die Stimmen ausprobieren](https://tts.travisvn.com)

<details>
  <summary>Wie unterscheidet es sich von 'openedai-speech'?</summary>

Ähnlich wie [openedai-speech](https://github.com/matatonic/openedai-speech) ist [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) ein Text-zu-Sprache-API-Endpunkt, der den OpenAI-API-Endpunkt nachahmt und als direkter Ersatz in Szenarien dient, in denen der OpenAI-Speech-Endpunkt aufgerufen werden kann und die Server-Endpunkt-URL konfigurierbar ist.

`openedai-speech` ist eine umfassendere Option, die die vollständig offline Erzeugung von Sprache mit vielen Modalitäten ermöglicht.

`openai-edge-tts` ist eine einfachere Option, die ein Python-Paket namens `edge-tts` verwendet, um den Ton zu erzeugen.

</details>

## Anforderungen

- Docker auf Ihrem System installiert
- Open WebUI läuft

## ⚡️ Schnellstart

Der einfachste Weg, ohne Konfiguration zu starten, ist, den folgenden Befehl auszuführen

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

Dies wird den Service auf Port 5050 mit allen Standardeinstellungen ausführen

## Open WebUI einrichten, um `openai-edge-tts` zu verwenden

- Öffnen Sie das Admin-Panel und gehen Sie zu `Einstellungen` -> `Audio`
- Passen Sie Ihre TTS-Einstellungen an das unten stehende Screenshot an
- _Hinweis: Sie können hier die TTS-Stimme angeben_

![Screenshot der Open WebUI Admin-Einstellungen für Audio mit den korrekten Endpunkten für dieses Projekt](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
Der standardmäßige API-Schlüssel ist die Zeichenkette `your_api_key_here`. Sie müssen diesen Wert nicht ändern, wenn Sie keine zusätzliche Sicherheit benötigen.
:::

**Und das war's! Hier können Sie aufhören**

# Bitte ⭐️ geben Sie dem Repository auf GitHub einen Stern, wenn Sie [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) nützlich finden


<details>
  <summary>Mit Python ausführen</summary>
  
### 🐍 Mit Python ausführen

Wenn Sie dieses Projekt lieber direkt mit Python ausführen möchten, folgen Sie diesen Schritten, um eine virtuelle Umgebung einzurichten, Abhängigkeiten zu installieren und den Server zu starten.

#### 1. Repository klonen

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. Virtuelle Umgebung einrichten

Erstellen und aktivieren Sie eine virtuelle Umgebung, um Abhängigkeiten isoliert zu halten:

```bash
# Für macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Für Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. Abhängigkeiten installieren

Verwenden Sie `pip`, um die erforderlichen Pakete aus der Datei `requirements.txt` zu installieren:

```bash
pip install -r requirements.txt
```

#### 4. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env`-Datei im Hauptverzeichnis und setzen Sie die folgenden Variablen:

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

#### 5. Server ausführen

Sobald alles konfiguriert ist, starten Sie den Server mit:

```bash
python app/server.py
```

Der Server wird unter `http://localhost:5050` ausgeführt.

#### 6. API testen

Sie können nun mit der API unter `http://localhost:5050/v1/audio/speech` und anderen verfügbaren Endpunkten interagieren. Weitere Beispiele finden Sie im Abschnitt zur Nutzung.

</details>

<details>
  <summary>Details zur Nutzung</summary>
  
##### Endpunkt: `/v1/audio/speech` (alias `/audio/speech`)

Generiert Audio aus dem eingegebenen Text. Verfügbare Parameter:

**Erforderlicher Parameter:**

- **input** (string): Der Text, der in Audio umgewandelt werden soll (bis zu 4096 Zeichen).

**Optionale Parameter:**

- **model** (string): Setzen auf "tts-1" oder "tts-1-hd" (Standard: `"tts-1"`).
- **voice** (string): Eine der OpenAI-kompatiblen Stimmen (alloy, echo, fable, onyx, nova, shimmer) oder eine gültige `edge-tts`-Stimme (Standard: `"en-US-AvaNeural"`).
- **response_format** (string): Audioformat. Optionen: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (Standard: `mp3`).
- **speed** (number): Wiedergabegeschwindigkeit (0.25 bis 4.0). Standard ist `1.0`.

:::tip
Sie können verfügbare Stimmen durchsuchen und Probevorschauen unter [tts.travisvn.com](https://tts.travisvn.com) anhören
:::

Beispielanfrage mit `curl` und Speichern der Ausgabe als MP3-Datei:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "Hallo, ich bin dein KI-Assistent! Lass mich wissen, wie ich dir helfen kann, deine Ideen zum Leben zu erwecken.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

Oder passend zu den OpenAI API Endpunktparametern:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "Hallo, ich bin dein KI-Assistent! Lass mich wissen, wie ich dir helfen kann, deine Ideen zum Leben zu erwecken.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

Und ein Beispiel in einer anderen Sprache als Englisch:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### Zusätzliche Endpunkte

- **POST/GET /v1/models**: Listet verfügbare TTS-Modelle auf.
- **POST/GET /v1/voices**: Listet `edge-tts` Stimmen für eine gegebene Sprache / Lokalität auf.
- **POST/GET /v1/voices/all**: Listet alle `edge-tts` Stimmen mit Informationen zur Sprachunterstützung auf.

:::info
Das `/v1` ist jetzt optional.

Außerdem gibt es Endpunkte für **Azure AI Speech** und **ElevenLabs** für eine mögliche zukünftige Unterstützung, falls benutzerdefinierte API-Endpunkte für diese Optionen in Open WebUI erlaubt werden.

Diese können deaktiviert werden, indem die Umgebungsvariable `EXPAND_API=False` gesetzt wird.
:::

</details>

## 🐳 Schnellkonfiguration für Docker

Die Umgebungsvariablen können im Befehl zur Ausführung des Projekts konfiguriert werden

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
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
Der Markdown-Text wird jetzt durch einen Filter für bessere Lesbarkeit und Unterstützung geleitet.

Sie können dies deaktivieren, indem Sie die Umgebungsvariable `REMOVE_FILTER=True` setzen.
:::

## Zusätzliche Ressourcen

Weitere Informationen zu `openai-edge-tts` finden Sie im [GitHub-Repo](https://github.com/travisvn/openai-edge-tts)

Für direkte Unterstützung können Sie den [Voice AI & TTS Discord](https://tts.travisvn.com/discord) besuchen

## 🎙️ Sprachproben

[Hören Sie Sprachproben und sehen Sie alle verfügbaren Edge-TTS-Stimmen](https://tts.travisvn.com/)
