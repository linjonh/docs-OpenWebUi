---
sidebar_position: 1
title: "🗨️ 使用 Docker 的 Edge TTS"
---

:::warning
本教程是社区贡献的内容，并未得到 Open WebUI 团队的支持。它仅作为如何为特定使用场景自定义 Open WebUI 的示范。如果您想贡献，请查阅贡献教程。
:::

# 与 Open WebUI 集成 `openai-edge-tts` 🗣️

## 什么是 `openai-edge-tts`? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 是一个模仿 OpenAI API 端点的文本转语音 API，允许在您可以定义端点 URL 的场景中直接替换，例如在 Open WebUI 中。

它使用 [edge-tts](https://github.com/rany2/edge-tts) 包，该包利用 Edge 浏览器的免费“朗读”功能，模拟向 Microsoft / Azure 发出请求以免费获取高质量的文本转语音服务。

[在此试听声音示例](https://tts.travisvn.com)

<details>
  <summary>与 'openedai-speech' 有何不同？</summary>

与 [openedai-speech](https://github.com/matatonic/openedai-speech) 类似， [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) 是一个模仿 OpenAI API 端点的文本转语音 API 端点，允许在可以调用 OpenAI Speech 端点并可配置服务器 URL 的场景中直接替换。

`openedai-speech` 是一个更全面的选项，允许完全离线生成语音，并提供多种模式供选择。

`openai-edge-tts` 是一个更简单的选项，它使用称为 `edge-tts` 的 Python 包来生成音频。

</details>

## 需求

- 在您的系统上安装 Docker
- 正在运行 Open WebUI

## ⚡️ 快速开始

如果不想进行任何配置，最简单的开始方法是运行以下命令

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

这将在端口 5050 上以所有默认配置运行服务

## 设置 Open WebUI 使用 `openai-edge-tts`

- 打开管理面板并进入 `Settings` -> `Audio`
- 将 TTS 设置调整为以下截图所示的配置
- _注意：您可以在此指定 TTS 语音_

![为本项目在 Open WebUI 管理设置中添加正确端点的音频设置截图](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
默认的 API 密钥是字符串 `your_api_key_here`。如果您不需要额外的安全性，可以无需更改这个值。
:::

**就是这样！您可以就此结束**

# 如果觉得 [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 有用，请在 GitHub 上 ⭐️ 该项目


<details>
  <summary>使用 Python 启动</summary>
  
### 🐍 使用 Python 启动

如果您更喜欢直接用 Python 运行该项目，请按照以下步骤设置虚拟环境、安装依赖并启动服务器。

#### 1. 克隆仓库

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. 设置虚拟环境

创建并激活一个虚拟环境以隔离依赖项：

```bash
# 针对 macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 针对 Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. 安装依赖

使用 `pip` 安装 `requirements.txt` 中列出的必要包：

```bash
pip install -r requirements.txt
```

#### 4. 配置环境变量

在根目录创建一个 `.env` 文件并设置以下变量：

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

#### 5. 启动服务器

配置完成后，使用以下命令启动服务器：

```bash
python app/server.py
```

服务器将开始运行在 `http://localhost:5050`。

#### 6. 测试 API

现在您可以在 `http://localhost:5050/v1/audio/speech` 和其他可用端点上与 API 交互。有关请求示例，请参阅使用说明部分。

</details>

<details>
  <summary>使用详情</summary>
  
##### 端点：`/v1/audio/speech`（别名：`/audio/speech`）

根据输入文本生成音频。可用参数如下：

**必需参数：**

- **input**（字符串）：要转换为音频的文本（最长 4096 个字符）。

**可选参数：**

- **model**（字符串）：设置为 "tts-1" 或 "tts-1-hd"（默认：`"tts-1"`）。
- **voice**（字符串）：OpenAI 兼容的声音之一（alloy, echo, fable, onyx, nova, shimmer）或任何有效的 `edge-tts` 声音（默认：`"en-US-AvaNeural"`）。
- **response_format**（字符串）：音频格式。选项有：`mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`（默认：`mp3`）。
- **speed**（数字）：播放速度（0.25 到 4.0）。默认值为 `1.0`。

:::tip
您可以在 [tts.travisvn.com](https://tts.travisvn.com) 浏览可用声音并试听示例。
:::

使用 `curl` 并将输出保存为 mp3 文件的示例请求：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d &apos;{
    "input": "你好，我是你的AI助手！告诉我，我可以如何帮助实现你的想法。",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  }&apos; \
  --output speech.mp3
```

或者，为了符合OpenAI API端点参数：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d &apos;{
    "model": "tts-1",
    "input": "你好，我是你的AI助手！告诉我，我可以如何帮助实现你的想法。",
    "voice": "alloy"
  }&apos; \
  --output speech.mp3
```

以下是使用非英语语言的示例：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d &apos;{
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  }&apos; \
  --output speech.mp3
```

##### 额外端点

- **POST/GET /v1/models**: 列出可用的TTS模型。
- **POST/GET /v1/voices**: 列出指定语言/区域的`edge-tts`语音。
- **POST/GET /v1/voices/all**: 列出所有`edge-tts`语音，包含语言支持信息。

:::info
现在`/v1`是可选的。

另外，还有**Azure AI Speech**和**ElevenLabs**的端点，未来若允许为这些选项自定义API端点，可能会支持这些功能。

通过设置环境变量`EXPAND_API=False`，可以禁用这些功能。
:::

</details>

## 🐳 Docker快速配置

您可以在运行项目的命令中配置环境变量

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
Markdown文本已通过筛选，以增强可读性和支持。

您可以通过设置环境变量`REMOVE_FILTER=True`来禁用此功能。
:::

## 其他资源

有关`openai-edge-tts`的更多信息，可以访问[GitHub仓库](https://github.com/travisvn/openai-edge-tts)

如需直接支持，可以访问[Voice AI & TTS Discord](https://tts.travisvn.com/discord)

## 🎙️ 语音样例

[播放语音样例并查看所有可用的Edge TTS语音](https://tts.travisvn.com/)
