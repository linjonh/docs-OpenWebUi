---
sidebar_position: 5
title: "📜 Protokollieren in Open WebUI"
---

# Verständnis der Open WebUI-Protokollierung 🪵

Protokollierung ist entscheidend für das Debuggen, Überwachen und das Verständnis, wie sich Open WebUI verhält. Diese Anleitung erklärt, wie die Protokollierung sowohl im **Browser-Client** (Frontend) als auch im **Anwendungsserver/Backend** funktioniert.

## 🖥️ Protokollierung im Browser-Client (Frontend)

Für Frontend-Entwicklung und Debugging nutzt Open WebUI die standardmäßige Browser-Konsolenprotokollierung. Das bedeutet, dass Sie Protokolle direkt in den integrierten Entwickler-Tools Ihres Webbrowsers sehen können.

**Zugriff auf Browser-Protokolle:**

1. **Öffnen Sie die Entwickler-Tools:** In den meisten Browsern können Sie die Entwickler-Tools öffnen, indem Sie:
   - **Rechtsklick** irgendwo auf der Open WebUI-Seite machen und "Untersuchen" oder "Element untersuchen" auswählen.
   - **F12** drücken (oder Cmd+Opt+I auf macOS).

2. **Gehen Sie zum „Konsole"-Tab:** Innerhalb des Entwickler-Tools-Panels suchen und klicken Sie auf den „Konsole"-Tab.

**Arten von Browser-Protokollen:**

Open WebUI verwendet hauptsächlich [JavaScripts](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()` für die clientseitige Protokollierung. Im Konsolenbereich sehen Sie unterschiedliche Arten von Nachrichten, einschließlich:

- **Informationsnachrichten:** Allgemeiner Anwendungsablauf und Status.
- **Warnungen:** Mögliche Probleme oder nicht kritische Fehler.
- **Fehler:** Probleme, die die Funktionalität beeinträchtigen könnten.

**Browserspezifische Entwickler-Tools:**

Verschiedene Browser bieten leicht unterschiedliche Entwickler-Tools, aber alle verfügen über eine Konsole zum Anzeigen von JavaScript-Protokollen. Hier sind Links zur Dokumentation für beliebte Browser:

- **[Blink] Chrome/Chromium (z. B. Chrome, Edge):** [Chrome DevTools Dokumentation](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox:** [Firefox Developer Tools Dokumentation](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari:** [Safari Developer Tools Dokumentation](https://developer.apple.com/safari/tools/)

## ⚙️ Anwendungsserver/Backend-Protokollierung (Python)

Das Backend von Open WebUI verwendet das integrierte `logging`-Modul von Python, um Ereignisse und Informationen auf der Serverseite zu dokumentieren. Diese Protokolle sind entscheidend, um das Serververhalten zu verstehen, Fehler zu diagnostizieren und die Leistung zu überwachen.

**Wichtige Konzepte:**

- **Python `logging`-Modul:** Open WebUI nutzt die standardmäßige Python `logging`-Bibliothek. Wenn Sie mit der Python-Protokollierung vertraut sind, wird Ihnen dieser Abschnitt leicht verständlich sein. (Für detailliertere Informationen siehe die [Python Protokollierungsdokumentation](https://docs.python.org/3/howto/logging.html#logging-levels)).
- **Konsolenausgabe:** Standardmäßig werden Backend-Protokolle an die Konsole (Standardausgabe) gesendet, was sie in Ihrem Terminal oder den Logs des Docker-Containers sichtbar macht.
- **Protokollierungsstufen:** Protokollierungsstufen steuern die Details der Protokolle. Sie können Open WebUI so konfigurieren, dass mehr oder weniger detaillierte Informationen anhand dieser Stufen angezeigt werden.

### 🚦 Erklärung der Protokollierungsstufen

Die Python-Protokollierung verwendet eine Hierarchie von Stufen, um Protokollnachrichten nach Schweregrad zu kategorisieren. Hier ist eine Übersicht der Stufen von am schwerwiegendsten bis am wenigsten schwerwiegend:

| Stufe       | Numerischer Wert | Beschreibung                                                                | Anwendungsfall                                                              |
| ----------- | ---------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `CRITICAL`  | 50               | **Schwere Fehler**, die möglicherweise zur Beendigung der Anwendung führen. | Katastrophale Fehler, Datenkorruption.                                     |
| `ERROR`     | 40               | **Fehler**, die auf Probleme hinweisen, aber die Anwendung könnte weiterhin funktionieren. | Wiederherstellbare Fehler, fehlgeschlagene Operationen.                      |
| `WARNING`   | 30               | **Mögliche Probleme** oder unerwartete Situationen, die untersucht werden sollten. | Veraltungswarnungen, Ressourcenbeschränkungen.                              |
| `INFO`      | 20               | **Allgemeine Informationsnachrichten** über den Betrieb der Anwendung.      | Startnachrichten, Schlüsselereignisse, normaler Ablauf.                     |
| `DEBUG`     | 10               | **Detaillierte Debugging-Informationen** für Entwickler.                     | Funktionsaufrufe, Variablenwerte, detaillierte Ausführungsschritte.          |
| `NOTSET`    | 0                | **Alle Nachrichten werden protokolliert.** (Standardmäßig `WARNING`, falls nicht gesetzt). | Nützlich, um absolut alles zu erfassen, typischerweise für sehr spezifisches Debugging. |

**Standardmäßige Stufe:** Die Standardprotokollierungsstufe von Open WebUI ist `INFO`.

### 🌍 Globale Protokollierungsstufe (`GLOBAL_LOG_LEVEL`)

Sie können die **globale** Protokollierungsstufe für das gesamte Open WebUI-Backend über die Umgebungsvariable `GLOBAL_LOG_LEVEL` ändern. Dies ist die einfachste Möglichkeit, die allgemeine Protokollierungsdetailtiefe zu steuern.

**So funktioniert es:**

Die Konfiguration von `GLOBAL_LOG_LEVEL` steuert den Root-Logger in Python und wirkt sich auf alle Logger in Open WebUI sowie möglicherweise auf einige Drittanbieter-Bibliotheken aus, die [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig) verwenden. Es verwendet `logging.basicConfig(force=True)`, was bedeutet, dass jede bestehende Konfiguration des Root-Loggers überschrieben wird.

**Beispiel: Einstellung auf `DEBUG`**

- **Docker-Parameter:**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**Auswirkungen:** Die Einstellung von `GLOBAL_LOG_LEVEL` auf `DEBUG` erzeugt die ausführlichsten Logs, einschließlich detaillierter Informationen, die für Entwicklung und Fehlerbehebung hilfreich sind. Für Produktionsumgebungen könnte `INFO` oder `WARNING` geeigneter sein, um das Log-Volumen zu reduzieren.

### ⚙️ App-/Backend-spezifische Logging-Stufen

Für eine genauere Steuerung bietet Open WebUI Umgebungsvariablen, um die Logging-Stufen für spezifische Backend-Komponenten festzulegen. Logging ist eine laufende Arbeit, aber ein gewisses Maß an Kontrolle ist über diese Umgebungsvariablen verfügbar. Diese Variablen ermöglichen es Ihnen, das Logging für verschiedene Teile der Anwendung genau abzustimmen.

**Verfügbare Umgebungsvariablen:**

| Umgebungsvariable      | Komponente/Modul                                                  | Beschreibung                                                                                                   |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`      | Audioverarbeitung                                                 | Logging im Zusammenhang mit Audio-Transkription (faster-whisper), Text-to-Speech (TTS) und Audioverarbeitung.  |
| `COMFYUI_LOG_LEVEL`    | ComfyUI-Integration                                               | Logging für Interaktionen mit ComfyUI, wenn Sie diese Integration nutzen.                                      |
| `CONFIG_LOG_LEVEL`     | Konfigurationsmanagement                                         | Logging im Zusammenhang mit dem Laden und Verarbeiten von Open WebUI-Konfigurationsdateien.                    |
| `DB_LOG_LEVEL`         | Datenbankoperationen (Peewee)                                    | Logging für Datenbankinteraktionen unter Verwendung des Peewee ORM (Object-Relational Mapper).                 |
| `IMAGES_LOG_LEVEL`     | Bildgenerierung (AUTOMATIC1111/Stable Diffusion)                 | Logging für Aufgaben zur Bildgenerierung, insbesondere bei der Verwendung der AUTOMATIC1111-Stable-Diffusion-Integration. |
| `MAIN_LOG_LEVEL`       | Hauptanwendungsdurchführung (Root-Logger)                        | Logging vom Hauptanwendungseintrittspunkt und Root-Logger.                                                     |
| `MODELS_LOG_LEVEL`     | Modellmanagement                                                  | Logging im Zusammenhang mit dem Laden, Verwalten und Interagieren mit Sprachmodellen (LLMs), einschließlich Authentifizierung. |
| `OLLAMA_LOG_LEVEL`     | Ollama-Backend-Integration                                        | Logging für Kommunikation und Interaktion mit dem Ollama-Backend.                                              |
| `OPENAI_LOG_LEVEL`     | OpenAI-API-Integration                                            | Logging für Interaktionen mit der OpenAI-API (z. B. für Modelle wie GPT).                                      |
| `RAG_LOG_LEVEL`        | Retrieval-Augmented Generation (RAG)                             | Logging für die RAG-Pipeline, einschließlich Chroma-Vektor-Datenbank und Sentence-Transformers.                |
| `WEBHOOK_LOG_LEVEL`    | Authentifizierungs-Webhook                                        | Erweiterte Logging-Funktionen für die Authentifizierungs-Webhooks.                                             |

**Anwendung:**

Sie können diese Umgebungsvariablen auf dieselbe Weise wie `GLOBAL_LOG_LEVEL` festlegen (Docker-Parameter, Docker Compose `environment`-Abschnitt). Zum Beispiel, um detaillierteres Logging für Ollama-Interaktionen zu erhalten, könnten Sie Folgendes festlegen:

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**Wichtige Anmerkung:** Im Gegensatz zu `GLOBAL_LOG_LEVEL` wirken sich diese app-spezifischen Variablen möglicherweise nicht auf das Logging von *allen* Drittanbieter-Modulen aus. Sie steuern in erster Linie das Logging innerhalb des Open WebUI-Codebases.

Indem Sie diese Logging-Mechanismen verstehen und nutzen, können Sie Ihre Open WebUI-Instanz effektiv überwachen, debuggen und Einblicke gewinnen.
