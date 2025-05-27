---
sidebar_position: 40
title: "🔗 Okta OIDC SSO 통합"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 따라 Open WebUI를 맞춤화하는 방법을 시연하기 위한 것입니다. 기여를 원하신다면, 기여 튜토리얼을 확인하세요.
:::

# 🔗 Okta OIDC SSO 통합

## 개요

이 문서 페이지는 Open WebUI에 Okta OIDC 단일 로그인(SSO)을 통합하는 데 필요한 단계를 설명합니다. 또한 Okta 그룹 멤버십에 따라 Open WebUI 사용자 그룹을 관리하는 **선택적** 기능, 예를 들어 **즉시(JIT) 그룹 생성**을 다룹니다. 이 단계를 따르면 사용자는 Okta 자격 증명을 사용하여 Open WebUI에 로그인할 수 있습니다. 그룹 동기화 (`ENABLE_OAUTH_GROUP_MANAGEMENT`)를 활성화하면 사용자가 로그인 시 Okta 그룹에 따라 Open WebUI 내부 관련 그룹에 자동으로 할당됩니다. 또한 JIT 그룹 생성 (`ENABLE_OAUTH_GROUP_CREATION`)도 활성화하면 Okta 클레임에 존재하지만 Open WebUI에 없는 그룹이 로그인 중에 자동으로 생성됩니다.

### 사전 조건

* 새로운 또는 기존 Open WebUI 인스턴스.
* 애플리케이션을 생성 및 구성할 수 있는 관리 권한이 있는 Okta 계정.
* OIDC, Okta 애플리케이션 구성, Open WebUI 환경 변수에 대한 기본 이해.

## Okta 설정

먼저 Okta 조직 내에서 OIDC 애플리케이션을 구성하고 Open WebUI에 그룹 정보를 전달하는 클레임을 설정해야 합니다.

### 1. Okta에서 OIDC 애플리케이션 생성/구성

1.  Okta 관리자 콘솔에 로그인합니다.
2.  **Applications > Applications**로 이동합니다.
3.  새로운 **OIDC - OpenID Connect** 애플리케이션을 생성하거나 (유형으로 **Web Application** 선택) Open WebUI에 사용할 기존 애플리케이션을 선택합니다.
4.  설정 중 또는 애플리케이션의 **일반** 설정 탭에서 **Sign-in redirect URIs**를 구성합니다. 귀하의 Open WebUI 인스턴스를 나타내는 URI 뒤에 `/oauth/oidc/callback`을 추가하십시오. 예: `https://your-open-webui.com/oauth/oidc/callback`.
5.  애플리케이션의 **일반** 탭에서 제공하는 **클라이언트 ID** 및 **클라이언트 비밀**을 기록합니다. 이 정보는 Open WebUI 구성에 필요합니다.
6.  **할당** 탭에서 이 애플리케이션에 올바른 사용자 또는 그룹이 할당되었는지 확인합니다.

### 2. ID 토큰에 그룹 클레임 추가

**(선택 사항)** Okta 그룹에 기반하여 Open WebUI에서 자동 그룹 관리를 활성화하려면 Okta가 사용자 그룹 멤버십을 ID 토큰에 보낼 수 있도록 구성해야 합니다. SSO 로그인만 필요하고 Open WebUI 내에서 수동으로 그룹을 관리하려는 경우 이 섹션을 건너뛸 수 있습니다.

1.  관리자 콘솔에서 **Applications > Applications**으로 이동하여 OIDC 클라이언트 애플리케이션을 선택합니다.
2.  **Sign On** 탭으로 이동한 다음 **OpenID Connect ID Token** 섹션에서 **Edit**를 클릭합니다.
3.  **Group claim type** 섹션에서 **Filter**를 선택합니다.
4.  **Group claims filter** 섹션에서:
    *  클레임 이름으로 `groups`를 입력합니다 (또는 기본값을 사용).
    *  드롭다운에서 **Matches regex**를 선택합니다.
    *  정규식 필드에 `.*`를 입력합니다. 이렇게 하면 사용자가 속한 모든 그룹이 포함됩니다. 필요에 따라 구체적인 정규식을 사용할 수 있습니다.
5.  **Save**를 클릭합니다.
6.  **Back to applications** 링크를 클릭합니다.
7.  애플리케이션의 **More** 버튼 드롭다운 메뉴에서 **Refresh Application Data**를 클릭합니다.

*더 고급 그룹 클레임 구성을 위해 Okta의 [토큰 사용자 정의에 대한 문서](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) 및 [그룹 함수](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions)를 참조하십시오.*

## Open WebUI 구성

Open WebUI에서 Okta OIDC SSO를 활성화하려면 다음 기본 환경 변수를 설정해야 합니다. 선택적 그룹 관리 기능을 활성화하려면 추가 변수가 필요합니다.

```bash
# --- OIDC 코어 설정 ---
# 사용자가 Okta를 통해 계정을 생성할 수 있도록 허용하려면 OAuth 가입을 활성화하십시오
# ENABLE_OAUTH_SIGNUP="true"

# Okta 애플리케이션의 클라이언트 ID
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# Okta 애플리케이션의 클라이언트 비밀
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# Okta 조직의 OIDC 발견 URL
# 형식: https://<your-okta-domain>/.well-known/openid-configuration
# 특정 인증 서버의 경우: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# 로그인 버튼에 표시될 이름 (예: "Login with Okta")
OAUTH_PROVIDER_NAME="Okta"

# 요청할 범위 (기본값이 일반적으로 충분)
# OAUTH_SCOPES="openid email profile groups" # 기본값이 아니면 'groups' 포함 확인

# --- OAuth 그룹 관리 (선택 사항) ---
# Okta에서 그룹 클레임을 구성한 경우 (2단계) "true"로 설정
# 및 로그인 시 Open WebUI 그룹이 Okta 그룹을 기반으로 관리되기를 원합니다.
# 기존 그룹이 동기화됩니다. 사용자는 Open WebUI 그룹에서 추가/제거됩니다.
# Okta 그룹 클레임에 맞추어 관리됩니다.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# ENABLE_OAUTH_GROUP_MANAGEMENT가 true인 경우에만 필요합니다.
# 그룹 정보를 포함하는 ID 토큰의 클레임 이름 (Okta 설정과 일치해야 함)
# OAUTH_GROUP_CLAIM="groups"

# 선택 사항: Okta 클레임에 존재하지만 Open WebUI에는 아직 없는 그룹의 Just-in-Time (JIT) 자동 생성 활성화.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true" 필요.
# false로 설정 (기본값)하면 기존 그룹만 동기화됩니다.
# ENABLE_OAUTH_GROUP_CREATION="false"
```

`YOUR_OKTA_CLIENT_ID`, `YOUR_OKTA_CLIENT_SECRET`, `YOUR_OKTA_OIDC_DISCOVERY_URL`를 Okta 애플리케이션 구성의 실제 값으로 교체하십시오.

Okta 클레임 기반의 그룹 동기화를 활성화하려면 `ENABLE_OAUTH_GROUP_MANAGEMENT="true"`를 설정하고, `OAUTH_GROUP_CLAIM`이 Okta에 구성된 클레임 이름과 일치하는지 확인합니다 (기본값은 `groups` 입니다).

Okta에 존재하지만 Open WebUI에 아직 없는 그룹의 자동 Just-in-Time (JIT) 생성을 추가로 활성화하려면 `ENABLE_OAUTH_GROUP_CREATION="true"`를 설정합니다. 이미 Open WebUI에 존재하는 그룹의 멤버십만 관리하려면 이 값을 `false`로 두십시오.

:::warning 그룹 멤버십 관리
`ENABLE_OAUTH_GROUP_MANAGEMENT`가 `true`로 설정된 경우, 사용자의 Open WebUI 그룹 멤버십은 각 로그인 시 Okta 클레임에서 받은 그룹과 **엄격하게 동기화**됩니다. 이는 다음을 의미합니다:
*   사용자는 Okta 클레임에 해당하는 Open WebUI 그룹에 **추가**됩니다.
*   Okta 클레임에 표시되지 않는 그룹 (Open WebUI에서 수동으로 생성되거나 할당된 포함)에서 **제거**됩니다.

모든 필요한 그룹이 Okta에서 올바르게 구성 및 할당되고 그룹 클레임에 포함되었는지 확인하세요.
:::

:::info 다중 노드 배포에서의 세션 지속성

Open WebUI를 여러 노드(예: Kubernetes 클러스터 또는 로드 밸런서 뒤)에 배포할 때 원활한 사용자 경험을 위해 특히 SSO와 함께 세션 지속성을 보장하는 것이 중요합니다. 모든 Open WebUI 인스턴스에서 동일한 안전하고 고유한 값으로 `WEBUI_SECRET_KEY` 환경 변수를 설정하십시오.
:::

```bash
# 예: 강력한 비밀 키 생성 (예: openssl rand -hex 32 사용)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

이 키가 모든 노드에서 일관되지 않으면, 세션이 다른 노드로 라우팅될 때 사용자가 다시 로그인을 강요받을 수 있습니다. 이는 한 노드에서 서명된 세션 토큰이 다른 노드에서 유효하지 않기 때문입니다. 기본적으로 Docker 이미지가 최초 시작 시 랜덤 키를 생성하므로 다중 노드를 위한 설정으로는 적합하지 않습니다.

:::tip 표준 로그인 폼 비활성화

Okta (및 잠재적으로 다른 구성된 OAuth 제공자)에 의한 로그인만 허용하려는 경우, 표준 이메일/비밀번호 로그인 폼을 비활성화하려면 다음 환경 변수를 설정합니다:
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger 중요한 사전 요구사항
`ENABLE_LOGIN_FORM="false"` 설정은 `ENABLE_OAUTH_SIGNUP="true"`도 설정되어야 **합니다**. 로그인 폼을 비활성화하고 OAuth 가입을 활성화하지 않으면, **사용자 (관리자 포함)가 로그인할 수 없게 됩니다.** 표준 로그인 폼을 비활성화하기 전에 적어도 하나의 OAuth 제공자가 구성되고 `ENABLE_OAUTH_SIGNUP`이 활성화되었는지 확인하십시오.
:::

이 환경 변수를 설정한 후 Open WebUI 인스턴스를 재시작하십시오.

## 확인

1.  Open WebUI 로그인 페이지로 이동하십시오. "Login with Okta" (또는 `OAUTH_PROVIDER_NAME`에 설정한 내용)라고 표시된 버튼을 확인하십시오.
2.  버튼을 클릭하고 Okta 로그인 흐름을 통해 인증하십시오.
3.  인증에 성공하면 Open WebUI로 다시 리디렉션되어 로그인됩니다.
4.  `ENABLE_OAUTH_GROUP_MANAGEMENT`가 true인 경우, 관리자가 아닌 사용자로 로그인하십시오. 해당 사용자의 Open WebUI 그룹은 이제 Okta의 현재 그룹 멤버십을 엄격히 반영해야 합니다 (Okta 클레임에 없는 그룹에 대한 멤버십은 제거됩니다). `ENABLE_OAUTH_GROUP_CREATION`도 true라면, 사용자의 Okta 클레임에 존재하지만 Open WebUI에 이전에는 없었던 그룹이 이제 자동으로 생성되었어야 합니다. 관리자 사용자의 그룹은 SSO를 통해 자동으로 업데이트되지 않습니다.
5.  문제가 발생하면 Open WebUI 서버 로그에서 OIDC 또는 그룹 관련 오류를 확인하십시오.

## 문제 해결

*   **400 Bad Request/Redirect URI Mismatch:** Okta 애플리케이션의 **Sign-in redirect URI**가 `<your-open-webui-url>/oauth/oidc/callback`과 정확히 일치하는지 확인하십시오.
*   **그룹이 동기화되지 않음:** `OAUTH_GROUP_CLAIM` 환경 변수가 Okta ID 토큰 설정에 구성된 클레임 이름과 일치하는지 확인하십시오. 그룹 변경 후 사용자가 로그아웃한 상태에서 다시 로그인했는지 확인하십시오. OIDC 업데이트를 위해 로그인 흐름이 필요합니다. 관리자 그룹은 동기화되지 않는 점을 기억하십시오.
*   **구성 오류:** OIDC 구성과 관련된 자세한 오류 메시지를 확인하려면 Open WebUI 서버 로그를 검토하십시오.
*   공식 [Open WebUI SSO 문서](/features/sso.md)를 참조하십시오.
*   [Okta 개발자 문서](https://developer.okta.com/docs/)를 참조하십시오.