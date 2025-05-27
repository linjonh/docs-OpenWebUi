---
sidebar_position: 10
title: "✂️ 降低内存使用"
---

# 降低内存使用

如果您在一个内存有限的环境中部署此镜像，可以采取一些措施来缩减镜像的大小。

在一台运行v0.3.10版本的树莓派4（arm64）上，空闲内存消耗能够从超过1GB减少到约200MB（通过`docker container stats`观察）。

## 简要说明

将以下环境变量设置为：`RAG_EMBEDDING_ENGINE: ollama`，`AUDIO_STT_ENGINE: openai`（或在现有部署的相应UI设置中调整）。

## 详细解释

大量的内存消耗是由于加载的机器学习模型所致。即使您使用外部语言模型（OpenAI或未捆绑的ollama），许多模型可能会为其他用途而被加载。

截至v0.3.10，包括以下内容：

* 语音转文字（默认情况下启用whisper）
* RAG嵌入引擎（默认使用本地的SentenceTransformers模型）
* 图像生成引擎（默认情况下禁用）

前两个默认启用并设置为本地模型。您可以在管理面板中更改模型（RAG：文档类别，设置为Ollama或OpenAI；语音转文字：音频部分，可与OpenAI或WebAPI配合使用）。
如果您部署的是一个全新的Docker镜像，也可以通过以下环境变量设置：`RAG_EMBEDDING_ENGINE: ollama`，`AUDIO_STT_ENGINE: openai`。请注意，如果已经存在一个`config.json`文件，这些环境变量不会生效。
