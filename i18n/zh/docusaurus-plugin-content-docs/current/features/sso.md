---
sidebar_position: 19
title: "🔒 SSO: 联邦认证支持"
---

# 联邦认证支持

Open WebUI 支持多种形式的联邦认证：

1. OAuth2
    1. 谷歌
    1. 微软
    1. Github
    1. OIDC
1. 信任的标头

## OAuth

OAuth 有几个全局配置选项：

1. `ENABLE_OAUTH_SIGNUP` - 如果为 `true`，则允许通过 OAuth 登录时创建账户。与 `ENABLE_SIGNUP` 不同。
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - 允许登录与 OAuth 提供的电子邮件地址匹配的账户。
    - 这被认为是不安全的，因为并非所有 OAuth 提供者都会验证电子邮件地址，可能会导致账户被劫持。
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - 如果为 `true`，用户将使用 OAuth 提供的个人资料图片在登录时更新。
    - 如果通过将 `OAUTH_PICTURE_CLAIM` 设置为空字符串来禁用 OAuth 图片声明，则此配置将被忽略。
1. `OAUTH_PICTURE_CLAIM` - 可用于自定义或禁用个人资料图片存储。默认值为 `picture`，适用于大多数提供者；如果设置为空字符串，则所有用户将收到默认的个人资料图片。

### 谷歌

要配置 Google OAuth 客户端，请参考 [谷歌文档](https://support.google.com/cloud/answer/6158849) 了解如何为**网络应用程序**创建 Google OAuth 客户端。
允许的重定向 URI 应包括 `<open-webui>/oauth/google/callback`。

需要以下环境变量：

1. `GOOGLE_CLIENT_ID` - Google OAuth 客户端 ID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth 客户端密钥

### 微软

要配置 Microsoft OAuth 客户端，请参考 [微软文档](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) 了解如何为**网络应用程序**创建 Microsoft OAuth 客户端。
允许的重定向 URI 应包括 `<open-webui>/oauth/microsoft/callback`。

目前对 Microsoft OAuth 的支持仅限于单一租户，即单个 Entra 组织或个人 Microsoft 账户。

需要以下环境变量：

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth 客户端 ID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth 客户端密钥
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft 租户 ID - 对于个人账户使用 `9188040d-6c67-4c5b-b112-36a304b66dad`

### Github

要配置 Github OAuth 客户端，请参考 [Github 文档](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) 了解如何为**网络应用程序**创建 OAuth App 或 Github App。
允许的重定向 URI 应包括 `<open-webui>/oauth/github/callback`。

需要以下环境变量：

1. `GITHUB_CLIENT_ID` - Github OAuth App 客户端 ID
1. `GITHUB_CLIENT_SECRET` - Github OAuth App 客户端密钥

### OIDC

任何支持 OIDC 的认证提供者都可以进行配置。
`email` 声明是必需的。
`name` 和 `picture` 声明将在可用时使用。
允许的重定向 URI 应包括 `<open-webui>/oauth/oidc/callback`。

使用以下环境变量：

1. `OAUTH_CLIENT_ID` - OIDC 客户端 ID
1. `OAUTH_CLIENT_SECRET` - OIDC 客户端密钥
1. `OPENID_PROVIDER_URL` - OIDC well known URL，例如 `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - 在 UI 中显示的提供者名称，默认为 SSO
1. `OAUTH_SCOPES` - 要请求的作用域。默认为 `openid email profile`

### OAuth 角色管理

任何可以配置为在访问令牌中返回角色的 OAuth 提供者都可以用于管理 Open WebUI 的角色。
要使用此功能，将 `ENABLE_OAUTH_ROLE_MANAGEMENT` 设置为 `true`。
您可以配置以下环境变量以匹配 OAuth 提供者返回的角色：

1. `OAUTH_ROLES_CLAIM` - 包含角色的声明。默认为 `roles`。也可以嵌套，例如 `user.roles`。
1. `OAUTH_ALLOWED_ROLES` - 允许登录的角色的逗号分隔列表（接收 open webui 角色 `user`）。
1. `OAUTH_ADMIN_ROLES` - 允许以管理员身份登录的角色的逗号分隔列表（接收 open webui 角色 `admin`）。

:::info

如果更改已登录用户的角色，用户需要注销并重新登录以接收新角色。

:::

### OAuth 组管理

任何可以配置为在访问令牌中返回组的 OAuth 提供者都可以用于在用户登录时管理 Open WebUI 中的用户组。
要启用此同步，请将 `ENABLE_OAUTH_GROUP_MANAGEMENT` 设置为 `true`。

您可以配置以下环境变量：

1. `OAUTH_GROUP_CLAIM` - ID/访问令牌中包含用户组成员资格的声明。默认为 `groups`。也可以嵌套，例如 `user.memberOf`。如果 `ENABLE_OAUTH_GROUP_MANAGEMENT` 为 true，则必填。
1. `ENABLE_OAUTH_GROUP_CREATION` - 如果设置为 `true`（并且 `ENABLE_OAUTH_GROUP_MANAGEMENT` 也为 `true`），Open WebUI 将执行 **即时（JIT）群组创建**。这意味着在 OAuth 登录时，如果用户的 OAuth 声明中存在的群组在系统中尚不存在，它将自动创建群组。默认值为 `false`。如果设置为 `false`，则仅管理属于 *现有* Open WebUI 群组的成员关系。

:::警告 严格的群组同步
当 `ENABLE_OAUTH_GROUP_MANAGEMENT` 设置为 `true` 时，用户在 Open WebUI 中的群组成员关系会根据每次登录时接收到的 OAuth 声明 **严格同步**。

* 用户会被 **添加** 到与其 OAuth 声明匹配的 Open WebUI 群组。
* 用户会被从任何 Open WebUI 群组中 **移除**（包括那些在 Open WebUI 中手动创建或分配的群组），如果这些群组在该次登录会话中 **未出现在其 OAuth 声明中**。

确保所有必要的群组在您的 OAuth 提供者中正确配置，并包含在群组声明（`OAUTH_GROUP_CLAIM`）中。
:::

:::警告 管理员用户
管理员用户的群组成员关系 **不会** 通过 OAuth 群组管理自动更新。
:::

:::信息 登录需要更新

如果用户在 OAuth 提供者中的群组发生了变化，他们需要注销 Open WebUI，然后重新登录，以反映这些变化。

:::

## 可信头

Open WebUI 可以将身份验证委托给用户详细信息通过 HTTP 头传递的认证反向代理。
页面中提供了几个示例配置。

:::危险

错误的配置可能允许用户以您的 Open WebUI 实例中的任何用户身份进行认证。
确保仅允许认证代理访问 Open WebUI，例如设置 `HOST=127.0.0.1` 以仅监听本地回环接口。

:::

### 通用配置

当设置 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 环境变量时，Open WebUI 将使用指定头的值作为用户的电子邮件地址，处理自动注册和登录。

例如，设置 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` 并传递 `X-User-Email: example@example.com` 的 HTTP 头，将使用电子邮件 `example@example.com` 验证请求。

您还可以选择定义 `WEBUI_AUTH_TRUSTED_NAME_HEADER` 来确定使用可信头创建的用户的名称。如果用户已经存在，此设置无效。

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) 允许您在 tailnet 中共享服务，且 Tailscale 将设置 `Tailscale-User-Login` 头为请求者的电子邮件地址。

下面是一个带有对应的 Docker Compose 文件的 Serve 配置示例。该文件启动了一个 Tailscale 辅助容器，将 Open WebUI 暴露给 tailnet，使用标签 `open-webui` 和主机名 `open-webui`，并可以通过 `https://open-webui.TAILNET_NAME.ts.net` 访问。
您需要创建一个具有设备写权限的 OAuth 客户端，并将该客户端的令牌传递到 Tailscale 容器中作为 `TS_AUTHKEY`。

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

:::警告

如果您在与 Open WebUI 相同的网络上下文中运行 Tailscale，默认情况下用户可以直接访问 Open WebUI 而无需经过 Serve 代理。
您需要使用 Tailscale 的 ACL 限制仅访问端口 443。

:::

### Cloudflare Tunnel 与 Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) 可以与 [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) 一起使用，通过 SSO 保护 Open WebUI。
Cloudflare 几乎没有文档说明，但 `Cf-Access-Authenticated-User-Email` 会设置为经过身份验证的用户的电子邮件地址。

下面是一个设置 Cloudflare 辅助容器的 Docker Compose 文件示例。
配置通过仪表板完成。
从仪表板获取一个隧道令牌，将隧道后端设置为 `http://open-webui:8080`，确保“通过 Access 保护”选项已勾选并配置。

```yaml title="docker-compose.yaml"
---
服务:
  open-webui:
    镜像: ghcr.io/open-webui/open-webui:main
    卷:
      - open-webui:/app/backend/data
    环境变量:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    重启: unless-stopped
  cloudflared:
    镜像: cloudflare/cloudflared:latest
    环境变量:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    命令: tunnel run
    重启: unless-stopped

卷:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) 是一个实现社交 OAuth 提供方和 OIDC 支持的认证反向代理。

鉴于潜在配置数量多，下面是一个使用 Google OAuth 的示例配置。
请参阅 `oauth2-proxy` 的文档以获取详细的设置方法及任何潜在的安全问题提示。

```yaml title="docker-compose.yaml"
服务:
  open-webui:
    镜像: ghcr.io/open-webui/open-webui:main
    卷:
      - open-webui:/app/backend/data
    环境变量:
      - 'HOST=127.0.0.1'
      - 'WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email'
      - 'WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User'
    重启: unless-stopped
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
    重启: unless-stopped
    端口:
      - 4180:4180/tcp
```


### Authentik

要配置 [Authentik](https://goauthentik.io/) 的 OAuth 客户端，请参考 [文档](https://docs.goauthentik.io/docs/applications) 了解如何创建应用程序和 `OAuth2/OpenID 提供方`。
允许的重定向 URI 应包括 `<open-webui>/oauth/oidc/callback`。

在创建提供方时，请记录 `应用名称`、`客户端 ID` 和 `客户端密钥`，并将它们用于 open-webui 环境变量:

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

[Authelia](https://www.authelia.com/) 可以配置为返回适用于可信头验证的头信息。
文档请参阅[此处](https://www.authelia.com/integration/trusted-header-sso/introduction/)。

由于部署 Authelia 的复杂性，未提供示例配置。
