---
sidebar_position: 4100
title: "🦊 Firefox AI-Chatbot-Seitenleiste"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open-WebUI-Team unterstützt. Es dient nur als Demonstration dafür, wie Sie Open WebUI für Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Lesen Sie das Tutorial zur Mitwirkung.
:::

## 🦊 Firefox AI-Chatbot-Seitenleiste

# Integration von Open WebUI als lokaler KI-Chatbot-Browser-Assistent in Mozilla Firefox

## Voraussetzungen

Bevor Sie Open WebUI als KI-Chatbot-Browser-Assistent in Mozilla Firefox integrieren, stellen Sie sicher, dass Sie Folgendes haben:

* URL der Open-WebUI-Instanz (lokal oder domainbasiert)
* Installierter Firefox-Browser

## Aktivierung des KI-Chatbots in Firefox

1. Klicken Sie auf die Hamburger-Schaltfläche (drei horizontale Linien oben rechts, direkt unter der `X`-Schaltfläche)
2. Öffnen Sie die Firefox-Einstellungen
2. Klicken Sie auf den Abschnitt `Firefox Labs`
3. Schalten Sie `AI Chatbot` ein

Alternativ können Sie den KI-Chatbot über die Seite `about:config` aktivieren (im nächsten Abschnitt beschrieben).

## Konfiguration der about:config-Einstellungen

1. Geben Sie `about:config` in die Firefox-Adressleiste ein
2. Klicken Sie auf `Risiko akzeptieren und fortfahren`
3. Suchen Sie nach `browser.ml.chat.enabled` und schalten Sie es auf `true`, wenn es nicht bereits über Firefox Labs aktiviert ist
4. Suchen Sie nach `browser.ml.chat.hideLocalhost` und schalten Sie es auf `false`

### browser.ml.chat.prompts.#

Um benutzerdefinierte Eingabeaufforderungen hinzuzufügen, folgen Sie diesen Schritten:

1. Suchen Sie nach `browser.ml.chat.prompts.#` (ersetzen Sie `#` durch eine Nummer, z. B. `0`, `1`, `2`, usw.)
2. Klicken Sie auf die `+`-Schaltfläche, um eine neue Eingabeaufforderung hinzuzufügen
3. Geben Sie die Bezeichnung, den Wert und die ID der Eingabeaufforderung ein (z. B. `{"id":"Mein Prompt", "value": "Das ist meine benutzerdefinierte Eingabeaufforderung.", "label": "Mein Prompt"}`)
4. Wiederholen Sie den Vorgang, um weitere Eingabeaufforderungen hinzuzufügen

### browser.ml.chat.provider

1. Suchen Sie nach `browser.ml.chat.provider`
2. Geben Sie die URL Ihrer Open-WebUI-Instanz einschließlich aller optionalen Parameter ein (z. B. `https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`)

## URL-Parameter für Open WebUI

Die folgenden URL-Parameter können verwendet werden, um Ihre Open-WebUI-Instanz anzupassen:

### Modelle und Modellauswahl

* `models`: Geben Sie mehrere Modelle (kommagetrennte Liste) für die Chat-Sitzung an (z. B. `/?models=model1,model2`)
* `model`: Geben Sie ein einzelnes Modell für die Chat-Sitzung an (z. B. `/?model=model1`)

### YouTube-Transkription

* `youtube`: Geben Sie eine YouTube-Video-ID an, um das Video im Chat zu transkribieren (z. B. `/?youtube=VIDEO_ID`)

### Websuche

* `web-search`: Aktivieren Sie die Websuche-Funktionalität, indem Sie diesen Parameter auf `true` setzen (z. B. `/?web-search=true`)

### Werkzeugauswahl

* `tools` oder `tool-ids`: Geben Sie eine kommagetrennte Liste von Werkzeug-IDs an, die im Chat aktiviert werden sollen (z. B. `/?tools=tool1,tool2` oder `/?tool-ids=tool1,tool2`)

### Call-Overlay

* `call`: Aktivieren Sie ein Video- oder Anruf-Overlay in der Chat-Oberfläche, indem Sie diesen Parameter auf `true` setzen (z. B. `/?call=true`)

### Initiale Eingabeaufforderung

* `q`: Legen Sie eine initiale Eingabeaufforderung oder Abfrage für den Chat fest (z. B. `/?q=Hallo%20da`)

### Temporäre Chat-Sitzungen

* `temporary-chat`: Markieren Sie den Chat als temporäre Sitzung, indem Sie diesen Parameter auf `true` setzen (z. B. `/?temporary-chat=true`)

Siehe https://docs.openwebui.com/features/chat-features/url-params für weitere Informationen zu URL-Parametern und deren Verwendung.

## Zusätzliche about:config-Einstellungen

Die folgenden `about:config`-Einstellungen können für weitere Anpassungen vorgenommen werden:

* `browser.ml.chat.shortcuts`: Aktivieren Sie benutzerdefinierte Shortcuts für die KI-Chatbot-Seitenleiste
* `browser.ml.chat.shortcuts.custom`: Aktivieren Sie benutzerdefinierte Shortcut-Tasten für die KI-Chatbot-Seitenleiste
* `browser.ml.chat.shortcuts.longPress`: Legen Sie die Verzögerung für das lange Drücken der Shortcut-Tasten fest
* `browser.ml.chat.sidebar`: Aktivieren Sie die KI-Chatbot-Seitenleiste
* `browser.ml.checkForMemory`: Überprüfen Sie den verfügbaren Speicher vor dem Laden von Modellen
* `browser.ml.defaultModelMemoryUsage`: Legen Sie die Standard-Speichernutzung für Modelle fest
* `browser.ml.enable`: Aktivieren Sie die maschinellen Lernfunktionen in Firefox
* `browser.ml.logLevel`: Legen Sie die Protokollebene für maschinelle Lernfunktionen fest
* `browser.ml.maximumMemoryPressure`: Legen Sie die maximale Speicherbelastungsgrenze fest
* `browser.ml.minimumPhysicalMemory`: Legen Sie die minimale erforderliche physische Speicherkapazität fest
* `browser.ml.modelCacheMaxSize`: Legen Sie die maximale Größe des Model-Caches fest
* `browser.ml.modelCacheTimeout`: Legen Sie den Timeout für den Model-Cache fest
* `browser.ml.modelHubRootUrl`: Legen Sie die Stamm-URL für den Model Hub fest
* `browser.ml.modelHubUrlTemplate`: Legen Sie die URL-Vorlage für den Model Hub fest
* `browser.ml.queueWaitInterval`: Legen Sie das Intervall für die Wartezeit in der Warteschlange fest
* `browser.ml.queueWaitTimeout`: Legen Sie den Timeout für die Wartezeit in der Warteschlange fest

## Zugriff auf die KI-Chatbot-Seitenleiste

Um auf die KI-Chatbot-Seitenleiste zuzugreifen, verwenden Sie eine der folgenden Methoden:

* Drücken Sie `CTRL+B`, um die Lesezeichen-Seitenleiste zu öffnen und zum KI-Chatbot zu wechseln
* Drücken Sie `CTRL+Alt+X`, um die KI-Chatbot-Seitenleiste direkt zu öffnen