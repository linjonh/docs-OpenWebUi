---
sidebar_position: 2
title: "🗨️ 使用 Docker 的 Openedai-speech"
---

:::warning
本教程为社区贡献内容，不由 Open WebUI 团队支持。仅供展示如何为特定用例定制 Open WebUI。想要贡献？请查看贡献教程。
:::

**将 `openedai-speech` 集成到 Open WebUI（使用 Docker）**
==============================================================

**什么是 `openedai-speech`？**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) 是一个兼容 OpenAI 音频/语音 API 的文字转语音服务器。

它提供 `/v1/audio/speech` 接口，支持免费的私有文字转语音体验并有定制化语音克隆功能。该服务与 OpenAI 无任何关联，也不需要 OpenAI API 密钥。
:::

**要求**
-----------------

* 在系统上安装 Docker
* Open WebUI 在 Docker 容器中运行
* 具备 Docker 和 Docker Compose 的基本知识

**选项 1：使用 Docker Compose**
----------------------------------

**步骤1：为 `openedai-speech` 服务创建一个新文件夹**
-----------------------------------------------------------------

创建一个新文件夹，例如 `openedai-speech-service`，用于存储 `docker-compose.yml` 和 `speech.env` 文件。

**步骤2：从 GitHub 克隆 `openedai-speech` 仓库**
--------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

这将下载 `openedai-speech` 仓库到您的本地机器，其中包括 Docker Compose 文件（`docker-compose.yml`、`docker-compose.min.yml` 和 `docker-compose.rocm.yml`）及其他所需文件。

**步骤3：将 `sample.env` 文件重命名为 `speech.env`（如需可自定义）**
------------------------------------------------------------------------------

在 `openedai-speech` 仓库文件夹中，创建一个名为 `speech.env` 的新文件，其内容如下：

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**步骤4：选择一个 Docker Compose 文件**
----------------------------------------

您可以选择以下任意一个 Docker Compose 文件：

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml)：该文件使用 `ghcr.io/matatonic/openedai-speech` 镜像并通过 [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) 构建。
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml)：该文件使用 `ghcr.io/matatonic/openedai-speech-min` 镜像并通过 [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min) 构建。此镜像为仅支持 Piper 的简化版，不需要 GPU。
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml)：该文件使用 `ghcr.io/matatonic/openedai-speech-rocm` 镜像并通过 [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) 构建，带有 ROCm 支持。

**步骤4：构建所选的 Docker 镜像**
-----------------------------------------

在运行 Docker Compose 文件之前，您需要构建 Docker 镜像：

* **Nvidia GPU（CUDA 支持）**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU（ROCm 支持）**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **仅使用 CPU，无 GPU（仅支持 Piper）**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**步骤5：运行正确的 `docker compose up -d` 命令**
----------------------------------------------------------

* **Nvidia GPU（CUDA 支持）**: 运行以下命令以分离模式启动 `openedai-speech` 服务：

```bash
docker compose up -d
```

* **AMD GPU（ROCm 支持）**: 运行以下命令以分离模式启动 `openedai-speech` 服务：

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64（Apple M 系列，树莓派）**: XTTS 在此处仅有 CPU 支持，并且运行速度会很慢。可以使用 Nvidia 镜像（CPU 运行较慢），或者使用建议的仅支持 Piper 的镜像：

```bash
docker compose -f docker-compose.min.yml up -d
```

* **仅使用 CPU，无 GPU（仅支持 Piper）**: 使用一个包含仅 Piper 支持的最小化镜像（<1GB 而非 8GB）：

```bash
docker compose -f docker-compose.min.yml up -d
```

这将以分离模式启动 `openedai-speech` 服务。

**选项 2：使用 Docker Run 命令**
---------------------------------------

您还可以使用以下 Docker 运行命令以分离模式启动 `openedai-speech` 服务：

* **Nvidia GPU (CUDA)**：运行以下命令以构建并启动 `openedai-speech` 服务：

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**：运行以下命令以构建并启动 `openedai-speech` 服务：

> 要启用 ROCm 支持，请取消注释 `speech.env` 文件中的 `#USE_ROCM=1` 行。

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **仅 CPU，无 GPU（仅限 Piper）**：运行以下命令以构建并启动 `openedai-speech` 服务：

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**步骤6：配置 Open WebUI 使用 `openedai-speech` 进行 TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

打开 Open WebUI 设置并导航到 **管理面板 > 设置 > 音频** 下的 TTS 设置。添加以下配置：

* **API 基础 URL**：`http://host.docker.internal:8000/v1`
* **API 密钥**：`sk-111111111`（请注意，这是一个虚拟的 API 密钥，因为 `openedai-speech` 不需要 API 密钥。您可以在此字段中填写任何值，只要不为空即可。）

**步骤7：选择一个语音**
--------------------------

在相同的管理面板音频设置菜单下的 `TTS 语音` 中，您可以从 `openedai-speech` 支持的以下选项中选择用于 `TTS 模型` 的语音。这些模型的语音针对英语进行了优化。

* `tts-1` 或 `tts-1-hd`：`alloy`，`echo`，`echo-alt`，`fable`，`onyx`，`nova` 和 `shimmer`（`tts-1-hd` 可配置；默认使用 OpenAI 示例）

**步骤8：按下 `保存` 按钮以应用更改并开始享受自然的语音效果**
--------------------------------------------------------------------------------------------

按下 `保存` 按钮以将更改应用到您的 Open WebUI 设置。刷新页面以使更改完全生效，开始通过 Open WebUI 使用 `openedai-speech` 集成，以自然的语音朗读文本响应。

**模型详情：**
------------------

`openedai-speech` 支持多种文本到语音模型，每种模型都有其自身的优势和要求。以下是可用的模型：

* **Piper TTS**（非常快，运行在 CPU 上）：通过 `voice_to_speaker.yaml` 配置文件使用您自己的 [Piper 语音](https://rhasspy.github.io/piper-samples/)。该模型适用于需要低延迟和高性能的应用程序。Piper TTS 还支持 [多语言](https://github.com/matatonic/openedai-speech#multilingual) 语音。
* **Coqui AI/TTS XTTS v2**（快速，但需要约 4GB GPU 显存和支持 CUDA 的 Nvidia GPU）：此模型使用 Coqui AI 的 XTTS v2 语音克隆技术生成高质量语音。虽然它需要更强大的 GPU，但提供了卓越的性能和高质量的音频。Coqui 还支持 [多语言](https://github.com/matatonic/openedai-speech#multilingual) 语音。
* **Beta Parler-TTS 支持**（实验性，速度较慢）：此模型使用 Parler-TTS 框架来生成语音。目前处于测试阶段，您可以描述说话者语音的基本特征。每次生成的确切语音会稍有不同，但应与提供的说话者描述相似。关于如何描述语音的灵感，请参见 [Text Description to Speech](https://www.text-description-to-speech.com/)。

**故障排除**
-------------------

如果您在将 `openedai-speech` 集成到 Open WebUI 中时遇到问题，请按照以下故障排除步骤进行：

* **验证 `openedai-speech` 服务**：确保 `openedai-speech` 服务正在运行，并且您在 docker-compose.yml 文件中指定的端口已被暴露。
* **检查对 host.docker.internal 的访问**：验证主机名 `host.docker.internal` 是否可以从 Open WebUI 容器中解析。这是必要的，因为 `openedai-speech` 通过您的 PC 上的 `localhost` 暴露，但 `open-webui` 在其容器内部通常无法访问它。您可以向 docker-compose.yml 文件中添加一个卷，以将主机上的文件挂载到容器，例如，将文件挂载到由 openedai-speech 提供服务的目录。
* **检查 API 密钥配置**：确保 API 密钥设置为一个占位值或未启用，因为 `openedai-speech` 不需要 API 密钥。
* **检查语音配置**：确认您尝试使用的文本转语音 (TTS) 语音是否存在于您的 `voice_to_speaker.yaml` 文件中，并确保相应的文件（例如语音 XML 文件）位于正确的目录中。
* **验证语音模型路径**：如果您在加载语音模型时遇到问题，请仔细检查 `voice_to_speaker.yaml` 文件中的路径是否与语音模型的实际位置匹配。

**其他故障排除提示**
------------------------------------

* 检查 openedai-speech 日志中的错误或警告，以确定问题所在。
* 验证 `docker-compose.yml` 文件是否已根据您的环境正确配置。
* 如果您仍遇到问题，请尝试重新启动 `openedai-speech` 服务或整个 Docker 环境。
* 如果问题持续存在，请查看 `openedai-speech` 的 GitHub 仓库，或者在相关社区论坛寻求帮助。

**常见问题**
-------

**如何控制生成音频的情感范围？**

生成音频的情感输出没有直接控制机制。某些因素（例如大写或语法）可能会影响输出音频，但内部测试结果喜忧参半。

**语音文件存储在哪里？配置文件又在哪里？**

定义可用语音及其属性的配置文件存储于配置卷中。具体来说，默认语音定义在 voice_to_speaker.default.yaml 文件中。

**附加资源**
------------------------

有关配置 Open WebUI 使用 `openedai-speech` 的更多信息，包括设置环境变量，请参阅 [Open WebUI 文档](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech)。

关于 `openedai-speech` 的更多信息，请访问 [GitHub 仓库](https://github.com/matatonic/openedai-speech)。

**如何向 openedai-speech 添加更多语音：**
[自定义语音指南](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
您可以将 `docker-compose.yml` 文件中的端口号更改为任何开放且可用的端口，但请确保相应地更新 Open WebUI 管理音频设置中的 **API 基础 URL**。
:::
