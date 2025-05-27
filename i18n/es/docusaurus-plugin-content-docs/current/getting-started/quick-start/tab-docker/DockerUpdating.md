## Actualización

Para actualizar tu instalación local de Docker a la versión más reciente, puedes usar **Watchtower** o actualizar el contenedor manualmente.

### Opción 1: Usando Watchtower

Con [Watchtower](https://containrrr.dev/watchtower/), puedes automatizar el proceso de actualización:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(Sustituye `open-webui` por el nombre de tu contenedor si es diferente.)_

### Opción 2: Actualización manual

1. Detén y elimina el contenedor actual:

   ```bash
   docker rm -f open-webui
   ```

2. Descarga la última versión:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. Vuelve a iniciar el contenedor:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

Ambos métodos actualizarán tu instancia de Docker y la harán funcionar con la última versión disponible.
