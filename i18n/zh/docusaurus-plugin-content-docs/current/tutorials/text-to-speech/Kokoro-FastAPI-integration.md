---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI 使用 Docker"
---

:::warning
本教程由社区贡献，不受 Open WebUI 团队支持。它仅用于演示如何根据您的特定用例自定义 Open WebUI。想要贡献吗？查看贡献教程。
:::

## 什么是 `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 是一个由 FastAPI 实现的 Docker 封装器，适用于 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文字转语音模型，并实现了 OpenAI API 端点规范。它提供了高性能的文字转语音功能，生成速度令人印象深刻。

## 关键功能

- 兼容 OpenAI 的语音端点，支持内联语音组合
- 支持 NVIDIA GPU 加速或 CPU Onnx 推理
- 支持流式传输与可变分块
- 支持多种音频格式（`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`）
- 集成的 Web 界面，可在 localhost:8880/web 访问（或者在仓库中的额外容器用于 gradio）
- 提供音素端点用于转换和生成

## 声音选项

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

## 语言选项

- en_us
- en_uk

## 系统要求

- 在您的系统上安装 Docker
- 运行中的 Open WebUI
- 对于 GPU 支持：NVIDIA GPU，支持 CUDA 12.3
- 对于仅使用 CPU：无特殊要求

## ⚡️ 快速入门

### 您可以选择 GPU 或 CPU 版本

### GPU 版本（需要支持 CUDA 12.8 的 NVIDIA GPU）

使用 docker run：

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

或者使用 docker compose，创建一个 `docker-compose.yml` 文件并运行 `docker compose up`。示例：

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
您可能需要安装和配置 [NVIDIA 容器工具包](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### CPU 版本（经过 ONNX 优化的推理）

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

## 设置 Open WebUI 使用 `Kokoro-FastAPI`

要在 Open WebUI 中使用 Kokoro-FastAPI，请按以下步骤操作：

- 打开管理员面板并进入 `设置` -> `音频`
- 设置您的 TTS 设置使其匹配如下：
- - 文字转语音引擎：OpenAI
  - API 基础 URL：`http://localhost:8880/v1` # 您可能需要使用 `host.docker.internal` 替代 `localhost`
  - API 密钥：`not-needed`
  - TTS 模型：`kokoro`
  - TTS 声音：`af_bella` # 也接受映射现有的 OAI 声音以增强兼容性

:::info
默认的 API 密钥是字符串 `not-needed`。如果您不需要额外的安全性，则无需更改该值。
:::

## 构建 Docker 容器

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # 或者 docker/gpu
docker compose up --build
```

**就是这样！**

有关构建 Docker 容器的更多信息，包括更改端口的内容，请参阅 [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 仓库
