---
sidebar_position: 2
title: "🔧 管道"
---

# 管道
管道是可以在返回 LLM 消息给用户之前执行操作的功能。使用管道可以执行的潜在操作例子包括检索增强生成（RAG）、向非 OpenAI 的 LLM 提供商（如 Anthropic、Azure OpenAI 或 Google）发送请求，或直接在您的 Web UI 中执行功能。管道可以作为一个功能托管，也可以托管在 Pipelines 服务器上。在 [Pipelines 仓库](https://github.com/open-webui/pipelines/tree/main/examples/pipelines)中维护了一个示例列表。一般工作流程可以在下图中看到。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="管道工作流程" />
  </a>
</p>

在您的 WebUI 中定义的管道会作为一个附有 "External" 标记的新模型出现。下面的例子展示了两个管道模型 `Database RAG Pipeline` 和 `DOOM`，它们出现在两个自托管模型旁边：

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="WebUI 中的管道模型" />
  </a>
</p>
