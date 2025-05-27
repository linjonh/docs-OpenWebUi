---
sidebar_position: 4
title: "🌍 環境變數配置"
---


## 概述

Open WebUI 提供大量的環境變數，允許您自定義和配置應用程序的各種方面。本頁面作為所有可用環境變數的全面參考，提供其類型、默認值和描述。
隨著新變數的引入，本頁面將更新以反映越來越多的配置選項。

:::info

本頁面與 Open WebUI 發布版本 [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9) 保持同步，但仍在進行改進以後期包含更準確的描述，列出環境變數的可用選項、默認值並改善描述。

:::

### 《PersistentConfig》環境變數的重要說明

:::note

首次啟動 Open WebUI 時，所有環境變數被平等地對待並可用於配置應用程序。然而，對於標記為《PersistentConfig》的環境變數，其值將被持久化並存儲於內部。

在首次啟動後，如果您重啟容器，《PersistentConfig》環境變數將不再使用外部的環境變數值，而是使用內部存儲的值。

相比之下，普通環境變數在每次重啟後將繼續被更新和應用。

您可以直接從 Open WebUI 中更新《PersistentConfig》環境變數的值，這些更改將存儲於內部。這使您可以獨立於外部環境變數管理這些配置設置。

請注意，《PersistentConfig》環境變數在下面的文檔中有明確標記，以便您了解它們的行為方式。

:::

## 應用程序/後端

以下環境變數由 `backend/open_webui/config.py` 使用，以提供 Open WebUI 啟動配置。請注意，某些變數的默認值可能會因您直接運行 Open WebUI 或通過 Docker 運行而有所不同。有關日誌環境變數的更多信息，請參閱我們的[日誌文檔](https://docs.openwebui.com/getting-started/advanced-topics/logging)。

### 通用

#### `WEBUI_URL`

- 類型: `str`
- 默認值: `http://localhost:3000`
- 描述: 指定 Open WebUI 可被訪問的 URL。目前用於搜索引擎支持。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `ENABLE_SIGNUP`

- 類型: `bool`
- 默認值: `True`
- 描述: 切換用戶賬戶創建功能。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `ENABLE_LOGIN_FORM`

- 類型: `bool`
- 默認值: `True`
- 描述: 切換電子郵件、密碼、登錄表單以及 "or" 元素 (僅當 `ENABLE_OAUTH_SIGNUP` 設置為 True 時生效)。
- 持久性: 此環境變數是《PersistentConfig》變數。

:::danger

只有在 [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup) 也被使用且設定為 `True` 時，才應該設置為 `False`。否則可能導致無法登錄。

:::

#### `DEFAULT_LOCALE`

- 類型: `str`
- 默認值: `en`
- 描述: 設置應用程序的默認語言環境。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `DEFAULT_MODELS`

- 類型: `str`
- 默認值: 空字符串 ( )，表示 `None`。
- 描述: 設置默認語言模型。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `DEFAULT_USER_ROLE`

- 類型: `str`
- 選項:
  - `pending` - 新用戶處於待審狀態，直到其賬戶由管理員手動激活。
  - `user` - 新用戶將自動激活，並擁有普通用戶權限。
  - `admin` - 新用戶將自動激活，並擁有管理員權限。
- 默認值: `pending`
- 描述: 設置分配給新用戶的默認角色。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `PENDING_USER_OVERLAY_TITLE`

- 類型: `str`
- 默認值: 空字符串 ( )
- 描述: 設置待審用戶界面的自定義標題。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `PENDING_USER_OVERLAY_CONTENT`

- 類型: `str`
- 默認值: 空字符串 ( )
- 描述: 設置待審用戶界面的自定義文本內容。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `ENABLE_CHANNELS`

- 類型: `bool`
- 默認值: `False`
- 描述: 啟用或禁用通道支持。
- 持久性: 此環境變數是《PersistentConfig》變數。

#### `WEBHOOK_URL`

- 類型: `str`
- 描述: 設定用於與 Discord/Slack/Microsoft Teams 集成的 Webhook。

- 持續性: 此環境變數為 `PersistentConfig` 變數。

#### `ENABLE_ADMIN_EXPORT`

- 類型: `bool`
- 預設值: `True`
- 描述: 控制管理員用戶是否可以導出資料。

#### `ENABLE_ADMIN_CHAT_ACCESS`

- 類型: `bool`
- 預設值: `True`
- 描述: 允許管理員用戶訪問所有聊天。

#### `ENABLE_USER_WEBHOOKS`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或禁用用戶的 webhook 功能。
- 持續性: 此環境變數為 `PersistentConfig` 變數。

#### `RESPONSE_WATERMARK`

- 類型: `str`
- 預設值: 空字串 ( )
- 描述: 設置一個自定義文字，當您在聊天中複製消息時將被包含。例: `"此文字為 AI 生成"` -> 將在每次複製消息時添加 "此文字為 AI 生成"。
- 持續性: 此環境變數為 `PersistentConfig` 變數。

#### `THREAD_POOL_SIZE`

- 類型: `int`
- 預設值: `0`
- 描述: 設置 FastAPI/AnyIO 阻塞調用的線程池大小。默認情況下（設為 0）FastAPI/AnyIO 使用 `40` 個線程。在大型實例和大量並發用戶的情況下，可能需要增加 `THREAD_POOL_SIZE` 以防止阻塞。

#### `SHOW_ADMIN_DETAILS`

- 類型: `bool`
- 預設值: `True`
- 描述: 切換是否在界面中顯示管理員用戶詳細資訊。
- 持續性: 此環境變數為 `PersistentConfig` 變數。

#### `ADMIN_EMAIL`

- 類型: `str`
- 描述: 設置由 `SHOW_ADMIN_DETAILS` 顯示的管理員電子郵件。
- 持續性: 此環境變數為 `PersistentConfig` 變數。

#### `ENV`

- 類型: `str`
- 選項:
  - `dev` - 在 `/docs` 啟用 FastAPI 的 API 文檔
  - `prod` - 自動配置多個環境變數
- 預設值:
  - **後端默認值**: `dev`
  - **Docker 默認值**: `prod`
- 描述: 環境設置。

#### `ENABLE_PERSISTENT_CONFIG`

- 類型: `bool`
- 預設值: `True`
- 描述: 如果設為 `False`，所有 `PersistentConfig` 變數將被視為普通變數。

#### `CUSTOM_NAME`

- 類型: `str`
- 描述: 設置 `WEBUI_NAME`，但從 **api.openwebui.com** 獲取元數據。

#### `WEBUI_NAME`

- 類型: `str`
- 預設值: `Open WebUI`
- 描述: 設置主要的 WebUI 名稱。如果被覆蓋，則附加 `(Open WebUI)`。

#### `PORT`

- 類型: `int`
- 預設值: `8080`
- 描述: 設置運行 Open WebUI 的埠。

:::info
如果您通過 Python 運行應用程序並使用 `open-webui serve` 命令，則無法使用 `PORT` 配置設置埠。相反，您必須使用命令行參數直接指定埠，方法是使用 `--port` 標誌。例如:

```bash
open-webui serve --port 9999
```

這將在埠 `9999` 運行 Open WebUI。在此模式下，`PORT` 環境變數將被忽略。
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- 類型: `bool`
- 預設值: `False`
- 描述: 啟用時，系統會將每塊流式聊天數據即時保存到數據庫以確保最大數據持久性。此功能提供了健全的數據恢復能力並允許準確的會話跟蹤。但此功能的副作用是增加延遲，因為保存到數據庫會引入延遲。禁用該功能可以提升性能並減少延遲，但在系統故障或崩潰期間可能會有數據丟失的風險。請根據您的應用需求和可接受的權衡使用。

#### `BYPASS_MODEL_ACCESS_CONTROL`

- 類型: `bool`
- 預設值: `False`
- 描述: 跳過模型訪問控制。

#### `WEBUI_BUILD_HASH`

- 類型: `str`
- 預設值: `dev-build`
- 描述: 用於識別版本的 Git SHA。

#### `WEBUI_BANNERS`

- 類型: `list` of `dict`
- 預設值: `[]`
- 描述: 要向用戶顯示的橫幅列表。橫幅的格式為:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- 持續性: 此環境變數為 `PersistentConfig` 變數。

:::info

在 `.env` 文件中設置此環境變數時，請確保通過使用雙引號包裹整個值並使用轉義引號 (`\"`) 對內部引號進行轉義。例如:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"您的消息正在存儲。\", \"content\": \"您的消息正在存儲並可能由真人審核。LLMs 容易產生幻想，請檢查來源。\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- 類型: `bool`
- 預設值: `False`
- 描述: 使用 NVIDIA CUDA 支援構建 Docker 映像。啟用本地 Whisper 和嵌入的 GPU 加速。

#### `EXTERNAL_PWA_MANIFEST_URL`

- 類型: `str`
- 預設值: 空字串 ( )，因為默認設置為 `None`。
- 描述: 當定義為完整的 URL（例如：https://path/to/manifest.webmanifest）時，發送到 /manifest.json 的請求將使用外部清單文件。如果未定義，將使用默認的 manifest.json 文件。

#### `ENABLE_TITLE_GENERATION`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或停用聊天標題生成。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `LICENSE_KEY`

- 類型: `str`
- 預設值: `None`
- 描述: 指定要使用的授權密鑰（僅限企業用戶）。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `SSL_ASSERT_FINGERPRINT`

- 類型: `str`
- 預設值: 空字串 ( )，因為 `None` 設為預設值。
- 描述: 指定要使用的 SSL 指紋。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `DEFAULT_PROMPT_SUGGESTIONS`

- 類型: `list` of `dict`
- 預設值: `[]` （這表示使用內建的預設提示建議）
- 描述: 提示建議的列表。提示建議的格式為：

```json
[{"title": ["標題部分1", "標題部分2"], "content": "提示"}]
```

### AIOHTTP 客戶端

#### `AIOHTTP_CLIENT_TIMEOUT`

- 類型: `int`
- 預設值: `300`
- 描述: 指定 AIOHTTP 客戶端的超時時間（以秒為單位）。這會影響例如與 Ollama 和 OpenAI 端點的連接。

:::info

這是客戶端在超時之前等待回應的最大時間。
如果設為空字串 ( )，超時將被設為 `None`，有效地停用超時，使客戶端可以無限期等待。

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- 類型: `int`
- 預設值: `10`
- 描述: 設置獲取模型列表的超時時間（以秒為單位）。在網路延遲需要更長時間才能成功檢索模型列表時，這可能是有用的。

:::note
`AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST` 預設設為 10 秒，以確保打開 Web UI 時所有必要的連接都可用。此時間允許在網絡延遲較高的情況下檢索模型列表。您可以降低此值以更快的超時，但需注意這可能會根據您的網絡情況導致某些連接被丟棄。
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- 類型: `int`
- 描述: 設置獲取模型列表的超時時間（以秒為單位）。在網路延遲需要更長時間才能成功檢索模型列表時，這可能是有用的。

### 目錄

#### `DATA_DIR`

- 類型: `str`
- 預設值: `./data`
- 描述: 指定數據存儲的基礎目錄，包括上傳文件、快取、向量資料庫等。

#### `FONTS_DIR`

- 類型: `str`
- 描述: 指定字型目錄。

#### `FRONTEND_BUILD_DIR`

- 類型: `str`
- 預設值: `../build`
- 描述: 指定已構建前端文件的位置。

#### `STATIC_DIR`

- 類型: `str`
- 預設值: `./static`
- 描述: 指定靜態文件的目錄，例如網站圖標。

### Ollama

#### `ENABLE_OLLAMA_API`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用使用 Ollama API。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` 已棄用) {#ollama_base_url}

- 類型: `str`
- 預設值: `http://localhost:11434`
- Docker 預設值:
  - 如果設置了 `K8S_FLAG`：`http://ollama-service.open-webui.svc.cluster.local:11434`
  - 如果 `USE_OLLAMA_DOCKER=True`：`http://localhost:11434`
  - 否則為 `http://host.docker.internal:11434`
- 描述: 配置 Ollama 後端 URL。

#### `OLLAMA_BASE_URLS`

- 類型: `str`
- 描述: 配置負載平衡的 Ollama 後端主機，以分號 `;` 分隔。參見
[`OLLAMA_BASE_URL`](#ollama_base_url)。優先於[`OLLAMA_BASE_URL`](#ollama_base_url)。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `USE_OLLAMA_DOCKER`

- 類型: `bool`
- 預設值: `False`
- 描述: 使用捆綁的 Ollama 實例生成 Docker 映像。

#### `K8S_FLAG`

- 類型: `bool`
- 預設值: `False`
- 描述: 如果設置，則假定 Helm chart 部署並設置 [`OLLAMA_BASE_URL`](#ollama_base_url) 為 `http://ollama-service.open-webui.svc.cluster.local:11434`。

### OpenAI

#### `ENABLE_OPENAI_API`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用使用 OpenAI API。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `OPENAI_API_BASE_URL`

- 類型: `str`
- 預設值: `https://api.openai.com/v1`
- 描述: 配置 OpenAI 基礎 API URL。
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `OPENAI_API_BASE_URLS`

- 類型: `str`
- 描述: 支持平衡的 OpenAI 基礎 API URL，使用分號分隔。
- 示例: `http://host-one:11434;http://host-two:11434`
- 持久性: 此環境變數是一個 `PersistentConfig` 變數。

#### `OPENAI_API_KEY`

- 類型: `str`
- 描述: 設定 OpenAI API 密鑰。
- 範例：`sk-124781258123`
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `OPENAI_API_KEYS`

- 類型：`str`
- 描述：支援多個 OpenAI API 金鑰，以分號分隔。
- 範例：`sk-124781258123;sk-4389759834759834`
- 持久性：此環境變數是一個`PersistentConfig`變數。

### 任務

#### `TASK_MODEL`

- 類型：`str`
- 描述：預設使用於標題生成和網頁搜尋查詢生成之模型
當使用 Ollama 模型時。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `TASK_MODEL_EXTERNAL`

- 類型：`str`
- 描述：預設使用於標題生成和網頁搜尋查詢生成之模型
當使用 OpenAI 兼容端點時。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- 類型：`str`
- 描述：生成聊天標題時使用的提示。
- 預設值：`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE` 環境變數的值。

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`：

```
### 任務：
生成一個簡潔的，3-5 個字的標題，並帶有表情符號以概括聊天歷史。
### 指南：
- 標題應清楚地代表對話的主要主題或內容。
- 使用增強理解主題的表情符號，但避免使用引號或特殊格式。
- 使用聊天的主要語言撰寫標題；如果是多語言則默認為英語。
- 以準確性優先於過度創造力；保持清晰簡單。
### 輸出：
JSON 格式：{ "title": "在此輸入您的簡潔標題" }
### 範例：
- { "title": "📉 股票市場趨勢" },
- { "title": "🍪 完美巧克力曲奇配方" },
- { "title": "音樂串流演進" },
- { "title": "遠程工作效率技巧" },
- { "title": "人工智慧在醫療中的應用" },
- { "title": "🎮 電子遊戲開發洞察" }
### 聊天歷史：
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- 類型：`str`
- 描述：呼叫工具時使用的提示。
- 預設值：`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE` 環境變數的值。

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`：

```
可用工具：{{TOOLS}}

您的任務是根據問題從可使用的工具清單中選擇並返回正確的工具。請遵循以下指南：

- 僅返回 JSON 對象，不要包含任何額外文字或說明。

- 如果沒有工具與查詢匹配，返回空數組：
   {
     "tool_calls": []
   }

- 如果一個或多個工具與查詢匹配，構建一個 JSON 響應，其中包含一個 "tool_calls" 陣列，並含有以下對象：
   - "name": 工具的名稱。
   - "parameters": 一個必需的參數字典及其對應的值。

JSON 響應的格式為：
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- 持久性：此環境變數是一個`PersistentConfig`變數。

### 代碼執行

#### `ENABLE_CODE_EXECUTION`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用代碼執行。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_ENGINE`

- 類型：`str`
- 預設值：`pyodide`
- 描述：指定使用的代碼執行引擎。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_JUPYTER_URL`

- 類型：`str`
- 預設值：`None`
- 描述：指定代碼執行使用的 Jupyter URL。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_JUPYTER_AUTH`

- 類型：`str`
- 預設值：`None`
- 描述：指定代碼執行使用的 Jupyter 認證方式。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- 類型：`str`
- 預設值：`None`
- 描述：指定代碼執行使用的 Jupyter 認證 Token。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- 類型：`str`
- 預設值：`None`
- 描述：指定代碼執行使用的 Jupyter 認證密碼。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- 類型：`str`
- 預設值：空字符串（`' '`），因為預設值為`None`。
- 描述：指定 Jupyter 代碼執行的超時時間。
- 持久性：此環境變數是一個`PersistentConfig`變數。

### 代碼解釋器

#### `ENABLE_CODE_INTERPRETER`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用代碼解釋器。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `CODE_INTERPRETER_ENGINE`

- 類型: `str`
- 預設值: `pyodide`
- 描述: 指定使用的程式碼解釋器引擎。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- 類型: `str`
- 預設值: `None`
- 描述: 指定程式碼解釋器的提示模板。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_JUPYTER_URL`

- 類型: `str`
- 預設值: 空字串 ( )，因為預設值為 `None`。
- 描述: 指定程式碼解釋器使用的 Jupyter URL。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- 類型: `str`
- 預設值: 空字串 ( )，因為預設值為 `None`。
- 描述: 指定程式碼解釋器使用的 Jupyter 驗證方法。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- 類型: `str`
- 預設值: 空字串 ( )，因為預設值為 `None`。
- 描述: 指定程式碼解釋器使用的 Jupyter 驗證令牌。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- 類型: `str`
- 預設值: 空字串 ( )，因為預設值為 `None`。
- 描述: 指定程式碼解釋器使用的 Jupyter 驗證密碼。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- 類型: `str`
- 預設值: 空字串 ( )，因為預設值為 `None`。
- 描述: 指定 Jupyter 程式碼解釋器的超時時間。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

### 直接連接 (OpenAPI/MCPO 工具伺服器)

#### `ENABLE_DIRECT_CONNECTIONS`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或停用直接連接。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

### 自動完成

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或停用自動完成生成。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

:::info

啟用 `ENABLE_AUTOCOMPLETE_GENERATION` 時，請確保您已相應配置 `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` 和 `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`。

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- 類型: `int`
- 預設值: `-1`
- 描述: 設定自動完成生成的最大輸入長度。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- 類型: `str`
- 預設值: `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` 環境變數的值。

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### 任務:
您是一個自動完成系統。根據 `<text>` 中的內容及 `<type>` 中的 **完成類型** 和指定語言繼續撰寫文字。

### **指示**:
1. 分析 `<text>` 的背景及含義。
2. 使用 `<type>` 指導您的輸出:
   - **一般**: 提供自然且簡潔的延續。
   - **搜尋查詢**: 完成如生成逼真的搜尋查詢。
3. 請直接延續 `<text>`。不要重複、改述或以模型的方式回應。僅完成文字。
4. 確保延續:
   - 自然流暢地從 `<text>` 展開。
   - 避免重複、過度解釋或無關的內容。
5. 如果不確定，回應: `{ "text": "" }`。

### **輸出規則**:
- 僅以 JSON 格式回應: `{ "text": "<您的完成內容>" }`。

### **範例**:
#### 範例 1:
輸入:
<type>一般</type>
<text>太陽正下沉至地平線，塗滿天空</text>
輸出:
{ "text": "充滿了鮮豔的橙色和粉紅色調。" }

#### 範例 2:
輸入:
<type>搜尋查詢</type>
<text>頂級餐廳位於</text>
輸出:
{ "text": "紐約市的意大利美食。" }

---
### 背景:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### 輸出:
```

- 描述: 設定自動完成生成的提示模板。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

### 評估競技場模型

#### `ENABLE_EVALUATION_ARENA_MODELS`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或停用評估競技場模型。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `ENABLE_MESSAGE_RATING`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用訊息評分功能。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `ENABLE_COMMUNITY_SHARING`

- 類型: `bool`
- 預設值: `True`
- 描述: 控制是否向用戶顯示分享到社群的按鈕。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

### 標籤生成

#### `ENABLE_TAGS_GENERATION`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用標籤生成功能。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- 類型：`str`
- 預設值：`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE` 環境變數的值。

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`：

```
### 任務：
生成1-3個概括性標籤以分類聊天記錄的主要主題，以及1-3個更具體的子主題標籤。

### 指南：
- 從高層次領域開始（例如科學、技術、哲學、藝術、政治、商業、健康、運動、娛樂、教育）
- 考慮在整個對話中被強烈表達的相關子領域/子域
- 如果內容過短（少於3條消息）或過於多樣化，僅使用 ["General"]
- 使用聊天的主要語言；如果為多語言，默認為英文
- 優先考慮準確性而非具體性

### 輸出：
JSON格式：{ "tags": ["tag1", "tag2", "tag3"] }

### 聊天記錄：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述：設置標籤生成的提示模板。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

### API金鑰端點限制

#### `ENABLE_API_KEY`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用API金鑰身份驗證。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用API金鑰端點限制以增加安全性和設置靈活性。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

#### `API_KEY_ALLOWED_ENDPOINTS`

- 類型：`str`
- 描述：指定啟用API金鑰端點限制時允許的API端點的逗號分隔列表。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

:::注意

`API_KEY_ALLOWED_ENDPOINTS` 的值應該是一個逗號分隔的端點URL列表，例如 `/api/v1/messages, /api/v1/channels`。

:::

#### `JWT_EXPIRES_IN`

- 類型：`int`
- 預設值：`-1`
- 描述：設置JWT的過期時間，以秒為單位。有效的時間單位包括：`s`、`m`、`h`、`d`、`w` 或 `-1` 表示不過期。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

## 安全性變數

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- 類型：`bool`
- 預設值：`False`
- 描述：將用戶信息（姓名、ID、電子郵件和角色）作為X-標頭轉發到OpenAI API和Ollama API。
如果啟用，將轉發以下標頭：
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- 類型：`bool`
- 預設值：`True`
- 描述：繞過網站上的RAG的SSL驗證。
- 持續性：該環境變數是一個 `PersistentConfig` 變數。

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- 類型：`str`
- 選項：
  - `lax` - 將 `SameSite` 屬性設置為lax，允許由第三方網站發起的請求附帶會話cookie。
  - `strict` - 將 `SameSite` 屬性設置為strict，阻止由第三方網站發起的請求附帶會話cookie。
  - `none` - 將 `SameSite` 屬性設置為none，允許由第三方網站發起的請求附帶會話cookie，但僅限於HTTPS。
- 預設值：`lax`
- 描述：設置會話cookie的 `SameSite` 屬性。

:::警告

在啟用 `ENABLE_OAUTH_SIGNUP` 時，將 `WEBUI_SESSION_COOKIE_SAME_SITE` 設置為 `strict` 可能會導致登錄失敗。這是因為Open WebUI使用會話cookie來驗證OAuth提供者的回調，以防止CSRF攻擊。

然而，`strict` 會話cookie不會隨回調請求一起發送，可能導致登錄問題。如果遇到此問題，請使用預設值 `lax`。

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- 類型：`bool`
- 預設值：`False`
- 描述：如果設置為 `True`，將為會話Cookie設置 `Secure` 屬性。

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- 類型：`str`
- 選項：
  - `lax` - 將 `SameSite` 屬性設置為lax，允許由第三方網站發起的請求附帶身份驗證cookie。
  - `strict` - 將 `SameSite` 屬性設置為strict，阻止由第三方網站發起的請求附帶身份驗證cookie。
  - `none` - 將 `SameSite` 屬性設置為none，允許由第三方網站發起的請求附帶身份驗證cookie，但僅限於HTTPS。
- 預設值：`lax`
- 描述：設置身份驗證cookie的 `SameSite` 屬性。

:::提示

如果未設置該值，將使用 `WEBUI_SESSION_COOKIE_SAME_SITE` 進行回退。

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- 類型：`bool`
- 預設值：`False`
- 描述：如果設定為 `True`，則為身份驗證 Cookie 設定 `Secure` 屬性。

:::info

如果未設置該值，將使用 `WEBUI_SESSION_COOKIE_SECURE` 作為後備選項。

:::

#### `WEBUI_AUTH`

- 類型：`bool`
- 預設值：`True`
- 描述：此設置用於啟用或禁用身份驗證。

:::danger

如果設為 `False`，身份驗證將被禁用，您的 Open WebUI 實例將不需要身份驗證。不過，請注意，關閉身份驗證僅適用於沒有任何現有用戶的全新安裝。如果已有用戶註冊，則無法直接禁用身份驗證。如果您希望關閉 `WEBUI_AUTH`，請確保資料庫中沒有用戶。

:::

#### `WEBUI_SECRET_KEY`

- 類型：`str`
- 預設值：`t0p-s3cr3t`
- Docker 預設值：第一次啟動時隨機生成
- 描述：覆寫用於 JSON Web Token 的隨機生成字串。

:::info

當在多節點集群中部署 Open-WebUI 並使用負載均衡器時，必須確保所有實例的 `WEBUI_SECRET_KEY` 值一致，以便用戶在節點重啟或會話轉移至其他節點後能繼續工作。否則，每次底層節點更改時，必須重新登入。

:::

#### `OFFLINE_MODE`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用離線模式。

#### `RESET_CONFIG_ON_START`

- 類型：`bool`
- 預設值：`False`
- 描述：啟動時重置 `config.json` 文件。

#### `SAFE_MODE`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用安全模式，禁用潛在不安全功能，停用所有功能。

#### `CORS_ALLOW_ORIGIN`

- 類型：`str`
- 預設值：`*`
- 描述：設置跨來源資源共享 (CORS) 的允許來源。

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- 類型：`bool`
- 預設值：`False`
- 描述：決定是否允許 Hub 上自定義模型使用其自己的建模文件。

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- 類型：`bool`
- 預設值：`False`
- 描述：決定是否允許 Hub 上自定義模型使用其自己的建模文件進行重新排名。

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- 類型：`bool`
- 預設值：`True`
- 描述：切換 Sentence-Transformer 模型的自動更新功能。

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- 類型：`bool`
- 預設值：`True`
- 描述：切換重新排名模型的自動更新功能。

## 向量數據庫

#### `VECTOR_DB`

- 類型：`str`
- 選項：
- `chroma`、`elasticsearch`、`milvus`、`opensearch`、`pgvector`、`qdrant`、`pinecone`
- 預設值：`chroma`
- 描述：指定使用哪種向量數據庫系統。此設置決定用於管理嵌入的向量存儲系統。

### ChromaDB

#### `CHROMA_TENANT`

- 類型：`str`
- 預設值： `chromadb.DEFAULT_TENANT` 的值（`chromadb` 模組中的常量）
- 描述：設置 ChromaDB 的 Tenant 用於 RAG 嵌入。

#### `CHROMA_DATABASE`

- 類型：`str`
- 預設值： `chromadb.DEFAULT_DATABASE` 的值（`chromadb` 模組中的常量）
- 描述：設置 ChromaDB Tenant 中使用的數據庫以支持 RAG 嵌入。

#### `CHROMA_HTTP_HOST`

- 類型：`str`
- 描述：指定遠程 ChromaDB 服務器的主機名。如果未設置，則使用本地的 ChromaDB 實例。

#### `CHROMA_HTTP_PORT`

- 類型：`int`
- 預設值：`8000`
- 描述：指定遠程 ChromaDB 服務器的端口。

#### `CHROMA_HTTP_HEADERS`

- 類型：`str`
- 描述：包含在每個 ChromaDB 請求中的逗號分隔的 HTTP 標頭列表。
- 示例：`Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`。

#### `CHROMA_HTTP_SSL`

- 類型：`bool`
- 預設值：`False`
- 描述：控制是否使用 SSL 與 ChromaDB 服務器連接。

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- 類型：`str`
- 描述：指定遠程 ChromaDB 服務器的身份驗證提供者。
- 示例：`chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- 類型：`str`
- 描述：指定遠程 ChromaDB 服務器的身份驗證憑據。
- 示例：`username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- 類型：`str`
- 預設值：空字串（' '），因為預設為 `None`。
- 描述：指定 Elasticsearch API 密鑰。
- 持久性：此環境變數為 `PersistentConfig` 變數。

#### `ELASTICSEARCH_CA_CERTS`

- 類型：`str`
- 預設值：空字串（' '），因為預設為 `None`。
- 描述：指定 Elasticsearch CA 證書的路徑。
- 持久性：此環境變數為 `PersistentConfig` 變數。

#### `ELASTICSEARCH_CLOUD_ID`

- 類型：`str`
- 預設值：空字串（' '），因為預設為 `None`。
- 描述：指定 Elasticsearch Cloud ID。
- 持久性：此環境變數為 `PersistentConfig` 變數。

#### `ELASTICSEARCH_INDEX_PREFIX`

- 類型：`str`
- 預設值：`open_webui_collections`
- 描述：指定 Elasticsearch 索引的前綴。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `ELASTICSEARCH_PASSWORD`

- 類型：`str`
- 預設值：空字符串 ( )，因為預設設置為 `None`。
- 描述：指定 Elasticsearch 的密碼。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `ELASTICSEARCH_URL`

- 類型：`str`
- 預設值：`https://localhost:9200`
- 描述：指定 Elasticsearch 實例的 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `ELASTICSEARCH_USERNAME`

- 類型：`str`
- 預設值：空字符串 ( )，因為預設設置為 `None`。
- 描述：指定 Elasticsearch 的使用者名稱。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### Milvus

#### `MILVUS_URI`

- 類型：`str`
- 預設值：`${DATA_DIR}/vector_db/milvus.db`
- 描述：指定用於連接 Milvus 向量資料庫的 URI。根據部署配置，此 URI 可以指向本地或遠程的 Milvus 伺服器。

#### `MILVUS_DB`

- 類型：`str`
- 預設值：`default`
- 描述：指定要連接的 Milvus 實例中的資料庫。

#### `MILVUS_TOKEN`

- 類型：`str`
- 預設值：`None`
- 描述：指定 Milvus 的可選連接令牌。

#### `MILVUS_INDEX_TYPE`

- 類型：`str`
- 預設值：`HNSW`
- 選項：`AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- 描述：指定在 Milvus 中創建新集合時使用的索引類型。`AUTOINDEX` 通常建議用於 Milvus 獨立部署，`HNSW` 可能提供更好的性能但通常需要配置 Milvus 集群。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `MILVUS_METRIC_TYPE`

- 類型：`str`
- 預設值：`COSINE`
- 選項：`COSINE`, `IP`, `L2`
- 描述：指定用於 Milvus 向量相似性搜索的度量類型。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `MILVUS_HNSW_M`

- 類型：`int`
- 預設值：`16`
- 描述：指定在 Milvus 中使用 HNSW 索引類型的 `M` 參數。此參數影響構建過程中為每個新元素建立的雙向連接的數量。僅在 `MILVUS_INDEX_TYPE` 設為 `HNSW` 時適用。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `MILVUS_HNSW_EFCONSTRUCTION`

- 類型：`int`
- 預設值：`100`
- 描述：指定在 Milvus 中使用 HNSW 索引類型的 `efConstruction` 參數。此參數影響索引構建過程中最近鄰動態列表的大小。僅在 `MILVUS_INDEX_TYPE` 設為 `HNSW` 時適用。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `MILVUS_IVF_FLAT_NLIST`

- 類型：`int`
- 預設值：`128`
- 描述：指定在 Milvus 中使用 IVF_FLAT 索引類型的 `nlist` 參數。這是聚類單元的數量。僅在 `MILVUS_INDEX_TYPE` 設為 `IVF_FLAT` 時適用。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用 OpenSearch 證書驗證。

#### `OPENSEARCH_PASSWORD`

- 類型：`str`
- 預設值：`None`
- 描述：設置 OpenSearch 的密碼。

#### `OPENSEARCH_SSL`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用 OpenSearch 的 SSL。

#### `OPENSEARCH_URI`

- 類型：`str`
- 預設值：`https://localhost:9200`
- 描述：設置 OpenSearch 的 URI。

#### `OPENSEARCH_USERNAME`

- 類型：`str`
- 預設值：`None`
- 描述：設置 OpenSearch 的使用者名稱。

### PGVector

#### `PGVECTOR_DB_URL`

- 類型：`str`
- 預設值：`DATABASE_URL` 環境變數的值
- 描述：設置模型存儲的數據庫 URL。

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- 類型：`str`
- 預設值：`1536`
- 描述：指定 PGVector 初始化的最大向量長度。

### Qdrant

#### `QDRANT_API_KEY`

- 類型：`str`
- 描述：設置 Qdrant 的 API 密鑰。

#### `QDRANT_URI`

- 類型：`str`
- 描述：設置 Qdrant 的 URI。

#### `QDRANT_ON_DISK`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用使用 memmap（亦即 on-disk）存儲。

#### `QDRANT_PREFER_GRPC`

- 類型：`bool`
- 預設值：`False`
- 描述：在可能的情況下使用 gRPC 接口。

#### `QDRANT_GRPC_PORT`

- 類型：`int`
- 預設值：`6334`
- 描述：設置 Qdrant 的 gRPC 端口號。

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用 Qdrant 集合管理的多租戶模式，這會透過合併相似的向量數據結構顯著減少 RAM 使用量和計算開銷。建議啟用。

:::信息

這將斷開所有先前模式（非多租戶）的 Qdrant 集合連接。請前往 `管理設置` > `文件` > `重建知識庫` 以遷移現有知識。

之前模式中建立的 Qdrant 集合仍然會消耗資源。

目前，介面中沒有僅重置向量資料庫的按鈕。如果您希望遷移知識至多租戶系統：
- 使用原生 Qdrant 客戶端移除所有以 `open_webui-knowledge` 前綴命名的集合（或使用 `open_webui` 前綴移除所有與 Open WebUI 相關的集合）
- 前往 `管理員設定` > `文件` > `重新索引知識庫` 以遷移現有的知識庫

`重新索引知識庫` 只會遷移知識庫

:::

:::警告

如果您決定使用多租戶模式作為默認模式，且不需要遷移舊知識，請前往 `管理員設定` > `文件` 重置向量和知識，此操作將刪除所有以 `open_webui` 為前綴的集合以及所有存儲的知識。

:::

### Pinecone

使用 Pinecone 作為向量存儲時，以下環境變數用於控制其行為。請確保在您的 `.env` 文件或部署環境中設置這些變數。

#### `PINECONE_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 設置用於驗證 Pinecone 服務的 API 密鑰。

#### `PINECONE_ENVIRONMENT`

- 類型: `str`
- 默認值: `None`
- 描述: 指定連接到 Pinecone 的環境（例如，`us-west1-gcp`、`gcp-starter` 等）。

#### `PINECONE_INDEX_NAME`

- 類型: `str`
- 默認值: `open-webui-index`
- 描述: 定義 Pinecone 指數的名稱，用於存儲和查詢向量嵌入。

#### `PINECONE_DIMENSION`

- 類型: `int`
- 默認值: `1536`
- 描述: 向量嵌入的維度。必須與指數期望的維度匹配（通常根據使用的模型為 768、1024、1536 或 3072）。

#### `PINECONE_METRIC`

- 類型: `str`
- 默認值: `cosine`
- 選項: `cosine`、`dotproduct`、`euclidean`
- 描述: 指定在 Pinecone 指數中進行向量比較時使用的相似度度量標準。

#### `PINECONE_CLOUD`

- 類型: `str`
- 默認值: `aws`
- 選項: `aws`、`gcp`、`azure`
- 描述: 指定托管 Pinecone 指數的雲服務提供商。

## RAG 內容提取引擎

#### `CONTENT_EXTRACTION_ENGINE`

- 類型: `str`
- 選項:
  - 留空以使用默認值
  - `external` - 使用外部加載器
  - `tika` - 使用本地 Apache Tika 伺服器
  - `docling` - 使用 Docling 引擎
  - `document_intelligence` - 使用 Document Intelligence 引擎
  - `mistral_ocr` - 使用 Mistral OCR 引擎
- 描述: 設置文件提取引擎以進行文件引入。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `MISTRAL_OCR_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 指定使用的 Mistral OCR API 密鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- 類型: `str`
- 默認值: `None`
- 描述: 設置外部文件加載服務的 URL。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 設置驗證外部文件加載服務所用的 API 密鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `TIKA_SERVER_URL`

- 類型: `str`
- 默認值: `http://localhost:9998`
- 描述: 設置 Apache Tika 伺服器的 URL。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `DOCLING_SERVER_URL`

- 類型: `str`
- 默認值: `http://docling:5001`
- 描述: 指定 Docling 伺服器的 URL。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `DOCLING_OCR_ENGINE`

- 類型: `str`
- 默認值: `tesseract`
- 描述: 指定 Docling 使用的光學字符識別（OCR）引擎。支持的值包括：`tesseract`（默認）、`easyocr`、`ocrmac`、`rapidocr` 和 `tesserocr`。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `DOCLING_OCR_LANG`

- 類型: `str`
- 默認值: `eng,fra,deu,spa`（當使用默認 `tesseract` 引擎時）
- 描述: 指定與配置的 `DOCLING_OCR_ENGINE` 一起使用的 OCR 語言。
  格式和可用語言代碼取決於所選的 OCR 引擎。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

## 檢索增強生成（RAG）

#### `RAG_EMBEDDING_ENGINE`

- 類型: `str`
- 選項:
  - 留空為 `默認（SentenceTransformers）` - 使用 SentenceTransformers 進行嵌入。
  - `ollama` - 使用 Ollama API 進行嵌入。
  - `openai` - 使用 OpenAI API 進行嵌入。
- 描述: 選擇用於 RAG 的嵌入引擎。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `RAG_EMBEDDING_MODEL`

- 類型: `str`
- 默認值: `sentence-transformers/all-MiniLM-L6-v2`
- 描述: 設置嵌入模型。本地使用 Sentence-Transformer 模型。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `ENABLE_RAG_HYBRID_SEARCH`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用使用 `BM25` + `ChromaDB` 的結合搜索，並使用 `sentence_transformers` 模型重新排序。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_TOP_K`

- 類型：`int`
- 預設值：`3`
- 描述：設定使用 RAG 時嵌入考慮的結果數量的默認值。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_TOP_K_RERANKER`

- 類型：`int`
- 預設值：`3`
- 描述：設定使用 RAG 時重新排序器考慮的結果數量的默認值。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_RELEVANCE_THRESHOLD`

- 類型：`float`
- 預設值：`0.0`
- 描述：設定與重新排序一起使用時文檔考慮的相關性閾值。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_HYBRID_BM25_WEIGHT`

- 類型：`float`
- 預設值：`0.5`
- 描述：設定混合搜索過程中給關鍵字搜索 (BM25) 的權重。1 表示僅使用關鍵字搜索，0 表示僅使用向量搜索。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_TEMPLATE`

- 類型：`str`
- 預設值：`DEFAULT_RAG_TEMPLATE` 環境變數的值。

`DEFAULT_RAG_TEMPLATE`：

```
### 任務：
使用提供的上下文回答用戶的問題，並在回答中使用內嵌引用 [id] 格式，**僅當 <source> 標籤包含明確的 id 屬性**（例如，<source id="1">）。

### 指南：
- 如果不知道答案，請明確表述。
- 如果不確定，請向用戶尋求進一步的澄清。
- 用戶提問使用何種語言，回答也應保持一致。
- 如果上下文不可讀或質量較差，請告知用戶，並提供最佳可能的答案。
- 如果答案不在上下文中，但您了解該問題，請向用戶解釋並根據您的理解提供答案。
- **僅在上下文中 <source> 標籤包含 id 屬性時，使用 [id] 格式（例如，[1], [2]）進行引用。**
- 如果 <source> 標籤未包含 id 屬性，請勿引用。
- 不要在回答中使用 XML 標籤。
- 確保引用簡潔且直接與提供的信息相關。

### 引用示例：
如果用戶就具體主題提問，且信息來自具有提供 id 屬性的來源，回答應包含引用，如下所示：
* "根據研究，所提方法效率提高了 20% [1]。"

### 輸出：
提供清晰直接的回答，包括內嵌引用 [id] 格式，僅當上下文中 <source> 標籤包含 id 屬性時。

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- 描述：用於在聊天完成中注入 RAG 文檔的模板
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_TEXT_SPLITTER`

- 類型：`str`
- 選項：
  - `character`
  - `token`
- 預設值：`character`
- 描述：設定 RAG 模型的文本拆分方式。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `TIKTOKEN_CACHE_DIR`

- 類型：`str`
- 預設值：`{CACHE_DIR}/tiktoken`
- 描述：設定 TikToken 緩存的目錄。

#### `TIKTOKEN_ENCODING_NAME`

- 類型：`str`
- 預設值：`cl100k_base`
- 描述：設定 TikToken 的編碼名稱。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `CHUNK_SIZE`

- 類型：`int`
- 預設值：`1000`
- 描述：設定嵌入使用的文檔切分大小。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `CHUNK_OVERLAP`

- 類型：`int`
- 預設值：`100`
- 描述：指定分塊之間應有的重疊量。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `PDF_EXTRACT_IMAGES`

- 類型：`bool`
- 預設值：`False`
- 描述：在加載文檔時使用 OCR 從 PDF 中提取圖像。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_FILE_MAX_SIZE`

- 類型：`int`
- 描述：設定可上傳進行文檔吸收的最大文件大小（以 MB 為單位）。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

#### `RAG_FILE_MAX_COUNT`

- 類型：`int`
- 描述：設定一次上傳文檔吸收的最大文件數量。
- 保持性：此環境變數是一個 `PersistentConfig` 變數。

:::info

配置 `RAG_FILE_MAX_SIZE` 和 `RAG_FILE_MAX_COUNT` 時，請確保值設置合理，以防止過量文件上傳和潛在的性能問題。

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- 類型：`list` of `str`
- 預設值：`[]`（表示允許所有支持的文件類型）
- 描述：指定允許上傳的文件擴展名。

```json
["pdf,docx,txt"]
```

- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_RERANKING_MODEL`

- 類型：`str`
- 描述：設置用於重新排序結果的模型。在本地使用Sentence-Transformer模型。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_OPENAI_API_BASE_URL`

- 類型：`str`
- 默認值：`${OPENAI_API_BASE_URL}`
- 描述：設置用於RAG嵌入的OpenAI基本API URL。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_OPENAI_API_KEY`

- 類型：`str`
- 默認值：`${OPENAI_API_KEY}`
- 描述：設置用於RAG嵌入的OpenAI API密鑰。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- 類型：`int`
- 默認值：`1`
- 描述：設置OpenAI嵌入的批量大小。

#### `RAG_EMBEDDING_BATCH_SIZE`

- 類型：`int`
- 默認值：`1`
- 描述：設置RAG（檢索增強生成器）模型中嵌入的批量大小。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_OLLAMA_API_KEY`

- 類型：`str`
- 描述：設置RAG模型中使用的Ollama API的API密鑰。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_OLLAMA_BASE_URL`

- 類型：`str`
- 描述：設置RAG模型中使用的Ollama API的基本URL。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- 類型：`bool`
- 默認值：`True`
- 描述：啟用或禁用檢索查詢生成。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- 類型：`str`
- 默認值：`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`環境變量的值。

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`：

```
### 任務：
分析聊天記錄以確定是否需要生成搜尋查詢，使用給定的語言。默認情況下，**優先生成1-3個廣泛且相關的搜尋查詢**，除非完全確定不需要任何額外信息。目的是即使在存在最小的不確定性情況下，也能檢索到全面、更新且有價值的信息。如果確實不需要搜尋，則返回空列表。

### 指南：
- **僅**以JSON對象形式回應。任何形式的額外評論、解釋或文本均被嚴格禁止。
- 在生成搜尋查詢時，用以下格式回應： { "queries": ["query1", "query2"] }，確保每個查詢都是明確、簡潔並與主題相關。
- 僅當完全確定搜尋無法檢索到有用結果時，返回： { "queries": [] }。
- 如果有**任何可能性**搜尋查詢可能提供有用或更新的資訊，則傾向於建議生成查詢。
- 簡潔且專注於編寫高質量搜尋查詢，避免不必要的闡述、評論或假設。
- 今天的日期是：{{CURRENT_DATE}}。
- 始終優先提供可操作且範圍廣泛的查詢，以最大化信息覆蓋。

### 輸出：
嚴格以JSON格式返回：
{
  "queries": ["query1", "query2"]
}

### 聊天記錄：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 描述：設置查詢生成的提示模板。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- 類型：`bool`
- 默認值：`False`
- 描述：繞過嵌入和檢索過程。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- 類型：`str`
- 默認值：`None`
- 描述：指定文件智能的端點。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `DOCUMENT_INTELLIGENCE_KEY`

- 類型：`str`
- 默認值：`None`
- 描述：指定文件智能的密鑰。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- 類型：`bool`
- 默認值：`False`
- 描述：啟用或禁用RAG的本地網頁抓取。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- 類型：`str`
- 默認值：`None`
- 描述：指定RAG嵌入內容的前綴。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- 類型：`str`
- 默認值：`None`
- 描述：指定RAG嵌入前綴的字段名稱。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_EMBEDDING_QUERY_PREFIX`

- 類型：`str`
- 默認值：`None`
- 描述：指定RAG嵌入查詢的前綴。
- 持久性：此環境變量是一個`PersistentConfig`變量。

#### `RAG_FULL_CONTEXT`

- 類型: `bool`
- 預設值: `False`
- 描述: 指定是否使用完整上下文進行RAG。
- 持久性: 此環境變數是`PersistentConfig`變數。

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- 類型: `bool`
- 預設值: `False`
- 描述: 啟用或禁用Google Drive整合。如果設為true，且`GOOGLE_DRIVE_CLIENT_ID`和`GOOGLE_DRIVE_API_KEY`均已配置，Google Drive將作為上傳選項出現在聊天UI中。
- 持久性: 此環境變數是`PersistentConfig`變數。

:::info

啟用`GOOGLE_DRIVE_INTEGRATION`時，請確保您已正確配置`GOOGLE_DRIVE_CLIENT_ID`和`GOOGLE_DRIVE_API_KEY`，並檢查谷歌的服務條款和使用指南。

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- 類型: `str`
- 描述: 設置Google Drive的客戶端ID（客戶端必須啟用Drive API和Picker API）。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `GOOGLE_DRIVE_API_KEY`

- 類型: `str`
- 描述: 設置Google Drive整合的API密鑰。
- 持久性: 此環境變數是`PersistentConfig`變數。

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- 類型: `bool`
- 預設值: `False`
- 描述: 啟用或禁用OneDrive整合。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `ONEDRIVE_CLIENT_ID`

- 類型: `str`
- 預設值: `None`
- 描述: 指定OneDrive整合的客戶端ID。
- 持久性: 此環境變數是`PersistentConfig`變數。

## Web Search

#### `ENABLE_WEB_SEARCH`

- 類型: `bool`
- 預設值: `False`
- 描述: 啟用網頁搜索功能。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `ENABLE_SEARCH_QUERY_GENERATION`

- 類型: `bool`
- 預設值: `True`
- 描述: 啟用或禁用搜索查詢生成。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `WEB_SEARCH_TRUST_ENV`

- 類型: `bool`
- 預設值: `False`
- 描述: 啟用在網頁搜索內容獲取過程中由`http_proxy`和`https_proxy`設置的代理。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `WEB_SEARCH_RESULT_COUNT`

- 類型: `int`
- 預設值: `3`
- 描述: 爬取的最大搜尋結果數。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- 類型: `int`
- 預設值: `10`
- 描述: 從搜索結果中返回的網頁並發爬取的請求數量。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `WEB_SEARCH_ENGINE`

- 類型: `str`
- 選項:
  - `searxng` - 使用[SearXNG](https://github.com/searxng/searxng) 搜索引擎。
  - `google_pse` - 使用[Google Programmable Search Engine](https://programmablesearchengine.google.com/about/)。
  - `brave` - 使用[Brave 搜索引擎](https://brave.com/search/api/)。
  - `kagi` - 使用[Kagi](https://www.kagi.com/) 搜索引擎。
  - `mojeek` - 使用[Mojeek](https://www.mojeek.com/) 搜索引擎。
  - `bocha` - 使用Bocha搜索引擎。
  - `serpstack` - 使用[Serpstack](https://serpstack.com/) 搜索引擎。
  - `serper` - 使用[Serper](https://serper.dev/) 搜索引擎。
  - `serply` - 使用[Serply](https://serply.io/) 搜索引擎。
  - `searchapi` - 使用[SearchAPI](https://www.searchapi.io/) 搜索引擎。
  - `serpapi` - 使用[SerpApi](https://serpapi.com/) 搜索引擎。
  - `duckduckgo` - 使用[DuckDuckGo](https://duckduckgo.com/) 搜索引擎。
  - `tavily` - 使用[Tavily](https://tavily.com/) 搜索引擎。
  - `jina` - 使用[Jina](https://jina.ai/) 搜索引擎。
  - `bing` - 使用[Bing](https://www.bing.com/) 搜索引擎。
  - `exa` - 使用[Exa](https://exa.ai/) 搜索引擎。
  - `perplexity` - 使用[Perplexity AI](https://www.perplexity.ai/) 搜索引擎。
  - `sougou` - 使用[Sougou](https://www.sogou.com/) 搜索引擎。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- 類型: `bool`
- 預設值: `False`
- 描述: 跳過網頁搜索嵌入和檢索過程。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `SEARXNG_QUERY_URL`

- 類型: `str`
- 描述: 支援JSON輸出的[SearXNG搜索API](https://docs.searxng.org/dev/search_api.html) URL。`<query>`將被搜索查詢替換。例如: `http://searxng.local/search?q=<query>`
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `GOOGLE_PSE_API_KEY`

- 類型: `str`
- 描述: 設置Google Programmable Search Engine (PSE)服務的API密鑰。
- 持久性: 此環境變數是`PersistentConfig`變數。

#### `GOOGLE_PSE_ENGINE_ID`

- 類型: `str`
- 描述: Google 可編程搜索引擎 (PSE) 服務的引擎 ID。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `BRAVE_SEARCH_API_KEY`

- 類型: `str`
- 描述: 設置 Brave Search API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `KAGI_SEARCH_API_KEY`

- 類型: `str`
- 描述: 設置 Kagi Search API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `MOJEEK_SEARCH_API_KEY`

- 類型: `str`
- 描述: 設置 Mojeek Search API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPSTACK_API_KEY`

- 類型: `str`
- 描述: 設置 Serpstack 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPSTACK_HTTPS`

- 類型: `bool`
- 默認值: `True`
- 描述: 為 Serpstack 請求配置 HTTPS。免費層的請求僅限於 HTTP。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPER_API_KEY`

- 類型: `str`
- 描述: 設置 Serper 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPLY_API_KEY`

- 類型: `str`
- 描述: 設置 Serply 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SEARCHAPI_API_KEY`

- 類型: `str`
- 描述: 設置 SearchAPI 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SEARCHAPI_ENGINE`

- 類型: `str`
- 描述: 設置 SearchAPI 引擎。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `TAVILY_API_KEY`

- 類型: `str`
- 描述: 設置 Tavily 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `JINA_API_KEY`

- 類型: `str`
- 描述: 設置 Jina 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `BING_SEARCH_V7_ENDPOINT`

- 類型: `str`
- 描述: 設置 Bing 搜索 API 的端點。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- 類型: `str`
- 默認值: `https://api.bing.microsoft.com/v7.0/search`
- 描述: 設置 Bing 搜索 API 的訂閱金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `BOCHA_SEARCH_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 設置 Bocha 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `EXA_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 設置 Exa 搜索 API 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPAPI_API_KEY`

- 類型: `str`
- 默認值: `None`
- 描述: 設置 SerpAPI 的 API 金鑰。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SERPAPI_ENGINE`

- 類型: `str`
- 默認值: `None`
- 描述: 指定 SerpAPI 使用的搜索引擎。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SOUGOU_API_SID`

- 類型: `str`
- 默認值: `None`
- 描述: 設置 Sogou API 的 SID。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `SOUGOU_API_SK`

- 類型: `str`
- 默認值: `None`
- 描述: 設置 Sogou API 的 SK。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

#### `TAVILY_EXTRACT_DEPTH`

- 類型: `str`
- 默認值: `basic`
- 描述: 指定 Tavily 搜索結果的提取深度。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

### Web 加載器配置

#### `WEB_LOADER_ENGINE`

- 類型: `str`
- 默認值: `safe_web`
- 描述: 指定用於檢索和處理網絡內容的加載器。
- 選項:
  - `requests` - 使用擴展錯誤處理的 Requests 模組。
  - `playwright` - 使用 Playwright 進行更高級的網頁渲染和交互。
- 持久性: 此環境變數是 `PersistentConfig` 變數。

:::info

使用 `playwright` 時，您有兩個選項：

1. 如果未設置 `PLAYWRIGHT_WS_URI`，Playwright 以及 Chromium 依賴項將在啟動時自動安裝於 Open WebUI 容器。
2. 如果設置了 `PLAYWRIGHT_WS_URI`，Open WebUI 將連接到遠程瀏覽器實例，而不是在本地安裝依賴項。

:::

#### `PLAYWRIGHT_WS_URL`

- 類型: `str`
- 默認值: `None`
- 描述：指定遠端 Playwright 瀏覽器實例的 WebSocket URI。設置後，Open WebUI 將使用此遠端瀏覽器，而非在本地安裝瀏覽器依賴項。在容器化環境中，此功能特別有用，可以讓 Open WebUI 容器保持輕量並將瀏覽器功能分離。範例：`ws://playwright:3000`
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

:::提示

通過 `PLAYWRIGHT_WS_URL` 使用遠端 Playwright 瀏覽器的優勢包括：

- 減少 Open WebUI 容器的大小
- 使用不同於默認 Chromium 的瀏覽器
- 連結非無頭（GUI）瀏覽器

:::

#### `FIRECRAWL_API_BASE_URL`

- 類型：`str`
- 默認：`https://api.firecrawl.dev`
- 描述：設置 Firecrawl API 的基礎 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `FIRECRAWL_API_KEY`

- 類型：`str`
- 默認：`None`
- 描述：設置 Firecrawl API 的 API key。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `PERPLEXITY_API_KEY`

- 類型：`str`
- 默認：`None`
- 描述：設置 Perplexity API 的 API key。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `PLAYWRIGHT_TIMEOUT`

- 類型：`int`
- 默認：空字串（ ），因默認設置為 `None`。
- 描述：指定 Playwright 請求的超時時間。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### YouTube 加載器

#### `YOUTUBE_LOADER_PROXY_URL`

- 類型：`str`
- 描述：設置 YouTube 加載器的代理 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `YOUTUBE_LOADER_LANGUAGE`

- 類型：`str`
- 默認：`en`
- 描述：逗號分隔的語言代碼列表，用以按優先順序嘗試獲取 YouTube 視頻的轉錄。
- 範例：若設置為 `es,de`，將先嘗試獲取西班牙文轉錄，若西班牙文不可用則嘗試德文，最後是英文。注意：若列表中未包括 `en`，則系統會自動嘗試使用英文作為最終備選。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

## 音訊

### Whisper 語音轉文字（本地）

#### `WHISPER_MODEL`

- 類型：`str`
- 默認：`base`
- 描述：設置 Whisper 模型以進行語音轉文字。所使用的後端為 faster_whisper 並將量化至 `int8`。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `WHISPER_MODEL_DIR`

- 類型：`str`
- 默認：`${DATA_DIR}/cache/whisper/models`
- 描述：指定存放 Whisper 模型文件的目錄。

#### `WHISPER_VAD_FILTER`

- 類型：`bool`
- 默認：`False`
- 描述：指定是否啟用語音活動檢測（VAD）檢測來進行 Whisper 語音轉文字。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `WHISPER_MODEL_AUTO_UPDATE`

- 類型：`bool`
- 默認：`False`
- 描述：切換是否自動更新 Whisper 模型。

#### `WHISPER_LANGUAGE`

- 類型：`str`
- 默認：`None`
- 描述：指定 Whisper 用於語音轉文字的 ISO 639-1 語言代碼（對夏威夷語及粵語使用 ISO 639-2）。Whisper 默認會預測使用的語言。

### 語音轉文字（OpenAI）

#### `AUDIO_STT_ENGINE`

- 類型：`str`
- 選項：
  - 留空以使用內建本地 Whisper 引擎進行語音轉文字。
  - `openai` - 使用 OpenAI 引擎進行語音轉文字。
  - `deepgram`- 使用 Deepgram 引擎進行語音轉文字。
  - `azure` 使用 Azure 引擎進行語音轉文字。
- 描述：指定用於語音轉文字的引擎。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_STT_MODEL`

- 類型：`str`
- 默認：`whisper-1`
- 描述：指定用於 OpenAI 相容端點的語音轉文字模型。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- 類型：`str`
- 默認：`${OPENAI_API_BASE_URL}`
- 描述：設置 OpenAI 相容語音轉文字的基礎 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_STT_OPENAI_API_KEY`

- 類型：`str`
- 默認：`${OPENAI_API_KEY}`
- 描述：設置 OpenAI 用於語音轉文字的 API key。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### 語音轉文字（Azure）

#### `AUDIO_STT_AZURE_API_KEY`

- 類型：`str`
- 默認：`None`
- 描述：指定用於語音轉文字的 Azure API key。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_STT_AZURE_REGION`

- 類型：`str`
- 默認：`None`
- 描述：指定用於語音轉文字的 Azure 區域。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_STT_AZURE_LOCALES`

- 類型：`str`
- 默認：`None`
- 描述：指定 Azure 語音轉文字所使用的語言區域。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### 語音轉文字（Deepgram）

#### `DEEPGRAM_API_KEY`

- 類型：`str`
- 默認：`None`
- 描述：指定用於語音轉文字的 Deepgram API key。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### 文本轉語音

#### `AUDIO_TTS_API_KEY`

- 類型：`str`
- 描述：設置文本轉語音的 API 金鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_ENGINE`

- 類型：`str`
- 選項：
  - 留空以使用內建的 WebAPI 文本轉語音引擎。
  - `azure` - 使用 Azure 文本轉語音引擎。
  - `elevenlabs` - 使用 ElevenLabs 文本轉語音引擎。
  - `openai` - 使用 OpenAI 文本轉語音引擎。
  - `transformers` - 使用 SentenceTransformers 文本轉語音引擎。
- 描述：指定要使用的文本轉語音引擎。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_MODEL`

- 類型：`str`
- 預設：`tts-1`
- 描述：指定要使用的 OpenAI 文本轉語音模型。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_VOICE`

- 類型：`str`
- 預設：`alloy`
- 描述：設置要使用的 OpenAI 文本轉語音語音。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_SPLIT_ON`

- 類型：`str`
- 預設：`punctuation`
- 描述：設置 OpenAI 文本轉語音的分段依據。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### Azure 文本轉語音

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- 類型：`str`
- 描述：設置 Azure 文本轉語音的區域。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- 類型：`str`
- 描述：設置 Azure 文本轉語音的輸出格式。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### OpenAI 文本轉語音

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- 類型：`str`
- 預設：`${OPENAI_API_BASE_URL}`
- 描述：設置用於文本轉語音的 OpenAI 兼容基礎 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUDIO_TTS_OPENAI_API_KEY`

- 類型：`str`
- 預設：`${OPENAI_API_KEY}`
- 描述：設置用於文本轉語音的 API 金鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

## 圖像生成

#### `IMAGE_GENERATION_ENGINE`

- 類型：`str`
- 選項：
  - `openai` - 使用 OpenAI 的 DALL-E 進行圖像生成。
  - `comfyui` - 使用 ComfyUI 引擎生成圖像。
  - `automatic1111` - 使用 AUTOMATIC1111 引擎生成圖像。
  - `gemini` - 使用 Gemini 生成圖像。
- 預設：`openai`
- 描述：指定用於圖像生成的引擎。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `ENABLE_IMAGE_GENERATION`

- 類型：`bool`
- 預設：`False`
- 描述：啟用或禁用圖像生成功能。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- 類型：`bool`
- 預設：`True`
- 描述：啟用或禁用圖像提示生成。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- 類型：`str`
- 預設：`None`
- 描述：指定用於生成圖像提示的模板。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### 任務：
根據給定的語言和上下文生成詳細的圖像生成任務提示。描述圖像時，彷彿是在向無法看見的人解釋它。包括相關的細節、顏色、形狀以及任何其他重要元素。

### 指南：
- 描述要詳盡和詳細，關注圖像中最重要的方面。
- 避免作出假設或添加圖像中不存在的信息。
- 使用聊天的主要語言；如果是多語言內容，默認為英文。
- 如果圖像過於複雜，重點放在最突出的元素上。

### 輸出：
嚴格以 JSON 格式返回：
{
    "prompt": "您的詳細描述在這裡。"
}

### 聊天記錄：
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- 類型：`str`
- 預設：`512x512`
- 描述：設定生成圖像的預設尺寸。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGE_STEPS`

- 類型：`int`
- 預設：`50`
- 描述：設置圖像生成的預設迭代步數。用於 ComfyUI 和 AUTOMATIC1111。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGE_GENERATION_MODEL`

- 類型：`str`
- 描述：指定用於圖像生成的預設模型。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- 類型：`str`
- 描述：指定 AUTOMATIC1111 的 Stable Diffusion API 的 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUTOMATIC1111_API_AUTH`

- 類型：`str`
- 說明：設置 AUTOMATIC1111 API 認證。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUTOMATIC1111_CFG_SCALE`

- 類型：`float`
- 說明：設置 AUTOMATIC1111 推理的比例。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUTOMATIC1111_SAMPLER`

- 類型：`str`
- 說明：設定 AUTOMATIC1111 推理的採樣器。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `AUTOMATIC1111_SCHEDULER`

- 類型：`str`
- 說明：設定 AUTOMATIC1111 推理的排程器。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### ComfyUI

#### `COMFYUI_BASE_URL`

- 類型：`str`
- 說明：指定 ComfyUI 圖像生成 API 的 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `COMFYUI_API_KEY`

- 類型：`str`
- 說明：設置 ComfyUI 的 API 密鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `COMFYUI_WORKFLOW`

- 類型：`str`
- 預設值：

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
      "title": "Load Checkpoint"
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
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP 文本編碼（Prompt）"
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
      "title": "CLIP 文本編碼（Prompt）"
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
      "title": "VAE 解碼"
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
      "title": "儲存圖片"
    }
  }
}
```

- 說明：設置 ComfyUI 工作流程。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### Gemini

#### `GEMINI_API_BASE_URL`

- 類型：`str`
- 預設值：`None`
- 說明：指定 Gemini 的 API URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `GEMINI_API_KEY`

- 類型：`str`
- 預設值：`None`
- 說明：設置 Gemini API 密鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGES_GEMINI_API_BASE_URL`

- 類型：`str`
- 預設值：`None`
- 說明：指定 Gemini 圖像生成 API 的 URL。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGES_GEMINI_API_KEY`

- 類型：`str`
- 預設值：`None`
- 說明：設置 Gemini 圖像生成的 API 密鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- 類型：`str`
- 預設值：`${OPENAI_API_BASE_URL}`
- 說明：設置 OpenAI 兼容的 DALL-E 圖像生成基底網址。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `IMAGES_OPENAI_API_KEY`

- 類型：`str`
- 預設值：`${OPENAI_API_KEY}`
- 說明：設置用於 DALL-E 圖像生成的 API 密鑰。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- 類型：`bool`
- 預設值：`False`
- 說明：啟用通過 OAuth 註冊時賬戶創建。與 `ENABLE_SIGNUP` 不同。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

:::danger

`ENABLE_LOGIN_FORM` 必須設置為 `False`，當 `ENABLE_OAUTH_SIGNUP` 被設置為 `True` 時。如果未設置，將導致無法登入。

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- 類型：`bool`
- 預設值：`False`
- 說明：如果啟用，會將使用相同電子郵件的 OAuth 賬戶合併到現有賬戶中。
此操作被認為不安全，因為並非所有 OAuth 提供者都會驗證電子郵件地址，可能導致潛在的賬戶劫持。
- 持久性：此環境變數是一個 `PersistentConfig` 變數。

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- 類型：`bool`
- 預設值：`False`
- 描述：若啟用，登入時會使用 OAuth 提供的照片更新本地使用者個人圖片。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- 類型：`str`
- 描述：定義用於驗證的可信任請求標頭。詳見 [SSO 文檔](/features/sso)。

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- 類型：`str`
- 描述：定義註冊者使用的使用者名稱可信請求標頭，與 `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 標頭相關。詳見 [SSO 文檔](/features/sso)。

### Google

請參考 https://support.google.com/cloud/answer/6158849?hl=en

#### `GOOGLE_CLIENT_ID`

- 類型：`str`
- 描述：設定 Google OAuth 的客戶端 ID。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GOOGLE_CLIENT_SECRET`

- 類型：`str`
- 描述：設定 Google OAuth 的客戶端密鑰。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GOOGLE_OAUTH_SCOPE`

- 類型：`str`
- 預設值：`openid email profile`
- 描述：設定 Google OAuth 驗證的範圍。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GOOGLE_REDIRECT_URI`

- 類型：`str`
- 預設值：`<backend>/oauth/google/callback`
- 描述：設定 Google OAuth 的重定向 URI。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

### Microsoft

請參考 https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- 類型：`str`
- 描述：設定 Microsoft OAuth 的客戶端 ID。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `MICROSOFT_CLIENT_SECRET`

- 類型：`str`
- 描述：設定 Microsoft OAuth 的客戶端密鑰。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `MICROSOFT_CLIENT_TENANT_ID`

- 類型：`str`
- 描述：設定 Microsoft OAuth 的租戶 ID。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `MICROSOFT_OAUTH_SCOPE`

- 類型：`str`
- 預設值：`openid email profile`
- 描述：設定 Microsoft OAuth 驗證的範圍。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `MICROSOFT_REDIRECT_URI`

- 類型：`str`
- 預設值：`<backend>/oauth/microsoft/callback`
- 描述：設定 Microsoft OAuth 的重定向 URI。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

### GitHub

請參考 https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- 類型：`str`
- 描述：設定 GitHub OAuth 的客戶端 ID。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GITHUB_CLIENT_SECRET`

- 類型：`str`
- 描述：設定 GitHub OAuth 的客戶端密鑰。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GITHUB_CLIENT_SCOPE`

- 類型：`str`
- 預設值：`user:email`
- 描述：指定 GitHub OAuth 驗證的範圍。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `GITHUB_CLIENT_REDIRECT_URI`

- 類型：`str`
- 預設值：`<backend>/oauth/github/callback`
- 描述：設定 GitHub OAuth 的重定向 URI。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- 類型：`str`
- 描述：設定 OIDC 的客戶端 ID。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_CLIENT_SECRET`

- 類型：`str`
- 描述：設定 OIDC 的客戶端密鑰。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OPENID_PROVIDER_URL`

- 類型：`str`
- 描述：`.well-known/openid-configuration` 端點的路徑
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OPENID_REDIRECT_URI`

- 類型：`str`
- 預設值：`<backend>/oauth/oidc/callback`
- 描述：設定 OIDC 的重定向 URI。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_SCOPES`

- 類型：`str`
- 預設值：`openid email profile`
- 描述：設定 OIDC 驗證的範圍，`openid` 和 `email` 是必要的。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_CODE_CHALLENGE_METHOD`

- 類型：`str`
- 預設值：空字串（ ），因為預設設定為 `None`。
- 描述：指定 OAuth 認證的代碼挑戰方法。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_PROVIDER_NAME`

- 類型：`str`
- 預設值：`SSO`
- 描述：設定 OIDC 提供者的名稱。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_USERNAME_CLAIM`

- 類型：`str`
- 預設值：`name`
- 描述：設定 OpenID 的使用者名稱聲明。
- 持久性：此環境變數屬於 `PersistentConfig` 變數。

#### `OAUTH_EMAIL_CLAIM`

- 類型：`str`
- 預設值：`email`
- 說明: 設置 OpenID 的電子郵件聲明。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_PICTURE_CLAIM`

- 類型: `str`
- 默認值: `picture`
- 說明: 設置 OpenID 的圖片（頭像）聲明。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_GROUP_CLAIM`

- 類型: `str`
- 默認值: `groups`
- 說明: 指定 OAuth 認證的群組聲明。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- 類型: `bool`
- 默認值: `False`
- 說明: 啟用 OAuth 的角色管理。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- 類型: `bool`
- 默認值: `False`
- 說明: 啟用或禁用 OAuth 群組管理。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_ROLES_CLAIM`

- 類型: `str`
- 默認值: `roles`
- 說明: 設置在 OIDC 令牌中尋找的角色聲明。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_ALLOWED_ROLES`

- 類型: `str`
- 默認值: `user,admin`
- 說明: 設置允許訪問平台的角色。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_ADMIN_ROLES`

- 類型: `str`
- 默認值: `admin`
- 說明: 設置被視為管理員的角色。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `OAUTH_ALLOWED_DOMAINS`

- 類型: `str`
- 默認值: `*`
- 說明: 指定 OAuth 認證的允許域名。（例如 "example1.com,example2.com"）。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

## LDAP

#### `ENABLE_LDAP`

- 類型: `bool`
- 默認值: `False`
- 說明: 啟用或禁用 LDAP 認證。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_SERVER_LABEL`

- 類型: `str`
- 說明: 設置 LDAP 伺服器的標籤。
- 持久性: 此環境變數為 `PersistentConfig` 變數。


#### `LDAP_SERVER_HOST`

- 類型: `str`
- 默認值: `localhost`
- 說明: 設置 LDAP 伺服器的主機名。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_SERVER_PORT`

- 類型: `int`
- 默認值: `389`
- 說明: 設置 LDAP 伺服器的端口號。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- 類型: `str`
- 說明: 設置用於 LDAP 認證的郵件屬性。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- 類型: `str`
- 說明: 設置用於 LDAP 認證的用戶名屬性。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_APP_DN`

- 類型: `str`
- 說明: 設置 LDAP 應用程序的區分名稱。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_APP_PASSWORD`

- 類型: `str`
- 說明: 設置 LDAP 應用程序的密碼。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_SEARCH_BASE`

- 類型: `str`
- 說明: 設置用於 LDAP 認證的搜索基礎。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_SEARCH_FILTER`

- 類型: `str`
- 默認值: `None`
- 說明: 設置用於 LDAP 搜索的單一篩選器。作為 `LDAP_SEARCH_FILTERS` 的替代。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_SEARCH_FILTERS`

- 類型: `str`
- 說明: 設置 LDAP 搜尋的篩選器。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_USE_TLS`

- 類型: `bool`
- 默認值: `True`
- 說明: 啟用或禁用 LDAP 連接的 TLS。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_CA_CERT_FILE`

- 類型: `str`
- 說明: 設置 LDAP CA 證書文件的路徑。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_VALIDATE_CERT`

- 類型: `bool`
- 說明: 設置是否驗證 LDAP CA 證書。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `LDAP_CIPHERS`

- 類型: `str`
- 默認值: `ALL`
- 說明: 設置 LDAP 連接使用的加密套件。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

## 用戶權限

### 聊天權限

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- 類型: `bool`
- 默認值: `True`
- 說明: 啟用或禁用用戶訪問聊天控制的權限。
- 持久性: 此環境變數為 `PersistentConfig` 變數。

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- 類型: `bool`
- 默認值: `True`
- 描述：啟用或禁用使用者上傳檔案到聊天的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_DELETE`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用使用者刪除聊天的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_EDIT`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用使用者編輯聊天的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_STT`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用使用者在聊天中使用語音轉文字的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_TTS`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用使用者在聊天中使用文字轉語音的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_CALL`

- 類型：`str`
- 預設值：`True`
- 描述：啟用或禁用使用者在聊天中進行通話的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- 類型：`str`
- 預設值：`True`
- 描述：啟用或禁用使用者在聊天中使用多個模型的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- 類型：`bool`
- 預設值：`True`
- 描述：啟用或禁用使用者創建臨時聊天的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用強制使用者臨時聊天。
- 持久性：此環境變數是一個`PersistentConfig`變數。

### 功能許可權

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用使用者訪問直接工具伺服器的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- 類型：`str`
- 預設值：`True`
- 描述：啟用或禁用使用者使用網頁搜索功能的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- 類型：`str`
- 預設值：`True`
- 描述：啟用或禁用使用者使用圖像生成功能的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- 類型：`str`
- 預設值：`True`
- 描述：啟用或禁用使用者使用代碼解釋器功能的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

### Workspace許可權

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用使用者訪問Workspace模型的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用使用者訪問Workspace知識的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用使用者訪問Workspace提示的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- 類型：`bool`
- 預設值：`False`
- 描述：啟用或禁用使用者訪問Workspace工具的許可權。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用Workspace模型的公共共享。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用Workspace知識的公共共享。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用Workspace提示的公共共享。
- 持久性：此環境變數是一個`PersistentConfig`變數。

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- 類型：`str`
- 預設值：`False`
- 描述：啟用或禁用Workspace工具的公共共享。
- 持久性：此環境變數是一個`PersistentConfig`變數。

## 其他環境變數

這些變數並非特定於Open WebUI，但在某些環境下仍然具有價值。

### 雲端存儲

#### `STORAGE_PROVIDER`

- 類型: `str`
- 選項:
  - `s3` - 使用 S3 客戶端函式庫和[Amazon S3 存儲](#amazon-s3-storage)中提到的相關環境變數
  - `gcs` - 使用 GCS 客戶端函式庫和[Google 雲端存儲](#google-cloud-storage)中提到的相關環境變數
  - `azure` - 使用 Azure 客戶端函式庫和[Microsoft Azure 存儲](#microsoft-azure-storage)中提到的相關環境變數
- 預設值: 空字串 (  )，預設為 `local`
- 描述: 設定存儲提供商。

#### Amazon S3 存儲

#### `S3_ACCESS_KEY_ID`

- 類型: `str`
- 描述: 設定 S3 存儲的存取金鑰 ID。

#### `S3_ADDRESSING_STYLE`

- 類型: `str`
- 預設值: `None`
- 描述: 指定 S3 存儲使用的位址風格 (例如 path, virtual)。

#### `S3_BUCKET_NAME`

- 類型: `str`
- 描述: 設定 S3 存儲的桶名稱。

#### `S3_ENDPOINT_URL`

- 類型: `str`
- 描述: 設定 S3 存儲的端點 URL。

#### `S3_KEY_PREFIX`

- 類型: `str`
- 描述: 設定 S3 物件的鍵前綴。

#### `S3_REGION_NAME`

- 類型: `str`
- 描述: 設定 S3 存儲的地區名稱。

#### `S3_SECRET_ACCESS_KEY`

- 類型: `str`
- 描述: 設定 S3 存儲的秘密存取金鑰。

#### `S3_USE_ACCELERATE_ENDPOINT`

- 類型: `str`
- 預設值: `False`
- 描述: 指定是否使用 S3 存儲的加速端點。

#### `S3_ENABLE_TAGGING`

- 類型: `str`
- 預設值: `False`
- 描述: 啟用上傳後的 S3 物件標籤，用於更好的組織、搜索和與文件管理策略的整合。在使用 Cloudflare R2 時，始終設為 `False`，因為 R2 不支援物件標籤。

#### Google 雲端存儲

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- 類型: `str`
- 描述: Google 應用程式憑證 JSON 檔案的內容。
  - 選擇性 - 如果未提供，憑證將從環境中獲取。本地運行則使用用戶憑證，Google Compute Engine 運行則使用 Google 元數據伺服器。
  - 可遵循此[指南](https://developers.google.com/workspace/guides/create-credentials#service-account)為服務帳戶生成檔案。

#### `GCS_BUCKET_NAME`

- 類型: `str`
- 描述: 設定 Google 雲端存儲的桶名稱。桶必須已存在。

#### Microsoft Azure 存儲

#### `AZURE_STORAGE_ENDPOINT`

- 類型: `str`
- 描述: 設定 Azure 存儲的端點 URL。

#### `AZURE_STORAGE_CONTAINER_NAME`

- 類型: `str`
- 描述: 設定 Azure 存儲的容器名稱。

#### `AZURE_STORAGE_KEY`

- 類型: `str`
- 描述: 設定 Azure 存儲的存取金鑰。
  - 選擇性 - 如果未提供，憑證將從環境中獲取。本地運行則使用用戶憑證，Azure 服務運行則使用管理身份。

### 資料庫池

#### `DATABASE_URL`

- 類型: `str`
- 預設值: `sqlite:///${DATA_DIR}/webui.db`
- 描述: 指定要連接的資料庫 URL。

:::info

支援 SQLite 和 Postgres。更改 URL 不會在資料庫之間遷移數據。
URL 架構的文件可在[此處](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)找到。

:::

#### `DATABASE_SCHEMA`

- 類型: `str`
- 預設值: `None`
- 描述: 指定要連接的資料庫架構。

#### `DATABASE_POOL_SIZE`

- 類型: `int`
- 預設值: `0`
- 描述: 指定資料庫池的大小。值為 `0` 則禁用池。

#### `DATABASE_POOL_MAX_OVERFLOW`

- 類型: `int`
- 預設值: `0`
- 描述: 指定資料庫池的最大溢出。

:::info

有關此設定的更多信息可在[此處](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)找到。

:::

#### `DATABASE_POOL_TIMEOUT`

- 類型: `int`
- 預設值: `30`
- 描述: 指定獲取連接的資料庫池超時時間（以秒為單位）。

:::info

有關此設定的更多信息可在[此處](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)找到。

:::

#### `DATABASE_POOL_RECYCLE`

- 類型: `int`
- 預設值: `3600`
- 描述: 指定資料庫池的重循環時間（以秒為單位）。

:::info

有關此設定的更多信息可在[此處](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)找到。

:::

### Redis

#### `REDIS_URL`

- 類型: `str`
- 範例: `redis://localhost:6379/0`
- 描述: 指定應用狀態的 Redis 實例 URL。

:::info

部署 Open-WebUI 至多節點/工作器集群時，必須確保 REDIS_URL 值已設置。如果未設置，會出現會話、持久性和應用狀態的一致性問題，因為工作器將無法通信。

:::

#### `REDIS_SENTINEL_HOSTS`

- 類型: `str`
- 說明：以逗號分隔的 Redis Sentinel 列表，用於應用程式狀態。如果指定，`REDIS_URL` 中的 "hostname" 將被解釋為 Sentinel 服務名稱。

#### `REDIS_SENTINEL_PORT`

- 類型：`int`
- 預設值：`26379`
- 說明：應用程式狀態 Redis 的 Sentinel 埠。

#### `ENABLE_WEBSOCKET_SUPPORT`

- 類型：`bool`
- 預設值：`True`
- 說明：啟用 Open WebUI 中的 websocket 支援。

:::info

當在多節點/工作者叢集中部署 Open-WebUI 時，您必須確保設定 ENABLE_WEBSOCKET_SUPPORT 的值。如果未設定，將會出現 websocket 的一致性和持久性問題。

:::

#### `WEBSOCKET_MANAGER`

- 類型：`str`
- 預設值：`redis`
- 說明：指定要使用的 websocket 管理器（此案例中為 Redis）。

:::info

當在多節點/工作者叢集中部署 Open-WebUI 時，您必須確保設定 WEBSOCKET_MANAGER 的值並使用類似 Redis 的鍵值 NoSQL 資料庫。如果未設定，將會出現 websocket 的一致性和持久性問題。

:::

#### `WEBSOCKET_REDIS_URL`

- 類型：`str`
- 預設值：`${REDIS_URL}`
- 說明：指定用于 websocket 通信的 Redis 實例的 URL。它與 `REDIS_URL` 不同，實際情況下建議兩者都設定。

:::info

當在多節點/工作者叢集中部署 Open-WebUI 時，您必須確保設定 WEBSOCKET_REDIS_URL 的值並使用類似 Redis 的鍵值 NoSQL 資料庫。如果未設定，將會出現 websocket 的一致性和持久性問題。

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- 類型：`str`
- 說明：以逗號分隔的 Redis Sentinel 列表，用於 websocket。如果指定，`WEBSOCKET_REDIS_URL` 中的 "hostname" 將被解釋為 Sentinel 服務名稱。

#### `WEBSOCKET_SENTINEL_PORT`

- 類型：`int`
- 預設值：`26379`
- 說明：websocket Redis 的 Sentinel 埠。

### Uvicorn 設定

#### `UVICORN_WORKERS`

- 類型：`int`
- 預設值：`1`
- 說明：控制 Uvicorn 生成的工作進程數量來處理請求。每個工作進程都在單獨的進程中運行應用程式的實例。

:::info

當在像 Kubernetes 或使用 Helm charts 這樣的協調環境中部署時，建議將 UVICORN_WORKERS 保持為 1。容器協調平台已經通过 pod 複製提供了自己的擴展機制，在容器內使用多個工作進程可能會導致資源分配問題並複雜化水平擴展策略。

如果您使用 UVICORN_WORKERS，還需要確保為可擴展的多例設置配置了相關的環境變數。

:::

### 代理設定

Open WebUI 支援使用代理進行 HTTP 和 HTTPS 獲取。要指定代理設置，
Open WebUI 使用以下環境變數：

#### `http_proxy`

- 類型：`str`
- 說明：設定 HTTP 代理的 URL。

#### `https_proxy`

- 類型：`str`
- 說明：設定 HTTPS 代理的 URL。

#### `no_proxy`

- 類型：`str`
- 說明：列出應避免使用代理的域擴展（或 IP 位址），
用逗號分隔。例如，將 no_proxy 設置為 .mit.edu 可確保在訪問來自 MIT 的文件時繞過代理。

### 安裝所需的 Python 套件

Open WebUI 提供環境變數來自訂 pip 安裝過程。以下是 Open WebUI 用於調整套件安裝行為的環境變數：

#### `PIP_OPTIONS`

- 類型：`str`
- 說明：指定 pip 安裝套件時應使用的額外命令行選項。例如，可以加入 `--upgrade`、`--user` 或 `--no-cache-dir` 等標誌來控制安裝流程。

#### `PIP_PACKAGE_INDEX_OPTIONS`

- 類型：`str`
- 說明：為 pip 定義自訂的套件索引行為。這可以包括指定額外或替代的索引 URL（例如 `--extra-index-url`）、驗證憑據或其他參數，以管理如何從不同位置檢索套件。
