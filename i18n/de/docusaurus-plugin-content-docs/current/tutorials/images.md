---
sidebar_position: 6
title: "🎨 Bildergenerierung"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open-WebUI-Team unterstützt. Es dient ausschließlich als Demonstration, wie Open WebUI für Ihren speziellen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

# 🎨 Bildergenerierung

Open WebUI unterstützt die Bilderzeugung über drei Backends: **AUTOMATIC1111**, **ComfyUI** und **OpenAI DALL·E**. Dieser Leitfaden hilft Ihnen bei der Einrichtung und Nutzung einer dieser Optionen.

## AUTOMATIC1111

Open WebUI unterstützt die Bilderzeugung über die **AUTOMATIC1111** [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API). Hier sind die Schritte, um loszulegen:

### Ersteinrichtung

1. Stellen Sie sicher, dass Sie [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) installiert haben.
2. Starten Sie AUTOMATIC1111 mit zusätzlichen Flags, um den API-Zugriff zu aktivieren:

   ```
   ./webui.sh --api --listen
   ```

3. Für die Docker-Installation von WebUI mit voreingestellten Umgebungsvariablen verwenden Sie den folgenden Befehl:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Einrichtung von Open WebUI mit AUTOMATIC1111

1. Navigieren Sie in Open WebUI zum Menü **Admin Panel** > **Einstellungen** > **Bilder**.
2. Setzen Sie das Feld `Image Generation Engine` auf `Standard (Automatic1111)`.
3. Geben Sie im API-URL-Feld die Adresse ein, unter der die API von AUTOMATIC1111 erreichbar ist:

   ```
   http://<your_automatic1111_address>:7860/
   ```

   Wenn Sie eine Docker-Installation von Open WebUI und AUTOMATIC1111 auf demselben Host ausführen, verwenden Sie als Adresse `http://host.docker.internal:7860/`.

## ComfyUI

ComfyUI bietet eine alternative Schnittstelle zur Verwaltung und Interaktion mit Modellen zur Bilderzeugung. Mehr dazu erfahren Sie oder laden Sie es von der [GitHub-Seite](https://github.com/comfyanonymous/ComfyUI) herunter. Nachfolgend finden Sie die Anweisungen zur Einrichtung von ComfyUI neben Ihren anderen Tools.

### Ersteinrichtung

1. Laden Sie das ComfyUI-Softwarepaket von [GitHub](https://github.com/comfyanonymous/ComfyUI) herunter und entpacken Sie es in das gewünschte Verzeichnis.
2. Starten Sie ComfyUI mit dem folgenden Befehl:

   ```
   python main.py
   ```

   Für Systeme mit geringem VRAM starten Sie ComfyUI mit zusätzlichen Flags, um den Speicherverbrauch zu reduzieren:

   ```
   python main.py --lowvram
   ```

3. Für die Docker-Installation von WebUI mit voreingestellten Umgebungsvariablen verwenden Sie den folgenden Befehl:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Einrichtung von Open WebUI mit ComfyUI

#### Einrichtung der FLUX.1-Modelle

1. **Modell-Checkpoints**:

* Laden Sie entweder das Modell `FLUX.1-schnell` oder `FLUX.1-dev` von der [black-forest-labs HuggingFace-Seite](https://huggingface.co/black-forest-labs) herunter.
* Platzieren Sie die Modell-Checkpoints sowohl in den Verzeichnissen `models/checkpoints` als auch `models/unet` von ComfyUI. Alternativ können Sie eine symbolische Verknüpfung zwischen `models/checkpoints` und `models/unet` erstellen, um sicherzustellen, dass beide Verzeichnisse dieselben Modell-Checkpoints enthalten.

2. **VAE-Modell**:

* Laden Sie `ae.safetensors` VAE von [hier](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors) herunter.
* Platzieren Sie es im Verzeichnis `models/vae` von ComfyUI.

3. **CLIP-Modell**:

* Laden Sie `clip_l.safetensors` von [hier](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) herunter.
* Platzieren Sie es im Verzeichnis `models/clip` von ComfyUI.

4. **T5XXL-Modell**:

* Laden Sie entweder das Modell `t5xxl_fp16.safetensors` oder `t5xxl_fp8_e4m3fn.safetensors` von [hier](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) herunter.
* Platzieren Sie es im Verzeichnis `models/clip` von ComfyUI.

Um ComfyUI in Open WebUI zu integrieren, folgen Sie diesen Schritten:

#### Schritt 1: Open WebUI-Einstellungen konfigurieren

1. Navigieren Sie zum **Admin Panel** in Open WebUI.
2. Klicken Sie auf **Einstellungen** und wählen Sie dann die Registerkarte **Bilder** aus.
3. Wählen Sie im Feld `Image Generation Engine` die Option `ComfyUI` aus.
4. Geben Sie im Feld **API-URL** die Adresse ein, unter der die API von ComfyUI erreichbar ist, im folgenden Format: `http://<your_comfyui_address>:8188/`.
   * Setzen Sie die Umgebungsvariable `COMFYUI_BASE_URL` auf diese Adresse, um sicherzustellen, dass sie in der WebUI beibehalten wird.

#### Schritt 2: Verbindung prüfen und Bilderzeugung aktivieren

1. Stellen Sie sicher, dass ComfyUI ausgeführt wird und Sie die Verbindung zu Open WebUI erfolgreich überprüft haben. Sie können nicht fortfahren, ohne eine erfolgreiche Verbindung.
2. Sobald die Verbindung überprüft ist, schalten Sie **Bildgenerierung (Experimentell)** ein. Weitere Optionen werden Ihnen angezeigt.
3. Fahren Sie mit Schritt 3 fort, um die endgültigen Konfigurationsschritte abzuschließen.

#### Schritt 3: ComfyUI-Einstellungen konfigurieren und Workflow importieren

1. Aktivieren Sie den Entwicklermodus innerhalb von ComfyUI. Suchen Sie dazu nach dem Zahnrad-Symbol oberhalb der **Queue Prompt**-Schaltfläche in ComfyUI und aktivieren Sie den `Dev Mode`-Toggle.
2. Exportieren Sie den gewünschten Workflow aus ComfyUI im `API Format` mithilfe der Schaltfläche `Save (API Format)`. Die Datei wird korrekt heruntergeladen als `workflow_api.json`.
3. Kehren Sie zu Open WebUI zurück und klicken Sie auf die Schaltfläche **Click here to upload a workflow.json file**.
4. Wählen Sie die Datei `workflow_api.json` aus, um den exportierten Workflow von ComfyUI in Open WebUI zu importieren.
5. Nach dem Import des Workflows müssen Sie die `ComfyUI Workflow Nodes` gemäß den importierten Workflow-Node-IDs zuordnen.
6. Stellen Sie `Set Default Model` auf den Namen der verwendeten Modelfile ein, wie z. B. `flux1-dev.safetensors`.

:::info
Möglicherweise müssen Sie einen oder mehrere `Input Key` innerhalb des Abschnitts `ComfyUI Workflow Nodes` in Open WebUI anpassen, damit sie einem Node innerhalb Ihres Workflows entsprechen.
Beispielsweise muss `seed` möglicherweise in `noise_seed` umbenannt werden, damit er mit einer Node-ID in Ihrem importierten Workflow übereinstimmt.
:::
:::tip
Einige Workflows, wie solche, die die Flux-Modelle verwenden, können mehrere Node-IDs verwenden, die erforderlich sind, um ihre Node-Eingabefelder innerhalb von Open WebUI auszufüllen. Wenn ein Node-Eingabefeld mehrere IDs benötigt, sollten die Node-IDs durch Kommas getrennt werden (z. B. `1` oder `1, 2`).
:::

6. Klicken Sie auf `Save`, um die Einstellungen zu übernehmen und genießen Sie die Bildgenerierung mit ComfyUI integriert in Open WebUI!

Nach Abschluss dieser Schritte sollte Ihre ComfyUI-Einrichtung mit Open WebUI integriert sein, und Sie können die Flux.1-Modelle für die Bildgenerierung verwenden.

### Konfiguration mit SwarmUI

SwarmUI nutzt ComfyUI als Backend. Um Open WebUI mit SwarmUI arbeiten zu lassen, müssen Sie `ComfyBackendDirect` an die `ComfyUI Base URL` anhängen. Zusätzlich sollten Sie SwarmUI mit LAN-Zugang einrichten. Nach den oben genannten Anpassungen ist die Einrichtung von SwarmUI für die Arbeit mit Open WebUI identisch mit [Schritt 1: Konfigurieren Sie die Open WebUI-Einstellungen](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings), wie oben beschrieben.
![Installieren Sie SwarmUI mit LAN-Zugang](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

Die Adresse, die Sie als ComfyUI Base URL eingeben, sieht wie folgt aus: `http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI unterstützt auch die Bildgenerierung über die **OpenAI DALL·E APIs**. Diese Option enthält einen Selector, mit dem zwischen DALL·E 2 und DALL·E 3 gewählt werden kann, die jeweils verschiedene Bildgrößen unterstützen.

### Einrichtung

1. Besorgen Sie sich einen [API-Schlüssel](https://platform.openai.com/api-keys) von OpenAI.

### Konfiguration von Open WebUI

1. Navigieren Sie in Open WebUI zum Menü **Admin Panel** > **Settings** > **Images**.
2. Stellen Sie das Feld `Image Generation Engine` auf `Open AI (Dall-E)`.
3. Geben Sie Ihren OpenAI API-Schlüssel ein.
4. Wählen Sie das gewünschte DALL·E-Modell aus. Beachten Sie, dass die Bildgrößenoptionen vom ausgewählten Modell abhängen:
   * **DALL·E 2**: Unterstützt `256x256`, `512x512` oder `1024x1024` Bilder.
   * **DALL·E 3**: Unterstützt `1024x1024`, `1792x1024` oder `1024x1792` Bilder.

### Azure OpenAI

Die direkte Verwendung von Azure OpenAI Dall-E wird nicht unterstützt, aber Sie können [einen LiteLLM-Proxy einrichten](https://litellm.vercel.app/docs/image_generation), der mit der `Open AI (Dall-E)` Bildgenerierungs-Engine kompatibel ist.

## Nutzung der Bildgenerierung

![Tutorial Bildgenerierung](/images/tutorial_image_generation.png)

1. Verwenden Sie zuerst ein Textgenerierungsmodell, um einen Prompt für die Bildgenerierung zu schreiben.
2. Nachdem die Antwort fertiggestellt wurde, können Sie auf das Bildsymbol klicken, um ein Bild zu generieren.
3. Sobald die Bildgenerierung abgeschlossen ist, wird das Bild automatisch im Chat zurückgegeben.

:::tip
    Sie können die Antwort des LLM bearbeiten und Ihren Prompt zur Bildgenerierung als Nachricht eingeben,
    der für die Bildgenerierung gesendet wird, anstatt die tatsächliche Antwort des
    LLM zu verwenden.
:::
