---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI 使用 Docker"
---

:::warning
本教程為社群貢獻，並未由 Open WebUI 團隊提供支援。它僅作為示範如何針對特定使用案例自訂 Open WebUI。想要貢獻？請查看貢獻指南。
:::

## 什麼是 `Kokoro-FastAPI`？

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 是一個基於 Docker 的 FastAPI 包裝器，用於 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文本轉語音模型，且實現了 OpenAI 的 API 端點規範。它提供高效的文本轉語音功能以及令人印象深刻的生成速度。

## 主要功能

- 支援 OpenAI 兼容的語音端點並提供語音內嵌組合
- 支援 NVIDIA GPU 加速或 CPU Onnx 推理
- 支援流式處理及可變分塊
- 支援多種音頻格式（`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`）
- 在 localhost:8880/web 上整合的網頁介面（倉庫裡另附的容器支援 gradio）
- 支援音素轉換及生成的端點

## 語音選項

- af
- af_bella
- af_irulan
- af_nicole
- af_sarah
- af_sky
- am_adam
- am_michael
- am_gurney
- bf_emma
- bf_isabella
- bm_george
- bm_lewis

## 語言選項

- en_us
- en_uk

## 要求

- 系統上需安裝 Docker
- 開啟 Open WebUI
- GPU 支援：NVIDIA GPU 並搭載 CUDA 12.3
- 僅支援 CPU：無需額外要求

## ⚡️ 快速開始

### 可選擇 GPU 或 CPU版本

### GPU版本（需要 NVIDIA GPU 並搭載 CUDA 12.8）

使用 docker run：

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

或者使用 docker compose，建立名為 `docker-compose.yml` 的檔案並運行 `docker compose up`。例如：

```yaml
name: kokoro
services:
    kokoro-fastapi-gpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-gpu:v0.2.1
        restart: always
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
```

:::info
可能需要安裝並配置 [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### CPU版本（使用 ONNX 優化推理）

使用 docker run：

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

使用 docker compose：

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## 設定 Open WebUI 使用 `Kokoro-FastAPI`

要在 Open WebUI 上使用 Kokoro-FastAPI，請按照以下步驟進行：

- 開啟管理員面板，前往 `Settings` -> `Audio`
- 將 TTS 設定設置為以下內容：
  - 文本轉語音引擎：OpenAI
  - API 基礎 URL：`http://localhost:8880/v1` # 如果 `localhost` 無法使用，可能需要改用 `host.docker.internal`
  - API 密鑰：`not-needed`
  - TTS 模型：`kokoro`
  - TTS 語音：`af_bella` # 也可接受現有 OAI 語音的映射以進行兼容

:::info
預設的 API 密鑰是字串 `not-needed`，如果不需要額外的安全性，您無需更改該值。
:::

## 建立 Docker 容器

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # 或 docker/gpu
docker compose up --build
```

**僅此而已！**

如需有關建立 Docker 容器的更多資訊，包括更改端口，請參考 [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 倉庫
