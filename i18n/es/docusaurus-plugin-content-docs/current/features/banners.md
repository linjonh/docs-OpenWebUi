---
sidebar_position: 13
title: "🔰 Banners Personalizables"
---

Resumen
--------

Open WebUI proporciona una característica que permite a los administradores crear banners personalizables con persistencia en el archivo `config.json`. Estos banners pueden incluir opciones de contenido, color de fondo (información, advertencia, error o éxito) y posibilidad de ser descartados. Los banners solo están disponibles para usuarios registrados, garantizando la confidencialidad de información sensible.

Configuración de Banners a través del Panel de Administración
------------------------------------------------------------

Para configurar banners a través del panel de administración, sigue estos pasos:

1. Inicia sesión en tu instancia de Open WebUI como administrador.
2. Navega a `Admin Panel` -> `Settings` -> `Interface`.
3. Ubica la opción `Banners` justo encima de la opción `Default Prompt Suggestions`.
4. Haz clic en el icono `+` para agregar un nuevo banner.
5. Selecciona el tipo de banner y establece el texto del banner según lo desees.
6. Elige si el banner es descartable o no.
7. Establece la marca de tiempo para el banner (opcional).
8. Presiona `Save` al final de la página para guardar el banner.

Configuración de Banners a través de Variables de Entorno
--------------------------------------------------------

Alternativamente, puedes configurar banners a través de variables de entorno. Para hacerlo, necesitas establecer la variable de entorno `WEBUI_BANNERS` con una lista de diccionarios en el siguiente formato:

```json
[{"id": "string","type": "string [info, success, warning, error]","title": "string","content": "string","dismissible": False,"timestamp": 1000}]
```

Para obtener más información sobre cómo configurar las variables de entorno en Open WebUI, consulta [Configuración de Variables de Entorno](https://docs.openwebui.com/getting-started/env-configuration#webui_banners).

Descripción de la Variable de Entorno
--------------------------------------

* `WEBUI_BANNERS`:
  * Tipo: lista de diccionarios
  * Predeterminado: `[]`
  * Descripción: Lista de banners para mostrar a los usuarios.

Opciones de Banners
--------------------

* `id`: Identificador único para el banner.
* `type`: Color de fondo del banner (información, éxito, advertencia, error).
* `title`: Título del banner.
* `content`: Contenido del banner.
* `dismissible`: Indica si el banner puede ser descartado o no.
* `timestamp`: Marca de tiempo para el banner (opcional).

Preguntas Frecuentes (FAQ)
--------------------------

* P: ¿Puedo configurar banners a través del panel de administración?
R: Sí, puedes configurar banners a través del panel de administración navegando a `Admin Panel` -> `Settings` -> `Interface` y haciendo clic en el icono `+` para agregar un nuevo banner.
* P: ¿Puedo configurar banners a través de variables de entorno?
R: Sí, puedes configurar los banners a través de variables de entorno configurando la variable de entorno `WEBUI_BANNERS` con una lista de diccionarios.
* P: ¿Cuál es el formato de la variable de entorno `WEBUI_BANNERS`?
R: El formato de la variable de entorno `WEBUI_BANNERS` es una lista de diccionarios con las siguientes claves: `id`, `type`, `title`, `content`, `dismissible` y `timestamp`.
* P: ¿Puedo hacer que los banners sean descartables?
R: Sí, puedes hacer que los banners sean descartables configurando la clave `dismissible` en `True` en la configuración del banner o activando la opción de ser descartable dentro de la interfaz de usuario.
