---
sidebar_position: 5
title: "📜 Open WebUI 日志记录"
---

# 理解 Open WebUI 日志记录 🪵

日志记录对于调试、监控以及理解 Open WebUI 的行为至关重要。本指南解释了日志记录在 **浏览器客户端**（前端）和 **应用服务器/后端** 中的工作方式。

## 🖥️ 浏览器客户端日志记录（前端）

对于前端开发和调试，Open WebUI 使用标准的浏览器控制台日志记录。这意味着您可以直接在网页浏览器内置的开发者工具中查看日志。

**如何访问浏览器日志：**

1. **打开开发者工具：** 在大多数浏览器中，您可以通过以下方式打开开发者工具：
   - **右键单击** Open WebUI 页面上的任意位置，然后选择“Inspect”或“Inspect Element”。
   - 按 **F12**（或在 macOS 上 Cmd+Opt+I）。

2. **导航到“Console”标签：** 在开发者工具面板中，找到并点击“Console”标签。

**浏览器日志的类型：**

Open WebUI 主要使用 [JavaScript 的](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()` 进行客户端日志记录。您将在控制台中看到各种类型的消息，包括：

- **信息性消息：** 一般的应用流程和状态。
- **警告：** 潜在问题或非关键错误。
- **错误：** 可能影响功能的问题。

**与浏览器相关的开发者工具：**

不同的浏览器提供略有不同的开发者工具，但它们都提供控制台来查看 JavaScript 日志。以下是常用浏览器的文档链接：

- **[Blink] Chrome/Chromium（例如 Chrome、Edge）：** [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox：** [Firefox Developer Tools 文档](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari：** [Safari Developer Tools 文档](https://developer.apple.com/safari/tools/)

## ⚙️ 应用服务器/后端日志记录（Python）

Open WebUI 的后端使用 Python 的内置 `logging` 模块来记录服务器端的事件和信息。这些日志对于理解服务器行为、诊断错误以及监控性能至关重要。

**关键概念：**

- **Python `logging` 模块：** Open WebUI 利用标准的 Python `logging` 库。如果您熟悉 Python 的日志记录，这一部分会非常简单。（有关更深入的信息，请参阅 [Python Logging 文档](https://docs.python.org/3/howto/logging.html#logging-levels)）。
- **控制台输出：** 默认情况下，后端日志会发送到控制台（标准输出），使其在您的终端或 Docker 容器日志中可见。
- **日志记录级别：** 日志记录级别控制日志的详细程度。您可以根据这些级别配置 Open WebUI，以显示更详细或更少的信息。

### 🚦 日志记录级别解释

Python 的日志记录使用层次化的级别，根据严重性对日志消息进行分类。以下是各级别的描述，从最严重到最轻：

| 级别         | 数值        | 描述                                                                     | 用例                                                                      |
| ----------- | ----------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `CRITICAL`  | 50          | **严重错误**，可能导致应用终止。                                       | 灾难性故障、数据损坏。                                                   |
| `ERROR`     | 40          | **错误**，表明问题，但应用可能仍能运行。                                | 可恢复的错误、操作失败。                                                 |
| `WARNING`   | 30          | **潜在问题**或需要调查的意外情况。                                      | 弃用警告、资源限制。                                                     |
| `INFO`      | 20          | **一般信息性消息**，关于应用操作的。                                    | 启动消息、关键事件、正常运行流程。                                       |
| `DEBUG`     | 10          | **详细的调试信息**，供开发者使用。                                      | 函数调用、变量值、详细执行步骤。                                         |
| `NOTSET`    | 0           | **所有消息都会被记录。**（如果未设置，通常默认值为 `WARNING`）。        | 捕获绝对所有内容，通常用于非常具体的调试。                               |

**默认级别：** Open WebUI 的默认日志记录级别是 `INFO`。

### 🌍 全局日志记录级别（`GLOBAL_LOG_LEVEL`）

您可以使用 `GLOBAL_LOG_LEVEL` 环境变量更改整个 Open WebUI 后端的**全局**日志记录级别。这是控制整体日志详细程度的最简单方法。

**工作原理：**

设置 `GLOBAL_LOG_LEVEL` 会配置 Python 中的根日志记录器，影响 Open WebUI 的所有日志记录器，并可能影响使用 [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig) 的某些第三方库。 它使用 `logging.basicConfig(force=True)`，这意味着它将覆盖任何现有的根日志记录器配置。

**示例: 设置为 `DEBUG`**

- **Docker 参数：**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`)：**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**影响：** 将 `GLOBAL_LOG_LEVEL` 设置为 `DEBUG` 将生成最详细的日志，包括对开发和排查问题有帮助的详细信息。对于生产环境，`INFO` 或 `WARNING` 可能更为合适以减少日志量。

### ⚙️ 应用/后端特定的日志级别

为了更精细的控制，Open WebUI 提供了环境变量来设置特定后端组件的日志级别。日志记录是一个不断完善的工作，但可以使用这些环境变量对应用程序的不同部分进行某些程度的控制。这些变量允许您微调不同部分的日志记录。

**可用的环境变量：**

| 环境变量            | 组件/模块                                                            | 描述                                                                                                      |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | 音频处理                                                            | 与音频转录（faster-whisper）、文本转语音 (TTS) 和音频处理相关的日志记录。                                  |
| `COMFYUI_LOG_LEVEL`  | ComfyUI 集成                                                        | 与 ComfyUI 集成的交互日志记录（如果您在使用此集成）。                                                    |
| `CONFIG_LOG_LEVEL`   | 配置管理                                                            | 与加载和处理 Open WebUI 配置文件相关的日志记录。                                                          |
| `DB_LOG_LEVEL`       | 数据库操作 (Peewee)                                                | 使用 Peewee ORM（对象关系映射器）进行的数据库交互日志记录。                                               |
| `IMAGES_LOG_LEVEL`   | 图像生成 (AUTOMATIC1111/Stable Diffusion)                          | 与图像生成任务相关的日志记录，特别是在使用 AUTOMATIC1111 的 Stable Diffusion 集成时。                      |
| `MAIN_LOG_LEVEL`     | 主应用程序运行（根日志记录器）                                       | 从主应用程序入口点和根日志记录器的日志记录。                                                              |
| `MODELS_LOG_LEVEL`   | 模型管理                                                            | 与加载、管理和使用语言模型（LLMs），包括身份验证相关的日志记录。                                          |
| `OLLAMA_LOG_LEVEL`   | Ollama 后端集成                                                     | 与 Ollama 后端通信和交互相关的日志记录。                                                                   |
| `OPENAI_LOG_LEVEL`   | OpenAI API 集成                                                     | 与 OpenAI API（例如 GPT 模型）的交互日志记录。                                                             |
| `RAG_LOG_LEVEL`      | 检索增强生成 (RAG)                                                 | 与 RAG 流水线相关的日志记录，包括 Chroma 向量数据库和 Sentence-Transformers。                              |
| `WEBHOOK_LOG_LEVEL`  | 身份验证 Webhook                                                   | 身份验证 Webhook 功能的扩展日志记录。                                                                      |

**如何使用：**

您可以以与 `GLOBAL_LOG_LEVEL` 相同的方式设置这些环境变量（Docker 参数、Docker Compose 的 `environment` 区块）。例如，如果您希望获得更详细的 Ollama 交互日志记录，可以设置：

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**重要说明：** 与 `GLOBAL_LOG_LEVEL` 不同，这些特定于应用程序的变量可能不会影响 *所有* 第三方模块的日志记录。它们主要控制 Open WebUI 代码库内的日志记录。

通过理解和利用这些日志记录机制，您可以有效地监控、调试并深入了解您的 Open WebUI 实例。
