---
sidebar_position: 4
title: "🌍 Configuración de Variables de Entorno"
---


## Visión General

Open WebUI proporciona una gran variedad de variables de entorno que te permiten personalizar y configurar
diferentes aspectos de la aplicación. Esta página sirve como referencia completa para todas las
variables de entorno disponibles, proporcionando sus tipos, valores predeterminados y descripciones.
A medida que se introduzcan nuevas variables, esta página se actualizará para reflejar las opciones de configuración en aumento.

:::info

Esta página está actualizada con la versión de lanzamiento de Open WebUI [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9), pero todavía está en proceso de incluir descripciones más precisas, listar opciones disponibles para las variables de entorno, valores predeterminados y mejorar las descripciones.

:::

### Nota Importante sobre las Variables de Entorno `PersistentConfig`

:::note

Al iniciar Open WebUI por primera vez, todas las variables de entorno se tratan por igual y pueden usarse para configurar la aplicación. Sin embargo, para las variables de entorno marcadas como `PersistentConfig`, sus valores se mantienen y almacenan de forma interna.

Después del primer inicio, si reinicias el contenedor, las variables de entorno `PersistentConfig` ya no usarán los valores externos de las variables de entorno. En su lugar, usarán los valores almacenados internamente.

En contraste, las variables de entorno regulares seguirán actualizándose y aplicándose en cada reinicio posterior.

Puedes actualizar los valores de las variables de entorno `PersistentConfig` directamente desde Open WebUI, y estos cambios se almacenarán internamente. Esto te permite gestionar estos ajustes de configuración independientemente de las variables de entorno externas.

Ten en cuenta que las variables de entorno `PersistentConfig` están claramente marcadas como tal en la documentación a continuación, para que sepas cómo se comportarán.

:::

## App/Backend

Las siguientes variables de entorno son utilizadas por `backend/open_webui/config.py` para proporcionar la configuración de inicio de Open WebUI.
Ten en cuenta que algunas variables pueden tener valores predeterminados diferentes dependiendo de
si estás ejecutando Open WebUI directamente o a través de Docker. Para más información sobre variables de entorno para logging,
consulta nuestra [documentación de logging](https://docs.openwebui.com/getting-started/advanced-topics/logging).

### General

#### `WEBUI_URL`

- Tipo: `str`
- Predeterminado: `http://localhost:3000`
- Descripción: Especifica la URL donde es accesible Open WebUI. Actualmente se utiliza para soporte de motores de búsqueda.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_SIGNUP`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Activa o desactiva la creación de cuentas de usuario.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_LOGIN_FORM`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Activa o desactiva elementos de inicio de sesión como correo electrónico, contraseña, inicio de sesión y "o" (solo cuando `ENABLE_OAUTH_SIGNUP` está configurado en True).
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

:::danger

Esto **solo** debería configurarse en `False` cuando [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup)
también se está utilizando y configurado en `True`. No hacerlo resultará en la imposibilidad de iniciar sesión.

:::

#### `DEFAULT_LOCALE`

- Tipo: `str`
- Predeterminado: `en`
- Descripción: Establece el idioma predeterminado de la aplicación.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `DEFAULT_MODELS`

- Tipo: `str`
- Predeterminado: Cadena vacía (` `), ya que `None`.
- Descripción: Establece un modelo de lenguaje predeterminado.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `DEFAULT_USER_ROLE`

- Tipo: `str`
- Opciones:
  - `pending` - Los nuevos usuarios están pendientes hasta que sus cuentas sean manualmente activadas por un administrador.
  - `user` - Los nuevos usuarios se activan automáticamente con permisos de usuario regular.
  - `admin` - Los nuevos usuarios se activan automáticamente con permisos de administrador.
- Predeterminado: `pending`
- Descripción: Establece el rol predeterminado asignado a los nuevos usuarios.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `PENDING_USER_OVERLAY_TITLE`

- Tipo: `str`
- Predeterminado: Cadena vacía (` `)
- Descripción: Establece un título personalizado para la superposición de usuarios pendientes.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `PENDING_USER_OVERLAY_CONTENT`

- Tipo: `str`
- Predeterminado: Cadena vacía (` `)
- Descripción: Establece un contenido de texto personalizado para la superposición de usuarios pendientes.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_CHANNELS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Activa o desactiva el soporte de canales.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `WEBHOOK_URL`

- Tipo: `str`
- Descripción: Establece un webhook para la integración con Discord/Slack/Microsoft Teams.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_ADMIN_EXPORT`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Controla si los usuarios administradores pueden exportar datos.

#### `ENABLE_ADMIN_CHAT_ACCESS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Permite a los administradores acceder a todos los chats.

#### `ENABLE_USER_WEBHOOKS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita los webhooks de usuario.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RESPONSE_WATERMARK`

- Tipo: `str`
- Predeterminado: Cadena vacía ( )
- Descripción: Establece un texto personalizado que se incluirá al copiar un mensaje en el chat. Ejemplo: `"Este texto es generado por IA"` -> agregará "Este texto es generado por IA" a cada mensaje, al copiarlo.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `THREAD_POOL_SIZE`

- Tipo: `int`
- Predeterminado: `0`
- Descripción: Establece el tamaño del grupo de hilos para llamadas bloqueantes de FastAPI/AnyIO. Por defecto (cuando se establece en 0) FastAPI/AnyIO usa `40` hilos. En caso de grandes instancias y muchos usuarios concurrentes, puede ser necesario aumentar `THREAD_POOL_SIZE` para evitar bloqueos.

#### `SHOW_ADMIN_DETAILS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Alterna si se muestran los detalles del usuario administrador en la interfaz.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ADMIN_EMAIL`

- Tipo: `str`
- Descripción: Establece el correo electrónico del administrador mostrado por `SHOW_ADMIN_DETAILS`
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENV`

- Tipo: `str`
- Opciones:
  - `dev` - Habilita la documentación API de FastAPI en `/docs`
  - `prod` - Configura automáticamente varias variables de entorno
- Predeterminado:
  - **Predeterminado Backend**: `dev`
  - **Predeterminado Docker**: `prod`
- Descripción: Configuración del entorno.

#### `ENABLE_PERSISTENT_CONFIG`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Si se establece en `False`, todas las variables `PersistentConfig` se tratan como variables regulares.

#### `CUSTOM_NAME`

- Tipo: `str`
- Descripción: Establece `WEBUI_NAME` pero consulta **api.openwebui.com** para obtener metadatos.

#### `WEBUI_NAME`

- Tipo: `str`
- Predeterminado: `Open WebUI`
- Descripción: Establece el nombre principal de WebUI. Agrega `(Open WebUI)` si se sobrescribe.

#### `PORT`

- Tipo: `int`
- Predeterminado: `8080`
- Descripción: Establece el puerto para ejecutar Open WebUI.

:::info
Si estás ejecutando la aplicación mediante Python y utilizando el comando `open-webui serve`, no puedes establecer el puerto usando la configuración `PORT`. En su lugar, debes especificarlo directamente como un argumento en la línea de comando usando la opción `--port`. Por ejemplo:

```bash
open-webui serve --port 9999
```

Esto ejecutará el Open WebUI en el puerto `9999`. La variable de entorno `PORT` se ignora en este modo.
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Cuando está habilitado, el sistema guarda cada fragmento de datos del chat transmitido en la base de datos en tiempo real para garantizar la mayor persistencia de datos. Esta característica proporciona una recuperación robusta de datos y permite un seguimiento preciso de las sesiones. Sin embargo, la desventaja es una mayor latencia, ya que guardar en la base de datos introduce un retraso. Deshabilitar esta función puede mejorar el rendimiento y reducir los retrasos, pero se corre el riesgo de perder datos en caso de una falla o caída del sistema. Úsalo según los requisitos y concesiones aceptables de tu aplicación.

#### `BYPASS_MODEL_ACCESS_CONTROL`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Omite el control de acceso del modelo.

#### `WEBUI_BUILD_HASH`

- Tipo: `str`
- Predeterminado: `dev-build`
- Descripción: Se utiliza para identificar el Git SHA de la compilación para lanzamientos.

#### `WEBUI_BANNERS`

- Tipo: `list` de `dict`
- Predeterminado: `[]`
- Descripción: Lista de banners para mostrar a los usuarios. El formato de los banners es:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

:::info

Al establecer esta variable de entorno en un archivo `.env`, asegúrate de escapar las comillas envolviendo todo el valor en comillas dobles y usando comillas escapadas (`\"`) para las comillas internas. Ejemplo:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"Tus mensajes están almacenados.\", \"content\": \"Tus mensajes están almacenados y pueden ser revisados por personas. Los LLMs son propensos a alucinaciones, verifica las fuentes.\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Construye la imagen Docker con soporte para NVIDIA CUDA. Habilita la aceleración de GPU para Whisper local y embeddings.

#### `EXTERNAL_PWA_MANIFEST_URL`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Cuando se define como una URL completamente calificada (por ejemplo: https://path/to/manifest.webmanifest), las solicitudes enviadas a /manifest.json usarán el archivo de manifiesto externo. Cuando no se define, se usará el archivo manifiesto.json predeterminado.

#### `ENABLE_TITLE_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita la generación de títulos de chat.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `LICENSE_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la clave de licencia a utilizar (solo para usuarios empresariales).
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `SSL_ASSERT_FINGERPRINT`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` está configurado como predeterminado.
- Descripción: Especifica la huella digital de SSL que se debe usar.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `DEFAULT_PROMPT_SUGGESTIONS`

- Tipo: `list` de `dict`
- Predeterminado: `[]` (lo que significa usar las sugerencias predeterminadas de aviso integradas)
- Descripción: Lista de sugerencias de avisos. El formato para las sugerencias de avisos es:

```json
[{"title": ["Parte del título 1", "Parte del título 2"], "content": "aviso"}]
```

### Cliente AIOHTTP

#### `AIOHTTP_CLIENT_TIMEOUT`

- Tipo: `int`
- Predeterminado: `300`
- Descripción: Especifica la duración del tiempo de espera en segundos para el cliente AIOHTTP. Esto afecta cosas
como las conexiones a los puntos finales de Ollama y OpenAI.

:::info

Este es el tiempo máximo que el cliente esperará por una respuesta antes de expirar.
Si se configura una cadena vacía ( ), el tiempo de espera se establecerá en `None`, deshabilitando efectivamente el tiempo de espera y
permitiendo que el cliente espere indefinidamente.

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- Tipo: `int`
- Predeterminado: `10`
- Descripción: Configura el tiempo de espera en segundos para obtener la lista de modelos. Esto puede ser útil en casos donde la latencia de la red requiere una mayor duración de tiempo de espera para recuperar con éxito la lista de modelos.

:::note
El AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST está configurado a 10 segundos de forma predeterminada para ayudar a garantizar que todas las conexiones necesarias estén disponibles al abrir la interfaz web. Esta duración permite suficiente tiempo para recuperar la lista de modelos incluso en casos de alta latencia de red. Puedes bajar este valor si se prefieren tiempos de espera más rápidos, pero ten en cuenta que hacerlo puede llevar a que algunas conexiones se pierdan, dependiendo de las condiciones de tu red.
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- Tipo: `int`
- Descripción: Configura el tiempo de espera en segundos para obtener la lista de modelos. Esto puede ser útil en casos donde la latencia de la red requiere una mayor duración de tiempo de espera para recuperar con éxito la lista de modelos.

### Directorios

#### `DATA_DIR`

- Tipo: `str`
- Predeterminado: `./data`
- Descripción: Especifica el directorio base para el almacenamiento de datos, incluidos los archivos subidos, caché, base de datos vectorial, etc.

#### `FONTS_DIR`

- Tipo: `str`
- Descripción: Especifica el directorio para las fuentes.

#### `FRONTEND_BUILD_DIR`

- Tipo: `str`
- Predeterminado: `../build`
- Descripción: Especifica la ubicación de los archivos del frontend compilado.

#### `STATIC_DIR`

- Tipo: `str`
- Predeterminado: `./static`
- Descripción: Especifica el directorio para archivos estáticos, como el favicon.

### Ollama

#### `ENABLE_OLLAMA_API`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita el uso de las APIs de Ollama.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` está en desuso) {#ollama_base_url}

- Tipo: `str`
- Predeterminado: `http://localhost:11434`
- Predeterminado en Docker:
  - Si `K8S_FLAG` está configurado: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - Si `USE_OLLAMA_DOCKER=True`: `http://localhost:11434`
  - De lo contrario: `http://host.docker.internal:11434`
- Descripción: Configura la URL del backend de Ollama.

#### `OLLAMA_BASE_URLS`

- Tipo: `str`
- Descripción: Configura los hosts de backend de Ollama balanceados, separados por `;`. Ver
[`OLLAMA_BASE_URL`](#ollama_base_url). Tiene prioridad sobre [`OLLAMA_BASE_URL`](#ollama_base_url).
- Ejemplo: `http://host-one:11434;http://host-two:11434`
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USE_OLLAMA_DOCKER`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Construye la imagen de Docker con una instancia de Ollama incorporada.

#### `K8S_FLAG`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Si está configurado, asume un despliegue mediante Helm chart y establece [`OLLAMA_BASE_URL`](#ollama_base_url) en `http://ollama-service.open-webui.svc.cluster.local:11434`

### OpenAI

#### `ENABLE_OPENAI_API`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita el uso de las APIs de OpenAI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OPENAI_API_BASE_URL`

- Tipo: `str`
- Predeterminado: `https://api.openai.com/v1`
- Descripción: Configura la URL base de la API de OpenAI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OPENAI_API_BASE_URLS`

- Tipo: `str`
- Descripción: Soporta URLs base de la API de OpenAI balanceadas, separadas por punto y coma.
- Ejemplo: `http://host-one:11434;http://host-two:11434`
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OPENAI_API_KEY`

- Tipo: `str`
- Descripción: Configura la clave API de OpenAI.
- Ejemplo: `sk-124781258123`
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OPENAI_API_KEYS`

- Tipo: `str`
- Descripción: Admite múltiples claves API de OpenAI, separadas por punto y coma.
- Ejemplo: `sk-124781258123;sk-4389759834759834`
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Tareas

#### `TASK_MODEL`

- Tipo: `str`
- Descripción: El modelo predeterminado para tareas como generación de títulos y consultas de búsqueda web
al utilizar modelos Ollama.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `TASK_MODEL_EXTERNAL`

- Tipo: `str`
- Descripción: El modelo predeterminado para tareas como generación de títulos y consultas de búsqueda web
al utilizar endpoints compatibles con OpenAI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Descripción: Prompt a usar al generar títulos de chat.
- Valor predeterminado: El valor de la variable de entorno `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### Tarea:
Genera un título conciso de 3-5 palabras con un emoji que resuma el historial del chat.
### Directrices:
- El título debe representar claramente el tema principal o asunto de la conversación.
- Usa emojis que mejoren la comprensión del tema, pero evita las comillas o formatos especiales.
- Escribe el título en el idioma principal del chat; usa inglés si es multilingüe.
- Prioriza la precisión sobre la creatividad excesiva; mantenlo claro y simple.
### Salida:
Formato JSON: { "title": "tu título conciso aquí" }
### Ejemplos:
- { "title": "📉 Tendencias del Mercado de Valores" },
- { "title": "🍪 Receta Perfecta de Galletas" },
- { "title": "Evolución del Streaming Musical" },
- { "title": "Consejos para Productividad en Trabajo Remoto" },
- { "title": "Inteligencia Artificial en Salud" },
- { "title": "🎮 Perspectivas del Desarrollo de Videojuegos" }
### Historial del Chat:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- Tipo: `str`
- Descripción: Prompt a utilizar al invocar herramientas.
- Valor predeterminado: El valor de la variable de entorno `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`.

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
Herramientas Disponibles: {{TOOLS}}

Tu tarea es elegir y devolver la herramienta(s) correcta(s) de la lista de herramientas disponibles con base en la consulta. Sigue estas pautas:

- Devuelve solo el objeto JSON, sin texto o explicación adicional.

- Si ninguna herramienta coincide con la consulta, devuelve un array vacío: 
   {
     "tool_calls": []
   }

- Si una o más herramientas coinciden con la consulta, construye una respuesta JSON que contenga un array "tool_calls" con objetos que incluyan:
   - "name": El nombre de la herramienta.
   - "parameters": Un diccionario de parámetros requeridos y sus valores correspondientes.

El formato para la respuesta JSON es estrictamente:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Ejecución de Código

#### `ENABLE_CODE_EXECUTION`

- Tipo: `bool`
- Valor predeterminado: `True`
- Descripción: Habilita o deshabilita la ejecución de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_ENGINE`

- Tipo: `str`
- Valor predeterminado: `pyodide`
- Descripción: Especifica el motor de ejecución de código a utilizar.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_URL`

- Tipo: `str`
- Valor predeterminado: `None`
- Descripción: Especifica la URL de Jupyter a usar para la ejecución de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH`

- Tipo: `str`
- Valor predeterminado: `None`
- Descripción: Especifica el método de autenticación de Jupyter a usar para la ejecución de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- Tipo: `str`
- Valor predeterminado: `None`
- Descripción: Especifica el token de autenticación de Jupyter a usar para la ejecución de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- Tipo: `str`
- Valor predeterminado: `None`
- Descripción: Especifica la contraseña de autenticación de Jupyter a usar para la ejecución de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- Tipo: `str`
- Valor predeterminado: Cadena vacía (`' '`), ya que `None` está configurado como predeterminado.
- Descripción: Especifica el tiempo de espera para la ejecución de código en Jupyter.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Intérprete de Código

#### `ENABLE_CODE_INTERPRETER`

- Tipo: `bool`
- Valor predeterminado: `True`
- Descripción: Habilita o deshabilita el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_ENGINE`

- Tipo: `str`
- Predeterminado: `pyodide`
- Descripción: Especifica el motor de interpretación de código a utilizar.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la plantilla de mensaje a utilizar para el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_URL`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica la URL de Jupyter a utilizar para el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica el método de autenticación de Jupyter a utilizar para el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica el token de autenticación de Jupyter a utilizar para el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica la contraseña de autenticación de Jupyter a utilizar para el intérprete de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica el tiempo de espera para el intérprete de código de Jupyter.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Conexiones Directas (OpenAPI/Servidores de Herramientas MCPO)

#### `ENABLE_DIRECT_CONNECTIONS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita conexiones directas.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Autocompletar

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita la generación de autocompletado.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

:::info

Al habilitar `ENABLE_AUTOCOMPLETE_GENERATION`, asegúrate de configurar también `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` y `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` de manera adecuada.

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- Tipo: `int`
- Predeterminado: `-1`
- Descripción: Establece la longitud máxima de entrada para la generación de autocompletado.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Predeterminado: El valor de la variable de entorno `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### Tarea:
Eres un sistema de autocompletar. Continúa el texto en `<text>` basado en el **tipo de completado** en `<type>` y el idioma dado.

### **Instrucciones**:
1. Analiza `<text>` para identificar el contexto y significado.
2. Usa `<type>` para guiar tu salida:
   - **General**: Proporciona una continuación natural y concisa.
   - **Consulta de búsqueda**: Completa como si estuvieras generando una consulta de búsqueda realista.
3. Comienza como si estuvieras directamente continuando `<text>`. No **repitas**, parafrases ni respondas como un modelo. Simplemente completa el texto.
4. Asegúrate de que la continuación:
   - Fluye naturalmente desde `<text>`.
   - Evita repeticiones, explicaciones excesivas o ideas no relacionadas.
5. Si tienes dudas, devuelve: `{ "text": "" }`.

### **Reglas de salida**:
- Responde únicamente en formato JSON: `{ "text": "<your_completion>" }`.

### **Ejemplos**:
#### Ejemplo 1:
Entrada:
<type>General</type>
<text>El sol se estaba poniendo en el horizonte, pintando el cielo</text>
Salida:
{ "text": "con tonos vibrantes de naranja y rosa." }

#### Ejemplo 2:
Entrada:
<type>Consulta de búsqueda</type>
<text>Los restaurantes mejor puntuados en</text>
Salida:
{ "text": "la Ciudad de Nueva York para comida italiana." }

---
### Contexto:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### Salida:
```

- Descripción: Establece la plantilla de mensaje para la generación de autocompletado.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Modelos del Área de Evaluación

#### `ENABLE_EVALUATION_ARENA_MODELS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita los modelos del área de evaluación.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ENABLE_MESSAGE_RATING`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita la función de calificación de mensajes.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ENABLE_COMMUNITY_SHARING`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Controla si se muestra a los usuarios el botón de compartir con la comunidad.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Generación de Etiquetas

#### `ENABLE_TAGS_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita la generación de etiquetas.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Predeterminado: El valor de la variable de entorno `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### Tarea:
Generar de 1 a 3 etiquetas generales que categoricen los temas principales del historial del chat, junto con 1 a 3 etiquetas de subtemas más específicos.

### Directrices:
- Comenzar con dominios de alto nivel (por ejemplo, Ciencia, Tecnología, Filosofía, Arte, Política, Negocios, Salud, Deportes, Entretenimiento, Educación)
- Considerar incluir subcampos/subdominios relevantes si están fuertemente representados en la conversación
- Si el contenido es demasiado corto (menos de 3 mensajes) o demasiado diverso, usar solo ["General"]
- Usar el idioma principal del chat; usar inglés por defecto si es multilingüe
- Priorizar la precisión sobre la especificidad

### Salida:
Formato JSON: { "tags": ["tag1", "tag2", "tag3"] }

### Historial del Chat:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Descripción: Define la plantilla de prompts para la generación de etiquetas.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Restricciones del Endpoint de Claves API

#### `ENABLE_API_KEY`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita la autenticación mediante clave API.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita restricciones del endpoint de claves API para mayor seguridad y configurabilidad.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `API_KEY_ALLOWED_ENDPOINTS`

- Tipo: `str`
- Descripción: Especifica una lista separada por comas de los endpoints API permitidos cuando están habilitadas las restricciones del endpoint de claves API.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

:::note

El valor de `API_KEY_ALLOWED_ENDPOINTS` debe ser una lista separada por comas de URLs de endpoints, como `/api/v1/messages, /api/v1/channels`.

:::

#### `JWT_EXPIRES_IN`

- Tipo: `int`
- Predeterminado: `-1`
- Descripción: Establece el tiempo de expiración del JWT en segundos. Unidades de tiempo válidas: `s`, `m`, `h`, `d`, `w` o `-1` para sin expiración.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

## Variables de Seguridad

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- tipo: `bool`
- Predeterminado: `False`
- Descripción: Reenvía la información del usuario (nombre, ID, correo electrónico, y rol) como X-headers a la API de OpenAI y a la API de Ollama.
Si está habilitado, se reenvían los siguientes encabezados:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Omitir la verificación SSL para RAG en sitios web.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- Tipo: `str`
- Opciones:
  - `lax` - Establece el atributo `SameSite` a lax, permitiendo que las cookies de sesión se envíen con
solicitudes iniciadas por sitios web de terceros.
  - `strict` - Establece el atributo `SameSite` a strict, bloqueando que las cookies de sesión se envíen
con solicitudes iniciadas por sitios web de terceros.
  - `none` - Establece el atributo `SameSite` a none, permitiendo que las cookies de sesión se envíen
con solicitudes iniciadas por sitios web de terceros, pero solo a través de HTTPS.
- Predeterminado: `lax`
- Descripción: Establece el atributo `SameSite` para las cookies de sesión.

:::warning

Cuando `ENABLE_OAUTH_SIGNUP` está habilitado, establecer `WEBUI_SESSION_COOKIE_SAME_SITE` a `strict` puede causar fallos en el inicio de sesión. Esto se debe a que Open WebUI utiliza una cookie de sesión para validar el callback del proveedor OAuth, lo que ayuda a prevenir ataques CSRF.

Sin embargo, una cookie de sesión `strict` no se envía con la solicitud de callback, lo que puede llevar a problemas de inicio de sesión. Si experimenta este problema, use el valor predeterminado `lax`.

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Establece el atributo `Secure` para las cookies de sesión si se establece en `True`.

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- Tipo: `str`
- Opciones:
  - `lax` - Establece el atributo `SameSite` a lax, permitiendo que las cookies de autenticación se envíen con
solicitudes iniciadas por sitios web de terceros.
  - `strict` - Establece el atributo `SameSite` a strict, bloqueando que las cookies de autenticación se envíen
con solicitudes iniciadas por sitios web de terceros.
  - `none` - Establece el atributo `SameSite` a none, permitiendo que las cookies de autenticación se envíen con
solicitudes iniciadas por sitios web de terceros, pero solo a través de HTTPS.
- Predeterminado: `lax`
- Descripción: Establece el atributo `SameSite` para las cookies de autenticación.

:::info

Si el valor no se configura, se utilizará `WEBUI_SESSION_COOKIE_SAME_SITE` como alternativa.

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Establece el atributo `Secure` para las cookies de autenticación si se configura en `True`.

:::info

Si no se establece el valor, se utilizará `WEBUI_SESSION_COOKIE_SECURE` como valor de respaldo.

:::

#### `WEBUI_AUTH`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Esta configuración habilita o deshabilita la autenticación.

:::danger

Si se configura en `False`, la autenticación se desactivará para tu instancia de Open WebUI. Sin embargo, es
importante tener en cuenta que desactivar la autenticación solo es posible en instalaciones nuevas sin
usuarios existentes. Si ya hay usuarios registrados, no puedes deshabilitar la autenticación
directamente. Asegúrate de que no haya usuarios presentes en la base de datos si tienes la intención de desactivar `WEBUI_AUTH`.

:::

#### `WEBUI_SECRET_KEY`

- Tipo: `str`
- Predeterminado: `t0p-s3cr3t`
- Predeterminado en Docker: Generado aleatoriamente en el primer inicio
- Descripción: Sobrescribe la cadena generada aleatoriamente utilizada para el JSON Web Token.

:::info

Al desplegar Open-WebUI en un clúster de múltiples nodos con un balanceador de carga, debes asegurarte de que el valor de `WEBUI_SECRET_KEY` sea el mismo en todas las instancias para permitir que los usuarios continúen trabajando si se recicla un nodo o si su sesión se transfiere a un nodo diferente. Sin esta configuración, los usuarios tendrán que iniciar sesión nuevamente cada vez que cambie el nodo subyacente.

:::

#### `OFFLINE_MODE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el modo offline.

#### `RESET_CONFIG_ON_START`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Restablece el archivo `config.json` al iniciar.

#### `SAFE_MODE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita el modo seguro, que desactiva funciones potencialmente no seguras, desactivando todas las funciones.

#### `CORS_ALLOW_ORIGIN`

- Tipo: `str`
- Predeterminado: `*`
- Descripción: Establece los orígenes permitidos para el intercambio de recursos de origen cruzado (CORS).

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Determina si permitir modelos personalizados definidos en el Hub en sus propios archivos de modelado.

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Determina si permitir modelos personalizados definidos en el Hub en sus propios archivos de modelado para reordenamiento.

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Alterna la actualización automática del modelo Sentence-Transformer.

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Alterna la actualización automática del modelo de reordenamiento.

## Base de Datos Vectorial

#### `VECTOR_DB`

- Tipo: `str`
- Opciones:
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- Predeterminado: `chroma`
- Descripción: Especifica qué sistema de base de datos vectorial usar. Esta configuración determina qué sistema de almacenamiento vectorial se utilizará para gestionar los embeddings.

### ChromaDB

#### `CHROMA_TENANT`

- Tipo: `str`
- Predeterminado: El valor de `chromadb.DEFAULT_TENANT` (una constante en el módulo `chromadb`)
- Descripción: Establece el inquilino para que ChromaDB lo use en embeddings RAG.

#### `CHROMA_DATABASE`

- Tipo: `str`
- Predeterminado: El valor de `chromadb.DEFAULT_DATABASE` (una constante en el módulo `chromadb`)
- Descripción: Establece la base de datos en el inquilino de ChromaDB a utilizar para embeddings RAG.

#### `CHROMA_HTTP_HOST`

- Tipo: `str`
- Descripción: Especifica el nombre del host de un servidor remoto de ChromaDB. Usa una instancia local de ChromaDB si no se configura.

#### `CHROMA_HTTP_PORT`

- Tipo: `int`
- Predeterminado: `8000`
- Descripción: Especifica el puerto de un servidor remoto de ChromaDB.

#### `CHROMA_HTTP_HEADERS`

- Tipo: `str`
- Descripción: Una lista de encabezados HTTP separados por comas para incluir en cada solicitud de ChromaDB.
- Ejemplo: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`.

#### `CHROMA_HTTP_SSL`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Controla si se usa o no SSL para las conexiones del servidor ChromaDB.

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- Tipo: `str`
- Descripción: Especifica un proveedor de autenticación para el servidor remoto de ChromaDB.
- Ejemplo: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- Tipo: `str`
- Descripción: Especifica las credenciales de autenticación para el servidor remoto de ChromaDB.
- Ejemplo: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- Tipo: `str`
- Predeterminado: Cadena vacía (`' '`), ya que `None` se establece como predeterminado.
- Descripción: Especifica la clave de API de Elasticsearch.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ELASTICSEARCH_CA_CERTS`

- Tipo: `str`
- Predeterminado: Cadena vacía (`' '`), ya que `None` se establece como predeterminado.
- Descripción: Especifica la ruta a los certificados CA para Elasticsearch.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ELASTICSEARCH_CLOUD_ID`

- Tipo: `str`
- Predeterminado: Cadena vacía (`' '`), ya que `None` se establece como predeterminado.
- Descripción: Especifica el ID de la nube de Elasticsearch.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ELASTICSEARCH_INDEX_PREFIX`

- Tipo: `str`
- Predeterminado: `open_webui_collections`
- Descripción: Especifica el prefijo para el índice de Elasticsearch.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ELASTICSEARCH_PASSWORD`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` está configurado como predeterminado.
- Descripción: Especifica la contraseña para Elasticsearch.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ELASTICSEARCH_URL`

- Tipo: `str`
- Predeterminado: `https://localhost:9200`
- Descripción: Especifica la URL para la instancia de Elasticsearch.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ELASTICSEARCH_USERNAME`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` está configurado como predeterminado.
- Descripción: Especifica el nombre de usuario para Elasticsearch.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Milvus

#### `MILVUS_URI`

- Tipo: `str`
- Predeterminado: `${DATA_DIR}/vector_db/milvus.db`
- Descripción: Especifica el URI para conectarse a la base de datos vectorial Milvus. Puede apuntar a un servidor Milvus local o remoto según la configuración de implementación.

#### `MILVUS_DB`

- Tipo: `str`
- Predeterminado: `default`
- Descripción: Especifica la base de datos a la que conectarse dentro de una instancia Milvus.

#### `MILVUS_TOKEN`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica un token de conexión opcional para Milvus.

#### `MILVUS_INDEX_TYPE`

- Tipo: `str`
- Predeterminado: `HNSW`
- Opciones: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- Descripción: Especifica el tipo de índice a usar al crear una nueva colección en Milvus. `AUTOINDEX` se recomienda generalmente para Milvus standalone. `HNSW` puede ofrecer mejor rendimiento, pero normalmente requiere una configuración Milvus en clúster.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `MILVUS_METRIC_TYPE`

- Tipo: `str`
- Predeterminado: `COSINE`
- Opciones: `COSINE`, `IP`, `L2`
- Descripción: Especifica el tipo de métrica para la búsqueda de similitud vectorial en Milvus.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `MILVUS_HNSW_M`

- Tipo: `int`
- Predeterminado: `16`
- Descripción: Especifica el parámetro `M` para el tipo de índice HNSW en Milvus. Esto influye en la cantidad de enlaces bidireccionales creados para cada nuevo elemento durante la construcción. Solo aplicable si `MILVUS_INDEX_TYPE` es `HNSW`.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `MILVUS_HNSW_EFCONSTRUCTION`

- Tipo: `int`
- Predeterminado: `100`
- Descripción: Especifica el parámetro `efConstruction` para el tipo de índice HNSW en Milvus. Esto influye en el tamaño de la lista dinámica para los vecinos más cercanos durante la construcción del índice. Solo aplicable si `MILVUS_INDEX_TYPE` es `HNSW`.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `MILVUS_IVF_FLAT_NLIST`

- Tipo: `int`
- Predeterminado: `128`
- Descripción: Especifica el parámetro `nlist` para el tipo de índice IVF_FLAT en Milvus. Este es el número de unidades de clúster. Solo aplicable si `MILVUS_INDEX_TYPE` es `IVF_FLAT`.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita la verificación del certificado de OpenSearch.

#### `OPENSEARCH_PASSWORD`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Establece la contraseña para OpenSearch.

#### `OPENSEARCH_SSL`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita SSL para OpenSearch.

#### `OPENSEARCH_URI`

- Tipo: `str`
- Predeterminado: `https://localhost:9200`
- Descripción: Establece el URI para OpenSearch.

#### `OPENSEARCH_USERNAME`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Establece el nombre de usuario para OpenSearch.

### PGVector

#### `PGVECTOR_DB_URL`

- Tipo: `str`
- Predeterminado: El valor de la variable de entorno `DATABASE_URL`
- Descripción: Establece la URL de la base de datos para el almacenamiento de modelos.

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- Tipo: `str`
- Predeterminado: `1536`
- Descripción: Especifica la longitud máxima del vector para la inicialización de PGVector.

### Qdrant

#### `QDRANT_API_KEY`

- Tipo: `str`
- Descripción: Establece la clave API para Qdrant.

#### `QDRANT_URI`

- Tipo: `str`
- Descripción: Establece el URI para Qdrant.

#### `QDRANT_ON_DISK`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita el uso de almacenamiento memmap (también conocido como en disco).

#### `QDRANT_PREFER_GRPC`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Usa la interfaz gRPC siempre que sea posible.

#### `QDRANT_GRPC_PORT`

- Tipo: `int`
- Predeterminado: `6334`
- Descripción: Establece el número de puerto gRPC para Qdrant.

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita el modo multitenancy para la gestión de colecciones de Qdrant, lo que reduce significativamente el uso de RAM y la sobrecarga computacional consolidando estructuras de datos vectoriales similares. Se recomienda activarlo.

:::info

Esto desconectará todas las colecciones de Qdrant creadas en el patrón anterior, que no es multitenancy. Ve a `Admin Settings` > `Documents` > `Reindex Knowledge Base` para migrar los conocimientos existentes.

Las colecciones de Qdrant creadas en el patrón anterior seguirán consumiendo recursos.

Actualmente, no hay un botón en la interfaz de usuario para solo reiniciar la base de datos vectorial. Si desea migrar el conocimiento a multialquiler:
- Elimine todas las colecciones con el prefijo `open_webui-knowledge` (o el prefijo `open_webui` para eliminar todas las colecciones relacionadas con Open WebUI) utilizando el cliente nativo de Qdrant
- Vaya a `Configuración de administrador` > `Documentos` > `Reindexar base de conocimiento` para migrar la base de conocimiento existente

`Reindexar base de conocimiento` SOLO migrará la base de conocimiento

:::

:::danger

Si decide usar el patrón de multialquiler como predeterminado y no necesita migrar el conocimiento antiguo, vaya a `Configuración de administrador` > `Documentos` para reiniciar las vectores y el conocimiento, lo que eliminará todas las colecciones con el prefijo `open_webui` y todo el conocimiento almacenado.

:::

### Pinecone

Al usar Pinecone como el almacén vectorial, se utilizan las siguientes variables de entorno para controlar su comportamiento. Asegúrese de configurar estas variables en su archivo `.env` o entorno de implementación.

#### `PINECONE_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Establece la clave API utilizada para autenticarse con el servicio Pinecone.

#### `PINECONE_ENVIRONMENT`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el entorno de Pinecone al que conectarse (por ejemplo, `us-west1-gcp`, `gcp-starter`, etc.).

#### `PINECONE_INDEX_NAME`

- Tipo: `str`
- Predeterminado: `open-webui-index`
- Descripción: Define el nombre del índice de Pinecone que se usará para almacenar y consultar incrustaciones vectoriales.

#### `PINECONE_DIMENSION`

- Tipo: `int`
- Predeterminado: `1536`
- Descripción: La dimensionalidad de las incrustaciones vectoriales. Debe coincidir con la dimensión esperada por el índice (comúnmente 768, 1024, 1536 o 3072 según el modelo utilizado).

#### `PINECONE_METRIC`

- Tipo: `str`
- Predeterminado: `cosine`
- Opciones: `cosine`, `dotproduct`, `euclidean`
- Descripción: Especifica la métrica de similitud a usar para las comparaciones vectoriales dentro del índice de Pinecone.

#### `PINECONE_CLOUD`

- Tipo: `str`
- Predeterminado: `aws`
- Opciones: `aws`, `gcp`, `azure`
- Descripción: Especifica el proveedor de la nube donde se aloja el índice de Pinecone.

## Motor de Extracción de Contenido RAG

#### `CONTENT_EXTRACTION_ENGINE`

- Tipo: `str`
- Opciones:
  - Dejar vacío para usar el valor predeterminado
  - `external` - Usar un cargador externo
  - `tika` - Usar un servidor local de Apache Tika
  - `docling` - Usar el motor Docling
  - `document_intelligence` - Usar el motor de Document Intelligence
  - `mistral_ocr` - Usar el motor OCR de Mistral
- Descripción: Establece el motor de extracción de contenido a utilizar para la ingesta de documentos.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `MISTRAL_OCR_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la clave API de Mistral OCR a utilizar.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Establece la URL para el servicio de cargador de documentos externo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Establece la clave API para autenticarse con el servicio de cargador de documentos externo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `TIKA_SERVER_URL`

- Tipo: `str`
- Predeterminado: `http://localhost:9998`
- Descripción: Establece la URL del servidor Apache Tika.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `DOCLING_SERVER_URL`

- Tipo: `str`
- Predeterminado: `http://docling:5001`
- Descripción: Especifica la URL del servidor Docling.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `DOCLING_OCR_ENGINE`

- Tipo: `str`  
- Predeterminado: `tesseract`  
- Descripción: Especifica el motor OCR utilizado por Docling.  
  Los valores compatibles incluyen: `tesseract` (predeterminado), `easyocr`, `ocrmac`, `rapidocr` y `tesserocr`.  
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `DOCLING_OCR_LANG`

- Tipo: `str`  
- Predeterminado: `eng,fra,deu,spa` (al usar el motor predeterminado `tesseract`)  
- Descripción: Especifica el/los idioma(s) OCR que se usarán con el motor `DOCLING_OCR_ENGINE` configurado.  
  El formato y los códigos de idiomas disponibles dependen del motor OCR seleccionado.  
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

## Generación Aumentada por Recuperación (RAG)

#### `RAG_EMBEDDING_ENGINE`

- Tipo: `str`
- Opciones:
  - Dejar vacío para `Predeterminado (SentenceTransformers)` - Usa SentenceTransformers para incrustaciones.
  - `ollama` - Usa la API de Ollama para incrustaciones.
  - `openai` - Usa la API de OpenAI para incrustaciones.
- Descripción: Selecciona un motor de incrustaciones para usar con RAG.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `RAG_EMBEDDING_MODEL`

- Tipo: `str`
- Predeterminado: `sentence-transformers/all-MiniLM-L6-v2`
- Descripción: Establece un modelo para incrustaciones. Localmente, se utiliza un modelo Sentence-Transformer.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_RAG_HYBRID_SEARCH`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita el uso de búsqueda de conjunto con `BM25` + `ChromaDB`, con reordenamiento utilizando modelos de `sentence_transformers`.

- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_TOP_K`

- Tipo: `int`
- Predeterminado: `3`
- Descripción: Define el número predeterminado de resultados a considerar para el embedding al utilizar RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_TOP_K_RERANKER`

- Tipo: `int`
- Predeterminado: `3`
- Descripción: Define el número predeterminado de resultados a considerar para el reordenador al utilizar RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_RELEVANCE_THRESHOLD`

- Tipo: `float`
- Predeterminado: `0.0`
- Descripción: Establece el umbral de relevancia para considerar documentos al usarlos con el reordenamiento.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_HYBRID_BM25_WEIGHT`

- Tipo: `float`
- Predeterminado: `0.5`
- Descripción: Define el peso asignado a la búsqueda por palabras clave (BM25) durante la búsqueda híbrida. 1 significa solo búsqueda por palabras clave, 0 significa solo búsqueda por vectores.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_TEMPLATE`

- Tipo: `str`
- Predeterminado: El valor de la variable de entorno `DEFAULT_RAG_TEMPLATE`.

`DEFAULT_RAG_TEMPLATE`:

```
### Tarea:
Responde a la consulta del usuario utilizando el contexto proporcionado, incorporando citas en línea en el formato [id] **solo cuando la etiqueta <source> incluya explícitamente un atributo id** (por ejemplo, <source id="1">).

### Directrices:
- Si no sabes la respuesta, indícalo claramente.
- Si hay incertidumbre, solicita al usuario una aclaración.
- Responde en el mismo idioma que la consulta del usuario.
- Si el contexto es ilegible o de mala calidad, informa al usuario y proporciona la mejor respuesta posible.
- Si la respuesta no está presente en el contexto pero posees el conocimiento, explícaselo al usuario y proporciona la respuesta basándote en tu comprensión.
- **Solo incluye citas en línea usando [id] (por ejemplo, [1], [2]) cuando la etiqueta <source> incluya un atributo id.**
- No cites si la etiqueta <source> no contiene un atributo id.
- No uses etiquetas XML en tu respuesta.
- Asegúrate de que las citas sean concisas y directamente relacionadas con la información proporcionada.

### Ejemplo de cita:
Si el usuario pregunta sobre un tema específico y la información se encuentra en una fuente con un atributo id proporcionado, la respuesta debe incluir la cita como en el siguiente ejemplo:
* "Según el estudio, el método propuesto aumenta la eficiencia en un 20% [1]."

### Salida:
Proporciona una respuesta clara y directa a la consulta del usuario, incluyendo citas en línea en el formato [id] solo cuando la etiqueta <source> con el atributo id esté presente en el contexto.

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- Descripción: Plantilla para usar al inyectar documentos RAG en la finalización del chat.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_TEXT_SPLITTER`

- Tipo: `str`
- Opciones:
  - `character`
  - `token`
- Predeterminado: `character`
- Descripción: Define el divisor de texto para los modelos RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `TIKTOKEN_CACHE_DIR`

- Tipo: `str`
- Predeterminado: `{CACHE_DIR}/tiktoken`
- Descripción: Define el directorio para la caché de TikToken.

#### `TIKTOKEN_ENCODING_NAME`

- Tipo: `str`
- Predeterminado: `cl100k_base`
- Descripción: Define el nombre de codificación para TikToken.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `CHUNK_SIZE`

- Tipo: `int`
- Predeterminado: `1000`
- Descripción: Define el tamaño de los fragmentos de documentos para embeddings.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `CHUNK_OVERLAP`

- Tipo: `int`
- Predeterminado: `100`
- Descripción: Especifica cuánto solapamiento debe haber entre los fragmentos.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `PDF_EXTRACT_IMAGES`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Extrae imágenes de PDFs usando OCR al cargar documentos.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_FILE_MAX_SIZE`

- Tipo: `int`
- Descripción: Define el tamaño máximo de un archivo en megabytes que se puede cargar para la ingestión de documentos.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_FILE_MAX_COUNT`

- Tipo: `int`
- Descripción: Define el número máximo de archivos que se pueden cargar simultáneamente para la ingestión de documentos.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

:::info

Al configurar `RAG_FILE_MAX_SIZE` y `RAG_FILE_MAX_COUNT`, asegúrate de que los valores sean razonables para evitar cargas de archivos excesivas y posibles problemas de rendimiento.

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- Tipo: `list` de `str`
- Predeterminado: `[]` (lo que significa que se permiten todos los tipos de archivos compatibles)
- Descripción: Especifica qué extensiones de archivo están permitidas para subir.

```json
["pdf,docx,txt"]
```

- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_RERANKING_MODEL`

- Tipo: `str`
- Descripción: Establece un modelo para reordenar los resultados. Localmente, se utiliza un modelo Sentence-Transformer.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_OPENAI_API_BASE_URL`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_BASE_URL}`
- Descripción: Establece la URL base de la API de OpenAI para usar en embeddings de RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_OPENAI_API_KEY`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_KEY}`
- Descripción: Establece la clave de la API de OpenAI para usar en embeddings de RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- Tipo: `int`
- Predeterminado: `1`
- Descripción: Establece el tamaño de lote para embeddings de OpenAI.

#### `RAG_EMBEDDING_BATCH_SIZE`

- Tipo: `int`
- Predeterminado: `1`
- Descripción: Define el tamaño de lote para embeddings en modelos RAG (Generador Aumentado por Recuperación).
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_OLLAMA_API_KEY`

- Tipo: `str`
- Descripción: Establece la clave de la API para Ollama API utilizada en modelos RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_OLLAMA_BASE_URL`

- Tipo: `str`
- Descripción: Establece la URL base para Ollama API utilizada en modelos RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Activa o desactiva la generación de consultas de recuperación.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Predeterminado: El valor de la variable de entorno `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### Tarea:
Analiza el historial de chat para determinar la necesidad de generar consultas de búsqueda en el idioma dado. Por defecto, **prioriza generar de 1 a 3 consultas de búsqueda amplias y relevantes** a menos que sea absolutamente seguro que no se necesita información adicional. El objetivo es recuperar información completa, actualizada y valiosa incluso con una mínima incertidumbre. Si no se necesita búsqueda de forma inequívoca, devuelve una lista vacía.

### Directrices:
- Responde **EXCLUSIVAMENTE** con un objeto JSON. Está estrictamente prohibido cualquier forma de comentario adicional, explicación o texto extra.
- Al generar consultas de búsqueda, responde en el formato: { "queries": ["query1", "query2"] }, asegurando que cada consulta sea distinta, concisa y relevante para el tema.
- Si y solo si es totalmente seguro que no se pueden obtener resultados útiles mediante una búsqueda, devuelve: { "queries": [] }.
- Prioriza sugerir consultas de búsqueda si hay **alguna posibilidad** de que puedan proporcionar información útil o actualizada.
- Sé conciso y enfócate en redactar consultas de búsqueda de alta calidad, evitando elaboraciones innecesarias, comentarios o suposiciones.
- La fecha de hoy es: {{CURRENT_DATE}}.
- Prioriza siempre proporcionar consultas prácticas y amplias que maximicen la cobertura de información.

### Salida:
Devuelve estrictamente en formato JSON:
{
  "queries": ["query1", "query2"]
}

### Historial de Chat:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Descripción: Establece la plantilla de solicitud para la generación de consultas.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Omite el proceso de embeddings y recuperación.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el endpoint para inteligencia documental.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la clave para inteligencia documental.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Activa o desactiva la obtención local de web para RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el prefijo para el contenido de embeddings en RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el nombre del campo para el prefijo de embeddings en RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_EMBEDDING_QUERY_PREFIX`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el prefijo para la consulta de embeddings en RAG.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `RAG_FULL_CONTEXT`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Especifica si se debe usar el contexto completo para RAG.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita la integración de Google Drive. Si se establece en verdadero, y `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` están correctamente configurados, Google Drive aparecerá como una opción de carga en la interfaz del chat.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

:::info

Al habilitar `GOOGLE_DRIVE_INTEGRATION`, asegúrate de haber configurado `GOOGLE_DRIVE_CLIENT_ID` y `GOOGLE_DRIVE_API_KEY` correctamente, y de haber revisado los términos de servicio y las pautas de uso de Google.

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- Tipo: `str`
- Descripción: Establece el ID del cliente para Google Drive (el cliente debe estar configurado con la API de Drive y la API Picker habilitadas).
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `GOOGLE_DRIVE_API_KEY`

- Tipo: `str`
- Descripción: Establece la clave de API para la integración de Google Drive.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita la integración de OneDrive.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ONEDRIVE_CLIENT_ID`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el ID del cliente para la integración de OneDrive.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

## Búsqueda Web

#### `ENABLE_WEB_SEARCH`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita la opción de búsqueda web.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `ENABLE_SEARCH_QUERY_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita la generación de consultas de búsqueda.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `WEB_SEARCH_TRUST_ENV`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita el proxy configurado por `http_proxy` y `https_proxy` durante la obtención de contenido de búsqueda web.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `WEB_SEARCH_RESULT_COUNT`

- Tipo: `int`
- Predeterminado: `3`
- Descripción: Número máximo de resultados de búsqueda para rastrear.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- Tipo: `int`
- Predeterminado: `10`
- Descripción: Número de solicitudes concurrentes para rastrear páginas web devueltas por los resultados de búsqueda.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `WEB_SEARCH_ENGINE`

- Tipo: `str`
- Opciones:
  - `searxng`: Utiliza el motor de búsqueda [SearXNG](https://github.com/searxng/searxng).
  - `google_pse`: Utiliza el motor de búsqueda [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/).
  - `brave`: Utiliza el motor de búsqueda [Brave](https://brave.com/search/api/).
  - `kagi`: Utiliza el motor de búsqueda [Kagi](https://www.kagi.com/).
  - `mojeek`: Utiliza el motor de búsqueda [Mojeek](https://www.mojeek.com/).
  - `bocha`: Utiliza el motor de búsqueda Bocha.
  - `serpstack`: Utiliza el motor de búsqueda [Serpstack](https://serpstack.com/).
  - `serper`: Utiliza el motor de búsqueda [Serper](https://serper.dev/).
  - `serply`: Utiliza el motor de búsqueda [Serply](https://serply.io/).
  - `searchapi`: Utiliza el motor de búsqueda [SearchAPI](https://www.searchapi.io/).
  - `serpapi`: Utiliza el motor de búsqueda [SerpApi](https://serpapi.com/).
  - `duckduckgo`: Utiliza el motor de búsqueda [DuckDuckGo](https://duckduckgo.com/).
  - `tavily`: Utiliza el motor de búsqueda [Tavily](https://tavily.com/).
  - `jina`: Utiliza el motor de búsqueda [Jina](https://jina.ai/).
  - `bing`: Utiliza el motor de búsqueda [Bing](https://www.bing.com/).
  - `exa`: Utiliza el motor de búsqueda [Exa](https://exa.ai/).
  - `perplexity`: Utiliza el motor de búsqueda [Perplexity AI](https://www.perplexity.ai/).
  - `sougou`: Utiliza el motor de búsqueda [Sougou](https://www.sogou.com/).
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Omite el proceso de incorporación y recuperación de búsqueda web.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `SEARXNG_QUERY_URL`

- Tipo: `str`
- Descripción: La URL de la [API de búsqueda de SearXNG](https://docs.searxng.org/dev/search_api.html) que admite salida JSON. `<query>` es reemplazado por
la consulta de búsqueda. Ejemplo: `http://searxng.local/search?q=<query>`
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `GOOGLE_PSE_API_KEY`

- Tipo: `str`
- Descripción: Establece la clave de API para el servicio de Google Programmable Search Engine (PSE).
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `GOOGLE_PSE_ENGINE_ID`

- Type: `str`
- Descripción: El ID del motor para el servicio Google Programmable Search Engine (PSE).
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `BRAVE_SEARCH_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Brave Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `KAGI_SEARCH_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Kagi Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `MOJEEK_SEARCH_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Mojeek Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPSTACK_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Serpstack search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPSTACK_HTTPS`

- Type: `bool`
- Predeterminado: `True`
- Descripción: Configura el uso de HTTPS para solicitudes de Serpstack. Las solicitudes de nivel gratuito están restringidas a HTTP solamente.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPER_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Serper search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPLY_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Serply search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SEARCHAPI_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para SearchAPI.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SEARCHAPI_ENGINE`

- Type: `str`
- Descripción: Establece el motor de SearchAPI.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `TAVILY_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Tavily search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `JINA_API_KEY`

- Type: `str`
- Descripción: Establece la clave API para Jina.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `BING_SEARCH_V7_ENDPOINT`

- Type: `str`
- Descripción: Establece el endpoint para Bing Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- Type: `str`
- Predeterminado: `https://api.bing.microsoft.com/v7.0/search`
- Descripción: Establece la clave de suscripción para Bing Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `BOCHA_SEARCH_API_KEY`

- Type: `str`
- Predeterminado: `None`
- Descripción: Establece la clave API para Bocha Search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `EXA_API_KEY`

- Type: `str`
- Predeterminado: `None`
- Descripción: Establece la clave API para Exa search API.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPAPI_API_KEY`

- Type: `str`
- Predeterminado: `None`
- Descripción: Establece la clave API para SerpAPI.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SERPAPI_ENGINE`

- Type: `str`
- Predeterminado: `None`
- Descripción: Especifica el motor de búsqueda a utilizar para SerpAPI.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SOUGOU_API_SID`

- Type: `str`
- Predeterminado: `None`
- Descripción: Establece el SID del API de Sogou.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `SOUGOU_API_SK`

- Type: `str`
- Predeterminado: `None`
- Descripción: Establece el SK del API de Sogou.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `TAVILY_EXTRACT_DEPTH`

- Type: `str`
- Predeterminado: `basic`
- Descripción: Especifica la profundidad de extracción para los resultados de búsqueda de Tavily.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### Configuración del cargador web

#### `WEB_LOADER_ENGINE`

- Type: `str`
- Predeterminado: `safe_web`
- Descripción: Especifica el cargador a utilizar para recuperar y procesar contenido web.
- Opciones:
  - `requests` - Usa el módulo Requests con manejo de errores mejorado.
  - `playwright` - Usa Playwright para un renderizado de páginas web más avanzado e interacción.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

:::info

Al utilizar `playwright`, tienes dos opciones:

1. Si `PLAYWRIGHT_WS_URI` no está establecido, Playwright con dependencias de Chromium se instalará automáticamente en el contenedor de Open WebUI al iniciar.
2. Si `PLAYWRIGHT_WS_URI` está establecido, Open WebUI se conectará a una instancia de navegador remoto en lugar de instalar dependencias localmente.

:::

#### `PLAYWRIGHT_WS_URL`

- Type: `str`
- Predeterminado: `None`
- Descripción: Especifica la URI de WebSocket de una instancia remota del navegador Playwright. Cuando se configura, Open WebUI utilizará este navegador remoto en lugar de instalar las dependencias del navegador localmente. Esto es particularmente útil en entornos de contenedores donde se desea mantener el contenedor de Open WebUI ligero y separar las preocupaciones del navegador. Ejemplo: `ws://playwright:3000`
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

:::tip

Utilizar un navegador Playwright remoto mediante `PLAYWRIGHT_WS_URL` puede ser beneficioso para:

- Reducir el tamaño del contenedor de Open WebUI
- Usar un navegador diferente al Chromium predeterminado
- Conectar con un navegador no sin cabeza (con GUI)

:::

#### `FIRECRAWL_API_BASE_URL`

- Tipo: `str`
- Predeterminado: `https://api.firecrawl.dev`
- Descripción: Configura la URL base para la API de Firecrawl.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `FIRECRAWL_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Configura la clave API para la API de Firecrawl.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `PERPLEXITY_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Configura la clave API para la API de Perplexity.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `PLAYWRIGHT_TIMEOUT`

- Tipo: `int`
- Predeterminado: cadena vacía ( ), ya que `None` está configurado como predeterminado.
- Descripción: Especifica el tiempo de espera para las solicitudes de Playwright.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### Cargador de YouTube

#### `YOUTUBE_LOADER_PROXY_URL`

- Tipo: `str`
- Descripción: Configura la URL del proxy para el cargador de YouTube.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `YOUTUBE_LOADER_LANGUAGE`

- Tipo: `str`
- Predeterminado: `en`
- Descripción: Lista separada por comas de códigos de idioma para intentar al obtener transcripciones de videos de YouTube, en orden de prioridad.
- Ejemplo: Si se configura como `es,de`, se intentarán primero las transcripciones en español, luego en alemán si no estuviera disponible en español, y finalmente en inglés. Nota: Si ninguno de los idiomas especificados está disponible y `en` no estaba en tu lista, el sistema intentará automáticamente inglés como última opción.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

## Audio

### Whisper Conversión de Voz a Texto (Local)

#### `WHISPER_MODEL`

- Tipo: `str`
- Predeterminado: `base`
- Descripción: Configura el modelo Whisper a utilizar para Conversión de Voz a Texto. El backend utilizado es faster_whisper con cuantificación a `int8`.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `WHISPER_MODEL_DIR`

- Tipo: `str`
- Predeterminado: `${DATA_DIR}/cache/whisper/models`
- Descripción: Especifica el directorio para almacenar los archivos del modelo Whisper.

#### `WHISPER_VAD_FILTER`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Especifica si se aplica un filtro de Detección de Actividad de Voz (VAD) al modelo Whisper de Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `WHISPER_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Activa la actualización automática del modelo Whisper.

#### `WHISPER_LANGUAGE`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el idioma en formato ISO 639-1 que Whisper utiliza para STT (ISO 639-2 para hawaiano y cantonés). Whisper predice el idioma por defecto.

### Conversión de Voz a Texto (OpenAI)

#### `AUDIO_STT_ENGINE`

- Tipo: `str`
- Opciones:
  - Déjalo vacío para usar el motor local incorporado de Whisper para Conversión de Voz a Texto.
  - `openai` - Usa el motor de OpenAI para Conversión de Voz a Texto.
  - `deepgram`- Usa el motor de Deepgram para Conversión de Voz a Texto.
  - `azure` Usa el motor de Azure para Conversión de Voz a Texto.
- Descripción: Especifica el motor de Conversión de Voz a Texto a utilizar.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `AUDIO_STT_MODEL`

- Tipo: `str`
- Predeterminado: `whisper-1`
- Descripción: Especifica el modelo de Conversión de Voz a Texto a utilizar para puntos finales compatibles con OpenAI.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_BASE_URL}`
- Descripción: Configura la URL base compatible con OpenAI para usar en Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_KEY`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_KEY}`
- Descripción: Configura la clave API de OpenAI para usar en Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### Conversión de Voz a Texto (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la clave API de Azure para usar en Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `AUDIO_STT_AZURE_REGION`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la región de Azure para usar en Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `AUDIO_STT_AZURE_LOCALES`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica los locales para usar en la Conversión de Voz a Texto de Azure.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### Conversión de Voz a Texto (Deepgram)

#### `DEEPGRAM_API_KEY`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la clave API de Deepgram para usar en Conversión de Voz a Texto.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

### Texto a Voz

#### `AUDIO_TTS_API_KEY`

- Tipo: `str`
- Descripción: Establece la clave API para Texto a Voz.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_ENGINE`

- Tipo: `str`
- Opciones:
  - Dejar vacío para usar el motor WebAPI integrado para Texto a Voz.
  - `azure` - Utiliza el motor de Azure para Texto a Voz.
  - `elevenlabs` - Utiliza el motor de ElevenLabs para Texto a Voz.
  - `openai` - Utiliza el motor de OpenAI para Texto a Voz.
  - `transformers` - Utiliza SentenceTransformers para Texto a Voz.
- Descripción: Especifica el motor de Texto a Voz a utilizar.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_MODEL`

- Tipo: `str`
- Predeterminado: `tts-1`
- Descripción: Especifica el modelo de Texto a Voz de OpenAI a utilizar.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_VOICE`

- Tipo: `str`
- Predeterminado: `alloy`
- Descripción: Establece la voz de Texto a Voz de OpenAI a utilizar.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_SPLIT_ON`

- Tipo: `str`
- Predeterminado: `punctuation`
- Descripción: Establece cómo dividir texto para Texto a Voz de OpenAI.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

### Texto a Voz de Azure

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- Tipo: `str`
- Descripción: Establece la región para Texto a Voz de Azure.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- Tipo: `str`
- Descripción: Establece el formato de salida para Texto a Voz de Azure.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

### Texto a Voz de OpenAI

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_BASE_URL}`
- Descripción: Establece la URL base compatible con OpenAI para Texto a Voz.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUDIO_TTS_OPENAI_API_KEY`

- Tipo: `str`
- Predeterminado: `${OPENAI_API_KEY}`
- Descripción: Establece la clave API a utilizar para Texto a Voz.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

## Generación de Imágenes

#### `IMAGE_GENERATION_ENGINE`

- Tipo: `str`
- Opciones:
  - `openai` - Utiliza OpenAI DALL-E para generación de imágenes.
  - `comfyui` - Utiliza el motor ComfyUI para generación de imágenes.
  - `automatic1111` - Utiliza el motor AUTOMATIC1111 para generación de imágenes.
  - `gemini` - Utiliza Gemini para generación de imágenes.
- Predeterminado: `openai`
- Descripción: Especifica el motor a utilizar para generación de imágenes.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `ENABLE_IMAGE_GENERATION`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o desactiva las funciones de generación de imágenes.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o desactiva la generación de prompts de imágenes.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica la plantilla a usar para generar prompts de imágenes.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### Tarea:
Generar un prompt detallado para una tarea de generación de imágenes basado en el idioma y contexto dado. Describe la imagen como si la estuvieras explicando a alguien que no puede verla. Incluye detalles relevantes, colores, formas, y cualquier otro elemento importante.

### Directrices:
- Sé descriptivo y detallado, enfocándote en los aspectos más importantes de la imagen.
- Evita hacer suposiciones o agregar información que no esté presente en la imagen.
- Usa el idioma principal del chat; por defecto utiliza inglés si es multilingüe.
- Si la imagen es demasiado compleja, enfócate en los elementos más prominentes.

### Salida:
Devuelve estrictamente en formato JSON:
{
    "prompt": "Tu descripción detallada aquí."
}

### Historial del Chat:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- Tipo: `str`
- Predeterminado: `512x512`
- Descripción: Establece el tamaño predeterminado de las imágenes a generar.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `IMAGE_STEPS`

- Tipo: `int`
- Predeterminado: `50`
- Descripción: Establece los pasos de iteración predeterminados para la generación de imágenes. Usado en ComfyUI y AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `IMAGE_GENERATION_MODEL`

- Tipo: `str`
- Descripción: Modelo predeterminado para utilizar en generación de imágenes
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- Tipo: `str`
- Descripción: Especifica la URL para la API de Stable Diffusion de AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de tipo `PersistentConfig`.

#### `AUTOMATIC1111_API_AUTH`

- Tipo: `str`
- Descripción: Configura la autenticación de la API de AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `AUTOMATIC1111_CFG_SCALE`

- Tipo: `float`
- Descripción: Configura la escala para la inferencia de AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `AUTOMATIC1111_SAMPLER`

- Tipo: `str`
- Descripción: Configura el muestreador para la inferencia de AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `AUTOMATIC1111_SCHEDULER`

- Tipo: `str`
- Descripción: Configura el programador para la inferencia de AUTOMATIC1111.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### ComfyUI

#### `COMFYUI_BASE_URL`

- Tipo: `str`
- Descripción: Especifica la URL para la API de generación de imágenes de ComfyUI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `COMFYUI_API_KEY`

- Tipo: `str`
- Descripción: Configura la clave API para ComfyUI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `COMFYUI_WORKFLOW`

- Tipo: `str`
- Valor Predeterminado:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  }
}
```

- Descripción: Configura el flujo de trabajo de ComfyUI.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Gemini

#### `GEMINI_API_BASE_URL`

- Tipo: `str`
- Valor Predeterminado: `None`
- Descripción: Especifica la URL para la API de Gemini.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `GEMINI_API_KEY`

- Tipo: `str`
- Valor Predeterminado: `None`
- Descripción: Configura la clave API de Gemini.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `IMAGES_GEMINI_API_BASE_URL`

- Tipo: `str`
- Valor Predeterminado: `None`
- Descripción: Especifica la URL para la API de generación de imágenes de Gemini.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `IMAGES_GEMINI_API_KEY`

- Tipo: `str`
- Valor Predeterminado: `None`
- Descripción: Configura la clave API de Gemini para la generación de imágenes.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- Tipo: `str`
- Valor Predeterminado: `${OPENAI_API_BASE_URL}`
- Descripción: Configura la URL base compatible con OpenAI para la generación de imágenes DALL-E.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `IMAGES_OPENAI_API_KEY`

- Tipo: `str`
- Valor Predeterminado: `${OPENAI_API_KEY}`
- Descripción: Configura la clave API para la generación de imágenes DALL-E.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- Tipo: `bool`
- Valor Predeterminado: `False`
- Descripción: Habilita la creación de cuentas al registrarse a través de OAuth. Diferente de `ENABLE_SIGNUP`.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

:::danger

`ENABLE_LOGIN_FORM` debe estar configurado como `False` cuando `ENABLE_OAUTH_SIGNUP` está configurado como `True`. Si no, no se podrá iniciar sesión.

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- Tipo: `bool`
- Valor Predeterminado: `False`
- Descripción: Si está habilitado, fusiona cuentas OAuth con cuentas existentes que usan la misma
dirección de correo electrónico. Esto se considera inseguro, ya que no todos los proveedores de OAuth verificarán las direcciones de correo electrónico, lo que puede llevar a posibles secuestros de cuentas.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- Tipo: `bool`
- Valor Predeterminado: `False`
- Descripción: Si está habilitado, actualiza la foto de perfil de usuario local con la foto proporcionada por OAuth al iniciar sesión.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- Tipo: `str`
- Descripción: Define el encabezado de solicitud confiable para autenticación. Consulte [documentación SSO](/features/sso).

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- Tipo: `str`
- Descripción: Define el encabezado de solicitud confiable para el nombre de usuario de cualquiera que se registre con el encabezado `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`. Consulte [documentación SSO](/features/sso).

### Google

Consulte https://support.google.com/cloud/answer/6158849?hl=es

#### `GOOGLE_CLIENT_ID`

- Tipo: `str`
- Descripción: Define el ID de cliente para Google OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GOOGLE_CLIENT_SECRET`

- Tipo: `str`
- Descripción: Define el secreto de cliente para Google OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GOOGLE_OAUTH_SCOPE`

- Tipo: `str`
- Predeterminado: `openid email profile`
- Descripción: Define el alcance para la autenticación de Google OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GOOGLE_REDIRECT_URI`

- Tipo: `str`
- Predeterminado: `<backend>/oauth/google/callback`
- Descripción: Define el URI de redirección para Google OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### Microsoft

Consulte https://learn.microsoft.com/es-es/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- Tipo: `str`
- Descripción: Define el ID de cliente para Microsoft OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `MICROSOFT_CLIENT_SECRET`

- Tipo: `str`
- Descripción: Define el secreto de cliente para Microsoft OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `MICROSOFT_CLIENT_TENANT_ID`

- Tipo: `str`
- Descripción: Define el ID de arrendatario para Microsoft OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `MICROSOFT_OAUTH_SCOPE`

- Tipo: `str`
- Predeterminado: `openid email profile`
- Descripción: Define el alcance para la autenticación de Microsoft OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `MICROSOFT_REDIRECT_URI`

- Tipo: `str`
- Predeterminado: `<backend>/oauth/microsoft/callback`
- Descripción: Define el URI de redirección para Microsoft OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### GitHub

Consulte https://docs.github.com/es/apps/oauth-apps/construccion-de-apps-oauth/autorizando-apps-oauth

#### `GITHUB_CLIENT_ID`

- Tipo: `str`
- Descripción: Define el ID de cliente para GitHub OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GITHUB_CLIENT_SECRET`

- Tipo: `str`
- Descripción: Define el secreto de cliente para GitHub OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GITHUB_CLIENT_SCOPE`

- Tipo: `str`
- Predeterminado: `user:email`
- Descripción: Especifica el alcance para la autenticación de GitHub OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `GITHUB_CLIENT_REDIRECT_URI`

- Tipo: `str`
- Predeterminado: `<backend>/oauth/github/callback`
- Descripción: Define el URI de redirección para GitHub OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- Tipo: `str`
- Descripción: Define el ID de cliente para OIDC.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_CLIENT_SECRET`

- Tipo: `str`
- Descripción: Define el secreto de cliente para OIDC.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OPENID_PROVIDER_URL`

- Tipo: `str`
- Descripción: Ruta al endpoint `.well-known/openid-configuration`
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OPENID_REDIRECT_URI`

- Tipo: `str`
- Predeterminado: `<backend>/oauth/oidc/callback`
- Descripción: Define el URI de redirección para OIDC
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_SCOPES`

- Tipo: `str`
- Predeterminado: `openid email profile`
- Descripción: Define el alcance para la autenticación OIDC. `openid` y `email` son obligatorios.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_CODE_CHALLENGE_METHOD`

- Tipo: `str`
- Predeterminado: Cadena vacía ( ), ya que `None` se establece como predeterminado.
- Descripción: Especifica el método de desafío de código para la autenticación OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_PROVIDER_NAME`

- Tipo: `str`
- Predeterminado: `SSO`
- Descripción: Define el nombre para el proveedor OIDC.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_USERNAME_CLAIM`

- Tipo: `str`
- Predeterminado: `name`
- Descripción: Define el atributo de nombre de usuario para OpenID.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_EMAIL_CLAIM`

- Tipo: `str`
- Predeterminado: `email`
- Descripción: Configurar la reclamación de correo electrónico para OpenID.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_PICTURE_CLAIM`

- Tipo: `str`
- Predeterminado: `picture`
- Descripción: Configurar la reclamación de imagen (avatar) para OpenID.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_GROUP_CLAIM`

- Tipo: `str`
- Predeterminado: `groups`
- Descripción: Especifica la reclamación de grupo para la autenticación OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita la gestión de roles para la delegación OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o desactiva la gestión de grupos de OAuth.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_ROLES_CLAIM`

- Tipo: `str`
- Predeterminado: `roles`
- Descripción: Configura la reclamación de roles para buscar en el token OIDC.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_ALLOWED_ROLES`

- Tipo: `str`
- Predeterminado: `user,admin`
- Descripción: Configura los roles que tienen acceso permitido a la plataforma.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_ADMIN_ROLES`

- Tipo: `str`
- Predeterminado: `admin`
- Descripción: Configura los roles que se consideran administradores.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `OAUTH_ALLOWED_DOMAINS`

- Tipo: `str`
- Predeterminado: `*`
- Descripción: Especifica los dominios permitidos para la autenticación OAuth. (por ejemplo, "example1.com,example2.com").
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

## LDAP

#### `ENABLE_LDAP`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o desactiva la autenticación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_SERVER_LABEL`

- Tipo: `str`
- Descripción: Configura la etiqueta del servidor LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.


#### `LDAP_SERVER_HOST`

- Tipo: `str`
- Predeterminado: `localhost`
- Descripción: Configura el nombre de host del servidor LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_SERVER_PORT`

- Tipo: `int`
- Predeterminado: `389`
- Descripción: Configura el número de puerto del servidor LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- Tipo: `str`
- Descripción: Configura el atributo para usar como correo en la autenticación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- Tipo: `str`
- Descripción: Configura el atributo para usar como nombre de usuario en la autenticación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_APP_DN`

- Tipo: `str`
- Descripción: Configura el nombre distinguido para la aplicación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_APP_PASSWORD`

- Tipo: `str`
- Descripción: Configura la contraseña para la aplicación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_SEARCH_BASE`

- Tipo: `str`
- Descripción: Configura la base para la búsqueda de autenticación LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_SEARCH_FILTER`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Configura un filtro único para usar en la búsqueda LDAP. Alternativa a `LDAP_SEARCH_FILTERS`.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_SEARCH_FILTERS`

- Tipo: `str`
- Descripción: Configura el filtro para usar en la búsqueda LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_USE_TLS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o desactiva TLS para la conexión LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_CA_CERT_FILE`

- Tipo: `str`
- Descripción: Configura la ruta al archivo de certificado CA de LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_VALIDATE_CERT`

- Tipo: `bool`
- Descripción: Configura si se debe validar el certificado CA de LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `LDAP_CIPHERS`

- Tipo: `str`
- Predeterminado: `ALL`
- Descripción: Configura los cifrados que se deben utilizar para la conexión LDAP.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

## Permisos de Usuario

### Permisos de Chat

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o desactiva el permiso de usuario para acceder a los controles del chat.
- Persistencia: Esta variable de entorno es una variable `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para subir archivos a los chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_DELETE`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para eliminar chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_EDIT`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para editar chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_STT`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar la función de voz a texto en los chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TTS`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar la función de texto a voz en los chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_CALL`

- Tipo: `str`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para realizar llamadas en los chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- Tipo: `str`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar múltiples modelos en los chats.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para crear chats temporales.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita la obligatoriedad de chats temporales para los usuarios.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Permisos de características

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el permiso del usuario para acceder a servidores de herramientas directas.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- Tipo: `str`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar la función de búsqueda web.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- Tipo: `str`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar la función de generación de imágenes.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- Tipo: `str`
- Predeterminado: `True`
- Descripción: Habilita o deshabilita el permiso del usuario para usar la función de interpretación de código.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

### Permisos del espacio de trabajo

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el permiso del usuario para acceder a los modelos del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el permiso del usuario para acceder al conocimiento del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el permiso del usuario para acceder a los prompts del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- Tipo: `bool`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el permiso del usuario para acceder a las herramientas del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el uso compartido público de los modelos del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el uso compartido público del conocimiento del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el uso compartido público de los prompts del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita o deshabilita el uso compartido público de las herramientas del espacio de trabajo.
- Persistencia: Esta variable de entorno es una variable de `PersistentConfig`.

## Variables de entorno diversas

Estas variables no son específicas de Open WebUI pero aún pueden ser valiosas en ciertos contextos.

### Almacenamiento en la Nube

#### `STORAGE_PROVIDER`

- Tipo: `str`
- Opciones:
  - `s3` - utiliza la biblioteca cliente de S3 y las variables de entorno relacionadas mencionadas en [Almacenamiento Amazon S3](#amazon-s3-storage)
  - `gcs` - utiliza la biblioteca cliente de GCS y las variables de entorno relacionadas mencionadas en [Google Cloud Storage](#google-cloud-storage)
  - `azure` - utiliza la biblioteca cliente de Azure y las variables de entorno relacionadas mencionadas en [Microsoft Azure Storage](#microsoft-azure-storage)
- Predeterminado: cadena vacía ( ), que por defecto es `local`
- Descripción: Establece el proveedor de almacenamiento.

#### Almacenamiento Amazon S3

#### `S3_ACCESS_KEY_ID`

- Tipo: `str`
- Descripción: Establece el ID de clave de acceso para el almacenamiento S3.

#### `S3_ADDRESSING_STYLE`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el estilo de direccionamiento a usar para el almacenamiento S3 (por ejemplo, path, virtual).

#### `S3_BUCKET_NAME`

- Tipo: `str`
- Descripción: Establece el nombre del bucket para el almacenamiento S3.

#### `S3_ENDPOINT_URL`

- Tipo: `str`
- Descripción: Establece la URL del endpoint para el almacenamiento S3.

#### `S3_KEY_PREFIX`

- Tipo: `str`
- Descripción: Establece el prefijo de clave para un objeto S3.

#### `S3_REGION_NAME`

- Tipo: `str`
- Descripción: Establece el nombre de la región para el almacenamiento S3.

#### `S3_SECRET_ACCESS_KEY`

- Tipo: `str`
- Descripción: Establece la clave secreta de acceso para el almacenamiento S3.

#### `S3_USE_ACCELERATE_ENDPOINT`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Especifica si se debe utilizar el endpoint acelerado para el almacenamiento S3.

#### `S3_ENABLE_TAGGING`

- Tipo: `str`
- Predeterminado: `False`
- Descripción: Habilita el etiquetado de objetos S3 después de las cargas para una mejor organización, búsqueda e integración con políticas de gestión de archivos. Siempre configurado como `False` al usar Cloudflare R2, ya que R2 no admite el etiquetado de objetos.

#### Google Cloud Storage

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- Tipo: `str`
- Descripción: Contenidos del archivo JSON de credenciales de aplicación de Google.
  - Opcional - si no se proporciona, las credenciales se tomarán del entorno. Credenciales de usuario si se ejecuta localmente y servidor de metadatos de Google si se ejecuta en Google Compute Engine.
  - Un archivo puede ser generado para una cuenta de servicio siguiendo esta [guía.](https://developers.google.com/workspace/guides/create-credentials#service-account)

#### `GCS_BUCKET_NAME`

- Tipo: `str`
- Descripción: Establece el nombre del bucket para el almacenamiento en Google Cloud Storage. El bucket debe existir previamente.

#### Microsoft Azure Storage

#### `AZURE_STORAGE_ENDPOINT`

- Tipo: `str`
- Descripción: Establece la URL del endpoint para el almacenamiento Azure.

#### `AZURE_STORAGE_CONTAINER_NAME`

- Tipo: `str`
- Descripción: Establece el nombre del contenedor para el almacenamiento Azure.

#### `AZURE_STORAGE_KEY`

- Tipo: `str`
- Descripción: Establece la clave de acceso para el almacenamiento Azure.
  - Opcional - si no se proporciona, las credenciales se tomarán del entorno. Credenciales de usuario si se ejecuta localmente e Identidad Administrada si se ejecuta en servicios Azure.

### Pool de Base de Datos

#### `DATABASE_URL`

- Tipo: `str`
- Predeterminado: `sqlite:///${DATA_DIR}/webui.db`
- Descripción: Especifica la URL de la base de datos a la que conectarse.

:::info

Admite SQLite y Postgres. Cambiar la URL no migra datos entre bases de datos.
La documentación sobre el esquema de la URL está disponible [aquí](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls).

:::

#### `DATABASE_SCHEMA`

- Tipo: `str`
- Predeterminado: `None`
- Descripción: Especifica el esquema de base de datos al que conectarse.

#### `DATABASE_POOL_SIZE`

- Tipo: `int`
- Predeterminado: `0`
- Descripción: Especifica el tamaño del pool de la base de datos. Un valor de `0` desactiva el uso de pooling.

#### `DATABASE_POOL_MAX_OVERFLOW`

- Tipo: `int`
- Predeterminado: `0`
- Descripción: Especifica el desbordamiento máximo del pool de la base de datos.

:::info

Más información sobre esta configuración se encuentra [aquí](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow).

:::

#### `DATABASE_POOL_TIMEOUT`

- Tipo: `int`
- Predeterminado: `30`
- Descripción: Especifica el tiempo de espera en segundos para obtener una conexión del pool de la base de datos.

:::info

Más información sobre esta configuración se encuentra [aquí](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout).

:::

#### `DATABASE_POOL_RECYCLE`

- Tipo: `int`
- Predeterminado: `3600`
- Descripción: Especifica el tiempo de reciclaje del pool de la base de datos en segundos.

:::info

Más información sobre esta configuración se encuentra [aquí](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle).

:::

### Redis

#### `REDIS_URL`

- Tipo: `str`
- Ejemplo: `redis://localhost:6379/0`
- Descripción: Especifica la URL de la instancia de Redis para el estado de la aplicación.

:::info

Al desplegar Open-WebUI en un clúster de múltiples nodos/trabajadores, debe asegurarse de que el valor REDIS_URL esté configurado. De lo contrario, se producirán problemas de sesión, persistencia y consistencia en el estado de la aplicación, ya que los trabajadores no podrán comunicarse.

:::

#### `REDIS_SENTINEL_HOSTS`

- Tipo: `str`
- Descripción: Lista separada por comas de sentinelas Redis para el estado de la aplicación. Si se especifica, el "hostname" en `REDIS_URL` será interpretado como el nombre del servicio Sentinel.

#### `REDIS_SENTINEL_PORT`

- Tipo: `int`
- Predeterminado: `26379`
- Descripción: Puerto Sentinel para Redis del estado de la aplicación.

#### `ENABLE_WEBSOCKET_SUPPORT`

- Tipo: `bool`
- Predeterminado: `True`
- Descripción: Habilita el soporte para websockets en Open WebUI.

:::info

Al implementar Open-WebUI en un clúster de múltiples nodos/trabajadores, debes asegurar que el valor de ENABLE_WEBSOCKET_SUPPORT esté configurado. Sin ello, ocurrirán problemas de consistencia y persistencia en los websockets.

:::

#### `WEBSOCKET_MANAGER`

- Tipo: `str`
- Predeterminado: `redis`
- Descripción: Especifica el administrador de websockets a utilizar (en este caso, Redis).

:::info

Al implementar Open-WebUI en un clúster de múltiples nodos/trabajadores, debes asegurar que el valor de WEBSOCKET_MANAGER esté configurado y se utilice una base de datos NoSQL de tipo clave-valor como Redis. Sin ello, ocurrirán problemas de consistencia y persistencia en los websockets.

:::

#### `WEBSOCKET_REDIS_URL`

- Tipo: `str`
- Predeterminado: `${REDIS_URL}`
- Descripción: Especifica la URL de la instancia Redis para la comunicación de websockets. Es distinto de `REDIS_URL` y en la práctica se recomienda configurar ambos.

:::info

Al implementar Open-WebUI en un clúster de múltiples nodos/trabajadores, debes asegurar que el valor de WEBSOCKET_REDIS_URL esté configurado y se utilice una base de datos NoSQL de tipo clave-valor como Redis. Sin ello, ocurrirán problemas de consistencia y persistencia en los websockets.

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- Tipo: `str`
- Descripción: Lista separada por comas de sentinelas Redis para websockets. Si se especifica, el "hostname" en `WEBSOCKET_REDIS_URL` será interpretado como el nombre del servicio Sentinel.

#### `WEBSOCKET_SENTINEL_PORT`

- Tipo: `int`
- Predeterminado: `26379`
- Descripción: Puerto Sentinel para Redis de websockets.

### Configuración de Uvicorn

#### `UVICORN_WORKERS`

- Tipo: `int`
- Predeterminado: `1`
- Descripción: Controla el número de procesos de trabajadores que Uvicorn genera para manejar solicitudes. Cada trabajador ejecuta su propia instancia de la aplicación en un proceso separado.

:::info

Al implementar en ambientes orquestados como Kubernetes o usar Helm charts, se recomienda mantener UVICORN_WORKERS configurado en 1. Las plataformas de orquestación de contenedores ya proporcionan sus propios mecanismos de escalamiento a través de la replicación de pods, y el uso de múltiples trabajadores dentro de los contenedores puede dar lugar a problemas de asignación de recursos y complicar las estrategias de escalamiento horizontal.

Si utilizas UVICORN_WORKERS, también necesitas asegurarte de que las variables de entorno relacionadas para configuraciones escalables de múltiples instancias estén configuradas adecuadamente.

:::

### Configuración de Proxy

Open WebUI admite el uso de proxies para recuperaciones HTTP y HTTPS. Para especificar configuraciones de proxy,
Open WebUI utiliza las siguientes variables de entorno:

#### `http_proxy`

- Tipo: `str`
- Descripción: Configura la URL del proxy HTTP.

#### `https_proxy`

- Tipo: `str`
- Descripción: Configura la URL del proxy HTTPS.

#### `no_proxy`

- Tipo: `str`
- Descripción: Lista de extensiones de dominio (o direcciones IP) para las cuales no se debe usar el proxy,
separadas por comas. Por ejemplo, configurar no_proxy como .mit.edu asegura que el proxy sea
omitido al acceder a documentos de MIT.

### Instalar Paquetes de Python Requeridos

Open WebUI proporciona variables de entorno para personalizar el proceso de instalación de paquetes con pip. A continuación se muestran las variables de entorno utilizadas por Open WebUI para ajustar el comportamiento de instalación de paquetes:

#### `PIP_OPTIONS`

- Tipo: `str`
- Descripción: Especifica opciones adicionales de línea de comandos que pip debe usar al instalar paquetes. Por ejemplo, puedes incluir banderas como `--upgrade`, `--user` o `--no-cache-dir` para controlar el proceso de instalación.

#### `PIP_PACKAGE_INDEX_OPTIONS`

- Tipo: `str`
- Descripción: Define el comportamiento personalizado del índice de paquetes para pip. Esto puede incluir la especificación de URLs de índice adicionales o alternativos (por ejemplo, `--extra-index-url`), credenciales de autenticación, u otros parámetros para gestionar cómo se recuperan los paquetes desde diferentes ubicaciones.
