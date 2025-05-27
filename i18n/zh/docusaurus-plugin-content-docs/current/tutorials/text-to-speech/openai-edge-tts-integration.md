---
sidebar_position: 1
title: "🗨️ 使用 Docker 集成 Edge TTS"
---

:::warning
本教程由社区贡献，不受 Open WebUI 团队支持。该教程仅用于演示如何针对您的具体使用场景自定义 Open WebUI。想贡献？请查看贡献教程。
:::

# 将`openai-edge-tts` 🗣️ 集成到 Open WebUI

## 什么是 `openai-edge-tts`?

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 是一个模仿 OpenAI API 端点的文本转语音 API，允许在您可以定义端点 URL 的场景中直接替代，例如在 Open WebUI 中。

它使用 [edge-tts](https://github.com/rany2/edge-tts) 包，通过 Edge 浏览器的免费“朗读”功能模拟向 Microsoft/Azure 的请求，以免费获得高质量的文本转语音服务。

[在这里试听声音](https://tts.travisvn.com)

<details>
  <summary>它与openedai-speech有什么不同？</summary>

与 [openedai-speech](https://github.com/matatonic/openedai-speech) 类似，[openai-edge-tts](https://github.com/travisvn/openai-edge-tts) 是一个文本转语音 API 端点，模仿 OpenAI 的 API 端点，允许在可以调用 OpenAI Speech 端点并且可以配置服务器 URL 的场景中直接替代。

`openedai-speech` 是一个更全面的选项，可以完全脱机生成语音，并提供多种模式可供选择。

`openai-edge-tts` 是一个更简单的选项，它使用一个名为`edge-tts`的 Python 包来生成音频。

</details>

## 要求

- 您的系统上安装了 Docker
- 正在运行的 Open WebUI

## ⚡️ 快速开始

最简单的启动方式无需任何配置，只需运行以下命令

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

这将使用默认配置在端口 5050 上运行服务

## 设置 Open WebUI 使用 `openai-edge-tts`

- 打开管理面板，进入`设置` -> `音频`
- 设置您的 TTS 设置，使其与下图匹配
- _注意：您可以在此处指定 TTS 声音_

![Open WebUI 管理设置的音频截图，用于添加此项目的正确端点](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
默认的 API 密钥为字符串`your_api_key_here`。如果您不需要额外安全性，则无需更改这个值。
:::

**完成！您可以到此结束。**

# 如果您觉得 [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 有用，请在 GitHub 上 ⭐️ 星标此仓库


<details>
  <summary>使用 Python 运行</summary>
  
### 🐍 使用 Python 运行

如果您更倾向于直接使用 Python 运行此项目，请按照以下步骤设置虚拟环境、安装依赖项并启动服务器。

#### 1. 克隆仓库

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. 设置虚拟环境

创建并激活虚拟环境以隔离依赖项：

```bash
# 对于 macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 对于 Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. 安装依赖

使用`pip`安装`requirements.txt`中列出的必需软件包:

```bash
pip install -r requirements.txt
```

#### 4. 配置环境变量

在根目录创建一个`.env`文件，并设置以下变量：

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. 运行服务器

完成配置后，使用以下命令启动服务器：

```bash
python app/server.py
```

服务器将在`http://localhost:5050`运行。

#### 6. 测试 API

您现在可以通过`http://localhost:5050/v1/audio/speech`以及其他可用端点与 API 交互。请参阅使用部分以获取请求示例。

</details>

<details>
  <summary>使用详情</summary>
  
##### 端点: `/v1/audio/speech` (别名 `/audio/speech`)

根据输入文本生成音频。可用参数：

**必需参数：**

- **input** (字符串): 要转换为音频的文本（最长 4096 字符）。

**可选参数：**

- **model** (字符串): 设置为"tts-1"或"tts-1-hd"（默认值：`"tts-1"`）。
- **voice** (字符串): OpenAI 兼容的声音之一（alloy, echo, fable, onyx, nova, shimmer），或任何有效的`edge-tts`声音（默认值：`"en-US-AvaNeural"`）。
- **response_format** (字符串): 音频格式。选项：`mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`（默认值：`mp3`）。
- **speed** (数字): 播放速度 (0.25 到 4.0)。默认值为 `1.0`。

:::tip
您可以在 [tts.travisvn.com](https://tts.travisvn.com) 浏览可用的声音并试听样本。
:::

使用`curl`发送请求并将输出保存为 mp3 文件的示例请求：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "你好，我是你的人工智能助手！告诉我如何帮助实现你的想法吧。",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

或者，为了与 OpenAI API 端点参数保持一致：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "你好，我是你的人工智能助手！告诉我如何帮助实现你的想法吧。",
    "voice": "alloy"
  } \
  --output speech.mp3
```

以下是非英语语言的一个示例：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### 其他端点

- **POST/GET /v1/models**: 列出可用的 TTS 模型。
- **POST/GET /v1/voices**: 列出指定语言/地区的 `edge-tts` 声音。
- **POST/GET /v1/voices/all**: 列出所有 `edge-tts` 声音，并提供语言支持信息。

:::info
`/v1` 现在是可选的。

另外，如果在 Open WebUI 中允许自定义 API 端点选项，未来可能支持 **Azure AI Speech** 和 **ElevenLabs**。

可以通过设置环境变量 `EXPAND_API=False` 来禁用这些功能。
:::

</details>

## 🐳 Docker 快速配置

你可以在运行项目的命令中配置环境变量

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
现在可以通过过滤器增强阅读性和支持。

你可以通过设置环境变量 `REMOVE_FILTER=True` 来禁用此功能。
:::

## 额外资源

有关 `openai-edge-tts` 的更多信息，可以访问 [GitHub 仓库](https://github.com/travisvn/openai-edge-tts)

如需直接支持，可以访问 [Voice AI & TTS Discord](https://tts.travisvn.com/discord)

## 🎙️ 声音样例

[播放声音样例并查看所有可用的 Edge TTS 声音](https://tts.travisvn.com/)
