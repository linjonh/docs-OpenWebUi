---
sidebar_position: 5
title: "📜 Registro en Open WebUI"
---

# Comprender el registro en Open WebUI 🪵

El registro es esencial para depurar, monitorear y comprender cómo está funcionando Open WebUI. Esta guía explica cómo funciona el registro tanto en el **cliente del navegador** (frontend) como en el **servidor de aplicaciones/backend**.

## 🖥️ Registro del cliente del navegador (Frontend)

Para el desarrollo y depuración del frontend, Open WebUI utiliza el registro estándar de la consola del navegador. Esto significa que puedes ver los registros directamente dentro de las herramientas de desarrollo integradas de tu navegador web.

**Cómo acceder a los registros del navegador:**

1. **Abrir herramientas de desarrollo:** En la mayoría de los navegadores, puedes abrir las herramientas de desarrollo mediante:
   - **Hacer clic derecho** en cualquier lugar de la página de Open WebUI y seleccionar "Inspeccionar" o "Inspeccionar elemento".
   - Presionar **F12** (o Cmd+Opt+I en macOS).

2. **Navegar a la pestaña "Consola":** Dentro del panel de herramientas de desarrollo, busca y haz clic en la pestaña "Consola".

**Tipos de registros del navegador:**

Open WebUI utiliza principalmente [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) de [JavaScript](https://developer.mozilla.org/) para el registro del lado del cliente. Verás varios tipos de mensajes en la consola, incluyendo:

- **Mensajes informativos:** Flujo general de la aplicación y estado.
- **Advertencias:** Problemas potenciales o errores no críticos.
- **Errores:** Problemas que podrían estar afectando la funcionalidad.

**Herramientas de desarrollo específicas del navegador:**

Los diferentes navegadores ofrecen herramientas de desarrollo ligeramente diferentes, pero todos proporcionan una consola para ver los registros de JavaScript. Aquí tienes enlaces a la documentación de los navegadores más populares:

- **[Blink] Chrome/Chromium (por ejemplo, Chrome, Edge):** [Documentación de Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox:** [Documentación de herramientas de desarrollo de Firefox](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari:** [Documentación de herramientas de desarrollo de Safari](https://developer.apple.com/safari/tools/)

## ⚙️ Registro en el servidor de aplicaciones/backend (Python)

El backend de Open WebUI utiliza el módulo integrado `logging` de Python para registrar eventos e información en el lado del servidor. Estos registros son cruciales para comprender el comportamiento del servidor, diagnosticar errores y monitorear el rendimiento.

**Conceptos clave:**

- **Módulo `logging` de Python:** Open WebUI aprovecha la biblioteca estándar `logging` de Python. Si estás familiarizado con el registro en Python, esta sección te resultará sencilla. (Para información más detallada, consulta la [documentación de registro en Python](https://docs.python.org/3/howto/logging.html#logging-levels)).
- **Salida en la consola:** Por defecto, los registros del backend se envían a la consola (salida estándar), lo que los hace visibles en tu terminal o registros del contenedor de Docker.
- **Niveles de registro:** Los niveles de registro controlan la cantidad de detalles de los registros. Puedes configurar Open WebUI para mostrar más o menos información detallada según estos niveles.

### 🚦 Explicación de los niveles de registro

El registro en Python utiliza una jerarquía de niveles para categorizar los mensajes de registro según su gravedad. Aquí tienes un desglose de los niveles, de mayor a menor gravedad:

| Nivel       | Valor numérico | Descripción                                                                 | Caso de uso                                                                 |
| ----------- | ------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `CRITICAL`  | 50            | **Errores graves** que pueden llevar a la terminación de la aplicación.      | Fallos catastróficos, corrupción de datos.                                  |
| `ERROR`     | 40            | **Errores** que indican problemas pero la aplicación podría seguir funcionando. | Errores recuperables, operaciones fallidas.                                 |
| `WARNING`   | 30            | **Problemas potenciales** o situaciones inesperadas que deberían investigarse. | Advertencias de depreciación, restricciones de recursos.                    |
| `INFO`      | 20            | **Mensajes informativos generales** sobre la operación de la aplicación.     | Mensajes de inicio, eventos clave, flujo normal de operación.               |
| `DEBUG`     | 10            | **Información detallada para la depuración** destinada a desarrolladores.    | Llamadas de funciones, valores de variables, pasos detallados de ejecución. |
| `NOTSET`    | 0             | **Todos los mensajes se registran.** (Usualmente predeterminado a `WARNING` si no se establece). | Útil para capturar absolutamente todo, típicamente para depuración muy específica. |

**Nivel predeterminado:** El nivel de registro predeterminado de Open WebUI es `INFO`.

### 🌍 Nivel de registro global (`GLOBAL_LOG_LEVEL`)

Puedes cambiar el nivel de registro **global** para todo el backend de Open WebUI utilizando la variable de entorno `GLOBAL_LOG_LEVEL`. Esta es la forma más sencilla de controlar la cantidad de detalles en los registros.

**Cómo funciona:**

Configurar `GLOBAL_LOG_LEVEL` ajusta el logger raíz en Python, afectando a todos los loggers en Open WebUI y potencialmente a algunas bibliotecas de terceros que usan [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig). Utiliza `logging.basicConfig(force=True)`, lo que significa que sobrescribirá cualquier configuración existente del logger raíz.

**Ejemplo: Configuración a `DEBUG`**

- **Parámetro de Docker:**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**Impacto:** Configurar `GLOBAL_LOG_LEVEL` a `DEBUG` producirá los registros más detallados, incluyendo información útil para desarrollo y resolución de problemas. Para entornos de producción, `INFO` o `WARNING` podrían ser más apropiados para reducir el volumen de registros.

### ⚙️ Niveles de registro específicos de la aplicación/backend

Para un control más granular, Open WebUI proporciona variables de entorno para configurar niveles de registro para componentes específicos del backend. La gestión de registros es una tarea en progreso, pero se ofrece cierto nivel de control utilizando estas variables de entorno. Estas permiten ajustar los registros para diferentes partes de la aplicación.

**Variables de entorno disponibles:**

| Variable de Entorno  | Componente/Módulo                                                   | Descripción                                                                                                 |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | Procesamiento de audio                                              | Registro relacionado con la transcripción de audio (faster-whisper), texto a habla (TTS) y manejo de audio. |
| `COMFYUI_LOG_LEVEL`  | Integración de ComfyUI                                             | Registro de interacciones con ComfyUI, si estás utilizando esta integración.                               |
| `CONFIG_LOG_LEVEL`   | Gestión de configuración                                           | Registro relacionado con la carga y procesamiento de archivos de configuración de Open WebUI.              |
| `DB_LOG_LEVEL`       | Operaciones de base de datos (Peewee)                              | Registro de interacciones con bases de datos utilizando el ORM Peewee (Object-Relational Mapper).          |
| `IMAGES_LOG_LEVEL`   | Generación de imágenes (AUTOMATIC1111/Stable Diffusion)           | Registro para tareas de generación de imágenes, especialmente al usar la integración de AUTOMATIC1111 Stable Diffusion. |
| `MAIN_LOG_LEVEL`     | Ejecución principal de la aplicación (Logger raíz)                | Registro desde el punto de entrada principal de la aplicación y el logger raíz.                           |
| `MODELS_LOG_LEVEL`   | Gestión de modelos                                                | Registro relacionado con la carga, gestión e interacción con modelos de lenguaje (LLMs), incluyendo la autenticación. |
| `OLLAMA_LOG_LEVEL`   | Integración del backend Ollama                                     | Registro de la comunicación e interacción con el backend Ollama.                                          |
| `OPENAI_LOG_LEVEL`   | Integración de la API de OpenAI                                   | Registro de interacciones con la API de OpenAI (por ejemplo, para modelos como GPT).                       |
| `RAG_LOG_LEVEL`      | Generación aumentada por recuperación (RAG)                       | Registro del flujo de trabajo RAG, incluyendo la base de datos de vectores Chroma y Sentence-Transformers. |
| `WEBHOOK_LOG_LEVEL`  | Webhook de autenticación                                           | Registro extendido para la funcionalidad del webhook de autenticación.                                     |

**Cómo usar:**

Puedes configurar estas variables de entorno de la misma manera que `GLOBAL_LOG_LEVEL` (parámetros de Docker, sección `environment` de Docker Compose). Por ejemplo, para obtener registros más detallados sobre las interacciones con Ollama, podrías configurar:

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**Nota importante:** A diferencia de `GLOBAL_LOG_LEVEL`, estas variables específicas de la aplicación podrían no afectar el registro de *todos* los módulos de terceros. Principalmente controlan los registros dentro del código base de Open WebUI.

Al entender y utilizar estos mecanismos de registro, puedes monitorear, depurar y obtener información eficaz sobre tu instancia de Open WebUI.
