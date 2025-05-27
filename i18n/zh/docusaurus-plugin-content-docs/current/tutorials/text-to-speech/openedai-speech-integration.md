---
sidebar_position: 2
title: "🗨️ 使用Docker运行Openedai-speech"
---

:::warning
本教程由社区贡献，未得到Open WebUI团队的支持。仅作为如何根据您的具体使用场景自定义Open WebUI的示范。想要贡献？查看贡献教程。
:::

**将`openedai-speech`集成到Open WebUI中并使用Docker运行**
==============================================================

**什么是`openedai-speech`？**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) 是一个与OpenAI音频/语音API兼容的文本转换语音服务服务器。

服务于`/v1/audio/speech`端点，提供免费、私密的文本转换语音体验，同时支持定制的声音克隆功能。此服务与OpenAI没有任何关联，也不需要OpenAI API密钥。
:::

**需求**
-----------------

* 您的系统已安装Docker
* Open WebUI正在一个Docker容器中运行
* 对Docker和Docker Compose有基本了解

**选项1：使用Docker Compose**
----------------------------------

**步骤1：为`openedai-speech`服务创建一个新文件夹**
-----------------------------------------------------------------

创建一个新文件夹，例如`openedai-speech-service`，用于存储`docker-compose.yml`和`speech.env`文件。

**步骤2：从GitHub克隆`openedai-speech`仓库**
--------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

此操作将下载`openedai-speech`仓库到本地，包括Docker Compose文件（`docker-compose.yml`、`docker-compose.min.yml`、`docker-compose.rocm.yml`）以及其他必要文件。

**步骤3：将`sample.env`文件重命名为`speech.env`（根据需要自定义）**
------------------------------------------------------------------------------

在`openedai-speech`仓库文件夹中创建一个名为`speech.env`的新文件，内容如下：

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**步骤4：选择一个Docker Compose文件**
----------------------------------------

您可以选择以下任意一个Docker Compose文件：

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml)：该文件使用`ghcr.io/matatonic/openedai-speech`镜像，并基于[Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)构建。
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml)：该文件使用`ghcr.io/matatonic/openedai-speech-min`镜像，并基于[Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min)构建。这个镜像是一个精简版本，仅支持Piper，不需要GPU。
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml)：该文件使用`ghcr.io/matatonic/openedai-speech-rocm`镜像，并基于[Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)构建，支持ROCm。

**步骤4：构建选择的Docker镜像**
-----------------------------------------

在运行Docker Compose文件之前，需构建Docker镜像：

* **Nvidia GPU（支持CUDA）**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU（支持ROCm）**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **仅使用CPU，无需GPU（仅支持Piper）**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**步骤5：运行正确的`docker compose up -d`命令**
----------------------------------------------------------

* **Nvidia GPU（支持CUDA）**: 使用以下命令以分离模式启动`openedai-speech`服务：

```bash
docker compose up -d
```

* **AMD GPU（支持ROCm）**: 使用以下命令以分离模式启动`openedai-speech`服务：

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64（Apple M系列，树莓派）**: XTTS在仅有CPU支持的情况下会非常慢。您可以使用Nvidia镜像搭配CPU性能（缓慢），或使用仅支持Piper的镜像（推荐）：

```bash
docker compose -f docker-compose.min.yml up -d
```

* **仅使用CPU，无需GPU（仅支持Piper）**: 使用精简的Docker镜像，仅支持Piper（< 1GB，对比8GB）：

```bash
docker compose -f docker-compose.min.yml up -d
```

此命令将在分离模式下启动`openedai-speech`服务。

**选项2：使用Docker Run命令**
---------------------------------------


您也可以使用以下 Docker 运行命令以分离模式启动 `openedai-speech` 服务：

* **Nvidia GPU (CUDA)**: 运行以下命令构建并启动 `openedai-speech` 服务：

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: 运行以下命令构建并启动 `openedai-speech` 服务：

> 要启用 ROCm 支持，请取消注释 `speech.env` 文件中的 `#USE_ROCM=1` 行。

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **仅CPU，无GPU（仅支持Piper）**: 运行以下命令构建并启动 `openedai-speech` 服务：

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**步骤6：配置 Open WebUI 使用 `openedai-speech` 进行文本到语音转换（TTS）**
-------------------------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

打开 Open WebUI 设置并导航到 **Admin Panel > Settings > Audio** 下的文本到语音（TTS）设置。添加以下配置：

* **API 基础 URL**: `http://host.docker.internal:8000/v1`
* **API 密钥**: `sk-111111111`（请注意，这是一个占位 API 密钥，因为 `openedai-speech` 不需要 API 密钥。您可以在此字段中填写任意内容，只要它被填写即可。）

**步骤7：选择一个语音**
-----------------------

在管理员面板的音频设置菜单中的 `TTS Voice` 下，您可以从以下 `openedai-speech` 支持的选项中选择要使用的 `TTS Model`。这些模型的语音用于优化英语语言：

* `tts-1` 或 `tts-1-hd`: `alloy`、`echo`、`echo-alt`、`fable`、`onyx`、`nova` 和 `shimmer`（`tts-1-hd`是可配置的；默认使用 OpenAI 样本）

**步骤8：按下 `保存` 按钮以应用更改并开始享受自然的语音效果**
----------------------------------------------------------------------------

按下 `保存` 按钮以应用更改到您的 Open WebUI 设置。刷新页面以使更改完全生效，并享受使用 `openedai-speech` 集成，通过文本到语音自然地朗读文本响应。

**模型详情:**
------------

`openedai-speech` 支持多种文本到语音模型，每种模型都有其自身的优势和要求。以下是可用的模型：

* **Piper TTS**（非常快，运行于CPU）: 通过 `voice_to_speaker.yaml` 配置文件使用您自己的 [Piper 声音](https://rhasspy.github.io/piper-samples/)。此模型非常适合需要低延迟和高性能的应用场景。Piper TTS 还支持 [多语言](https://github.com/matatonic/openedai-speech#multilingual) 声音。
* **Coqui AI/TTS XTTS v2**（速度快，但需要约4GB GPU显存及支持CUDA的Nvidia GPU）：此模型使用 Coqui AI 的 XTTS v2 语音克隆技术生成高质量语音。虽然它需要更强大的 GPU，但它提供了出色的性能和高质量音频。Coqui 还支持 [多语言](https://github.com/matatonic/openedai-speech#multilingual) 声音。
* **Beta Parler-TTS 支持**（实验性，较慢）: 此模型使用 Parler-TTS 框架生成语音。虽然目前处于测试阶段，但它允许您描述说话者语音的基本特征。生成的语音将会有所变化，但应该与提供的说话者描述相似。可以参考 [Text Description to Speech](https://www.text-description-to-speech.com/) 来获得如何描述语音的灵感。

**故障诊断**
------------

如果您在将 `openedai-speech` 集成到 Open WebUI 时遇到问题，请按照以下故障排除步骤操作：

* **验证 `openedai-speech` 服务**：确保 `openedai-speech` 服务正在运行，并且您在 docker-compose.yml 文件中指定的端口已被暴露。
* **检查是否可以访问 host.docker.internal**: 验证 `host.docker.internal` 主机名能否从 Open WebUI 容器内解析。这是必要的，因为 `openedai-speech` 是通过您的PC上的`localhost`暴露的，但 `open-webui` 通常无法从其容器内部访问它。您可以在 docker-compose.yml 文件中添加一个卷，将主机上的文件挂载到容器，例如挂载到 `openedai-speech` 将提供服务的目录。
* **检查API密钥配置**：确保API密钥设置为一个占位值或有效地保持未检查状态，因为`openedai-speech`并不需要API密钥。
* **检查语音配置**：验证你想用作TTS的语音是否存在于你的`voice_to_speaker.yaml`文件中，并且对应的文件（如语音XML文件）是否存在于正确的目录。
* **验证语音模型路径**：如果在加载语音模型时遇到问题，请仔细检查你的`voice_to_speaker.yaml`文件中的路径是否与语音模型的实际位置匹配。

**其他故障排除提示**
------------------------------------

* 检查`openedai-speech`日志中的错误或警告，这可能表明问题所在。
* 验证`docker-compose.yml`文件是否为你的环境正确配置。
* 如果仍然出现问题，尝试重新启动`openedai-speech`服务或整个Docker环境。
* 如果问题依然存在，请参考`openedai-speech`的GitHub仓库或在相关的社区论坛寻求帮助。

**常见问题解答**
-------

**如何控制生成音频的情感范围？**

没有直接的机制来控制生成音频的情感输出。某些因素如大写或语法可能会影响输出音频，但内部测试得出的结果不一。

**语音文件存储在哪里？配置文件又存储在哪里？**

定义可用语音及其属性的配置文件存储在配置卷中。具体来说，默认语音定义在`voice_to_speaker.default.yaml`中。

**其他资源**
------------------------

有关配置Open WebUI以使用`openedai-speech`的更多信息，包括设置环境变量，请参阅[Open WebUI文档](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech)。

有关`openedai-speech`的更多信息，请访问[GitHub仓库](https://github.com/matatonic/openedai-speech)。

**如何向`openedai-speech`中添加更多语音：**
[自定义语音教程](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::提示
你可以将`docker-compose.yml`文件中的端口号更改为任何开放且可用的端口，但确保在Open WebUI的管理员音频设置中相应更新**API基础URL**。
:::
