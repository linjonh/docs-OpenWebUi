---
sidebar_position: 16
title: "🌐 Browser-Suchmaschine"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für spezifische Anwendungsfälle angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Mitwirken an.
:::

# Integration der Suchmaschine im Browser

Open WebUI ermöglicht die direkte Integration in Ihren Webbrowser. Dieses Tutorial führt Sie durch den Prozess, Open WebUI als benutzerdefinierte Suchmaschine einzurichten, damit Sie problemlos Abfragen über die Adressleiste Ihres Browsers ausführen können.

## Einrichtung von Open WebUI als Suchmaschine

### Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass:

- Sie Chrome oder einen anderen unterstützten Browser installiert haben.
- Die Umgebungsvariable `WEBUI_URL` korrekt gesetzt ist, entweder über Docker-Umgebungsvariablen oder in der `.env`-Datei, wie im [Getting Started](/getting-started/env-configuration)-Leitfaden beschrieben.

### Schritt 1: Setzen der WEBUI_URL-Umgebungsvariable

Das Setzen der `WEBUI_URL`-Umgebungsvariable stellt sicher, dass Ihr Browser weiß, wo Abfragen hinleiten sollen.

#### Nutzung von Docker-Umgebungsvariablen

Falls Sie Open WebUI mit Docker ausführen, können Sie die Umgebungsvariable im `docker run`-Befehl setzen:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<your-open-webui-url>" \
  ghcr.io/open-webui/open-webui:main
```

Alternativ können Sie die Variable zu Ihrer `.env`-Datei hinzufügen:

```plaintext
WEBUI_URL=https://<your-open-webui-url>
```

### Schritt 2: Hinzufügen von Open WebUI als benutzerdefinierte Suchmaschine

### Für Chrome

1. Öffnen Sie Chrome und navigieren Sie zu **Einstellungen**.
2. Wählen Sie **Suchmaschine** in der Seitenleiste und klicken Sie dann auf **Suchmaschinen verwalten**.
3. Klicken Sie auf **Hinzufügen**, um eine neue Suchmaschine zu erstellen.
4. Füllen Sie die Details wie folgt aus:
    - **Suchmaschine**: Open WebUI-Suche
    - **Schlüsselwort**: webui (oder ein Schlüsselwort Ihrer Wahl)
    - **URL mit %s anstelle der Abfrage**:

      ```
      https://<your-open-webui-url>/?q=%s
      ```

5. Klicken Sie auf **Hinzufügen**, um die Konfiguration zu speichern.

### Für Firefox

1. Gehen Sie in Firefox zu Open WebUI.
2. Erweitern Sie die Adressleiste, indem Sie darauf klicken.
3. Klicken Sie auf das Plus-Symbol, das unten in der erweiterten Adressleiste in einem grünen Kreis enthalten ist. Dadurch wird die Suche von Open WebUI zu den Suchmaschinen in Ihren Einstellungen hinzugefügt.

Alternativ:

1. Gehen Sie in Firefox zu Open WebUI.
2. Klicken Sie mit der rechten Maustaste auf die Adressleiste.
3. Wählen Sie „Open WebUI hinzufügen“ (oder ähnlich) aus dem Kontextmenü.

### Optional: Verwendung spezifischer Modelle

Wenn Sie ein spezifisches Modell für Ihre Suche verwenden möchten, ändern Sie das URL-Format, um die Modell-ID einzuschließen:

```
https://<your-open-webui-url>/?models=<model_id>&q=%s
```

**Hinweis:** Die Modell-ID muss URL-kodiert sein. Sonderzeichen wie Leerzeichen oder Schrägstriche müssen kodiert werden (z. B. `my model` wird zu `my%20model`).

## Beispielgebrauch

Sobald die Suchmaschine eingerichtet ist, können Sie direkt über die Adressleiste suchen. Geben Sie einfach Ihr gewähltes Schlüsselwort gefolgt von Ihrer Abfrage ein:

```
webui Ihre Suchabfrage
```

Dieser Befehl leitet Sie zur Open WebUI-Oberfläche mit Ihren Suchergebnissen weiter.

## Fehlerbehebung

Falls Sie auf Probleme stoßen, überprüfen Sie Folgendes:

- Stellen Sie sicher, dass `WEBUI_URL` korrekt konfiguriert ist und auf eine gültige Open WebUI-Instanz zeigt.
- Überprüfen Sie, ob das URL-Format der Suchmaschine in den Browsereinstellungen korrekt eingegeben ist.
- Bestätigen Sie, dass Ihre Internetverbindung aktiv ist und der Open WebUI-Dienst reibungslos läuft.
