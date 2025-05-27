## Inicio Rápido con Docker 🐳

Sigue estos pasos para instalar Open WebUI con Docker.

## Paso 1: Descargar la Imagen de Open WebUI

Comienza descargando la última imagen de Docker de Open WebUI desde el GitHub Container Registry.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## Paso 2: Ejecutar el Contenedor

Ejecuta el contenedor con la configuración predeterminada. Este comando incluye un mapeo de volumen para garantizar almacenamiento persistente de datos.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### Banderas Importantes

- **Mapeo de Volumen (`-v open-webui:/app/backend/data`)**: Garantiza el almacenamiento persistente de tus datos. Esto evita la pérdida de datos entre reinicios del contenedor.
- **Mapeo de Puertos (`-p 3000:8080`)**: Expone el WebUI en el puerto 3000 de tu máquina local.

### Uso con Soporte de GPU

Para soporte de GPU Nvidia, agrega `--gpus all` al comando `docker run`:

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### Modo de Usuario Único (Deshabilitar el Inicio de Sesión)

Para omitir la página de inicio de sesión en una configuración de usuario único, configura la variable de entorno `WEBUI_AUTH` en `False`:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
No puedes cambiar entre el modo de usuario único y el modo de varias cuentas después de este cambio.
:::

#### Configuración Avanzada: Conectar a Ollama en Otro Servidor

Para conectar Open WebUI a un servidor Ollama ubicado en otro host, agrega la variable de entorno `OLLAMA_BASE_URL`:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## Acceder al WebUI

Después de que el contenedor esté en ejecución, accede a Open WebUI en:

[http://localhost:3000](http://localhost:3000)

Para obtener ayuda detallada sobre cada bandera de Docker, consulta la [documentación de Docker](https://docs.docker.com/engine/reference/commandline/run/).
