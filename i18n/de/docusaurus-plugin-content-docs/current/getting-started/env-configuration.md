---
sidebar_position: 4
title: "🌍 Konfiguration der Umgebungsvariablen"
---


## Übersicht

Open WebUI bietet eine Vielzahl von Umgebungsvariablen, die es Ihnen ermöglichen, verschiedene Aspekte der Anwendung anzupassen und zu konfigurieren.
Diese Seite dient als umfassende Referenz für alle verfügbaren Umgebungsvariablen, einschließlich ihrer Typen, Standardwerte und Beschreibungen.
Mit der Einführung neuer Variablen wird diese Seite aktualisiert, um die wachsenden Konfigurationsmöglichkeiten widerzuspiegeln.

:::info

Diese Seite ist auf dem neuesten Stand der Open WebUI-Version [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9), wird jedoch weiterentwickelt, um genauere Beschreibungen, verfügbare Optionen für Umgebungsvariablen, Standardwerte und Verbesserungen der Beschreibungen einzubinden.

:::

### Wichtiger Hinweis zu `PersistentConfig`-Umgebungsvariablen

:::note

Beim ersten Start von Open WebUI werden alle Umgebungsvariablen gleichermaßen behandelt und können verwendet werden, um die Anwendung zu konfigurieren. Für als `PersistentConfig` markierte Umgebungsvariablen werden deren Werte jedoch intern gespeichert.

Nach dem ersten Start wird, wenn Sie den Container neu starten, die externen Umgebungsvariablenwerte nicht mehr verwendet. Stattdessen werden die intern gespeicherten Werte verwendet.

Im Gegensatz dazu werden reguläre Umgebungsvariablen bei jedem Neustart weiterhin aktualisiert und angewendet.

Sie können die Werte von `PersistentConfig`-Umgebungsvariablen direkt innerhalb von Open WebUI aktualisieren, und diese Änderungen werden intern gespeichert. Dies ermöglicht es Ihnen, diese Konfigurationseinstellungen unabhängig von den externen Umgebungsvariablen zu verwalten.

Bitte beachten Sie, dass `PersistentConfig`-Umgebungsvariablen in der folgenden Dokumentation eindeutig als solche gekennzeichnet sind, damit Sie wissen, wie sie sich verhalten werden.

:::

## App/Backend

Die folgenden Umgebungsvariablen werden von `backend/open_webui/config.py` verwendet, um die Startkonfiguration von Open WebUI zu ermöglichen.
Bitte beachten Sie, dass einige Variablen je nach Betrieb von Open WebUI direkt oder über Docker unterschiedliche Standardwerte haben können. Weitere Informationen zu Logging-Umgebungsvariablen finden Sie in unserer [Dokumentation zum Logging](https://docs.openwebui.com/getting-started/advanced-topics/logging).

### Allgemein

#### `WEBUI_URL`

- Typ: `str`
- Standardwert: `http://localhost:3000`
- Beschreibung: Gibt die URL an, unter der Open WebUI erreichbar ist. Derzeit wird dies für die Unterstützung der Suchmaschinen genutzt.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_SIGNUP`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert und deaktiviert die Erstellung von Benutzerkonten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_LOGIN_FORM`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert E-Mail, Passwort, Anmelde- und „oder“-Elemente (nur wenn `ENABLE_OAUTH_SIGNUP` auf True gesetzt ist).
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::danger

Dies sollte **nur** auf `False` gesetzt werden, wenn [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup) ebenfalls verwendet und auf `True` gesetzt ist. Anderenfalls kann keine Anmeldung erfolgen.

:::

#### `DEFAULT_LOCALE`

- Typ: `str`
- Standardwert: `en`
- Beschreibung: Legt die Standard-Spracheinstellung für die Anwendung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DEFAULT_MODELS`

- Typ: `str`
- Standardwert: Leerzeichen ( ), da `None`.
- Beschreibung: Legt ein Standard-Sprachmodell fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DEFAULT_USER_ROLE`

- Typ: `str`
- Optionen:
  - `pending` - Neue Benutzerkonten bleiben zunächst in einem wartenden Zustand, bis sie manuell durch einen Administrator aktiviert werden.
  - `user` - Neue Benutzerkonten werden automatisch mit regulären Benutzerrechten aktiviert.
  - `admin` - Neue Benutzerkonten werden automatisch mit Administratorrechten aktiviert.
- Standardwert: `pending`
- Beschreibung: Legt die Standardrolle für neue Benutzerkonten fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `PENDING_USER_OVERLAY_TITLE`

- Typ: `str`
- Standardwert: Leerzeichen ( )
- Beschreibung: Legt einen benutzerdefinierten Titel für den Overlay von wartenden Benutzerkonten fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `PENDING_USER_OVERLAY_CONTENT`

- Typ: `str`
- Standardwert: Leerzeichen ( )
- Beschreibung: Legt benutzerdefinierte Textinhalte für den Overlay von wartenden Benutzerkonten fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_CHANNELS`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert die Unterstützung für Kanäle.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEBHOOK_URL`

- Typ: `str`
- Beschreibung: Legt eine Webhook-Integration mit Discord/Slack/Microsoft Teams fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `ENABLE_ADMIN_EXPORT`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Steuert, ob Administratoren Daten exportieren können.

#### `ENABLE_ADMIN_CHAT_ACCESS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Ermöglicht Administratoren den Zugriff auf alle Chats.

#### `ENABLE_USER_WEBHOOKS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert Benutzer-Webhooks.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `RESPONSE_WATERMARK`

- Typ: `str`
- Standardwert: Leerzeichen ( )
- Beschreibung: Setzt einen benutzerdefinierten Text, der beim Kopieren einer Nachricht im Chat enthalten ist. Z.B. `"Dieser Text ist KI-generiert"` -> fügt "Dieser Text ist KI-generiert" zu jeder kopierten Nachricht hinzu.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `THREAD_POOL_SIZE`

- Typ: `int`
- Standardwert: `0`
- Beschreibung: Legt die Größe des Thread-Pools für FastAPI/AnyIO-Blockaufrufe fest. Standardmäßig (bei Einstellung auf 0) verwendet FastAPI/AnyIO `40` Threads. Bei großen Anwendungen mit vielen gleichzeitigen Benutzern kann es erforderlich sein, `THREAD_POOL_SIZE` zu erhöhen, um Blockierungen zu vermeiden.

#### `SHOW_ADMIN_DETAILS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Schaltet um, ob Administratorendetails in der Benutzeroberfläche angezeigt werden.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `ADMIN_EMAIL`

- Typ: `str`
- Beschreibung: Legt die E-Mail des Administrators fest, die durch `SHOW_ADMIN_DETAILS` angezeigt wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `ENV`

- Typ: `str`
- Optionen:
  - `dev` - Aktiviert die FastAPI-API-Dokumentation unter `/docs`
  - `prod` - Konfiguriert automatisch verschiedene Umgebungsvariablen
- Standardwert:
  - **Backend-Standard**: `dev`
  - **Docker-Standard**: `prod`
- Beschreibung: Einstellung der Umgebung.

#### `ENABLE_PERSISTENT_CONFIG`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Wenn auf `False` gesetzt, werden alle `PersistentConfig` Variablen wie reguläre Variablen behandelt.

#### `CUSTOM_NAME`

- Typ: `str`
- Beschreibung: Setzt `WEBUI_NAME`, fragt jedoch **api.openwebui.com** nach Metadaten ab.

#### `WEBUI_NAME`

- Typ: `str`
- Standardwert: `Open WebUI`
- Beschreibung: Legt den Hauptnamen der WebUI fest. Fügt `(Open WebUI)` hinzu, falls überschrieben.

#### `PORT`

- Typ: `int`
- Standardwert: `8080`
- Beschreibung: Legt den Port fest, über den Open WebUI ausgeführt wird.

:::info
Wenn Sie die Anwendung über Python ausführen und den Befehl `open-webui serve` verwenden, können Sie den Port nicht über die Konfiguration `PORT` festlegen. Stattdessen müssen Sie ihn direkt als Kommandozeilenargument mit dem Flag `--port` angeben. Zum Beispiel:

```bash
open-webui serve --port 9999
```

Dadurch wird Open WebUI auf Port `9999` ausgeführt. Die Umgebungsvariable `PORT` wird in diesem Modus ignoriert.
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Wenn aktiviert, speichert das System jede übertragene Chatnachricht in Echtzeit in der Datenbank, um maximale Datenpersistenz zu gewährleisten. Diese Funktion bietet eine robuste Datenwiederherstellung und ermöglicht eine genaue Sitzungsverfolgung. Der Kompromiss ist jedoch eine erhöhte Latenz, da das Speichern in der Datenbank eine Verzögerung verursacht. Durch Deaktivieren dieser Funktion kann die Performance verbessert und Verzögerungen verringert werden, jedoch besteht ein höheres Risiko für Datenverlust im Falle eines Systemausfalls oder Absturzes. Nutzen Sie diese Option je nach Anforderungen und akzeptablen Kompromissen Ihrer Anwendung.

#### `BYPASS_MODEL_ACCESS_CONTROL`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Umgeht die Zugriffskontrolle für Modelle.

#### `WEBUI_BUILD_HASH`

- Typ: `str`
- Standardwert: `dev-build`
- Beschreibung: Wird verwendet, um den Git-SHA des Builds für Releases zu identifizieren.

#### `WEBUI_BANNERS`

- Typ: `list` von `dict`
- Standardwert: `[]`
- Beschreibung: Liste der Banner, die den Benutzern angezeigt werden sollen. Das Format für Banner lautet:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

:::info

Wenn Sie diese Umgebungsvariable in einer `.env` Datei setzen, stellen Sie sicher, dass Sie die Anführungszeichen durch Einrahmen des gesamten Wertes in doppelte Anführungszeichen und die Verwendung von Escaped Quotes (`\"`) für die inneren Anführungszeichen maskieren. Beispiel:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"Ihre Nachrichten werden gespeichert.\", \"content\": \"Ihre Nachrichten werden gespeichert und können von Menschen überprüft werden. LLMs neigen zu Halluzinationen, prüfen Sie die Quellen.\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Erstellt das Docker-Image mit NVIDIA-CUDA-Unterstützung. Aktiviert GPU-Beschleunigung für lokale Whisper- und Einbettungsprozesse.

#### `EXTERNAL_PWA_MANIFEST_URL`

- Typ: `str`
- Standardwert: Leerzeichen ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Wenn als vollständig qualifizierte URL definiert (z.B. https://path/to/manifest.webmanifest), verwenden Anfragen an /manifest.json die externe Manifest-Datei. Wenn nicht definiert, wird die Standard-Manifest.json-Datei verwendet.

#### `ENABLE_TITLE_GENERATION`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert die Generierung von Chat-Titeln.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LICENSE_KEY`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt den Lizenzschlüssel an, der verwendet werden soll (nur für Enterprise-Benutzer).
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `SSL_ASSERT_FINGERPRINT`

- Typ: `str`
- Standardwert: Leerzeichen ( ), da `None` als Standardwert festgelegt ist.
- Beschreibung: Gibt den SSL-Assert-Fingerprint an, der verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DEFAULT_PROMPT_SUGGESTIONS`

- Typ: `list` von `dict`
- Standardwert: `[]` (was bedeutet, dass die eingebauten Standard-Prompt-Vorschläge verwendet werden)
- Beschreibung: Liste der Prompt-Vorschläge. Das Format der Prompt-Vorschläge lautet:

```json
[{"title": ["Titelteil 1", "Titelteil 2"], "content": "Prompt"}]
```

### AIOHTTP Client

#### `AIOHTTP_CLIENT_TIMEOUT`

- Typ: `int`
- Standardwert: `300`
- Beschreibung: Gibt die Timeout-Dauer in Sekunden für den AIOHTTP-Client an. Dies beeinflusst beispielsweise Verbindungen zu Ollama- und OpenAI-Endpunkten.

:::info

Dies ist die maximale Zeit, die der Client auf eine Antwort wartet, bevor er abbricht.
Wenn auf ein Leerzeichen ( ) gesetzt, wird das Timeout auf `None` gesetzt, wodurch das Timeout effektiv deaktiviert wird und der Client unbegrenzt wartet.

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- Typ: `int`
- Standardwert: `10`
- Beschreibung: Legt das Timeout in Sekunden für das Abrufen der Modellliste fest. Dies kann in Fällen nützlich sein, in denen Netzwerklatenz eine längere Timeout-Dauer erfordert, um die Modellliste erfolgreich abzurufen.

:::note
Das AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST ist standardmäßig auf 10 Sekunden eingestellt, um sicherzustellen, dass alle erforderlichen Verbindungen verfügbar sind, wenn die Web-Oberfläche geöffnet wird. Diese Dauer bietet ausreichend Zeit für das Abrufen der Modellliste, auch bei höherer Netzwerklatenz. Sie können diesen Wert verringern, wenn schnellere Timeouts bevorzugt werden, bedenken Sie jedoch, dass dadurch einige Verbindungen getrennt werden könnten, abhängig von Ihren Netzwerkbedingungen.
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- Typ: `int`
- Beschreibung: Legt das Timeout in Sekunden für das Abrufen der Modellliste fest. Dies kann in Fällen nützlich sein, in denen Netzwerklatenz eine längere Timeout-Dauer erfordert, um die Modellliste erfolgreich abzurufen.

### Verzeichnisse

#### `DATA_DIR`

- Typ: `str`
- Standardwert: `./data`
- Beschreibung: Gibt das Basisverzeichnis für die Datenspeicherung an, einschließlich Uploads, Cache, Vektordatenbank usw.

#### `FONTS_DIR`

- Typ: `str`
- Beschreibung: Gibt das Verzeichnis für Schriftarten an.

#### `FRONTEND_BUILD_DIR`

- Typ: `str`
- Standardwert: `../build`
- Beschreibung: Gibt den Speicherort der gebauten Frontend-Dateien an.

#### `STATIC_DIR`

- Typ: `str`
- Standardwert: `./static`
- Beschreibung: Gibt das Verzeichnis für statische Dateien wie das Favicon an.

### Ollama

#### `ENABLE_OLLAMA_API`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert die Verwendung der Ollama-APIs.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` ist veraltet) {#ollama_base_url}

- Typ: `str`
- Standardwert: `http://localhost:11434`
- Docker-Standardwert:
  - Wenn `K8S_FLAG` gesetzt ist: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - Wenn `USE_OLLAMA_DOCKER=True`: `http://localhost:11434`
  - Andernfalls `http://host.docker.internal:11434`
- Beschreibung: Konfiguriert die Backend-URL von Ollama.

#### `OLLAMA_BASE_URLS`

- Typ: `str`
- Beschreibung: Konfiguriert load-balancierte Ollama-Backend-Hosts, getrennt durch `;`. Siehe [`OLLAMA_BASE_URL`](#ollama_base_url). Hat Vorrang vor [`OLLAMA_BASE_URL`](#ollama_base_url).
- Beispiel: `http://host-one:11434;http://host-two:11434`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USE_OLLAMA_DOCKER`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Erstellt das Docker-Image mit einer gebündelten Ollama-Instanz.

#### `K8S_FLAG`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Wenn gesetzt, wird Helm-Chart-Bereitstellung angenommen und [`OLLAMA_BASE_URL`](#ollama_base_url) auf `http://ollama-service.open-webui.svc.cluster.local:11434` gesetzt.

### OpenAI

#### `ENABLE_OPENAI_API`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert die Verwendung der OpenAI-APIs.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENAI_API_BASE_URL`

- Typ: `str`
- Standardwert: `https://api.openai.com/v1`
- Beschreibung: Konfiguriert die Basis-API-URL von OpenAI.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENAI_API_BASE_URLS`

- Typ: `str`
- Beschreibung: Unterstützt load-balancierte OpenAI-Basis-API-URLs, getrennt durch Semikolon.
- Beispiel: `http://host-one:11434;http://host-two:11434`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENAI_API_KEY`

- Typ: `str`
- Beschreibung: Legt den OpenAI-API-Schlüssel fest.
- Beispiel: `sk-124781258123`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENAI_API_KEYS`

- Typ: `str`
- Beschreibung: Unterstützt mehrere OpenAI-API-Schlüssel, getrennt durch Semikolon.
- Beispiel: `sk-124781258123;sk-4389759834759834`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Aufgaben

#### `TASK_MODEL`

- Typ: `str`
- Beschreibung: Das Standardmodell, das für Aufgaben wie Titel- und Websuchanfragen verwendet wird,
wenn Ollama-Modelle verwendet werden.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TASK_MODEL_EXTERNAL`

- Typ: `str`
- Beschreibung: Das Standardmodell, das für Aufgaben wie Titel- und Websuchanfragen verwendet wird,
wenn OpenAI-kompatible Endpunkte verwendet werden.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- Typ: `str`
- Beschreibung: Eingabeaufforderung, die zur Generierung von Chattiteln verwendet wird.
- Standard: Der Wert der Umgebungsvariablen `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### Aufgabe:
Erstelle einen prägnanten, 3- bis 5-wörtigen Titel mit einem Emoji, der die Chat-Historie zusammenfasst.
### Richtlinien:
- Der Titel sollte das Hauptthema oder die Hauptthematik des Gesprächs klar wiedergeben.
- Verwende Emojis, die das Verständnis des Themas verbessern, vermeide jedoch Anführungszeichen oder spezielle Formatierungen.
- Schreibe den Titel in der Hauptsprache des Chats; bei Mehrsprachigkeit ist Englisch die Standardoption.
- Priorisiere Genauigkeit über übermäßige Kreativität; halte es klar und einfach.
### Ausgabe:
JSON-Format: { "title": "dein prägnanter Titel hier" }
### Beispiele:
- { "title": "📉 Börsentrends" },
- { "title": "🍪 Perfektes Schokoladenkeksrezept" },
- { "title": "Entwicklung des Musik-Streamings" },
- { "title": "Tipps zur Produktivität im Homeoffice" },
- { "title": "Künstliche Intelligenz im Gesundheitswesen" },
- { "title": "🎮 Einblicke in die Spieleentwicklung" }
### Chat-Historie:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- Typ: `str`
- Beschreibung: Eingabeaufforderung, die bei der Nutzung von Tools verwendet wird.
- Standard: Der Wert der Umgebungsvariablen `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`.

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
Verfügbare Tools: {{TOOLS}}

Deine Aufgabe ist es, basierend auf der Anfrage die richtigen Tools aus der Liste der verfügbaren Tools auszuwählen und zurückzugeben. Beachte diese Richtlinien:

- Gib nur das JSON-Objekt zurück, ohne zusätzlichen Text oder Erklärungen.

- Wenn keine Tools zur Anfrage passen, gib ein leeres Array zurück: 
   {
     "tool_calls": []
   }

- Wenn ein oder mehrere Tools zur Anfrage passen, erstelle eine JSON-Antwort mit einem "tool_calls"-Array, das Objekte mit folgenden Attributen enthält:
   - "name": Der Name des Tools.
   - "parameters": Ein Wörterbuch mit erforderlichen Parametern und den entsprechenden Werten.

Das Format der JSON-Antwort ist strikt:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Code-Ausführung

#### `ENABLE_CODE_EXECUTION`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert oder deaktiviert die Code-Ausführung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_ENGINE`

- Typ: `str`
- Standard: `pyodide`
- Beschreibung: Gibt die Code-Ausführungs-Engine an, die verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_JUPYTER_URL`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die Jupyter-URL an, die für die Code-Ausführung verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_JUPYTER_AUTH`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die Authentifizierungsmethode für Jupyter an, die für die Code-Ausführung verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt das Authentifizierungstoken für Jupyter an, das für die Code-Ausführung verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt das Authentifizierungspasswort für Jupyter an, das für die Code-Ausführung verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- Typ: `str`
- Standard: Leere Zeichenkette ( ), da `None` als Standard eingestellt ist.
- Beschreibung: Gibt das Timeout für die Jupyter-Codeausführung an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Code-Interpretation

#### `ENABLE_CODE_INTERPRETER`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert oder deaktiviert den Code-Interpreter.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_ENGINE`

- Typ: `str`
- Standardwert: `pyodide`
- Beschreibung: Gibt die zu verwendende Code-Interpreter-Engine an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt die zu verwendende Eingabevorlage für den Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_JUPYTER_URL`

- Typ: `str`
- Standardwert: Leerer String ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Gibt die Jupyter-URL für den Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- Typ: `str`
- Standardwert: Leerer String ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Gibt die Jupyter-Authentifizierungsmethode für den Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- Typ: `str`
- Standardwert: Leerer String ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Gibt das Jupyter-Authentifizierungstoken für den Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- Typ: `str`
- Standardwert: Leerer String ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Gibt das Jupyter-Authentifizierungspasswort für den Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- Typ: `str`
- Standardwert: Leerer String ( ), da `None` als Standardwert gesetzt ist.
- Beschreibung: Gibt das Timeout für den Jupyter-Code-Interpreter an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Direkte Verbindungen (OpenAPI/MCPO-Tool-Server)

#### `ENABLE_DIRECT_CONNECTIONS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert direkte Verbindungen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Autovervollständigung

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert die Generierung von Autovervollständigungen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::info

Wenn `ENABLE_AUTOCOMPLETE_GENERATION` aktiviert ist, stellen Sie sicher, dass auch `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` und `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` entsprechend konfiguriert sind.

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- Typ: `int`
- Standardwert: `-1`
- Beschreibung: Legt die maximale Eingabelänge für die Autovervollständigungs-Generierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- Typ: `str`
- Standardwert: Der Wert der Umgebungsvariablen `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### Aufgabe:
Sie sind ein Autovervollständigungs-System. Vervollständigen Sie den Text in `<text>` basierend auf dem **Vervollständigungstyp** in `<type>` und der angegebenen Sprache.

### **Anweisungen**:
1. Analysieren Sie `<text>` auf Kontext und Bedeutung.
2. Verwenden Sie `<type>`, um Ihre Ausgabe zu leiten:
   - **Allgemein**: Bieten Sie eine natürliche, prägnante Fortsetzung.
   - **Suchanfrage**: Vervollständigen Sie wie bei der Erstellung einer realistischen Suchanfrage.
3. Beginnen Sie, als würden Sie direkt `<text>` fortsetzen. Wiederholen, umformulieren oder als Modell antworten Sie **nicht**. Vervollständigen Sie einfach den Text.
4. Stellen Sie sicher, dass die Fortsetzung:
   - Natürlich aus `<text>` hervorgeht.
   - Keine Wiederholungen, Übererklärungen oder irrelevante Ideen enthält.
5. Wenn Sie unsicher sind, geben Sie zurück: `{ "text": "" }`.

### **Ausgaberegeln**:
- Antworten Sie nur im JSON-Format: `{ "text": "<your_completion>" }`.

### **Beispiele**:
#### Beispiel 1:
Eingabe:
<type>Allgemein</type>
<text>Die Sonne ging am Horizont unter und malte den Himmel</text>
Ausgabe:
{ "text": "in lebhaften Orangetönen und Rosatönen." }

#### Beispiel 2:
Eingabe:
<type>Suchanfrage</type>
<text>Top-bewertete Restaurants in</text>
Ausgabe:
{ "text": "New York City für italienische Küche." }

---
### Kontext:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### Ausgabe:
```

- Beschreibung: Legt die Eingabevorlage für die Generierung von Autovervollständigungen fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Bewertungsarena-Modell

#### `ENABLE_EVALUATION_ARENA_MODELS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert Bewertungsarena-Modelle.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_MESSAGE_RATING`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert die Nachrichtenbewertungsfunktion.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_COMMUNITY_SHARING`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Legt fest, ob Benutzern die Schaltfläche zum Teilen mit der Community angezeigt wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Tag-Generierung

#### `ENABLE_TAGS_GENERATION`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert oder deaktiviert die Tag-Generierung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- Typ: `str`
- Standard: Der Wert der Umgebungsvariable `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### Aufgabe:
Generiere 1-3 übergreifende Tags, die die Hauptthemen des Chatverlaufs kategorisieren, sowie 1-3 spezifischere Unterthemen-Tags.

### Richtlinien:
- Beginne mit übergeordneten Domänen (z. B. Wissenschaft, Technologie, Philosophie, Kunst, Politik, Wirtschaft, Gesundheit, Sport, Unterhaltung, Bildung)
- Ziehe relevante Unterfelder/Unterdomänen in Betracht, wenn sie im gesamten Gespräch stark vertreten sind
- Wenn der Inhalt zu kurz ist (weniger als 3 Nachrichten) oder zu divers, verwende nur ["Allgemein"]
- Verwende die Primärsprache des Chats; standardmäßig Englisch bei mehrsprachigem Inhalt
- Priorisiere Genauigkeit vor Spezifität

### Ausgabe:
JSON-Format: { "tags": ["tag1", "tag2", "tag3"] }

### Chatverlauf:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Beschreibung: Legt das Prompt-Template für die Tag-Generierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### API-Schlüssel-Endpunktbeschränkungen

#### `ENABLE_API_KEY`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert die Authentifizierung per API-Schlüssel.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert API-Schlüssel-Endpunktbeschränkungen für zusätzliche Sicherheit und Konfigurierbarkeit.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `API_KEY_ALLOWED_ENDPOINTS`

- Typ: `str`
- Beschreibung: Gibt eine durch Kommas getrennte Liste der erlaubten API-Endpunkte an, wenn API-Schlüssel-Endpunktbeschränkungen aktiviert sind.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::hinweis

Der Wert von `API_KEY_ALLOWED_ENDPOINTS` sollte eine durch Kommas getrennte Liste von Endpunkt-URLs sein, wie `/api/v1/messages, /api/v1/channels`.

:::

#### `JWT_EXPIRES_IN`

- Typ: `int`
- Standard: `-1`
- Beschreibung: Legt die Ablaufzeit des JWT in Sekunden fest. Gültige Zeitangaben: `s`, `m`, `h`, `d`, `w` oder `-1` für kein Ablaufdatum.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Sicherheitsvariablen

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Leitet Benutzerinformationen (Name, ID, E-Mail und Rolle) als X-Header an die OpenAI-API und Ollama-API weiter.
Wenn aktiviert, werden die folgenden Header weitergeleitet:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Umgeht die SSL-Überprüfung für RAG auf Websites.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- Typ: `str`
- Optionen:
  - `lax` - Setzt das `SameSite`-Attribut auf lax, sodass Sitzungs-Cookies mit Anfragen von Drittanbieter-Websites gesendet werden dürfen.
  - `strict` - Setzt das `SameSite`-Attribut auf strict, sodass Sitzungs-Cookies bei Anfragen von Drittanbieter-Websites blockiert werden.
  - `none` - Setzt das `SameSite`-Attribut auf none, sodass Sitzungs-Cookies mit Anfragen von Drittanbieter-Websites gesendet werden dürfen, jedoch nur über HTTPS.
- Standard: `lax`
- Beschreibung: Legt das `SameSite`-Attribut für Sitzungs-Cookies fest.

:::warning

Wenn `ENABLE_OAUTH_SIGNUP` aktiviert ist, kann die Einstellung von `WEBUI_SESSION_COOKIE_SAME_SITE` auf `strict` zu Anmeldefehlern führen. Dies geschieht, weil Open WebUI ein Sitzungs-Cookie verwendet, um den Rückruf des OAuth-Anbieters zu validieren, was dazu beiträgt, CSRF-Angriffe zu verhindern.

Ein `strict` Sitzungs-Cookie wird jedoch nicht mit der Rückrufanforderung gesendet, was zu möglichen Anmeldeproblemen führt. Wenn Sie dieses Problem haben, verwenden Sie stattdessen den Standardwert `lax`.

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Legt das `Secure`-Attribut für Sitzungs-Cookies fest, wenn auf `True` gesetzt.

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- Typ: `str`
- Optionen:
  - `lax` - Setzt das `SameSite`-Attribut auf lax, sodass Authentifizierungs-Cookies mit Anfragen von Drittanbieter-Websites gesendet werden dürfen.
  - `strict` - Setzt das `SameSite`-Attribut auf strict, sodass Authentifizierungs-Cookies bei Anfragen von Drittanbieter-Websites blockiert werden.
  - `none` - Setzt das `SameSite`-Attribut auf none, sodass Authentifizierungs-Cookies mit Anfragen von Drittanbieter-Websites gesendet werden dürfen, jedoch nur über HTTPS.
- Standard: `lax`
- Beschreibung: Legt das `SameSite`-Attribut für Authentifizierungs-Cookies fest.

:::info

Wenn der Wert nicht gesetzt ist, wird `WEBUI_SESSION_COOKIE_SAME_SITE` als Fallback verwendet.

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Setzt das `Secure`-Attribut für Auth-Cookies, wenn es auf `True` gesetzt ist.

:::info

Wenn der Wert nicht festgelegt ist, wird `WEBUI_SESSION_COOKIE_SECURE` als Fallback verwendet.

:::

#### `WEBUI_AUTH`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Diese Einstellung aktiviert oder deaktiviert die Authentifizierung.

:::danger

Wenn auf `False` gesetzt, wird die Authentifizierung für Ihre Open WebUI-Instanz deaktiviert. Es ist jedoch
wichtig zu beachten, dass das Deaktivieren der Authentifizierung nur für Neuinstallationen ohne
bestehende Benutzer möglich ist. Wenn bereits Benutzer registriert sind, kann die Authentifizierung
nicht direkt deaktiviert werden. Stellen Sie sicher, dass keine Benutzer in der Datenbank vorhanden sind, wenn Sie `WEBUI_AUTH` deaktivieren möchten.

:::

#### `WEBUI_SECRET_KEY`

- Typ: `str`
- Standard: `t0p-s3cr3t`
- Docker-Standard: Zufällig generiert beim ersten Start
- Beschreibung: Überschreibt die zufällig generierte Zeichenfolge, die für JSON Web Token verwendet wird.

:::info

Beim Einsatz von Open-WebUI in einem Mehrknotencluster mit einem Load Balancer muss sichergestellt werden, dass der Wert von WEBUI_SECRET_KEY bei allen Instanzen gleich ist, damit Benutzer weiterhin arbeiten können, wenn ein Knoten wiederverwendet wird oder ihre Sitzung auf einen anderen Knoten übertragen wird. Andernfalls müssen sie sich jedes Mal erneut anmelden, wenn sich der zugrunde liegende Knoten ändert.

:::

#### `OFFLINE_MODE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert oder deaktiviert den Offlinemodus.

#### `RESET_CONFIG_ON_START`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Setzt die Datei `config.json` beim Start zurück.

#### `SAFE_MODE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert den sicheren Modus, der potenziell unsichere Funktionen deaktiviert und alle Funktionen deaktiviert.

#### `CORS_ALLOW_ORIGIN`

- Typ: `str`
- Standard: `*`
- Beschreibung: Legt die erlaubten Ursprünge für Cross-Origin Resource Sharing (CORS) fest.

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Bestimmt, ob benutzerdefinierte Modelle zugelassen werden, die auf dem Hub in ihren eigenen Modellierungsdateien definiert sind.

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Bestimmt, ob benutzerdefinierte Modelle zugelassen werden, die auf dem Hub in ihren eigenen
Modellierungsdateien für das Reranking definiert sind.

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Schaltet die automatische Aktualisierung des Sentence-Transformer-Modells ein oder aus.

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Schaltet die automatische Aktualisierung des Reranking-Modells ein oder aus.

## Vektordatenbank

#### `VECTOR_DB`

- Typ: `str`
- Optionen:
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- Standard: `chroma`
- Beschreibung: Gibt an, welches System für die Vektordatenbank verwendet werden soll. Diese Einstellung bestimmt, welches Vektorspeichersystem für die Verwaltung von Einbettungen verwendet wird.

### ChromaDB

#### `CHROMA_TENANT`

- Typ: `str`
- Standard: Der Wert von `chromadb.DEFAULT_TENANT` (eine Konstante im Modul `chromadb`)
- Beschreibung: Legt den Mandanten für ChromaDB fest, der für RAG-Einbettungen verwendet wird.

#### `CHROMA_DATABASE`

- Typ: `str`
- Standard: Der Wert von `chromadb.DEFAULT_DATABASE` (eine Konstante im Modul `chromadb`)
- Beschreibung: Legt die Datenbank im ChromaDB-Mandanten fest, die für RAG-Einbettungen verwendet wird.

#### `CHROMA_HTTP_HOST`

- Typ: `str`
- Beschreibung: Gibt den Hostnamen eines Remote-ChromaDB-Servers an. Verwendet eine lokale ChromaDB-Instanz, wenn nicht gesetzt.

#### `CHROMA_HTTP_PORT`

- Typ: `int`
- Standard: `8000`
- Beschreibung: Gibt den Port eines Remote-ChromaDB-Servers an.

#### `CHROMA_HTTP_HEADERS`

- Typ: `str`
- Beschreibung: Eine durch Kommas getrennte Liste von HTTP-Headern, die in jede ChromaDB-Anfrage aufgenommen werden soll.
- Beispiel: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`.

#### `CHROMA_HTTP_SSL`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Bestimmt, ob SSL für Verbindungen zum ChromaDB-Server verwendet werden soll.

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- Typ: `str`
- Beschreibung: Gibt einen Authentifizierungsanbieter für den Remote-ChromaDB-Server an.
- Beispiel: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- Typ: `str`
- Beschreibung: Gibt Authentifizierungsdaten für den Remote-ChromaDB-Server an.
- Beispiel: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- Typ: `str`
- Standard: Leerer String (`' '`), da `None` als Standard festgelegt ist.
- Beschreibung: Gibt den Elasticsearch-API-Schlüssel an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_CA_CERTS`

- Typ: `str`
- Standard: Leerer String (`' '`), da `None` als Standard festgelegt ist.
- Beschreibung: Gibt den Pfad zu den CA-Zertifikaten für Elasticsearch an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_CLOUD_ID`

- Typ: `str`
- Standard: Leerer String (`' '`), da `None` als Standard festgelegt ist.
- Beschreibung: Gibt die Elasticsearch-Cloud-ID an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_INDEX_PREFIX`

- Typ: `str`
- Standard: `open_webui_collections`
- Beschreibung: Gibt das Präfix für den Elasticsearch-Index an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_PASSWORD`

- Typ: `str`
- Standard: Leerer String ( ), da `None` als Standard festgelegt ist.
- Beschreibung: Gibt das Passwort für Elasticsearch an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_URL`

- Typ: `str`
- Standard: `https://localhost:9200`
- Beschreibung: Gibt die URL der Elasticsearch-Instanz an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ELASTICSEARCH_USERNAME`

- Typ: `str`
- Standard: Leerer String ( ), da `None` als Standard festgelegt ist.
- Beschreibung: Gibt den Benutzernamen für Elasticsearch an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Milvus

#### `MILVUS_URI`

- Typ: `str`
- Standard: `${DATA_DIR}/vector_db/milvus.db`
- Beschreibung: Gibt die URI für die Verbindung zur Milvus-Vektordatenbank an. Diese kann abhängig von der Bereitstellungskonfiguration auf einen lokalen oder einen entfernten Milvus-Server verweisen.

#### `MILVUS_DB`

- Typ: `str`
- Standard: `default`
- Beschreibung: Gibt die Datenbank an, zu der in einer Milvus-Instanz eine Verbindung hergestellt werden soll.

#### `MILVUS_TOKEN`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt ein optionales Verbindungstoken für Milvus an.

#### `MILVUS_INDEX_TYPE`

- Typ: `str`
- Standard: `HNSW`
- Optionen: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- Beschreibung: Gibt den Indextyp an, der beim Erstellen einer neuen Sammlung in Milvus verwendet werden soll. `AUTOINDEX` wird allgemein für eigenständige Milvus-Installationen empfohlen. `HNSW` kann bessere Leistung bieten, erfordert jedoch in der Regel ein Milvus-Cluster.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MILVUS_METRIC_TYPE`

- Typ: `str`
- Standard: `COSINE`
- Optionen: `COSINE`, `IP`, `L2`
- Beschreibung: Gibt den Metriktyp für die Vektorähnlichkeitssuche in Milvus an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MILVUS_HNSW_M`

- Typ: `int`
- Standard: `16`
- Beschreibung: Gibt den `M`-Parameter für den HNSW-Indextyp in Milvus an. Dieser beeinflusst die Anzahl der bidirektionalen Verknüpfungen, die für jedes neue Element während der Konstruktion erstellt werden. Nur anwendbar, wenn `MILVUS_INDEX_TYPE` `HNSW` ist.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MILVUS_HNSW_EFCONSTRUCTION`

- Typ: `int`
- Standard: `100`
- Beschreibung: Gibt den `efConstruction`-Parameter für den HNSW-Indextyp in Milvus an. Dieser beeinflusst die Größe der dynamischen Liste für die nächstgelegenen Nachbarn während der Indexkonstruktion. Nur anwendbar, wenn `MILVUS_INDEX_TYPE` `HNSW` ist.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MILVUS_IVF_FLAT_NLIST`

- Typ: `int`
- Standard: `128`
- Beschreibung: Gibt den `nlist`-Parameter für den IVF_FLAT-Indextyp in Milvus an. Dies ist die Anzahl der Clustereinheiten. Nur anwendbar, wenn `MILVUS_INDEX_TYPE` `IVF_FLAT` ist.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert oder deaktiviert die Zertifikatsüberprüfung für OpenSearch.

#### `OPENSEARCH_PASSWORD`

- Typ: `str`
- Standard: `None`
- Beschreibung: Setzt das Passwort für OpenSearch.

#### `OPENSEARCH_SSL`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert oder deaktiviert SSL für OpenSearch.

#### `OPENSEARCH_URI`

- Typ: `str`
- Standard: `https://localhost:9200`
- Beschreibung: Setzt die URI für OpenSearch.

#### `OPENSEARCH_USERNAME`

- Typ: `str`
- Standard: `None`
- Beschreibung: Setzt den Benutzernamen für OpenSearch.

### PGVector

#### `PGVECTOR_DB_URL`

- Typ: `str`
- Standard: Der Wert der Umgebungsvariablen `DATABASE_URL`
- Beschreibung: Setzt die Datenbank-URL für die Modellablage.

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- Typ: `str`
- Standard: `1536`
- Beschreibung: Legt die maximale Vektorlänge für die Initialisierung von PGVector fest.

### Qdrant

#### `QDRANT_API_KEY`

- Typ: `str`
- Beschreibung: Setzt den API-Schlüssel für Qdrant.

#### `QDRANT_URI`

- Typ: `str`
- Beschreibung: Setzt die URI für Qdrant.

#### `QDRANT_ON_DISK`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert die Verwendung von Memmap (auch bekannt als On-Disk-Speicherung).

#### `QDRANT_PREFER_GRPC`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Verwenden Sie die gRPC-Schnittstelle, wann immer möglich.

#### `QDRANT_GRPC_PORT`

- Typ: `int`
- Standard: `6334`
- Beschreibung: Legt die gRPC-Portnummer für Qdrant fest.

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert das Multitenancy-Muster für die Verwaltung von Qdrant-Sammlungen, wodurch der RAM-Verbrauch und der Rechenaufwand erheblich reduziert werden, indem ähnliche Vektordatenstrukturen konsolidiert werden. Diese Option wird empfohlen.

:::info

Dies trennt alle Qdrant-Sammlungen, die im vorherigen Muster erstellt wurden (nicht Multitenancy). Gehen Sie zu `Admin Settings` > `Documents` > `Reindex Knowledge Base`, um bestehende Wissensdaten zu migrieren.

Die in der vorherigen Konfiguration erstellten Qdrant-Sammlungen werden weiterhin Ressourcen verbrauchen.

Derzeit gibt es keinen Button in der Benutzeroberfläche, um nur die Vektor-Datenbank zurückzusetzen. Wenn Sie Wissen in eine Multi-Tenancy migrieren möchten:
- Entfernen Sie alle Sammlungen mit dem Präfix `open_webui-knowledge` (oder dem Präfix `open_webui`, um alle mit Open WebUI verbundenen Sammlungen zu entfernen) mithilfe des nativen Qdrant-Clients
- Gehen Sie zu `Admin-Einstellungen` > `Dokumente` > `Wissensbasis neu indexieren`, um die vorhandene Wissensbasis zu migrieren

`Wissensbasis neu indexieren` wird NUR die Wissensbasis migrieren

:::

:::Gefahr

Wenn Sie sich dafür entscheiden, das Multi-Tenancy-Muster als Standard zu verwenden und altes Wissen nicht migrieren müssen, gehen Sie zu `Admin-Einstellungen` > `Dokumente`, um Vektoren und Wissen zurückzusetzen, wodurch alle Sammlungen mit dem Präfix `open_webui` und alle gespeicherten Wissensdaten gelöscht werden.

:::

### Pinecone

Beim Einsatz von Pinecone als Vektorspeicher werden die folgenden Umgebungsvariablen verwendet, um das Verhalten zu steuern. Stellen Sie sicher, dass diese Variablen in Ihrer `.env`-Datei oder Ihrer Bereitstellungsumgebung gesetzt sind.

#### `PINECONE_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel fest, der zur Authentifizierung mit dem Pinecone-Dienst verwendet wird.

#### `PINECONE_ENVIRONMENT`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die Pinecone-Umgebung an, zu der eine Verbindung hergestellt wird (z.B. `us-west1-gcp`, `gcp-starter` usw.).

#### `PINECONE_INDEX_NAME`

- Typ: `str`
- Standard: `open-webui-index`
- Beschreibung: Definiert den Namen des Pinecone-Indexes, der zum Speichern und Abfragen von Vektoreinbettungen verwendet wird.

#### `PINECONE_DIMENSION`

- Typ: `int`
- Standard: `1536`
- Beschreibung: Die Dimension der Vektoreinbettungen. Muss mit der von dem Index erwarteten Dimension übereinstimmen (häufig 768, 1024, 1536 oder 3072, abhängig vom verwendeten Modell).

#### `PINECONE_METRIC`

- Typ: `str`
- Standard: `cosine`
- Optionen: `cosine`, `dotproduct`, `euclidean`
- Beschreibung: Gibt die Ähnlichkeitsmetrik an, die für Vektorvergleiche innerhalb des Pinecone-Indexes verwendet wird.

#### `PINECONE_CLOUD`

- Typ: `str`
- Standard: `aws`
- Optionen: `aws`, `gcp`, `azure`
- Beschreibung: Gibt den Cloud-Anbieter an, bei dem der Pinecone-Index gehostet wird.

## RAG Inhalts-Eextraktions-Engine

#### `CONTENT_EXTRACTION_ENGINE`

- Typ: `str`
- Optionen:
  - Leer lassen, um den Standard zu verwenden
  - `external` - Verwenden eines externen Laders
  - `tika` - Verwendung eines lokalen Apache Tika-Servers
  - `docling` - Verwendung der Docling-Engine
  - `document_intelligence` - Verwendung der Document Intelligence-Engine
  - `mistral_ocr` - Verwendung der Mistral OCR-Engine
- Beschreibung: Legt die Inhalts-Extraktions-Engine fest, die für die Dokumenteneinholung verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MISTRAL_OCR_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt den zu verwendenden Mistral OCR API-Schlüssel an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt die URL für den externen Dokumentenladeservice fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die Authentifizierung mit dem externen Dokumentenladeservice fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TIKA_SERVER_URL`

- Typ: `str`
- Standard: `http://localhost:9998`
- Beschreibung: Legt die URL für den Apache Tika-Server fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DOCLING_SERVER_URL`

- Typ: `str`
- Standard: `http://docling:5001`
- Beschreibung: Gibt die URL für den Docling-Server an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DOCLING_OCR_ENGINE`

- Typ: `str`
- Standard: `tesseract`
- Beschreibung: Gibt die von Docling verwendete OCR-Engine an.
  Unterstützte Werte umfassen: `tesseract` (Standard), `easyocr`, `ocrmac`, `rapidocr` und `tesserocr`.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DOCLING_OCR_LANG`

- Typ: `str`
- Standard: `eng,fra,deu,spa` (bei Verwendung der Standard-Engine `tesseract`)
- Beschreibung: Gibt die OCR-Sprache(n) an, die mit der konfigurierten `DOCLING_OCR_ENGINE` verwendet werden sollen.
  Das Format und die verfügbaren Sprachcodes hängen von der ausgewählten OCR-Engine ab.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Retrieval Augmented Generation (RAG)

#### `RAG_EMBEDDING_ENGINE`

- Typ: `str`
- Optionen:
  - Leer lassen für `Standard (SentenceTransformers)` - Verwendet SentenceTransformers für Einbettungen.
  - `ollama` - Verwendet die Ollama-API für Einbettungen.
  - `openai` - Verwendet die OpenAI-API für Einbettungen.
- Beschreibung: Wählt eine Einbettungs-Engine für RAG aus.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_EMBEDDING_MODEL`

- Typ: `str`
- Standard: `sentence-transformers/all-MiniLM-L6-v2`
- Beschreibung: Legt ein Modell für Einbettungen fest. Lokal wird ein Sentence-Transformer-Modell verwendet.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_RAG_HYBRID_SEARCH`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert die Nutzung von Ensemblesuche mit `BM25` + `ChromaDB`, mit Nachrangordnung unter Verwendung von
`sentence_transformers`-Modellen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_TOP_K`

- Typ: `int`
- Standardwert: `3`
- Beschreibung: Legt die Standardanzahl von Ergebnissen fest, die bei der Verwendung von RAG für das Embedding berücksichtigt werden sollen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_TOP_K_RERANKER`

- Typ: `int`
- Standardwert: `3`
- Beschreibung: Legt die Standardanzahl von Ergebnissen fest, die bei der Nutzung von RAG für die Nachrangordnung berücksichtigt werden sollen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_RELEVANCE_THRESHOLD`

- Typ: `float`
- Standardwert: `0.0`
- Beschreibung: Legt den Relevanzschwellenwert für Dokumente fest, die bei der Nachrangordnung berücksichtigt werden.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_HYBRID_BM25_WEIGHT`

- Typ: `float`
- Standardwert: `0.5`
- Beschreibung: Legt das Gewicht für die Schlagwortsuche (BM25) bei der hybriden Suche fest. 1 bedeutet nur Schlagwortsuche, 0 bedeutet nur Vektorsuche.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_TEMPLATE`

- Typ: `str`
- Standardwert: Der Wert der Umgebungsvariable `DEFAULT_RAG_TEMPLATE`.

`DEFAULT_RAG_TEMPLATE`:

```
### Aufgabe:
Antworten Sie auf die Benutzeranfrage unter Verwendung des bereitgestellten Kontext, mit Inline-Zitaten im Format [id] **nur wenn das <source>-Tag eine explizite id-Attribut enthält** (z.B., <source id="1">).

### Richtlinien:
- Wenn Sie die Antwort nicht wissen, geben Sie dies klar an.
- Bei Unsicherheit bitten Sie den Benutzer um Klarstellung.
- Antworten Sie in der gleichen Sprache wie die Benutzeranfrage.
- Wenn der Kontext unleserlich oder von schlechter Qualität ist, informieren Sie den Benutzer und geben Sie die bestmögliche Antwort.
- Wenn die Antwort nicht im Kontext vorhanden ist, Sie aber das Wissen besitzen, erklären Sie dies dem Benutzer und geben Sie die Antwort basierend auf Ihrem Verständnis.
- **Fügen Sie Inline-Zitate nur mit [id] (z.B., [1], [2]) ein, wenn das <source>-Tag ein id-Attribut enthält.**
- Zitieren Sie nicht, wenn das <source>-Tag kein id-Attribut enthält.
- Verwenden Sie keine XML-Tags in Ihrer Antwort.
- Stellen Sie sicher, dass Zitate präzise und direkt mit den bereitgestellten Informationen verknüpft sind.

### Beispiel für Zitate:
Wenn der Benutzer nach einem bestimmten Thema fragt und die Information in einer Quelle mit einer bereitgestellten id-Attribut gefunden wird, sollte die Antwort wie folgt zitiert werden:
* "Basierend auf der Studie erhöht die vorgeschlagene Methode die Effizienz um 20% [1]."

### Ausgabe:
Geben Sie eine klare und direkte Antwort auf die Benutzeranfrage, einschließlich Inline-Zitaten im Format [id] nur, wenn das <source>-Tag mit id-Attribut im Kontext vorhanden ist.

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- Beschreibung: Vorlage zur Nutzung bei der Integration von RAG-Dokumenten in Chat-Abschlüsse.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_TEXT_SPLITTER`

- Typ: `str`
- Optionen:
  - `character`
  - `token`
- Standardwert: `character`
- Beschreibung: Legt den Text-Splitter für RAG-Modelle fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `TIKTOKEN_CACHE_DIR`

- Typ: `str`
- Standardwert: `{CACHE_DIR}/tiktoken`
- Beschreibung: Legt das Verzeichnis für den TikToken-Cache fest.

#### `TIKTOKEN_ENCODING_NAME`

- Typ: `str`
- Standardwert: `cl100k_base`
- Beschreibung: Legt den Kodierungsnamen für TikToken fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CHUNK_SIZE`

- Typ: `int`
- Standardwert: `1000`
- Beschreibung: Legt die Dokumentenchunkgröße für Embeddings fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `CHUNK_OVERLAP`

- Typ: `int`
- Standardwert: `100`
- Beschreibung: Gibt an, wie viel Überlappung zwischen Chunks vorhanden sein soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `PDF_EXTRACT_IMAGES`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Extrahiert Bilder aus PDFs mithilfe von OCR beim Laden von Dokumenten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_FILE_MAX_SIZE`

- Typ: `int`
- Beschreibung: Legt die maximale Größe einer Datei in Megabyte fest, die für die Dokumentenaufnahme hochgeladen werden kann.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_FILE_MAX_COUNT`

- Typ: `int`
- Beschreibung: Legt die maximale Anzahl von Dateien fest, die gleichzeitig für die Dokumentenaufnahme hochgeladen werden können.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::info

Bei der Konfiguration von `RAG_FILE_MAX_SIZE` und `RAG_FILE_MAX_COUNT` sorgen Sie dafür, dass die Werte angemessen sind, um übermäßige Datei-Uploads und potenzielle Leistungsprobleme zu vermeiden.

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- Typ: `list` aus `str`
- Standardwert: `[]` (was bedeutet, dass alle unterstützten Dateitypen erlaubt sind)
- Beschreibung: Gibt an, welche Dateierweiterungen für den Upload zulässig sind.

```json
["pdf,docx,txt"]
```

- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_RERANKING_MODEL`

- Typ: `str`
- Beschreibung: Legt ein Modell für die erneute Bewertung der Ergebnisse fest. Lokal wird ein Sentence-Transformer-Modell verwendet.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_OPENAI_API_BASE_URL`

- Typ: `str`
- Standardwert: `${OPENAI_API_BASE_URL}`
- Beschreibung: Legt die Basis-API-URL für OpenAI fest, die für RAG-Einbettungen verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_OPENAI_API_KEY`

- Typ: `str`
- Standardwert: `${OPENAI_API_KEY}`
- Beschreibung: Legt den OpenAI-API-Schlüssel fest, der für RAG-Einbettungen verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- Typ: `int`
- Standardwert: `1`
- Beschreibung: Legt die Batch-Größe für OpenAI-Einbettungen fest.

#### `RAG_EMBEDDING_BATCH_SIZE`

- Typ: `int`
- Standardwert: `1`
- Beschreibung: Legt die Batch-Größe für die Einbettung in RAG-Modellen (Retrieval-Augmented Generator) fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_OLLAMA_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Ollama-API fest, die in RAG-Modellen verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_OLLAMA_BASE_URL`

- Typ: `str`
- Beschreibung: Legt die Basis-URL für die Ollama-API fest, die in RAG-Modellen verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert die Generierung von Suchanfragen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- Typ: `str`
- Standardwert: Der Wert der Umgebungsvariablen `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### Aufgabe:
Analysieren Sie den Chat-Verlauf, um festzustellen, ob Suchanfragen in der angegebenen Sprache generiert werden müssen. Standardmäßig **priorisieren Sie die Generierung von 1-3 breiten und relevanten Suchanfragen**, es sei denn, es ist absolut sicher, dass keine zusätzlichen Informationen erforderlich sind. Ziel ist es, umfassende, aktuelle und wertvolle Informationen selbst bei minimaler Unsicherheit abzurufen. Wenn keine Suche eindeutig erforderlich ist, geben Sie eine leere Liste zurück.

### Richtlinien:
- Antworten Sie **AUSSCHLIESSLICH** mit einem JSON-Objekt. Jegliche Form von zusätzlichem Kommentar, Erklärung oder weiterem Text ist streng verboten.
- Wenn Suchanfragen generiert werden, antworten Sie im Format: { "queries": ["query1", "query2"] }, und stellen Sie sicher, dass jede Anfrage eindeutig, prägnant und relevant zum Thema ist.
- Nur wenn absolut sicher ist, dass keine nützlichen Ergebnisse durch eine Suche erzielt werden können, geben Sie zurück: { "queries": [] }.
- Bei der geringsten Chance, dass Suchanfragen nützliche oder aktuelle Informationen liefern könnten, tendieren Sie zur Generierung von Suchanfragen.
- Seien Sie präzise und konzentrieren Sie sich auf die Erstellung hochwertiger Suchanfragen, vermeiden Sie unnötige Ausarbeitungen, Kommentare oder Annahmen.
- Das heutige Datum ist: {{CURRENT_DATE}}.
- Priorisieren Sie stets umsetzbare und breite Anfragen, die ein Maximum an Informationsabdeckung bieten.

### Ausgabe:
Geben Sie strikt im JSON-Format zurück: 
{
  "queries": ["query1", "query2"]
}

### Chat-Verlauf:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Beschreibung: Legt die Vorlage für die Generierung von Anfragen fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Umgeht den Einbettungs- und Abrufprozess.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt den Endpunkt für Dokumentenintelligenz an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `DOCUMENT_INTELLIGENCE_KEY`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt den Schlüssel für Dokumentenintelligenz an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert das lokale Web-Abrufen für RAG.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt das Präfix für den Inhalt von RAG-Einbettungen an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt den Feldnamen für das Präfix von RAG-Einbettungen an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_EMBEDDING_QUERY_PREFIX`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt das Präfix für die Abfrage von RAG-Einbettungen an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `RAG_FULL_CONTEXT`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Gibt an, ob der vollständige Kontext für RAG verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert die Google Drive-Integration. Wenn auf „True“ gesetzt und `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` beide konfiguriert sind, erscheint Google Drive als Upload-Option in der Chat-Oberfläche.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::info

Wenn Sie `GOOGLE_DRIVE_INTEGRATION` aktivieren, stellen Sie sicher, dass Sie `GOOGLE_DRIVE_CLIENT_ID` und `GOOGLE_DRIVE_API_KEY` korrekt konfiguriert haben und die Nutzungsbedingungen und Richtlinien von Google überprüft haben.

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- Typ: `str`
- Beschreibung: Legt die Client-ID für Google Drive fest (Client muss mit aktiviertem Drive API und Picker API konfiguriert sein).
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_DRIVE_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Google Drive-Integration fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert die OneDrive-Integration.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ONEDRIVE_CLIENT_ID`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt die Client-ID für die OneDrive-Integration an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Websuche

#### `ENABLE_WEB_SEARCH`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert die Websuche.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_SEARCH_QUERY_GENERATION`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert die Generierung von Suchanfragen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEB_SEARCH_TRUST_ENV`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert den durch `http_proxy` und `https_proxy` festgelegten Proxy während des Abrufs von Websuchinhalten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEB_SEARCH_RESULT_COUNT`

- Typ: `int`
- Standardwert: `3`
- Beschreibung: Maximale Anzahl der Suchergebnisse, die durchsucht werden sollen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- Typ: `int`
- Standardwert: `10`
- Beschreibung: Anzahl der gleichzeitigen Anfragen zum Durchsuchen der von Suchergebnissen zurückgegebenen Webseiten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEB_SEARCH_ENGINE`

- Typ: `str`
- Optionen:
  - `searxng` - Verwendet die [SearXNG](https://github.com/searxng/searxng) Suchmaschine.
  - `google_pse` - Verwendet die [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/).
  - `brave` - Verwendet die [Brave Suchmaschine](https://brave.com/search/api/).
  - `kagi` - Verwendet die [Kagi](https://www.kagi.com/) Suchmaschine.
  - `mojeek` - Verwendet die [Mojeek](https://www.mojeek.com/) Suchmaschine.
  - `bocha` - Verwendet die Bocha Suchmaschine.
  - `serpstack` - Verwendet die [Serpstack](https://serpstack.com/) Suchmaschine.
  - `serper` - Verwendet die [Serper](https://serper.dev/) Suchmaschine.
  - `serply` - Verwendet die [Serply](https://serply.io/) Suchmaschine.
  - `searchapi` - Verwendet die [SearchAPI](https://www.searchapi.io/) Suchmaschine.
  - `serpapi` - Verwendet die [SerpApi](https://serpapi.com/) Suchmaschine.
  - `duckduckgo` - Verwendet die [DuckDuckGo](https://duckduckgo.com/) Suchmaschine.
  - `tavily` - Verwendet die [Tavily](https://tavily.com/) Suchmaschine.
  - `jina` - Verwendet die [Jina](https://jina.ai/) Suchmaschine.
  - `bing` - Verwendet die [Bing](https://www.bing.com/) Suchmaschine.
  - `exa` - Verwendet die [Exa](https://exa.ai/) Suchmaschine.
  - `perplexity` - Verwendet die [Perplexity AI](https://www.perplexity.ai/) Suchmaschine.
  - `sougou` - Verwendet die [Sougou](https://www.sogou.com/) Suchmaschine.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Umgeht den Prozess der Websuche-Einbettung und Abruf.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `SEARXNG_QUERY_URL`

- Typ: `str`
- Beschreibung: Die [SearXNG-Suche-API](https://docs.searxng.org/dev/search_api.html)-URL unterstützt JSON-Ausgabe. `<query>` wird durch die Suchanfrage ersetzt. Beispiel: `http://searxng.local/search?q=<query>`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_PSE_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für den Google Programmable Search Engine (PSE)-Dienst fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_PSE_ENGINE_ID`

- Typ: `str`
- Beschreibung: Die Engine-ID für den Google Programmable Search Engine (PSE) Service.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `BRAVE_SEARCH_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Brave Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `KAGI_SEARCH_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Kagi Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `MOJEEK_SEARCH_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Mojeek Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPSTACK_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Serpstack Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPSTACK_HTTPS`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Konfiguriert die Nutzung von HTTPS für Serpstack-Anfragen. Anfragen im kostenlosen Tarif sind nur auf HTTP limitiert.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPER_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Serper Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPLY_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Serply Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SEARCHAPI_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die SearchAPI fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SEARCHAPI_ENGINE`

- Typ: `str`
- Beschreibung: Legt die SearchAPI Engine fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `TAVILY_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für die Tavily Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `JINA_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für Jina fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `BING_SEARCH_V7_ENDPOINT`

- Typ: `str`
- Beschreibung: Legt den Endpunkt für die Bing Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- Typ: `str`
- Standard: `https://api.bing.microsoft.com/v7.0/search`
- Beschreibung: Legt den Abonnement-Schlüssel für die Bing Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `BOCHA_SEARCH_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die Bocha Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `EXA_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die Exa Search API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPAPI_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die SerpAPI fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SERPAPI_ENGINE`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die Suchmaschine an, die für SerpAPI verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SOUGOU_API_SID`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt die SID der Sogou API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `SOUGOU_API_SK`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den SK der Sogou API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `TAVILY_EXTRACT_DEPTH`

- Typ: `str`
- Standard: `basic`
- Beschreibung: Gibt die Extraktionstiefe für die Suchergebnisse von Tavily an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

### Web-Loader-Konfiguration

#### `WEB_LOADER_ENGINE`

- Typ: `str`
- Standard: `safe_web`
- Beschreibung: Gibt den Loader an, der zum Abrufen und Verarbeiten von Webinhalten verwendet werden soll.
- Optionen:
  - `requests` - Verwendet das Requests-Modul mit erweiterten Fehlerbehandlungsfunktionen.
  - `playwright` - Verwendet Playwright für fortgeschrittenes Rendering und Interaktion mit Webseiten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

:::info

Bei der Verwendung von `playwright` stehen Ihnen zwei Optionen zur Verfügung:

1. Wenn `PLAYWRIGHT_WS_URI` nicht gesetzt ist, werden Abhängigkeiten von Playwright mit Chromium automatisch im Open-WebUI-Container beim Start installiert.
2. Wenn `PLAYWRIGHT_WS_URI` gesetzt ist, wird Open WebUI eine Verbindung zu einer Remote-Browserinstanz herstellen, anstatt die Abhängigkeiten lokal zu installieren.

:::

#### `PLAYWRIGHT_WS_URL`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die WebSocket-URI einer Remote-Playwright-Browserinstanz an. Wenn festgelegt, wird Open WebUI diesen Remote-Browser verwenden, anstatt Browser-Abhängigkeiten lokal zu installieren. Dies ist insbesondere in containerisierten Umgebungen nützlich, in denen Sie den Open-WebUI-Container leichtgewichtig halten und Browser-Bedenken trennen möchten. Beispiel: `ws://playwright:3000`
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::Tipp

Die Verwendung eines Remote-Playwright-Browsers über `PLAYWRIGHT_WS_URL` kann von Vorteil sein für:

- Reduzierung der Größe des Open-WebUI-Containers
- Nutzung eines anderen Browsers als des Standard-Chromium
- Verbindung mit einem nicht headlosen (GUI-) Browser

:::

#### `FIRECRAWL_API_BASE_URL`

- Typ: `str`
- Standard: `https://api.firecrawl.dev`
- Beschreibung: Legt die Basis-URL für die Firecrawl-API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `FIRECRAWL_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die Firecrawl-API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `PERPLEXITY_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt den API-Schlüssel für die Perplexity-API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `PLAYWRIGHT_TIMEOUT`

- Typ: `int`
- Standard: Leere Zeichenfolge ( ), da `None` standardmäßig eingestellt ist.
- Beschreibung: Gibt das Timeout für Playwright-Anfragen an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### YouTube-Loader

#### `YOUTUBE_LOADER_PROXY_URL`

- Typ: `str`
- Beschreibung: Legt die Proxy-URL für den YouTube-Loader fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `YOUTUBE_LOADER_LANGUAGE`

- Typ: `str`
- Standard: `en`
- Beschreibung: Kommagetrennte Liste von Sprachcodes, die bei der Abfrage von YouTube-Videoabschriften in Prioritätsreihenfolge berücksichtigt werden sollen.
- Beispiel: Wenn auf `es,de` gesetzt, wird zuerst Spanisch versucht, dann Deutsch, falls Spanisch nicht verfügbar ist, und schließlich Englisch. Hinweis: Wenn keine der angegebenen Sprachen verfügbar ist und `en` nicht in Ihrer Liste war, versucht das System automatisch Englisch als letzten Ausweg.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Audio

### Whisper Speech-to-Text (Lokal)

#### `WHISPER_MODEL`

- Typ: `str`
- Standard: `base`
- Beschreibung: Legt das Whisper-Modell fest, das für Speech-to-Text verwendet werden soll. Das Backend verwendet faster_whisper mit Quantisierung auf `int8`.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WHISPER_MODEL_DIR`

- Typ: `str`
- Standard: `${DATA_DIR}/cache/whisper/models`
- Beschreibung: Gibt das Verzeichnis an, in dem Whisper-Modell-Dateien gespeichert werden.

#### `WHISPER_VAD_FILTER`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Gibt an, ob ein Sprachaktivitätserkennung-(VAD-)Filter für Whisper Speech-to-Text angewendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WHISPER_MODEL_AUTO_UPDATE`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Schaltet die automatische Aktualisierung des Whisper-Modells ein oder aus.

#### `WHISPER_LANGUAGE`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die ISO 639-1-Sprache an, die Whisper für Speech-to-Text verwendet (ISO 639-2 für Hawaiianisch und Kantonesisch). Standardmäßig sagt Whisper die Sprache voraus.

### Speech-to-Text (OpenAI)

#### `AUDIO_STT_ENGINE`

- Typ: `str`
- Optionen:
  - Leer lassen, um die integrierte lokale Whisper-Engine für Speech-to-Text zu verwenden.
  - `openai` - Verwendet die OpenAI-Engine für Speech-to-Text.
  - `deepgram`- Verwendet die Deepgram-Engine für Speech-to-Text.
  - `azure` Verwendet die Azure-Engine für Speech-to-Text.
- Beschreibung: Gibt die Speech-to-Text-Engine an, die verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUDIO_STT_MODEL`

- Typ: `str`
- Standard: `whisper-1`
- Beschreibung: Gibt das Speech-to-Text-Modell an, das für mit OpenAI kompatible Endpunkte verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- Typ: `str`
- Standard: `${OPENAI_API_BASE_URL}`
- Beschreibung: Legt die OpenAI-kompatible Basis-URL fest, die für Speech-to-Text verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUDIO_STT_OPENAI_API_KEY`

- Typ: `str`
- Standard: `${OPENAI_API_KEY}`
- Beschreibung: Legt den OpenAI-API-Schlüssel fest, der für Speech-to-Text verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Speech-to-Text (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt den Azure API-Schlüssel an, der für Speech-to-Text verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUDIO_STT_AZURE_REGION`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die Azure-Region an, die für Speech-to-Text verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUDIO_STT_AZURE_LOCALES`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt die zu verwendenden Sprachen für Azure Speech-to-Text an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Speech-to-Text (Deepgram)

#### `DEEPGRAM_API_KEY`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt den Deepgram API-Schlüssel an, der für Speech-to-Text verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

### Text-to-Speech

#### `AUDIO_TTS_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für Text-to-Speech fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_ENGINE`

- Typ: `str`
- Optionen:
  - Leer lassen, um die integrierte WebAPI-Engine für Text-to-Speech zu verwenden.
  - `azure` - Verwendet die Azure-Engine für Text-to-Speech.
  - `elevenlabs` - Verwendet die ElevenLabs-Engine für Text-to-Speech.
  - `openai` - Verwendet die OpenAI-Engine für Text-to-Speech.
  - `transformers` - Verwendet SentenceTransformers für Text-to-Speech.
- Beschreibung: Gibt die zu verwendende Text-to-Speech-Engine an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_MODEL`

- Typ: `str`
- Standard: `tts-1`
- Beschreibung: Gibt das OpenAI-Text-to-Speech-Modell an, das verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_VOICE`

- Typ: `str`
- Standard: `alloy`
- Beschreibung: Legt die OpenAI-Text-to-Speech-Stimme fest, die verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_SPLIT_ON`

- Typ: `str`
- Standard: `punctuation`
- Beschreibung: Legt fest, auf welchen Punkt das OpenAI-Text-to-Speech aufgeteilt wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

### Azure Text-to-Speech

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- Typ: `str`
- Beschreibung: Legt die Region für Azure Text-to-Speech fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- Typ: `str`
- Beschreibung: Legt das Ausgabeformat für Azure Text-to-Speech fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

### OpenAI Text-to-Speech

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- Typ: `str`
- Standard: `${OPENAI_API_BASE_URL}`
- Beschreibung: Legt die OpenAI-kompatible Basis-URL fest, die für Text-to-Speech verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUDIO_TTS_OPENAI_API_KEY`

- Typ: `str`
- Standard: `${OPENAI_API_KEY}`
- Beschreibung: Legt den API-Schlüssel fest, der für Text-to-Speech verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

## Bildgenerierung

#### `IMAGE_GENERATION_ENGINE`

- Typ: `str`
- Optionen:
  - `openai` - Verwendet OpenAI DALL-E für die Bildgenerierung.
  - `comfyui` - Verwendet die ComfyUI-Engine für die Bildgenerierung.
  - `automatic1111` - Verwendet die AUTOMATIC1111-Engine für die Bildgenerierung.
  - `gemini` - Verwendet Gemini für die Bildgenerierung.
- Standard: `openai`
- Beschreibung: Gibt die für die Bildgenerierung zu verwendende Engine an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `ENABLE_IMAGE_GENERATION`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Aktiviert oder deaktiviert Funktionen zur Bildgenerierung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Aktiviert oder deaktiviert die Generierung von Bild-Prompts.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- Typ: `str`
- Standard: `None`
- Beschreibung: Legt die Vorlage fest, die für die Generierung von Bild-Prompts verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### Aufgabe:
Erstellen Sie eine detaillierte Eingabeaufforderung für eine Bildgenerierungsaufgabe basierend auf der gegebenen Sprache und dem Kontext. Beschreiben Sie das Bild, als würden Sie es jemandem erklären, der es nicht sehen kann. Fügen Sie relevante Details, Farben, Formen und alle anderen wichtigen Elemente hinzu.

### Richtlinien:
- Seien Sie beschreibend und detailliert, wobei Sie den Fokus auf die wichtigsten Aspekte des Bildes legen.
- Vermeiden Sie Annahmen oder das Hinzufügen von Informationen, die nicht im Bild enthalten sind.
- Verwenden Sie die primäre Sprache des Chats; standardmäßig Englisch, wenn mehrsprachig.
- Wenn das Bild zu komplex ist, konzentrieren Sie sich auf die hervorstehenden Elemente.

### Ausgabe:
Geben Sie strikt das JSON-Format zurück:
{
    "prompt": "Ihre detaillierte Beschreibung hier."
}

### Chat-Verlauf:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- Typ: `str`
- Standard: `512x512`
- Beschreibung: Legt die Standardbildgröße für die Generierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `IMAGE_STEPS`

- Typ: `int`
- Standard: `50`
- Beschreibung: Legt die Standard-Iterationsschritte für die Bildgenerierung fest. Wird für ComfyUI und AUTOMATIC1111 verwendet.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `IMAGE_GENERATION_MODEL`

- Typ: `str`
- Beschreibung: Standardmodell das für die Bildgenerierung verwendet werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- Typ: `str`
- Beschreibung: Gibt die URL zur AUTOMATIC1111s Stable Diffusion API an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig` Variable.

#### `AUTOMATIC1111_API_AUTH`

- Typ: `str`
- Beschreibung: Legt die Authentifizierung für die AUTOMATIC1111-API fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUTOMATIC1111_CFG_SCALE`

- Typ: `float`
- Beschreibung: Legt die Skalierung für die AUTOMATIC1111-Inferenz fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUTOMATIC1111_SAMPLER`

- Typ: `str`
- Beschreibung: Legt den Sampler für die AUTOMATIC1111-Inferenz fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `AUTOMATIC1111_SCHEDULER`

- Typ: `str`
- Beschreibung: Legt den Scheduler für die AUTOMATIC1111-Inferenz fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### ComfyUI

#### `COMFYUI_BASE_URL`

- Typ: `str`
- Beschreibung: Gibt die URL zur ComfyUI-Bildgenerierungs-API an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `COMFYUI_API_KEY`

- Typ: `str`
- Beschreibung: Legt den API-Schlüssel für ComfyUI fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `COMFYUI_WORKFLOW`

- Typ: `str`
- Standardwert:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Checkpoint laden"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Leeres latentes Bild"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Textkodierung (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Textkodierung (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Dekodierung"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Bild speichern"
    }
  }
}
```

- Beschreibung: Legt den Workflow von ComfyUI fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Gemini

#### `GEMINI_API_BASE_URL`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt die URL zur Gemini-API an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GEMINI_API_KEY`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Legt den Gemini-API-Schlüssel fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `IMAGES_GEMINI_API_BASE_URL`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Gibt die URL zur Gemini-Bildgenerierungs-API an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `IMAGES_GEMINI_API_KEY`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Legt den Gemini-API-Schlüssel für die Bildgenerierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- Typ: `str`
- Standardwert: `${OPENAI_API_BASE_URL}`
- Beschreibung: Legt die OpenAI-kompatible Basis-URL für die DALL-E-Bildgenerierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `IMAGES_OPENAI_API_KEY`

- Typ: `str`
- Standardwert: `${OPENAI_API_KEY}`
- Beschreibung: Legt den API-Schlüssel für die DALL-E-Bildgenerierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert die Erstellung von Konten beim OAuth-Signup. Unterscheidet sich von `ENABLE_SIGNUP`.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

:::danger

`ENABLE_LOGIN_FORM` muss auf `False` gesetzt sein, wenn `ENABLE_OAUTH_SIGNUP` auf `True` gesetzt ist. Andernfalls wird keine Anmeldung möglich sein.

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Wenn aktiviert, werden OAuth-Konten mit bestehenden Konten zusammengeführt, die dieselbe E-Mail-Adresse verwenden. Dies wird als unsicher betrachtet, da nicht alle OAuth-Anbieter E-Mails verifizieren, was potenziell zu Kontenübernahmen führen kann.

- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Wenn aktiviert, aktualisiert das lokale Benutzerprofilbild beim Login mit dem von OAuth bereitgestellten Bild.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- Typ: `str`
- Beschreibung: Definiert den vertrauenswürdigen Anfrage-Header für die Authentifizierung. Siehe [SSO-Dokumentation](/features/sso).

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- Typ: `str`
- Beschreibung: Definiert den vertrauenswürdigen Anfrage-Header für den Benutzernamen von Personen, die sich mit dem
`WEBUI_AUTH_TRUSTED_EMAIL_HEADER`-Header registrieren. Siehe [SSO-Dokumentation](/features/sso).

### Google

Siehe https://support.google.com/cloud/answer/6158849?hl=en

#### `GOOGLE_CLIENT_ID`

- Typ: `str`
- Beschreibung: Festlegt die Client-ID für Google OAuth.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_CLIENT_SECRET`

- Typ: `str`
- Beschreibung: Festlegt das Client-Geheimnis für Google OAuth.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_OAUTH_SCOPE`

- Typ: `str`
- Standard: `openid email profile`
- Beschreibung: Festlegt den Bereich für die Google OAuth-Authentifizierung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GOOGLE_REDIRECT_URI`

- Typ: `str`
- Standard: `<backend>/oauth/google/callback`
- Beschreibung: Legt die Redirect-URI für Google OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Microsoft

Siehe https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- Typ: `str`
- Beschreibung: Legt die Client-ID für Microsoft OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MICROSOFT_CLIENT_SECRET`

- Typ: `str`
- Beschreibung: Legt das Client-Geheimnis für Microsoft OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MICROSOFT_CLIENT_TENANT_ID`

- Typ: `str`
- Beschreibung: Legt die Mandanten-ID für Microsoft OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MICROSOFT_OAUTH_SCOPE`

- Typ: `str`
- Standard: `openid email profile`
- Beschreibung: Legt den Bereich für die Microsoft OAuth-Authentifizierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `MICROSOFT_REDIRECT_URI`

- Typ: `str`
- Standard: `<backend>/oauth/microsoft/callback`
- Beschreibung: Legt die Redirect-URI für Microsoft OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### GitHub

Siehe https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- Typ: `str`
- Beschreibung: Legt die Client-ID für GitHub OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GITHUB_CLIENT_SECRET`

- Typ: `str`
- Beschreibung: Legt das Client-Geheimnis für GitHub OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GITHUB_CLIENT_SCOPE`

- Typ: `str`
- Standard: `user:email`
- Beschreibung: Gibt den Bereich für die GitHub OAuth-Authentifizierung an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `GITHUB_CLIENT_REDIRECT_URI`

- Typ: `str`
- Standard: `<backend>/oauth/github/callback`
- Beschreibung: Legt die Redirect-URI für GitHub OAuth fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- Typ: `str`
- Beschreibung: Legt die Client-ID für OIDC fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_CLIENT_SECRET`

- Typ: `str`
- Beschreibung: Legt das Client-Geheimnis für OIDC fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENID_PROVIDER_URL`

- Typ: `str`
- Beschreibung: Pfad zum `.well-known/openid-configuration` Endpunkt
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OPENID_REDIRECT_URI`

- Typ: `str`
- Standard: `<backend>/oauth/oidc/callback`
- Beschreibung: Legt die Redirect-URI für OIDC fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_SCOPES`

- Typ: `str`
- Standard: `openid email profile`
- Beschreibung: Legt den Bereich für die OIDC-Authentifizierung fest. `openid` und `email` sind erforderlich.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_CODE_CHALLENGE_METHOD`

- Typ: `str`
- Standard: Leerzeichen ( ), da `None` als Standard gesetzt ist.
- Beschreibung: Gibt die Code-Herausforderungsmethode für OAuth-Authentifizierung an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_PROVIDER_NAME`

- Typ: `str`
- Standard: `SSO`
- Beschreibung: Legt den Namen für den OIDC-Anbieter fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_USERNAME_CLAIM`

- Typ: `str`
- Standard: `name`
- Beschreibung: Legt den Benutzernamen-Claim für OpenID fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_EMAIL_CLAIM`

- Typ: `str`
- Standard: `email`
- Beschreibung: Legen Sie den E-Mail-Anspruch für OpenID fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_PICTURE_CLAIM`

- Typ: `str`
- Standardwert: `picture`
- Beschreibung: Legen Sie den Bild- (Avatar-)Anspruch für OpenID fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_GROUP_CLAIM`

- Typ: `str`
- Standardwert: `groups`
- Beschreibung: Gibt den Gruppenanspruch für die OAuth-Authentifizierung an.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert die Rollenverwaltung für die OAuth-Delegation.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert die OAuth-Gruppenverwaltung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_ROLES_CLAIM`

- Typ: `str`
- Standardwert: `roles`
- Beschreibung: Legt den Rollenanspruch fest, der im OIDC-Token gesucht werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_ALLOWED_ROLES`

- Typ: `str`
- Standardwert: `user,admin`
- Beschreibung: Legt die Rollen fest, die Zugriff auf die Plattform haben.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_ADMIN_ROLES`

- Typ: `str`
- Standardwert: `admin`
- Beschreibung: Legt die Rollen fest, die als Administratoren gelten.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `OAUTH_ALLOWED_DOMAINS`

- Typ: `str`
- Standardwert: `*`
- Beschreibung: Gibt die zugelassenen Domains für die OAuth-Authentifizierung an (z. B. "example1.com,example2.com").
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## LDAP

#### `ENABLE_LDAP`

- Typ: `bool`
- Standardwert: `False`
- Beschreibung: Aktiviert oder deaktiviert die LDAP-Authentifizierung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_SERVER_LABEL`

- Typ: `str`
- Beschreibung: Legt die Bezeichnung des LDAP-Servers fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.


#### `LDAP_SERVER_HOST`

- Typ: `str`
- Standardwert: `localhost`
- Beschreibung: Legt den Hostnamen des LDAP-Servers fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_SERVER_PORT`

- Typ: `int`
- Standardwert: `389`
- Beschreibung: Legt die Portnummer des LDAP-Servers fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- Typ: `str`
- Beschreibung: Legt das Attribut fest, das als E-Mail für die LDAP-Authentifizierung verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- Typ: `str`
- Beschreibung: Legt das Attribut fest, das als Benutzername für die LDAP-Authentifizierung verwendet wird.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_APP_DN`

- Typ: `str`
- Beschreibung: Legt den Distinguished Name für die LDAP-Anwendung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_APP_PASSWORD`

- Typ: `str`
- Beschreibung: Legt das Passwort für die LDAP-Anwendung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_SEARCH_BASE`

- Typ: `str`
- Beschreibung: Legt die Basis für die Suche bei der LDAP-Authentifizierung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_SEARCH_FILTER`

- Typ: `str`
- Standardwert: `None`
- Beschreibung: Legt einen einzelnen Filter für die LDAP-Suche fest. Alternative zu `LDAP_SEARCH_FILTERS`.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_SEARCH_FILTERS`

- Typ: `str`
- Beschreibung: Legt den Filter für die LDAP-Suche fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_USE_TLS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert TLS für die LDAP-Verbindung.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_CA_CERT_FILE`

- Typ: `str`
- Beschreibung: Legt den Pfad zur LDAP-CA-Zertifikatsdatei fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_VALIDATE_CERT`

- Typ: `bool`
- Beschreibung: Gibt an, ob das LDAP-CA-Zertifikat validiert werden soll.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `LDAP_CIPHERS`

- Typ: `str`
- Standardwert: `ALL`
- Beschreibung: Legt die Cipher-Suites für die LDAP-Verbindung fest.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Benutzerberechtigungen

### Chat-Berechtigungen

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert oder deaktiviert die Benutzerberechtigung für den Zugriff auf Chat-Steuerungen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Hochladen von Dateien in Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_DELETE`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Löschen von Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_EDIT`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Bearbeiten von Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_STT`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung von Speech-to-Text in Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_TTS`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung von Text-to-Speech in Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_CALL`

- Typ: `str`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Tätigen von Anrufen in Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- Typ: `str`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung mehrerer Modelle in Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- Typ: `bool`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Erstellung temporärer Chats.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert die Erzwingung temporärer Chats für Benutzer.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Funktionsberechtigungen

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Zugriff auf direkte Toolserver.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- Typ: `str`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung der Websuchfunktion.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- Typ: `str`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung der Bildgenerierungsfunktion.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- Typ: `str`
- Standard: `True`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zur Nutzung der Code-Interpreter-Funktion.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

### Arbeitsbereichsberechtigungen

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Zugriff auf Arbeitsbereichsmodelle.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Zugriff auf Arbeitsbereichswissen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Zugriff auf Arbeitsbereichsaufforderungen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- Typ: `bool`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert Benutzerberechtigungen zum Zugriff auf Arbeitsbereichswerkzeuge.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert die öffentliche Freigabe von Arbeitsbereichsmodellen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert die öffentliche Freigabe von Arbeitsbereichswissen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert die öffentliche Freigabe von Arbeitsbereichsaufforderungen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- Typ: `str`
- Standard: `False`
- Beschreibung: Ermöglicht oder deaktiviert die öffentliche Freigabe von Arbeitsbereichswerkzeugen.
- Persistenz: Diese Umgebungsvariable ist eine `PersistentConfig`-Variable.

## Verschiedene Umgebungsvariablen

Diese Variablen sind nicht spezifisch für Open WebUI, können jedoch in bestimmten Kontexten nützlich sein.

### Cloud-Speicherung

#### `STORAGE_PROVIDER`

- Typ: `str`
- Optionen:
  - `s3` - verwendet die S3-Client-Bibliothek und die zugehörigen Umgebungsvariablen, wie in [Amazon S3 Storage](#amazon-s3-storage) erwähnt
  - `gcs` - verwendet die GCS-Client-Bibliothek und die zugehörigen Umgebungsvariablen, wie in [Google Cloud Storage](#google-cloud-storage) erwähnt
  - `azure` - verwendet die Azure-Client-Bibliothek und die zugehörigen Umgebungsvariablen, wie in [Microsoft Azure Storage](#microsoft-azure-storage) erwähnt
- Standard: leerer String ( ), der standardmäßig `local` ist
- Beschreibung: Legt den Speicheranbieter fest.

#### Amazon S3 Storage

#### `S3_ACCESS_KEY_ID`

- Typ: `str`
- Beschreibung: Legt die Zugriffsschlüssel-ID für die S3-Speicherung fest.

#### `S3_ADDRESSING_STYLE`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt den Adressierungsstil für die S3-Speicherung an (z. B. path, virtual).

#### `S3_BUCKET_NAME`

- Typ: `str`
- Beschreibung: Legt den Bucket-Namen für die S3-Speicherung fest.

#### `S3_ENDPOINT_URL`

- Typ: `str`
- Beschreibung: Legt die Endpunkt-URL für die S3-Speicherung fest.

#### `S3_KEY_PREFIX`

- Typ: `str`
- Beschreibung: Legt das Schlüsselpräfix für ein S3-Objekt fest.

#### `S3_REGION_NAME`

- Typ: `str`
- Beschreibung: Legt den Regionsnamen für die S3-Speicherung fest.

#### `S3_SECRET_ACCESS_KEY`

- Typ: `str`
- Beschreibung: Legt den geheimen Zugriffsschlüssel für die S3-Speicherung fest.

#### `S3_USE_ACCELERATE_ENDPOINT`

- Typ: `str`
- Standard: `False`
- Beschreibung: Gibt an, ob der beschleunigte Endpunkt für die S3-Speicherung verwendet werden soll.

#### `S3_ENABLE_TAGGING`

- Typ: `str`
- Standard: `False`
- Beschreibung: Aktiviert das Tagging von S3-Objekten nach dem Hochladen zur besseren Organisation, Suche und Integration mit Dateiverwaltungsrichtlinien. Muss immer auf `False` gesetzt werden, wenn Cloudflare R2 verwendet wird, da R2 kein Objekt-Tagging unterstützt.

#### Google Cloud Storage

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- Typ: `str`
- Beschreibung: Inhalt der JSON-Datei mit Google-Anwendungsanmeldedaten.
  - Optional - falls nicht bereitgestellt, werden Anmeldedaten aus der Umgebung entnommen. Benutzeranmeldedaten, wenn lokal ausgeführt, und der Google-Metadatenserver, wenn auf einer Google Compute Engine ausgeführt.
  - Eine Datei kann für ein Dienstkonto gemäß diesem [Leitfaden](https://developers.google.com/workspace/guides/create-credentials#service-account) erzeugt werden.

#### `GCS_BUCKET_NAME`

- Typ: `str`
- Beschreibung: Legt den Bucket-Namen für Google Cloud Storage fest. Der Bucket muss bereits existieren.

#### Microsoft Azure Storage

#### `AZURE_STORAGE_ENDPOINT`

- Typ: `str`
- Beschreibung: Legt die Endpunkt-URL für Azure Storage fest.

#### `AZURE_STORAGE_CONTAINER_NAME`

- Typ: `str`
- Beschreibung: Legt den Containernamen für Azure Storage fest.

#### `AZURE_STORAGE_KEY`

- Typ: `str`
- Beschreibung: Legt den Zugriffsschlüssel für Azure Storage fest.
  - Optional - falls nicht bereitgestellt, werden Anmeldedaten aus der Umgebung entnommen. Benutzeranmeldedaten, wenn lokal ausgeführt, und Managed Identity, wenn in Azure-Diensten ausgeführt.

### Datenbank-Pool

#### `DATABASE_URL`

- Typ: `str`
- Standard: `sqlite:///${DATA_DIR}/webui.db`
- Beschreibung: Gibt die Datenbank-URL für die Verbindung an.

:::info

Unterstützt SQLite und Postgres. Änderungen der URL migrieren keine Daten zwischen Datenbanken.
Dokumentation zum URL-Schema ist [hier](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls) verfügbar.

:::

#### `DATABASE_SCHEMA`

- Typ: `str`
- Standard: `None`
- Beschreibung: Gibt das Datenbankschema für die Verbindung an.

#### `DATABASE_POOL_SIZE`

- Typ: `int`
- Standard: `0`
- Beschreibung: Gibt die Größe des Datenbank-Pools an. Ein Wert von `0` deaktiviert das Pooling.

#### `DATABASE_POOL_MAX_OVERFLOW`

- Typ: `int`
- Standard: `0`
- Beschreibung: Gibt das maximale Überlaufvolumen des Datenbank-Pools an.

:::info

Weitere Informationen zu dieser Einstellung finden Sie [hier](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow).

:::

#### `DATABASE_POOL_TIMEOUT`

- Typ: `int`
- Standard: `30`
- Beschreibung: Gibt das Datenbank-Pool-Timeout in Sekunden an, um eine Verbindung zu erhalten.

:::info

Weitere Informationen zu dieser Einstellung finden Sie [hier](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout).

:::

#### `DATABASE_POOL_RECYCLE`

- Typ: `int`
- Standard: `3600`
- Beschreibung: Gibt die Wiederverwendungszeit des Datenbank-Pools in Sekunden an.

:::info

Weitere Informationen zu dieser Einstellung finden Sie [hier](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle).

:::

### Redis

#### `REDIS_URL`

- Typ: `str`
- Beispiel: `redis://localhost:6379/0`
- Beschreibung: Gibt die URL der Redis-Instanz für den App-Zustand an.

:::info

Beim Einsatz von Open-WebUI in einem Multi-Node/Worker-Cluster muss sichergestellt werden, dass der Wert REDIS_URL gesetzt ist. Ohne dies treten Probleme mit Sitzungen, Persistenz und Konsistenz im App-Zustand auf, da die Worker nicht kommunizieren können.

:::

#### `REDIS_SENTINEL_HOSTS`

- Typ: `str`
- Beschreibung: Durch Kommas getrennte Liste von Redis-Sentinels für den Anwendungsstatus. Falls angegeben, wird der "Hostname" in `REDIS_URL` als Sentinel-Dienstname interpretiert.

#### `REDIS_SENTINEL_PORT`

- Typ: `int`
- Standardwert: `26379`
- Beschreibung: Sentinel-Port für den Redis-Anwendungsstatus.

#### `ENABLE_WEBSOCKET_SUPPORT`

- Typ: `bool`
- Standardwert: `True`
- Beschreibung: Aktiviert die Unterstützung für Websockets in Open WebUI.

:::info

Wenn Open-WebUI in einem Multi-Node-/Worker-Cluster bereitgestellt wird, müssen Sie sicherstellen, dass der Wert ENABLE_WEBSOCKET_SUPPORT gesetzt ist. Andernfalls treten Probleme mit der Konsistenz und Persistenz von Websockets auf.

:::

#### `WEBSOCKET_MANAGER`

- Typ: `str`
- Standardwert: `redis`
- Beschreibung: Gibt den Websocket-Manager an, der verwendet werden soll (in diesem Fall Redis).

:::info

Wenn Open-WebUI in einem Multi-Node-/Worker-Cluster bereitgestellt wird, müssen Sie sicherstellen, dass der Wert WEBSOCKET_MANAGER gesetzt ist und eine Schlüssel-Wert-NoSQL-Datenbank wie Redis verwendet wird. Andernfalls treten Probleme mit der Konsistenz und Persistenz von Websockets auf.

:::

#### `WEBSOCKET_REDIS_URL`

- Typ: `str`
- Standardwert: `${REDIS_URL}`
- Beschreibung: Gibt die URL der Redis-Instanz für die Websocket-Kommunikation an. Diese ist von `REDIS_URL` getrennt, und es wird empfohlen, beide zu setzen.

:::info

Wenn Open-WebUI in einem Multi-Node-/Worker-Cluster bereitgestellt wird, müssen Sie sicherstellen, dass der Wert WEBSOCKET_REDIS_URL gesetzt ist und eine Schlüssel-Wert-NoSQL-Datenbank wie Redis verwendet wird. Andernfalls treten Probleme mit der Konsistenz und Persistenz von Websockets auf.

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- Typ: `str`
- Beschreibung: Durch Kommas getrennte Liste von Redis-Sentinels für Websockets. Falls angegeben, wird der "Hostname" in `WEBSOCKET_REDIS_URL` als Sentinel-Dienstname interpretiert.

#### `WEBSOCKET_SENTINEL_PORT`

- Typ: `int`
- Standardwert: `26379`
- Beschreibung: Sentinel-Port für Websocket-Redis.

### Uvicorn-Einstellungen

#### `UVICORN_WORKERS`

- Typ: `int`
- Standardwert: `1`
- Beschreibung: Kontrolliert die Anzahl der Worker-Prozesse, die Uvicorn erstellt, um Anfragen zu bearbeiten. Jeder Worker führt eine eigene Instanz der Anwendung in einem separaten Prozess aus.

:::info

Bei der Bereitstellung in orchestrierten Umgebungen wie Kubernetes oder bei Verwendung von Helm-Charts wird empfohlen, UVICORN_WORKERS auf 1 zu belassen. Container-Orchestrierungsplattformen bieten bereits eigene Skalierungsmechanismen durch Pod-Replikation, und die Verwendung mehrerer Worker innerhalb von Containern kann zu Problemen bei der Ressourcenallokation führen und horizontale Skalierungsstrategien erschweren.

Wenn Sie UVICORN_WORKERS verwenden, müssen Sie auch sicherstellen, dass verwandte Umgebungsvariablen für skalierbare Multi-Instanz-Setups entsprechend gesetzt sind.

:::

### Proxy-Einstellungen

Open WebUI unterstützt die Verwendung von Proxys für HTTP- und HTTPS-Abrufe. Um Proxy-Einstellungen festzulegen,
verwendet Open WebUI die folgenden Umgebungsvariablen:

#### `http_proxy`

- Typ: `str`
- Beschreibung: Legt die URL für den HTTP-Proxy fest.

#### `https_proxy`

- Typ: `str`
- Beschreibung: Legt die URL für den HTTPS-Proxy fest.

#### `no_proxy`

- Typ: `str`
- Beschreibung: Listet Domain-Erweiterungen (oder IP-Adressen) auf, für die der Proxy nicht verwendet werden soll,
getrennt durch Kommas. Durch das Setzen von no_proxy auf .mit.edu wird beispielsweise sichergestellt, dass der Proxy
umgangen wird, wenn Dokumente von MIT abgerufen werden.

### Erforderliche Python-Pakete installieren

Open WebUI bietet Umgebungsvariablen zur Anpassung des Pip-Installationsprozesses. Nachfolgend sind die von Open WebUI verwendeten Umgebungsvariablen zur Anpassung des Paketinstallationsverhaltens aufgeführt:

#### `PIP_OPTIONS`

- Typ: `str`
- Beschreibung: Gibt zusätzliche Befehlszeilenoptionen an, die Pip bei der Installation von Paketen verwenden soll. Zum Beispiel können Sie Flags wie `--upgrade`, `--user` oder `--no-cache-dir` einschließen, um den Installationsprozess zu steuern.

#### `PIP_PACKAGE_INDEX_OPTIONS`

- Typ: `str`
- Beschreibung: Definiert benutzerdefiniertes Paketindexverhalten für Pip. Dies kann die Angabe zusätzlicher oder alternativer Index-URLs (z. B. `--extra-index-url`), Authentifizierungsanmeldedaten oder anderer Parameter umfassen, um zu steuern, wie Pakete von verschiedenen Orten abgerufen werden.
