---
sidebar_position: 4100
title: "🦊 Barra lateral del chatbot de IA de Firefox"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribuciones.
:::

## 🦊 Barra lateral del chatbot de IA de Firefox

# Integrar Open WebUI como asistente local de navegador con IA en Mozilla Firefox

## Requisitos previos

Antes de integrar Open WebUI como asistente de navegador con IA en Mozilla Firefox, asegúrate de tener:

* URL de instancia de Open WebUI (local o dominio)
* Navegador Firefox instalado

## Habilitar el chatbot de IA en Firefox

1. Haz clic en el botón de hamburguesa (botón de tres líneas horizontales en la esquina superior derecha, justo debajo del botón `X`)
2. Abre la configuración de Firefox
2. Haz clic en la sección `Firefox Labs`
3. Activa la opción `AI Chatbot`

Alternativamente, puedes habilitar el chatbot de IA a través de la página `about:config` (descrita en la siguiente sección).

## Configuración de la página about:config

1. Escribe `about:config` en la barra de direcciones de Firefox
2. Haz clic en `Acepto el riesgo y continuar`
3. Busca `browser.ml.chat.enabled` y actívalo a `true` si no está habilitado a través de Firefox Labs
4. Busca `browser.ml.chat.hideLocalhost` y cámbialo a `false`

### browser.ml.chat.prompts.#

Para añadir preguntas personalizadas, sigue estos pasos:

1. Busca `browser.ml.chat.prompts.#` (reemplaza `#` con un número, por ejemplo, `0`, `1`, `2`, etc.)
2. Haz clic en el botón `+` para añadir una nueva pregunta
3. Introduce la etiqueta, el valor y el ID de la pregunta (por ejemplo, `{"id":"Mi pregunta", "value": "Esta es mi pregunta personalizada.", "label": "Mi pregunta"}`)
4. Repite el proceso para añadir más preguntas según se desee

### browser.ml.chat.provider

1. Busca `browser.ml.chat.provider`
2. Introduce la URL de tu instancia de Open WebUI, incluyendo cualquier parámetro opcional (por ejemplo, `https://mi-instancia-open-webui.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`)

## Parámetros de URL para Open WebUI

Los siguientes parámetros de URL se pueden usar para personalizar tu instancia de Open WebUI:

### Modelos y selección de modelos

* `models`: Especifica múltiples modelos (lista separada por comas) para la sesión de chat (por ejemplo, `/?models=model1,model2`)
* `model`: Especifica un único modelo para la sesión de chat (por ejemplo, `/?model=model1`)

### Transcripción de YouTube

* `youtube`: Proporciona un ID de video de YouTube para transcribir el video en el chat (por ejemplo, `/?youtube=VIDEO_ID`)

### Búsqueda en la web

* `web-search`: Habilita la funcionalidad de búsqueda en la web configurando este parámetro como `true` (por ejemplo, `/?web-search=true`)

### Selección de herramientas

* `tools` o `tool-ids`: Especifica una lista separada por comas de IDs de herramientas para activar en el chat (por ejemplo, `/?tools=tool1,tool2` o `/?tool-ids=tool1,tool2`)

### Superposición de llamadas

* `call`: Habilita una superposición de video o llamada en la interfaz de chat configurando este parámetro como `true` (por ejemplo, `/?call=true`)

### Pregunta inicial

* `q`: Configura una pregunta o indicación inicial para el chat (por ejemplo, `/?q=Hola%20ahí`)

### Sesiones de chat temporales

* `temporary-chat`: Marca el chat como una sesión temporal configurando este parámetro como `true` (por ejemplo, `/?temporary-chat=true`)

Consulta https://docs.openwebui.com/features/chat-features/url-params para más información sobre los parámetros de URL y cómo usarlos.

## Configuración adicional en about:config

Los siguientes ajustes en `about:config` se pueden ajustar para una mayor personalización:

* `browser.ml.chat.shortcuts`: Habilita atajos personalizados para la barra lateral del chatbot de IA
* `browser.ml.chat.shortcuts.custom`: Habilita teclas de atajo personalizadas para la barra lateral del chatbot de IA
* `browser.ml.chat.shortcuts.longPress`: Configura el retraso para la pulsación larga de teclas de atajo
* `browser.ml.chat.sidebar`: Habilita la barra lateral del chatbot de IA
* `browser.ml.checkForMemory`: Verifica la memoria disponible antes de cargar modelos
* `browser.ml.defaultModelMemoryUsage`: Configura el uso de memoria predeterminado para los modelos
* `browser.ml.enable`: Habilita las funciones de aprendizaje automático en Firefox
* `browser.ml.logLevel`: Configura el nivel de registro para las funciones de aprendizaje automático
* `browser.ml.maximumMemoryPressure`: Configura el umbral máximo de presión de memoria
* `browser.ml.minimumPhysicalMemory`: Configura la memoria física mínima requerida
* `browser.ml.modelCacheMaxSize`: Configura el tamaño máximo de la caché de modelos
* `browser.ml.modelCacheTimeout`: Configura el tiempo de espera para la caché de modelos
* `browser.ml.modelHubRootUrl`: Configura la URL raíz para el hub de modelos
* `browser.ml.modelHubUrlTemplate`: Configura la plantilla de URL para el hub de modelos
* `browser.ml.queueWaitInterval`: Configura el intervalo de espera en la cola
* `browser.ml.queueWaitTimeout`: Configura el tiempo de espera en la cola

## Acceder a la barra lateral del chatbot de IA

Para acceder a la barra lateral del chatbot de IA, usa uno de los siguientes métodos:

* Presiona `CTRL+B` para abrir la barra lateral de marcadores y cambia al chatbot de IA
* Presiona `CTRL+Alt+X` para abrir directamente la barra lateral del chatbot de IA