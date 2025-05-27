---
sidebar_position: 2
title: "環境變數"
---


# 環境變數清單


:::info
完整的 Open WebUI 環境變數清單請參考 [環境變數配置](/getting-started/env-configuration) 頁面。
:::

以下是語音轉文字 (STT) 的環境變數摘要。

# 語音轉文字 (STT) 的環境變數

| 變數 | 描述 |
|----------|-------------|
| `WHISPER_MODEL` | 設置用於本地語音轉文字的 Whisper 模型 |
| `WHISPER_MODEL_DIR` | 指定存儲 Whisper 模型文件的目錄 |
| `WHISPER_LANGUAGE` | 指定 Whisper 使用的 ISO 639-1 語言（夏威夷語和廣東話使用 ISO 639-2，語言會預測除非設定） |
| `AUDIO_STT_ENGINE` | 指定使用的語音轉文字引擎（留空代表本地 Whisper，或使用 `openai`） |
| `AUDIO_STT_MODEL` | 指定適配 OpenAI 的語音轉文字模型 |
| `AUDIO_STT_OPENAI_API_BASE_URL` | 設置用於語音轉文字的 OpenAI 基本 URL |
| `AUDIO_STT_OPENAI_API_KEY` | 設置語音轉文字的 OpenAI API 密鑰 |