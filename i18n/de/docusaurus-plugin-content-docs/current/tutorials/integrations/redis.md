---
sidebar_position: 30
title: "🔗 Redis Websocket-Unterstützung"
---

:::warning
Diese Anleitung ist ein Beitrag aus der Community und wird nicht vom Open WebUI-Team unterstützt. Sie dient lediglich als Demonstration, wie Sie Open WebUI für Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Schauen Sie sich die Anleitung zum Beitragen an.
:::

# 🔗 Redis Websocket-Unterstützung

## Überblick

Diese Dokumentationsseite beschreibt die Schritte, die erforderlich sind, um Redis mit Open WebUI für Websocket-Unterstützung zu integrieren. Durch das Befolgen dieser Schritte können Sie die Websocket-Funktionalität in Ihrer Open WebUI-Instanz aktivieren und so eine Echtzeitkommunikation und -aktualisierung zwischen Clients und Ihrer Anwendung ermöglichen.

### Voraussetzungen

* Eine gültige Open WebUI-Instanz (ab Version 1.0 oder höher)
* Ein Redis-Container (wir verwenden in diesem Beispiel `docker.io/valkey/valkey:8.0.1-alpine`, der auf der neuesten Redis 7.x-Version basiert)
* Docker Compose (Version 2.0 oder höher) auf Ihrem System installiert
* Ein Docker-Netzwerk zur Kommunikation zwischen Open WebUI und Redis
* Grundkenntnisse in Docker, Redis und Open WebUI

## Redis einrichten

Um Redis für die Websocket-Unterstützung einzurichten, müssen Sie eine `docker-compose.yml`-Datei mit folgendem Inhalt erstellen:

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Hinweise

Die `ports`-Direktive ist in dieser Konfiguration nicht enthalten, da sie in den meisten Fällen nicht notwendig ist. Der Redis-Dienst ist dennoch innerhalb des Docker-Netzwerks vom Open WebUI-Dienst aus zugänglich. Wenn Sie jedoch auf die Redis-Instanz außerhalb des Docker-Netzwerks zugreifen müssen (z. B. zu Debugging- oder Überwachungszwecken), können Sie die `ports`-Direktive hinzufügen, um den Redis-Port freizugeben (z. B. `6379:6379`).

Die obige Konfiguration richtet einen Redis-Container mit dem Namen `redis-valkey` ein und bindet ein Volume für die Datenpersistenz ein. Die `healthcheck`-Direktive stellt sicher, dass der Container neu gestartet wird, falls er nicht auf den `ping`-Befehl antwortet. Die `--save 30 1`-Option speichert die Redis-Datenbank alle 30 Minuten, wenn sich mindestens ein Schlüssel geändert hat.

:::

Um ein Docker-Netzwerk zur Kommunikation zwischen Open WebUI und Redis zu erstellen, führen Sie den folgenden Befehl aus:

```bash
docker network create openwebui-network
```

## Open WebUI konfigurieren

Um die Websocket-Unterstützung in Open WebUI zu aktivieren, müssen Sie die folgenden Umgebungsvariablen für Ihre Open WebUI-Instanz setzen:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

Diese Umgebungsvariablen aktivieren die Websocket-Unterstützung, legen Redis als Websocket-Manager fest und definieren die Redis-URL. Stellen Sie sicher, dass Sie den Wert von `WEBSOCKET_REDIS_URL` durch die tatsächliche IP-Adresse Ihrer Redis-Instanz ersetzen.

Wenn Sie Open WebUI mit Docker ausführen, müssen Sie es mit demselben Docker-Netzwerk verbinden:

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

Ersetzen Sie `127.0.0.1` durch die tatsächliche IP-Adresse Ihres Redis-Containers im Docker-Netzwerk.

## Überprüfung

Wenn Sie Redis ordnungsgemäß eingerichtet und Open WebUI konfiguriert haben, sollte beim Starten Ihrer Open WebUI-Instanz die folgende Protokollmeldung angezeigt werden:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

Dies bestätigt, dass Open WebUI Redis zur Websocket-Verwaltung verwendet. Sie können auch den `docker exec`-Befehl verwenden, um zu überprüfen, ob die Redis-Instanz läuft und Verbindungen akzeptiert:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

Dieser Befehl sollte `PONG` ausgeben, wenn die Redis-Instanz korrekt läuft. Falls dieser Befehl fehlschlägt, können Sie stattdessen diesen Befehl ausprobieren:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Fehlerbehebung

Wenn Sie Probleme mit Redis oder der Websocket-Unterstützung in Open WebUI haben, können Sie die folgenden Ressourcen zur Fehlerbehebung nutzen:

* [Redis-Dokumentation](https://redis.io/docs)
* [Docker Compose-Dokumentation](https://docs.docker.com/compose/overview/)
* [sysctl-Dokumentation](https://man7.org/linux/man-pages/man8/sysctl.8.html)
