---
sidebar_position: 8
title: "Mojeek"
---

:::warning
Dieses Tutorial ist ein Beitrag aus der Community und wird nicht von dem Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie einen Beitrag leisten? Schauen Sie sich das Tutorial zum Mitmachen an.
:::

## Mojeek Search API

### Einrichtung

1. Bitte besuchen Sie die [Mojeek Search API-Seite](https://www.mojeek.com/services/search/web-search-api/), um einen `API-Schlüssel` zu erhalten
2. Öffnen Sie mit dem `API-Schlüssel` das `Open WebUI Admin-Panel` und klicken Sie auf den Reiter `Einstellungen`, und dann auf `Web Search`
3. Aktivieren Sie `Websuche` und setzen Sie die Option `Web-Suchmaschine` auf `mojeek`
4. Füllen Sie `Mojeek Search API Key` mit dem `API-Schlüssel` aus
5. Klicken Sie auf `Speichern`

### Docker-Compose Einrichtung

Fügen Sie die folgenden Umgebungsvariablen zu Ihrer Open WebUI `docker-compose.yaml` Datei hinzu:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
