---
sidebar_position: 4
title: "🌍 环境变量配置"
---


## 概述

Open WebUI 提供了大量环境变量，允许您自定义和配置应用程序的各个方面。本页面是所有可用环境变量的全面参考，提供其类型、默认值和描述。
随着新变量的引入，本页面将被更新以反映不断增加的配置选项。

:::信息

本页面与 Open WebUI 发行版本 [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9) 同步更新，但仍在进行中，未来将包含更准确的描述，列出环境变量的可选项、默认值以及改进描述。

:::

### 关于 `PersistentConfig` 环境变量的重要说明

:::注意

首次启动 Open WebUI 时，所有环境变量被平等对待，可用于配置应用程序。然而，对于被标记为 `PersistentConfig` 的环境变量，其值将被持久化并在内部存储。

在初次启动后，如果您重新启动容器，`PersistentConfig` 环境变量将不再使用外部环境变量值，而是使用内部存储的值。

相比之下，普通环境变量将在每次后续重启时继续更新并应用。

您可以直接通过 Open WebUI 更新 `PersistentConfig` 环境变量的值，这些更改将被存储在内部。这使您能够独立于外部环境变量来管理这些配置设置。

请注意，`PersistentConfig` 环境变量在下面的文档中已清楚标记，以便您了解它们的行为方式。

:::

## 应用/后端

以下环境变量由 `backend/open_webui/config.py` 使用，以提供 Open WebUI 启动配置。请注意，某些变量的默认值可能会因您是直接运行 Open WebUI 还是通过 Docker 运行而有所不同。有关日志环境变量的更多信息，请参阅我们的[日志文档](https://docs.openwebui.com/getting-started/advanced-topics/logging)。

### 通用

#### `WEBUI_URL`

- 类型: `str`
- 默认值: `http://localhost:3000`
- 描述: 指定 Open WebUI 可访问的 URL。目前用于搜索引擎支持。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_SIGNUP`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换用户账户的创建功能。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_LOGIN_FORM`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换电子邮件、密码、登录以及“或”(仅当 `ENABLE_OAUTH_SIGNUP` 设置为 True 时)元素。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::危险

仅在 [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup) 也被使用并设置为 `True` 的情况下将此变量设置为 `False`。未正确设置将导致无法登录。

:::

#### `DEFAULT_LOCALE`

- 类型: `str`
- 默认值: `en`
- 描述: 设置应用程序的默认语言区域。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `DEFAULT_MODELS`

- 类型: `str`
- 默认值: 空字符串 (` ' '`)，即 `None`。
- 描述: 设置默认语言模型。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `DEFAULT_USER_ROLE`

- 类型: `str`
- 可选项:
  - `pending` - 新用户处于待定状态，直到管理员手动激活其账户。
  - `user` - 新用户会自动激活并拥有常规用户权限。
  - `admin` - 新用户会自动激活并拥有管理员权限。
- 默认值: `pending`
- 描述: 设置新用户默认分配的角色。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `PENDING_USER_OVERLAY_TITLE`

- 类型: `str`
- 默认值: 空字符串 (` ' '`)
- 描述: 设置待定用户覆盖的自定义标题。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `PENDING_USER_OVERLAY_CONTENT`

- 类型: `str`
- 默认值: 空字符串 (` ' '`)
- 描述: 设置待定用户覆盖的自定义文本内容。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_CHANNELS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用频道支持。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WEBHOOK_URL`

- 类型: `str`
- 描述: 设置用于与 Discord/Slack/Microsoft Teams 集成的 webhook。
- 持久性：该环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_ADMIN_EXPORT`

- 类型: `bool`
- 默认值: `True`
- 描述: 控制管理员用户是否可以导出数据。

#### `ENABLE_ADMIN_CHAT_ACCESS`

- 类型: `bool`
- 默认值: `True`
- 描述: 使管理员用户可以访问所有聊天。

#### `ENABLE_USER_WEBHOOKS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户的 webhook 功能。
- 持久性：该环境变量是一个 `PersistentConfig` 变量。

#### `RESPONSE_WATERMARK`

- 类型: `str`
- 默认值: 空字符串 ( )
- 描述: 设置自定义文本，当你在聊天中复制消息时会包含该文本。例如 `"此文本是 AI 生成的"` -> 每当复制消息时都会添加 "此文本是 AI 生成的"。
- 持久性：该环境变量是一个 `PersistentConfig` 变量。

#### `THREAD_POOL_SIZE`

- 类型: `int`
- 默认值: `0`
- 描述: 设置 FastAPI/AnyIO 阻塞调用的线程池大小。默认情况下（设置为 0 时），FastAPI/AnyIO 使用 `40` 个线程。在大型实例和许多并发用户情况下，可能需要增加 `THREAD_POOL_SIZE` 来防止阻塞。

#### `SHOW_ADMIN_DETAILS`

- 类型: `bool`
- 默认值: `True`
- 描述: 控制是否在界面中显示管理员用户详细信息。
- 持久性：该环境变量是一个 `PersistentConfig` 变量。

#### `ADMIN_EMAIL`

- 类型: `str`
- 描述: 设置由 `SHOW_ADMIN_DETAILS` 显示的管理员邮箱。
- 持久性：该环境变量是一个 `PersistentConfig` 变量。

#### `ENV`

- 类型: `str`
- 选项:
  - `dev` - 在 `/docs` 上启用 FastAPI API 文档
  - `prod` - 自动配置多个环境变量
- 默认值:
  - **后端默认值**: `dev`
  - **Docker 默认值**: `prod`
- 描述: 环境设置。

#### `ENABLE_PERSISTENT_CONFIG`

- 类型: `bool`
- 默认值: `True`
- 描述: 如果设置为 `False`，所有 `PersistentConfig` 变量将作为常规变量处理。

#### `CUSTOM_NAME`

- 类型: `str`
- 描述: 设置 `WEBUI_NAME`，但轮询 **api.openwebui.com** 获取元数据。

#### `WEBUI_NAME`

- 类型: `str`
- 默认值: `Open WebUI`
- 描述: 设置主要 WebUI 名称。如果被覆盖，则附加 `(Open WebUI)`。

#### `PORT`

- 类型: `int`
- 默认值: `8080`
- 描述: 设置运行 Open WebUI 的端口。

:::info
如果你通过 Python 运行应用程序，并使用 `open-webui serve` 命令，则无法使用 `PORT` 配置设置端口。相反，必须使用命令行参数中的 `--port` 标志直接指定端口。例如:

```bash
open-webui serve --port 9999
```

这将运行 Open WebUI 并使用端口 `9999`。在这种模式下，将忽略 `PORT` 环境变量。
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用后，系统会实时将每块流式聊天数据保存到数据库，以确保最大数据持久性。此功能提供了强大的数据恢复能力，并允许精确的会话跟踪。然而，代价是增加延迟，因为保存到数据库会引入延迟。禁用此功能可以提高性能并减少延迟，但在系统故障或崩溃时可能会导致数据丢失。根据你的应用程序需求和可接受的权衡来使用。

#### `BYPASS_MODEL_ACCESS_CONTROL`

- 类型: `bool`
- 默认值: `False`
- 描述: 绕过模型访问控制。

#### `WEBUI_BUILD_HASH`

- 类型: `str`
- 默认值: `dev-build`
- 描述: 用于标识发布版本构建的 Git SHA。

#### `WEBUI_BANNERS`

- 类型: `list` of `dict`
- 默认值: `[]`
- 描述: 显示给用户的横幅列表。横幅的格式如下:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- 持久性：该环境变量是一个 `PersistentConfig` 变量。

:::info

在 `.env` 文件中设置此环境变量时，请确保通过将整个值用双引号包裹并使用转义引号 (`\"`) 为内部引号转义来进行转义。例如:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"您的消息已被存储。\", \"content\": \"您的消息已被存储，可能会被人工审查。LLMs容易出现幻觉，请检查来源。\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- 类型: `bool`
- 默认值: `False`
- 描述: 使用 NVIDIA CUDA 支持构建 Docker 镜像。启用本地 Whisper 和嵌入的 GPU 加速。

#### `EXTERNAL_PWA_MANIFEST_URL`

- 类型: `str`
- 默认值: 空字符串 ( )，因为默认值是 `None`。
- 描述: 当定义为完全合格的 URL（例如 https://path/to/manifest.webmanifest）时，发送到 /manifest.json 的请求将使用外部 manifest 文件。如果未定义，将使用默认的 manifest.json 文件。

#### `ENABLE_TITLE_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用聊天标题生成。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LICENSE_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定使用的许可证密钥（仅适用于企业用户）。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `SSL_ASSERT_FINGERPRINT`

- 类型: `str`
- 默认值: 空字符串(' '), 因为默认设置为`None`。
- 描述: 指定要使用的SSL指纹断言。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `DEFAULT_PROMPT_SUGGESTIONS`

- 类型: `list` of `dict`
- 默认值: `[]`（表示使用内置的默认提示建议）
- 描述: 提示建议列表。提示建议的格式为:

```json
[{"title": ["标题部分1", "标题部分2"], "content": "提示"}]
```

### AIOHTTP 客户端

#### `AIOHTTP_CLIENT_TIMEOUT`

- 类型: `int`
- 默认值: `300`
- 描述: 指定AIOHTTP客户端的超时时间（以秒为单位）。这会影响到诸如连接到Ollama和OpenAI端点之类的操作。

:::信息

这是客户端在超时之前等待响应的最长时间。
如果设置为空字符串(' '), 超时时间将被设置为`None`，实际上禁用了超时功能，
允许客户端无限期等待。

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- 类型: `int`
- 默认值: `10`
- 描述: 设置获取模型列表的超时时间（以秒为单位）。这在网络延迟需要更长的超时时间以成功检索模型列表的情况下非常有用。

:::注意
默认为10秒，帮助确保在打开Web UI时所有必要的连接可用。此持续时间允许即使在较高网络延迟情况下也能检索模型列表。如果更倾向于更快的超时，可以降低此值，但请注意，这可能会导致由于您的网络状况而导致某些连接被丢弃。
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- 类型: `int`
- 描述: 设置获取模型列表的超时时间（以秒为单位）。这在网络延迟需要更长的超时时间以成功检索模型列表的情况下非常有用。

### 目录

#### `DATA_DIR`

- 类型: `str`
- 默认值: `./data`
- 描述: 指定数据存储的基本目录，包括上传、缓存、向量数据库等。

#### `FONTS_DIR`

- 类型: `str`
- 描述: 指定字体目录。

#### `FRONTEND_BUILD_DIR`

- 类型: `str`
- 默认值: `../build`
- 描述: 指定构建的前端文件的位置。

#### `STATIC_DIR`

- 类型: `str`
- 默认值: `./static`
- 描述: 指定静态文件的目录，例如favicon。

### Ollama

#### `ENABLE_OLLAMA_API`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用使用Ollama API。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` 是已弃用的) {#ollama_base_url}

- 类型: `str`
- 默认值: `http://localhost:11434`
- Docker 默认值:
  - 如果设置`K8S_FLAG`: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - 如果`USE_OLLAMA_DOCKER=True`: `http://localhost:11434`
  - 否则使用 `http://host.docker.internal:11434`
- 描述: 配置Ollama后端 URL。

#### `OLLAMA_BASE_URLS`

- 类型: `str`
- 描述: 配置负载均衡的Ollama后端主机，用`;`分隔。参见
[`OLLAMA_BASE_URL`](#ollama_base_url)。优先于[`OLLAMA_BASE_URL`](#ollama_base_url)。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USE_OLLAMA_DOCKER`

- 类型: `bool`
- 默认值: `False`
- 描述: 构建带有捆绑Ollama实例的Docker镜像。

#### `K8S_FLAG`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果设置，则假定为Helm chart部署并将[`OLLAMA_BASE_URL`](#ollama_base_url) 设置为 `http://ollama-service.open-webui.svc.cluster.local:11434`

### OpenAI

#### `ENABLE_OPENAI_API`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用使用OpenAI API。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OPENAI_API_BASE_URL`

- 类型: `str`
- 默认值: `https://api.openai.com/v1`
- 描述: 配置OpenAI基础API URL。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OPENAI_API_BASE_URLS`

- 类型: `str`
- 描述: 支持平衡的OpenAI基础API URL，用分号分隔。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OPENAI_API_KEY`

- 类型: `str`
- 描述: 设置OpenAI的API密钥。
- 示例: `sk-124781258123`
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OPENAI_API_KEYS`

- 类型: `str`
- 描述: 支持多个 OpenAI API 密钥，使用分号分隔。
- 示例: `sk-124781258123;sk-4389759834759834`
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 任务

#### `TASK_MODEL`

- 类型: `str`
- 描述: 使用 Ollama 模型时用于生成标题和网页搜索查询等任务的默认模型。

- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `TASK_MODEL_EXTERNAL`

- 类型: `str`
- 描述: 使用 OpenAI 兼容的端点时用于生成标题和网页搜索查询等任务的默认模型。

- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 描述: 用于生成聊天标题的提示。
- 默认值: `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
生成一个简洁的 3-5 个单词的标题并附带一个用于总结聊天记录的表情符号。
### 指南:
- 标题应该清晰地代表对话的主要主题或内容。
- 使用有助于理解主题的表情符号，但避免使用引号或特殊格式。
- 标题应使用聊天的主要语言；如果是多语言对话，默认使用英语。
- 优先保证准确性而非过度创造性；保持清晰简单。
### 输出:
JSON 格式: { "title": "your concise title here" }
### 示例:
- { "title": "📉 股票市场趋势" },
- { "title": "🍪 最佳巧克力曲奇配方" },
- { "title": "音乐流媒体的演变" },
- { "title": "远程工作效率提升技巧" },
- { "title": "人工智能在医疗健康中的应用" },
- { "title": "🎮 游戏开发洞察" }
### 聊天记录:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- 类型: `str`
- 描述: 用于调用工具的提示。
- 默认值: `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
可用工具: {{TOOLS}}

你的任务是根据查询选择并返回正确的工具列表，遵循以下指南:

- 仅返回 JSON 对象，不需要任何额外的文字或解释。

- 如果没有工具匹配查询，返回一个空数组:
   {
     "tool_calls": []
   }

- 如果一个或多个工具匹配查询，构建一个 JSON 响应，其中包含一个 "tool_calls" 数组，数组中的对象包括:
   - "name": 工具名称。
   - "parameters": 一个字典，包含所需参数及其对应的值。

JSON 响应的格式严格为:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 代码执行

#### `ENABLE_CODE_EXECUTION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用代码执行。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_ENGINE`

- 类型: `str`
- 默认值: `pyodide`
- 描述: 指定用于代码执行的引擎。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_JUPYTER_URL`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于代码执行的 Jupyter URL。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_JUPYTER_AUTH`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于代码执行的 Jupyter 认证方法。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于代码执行的 Jupyter 认证令牌。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于代码执行的 Jupyter 认证密码。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- 类型: `str`
- 默认值: 空字符串 (' '), 因为默认设置为 `None`。
- 描述: 指定 Jupyter 代码执行的超时时间。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 代码解释器

#### `ENABLE_CODE_INTERPRETER`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用代码解释器。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_ENGINE`

- 类型: `str`
- 默认值: `pyodide`
- 描述: 指定代码解释器引擎。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定代码解释器要使用的提示模板。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_JUPYTER_URL`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认设置为`None`。
- 描述: 指定代码解释器要使用的Jupyter URL。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认设置为`None`。
- 描述: 指定代码解释器要使用的Jupyter认证方法。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认设置为`None`。
- 描述: 指定代码解释器要使用的Jupyter认证令牌。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认设置为`None`。
- 描述: 指定代码解释器要使用的Jupyter认证密码。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认设置为`None`。
- 描述: 指定Jupyter代码解释器的超时时间。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 直接连接（OpenAPI/MCPO 工具服务器）

#### `ENABLE_DIRECT_CONNECTIONS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用直接连接。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 自动补全

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用自动补全生成。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

:::info

启用`ENABLE_AUTOCOMPLETE_GENERATION`时，请确保相应配置`AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`和`AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`。

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- 类型: `int`
- 默认值: `-1`
- 描述: 设置自动补全生成的最大输入长度。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`环境变量的值。

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
你是一个自动补全系统。根据`<type>`中的**补全类型**和所提供的语言来继续`<text>`中的文本。

### **指令**:
1. 分析`<text>`以获取上下文和含义。
2. 使用`<type>`指导你的输出:
   - **General**: 提供自然、简洁的续写。
   - **Search Query**: 补全为一个真实的搜索查询。
3. 从继续`<text>`开始。**不要**重复、改写或作为模型回应。只需补全文本。
4. 确保续写：
   - 自然衔接`<text>`。
   - 避免重复、过度解释或无关的想法。
5. 如果不确定，返回：{ "text": "" }。

### **输出规则**:
- 仅以JSON格式响应: { "text": "<your_completion>" }。

### **示例**:
#### 示例 1:
输入:
<type>General</type>
<text>夕阳西下，天边染上</text>
输出:
{ "text": "绚丽的橙色和粉色。" }

#### 示例 2:
输入:
<type>Search Query</type>
<text>最高评价的餐厅在</text>
输出:
{ "text": "纽约市提供意大利美食。" }

---
### 上下文：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### 输出:
```

- 描述: 设置自动补全生成所用的提示模板。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 评估竞技场模型

#### `ENABLE_EVALUATION_ARENA_MODELS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用评估竞技场模型。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_MESSAGE_RATING`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用消息评级功能。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_COMMUNITY_SHARING`

- 类型: `bool`
- 默认值: `True`
- 描述: 控制用户是否可以看到分享至社区的按钮。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

### 标签生成

#### `ENABLE_TAGS_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用标签生成。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
生成 1-3 个广义标签以分类聊天记录的主要主题，并附加 1-3 个更具体的子主题标签。

### 指南:
- 从高级领域开始（例如科学、技术、哲学、艺术、政治、商业、健康、体育、娱乐、教育）。
- 如果整个对话中强烈体现了相关子领域/子域，请考虑包括这些内容。
- 如果内容太短（少于 3 条消息）或太多样化，仅使用 ["General"]。
- 使用聊天的主要语言；如果为多语言则默认使用英语。
- 优先考虑准确性而非具体性。

### 输出:
JSON 格式: { "tags": ["tag1", "tag2", "tag3"] }

### 聊天记录:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述: 设置用于标签生成的提示模板。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

### API 密钥端点限制

#### `ENABLE_API_KEY`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用 API 密钥认证。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用 API 密钥端点限制以增强安全性和可配置性。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `API_KEY_ALLOWED_ENDPOINTS`

- 类型: `str`
- 描述: 指定在启用 API 密钥端点限制时允许的 API 端点，以逗号分隔。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

:::注意

`API_KEY_ALLOWED_ENDPOINTS` 的值应该是以逗号分隔的端点 URL，例如 `/api/v1/messages, /api/v1/channels`。

:::

#### `JWT_EXPIRES_IN`

- 类型: `int`
- 默认值: `-1`
- 描述: 设置 JWT 过期时间（以秒为单位）。有效时间单位：`s`，`m`，`h`，`d`，`w` 或 `-1` 表示不过期。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

## 安全变量

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- 类型: `bool`
- 默认值: `False`
- 描述: 将用户信息（名称、ID、电子邮件和角色）以 X-Headers 的形式转发到 OpenAI API 和 Ollama API。
如果启用，将转发以下头信息:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 绕过用于网站 RAG 的 SSL 验证。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- 类型: `str`
- 选项:
  - `lax` - 将 `SameSite` 属性设置为 lax，允许会话 cookie 被第三方网站发起的请求发送。
  - `strict` - 将 `SameSite` 属性设置为 strict，阻止会话 cookie 被第三方网站发起的请求发送。
  - `none` - 将 `SameSite` 属性设置为 none，允许会话 cookie 被第三方网站发起的请求发送，但仅在 HTTPS 上。
- 默认值: `lax`
- 描述: 设置会话 cookie 的 `SameSite` 属性。

:::警告

当启用 `ENABLE_OAUTH_SIGNUP` 时，将 `WEBUI_SESSION_COOKIE_SAME_SITE` 设置为 `strict` 可能导致登录失败。这是因为 Open WebUI 使用会话 cookie 验证来自 OAuth 提供商的回调，从而帮助防止 CSRF 攻击。

但是，`strict` 会话 cookie 不会随回调请求一起发送，从而导致可能的登录问题。如果遇到此问题，请使用默认的 `lax` 值代替。

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果设置为 `True`，为会话 cookie 设置 `Secure` 属性。

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- 类型: `str`
- 选项:
  - `lax` - 将 `SameSite` 属性设置为 lax，允许身份验证 cookie 被第三方网站发起的请求发送。
  - `strict` - 将 `SameSite` 属性设置为 strict，阻止身份验证 cookie 被第三方网站发起的请求发送。
  - `none` - 将 `SameSite` 属性设置为 none，允许身份验证 cookie 被第三方网站发起的请求发送，但仅在 HTTPS 上。
- 默认值: `lax`
- 描述: 设置身份验证 cookie 的 `SameSite` 属性。

:::信息

如果未设置该值，将使用 `WEBUI_SESSION_COOKIE_SAME_SITE` 作为回退。

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果设置为 `True`，将为认证cookie设置 `Secure` 属性。

:::信息

如果未设置值，将使用 `WEBUI_SESSION_COOKIE_SECURE` 作为后备。

:::

#### `WEBUI_AUTH`

- 类型: `bool`
- 默认值: `True`
- 描述: 此设置启用或禁用认证功能。

:::危险

如果设置为 `False`，将禁用您的 Open WebUI 实例的认证功能。但是需要注意的是，仅在没有已有用户的情况下才能禁用认证功能。如果已经存在注册用户，则不能直接禁用认证功能。确保数据库中没有用户记录才能关闭 `WEBUI_AUTH`。

:::

#### `WEBUI_SECRET_KEY`

- 类型: `str`
- 默认值: `t0p-s3cr3t`
- Docker 默认值: 第一次启动时随机生成
- 描述: 替代用于JSON Web Token的随机生成字符串。

:::信息

当通过负载均衡器部署在多节点集群中时，必须确保WEBUI_SECRET_KEY在所有实例中设置为相同值，以使用户能够继续工作，即便节点已回收或会话被转移到不同节点。如果未设置，用户需要在每次底层节点更换时重新登录。

:::

#### `OFFLINE_MODE`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用离线模式。

#### `RESET_CONFIG_ON_START`

- 类型: `bool`
- 默认值: `False`
- 描述: 在启动时重置 `config.json` 文件。

#### `SAFE_MODE`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用安全模式，此模式禁止潜在不安全功能并停用所有功能。

#### `CORS_ALLOW_ORIGIN`

- 类型: `str`
- 默认值: `*`
- 描述: 设置跨域资源共享 (CORS) 的允许来源。

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- 类型: `bool`
- 默认值: `False`
- 描述: 确定是否允许在Hub上定义的自定义模型使用其自己的建模文件。

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- 类型: `bool`
- 默认值: `False`
- 描述: 确定是否允许在Hub上定义的自定义模型使用其自己的建模文件进行重新排序。

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换自动更新 Sentence-Transformer 模型。

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换自动更新重新排序模型。

## 向量数据库

#### `VECTOR_DB`

- 类型: `str`
- 选项: `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- 默认值: `chroma`
- 描述: 指定要使用的向量数据库系统。此设置决定使用哪个向量存储系统来管理嵌入。

### ChromaDB

#### `CHROMA_TENANT`

- 类型: `str`
- 默认值: `chromadb.DEFAULT_TENANT` 的值 (`chromadb` 模块中的一个常量)
- 描述: 设置 ChromaDB 用于 RAG 嵌入的租户。

#### `CHROMA_DATABASE`

- 类型: `str`
- 默认值: `chromadb.DEFAULT_DATABASE` 的值 (`chromadb` 模块中的一个常量)
- 描述: 设置 ChromaDB 租户中用于 RAG 嵌入的数据库。

#### `CHROMA_HTTP_HOST`

- 类型: `str`
- 描述: 指定远程 ChromaDB 服务器的主机名。如果未设置，则使用本地 ChromaDB 实例。

#### `CHROMA_HTTP_PORT`

- 类型: `int`
- 默认值: `8000`
- 描述: 指定远程 ChromaDB 服务器的端口号。

#### `CHROMA_HTTP_HEADERS`

- 类型: `str`
- 描述: 以逗号分隔的 HTTP 头列表，随每个 ChromaDB 请求一起发送。
- 示例: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`。

#### `CHROMA_HTTP_SSL`

- 类型: `bool`
- 默认值: `False`
- 描述: 控制是否对 ChromaDB 服务器连接使用 SSL。

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- 类型: `str`
- 描述: 指定远程 ChromaDB 服务器的认证提供者。
- 示例: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- 类型: `str`
- 描述: 指定远程 ChromaDB 服务器的认证凭据。
- 示例: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- 类型: `str`
- 默认值: 空字符串 (' ')，而非 `None`。
- 描述: 指定 Elasticsearch API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_CA_CERTS`

- 类型: `str`
- 默认值: 空字符串 (' ')，而非 `None`。
- 描述: 指定 Elasticsearch 的 CA 证书路径。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_CLOUD_ID`

- 类型: `str`
- 默认值: 空字符串 (' ')，而非 `None`。
- 描述: 指定 Elasticsearch 云 ID。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_INDEX_PREFIX`

- 类型: `str`
- 默认值: `open_webui_collections`
- 描述: 指定 Elasticsearch 索引的前缀。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_PASSWORD`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认值设置为 `None`。
- 描述: 指定 Elasticsearch 的密码。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_URL`

- 类型: `str`
- 默认值: `https://localhost:9200`
- 描述: 指定 Elasticsearch 实例的 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_USERNAME`

- 类型: `str`
- 默认值: 空字符串（ ），因为默认值设置为 `None`。
- 描述: 指定 Elasticsearch 的用户名。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### Milvus

#### `MILVUS_URI`

- 类型: `str`
- 默认值: `${DATA_DIR}/vector_db/milvus.db`
- 描述: 指定连接到 Milvus 矢量数据库的 URI。根据部署配置，该值可以指向本地或远程的 Milvus 服务器。

#### `MILVUS_DB`

- 类型: `str`
- 默认值: `default`
- 描述: 指定连接到 Milvus 实例的数据库。

#### `MILVUS_TOKEN`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 Milvus 的可选连接令牌。

#### `MILVUS_INDEX_TYPE`

- 类型: `str`
- 默认值: `HNSW`
- 选项: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- 描述: 指定在 Milvus 中创建新集合时使用的索引类型。`AUTOINDEX` 通常推荐用于 Milvus 单机版。`HNSW` 可能提供更高性能，但通常需要集群化的 Milvus 设置。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_METRIC_TYPE`

- 类型: `str`
- 默认值: `COSINE`
- 选项: `COSINE`, `IP`, `L2`
- 描述: 指定 Milvus 中矢量相似性搜索的度量类型。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_HNSW_M`

- 类型: `int`
- 默认值: `16`
- 描述: 指定 Milvus 的 HNSW 索引类型中的 `M` 参数。该参数影响在构建过程中为每个新元素创建的双向链接数量。仅在 `MILVUS_INDEX_TYPE` 为 `HNSW` 时适用。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_HNSW_EFCONSTRUCTION`

- 类型: `int`
- 默认值: `100`
- 描述: 指定 Milvus 的 HNSW 索引类型中的 `efConstruction` 参数。该参数影响在索引构建过程中邻近列表的动态大小。仅在 `MILVUS_INDEX_TYPE` 为 `HNSW` 时适用。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_IVF_FLAT_NLIST`

- 类型: `int`
- 默认值: `128`
- 描述: 指定 Milvus 的 IVF_FLAT 索引类型中的 `nlist` 参数。这是集群单元的数量。仅在 `MILVUS_INDEX_TYPE` 为 `IVF_FLAT` 时适用。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用 OpenSearch 证书验证。

#### `OPENSEARCH_PASSWORD`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 OpenSearch 的密码。

#### `OPENSEARCH_SSL`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用 OpenSearch 的 SSL。

#### `OPENSEARCH_URI`

- 类型: `str`
- 默认值: `https://localhost:9200`
- 描述: 设置 OpenSearch 的 URI。

#### `OPENSEARCH_USERNAME`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 OpenSearch 的用户名。

### PGVector

#### `PGVECTOR_DB_URL`

- 类型: `str`
- 默认值: `DATABASE_URL` 环境变量的值
- 描述: 设置用于模型存储的数据库 URL。

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- 类型: `str`
- 默认值: `1536`
- 描述: 指定 PGVector 初始化的最大向量长度。

### Qdrant

#### `QDRANT_API_KEY`

- 类型: `str`
- 描述: 设置 Qdrant 的 API 密钥。

#### `QDRANT_URI`

- 类型: `str`
- 描述: 设置 Qdrant 的 URI。

#### `QDRANT_ON_DISK`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用使用内存映射，也称为磁盘存储。

#### `QDRANT_PREFER_GRPC`

- 类型: `bool`
- 默认值: `False`
- 描述: 尽可能使用 gPRC 接口。

#### `QDRANT_GRPC_PORT`

- 类型: `int`
- 默认值: `6334`
- 描述: 设置 Qdrant 的 gRPC 端口号。

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用 Qdrant 集合管理的多租户模式，这显著减少了 RAM 使用量和计算开销，通过整合相似的矢量数据结构。推荐启用。

:::info

此操作将断开以前非多租户模式下创建的所有 Qdrant 集合。请转到 `管理员设置` > `文档` > `重新索引知识库` 以迁移现有知识。

在先前模式中创建的Qdrant集合仍将消耗资源。

目前，UI中没有仅重置向量数据库的按钮。如果您想将知识迁移到多租户模式：
- 使用原生Qdrant客户端删除所有带有`open_webui-knowledge`前缀的集合（或者使用`open_webui`前缀删除与Open WebUI相关的所有集合）
- 转到`管理设置` > `文档` > `重新索引知识库`以迁移现有知识库

`重新索引知识库`将仅迁移知识库

:::

:::danger

如果您决定将多租户模式用作默认模式，并且不需要迁移旧知识，请转到`管理设置` > `文档`，重置向量和知识，这将删除所有带有`open_webui`前缀的集合以及所有存储的知识。

:::

### Pinecone

使用Pinecone作为向量存储时，以下环境变量用于控制其行为。请确保在您的`.env`文件或部署环境中设置这些变量。

#### `PINECONE_API_KEY`

- 类型: `str`
- 默认值: `无`
- 描述: 设置用于与Pinecone服务进行身份验证的API密钥。

#### `PINECONE_ENVIRONMENT`

- 类型: `str`
- 默认值: `无`
- 描述: 指定要连接的Pinecone环境（例如：`us-west1-gcp`、`gcp-starter`等）。

#### `PINECONE_INDEX_NAME`

- 类型: `str`
- 默认值: `open-webui-index`
- 描述: 定义将用于存储和查询向量嵌入的Pinecone索引名称。

#### `PINECONE_DIMENSION`

- 类型: `int`
- 默认值: `1536`
- 描述: 向量嵌入的维度。必须与索引期望的维度匹配（通常为768、1024、1536或3072，具体取决于使用的模型）。

#### `PINECONE_METRIC`

- 类型: `str`
- 默认值: `cosine`
- 可选值: `cosine`、`dotproduct`、`euclidean`
- 描述: 指定Pinecone索引中用于向量比较的相似性度量方式。

#### `PINECONE_CLOUD`

- 类型: `str`
- 默认值: `aws`
- 可选值: `aws`、`gcp`、`azure`
- 描述: 指定托管Pinecone索引的云提供商。

## RAG内容提取引擎

#### `CONTENT_EXTRACTION_ENGINE`

- 类型: `str`
- 可选值:
  - 留空以使用默认值
  - `external` - 使用外部加载器
  - `tika` - 使用本地Apache Tika服务器
  - `docling` - 使用Docling引擎
  - `document_intelligence` - 使用Document Intelligence引擎
  - `mistral_ocr` - 使用Mistral OCR引擎
- 描述: 设置用于文档引入的内容提取引擎。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `MISTRAL_OCR_API_KEY`

- 类型: `str`
- 默认值: `无`
- 描述: 指定要使用的Mistral OCR API密钥。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- 类型: `str`
- 默认值: `无`
- 描述: 设置外部文档加载器服务的URL。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- 类型: `str`
- 默认值: `无`
- 描述: 设置用于与外部文档加载器服务进行身份验证的API密钥。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `TIKA_SERVER_URL`

- 类型: `str`
- 默认值: `http://localhost:9998`
- 描述: 设置Apache Tika服务器的URL。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `DOCLING_SERVER_URL`

- 类型: `str`
- 默认值: `http://docling:5001`
- 描述: 指定Docling服务器的URL。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `DOCLING_OCR_ENGINE`

- 类型: `str`
- 默认值: `tesseract`
- 描述: 指定Docling使用的OCR引擎。
  支持的值包括：`tesseract`（默认）、`easyocr`、`ocrmac`、`rapidocr`和`tesserocr`。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `DOCLING_OCR_LANG`

- 类型: `str`
- 默认值: `eng,fra,deu,spa`（当使用默认`tesseract`引擎时）
- 描述: 指定配置的`DOCLING_OCR_ENGINE`将使用的OCR语言。
  格式和可用语言代码取决于选择的OCR引擎。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

## 检索增强生成（RAG）

#### `RAG_EMBEDDING_ENGINE`

- 类型: `str`
- 可选值:
  - 留空为`Default (SentenceTransformers)` - 使用SentenceTransformers生成嵌入。
  - `ollama` - 使用Ollama API生成嵌入。
  - `openai` - 使用OpenAI API生成嵌入。
- 描述: 选择用于RAG的嵌入引擎。
- 持久性: 该环境变量是一个`PersistentConfig`变量。

#### `RAG_EMBEDDING_MODEL`

- 类型: `str`
- 默认值: `sentence-transformers/all-MiniLM-L6-v2`
- 描述: 设置嵌入模型。本地使用Sentence-Transformer模型。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_RAG_HYBRID_SEARCH`

- 类型：`bool`
- 默认值：`False`
- 描述：启用使用 `BM25` + `ChromaDB` 的组合搜索，并通过 `sentence_transformers` 模型重新排序。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_TOP_K`

- 类型：`int`
- 默认值：`3`
- 描述：设置使用 RAG 时嵌入所考虑的默认结果数量。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_TOP_K_RERANKER`

- 类型：`int`
- 默认值：`3`
- 描述：设置使用 RAG 时重新排序所考虑的默认结果数量。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_RELEVANCE_THRESHOLD`

- 类型：`float`
- 默认值：`0.0`
- 描述：设置在重新排序时考虑文档的相关性阈值。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_HYBRID_BM25_WEIGHT`

- 类型：`float`
- 默认值：`0.5`
- 描述：设置混合搜索中关键字搜索（BM25）的权重。1 表示仅关键字搜索，0 表示仅向量搜索。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_TEMPLATE`

- 类型：`str`
- 默认值：`DEFAULT_RAG_TEMPLATE` 环境变量的值。

`DEFAULT_RAG_TEMPLATE`：

```
### 任务：
使用提供的上下文回答用户的查询，结合内联引用格式 [id] **仅当 <source> 标签包含明确的 id 属性时** (例如，<source id="1">)。

### 指南:
- 如果不知道答案，请明确说明。
- 如果不确定，请向用户寻求澄清。
- 用与用户查询相同的语言回答。
- 如果上下文无法读取或质量差，告知用户并提供最佳可能的答案。
- 如果答案不在上下文中但您具备相关知识，请向用户解释并提供您的答案。
- **仅当 <source> 标签包含 id 属性时，使用 [id] 的格式 (例如， [1], [2]) 添加内联引用。**
- 如果 <source> 标签没有包含 id 属性，请不要引用。
- 在回复中不要使用 XML 标签。
- 确保引用简明且直接与提供的信息相关。

### 引用示例：
当用户询问某个具体主题并且在带 id 属性的来源中找到信息时，回复应包括以下示例中的引用：
* "根据研究，提出的方法将效率提高了 20% [1]。"

### 输出：
清晰直接地回答用户的查询，仅当上下文中的 <source> 标签具有 id 属性时包含内联引用格式 [id]。

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- 描述：在注入 RAG 文档到对话完成时使用的模板。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_TEXT_SPLITTER`

- 类型：`str`
- 选项：
  - `character`
  - `token`
- 默认值：`character`
- 描述：设置 RAG 模型的文本分割器。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `TIKTOKEN_CACHE_DIR`

- 类型：`str`
- 默认值：`{CACHE_DIR}/tiktoken`
- 描述：设置 TikToken 缓存的目录。

#### `TIKTOKEN_ENCODING_NAME`

- 类型：`str`
- 默认值：`cl100k_base`
- 描述：设置 TikToken 的编码名称。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `CHUNK_SIZE`

- 类型：`int`
- 默认值：`1000`
- 描述：设置用于嵌入的文档块大小。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `CHUNK_OVERLAP`

- 类型：`int`
- 默认值：`100`
- 描述：指定块之间的重叠量。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `PDF_EXTRACT_IMAGES`

- 类型：`bool`
- 默认值：`False`
- 描述：在加载文档时使用 OCR 从 PDF 中提取图像。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_FILE_MAX_SIZE`

- 类型：`int`
- 描述：设置文档摄取中可上传的最大文件大小（以 MB 为单位）。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_FILE_MAX_COUNT`

- 类型：`int`
- 描述：设置同时可上传的最大文件数，用于文档摄取。
- 持久化：此环境变量是一个 `PersistentConfig` 变量。

:::info

在配置 `RAG_FILE_MAX_SIZE` 和 `RAG_FILE_MAX_COUNT` 时，确保参数值合理，以防止上传过多文件并避免可能的性能问题。

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- 类型：`list` 的 `str`
- 默认值：`[]`（表示允许所有支持的文件类型）
- 描述: 指定允许上传的文件扩展名。

```json
["pdf,docx,txt"]
```

- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_RERANKING_MODEL`

- 类型: `str`
- 描述: 设置用于重新排序结果的模型。本地使用 Sentence-Transformer 模型。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_OPENAI_API_BASE_URL`

- 类型: `str`
- 默认值: `${OPENAI_API_BASE_URL}`
- 描述: 设置用于 RAG 嵌入的 OpenAI 基础 API URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_OPENAI_API_KEY`

- 类型: `str`
- 默认值: `${OPENAI_API_KEY}`
- 描述: 设置用于 RAG 嵌入的 OpenAI API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- 类型: `int`
- 默认值: `1`
- 描述: 设置 OpenAI 嵌入的批量大小。

#### `RAG_EMBEDDING_BATCH_SIZE`

- 类型: `int`
- 默认值: `1`
- 描述: 设置 RAG（检索增强生成器）模型中的嵌入批量大小。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_OLLAMA_API_KEY`

- 类型: `str`
- 描述: 设置用于 RAG 模型的 Ollama API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_OLLAMA_BASE_URL`

- 类型: `str`
- 描述: 设置用于 RAG 模型的 Ollama API 基础 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用检索查询生成。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
分析聊天记录以确定是否需要生成搜索查询，以给定的语言进行操作。默认情况下，**优先生成1-3个范围广且相关的搜索查询**，除非可以绝对确定不需要额外的信息。目标是即使存在最小的不确定性也能检索全面、最新且有价值的信息。如果无需搜索，请返回空列表。

### 指南:
- **专门**以 JSON 对象回复。严格禁止任何形式的额外评论、解释或附加文本。
- 生成搜索查询时，以以下格式回复: { "queries": ["query1", "query2"] }，确保每个查询独特、简洁且与主题相关。
- 如果只有在完全确定通过搜索不会检索到任何有用结果时，返回: { "queries": [] }。
- 如果有 **任何可能性** 提供有用或更新的信息，偏向建议搜索查询。
- 精炼并专注于创作高质量搜索查询，避免不必要的详述、评论或假设。
- 今天的日期是: {{CURRENT_DATE}}。
- 始终优先提供可操作且范围广的查询，最大化信息覆盖率。

### 输出:
严格以 JSON 格式返回: 
{
  "queries": ["query1", "query2"]
}

### 聊天记录:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述: 设置查询生成的提示模板。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- 类型: `bool`
- 默认值: `False`
- 描述: 绕过嵌入和检索过程。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- 类型: `str`
- 默认值: `None`
- 描述: 指定文档智能的端点。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `DOCUMENT_INTELLIGENCE_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定文档智能的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用本地网页抓取以用于 RAG。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 RAG 嵌入内容的前缀。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 RAG 嵌入前缀的字段名称。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_EMBEDDING_QUERY_PREFIX`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 RAG 嵌入查询的前缀。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `RAG_FULL_CONTEXT`

- 类型: `bool`
- 默认值: `False`
- 描述: 指定是否使用完整上下文进行RAG。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用Google Drive集成。如果设置为true，并且`GOOGLE_DRIVE_CLIENT_ID`和`GOOGLE_DRIVE_API_KEY`都已配置，则Google Drive将在聊天UI中作为上传选项出现。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

:::信息

启用`GOOGLE_DRIVE_INTEGRATION`时，请确保正确配置了`GOOGLE_DRIVE_CLIENT_ID`和`GOOGLE_DRIVE_API_KEY`，并仔细阅读Google的服务条款和使用指南。

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- 类型: `str`
- 描述: 设置Google Drive的客户端ID（客户端必须配置启用Drive API和Picker API）。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_DRIVE_API_KEY`

- 类型: `str`
- 描述: 设置用于Google Drive集成的API密钥。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用OneDrive集成。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ONEDRIVE_CLIENT_ID`

- 类型: `str`
- 默认值: `None`
- 描述: 指定OneDrive集成的客户端ID。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

## Web Search

#### `ENABLE_WEB_SEARCH`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用Web搜索切换。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_SEARCH_QUERY_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用搜索查询生成。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `WEB_SEARCH_TRUST_ENV`

- 类型: `bool`
- 默认值: `False`
- 描述: 在Web搜索内容抓取期间，启用由`http_proxy`和`https_proxy`设置的代理。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `WEB_SEARCH_RESULT_COUNT`

- 类型: `int`
- 默认值: `3`
- 描述: 爬取的最大搜索结果数量。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- 类型: `int`
- 默认值: `10`
- 描述: 爬取搜索结果返回的网页的并发请求数。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `WEB_SEARCH_ENGINE`

- 类型: `str`
- 可选项:
  - `searxng` - 使用[SearXNG](https://github.com/searxng/searxng)搜索引擎。
  - `google_pse` - 使用[Google可编程搜索引擎](https://programmablesearchengine.google.com/about/)。
  - `brave` - 使用[Brave搜索引擎](https://brave.com/search/api/)。
  - `kagi` - 使用[Kagi](https://www.kagi.com/)搜索引擎。
  - `mojeek` - 使用[Mojeek](https://www.mojeek.com/)搜索引擎。
  - `bocha` - 使用Bocha搜索引擎。
  - `serpstack` - 使用[Serpstack](https://serpstack.com/)搜索引擎。
  - `serper` - 使用[Serper](https://serper.dev/)搜索引擎。
  - `serply` - 使用[Serply](https://serply.io/)搜索引擎。
  - `searchapi` - 使用[SearchAPI](https://www.searchapi.io/)搜索引擎。
  - `serpapi` - 使用[SerpApi](https://serpapi.com/)搜索引擎。
  - `duckduckgo` - 使用[DuckDuckGo](https://duckduckgo.com/)搜索引擎。
  - `tavily` - 使用[Tavily](https://tavily.com/)搜索引擎。
  - `jina` - 使用[Jina](https://jina.ai/)搜索引擎。
  - `bing` - 使用[Bing](https://www.bing.com/)搜索引擎。
  - `exa` - 使用[Exa](https://exa.ai/)搜索引擎。
  - `perplexity` - 使用[Perplexity AI](https://www.perplexity.ai/)搜索引擎。
  - `sougou` - 使用[搜狗](https://www.sogou.com/)搜索引擎。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- 类型: `bool`
- 默认值: `False`
- 描述: 跳过Web搜索嵌入和检索过程。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `SEARXNG_QUERY_URL`

- 类型: `str`
- 描述: 支持JSON输出的[SearXNG搜索API](https://docs.searxng.org/dev/search_api.html)的URL。`<query>`将被搜索查询替换。例如: `http://searxng.local/search?q=<query>`
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_PSE_API_KEY`

- 类型: `str`
- 描述: 设置Google可编程搜索引擎（PSE）服务的API密钥。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_PSE_ENGINE_ID`

- 类型: `str`
- 描述: Google 可编程搜索引擎服务的引擎 ID。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BRAVE_SEARCH_API_KEY`

- 类型: `str`
- 描述: 设置 Brave 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `KAGI_SEARCH_API_KEY`

- 类型: `str`
- 描述: 设置 Kagi 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `MOJEEK_SEARCH_API_KEY`

- 类型: `str`
- 描述: 设置 Mojeek 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPSTACK_API_KEY`

- 类型: `str`
- 描述: 设置 Serpstack 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPSTACK_HTTPS`

- 类型: `bool`
- 默认值: `True`
- 描述: 配置 Serpstack 请求是否使用 HTTPS。免费层级请求仅支持 HTTP。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPER_API_KEY`

- 类型: `str`
- 描述: 设置 Serper 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPLY_API_KEY`

- 类型: `str`
- 描述: 设置 Serply 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SEARCHAPI_API_KEY`

- 类型: `str`
- 描述: 设置 SearchAPI 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SEARCHAPI_ENGINE`

- 类型: `str`
- 描述: 设置 SearchAPI 的引擎。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `TAVILY_API_KEY`

- 类型: `str`
- 描述: 设置 Tavily 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `JINA_API_KEY`

- 类型: `str`
- 描述: 设置 Jina 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BING_SEARCH_V7_ENDPOINT`

- 类型: `str`
- 描述: 设置 Bing 搜索 API 的端点。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- 类型: `str`
- 默认值: `https://api.bing.microsoft.com/v7.0/search`
- 描述: 设置 Bing 搜索 API 的订阅密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BOCHA_SEARCH_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 Bocha 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `EXA_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 Exa 搜索 API 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPAPI_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 SerpAPI 的密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SERPAPI_ENGINE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 SerpAPI 使用的搜索引擎。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SOUGOU_API_SID`

- 类型: `str`
- 默认值: `None`
- 描述: 设置搜狗 API 的 SID。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SOUGOU_API_SK`

- 类型: `str`
- 默认值: `None`
- 描述: 设置搜狗 API 的 SK。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `TAVILY_EXTRACT_DEPTH`

- 类型: `str`
- 默认值: `basic`
- 描述: 指定 Tavily 搜索结果的提取深度。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 网页加载器配置

#### `WEB_LOADER_ENGINE`

- 类型: `str`
- 默认值: `safe_web`
- 描述: 指定用于检索和处理网页内容的加载器。
- 选项:
  - `requests` - 使用 Requests 模块并进行增强的错误处理。
  - `playwright` - 使用 Playwright 实现更高级的网页渲染和交互。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::info

使用 `playwright` 时，您有两种选项:

1. 如果未设置 `PLAYWRIGHT_WS_URI`，在启动 Open WebUI 容器时，将自动安装包含 Chromium 依赖项的 Playwright。
2. 如果设置了 `PLAYWRIGHT_WS_URI`，Open WebUI 将连接到远程浏览器实例，而不是在本地安装依赖项。

:::

#### `PLAYWRIGHT_WS_URL`

- 类型: `str`
- 默认值: `None`
- 描述：指定远程 Playwright 浏览器实例的 WebSocket URI。当设置后，Open WebUI 将使用此远程浏览器，而不是在本地安装浏览器依赖。这在容器化环境中非常有用，可以保持 Open WebUI 容器轻量化并将浏览器的相关问题分开处理。例如：`ws://playwright:3000`
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

:::提示

通过 `PLAYWRIGHT_WS_URL` 使用远程 Playwright 浏览器的优势包括：

- 减小 Open WebUI 容器大小
- 使用默认的 Chromium 以外的其他浏览器
- 连接非无头（带 GUI）的浏览器

:::

#### `FIRECRAWL_API_BASE_URL`

- 类型：`str`
- 默认值：`https://api.firecrawl.dev`
- 描述：设置 Firecrawl API 的基础 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `FIRECRAWL_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：设置 Firecrawl API 的 API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `PERPLEXITY_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：设置 Perplexity API 的 API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `PLAYWRIGHT_TIMEOUT`

- 类型：`int`
- 默认值：空字符串 (`' '`)，因为默认值是 `None`。
- 描述：指定 Playwright 请求的超时时间。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### YouTube 加载器

#### `YOUTUBE_LOADER_PROXY_URL`

- 类型：`str`
- 描述：设置 YouTube 加载器的代理 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `YOUTUBE_LOADER_LANGUAGE`

- 类型：`str`
- 默认值：`en`
- 描述：以逗号分隔的语言代码列表，用于按优先顺序尝试获取 YouTube 视频转录文本。
- 示例：如果设置为 `es,de`，将先尝试西班牙语转录文本，然后是德语（如果西班牙语不可用），最后是英语。注意：如果未指定的语言不可用且 `en` 不在列表中，系统将自动尝试用英语作为最后的备用。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

## 音频

### Whisper 语音转文字（本地）

#### `WHISPER_MODEL`

- 类型：`str`
- 默认值：`base`
- 描述：设置用于语音转文字的 Whisper 模型。后端使用 faster_whisper，量化为 `int8`。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `WHISPER_MODEL_DIR`

- 类型：`str`
- 默认值：`${DATA_DIR}/cache/whisper/models`
- 描述：指定存储 Whisper 模型文件的目录。

#### `WHISPER_VAD_FILTER`

- 类型：`bool`
- 默认值：`False`
- 描述：指定是否对 Whisper 语音转文字应用语音活动检测（VAD）过滤器。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `WHISPER_MODEL_AUTO_UPDATE`

- 类型：`bool`
- 默认值：`False`
- 描述：切换 Whisper 模型的自动更新功能。

#### `WHISPER_LANGUAGE`

- 类型：`str`
- 默认值：`None`
- 描述：指定 Whisper 用于语音转文字的 ISO 639-1 语言（夏威夷语和粤语使用 ISO 639-2）。默认情况下，Whisper 会预测语言。

### 语音转文字（OpenAI）

#### `AUDIO_STT_ENGINE`

- 类型：`str`
- 选项：
  - 留空以使用内置的本地 Whisper 引擎进行语音转文字。
  - `openai` - 使用 OpenAI 引擎进行语音转文字。
  - `deepgram` - 使用 Deepgram 引擎进行语音转文字。
  - `azure` 使用 Azure 引擎进行语音转文字。
- 描述：指定要使用的语音转文字引擎。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_MODEL`

- 类型：`str`
- 默认值：`whisper-1`
- 描述：指定用于 OpenAI 兼容端点的语音转文字模型。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- 类型：`str`
- 默认值：`${OPENAI_API_BASE_URL}`
- 描述：设置语音转文字使用的 OpenAI 兼容基础 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_OPENAI_API_KEY`

- 类型：`str`
- 默认值：`${OPENAI_API_KEY}`
- 描述：设置用于语音转文字的 OpenAI API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### 语音转文字（Azure）

#### `AUDIO_STT_AZURE_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于语音转文字的 Azure API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_AZURE_REGION`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于语音转文字的 Azure 区域。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_AZURE_LOCALES`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于 Azure 语音转文字的语言环境。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### 语音转文字（Deepgram）

#### `DEEPGRAM_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于语音转文字的 Deepgram API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### 文字转语音

#### `AUDIO_TTS_API_KEY`

- 类型：`str`
- 描述：设置文字转语音的API密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_ENGINE`

- 类型：`str`
- 可选项：
  - 留空以使用内置的WebAPI文字转语音引擎。
  - `azure` - 使用Azure文字转语音引擎。
  - `elevenlabs` - 使用ElevenLabs文字转语音引擎。
  - `openai` - 使用OpenAI文字转语音引擎。
  - `transformers` - 使用SentenceTransformers文字转语音。
- 描述：指定使用的文字转语音引擎。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_MODEL`

- 类型：`str`
- 默认值：`tts-1`
- 描述：指定使用的OpenAI文字转语音模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_VOICE`

- 类型：`str`
- 默认值：`alloy`
- 描述：设置使用的OpenAI文字转语音声音。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_SPLIT_ON`

- 类型：`str`
- 默认值：`punctuation`
- 描述：设置OpenAI文字转语音的分割方式。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### Azure文字转语音

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- 类型：`str`
- 描述：设置Azure文字转语音的区域。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- 类型：`str`
- 描述：设置Azure文字转语音的输出格式。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### OpenAI文字转语音

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- 类型：`str`
- 默认值：`${OPENAI_API_BASE_URL}`
- 描述：设置用于文字转语音的OpenAI兼容基本URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_OPENAI_API_KEY`

- 类型：`str`
- 默认值：`${OPENAI_API_KEY}`
- 描述：设置用于文字转语音的API密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

## 图像生成

#### `IMAGE_GENERATION_ENGINE`

- 类型：`str`
- 可选项：
  - `openai` - 使用OpenAI的DALL-E进行图像生成。
  - `comfyui` - 使用ComfyUI引擎生成图像。
  - `automatic1111` - 使用AUTOMATIC1111引擎生成图像。
  - `gemini` - 使用Gemini生成图像。
- 默认值：`openai`
- 描述：指定用于图像生成的引擎。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_IMAGE_GENERATION`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用图像生成功能。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用图像提示生成。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- 类型：`str`
- 默认值：`无`
- 描述：指定用于生成图像提示的模板。
- 持久性：此环境变量是一个`PersistentConfig`变量。

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
根据给定的语言和上下文生成一个详细的图像生成任务提示。形容图像时需像是对一个无法看到图像的人进行解释一样，包含相关细节、颜色、形状及其他重要元素。

### 指导原则:
- 要详细描述，关注图像最重要的方面。
- 避免做出假设或添加图像中不存在的信息。
- 使用聊天的主要语言；如果支持多语言，默认使用英语。
- 如果图像过于复杂，请专注于最突出部分。

### 输出:
严格以JSON格式返回:
{
    "prompt": "在此填写您的详细描述。"
}

### 聊天记录:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- 类型：`str`
- 默认值：`512x512`
- 描述：设置生成图像的默认尺寸。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_STEPS`

- 类型：`int`
- 默认值：`50`
- 描述：设置图像生成的默认迭代步数。用于ComfyUI和AUTOMATIC1111。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_GENERATION_MODEL`

- 类型：`str`
- 描述：用于图像生成的默认模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- 类型：`str`
- 描述：指定AUTOMATIC1111的稳定扩散API的URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUTOMATIC1111_API_AUTH`

- 类型：`str`
- 描述: 设置 AUTOMATIC1111 API 身份验证。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_CFG_SCALE`

- 类型: `float`
- 描述: 设置 AUTOMATIC1111 推理的比例。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_SAMPLER`

- 类型: `str`
- 描述: 设置 AUTOMATIC1111 推理的采样器。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_SCHEDULER`

- 类型: `str`
- 描述: 设置 AUTOMATIC1111 推理的调度器。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### ComfyUI

#### `COMFYUI_BASE_URL`

- 类型: `str`
- 描述: 指定 ComfyUI 图像生成 API 的 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `COMFYUI_API_KEY`

- 类型: `str`
- 描述: 设置 ComfyUI 的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `COMFYUI_WORKFLOW`

- 类型: `str`
- 默认值:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "加载检查点"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "空潜图像"
    }
  },
  "6": {
    "inputs": {
      "text": "提示词",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP 文本编码 (提示词)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP 文本编码 (提示词)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE 解码"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "保存图像"
    }
  }
}
```

- 描述: 设置 ComfyUI 工作流。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### Gemini

#### `GEMINI_API_BASE_URL`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 Gemini API 的 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `GEMINI_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 Gemini API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_GEMINI_API_BASE_URL`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 Gemini 图像生成 API 的 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_GEMINI_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置用于图像生成的 Gemini API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- 类型: `str`
- 默认值: `${OPENAI_API_BASE_URL}`
- 描述: 设置用于 DALL-E 图像生成的 OpenAI 兼容基础 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_OPENAI_API_KEY`

- 类型: `str`
- 默认值: `${OPENAI_API_KEY}`
- 描述: 设置用于 DALL-E 图像生成的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- 类型: `bool`
- 默认值: `False`
- 描述: 允许通过 OAuth 注册时创建账户。与 `ENABLE_SIGNUP` 相区分。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::danger

`ENABLE_LOGIN_FORM` 必须设置为 `False`，当 `ENABLE_OAUTH_SIGNUP` 设置为 `True` 时。如果未按此配置，将无法登录。

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果启用，允许通过相同邮件地址将 OAuth 账户合并到已有账户中。这被认为是不安全的，因为并非所有 OAuth 提供方都会验证邮箱地址，这可能会导致账户被接管。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- 类型: `bool`
- 默认值: `False`
- 描述：如果启用，则在登录时使用 OAuth 提供的图片更新本地用户头像。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- 类型: `str`
- 描述：定义用于身份认证的可信请求头。参阅 [SSO 文档](/features/sso)。

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- 类型: `str`
- 描述：定义用于通过 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 注册的用户名的可信请求头。参阅 [SSO 文档](/features/sso)。

### Google

参阅 https://support.google.com/cloud/answer/6158849?hl=en

#### `GOOGLE_CLIENT_ID`

- 类型: `str`
- 描述：设置 Google OAuth 的客户端 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_CLIENT_SECRET`

- 类型: `str`
- 描述：设置 Google OAuth 的客户端密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_OAUTH_SCOPE`

- 类型: `str`
- 默认值: `openid email profile`
- 描述：设置 Google OAuth 认证的范围。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_REDIRECT_URI`

- 类型: `str`
- 默认值: `<backend>/oauth/google/callback`
- 描述：设置 Google OAuth 的重定向 URI。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### Microsoft

参阅 https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- 类型: `str`
- 描述：设置 Microsoft OAuth 的客户端 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MICROSOFT_CLIENT_SECRET`

- 类型: `str`
- 描述：设置 Microsoft OAuth 的客户端密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MICROSOFT_CLIENT_TENANT_ID`

- 类型: `str`
- 描述：设置 Microsoft OAuth 的租户 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MICROSOFT_OAUTH_SCOPE`

- 类型: `str`
- 默认值: `openid email profile`
- 描述：设置 Microsoft OAuth 认证的范围。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MICROSOFT_REDIRECT_URI`

- 类型: `str`
- 默认值: `<backend>/oauth/microsoft/callback`
- 描述：设置 Microsoft OAuth 的重定向 URI。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### GitHub

参阅 https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- 类型: `str`
- 描述：设置 GitHub OAuth 的客户端 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GITHUB_CLIENT_SECRET`

- 类型: `str`
- 描述：设置 GitHub OAuth 的客户端密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GITHUB_CLIENT_SCOPE`

- 类型: `str`
- 默认值: `user:email`
- 描述：指定 GitHub OAuth 认证的范围。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GITHUB_CLIENT_REDIRECT_URI`

- 类型: `str`
- 默认值: `<backend>/oauth/github/callback`
- 描述：设置 GitHub OAuth 的重定向 URI。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- 类型: `str`
- 描述：设置 OIDC 的客户端 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_CLIENT_SECRET`

- 类型: `str`
- 描述：设置 OIDC 的客户端密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OPENID_PROVIDER_URL`

- 类型: `str`
- 描述：`.well-known/openid-configuration` 端点的路径
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OPENID_REDIRECT_URI`

- 类型: `str`
- 默认值: `<backend>/oauth/oidc/callback`
- 描述：设置 OIDC 的重定向 URI。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_SCOPES`

- 类型: `str`
- 默认值: `openid email profile`
- 描述：设置 OIDC 认证的范围。`openid` 和 `email` 是必需的。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_CODE_CHALLENGE_METHOD`

- 类型: `str`
- 默认值: 空字符串 ( )，因为默认设置为 `None`。
- 描述：指定 OAuth 认证的代码挑战方法。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_PROVIDER_NAME`

- 类型: `str`
- 默认值: `SSO`
- 描述：设置 OIDC 提供商的名称。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_USERNAME_CLAIM`

- 类型: `str`
- 默认值: `name`
- 描述：设置 OpenID 的用户名声明。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_EMAIL_CLAIM`

- 类型: `str`
- 默认值: `email`
- 描述: 为OpenID设置电子邮件声明。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_PICTURE_CLAIM`

- 类型: `str`
- 默认值: `picture`
- 描述: 为OpenID设置图片（头像）声明。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_GROUP_CLAIM`

- 类型: `str`
- 默认值: `groups`
- 描述: 指定用于OAuth认证的组声明。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用OAuth委托的角色管理。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用OAuth组管理。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_ROLES_CLAIM`

- 类型: `str`
- 默认值: `roles`
- 描述: 设置在OIDC令牌中查找的角色声明。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_ALLOWED_ROLES`

- 类型: `str`
- 默认值: `user,admin`
- 描述: 设置允许访问平台的角色。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_ADMIN_ROLES`

- 类型: `str`
- 默认值: `admin`
- 描述: 设置被认为是管理员的角色。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_ALLOWED_DOMAINS`

- 类型: `str`
- 默认值: `*`
- 描述: 指定OAuth认证的允许域名。（例如 "example1.com,example2.com"）。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

## LDAP

#### `ENABLE_LDAP`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用LDAP认证。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SERVER_LABEL`

- 类型: `str`
- 描述: 设置LDAP服务器的标签。
- 持久性: 此环境变量是一个`PersistentConfig`变量。


#### `LDAP_SERVER_HOST`

- 类型: `str`
- 默认值: `localhost`
- 描述: 设置LDAP服务器的主机名。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SERVER_PORT`

- 类型: `int`
- 默认值: `389`
- 描述: 设置LDAP服务器的端口号。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- 类型: `str`
- 描述: 设置LDAP身份验证中使用的邮件属性。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- 类型: `str`
- 描述: 设置LDAP身份验证中使用的用户名属性。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_APP_DN`

- 类型: `str`
- 描述: 设置LDAP应用程序的专用名称。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_APP_PASSWORD`

- 类型: `str`
- 描述: 设置LDAP应用程序的密码。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_BASE`

- 类型: `str`
- 描述: 设置LDAP认证的搜索基点。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_FILTER`

- 类型: `str`
- 默认值: `None`
- 描述: 设置用于LDAP搜索的单一过滤器。是`LDAP_SEARCH_FILTERS`的替代选项。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_FILTERS`

- 类型: `str`
- 描述: 设置用于LDAP搜索的过滤器。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_USE_TLS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用LDAP连接的TLS。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_CA_CERT_FILE`

- 类型: `str`
- 描述: 设置LDAP CA证书文件的路径。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_VALIDATE_CERT`

- 类型: `bool`
- 描述: 设置是否验证LDAP CA证书。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_CIPHERS`

- 类型: `str`
- 默认值: `ALL`
- 描述: 设置用于LDAP连接的加密套件。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

## 用户权限

### 聊天权限

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户访问聊天控制的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户上传文件到聊天的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_DELETE`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户删除聊天的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_EDIT`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户编辑聊天的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_STT`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户在聊天中使用语音转文字的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_TTS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户在聊天中使用文字转语音的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_CALL`

- 类型: `str`
- 默认值: `True`
- 描述: 启用或禁用用户在聊天中拨打电话的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- 类型: `str`
- 默认值: `True`
- 描述: 启用或禁用用户在聊天中使用多个模型的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户创建临时聊天的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用对用户强制使用临时聊天。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 功能权限

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用用户访问直接工具服务器的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- 类型: `str`
- 默认值: `True`
- 描述: 启用或禁用用户使用网络搜索功能的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- 类型: `str`
- 默认值: `True`
- 描述: 启用或禁用用户使用图像生成功能的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- 类型: `str`
- 默认值: `True`
- 描述: 启用或禁用用户使用代码解释功能的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

### 工作空间权限

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用用户访问工作空间模型的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用用户访问工作空间知识的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用用户访问工作空间提示的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用用户访问工作空间工具的权限。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用工作空间模型的公开共享。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用工作空间知识的公开共享。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用工作空间提示的公开共享。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用或禁用工作空间工具的公开共享。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

## 杂项环境变量

这些变量不是专属于Open WebUI，但在某些情况下仍然有价值。

### 云存储

#### `STORAGE_PROVIDER`

- 类型: `str`
- 可选项:
  - `s3` - 使用 S3 客户端库和相关环境变量，如 [Amazon S3 Storage](#amazon-s3-storage) 中所述
  - `gcs` - 使用 GCS 客户端库和相关环境变量，如 [Google Cloud Storage](#google-cloud-storage) 中所述
  - `azure` - 使用 Azure 客户端库和相关环境变量，如 [Microsoft Azure Storage](#microsoft-azure-storage) 中所述
- 默认值: 空字符串 (`' '`)，默认为 `local`
- 描述: 设置存储提供商。

#### Amazon S3 存储

#### `S3_ACCESS_KEY_ID`

- 类型: `str`
- 描述: 设置 S3 存储的访问密钥 ID。

#### `S3_ADDRESSING_STYLE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 S3 存储使用的地址样式 (例如, `path` 或 `virtual`)。

#### `S3_BUCKET_NAME`

- 类型: `str`
- 描述: 设置 S3 存储的桶名称。

#### `S3_ENDPOINT_URL`

- 类型: `str`
- 描述: 设置 S3 存储的终端 URL。

#### `S3_KEY_PREFIX`

- 类型: `str`
- 描述: 为 S3 对象设置键前缀。

#### `S3_REGION_NAME`

- 类型: `str`
- 描述: 设置 S3 存储的区域名称。

#### `S3_SECRET_ACCESS_KEY`

- 类型: `str`
- 描述: 设置 S3 存储的密钥访问密钥。

#### `S3_USE_ACCELERATE_ENDPOINT`

- 类型: `str`
- 默认值: `False`
- 描述: 指定是否使用 S3 存储的加速端点。

#### `S3_ENABLE_TAGGING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用上传后对 S3 对象的标记以便于组织、搜索，并与文件管理策略集成。在使用 Cloudflare R2 时始终设置为 `False`，因为 R2 不支持对象标记。

#### Google Cloud 存储

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- 类型: `str`
- 描述: Google 应用程序凭据 JSON 文件的内容。
  - 可选 - 如未提供，将从环境获取凭据。如果本地运行则使用用户凭据，在 Google Compute Engine 上运行则使用 Google 元数据服务器。
  - 可以根据此 [指南](https://developers.google.com/workspace/guides/create-credentials#service-account) 为服务帐户生成文件。

#### `GCS_BUCKET_NAME`

- 类型: `str`
- 描述: 设置 Google Cloud 存储的桶名称。桶必须已存在。

#### Microsoft Azure 存储

#### `AZURE_STORAGE_ENDPOINT`

- 类型: `str`
- 描述: 设置 Azure 存储的终端 URL。

#### `AZURE_STORAGE_CONTAINER_NAME`

- 类型: `str`
- 描述: 设置 Azure 存储的容器名称。

#### `AZURE_STORAGE_KEY`

- 类型: `str`
- 描述: 设置 Azure 存储的访问密钥。
  - 可选 - 如未提供，将从环境中获取凭据。本地运行时使用用户凭据，在 Azure 服务中运行时使用托管身份。

### 数据库连接池

#### `DATABASE_URL`

- 类型: `str`
- 默认值: `sqlite:///${DATA_DIR}/webui.db`
- 描述: 指定用于连接的数据库 URL。

:::info

支持 SQLite 和 Postgres。更改 URL 不会在数据库之间迁移数据。
有关 URL 方案的文档可以参见 [此处](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)。

:::

#### `DATABASE_SCHEMA`

- 类型: `str`
- 默认值: `None`
- 描述: 指定要连接的数据库架构。

#### `DATABASE_POOL_SIZE`

- 类型: `int`
- 默认值: `0`
- 描述: 指定数据库连接池的大小。值为 `0` 时禁用连接池。

#### `DATABASE_POOL_MAX_OVERFLOW`

- 类型: `int`
- 默认值: `0`
- 描述: 指定数据库连接池的最大溢出数量。

:::info

有关此设置的更多信息，请参见 [此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)。

:::

#### `DATABASE_POOL_TIMEOUT`

- 类型: `int`
- 默认值: `30`
- 描述: 指定获取连接的数据库连接池超时时间（秒）。

:::info

有关此设置的更多信息，请参见 [此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)。

:::

#### `DATABASE_POOL_RECYCLE`

- 类型: `int`
- 默认值: `3600`
- 描述: 指定数据库连接池的回收时间（秒）。

:::info

有关此设置的更多信息，请参见 [此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)。

:::

### Redis

#### `REDIS_URL`

- 类型: `str`
- 示例: `redis://localhost:6379/0`
- 描述: 指定用于应用程序状态的 Redis 实例的 URL。

:::info

在多节点/工作节点部署 Open-WebUI 时，必须确保设置 REDIS_URL 值。否则会由于工作节点无法通信而引发会话、持久性和一致性问题。

:::

#### `REDIS_SENTINEL_HOSTS`

- 类型: `str`
- 描述：用于应用程序状态的Redis哨兵的逗号分隔列表。如果指定，`REDIS_URL`中的"hostname"将被解释为哨兵服务名称。

#### `REDIS_SENTINEL_PORT`

- 类型：`int`
- 默认值：`26379`
- 描述：用于应用程序状态的Redis的哨兵端口。

#### `ENABLE_WEBSOCKET_SUPPORT`

- 类型：`bool`
- 默认值：`True`
- 描述：启用Open WebUI的WebSocket支持。

:::info

部署Open-WebUI在多节点/工作者集群时，必须确保设置ENABLE_WEBSOCKET_SUPPORT的值。如果未设置，将会出现WebSocket一致性和持久性问题。

:::

#### `WEBSOCKET_MANAGER`

- 类型：`str`
- 默认值：`redis`
- 描述：指定使用的WebSocket管理器（在此情形下为Redis）。

:::info

部署Open-WebUI在多节点/工作者集群时，必须确保设置WEBSOCKET_MANAGER的值且使用类似Redis的键值NoSQL数据库。如果未设置，将会出现WebSocket一致性和持久性问题。

:::

#### `WEBSOCKET_REDIS_URL`

- 类型：`str`
- 默认值：`${REDIS_URL}`
- 描述：指定用于WebSocket通信的Redis实例的URL。这与`REDIS_URL`不同，实践中建议同时设置两者。

:::info

部署Open-WebUI在多节点/工作者集群时，必须确保设置WEBSOCKET_REDIS_URL的值且使用类似Redis的键值NoSQL数据库。如果未设置，将会出现WebSocket一致性和持久性问题。

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- 类型：`str`
- 描述：WebSocket用途的Redis哨兵的逗号分隔列表。如果指定，`WEBSOCKET_REDIS_URL`中的"hostname"将被解释为哨兵服务名称。

#### `WEBSOCKET_SENTINEL_PORT`

- 类型：`int`
- 默认值：`26379`
- 描述：用于WebSocket的Redis的哨兵端口。

### Uvicorn配置

#### `UVICORN_WORKERS`

- 类型：`int`
- 默认值：`1`
- 描述：控制Uvicorn生成来处理请求的工作进程数。每个工作者在单独的进程中运行其应用程序实例。

:::info

在类似Kubernetes等编排环境或使用Helm charts进行部署时，建议将UVICORN_WORKERS设置为1。容器编排平台已经通过Pod复制提供了其自身的扩展机制，在容器中使用多工作者可能会导致资源分配问题并复杂化水平扩展策略。

如果使用UVICORN_WORKERS，也需要确保相关的环境变量为可扩展的多实例设置配置妥当。

:::

### 代理设置

Open WebUI支持为HTTP和HTTPS检索使用代理。要指定代理设置，
Open WebUI使用以下环境变量：

#### `http_proxy`

- 类型：`str`
- 描述：设置HTTP代理的URL。

#### `https_proxy`

- 类型：`str`
- 描述：设置HTTPS代理的URL。

#### `no_proxy`

- 类型：`str`
- 描述：列出不应使用代理的域扩展名（或IP地址），
用逗号分隔。例如，将no_proxy设置为.mit.edu确保在访问MIT的文档时绕过代理。

### 安装所需的Python包

Open WebUI提供环境变量以自定义pip安装过程。以下是Open WebUI用于调整包安装行为的环境变量：

#### `PIP_OPTIONS`

- 类型：`str`
- 描述：指定pip在安装包时应使用的其他命令行选项。例如，可以包含`--upgrade`、`--user`或`--no-cache-dir`等标志以控制安装过程。

#### `PIP_PACKAGE_INDEX_OPTIONS`

- 类型：`str`
- 描述：定义pip的自定义包索引行为。这可以包括指定其他或备用索引URL（例如`--extra-index-url`）、认证凭据或其他参数以管理包从不同位置检索的方式。
