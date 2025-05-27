---
sidebar_position: 30
title: "🔗 Soporte de Websocket de Redis"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# 🔗 Soporte de Websocket de Redis

## Descripción general

Esta página de documentación describe los pasos necesarios para integrar Redis con Open WebUI para el soporte de websocket. Siguiendo estos pasos, podrá habilitar la funcionalidad de websocket en su instancia de Open WebUI, permitiendo la comunicación en tiempo real y actualizaciones entre los clientes y su aplicación.

### Prerrequisitos

* Una instancia válida de Open WebUI (que ejecute la versión 1.0 o superior)
* Un contenedor Redis (utilizaremos `docker.io/valkey/valkey:8.0.1-alpine` en este ejemplo, que se basa en la última versión de Redis 7.x)
* Docker Composer (versión 2.0 o superior) instalado en su sistema
* Una red Docker para la comunicación entre Open WebUI y Redis
* Conocimientos básicos de Docker, Redis y Open WebUI

## Configurar Redis

Para configurar Redis para soporte de websocket, necesitará crear un archivo `docker-compose.yml` con el siguiente contenido:

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Notas

La directiva `ports` no está incluida en esta configuración, ya que no es necesaria en la mayoría de los casos. El servicio Redis seguirá siendo accesible desde dentro de la red Docker por el servicio Open WebUI. Sin embargo, si necesita acceder a la instancia de Redis desde fuera de la red Docker (por ejemplo, para depuración o monitoreo), puede agregar la directiva `ports` para exponer el puerto de Redis (por ejemplo, `6379:6379`).

La configuración anterior establece un contenedor Redis llamado `redis-valkey` y monta un volumen para la persistencia de datos. La directiva `healthcheck` asegura que el contenedor se reinicie si no responde al comando `ping`. La opción de comando `--save 30 1` guarda la base de datos de Redis en el disco cada 30 minutos si al menos una clave ha cambiado.

:::

Para crear una red Docker para la comunicación entre Open WebUI y Redis, ejecute el siguiente comando:

```bash
docker network create openwebui-network
```

## Configuración de Open WebUI

Para habilitar el soporte de websocket en Open WebUI, necesitará establecer las siguientes variables de entorno para su instancia de Open WebUI:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

Estas variables de entorno habilitan el soporte de websocket, especifican Redis como el gestor de websocket y definen la URL de Redis. Asegúrese de reemplazar el valor de `WEBSOCKET_REDIS_URL` con la dirección IP real de su instancia de Redis.

Cuando ejecute Open WebUI usando Docker, debe conectarlo a la misma red Docker:

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

Reemplace `127.0.0.1` con la dirección IP real de su contenedor Redis en la red Docker.

## Verificación

Si ha configurado correctamente Redis y configurado Open WebUI, debería ver el siguiente mensaje de registro al iniciar su instancia de Open WebUI:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

Esto confirma que Open WebUI está utilizando Redis para la gestión de websocket. También puede usar el comando `docker exec` para verificar que la instancia de Redis está ejecutándose y aceptando conexiones:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

Este comando debería mostrar `PONG` si la instancia de Redis se está ejecutando correctamente. Si este comando falla, puede intentar este otro comando:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Resolución de problemas

Si encuentra problemas con Redis o con el soporte de websocket en Open WebUI, puede consultar los siguientes recursos para la resolución de problemas:

* [Documentación de Redis](https://redis.io/docs)
* [Documentación de Docker Compose](https://docs.docker.com/compose/overview/)
* [Documentación de sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html)
