---
sidebar_position: 3
title: "🔒 Permisos"
---

La sección `Permisos` del `Entorno de Trabajo` dentro de Open WebUI permite a los administradores configurar controles de acceso y disponibilidad de funciones para los usuarios. Este sistema poderoso permite un control detallado sobre lo que los usuarios pueden acceder y modificar dentro de la aplicación.

Los administradores pueden gestionar los permisos de las siguientes maneras:

1. **Interfaz de Usuario:** La sección de Permisos del Entorno de Trabajo proporciona una interfaz gráfica para configurar permisos.
2. **Variables de Entorno:** Los permisos pueden configurarse utilizando variables de entorno, las cuales se almacenan como variables de `PersistentConfig`.
3. **Gestión de Grupos:** Asignando usuarios a grupos con permisos predefinidos.

## Permisos del Entorno de Trabajo

Los permisos del entorno de trabajo controlan el acceso a los componentes básicos de la plataforma Open WebUI:

* **Acceso a Modelos**: Permitir a los usuarios acceder y gestionar modelos personalizados. (Variable de entorno: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **Acceso a Conocimientos**: Permitir a los usuarios acceder y gestionar bases de conocimiento. (Variable de entorno: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **Acceso a Prompts**: Permitir a los usuarios acceder y gestionar prompts guardados. (Variable de entorno: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **Acceso a Herramientas**: Permitir a los usuarios acceder y gestionar herramientas. (Variable de entorno: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *Nota: Activar esto permite a los usuarios cargar código arbitrario en el servidor.*

## Permisos de Chat

Los permisos de chat determinan qué acciones pueden realizar los usuarios dentro de las conversaciones de chat:

* **Permitir Controles de Chat**: Activar el acceso a las opciones de control de chat.
* **Permitir Subir Archivos**: Permitir a los usuarios subir archivos durante sesiones de chat. (Variable de entorno: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **Permitir Eliminar Chats**: Permitir a los usuarios eliminar conversaciones de chat. (Variable de entorno: `USER_PERMISSIONS_CHAT_DELETE`)
* **Permitir Editar Chats**: Permitir a los usuarios editar mensajes en conversaciones de chat. (Variable de entorno: `USER_PERMISSIONS_CHAT_EDIT`)
* **Permitir Chats Temporales**: Permitir a los usuarios crear sesiones de chat temporales. (Variable de entorno: `USER_PERMISSIONS_CHAT_TEMPORARY`)

## Permisos de Funciones

Los permisos de funciones controlan el acceso a capacidades especializadas dentro de Open WebUI:

* **Búsqueda en la Web**: Permitir a los usuarios realizar búsquedas en la web durante sesiones de chat. (Variable de entorno: `ENABLE_RAG_WEB_SEARCH`)
* **Generación de Imágenes**: Permitir a los usuarios generar imágenes. (Variable de entorno: `ENABLE_IMAGE_GENERATION`)
* **Intérprete de Código**: Permitir a los usuarios usar la función de intérprete de código. (Variable de entorno: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **Conexión Directa a Servidores de Herramientas**: Permitir a los usuarios conectarse directamente a servidores de herramientas. (Variable de entorno: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## Configuración de Permisos Predeterminada

Por defecto, Open WebUI aplica la siguiente configuración de permisos:

**Permisos del Entorno de Trabajo**:
- Acceso a Modelos: Deshabilitado (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- Acceso a Conocimientos: Deshabilitado (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- Acceso a Prompts: Deshabilitado (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- Acceso a Herramientas: Deshabilitado (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**Permisos de Chat**:
- Permitir Controles de Chat: Habilitado
- Permitir Subir Archivos: Habilitado (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- Permitir Eliminar Chats: Habilitado (`USER_PERMISSIONS_CHAT_DELETE=True`)
- Permitir Editar Chats: Habilitado (`USER_PERMISSIONS_CHAT_EDIT=True`)
- Permitir Chats Temporales: Habilitado (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**Permisos de Funciones**:
- Búsqueda en la Web: Habilitado (`ENABLE_RAG_WEB_SEARCH=True`)
- Generación de Imágenes: Habilitado (`ENABLE_IMAGE_GENERATION=True`)
- Intérprete de Código: Habilitado (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- Conexión Directa a Servidores de Herramientas: Deshabilitado (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

Los administradores pueden cambiar los permisos predeterminados en la interfaz de usuario bajo "usuarios" en el panel de administración.

## Gestión de Permisos

Los administradores pueden ajustar estos permisos a través de la interfaz de usuario o configurando las variables de entorno correspondientes en la configuración. Todas las variables de entorno relacionadas con permisos están marcadas como variables de `PersistentConfig`, lo que significa que se almacenan internamente después del primer lanzamiento y pueden gestionarse a través de la interfaz de Open WebUI.

Esta flexibilidad permite a las organizaciones implementar políticas de seguridad mientras proporcionan a los usuarios las herramientas necesarias. Para información más detallada sobre las variables de entorno relacionadas con permisos, consulte la documentación de [Configuración de Variables de Entorno](../../getting-started/env-configuration.md#workspace-permissions).
