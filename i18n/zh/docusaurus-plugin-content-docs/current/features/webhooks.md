---
sidebar_position: 17
title: "🪝 Webhook 集成"
---

概览
--------

Open WebUI 提供了一个 webhook 功能，当新用户注册到您的实例时，您可以通过此功能自动接收通知。这是通过向 Open WebUI 提供一个 webhook URL 实现的，当创建新用户账户时，系统会向该 URL 发送通知。

在 Open WebUI 中配置 Webhooks
---------------------------------

您需要从支持 webhooks 的外部服务（如 Discord 频道或 Slack 工作区）获取一个 webhook URL。该 URL 将用于接收来自 Open WebUI 的通知。

在 Open WebUI 中配置 webhooks，您有两种选择：

### 选项 1：通过管理员界面配置

1. 以管理员身份登录到您的 Open WebUI 实例。
2. 导航到 `管理面板`。
3. 点击位于顶部的 `设置` 选项卡。
4. 然后，导航到管理面板中设置的 `常规` 部分。
5. 找到 `Webhook URL` 字段并输入 webhook URL。
6. 保存更改。

### 选项 2：通过环境变量配置

或者，您可以通过设置环境变量 `WEBHOOK_URL` 来配置 webhook URL。有关 Open WebUI 环境变量的更多信息，请参阅 [环境变量配置](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url)。

### 第 3 步：验证 Webhook

要验证 webhook 是否正常工作，请在 Open WebUI 中创建一个新用户账户。如果 webhook 配置正确，您应在指定的 webhook URL 收到通知。

Webhook 负载格式
----------------------

Open WebUI 发送的 webhook 负载是纯文本，包含有关新用户账户的简单通知消息。负载格式如下：

```
新用户注册: <用户名>
```

例如，如果名为 "Tim" 的用户注册，发送的负载为：

```
新用户注册: Tim
```

故障排除
--------------

* 确保 webhook URL 是正确且格式化的。
* 验证 webhook 服务是否已启用并正确配置。
* 检查 Open WebUI 日志中是否有与 webhook 相关的错误。
* 验证连接是否未被防火墙或代理中断或阻止。
* webhook 服务器可能暂时不可用或经历高延迟。
* 如果通过 webhook 服务提供，请验证 Webhook API 密钥是否无效、过期或被撤销。

注意：Open WebUI 的 webhook 功能正在不断发展，我们计划在未来增加更多功能和事件类型。
