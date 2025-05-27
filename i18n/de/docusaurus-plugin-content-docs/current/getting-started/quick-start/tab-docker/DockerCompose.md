# Docker Compose Einrichtung

Die Verwendung von Docker Compose vereinfacht die Verwaltung von Multi-Container-Docker-Anwendungen.

Falls Docker nicht installiert ist, sehen Sie sich unser [Docker Installations-Tutorial](../../../tutorials/docker-install.md) an.

Docker Compose erfordert ein zusätzliches Paket, `docker-compose-v2`.

**Warnung:** Ältere Docker Compose Tutorials könnten Syntax der Version 1 verwenden, die Befehle wie `docker-compose build` nutzen. Stellen Sie sicher, dass Sie die Syntax der Version 2 verwenden, die Befehle wie `docker compose build` nutzt (beachten Sie den Leerzeichen anstelle eines Bindestrichs).

## Beispiel `docker-compose.yml`

Hier ist eine Beispielkonfigurationsdatei für die Einrichtung von Open WebUI mit Docker Compose:

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## Starten der Dienste

Um Ihre Dienste zu starten, führen Sie den folgenden Befehl aus:

```bash
docker compose up -d
```

## Hilfsskript

Ein nützliches Hilfsskript namens `run-compose.sh` ist im Code enthalten. Dieses Skript hilft bei der Auswahl der einzubindenden Docker Compose-Dateien für Ihre Bereitstellung und vereinfacht den Einrichtungsprozess.

---

**Hinweis:** Für Nvidia GPU-Unterstützung ändern Sie das Image von `ghcr.io/open-webui/open-webui:main` zu `ghcr.io/open-webui/open-webui:cuda` und fügen Sie Folgendes zu Ihrer Dienstdefinition in der `docker-compose.yml`-Datei hinzu:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

Diese Einrichtung stellt sicher, dass Ihre Anwendung GPU-Ressourcen nutzen kann, wenn verfügbar.
