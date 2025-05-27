---
sidebar_position: 1
title: "🚰 过滤器"
---

# 过滤器

过滤器用于对用户输入的消息和助手（LLM）输出的消息执行操作。过滤器中可以采取的潜在操作包括将消息发送到监控平台（如 Langfuse 或 DataDog）、修改消息内容、阻止有害消息、将消息翻译成其他语言或限制某些用户发送的消息频率。在 [Pipelines 仓库](https://github.com/open-webui/pipelines/tree/main/examples/filters)中维护了一个示例列表。过滤器可以作为一个函数执行，也可以在 Pipelines 服务器上运行。总体工作流程可以在下面的图片中看到。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="过滤器工作流程" />
  </a>
</p>

当在模型或管道上启用过滤器管道时，用户的输入消息（或"入口"）会传递到过滤器进行处理。过滤器对消息执行所需的操作，然后请求 LLM 模型生成对话内容。最后，过滤器对 LLM 输出消息（或"出口"）进行后处理，然后将消息发送给用户。
