---
sidebar_position: 6
title: "📊 监控您的开放 WebUI"
---

# 使用监控保持您的开放 WebUI 健康 🩺

监控您的开放 WebUI 实例对于确保其可靠运行、性能良好，并快速识别和解决问题至关重要。本指南概述了三层次的监控，从基本的可用性检查到深入的模型响应测试。

**为什么要监控？**

* **确保正常运行时间：** 主动检测故障和服务中断。
* **性能数据：** 跟踪响应时间并识别潜在瓶颈。
* **提前发现问题：** 在问题对用户造成重大影响之前捕捉问题。
* **安心无忧：** 确信您的开放 WebUI 实例运行顺畅。

## 🚦 监控等级

我们将介绍三个等级的监控，从基础到更全面：

1. **基本健康检查：** 验证开放 WebUI 服务是否正在运行并响应。
2. **模型连接性检查：** 确认开放 WebUI 能够连接并列出您配置的模型。
3. **模型响应测试（深度健康检查）：** 确保模型能够实际处理请求并生成响应。

## 等级 1：基本健康检查端点 ✅

最简单的监控方法是检查 `/health` 端点。此端点公开访问（无需身份验证），在开放 WebUI 服务正确运行时返回 `200 OK` 状态码。

**如何测试：**

您可以使用 `curl` 或任何 HTTP 客户端检查此端点：

```bash
   # 基本健康检查 - 无需身份验证
   curl https://your-open-webui-instance/health
```

**预期输出：** 成功的健康检查将返回 `200 OK` 的 HTTP 状态码。对于基本健康检查来说，响应体的内容通常并不重要。

### 使用 Uptime Kuma 执行基本健康检查 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) 是一个优秀、开源且易于使用的自托管正常运行时间监控工具。强烈推荐用于监控开放 WebUI。

**在 Uptime Kuma 中设置的步骤：**

1. **添加一个新监控：** 在您的 Uptime Kuma 仪表盘中，点击“添加新监控”。
2. **配置监控设置：**
   * **监控类型：** 选择“HTTP(s)”。
   * **名称：** 给您的监控起一个描述性的名字，例如“开放 WebUI 健康检查”。
   * **网址：** 输入健康检查端点 URL：`http://your-open-webui-instance:8080/health`（用实际的开放 WebUI 地址和端口替换 `your-open-webui-instance:8080`）。
   * **监控间隔：** 设置检查频率（例如，每分钟设置为 `60 秒`）。
   * **重试次数：** 设置认为服务不可用之前的重试次数（例如，`3` 次重试）。

**此检查验证了什么：**

* **Web 服务器可用性：** 确保 Web 服务器（例如 Nginx、Uvicorn）正在响应请求。
* **应用运行情况：** 确认开放 WebUI 应用本身正在运行并已初始化。
* **基本数据库连接：** 通常包括基本检查以确保应用能够连接到数据库。

## 等级 2：开放 WebUI 模型连接性 🔗

为了超越基本可用性，可以监控 `/api/models` 端点。此端点 **需要身份验证**，用于验证开放 WebUI 能否成功与配置的模型提供商（例如 Ollama、OpenAI）通信并检索可用模型列表。

**为什么监控模型连接性？**

* **模型提供商问题：** 检测您的模型提供商服务出现的问题（例如 API 中断、身份验证失败）。
* **配置错误：** 识别开放 WebUI 中模型提供商设置的配置错误。
* **确保模型可用性：** 确认您期望可用的模型实际上可以被开放 WebUI 访问。

**API 端点详情：**

查看 [开放 WebUI API 文档](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models) 了解有关 `/api/models` 端点及其响应结构的完整详细信息。

**如何使用 `curl` 进行测试（需身份验证）：**

您需要一个 API 密钥才能访问此端点。有关生成 API 密钥的说明，请参阅下面的“身份验证设置”部分。

```bash
   # 带身份验证的模型连接性检查
   curl -H "Authorization: Bearer YOUR_API_KEY" https://your-open-webui-instance/api/models
```

*(将 `YOUR_API_KEY` 替换为您的实际 API 密钥，将 `your-open-webui-instance` 替换为您的开放 WebUI 地址。)*

**预期输出：** 成功的请求将返回 `200 OK` 的状态码以及包含模型列表的 JSON 响应。

### API 密钥的身份验证设置 🔑

在监控 `/api/models` 端点之前，您需要在开放 WebUI 中启用 API 密钥并生成一个：

1. **启用 API 密钥（需要管理员权限）：**
   * 以管理员身份登录开放 WebUI。
   * 前往 **管理设置**（通常在右上角菜单中）> **常规**。
   * 找到 "启用 API 密钥" 设置并将其 **打开**。
   * 点击 **保存更改**。

2. **生成 API 密钥（用户设置）：**
   * 进入你的 **用户设置**（通常通过点击右上角的个人图标）。
   * 导航到 **账户** 部分。
   * 点击 **生成新的 API 密钥**。
   * 为 API 密钥赋予一个描述性名称（例如，"监控 API 密钥"）。
   * **复制生成的 API 密钥** 并安全保存。你需要此密钥来设置监控。

   *(可选但推荐)：* 为了安全性最佳实践，可以专门为监控创建一个 **非管理员用户账号**，并为该用户生成 API 密钥。这可以减少监控 API 密钥被泄露时的潜在影响。

   *如果你在设置中看不到生成 API 密钥的选项，请联系你的 Open WebUI 管理员确保已启用 API 密钥功能。*

### 使用 Uptime Kuma 进行模型连接性监控 🐻

1. **在 Uptime Kuma 创建一个新监控：**
   * 监控类型：“HTTP(s) - JSON 查询”。
   * 名称：“Open WebUI 模型连接性检查”。
   * URL：`http://your-open-webui-instance:8080/api/models`（替换为你的 URL）。
   * 方法：“GET”。
   * 预期状态码：`200`。

2. **配置 JSON 查询（验证模型列表）：**
   * **JSON 查询：** `$count(data[*])>0`
     * **说明：** 该 JSONata 查询检查 API 响应中的 `data` 数组（包含模型列表）的数量是否大于 0。换句话说，它验证是否至少返回一个模型。
   * **预期值：** `true`（查询应返回 `true` 表示列出了模型）。

3. **添加身份验证头：**
   * 在 Uptime Kuma 监控配置的“Headers”部分，点击“添加 Header”。
   * **Header 名称：** `Authorization`
   * **Header 值：** `Bearer YOUR_API_KEY`（将 `YOUR_API_KEY` 替换为你生成的 API 密钥）。

4. **设置监控间隔：** 建议的间隔为 `300 秒`（5 分钟）或更长，因为模型列表通常不会频繁变化。

**替代 JSON 查询（高级）：**

你可以使用更具体的 JSONata 查询来检查特定模型或提供者。以下是一些示例：

* **检查是否至少有一个 Ollama 模型：** `$count(data[owned_by='ollama'])>0`
* **检查是否存在特定模型（例如，'gpt-4o'）：** `$exists(data[id='gpt-4o'])`
* **检查是否存在多个特定模型（例如，'gpt-4o' 和 'gpt-4o-mini'）：** `$count(data[id in ['gpt-4o', 'gpt-4o-mini']]) = 2`

你可以使用 [jsonata.org](https://try.jsonata.org/) 测试和优化你的 JSONata 查询，以确保其按预期工作。

## 第 3 级：模型响应测试（深度健康检查）🤖

为了实现最全面的监控，你可以测试模型是否能够实际处理请求并生成响应。这涉及向 `/api/chat/completions` 端点发送一个简单的聊天完成请求。

**为什么测试模型响应？**

* **端到端验证：** 确认从 API 请求到模型响应的整个模型管道是否正常工作。
* **模型加载问题：** 发现特定模型加载失败或无响应的问题。
* **后端处理错误：** 捕获可能导致模型无法生成完成的后端逻辑错误。

**如何使用 `curl` 测试（带身份验证的 POST 请求）：**

此测试需要 API 密钥，并向聊天完成端点发送包含简单消息的 POST 请求。

```bash
# 测试模型响应 - 带身份验证的 POST 请求
curl -X POST https://your-open-webui-instance/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Respond with the word HEALTHY"}],
    "model": "llama3.1",  # 替换为你期望可用的模型
    "temperature": 0      # 设置温度为 0 以确保响应一致
  }'
```

*(将 `YOUR_API_KEY`、`your-open-webui-instance` 和 `llama3.1` 替换为你的实际值。)*

**预期输出：** 成功的请求将返回一个 `200 OK` 状态码和包含聊天完成的 JSON 响应。你可以验证响应是否包含单词 "HEALTHY"（或基于提示的类似预期响应）。

**在 Uptime Kuma 设置第 3 级监控涉及配置 HTTP(s) 监控，包括 POST 请求、JSON 主体、身份验证头以及可能的 JSON 查询以验证响应内容。这是一个更高级的设置，可以根据具体需求进行定制。**

通过实施这些监控级别，你可以主动确保 Open WebUI 实例的健康、可靠性和性能，为用户提供一致且良好的体验。
