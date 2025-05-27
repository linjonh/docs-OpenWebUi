---
sidebar_position: 40
title: "🔗 Integración SSO Okta OIDC"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve únicamente como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribución.
:::

# 🔗 Integración SSO Okta OIDC

## Información general

Esta página de documentación describe los pasos necesarios para integrar Okta OIDC Single Sign-On (SSO) con Open WebUI. También cubre las características **opcionales** de gestión de grupos de usuarios de Open WebUI basada en la membresía de grupos de Okta, incluyendo la **creación de grupos Just-in-Time (JIT)**. Al seguir estos pasos, permitirá que los usuarios inicien sesión en Open WebUI utilizando sus credenciales de Okta. Si elige habilitar la sincronización de grupos (`ENABLE_OAUTH_GROUP_MANAGEMENT`), los usuarios serán asignados automáticamente a los grupos relevantes dentro de Open WebUI según sus grupos en Okta al iniciar sesión. Si *también* habilita la creación de grupos JIT (`ENABLE_OAUTH_GROUP_CREATION`), los grupos presentes en las afirmaciones de Okta pero que faltan en Open WebUI se crearán automáticamente durante el inicio de sesión.

### Requisitos previos

*   Una instancia nueva o existente de Open WebUI.
*   Una cuenta de Okta con privilegios administrativos para crear y configurar aplicaciones.
*   Comprensión básica de OIDC, configuración de aplicaciones Okta y variables de entorno de Open WebUI.

## Configuración de Okta

Primero, debe configurar una aplicación OIDC dentro de su organización Okta y establecer una afirmación de grupos para transmitir información de grupo a Open WebUI.

### 1. Crear/Configurar la aplicación OIDC en Okta

1.  Inicie sesión en su Consola de administración de Okta.
2.  Navegue a **Aplicaciones > Aplicaciones**.
3.  Cree una nueva aplicación **OIDC - OpenID Connect** (elija **Aplicación web** como tipo) o seleccione una existente que desee usar para Open WebUI.
4.  Durante la configuración o en la pestaña de configuración **General** de la aplicación, configure las **URIs de redirección de inicio de sesión**. Agregue la URI de su instancia de Open WebUI, seguida de `/oauth/oidc/callback`. Ejemplo: `https://your-open-webui.com/oauth/oidc/callback`.
5.  Tome nota del **ID de cliente** y **secreto de cliente** proporcionados en la pestaña **General** de la aplicación. Necesitará estos para la configuración de Open WebUI.
6.  Asegúrese de que los usuarios o grupos correctos estén asignados a esta aplicación en la pestaña **Asignaciones**.

### 2. Agregar una afirmación de grupos al token ID

**(Opcional)** Para habilitar la gestión automática de grupos en Open WebUI basada en los grupos de Okta, debe configurar Okta para enviar las membresías de grupos de usuario en el token ID. Si solo necesita el inicio de sesión SSO y prefiere gestionar los grupos manualmente dentro de Open WebUI, puede omitir esta sección.

1.  En la Consola de administración, vaya a **Aplicaciones > Aplicaciones** y seleccione su aplicación cliente OIDC.
2.  Vaya a la pestaña **Inicio de sesión** y haga clic en **Editar** en la sección **OpenID Connect ID Token**.
3.  En la sección **Tipo de afirmación de grupos**, seleccione **Filtrar**.
4.  En la sección **Filtro de afirmación de grupos:**
    *   Ingrese `groups` como el nombre de la afirmación (o use el predeterminado si está presente).
    *   Seleccione **Coincide con regex** en el menú desplegable.
    *   Ingrese `.*` en el campo regex. Esto incluirá todos los grupos a los que pertenece el usuario. Puede usar un regex más específico si es necesario.
5.  Haga clic en **Guardar**.
6.  Haga clic en el enlace **Volver a aplicaciones**.
7.  Desde el menú desplegable del botón **Más** para su aplicación, haga clic en **Actualizar datos de la aplicación**.

*Para configuraciones más avanzadas de afirmación de grupos, consulte la documentación de Okta sobre [personalización de tokens](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) y [funciones de grupos](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions).*

## Configuración de Open WebUI

Para habilitar Okta OIDC SSO en Open WebUI, necesita configurar las siguientes variables de entorno principales. Se requieren variables adicionales si desea habilitar la función opcional de gestión de grupos.

```bash
# --- Configuración principal de OIDC ---
# Habilite el registro OAuth si desea que los usuarios puedan crear cuentas a través de Okta
# ENABLE_OAUTH_SIGNUP="true"

# ID de cliente de su aplicación Okta
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# Secreto de cliente de su aplicación Okta
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# URL de descubrimiento OIDC de su organización Okta
# Formato: https://<your-okta-domain>/.well-known/openid-configuration
# O para un servidor de autorización específico: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# Nombre mostrado en el botón de inicio de sesión (por ejemplo, "Iniciar sesión con Okta")
OAUTH_PROVIDER_NAME="Okta"

# Alcances a solicitar (el predeterminado suele ser suficiente)
# OAUTH_SCOPES="openid email profile groups" # Asegúrese de que 'groups' esté incluido si no es predeterminado

# --- Gestión de grupos OAuth (Opcional) ---
# Configúrelo en "true" solo si configuró la afirmación de grupos en Okta (Paso 2)
# y quieren que los grupos de Open WebUI se gestionen basándose en los grupos de Okta al iniciar sesión.
# Esto sincroniza los grupos existentes. Los usuarios serán añadidos/eliminados de los grupos de Open WebUI
# para coincidir con sus reclamaciones de grupo de Okta.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# Requerido solo si ENABLE_OAUTH_GROUP_MANAGEMENT es verdadero.
# El nombre de la reclamación en el token ID que contiene información de grupos (debe coincidir con la configuración de Okta)
# OAUTH_GROUP_CLAIM="groups"

# Opcional: habilitar la creación Just-in-Time (JIT) de grupos si existen en las reclamaciones de Okta pero no en Open WebUI.
# Requiere ENABLE_OAUTH_GROUP_MANAGEMENT="true".
# Si se establece en falso (predeterminado), solo se sincronizarán los grupos existentes.
# ENABLE_OAUTH_GROUP_CREATION="false"
```

Reemplace `YOUR_OKTA_CLIENT_ID`, `YOUR_OKTA_CLIENT_SECRET` y `YOUR_OKTA_OIDC_DISCOVERY_URL` con los valores reales de la configuración de la aplicación Okta.

Para habilitar la sincronización de grupos basada en las reclamaciones de Okta, establezca `ENABLE_OAUTH_GROUP_MANAGEMENT="true"` y asegúrese de que `OAUTH_GROUP_CLAIM` coincida con el nombre de la reclamación configurada en Okta (predeterminado es `groups`).

Para *también* habilitar la creación automática Just-in-Time (JIT) de grupos que existen en Okta pero aún no en Open WebUI, establezca `ENABLE_OAUTH_GROUP_CREATION="true"`. Puede dejar esto en `false` si solo desea gestionar la membresía de los grupos que ya existen en Open WebUI.

:::warning Gestión de Membresía de Grupos
Cuando `ENABLE_OAUTH_GROUP_MANAGEMENT` está configurado en `true`, la membresía de grupos de un usuario en Open WebUI será **estrictamente sincronizada** con los grupos recibidos en sus reclamaciones de Okta en cada inicio de sesión. Esto significa:
*   Los usuarios serán **añadidos** a los grupos de Open WebUI que coincidan con sus reclamaciones de Okta.
*   Los usuarios serán **eliminados** de cualquier grupo de Open WebUI (incluidos aquellos creados o asignados manualmente dentro de Open WebUI) si esos grupos **no** están presentes en sus reclamaciones de Okta para esa sesión de inicio.

Asegúrese de que todos los grupos necesarios estén correctamente configurados y asignados dentro de Okta e incluidos en la reclamación de grupos.
:::

:::info Persistencia de Sesión en Despliegues Multinodo

Al desplegar Open WebUI en múltiples nodos (por ejemplo, en un clúster de Kubernetes o detrás de un balanceador de carga), es crucial garantizar la persistencia de sesión para una experiencia de usuario sin interrupciones, especialmente con SSO. Establezca la variable de entorno `WEBUI_SECRET_KEY` con un valor **seguro y único** en **todas** las instancias de Open WebUI.
:::

```bash
# Ejemplo: Generar una clave secreta sólida (por ejemplo, usando openssl rand -hex 32)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

Si esta clave no es consistente en todos los nodos, los usuarios pueden verse obligados a iniciar sesión nuevamente si su sesión es dirigida a un nodo diferente, ya que el token de sesión firmado por un nodo no será válido en otro. De forma predeterminada, la imagen de Docker genera una clave aleatoria al primer inicio, lo cual no es adecuado para configuraciones multinodo.

:::tip Deshabilitar el Formulario de Inicio de Sesión Estándar

Si tiene intención de permitir *solo* inicios de sesión mediante Okta (y otros proveedores OAuth configurados), puede deshabilitar el formulario estándar de inicio de sesión de correo electrónico/contraseña configurando la siguiente variable de entorno:
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger Prerrequisito Importante
Configurar `ENABLE_LOGIN_FORM="false"` **requiere** que también se establezca `ENABLE_OAUTH_SIGNUP="true"`. Si desactiva el formulario de inicio de sesión sin habilitar el registro OAuth, **los usuarios (incluidos administradores) no podrán iniciar sesión.** Asegúrese de que al menos un proveedor OAuth esté configurado y que `ENABLE_OAUTH_SIGNUP` esté habilitado antes de desactivar el formulario estándar de inicio de sesión.
:::

Reinicie su instancia de Open WebUI después de configurar estas variables de entorno.

## Verificación

1.  Navegue a la página de inicio de sesión de Open WebUI. Debería ver un botón con la etiqueta "Iniciar sesión con Okta" (o lo que haya configurado para `OAUTH_PROVIDER_NAME`).
2.  Haga clic en el botón y autentíquese a través del flujo de inicio de sesión de Okta.
3.  Tras una autenticación exitosa, debería ser redirigido nuevamente a Open WebUI e iniciar sesión.
4.  Si `ENABLE_OAUTH_GROUP_MANAGEMENT` es verdadero, inicie sesión como un usuario que no sea administrador. Sus grupos dentro de Open WebUI ahora deberían reflejar estrictamente sus membresías actuales de grupo en Okta (cualquier membresía en grupos *no* presentes en la reclamación de Okta será eliminada). Si también está activado `ENABLE_OAUTH_GROUP_CREATION`, cualquier grupo presente en las reclamaciones de Okta del usuario que no existía previamente en Open WebUI debería haberse creado automáticamente. Tenga en cuenta que los grupos de los usuarios administradores no se actualizan automáticamente mediante SSO.
5.  Verifique los registros del servidor Open WebUI para cualquier error relacionado con OIDC o grupos si encuentra problemas.

## Solución de Problemas

*   **400 Bad Request/Redirect URI Mismatch:** Verifique que la **URI de redirección de inicio de sesión** en su aplicación Okta coincida exactamente con `<your-open-webui-url>/oauth/oidc/callback`.
*   **Los Grupos No Se Sincronizan:** Verifique que la variable de entorno `OAUTH_GROUP_CLAIM` coincida con el nombre de la reclamación configurada en los ajustes del Token ID de Okta. Asegúrese de que el usuario haya cerrado sesión y vuelto a iniciar sesión tras los cambios de grupo: se requiere un flujo de inicio de sesión para actualizar OIDC. Recuerde que los grupos de administradores no se sincronizan.
*   **Errores de configuración:** Revise los registros del servidor Open WebUI para obtener mensajes de error detallados relacionados con la configuración de OIDC.
*   Consulte la [Documentación oficial de SSO de Open WebUI](/features/sso.md).
*   Consulte la [Documentación para desarrolladores de Okta](https://developer.okta.com/docs/).