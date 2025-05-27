---
sidebar_position: 19
title: "🔒 SSO: フェデレーション認証のサポート"
---

# フェデレーション認証のサポート

Open WebUI はいくつかの形式のフェデレーション認証をサポートしています:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. 信頼されたヘッダー

## OAuth

OAuth にはいくつかのグローバル構成オプションがあります:

1. `ENABLE_OAUTH_SIGNUP` - `true` の場合、OAuth でログインするときにアカウントの作成を許可します。 `ENABLE_SIGNUP` とは区別されます。
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - OAuth プロバイダーによって提供されたメールアドレスと一致するアカウントにログインを許可します。
    - これはすべてのOAuthプロバイダーがメールアドレスを検証するわけではないため、セキュリティ的には問題があると見なされる可能性があります。アカウントの乗っ取りを許す恐れがあります。
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - `true` の場合、ログイン時にOAuthプロバイダーによるプロフィール画像が更新されます。
    - `OAUTH_PICTURE_CLAIM` を空文字列に設定してOAuth画像クレームを無効化した場合、この構成は無視されます。
1. `OAUTH_PICTURE_CLAIM` - プロフィール画像の保存をカスタマイズまたは無効にするために使用できます。デフォルトの `picture` はほとんどのプロバイダーで機能します。空文字列に設定すると、すべてのユーザーがデフォルトの人物プロフィール画像を受け取ります。

### Google

Google OAuth クライアントを構成するには、[Google のドキュメント](https://support.google.com/cloud/answer/6158849) を参照してください。**ウェブアプリケーション**用のGoogle OAuth クライアントの作成方法が説明されています。
許可されるリダイレクトURIには `<open-webui>/oauth/google/callback` を含める必要があります。

次の環境変数が必要です:

1. `GOOGLE_CLIENT_ID` - Google OAuth クライアントID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth クライアントシークレット

### Microsoft

Microsoft OAuth クライアントを構成するには、[Microsoft のドキュメント](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) を参照してください。**ウェブアプリケーション**用のMicrosoft OAuthクライアントの作成方法が説明されています。
許可されるリダイレクトURIには `<open-webui>/oauth/microsoft/callback` を含める必要があります。

現在、Microsoft OAuth のサポートは単一のテナント（単一の Entra 組織または個人の Microsoft アカウント）に限定されています。

次の環境変数が必要です:

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth クライアントID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth クライアントシークレット
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft テナント ID - 個人アカウントの場合は `9188040d-6c67-4c5b-b112-36a304b66dad` を使用してください

### Github

Github OAuth クライアントを構成するには、[Github のドキュメント](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) を参照してください。**ウェブアプリケーション**用のOAuthアプリまたはGitHubアプリの作成方法が説明されています。
許可されるリダイレクトURIには `<open-webui>/oauth/github/callback` を含める必要があります。

次の環境変数が必要です:

1. `GITHUB_CLIENT_ID` - Github OAuth アプリのクライアントID
1. `GITHUB_CLIENT_SECRET` - Github OAuth アプリのクライアントシークレット

### OIDC

OIDCをサポートする認証プロバイダーを構成することができます。
`email` クレームは必須です。
`name` および `picture` クレームは利用可能な場合に使用されます。
許可されるリダイレクトURIには `<open-webui>/oauth/oidc/callback` を含める必要があります。

次の環境変数が使用されます:

1. `OAUTH_CLIENT_ID` - OIDC クライアント ID
1. `OAUTH_CLIENT_SECRET` - OIDC クライアントシークレット
1. `OPENID_PROVIDER_URL` - OIDC の well-known URL 例: `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - UIに表示するプロバイダーの名前。デフォルトは SSO
1. `OAUTH_SCOPES` - リクエストするスコープ。デフォルトは `openid email profile`

### OAuth 権限管理

アクセス トークンでロールを返すように構成できるOAuthプロバイダーは、Open WebUI でのロール管理に使用できます。
この機能を使用するには `ENABLE_OAUTH_ROLE_MANAGEMENT` を `true` に設定します。
OAuthプロバイダーによって返されたロールに一致させるために次の環境変数を構成できます:

1. `OAUTH_ROLES_CLAIM` - ロールを含むクレーム。デフォルトは `roles`。たとえば `user.roles` のようにネストすることもできます。
1. `OAUTH_ALLOWED_ROLES` - ログインを許可するロールのコンマ区切りリスト（Open WebUI ロール `user` を受け取る）。
1. `OAUTH_ADMIN_ROLES` - 管理者としてログインが許可されるロールのコンマ区切りリスト（Open WebUI ロール `admin` を受け取る）。

:::info

ログイン中のユーザーのロールを変更した場合、新しいロールを受け取るには一度ログアウトして再ログインする必要があります。

:::

### OAuth グループ管理

アクセス トークンでグループを返すように構成できるOAuthプロバイダーは、ログイン時にOpen WebUI内のユーザーグループの管理に使用できます。
この同期を有効にするには、`ENABLE_OAUTH_GROUP_MANAGEMENT` を `true` に設定します。

次の環境変数を構成できます:

1. `OAUTH_GROUP_CLAIM` - ID/アクセス トークン内のユーザーのグループ メンバーシップを含むクレーム。デフォルトは `groups`。たとえば `user.memberOf` のようにネストすることもできます。`ENABLE_OAUTH_GROUP_MANAGEMENT` が true の場合は必須です。
1. `ENABLE_OAUTH_GROUP_CREATION` - `true`の場合（そして`ENABLE_OAUTH_GROUP_MANAGEMENT`も`true`の場合）、Open WebUIは**ジャストインタイム（JIT）グループ作成**を実行します。つまり、OAuthログイン中にユーザーのOAuthクレームに存在し、システムにまだ存在しないグループを自動で作成します。デフォルトは`false`です。`false`の場合、Open WebUIグループへのメンバーシップ管理は*既存*のグループに限定されます。

:::警告 厳格なグループ同期
`ENABLE_OAUTH_GROUP_MANAGEMENT`が`true`に設定されている場合、ユーザーのOpen WebUIでのグループメンバーシップは、ログインごとにOAuthクレームで受信したグループと**厳格に同期されます**。

*   Open WebUIグループにOAuthクレームと一致する場合、ユーザーは**追加**されます。
*   Open WebUI内で手動で作成または割り当てられたグループを含め、ログインセッション中にOAuthクレームで**存在しない**場合は、ユーザーはそれらのグループから**削除**されます。

必要なすべてのグループがOAuthプロバイダーで正しく構成され、グループクレーム（`OAUTH_GROUP_CLAIM`）に含まれていることを確認してください。
:::

:::警告 管理者ユーザー
管理者ユーザーのグループメンバーシップは、OAuthグループ管理によって自動的に更新されません。
:::

:::情報 更新にはログインが必要

ユーザーのグループがOAuthプロバイダー内で変更された場合、それを反映させるためにOpen WebUIからログアウトし、再度ログインする必要があります。

:::

## 信頼済みヘッダー

Open WebUIは、ユーザーの情報をHTTPヘッダーに渡す認証リバースプロキシに認証を委任することができます。
このページではいくつかの例を紹介します。

:::危険

誤った構成により、Open WebUIインスタンスで任意のユーザーとして認証することが可能になる場合があります。
認証プロキシにのみOpen WebUIへのアクセスを許可するように設定してください。例えば`HOST=127.0.0.1`を設定すると、ループバックインタフェースのみでリスンします。

:::

### 一般的な構成

`WEBUI_AUTH_TRUSTED_EMAIL_HEADER`環境変数が設定されている場合、Open WebUIは指定されたヘッダーの値をユーザーのメールアドレスとして使用し、自動登録とログインを処理します。

例えば、`WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email`を設定し、HTTPヘッダー`X-User-Email: example@example.com`を渡すと、`example@example.com`というメールでリクエストを認証します。

オプションで`WEBUI_AUTH_TRUSTED_NAME_HEADER`も定義すると、信頼済みヘッダーを使用して作成されるユーザーの名前を決定できます。この設定は既存のユーザーには効果がありません。

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve)を使用すると、tailnet内でサービスを共有することができ、Tailscaleはリクエスターのメールアドレスであるヘッダー`Tailscale-User-Login`を設定します。

以下は、`open-webui`タグとホスト名`open-webui`を持つOpen WebUIをtailnetに公開し、`https://open-webui.TAILNET_NAME.ts.net`でアクセス可能にするTailscaleサイドカーを起動するDocker Composeファイル例です。
Tailscaleコンテナに`TS_AUTHKEY`として渡すデバイス書き込み権限のあるOAuthクライアントを作成する必要があります。

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

Open WebUIと同じネットワークコンテキストでTailscaleを実行する場合、デフォルトではユーザーはServeプロキシを介さずに直接Open WebUIにアクセスできてしまいます。
TailscaleのACLを使用して443番ポートへのアクセスのみを制限する必要があります。

:::

### Cloudflare TunnelとCloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)は、[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/)と組み合わせて、Open WebUIをSSOで保護できます。
Cloudflareによるドキュメントはほとんどありませんが、認証済みユーザーのメールアドレスである`Cf-Access-Authenticated-User-Email`が設定されます。

以下はCloudflareサイドカーを設定するDocker Composeファイルの例です。
構成はダッシュボードで行います。
ダッシュボードからトークンを取得し、トンネルバックエンドを`http://open-webui:8080`に設定し、「Accessで保護」がチェックされ、構成されていることを確認してください。

```yaml title="docker-compose.yaml"
---
サービス:
  open-webui:
    イメージ: ghcr.io/open-webui/open-webui:main
    ボリューム:
      - open-webui:/app/backend/data
    環境:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    リスタート: unless-stopped
  cloudflared:
    イメージ: cloudflare/cloudflared:latest
    環境:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    コマンド: tunnel run
    リスタート: unless-stopped

ボリューム:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) は、ソーシャルOAuthプロバイダーとOIDCサポートを実装する認証リバースプロキシです。

多くの構成の可能性を考慮して、以下にGoogle OAuthを用いた構成例を示します。
`oauth2-proxy`のドキュメントを参照して、詳細な設定および潜在的なセキュリティ上の注意事項をご確認ください。

```yaml title="docker-compose.yaml"
サービス:
  open-webui:
    イメージ: ghcr.io/open-webui/open-webui:main
    ボリューム:
      - open-webui:/app/backend/data
    環境:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User
    リスタート: unless-stopped
  oauth2-proxy:
    イメージ: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    環境:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    リスタート: unless-stopped
    ポート:
      - 4180:4180/tcp
```


### Authentik

OAuthクライアントを[Authentik](https://goauthentik.io/)で設定するには、アプリケーションおよび`OAuth2/OpenIDプロバイダー`を作成する方法について[ドキュメント](https://docs.goauthentik.io/docs/applications)を参照してください。
許可されるリダイレクトURIには`<open-webui>/oauth/oidc/callback`を含める必要があります。

プロバイダーを作成する際には、`アプリ名`、`Client-ID`、`Client-Secret`を注意し、それをopen-webuiの環境変数として使用してください:

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

[Authelia](https://www.authelia.com/)は、トラステッドヘッダー認証で使用するためのヘッダーを返すように設定できます。
ドキュメントは[こちら](https://www.authelia.com/integration/trusted-header-sso/introduction/)で確認可能です。

Autheliaのデプロイの複雑さにより、サンプル構成は提供されていません。
