---
sidebar_position: 10
title: "✂️ 減少記憶體使用"
---

# 減少記憶體使用

如果您在記憶體有限的環境中部署此映像檔，可以採取一些措施來精簡映像。

在使用 v0.3.10 版本的 Raspberry Pi 4 (arm64) 上，這能將閒置記憶體使用量從超過 1GB 減少到約 200MB（使用 `docker container stats` 觀察）。

## 簡述

設置以下環境變數（或對於現有部署設置相應的 UI 設定）：`RAG_EMBEDDING_ENGINE: ollama`，`AUDIO_STT_ENGINE: openai`。

## 詳細說明

大部分的記憶體使用來自已載入的機器學習模型。即使您使用的是外部語言模型（OpenAI 或獨立的 Ollama），許多模型可能也會因其他目的而被載入。

截至 v0.3.10，這包括：

* 語音轉文字（預設為 Whisper）
* RAG 嵌入引擎（預設為本地 SentenceTransformers 模型）
* 圖像生成引擎（預設禁用）

前兩個預設是啟用並使用本地模型。您可以在管理面板中更改模型（RAG：Documents 分類，設置為 Ollama 或 OpenAI；語音轉文字：Audio 部分，使用 OpenAI 或 WebAPI）。
如果您是部署一個新的 Docker 映像檔，也可以使用以下環境變數設置：`RAG_EMBEDDING_ENGINE: ollama`，`AUDIO_STT_ENGINE: openai`。請注意，如果已經存在 `config.json`，這些環境變數將不起作用。
