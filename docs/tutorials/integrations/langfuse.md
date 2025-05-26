---
sidebar_position: 20
title: "💥 使用 Langfuse 进行监控和调试"
---

# Langfuse 与 Open WebUI 的集成

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) 为 Open WebUI 提供开源的可观测性和评估功能。启用 Langfuse 集成后，您可以通过 Langfuse 跟踪您的应用程序数据，以开发、监控和改进 Open WebUI 的使用，包括：

- 应用程序的 [追踪记录](https://langfuse.com/docs/tracing)
- 使用模式
- 按用户和模型的成本数据
- 重放会话以调试问题
- [评估](https://langfuse.com/docs/scores/overview)

## 如何将 Langfuse 集成到 Open WebUI

![Langfuse 集成](https://langfuse.com/images/docs/openwebui-integration.gif)
_Langfuse 集成步骤_

[Pipelines](https://github.com/open-webui/pipelines/) 是 Open WebUI 中一个与界面无关的框架，用于 OpenAI API 插件。它支持注入拦截、处理和转发用户提示到最终 LLM 的插件，从而增强提示处理的控制和定制化。

要使用 Langfuse 跟踪您的应用程序数据，可以使用 [Langfuse 管道](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py)，实现消息交互的实时监控和分析。

## 快速入门指南

### 第一步：设置 Open WebUI

确保 Open WebUI 正在运行。有关设置的详细信息，请参阅 [Open WebUI 文档](https://docs.openwebui.com/)。

### 第二步：设置 Pipelines

通过 Docker 启动 [Pipelines](https://github.com/open-webui/pipelines/)。使用以下命令启动 Pipelines：

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### 第三步：将 Open WebUI 连接到 Pipelines

在 _管理员设置_ 中，创建并保存一个类型为 OpenAI API 的新连接，具体信息如下：

- **URL：** `http://host.docker.internal:9099`（这是之前启动的 Docker 容器运行的地方）。
- **密码：** 0p3n-w3bu!（标准密码）。

![Open WebUI 设置](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### 第四步：添加 Langfuse 过滤器管道

接下来，导航到 _管理员设置_ -> _Pipelines_ 并添加 Langfuse 过滤器管道。指定 Pipelines 监听的地址为 `http://host.docker.internal:9099`（如前面配置），并通过 _从 GitHub URL 安装_ 选项使用以下 URL 安装 [Langfuse 过滤器管道](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py)：

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

现在，在下面添加您的 Langfuse API 密钥。如果您尚未注册 Langfuse，可以通过 [此处](https://cloud.langfuse.com) 创建一个帐户获取您的 API 密钥。

![Open WebUI 添加 Langfuse Pipeline](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**注意：** 如果启用了流式传输并想捕获 OpenAI 模型的使用情况（令牌计数），您需要导航到 Open WebUI 中的模型设置，并在 _功能_ 下选中“Usage”[选框](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586)。_

### 第五步：在 Langfuse 中查看您的追踪记录

现在您可以与 Open WebUI 应用程序交互，并在 Langfuse 中查看相关的追踪记录。

[示例追踪记录](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) 在 Langfuse 界面中显示如下：

![Open WebUI 示例追踪记录](https://langfuse.com/images/docs/openwebui-example-trace.png)

## 了解更多

有关 Open WebUI Pipelines 的完整指南，请访问 [这篇文章](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/)。
