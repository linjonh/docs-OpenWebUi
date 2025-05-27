---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode 扩展与 Open WebUI 集成"
---

:::warning
本教程是社区贡献内容，并未受到 Open WebUI 团队的支持。它仅用于展示如何根据您的具体需求自定义 Open WebUI。想要贡献？请查看贡献教程。
:::

# 将 Continue.dev VSCode 扩展与 Open WebUI 集成

### 下载扩展

您可以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue) 下载 VSCode 扩展。

安装后，您应该会在侧边栏看到一个continue标签，打开它。

点击主聊天输入框上方的助手选择器。然后将鼠标悬停在"本地助手"上，您应该会看到一个设置图标（看起来像齿轮）。

点击设置图标后，`config.yaml` 应会在编辑器中打开。

在这里，您可以配置 continue 使用 Open WebUI。

---

目前，ollama 提供商不支持身份验证，因此无法与 Open WebUI 一起使用。

但是，Ollama 和 Open WebUI 都兼容 OpenAI API 规范。您可以在 Ollama 的 [博客文章](https://ollama.com/blog/openai-compatibility) 中了解更多信息。

我们仍然可以设置 Continue 使用 openai 提供商，这将允许我们使用 Open WebUI 的身份验证令牌。

---

## 配置

在 `config.yaml` 中，您只需要添加/更改以下选项。

### 将提供商更改为 openai

```yaml
provider: openai
```

### 添加或更新 apiBase

将此设置为您的 Open WebUI 域末端。

```yaml
apiBase: http://localhost:3000/ #如果您按照入门 Docker 进行了操作
```

### 添加 apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # 替换为您的 API 密钥
```

您可以在 Open WebUI -> 设置 -> 账户 -> API 密钥生成并找到您的 api 密钥

您需要复制"API 密钥"（它以 sk- 开头）

## 配置示例

以下是使用 Open WebUI 的 config.yaml 基本示例，通过 openai 提供商使用 Granite Code 模型。
请确保您之前已将模型拉入您的 ollama 实例。

```yaml
name: 本地助手
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

  - name: Model ABC 来自 pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code 自动补全
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: 测试
    description: 为高亮代码编写单元测试
    prompt: |
      为选中的代码编写全面的单元测试。这些测试应该包括设置、运行检查正确性的测试，包括重要的边界情况，以及拆除过程。确保测试完整且精确。仅将测试作为聊天输出，不编辑任何文件。
```

保存您的 `config.yaml` 就完成了！

您现在应该可以在 Continue 标签的模型选择中看到您的模型。

选择它后，您应该现在可以通过 Open WebUI（或任何您已设置的 [pipelines](/pipelines)）进行聊天。

您可以为想使用的多个模型重复此操作，虽然任何模型都可以使用，但您应该使用专为代码设计的模型。

请参阅 continue 文档以了解其他 continue 配置，[Continue 文档](https://docs.continue.dev/reference/Model%20Providers/openai)
