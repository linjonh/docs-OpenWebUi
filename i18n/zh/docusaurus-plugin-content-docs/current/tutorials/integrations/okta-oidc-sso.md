---
sidebar_position: 40
title: "🔗 Okta OIDC 单点登录集成"
---

:::warning
本教程为社区贡献，不受 Open WebUI 团队支持。它仅作为定制 Open WebUI 以满足特定使用案例的演示。想要贡献？请查阅贡献教程。
:::

# 🔗 Okta OIDC 单点登录集成

## 概述

本文档页面概述了将 Okta OIDC 单点登录 (SSO) 集成到 Open WebUI 的必要步骤。此外，还介绍了基于 Okta 群组成员管理 Open WebUI 用户组的**可选**功能，包括**即时 (JIT) 群组创建**。通过完成这些步骤，用户可以使用其 Okta 凭据登录 Open WebUI。如果选择启用群组同步 (`ENABLE_OAUTH_GROUP_MANAGEMENT`)，用户登录时将根据其 Okta 群组自动分配到 Open WebUI 中的相关群组。如果*同时*启用了 JIT 群组创建 (`ENABLE_OAUTH_GROUP_CREATION`)，未在 Open WebUI 中存在但出现在 Okta 声明中的群组将在登录时自动创建。

### 前提条件

* 一个新的或现有的 Open WebUI 实例。
* 拥有管理权限以创建和配置应用程序的 Okta 账户。
* 对 OIDC、Okta 应用程序配置和 Open WebUI 环境变量有基本了解。

## 配置 Okta

首先，您需要在 Okta 组织中配置一个 OIDC 应用程序，并设置群组声明以将群组信息传递给 Open WebUI。

### 1. 在 Okta 中创建/配置 OIDC 应用程序

1. 登录到您的 Okta 管理控制台。
2. 导航到 **Applications > Applications**。
3. 可以创建一个新的 **OIDC - OpenID Connect** 应用程序（选择 **Web Application** 类型），或选择一个您计划用于 Open WebUI 的现有应用程序。
4. 在设置期间或在应用程序的 **General** 设置选项卡中，配置 **Sign-in redirect URIs**。添加您的 Open WebUI 实例的 URI，后面跟上 `/oauth/oidc/callback`。例如：`https://your-open-webui.com/oauth/oidc/callback`。
5. 记录下应用程序 **General** 选项卡中提供的 **Client ID** 和 **Client secret**。这些信息将在 Open WebUI 配置中使用。
6. 确保在 **Assignments** 标签下正确分配了用户或群组到此应用程序。

### 2. 为 ID 令牌添加群组声明

**（可选）** 为了在 Open WebUI 中基于 Okta 群组自动管理群组，需要配置 Okta 在 ID 令牌中发送用户的群组成员信息。如果仅需 SSO 登录并选择在 Open WebUI 中手动管理群组，可跳过本节。

1. 在管理控制台中，转到 **Applications > Applications** 并选择您的 OIDC 客户端应用。
2. 转到 **Sign On** 选项卡，并在 **OpenID Connect ID Token** 部分点击 **Edit**。
3. 在 **Group claim type** 部分，选择 **Filter**。
4. 在 **Group claims filter** 部分：
    * 输入 `groups` 作为声明名称（或使用默认值，如果存在）。
    * 从下拉列表中选择 **Matches regex**。
    * 在正则表达式字段中输入 `.*`，这将包括用户所属的所有群组。如果需要，可以使用更具体的正则表达式。
5. 点击 **Save**。
6. 点击 **Back to applications** 链接。
7. 在您的应用程序的 **More** 按钮下拉菜单中，点击 **Refresh Application Data**。

*有关更高级的群组声明配置，请参考 Okta 文档中关于[自定义令牌](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/)和[群组函数](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions)的部分。*

## 配置 Open WebUI

要在 Open WebUI 中启用 Okta OIDC SSO，您需要设置以下核心环境变量。如果要启用可选的群组管理功能，则需要额外的变量。

```bash
# --- OIDC 核心设置 ---
# 如果您希望用户可以通过 Okta 创建账户，请启用 OAuth 注册
# ENABLE_OAUTH_SIGNUP="true"

# 您的 Okta 应用程序的 Client ID
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# 您的 Okta 应用程序的 Client Secret
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# 您的 Okta 组织的 OIDC 发现 URL
# 格式：https://<your-okta-domain>/.well-known/openid-configuration
# 或对于特定的授权服务器：https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# 登录按钮上显示的名称（例如：“使用 Okta 登录”）
OAUTH_PROVIDER_NAME="Okta"

# 要请求的范围（默认值通常足够）
# OAUTH_SCOPES="openid email profile groups" # 确保包含“groups”，如果不是默认值

# --- OAuth 群组管理（可选） ---
# 如果您在 Okta 中配置了群组声明（步骤 2），请设置为 "true"
# 并希望基于登录时的 Okta 组来管理 Open WebUI 组。
# 此操作会同步已有组。用户将根据 Okta 组声明被添加/移除至 Open WebUI 组。
# 使其与 Okta 组声明一致。
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# 只有 ENABLE_OAUTH_GROUP_MANAGEMENT 为 true 时需要。
# ID Token 中包含组信息的声明名称（必须与 Okta 配置匹配）
# OAUTH_GROUP_CLAIM="groups"

# 可选：启用即时 (JIT) 创建组功能，如果这些组存在于 Okta 声明中但不在 Open WebUI 中。
# 需要 ENABLE_OAUTH_GROUP_MANAGEMENT="true"。
# 如果设置为 false（默认），则仅同步现有组。
# ENABLE_OAUTH_GROUP_CREATION="false"
```

替换 `YOUR_OKTA_CLIENT_ID`、`YOUR_OKTA_CLIENT_SECRET` 和 `YOUR_OKTA_OIDC_DISCOVERY_URL` 为 Okta 应用程序配置中的实际值。

要基于 Okta 声明启用组同步，请设置 `ENABLE_OAUTH_GROUP_MANAGEMENT="true"` 并确保 `OAUTH_GROUP_CLAIM` 匹配 Okta 中配置的声明名称（默认为 `groups`）。

若还需启用基于 Okta 且尚不存在于 Open WebUI 的组的自动即时 (JIT) 创建功能，请设置 `ENABLE_OAUTH_GROUP_CREATION="true"`。如果您只希望管理 Open WebUI 中已有组的成员资格，可以设置为 `false`。

:::warning 组成员资格管理
当 `ENABLE_OAUTH_GROUP_MANAGEMENT` 设置为 `true` 时，用户在 Open WebUI 的组成员资格将根据其 Okta 登录时的组声明进行**严格同步**。这意味着：
* 用户将被**添加**至与其 Okta 声明匹配的 Open WebUI 组。
* 用户将被**移除**出任何 Open WebUI 组（包括那些在 Open WebUI 中手动创建或分配的组），如果这些组**没有**出现在其登录会话的 Okta 声明中。

请确保所有必要的组已在 Okta 中正确配置和分配，并包含在组声明中。
:::

:::info 多节点部署中的会话持久性

当在多个节点上部署 Open WebUI（例如在 Kubernetes 集群或负载均衡器后面）时，确保会话持久性对于提供无缝用户体验至关重要，尤其是在使用 SSO 时。将 `WEBUI_SECRET_KEY` 环境变量设置为所有 Open WebUI 实例上的**相同且安全唯一的值**。
:::

```bash
# 示例：生成一个强大的秘密密钥（例如使用 openssl rand -hex 32）
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

如果此密钥在所有节点间不一致，当用户会话被路由到另一个节点时，他们可能会被迫重新登录，因为由一个节点签名的会话令牌在另一个节点上将无效。默认情况下，Docker 映像在首次启动时会生成一个随机密钥，这不适用于多节点设置。

:::tip 禁用标准登录表单

如果您只希望通过 Okta（以及可能配置的其他 OAuth 提供商）进行登录，可以通过设置以下环境变量来禁用标准的电子邮件/密码登录表单：
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger 重要先决条件
设置 `ENABLE_LOGIN_FORM="false"` **要求** 同时设置 `ENABLE_OAUTH_SIGNUP="true"`。如果您禁用了登录表单但未启用 OAuth 注册，**用户（包括管理员）将无法登录。** 请确保至少配置一个 OAuth 提供商并启用了 `ENABLE_OAUTH_SIGNUP`，然后再禁用标准登录表单。
:::

在设置这些环境变量后，重新启动您的 Open WebUI 实例。

## 验证

1.  访问您的 Open WebUI 登录页面。您应看到一个名为 "Login with Okta" 的按钮（或您在 `OAUTH_PROVIDER_NAME` 中设置的名称）。
2.  点击按钮并通过 Okta 登录流程进行身份验证。
3.  成功身份验证后，您应被重定向回 Open WebUI 并已登录。
4.  如果 `ENABLE_OAUTH_GROUP_MANAGEMENT` 为 true，请以非管理员用户登录。他们在 Open WebUI 中的组应严格反映他们在 Okta 中的组成员资格（任何*未*在 Okta 声明中的组成员资格将被移除）。如果 `ENABLE_OAUTH_GROUP_CREATION` 也为 true，则用户 Okta 声明中存在且此前未在 Open WebUI 中的任何组应该已被自动创建。请注意，管理员用户的组不会通过 SSO 自动更新。
5.  如果遇到问题，请检查 Open WebUI 服务器日志中是否有任何 OIDC 或组相关的错误。

## 故障排除

*   **400 错误请求/重定向 URI 不匹配：** 请仔细检查您在 Okta 应用程序中的**登录重定向 URI**是否与 `<your-open-webui-url>/oauth/oidc/callback` 完全匹配。
*   **组未同步：** 验证 `OAUTH_GROUP_CLAIM` 环境变量是否与 Okta ID Token 设置中的声明名称匹配。确保用户在组更改后已退出并重新登录——需要登录流程来更新 OIDC。请记住管理员组不会同步。
*   **配置错误:** 检查 Open WebUI 服务器日志，以获取与OIDC配置相关的详细错误信息。
*   请参考官方 [Open WebUI SSO文档](/features/sso.md)。
*   查阅 [Okta开发者文档](https://developer.okta.com/docs/)。