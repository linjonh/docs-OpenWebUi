---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode-Erweiterung mit Open WebUI"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie contribute? Schauen Sie sich das Contributing-Tutorial an.
:::

# Integration der Continue.dev VSCode-Erweiterung mit Open WebUI

### Erweiterung herunterladen

Sie können die VSCode-Erweiterung hier im [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue) herunterladen.

Nach der Installation sollten Sie jetzt eine continue-Registerkarte in der Seitenleiste haben. Öffnen Sie diese.

Klicken Sie auf den Assistenten-Selektor über dem Haupt-Chat-Eingabefeld. Fahren Sie dann mit der Maus über "Lokaler Assistent", und Sie sollten ein Einstellungssymbol sehen (sieht aus wie ein Zahnrad).

Sobald Sie auf das Einstellungssymbol klicken, sollte sich eine `config.yaml` im Editor öffnen.

Hier können Sie Continue konfigurieren, um Open WebUI zu verwenden.

---

Derzeit unterstützt der ollama-Anbieter keine Authentifizierung, sodass wir diesen Anbieter nicht mit Open WebUI verwenden können.

Jedoch Ollama und Open WebUI sind beide mit der OpenAI API-Spezifikation kompatibel. Sie können einen Blog-Beitrag von Ollama [hier](https://ollama.com/blog/openai-compatibility) dazu sehen.

Wir können weiterhin Continue so einrichten, dass es den openai-Anbieter nutzt, wodurch wir das Authentifizierungs-Token von Open WebUI verwenden können.

---

## Konfiguration

In `config.yaml` müssen Sie lediglich die folgenden Optionen hinzufügen/ändern.

### Anbieter auf openai ändern

```yaml
provider: openai
```

### apiBase hinzufügen oder aktualisieren

Setzen Sie dies auf Ihre Open WebUI-Domain am Ende.

```yaml
apiBase: http://localhost:3000/ # Falls Sie die Docker-Anleitung befolgt haben.
```

### apiKey hinzufügen

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # Ersetzen Sie dies durch Ihren API-Schlüssel
```

Sie können Ihren API-Schlüssel in Open WebUI -> Einstellungen -> Konto -> API-Schlüssel finden und generieren.

Sie sollten den "API-Schlüssel" kopieren (dieser beginnt mit sk-)

## Beispielkonfiguration

Hier ist ein Basisbeispiel für config.yaml, das Open WebUI über einen openai-Anbieter verwendet. Granite Code wird als Modell verwendet.
Stellen Sie sicher, dass Sie das Modell vorher in Ihre Ollama-Instanzen einziehen.

```yaml
name: Lokaler Assistent
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Modell ABC aus Pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplete
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: Schreibe Unit-Tests für hervorgehobenen Code
    prompt: |
      Schreibe eine umfassende Reihe von Unit-Tests für den ausgewählten Code. Es sollte Setup, Ausführung von Tests zur Überprüfung der Korrektheit einschließlich wichtiger Randfälle und Teardown enthalten. Stelle sicher, dass die Tests vollständig und anspruchsvoll sind. Gib die Tests nur als Chat-Ausgabe, bearbeite keine Datei.
```

Speichern Sie Ihre `config.yaml` und das war's!

Sie sollten jetzt Ihr Modell in der Continue-Registerkarte Modell-Auswahl sehen.

Wählen Sie es aus, und Sie sollten jetzt über Open WebUI (und/oder alle [Pipelines](/pipelines), die Sie eingerichtet haben) kommunizieren können.

Sie können dies für so viele Modelle tun, wie Sie verwenden möchten; obwohl jedes Modell funktionieren sollte, sollten Sie ein Modell verwenden, das für Code ausgelegt ist.

Siehe die Continue-Dokumentation für zusätzliche Continue-Konfiguration, [Continue Dokumentation](https://docs.continue.dev/reference/Model%20Providers/openai)
