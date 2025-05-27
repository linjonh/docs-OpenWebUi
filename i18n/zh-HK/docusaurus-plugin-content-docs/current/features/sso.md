---
sidebar_position: 19
title: "🔒 SSO: 聯邦認證支援"
---

# 聯邦認證支援

Open WebUI 支援多種形式的聯邦認證：

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. 信任標頭

## OAuth

OAuth 有一些全域配置選項：

1. `ENABLE_OAUTH_SIGNUP` - 若設定為 `true`，允許在使用 OAuth 登錄時創建帳戶。與 `ENABLE_SIGNUP` 不同。
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - 允許使用與 OAuth 提供者所提供的電子郵件地址匹配的帳戶進行登錄。
    - 這被認為是不安全的，因為並非所有 OAuth 提供者都會驗證電子郵件地址，可能導致帳戶被劫持。
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - 若設定為 `true`，用戶登錄時將更新 OAuth 提供的個人資料照片。
    - 若通過將 `OAUTH_PICTURE_CLAIM` 設定為空字串禁用 OAuth 照片聲明，此配置將被忽略。
1. `OAUTH_PICTURE_CLAIM` - 可用於自訂或禁用個人資料照片存儲。默認值 `picture` 適用於大部分提供者；若設定為空字串，所有用戶將收到默認人物個人資料照片。

### Google

要配置 Google OAuth 客戶端，請參考 [Google 的文件](https://support.google.com/cloud/answer/6158849)，了解如何為 **網頁應用程式** 創建 Google OAuth 客戶端。
允許的重定向 URI 應包括 `<open-webui>/oauth/google/callback`。

需要設定以下環境變數：

1. `GOOGLE_CLIENT_ID` - Google OAuth 客戶端 ID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth 客戶端密碼

### Microsoft

要配置 Microsoft OAuth 客戶端，請參考 [Microsoft 的文件](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)，了解如何為 **網頁應用程式** 創建 Microsoft OAuth 客戶端。
允許的重定向 URI 應包括 `<open-webui>/oauth/microsoft/callback`。

目前對 Microsoft OAuth 的支援僅限於單一租戶，即單一 Entra 組織或個人 Microsoft 帳戶。

需要設定以下環境變數：

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth 客戶端 ID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth 客戶端密碼
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft 租戶 ID - 對於個人帳戶使用 `9188040d-6c67-4c5b-b112-36a304b66dad`

### Github

要配置 Github OAuth 客戶端，請參考 [Github 的文件](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)，了解如何為 **網頁應用程式** 創建 OAuth 應用或 Github 應用。
允許的重定向 URI 應包括 `<open-webui>/oauth/github/callback`。

需要設定以下環境變數：

1. `GITHUB_CLIENT_ID` - Github OAuth 應用客戶端 ID
1. `GITHUB_CLIENT_SECRET` - Github OAuth 應用客戶端密碼

### OIDC

任何支持 OIDC 的認證提供者皆可被配置。
`email` 聲明為必需。
`name` 和 `picture` 聲明會在可用時使用。
允許的重定向 URI 應包括 `<open-webui>/oauth/oidc/callback`。

使用以下環境變數：

1. `OAUTH_CLIENT_ID` - OIDC 客戶端 ID
1. `OAUTH_CLIENT_SECRET` - OIDC 客戶端密碼
1. `OPENID_PROVIDER_URL` - OIDC well-known URL，例如 `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - 在 UI 上顯示的提供者名稱，默認為 SSO
1. `OAUTH_SCOPES` - 請求範圍。默認為 `openid email profile`

### OAuth 角色管理

任何可以配置為在訪問令牌中返回角色的 OAuth 提供者均可用於管理 Open WebUI 中的角色。
要使用此功能，請將 `ENABLE_OAUTH_ROLE_MANAGEMENT` 設置為 `true`。
您可以配置以下環境變數以匹配 OAuth 提供者返回的角色：

1. `OAUTH_ROLES_CLAIM` - 包含角色的聲明。默認為 `roles`。也可以是嵌套的，例如 `user.roles`。
1. `OAUTH_ALLOWED_ROLES` - 允許登錄的角色的逗號分隔列表（接收 Open WebUI 角色 `user`）。
1. `OAUTH_ADMIN_ROLES` - 允許以管理員身份登錄的角色的逗號分隔列表（接收 Open WebUI 角色 `admin`）。

:::info

若更改已登錄用戶的角色，用戶需要登出並重新登錄以獲取新的角色。

:::

### OAuth 群組管理

任何可以配置為在訪問令牌中返回群組的 OAuth 提供者均可用於在用戶登錄時管理 Open WebUI 中的用戶群組。
要啟用此同步功能，請將 `ENABLE_OAUTH_GROUP_MANAGEMENT` 設置為 `true`。

您可以配置以下環境變數：

1. `OAUTH_GROUP_CLAIM` - ID/訪問令牌中包含用戶群組成員資格的聲明。默認為 `groups`。也可以是嵌套的，例如 `user.memberOf`。若 `ENABLE_OAUTH_GROUP_MANAGEMENT` 為 true，此項為必需。
1. `ENABLE_OAUTH_GROUP_CREATION` - 如果設定為 `true`（且 `ENABLE_OAUTH_GROUP_MANAGEMENT` 也設定為 `true`），Open WebUI 將執行 **即時（JIT）群組創建**。這表示它將在 OAuth 登錄期間，根據使用者的 OAuth 聲明中包含的群組自動創建群組，前提是這些群組尚未在系統中存在。默認為 `false`。如果為 `false`，則僅管理屬於 *現有的* Open WebUI 群組的成員資格。

:::warning 嚴格群組同步
當 `ENABLE_OAUTH_GROUP_MANAGEMENT` 設定為 `true` 時，Open WebUI 中使用者的群組成員資格會根據其在每次登錄時 OAuth 聲明中收到的群組進行 **嚴格同步**。

* 使用者將被 **添加** 到與其 OAuth 聲明匹配的 Open WebUI 群組。
* 使用者將從任何 Open WebUI 群組（包括那些在 Open WebUI 中手動創建或分配的群組）中被 **移除**，如果這些群組 **未出現在** 本次登錄會話的 OAuth 聲明中。

請確保所有必要的群組已正確配置在您的 OAuth 提供者中，並包含於群組聲明 (`OAUTH_GROUP_CLAIM`)。
:::

:::warning 管理員使用者
管理員使用者的群組成員資格 **不會** 通過 OAuth 群組管理自動更新。
:::

:::info 登錄後需求更新

如果使用者的群組在 OAuth 提供者中發生更改，他們需要先登出 Open WebUI 再重新登錄，才能反映更改。

:::

## 信任頭部

Open WebUI 能夠將身份驗證委派給能傳遞使用者詳情於 HTTP 頭中的身份驗證反向代理。
本頁提供若干示例配置。

:::danger

配置不正確可能允許使用者在您的 Open WebUI 實例中以任何使用者身份登錄。
請確保僅允許身份驗證代理訪問 Open WebUI，例如將 `HOST=127.0.0.1` 設置為僅監聽環回接口。

:::

### 通用配置

當設置 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 環境變數時，Open WebUI 將使用指定頭部的值作為使用者的電子郵件地址，處理自動註冊和登錄。

例如，設置 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` 並且傳遞 HTTP 頭部 `X-User-Email: example@example.com`，該請求將會以電子郵件 `example@example.com` 進行身份驗證。

此外，您也可以定義 `WEBUI_AUTH_TRUSTED_NAME_HEADER` 來確定使用信任頭部創建的使用者名稱。如果使用者已存在，則不會產生影響。

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) 允許您在自己的 tailnet 中共享服務，並且 Tailscale 將設置頭部 `Tailscale-User-Login` 為請求者的電子郵件地址。

以下是帶有對應 Docker Compose 文件的 Serve 配置示例，該文件啟動 Tailscale 副車容器，通過標籤 `open-webui` 和主機名 `open-webui` 在 tailnet 中公開 Open WebUI，並且可以通過 `https://open-webui.TAILNET_NAME.ts.net` 進行訪問。
您需要創建具有設備寫入許可權的 OAuth 客戶端，並作為 `TS_AUTHKEY` 傳遞到 Tailscale 容器中。

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

如果您在與 Open WebUI 相同的網路上下文中運行 Tailscale，則默認情況下使用者將能夠直接訪問 Open WebUI 而不通過 Serve 代理。
您需要使用 Tailscale 的 ACLs 限制僅對端口 443 的訪問。

:::

### Cloudflare Tunnel 與 Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) 可與 [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) 配合使用，以 SSO 保護 Open WebUI。
Cloudflare 幾乎未提供相關文檔，但 `Cf-Access-Authenticated-User-Email` 設置為已驗證使用者的電子郵件地址。

以下是一個設置 Cloudflare 副車容器的 Docker Compose 文件示例。
配置通過儀表板完成。
從儀表板中獲取隧道令牌，將隧道後端設置為 `http://open-webui:8080`，並確保選擇 "使用 Access 保護" 並完成相關配置。

```yaml title="docker-compose.yaml"
---
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    environment:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    restart: unless-stopped
  cloudflared:
    image: cloudflare/cloudflared:latest
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    command: tunnel run
    restart: unless-stopped

volumes:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) 是一個認證反向代理，實現了社交 OAuth 提供者和 OIDC 支援。

基於大量的潛在配置，以下是使用 Google OAuth 的潛在設置的示例。
請參閱 `oauth2-proxy` 的文檔以獲取詳細設置和任何潛在的安全注意事項。

```yaml title="docker-compose.yaml"
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    environment:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User
    restart: unless-stopped
  oauth2-proxy:
    image: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    environment:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    restart: unless-stopped
    ports:
      - 4180:4180/tcp
```


### Authentik

要配置 [Authentik](https://goauthentik.io/) OAuth 客戶端，請參閱 [文檔](https://docs.goauthentik.io/docs/applications) 以了解如何創建應用程式和 `OAuth2/OpenID Provider`。
允許的回調 URI 應包含 `<open-webui>/oauth/oidc/callback`。

創建提供者時，請注意 `App-name`、`Client-ID` 和 `Client-Secret`，並用於 open-webui 的環境變數：

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

[Authelia](https://www.authelia.com/) 可以配置為返回一個標頭，用於可信標頭身份驗證。
文檔可在此處獲得 [這裡](https://www.authelia.com/integration/trusted-header-sso/introduction/)。

由於 Authelia 部署的複雜性，未提供示例配置。
