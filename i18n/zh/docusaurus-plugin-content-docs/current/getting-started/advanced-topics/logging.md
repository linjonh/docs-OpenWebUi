---
sidebar_position: 5
title: "📜 Open WebUI 的日志记录"
---

# 理解 Open WebUI 的日志记录 🪵

日志记录对于调试、监控和了解 Open WebUI 的运行方式至关重要。本指南解释了日志记录在 **浏览器客户端**（前端）和 **应用服务器/后端** 中的工作原理。

## 🖥️ 浏览器客户端日志记录（前端）

对于前端开发和调试，Open WebUI 使用标准的浏览器控制台日志。这意味着您可以直接在您的网页浏览器内置的开发者工具中查看日志。

**如何访问浏览器日志：**

1. **打开开发者工具：** 在大多数浏览器中，您可以通过以下方式打开开发者工具：
   - 在 Open WebUI 页面上的任意位置**右键点击**，选择 "Inspect" 或 "Inspect Element"。
   - 按下 **F12**（或在 macOS 上按 Cmd+Opt+I）。

2. **导航到 "Console" 选项卡：** 在开发者工具面板中，找到并点击 "Console" 选项卡。

**浏览器日志类型：**

Open WebUI 主要使用 [JavaScript 的](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()` 来进行客户端日志记录。您将在控制台中看到以下几种类型的消息，包括：

- **信息消息：**  一般的应用流程和状态。
- **警告：** 潜在问题或非关键错误。
- **错误：**  可能影响功能的问题。

**特定浏览器的开发者工具：**

不同浏览器提供了略有不同的开发者工具，但它们都提供了查看 JavaScript 日志的控制台。以下是流行浏览器的文档链接：

- **[Blink] Chrome/Chromium（例如 Chrome, Edge）：** [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox：** [Firefox 开发者工具文档](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari：** [Safari 开发者工具文档](https://developer.apple.com/safari/tools/)

## ⚙️ 应用服务器/后端日志记录（Python）

Open WebUI 的后端使用 Python 的内置 `logging` 模块记录服务器端的事件和信息。这些日志对于理解服务器行为、诊断错误和监控性能至关重要。

**关键概念：**

- **Python 的 `logging` 模块：** Open WebUI 利用标准的 Python `logging` 库。如果您熟悉 Python 日志记录，那么这一节将会很简单。（有关更深入的信息，请参阅 [Python 日志记录文档](https://docs.python.org/3/howto/logging.html#logging-levels)）。
- **控制台输出：** 默认情况下，后端日志会发送到控制台（标准输出），使它们在您的终端或 Docker 容器日志中可见。
- **日志级别：**  日志级别控制日志的详细程度。您可以根据这些级别配置 Open WebUI 以显示更多或更少的详细信息。

### 🚦 日志级别解释

Python 日志记录使用层次化的级别按严重性对日志消息进行分类。以下是各个级别的详细说明，从最严重到最不严重：

| 等级         | 数值         | 描述                                                                     | 用例                                                                        |
| ----------- | ------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `CRITICAL`  | 50            | **严重错误**可能导致应用程序终止。                                        | 灾难性故障、数据损坏。                                                     |
| `ERROR`     | 40            | **错误**表示问题，但应用程序可能仍然可以运行。                           | 可恢复的错误、失败的操作。                                                 |
| `WARNING`   | 30            | **潜在问题**或意外情况，需要进行调查。                                   | 弃用警告、资源限制。                                                       |
| `INFO`      | 20            | **一般信息消息**，关于应用的运行信息。                                   | 启动信息、关键事件、正常运行流程。                                         |
| `DEBUG`     | 10            | **详细的调试信息**，适合开发者。                                         | 函数调用、变量值、详细执行步骤。                                           |
| `NOTSET`    | 0             | **记录所有消息。**（如果未设置，通常默认为 `WARNING`）。                 | 用于捕获绝对所有消息，通常用于特定的调试场景。                             |

**默认级别：** Open WebUI 的默认日志记录级别为 `INFO`。

### 🌍 全局日志级别（`GLOBAL_LOG_LEVEL`）

您可以使用 `GLOBAL_LOG_LEVEL` 环境变量更改整个 Open WebUI 后端的**全局**日志级别。这是控制整体日志详细程度的最简单方法。

**工作原理：**

设置 `GLOBAL_LOG_LEVEL` 会配置 Python 中的根记录器，影响 Open WebUI 中的所有记录器，甚至可能影响某些使用 [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig) 的第三方库。它使用 `logging.basicConfig(force=True)`，这意味着将覆盖任何现有的根记录器配置。

**示例：设置为 `DEBUG`**

- **Docker 参数：**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`)：**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**影响：** 将 `GLOBAL_LOG_LEVEL` 设置为 `DEBUG` 会生成最详细的日志，包括对开发和故障排除有帮助的详细信息。对于生产环境，`INFO` 或 `WARNING` 可能更合适，以减少日志量。

### ⚙️ 应用/后端特定日志级别

为了更精细的控制，Open WebUI 提供了环境变量，可以为特定的后端组件设置日志级别。日志记录功能是一个正在进行的项目，但通过这些环境变量已提供某种程度的控制。这些变量允许您对应用程序的不同部分进行日志记录的微调。

**可用的环境变量：**

| 环境变量         | 组件/模块                                                          | 描述                                                                                                      |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | 音频处理                                                          | 与音频转录（faster-whisper）、文本到语音（TTS）和音频处理相关的日志记录。                                 |
| `COMFYUI_LOG_LEVEL`  | ComfyUI 集成                                                      | 如果您使用此集成，与 ComfyUI 交互相关的日志记录。                                                       |
| `CONFIG_LOG_LEVEL`   | 配置管理                                                          | 与加载和处理 Open WebUI 配置文件相关的日志记录。                                                         |
| `DB_LOG_LEVEL`       | 数据库操作（Peewee）                                              | 使用 Peewee ORM（对象关系映射器）进行数据库交互的日志记录。                                             |
| `IMAGES_LOG_LEVEL`   | 图像生成（AUTOMATIC1111/Stable Diffusion）                       | 图像生成任务的日志记录，特别是在使用 AUTOMATIC1111 Stable Diffusion 集成时。                             |
| `MAIN_LOG_LEVEL`     | 主要应用程序执行（根记录器）                                      | 来自主要应用程序入口点和根记录器的日志记录。                                                              |
| `MODELS_LOG_LEVEL`   | 模型管理                                                          | 与加载、管理和交互语言模型（LLMs，包括认证）相关的日志记录。                                             |
| `OLLAMA_LOG_LEVEL`   | Ollama 后端集成                                                  | 与 Ollama 后端的通信和交互的日志记录。                                                                   |
| `OPENAI_LOG_LEVEL`   | OpenAI API 集成                                                  | 与 OpenAI API 交互的日志记录（例如，用于 GPT 模型）。                                                    |
| `RAG_LOG_LEVEL`      | 检索增强生成（RAG）                                              | RAG 管道的日志记录，包括 Chroma 向量数据库和 Sentence-Transformers。                                     |
| `WEBHOOK_LOG_LEVEL`  | 身份验证 Webhook                                                  | 扩展的用于身份验证 Webhook 功能的日志记录。                                                              |

**如何使用：**

您可以以与 `GLOBAL_LOG_LEVEL` 相同的方式设置这些环境变量（Docker 参数、Docker Compose `environment` 部分）。例如，为了获得与 Ollama 交互的更详细日志记录，您可以设置：

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**重要说明：** 与 `GLOBAL_LOG_LEVEL` 不同，这些特定于应用程序的变量可能不会影响 *所有* 第三方模块的日志记录。它们主要控制 Open WebUI 代码库内的日志记录。

通过了解和使用这些日志记录机制，您可以有效地监控、调试并深入了解您的 Open WebUI 实例。
