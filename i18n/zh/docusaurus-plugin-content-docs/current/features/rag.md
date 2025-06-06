---
sidebar_position: 11
title: "🔎 检索增强生成 (RAG)"
---

:::warning

如果您正在使用 **Ollama**，请注意其默认的上下文长度为 **2048 个 token**。这意味着检索到的数据可能 **完全无法使用**，因为它无法适应当前可用的上下文窗口。为提高**检索增强生成 (RAG)** 的性能，您应在 Ollama 模型设置中将上下文长度**增加到 8192+ 个 token**。

:::


检索增强生成 (RAG) 是一种前沿技术，通过结合各种来源的上下文，增强聊天机器人的对话能力。它通过从本地和远程文档、网页内容，甚至是多媒体来源（如 YouTube 视频）中检索相关信息来工作。检索到的文本会与预定义的 RAG 模板结合，并添加到用户的提示前，以提供更有信息量和上下文相关的回答。

RAG 的一个主要优势是其能够从多种来源访问并整合信息，使其成为复杂对话场景的理想解决方案。例如，当用户询问与特定文档或网页相关的问题时，RAG 可以从该来源检索并整合相关信息到聊天回复中。RAG 甚至还能够从多媒体来源（如 YouTube 视频）中检索和整合信息。通过分析这些视频的字幕或文字记录，RAG 可以提取相关信息并将其整合到聊天回复中。




## 本地和远程 RAG 集成

本地文档必须先通过工作区区域的文档部分上传，才能使用 `#` 符号在查询前访问它们。点击聊天框上方显示的格式化 URL。一旦选择了文档，一个文档图标会出现 `发送消息` 上方，表示检索成功。

您还可以通过在提示中以 `#` 开头，后接 URL 来加载文档到工作区区域。这可以帮助将网页内容直接融入到您的对话中。

## RAG 的网页搜索

对于网页内容集成，在聊天中以 `#` 开头发起查询，然后输入目标 URL。点击聊天框上方显示的格式化 URL。一旦选择了 URL，一个文档图标会出现在 `发送消息` 上方，表示检索成功。如果可以，Open WebUI 会从 URL 中提取并解析信息。

:::tip
网页通常包含多余的信息，例如导航栏和页脚。为获得更好的结果，请链接到页面的原始内容或阅读模式友好版本。
:::

## RAG 模板定制

通过 `管理面板` > `设置` > `文档` 菜单定制 RAG 模板。

## RAG 嵌入支持

通过 `管理面板` > `设置` > `文档` 菜单直接更改 RAG 嵌入模型。此功能支持 Ollama 和 OpenAI 模型，允许您根据需求增强文档处理能力。

## RAG 功能中的引用

RAG 功能允许用户轻松追踪提供给 LLM 的文档上下文，并添加引用以标记参考点。这保证了在聊天中使用外部资源的透明性和责任性。

## 增强 RAG 管道

我们的 RAG 嵌入特性中可切换的混合搜索子功能通过 `BM25` 提升 RAG 的功能，并通过 `CrossEncoder` 进行重新排序，支持可配置的相关性分数阈值。这为您的特定使用场景提供了更精确和定制化的 RAG 体验。

## YouTube RAG 管道

专为通过视频 URL 摘要处理 YouTube 视频设计的 RAG 管道，支持直接与视频转录内容交互。这一创新功能允许您将视频内容整合到聊天中，进一步丰富了对话体验。

## 文档解析

多种解析器可用于从本地和远程文档中提取内容。更多信息，请参见 [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328) 函数。

## Google Drive 集成

当与启用了 Google Picker API 和 Google Drive API 的 Google 云项目配对时，该功能允许用户直接从聊天界面访问其 Drive 文件，上传文档、幻灯片、表格等，并将其作为上下文添加到您的聊天中。可通过 `管理面板` > `设置` > `文档` 菜单启用。必须设置 [`GOOGLE_DRIVE_API_KEY 和 GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) 环境变量才能使用。

### 详细说明
1. 创建一个 OAuth 2.0 客户端，并将授权的 JavaScript 来源和授权的重定向 URI 配置为您访问 Open-WebUI 实例时使用的 URL（包括端口号，如果有的话）。
1. 记录与该OAuth客户端关联的客户端ID。
1. 确保为您的项目启用了Google Drive API和Google Picker API。
1. 还需将您的应用程序（项目）设置为测试模式，并将您的Google Drive电子邮件添加到用户列表中。
1. 设置权限范围以包含这些API提供的所有功能。由于应用处于测试模式，无需Google验证即可允许应用访问有限测试用户的数据。
1. 转到Google Picker API页面，点击创建凭据按钮。
1. 创建一个API密钥，并在应用程序限制下选择网站，然后添加您的Open-WebUI实例的URL，与步骤1中的“已授权的JavaScript来源”和“已授权的重定向URI”设置相同。
1. 对API密钥设置API限制，仅允许访问Google Drive API和Google Picker API。
1. 设置环境变量`GOOGLE_DRIVE_CLIENT_ID`为步骤2中OAuth客户端的客户端ID。
1. 设置环境变量`GOOGLE_DRIVE_API_KEY`为步骤7中设置的API密钥值（不是步骤2中的OAuth客户端密钥）。
1. 将`GOOGLE_REDIRECT_URI`设置为我的Open-WebUI实例的URL（包括端口，如果有的话）。
1. 然后使用这三个环境变量重新启动您的Open-WebUI实例。
1. 之后，确保在`管理面板` < `设置` < `文档` < `Google Drive`中启用了Google Drive。
