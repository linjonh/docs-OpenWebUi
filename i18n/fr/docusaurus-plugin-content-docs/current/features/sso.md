---
sidebar_position: 19
title: "🔒 SSO: Prise en charge de l'authentification fédérée"
---

# Prise en charge de l'authentification fédérée

Open WebUI prend en charge plusieurs formes d'authentification fédérée :

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. En-tête de confiance

## OAuth

Il existe plusieurs options de configuration globale pour OAuth :

1. `ENABLE_OAUTH_SIGNUP` - si `true`, permet la création de comptes lors de la connexion avec OAuth. Différent de `ENABLE_SIGNUP`.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - permet de se connecter à un compte correspondant à l'adresse e-mail fournie par le fournisseur OAuth.
    - Cela est considéré comme non sécurisé, car tous les fournisseurs OAuth ne vérifient pas les adresses e-mail, ce qui pourrait permettre de détourner des comptes.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - si `true`, les photos de profil fournies par OAuth seront mises à jour lors de la connexion.
    - Si l'attribut d'image OAuth est désactivé en définissant `OAUTH_PICTURE_CLAIM` comme chaîne vide, cette configuration sera ignorée.
1. `OAUTH_PICTURE_CLAIM` - peut être utilisé pour personnaliser ou désactiver le stockage des photos de profil. La valeur par défaut, `picture`, fonctionnera pour la plupart des fournisseurs ; si elle est définie comme chaîne vide, tous les utilisateurs recevront la photo de profil par défaut.

### Google

Pour configurer un client OAuth Google, veuillez consulter [la documentation de Google](https://support.google.com/cloud/answer/6158849) sur la création d'un client OAuth Google pour une **application web**.
L'URI de redirection autorisée doit inclure `<open-webui>/oauth/google/callback`.

Les variables d'environnement suivantes sont requises :

1. `GOOGLE_CLIENT_ID` - ID client OAuth Google
1. `GOOGLE_CLIENT_SECRET` - Secret client OAuth Google

### Microsoft

Pour configurer un client OAuth Microsoft, veuillez consulter [la documentation de Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) sur la création d'un client OAuth Microsoft pour une **application web**.
L'URI de redirection autorisée doit inclure `<open-webui>/oauth/microsoft/callback`.

La prise en charge d'OAuth Microsoft est actuellement limitée à un seul locataire, c'est-à-dire une seule organisation Entra ou des comptes Microsoft personnels.

Les variables d'environnement suivantes sont requises :

1. `MICROSOFT_CLIENT_ID` - ID client OAuth Microsoft
1. `MICROSOFT_CLIENT_SECRET` - Secret client OAuth Microsoft
1. `MICROSOFT_CLIENT_TENANT_ID` - ID du locataire Microsoft - utilisez `9188040d-6c67-4c5b-b112-36a304b66dad` pour les comptes personnels

### Github

Pour configurer un client OAuth Github, veuillez consulter [la documentation de Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) sur la création d'une application OAuth ou Github pour une **application web**.
L'URI de redirection autorisée doit inclure `<open-webui>/oauth/github/callback`.

Les variables d'environnement suivantes sont requises :

1. `GITHUB_CLIENT_ID` - ID client de l'application OAuth Github
1. `GITHUB_CLIENT_SECRET` - Secret client de l'application OAuth Github

### OIDC

Tout fournisseur d'authentification prenant en charge OIDC peut être configuré.
L'attribut `email` est requis.
Les attributs `name` et `picture` sont utilisés si disponibles.
L'URI de redirection autorisée doit inclure `<open-webui>/oauth/oidc/callback`.

Les variables d'environnement suivantes sont utilisées :

1. `OAUTH_CLIENT_ID` - ID client OIDC
1. `OAUTH_CLIENT_SECRET` - Secret client OIDC
1. `OPENID_PROVIDER_URL` - URL bien connue d'OIDC, par exemple `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - Nom du fournisseur à afficher dans l'UI, par défaut SSO
1. `OAUTH_SCOPES` - Scopes à demander. Par défaut : `openid email profile`

### Gestion des rôles OAuth

Tout fournisseur OAuth pouvant être configuré pour retourner des rôles dans le jeton d'accès peut être utilisé pour gérer les rôles dans Open WebUI.
Pour utiliser cette fonctionnalité, définissez `ENABLE_OAUTH_ROLE_MANAGEMENT` sur `true`.
Vous pouvez configurer les variables d'environnement suivantes pour correspondre aux rôles retournés par le fournisseur OAuth :

1. `OAUTH_ROLES_CLAIM` - L'attribut contenant les rôles. Par défaut : `roles`. Peut également être imbriqué, par exemple `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - Une liste de rôles autorisés à se connecter (recevoir le rôle `user` d'Open WebUI), séparés par des virgules.
1. `OAUTH_ADMIN_ROLES` - Une liste de rôles autorisés à se connecter en tant qu'administrateur (recevoir le rôle `admin` d'Open WebUI), séparés par des virgules.

:::info

Si le rôle d'un utilisateur connecté est modifié, il devra se déconnecter puis se reconnecter pour recevoir le nouveau rôle.

:::

### Gestion des groupes OAuth

Tout fournisseur OAuth pouvant être configuré pour retourner des groupes dans le jeton d'accès peut être utilisé pour gérer les groupes d'utilisateurs dans Open WebUI lors de la connexion de l'utilisateur.
Pour activer cette synchronisation, définissez `ENABLE_OAUTH_GROUP_MANAGEMENT` sur `true`.

Vous pouvez configurer les variables d'environnement suivantes :

1. `OAUTH_GROUP_CLAIM` - L'attribut dans le jeton ID/jeton d'accès contenant les appartenances aux groupes de l'utilisateur. Par défaut : `groups`. Peut également être imbriqué, par exemple `user.memberOf`. Requis si `ENABLE_OAUTH_GROUP_MANAGEMENT` est vrai.
1. `ENABLE_OAUTH_GROUP_CREATION` - Si `true` (et `ENABLE_OAUTH_GROUP_MANAGEMENT` est également `true`), Open WebUI procédera à la **création de groupe Just-in-Time (JIT)**. Cela signifie qu'il créera automatiquement des groupes lors de la connexion OAuth s'ils sont présents dans les revendications OAuth de l'utilisateur mais n'existent pas encore dans le système. Par défaut, cette valeur est `false`. Si `false`, seules les adhésions aux groupes Open WebUI *existants* seront gérées.

:::warning Synchronisation stricte des groupes
Lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` est défini sur `true`, les adhésions aux groupes d'un utilisateur dans Open WebUI sont **strictement synchronisées** avec les groupes reçus dans leurs revendications OAuth à chaque connexion.

*   Les utilisateurs seront **ajoutés** aux groupes Open WebUI correspondant à leurs revendications OAuth.
*   Les utilisateurs seront **supprimés** de tous les groupes Open WebUI (y compris ceux créés ou attribués manuellement dans Open WebUI) si ces groupes ne sont **pas** présents dans leurs revendications OAuth pour cette session de connexion.

Assurez-vous que tous les groupes nécessaires sont correctement configurés dans votre fournisseur OAuth et inclus dans la revendication de groupe (`OAUTH_GROUP_CLAIM`).
:::

:::warning Utilisateurs administrateurs
Les adhésions aux groupes des utilisateurs administrateurs ne sont **pas** mises à jour automatiquement via la gestion des groupes OAuth.
:::

:::info Connexion requise pour les mises à jour

Si les groupes d'un utilisateur changent dans le fournisseur OAuth, il devra se déconnecter de Open WebUI et se reconnecter pour que les modifications soient reflétées.

:::

## En-tête de confiance

Open WebUI peut déléguer l'authentification à un proxy inverse authentifiant qui transmet les détails de l'utilisateur dans les en-têtes HTTP.
Plusieurs configurations exemple sont fournies sur cette page.

:::danger

Une configuration incorrecte peut permettre aux utilisateurs de s'authentifier en tant que n'importe quel utilisateur sur votre instance Open WebUI.
Assurez-vous de ne permettre l'accès à Open WebUI qu'au proxy authentifiant, par exemple en paramétrant `HOST=127.0.0.1` pour écouter uniquement sur l'interface de loopback.

:::

### Configuration générique

Lorsque la variable d'environnement `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` est définie, Open WebUI utilisera la valeur de l'en-tête spécifié comme adresse e-mail de l'utilisateur, gérant l'enregistrement automatique et la connexion.

Par exemple, définir `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` et transmettre un en-tête HTTP de `X-User-Email: example@example.com` authentifierait la requête avec l'e-mail `example@example.com`.

Optionnellement, vous pouvez également définir `WEBUI_AUTH_TRUSTED_NAME_HEADER` pour déterminer le nom de tout utilisateur créé à l'aide des en-têtes de confiance. Cela n'a aucun effet si l'utilisateur existe déjà.

### Serve Tailscale

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) permet de partager un service au sein de votre tailnet, et Tailscale définira l'en-tête `Tailscale-User-Login` avec l'adresse e-mail du demandeur.

Voici un exemple de configuration serve avec un fichier Docker Compose correspondant qui démarre un sidecar Tailscale, expose Open WebUI au tailnet avec l'étiquette `open-webui` et le nom d'hôte `open-webui`, et peut être accessible via `https://open-webui.TAILNET_NAME.ts.net`.
Vous devrez créer un client OAuth avec une autorisation d'écriture de périphérique pour le transmettre au conteneur Tailscale en tant que `TS_AUTHKEY`.

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

Si vous exécutez Tailscale dans le même contexte réseau qu'Open WebUI, alors par défaut les utilisateurs pourront directement accéder à Open WebUI sans passer par le proxy Serve.
Vous devrez utiliser les ACL de Tailscale pour restreindre l'accès uniquement au port 443.

:::

### Tunnel Cloudflare avec Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) peut être utilisé avec [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) pour protéger Open WebUI avec SSO.
Cela est à peine documenté par Cloudflare, mais `Cf-Access-Authenticated-User-Email` est défini avec l'adresse e-mail de l'utilisateur authentifié.

Voici un exemple de fichier Docker Compose qui configure un sidecar Cloudflare.
La configuration se fait via le tableau de bord.
Depuis le tableau de bord, obtenez un jeton de tunnel, définissez le backend du tunnel sur `http://open-webui:8080`, et assurez-vous que "Protégé par Access" est coché et configuré.

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

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) est un proxy inverse d'authentification qui implémente des fournisseurs OAuth sociaux et une prise en charge de l'OIDC.

Étant donné le grand nombre de configurations possibles, ci-dessous se trouve un exemple de configuration potentielle avec Google OAuth.
Veuillez consulter la documentation de `oauth2-proxy` pour une configuration détaillée et tout piège potentiel lié à la sécurité.

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

Pour configurer un client OAuth [Authentik](https://goauthentik.io/), veuillez vous référer à la [documentation](https://docs.goauthentik.io/docs/applications) sur la création d'une application et d'un `fournisseur OAuth2/OpenID`.
L'URI de redirection autorisé doit inclure `<open-webui>/oauth/oidc/callback`.

Lors de la création du fournisseur, veuillez noter le `nom de l'application`, le `Client-ID` et le `Client-Secret` et les utiliser pour les variables d'environnement open-webui :

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

[Authelia](https://www.authelia.com/) peut être configurée pour retourner un en-tête à utiliser avec l'authentification d'en-tête de confiance.
La documentation est disponible [ici](https://www.authelia.com/integration/trusted-header-sso/introduction/).

Aucune configuration d'exemple n'est fournie en raison de la complexité du déploiement d'Authelia.
