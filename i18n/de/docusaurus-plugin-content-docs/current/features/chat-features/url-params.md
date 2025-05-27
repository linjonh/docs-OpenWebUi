---
sidebar_position: 5
title: "🔗 URL-Parameter"
---

In Open WebUI können Chat-Sitzungen über verschiedene URL-Parameter angepasst werden. Diese Parameter ermöglichen es, spezifische Konfigurationen festzulegen, Funktionen zu aktivieren und Modelleinstellungen pro Chat zu definieren. Dieser Ansatz bietet Flexibilität und Kontrolle über einzelne Chat-Sitzungen direkt über die URL.

## Überblick über die URL-Parameter

Die folgende Tabelle listet die verfügbaren URL-Parameter, deren Funktion und Beispiele für deren Nutzung auf.

| **Parameter**      | **Beschreibung**                                                                  | **Beispiel**                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | Gibt die zu verwendenden Modelle als kommaseparierte Liste an.                   | `/?models=model1,model2`         |
| `model`            | Gibt ein einzelnes Modell an, das für die Chat-Sitzung verwendet werden soll.   | `/?model=model1`                 |
| `youtube`          | Gibt eine YouTube-Video-ID an, die innerhalb des Chats transkribiert werden soll. | `/?youtube=VIDEO_ID`             |
| `web-search`       | Aktiviert die Web-Suchfunktion, wenn auf `true` gesetzt.                         | `/?web-search=true`              |
| `tools` oder `tool-ids` | Gibt eine kommaseparierte Liste von Tool-IDs an, die im Chat aktiviert werden sollen. | `/?tools=tool1,tool2`            |
| `call`             | Aktiviert ein Call-Overlay, wenn auf `true` gesetzt.                             | `/?call=true`                    |
| `q`                | Legt eine anfängliche Anfrage oder Eingabeaufforderung für den Chat fest.       | `/?q=Hello%20there`              |
| `temporary-chat`   | Markiert den Chat als temporär, wenn auf `true` gesetzt, für einmalige Sitzungen. | `/?temporary-chat=true`          |

### 1. **Modelle und Modellauswahl**

- **Beschreibung**: Die Parameter `models` und `model` ermöglichen es, festzulegen, welche [Sprachmodelle](/features/workspace/models.md) für eine bestimmte Chat-Sitzung verwendet werden sollen.
- **Einstellung**: Sie können entweder `models` für mehrere Modelle oder `model` für ein einzelnes Modell verwenden.
- **Beispiel**:
  - `/?models=model1,model2` – Dies initialisiert den Chat mit `model1` und `model2`.
  - `/?model=model1` – Dies legt `model1` als einziges Modell für den Chat fest.

### 2. **YouTube-Transkription**

- **Beschreibung**: Der Parameter `youtube` verwendet eine YouTube-Video-ID, um den Chat dazu zu bringen, das angegebene Video zu transkribieren.
- **Einstellung**: Verwenden Sie die YouTube-Video-ID als Wert für diesen Parameter.
- **Beispiel**: `/?youtube=VIDEO_ID`
- **Verhalten**: Dies aktiviert die Transkriptionsfunktionalität innerhalb des Chats für das angegebene YouTube-Video.

### 3. **Web-Suche**

- **Beschreibung**: Mit der Aktivierung von `web-search` kann die Chat-Sitzung auf [Web-Suchfunktionalität](/category/-web-search) zugreifen.
- **Einstellung**: Setzen Sie diesen Parameter auf `true`, um die Web-Suche zu aktivieren.
- **Beispiel**: `/?web-search=true`
- **Verhalten**: Wenn aktiviert, kann der Chat Web-Suchergebnisse als Teil seiner Antworten abrufen.

### 4. **Tool-Auswahl**

- **Beschreibung**: Die Parameter `tools` oder `tool-ids` geben an, welche [Tools](/features/plugin/tools) im Chat aktiviert werden sollen.
- **Einstellung**: Geben Sie eine kommaseparierte Liste von Tool-IDs als Wert des Parameters an.
- **Beispiel**: `/?tools=tool1,tool2` oder `/?tool-ids=tool1,tool2`
- **Verhalten**: Jede Tool-ID wird abgeglichen und innerhalb der Sitzung zur Benutzerinteraktion aktiviert.

### 5. **Call-Overlay**

- **Beschreibung**: Der Parameter `call` aktiviert ein Video- oder Call-Overlay in der Chat-Oberfläche.
- **Einstellung**: Setzen Sie den Parameter auf `true`, um das Call-Overlay zu aktivieren.
- **Beispiel**: `/?call=true`
- **Verhalten**: Aktiviert ein Call-Overlay, sodass Funktionen wie Live-Transkription und Video-Eingabe möglich sind.

### 6. **Anfängliche Eingabeaufforderung**

- **Beschreibung**: Der Parameter `q` ermöglicht das Festlegen einer anfänglichen Anfrage oder Eingabeaufforderung für den Chat.
- **Einstellung**: Geben Sie den Text der Anfrage oder Eingabeaufforderung als Parameterwert an.
- **Beispiel**: `/?q=Hello%20there`
- **Verhalten**: Der Chat startet mit der angegebenen Eingabeaufforderung und gibt sie automatisch als erste Nachricht ein.

### 7. **Temporäre Chat-Sitzungen**

- **Beschreibung**: Der Parameter `temporary-chat` markiert den Chat als temporäre Sitzung. Dies kann Funktionen wie das Speichern des Chat-Verlaufs oder das Anwenden persistenter Einstellungen einschränken.
- **Einstellung**: Setzen Sie diesen Parameter für eine temporäre Chat-Sitzung auf `true`.
- **Beispiel**: `/?temporary-chat=true`
- **Verhalten**: Dies initiiert eine einmalige Chat-Sitzung ohne das Speichern von Verlauf oder das Anwenden erweiterter Konfigurationen.

<details>
<summary>Beispielanwendung</summary>
:::tip **Temporäre Chat-Sitzung**
Angenommen, ein Benutzer möchte eine schnelle Chat-Sitzung starten, ohne die Historie zu speichern. Dies kann erfolgen, indem `temporary-chat=true` in der URL gesetzt wird. Dies bietet eine temporäre Chat-Umgebung, die ideal für einmalige Interaktionen ist.
:::
</details>

## Verwendung mehrerer Parameter zusammen

Diese URL-Parameter können kombiniert werden, um hochgradig angepasste Chat-Sitzungen zu erstellen. Zum Beispiel:

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hallo%20da&temporary-chat=true
```

Diese URL wird:

- Den Chat mit `model1` und `model2` initialisieren.
- YouTube-Transkription, Websuche und die angegebenen Tools aktivieren.
- Ein Anruf-Overlay anzeigen.
- Eine Anfangsanweisung „Hallo da.“ setzen.
- Den Chat als temporär markieren und die Historie nicht speichern.
