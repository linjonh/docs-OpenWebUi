---
title: "🕵🏻‍♀️ 使用 Helicone 监控您的 LLM 请求"
sidebar_position: 19
---

:::warning
本教程由社区贡献，不由 Open WebUI 团队支持。仅作为如何根据您特定需求自定义 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

# Helicone 与 Open WebUI 的集成

Helicone 是一款开源的 LLM 可观测性平台，帮助开发者监控、调试并改进**生产就绪**的应用程序，包括您的 Open WebUI 部署。

通过启用 Helicone，您可以记录 LLM 请求，评估并实验提示，并获取即时洞察，帮助您有信心地推送更改到生产环境。

- **基于模型类型的实时监控统一视图**：通过单一界面监控本地 Ollama 模型和云 API
- **请求可视化和重放**：准确查看发送给 Open WebUI 每个模型的提示，以及 LLM 生成的输出以便评估
- **本地 LLM 性能跟踪**：测量自托管模型的响应时间和吞吐量
- **按模型的使用分析**：比较 Open WebUI 设置中不同模型的使用模式
- **用户分析** 以了解交互模式
- **调试功能** 解答模型响应问题
- **成本追踪** 用于跨供应商的 LLM 使用成本


## 如何将 Helicone 集成到 Open WebUI

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube 视频播放器"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### 第一步：创建 Helicone 账户并生成您的 API 密钥

创建一个 [Helicone 账户](https://www.helicone.ai/) 并登录以生成 [API 密钥](https://us.helicone.ai/settings/api-keys)。

*— 请确保生成一个[仅写入的 API 密钥](https://docs.helicone.ai/helicone-headers/helicone-auth)。这样可以确保您仅允许向 Helicone 记录数据，而无权限读取您的私密数据。*

### 第二步：创建 OpenAI 账户并生成您的 API 密钥

创建一个 OpenAI 账户并登录到 [OpenAI 开发者门户](https://platform.openai.com/account/api-keys) 生成一个 API 密钥。

### 第三步：使用 Helicone 的基础 URL 运行您的 Open WebUI 应用程序

要启动您的第一个 Open WebUI 应用程序，请使用 [Open WebUI 文档](https://docs.openwebui.com/) 中的命令，并包含 Helicone 的 API BASE URL，以便您可以自动查询和监控。

```bash
   # 设置您的环境变量
   export HELICONE_API_KEY=<YOUR_API_KEY>
   export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

   # 使用 Helicone 集成运行 Open WebUI
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

如果您已经部署了 Open WebUI 应用程序，请进入 `管理面板` > `设置` > `连接`，然后在"管理 OpenAI API 连接"中点击 "+" 符号。更新以下属性：

- 您的 `API Base URL` 应为 ``https://oai.helicone.ai/v1/<YOUR_HELICONE_API_KEY>``
- `API KEY` 应为您的 OpenAI API 密钥。

![Open WebUI Helicone 设置](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### 第四步：确保监控正常运行

要确保您的集成正常工作，请登录到 Helicone 的仪表板并查看 "请求 (Requests)" 选项卡。

您应该可以看到通过 Open WebUI 界面发出的请求已经被记录到 Helicone 中。

![Helicone 示例追踪](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## 了解更多

有关 Helicone 的全面指南，您可以查看 [Helicone 的文档](https://docs.helicone.ai/getting-started/quick-start)。
