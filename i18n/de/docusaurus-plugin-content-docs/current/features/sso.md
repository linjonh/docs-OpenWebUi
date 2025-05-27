---
sidebar_position: 19
title: "🔒 SSO: Unterstützung für föderierte Authentifizierung"
---

# Unterstützung für föderierte Authentifizierung

Open WebUI unterstützt mehrere Formen der föderierten Authentifizierung:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. Vertrauenswürdige Header

## OAuth

Es gibt mehrere globale Konfigurationsoptionen für OAuth:

1. `ENABLE_OAUTH_SIGNUP` - Wenn `true`, können Konten erstellt werden, wenn man sich mit OAuth anmeldet. Unterschiedlich zu `ENABLE_SIGNUP`.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - Ermöglicht die Anmeldung bei einem Konto, das der von dem OAuth-Anbieter bereitgestellten E-Mail-Adresse entspricht.
    - Dies gilt als unsicher, da nicht alle OAuth-Anbieter E-Mail-Adressen überprüfen, und es möglicherweise erlaubt, Konten zu kapern.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - Wenn `true`, werden bei der Anmeldung die von OAuth bereitgestellten Profilbilder der Nutzer aktualisiert.
    - Wenn das OAuth-Bild-Attribut durch Festlegen von `OAUTH_PICTURE_CLAIM` auf einen leeren String deaktiviert wird, wird diese Konfiguration ignoriert.
1. `OAUTH_PICTURE_CLAIM` - Kann genutzt werden, um die Speicherung von Profilbildern anzupassen oder zu deaktivieren. Der Standardwert `picture` funktioniert bei den meisten Anbietern; Wenn auf einen leeren String gesetzt, erhalten alle Nutzer das Standard-Profilbild einer Person.

### Google

Um einen Google OAuth-Client zu konfigurieren, lesen Sie bitte [Googles Dokumentation](https://support.google.com/cloud/answer/6158849) zur Erstellung eines Google OAuth-Clients für eine **Webanwendung**.
Die erlaubte Weiterleitungs-URI sollte `<open-webui>/oauth/google/callback` enthalten.

Die folgenden Umgebungsvariablen sind erforderlich:

1. `GOOGLE_CLIENT_ID` - Google OAuth Client-ID
1. `GOOGLE_CLIENT_SECRET` - Google OAuth Client-Secret

### Microsoft

Um einen Microsoft OAuth-Client zu konfigurieren, lesen Sie bitte [Microsofts Dokumentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) zur Erstellung eines Microsoft OAuth-Clients für eine **Webanwendung**.
Die erlaubte Weiterleitungs-URI sollte `<open-webui>/oauth/microsoft/callback` enthalten.

Die Unterstützung für Microsoft OAuth ist derzeit auf einen einzelnen Mandanten beschränkt, d.h. auf eine einzelne Entra-Organisation oder persönliche Microsoft-Konten.

Die folgenden Umgebungsvariablen sind erforderlich:

1. `MICROSOFT_CLIENT_ID` - Microsoft OAuth Client-ID
1. `MICROSOFT_CLIENT_SECRET` - Microsoft OAuth Client-Secret
1. `MICROSOFT_CLIENT_TENANT_ID` - Microsoft Mandanten-ID - Verwenden Sie `9188040d-6c67-4c5b-b112-36a304b66dad` für persönliche Konten

### Github

Um einen Github OAuth-Client zu konfigurieren, lesen Sie bitte [Githubs Dokumentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) zur Erstellung einer OAuth-App oder Github-App für eine **Webanwendung**.
Die erlaubte Weiterleitungs-URI sollte `<open-webui>/oauth/github/callback` enthalten.

Die folgenden Umgebungsvariablen sind erforderlich:

1. `GITHUB_CLIENT_ID` - Github OAuth-App Client-ID
1. `GITHUB_CLIENT_SECRET` - Github OAuth-App Client-Secret

### OIDC

Jeder Authentifizierungsanbieter, der OIDC unterstützt, kann konfiguriert werden.
Das `email`-Attribut ist erforderlich.
`name`- und `picture`-Attribute werden verwendet, wenn verfügbar.
Die erlaubte Weiterleitungs-URI sollte `<open-webui>/oauth/oidc/callback` enthalten.

Die folgenden Umgebungsvariablen werden verwendet:

1. `OAUTH_CLIENT_ID` - OIDC Client-ID
1. `OAUTH_CLIENT_SECRET` - OIDC Client-Secret
1. `OPENID_PROVIDER_URL` - OIDC Well-Known-URL, z.B. `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - Name des Anbieters, der auf der Benutzeroberfläche angezeigt wird, Standardwert ist SSO
1. `OAUTH_SCOPES` - Anzufordernde Berechtigungen. Standard ist `openid email profile`

### OAuth Rollenverwaltung

Jeder OAuth-Anbieter, der konfiguriert werden kann, um Rollen im Zugriffstoken zurückzugeben, kann zur Rollenverwaltung in Open WebUI verwendet werden.
Um diese Funktion zu nutzen, setzen Sie `ENABLE_OAUTH_ROLE_MANAGEMENT` auf `true`.
Sie können die folgenden Umgebungsvariablen konfigurieren, um die Rollen, die von den OAuth-Anbietern zurückgegeben werden, abzugleichen:

1. `OAUTH_ROLES_CLAIM` - Das Attribut, das die Rollen enthält. Standardwert ist `roles`. Kann auch verschachtelt sein, z.B. `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - Eine durch Komma getrennte Liste von Rollen, die sich anmelden dürfen (erhält die Open-WebUI-Rolle `user`).
1. `OAUTH_ADMIN_ROLES` - Eine durch Komma getrennte Liste von Rollen, die sich als Admin anmelden dürfen (erhält die Open-WebUI-Rolle `admin`).

:::info

Wenn sich die Rolle eines angemeldeten Nutzers ändert, muss dieser sich ausloggen und erneut anmelden, um die neue Rolle zu erhalten.

:::

### OAuth Gruppenverwaltung

Jeder OAuth-Anbieter, der konfiguriert werden kann, um Gruppen im Zugriffstoken zurückzugeben, kann verwendet werden, um Nutzergruppen in Open WebUI bei der Anmeldung eines Nutzers zu verwalten.
Um diese Synchronisierung zu aktivieren, setzen Sie `ENABLE_OAUTH_GROUP_MANAGEMENT` auf `true`.

Sie können die folgenden Umgebungsvariablen konfigurieren:

1. `OAUTH_GROUP_CLAIM` - Das Attribut im ID-/Zugriffstoken, das die Gruppenmitgliedschaften des Nutzers enthält. Standardwert ist `groups`. Kann auch verschachtelt sein, z.B. `user.memberOf`. Erforderlich, wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` wahr ist.
1. `ENABLE_OAUTH_GROUP_CREATION` - Wenn auf `true` gesetzt (und `ENABLE_OAUTH_GROUP_MANAGEMENT` ebenfalls auf `true` gesetzt ist), wird Open WebUI **Just-in-Time (JIT) Gruppen-Erstellung** durchführen. Das bedeutet, dass bei der OAuth-Anmeldung automatisch Gruppen erstellt werden, wenn diese in den OAuth-Ansprüchen des Benutzers vorhanden sind, aber noch nicht im System existieren. Standardmäßig auf `false` gesetzt. Wenn `false`, werden nur Mitgliedschaften in *bereits bestehenden* Open WebUI-Gruppen verwaltet.

:::warnung Strikte Gruppen-Synchronisation
Wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` auf `true` gesetzt ist, werden die Gruppenmitgliedschaften eines Benutzers in Open WebUI **strikt synchronisiert** mit den Gruppen, die bei jeder Anmeldung in seinen OAuth-Ansprüchen angegeben sind.

*   Benutzer werden **hinzugefügt** zu Open WebUI-Gruppen, die mit ihren OAuth-Ansprüchen übereinstimmen.
*   Benutzer werden **entfernt** aus beliebigen Open WebUI-Gruppen (einschließlich solcher, die manuell in Open WebUI erstellt oder zugewiesen wurden), wenn diese Gruppen **nicht** in ihren OAuth-Ansprüchen für diese Anmeldesitzung vorhanden sind.

Stellen Sie sicher, dass alle benötigten Gruppen korrekt in Ihrem OAuth-Anbieter konfiguriert sind und im Gruppenanspruch (`OAUTH_GROUP_CLAIM`) enthalten sind.
:::

:::warnung Admin-Benutzer
Die Gruppenmitgliedschaften von Admin-Benutzern werden **nicht** automatisch über das OAuth-Gruppenmanagement aktualisiert.
:::

:::info Anmeldung erforderlich für Updates

Wenn sich die Gruppen eines Benutzers im OAuth-Anbieter ändern, muss sich der Benutzer von Open WebUI abmelden und erneut anmelden, damit die Änderungen wirksam werden.

:::

## Vertrauenswürdiger Header

Open WebUI kann die Authentifizierung an einen authentifizierenden Reverse-Proxy delegieren, der die Details des Benutzers in HTTP-Headern übermittelt.
Es gibt mehrere Beispielkonfigurationen, die auf dieser Seite bereitgestellt werden.

:::gefährlich

Eine fehlerhafte Konfiguration kann Benutzern ermöglichen, sich als jeder Benutzer auf Ihrer Open WebUI-Instanz zu authentifizieren.
Stellen Sie sicher, dass nur der authentifizierende Proxy Zugriff auf Open WebUI hat, z. B. indem Sie `HOST=127.0.0.1` setzen, um nur auf der Loopback-Schnittstelle zu lauschen.

:::

### Generische Konfiguration

Wenn die Umgebungsvariable `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` gesetzt ist, verwendet Open WebUI den Wert des angegebenen Headers als E-Mail-Adresse des Benutzers und führt automatische Registrierung und Anmeldung durch.

Beispielsweise würde die Einstellung von `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` und das Übergeben eines HTTP-Headers `X-User-Email: example@example.com` die Anfrage mit der E-Mail `example@example.com` authentifizieren.

Optional können Sie auch `WEBUI_AUTH_TRUSTED_NAME_HEADER` definieren, um den Namen eines Benutzers zu bestimmen, der mit vertrauenswürdigen Headern erstellt wird. Dies hat keine Wirkung, wenn der Benutzer bereits existiert.

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) ermöglicht es, einen Dienst innerhalb Ihres Tailnets freizugeben, und Tailscale setzt den Header `Tailscale-User-Login` mit der E-Mail-Adresse des Anfragenden.

Unten finden Sie eine Beispiel-Serve-Konfiguration mit einer entsprechenden Docker-Compose-Datei, die einen Tailscale-Sidecar startet, Open WebUI mit dem Tag `open-webui` und Hostnamen `open-webui` im Tailnet bereitstellt und unter `https://open-webui.TAILNET_NAME.ts.net` erreichbar macht.
Sie müssen einen OAuth-Client mit Schreibberechtigung für Geräte erstellen, um ihn als `TS_AUTHKEY` in den Tailscale-Container einzubringen.

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

:::warnung

Wenn Sie Tailscale im gleichen Netzwerk-Kontext wie Open WebUI ausführen, können Benutzer standardmäßig direkt auf Open WebUI zugreifen, ohne den Serve-Proxy zu durchlaufen.
Sie müssen Tailscales ACLs verwenden, um den Zugriff nur auf Port 443 zu beschränken.

:::

### Cloudflare Tunnel mit Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) kann mit [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) verwendet werden, um Open WebUI mit SSO zu schützen.
Dies ist von Cloudflare kaum dokumentiert, aber `Cf-Access-Authenticated-User-Email` wird mit der E-Mail-Adresse des authentifizierten Benutzers gesetzt.

Unten finden Sie eine Beispiel-Docker-Compose-Datei, die einen Cloudflare-Sidecar einrichtet.
Die Konfiguration erfolgt über das Dashboard.
Holen Sie sich ein Tunnel-Token aus dem Dashboard, setzen Sie das Tunnel-Backend auf `http://open-webui:8080` und stellen Sie sicher, dass "Mit Access schützen" aktiviert und konfiguriert ist.

```yaml title="docker-compose.yaml"
---
Dienste:
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

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) ist ein authenticating Reverse Proxy, der soziale OAuth-Anbieter und OIDC-Unterstützung implementiert.

Aufgrund der Vielzahl möglicher Konfigurationen finden Sie unten ein Beispiel für eine mögliche Einrichtung mit Google OAuth.
Bitte konsultieren Sie die Dokumentation von `oauth2-proxy` für eine detaillierte Einrichtung und eventuelle Sicherheitsprobleme.

```yaml title="docker-compose.yaml"
Dienste:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    environment:
      - 'HOST=127.0.0.1'
      - 'WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email'
      - 'WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User'
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

Um einen [Authentik](https://goauthentik.io/) OAuth-Client zu konfigurieren, konsultieren Sie bitte die [Dokumentation](https://docs.goauthentik.io/docs/applications) darüber, wie ein Anwendung und `OAuth2/OpenID Provider` erstellt werden.
Die zugelassene Redirect-URI sollte `<open-webui>/oauth/oidc/callback` enthalten.

Während der Erstellung des Providers beachten Sie bitte `App-name`, `Client-ID` und `Client-Secret` und verwenden Sie diese für die open-webui-Umgebungsvariablen:

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

[Authelia](https://www.authelia.com/) kann so konfiguriert werden, dass ein Header für die Verwendung mit Trusted-Header-Authentifizierung zurückgegeben wird.
Die Dokumentation ist [hier](https://www.authelia.com/integration/trusted-header-sso/introduction/) verfügbar.

Es werden keine Beispielkonfigurationen bereitgestellt, da die Bereitstellung von Authelia komplex ist.
