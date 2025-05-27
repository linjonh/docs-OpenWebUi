---
sidebar_position: 2
title: "環境変数"
---


# 環境変数一覧


:::info
すべてのOpen WebUI環境変数の完全なリストについては、[環境変数の設定](/getting-started/env-configuration)ページを参照してください。
:::

以下は、音声からテキスト変換（STT）に関する環境変数の概要です。

# 音声からテキスト変換（STT）のための環境変数

| 変数 | 説明 |
|----------|-------------|
| `WHISPER_MODEL` | ローカルの音声からテキスト変換で使用するWhisperモデルを設定します |
| `WHISPER_MODEL_DIR` | Whisperモデルファイルを保存するディレクトリを指定します |
| `WHISPER_LANGUAGE` | Whisperに使用する音声からテキスト変換の言語をISO 639-1（ハワイ語と広東語の場合はISO 639-2）形式で指定します（設定されない場合は言語が予測されます） |
| `AUDIO_STT_ENGINE` | 使用する音声からテキスト変換エンジンを指定します（ローカルWhisperの場合は空、または`openai`） |
| `AUDIO_STT_MODEL` | OpenAI互換エンドポイント用の音声からテキスト変換モデルを指定します |
| `AUDIO_STT_OPENAI_API_BASE_URL` | 音声からテキスト変換用のOpenAI互換ベースURLを設定します |
| `AUDIO_STT_OPENAI_API_KEY` | 音声からテキスト変換用のOpenAI APIキーを設定します |