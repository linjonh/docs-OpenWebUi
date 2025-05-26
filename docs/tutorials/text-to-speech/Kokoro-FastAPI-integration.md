---
sidebar_position: 2
title: "🗨️ 使用 Docker 的 Kokoro-FastAPI"
---

:::warning
本教程是社区贡献内容，并未得到 Open WebUI 团队的支持。它仅作为如何根据你的具体用例自定义 Open WebUI 的演示。如果想贡献，请查看贡献教程。
:::

## 什么是 `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 是一个 Docker 化的 FastAPI 封装，它实现了 OpenAI API 端点规范，用于 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文本到语音模型。它提供高性能的文本到语音转换，具有令人印象深刻的生成速度。

## 主要特点

- 兼容 OpenAI 的语音端点，支持内联语音组合
- NVIDIA GPU 加速或基于 CPU 的 Onnx 推理
- 支持流媒体，具有可变分块功能
- 支持多种音频格式（`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`）
- 集成的 Web 界面，可在 localhost:8880/web 访问（或通过仓库中额外的容器访问 gradio）
- 支持转换和生成的音素端点

## 语音

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

## 语言

- en_us
- en_uk

## 系统需求

- 在系统上安装 Docker
- 运行 Open WebUI
- GPU 支持：具有 CUDA 12.3 的 NVIDIA GPU
- 仅使用 CPU：无特殊要求

## ⚡️ 快速开始

### 你可以选择 GPU 或 CPU 版本

### GPU 版本（需要具有 CUDA 12.8 的 NVIDIA GPU）

使用 docker run:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

或者使用 docker compose，通过创建一个 `docker-compose.yml` 文件并运行 `docker compose up`。例如：

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
你可能需要安装和配置 [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### CPU 版本（ONNX 优化推理）

使用 docker run:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

使用 docker compose:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## 设置 Open WebUI 使用 `Kokoro-FastAPI`

要让 Open WebUI 使用 Kokoro-FastAPI，请按照以下步骤操作：

- 打开管理面板，进入 `Settings` -> `Audio`
- 将文字到语音设置配置为如下内容：
- - 文本到语音引擎：OpenAI
  - API 基础 URL：`http://localhost:8880/v1` # 你可能需要使用 `host.docker.internal` 替代 `localhost`
  - API 密钥：`not-needed`
  - 文本到语音模型：`kokoro`
  - 文本到语音语音：`af_bella` # 也接受现有 OAI 语音的映射以实现兼容性

:::info
默认的 API 密钥是字符串 `not-needed`。如果不需要额外的安全性，你不必更改该值。
:::

## 构建 Docker 容器

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # 或 docker/gpu
docker compose up --build
```

**就是这样！**

有关构建 Docker 容器的更多信息，包括更改端口，请参阅 [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 仓库
