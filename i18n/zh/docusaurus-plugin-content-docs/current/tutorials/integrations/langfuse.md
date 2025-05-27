---
sidebar_position: 20
title: "💥 使用 Langfuse 进行监控与调试"
---

# Langfuse 与 Open WebUI 的集成

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) 提供开源的可观测性和评估功能，用于 Open WebUI。通过启用 Langfuse 集成，您可以使用 Langfuse 跟踪您的应用程序数据，以开发、监控和改进 Open WebUI 的使用，包括：

- 应用程序 [追踪](https://langfuse.com/docs/tracing)
- 使用模式
- 按用户和模型划分的成本数据
- 重播会话以排除故障
- [评估](https://langfuse.com/docs/scores/overview)

## 如何与 Open WebUI 集成 Langfuse

![Langfuse 集成](https://langfuse.com/images/docs/openwebui-integration.gif)
_Langfuse 集成步骤_

[Pipelines](https://github.com/open-webui/pipelines/) 是 Open WebUI 中一个与 UI 无关的框架，用于 OpenAI API 插件。它支持插件的注入，可拦截、处理并将用户提示转发至最终的 LLM，允许更高级的提示处理控制和自定义。

要使用 Langfuse 跟踪您的应用程序数据，可以使用 [Langfuse pipeline](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py)，它支持消息交互的实时监控和分析。

## 快速入门指南

### 步骤 1: 设置 Open WebUI

确保 Open WebUI 已在运行。如需设置，请参考 [Open WebUI 文档](https://docs.openwebui.com/)。

### 步骤 2: 设置 Pipelines

通过 Docker 启动 [Pipelines](https://github.com/open-webui/pipelines/)。使用以下命令启动 Pipelines：

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### 步骤 3: 连接 Open WebUI 和 Pipelines

在 _Admin Settings_ 中，创建并保存一个新的 OpenAI API 类型连接，填写以下信息：

- **URL:**`http://host.docker.internal:9099`（这是之前启动的 Docker 容器运行地址）。
- **密码:** 0p3n-w3bu!（标准密码）

![Open WebUI 设置](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### 步骤 4: 添加 Langfuse 过滤器 Pipeline

接下来，导航到 _Admin Settings_ -> _Pipelines_ 并添加 Langfuse 过滤器 Pipeline。指定 Pipelines 监听的地址为`http://host.docker.internal:9099`（如前文所配置），并通过 _Install from Github URL_ 选项安装 [Langfuse Filter Pipeline](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py)，使用以下 URL：

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

然后，在下方添加您的 Langfuse API 密钥。如果您尚未注册 Langfuse，可以通过创建账户 [在这里获取API密钥](https://cloud.langfuse.com)。

![Open WebUI 添加 Langfuse Pipeline](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**注意:** 在启用了流模式时，为了捕获使用情况（例如令牌计数），您需要导航到 Open WebUI 的模型设置并检查 _Capabilities_ 下的"使用情况" [框](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586)。_

### 步骤 5: 在 Langfuse 查看您的追踪数据

您现在可以与您的 Open WebUI 应用程序交互，并在 Langfuse 中查看追踪数据。

[Langfuse UI 中的示例追踪](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28)：

![Open WebUI 示范追踪在 Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## 了解更多

有关 Open WebUI Pipelines 的完整指南，请访问 [本文](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/)。
