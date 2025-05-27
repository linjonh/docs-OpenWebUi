---
sidebar_position: 6
title: "📊 监控您的 Open WebUI"
---

# 通过监控保持 Open WebUI 的健康状况 🩺

监控您的 Open WebUI 实例对确保其可靠运行、良好性能以及快速识别和解决任何问题至关重要。本指南概述了三种监控级别，从基本可用性检查到深入的模型响应测试。

**为什么要监控？**

* **确保正常运行时间：**  主动检测故障和服务中断。
* **性能洞察：**  追踪响应时间并识别潜在的瓶颈。
* **问题早期检测：**  在问题对用户产生重大影响之前解决问题。
* **安心无忧：**  获取 Open WebUI 实例运行顺畅的信心。

## 🚦 监控级别

我们将涵盖三种监控级别，从基础到更全面的分析：

1. **基本健康检查：**  验证 Open WebUI 服务是否运行和响应。
2. **模型连接检查：** 确认 Open WebUI 能够连接并列出配置的模型。
3. **模型响应测试（深度健康检查）：**  确保模型能够实际处理请求并生成响应。

## 级别1：基本健康检查端点 ✅

最简单的监控方式是检查 `/health` 端点。该端点是公开访问的（不需要身份验证），当 Open WebUI 服务运行正常时返回 `200 OK` 状态码。

**如何测试：**

您可以使用 `curl` 或任何 HTTP 客户端检查此端点：

```bash
   # 基本健康检查 - 无需身份验证
   curl https://your-open-webui-instance/health
```

**预期输出：** 成功的健康检查将返回一个 `200 OK` HTTP 状态码。响应正文的内容通常对于基础健康检查来说并不重要。

### 使用 Uptime Kuma 进行基本健康检查 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) 是一个出色的开源易用的自托管运行状态监控工具。它强烈推荐用于监控 Open WebUI。

**在 Uptime Kuma 中设置的步骤：**

1. **添加新的监控器：** 在您的 Uptime Kuma 仪表板中，点击 “添加新监控器”。
2. **配置监控器设置：**
   * **监控类型：** 选择 “HTTP(s)”。
   * **名称：** 给您的监控器一个描述性名称，例如 “Open WebUI 健康检查”。
   * **URL：** 输入健康检查端点 URL：`http://your-open-webui-instance:8080/health`（将 `your-open-webui-instance:8080` 替换为您的实际 Open WebUI 地址和端口）。
   * **监控间隔：** 设置检查的频率（例如，每分钟一次 `60 seconds`）。
   * **重试次数：** 设置将服务视为停机之前的重试次数（例如 `3` 次重试）。

**此检查验证内容：**

* **Web服务器可用性：** 确保 web 服务器（例如 Nginx、Uvicorn）能够响应请求。
* **应用程序运行状态：** 确认 Open WebUI 应用程序本身正在运行并已初始化。
* **基本数据库连接性：** 通常包括对应用程序能否连接数据库的基本检查。

## 级别2：Open WebUI 模型连接 🔗

为了超越基本可用性，您可以监控 `/api/models` 端点。该端点**需要身份验证**，并验证 Open WebUI 能否成功与已配置的模型提供商（例如 Ollama、OpenAI）通信，并检索可用模型列表。

**为什么要监控模型连接？**

* **模型提供商问题：** 检测模型提供商服务的问题（例如 API 中断、身份验证失败）。
* **配置错误：** 识别 Open WebUI 中模型提供商设置中的错误配置。
* **确保模型可用性：** 确认您期望可用的模型实际上可以被 Open WebUI 访问。

**API 端点详细信息：**

请参阅 [Open WebUI API 文档](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models)，了解关于 `/api/models` 端点及其响应结构的完整详细信息。

**如何使用 `curl` 测试（认证）：**

您需要一个 API 密钥才能访问此端点。请参阅下面的“认证设置”部分以了解生成 API 密钥的说明。

```bash
   # 已认证的模型连接检查
   curl -H "Authorization: Bearer YOUR_API_KEY" https://your-open-webui-instance/api/models
```

*(将 `YOUR_API_KEY` 替换为您的实际 API 密钥，并将 `your-open-webui-instance` 替换为您的 Open WebUI 地址。)*

**预期输出：** 成功的请求将返回一个 `200 OK` 状态码，并以 JSON 格式响应包含模型列表。

### API 密钥的认证设置 🔑

在监控 `/api/models` 端点之前，您需要在 Open WebUI 中启用 API 密钥并生成一个：

1. **启用 API 密钥（需要管理员权限）：**
   * 以管理员身份登录 Open WebUI。
   * 前往 **管理员设置**（通常在右上角菜单） > **通用**。
   * 找到“启用 API 密钥”设置并**将其打开**。
   * 点击**保存更改**。

2. **生成 API 密钥（用户设置）：**
   * 前往您的**用户设置**（通常通过点击右上角的个人资料图标）。
   * 导航到 **账户** 部分。
   * 点击**生成新 API 密钥**。
   * 给 API 密钥取一个描述性名称（例如，“监控 API 密钥”）。
   * **复制生成的 API 密钥**并安全存储。您将在监控设置中需要此密钥。

   *(可选但推荐)：* 为了安全性最佳实践，考虑专门为监控创建一个**非管理员用户账户**并为该用户生成 API 密钥。这将限制在监控 API 密钥泄露时可能产生的影响。

   *如果您在设置中没有看到 API 密钥生成选项，请联系您的 Open WebUI 管理员以确保已启用 API 密钥功能。*

### 使用 Uptime Kuma 进行模型连接性监控 🐻

1. **在 Uptime Kuma 中创建一个新监控器：**
   * 监控类型：“HTTP(s) - JSON 查询”。
   * 名称：“Open WebUI 模型连接性检查”。
   * URL：`http://your-open-webui-instance:8080/api/models`（用您的 URL 替换）。
   * 方法：“GET”。
   * 预期状态码：`200`。

2. **配置 JSON 查询（验证模型列表）：**
   * **JSON 查询：** `$count(data[*])>0`
     * **解释：** 该 JSONata 查询检查 API 响应中的 `data` 数组（包含模型列表）是否具有计数大于 0。换句话说，它验证是否返回至少一个模型。
   * **预期值：** `true`（如果列出了模型，查询应返回 `true`）。

3. **添加身份验证头：**
   * 在 Uptime Kuma 监控器配置的“头部”部分，点击“添加头部”。
   * **头部名称：** `Authorization`
   * **头部值：** `Bearer YOUR_API_KEY`（用您生成的 API 密钥替换 `YOUR_API_KEY`）。

4. **设置监控间隔：** 建议间隔：`300 秒`（5 分钟）或更长时间，因为模型列表通常不会频繁变化。

**高级 JSON 查询（可选）：**

您可以使用更具体的 JSONata 查询来检查特定模型或提供者。以下是一些示例：

* **检查至少一个 Ollama 模型：** `$count(data[owned_by=ollama])>0`
* **检查特定模型是否存在（例如，gpt-4o）：** `$exists(data[id=gpt-4o])`
* **检查多个特定模型是否存在（例如，gpt-4o 和 gpt-4o-mini）：** `$count(data[id in [gpt-4o, gpt-4o-mini]]) = 2`

您可以在 [jsonata.org](https://try.jsonata.org/) 上使用 API 响应示例测试和调整您的 JSONata 查询，从而确保其按预期工作。

## 第 3 级：模型响应测试（深度健康检查）🤖

为了最全面的监控，您可以测试模型是否真正能够处理请求并生成响应。这涉及向 `/api/chat/completions` 端点发送一个简单的聊天完成请求。

**为什么要测试模型响应？**

* **端到端验证：** 确认整个模型管道是否正常工作，从 API 请求到模型响应。
* **模型加载问题：** 检测特定模型加载或响应失败的问题。
* **后台处理错误：** 捕获可能阻止模型生成完成的后台逻辑中的错误。

**如何使用 `curl` 进行测试（带身份验证的 POST 请求）：**

该测试需要一个 API 密钥，并向聊天完成端点发送一个包含简单消息的 POST 请求。

```bash
# 测试模型响应 - 带身份验证的 POST 请求
curl -X POST https://your-open-webui-instance/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
    "messages": [{"role": "user", "content": "Respond with the word HEALTHY"}],
    "model": "llama3.1",  # 用您期望可用的模型替换
    "temperature": 0      # 将温度设置为 0 以获得一致的响应
  }
```

*(替换 `YOUR_API_KEY`、`your-open-webui-instance` 和 `llama3.1` 为您的实际值。)*

**预期输出：** 成功的请求将返回 `200 OK` 状态码以及包含聊天完成的 JSON 响应。您可以验证响应中是否包含单词“HEALTHY”（或根据您的提示应得到的类似预期响应）。

**在 Uptime Kuma 中设置第 3 级监控将涉及配置一个包含 POST 请求、JSON 主体、身份验证头以及可能验证响应内容的 JSON 查询的 HTTP(s) 监控器。这是一种更高级的设置，可根据您的具体需求进行定制。**

通过实施这些监控级别，您可以主动确保您的 Open WebUI 实例健康、可靠且高效，为用户提供一致的良好体验。
