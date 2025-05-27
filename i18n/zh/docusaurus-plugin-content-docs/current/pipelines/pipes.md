---
sidebar_position: 2
title: "🔧 管道"
---

# 管道
管道是可以在将LLM消息返回给用户之前执行操作的函数。使用管道可以执行的操作示例包括检索增强生成（RAG）、向非OpenAI的LLM提供商（如Anthropic、Azure OpenAI或Google）发送请求，或直接在您的Web UI中执行函数。管道可以作为函数托管或在管道服务器上托管。示例列表维护在[Pipelines仓库](https://github.com/open-webui/pipelines/tree/main/examples/pipelines)中。一般的工作流程可以在下图中看到。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="管道工作流程" />
  </a>
</p>

在WebUI中定义的管道会作为一个新的模型显示，并附有一个"External"（外部）标记。下图是两个管道模型`数据库RAG管道`和`DOOM`的示例，它们显示在两个自托管模型旁边：

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="WebUI中的管道模型" />
  </a>
</p>
