
# Usando Podman

Podman es un motor de contenedores sin demonio para desarrollar, gestionar y ejecutar contenedores OCI.

## Comandos Básicos

- **Ejecutar un Contenedor:**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **Listar Contenedores Ejecutándose:**

  ```bash
  podman ps
  ```

## Redes con Podman

Si surgen problemas de red, utiliza slirp4netns para ajustar la configuración de la red del pod y permitir que el contenedor acceda a los puertos de tu computadora.

Asegúrate de tener [slirp4netns instalado](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install), elimina el contenedor anterior si existe utilizando `podman rm` y empieza un nuevo contenedor con

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

Si estás utilizando Ollama desde tu computadora (no ejecutándose dentro de un contenedor),

Una vez dentro de open-webui, navega a Configuración > Configuración de Administrador > Conexiones y crea una nueva conexión API de Ollama a `http://10.0.2.2:[OLLAMA PORT]`. Por defecto, el puerto de Ollama es 11434.


Consulta la [documentación de Podman](https://podman.io/) para configuraciones avanzadas.
