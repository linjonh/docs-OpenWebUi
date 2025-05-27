---
sidebar_position: 20
title: "💥 Monitoreo y Depuración con Langfuse"
---

# Integración de Langfuse con Open WebUI

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) ofrece observabilidad y evaluaciones de código abierto para Open WebUI. Al habilitar la integración con Langfuse, puedes rastrear los datos de tu aplicación con Langfuse para desarrollar, monitorear y mejorar el uso de Open WebUI, incluyendo:

- [Trazas](https://langfuse.com/docs/tracing) de la aplicación
- Patrones de uso
- Datos de costos por usuario y modelo
- Reproducción de sesiones para depurar problemas
- [Evaluaciones](https://langfuse.com/docs/scores/overview)

## Cómo integrar Langfuse con Open WebUI

![Integración de Langfuse](https://langfuse.com/images/docs/openwebui-integration.gif)
_Pasos de integración de Langfuse_

[Pipelines](https://github.com/open-webui/pipelines/) en Open WebUI es un marco independiente de interfaz de usuario para plugins de la API de OpenAI. Permite la inyección de plugins que interceptan, procesan y reenvían solicitudes de usuario al LLM final, permitiendo un control y personalización mejorados del manejo de solicitudes.

Para rastrear los datos de tu aplicación con Langfuse, puedes usar el [pipeline de Langfuse](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py), que permite la monitorización y análisis en tiempo real de las interacciones de mensajes.

## Guía Rápida

### Paso 1: Configura Open WebUI

Asegúrate de tener Open WebUI en funcionamiento. Para hacerlo, revisa la [documentación de Open WebUI](https://docs.openwebui.com/).

### Paso 2: Configura Pipelines

Inicia [Pipelines](https://github.com/open-webui/pipelines/) utilizando Docker. Usa el siguiente comando para iniciar Pipelines:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### Paso 3: Conecta Open WebUI con Pipelines

En los _Admin Settings_, crea y guarda una nueva conexión de tipo API de OpenAI con los siguientes detalles:

- **URL:**`http://host.docker.internal:9099` (aquí es donde está ejecutándose el contenedor Docker lanzado anteriormente).
- **Password:** 0p3n-w3bu! (contraseña estándar)

![Configuración de Open WebUI](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### Paso 4: Agregar el Pipeline del Filtro de Langfuse

A continuación, dirígete a _Admin Settings_ -> _Pipelines_ y agrega el Pipeline del Filtro de Langfuse. Especifica que Pipelines está escuchando en`http://host.docker.internal:9099` (como fue configurado previamente) e instala el [Pipeline del Filtro de Langfuse](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py) usando la opción _Install from Github URL_ con la siguiente URL:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

Ahora, ingresa tus claves API de Langfuse a continuación. Si aún no te has registrado en Langfuse, puedes obtener tus claves API creando una cuenta [aquí](https://cloud.langfuse.com).

![Agregar Pipeline de Langfuse en Open WebUI](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**Nota:** Para capturar el uso (conteo de tokens) de los modelos de OpenAI mientras la transmisión está habilitada, debes ir a la configuración del modelo en Open WebUI y marcar la casilla "Usage" [aquí](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586) bajo _Capabilities_._

### Paso 5: Visualiza tus trazas en Langfuse

Ahora puedes interactuar con tu aplicación Open WebUI y ver las trazas en Langfuse.

[Traza de ejemplo](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) en la interfaz de Langfuse:

![Traza de ejemplo de Open WebUI en Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## Aprende más

Para una guía completa sobre Open WebUI Pipelines, visita [este artículo](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/).
