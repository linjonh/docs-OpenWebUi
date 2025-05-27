
# Podman verwenden

Podman ist eine daemonlose Container-Engine für die Entwicklung, Verwaltung und Ausführung von OCI-Containern.

## Grundlegende Befehle

- **Einen Container ausführen:**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **Liste der laufenden Container anzeigen:**

  ```bash
  podman ps
  ```

## Netzwerk mit Podman

Falls Netzwerkprobleme auftreten, verwenden Sie slirp4netns, um die Netzwerkeinstellungen des Pods anzupassen und dem Container Zugriff auf die Ports Ihres Computers zu ermöglichen.

Stellen Sie sicher, dass Sie [slirp4netns installiert](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install) haben. Entfernen Sie den vorherigen Container, falls dieser existiert, mit `podman rm` und starten Sie einen neuen Container mit

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

Falls Sie Ollama von Ihrem Computer aus verwenden (nicht innerhalb eines Containers ausgeführt),

Navigieren Sie innerhalb von open-webui zu Einstellungen > Admin-Einstellungen > Verbindungen und erstellen Sie eine neue Ollama-API-Verbindung zu `http://10.0.2.2:[OLLAMA PORT]`. Standardmäßig ist der Ollama-Port 11434.


Weitere Informationen zu erweiterten Konfigurationen finden Sie in der Podman [Dokumentation](https://podman.io/).
