## Schnellstart mit Docker 🐳

Befolgen Sie diese Schritte, um Open WebUI mit Docker zu installieren.

## Schritt 1: Open WebUI-Image abrufen

Beginnen Sie damit, das neueste Open WebUI-Docker-Image aus dem GitHub Container-Register abzurufen.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## Schritt 2: Container ausführen

Führen Sie den Container mit den Standardeinstellungen aus. Dieser Befehl beinhaltet eine Volumen-Mapping-Option, um eine dauerhafte Datenspeicherung sicherzustellen.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### Wichtige Flags

- **Volumen-Mapping (`-v open-webui:/app/backend/data`)**: Stellt die dauerhafte Speicherung Ihrer Daten sicher. Dies verhindert Datenverluste zwischen Container-Neustarts.
- **Port-Mapping (`-p 3000:8080`)**: Stellt die WebUI an Port 3000 Ihrer lokalen Maschine bereit.

### Verwendung von GPU-Unterstützung

Für Nvidia-GPU-Unterstützung fügen Sie `--gpus all` zum `docker run`-Befehl hinzu:

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### Einzelbenutzermodus (Login deaktivieren)

Um die Anmeldeseite für eine Einzelbenutzer-Einrichtung zu umgehen, setzen Sie die Umgebungsvariable `WEBUI_AUTH` auf `False`:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
Sie können nach dieser Änderung nicht mehr zwischen Einzelbenutzermodus und Mehrbenutzermodus wechseln.
:::

#### Erweiterte Konfiguration: Verbindung zu Ollama auf einem anderen Server

Um Open WebUI mit einem Ollama-Server auf einem anderen Host zu verbinden, fügen Sie die Umgebungsvariable `OLLAMA_BASE_URL` hinzu:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## Zugriff auf die WebUI

Sobald der Container läuft, können Sie auf Open WebUI zugreifen unter:

[http://localhost:3000](http://localhost:3000)

Für detaillierte Hilfe zu jedem Docker-Flag siehe [Dokumentation von Docker](https://docs.docker.com/engine/reference/commandline/run/).
