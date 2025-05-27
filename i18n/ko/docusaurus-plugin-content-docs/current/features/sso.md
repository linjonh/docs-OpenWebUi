---
sidebar_position: 19
title: "🔒 SSO: 연합 인증 지원"
---

# 연합 인증 지원

Open WebUI는 여러 형태의 연합 인증을 지원합니다:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. 신뢰할 수 있는 헤더

## OAuth

OAuth에 대한 전역 구성 옵션은 다음과 같습니다:

1. `ENABLE_OAUTH_SIGNUP` - `true`로 설정하면 OAuth를 사용하여 로그인할 때 계정을 생성할 수 있습니다. `ENABLE_SIGNUP`과는 별개입니다.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - OAuth 공급자가 제공한 이메일 주소와 일치하는 계정에 로그인할 수 있게 합니다.
    - 이는 모든 OAuth 공급자가 이메일 주소를 확인하는 것은 아니기 때문에 안전하지 않으며 계정 탈취가 가능할 수 있습니다.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - `true`로 설정하면 사용자가 OAuth를 통해 제공된 프로필 사진이 로그인 시 업데이트됩니다.
    - `OAUTH_PICTURE_CLAIM`을 빈 문자열로 설정하여 OAuth 사진 클레임을 비활성화하면 이 설정은 무시됩니다.
1. `OAUTH_PICTURE_CLAIM` - 프로필 사진 저장을 사용자 정의하거나 비활성화할 수 있습니다. 기본값인 `picture`는 대부분의 공급자에게 작동하며, 빈 문자열로 설정하면 모든 사용자가 기본 사용자 프로필 사진을 받게 됩니다.

### Google

Google OAuth 클라이언트를 구성하려면 [Googles Documentation](https://support.google.com/cloud/answer/6158849)을 참조하여 **웹 애플리케이션**용 Google OAuth 클라이언트를 생성하는 방법을 확인하세요.
허용된 리디렉션 URI에는 `<open-webui>/oauth/google/callback`이 포함되어야 합니다.

다음 환경 변수가 필요합니다:

1. `GOOGLE_CLIENT_ID` - Google OAuth 클라이언트 ID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth 클라이언트 시크릿

### Microsoft

Microsoft OAuth 클라이언트를 구성하려면 [Microsofts Documentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)을 참조하여 **웹 애플리케이션**용 Microsoft OAuth 클라이언트를 생성하는 방법을 확인하세요.
허용된 리디렉션 URI에는 `<open-webui>/oauth/microsoft/callback`이 포함되어야 합니다.

Microsoft OAuth 지원은 현재 단일 테넌트에 한정되며, 단일 Entra 조직 또는 개인 Microsoft 계정만 지원됩니다.

다음 환경 변수가 필요합니다:

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth 클라이언트 ID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth 클라이언트 시크릿
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft 테넌트 ID - 개인 계정에는 `9188040d-6c67-4c5b-b112-36a304b66dad`를 사용하세요

### Github

Github OAuth 클라이언트를 구성하려면 [Githubs Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)을 참조하여 **웹 애플리케이션**용 OAuth 앱 또는 Github 앱을 생성하는 방법을 확인하세요.
허용된 리디렉션 URI에는 `<open-webui>/oauth/github/callback`이 포함되어야 합니다.

다음 환경 변수가 필요합니다:

1. `GITHUB_CLIENT_ID` - Github OAuth 앱 클라이언트 ID
1. `GITHUB_CLIENT_SECRET` - Github OAuth 앱 클라이언트 시크릿

### OIDC

OIDC를 지원하는 모든 인증 공급자를 구성할 수 있습니다.
`email` 클레임이 필요합니다.
`name` 및 `picture` 클레임은 사용 가능한 경우 사용됩니다.
허용된 리디렉션 URI에는 `<open-webui>/oauth/oidc/callback`이 포함되어야 합니다.

다음 환경 변수가 사용됩니다:

1. `OAUTH_CLIENT_ID` - OIDC 클라이언트 ID
1. `OAUTH_CLIENT_SECRET` - OIDC 클라이언트 시크릿
1. `OPENID_PROVIDER_URL` - OIDC well-known URL, 예시: `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - UI에 표시할 공급자 이름, 기본값은 SSO
1. `OAUTH_SCOPES` - 요청할 범위. 기본값은 `openid email profile`

### OAuth 역할 관리

액세스 토큰에서 역할을 반환하도록 구성할 수 있는 모든 OAuth 공급자는 Open WebUI 역할 관리를 위해 사용할 수 있습니다.
이 기능을 사용하려면 `ENABLE_OAUTH_ROLE_MANAGEMENT`를 `true`로 설정하세요.
OAuth 공급자가 반환하는 역할과 일치하도록 다음 환경 변수를 구성할 수 있습니다:

1. `OAUTH_ROLES_CLAIM` - 역할이 포함된 클레임. 기본값은 `roles`. 중첩 형태로도 사용할 수 있습니다, 예: `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - 로그인 허용되는 역할의 쉼표로 구분된 목록 (Open WebUI 역할 `user`를 받음).
1. `OAUTH_ADMIN_ROLES` - 관리자 로그인 허용되는 역할의 쉼표로 구분된 목록 (Open WebUI 역할 `admin`을 받음).

:::info

로그인한 사용자의 역할을 변경한 경우 새로운 역할을 받으려면 로그아웃 후 다시 로그인해야 합니다.

:::

### OAuth 그룹 관리

액세스 토큰에서 그룹을 반환하도록 구성할 수 있는 모든 OAuth 공급자는 사용자가 로그인할 때 Open WebUI의 사용자 그룹 관리를 위해 사용할 수 있습니다.
이 동기화를 활성화하려면 `ENABLE_OAUTH_GROUP_MANAGEMENT`를 `true`로 설정하세요.

다음 환경 변수를 구성할 수 있습니다:

1. `OAUTH_GROUP_CLAIM` - ID/액세스 토큰에서 사용자의 그룹 멤버십이 포함된 클레임. 기본값은 `groups`. 중첩 형태로도 사용할 수 있습니다, 예: `user.memberOf`. `ENABLE_OAUTH_GROUP_MANAGEMENT`가 true인 경우 필수입니다.
1. `ENABLE_OAUTH_GROUP_CREATION` - `true`로 설정되어 있고 (`ENABLE_OAUTH_GROUP_MANAGEMENT`도 `true`로 설정된 경우), Open WebUI는 **즉시 그룹 생성(JIT)**을 수행합니다. 이는 사용자의 OAuth 클레임에 있는 그룹이 시스템에 아직 존재하지 않을 경우 OAuth 로그인 도중 자동으로 그룹을 생성하는 것을 의미합니다. 기본값은 `false`입니다. 만약 `false`일 경우, *기존* Open WebUI 그룹의 멤버십만 관리됩니다.

:::warning 엄격한 그룹 동기화
`ENABLE_OAUTH_GROUP_MANAGEMENT`가 `true`로 설정된 경우, 사용자의 Open WebUI 그룹 멤버십은 로그인 시 OAuth 클레임에서 받은 그룹과 **엄격하게 동기화됩니다**.

* 사용자는 OAuth 클레임과 일치하는 Open WebUI 그룹에 **추가**됩니다.
* 사용자는 해당 로그인 세션의 OAuth 클레임에 포함되지 않은 Open WebUI 그룹(직접 생성되었거나 Open WebUI 내부에서 수동으로 할당된 그룹 포함)에서 **제거**됩니다.

모든 필요한 그룹이 OAuth 제공자에서 올바르게 구성되어 있고 그룹 클레임(`OAUTH_GROUP_CLAIM`)에 포함되어 있는지 확인하세요.
:::

:::warning 관리자 사용자
관리자 사용자의 그룹 멤버십은 OAuth 그룹 관리에 의해 **자동으로 업데이트되지 않습니다**.
:::

:::info 업데이트를 위해 로그인 필요

사용자의 그룹이 OAuth 제공자에서 변경된 경우, Open WebUI를 로그아웃 후 다시 로그인해야 변경 사항이 반영됩니다.

:::

## 신뢰할 수 있는 헤더

Open WebUI는 사용자의 세부 정보를 HTTP 헤더에 포함하여 전달하는 인증 역방향 프록시로 인증을 위임할 수 있습니다.
이 페이지에는 제공되는 몇 가지 예시 구성들이 포함되어 있습니다.

:::danger

잘못된 구성은 사용자들이 Open WebUI 인스턴스에서 임의의 사용자로 인증하는 것을 허용할 수 있습니다.
`HOST=127.0.0.1`을 설정하여 루프백 인터페이스에서만 수신하도록 설정하는 등 인증 프록시만 Open WebUI에 액세스할 수 있도록 해야 합니다.

:::

### 일반 구성

`WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 환경 변수가 설정되면, Open WebUI는 지정된 헤더 값을 사용자의 이메일 주소로 사용하여 자동 등록 및 로그인을 처리합니다.

예를 들어, `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email`을 설정하고 `X-User-Email: example@example.com` HTTP 헤더를 전달하면 이메일 `example@example.com`으로 요청이 인증됩니다.

옵션으로, `WEBUI_AUTH_TRUSTED_NAME_HEADER`를 정의하여 신뢰할 수 있는 헤더로 생성된 사용자의 이름을 결정할 수도 있습니다. 이는 사용자가 이미 존재하는 경우에는 영향을 미치지 않습니다.

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve)는 tailnet 내에서 서비스를 공유할 수 있으며, Tailscale은 요청자의 이메일 주소를 설정하는 `Tailscale-User-Login` 헤더를 설정합니다.

아래는 Tailscale 사이드카를 시작하고 Open WebUI를 tailnet에 태그 `open-webui`와 호스트 이름 `open-webui`로 노출하며, `https://open-webui.TAILNET_NAME.ts.net`에서 접근할 수 있는 경우의 구성 예시입니다.
디바이스 쓰기 권한이 있는 OAuth 클라이언트를 생성하여 `TS_AUTHKEY`로 Tailscale 컨테이너에 전달해야 합니다.

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

Open WebUI와 동일한 네트워크 컨텍스트에서 Tailscale을 실행하면 기본적으로 사용자가 Serve 프록시를 거치지 않고 직접 Open WebUI에 접근할 수 있습니다.
Tailscale의 ACL을 사용하여 443번 포트에만 접근을 제한해야 합니다.

:::

### Cloudflare Tunnel과 Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)은 [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/)와 함께 사용하여 Open WebUI를 SSO로 보호할 수 있습니다.
Cloudflare 문서에는 거의 설명되어 있지 않지만 `Cf-Access-Authenticated-User-Email`은 인증된 사용자의 이메일 주소를 설정합니다.

아래는 Cloudflare 사이드카를 설정하는 Docker Compose 파일 예시입니다.
구성은 대시보드를 통해 이루어집니다.
대시보드에서 터널 토큰을 가져와 터널 백엔드를 `http://open-webui:8080`으로 설정하고 "Protect with Access"가 선택되어 구성되었는지 확인하세요.

```yaml title="docker-compose.yaml"
---
서비스:
  open-webui:
    이미지: ghcr.io/open-webui/open-webui:main
    볼륨:
      - open-webui:/app/backend/data
    환경:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    재시작: unless-stopped
  cloudflared:
    이미지: cloudflare/cloudflared:latest
    환경:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    명령: tunnel run
    재시작: unless-stopped

볼륨:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/)는 소셜 OAuth 제공자와 OIDC 지원을 구현하는 인증 리버스 프록시입니다.

구성 가능한 옵션이 많기 때문에, 아래는 Google OAuth로 설정된 예제입니다.
`oauth2-proxy`의 문서를 참고하여 자세한 설정 및 잠재적인 보안 문제를 확인하십시오.

```yaml title="docker-compose.yaml"
서비스:
  open-webui:
    이미지: ghcr.io/open-webui/open-webui:main
    볼륨:
      - open-webui:/app/backend/data
    환경:
      - 'HOST=127.0.0.1'
      - 'WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email'
      - 'WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User'
    재시작: unless-stopped
  oauth2-proxy:
    이미지: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    환경:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    재시작: unless-stopped
    포트:
      - 4180:4180/tcp
```


### Authentik

[Authentik](https://goauthentik.io/) OAuth 클라이언트를 설정하려면 [문서](https://docs.goauthentik.io/docs/applications)를 참고하여 애플리케이션 및 `OAuth2/OpenID 제공자`를 생성하십시오.
허용된 리디렉션 URI에는 `<open-webui>/oauth/oidc/callback`이 포함되어야 합니다.

제공자를 생성할 때 `App-name`, `Client-ID`, 그리고 `Client-Secret`을 기록하여 open-webui 환경 변수로 사용하십시오:

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

[Authelia](https://www.authelia.com/)는 신뢰할 수 있는 헤더 인증을 사용하기 위해 헤더를 반환하도록 구성할 수 있습니다.
문서는 [여기](https://www.authelia.com/integration/trusted-header-sso/introduction/)에서 제공됩니다.

Authelia 배포의 복잡성 때문에 예제 구성은 제공되지 않습니다.
