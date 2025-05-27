---
sidebar_position: 10
title: "✂️ RAM使用量を削減"
---

# RAM使用量を削減

RAMが限られる環境でこのイメージを展開する場合、イメージをスリム化するためにいくつかの手法があります。

Raspberry Pi 4 (arm64)でバージョンv0.3.10を使用した場合、アイドル時のメモリ消費を>1GBから約200MBに削減することができました（`docker container stats`で観測）。

## TLDR

以下の環境変数を設定してください（または既存デプロイメントの対応するUI設定を変更）：`RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`。

## 詳細な説明

メモリ消費の大部分は、読み込まれているMLモデルに起因しています。外部の言語モデル（OpenAIまたは非バンドル型のollama）を使用している場合でも、多くのモデルが追加用途のために読み込まれる可能性があります。

v0.3.10では以下が含まれます：

* 音声からテキストへの変換（デフォルトではwhisper）
* RAG埋め込みエンジン（デフォルトではローカルSentenceTransformersモデル）
* 画像生成エンジン（デフォルトでは無効）

最初の2つはデフォルトで有効化されており、ローカルモデルに設定されています。これらのモデルは管理パネルで変更できます（RAG：DocumentsカテゴリでOllamaまたはOpenAIに設定、音声からテキストへの変換：AudioセクションでOpenAIまたはWebAPIと連携）。
新しいDockerイメージを展開する場合、以下の環境変数で設定することも可能です：`RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`。ただし、既に`config.json`が存在する場合にはこれらの環境変数は効果を持ちません。
