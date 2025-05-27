---
sidebar_position: 31
title: "🛌 集成 Amazon Bedrock"
---

:::warning
本教程是社区贡献的内容，并未得到 Open WebUI 团队的支持。它仅用于演示如何根据您的特定使用场景自定义 Open WebUI。想要贡献？查看贡献教程。
:::

---

# 将 Open-WebUI 集成到 Amazon Bedrock

在本教程中，我们将探索将 Open-WebUI 集成到 Amazon Bedrock 的一种最常见且流行的方法。

## 前置要求


为了解本教程，您需要满足以下条件：

- 一个活动的 AWS 账户
- 一个有效的 AWS 访问密钥和秘密密钥
- 在 AWS 中启用 Bedrock 模型的 IAM 权限或已经启用的模型
- 您系统中安装了 Docker


## 什么是 Amazon Bedrock

直接来源于 AWS 的网站：

"Amazon Bedrock 是一项完全托管的服务，提供了来自领先 AI 公司（例如 AI21 Labs、Anthropic、Cohere、Luma、Meta、Mistral AI、poolside（即将推出）、Stability AI 和 Amazon）的高性能基础模型（FMs）的选择，通过单一 API，以及构建具有安全性、隐私性和负责任 AI 的生成式 AI 应用程序所需的广泛功能。使用 Amazon Bedrock，您可以轻松地根据您的使用场景试验和评估顶级基础模型，并使用微调和检索增强生成（RAG）等技术通过您的数据进行私人定制，并构建使用企业系统和数据源执行任务的代理。由于 Amazon Bedrock 是无服务器的，您无需管理任何基础设施，并且可以使用您已经熟悉的 AWS 服务安全地将生成式 AI 功能集成并部署到您的应用程序中。"

了解更多关于 Bedrock 的信息，请访问：[Amazon Bedrock 官方页面](https://aws.amazon.com/bedrock/)

# 集成步骤

## 步骤 1: 验证对 Amazon Bedrock 基础模型的访问

在我们能够集成到 Bedrock 之前，您首先需要验证是否可以访问至少一个（最好是多个）可用的基础模型。在撰写本文时（2025 年 2 月），共有 47 个基础模型可用。以下截图显示我可以访问多个模型。您会看到模型旁边显示 “✅ 已授予访问权”，如果您无法访问任何模型，下一步会出现错误。

AWS 提供了有关请求访问/启用这些模型的良好文档，请访问：[Amazon Bedrock 模型访问文档](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock 基础模型](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## 步骤 2: 配置 Bedrock 访问网关

现在我们已经能够访问至少一个 Bedrock 基础模型，我们需要配置 Bedrock 访问网关（BAG）。您可以将 BAG 看作是 AWS 开发的一种代理或中间件，它围绕 AWS 原生端点/SDK 用于 Bedrock，并因此暴露兼容 OpenAI 架构的端点，而这正是 Open-WebUI 所需要的。

作为参考，这里是端点之间的简单映射关系：


| OpenAI 端点             | Bedrock 方法                |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse 或 converse_stream    |
| `/embeddings`           | invoke_model           |

BAG 仓库可以在这里找到：[Bedrock Access Gateway 仓库](https://github.com/aws-samples/bedrock-access-gateway)

设置 BAG 的步骤如下：
- 克隆 BAG 仓库
- 删除默认的 `dockerfile`
- 将 `Dockerfile_ecs` 的名称更改为 `Dockerfile`

我们现在可以准备构建和启动 docker 容器，使用以下命令：

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

您现在可以访问 BAG 的 swagger 页面：http://localhost:8000/docs

![Bedrock 访问网关 Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## 步骤 3: 在 Open-WebUI 中添加连接

现在 BAG 已经运行起来，可以将其作为 Open-WebUI 中的新连接添加。

- 在管理面板中，进入设置 -> 连接。
- 使用 "+"（加号）按钮在 OpenAI 下添加一个新连接
- URL 请使用 "http://host.docker.internal:8000/api/v1"
- 密码，BAG 中定义的默认密码是 "bedrock"。您可以随时在 BAG 设置中更改此密码（参见 DEFAULT_API_KEYS）
- 点击 "验证连接" 按钮，您会看到右上角显示 "已验证服务器连接" 的警告

![添加新连接](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## 步骤 4：开始使用Bedrock基础模型

现在你应该可以看到所有的Bedrock模型都可以使用了！

![使用Bedrock模型](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## 其他有用的教程

以下是一些在使用Open-WebUI集成Amazon Bedrock时非常有帮助的教程。

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
