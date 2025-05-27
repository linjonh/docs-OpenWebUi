---
sidebar_position: 3
title: "🔒 Berechtigungen"
---

Der Abschnitt `Berechtigungen` im `Workspace` von Open WebUI ermöglicht Administratoren die Konfiguration von Zugriffskontrollen und Funktionsverfügbarkeit für Benutzer. Dieses leistungsstarke System erlaubt eine feinkörnige Kontrolle darüber, auf welche Inhalte und Funktionen Benutzer zugreifen und welche sie innerhalb der Anwendung ändern können.

Administratoren können Berechtigungen auf folgende Weise verwalten:

1. **Benutzeroberfläche:** Der Berechtigungsbereich des Workspaces bietet eine grafische Oberfläche zur Konfiguration von Berechtigungen.
2. **Umgebungsvariablen:** Berechtigungen können mithilfe von Umgebungsvariablen gesetzt werden, welche als `PersistentConfig`-Variablen gespeichert werden.
3. **Gruppenmanagement:** Zuweisung von Benutzern zu Gruppen mit vordefinierten Berechtigungen.

## Workspace-Berechtigungen

Workspace-Berechtigungen steuern den Zugriff auf die Kernelemente der Open WebUI-Plattform:

* **Modelle-Zugriff**: Umschalter, um Benutzern den Zugriff auf und die Verwaltung von benutzerdefinierten Modellen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **Wissenszugriff**: Umschalter, um Benutzern den Zugriff auf und die Verwaltung von Wissensdatenbanken zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **Prompts-Zugriff**: Umschalter, um Benutzern den Zugriff auf und die Verwaltung von gespeicherten Eingabeaufforderungen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **Werkzeuge-Zugriff**: Umschalter, um Benutzern den Zugriff auf und die Verwaltung von Werkzeugen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *Hinweis: Aktivieren dieser Funktion ermöglicht es Benutzern, beliebigen Code auf den Server hochzuladen.*

## Chat-Berechtigungen

Chat-Berechtigungen bestimmen, welche Aktionen Benutzer in Chat-Unterhaltungen durchführen können:

* **Chat-Steuerelemente erlauben**: Umschalter, um den Zugriff auf Chat-Steuerungsoptionen zu aktivieren.
* **Datei-Upload erlauben**: Umschalter, um Benutzern den Upload von Dateien während Chat-Sitzungen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **Chat-Löschung erlauben**: Umschalter, um Benutzern das Löschen von Chat-Unterhaltungen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_CHAT_DELETE`)
* **Chat-Bearbeitung erlauben**: Umschalter, um Benutzern das Bearbeiten von Nachrichten in Chat-Unterhaltungen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_CHAT_EDIT`)
* **Temporäre Chats erlauben**: Umschalter, um Benutzern die Erstellung von temporären Chat-Sitzungen zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_CHAT_TEMPORARY`)

## Funktionen-Berechtigungen

Funktionen-Berechtigungen steuern den Zugriff auf spezielle Fähigkeiten innerhalb von Open WebUI:

* **Websuche**: Umschalter, um Benutzern die Durchführung von Websuchen während Chat-Sitzungen zu erlauben. (Umgebungsvariable: `ENABLE_RAG_WEB_SEARCH`)
* **Bildgenerierung**: Umschalter, um Benutzern die Erstellung von Bildern zu erlauben. (Umgebungsvariable: `ENABLE_IMAGE_GENERATION`)
* **Code-Interpreter**: Umschalter, um Benutzern die Nutzung der Code-Interpreter-Funktion zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **Direkte Werkzeug-Server**: Umschalter, um Benutzern die direkte Verbindung zu Werkzeug-Servern zu erlauben. (Umgebungsvariable: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## Standard-Berechtigungseinstellungen

Standardmäßig wendet Open WebUI die folgenden Berechtigungseinstellungen an:

**Workspace-Berechtigungen**:
- Modelle-Zugriff: Deaktiviert (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- Wissenszugriff: Deaktiviert (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- Prompts-Zugriff: Deaktiviert (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- Werkzeuge-Zugriff: Deaktiviert (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**Chat-Berechtigungen**:
- Chat-Steuerelemente erlaubt: Aktiviert
- Datei-Upload erlaubt: Aktiviert (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- Chat-Löschung erlaubt: Aktiviert (`USER_PERMISSIONS_CHAT_DELETE=True`)
- Chat-Bearbeitung erlaubt: Aktiviert (`USER_PERMISSIONS_CHAT_EDIT=True`)
- Temporäre Chats erlaubt: Aktiviert (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**Funktionen-Berechtigungen**:
- Websuche: Aktiviert (`ENABLE_RAG_WEB_SEARCH=True`)
- Bildgenerierung: Aktiviert (`ENABLE_IMAGE_GENERATION=True`)
- Code-Interpreter: Aktiviert (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- Direkte Werkzeug-Server: Deaktiviert (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

Administratoren können die Standardberechtigungen in der Benutzeroberfläche unter „Nutzer“ im Admin-Panel ändern.

## Verwaltung von Berechtigungen

Administratoren können diese Berechtigungen über die Benutzeroberfläche oder durch Festlegen der entsprechenden Umgebungsvariablen in der Konfiguration anpassen. Alle berechtigungsbezogenen Umgebungsvariablen sind als `PersistentConfig`-Variablen gekennzeichnet, was bedeutet, dass sie intern nach dem ersten Start gespeichert werden und über die Open WebUI-Oberfläche verwaltet werden können.

Diese Flexibilität ermöglicht es Organisationen, Sicherheitsrichtlinien umzusetzen, während sie den Benutzern dennoch die benötigten Tools bereitstellen. Weitere detaillierte Informationen zu Umgebungsvariablen im Zusammenhang mit Berechtigungen finden Sie in der [Dokumentation zur Umgebungsvariablenkonfiguration](../../getting-started/env-configuration.md#workspace-permissions).
