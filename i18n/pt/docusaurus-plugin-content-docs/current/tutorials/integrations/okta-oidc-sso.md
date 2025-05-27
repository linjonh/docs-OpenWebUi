---
sidebar_position: 40
title: "🔗 Integração Okta OIDC SSO"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# 🔗 Integração Okta OIDC SSO

## Visão Geral

Esta página de documentação descreve os passos necessários para integrar o Single Sign-On (SSO) Okta OIDC com o Open WebUI. Também aborda os recursos **opcionais** de gerenciamento de grupos de usuários no Open WebUI com base na associação de grupos do Okta, incluindo a **criação de grupos Just-in-Time (JIT)**. Seguindo esses passos, você permitirá que os usuários acessem o Open WebUI usando suas credenciais do Okta. Se escolher habilitar a sincronização de grupos (`ENABLE_OAUTH_GROUP_MANAGEMENT`), os usuários serão automaticamente atribuídos aos grupos relevantes no Open WebUI com base em seus grupos do Okta ao fazer login. Se você *também* habilitar a criação de grupos JIT (`ENABLE_OAUTH_GROUP_CREATION`), os grupos presentes nas reivindicações do Okta, mas ausentes no Open WebUI, serão criados automaticamente durante o login.

### Pré-requisitos

*   Uma instância nova ou existente do Open WebUI.
*   Uma conta Okta com privilégios administrativos para criar e configurar aplicativos.
*   Compreensão básica de OIDC, configuração de aplicativos do Okta e variáveis de ambiente do Open WebUI.

## Configurando o Okta

Primeiro, você precisa configurar um aplicativo OIDC dentro da sua organização Okta e configurar uma reivindicação de grupos para enviar informações de grupo ao Open WebUI.

### 1. Criar/Configurar um Aplicativo OIDC no Okta

1.  Faça login no Console Administrativo do Okta.
2.  Navegue até **Applications > Applications**.
3.  Crie um novo aplicativo **OIDC - OpenID Connect** (escolha **Web Application** como o tipo) ou selecione um existente que deseja usar para o Open WebUI.
4.  Durante a configuração ou na aba **General** do aplicativo, configure os **Sign-in redirect URIs**. Adicione o URI da sua instância do Open WebUI, seguido por `/oauth/oidc/callback`. Exemplo: `https://seu-open-webui.com/oauth/oidc/callback`.
5.  Anote o **Client ID** e o **Client secret** fornecidos na aba **General** do aplicativo. Você precisará deles para a configuração do Open WebUI.
6.  Certifique-se de que os usuários ou grupos corretos estejam atribuídos a este aplicativo na aba **Assignments**.

### 2. Adicionar uma Reivindicação de Grupos ao Token de ID

**(Opcional)** Para habilitar o gerenciamento automático de grupos no Open WebUI com base nos grupos do Okta, você precisa configurar o Okta para enviar as associações de grupo do usuário no token de ID. Se você precisar apenas de login SSO e preferir gerenciar grupos manualmente dentro do Open WebUI, pode ignorar esta seção.

1.  No Console Administrativo, vá para **Applications > Applications** e selecione seu aplicativo cliente OIDC.
2.  Vá para a aba **Sign On** e clique em **Edit** na seção **OpenID Connect ID Token**.
3.  Na seção **Group claim type**, selecione **Filter**.
4.  Na seção **Group claims filter**:
    *   Insira `groups` como o nome da reivindicação (ou use o padrão se presente).
    *   Selecione **Matches regex** no menu suspenso.
    *   Insira `.*` no campo de regex. Isso incluirá todos os grupos dos quais o usuário é membro. Você pode usar um regex mais específico, se necessário.
5.  Clique em **Save**.
6.  Clique no link **Back to applications**.
7.  No menu suspenso do botão **More** para seu aplicativo, clique em **Refresh Application Data**.

*Para configurações mais avançadas de reivindicações de grupo, consulte a documentação do Okta sobre [personalização de tokens](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) e [funções de grupo](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions).*

## Configurando o Open WebUI

Para habilitar o Okta OIDC SSO no Open WebUI, você precisa definir as seguintes variáveis de ambiente principais. Variáveis adicionais são necessárias se você desejar habilitar o recurso opcional de gerenciamento de grupos.

```bash
# --- Configurações Principais do OIDC ---
# Habilite o cadastro OAuth se quiser que os usuários possam criar contas via Okta
# ENABLE_OAUTH_SIGNUP="true"

# ID do Cliente do seu aplicativo Okta
OAUTH_CLIENT_ID="SEU_CLIENT_ID_OKTA"

# Segredo do Cliente do seu aplicativo Okta
OAUTH_CLIENT_SECRET="SEU_CLIENT_SECRET_OKTA"

# URL de descoberta OIDC da sua organização Okta
# Formato: https://<seu-domínio-okta>/.well-known/openid-configuration
# Ou para um servidor de autorização específico: https://<seu-domínio-okta>/oauth2/<id-servidor-autorizacao>/.well-known/openid-configuration
OPENID_PROVIDER_URL="SEU_URL_DE_DESCOBERTA_OKTA"

# Nome exibido no botão de login (ex.: "Login com Okta")
OAUTH_PROVIDER_NAME="Okta"

# Escopos a serem solicitados (o padrão geralmente é suficiente)
# OAUTH_SCOPES="openid email profile groups" # Certifique-se de incluir groups se não for padrão

# --- Gerenciamento de Grupos OAuth (Opcional) ---
# Configure como "true" apenas se você configurou a Reivindicação de Grupos no Okta (Passo 2)
# e deseja que os grupos do Open WebUI sejam gerenciados com base nos grupos do Okta após o login.
# Isso sincroniza grupos existentes. Os usuários serão adicionados/removidos dos grupos do Open WebUI
# para corresponder às declarações dos grupos do Okta.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# Necessário apenas se ENABLE_OAUTH_GROUP_MANAGEMENT for true.
# O nome da declaração no token de ID contendo informações do grupo (deve corresponder à configuração do Okta)
# OAUTH_GROUP_CLAIM="groups"

# Opcional: Habilitar a criação Just-in-Time (JIT) de grupos se eles existirem nas declarações do Okta, mas não no Open WebUI.
# Requer ENABLE_OAUTH_GROUP_MANAGEMENT="true".
# Se definido como false (padrão), apenas grupos existentes serão sincronizados.
# ENABLE_OAUTH_GROUP_CREATION="false"
```

Substitua `YOUR_OKTA_CLIENT_ID`, `YOUR_OKTA_CLIENT_SECRET` e `YOUR_OKTA_OIDC_DISCOVERY_URL` pelos valores reais da configuração do aplicativo Okta.

Para habilitar a sincronização de grupos baseada em declarações do Okta, defina `ENABLE_OAUTH_GROUP_MANAGEMENT="true"` e garanta que `OAUTH_GROUP_CLAIM` corresponda ao nome da declaração configurado no Okta (o padrão é `groups`).

Para *também* habilitar a criação automática Just-in-Time (JIT) de grupos que existem no Okta, mas ainda não no Open WebUI, defina `ENABLE_OAUTH_GROUP_CREATION="true"`. Você pode deixar isso como `false` se desejar apenas gerenciar a associação de grupos que já existem no Open WebUI.

:::warning Gerenciamento de Associação de Grupos
Quando `ENABLE_OAUTH_GROUP_MANAGEMENT` é configurado como `true`, as associações de grupos de um usuário no Open WebUI serão **estritamente sincronizadas** com os grupos recebidos em suas declarações do Okta em cada login. Isso significa:
*   Os usuários serão **adicionados** aos grupos do Open WebUI que correspondem às suas declarações do Okta.
*   Os usuários serão **removidos** de quaisquer grupos do Open WebUI (incluindo aqueles criados ou atribuídos manualmente dentro do Open WebUI) se esses grupos **não** estiverem presentes em suas declarações do Okta para aquela sessão de login.

Certifique-se de que todos os grupos necessários estejam configurados e atribuídos corretamente no Okta e incluídos na declaração de grupo.
:::

:::info Persistência de Sessão em Implantações com Múltiplos Nós

Ao implantar o Open WebUI em múltiplos nós (por exemplo, em um cluster Kubernetes ou atrás de um balanceador de carga), é crucial garantir a persistência da sessão para uma experiência de usuário perfeita, especialmente com SSO. Configure a variável de ambiente `WEBUI_SECRET_KEY` com o **mesmo valor seguro e exclusivo** em **todas** as instâncias do Open WebUI.
:::

```bash
# Exemplo: Gere uma chave secreta forte (e.g., usando openssl rand -hex 32)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

Se esta chave não for consistente em todos os nós, os usuários podem ser forçados a fazer login novamente se sua sessão for direcionada para um nó diferente, já que o token de sessão assinado por um nó não será válido em outro. Por padrão, a imagem Docker gera uma chave aleatória no primeiro início, o que não é adequado para configurações com múltiplos nós.

:::tip Desativando o Formulário de Login Padrão

Se você pretende *apenas* permitir logins via Okta (e, potencialmente, outros provedores de OAuth configurados), pode desativar o formulário de login padrão de email/senha definindo a seguinte variável de ambiente:
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger Pré-requisito Importante
Definir `ENABLE_LOGIN_FORM="false"` **requer** que `ENABLE_OAUTH_SIGNUP="true"` também seja configurado. Se você desativar o formulário de login sem habilitar o cadastro via OAuth, **os usuários (incluindo administradores) não poderão fazer login.** Certifique-se de que pelo menos um provedor de OAuth esteja configurado e `ENABLE_OAUTH_SIGNUP` esteja habilitado antes de desativar o formulário de login padrão.
:::

Reinicie sua instância do Open WebUI após configurar essas variáveis de ambiente.

## Verificação

1.  Navegue até sua página de login do Open WebUI. Você deve ver um botão rotulado como "Login com Okta" (ou o que você configurou para `OAUTH_PROVIDER_NAME`).
2.  Clique no botão e autentique-se pelo fluxo de login do Okta.
3.  Após a autenticação bem-sucedida, você deve ser redirecionado de volta ao Open WebUI e conectado.
4.  Se `ENABLE_OAUTH_GROUP_MANAGEMENT` for true, faça login como um usuário não administrador. Os grupos do usuário no Open WebUI agora devem refletir estritamente suas associações de grupos atuais no Okta (qualquer associação a grupos *não* incluídos na declaração do Okta será removida). Se `ENABLE_OAUTH_GROUP_CREATION` também for true, qualquer grupo presente nas declarações do usuário no Okta que ainda não existia no Open WebUI deve agora ter sido criado automaticamente. Note que os grupos de administradores não são atualizados automaticamente via SSO.
5.  Verifique os logs do servidor do Open WebUI em busca de quaisquer erros relacionados ao OIDC ou grupos se encontrar problemas.

## Solução de Problemas

*   **400 Bad Request/Redirect URI Mismatch:** Verifique se o **URI de redirecionamento de entrada** no aplicativo Okta corresponde exatamente a `<your-open-webui-url>/oauth/oidc/callback`.
*   **Groups Not Syncing:** Verifique se a variável de ambiente `OAUTH_GROUP_CLAIM` corresponde ao nome da declaração configurado nas configurações do token de ID do Okta. Certifique-se de que o usuário tenha feito logout e login novamente após as alterações nos grupos - um fluxo de login é necessário para atualizar o OIDC. Lembre-se de que os grupos de administradores não são sincronizados.
*   **Erros de Configuração:** Revise os logs do servidor Open WebUI para mensagens de erro detalhadas relacionadas à configuração OIDC.
*   Consulte a [Documentação Oficial do Open WebUI SSO](/features/sso.md).
*   Consulte a [Documentação para Desenvolvedores da Okta](https://developer.okta.com/docs/).