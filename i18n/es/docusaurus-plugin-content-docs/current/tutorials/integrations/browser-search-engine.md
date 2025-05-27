---
sidebar_position: 16
title: "🌐 Motor de búsqueda del navegador"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración sobre cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# Integración del motor de búsqueda del navegador

Open WebUI permite integrarse directamente en tu navegador web. Este tutorial te guiará a través del proceso de configurar Open WebUI como un motor de búsqueda personalizado, permitiéndote ejecutar consultas fácilmente desde la barra de direcciones de tu navegador.

## Configurar Open WebUI como un motor de búsqueda

### Prerrequisitos

Antes de comenzar, asegúrate de que:

- Tienes Chrome u otro navegador compatible instalado.
- La variable de entorno `WEBUI_URL` está configurada correctamente, ya sea utilizando variables de entorno de Docker o en el archivo `.env` según se especifica en la guía de [Introducción](/getting-started/env-configuration).

### Paso 1: Configura la variable de entorno WEBUI_URL

Configurar la variable de entorno `WEBUI_URL` asegura que tu navegador sepa dónde dirigir las consultas.

#### Usando variables de entorno de Docker

Si estás ejecutando Open WebUI utilizando Docker, puedes configurar la variable de entorno en tu comando `docker run`:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<tu-url-de-open-webui>" \
  ghcr.io/open-webui/open-webui:main
```

Alternativamente, puedes agregar la variable a tu archivo `.env`:

```plaintext
WEBUI_URL=https://<tu-url-de-open-webui>
```

### Paso 2: Agrega Open WebUI como un motor de búsqueda personalizado

### Para Chrome

1. Abre Chrome y navega a **Configuración**.
2. Selecciona **Motor de búsqueda** en la barra lateral, luego haz clic en **Administrar motores de búsqueda**.
3. Haz clic en **Agregar** para crear un nuevo motor de búsqueda.
4. Completa los detalles de la siguiente manera:
    - **Motor de búsqueda**: Open WebUI Search
    - **Palabra clave**: webui (o cualquier palabra clave que prefieras)
    - **URL con %s en lugar de la consulta**:

      ```
      https://<tu-url-de-open-webui>/?q=%s
      ```

5. Haz clic en **Agregar** para guardar la configuración.

### Para Firefox

1. Ve a Open WebUI en Firefox.
2. Expande la barra de direcciones haciendo clic en ella.
3. Haz clic en el ícono de más que está dentro de un círculo verde en la parte inferior de la barra de direcciones expandida. Esto agrega la búsqueda de Open WebUI a los motores de búsqueda en tus preferencias.

Alternativamente:

1. Ve a Open WebUI en Firefox.
2. Haz clic derecho en la barra de direcciones.
3. Selecciona "Agregar Open WebUI" (o similar) en el menú contextual.

### Opcional: Usando modelos específicos

Si deseas utilizar un modelo específico para tu búsqueda, modifica el formato de la URL para incluir el ID del modelo:

```
https://<tu-url-de-open-webui>/?models=<id_del_modelo>&q=%s
```

**Nota:** El ID del modelo deberá estar codificado en la URL. Caracteres especiales como espacios o barras deben ser codificados (por ejemplo, `mi modelo` se convierte en `mi%20modelo`).

## Ejemplo de uso

Una vez que el motor de búsqueda esté configurado, puedes realizar búsquedas directamente desde la barra de direcciones. Simplemente escribe tu palabra clave elegida seguida de tu consulta:

```
webui tu consulta de búsqueda
```

Este comando te redirigirá a la interfaz de Open WebUI con los resultados de tu búsqueda.

## Solución de problemas

Si encuentras algún problema, verifica lo siguiente:

- Asegúrate de que `WEBUI_URL` esté configurada correctamente y apunte a una instancia válida de Open WebUI.
- Verifica que el formato de la URL del motor de búsqueda esté ingresado correctamente en la configuración de tu navegador.
- Confirma que tu conexión a internet está activa y que el servicio de Open WebUI está funcionando correctamente.
