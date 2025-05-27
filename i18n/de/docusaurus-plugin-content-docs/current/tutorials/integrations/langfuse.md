---
sidebar_position: 20
title: "💥 Überwachung und Debugging mit Langfuse"
---

# Langfuse-Integration mit Open WebUI

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) bietet Open-Source-Observabilität und Bewertungen für Open WebUI. Durch Aktivieren der Langfuse-Integration können Sie Ihre Anwendungsdaten mit Langfuse verfolgen, um die Nutzung von Open WebUI zu entwickeln, zu überwachen und zu verbessern, einschließlich:

- Anwendungs-[Traces](https://langfuse.com/docs/tracing)
- Nutzungsmuster
- Kostendaten nach Benutzer und Modell
- Sitzungswiedergaben zur Fehlerbehebung
- [Bewertungen](https://langfuse.com/docs/scores/overview)

## So integrieren Sie Langfuse mit Open WebUI

![Langfuse-Integration](https://langfuse.com/images/docs/openwebui-integration.gif)
_Schritte zur Langfuse-Integration_

[Pipelines](https://github.com/open-webui/pipelines/) in Open WebUI ist ein UI-unabhängiges Framework für OpenAI API-Plugins. Es ermöglicht die Einspeisung von Plugins, die Benutzereingaben überwachen, verarbeiten und an das endgültige LLM weiterleiten, was zu erweitertem Steuerungs- und Anpassungsvermögen bei der Eingabeverarbeitung führt.

Um Ihre Anwendungsdaten mit Langfuse zu verfolgen, können Sie die [Langfuse-Pipeline](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py) verwenden, die Echtzeitüberwachung und Analyse von Nachrichteninteraktionen ermöglicht.

## Schnellstart-Anleitung

### Schritt 1: Open WebUI einrichten

Stellen Sie sicher, dass Open WebUI läuft. Sehen Sie sich dazu die [Open WebUI-Dokumentation](https://docs.openwebui.com/) an.

### Schritt 2: Pipelines einrichten

Starten Sie [Pipelines](https://github.com/open-webui/pipelines/) mithilfe von Docker. Verwenden Sie den folgenden Befehl, um Pipelines zu starten:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### Schritt 3: Verbindung von Open WebUI mit Pipelines

Erstellen und speichern Sie unter _Admin-Einstellungen_ eine neue Verbindung des Typs OpenAI API mit den folgenden Details:

- **URL:**`http://host.docker.internal:9099` (hier wird der zuvor gestartete Docker-Container ausgeführt).
- **Passwort:** 0p3n-w3bu! (Standard-Passwort)

![Open WebUI-Einstellungen](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### Schritt 4: Langfuse Filter Pipeline hinzufügen

Navigieren Sie als Nächstes zu _Admin-Einstellungen_ -> _Pipelines_ und fügen Sie die Langfuse Filter Pipeline hinzu. Geben Sie an, dass Pipelines unter`http://host.docker.internal:9099` (wie zuvor konfiguriert) lauschen und installieren Sie die [Langfuse Filter Pipeline](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py) über die Option _Von Github-URL installieren_ mit der folgenden URL:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

Fügen Sie nun Ihre Langfuse-API-Schlüssel unten ein. Wenn Sie sich noch nicht bei Langfuse angemeldet haben, können Sie Ihre API-Schlüssel erhalten, indem Sie [hier](https://cloud.langfuse.com) ein Konto erstellen.

![Open WebUI Langfuse Pipeline hinzufügen](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**Hinweis:** Um die Nutzung (Token-Zählungen) für OpenAI-Modelle zu erfassen, während Streaming aktiviert ist, navigieren Sie zu den Modelleinstellungen in Open WebUI und aktivieren Sie das "Usage"-[Feld](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586) unter _Capabilities_._

### Schritt 5: Ihre Traces in Langfuse anzeigen

Sie können jetzt mit Ihrer Open WebUI-Anwendung interagieren und die Traces in Langfuse anzeigen.

[Beispiel-Trace](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) in der Langfuse-Oberfläche:

![Open WebUI Beispiel-Trace in Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## Mehr erfahren

Für eine umfassende Anleitung zu Open WebUI Pipelines besuchen Sie [diesen Beitrag](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/).
