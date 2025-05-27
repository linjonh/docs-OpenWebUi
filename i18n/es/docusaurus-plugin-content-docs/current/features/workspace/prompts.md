---
sidebar_position: 2
title: "📚 Prompts"
---

La sección `Prompts` del `Workspace` dentro de Open WebUI permite a los usuarios crear, gestionar y compartir prompts personalizados. Esta función optimiza las interacciones con los modelos de IA al permitir a los usuarios guardar prompts utilizados frecuentemente y acceder a ellos fácilmente mediante comandos slash.

### Gestión de Prompts

La interfaz de Prompts proporciona varias características clave para gestionar tus prompts personalizados:

* **Crear**: Diseña nuevos prompts con títulos personalizables, niveles de acceso y contenido.
* **Compartir**: Comparte prompts con otros usuarios según las permisos de acceso configurados.
* **Control de Acceso**: Configura la visibilidad y los permisos de uso para cada prompt (consulta [Permisos](./permissions.md) para más detalles).
* **Comandos Slash**: Accede rápidamente a los prompts usando comandos slash personalizados durante sesiones de chat.

### Creación y Edición de Prompts

Al crear o editar un prompt, puedes configurar los siguientes ajustes:

* **Título**: Asigna un nombre descriptivo a tu prompt para facilitar su identificación.
* **Acceso**: Define el nivel de acceso para controlar quién puede ver y usar el prompt.
* **Comando**: Define un comando slash que activará el prompt (por ejemplo, `/summarize`).
* **Contenido del Prompt**: Escribe el texto del prompt que se enviará al modelo.

### Variables en Prompts

Open WebUI admite variables dinámicas en los prompts que se pueden incluir en tus configuraciones:

* **Contenido del Portapapeles**: Usa `{{CLIPBOARD}}` para insertar contenido desde tu portapapeles.
* **Fecha y Hora**:
  * `{{CURRENT_DATE}}`: Fecha actual
  * `{{CURRENT_DATETIME}}`: Fecha y hora actual
  * `{{CURRENT_TIME}}`: Hora actual
  * `{{CURRENT_TIMEZONE}}`: Zona horaria actual
  * `{{CURRENT_WEEKDAY}}`: Día actual de la semana
* **Información del Usuario**:
  * `{{USER_NAME}}`: Nombre del usuario actual
  * `{{USER_LANGUAGE}}`: Idioma elegido por el usuario
  * `{{USER_LOCATION}}`: Ubicación del usuario (requiere HTTPS y activación en Configuración > Interfaz)

### Directrices para el Uso de Variables

* Encierra las variables entre dobles llaves: `{{variable}}`
* La variable `{{USER_LOCATION}}` requiere:
  * Una conexión segura mediante HTTPS
  * Activar la función en Configuración > Interfaz
* La variable `{{CLIPBOARD}}` requiere permiso de acceso al portapapeles de tu dispositivo

### Control de Acceso y Permisos

La gestión de prompts está controlada por las siguientes configuraciones de permisos:

* **Acceso a Prompts**: Los usuarios necesitan el permiso `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS` para crear y gestionar prompts.
* Para obtener información detallada sobre cómo configurar permisos, consulta la [documentación de permisos](./permissions.md).

### Mejores Prácticas

* Usa títulos claros y descriptivos para tus prompts
* Crea comandos slash intuitivos que reflejen el propósito del prompt
* Documenta cualquier requisito específico o entradas esperadas en la descripción del prompt
* Prueba los prompts con diferentes combinaciones de variables para asegurarte de que funcionen según lo previsto
* Considera cuidadosamente los niveles de acceso al compartir prompts con otros usuarios: compartir públicamente significa que aparecerán automáticamente para todos los usuarios cuando ingresen `/` en un chat. Por lo tanto, evita crear demasiados prompts públicos.
