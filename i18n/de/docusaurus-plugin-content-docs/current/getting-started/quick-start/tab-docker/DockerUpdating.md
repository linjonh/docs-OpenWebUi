## Aktualisierung

Um Ihre lokale Docker-Installation auf die neueste Version zu aktualisieren, können Sie entweder **Watchtower** verwenden oder den Container manuell aktualisieren.

### Option 1: Verwendung von Watchtower

Mit [Watchtower](https://containrrr.dev/watchtower/) können Sie den Aktualisierungsprozess automatisieren:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(Ersetzen Sie `open-webui` durch den Namen Ihres Containers, falls dieser unterschiedlich ist.)_

### Option 2: Manuelle Aktualisierung

1. Stoppen und entfernen Sie den aktuellen Container:

   ```bash
   docker rm -f open-webui
   ```

2. Holen Sie die neueste Version:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. Starten Sie den Container erneut:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

Beide Methoden aktualisieren Ihre Docker-Instanz und bringen sie mit dem neuesten Build wieder zum Laufen.
