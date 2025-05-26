---
sidebar_position: 2
title: "环境变量"
---


# 环境变量列表


:::info
有关所有 Open WebUI 环境变量的完整列表，请参阅[环境变量配置](/getting-started/env-configuration)页面。
:::

以下是语音转文本（STT）环境变量的摘要。

# 语音转文本 (STT) 的环境变量

| 变量 | 描述 |
|----------|-------------|
| `WHISPER_MODEL` | 设置用于本地语音转文本的 Whisper 模型 |
| `WHISPER_MODEL_DIR` | 指定存储 Whisper 模型文件的目录 |
| `WHISPER_LANGUAGE` | 指定 Whisper 用于语音转文本的 ISO 639-1（夏威夷语和粤语使用 ISO 639-2）语言（语言默认预测除非设置） |
| `AUDIO_STT_ENGINE` | 指定要使用的语音转文本引擎（本地 Whisper 留空或设置为 `openai`） |
| `AUDIO_STT_MODEL` | 为兼容 OpenAI 的端点指定语音转文本模型 |
| `AUDIO_STT_OPENAI_API_BASE_URL` | 设置语音转文本的 OpenAI 兼容基本 URL |
| `AUDIO_STT_OPENAI_API_KEY` | 设置语音转文本的 OpenAI API 密钥 |