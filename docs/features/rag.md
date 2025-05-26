---
sidebar_position: 11
title: "🔎 检索增强生成 (RAG)"
---

:::warning

如果您正在使用 **Ollama**，请注意它的默认上下文长度为**2048个标记**。这意味着检索到的数据可能**完全无法使用**，因为它不符合可用的上下文窗口。为了提高**检索增强生成 (RAG) 的性能**，您应该在 Ollama 模型设置中将上下文长度增加到 **8192+ 个标记**。

:::


检索增强生成 (RAG) 是一种尖端技术，通过结合来自多种来源的上下文来增强聊天机器人的对话能力。它通过从本地和远程文档、网页内容，甚至是像 YouTube 视频这样的多媒体来源中检索相关信息来工作。检索到的文本会与预定义的 RAG 模板结合，并被前置到用户的提示中，从而提供更具信息性和上下文相关的响应。

RAG 的一个主要优势是能够访问和整合来自多种来源的信息，使其成为复杂对话场景的理想解决方案。例如，当用户提出与特定文档或网页内容相关的问题时，RAG 可以从该来源检索相关信息并将其整合到聊天响应中。RAG 还可以从多媒体来源（如 YouTube 视频）中检索和整合信息。通过分析这些视频的转录或字幕，RAG 可以提取出相关信息并将其整合到聊天响应中。




## 本地和远程 RAG 集成

本地文档必须首先通过工作区区域的 Documents 部分上传，以便在查询时通过 `#` 符号访问它们。点击聊天框上方出现的格式化 URL。一旦选择，文档图标将出现在 `发送消息` 上方，表示检索成功。

您还可以通过以 `#` 开头并跟随一个 URL 的方式加载文档到工作区区域。这可以帮助将网页内容直接整合到您的对话中。

## RAG 的网页搜索

对于网页内容的整合，在聊天中以 `#` 开头，后跟目标 URL 发起查询。点击聊天框上方出现的格式化 URL。一旦选择，文档图标将出现在 `发送消息` 上方，表示检索成功。Open WebUI 会从 URL 中抓取并解析信息（如果可能）。

:::tip
网页通常包含诸如导航和页脚等冗余信息。为了获得更好的结果，请链接到页面的原始或易读版本。
:::

## RAG 模板定制

可以通过 `管理面板` > `设置` > `文档` 菜单来自定义 RAG 模板。

## RAG 嵌入支持

可以直接在 `管理面板` > `设置` > `文档` 菜单中更改 RAG 嵌入模型。此功能支持 Ollama 和 OpenAI 模型，使您能够根据需求增强文档处理能力。

## RAG 功能中的引用

RAG 功能允许用户通过添加的引用点轻松跟踪传递给大型语言模型 (LLM) 的文档上下文。这确保了在聊天中使用外部来源的透明性和责任性。

## 增强的 RAG 管道

我们的 RAG 嵌入功能的可切换混合搜索子功能通过 `BM25` 增强 RAG 功能，并由 `CrossEncoder` 提供重新排序功能，同时具有可配置的相关性分数阈值。这为您的特定用例提供了更加精确和定制的 RAG 体验。

## YouTube RAG 管道

专用的 RAG 管道支持通过视频 URL 总结 YouTube 视频，实现与视频转录内容的直接交互。这一创新功能允许您将视频内容整合到对话中，进一步丰富您的聊天体验。

## 文档解析

多种解析器可从本地和远程文档中提取内容。有关更多信息，请参阅 [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328) 函数。

## Google Drive 集成

当与启用了 Google Picker API 和 Google Drive API 的 Google Cloud 项目配对时，此功能允许用户直接从聊天界面访问他们的 Drive 文件，并上传文档、幻灯片、表格等内容作为聊天的上下文。可以通过 `管理面板` > `设置` > `文档` 菜单启用。必须设置 [`GOOGLE_DRIVE_API_KEY 和 GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) 环境变量以使用此功能。

### 详细说明
1. 创建一个 OAuth 2.0 客户端，并将授权的 JavaScript 来源和授权的重定向 URI 配置为您用于访问 Open-WebUI 实例的 URL（包括端口，如果有）。
1. 记录与该OAuth客户端相关的客户端ID。
1. 确保为您的项目同时启用了Google Drive API和Google Picker API。
1. 还需要将您的应用（项目）设置为测试模式，并将您的Google Drive邮箱添加至用户列表。
1. 设置权限范围以包含这些API提供的所有功能。由于应用处于测试模式，Google不需要验证即可允许应用访问有限测试用户的数据。
1. 转到Google Picker API页面，然后点击创建凭据按钮。
1. 创建API密钥，并在“应用限制”下选择“网站”。然后添加您的 Open-WebUI 实例的 URL，与步骤1中的授权JavaScript来源和授权重定向URI设置相同。
1. 在API密钥上设置API限制，仅允许访问Google Drive API和Google Picker API。
1. 设置环境变量`GOOGLE_DRIVE_CLIENT_ID`为步骤2中的OAuth客户端的客户端ID。
1. 设置环境变量`GOOGLE_DRIVE_API_KEY`为步骤7中设置的API密钥值（不是步骤2中的OAuth客户端密钥）。
1. 将`GOOGLE_REDIRECT_URI`设置为我的Open-WebUI实例的URL（如有端口，请包含端口）。
1. 然后用这三个环境变量重新启动您的Open-WebUI实例。
1. 之后，请确保已在`Admin Panel` < `Settings` < `Documents` < `Google Drive`下启用Google Drive。
