---
sidebar_position: 4
title: "🌍 环境变量配置"
---


## 概览

Open WebUI 提供了大量环境变量，允许您自定义和配置应用程序的各个方面。本页面为所有可用环境变量提供了全面的参考，包括其类型、默认值和描述。
随着新变量的引入，本页面会不断更新以反映不断增长的配置选项。

:::info

本页面与 Open WebUI 发布版本 [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9) 保持同步，但仍在完善过程中，未来将包括更准确的描述、列出环境变量可用的选项以及改进描述。

:::

### 关于 `PersistentConfig` 环境变量的重要说明

:::note

首次启动 Open WebUI 时，所有环境变量都被视为平等，可以用于配置应用程序。然而，对于标记为 `PersistentConfig` 的环境变量，其值会被持久化并存储在内部。

在首次启动后，如果您重新启动容器，`PersistentConfig` 环境变量将不再使用外部环境变量值，而是使用内部存储的值。

与之相比，常规环境变量将在每次后续重启时继续更新并应用。

您可以直接从 Open WebUI 内部更新 `PersistentConfig` 环境变量的值，这些更改将存储在内部。这使您可以独立于外部环境变量管理这些配置设置。

请注意，`PersistentConfig` 环境变量在以下文档中会被清晰标记，以便您了解其行为方式。

:::

## 应用程序/后端

以下环境变量由 `backend/open_webui/config.py` 使用，提供 Open WebUI 启动配置。请注意，根据您是直接运行 Open WebUI 还是通过 Docker 运行，有些变量可能有不同的默认值。有关日志环境变量的更多信息，请参阅我们的[日志文档](https://docs.openwebui.com/getting-started/advanced-topics/logging)。

### 通用

#### `WEBUI_URL`

- 类型: `str`
- 默认值: `http://localhost:3000`
- 描述: 指定 Open WebUI 可访问的 URL。目前用于搜索引擎支持。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_SIGNUP`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换用户账户创建功能。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_LOGIN_FORM`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换电子邮件、密码、登录以及“或”(仅当 `ENABLE_OAUTH_SIGNUP` 设置为 True 时) 元素。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

:::danger

此参数**仅**应在同时使用且设置 [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup) 为 `True` 时设置为 `False`。未遵守此设置将导致无法登录。

:::

#### `DEFAULT_LOCALE`

- 类型: `str`
- 默认值: `en`
- 描述: 设置应用程序的默认语言环境。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `DEFAULT_MODELS`

- 类型: `str`
- 默认值: 空字符串（`''`），表示 `None`。
- 描述: 设置默认语言模型。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `DEFAULT_USER_ROLE`

- 类型: `str`
- 选项:
  - `pending` - 新用户状态为待定，直到管理员手动激活其账户。
  - `user` - 新用户自动激活，并拥有普通用户权限。
  - `admin` - 新用户自动激活，并拥有管理员权限。
- 默认值: `pending`
- 描述: 设置新用户分配的默认角色。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `PENDING_USER_OVERLAY_TITLE`

- 类型: `str`
- 默认值: 空字符串（`''`）
- 描述: 设置待定用户覆盖层的自定义标题。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `PENDING_USER_OVERLAY_CONTENT`

- 类型: `str`
- 默认值: 空字符串（`''`）
- 描述: 设置待定用户覆盖层的自定义文本内容。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_CHANNELS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用频道支持。
- 持久性: 该环境变量是一个 `PersistentConfig` 变量。

#### `WEBHOOK_URL`

- 类型: `str`
- 描述: 设置用于与 Discord/Slack/Microsoft Teams 集成的 webhook。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_ADMIN_EXPORT`

- 类型: `bool`
- 默认值: `True`
- 描述: 控制是否允许管理员用户导出数据。

#### `ENABLE_ADMIN_CHAT_ACCESS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用管理员用户访问所有聊天。

#### `ENABLE_USER_WEBHOOKS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用用户的 Webhooks。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `RESPONSE_WATERMARK`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)
- 描述: 设置自定义文本，当从聊天中复制消息时会包含该文本。例如 `"This text is AI generated"` -> 这将在每条消息被复制时添加 "This text is AI generated"。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `THREAD_POOL_SIZE`

- 类型: `int`
- 默认值: `0`
- 描述: 设置 FastAPI/AnyIO 阻塞调用的线程池大小。默认情况下（设置为 0 时）FastAPI/AnyIO 使用 `40` 个线程。在大规模实例和许多并发用户的情况下，可能需要增加 `THREAD_POOL_SIZE` 以防止阻塞。

#### `SHOW_ADMIN_DETAILS`

- 类型: `bool`
- 默认值: `True`
- 描述: 切换是否在接口中显示管理员用户详细信息。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ADMIN_EMAIL`

- 类型: `str`
- 描述: 设置 `SHOW_ADMIN_DETAILS` 显示的管理员邮箱。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ENV`

- 类型: `str`
- 选项：
  - `dev` - 在 `/docs` 上启用 FastAPI API 文档
  - `prod` - 自动配置多个环境变量
- 默认值：
  - **后端默认值**: `dev`
  - **Docker 默认值**: `prod`
- 描述: 环境设置。

#### `ENABLE_PERSISTENT_CONFIG`

- 类型: `bool`
- 默认值: `True`
- 描述: 如果设置为 `False`，所有 `PersistentConfig` 变量将被视为普通变量。

#### `CUSTOM_NAME`

- 类型: `str`
- 描述: 设置 `WEBUI_NAME`，但会通过 **api.openwebui.com** 获取元数据。

#### `WEBUI_NAME`

- 类型: `str`
- 默认值: `Open WebUI`
- 描述: 设置 WebUI 的主要名称。如果覆盖，将附加 `(Open WebUI)`。

#### `PORT`

- 类型: `int`
- 默认值: `8080`
- 描述: 设置运行 Open WebUI 的端口。

:::info
如果您通过 Python 运行应用程序并使用 `open-webui serve` 命令，则无法使用 `PORT` 配置设置端口。相反，必须直接将端口作为命令行参数通过 `--port` 标志指定。例如：

```bash
open-webui serve --port 9999
```

这将在端口 `9999` 上运行 Open WebUI。在此模式下，会忽略 `PORT` 环境变量。
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用时，系统会实时将每块流式聊天数据保存到数据库，以确保数据的最大持久性。此功能提供强大的数据恢复能力并允许精确的会话跟踪。然而，代价是增加了延迟，因为保存到数据库会引入延迟。禁用此功能可以提高性能并减少延迟，但在系统故障或崩溃时存在潜在数据丢失的风险。根据您的应用需求和可接受的权衡来使用。

#### `BYPASS_MODEL_ACCESS_CONTROL`

- 类型: `bool`
- 默认值: `False`
- 描述: 绕过模型访问控制。

#### `WEBUI_BUILD_HASH`

- 类型: `str`
- 默认值: `dev-build`
- 描述: 用于标识发布版本的 Git SHA。

#### `WEBUI_BANNERS`

- 类型: `list` of `dict`
- 默认值: `[]`
- 描述: 要向用户显示的横幅列表。横幅的格式如下：

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- 持久性：此环境变量是一个 `PersistentConfig` 变量。

:::info

在 `.env` 文件中设置此环境变量时，请确保通过用双引号括起整个值并对内部引号使用转义引号 (`\"`) 来进行转义。例如：

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"您的消息将被存储。\", \"content\": \"您的消息将被存储并可能由人工审查。LLM&apos;s 容易出现幻觉，请核对来源。\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- 类型: `bool`
- 默认值: `False`
- 描述: 构建具有 NVIDIA CUDA 支持的 Docker 映像。启用本地 Whisper 和嵌入的 GPU 加速。

#### `EXTERNAL_PWA_MANIFEST_URL`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认设置为 `None`。
- 描述: 当定义为完全合格的 URL（例如 https://path/to/manifest.webmanifest）时，发送到 /manifest.json 的请求将使用外部清单文件。如果未定义，将使用默认的 manifest.json 文件。

#### `ENABLE_TITLE_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用聊天标题生成。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `LICENSE_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定要使用的许可证密钥（仅适用于企业用户）。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SSL_ASSERT_FINGERPRINT`

- 类型: `str`
- 默认值: 空字符串（&apos; &apos;），因为默认设置为 `None`。
- 描述: 指定要使用的 SSL 指纹。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `DEFAULT_PROMPT_SUGGESTIONS`

- 类型: `list` 包含 `dict`
- 默认值: `[]`（表示使用内置的默认提示建议）
- 描述: 提示建议列表。提示建议的格式为:

```json
[{"title": ["Title part 1", "Title part 2"], "content": "prompt"}]
```

### AIOHTTP 客户端

#### `AIOHTTP_CLIENT_TIMEOUT`

- 类型: `int`
- 默认值: `300`
- 描述: 指定 AIOHTTP 客户端的超时时间（以秒为单位）。这会影响与 Ollama 和 OpenAI 端点的连接等。

:::info

这是客户端等待响应的最大时间，超时将报错。
如果设置为空字符串（&apos; &apos;），则超时时间将设置为 `None`，有效地禁用超时，
允许客户端无限期等待。

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- 类型: `int`
- 默认值: `10`
- 描述: 用于获取模型列表的超时时间（以秒为单位）。在网络延迟较高的情况下，可以设置更长的超时时间以成功检索模型列表。

:::note
默认情况下，`AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST` 设置为 10 秒，以确保在打开 Web UI 时所有必要的连接均可用。这个时间量允许在网络延迟较大的情况下成功检索模型列表。如果想要更快的超时，可以降低这个值，但请注意，这可能会导致某些连接被中断，具体取决于您的网络状况。
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- 类型: `int`
- 描述: 设置获取模型列表的超时时间（以秒为单位）。在网络延迟较高的情况下，可以设置更长的超时时间以成功检索模型列表。

### 目录

#### `DATA_DIR`

- 类型: `str`
- 默认值: `./data`
- 描述: 指定用于数据存储的基础目录，包括上传、缓存、向量数据库等。

#### `FONTS_DIR`

- 类型: `str`
- 描述: 指定字体目录。

#### `FRONTEND_BUILD_DIR`

- 类型: `str`
- 默认值: `../build`
- 描述: 指定构建的前端文件位置。

#### `STATIC_DIR`

- 类型: `str`
- 默认值: `./static`
- 描述: 指定静态文件目录，例如 favicon。

### Ollama

#### `ENABLE_OLLAMA_API`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用 Ollama API 的使用。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` 已废弃) {#ollama_base_url}

- 类型: `str`
- 默认值: `http://localhost:11434`
- Docker 默认值:
  - 如果设置了 `K8S_FLAG`：`http://ollama-service.open-webui.svc.cluster.local:11434`
  - 如果 `USE_OLLAMA_DOCKER=True`：`http://localhost:11434`
  - 否则 `http://host.docker.internal:11434`
- 描述: 配置 Ollama 后端 URL。

#### `OLLAMA_BASE_URLS`

- 类型: `str`
- 描述: 配置负载均衡的 Ollama 后端主机，使用 `;` 分隔。参见
[`OLLAMA_BASE_URL`](#ollama_base_url)。优先于[`OLLAMA_BASE_URL`](#ollama_base_url)。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `USE_OLLAMA_DOCKER`

- 类型: `bool`
- 默认值: `False`
- 描述: 构建包含捆绑 Ollama 实例的 Docker 镜像。

#### `K8S_FLAG`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果设置，则假设通过 Helm 图表部署，并将 [`OLLAMA_BASE_URL`](#ollama_base_url) 设置为 `http://ollama-service.open-webui.svc.cluster.local:11434`

### OpenAI

#### `ENABLE_OPENAI_API`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用 OpenAI API 的使用。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `OPENAI_API_BASE_URL`

- 类型: `str`
- 默认值: `https://api.openai.com/v1`
- 描述: 配置 OpenAI 基础 API URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `OPENAI_API_BASE_URLS`

- 类型: `str`
- 描述: 支持负载均衡的 OpenAI 基础 API URL，使用分号分隔。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `OPENAI_API_KEY`

- 类型: `str`
- 描述: 设置 OpenAI API 密钥。
- 示例：`sk-124781258123`
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `OPENAI_API_KEYS`

- 类型：`str`
- 描述：支持多个 OpenAI API 密钥，用分号分隔。
- 示例：`sk-124781258123;sk-4389759834759834`
- 持久性：此环境变量为 `PersistentConfig` 变量。

### 任务

#### `TASK_MODEL`

- 类型：`str`
- 描述：在使用 Ollama 模型时，用于生成标题和网页搜索查询等任务的默认模型。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `TASK_MODEL_EXTERNAL`

- 类型：`str`
- 描述：在使用 OpenAI 兼容端点时，用于生成标题和网页搜索查询等任务的默认模型。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- 类型：`str`
- 描述：用于生成聊天标题的提示模板。
- 默认值：`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
生成一个简洁的、3-5个词的标题，并附带一个总结聊天历史的表情符号。
### 指南:
- 标题应清晰地表示对话的主要主题或内容。
- 使用增强理解主题的表情符号，但避免使用引号或特殊格式。
- 标题应使用聊天的主要语言；如果是多语言，则默认为英语。
- 优先考虑准确性而不是过度创造性；保持清晰简单。
### 输出:
JSON 格式: { "title": "你的简洁标题" }
### 示例:
- { "title": "📉 股票市场趋势" },
- { "title": "🍪 完美巧克力曲奇配方" },
- { "title": "音乐流媒体的演变" },
- { "title": "远程工作的生产力技巧" },
- { "title": "人工智能在医疗中的应用" },
- { "title": "🎮 视频游戏开发见解" }
### 聊天记录:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- 类型：`str`
- 描述：用于调用工具的提示模板。
- 默认值：`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
可用工具: {{TOOLS}}

你的任务是根据查询从可用工具列表中选择并返回正确的工具。在以下指南的基础上进行操作:

- 仅返回 JSON 对象，不需额外的文本或解释。

- 如果没有工具符合查询，则返回空数组: 
   {
     "tool_calls": []
   }

- 如果一个或多个工具符合查询，请构造 JSON 响应，包含一个 "tool_calls" 数组，其中包含对象，包括:
   - "name": 工具的名称。
   - "parameters": 所需参数及其对应值的字典。

JSON 响应的格式严格为:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- 持久性：此环境变量为 `PersistentConfig` 变量。

### 代码执行

#### `ENABLE_CODE_EXECUTION`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用代码执行功能。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_ENGINE`

- 类型：`str`
- 默认值：`pyodide`
- 描述：指定使用的代码执行引擎。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_JUPYTER_URL`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于代码执行的 Jupyter URL。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_JUPYTER_AUTH`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于代码执行的 Jupyter 身份验证方法。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于代码执行的 Jupyter 身份验证令牌。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于代码执行的 Jupyter 身份验证密码。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- 类型：`str`
- 默认值：空字符串（&apos; &apos;），因为默认值设置为 `None`。
- 描述：指定 Jupyter 代码执行的超时时间。
- 持久性：此环境变量为 `PersistentConfig` 变量。

### 代码解释器

#### `ENABLE_CODE_INTERPRETER`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用代码解释器功能。
- 持久性：此环境变量为 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_ENGINE`

- 类型: `str`
- 默认值: `pyodide`
- 描述: 指定要使用的代码解释器引擎。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定代码解释器使用的提示模板。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_JUPYTER_URL`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认值为 `None`。
- 描述: 指定代码解释器使用的 Jupyter URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认值为 `None`。
- 描述: 指定代码解释器使用的 Jupyter 身份验证方法。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认值为 `None`。
- 描述: 指定代码解释器使用的 Jupyter 身份验证令牌。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认值为 `None`。
- 描述: 指定代码解释器使用的 Jupyter 身份验证密码。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- 类型: `str`
- 默认值: 空字符串 (&apos; &apos;)，因为默认值为 `None`。
- 描述: 指定代码解释器的 Jupyter 超时时间。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 直接连接（OpenAPI/MCPO 工具服务器）

#### `ENABLE_DIRECT_CONNECTIONS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用直接连接。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 自动补全

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用自动补全生成。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::info

启用 `ENABLE_AUTOCOMPLETE_GENERATION` 时，请确保相应配置 `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` 和 `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`。

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- 类型: `int`
- 默认值: `-1`
- 描述: 设置自动补全生成的最大输入长度。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### 任务:
你是一个自动补全系统。根据 `<type>` 中提到的 **补全类型** 和提供的语言继续 `<text>` 中的文本。

### **说明**:
1. 分析 `<text>` 的上下文和含义。
2. 根据 `<type>` 引导输出：
   - **常规**: 提供自然简洁的续写内容。
   - **搜索查询**: 补全生成逼真的搜索查询。
3. 直接从 `<text>` 开始，不要重复、改写或作为模型回复。只需完成文本。
4. 确保续写内容：
   - 自然衔接 `<text>`。
   - 避免重复、过度解释或无关内容。
5. 如果无法确定，返回: `{ "text": "" }`。

### **输出规则**:
- 仅以 JSON 格式响应: `{ "text": "<你的补全>" }`。

### **示例**:
#### 示例 1:
输入:
<type>常规</type>
<text>夕阳西下，天空被染成</text>
输出:
{ "text": "橙色和粉色的绚丽色彩。" }

#### 示例 2:
输入:
<type>搜索查询</type>
<text>评分最高的餐厅在</text>
输出:
{ "text": "纽约市的意大利美食领域。" }

---
### 上下文:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### 输出:
```

- 描述: 设置自动补全生成的提示模板。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 评估竞技场模型

#### `ENABLE_EVALUATION_ARENA_MODELS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用评估竞技场模型。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_MESSAGE_RATING`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用消息评分功能。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_COMMUNITY_SHARING`

- 类型: `bool`
- 默认值: `True`
- 描述: 控制是否向用户显示分享至社区按钮。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### 标签生成

#### `ENABLE_TAGS_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用标签生成。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- 类型: `str`
- 默认值: `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE` 环境变量的值。

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### 任务：
生成 1-3 个宽泛的标签以归类聊天历史的主要主题，再加上 1-3 个更具体的子主题标签。

### 指导方针：
- 以高层级领域开始（例如：科学、技术、哲学、艺术、政治、商业、健康、体育、娱乐、教育）
- 如果某些子领域/子域在对话中占显著比例，考虑包括它们
- 如果内容太短（少于 3 条消息）或过于多样化，仅使用 ["General"]
- 使用聊天的主要语言；如果是多语言，默认使用英语
- 优先保证准确性而非精确性

### 输出：
JSON 格式: { "tags": ["tag1", "tag2", "tag3"] }

### 聊天历史：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述: 设置用于标签生成的提示模板。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### API 密钥端点限制

#### `ENABLE_API_KEY`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用 API 密钥认证。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用 API 密钥端点限制以增强安全性和可配置性。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `API_KEY_ALLOWED_ENDPOINTS`

- 类型: `str`
- 描述: 当启用 API 密钥端点限制时，指定允许的 API 端点的逗号分隔列表。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

:::note

`API_KEY_ALLOWED_ENDPOINTS` 的值应为以逗号分隔的端点 URL 列表，例如 `/api/v1/messages, /api/v1/channels`。

:::

#### `JWT_EXPIRES_IN`

- 类型: `int`
- 默认值: `-1`
- 描述: 设置 JWT 的过期时间（以秒为单位）。有效时间单位：`s`，`m`，`h`，`d`，`w` 或 `-1` 表示无过期时间。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

## 安全变量

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- 类型: `bool`
- 默认值: `False`
- 描述: 将用户信息（如姓名、ID、邮箱和角色）作为 X-headers 转发到 OpenAI API 和 Ollama API。
如果启用，下列头信息会被转发：
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 绕过网站上的 RAG SSL 验证。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- 类型: `str`
- 选项：
  - `lax` - 将 `SameSite` 属性设置为 lax，允许由第三方网站发起的请求携带会话 Cookie。
  - `strict` - 将 `SameSite` 属性设置为 strict，阻止由第三方网站发起的请求携带会话 Cookie。
  - `none` - 将 `SameSite` 属性设置为 none，允许由第三方网站发起的请求携带会话 Cookie，但仅限 HTTPS。
- 默认值: `lax`
- 描述: 设置会话 Cookie 的 `SameSite` 属性。

:::warning

当启用 `ENABLE_OAUTH_SIGNUP` 时，将 `WEBUI_SESSION_COOKIE_SAME_SITE` 设置为 `strict` 可能导致登录失败。这是因为 Open WebUI 使用会话 Cookie 验证来自 OAuth 提供商的回调，这有助于防止 CSRF 攻击。

然而，`strict` 会话 Cookie 不会随回调请求一起发送，从而可能导致登录问题。如果遇到此问题，请改用默认值 `lax`。

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- 类型: `bool`
- 默认值: `False`
- 描述: 如果设置为 `True`，为会话 Cookie 设置 `Secure` 属性。

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- 类型: `str`
- 选项：
  - `lax` - 将 `SameSite` 属性设置为 lax，允许由第三方网站发起的请求携带认证 Cookie。
  - `strict` - 将 `SameSite` 属性设置为 strict，阻止由第三方网站发起的请求携带认证 Cookie。
  - `none` - 将 `SameSite` 属性设置为 none，允许由第三方网站发起的请求携带认证 Cookie，但仅限 HTTPS。
- 默认值: `lax`
- 描述: 设置认证 Cookie 的 `SameSite` 属性。

:::info

如果未设置值，将使用 `WEBUI_SESSION_COOKIE_SAME_SITE` 作为后备。

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- 类型: `bool`
- 默认值: `False`
- 描述：如果设置为 `True`，将为认证Cookie设置 `Secure` 属性。

:::info

如果未设置该值，将使用 `WEBUI_SESSION_COOKIE_SECURE` 作为回退。

:::

#### `WEBUI_AUTH`

- 类型：`bool`
- 默认值：`True`
- 描述：此设置启用或禁用认证功能。

:::danger

如果设置为 `False`，将禁用您的 Open WebUI 实例的认证功能。然而，重要的是要注意，只有在没有已注册用户的新安装中才能关闭认证。如果已经存在用户，则无法直接禁用认证。想要关闭 `WEBUI_AUTH` 时，请确保数据库中没有用户存在。

:::

#### `WEBUI_SECRET_KEY`

- 类型：`str`
- 默认值：`t0p-s3cr3t`
- Docker 默认值：首次启动时随机生成
- 描述：覆盖用于 JSON Web Token 的随机生成字符串。

:::info

当在带负载均衡器的多节点集群中部署 Open-WebUI 时，必须确保所有实例的 `WEBUI_SECRET_KEY` 值相同，以便在某个节点重启或会话转移到不同节点时，用户能够继续工作。否则，每次底层节点更改时，用户都需要重新登录。

:::

#### `OFFLINE_MODE`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用离线模式。

#### `RESET_CONFIG_ON_START`

- 类型：`bool`
- 默认值：`False`
- 描述：在启动时重置 `config.json` 文件。

#### `SAFE_MODE`

- 类型：`bool`
- 默认值：`False`
- 描述：启用安全模式，此模式会禁用潜在不安全功能，停用所有功能。

#### `CORS_ALLOW_ORIGIN`

- 类型：`str`
- 默认值：`*`
- 描述：设置跨域资源共享 (CORS) 的允许来源。

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- 类型：`bool`
- 默认值：`False`
- 描述：决定是否允许在 Hub 上使用定义在自有建模文件中的自定义模型。

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- 类型：`bool`
- 默认值：`False`
- 描述：决定是否允许在 Hub 上使用定义在自有建模文件中的自定义模型用于重新排序。

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- 类型：`bool`
- 默认值：`True`
- 描述：切换 Sentence-Transformer 模型的自动更新。

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- 类型：`bool`
- 默认值：`True`
- 描述：切换重新排序模型的自动更新。

## 矢量数据库

#### `VECTOR_DB`

- 类型：`str`
- 选项：
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- 默认值：`chroma`
- 描述：指定要使用的矢量数据库系统。此设置决定用于管理嵌入的矢量存储系统。

### ChromaDB

#### `CHROMA_TENANT`

- 类型：`str`
- 默认值：`chromadb.DEFAULT_TENANT`（`chromadb` 模块中的常量）
- 描述：设置 ChromaDB 的租户以便用于 RAG 嵌入。

#### `CHROMA_DATABASE`

- 类型：`str`
- 默认值：`chromadb.DEFAULT_DATABASE`（`chromadb` 模块中的常量）
- 描述：设置 ChromaDB 租户中的数据库以便用于 RAG 嵌入。

#### `CHROMA_HTTP_HOST`

- 类型：`str`
- 描述：指定远程 ChromaDB 服务器的主机名。如果未设置，将使用本地 ChromaDB 实例。

#### `CHROMA_HTTP_PORT`

- 类型：`int`
- 默认值：`8000`
- 描述：指定远程 ChromaDB 服务器的端口。

#### `CHROMA_HTTP_HEADERS`

- 类型：`str`
- 描述：指定在每次 ChromaDB 请求中包含的 HTTP 头的逗号分隔列表。
- 示例：`Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`。

#### `CHROMA_HTTP_SSL`

- 类型：`bool`
- 默认值：`False`
- 描述：控制是否为 ChromaDB 服务器连接使用 SSL。

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- 类型：`str`
- 描述：指定远程 ChromaDB 服务器的认证提供者。
- 示例：`chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- 类型：`str`
- 描述：为远程 ChromaDB 服务器指定认证凭据。
- 示例：`username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- 类型：`str`
- 默认值：空字符串（`' '`），因为默认设置为 `None`。
- 描述：指定 Elasticsearch API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_CA_CERTS`

- 类型：`str`
- 默认值：空字符串（`' '`），因为默认设置为 `None`。
- 描述：指定 Elasticsearch 的 CA 证书路径。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_CLOUD_ID`

- 类型：`str`
- 默认值：空字符串（`' '`），因为默认设置为 `None`。
- 描述：指定 Elasticsearch 云 ID。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_INDEX_PREFIX`

- 类型：`str`
- 默认值：`open_webui_collections`
- 描述：指定 Elasticsearch 索引的前缀。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_PASSWORD`

- 类型：`str`
- 默认值：空字符串（&apos; &apos;），因为默认设置为 `None`。
- 描述：指定 Elasticsearch 的密码。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_URL`

- 类型：`str`
- 默认值：`https://localhost:9200`
- 描述：指定 Elasticsearch 实例的 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `ELASTICSEARCH_USERNAME`

- 类型：`str`
- 默认值：空字符串（&apos; &apos;），因为默认设置为 `None`。
- 描述：指定 Elasticsearch 的用户名。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### Milvus

#### `MILVUS_URI`

- 类型：`str`
- 默认值：`${DATA_DIR}/vector_db/milvus.db`
- 描述：指定用于连接 Milvus 向量数据库的 URI。根据部署配置，这可以指向本地或远程 Milvus 服务器。

#### `MILVUS_DB`

- 类型：`str`
- 默认值：`default`
- 描述：指定连接到 Milvus 实例中的数据库。

#### `MILVUS_TOKEN`

- 类型：`str`
- 默认值：`None`
- 描述：指定一个可选的 Milvus 连接令牌。

#### `MILVUS_INDEX_TYPE`

- 类型：`str`
- 默认值：`HNSW`
- 选项：`AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- 描述：指定在 Milvus 中创建新集合时使用的索引类型。对于 Milvus 独立版，通常推荐使用 `AUTOINDEX`。`HNSW` 可能提供更好的性能，但通常需要集群化的 Milvus 设置。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_METRIC_TYPE`

- 类型：`str`
- 默认值：`COSINE`
- 选项：`COSINE`, `IP`, `L2`
- 描述：指定在 Milvus 中进行向量相似度搜索的度量类型。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_HNSW_M`

- 类型：`int`
- 默认值：`16`
- 描述：指定 Milvus 中 HNSW 索引类型的 `M` 参数。这会影响在构建过程中为每个新元素创建的双向链接数量。仅当 `MILVUS_INDEX_TYPE` 为 `HNSW` 时适用。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_HNSW_EFCONSTRUCTION`

- 类型：`int`
- 默认值：`100`
- 描述：指定 Milvus 中 HNSW 索引类型的 `efConstruction` 参数。这会影响在索引构建过程中最近邻动态列表的大小。仅当 `MILVUS_INDEX_TYPE` 为 `HNSW` 时适用。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `MILVUS_IVF_FLAT_NLIST`

- 类型：`int`
- 默认值：`128`
- 描述：指定 Milvus 中 IVF_FLAT 索引类型的 `nlist` 参数。这是聚类单位的数量。仅当 `MILVUS_INDEX_TYPE` 为 `IVF_FLAT` 时适用。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用 OpenSearch 证书验证。

#### `OPENSEARCH_PASSWORD`

- 类型：`str`
- 默认值：`None`
- 描述：设置 OpenSearch 的密码。

#### `OPENSEARCH_SSL`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用 OpenSearch 的 SSL。

#### `OPENSEARCH_URI`

- 类型：`str`
- 默认值：`https://localhost:9200`
- 描述：设置 OpenSearch 的 URI。

#### `OPENSEARCH_USERNAME`

- 类型：`str`
- 默认值：`None`
- 描述：设置 OpenSearch 的用户名。

### PGVector

#### `PGVECTOR_DB_URL`

- 类型：`str`
- 默认值：`DATABASE_URL` 环境变量的值
- 描述：设置模型存储的数据库 URL。

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- 类型：`str`
- 默认值：`1536`
- 描述：指定 PGVector 初始化的最大向量长度。

### Qdrant

#### `QDRANT_API_KEY`

- 类型：`str`
- 描述：设置 Qdrant 的 API 密钥。

#### `QDRANT_URI`

- 类型：`str`
- 描述：设置 Qdrant 的 URI。

#### `QDRANT_ON_DISK`

- 类型：`bool`
- 默认值：`False`
- 描述：启用内存映射（即磁盘存储）

#### `QDRANT_PREFER_GRPC`

- 类型：`bool`
- 默认值：`False`
- 描述：尽可能使用 gRPC 接口

#### `QDRANT_GRPC_PORT`

- 类型：`int`
- 默认值：`6334`
- 描述：设置 Qdrant 的 gRPC 端口号。

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- 类型：`bool`
- 默认值：`False`
- 描述：启用 Qdrant 的多租户模式，用于集合管理。此模式可显著减少 RAM 使用和计算开销，通过合并类似的向量数据结构。建议启用。

:::info

这将断开此前非多租户模式创建的所有 Qdrant 集合。前往 `管理员设置` > `文档` > `重新索引知识库`，以迁移现有知识。

上一模式中创建的 Qdrant 集合仍将消耗资源。

目前，UI 中没有仅重置向量数据库的按钮。如果您想将知识迁移到多租户模式：
- 使用原生 Qdrant 客户端删除所有带有 `open_webui-knowledge` 前缀的集合（或使用 `open_webui` 前缀删除与 Open WebUI 相关的所有集合）
- 前往 `Admin Settings` > `Documents` > `Reindex Knowledge Base`，以迁移现有知识库

`Reindex Knowledge Base` 仅会迁移知识库

:::

:::danger

如果您决定将多租户模式作为默认模式并且无需迁移旧知识，可前往 `Admin Settings` > `Documents` 重置向量和知识，这将删除所有带有 `open_webui` 前缀的集合以及所有存储的知识。

:::

### Pinecone

使用 Pinecone 作为向量存储时，以下环境变量用于控制其行为。请确保在 `.env` 文件或部署环境中设置这些变量。

#### `PINECONE_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置用于与 Pinecone 服务进行身份验证的 API 密钥。

#### `PINECONE_ENVIRONMENT`

- 类型: `str`
- 默认值: `None`
- 描述: 指定要连接的 Pinecone 环境，例如 `us-west1-gcp`、`gcp-starter` 等。

#### `PINECONE_INDEX_NAME`

- 类型: `str`
- 默认值: `open-webui-index`
- 描述: 定义用于存储和查询向量嵌入的 Pinecone 索引名称。

#### `PINECONE_DIMENSION`

- 类型: `int`
- 默认值: `1536`
- 描述: 向量嵌入的维度。必须与索引所期望的维度匹配（基于使用模型，通常为 768、1024、1536 或 3072）。

#### `PINECONE_METRIC`

- 类型: `str`
- 默认值: `cosine`
- 可选项: `cosine`, `dotproduct`, `euclidean`
- 描述: 指定在 Pinecone 索引内向量比较时使用的相似性度量。

#### `PINECONE_CLOUD`

- 类型: `str`
- 默认值: `aws`
- 可选项: `aws`, `gcp`, `azure`
- 描述: 指定 Pinecone 索引托管的云服务提供商。

## RAG 内容提取引擎

#### `CONTENT_EXTRACTION_ENGINE`

- 类型: `str`
- 可选项:
  - 留空以使用默认值
  - `external` - 使用外部加载器
  - `tika` - 使用本地 Apache Tika 服务器
  - `docling` - 使用 Docling 引擎
  - `document_intelligence` - 使用 Document Intelligence 引擎
  - `mistral_ocr` - 使用 Mistral OCR 引擎
- 描述: 设置用于文档摄取的内容提取引擎。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `MISTRAL_OCR_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定要使用的 Mistral OCR API 密钥。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- 类型: `str`
- 默认值: `None`
- 描述: 设置外部文档加载服务的 URL。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置用于与外部文档加载服务进行身份验证的 API 密钥。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `TIKA_SERVER_URL`

- 类型: `str`
- 默认值: `http://localhost:9998`
- 描述: 设置 Apache Tika 服务器的 URL。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `DOCLING_SERVER_URL`

- 类型: `str`
- 默认值: `http://docling:5001`
- 描述: 指定 Docling 服务器的 URL。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `DOCLING_OCR_ENGINE`

- 类型: `str`  
- 默认值: `tesseract`  
- 描述: 指定由 Docling 使用的 OCR 引擎。  
  支持的值包括: `tesseract` (默认), `easyocr`, `ocrmac`, `rapidocr`, 和 `tesserocr`。  
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `DOCLING_OCR_LANG`

- 类型: `str`  
- 默认值: `eng,fra,deu,spa` (使用默认的 `tesseract` 引擎时)  
- 描述: 指定与配置的 `DOCLING_OCR_ENGINE` 一起使用的 OCR 语言。  
  格式和可用语言代码取决于选定的 OCR 引擎。  
- 持久性: 此环境变量为 `PersistentConfig` 变量。

## 检索增强生成 (RAG)

#### `RAG_EMBEDDING_ENGINE`

- 类型: `str`
- 可选项:
  - 留空为 `Default (SentenceTransformers)` - 使用 SentenceTransformers 进行嵌入。
  - `ollama` - 使用 Ollama API 进行嵌入。
  - `openai` - 使用 OpenAI API 进行嵌入。
- 描述: 选择用于 RAG 的嵌入引擎。
- 持久性: 此环境变量为 `PersistentConfig` 变量。

#### `RAG_EMBEDDING_MODEL`

- 类型: `str`
- 默认值: `sentence-transformers/all-MiniLM-L6-v2`
- 描述: 设置嵌入模型。本地使用 Sentence-Transformer 模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_RAG_HYBRID_SEARCH`

- 类型：`bool`
- 默认值：`False`
- 描述：启用使用`BM25`和`ChromaDB`的集合搜索，并使用`sentence_transformers`模型进行重新排序。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_TOP_K`

- 类型：`int`
- 默认值：`3`
- 描述：设置在使用RAG时嵌入所考虑的默认结果数量。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_TOP_K_RERANKER`

- 类型：`int`
- 默认值：`3`
- 描述：设置在使用RAG时重新排序器所考虑的默认结果数量。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_RELEVANCE_THRESHOLD`

- 类型：`float`
- 默认值：`0.0`
- 描述：设置在重新排序时考虑文档相关性的阈值。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_HYBRID_BM25_WEIGHT`

- 类型：`float`
- 默认值：`0.5`
- 描述：在混合搜索中设置分配给关键词搜索（BM25）的权重。1表示仅关键词搜索，0表示仅向量搜索。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_TEMPLATE`

- 类型：`str`
- 默认值：`DEFAULT_RAG_TEMPLATE`环境变量的值。

`DEFAULT_RAG_TEMPLATE`：

```
### 任务：
使用提供的上下文回答用户查询，并在**只有当<source>标签包含明确的id属性时**，以格式[id]加入内联引用（例如：<source id="1">）。

### 指南：
- 如果你不知道答案，请明确说明。
- 如果不确定，请询问用户进一步澄清。
- 使用与用户查询语言一致的语言回复。
- 如果上下文不可读取或质量较差，请告知用户并尽力提供最好的答案。
- 如果答案不在上下文中但你能回答，向用户说明此情况并依据自己的理解提供答案。
- **仅当<source>标签包含id属性时，才使用格式[id]（例如：[1], [2]）加入内联引用。**
- 如果<source>标签未包含id属性，不要引用。
- 回复中不要使用XML标签。
- 确保引用简洁且直接相关。

### 引用示例：
如果用户询问特定主题，而信息存在于带有id属性的source中，回复应如以下示例加入引用：
* "根据研究结果，所提出的方法提高了效率20%[1]。"

### 输出：
提供用户查询的清晰直接回答，仅当上下文中含有id属性的<source>标签时，添加格式为[id]的内联引用。

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- 描述：用于向聊天补全中注入RAG文档的模板。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_TEXT_SPLITTER`

- 类型：`str`
- 选项：
  - `character`
  - `token`
- 默认值：`character`
- 描述：为RAG模型设置文本分割器。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `TIKTOKEN_CACHE_DIR`

- 类型：`str`
- 默认值：`{CACHE_DIR}/tiktoken`
- 描述：设置TikToken缓存的目录。

#### `TIKTOKEN_ENCODING_NAME`

- 类型：`str`
- 默认值：`cl100k_base`
- 描述：设置TikToken的编码名称。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `CHUNK_SIZE`

- 类型：`int`
- 默认值：`1000`
- 描述：为嵌入设置文档块大小。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `CHUNK_OVERLAP`

- 类型：`int`
- 默认值：`100`
- 描述：指定块之间的重叠量。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `PDF_EXTRACT_IMAGES`

- 类型：`bool`
- 默认值：`False`
- 描述：使用OCR从PDF中提取图像以加载文档。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_FILE_MAX_SIZE`

- 类型：`int`
- 描述：设置可以上传用于文档提取的文件的最大大小（以兆字节为单位）。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_FILE_MAX_COUNT`

- 类型：`int`
- 描述：设置一次性可以上传用于文档提取的最大文件数量。
- 持久性：此环境变量是一个`PersistentConfig`变量。

:::info

配置`RAG_FILE_MAX_SIZE`和`RAG_FILE_MAX_COUNT`时，请确保值设置合理，以防止过多文件上传及潜在的性能问题。

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- 类型：`list` of `str`
- 默认值：`[]`（这意味着允许所有支持的文件类型）
- 描述：指定允许上传的文件扩展类型。

```json
["pdf,docx,txt"]
```

- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_RERANKING_MODEL`

- 类型：`str`
- 描述：设置用于排序的模型。本地使用 Sentence-Transformer 模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_OPENAI_API_BASE_URL`

- 类型：`str`
- 默认值：`${OPENAI_API_BASE_URL}`
- 描述：设置用于 RAG 嵌入的 OpenAI 基础 API URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_OPENAI_API_KEY`

- 类型：`str`
- 默认值：`${OPENAI_API_KEY}`
- 描述：设置用于 RAG 嵌入的 OpenAI API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- 类型：`int`
- 默认值：`1`
- 描述：设置 OpenAI 嵌入的批量大小。

#### `RAG_EMBEDDING_BATCH_SIZE`

- 类型：`int`
- 默认值：`1`
- 描述：设置 RAG（检索增强生成器）模型嵌入的批量大小。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_OLLAMA_API_KEY`

- 类型：`str`
- 描述：设置用于 RAG 模型的 Ollama API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_OLLAMA_BASE_URL`

- 类型：`str`
- 描述：设置用于 RAG 模型的 Ollama API 基础 URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用检索查询生成。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- 类型：`str`
- 默认值：`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`环境变量的值。

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`：

```
### 任务:
分析聊天历史以确定是否需要生成搜索查询，基于指定语言。默认情况下，**优先生成1-3个宽泛且相关的搜索查询**，除非确信不需要额外信息。目标是获取全面、最新且有价值的信息，即便只有极小的不确定性。如果确定无需搜索，请返回空列表。

### 指南:
- **仅**以 JSON 对象回应。严禁任何形式的额外评论、解释或附加文本。
- 生成搜索查询时，请以如下格式回应：{ "queries": ["查询1", "查询2"] }，确保每个查询都是独特的、简明的且与主题相关。
- 仅在完全确定无法通过搜索获取有用结果时，返回：{ "queries": [] }。
- 如果**有可能**提供有用或最新信息，倾向于建议搜索查询。
- 精简并专注于高质量搜索查询的构建，避免不必要的详细说明、评论或假设。
- 今天的日期是：{{CURRENT_DATE}}。
- 始终优先提供可操作且覆盖信息广泛的查询。

### 输出:
严格以 JSON 格式返回：
{
  "queries": ["查询1", "查询2"]
}

### 聊天历史:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述：设置查询生成的提示模板。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- 类型：`bool`
- 默认值：`False`
- 描述：绕过嵌入和检索过程。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- 类型：`str`
- 默认值：`None`
- 描述：指定文档智能的端点。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `DOCUMENT_INTELLIGENCE_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：指定文档智能的密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用 RAG 的本地网页抓取。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- 类型：`str`
- 默认值：`None`
- 描述：指定 RAG 嵌入内容的前缀。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- 类型：`str`
- 默认值：`None`
- 描述：指定 RAG 嵌入前缀的字段名称。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_EMBEDDING_QUERY_PREFIX`

- 类型：`str`
- 默认值：`None`
- 描述：指定 RAG 嵌入查询的前缀。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `RAG_FULL_CONTEXT`

- 类型: `bool`
- 默认值: `False`
- 描述: 指定是否使用完整上下文进行 RAG。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用 Google Drive 集成。如果设置为 true，并且同时配置了 `GOOGLE_DRIVE_CLIENT_ID` 和 `GOOGLE_DRIVE_API_KEY`，Google Drive 将作为聊天界面中的上传选项出现。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::info

启用 `GOOGLE_DRIVE_INTEGRATION` 时，请确保正确配置 `GOOGLE_DRIVE_CLIENT_ID` 和 `GOOGLE_DRIVE_API_KEY`，并已审阅 Google 的服务条款和使用指南。

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- 类型: `str`
- 描述: 设置 Google Drive 的客户端 ID（客户端必须启用 Drive API 和 Picker API）。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_DRIVE_API_KEY`

- 类型: `str`
- 描述: 设置 Google Drive 集成的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用 OneDrive 集成。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ONEDRIVE_CLIENT_ID`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 OneDrive 集成的客户端 ID。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

## Web 搜索

#### `ENABLE_WEB_SEARCH`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用 Web 搜索开关。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `ENABLE_SEARCH_QUERY_GENERATION`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用搜索查询生成。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WEB_SEARCH_TRUST_ENV`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用由 `http_proxy` 和 `https_proxy` 设置的代理，用于 Web 搜索内容获取。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WEB_SEARCH_RESULT_COUNT`

- 类型: `int`
- 默认值: `3`
- 描述: 爬取的最大搜索结果数量。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- 类型: `int`
- 默认值: `10`
- 描述: 从搜索结果返回的网页并发请求数量。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WEB_SEARCH_ENGINE`

- 类型: `str`
- 选项:
  - `searxng` - 使用 [SearXNG](https://github.com/searxng/searxng) 搜索引擎。
  - `google_pse` - 使用 [Google 可编程搜索引擎](https://programmablesearchengine.google.com/about/)。
  - `brave` - 使用 [Brave 搜索引擎](https://brave.com/search/api/)。
  - `kagi` - 使用 [Kagi](https://www.kagi.com/) 搜索引擎。
  - `mojeek` - 使用 [Mojeek](https://www.mojeek.com/) 搜索引擎。
  - `bocha` - 使用 Bocha 搜索引擎。
  - `serpstack` - 使用 [Serpstack](https://serpstack.com/) 搜索引擎。
  - `serper` - 使用 [Serper](https://serper.dev/) 搜索引擎。
  - `serply` - 使用 [Serply](https://serply.io/) 搜索引擎。
  - `searchapi` - 使用 [SearchAPI](https://www.searchapi.io/) 搜索引擎。
  - `serpapi` - 使用 [SerpApi](https://serpapi.com/) 搜索引擎。
  - `duckduckgo` - 使用 [DuckDuckGo](https://duckduckgo.com/) 搜索引擎。
  - `tavily` - 使用 [Tavily](https://tavily.com/) 搜索引擎。
  - `jina` - 使用 [Jina](https://jina.ai/) 搜索引擎。
  - `bing` - 使用 [Bing](https://www.bing.com/) 搜索引擎。
  - `exa` - 使用 [Exa](https://exa.ai/) 搜索引擎。
  - `perplexity` - 使用 [Perplexity AI](https://www.perplexity.ai/) 搜索引擎。
  - `sougou` - 使用 [搜狗](https://www.sogou.com/) 搜索引擎。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- 类型: `bool`
- 默认值: `False`
- 描述: 跳过 Web 搜索嵌入和检索过程。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `SEARXNG_QUERY_URL`

- 类型: `str`
- 描述: 支持 JSON 输出的 [SearXNG 搜索 API](https://docs.searxng.org/dev/search_api.html) URL。`<query>` 会替换为搜索查询。例如: `http://searxng.local/search?q=<query>`
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_PSE_API_KEY`

- 类型: `str`
- 描述: 设置 Google 可编程搜索引擎 (PSE) 服务的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `GOOGLE_PSE_ENGINE_ID`

- 类型: `str`
- 描述: Google 可编程搜索引擎 (PSE) 服务的引擎 ID。
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
- 描述: 配置 Serpstack 请求是否使用 HTTPS。免费等级的请求仅限于 HTTP。
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

### 网络加载器配置

#### `WEB_LOADER_ENGINE`

- 类型: `str`
- 默认值: `safe_web`
- 描述: 指定用于获取和处理网络内容的加载器。
- 选项:
  - `requests` - 使用带有增强错误处理的 Requests 模块。
  - `playwright` - 使用 Playwright 提供更高级的网页渲染和交互。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::info

使用 `playwright` 时，你有两种选择:

1. 如果未设置 `PLAYWRIGHT_WS_URI`，Playwright 连带 Chromium 依赖将在启动 Open WebUI 容器时自动安装。
2. 如果设置了 `PLAYWRIGHT_WS_URI`，则 Open WebUI 将连接到远程浏览器实例，而不是本地安装依赖项。

:::

#### `PLAYWRIGHT_WS_URL`

- 类型: `str`
- 默认值: `None`
- 描述: 指定远程 Playwright 浏览器实例的 WebSocket URI。当设置时，Open WebUI 会使用此远程浏览器，而不是在本地安装浏览器依赖。这在容器化环境中特别有用，可使 Open WebUI 容器更轻量化，并与浏览器相关模块分离。示例: `ws://playwright:3000`
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

:::提示

通过 `PLAYWRIGHT_WS_URL` 使用远程 Playwright 浏览器可能带来的好处包括:

- 减小 Open WebUI 容器的大小
- 使用默认 Chromium 之外的其他浏览器
- 连接到非无头（GUI）浏览器

:::

#### `FIRECRAWL_API_BASE_URL`

- 类型: `str`
- 默认值: `https://api.firecrawl.dev`
- 描述: 设置 Firecrawl API 的基础 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `FIRECRAWL_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 Firecrawl API 的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `PERPLEXITY_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 设置 Perplexity API 的 API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `PLAYWRIGHT_TIMEOUT`

- 类型: `int`
- 默认值: 空字符串 (`' '`)，因为默认值设置为 `None`。
- 描述: 指定 Playwright 请求的超时时间。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### YouTube加载器

#### `YOUTUBE_LOADER_PROXY_URL`

- 类型: `str`
- 描述: 设置 YouTube 加载器的代理 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `YOUTUBE_LOADER_LANGUAGE`

- 类型: `str`
- 默认值: `en`
- 描述: 以逗号分隔的语言代码列表，用于按优先级顺序尝试获取 YouTube 视频字幕。
- 示例: 如果设置为 `es,de`，会优先尝试获取西班牙语字幕，如果西班牙语字幕不可用，则尝试德语，最后尝试英语。如果指定的语言均不可用且列表中未包含 `en`，系统会自动以英语作为最终回退选项。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

## 音频

### Whisper语音转文本（本地）

#### `WHISPER_MODEL`

- 类型: `str`
- 默认值: `base`
- 描述: 设置用于语音转文本的 Whisper 模型。其后台使用 faster_whisper 并量化为 `int8`。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WHISPER_MODEL_DIR`

- 类型: `str`
- 默认值: `${DATA_DIR}/cache/whisper/models`
- 描述: 指定存储 Whisper 模型文件的目录。

#### `WHISPER_VAD_FILTER`

- 类型: `bool`
- 默认值: `False`
- 描述: 指定是否对 Whisper 语音转文本应用语音活动检测(VAD)过滤器。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `WHISPER_MODEL_AUTO_UPDATE`

- 类型: `bool`
- 默认值: `False`
- 描述: 切换是否自动更新 Whisper 模型。

#### `WHISPER_LANGUAGE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 Whisper 用于语音转文本的 ISO 639-1语言代码（夏威夷语和粤语使用ISO 639-2）。Whisper 默认为自动预测语言。

### 语音转文本（OpenAI）

#### `AUDIO_STT_ENGINE`

- 类型: `str`
- 选项:
  - 留空以使用内置的本地 Whisper 语音转文本引擎。
  - `openai` - 使用 OpenAI 引擎进行语音转文本。
  - `deepgram` - 使用 Deepgram 引擎进行语音转文本。
  - `azure` - 使用 Azure 引擎进行语音转文本。
- 描述: 指定使用的语音转文本引擎。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_MODEL`

- 类型: `str`
- 默认值: `whisper-1`
- 描述: 指定用于 OpenAI 兼容端点的语音转文本模型。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- 类型: `str`
- 默认值: `${OPENAI_API_BASE_URL}`
- 描述: 设置用于语音转文本的 OpenAI 兼容基础 URL。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_OPENAI_API_KEY`

- 类型: `str`
- 默认值: `${OPENAI_API_KEY}`
- 描述: 设置用于语音转文本的 OpenAI API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 语音转文本 (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于语音转文本的 Azure API 密钥。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_AZURE_REGION`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于语音转文本的 Azure 区域。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

#### `AUDIO_STT_AZURE_LOCALES`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于 Azure 语音转文本的语言地区。
- 持久性: 此环境变量是一个 `PersistentConfig` 变量。

### 语音转文本 (Deepgram)

#### `DEEPGRAM_API_KEY`

- 类型: `str`
- 默认值: `None`
- 描述: 指定用于语音转文本的 Deepgram API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### 文本转语音

#### `AUDIO_TTS_API_KEY`

- 类型：`str`
- 描述：设置文本转语音的 API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_ENGINE`

- 类型：`str`
- 选项：
  - 留空以使用文本转语音的内建 WebAPI 引擎。
  - `azure` - 使用 Azure 文本转语音引擎。
  - `elevenlabs` - 使用 ElevenLabs 文本转语音引擎。
  - `openai` - 使用 OpenAI 文本转语音引擎。
  - `transformers` - 使用 SentenceTransformers 文本转语音引擎。
- 描述：指定使用哪个文本转语音引擎。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_MODEL`

- 类型：`str`
- 默认值：`tts-1`
- 描述：指定使用的 OpenAI 文本转语音模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_VOICE`

- 类型：`str`
- 默认值：`alloy`
- 描述：设置使用的 OpenAI 文本转语音语音。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_SPLIT_ON`

- 类型：`str`
- 默认值：`punctuation`
- 描述：设置文本转语音的分割依据。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### Azure 文本转语音

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- 类型：`str`
- 描述：设置 Azure 文本转语音的区域。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- 类型：`str`
- 描述：设置 Azure 文本转语音的输出格式。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### OpenAI 文本转语音

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- 类型：`str`
- 默认值：`${OPENAI_API_BASE_URL}`
- 描述：设置用于文本转语音的 OpenAI 兼容基本 URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUDIO_TTS_OPENAI_API_KEY`

- 类型：`str`
- 默认值：`${OPENAI_API_KEY}`
- 描述：设置用于文本转语音的 API 密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

## 图像生成

#### `IMAGE_GENERATION_ENGINE`

- 类型：`str`
- 选项：
  - `openai` - 使用 OpenAI 的 DALL-E 进行图像生成。
  - `comfyui` - 使用 ComfyUI 引擎进行图像生成。
  - `automatic1111` - 使用 AUTOMATIC1111 引擎进行图像生成。
  - `gemini` - 使用 Gemini 进行图像生成。
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
- 描述：启用或禁用图像提示生成功能。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- 类型：`str`
- 默认值：`None`
- 描述：指定用于生成图像提示的模板。
- 持久性：此环境变量是一个`PersistentConfig`变量。

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### 任务：
根据给定语言和上下文，为图像生成任务生成详细的提示。形象地描述图像，就像在向看不见的人解释一样。包括相关细节、颜色、形状以及任何其他重要元素。

### 指南：
- 详细且描述性，着重于图像最重要方面。
- 避免假设或添加图像中不存在的信息。
- 使用聊天的主要语言；如果为多语言场景，默认为英语。
- 如果图像过于复杂，着重于最突出的元素。

### 输出：
仅用 JSON 格式返回：
{
    "prompt": "在此填写您的详细描述。"
}

### 聊天记录：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- 类型：`str`
- 默认值：`512x512`
- 描述：设置生成图像的默认大小。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_STEPS`

- 类型：`int`
- 默认值：`50`
- 描述：设置图像生成的默认迭代步数。用于 ComfyUI 和 AUTOMATIC1111。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `IMAGE_GENERATION_MODEL`

- 类型：`str`
- 描述：指定默认图像生成模型。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- 类型：`str`
- 描述：指定 AUTOMATIC1111 的稳定扩散 API 的 URL。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `AUTOMATIC1111_API_AUTH`

- 类型：`str`
- 描述：设置 AUTOMATIC1111 API 的认证。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_CFG_SCALE`

- 类型：`float`
- 描述：设置 AUTOMATIC1111 推理的配置比例。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_SAMPLER`

- 类型：`str`
- 描述：设置 AUTOMATIC1111 推理的采样器。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `AUTOMATIC1111_SCHEDULER`

- 类型：`str`
- 描述：设置 AUTOMATIC1111 推理的调度器。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### ComfyUI

#### `COMFYUI_BASE_URL`

- 类型：`str`
- 描述：指定访问 ComfyUI 图像生成 API 的 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `COMFYUI_API_KEY`

- 类型：`str`
- 描述：设置 ComfyUI 的 API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `COMFYUI_WORKFLOW`

- 类型：`str`
- 默认值：

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
      "title": "空的潜在图像"
    }
  },
  "6": {
    "inputs": {
      "text": "提示",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP 文本编码 (提示)"
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
      "title": "CLIP 文本编码 (提示)"
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

- 描述：设置 ComfyUI 的工作流程。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### Gemini

#### `GEMINI_API_BASE_URL`

- 类型：`str`
- 默认值：`None`
- 描述：指定访问 Gemini 的 API 的 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `GEMINI_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：设置 Gemini 的 API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_GEMINI_API_BASE_URL`

- 类型：`str`
- 默认值：`None`
- 描述：指定访问 Gemini 图像生成 API的 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_GEMINI_API_KEY`

- 类型：`str`
- 默认值：`None`
- 描述：设置用于图像生成的 Gemini API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- 类型：`str`
- 默认值：`${OPENAI_API_BASE_URL}`
- 描述：设置用于 DALL-E 图像生成的 OpenAI 兼容基本 URL。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `IMAGES_OPENAI_API_KEY`

- 类型：`str`
- 默认值：`${OPENAI_API_KEY}`
- 描述：设置用于 DALL-E 图像生成的 API 密钥。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- 类型：`bool`
- 默认值：`False`
- 描述：启用通过 OAuth 注册时的账户创建功能，区别于 `ENABLE_SIGNUP`。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

:::danger

`ENABLE_LOGIN_FORM` 必须设置为 `False`，当 `ENABLE_OAUTH_SIGNUP` 设置为 `True` 时。如果不这样操作，将导致无法登录。

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- 类型：`bool`
- 默认值：`False`
- 描述：如果启用，将通过邮箱合并 OAuth 账户与现有账户。这种方式存在风险，因为并非所有 OAuth 提供商都会验证邮箱地址，可能导致账户被接管。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- 类型：`bool`
- 默认值：`False`
- 描述：如果启用，在登录时将使用OAuth提供的图片更新本地用户资料图片。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- 类型：`str`
- 描述：定义用于身份验证的受信请求头。参见 [单点登录文档](/features/sso)。

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- 类型：`str`
- 描述：定义用于注册时用户名的受信请求头，该请求头关联`WEBUI_AUTH_TRUSTED_EMAIL_HEADER`。参见 [单点登录文档](/features/sso)。

### Google

参见 https://support.google.com/cloud/answer/6158849?hl=en

#### `GOOGLE_CLIENT_ID`

- 类型：`str`
- 描述：设置Google OAuth的客户端ID。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_CLIENT_SECRET`

- 类型：`str`
- 描述：设置Google OAuth的客户端密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_OAUTH_SCOPE`

- 类型：`str`
- 默认值：`openid email profile`
- 描述：设置Google OAuth身份验证的范围。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GOOGLE_REDIRECT_URI`

- 类型：`str`
- 默认值：`<backend>/oauth/google/callback`
- 描述：设置Google OAuth的重定向URI。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### Microsoft

参见 https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- 类型：`str`
- 描述：设置Microsoft OAuth的客户端ID。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `MICROSOFT_CLIENT_SECRET`

- 类型：`str`
- 描述：设置Microsoft OAuth的客户端密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `MICROSOFT_CLIENT_TENANT_ID`

- 类型：`str`
- 描述：设置Microsoft OAuth的租户ID。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `MICROSOFT_OAUTH_SCOPE`

- 类型：`str`
- 默认值：`openid email profile`
- 描述：设置Microsoft OAuth身份验证的范围。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `MICROSOFT_REDIRECT_URI`

- 类型：`str`
- 默认值：`<backend>/oauth/microsoft/callback`
- 描述：设置Microsoft OAuth的重定向URI。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### GitHub

参见 https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- 类型：`str`
- 描述：设置GitHub OAuth的客户端ID。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GITHUB_CLIENT_SECRET`

- 类型：`str`
- 描述：设置GitHub OAuth的客户端密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GITHUB_CLIENT_SCOPE`

- 类型：`str`
- 默认值：`user:email`
- 描述：指定GitHub OAuth身份验证的范围。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `GITHUB_CLIENT_REDIRECT_URI`

- 类型：`str`
- 默认值：`<backend>/oauth/github/callback`
- 描述：设置GitHub OAuth的重定向URI。
- 持久性：此环境变量是一个`PersistentConfig`变量。

### OpenID（OIDC）

#### `OAUTH_CLIENT_ID`

- 类型：`str`
- 描述：设置OIDC的客户端ID。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_CLIENT_SECRET`

- 类型：`str`
- 描述：设置OIDC的客户端密钥。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OPENID_PROVIDER_URL`

- 类型：`str`
- 描述：路径位于`.well-known/openid-configuration`端点
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OPENID_REDIRECT_URI`

- 类型：`str`
- 默认值：`<backend>/oauth/oidc/callback`
- 描述：设置OIDC的重定向URI
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_SCOPES`

- 类型：`str`
- 默认值：`openid email profile`
- 描述：设置OIDC身份验证的范围。`openid`和`email`是必需的。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_CODE_CHALLENGE_METHOD`

- 类型：`str`
- 默认值：空字符串（&apos; &apos;），因为默认设置为`None`。
- 描述：指定OAuth身份验证的代码挑战方法。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_PROVIDER_NAME`

- 类型：`str`
- 默认值：`SSO`
- 描述：设置OIDC提供者的名称。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_USERNAME_CLAIM`

- 类型：`str`
- 默认值：`name`
- 描述：设置OpenID的用户名声明。
- 持久性：此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_EMAIL_CLAIM`

- 类型：`str`
- 默认值：`email`
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
- 描述: 指定OAuth认证的组声明。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用OAuth委托的角色管理。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- 类型: `bool`
- 默认值: `False`
- 描述: 启用或禁用OAuth组管理功能。
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
- 描述: 设置被视为管理员的角色。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `OAUTH_ALLOWED_DOMAINS`

- 类型: `str`
- 默认值: `*`
- 描述: 指定OAuth认证允许的域。（例如："example1.com,example2.com"）。
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
- 描述: 设置LDAP认证中用作邮件的属性。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- 类型: `str`
- 描述: 设置LDAP认证中用作用户名的属性。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_APP_DN`

- 类型: `str`
- 描述: 设置LDAP应用程序的专有名称（DN）。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_APP_PASSWORD`

- 类型: `str`
- 描述: 设置LDAP应用程序的密码。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_BASE`

- 类型: `str`
- 描述: 设置LDAP认证的搜索基础。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_FILTER`

- 类型: `str`
- 默认值: `None`
- 描述: 设置用于LDAP搜索的单个过滤器。`LDAP_SEARCH_FILTERS`的替代选项。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_SEARCH_FILTERS`

- 类型: `str`
- 描述: 设置用于LDAP搜索的过滤器。
- 持久性: 此环境变量是一个`PersistentConfig`变量。

#### `LDAP_USE_TLS`

- 类型: `bool`
- 默认值: `True`
- 描述: 启用或禁用LDAP连接中的TLS。
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
- 描述: 设置LDAP连接使用的加密套件。
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
- 描述：启用或禁用用户上传文件到聊天的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_DELETE`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用用户删除聊天的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_EDIT`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用用户编辑聊天的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_STT`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用用户在聊天中使用语音转文本的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_TTS`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用用户在聊天中使用文本转语音的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_CALL`

- 类型：`str`
- 默认值：`True`
- 描述：启用或禁用用户在聊天中拨打电话的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- 类型：`str`
- 默认值：`True`
- 描述：启用或禁用用户在聊天中使用多个模型的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- 类型：`bool`
- 默认值：`True`
- 描述：启用或禁用用户创建临时聊天的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用用户强制使用临时聊天的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### 功能权限

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用用户访问直接工具服务器的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- 类型：`str`
- 默认值：`True`
- 描述：启用或禁用用户使用网页搜索功能的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- 类型：`str`
- 默认值：`True`
- 描述：启用或禁用用户使用图像生成功能的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- 类型：`str`
- 默认值：`True`
- 描述：启用或禁用用户使用代码解释器功能的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

### 工作区权限

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用用户访问工作区模型的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用用户访问工作区知识的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用用户访问工作区提示的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- 类型：`bool`
- 默认值：`False`
- 描述：启用或禁用用户访问工作区工具的权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用工作区模型的公开共享权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用工作区知识的公开共享权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用工作区提示的公开共享权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- 类型：`str`
- 默认值：`False`
- 描述：启用或禁用工作区工具的公开共享权限。
- 持久性：此环境变量是一个 `PersistentConfig` 变量。

## 其他环境变量

这些变量不特定于 Open WebUI，但在某些情况下仍可能有价值。

### 云存储

#### `STORAGE_PROVIDER`

- 类型: `str`
- 选项:
  - `s3` - 使用 S3 客户端库及相关环境变量，详见 [Amazon S3 存储](#amazon-s3-storage)
  - `gcs` - 使用 GCS 客户端库及相关环境变量，详见 [Google Cloud 存储](#google-cloud-storage)
  - `azure` - 使用 Azure 客户端库及相关环境变量，详见 [Microsoft Azure 存储](#microsoft-azure-storage)
- 默认值: 空字符串 (&apos; &apos;)，默认为 `local`
- 描述: 设置存储服务提供商。

#### Amazon S3 存储

#### `S3_ACCESS_KEY_ID`

- 类型: `str`
- 描述: 设置 S3 存储的访问密钥 ID。

#### `S3_ADDRESSING_STYLE`

- 类型: `str`
- 默认值: `None`
- 描述: 指定 S3 存储的寻址方式（例如 &apos;path&apos; 或 &apos;virtual&apos;）。

#### `S3_BUCKET_NAME`

- 类型: `str`
- 描述: 设置 S3 存储的 Bucket 名称。

#### `S3_ENDPOINT_URL`

- 类型: `str`
- 描述: 设置 S3 存储的端点 URL。

#### `S3_KEY_PREFIX`

- 类型: `str`
- 描述: 设置 S3 对象的键前缀。

#### `S3_REGION_NAME`

- 类型: `str`
- 描述: 设置 S3 存储的区域名称。

#### `S3_SECRET_ACCESS_KEY`

- 类型: `str`
- 描述: 设置 S3 存储的访问密钥。

#### `S3_USE_ACCELERATE_ENDPOINT`

- 类型: `str`
- 默认值: `False`
- 描述: 指定是否使用加速端点进行 S3 存储。

#### `S3_ENABLE_TAGGING`

- 类型: `str`
- 默认值: `False`
- 描述: 启用 S3 对象标记以便更好地组织、搜索以及与文件管理策略集成。当使用 Cloudflare R2 时始终设置为 `False`，因为 R2 不支持对象标记功能。

#### Google Cloud 存储

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- 类型: `str`
- 描述: Google Application Credentials JSON 文件内容。
  - 可选 - 如果未提供，将从环境中获取凭据。本地运行时使用用户凭据，运行在 Google Compute Engine 上时使用 Google 元数据服务器。
  - 可以根据此[指南](https://developers.google.com/workspace/guides/create-credentials#service-account)为服务账号生成文件。

#### `GCS_BUCKET_NAME`

- 类型: `str`
- 描述: 设置 Google Cloud 存储的 Bucket 名称。Bucket必须已存在。

#### Microsoft Azure 存储

#### `AZURE_STORAGE_ENDPOINT`

- 类型: `str`
- 描述: 设置 Azure 存储的端点 URL。

#### `AZURE_STORAGE_CONTAINER_NAME`

- 类型: `str`
- 描述: 设置 Azure 存储的容器名称。

#### `AZURE_STORAGE_KEY`

- 类型: `str`
- 描述: 设置 Azure 存储的访问密钥。
  - 可选 - 如果未提供，将从环境中获取凭据。本地运行时使用用户凭据，在 Azure 服务中运行时使用托管身份。

### 数据库连接池

#### `DATABASE_URL`

- 类型: `str`
- 默认值: `sqlite:///${DATA_DIR}/webui.db`
- 描述: 指定要连接的数据库 URL。

:::info

支持 SQLite 和 Postgres。更改 URL 不会迁移数据库之间的数据。
有关 URL 方案的文档可以在[此处](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)找到。

:::

#### `DATABASE_SCHEMA`

- 类型: `str`
- 默认值: `None`
- 描述: 指定要连接的数据库架构。

#### `DATABASE_POOL_SIZE`

- 类型: `int`
- 默认值: `0`
- 描述: 指定数据库连接池的大小。设置为 `0` 禁用连接池。

#### `DATABASE_POOL_MAX_OVERFLOW`

- 类型: `int`
- 默认值: `0`
- 描述: 指定数据库连接池的最大溢出。

:::info

有关此设置的更多信息可以在[此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)找到。

:::

#### `DATABASE_POOL_TIMEOUT`

- 类型: `int`
- 默认值: `30`
- 描述: 指定数据库连接池等待获取连接的超时时间（以秒为单位）。

:::info

有关此设置的更多信息可以在[此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)找到。

:::

#### `DATABASE_POOL_RECYCLE`

- 类型: `int`
- 默认值: `3600`
- 描述: 指定数据库连接池的回收时间（以秒为单位）。

:::info

有关此设置的更多信息可以在[此处](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)找到。

:::

### Redis

#### `REDIS_URL`

- 类型: `str`
- 示例: `redis://localhost:6379/0`
- 描述: 指定用于应用状态的 Redis 实例的 URL。

:::info

在部署多节点/工作器集群的 Open-WebUI 时，必须确保设置 REDIS_URL 值。否则，应用状态将出现会话、持久性及一致性问题，因为工作器间无法通信。

:::

#### `REDIS_SENTINEL_HOSTS`

- 类型: `str`
- 描述：用于应用状态的 Redis Sentinel 的逗号分隔列表。如果指定了，则 `REDIS_URL` 中的 "hostname" 将被解释为 Sentinel 服务名称。

#### `REDIS_SENTINEL_PORT`

- 类型：`int`
- 默认值：`26379`
- 描述：用于应用状态 Redis 的 Sentinel 端口。

#### `ENABLE_WEBSOCKET_SUPPORT`

- 类型：`bool`
- 默认值：`True`
- 描述：启用 Open WebUI 的 Websocket 支持。

:::info

当在多节点/工作器集群中部署 Open-WebUI 时，请确保设置 ENABLE_WEBSOCKET_SUPPORT 的值。如果未设置，将会出现 Websocket 的一致性和持久性问题。

:::

#### `WEBSOCKET_MANAGER`

- 类型：`str`
- 默认值：`redis`
- 描述：指定要使用的 Websocket 管理器（在这种情况下为 Redis）。

:::info

当在多节点/工作器集群中部署 Open-WebUI 时，请确保设置 WEBSOCKET_MANAGER 的值，并使用 Redis 类的键值型 NoSQL 数据库。如果未设置，将会出现 Websocket 的一致性和持久性问题。

:::

#### `WEBSOCKET_REDIS_URL`

- 类型：`str`
- 默认值：`${REDIS_URL}`
- 描述：指定用于 Websocket 通信的 Redis 实例 URL。它不同于 `REDIS_URL`，实际中推荐同时设置两者。

:::info

当在多节点/工作器集群中部署 Open-WebUI 时，请确保设置 WEBSOCKET_REDIS_URL 的值，并使用 Redis 类的键值型 NoSQL 数据库。如果未设置，将会出现 Websocket 的一致性和持久性问题。

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- 类型：`str`
- 描述：用于 Websocket 的 Redis Sentinel 的逗号分隔列表。如果指定了，则 `WEBSOCKET_REDIS_URL` 中的 "hostname" 将被解释为 Sentinel 服务名称。

#### `WEBSOCKET_SENTINEL_PORT`

- 类型：`int`
- 默认值：`26379`
- 描述：用于 Websocket Redis 的 Sentinel 端口。

### Uvicorn 设置

#### `UVICORN_WORKERS`

- 类型：`int`
- 默认值：`1`
- 描述：控制 Uvicorn 用于处理请求的工作进程数量。每个工作器在单独的进程中运行应用实例。

:::info

在像 Kubernetes 或 Helm charts 这样的编排环境中部署时，建议将 UVICORN_WORKERS 设置为 1。容器编排平台已经通过 Pod 复制提供了自己的扩展机制，在容器内使用多个工作器可能导致资源分配问题并复杂化水平扩展策略。

如果使用 UVICORN_WORKERS，还需要确保为可扩展的多实例设置设定相关环境变量。

:::

### 代理设置

Open WebUI 支持使用代理进行 HTTP 和 HTTPS 检索。要指定代理设置，
Open WebUI 使用以下环境变量：

#### `http_proxy`

- 类型：`str`
- 描述：设置 HTTP 代理的 URL。

#### `https_proxy`

- 类型：`str`
- 描述：设置 HTTPS 代理的 URL。

#### `no_proxy`

- 类型：`str`
- 描述：列出不使用代理的域扩展（或 IP 地址），
用逗号分隔。例如，将 no_proxy 设置为 &apos;.mit.edu&apos; 可确保在访问 MIT 的文档时绕过代理。

### 安装所需的 Python 包

Open WebUI 提供了环境变量来自定义 pip 安装过程。以下是 Open WebUI 用于调整包安装行为的环境变量：

#### `PIP_OPTIONS`

- 类型：`str`
- 描述：指定 pip 安装包时应使用的附加命令行选项。例如，可以包含 `--upgrade`、`--user` 或 `--no-cache-dir` 等标志来控制安装过程。

#### `PIP_PACKAGE_INDEX_OPTIONS`

- 类型：`str`
- 描述：定义 pip 的自定义包索引行为。这可以包括指定附加或备用索引 URL（例如 `--extra-index-url`）、认证凭据或管理从不同位置检索包的其他参数。
