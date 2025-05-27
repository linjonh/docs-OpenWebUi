## Démarrage rapide avec Docker 🐳

Suivez ces étapes pour installer Open WebUI avec Docker.

## Étape 1 : Récupérer l'image Open WebUI

Commencez par récupérer la dernière image Docker d'Open WebUI depuis le GitHub Container Registry.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## Étape 2 : Exécuter le conteneur

Exécutez le conteneur avec les paramètres par défaut. Cette commande inclut un mappage de volume pour garantir un stockage persistant des données.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### Options importantes

- **Mappage de volume (`-v open-webui:/app/backend/data`)** : Garantit un stockage persistant de vos données. Cela évite les pertes de données lors des redémarrages du conteneur.
- **Mappage de port (`-p 3000:8080`)** : Expose l'interface utilisateur (WebUI) sur le port 3000 de votre machine locale.

### Utilisation du support GPU

Pour utiliser le support GPU Nvidia, ajoutez `--gpus all` à la commande `docker run` :

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### Mode utilisateur unique (désactivation de la connexion)

Pour contourner la page de connexion dans une configuration utilisateur unique, définissez la variable d'environnement `WEBUI_AUTH` sur `False` :

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
Vous ne pouvez pas passer du mode utilisateur unique au mode multi-utilisateurs après ce changement.
:::

#### Configuration avancée : Connexion à Ollama sur un autre serveur

Pour connecter Open WebUI à un serveur Ollama situé sur un autre hôte, ajoutez la variable d'environnement `OLLAMA_BASE_URL` :

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## Accéder à l'interface WebUI

Après le démarrage du conteneur, accédez à Open WebUI à l'adresse :

[http://localhost:3000](http://localhost:3000)

Pour obtenir une aide détaillée sur chaque option Docker, consultez la [documentation de Docker](https://docs.docker.com/engine/reference/commandline/run/).
