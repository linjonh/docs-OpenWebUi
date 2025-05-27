---
sidebar_position: 2
title: "🗨️ Openedai-speech Verwendung von Docker"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie mitwirken? Sehen Sie sich das Beitrags-Tutorial an.
:::

**Integration von `openedai-speech` in Open WebUI mithilfe von Docker**
======================================================================

**Was ist `openedai-speech`?**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) ist ein text-to-speech-Server, der mit der Audio-/Sprach-API von OpenAI kompatibel ist.

Er bietet den `/v1/audio/speech`-Endpunkt und eine kostenlose, private Text-to-Speech-Erfahrung mit benutzerdefinierten Funktionen zur Sprachklonung. Dieser Dienst ist in keiner Weise mit OpenAI verbunden und erfordert keinen OpenAI-API-Schlüssel.
:::

**Anforderungen**
------------------

* Docker ist auf Ihrem System installiert
* Open WebUI läuft in einem Docker-Container
* Grundlegendes Verständnis von Docker und Docker Compose

**Option 1: Verwendung von Docker Compose**
-------------------------------------------

**Schritt 1: Erstellen eines neuen Ordners für den `openedai-speech`-Dienst**
---------------------------------------------------------------------------

Erstellen Sie einen neuen Ordner, z. B. `openedai-speech-service`, um die `docker-compose.yml`- und `speech.env`-Dateien zu speichern.

**Schritt 2: Klonen des `openedai-speech`-Repositorys von GitHub**
------------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

Das Repository `openedai-speech` wird auf Ihren lokalen Rechner heruntergeladen. Es enthält die Docker-Compose-Dateien (`docker-compose.yml`, `docker-compose.min.yml` und `docker-compose.rocm.yml`) sowie weitere notwendige Dateien.

**Schritt 3: Umbenennen der `sample.env`-Datei in `speech.env` (bei Bedarf anpassen)**
-------------------------------------------------------------------------------------

Erstellen Sie im Repository-Ordner `openedai-speech` eine neue Datei namens `speech.env` mit folgendem Inhalt:

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**Schritt 4: Auswahl einer Docker-Compose-Datei**
-----------------------------------------------

Sie können eine der folgenden Docker-Compose-Dateien verwenden:

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): Diese Datei verwendet das Image `ghcr.io/matatonic/openedai-speech` und baut auf der [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile).
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): Diese Datei verwendet das Image `ghcr.io/matatonic/openedai-speech-min` und baut auf der [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min).
  Dieses Image ist eine minimalistische Version, die nur Piper-Unterstützung umfasst und keine GPU benötigt.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): Diese Datei verwendet das Image `ghcr.io/matatonic/openedai-speech-rocm` und baut auf der [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) mit ROCm-Unterstützung.

**Schritt 4: Erstellung des ausgewählten Docker-Images**
-------------------------------------------------------

Bevor die Docker-Compose-Datei ausgeführt wird, muss das Docker-Image erstellt werden:

* **Nvidia GPU (CUDA-Unterstützung)**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU (ROCm-Unterstützung)**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **Nur CPU, keine GPU (nur Piper)**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**Schritt 5: Ausführung des passenden `docker compose up -d`-Befehls**
----------------------------------------------------------------------

* **Nvidia GPU (CUDA-Unterstützung)**: Führen Sie den folgenden Befehl aus, um den `openedai-speech`-Dienst im Hintergrundmodus zu starten:

```bash
docker compose up -d
```

* **AMD GPU (ROCm-Unterstützung)**: Führen Sie den folgenden Befehl aus, um den `openedai-speech`-Dienst im Hintergrundmodus zu starten:

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Apple M-Serie, Raspberry Pi)**: XTTS unterstützt hier nur die CPU und ist sehr langsam. Sie können das Nvidia-Image für XTTS mit CPU (langsam) oder das Image mit nur Piper-Unterstützung (empfohlen) verwenden:

```bash
docker compose -f docker-compose.min.yml up -d
```

* **Nur CPU, keine GPU (nur Piper)**: Für ein minimales Docker-Image mit nur Piper-Unterstützung (< 1GB vs. 8GB):

```bash
docker compose -f docker-compose.min.yml up -d
```

Dadurch wird der `openedai-speech`-Dienst im Hintergrundmodus gestartet.

**Option 2: Verwendung von Docker Run-Befehlen**
-----------------------------------------------

Sie können auch die folgenden Docker-Run-Befehle verwenden, um den `openedai-speech`-Dienst im Hintergrundmodus zu starten:

* **Nvidia GPU (CUDA)**: Führen Sie den folgenden Befehl aus, um den `openedai-speech`-Dienst zu erstellen und zu starten:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: Führen Sie den folgenden Befehl aus, um den `openedai-speech`-Dienst zu erstellen und zu starten:

> Um ROCm-Unterstützung zu aktivieren, entfernen Sie die Kommentierung der Zeile `#USE_ROCM=1` in der Datei `speech.env`.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **Nur CPU, keine GPU (nur Piper)**: Führen Sie den folgenden Befehl aus, um den `openedai-speech`-Dienst zu erstellen und zu starten:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**Schritt 6: Konfigurieren von Open WebUI zur Verwendung von `openedai-speech` für TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Öffnen Sie die Open WebUI-Einstellungen und navigieren Sie zu den TTS-Einstellungen unter **Admin Panel > Einstellungen > Audio**. Fügen Sie die folgende Konfiguration hinzu:

* **API-Basis-URL**: `http://host.docker.internal:8000/v1`
* **API-Schlüssel**: `sk-111111111` (Beachten Sie, dass dies ein Dummy-API-Schlüssel ist, da `openedai-speech` keinen API-Schlüssel benötigt. Sie können hier beliebigen Text einfügen, solange das Feld ausgefüllt ist.)

**Schritt 7: Wählen Sie eine Stimme**
--------------------------

Unter `TTS Voice` im selben Audioeinstellungsmenü im Admin-Panel können Sie das `TTS-Modell` aus den unten aufgeführten Optionen auswählen, die von `openedai-speech` unterstützt werden. Die Stimmen dieser Modelle sind für die englische Sprache optimiert.

* `tts-1` oder `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova` und `shimmer` (`tts-1-hd` ist konfigurierbar; verwendet standardmäßig OpenAI-Beispiele)

**Schritt 8: Drücken Sie auf `Speichern`, um die Änderungen zu übernehmen und beginnen Sie, naturgetreue Stimmen zu genießen**
--------------------------------------------------------------------------------------------

Drücken Sie die `Speichern`-Schaltfläche, um die Änderungen an Ihren Open WebUI-Einstellungen zu übernehmen. Aktualisieren Sie die Seite, damit die Änderung vollständig wirksam wird, und genießen Sie die Nutzung der `openedai-speech`-Integration in Open WebUI, um Textantworten mit natürlicher Sprachsynthese vorzulesen.

**Details zu den Modellen:**
------------------

`openedai-speech` unterstützt mehrere Text-to-Speech-Modelle, die jeweils ihre eigenen Stärken und Anforderungen haben. Die folgenden Modelle sind verfügbar:

* **Piper TTS** (sehr schnell, läuft auf CPU): Verwenden Sie Ihre eigenen [Piper-Stimmen](https://rhasspy.github.io/piper-samples/) über die Konfigurationsdatei `voice_to_speaker.yaml`. Dieses Modell ist ideal für Anwendungen, die eine geringe Latenz und hohe Leistung erfordern. Piper TTS unterstützt auch [mehrsprachige](https://github.com/matatonic/openedai-speech#multilingual) Stimmen.
* **Coqui AI/TTS XTTS v2** (schnell, benötigt jedoch ca. 4GB GPU-VRAM und Nvidia GPU mit CUDA): Dieses Modell verwendet Coqui AIs XTTS v2 Stimmen-Klonungstechnologie, um hochwertige Stimmen zu erzeugen. Obwohl es eine leistungsstärkere GPU erfordert, bietet es eine hervorragende Leistung und hochwertige Audioausgabe. Coqui unterstützt auch [mehrsprachige](https://github.com/matatonic/openedai-speech#multilingual) Stimmen.
* **Beta Parler-TTS Unterstützung** (experimentell, langsamer): Dieses Modell verwendet das Parler-TTS-Framework zur Generierung von Stimmen. Obwohl es sich derzeit in der Beta-Phase befindet, können Sie sehr grundlegende Merkmale der Sprecherstimme beschreiben. Die genaue Stimme wird bei jeder Generation leicht unterschiedlich sein, sollte jedoch der bereitgestellten Beschreibung des Sprechers ähnlich sein. Zur Inspiration, wie Stimmen beschrieben werden können, siehe [Text Description to Speech](https://www.text-description-to-speech.com/).

**Fehlerbehebung**
-------------------

Falls Sie Probleme bei der Integration von `openedai-speech` in Open WebUI haben, folgen Sie diesen Schritten zur Fehlerbehebung:

* **Überprüfen des `openedai-speech`-Dienstes**: Stellen Sie sicher, dass der `openedai-speech`-Dienst läuft und der Port, den Sie in der docker-compose.yml-Datei angegeben haben, freigegeben ist.
* **Prüfen des Zugriffs auf host.docker.internal**: Stellen Sie sicher, dass der Hostname `host.docker.internal` innerhalb des Open WebUI-Containers auflösbar ist. Dies ist notwendig, da `openedai-speech` über `localhost` auf Ihrem PC verfügbar ist, jedoch normalerweise nicht von `open-webui` innerhalb seines Containers darauf zugegriffen werden kann. Sie können ein Volume zur docker-compose.yml-Datei hinzufügen, um eine Datei vom Host in den Container einzubinden, beispielsweise in ein Verzeichnis, das von openedai-speech bedient wird.
* **Überprüfen Sie die API-Schlüsseleinstellungen**: Stellen Sie sicher, dass der API-Schlüssel auf einen Dummy-Wert gesetzt oder effektiv deaktiviert ist, da `openedai-speech` keinen API-Schlüssel erfordert.
* **Überprüfen Sie die Sprachkonfiguration**: Vergewissern Sie sich, dass die Stimme, die Sie für TTS verwenden möchten, in Ihrer Datei `voice_to_speaker.yaml` vorhanden ist und die entsprechenden Dateien (z. B. XML-Dateien für Stimmen) im richtigen Verzeichnis vorliegen.
* **Überprüfen Sie die Pfade der Sprachmodelle**: Wenn Sie Probleme beim Laden von Sprachmodellen haben, überprüfen Sie, ob die Pfade in Ihrer Datei `voice_to_speaker.yaml` mit den tatsächlichen Standorten Ihrer Sprachmodelle übereinstimmen.

**Zusätzliche Tipps zur Fehlerbehebung**
------------------------------------

* Überprüfen Sie die Protokolle von `openedai-speech` auf Fehler oder Warnungen, die auf das Problem hinweisen könnten.
* Vergewissern Sie sich, dass die Datei `docker-compose.yml` korrekt für Ihre Umgebung konfiguriert ist.
* Falls Sie weiterhin Probleme haben, versuchen Sie, den `openedai-speech`-Dienst oder die gesamte Docker-Umgebung neu zu starten.
* Wenn das Problem weiterhin besteht, konsultieren Sie das `openedai-speech`-GitHub-Repository oder suchen Sie Hilfe in einem relevanten Community-Forum.

**FAQ**
-------

**Wie kann ich den emotionalen Umfang der generierten Audiodatei steuern?**

Es gibt keinen direkten Mechanismus, um die emotionale Ausgabe der generierten Audiodatei zu steuern. Bestimmte Faktoren wie Großschreibung oder Grammatik können die Ausgabe beeinflussen, aber interne Tests haben gemischte Ergebnisse gezeigt.

**Wo werden die Stimmdateien gespeichert? Und was ist mit der Konfigurationsdatei?**

Die Konfigurationsdateien, die die verfügbaren Stimmen und deren Eigenschaften definieren, werden im Konfigurationsvolumen gespeichert. Insbesondere werden die Standardstimmen in `voice_to_speaker.default.yaml` definiert.

**Zusätzliche Ressourcen**
------------------------

Weitere Informationen zur Konfiguration von Open WebUI für die Nutzung von `openedai-speech`, einschließlich der Festlegung von Umgebungsvariablen, finden Sie in der [Open WebUI-Dokumentation](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech).

Weitere Informationen zu `openedai-speech` finden Sie im [GitHub-Repository](https://github.com/matatonic/openedai-speech).

**So fügen Sie weitere Stimmen zu openedai-speech hinzu:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
Sie können die Portnummer in der Datei `docker-compose.yml` auf einen offenen und verwendbaren Port ändern, aber stellen Sie sicher, dass Sie die **API-Basis-URL** in den Audioeinstellungen der Open WebUI-Administration entsprechend aktualisieren.
:::
