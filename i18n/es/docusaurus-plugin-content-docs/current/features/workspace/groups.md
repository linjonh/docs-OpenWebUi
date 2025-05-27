---
sidebar_position: 3
title: "🔐 Grupos"
---

Los grupos permiten a los administradores
* asignar permisos a múltiples usuarios a la vez, simplificando la gestión de acceso
* limitar el acceso a recursos específicos (Modelos, Herramientas, etc.) configurándolos como "privados" y luego abriendo el acceso a grupos específicos
* Especificar el acceso a un recurso para un grupo como "leer" o "escribir" (el acceso de escritura implica lectura)

:::info
Tenga en cuenta que el modelo de permisos es permisivo. Si un usuario es miembro de dos grupos que definen permisos diferentes para un recurso, se aplica el permiso más permisivo.
:::

### Estructura del Grupo

Cada grupo en Open WebUI contiene:

* Un identificador único
* Nombre y descripción
* Referencia del propietario/creador
* Lista de IDs de usuarios miembros
* Configuración de permisos
* Metadatos adicionales

### Gestión de Grupos

Los grupos se pueden:

* **Crear manualmente** por administradores a través de la interfaz de usuario
* **Sincronizar automáticamente** desde proveedores de OAuth cuando `ENABLE_OAUTH_GROUP_MANAGEMENT` está habilitado
* **Crear automáticamente** a partir de reclamaciones de OAuth cuando tanto `ENABLE_OAUTH_GROUP_MANAGEMENT` como `ENABLE_OAUTH_GROUP_CREATION`
  están habilitados

### Integración de Grupos con OAuth

Cuando la gestión de grupos de OAuth está habilitada, las membresías de usuarios en grupos se sincronizan con los grupos recibidos en las reclamaciones de OAuth:

* Los usuarios se añaden a los grupos de Open WebUI que coinciden con sus reclamaciones de OAuth
* Los usuarios se eliminan de los grupos que no están presentes en sus reclamaciones de OAuth
* Con `ENABLE_OAUTH_GROUP_CREATION` habilitado, se crean automáticamente grupos de las reclamaciones de OAuth que no existen en Open WebUI

## Permisos de Grupo

Los grupos se pueden usar para poner conjuntos de permisos a disposición de los usuarios. Por ejemplo, se podría crear un grupo para "Científicos de Datos" que tenga acceso de lectura y escritura a todos los modelos, bases de conocimiento y herramientas.

## Control de Acceso a Recursos para Grupos

Open WebUI implementa un control de acceso granular para recursos como modelos, bases de conocimiento, indicaciones y herramientas. El acceso puede ser controlado a nivel de usuario y a nivel de grupo.

Para habilitar el control de acceso a un recurso, configure su acceso como "privado" y luego abra el acceso a grupos específicos.

### Estructura de Control de Acceso

Recursos como bases de conocimiento utilizan una estructura de control de acceso que especifica permisos de lectura y escritura tanto para usuarios como para grupos:

```json
{
  "read": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  },
  "write": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  }
}
```

Esta estructura permite un control preciso sobre quién puede ver y modificar recursos específicos.
