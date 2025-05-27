
# Utilisation de Podman

Podman est un moteur de conteneurs sans démon pour développer, gérer et exécuter des conteneurs OCI.

## Commandes de base

- **Exécuter un conteneur :**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **Lister les conteneurs en cours d'exécution :**

  ```bash
  podman ps
  ```

## Réseautage avec Podman

Si des problèmes de réseau surviennent, utilisez slirp4netns pour ajuster les paramètres réseau du pod afin de permettre au conteneur d'accéder aux ports de votre ordinateur.

Assurez-vous d'avoir [slirp4netns installé](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install), supprimez le conteneur précédent s'il existe avec `podman rm`, et démarrez un nouveau conteneur avec

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

Si vous utilisez Ollama depuis votre ordinateur (et non exécuté à l'intérieur d'un conteneur),

Une fois dans open-webui, accédez à Paramètres > Paramètres d'administration > Connexions et créez une nouvelle connexion API Ollama vers `http://10.0.2.2:[OLLAMA PORT]`. Par défaut, le port Ollama est 11434.


Consultez la [documentation](https://podman.io/) de Podman pour des configurations avancées.
