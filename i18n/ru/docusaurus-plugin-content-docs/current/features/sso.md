---
sidebar_position: 19
title: "🔒 SSO: Поддержка федеративной аутентификации"
---

# Поддержка федеративной аутентификации

Open WebUI поддерживает несколько форм федеративной аутентификации:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. Доверенный заголовок

## OAuth

Существует несколько глобальных параметров конфигурации для OAuth:

1. `ENABLE_OAUTH_SIGNUP` - если `true`, позволяет создавать учетные записи при входе с помощью OAuth. Отличается от `ENABLE_SIGNUP`.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - позволяет войти в учетную запись, которая соответствует адресу электронной почты, предоставленному поставщиком OAuth.
    - Это считается небезопасным, так как не все поставщики OAuth проверяют адреса электронной почты, что может позволить захват учетных записей.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - если `true`, фотографии профиля, предоставленные OAuth, будут обновляться при входе.
    - Если утверждение о фотографии OAuth отключено, установив `OAUTH_PICTURE_CLAIM` в пустую строку, эта конфигурация будет игнорироваться.
1. `OAUTH_PICTURE_CLAIM` - может быть использовано для настройки или отключения хранения фотографий профиля. Значение по умолчанию, `picture`, подойдет для большинства поставщиков; если установить в пустую строку, все пользователи получат стандартную фотографию профиля.

### Google

Чтобы настроить клиент Google OAuth, обратитесь к [документации Google](https://support.google.com/cloud/answer/6158849) о том, как создать клиента Google OAuth для **веб-приложения**.
Разрешенный URI перенаправления должен включать `<open-webui>/oauth/google/callback`.

Следующие переменные окружения обязательны:

1. `GOOGLE_CLIENT_ID` - идентификатор клиента Google OAuth
1. `GOOGLE_CLIENT_SECRET` - секрет клиента Google OAuth

### Microsoft

Чтобы настроить клиент Microsoft OAuth, обратитесь к [документации Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) о том, как создать клиента Microsoft OAuth для **веб-приложения**.
Разрешенный URI перенаправления должен включать `<open-webui>/oauth/microsoft/callback`.

Поддержка Microsoft OAuth в настоящее время ограничена одним арендатором, то есть одной организацией Entra или личными учетными записями Microsoft.

Следующие переменные окружения обязательны:

1. `MICROSOFT_CLIENT_ID` - идентификатор клиента Microsoft OAuth
1. `MICROSOFT_CLIENT_SECRET` - секрет клиента Microsoft OAuth
1. `MICROSOFT_CLIENT_TENANT_ID` - идентификатор арендатора Microsoft - используйте `9188040d-6c67-4c5b-b112-36a304b66dad` для личных учетных записей

### Github

Чтобы настроить клиент Github OAuth, обратитесь к [документации Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) о том, как создать OAuth-приложение или приложение Github для **веб-приложения**.
Разрешенный URI перенаправления должен включать `<open-webui>/oauth/github/callback`.

Следующие переменные окружения обязательны:

1. `GITHUB_CLIENT_ID` - идентификатор клиента Github OAuth App
1. `GITHUB_CLIENT_SECRET` - секрет клиента Github OAuth App

### OIDC

Можно настроить любого поставщика аутентификации, поддерживающего OIDC.
Требуется утверждение `email`.
Утверждения `name` и `picture` используются, если доступны.
Разрешенный URI перенаправления должен включать `<open-webui>/oauth/oidc/callback`.

Используются следующие переменные окружения:

1. `OAUTH_CLIENT_ID` - идентификатор клиента OIDC
1. `OAUTH_CLIENT_SECRET` - секрет клиента OIDC
1. `OPENID_PROVIDER_URL` - известный URL поставщика OIDC, например `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - имя поставщика, отображаемое в пользовательском интерфейсе, по умолчанию SSO
1. `OAUTH_SCOPES` - запрашиваемые области. По умолчанию `openid email profile`

### Управление ролями OAuth

Любой поставщик OAuth, который можно настроить для возврата ролей в маркере доступа, может использоваться для управления ролями в Open WebUI.
Чтобы использовать эту функцию, установите `ENABLE_OAUTH_ROLE_MANAGEMENT` в `true`.
Вы можете настроить следующие переменные окружения, чтобы соответствовать ролям, возвращаемым поставщиком OAuth:

1. `OAUTH_ROLES_CLAIM` - Утверждение, содержащее роли. По умолчанию `roles`. Также может быть вложенным, например `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - Список разрешенных ролей, разделенный запятыми, которым разрешен вход (получают роль `user` в open webui).
1. `OAUTH_ADMIN_ROLES` - Список разрешенных ролей, разделенный запятыми, которым разрешен вход с правами администратора (получают роль `admin` в open webui).

:::info

Если изменить роль вошедшего пользователя, ему потребуется выйти из системы и войти снова, чтобы получить новую роль.

:::

### Управление группами OAuth

Любой поставщик OAuth, который можно настроить для возврата групп в маркере доступа, может использоваться для управления группами пользователей в Open WebUI при входе пользователя.
Чтобы включить эту синхронизацию, установите `ENABLE_OAUTH_GROUP_MANAGEMENT` в `true`.

Вы можете настроить следующие переменные окружения:

1. `OAUTH_GROUP_CLAIM` - Утверждение в маркере идентификации/доступа, содержащее членства пользователя в группах. По умолчанию `groups`. Также может быть вложенным, например `user.memberOf`. Обязателен, если `ENABLE_OAUTH_GROUP_MANAGEMENT` истинно.
1. `ENABLE_OAUTH_GROUP_CREATION` - Если `true` (и `ENABLE_OAUTH_GROUP_MANAGEMENT` также `true`), Open WebUI будет выполнять **создание группы Just-in-Time (JIT)**. Это означает, что группы будут автоматически создаваться во время входа через OAuth, если они указаны в утверждениях пользователя OAuth, но еще не существуют в системе. По умолчанию значение - `false`. Если `false`, будет управляться только членство в *существующих* группах Open WebUI.

:::warning Строгая синхронизация групп
Когда параметр `ENABLE_OAUTH_GROUP_MANAGEMENT` установлен в `true`, членство пользователя в группах Open WebUI **строго синхронизируется** с группами, полученными в его утверждениях OAuth при каждом входе.

*   Пользователи будут **добавляться** в группы Open WebUI, соответствующие их утверждениям OAuth.
*   Пользователи будут **удаляться** из любых групп Open WebUI (включая те, которые были вручную созданы или назначены в Open WebUI), если эти группы **не** указаны в их утверждениях OAuth для данной сессии входа.

Убедитесь, что все необходимые группы правильно настроены в вашем провайдере OAuth и включены в утверждение о группе (`OAUTH_GROUP_CLAIM`).
:::

:::warning Администраторы
Членство администраторов в группах **не** обновляется автоматически через управление группами OAuth.
:::

:::info Требуется вход для обновлений

Если группы пользователя изменились в провайдере OAuth, ему нужно выйти из Open WebUI и войти снова, чтобы изменения были отражены.

:::

## Доверенные заголовки

Open WebUI может делегировать аутентификацию обратному прокси, который передает данные пользователя в HTTP-заголовках.
На этой странице приведены несколько примеров конфигурации.

:::danger

Некорректная конфигурация может позволить пользователям входить в систему как любой пользователь вашего Open WebUI.
Убедитесь, что доступ к Open WebUI разрешен только аутентифицирующему прокси, например, установив `HOST=127.0.0.1`, чтобы прослушивать только интерфейс обратной связи.

:::

### Общая конфигурация

Когда переменная окружения `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` установлена, Open WebUI будет использовать значение указанного заголовка как адрес электронной почты пользователя, выполняя автоматическую регистрацию и вход.

Например, установка `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` и передача HTTP-заголовка `X-User-Email: example@example.com` будет аутентифицировать запрос с электронной почтой `example@example.com`.

При необходимости, вы также можете определить `WEBUI_AUTH_TRUSTED_NAME_HEADER` для указания имени создаваемого пользователя, используя доверенные заголовки. Это не влияет, если пользователь уже существует.

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) позволяет вам делиться сервисом внутри вашего tailnet, и Tailscale устанавливает заголовок `Tailscale-User-Login` с адресом электронной почты запрашивающего.

Ниже приведен пример конфигурации serve с соответствующим файлом Docker Compose, который запускает побочный контейнер Tailscale, предоставляя Open WebUI в сети tailnet с тегом `open-webui` и именем хоста `open-webui`, доступным по адресу `https://open-webui.TAILNET_NAME.ts.net`.
Вам нужно будет создать OAuth-клиент с правами на запись устройства, чтобы передать его в контейнер Tailscale как `TS_AUTHKEY`.

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

Если вы запускаете Tailscale в одном сетевом контексте с Open WebUI, то по умолчанию пользователи смогут напрямую подключаться к Open WebUI, не проходя через Serve proxy.
Вам нужно будет использовать ACL Tailscale для ограничения доступа только к порту 443.

:::

### Туннель Cloudflare с Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) может быть использован вместе с [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) для защиты Open WebUI с помощью SSO.
Это недостаточно документировано Cloudflare, но `Cf-Access-Authenticated-User-Email` устанавливается с адресом электронной почты аутентифицированного пользователя.

Ниже приведен пример файла Docker Compose, который настраивает побочный контейнер Cloudflare.
Конфигурация осуществляется через панель управления.
С панели управления получите токен туннеля, установите туннельный бэкэнд на `http://open-webui:8080` и убедитесь, что "Protect with Access" включен и настроен.

```yaml title="docker-compose.yaml"
---
услуги:
  open-webui:
    изображение: ghcr.io/open-webui/open-webui:main
    тома:
      - open-webui:/app/backend/data
    окружение:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    перезапуск: unless-stopped
  cloudflared:
    изображение: cloudflare/cloudflared:latest
    окружение:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    команда: tunnel run
    перезапуск: unless-stopped

тома:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) — это аутентифицирующий обратный прокси, который реализует поддержку социальных OAuth-провайдеров и OIDC.

Учитывая большое количество возможных конфигураций, ниже приведен пример настройки с Google OAuth.
Пожалуйста, обратитесь к документации `oauth2-proxy` для получения подробной информации о настройке и возможных проблемах безопасности.

```yaml title="docker-compose.yaml"
услуги:
  open-webui:
    изображение: ghcr.io/open-webui/open-webui:main
    тома:
      - open-webui:/app/backend/data
    окружение:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User
    перезапуск: unless-stopped
  oauth2-proxy:
    изображение: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    окружение:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    перезапуск: unless-stopped
    порты:
      - 4180:4180/tcp
```


### Authentik

Для настройки [Authentik](https://goauthentik.io/) OAuth- клиента, пожалуйста, ознакомьтесь с [документацией](https://docs.goauthentik.io/docs/applications) о том, как создать приложение и `OAuth2/OpenID Provider`.
Разрешенный URI для перенаправления должен включать `<open-webui>/oauth/oidc/callback`.

При создании провайдера обратите внимание на `App-name`, `Client-ID` и `Client-Secret` и используйте их в переменных окружения open-webui:

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

[Authelia](https://www.authelia.com/) может быть настроена для возврата заголовка, который используется при аутентификации доверенного заголовка.
Документация доступна [здесь](https://www.authelia.com/integration/trusted-header-sso/introduction/).

Примеры конфигураций не предоставлены из-за сложности развертывания Authelia.
