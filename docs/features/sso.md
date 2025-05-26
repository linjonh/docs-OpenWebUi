---
sidebar_position: 19
title: "🔒 SSO：联合认证支持"
---

# 联合认证支持

Open WebUI支持多种形式的联合认证：

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. 可信头

## OAuth

OAuth有以下全局配置选项：

1. `ENABLE_OAUTH_SIGNUP` - 如果为`true`，允许使用OAuth登录时创建账户。与`ENABLE_SIGNUP`不同。
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - 允许登录与OAuth提供的电子邮件地址匹配的账户。
    - 这被认为是不安全的，因为并不是所有的OAuth提供商都会验证电子邮件地址，可能会导致账户被劫持。
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - 如果为`true`，用户将在登录时更新OAuth提供的个人资料图片。
    - 如果通过设置`OAUTH_PICTURE_CLAIM`为空字符串禁用OAuth图片声明，则会忽略此配置。
1. `OAUTH_PICTURE_CLAIM` - 可用于自定义或禁用个人资料图片存储。默认值`picture`对大多数提供商有效；如果设置为空字符串，则所有用户将接收默认的人物头像。

### Google

要配置Google OAuth客户端，请参阅[Google的文档](https://support.google.com/cloud/answer/6158849)，了解如何为**Web应用程序**创建Google OAuth客户端。
允许的重定向URI应包括`<open-webui>/oauth/google/callback`。

需要以下环境变量：

1. `GOOGLE_CLIENT_ID` - Google OAuth客户端ID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth客户端密钥

### Microsoft

要配置Microsoft OAuth客户端，请参阅[Microsoft的文档](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)，了解如何为**Web应用程序**创建Microsoft OAuth客户端。
允许的重定向URI应包括`<open-webui>/oauth/microsoft/callback`。

目前对Microsoft OAuth的支持仅限于单一租户，即单一Entra组织或个人Microsoft账户。

需要以下环境变量：

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth客户端ID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth客户端密钥
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft租户ID - 对于个人账户使用`9188040d-6c67-4c5b-b112-36a304b66dad`

### Github

要配置Github OAuth客户端，请参阅[Github的文档](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)，了解如何为**Web应用程序**创建OAuth应用或Github应用。
允许的重定向URI应包括`<open-webui>/oauth/github/callback`。

需要以下环境变量：

1. `GITHUB_CLIENT_ID` - Github OAuth应用客户端ID
1. `GITHUB_CLIENT_SECRET` - Github OAuth应用客户端密钥

### OIDC

任何支持OIDC的认证提供商都可以进行配置。
`email`声明是必需的。
`name`和`picture`声明在可用时会被使用。
允许的重定向URI应包括`<open-webui>/oauth/oidc/callback`。

使用以下环境变量：

1. `OAUTH_CLIENT_ID` - OIDC客户端ID
1. `OAUTH_CLIENT_SECRET` - OIDC客户端密钥
1. `OPENID_PROVIDER_URL` - OIDC通用URL，例如`https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - 在UI中显示的提供商名称，默认为SSO
1. `OAUTH_SCOPES` - 要请求的范围。默认为`openid email profile`

### OAuth角色管理

任何能够配置返回角色的访问令牌OAuth提供商都可以被用于在Open WebUI中管理角色。
要使用此功能，请将`ENABLE_OAUTH_ROLE_MANAGEMENT`设置为`true`。
可以配置以下环境变量以匹配OAuth提供商返回的角色：

1. `OAUTH_ROLES_CLAIM` - 包含角色的声明。默认值为`roles`。也可以嵌套，例如`user.roles`。
1. `OAUTH_ALLOWED_ROLES` - 允许登录的角色的逗号分隔列表（接收open webui角色`user`）。
1. `OAUTH_ADMIN_ROLES` - 允许以管理员身份登录的角色的逗号分隔列表（接收open webui角色`admin`）。

:::info

如果更改已登录用户的角色，他们需要注销并重新登录以接收新角色。

:::

### OAuth组管理

任何能够配置返回组信息的访问令牌OAuth提供商都可以在用户登录时用于管理Open WebUI中的用户组。
要启用此同步功能，请将`ENABLE_OAUTH_GROUP_MANAGEMENT`设置为`true`。

可以配置以下环境变量：

1. `OAUTH_GROUP_CLAIM` - ID/访问令牌中包含用户组成员资格的声明。默认值为`groups`。也可以嵌套，例如`user.memberOf`。如果`ENABLE_OAUTH_GROUP_MANAGEMENT`为true，则必需配置。
1. `ENABLE_OAUTH_GROUP_CREATION` - 如果设置为 `true`（同时 `ENABLE_OAUTH_GROUP_MANAGEMENT` 也为 `true`），Open WebUI 将执行 **即时 (JIT) 组创建**。这意味着它将在 OAuth 登录期间自动创建组，如果这些组存在于用户的 OAuth 声明中但尚未在系统中创建。默认为 `false`。如果设置为 `false`，则仅管理用户属于 Open WebUI *现有*组的成员关系。

:::warning 严格的组同步
当 `ENABLE_OAUTH_GROUP_MANAGEMENT` 设置为 `true` 时，用户在 Open WebUI 中的组成员关系会与每次登录时 OAuth 声明中接收的组严格同步。

*   用户会自动**添加**到与其 OAuth 声明匹配的 Open WebUI 组。
*   如果用户在本次登录会话中 OAuth 声明中**未包含**的组，则用户会从任何 Open WebUI 组中**移除**（包括那些手动创建或在 Open WebUI 中分配的组）。

确保所有必要的组在您的 OAuth 提供程序中正确配置，并包括在组声明 (`OAUTH_GROUP_CLAIM`) 中。
:::

:::warning 管理员用户
管理员用户的组成员关系**不会**通过 OAuth 组管理自动更新。
:::

:::info 需要登录以完成更新

如果用户的组在 OAuth 提供程序中发生变化，他们需要退出 Open WebUI 并重新登录以使更改生效。

:::

## 可信请求头

Open WebUI 可以将身份认证委托给一个认证的反向代理，该代理通过 HTTP 请求头传递用户详细信息。
本页面提供了几个配置示例。

:::danger

配置错误可能允许用户在您的 Open WebUI 实例中以任意用户身份认证。
确保仅允许认证代理访问 Open WebUI，例如通过设置 `HOST=127.0.0.1` 仅监听环回接口。

:::

### 通用配置

当设置了 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 环境变量时，Open WebUI 将使用指定请求头中的值作为用户的电子邮件地址进行自动注册和登录。

例如，设置 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` 并传递 HTTP 请求头 `X-User-Email: example@example.com`，则使用电子邮件 `example@example.com` 认证请求。

另外，可以定义 `WEBUI_AUTH_TRUSTED_NAME_HEADER` 来确定通过可信请求头创建的用户的名称。如果用户已存在，则此设置无效。

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) 允许您在 Tailscale 网络中共享服务，并且 Tailscale 会设置请求头 `Tailscale-User-Login` 包含请求者的电子邮件地址。

以下是一个 Serve 配置示例及相应的 Docker Compose 文件，它启动一个 Tailscale 边车，将 Open WebUI 暴露给具有 `open-webui` 标签和主机名 `open-webui` 的 Tailscale 网络，并可通过 `https://open-webui.TAILNET_NAME.ts.net` 访问。
您需要创建一个具有设备写权限的 OAuth 客户端，并将其作为 `TS_AUTHKEY` 传入 Tailscale 容器。

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

如果您在与 Open WebUI 相同的网络上下文中运行 Tailscale，则默认情况下用户可以直接访问 Open WebUI，而无需经过 Serve 代理。
您需要使用 Tailscale 的 ACL 限制仅访问端口 443。

:::

### 使用 Cloudflare Tunnel 和 Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) 可以与 [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) 配合使用，通过 SSO 保护 Open WebUI。
虽然 Cloudflare 的官方文档几乎未提到此配合，但请求头 `Cf-Access-Authenticated-User-Email` 被设置为已认证用户的电子邮件地址。

以下是一个设置 Cloudflare 边车的 Docker Compose 文件示例。
通过仪表盘进行配置。
从仪表盘获取隧道令牌，将隧道后端设置为 `http://open-webui:8080`，并确保启用 "Protect with Access" 功能并完成配置。

```yaml title="docker-compose.yaml"
---
服务项目:
  open-webui:
    镜像: ghcr.io/open-webui/open-webui:main
    卷:
      - open-webui:/app/backend/data
    环境变量:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    重启策略: unless-stopped
  cloudflared:
    镜像: cloudflare/cloudflared:latest
    环境变量:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    命令: tunnel run
    重启策略: unless-stopped

卷:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) 是一个支持社会化OAuth供应商和OIDC的身份验证反向代理。

由于潜在的配置项非常多，下面提供了一个使用Google OAuth的示例设置。
请参考`oauth2-proxy`的文档以获取详细的设置及可能存在的安全注意事项。

```yaml title="docker-compose.yaml"
服务项目:
  open-webui:
    镜像: ghcr.io/open-webui/open-webui:main
    卷:
      - open-webui:/app/backend/data
    环境变量:
      - 'HOST=127.0.0.1'
      - 'WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email'
      - 'WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User'
    重启策略: unless-stopped
  oauth2-proxy:
    镜像: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    环境变量:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    重启策略: unless-stopped
    端口:
      - 4180:4180/tcp
```


### Authentik

配置 [Authentik](https://goauthentik.io/) OAuth 客户端，请参考[文档](https://docs.goauthentik.io/docs/applications)了解如何创建应用程序以及`OAuth2/OpenID Provider`。
允许的重定向 URI 应包括 `<open-webui>/oauth/oidc/callback`。

创建提供者时，请记录下`应用名称`、`客户端ID`和`客户端密钥`，并将其用在open-webui环境变量中:

```
      - 'ENABLE_OAUTH_SIGNUP=true'
      - 'OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true'
      - 'OAUTH_PROVIDER_NAME=Authentik'
      - 'OPENID_PROVIDER_URL=https://<authentik-url>/application/o/<App-name>/.well-known/openid-configuration'
      - 'OAUTH_CLIENT_ID=<Client-ID>'
      - 'OAUTH_CLIENT_SECRET=<Client-Secret>'
      - 'OAUTH_SCOPES=openid email profile'
      - 'OPENID_REDIRECT_URI=https://<open-webui>/oauth/oidc/callback'
```

### Authelia

[Authelia](https://www.authelia.com/) 可以配置为返回一个用于受信任头部身份验证的标头。
文档请参考[这里](https://www.authelia.com/integration/trusted-header-sso/introduction/)。

由于部署Authelia的复杂性，未提供示例配置。
