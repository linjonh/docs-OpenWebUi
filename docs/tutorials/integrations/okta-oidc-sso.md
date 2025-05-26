---
sidebar_position: 40
title: "🔗 Okta OIDC SSO 集成"
---

:::warning
本教程是社区贡献，不受 Open WebUI 团队支持。它仅作为如何定制 Open WebUI 以满足您的特定使用案例的演示使用。想要贡献吗？查看贡献教程。
:::

# 🔗 Okta OIDC SSO 集成

## 概述

本文档页面介绍了将 Okta OIDC 单点登录 (SSO) 与 Open WebUI 集成所需的步骤。同时涵盖了基于 Okta 组成员身份管理 Open WebUI 用户组的**可选**功能，包括**及时 (JIT) 组创建**。通过遵循这些步骤，您将使用户能够使用他们的 Okta 凭据登录 Open WebUI。如果您选择启用组同步 (`ENABLE_OAUTH_GROUP_MANAGEMENT`)，用户登录时将根据他们的 Okta 组自动分配到 Open WebUI 中的相关组。如果您*还*启用了 JIT 组创建 (`ENABLE_OAUTH_GROUP_CREATION`)，在 Okta 声明中存在但 Open WebUI 中缺失的组将在登录期间自动创建。

### 前提条件

*   一个新的或现有的 Open WebUI 实例。
*   一个具有创建和配置应用权限的 Okta 管理账户。
*   对 OIDC、Okta 应用配置和 Open WebUI 环境变量的基本了解。

## 设置 Okta

首先，您需要在您的 Okta 组织中配置一个 OIDC 应用并设置组声明以将组信息传递到 Open WebUI。

### 1. 在 Okta 中创建/配置 OIDC 应用

1.  登录到您的 Okta 管理控制台。
2.  导航到 **应用 > 应用**。
3.  创建一个新的 **OIDC - OpenID Connect** 应用（选择 **Web 应用** 作为类型）或选择现有应用以用于 Open WebUI。
4.  在设置期间或在应用的**常规**设置选项卡中，配置**登录重定向 URI**。添加您的 Open WebUI 实例的 URI，后面加上 `/oauth/oidc/callback`。示例：`https://your-open-webui.com/oauth/oidc/callback`。
5.  记录应用**常规**选项卡中提供的**客户端 ID**和**客户端密钥**。您将在 Open WebUI 配置中使用这些信息。
6.  确保在**分配**选项卡下，将正确的用户或组分配给此应用。

### 2. 向 ID 令牌添加组声明

**(可选)** 为了在 Open WebUI 中根据 Okta 组自动管理组，您需要配置 Okta 以在 ID 令牌中发送用户的组成员信息。如果您只需要 SSO 登录并希望在 Open WebUI 中手动管理组，可以跳过此部分。

1.  在管理控制台，转到 **应用 > 应用**，并选择您的 OIDC 客户端应用。
2.  转到**登录**选项卡，并在**OpenID Connect ID Token**部分点击**编辑**。
3.  在**组声明类型**部分，选择**过滤器**。
4.  在**组声明过滤器**部分：
    *   输入 `groups` 作为声明名称（或使用默认值）。
    *   在下拉菜单中选择**匹配正则**。
    *   在正则字段中输入 `.*`。这将包括用户所属的所有组。如果需要，可以使用更具体的正则。
5.  点击**保存**。
6.  点击**返回到应用**链接。
7.  在应用的**更多**按钮下拉菜单中，点击 **刷新应用数据**。

*有关更高级的组声明配置，参考 Okta 文档 [自定义返回令牌](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) 和 [组函数](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions)。*

## 配置 Open WebUI

要在 Open WebUI 中启用 Okta OIDC SSO，您需要设置以下核心环境变量。如果您希望启用可选的组管理功能，还需额外设置一些变量。

```bash
# --- OIDC 核心设置 ---
# 如果您希望用户能够通过 Okta 创建账户，请启用 OAuth 注册
# ENABLE_OAUTH_SIGNUP="true"

# 您的 Okta 应用的客户端 ID
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# 您的 Okta 应用的客户端密钥
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# 您的 Okta 组织的 OIDC 发现 URL
# 格式: https://<your-okta-domain>/.well-known/openid-configuration
# 或针对特定授权服务器: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# 显示在登录按钮上的名称（例如，“通过 Okta 登录”）
OAUTH_PROVIDER_NAME="Okta"

# 请求的范围（默认通常足够）
# OAUTH_SCOPES="openid email profile groups" # 如果不是默认值，请确保包含‘groups’

# --- OAuth 组管理（可选）---
# 仅在您在 Okta 配置了组声明（步骤 2）时设置为 "true"
# 并且希望基于登录时的 Okta 组管理 Open WebUI 的组。
# 这会同步现有的组。用户将被添加/移除到 Open WebUI 的组中
# 以匹配他们的 Okta 组声明。
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# 仅在 ENABLE_OAUTH_GROUP_MANAGEMENT 为 true 时必需。
# ID 令牌中包含组信息的声明名称（必须与 Okta 配置匹配）
# OAUTH_GROUP_CLAIM="groups"

# 可选功能：启用 Just-in-Time (JIT) 创建，如果 Okta 声明中存在但 Open WebUI 中不存在这些组。
# 需要 ENABLE_OAUTH_GROUP_MANAGEMENT="true"。
# 如果设置为 false（默认），则仅同步现有的组。
# ENABLE_OAUTH_GROUP_CREATION="false"
```

用实际值替换 `YOUR_OKTA_CLIENT_ID`、`YOUR_OKTA_CLIENT_SECRET` 和 `YOUR_OKTA_OIDC_DISCOVERY_URL`，这些值来自你的 Okta 应用配置。

要启用基于 Okta 声明的组同步，请设置 `ENABLE_OAUTH_GROUP_MANAGEMENT="true"`，并确保 `OAUTH_GROUP_CLAIM` 与 Okta 中配置的声明名称匹配（默认值是 `groups`）。

如果**还**要启用对存在于 Okta 但尚不存在于 Open WebUI 中组的自动 Just-in-Time (JIT) 创建，请设置 `ENABLE_OAUTH_GROUP_CREATION="true"`。如果你只希望管理 Open WebUI 中已存在组的成员，可以将此值保留为 `false`。

:::warning 组成员管理
当 `ENABLE_OAUTH_GROUP_MANAGEMENT` 设置为 `true` 时，用户在 Open WebUI 中的组成员资格将**严格同步**于他们每次登录时 Okta 声明接收到的组信息。这意味着：
*   用户将被**添加**到与他们 Okta 声明相匹配的 Open WebUI 组。
*   用户将被从任何 Open WebUI 组中**移除**（包括那些在 Open WebUI 中手动创建或分配的组），如果这些组**不**在其当前登录会话的 Okta 声明中。

确保所有必要的组在 Okta 中正确配置和分配，并包含在组声明中。
:::

:::info 多节点部署中的会话持久性

当在多节点环境（例如 Kubernetes 集群或负载均衡器后）中部署 Open WebUI 时，确保会话持久性对于顺畅的用户体验至关重要，尤其是在使用 SSO 的情况下。将 `WEBUI_SECRET_KEY` 环境变量设置为**所有** Open WebUI 实例中的**相同安全且唯一的值**。
:::

```bash
# 示例：生成一个强密码密钥（例如使用 openssl rand -hex 32）
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

如果此密钥在所有节点中不一致，当会话被路由到不同的节点时，用户可能会被迫重新登录，因为由一个节点签名的会话令牌在另一个节点上无效。默认情况下，Docker 镜像在第一次启动时会生成一个随机密钥，这不适合多节点设置。

:::tip 禁用标准登录表单

如果你只允许通过 Okta（以及可能配置的其他 OAuth 提供商）登录，可以通过设置以下环境变量禁用标准电子邮件/密码登录表单：
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger 重要前提
设置 `ENABLE_LOGIN_FORM="false"` **需要** `ENABLE_OAUTH_SIGNUP="true"` 也设置为 true。如果在未启用 OAuth 注册的情况下禁用登录表单，**用户（包括管理员）将无法登录。**请确保至少一个 OAuth 提供商已配置并启用了 `ENABLE_OAUTH_SIGNUP`，然后再禁用标准登录表单。
:::

在设置这些环境变量后，重启你的 Open WebUI 实例。

## 验证

1.  转到你的 Open WebUI 登录页面。你应该能看到一个标有“使用 Okta 登录”（或你为 `OAUTH_PROVIDER_NAME` 设置的名称）的按钮。
2.  点击按钮并通过 Okta 登录流程进行认证。
3.  成功认证后，你应该会被重定向回 Open WebUI 并已登录。
4.  如果 `ENABLE_OAUTH_GROUP_MANAGEMENT` 为 true，使用非管理员用户登录。该用户在 Open WebUI 中的组现在应该严格反映他们在 Okta 中的当前组成员资格（任何不在 Okta 声明中的组成员资格将被移除）。如果 `ENABLE_OAUTH_GROUP_CREATION` 也为 true，用户的 Okta 声明中存在的任何先前未在 Open WebUI 中存在的组现在应该已自动创建。请注意，管理员用户的组不会通过 SSO 自动更新。
5.  如果遇到问题，请检查 Open WebUI 服务器日志中是否有任何与 OIDC 或组相关的错误。

## 故障排除

*   **400 错误请求/重定向 URI 不匹配：** 仔细检查 Okta 应用中的**登录重定向 URI**是否精确匹配 `<your-open-webui-url>/oauth/oidc/callback`。
*   **组未同步：** 验证 `OAUTH_GROUP_CLAIM` 环境变量是否与 Okta ID 令牌设置中配置的声明名称匹配。确保用户在组更改后已注销并重新登录 - 需要一个完整的登录流程来更新 OIDC。请记住，管理员组不会同步。
*   **配置错误:** 查看 Open WebUI 服务器日志，以获取与 OIDC 配置相关的详细错误消息。
*   请参考官方的[Open WebUI SSO 文档](/features/sso.md)。
*   查询[Okta 开发者文档](https://developer.okta.com/docs/)。