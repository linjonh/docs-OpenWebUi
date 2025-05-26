---
sidebar_position: 31
title: "🛌 与 Amazon Bedrock 集成"
---

:::warning
本教程是社区贡献的内容，不受 Open WebUI 团队支持。它仅作为如何为您的特定用例自定义 Open WebUI 的示例。想要贡献？请查看贡献教程。
:::

---

# 将 Open-WebUI 与 Amazon Bedrock 集成

在本教程中，我们将探索将 Open-WebUI 与 Amazon Bedrock 集成的最常见和最流行的方法之一。

## 前置条件


为了跟随本教程，您需要以下条件：

- 一个有效的 AWS 账户
- 一个有效的 AWS 访问密钥和秘密密钥
- 在 AWS 中启用 Bedrock 模型的 IAM 权限或已启用的模型
- 在您的系统上安装了 Docker


## 什么是 Amazon Bedrock

直接引自 AWS 官网：

“Amazon Bedrock 是一项完全托管的服务，通过单一 API 提供来自领先 AI 公司（例如 AI21 Labs、Anthropic、Cohere、Luma、Meta、Mistral AI、poolside（即将推出）、Stability AI 和 Amazon）的高性能基础模型（FMs）的选择，以及构建具有安全、隐私和负责任 AI 的生成式 AI 应用程序所需的广泛功能。通过使用 Amazon Bedrock，您可以轻松地根据您的使用场景试验和评估顶级 FMs，使用微调和检索增强生成（RAG）等技术使用您的数据进行私有化定制，并构建使用企业系统和数据源执行任务的代理。由于 Amazon Bedrock 是无服务器的，您不需要管理任何基础设施，可以安全地将生成式 AI 功能集成和部署到您已经熟悉的 AWS 服务中。”

了解更多有关 Bedrock 的信息，请访问：[Amazon Bedrock 官方页面](https://aws.amazon.com/bedrock/)

# 集成步骤

## 第一步：验证对 Amazon Bedrock 基础模型的访问

在我们可以与 Bedrock 集成之前，您首先需要验证是否至少有一个（最好多个）可用的基础模型的访问权限。截至编写本文（2025 年 2 月）时，有 47 个基础模型可供选择。您可以在下面的屏幕截图中看到，我可以访问多个模型。如果模型旁边显示“✅ 访问权限已授予”，那么您就知道可以访问该模型。如果您无法访问任何模型，在下一步中将会遇到错误。

AWS 提供了良好的文档来请求访问/启用这些模型：[Amazon Bedrock 模型访问文档](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock 基础模型](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## 第二步：配置 Bedrock 访问网关

现在我们已经至少有一个 Bedrock 基础模型的访问权限，我们需要配置 Bedrock 访问网关（简称 BAG）。您可以将 BAG 想象为一种由 AWS 开发的代理或中间件，它围绕 AWS 原生端点/SDK 为 Bedrock 提供包装，并反过来暴露与 OpenAI 的架构兼容的端点，而这正是 Open-WebUI 所需的。

作为参考，这里是端点之间的简单映射：


| OpenAI 端点            | Bedrock 方法            |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse 或 converse_stream    |
| `/embeddings`           | invoke_model           |

BAG 仓库可以在这里找到：[Bedrock Access Gateway 仓库](https://github.com/aws-samples/bedrock-access-gateway)

要设置 BAG，请按照以下步骤进行：
- 克隆 BAG 仓库
- 删除默认的 `dockerfile`
- 将 `Dockerfile_ecs` 的名称更改为 `Dockerfile`

现在我们可以使用以下命令来构建和启动 Docker 容器：

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

您现在应该能够访问 BAG 的 Swagger 页面：http://localhost:8000/docs

![Bedrock Access Gateway Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## 第三步：在 Open-WebUI 中添加连接

现在您已经成功启动了 BAG，该将其作为新的连接添加到 Open-WebUI 中了。

- 在管理面板中，进入 Settings -> Connections。
- 使用“+”（加号）按钮在 OpenAI 下添加一个新连接。
- 对于 URL，请使用 "http://host.docker.internal:8000/api/v1"。
- 对于密码，BAG 中定义的默认密码为 "bedrock"。您可以在 BAG 设置中更改此密码（参见 DEFAULT_API_KEYS）。
- 点击“验证连接”按钮，您应该会在右上角看到“服务器连接已验证”的提示。

![新增连接](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## 步骤 4: 开始使用 Bedrock 基础模型

现在你应该可以看到所有 Bedrock 模型可用了！

![使用 Bedrock 模型](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## 其他有用的教程

在将 Open-WebUI 集成到 Amazon Bedrock 时，下列教程非常有帮助。

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
