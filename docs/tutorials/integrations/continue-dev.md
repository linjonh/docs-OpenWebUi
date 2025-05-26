---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode扩展与Open WebUI集成"
---

:::warning
本教程是社区贡献内容，不受Open WebUI团队支持，仅作为定制Open WebUI以满足特定需求的示范使用。想要贡献？请查看贡献教程。
:::

# Continue.dev VSCode扩展与Open WebUI的集成

### 下载扩展

您可以在[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)下载VSCode扩展。

安装后，侧边栏中应该会出现一个“continue”选项卡。点击打开它。

点击主聊天输入框上方的助手选择器。然后悬停在“Local Assistant”上，您应该会看到一个设置图标（看起来像齿轮）。

点击设置图标后，`config.yaml`应该会在编辑器中打开。

在这里，您就可以配置continue以使用Open WebUI。

---

目前，“ollama”提供者不支持身份验证，因此我们无法使用Open WebUI进行此提供者的配置。

然而，Ollama和Open WebUI都兼容OpenAI API规范。您可以在Ollama的[博客文章](https://ollama.com/blog/openai-compatibility)中看到相关信息。

我们仍然可以设置Continue使用openai提供者，这样我们就可以使用Open WebUI的身份验证令牌了。

---

## 配置

在`config.yaml`中，您需要添加或更改以下选项。

### 将提供者更改为openai

```yaml
provider: openai
```

### 添加或更新apiBase

将此设置为您的Open WebUI域名。

```yaml
apiBase: http://localhost:3000/ #如果您按照入门Docker配置
```

### 添加apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # 使用您的API密钥替换
```

您可以从Open WebUI -> Settings -> Account -> API Keys找到并生成您的API密钥。

您需要复制“API Key”（以sk-开头）。

## 示例配置

以下是一个使用openai提供者通过Open WebUI的`config.yaml`基础示例。使用Granite Code作为模型。
请确保您事先将模型拉入您的ollama实例。

```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Model ABC from pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplete
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: 为突出显示的代码编写单元测试
    prompt: |
      为选定代码编写一套全面的单元测试。它应该包括设置、运行测试以检查正确性（包括重要的边界情况），以及清理。确保测试完整而复杂。仅以聊天输出提供测试，不需编辑任何文件。
```

保存您的`config.yaml`，就完成了！

您现在应该能在Continue选项卡的模型选择中看到您的模型。

选择它，您就可以通过Open WebUI（以及您设置的任何[pipelines](/pipelines)）进行聊天了。

您可以为您希望使用的多个模型执行此操作。虽然任何模型都应该可以使用，但建议使用专门为代码设计的模型。

有关更多Continue配置信息，请参阅[Continue文档](https://docs.continue.dev/reference/Model%20Providers/openai)。
