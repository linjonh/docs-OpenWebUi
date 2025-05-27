---
sidebar_position: 19
title: "🔒 SSO: Suporte à Autenticação Federada"
---

# Suporte à Autenticação Federada

O Open WebUI suporta várias formas de autenticação federada:

1. OAuth2
    1. Google
    1. Microsoft
    1. Github
    1. OIDC
1. Header de Confiança

## OAuth

Existem várias opções de configuração global para OAuth:

1. `ENABLE_OAUTH_SIGNUP` - se `true`, permite que contas sejam criadas ao fazer login com OAuth. Diferente de `ENABLE_SIGNUP`.
1. `OAUTH_MERGE_ACCOUNTS_BY_EMAIL` - permite fazer login em uma conta que corresponda ao endereço de e-mail fornecido pelo provedor de OAuth.
    - Isso é considerado inseguro, pois nem todos os provedores de OAuth verificam endereços de e-mail e pode permitir o sequestro de contas.
1. `OAUTH_UPDATE_PICTURE_ON_LOGIN` - se `true`, os usuários terão suas fotos de perfil fornecidas por OAuth atualizadas ao fazer login.
    - Se a reivindicação de foto do OAuth estiver desativada ao definir `OAUTH_PICTURE_CLAIM` como uma string vazia, esta configuração será ignorada.
1. `OAUTH_PICTURE_CLAIM` - pode ser usado para personalizar ou desativar o armazenamento de fotos de perfil. O padrão, `picture`, funcionará para a maioria dos provedores; se definido como uma string vazia, todos os usuários receberão a imagem de perfil padrão da pessoa.

### Google

Para configurar um cliente OAuth do Google, consulte a [documentação do Google](https://support.google.com/cloud/answer/6158849) sobre como criar um cliente OAuth do Google para uma **aplicação web**.
O URI de redirecionamento permitido deve incluir `<open-webui>/oauth/google/callback`.

As seguintes variáveis de ambiente são necessárias:

1. `GOOGLE_CLIENT_ID` - ID do cliente OAuth do Google
1. `GOOGLE_CLIENT_SECRET` - Segredo do cliente OAuth do Google

### Microsoft

Para configurar um cliente OAuth da Microsoft, consulte a [documentação da Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) sobre como criar um cliente OAuth da Microsoft para uma **aplicação web**.
O URI de redirecionamento permitido deve incluir `<open-webui>/oauth/microsoft/callback`.

O suporte ao OAuth da Microsoft está atualmente limitado a um único locatário, ou seja, uma única organização Entra ou contas pessoais da Microsoft.

As seguintes variáveis de ambiente são necessárias:

1. `MICROSOFT_CLIENT_ID` - ID do cliente OAuth da Microsoft
1. `MICROSOFT_CLIENT_SECRET` - Segredo do cliente OAuth da Microsoft
1. `MICROSOFT_CLIENT_TENANT_ID` - ID do locatário da Microsoft - use `9188040d-6c67-4c5b-b112-36a304b66dad` para contas pessoais

### Github

Para configurar um cliente OAuth do Github, consulte a [documentação do Github](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) sobre como criar um aplicativo OAuth ou aplicativo Github para uma **aplicação web**.
O URI de redirecionamento permitido deve incluir `<open-webui>/oauth/github/callback`.

As seguintes variáveis de ambiente são necessárias:

1. `GITHUB_CLIENT_ID` - ID do cliente do aplicativo OAuth do Github
1. `GITHUB_CLIENT_SECRET` - Segredo do cliente do aplicativo OAuth do Github

### OIDC

Qualquer provedor de autenticação que suporte OIDC pode ser configurado.
A reivindicação `email` é obrigatória.
As reivindicações `name` e `picture` são usadas, se disponíveis.
O URI de redirecionamento permitido deve incluir `<open-webui>/oauth/oidc/callback`.

As seguintes variáveis de ambiente são usadas:

1. `OAUTH_CLIENT_ID` - ID do cliente OIDC
1. `OAUTH_CLIENT_SECRET` - Segredo do cliente OIDC
1. `OPENID_PROVIDER_URL` - URL bem conhecida do OIDC, por exemplo `https://accounts.google.com/.well-known/openid-configuration`
1. `OAUTH_PROVIDER_NAME` - Nome do provedor para exibir na interface do usuário, padrão para SSO
1. `OAUTH_SCOPES` - Escopos a solicitar. Padrão para `openid email profile`

### Gerenciamento de Funções OAuth

Qualquer provedor de OAuth que possa ser configurado para retornar funções no token de acesso pode ser usado para gerenciar funções no Open WebUI.
Para usar este recurso, defina `ENABLE_OAUTH_ROLE_MANAGEMENT` como `true`.
Você pode configurar as seguintes variáveis de ambiente para corresponder às funções retornadas pelo provedor de OAuth:

1. `OAUTH_ROLES_CLAIM` - A reivindicação que contém as funções. Padrão para `roles`. Também pode ser aninhado, por exemplo `user.roles`.
1. `OAUTH_ALLOWED_ROLES` - Uma lista separada por vírgulas de funções que podem fazer login (receber a função de usuário do Open WebUI `user`).
1. `OAUTH_ADMIN_ROLES` - Uma lista separada por vírgulas de funções que podem fazer login como administrador (receber a função de administrador do Open WebUI `admin`).

:::info

Se alterar a função de um usuário logado, ele precisará sair e fazer login novamente para receber a nova função.

:::

### Gerenciamento de Grupos OAuth

Qualquer provedor de OAuth que possa ser configurado para retornar grupos no token de acesso pode ser usado para gerenciar grupos de usuários no Open WebUI durante o login do usuário.
Para habilitar essa sincronização, defina `ENABLE_OAUTH_GROUP_MANAGEMENT` como `true`.

Você pode configurar as seguintes variáveis de ambiente:

1. `OAUTH_GROUP_CLAIM` - A reivindicação no ID/token de acesso contendo as associações de grupo do usuário. Padrão para `groups`. Também pode ser aninhado, por exemplo `user.memberOf`. Obrigatório se `ENABLE_OAUTH_GROUP_MANAGEMENT` for verdadeiro.
1. `ENABLE_OAUTH_GROUP_CREATION` - Se `true` (e `ENABLE_OAUTH_GROUP_MANAGEMENT` também for `true`), o Open WebUI realizará **Criação de grupos em tempo real (JIT)**. Isso significa que ele criará automaticamente grupos durante o login no OAuth se eles estiverem presentes nas declarações OAuth do usuário, mas ainda não existirem no sistema. O padrão é `false`. Se for `false`, apenas as associações em grupos existentes no Open WebUI serão gerenciadas.

:::warning Sincronização Estrita de Grupos
Quando `ENABLE_OAUTH_GROUP_MANAGEMENT` estiver definido como `true`, as associações de grupo de um usuário no Open WebUI serão **estritamente sincronizadas** com os grupos recebidos em suas declarações OAuth a cada login.

*   Os usuários serão **adicionados** aos grupos do Open WebUI que correspondem às suas declarações OAuth.
*   Os usuários serão **removidos** de qualquer grupo do Open WebUI (incluindo aqueles criados ou atribuídos manualmente no Open WebUI) se esses grupos **não** estiverem presentes em suas declarações OAuth para aquela sessão de login.

Certifique-se de que todos os grupos necessários estejam configurados corretamente no seu provedor OAuth e incluídos na declaração de grupo (`OAUTH_GROUP_CLAIM`).
:::

:::warning Usuários Administradores
As associações de grupo de usuários administradores **não** são atualizadas automaticamente por meio do gerenciamento de grupos do OAuth.
:::

:::info Login Necessário para Atualizações

Se os grupos de um usuário mudarem no provedor de OAuth, ele precisará sair do Open WebUI e fazer login novamente para que as alterações sejam refletidas.

:::

## Cabeçalho Confiável

O Open WebUI pode delegar a autenticação para um proxy reverso autenticador que passa os detalhes do usuário em cabeçalhos HTTP.
Há várias configurações de exemplo fornecidas nesta página.

:::danger

Configuração incorreta pode permitir que os usuários autentiquem como qualquer usuário na sua instância do Open WebUI.
Certifique-se de permitir apenas acesso ao proxy autenticador no Open WebUI, como configurar `HOST=127.0.0.1` para ouvir apenas na interface de loopback.

:::

### Configuração Genérica

Quando a variável de ambiente `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` for definida, o Open WebUI usará o valor do cabeçalho especificado como o endereço de e-mail do usuário, lidando com o registro e login automático.

Por exemplo, definir `WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-User-Email` e passar um cabeçalho HTTP de `X-User-Email: example@example.com` autenticará a solicitação com o e-mail `example@example.com`.

Opcionalmente, você também pode definir o `WEBUI_AUTH_TRUSTED_NAME_HEADER` para determinar o nome de qualquer usuário sendo criado usando cabeçalhos confiáveis. Isso não tem efeito se o usuário já existir.

### Tailscale Serve

[Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve) permite compartilhar um serviço dentro de sua tailnet, e o Tailscale definirá o cabeçalho `Tailscale-User-Login` com o endereço de e-mail do solicitante.

Abaixo está um exemplo de configuração de serviço com um arquivo Docker Compose correspondente que inicia um sidecar Tailscale, expondo o Open WebUI para a tailnet com a tag `open-webui` e hostname `open-webui`, e pode ser acessado em `https://open-webui.TAILNET_NAME.ts.net`.
Você precisará criar um cliente OAuth com permissão de escrita no dispositivo para passar para o contêiner Tailscale como `TS_AUTHKEY`.

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

Se você executar o Tailscale no mesmo contexto de rede que o Open WebUI, então, por padrão, os usuários poderão acessar diretamente o Open WebUI sem passar pelo proxy do Serve.
Você precisará usar as ACLs do Tailscale para restringir o acesso apenas à porta 443.

:::

### Cloudflare Tunnel com Cloudflare Access

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) pode ser usado com [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) para proteger o Open WebUI com SSO.
Isso é pouco documentado pela Cloudflare, mas `Cf-Access-Authenticated-User-Email` é definido com o endereço de e-mail do usuário autenticado.

Abaixo está um exemplo de arquivo Docker Compose que configura um sidecar Cloudflare.
A configuração é feita via painel.
No painel, obtenha um token de túnel, configure o backend do túnel como `http://open-webui:8080`, e certifique-se de que "Protegido com Access" esteja marcado e configurado.

```yaml title="docker-compose.yaml"
---
serviços:
  open-webui:
    imagem: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    ambiente:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=Cf-Access-Authenticated-User-Email
    reiniciar: unless-stopped
  cloudflared:
    imagem: cloudflare/cloudflared:latest
    ambiente:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    comando: tunnel run
    reiniciar: unless-stopped

volumes:
  open-webui: {}

```

### oauth2-proxy

[oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) é um proxy reverso autêntico que implementa provedores de OAuth social e suporte a OIDC.

Dado o grande número de configurações possíveis, abaixo está um exemplo de configuração com o Google OAuth.
Consulte a documentação do `oauth2-proxy` para configurações detalhadas e possíveis armadilhas de segurança.

```yaml title="docker-compose.yaml"
serviços:
  open-webui:
    imagem: ghcr.io/open-webui/open-webui:main
    volumes:
      - open-webui:/app/backend/data
    ambiente:
      - HOST=127.0.0.1
      - WEBUI_AUTH_TRUSTED_EMAIL_HEADER=X-Forwarded-Email
      - WEBUI_AUTH_TRUSTED_NAME_HEADER=X-Forwarded-User
    reiniciar: unless-stopped
  oauth2-proxy:
    imagem: quay.io/oauth2-proxy/oauth2-proxy:v7.6.0
    ambiente:
      OAUTH2_PROXY_HTTP_ADDRESS: 0.0.0.0:4180
      OAUTH2_PROXY_UPSTREAMS: http://open-webui:8080/
      OAUTH2_PROXY_PROVIDER: google
      OAUTH2_PROXY_CLIENT_ID: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_CLIENT_SECRET: REPLACEME_OAUTH_CLIENT_ID
      OAUTH2_PROXY_EMAIL_DOMAINS: REPLACEME_ALLOWED_EMAIL_DOMAINS
      OAUTH2_PROXY_REDIRECT_URL: REPLACEME_OAUTH_CALLBACK_URL
      OAUTH2_PROXY_COOKIE_SECRET: REPLACEME_COOKIE_SECRET
      OAUTH2_PROXY_COOKIE_SECURE: "false"
    reiniciar: unless-stopped
    portas:
      - 4180:4180/tcp
```


### Authentik

Para configurar um cliente OAuth do [Authentik](https://goauthentik.io/), consulte a [documentação](https://docs.goauthentik.io/docs/applications) sobre como criar uma aplicação e `OAuth2/OpenID Provider`.
O URI de redirecionamento permitido deve incluir `<open-webui>/oauth/oidc/callback`.

Ao criar o provedor, observe `Nome-do-App`, `Client-ID` e `Client-Secret` e use-os nas variáveis de ambiente do open-webui:

```
      - ENABLE_OAUTH_SIGNUP=true
      - OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true
      - OAUTH_PROVIDER_NAME=Authentik
      - OPENID_PROVIDER_URL=https://<authentik-url>/application/o/<Nome-do-App>/.well-known/openid-configuration
      - OAUTH_CLIENT_ID=<Client-ID>
      - OAUTH_CLIENT_SECRET=<Client-Secret>
      - OAUTH_SCOPES=openid email profile
      - OPENID_REDIRECT_URI=https://<open-webui>/oauth/oidc/callback
```

### Authelia

[Authelia](https://www.authelia.com/) pode ser configurado para retornar um cabeçalho para uso com autenticação de cabeçalho confiável.
A documentação está disponível [aqui](https://www.authelia.com/integration/trusted-header-sso/introduction/).

Nenhum exemplo de configuração é fornecido devido à complexidade de implementar o Authelia.
