---
sidebar_position: 1
title: "🚰 过滤器"
---

# 过滤器

过滤器用于对用户的输入消息以及助手（LLM）的输出消息执行操作。过滤器可以采取的潜在操作包括发送消息到监控平台（如 Langfuse 或 DataDog）、修改消息内容、拦截不当消息、将消息翻译成其他语言或对某些用户的消息实施速率限制。在 [Pipelines 仓库](https://github.com/open-webui/pipelines/tree/main/examples/filters) 中维护了一份示例列表。过滤器可以作为函数运行，也可以在 Pipelines 服务器上执行。总体工作流程如下图所示。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="过滤器工作流程" />
  </a>
</p>

当模型或管道上启用过滤器管道时，来自用户的输入消息（或“入口”）会传递到过滤器进行处理。过滤器对消息执行所需的操作后，再向 LLM 模型请求聊天完成。最后，过滤器对 LLM 的输出消息（或“出口”）进行后处理，然后将其发送给用户。
