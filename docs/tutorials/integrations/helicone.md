---
title: "🕵🏻‍♀️ 使用 Helicone 监控你的 LLM 请求"
sidebar_position: 19
---

:::warning
本教程是社区贡献内容，并未获得 Open WebUI 团队支持。仅作为展示如何根据具体用例定制 Open WebUI 的示例。如果希望贡献，请查看贡献教程。
:::

# 将 Helicone 集成到 Open WebUI

Helicone 是一个开源的 LLM 可观察性平台，帮助开发者监控、调试并改进**生产级**应用程序，包括你的 Open WebUI 部署。

启用 Helicone 后，你可以记录 LLM 请求，评估和尝试提示，并获得即时的洞察，帮助你放心地将更新推送到生产环境。

- **实时监控，整合多种模型类型的视图**：通过单一界面同时监控本地 Ollama 模型和云 API
- **请求可视化与重放**：精准查看发送给 Open WebUI 每个模型的提示，以及 LLM 生成以供评估的输出
- **本地 LLM 性能跟踪**：衡量自托管模型的响应时间和吞吐量
- **按模型分析使用情况**：比较 Open WebUI 配置中不同模型的使用模式
- **用户分析**以了解交互模式
- **调试功能**以解决模型响应中的问题
- **成本追踪**以监控跨供应商的 LLM 使用成本


## 如何将 Helicone 集成到 OpenWebUI 中

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube 视频播放"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### 步骤 1：创建 Helicone 帐户并生成 API 密钥

创建 [Helicone 帐户](https://www.helicone.ai/)并登录，以生成 [API 密钥](https://us.helicone.ai/settings/api-keys)。

*— 请确保生成[仅写入 API 密钥](https://docs.helicone.ai/helicone-headers/helicone-auth)。这样可以确保仅向 Helicone 记录数据，而无法读取你的私密数据。*

### 步骤 2：创建 OpenAI 帐户并生成 API 密钥

 创建 OpenAI 帐户并登录 [OpenAI&apos;s Developer Portal](https://platform.openai.com/account/api-keys) 来生成 API 密钥。

### 步骤 3：使用 Helicone 的基础 URL 运行 Open WebUI 应用程序

要启动你的第一个 Open WebUI 应用程序，请使用 [Open WebUI 文档](https://docs.openwebui.com/)中的命令，并包含 Helicone 的 API BASE URL，以便自动查询和监控。

```bash
   # 设置环境变量
   export HELICONE_API_KEY=<你的 API 密钥>
   export OPENAI_API_KEY=<你的 OpenAI API 密钥>

   # 使用 Helicone 集成运行 Open WebUI
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

如果你已经部署了 Open WebUI 应用程序，请转到 `管理面板` > `设置` > `连接` 并点击 "管理 OpenAI API 连接" 的 `+` 符号。更新以下属性：

- 你的 `API Base URL` 应为 ``https://oai.helicone.ai/v1/<你的 HELICONE_API_KEY>``
- `API KEY` 应为你的 OpenAI API 密钥。

![Open WebUI Helicone 设置](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### 步骤 4：确认监控是否正常

确保你的集成正常工作，登录 Helicone 的仪表板并查看 "请求" 标签。

你应该可以看到通过 Open WebUI 界面发送的请求已经被记录到 Helicone 中。

![Helicone 跟踪示例](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## 了解更多

要获取关于 Helicone 的全面指南，你可以访问 [Helicone&apos;s 的文档](https://docs.helicone.ai/getting-started/quick-start)。
