---
sidebar_position: 17
title: "🪝 Webhook 集成"
---

概览
--------

Open WebUI 提供了一个 webhook 功能，允许您在新用户注册您的实例时自动接收通知。这通过向 Open WebUI 提供一个 webhook URL 来实现，当创建新用户账号时，系统会将通知发送到该 URL。

在 Open WebUI 中配置 Webhook
---------------------------------

您需要从支持 webhook 的外部服务（例如 Discord 频道或 Slack 工作区）获取一个 webhook URL，此 URL 将用于接收来自 Open WebUI 的通知。

要在 Open WebUI 中配置 webhook，您有两种选择：

### 选项 1：通过管理界面进行配置

1. 以管理员身份登录到您的 Open WebUI 实例。
2. 导航至 `管理面板`。
3. 点击顶部的 `设置` 标签。
4. 从管理面板中的设置导航至 `常规` 部分。
5. 找到 `Webhook URL` 字段并输入 webhook URL。
6. 保存更改。

### 选项 2：通过环境变量进行配置

或者，您可以通过设置 `WEBHOOK_URL` 环境变量来配置 webhook URL。有关 Open WebUI 中环境变量的更多信息，请参阅 [环境变量配置](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url)。

### 步骤 3：验证 Webhook

要验证 webhook 是否正常工作，请在 Open WebUI 中创建一个新用户账号。如果 webhook 配置正确，您应在指定的 webhook URL 处收到通知。

Webhook 负载格式
----------------------

Open WebUI 发送的 webhook 负载是纯文本，包含关于新用户账号的简单通知消息。负载格式如下：

```
新用户注册: <用户名>
```

例如，如果名为 "Tim" 的用户注册，发送的负载将是：

```
新用户注册: Tim
```

故障排除
--------------

* 确保 webhook URL 是正确且格式正确的。
* 验证 webhook 服务已启用并正确配置。
* 检查 Open WebUI 日志中是否有与 webhook 相关的错误。
* 验证连接是否未被防火墙或代理中断或阻止。
* Webhook 服务器可能暂时不可用或存在较高的延迟。
* 如果由 webhook 服务提供，请验证 Webhook API 密钥是否无效、过期或已吊销。

注意：Open WebUI 中的 webhook 功能仍在发展中，我们计划在未来添加更多功能和事件类型。
