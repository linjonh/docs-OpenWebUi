---
sidebar_position: 2
title: "环境变量"
---


# 环境变量列表


:::info
关于所有 Open WebUI 环境变量的完整列表，请参阅[环境变量配置](/getting-started/env-configuration)页面。
:::

以下是语音转文字（STT）的环境变量摘要。

# 语音转文字（STT）的环境变量

| 变量 | 描述 |
|----------|-------------|
| `WHISPER_MODEL` | 设置用于本地语音转文字的 Whisper 模型 |
| `WHISPER_MODEL_DIR` | 指定存储 Whisper 模型文件的目录 |
| `WHISPER_LANGUAGE` | 指定用于 Whisper 的语音转文字语言（ISO 639-1 或 ISO 639-2，夏威夷语和粤语使用 ISO 639-2）（默认预测语言，除非设置） |
| `AUDIO_STT_ENGINE` | 指定语音转文字引擎（为空表示使用本地 Whisper 或`openai`） |
| `AUDIO_STT_MODEL` | 指定用于 OpenAI 兼容端点的语音转文字模型 |
| `AUDIO_STT_OPENAI_API_BASE_URL` | 设置语音转文字的 OpenAI 兼容基础 URL |
| `AUDIO_STT_OPENAI_API_KEY` | 设置语音转文字的 OpenAI API 密钥 |