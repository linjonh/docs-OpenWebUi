## Mise à jour

Pour mettre à jour votre installation Docker locale vers la dernière version, vous pouvez utiliser **Watchtower** ou mettre à jour manuellement le conteneur.

### Option 1 : Utiliser Watchtower

Avec [Watchtower](https://containrrr.dev/watchtower/), vous pouvez automatiser le processus de mise à jour :

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(Remplacez `open-webui` par le nom de votre conteneur s'il est différent.)_

### Option 2 : Mise à jour manuelle

1. Arrêtez et supprimez le conteneur actuel :

   ```bash
   docker rm -f open-webui
   ```

2. Récupérez la dernière version :

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. Redémarrez le conteneur :

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

Les deux méthodes permettent de mettre à jour et de faire fonctionner votre instance Docker avec la dernière version.
