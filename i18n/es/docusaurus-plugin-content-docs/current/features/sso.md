---
sidebar_position: 19
title: "🔒 SSO: Soporte para Autenticación Federada"
---

# Soporte para Autenticación Federada

Open WebUI admite varias formas de autenticación federada:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. Encabezado de Confianza

## OAuth

Existen varias opciones de configuración global para OAuth:

1. `ENABLE_OAUTH_SIGNUP` - si es `true`, permite crear cuentas al iniciar sesión con OAuth. Diferente de `ENABLE_SIGNUP`.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - permite iniciar sesión en una cuenta que coincide con la dirección de correo electrónico proporcionada por el proveedor de OAuth.
    - Esto se considera inseguro ya que no todos los proveedores de OAuth verifican las direcciones de correo electrónico y puede permitir el secuestro de cuentas.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - si es `true`, las imágenes de perfil proporcionadas por OAuth se actualizarán al iniciar sesión.
    - Si el atributo de imagen de OAuth está deshabilitado configurando `OAUTH_PICTURE_CLAIM` como una cadena vacía, esta configuración será ignorada.
1. `OAUTH_PICTURE_CLAIM` - puede usarse para personalizar o deshabilitar el almacenamiento de imágenes de perfil. El valor predeterminado, `picture`, funcionará para la mayoría de los proveedores; si se establece en una cadena vacía, todos los usuarios recibirán la imagen de perfil de persona predeterminada.

### Google

Para configurar un cliente OAuth de Google, consulta la [documentación de Google](https://support.google.com/cloud/answer/6158849) sobre cómo crear un cliente OAuth de Google para una **aplicación web**.
El URI de redirección permitido debe incluir `<open-webui>/oauth/google/callback`.

Se requieren las siguientes variables de entorno:

1. `GOOGLE_CLIENT_ID` - ID de cliente OAuth de Google
1. `GOOGLE_CLIENT_SECRET` - Secreto de cliente OAuth de Google

### Microsoft

Para configurar un cliente OAuth de Microsoft, consulta la [documentación de Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) sobre cómo crear un cliente OAuth de Microsoft para una **aplicación web**.
El URI de redirección permitido debe incluir `<open-webui>/oauth/microsoft/callback`.

El soporte para OAuth de Microsoft actualmente está limitado a un solo inquilino, es decir, una única organización de Entra o cuentas personales de Microsoft.

Se requieren las siguientes variables de entorno:

1. `MICROSOFT_CLIENT_ID` - ID de cliente OAuth de Microsoft
1. `MICROSOFT_CLIENT_SECRET` - Secreto de cliente OAuth de Microsoft
1. `MICROSOFT_CLIENT_TENANT_ID` - ID del inquilino de Microsoft - usa `9188040d-6c67-4c5b-b112-36a304b66dad` para cuentas personales

### Github

Para configurar un Cliente OAuth de Github, consulta la [documentación de Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) sobre cómo crear una Aplicación OAuth o Aplicación de Github para una **aplicación web**.
El URI de redirección permitido debe incluir `<open-webui>/oauth/github/callback`.

Se requieren las siguientes variables de entorno:

1. `GITHUB_CLIENT_ID` - ID de Cliente de Aplicación OAuth de Github
1. `GITHUB_CLIENT_SECRET` - Secreto de Cliente de Aplicación OAuth de Github

### OIDC

Se puede configurar cualquier proveedor de autenticación que admita OIDC.
Se requiere el atributo `email`.
Los atributos `name` y `picture` se utilizan si están disponibles.
El URI de redirección permitido debe incluir `<open-webui>/oauth/oidc/callback`.

Se utilizan las siguientes variables de entorno:

1. `OAUTH_CLIENT_ID` - ID de cliente OIDC
1. `OAUTH_CLIENT_SECRET` - Secreto de cliente OIDC
1. `OPENID_PROVIDER_URL` - URL conocida de OIDC, por ejemplo `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - Nombre del proveedor que se mostrará en la interfaz de usuario, por defecto es SSO
1. `OAUTH_SCOPES` - Alcances a solicitar. Por defecto es `openid email profile`

### Gestión de Roles OAuth

Cualquier proveedor de OAuth que pueda configurarse para devolver roles en el token de acceso puede usarse para gestionar roles en Open WebUI.
Para usar esta función, configura `ENABLE_OAUTH_ROLE_MANAGEMENT` como `true`.
Puedes configurar las siguientes variables de entorno para coincidir con los roles devueltos por el proveedor de OAuth:

1. `OAUTH_ROLES_CLAIM` - El atributo que contiene los roles. Por defecto es `roles`. También puede ser anidado, por ejemplo `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - Una lista separada por comas de roles que tienen permitido iniciar sesión (reciben el rol `user` en open webui).
1. `OAUTH_ADMIN_ROLES` - Una lista separada por comas de roles que tienen permitido iniciar sesión como administrador (reciben el rol `admin` en open webui).

:::info

Si se cambia el rol de un usuario que ha iniciado sesión, necesitará cerrar sesión y volver a iniciar sesión para recibir el nuevo rol.

:::

### Gestión de Grupos OAuth

Cualquier proveedor OAuth que pueda configurarse para devolver grupos en el token de acceso puede usarse para gestionar grupos de usuarios en Open WebUI tras el inicio de sesión del usuario.
Para habilitar esta sincronización, configura `ENABLE_OAUTH_GROUP_MANAGEMENT` como `true`.

Puedes configurar las siguientes variables de entorno:

1. `OAUTH_GROUP_CLAIM` - El atributo en el token de ID/acceso que contiene las membresías de grupo del usuario. Por defecto es `groups`. También puede ser anidado, por ejemplo, `user.memberOf`. Requerido si `ENABLE_OAUTH_GROUP_MANAGEMENT` es true.
1. `ENABLE_OAUTH_GROUP_CREATION` - Si está configurado como `true` (y `ENABLE_OAUTH_GROUP_MANAGEMENT` también está configurado como `true`), Open WebUI realizará **creación de grupos Just-in-Time (JIT)**. Esto significa que creará grupos automáticamente durante el inicio de sesión con OAuth si están presentes en las declaraciones OAuth del usuario pero aún no existen en el sistema. Por defecto es `false`. Si es `false`, solo se gestionarán las membresías en grupos *existentes* de Open WebUI.

:::warning Sincronización Estricta de Grupos
Cuando `ENABLE_OAUTH_GROUP_MANAGEMENT` está configurado como `true`, las membresías de usuario en grupos de Open WebUI se **sincronizan estrictamente** con los grupos recibidos en sus declaraciones OAuth en cada inicio de sesión.

*   Los usuarios serán **añadidos** a los grupos de Open WebUI que coincidan con sus declaraciones OAuth.
*   Los usuarios serán **eliminados** de cualquier grupo de Open WebUI (incluidos aquellos creados o asignados manualmente dentro de Open WebUI) si esos grupos **no** están presentes en sus declaraciones OAuth en esa sesión de inicio de sesión.

Asegúrate de que todos los grupos necesarios estén configurados correctamente en tu proveedor de OAuth y estén incluidos en la declaración de grupos (`OAUTH_GROUP_CLAIM`).
:::

:::warning Usuarios Administradores
Las membresías de grupo de los usuarios administradores **no** se actualizan automáticamente mediante la gestión de grupos OAuth.
:::

:::info Inicio de Sesión Requerido para Actualizaciones

Si los grupos de un usuario cambian en el proveedor OAuth, necesitarán cerrar sesión en Open WebUI e iniciar sesión nuevamente para que los cambios se reflejen.

:::

## Encabezado de Confianza

Open WebUI puede delegar la autenticación a un proxy inverso que autentique y pase los detalles del usuario en los encabezados HTTP.
En esta página se proporcionan varias configuraciones de ejemplo.

:::danger

Una configuración incorrecta puede permitir a los usuarios autenticarse como cualquier otro usuario en tu instancia de Open WebUI.
Asegúrate de permitir el acceso a Open WebUI únicamente al proxy de autenticación, como configurar `HOST=127.0.0.1` para que escuche solo en la interfaz de loopback.

:::

### Configuración Genérica

Cuando la variable de entorno `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` está configurada, Open WebUI usará el valor del encabezado especificado como la dirección de correo electrónico del usuario, gestionando el registro e inicio de sesión automáticos.

Por ejemplo, configurar `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` y pasar un encabezado HTTP de `X-User-Email: ejemplo@ejemplo.com` autenticaría la solicitud con el correo electrónico `ejemplo@ejemplo.com`.

Opcionalmente, también puedes definir `WEBUI_AUTH_TRUSTED_NAME_HEADER` para determinar el nombre de cualquier usuario que se cree utilizando encabezados confiables. Esto no tiene efecto si el usuario ya existe.

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) te permite compartir un servicio dentro de tu tailnet, y Tailscale configurará el encabezado `Tailscale-User-Login` con la dirección de correo electrónico del solicitante.

A continuación, se muestra un ejemplo de configuración de Serve con un archivo Docker Compose correspondiente que inicia un contenedor Tailscale, exponiendo Open WebUI al tailnet con la etiqueta `open-webui` y el nombre de host `open-webui`, y que puede ser accesible en `https://open-webui.TAILNET_NAME.ts.net`.
Necesitarás crear un cliente OAuth con permiso de escritura de dispositivo para pasarlo al contenedor Tailscale como `TS_AUTHKEY`.

```json title="tailscale/serve.json"
{
    "TCP": {
        "443": {
            "HTTPS": true
        }
    },
    "Web": {
        "${TS_CERT_DOMAIN}:443": {
            "Handlers": {
                "/": {
                    "Proxy": "http://open-webui:8080"
                }
            }
        }
    }
}

```

```yaml title="docker-compose.yaml"
---
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    environment:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Tailscale-User-Login
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=Tailscale-User-Name
    restart: unless-stopped
  tailscale:
    image: tailscale/tailscale:latest
    environment:
      - TS_AUTH_ONCE=true
      - TS_AUTHKEY=${TS_AUTHKEY}
      - TS_EXTRA_ARGS=--advertise-tags=tag:open-webui
      - TS_SERVE_CONFIG=/config/serve.json
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_HOSTNAME=open-webui
    volumes:
      - tailscale:/var/lib/tailscale
      - ./tailscale:/config
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - net_admin
      - sys_module
    restart: unless-stopped

volumes:
  open-webui: {}
  tailscale: {}
```

:::warning

Si ejecutas Tailscale en el mismo contexto de red que Open WebUI, entonces por defecto los usuarios podrán acceder directamente a Open WebUI sin pasar por el proxy Serve.
Necesitarás usar las ACL de Tailscale para restringir el acceso solo al puerto 443.

:::

### Cloudflare Tunnel con Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) se puede usar con [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) para proteger Open WebUI con SSO.
Esto está escasamente documentado por Cloudflare, pero `Cf-Access-Authenticated-User-Email` se configura con la dirección de correo electrónico del usuario autenticado.

A continuación, se muestra un ejemplo de archivo Docker Compose que configura un contenedor secundario de Cloudflare.
La configuración se realiza a través del panel de control.
Desde el panel, obtén un token de túnel, configura el backend del túnel a `http://open-webui:8080` y asegúrate de que "Proteger con Access" esté marcada y configurada.

```yaml title="docker-compose.yaml"
---
servicios:
  open-webui:
    imagen: ghcr.io/open-webui/open-webui:main
    volúmenes:
      - open-webui:/app/backend/data
    entorno:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    reiniciar: salvo que se detenga
  cloudflared:
    imagen: cloudflare/cloudflared:latest
    entorno:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    comando: tunnel run
    reiniciar: salvo que se detenga

volúmenes:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) es un proxy inverso de autenticación que implementa proveedores de OAuth sociales y soporte OIDC.

Dado el gran número de configuraciones posibles, a continuación se muestra un ejemplo de una configuración potencial con Google OAuth.
Consulte la documentación de `oauth2-proxy` para configuraciones detalladas y posibles problemas de seguridad.

```yaml title="docker-compose.yaml"
servicios:
  open-webui:
    imagen: ghcr.io/open-webui/open-webui:main
    volúmenes:
      - open-webui:/app/backend/data
    entorno:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User
    reiniciar: salvo que se detenga
  oauth2-proxy:
    imagen: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    entorno:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REEMPLAZAR_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REEMPLAZAR_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REEMPLAZAR_DOMINIOS_CORREO_PERMITIDOS
      OAUTH2_PROXY_REDIRECT_URL: REEMPLAZAR_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REEMPLAZAR_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    reiniciar: salvo que se detenga
    puertos:
      - 4180:4180/tcp
```


### Authentik

Para configurar un cliente OAuth de [Authentik](https://goauthentik.io/), consulte la [documentación](https://docs.goauthentik.io/docs/applications) sobre cómo crear una aplicación y un `Proveedor OAuth2/OpenID`.
El URI de redirección permitido debe incluir `<open-webui>/oauth/oidc/callback`.

Al crear el proveedor, tome nota del `Nombre de la aplicación`, `Client-ID` y `Client-Secret`, y úselos para las variables de entorno de open-webui:

```
      - ENABLE_OAUTH_SIGNUP=true
      - OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true
      - OAUTH_PROVIDER_NAME=Authentik
      - OPENID_PROVIDER_URL=https://<authentik-url>/application/o/<App-name>/.well-known/openid-configuration
      - OAUTH_CLIENT_ID=<Client-ID>
      - OAUTH_CLIENT_SECRET=<Client-Secret>
      - OAUTH_SCOPES=openid email profile
      - OPENID_REDIRECT_URI=https://<open-webui>/oauth/oidc/callback
```

### Authelia

[Authelia](https://www.authelia.com/) se puede configurar para devolver un encabezado que se utilice con la autenticación de encabezado confiable.
La documentación está disponible [aquí](https://www.authelia.com/integration/trusted-header-sso/introduction/).

No se proporcionan configuraciones de ejemplo debido a la complejidad de implementar Authelia.
