---
sidebar_position: 3
title: "🔑 Roles"
---

Open WebUI implementa un sistema estructurado de control de acceso basado en roles con tres roles principales de usuario:

| **Rol**        | **Descripción**                                  | **Creación Predeterminada**       |
|----------------|--------------------------------------------------|-----------------------------------|
| Administrador  | Administrador del sistema con control total      | Primera cuenta de usuario         |
| Usuario Regular| Usuario estándar con permisos limitados          | Usuarios subsiguientes aprobados  |
| Pendiente      | Usuario no aprobado que espera activación por administrador | Nuevos registros (configurable) |

### Asignación de Roles

* **Primer Usuario:** La primera cuenta creada en una nueva instancia de Open WebUI recibe automáticamente privilegios de Administrador.
* **Usuarios Subseguientes:** Los nuevos registros de usuarios reciben un rol predeterminado basado en la configuración `DEFAULT_USER_ROLE`.

El rol predeterminado para nuevos registros puede configurarse usando la variable de entorno `DEFAULT_USER_ROLE`:

```.dotenv
DEFAULT_USER_ROLE=pending  # Opciones: pending, user, admin
```

Cuando se establece en "pending", los nuevos usuarios deben ser aprobados manualmente por un administrador antes de obtener acceso al sistema.

## Grupos de Usuarios

Los grupos permiten a los administradores:
* asignar permisos a múltiples usuarios a la vez, simplificando la gestión de accesos
* limitar el acceso a recursos específicos (Modelos, Herramientas, etc.) configurando su acceso como "privado" y luego otorgando acceso a grupos específicos
* El acceso de grupo a un recurso puede configurarse como "lectura" o "escritura"

### Estructura de Grupo

Cada grupo en Open WebUI contiene:

* Un identificador único
* Nombre y descripción
* Referencia al propietario/creador
* Lista de IDs de usuarios miembros
* Configuración de permisos
* Metadatos adicionales

### Gestión de Grupos

Los grupos pueden:

* **Crearse manualmente** por administradores a través de la interfaz de usuario
* **Sincronizarse automáticamente** desde proveedores de OAuth cuando `ENABLE_OAUTH_GROUP_MANAGEMENT` está habilitado
* **Crearse automáticamente** a partir de reclamaciones OAuth cuando tanto `ENABLE_OAUTH_GROUP_MANAGEMENT` como `ENABLE_OAUTH_GROUP_CREATION` están habilitados

### Integración de Grupos OAuth

Cuando la gestión de grupos OAuth está habilitada, las membresías de grupos de usuarios se sincronizan con los grupos recibidos en las reclamaciones OAuth:

* Los usuarios se agregan a grupos de Open WebUI que coinciden con sus reclamaciones OAuth
* Los usuarios se eliminan de grupos que no están presentes en sus reclamaciones OAuth
* Con `ENABLE_OAUTH_GROUP_CREATION` habilitado, los grupos que aparecen en las reclamaciones OAuth y que no existen en Open WebUI se crean automáticamente
