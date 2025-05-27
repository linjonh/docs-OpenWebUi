# Configuración de Docker Compose

Usar Docker Compose simplifica la gestión de aplicaciones Docker con múltiples contenedores.

Si no tienes Docker instalado, consulta nuestro [tutorial de instalación de Docker](../../../tutorials/docker-install.md).

Docker Compose requiere un paquete adicional, `docker-compose-v2`.

**Advertencia:** Los tutoriales antiguos de Docker Compose pueden hacer referencia a la sintaxis de la versión 1, que utiliza comandos como `docker-compose build`. Asegúrate de usar la sintaxis de la versión 2, que utiliza comandos como `docker compose build` (nota el espacio en lugar de un guion).

## Ejemplo de `docker-compose.yml`

Aquí tienes un archivo de configuración de ejemplo para configurar Open WebUI con Docker Compose:

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## Iniciando los servicios

Para iniciar tus servicios, ejecuta el siguiente comando:

```bash
docker compose up -d
```

## Script de ayuda

Se incluye un script de ayuda útil llamado `run-compose.sh` con el código base. Este script ayuda a elegir qué archivos de Docker Compose incluir en tu despliegue, simplificando el proceso de configuración.

---

**Nota:** Para soporte de GPU Nvidia, cambia la imagen de `ghcr.io/open-webui/open-webui:main` a `ghcr.io/open-webui/open-webui:cuda` y añade lo siguiente a la definición de tu servicio en el archivo `docker-compose.yml`:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

Esta configuración asegura que tu aplicación pueda aprovechar los recursos de GPU cuando estén disponibles.
