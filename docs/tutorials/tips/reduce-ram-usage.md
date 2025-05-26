---
sidebar_position: 10
title: "✂️ 减少内存使用"
---

# 减少内存使用

如果您在内存受限的环境中部署此镜像，有一些方法可以瘦身镜像。

在树莓派4（arm64）上使用 v0.3.10 版本时，可以将空闲内存消耗从 >1GB 减少到 ~200MB（通过 `docker container stats` 观察）。

## 简要说明

设置以下环境变量（或针对现有部署的对应界面设置）：`RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`。

## 详细说明

大量内存消耗是由加载的机器学习模型引起的。即使您使用外部语言模型（OpenAI 或未绑定的 Ollama），仍可能有许多模型被加载用于其他用途。

截至 v0.3.10，包括：

* 语音转文本（默认使用 Whisper）
* RAG 嵌入引擎（默认使用本地 SentenceTransformers 模型）
* 图像生成引擎（默认禁用）

前两个默认启用并设置为本地模型。您可以在管理面板中更改模型（RAG：文档类别，设置为 Ollama 或 OpenAI；语音转文本：音频部分，选择 OpenAI 或 WebAPI）。
如果您正在部署一个新的 Docker 镜像，也可以通过以下环境变量来设置它们：`RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`。请注意，如果 `config.json` 已存在，这些环境变量将不起作用。
