---
sidebar_position: 5
title: "📜 Logging in Open WebUI"
---

# 理解 Open WebUI 的日誌 🪵

日誌對於調試、監控以及理解 Open WebUI 的行為至關重要。本指南說明了在 **瀏覽器客戶端**（前端）和 **應用伺服器/後端** 中日誌的工作原理。

## 🖥️ 瀏覽器客戶端日誌（前端）

在進行前端開發和調試時，Open WebUI 利用標準的瀏覽器控制台日誌。這意味著您可以直接在網頁瀏覽器的內建開發者工具中查看日誌。

**如何訪問瀏覽器日誌：**

1. **打開開發者工具：** 在大多數瀏覽器中，您可以通過以下方式打開開發者工具：
   - **右鍵點擊** Open WebUI 網頁任意區域，然後選擇 "Inspect" 或 "Inspect Element"。
   - 按下 **F12**（或 macOS 平臺上使用 Cmd+Opt+I）。

2. **切換到 "Console" 標籤：** 在開發者工具面板中，找到並點擊 "Console" 標籤。

**瀏覽器日誌的類型：**

Open WebUI 主要使用 [JavaScripts](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()` 進行客戶端日誌記錄。您可以在控制台中看到以下類型的訊息：

- **訊息性消息：** 一般的應用程序流程和狀態。
- **警告消息：** 潛在問題或非致命性錯誤。
- **錯誤消息：** 可能影響功能的問題。

**不同瀏覽器的開發者工具：**

不同的瀏覽器提供的開發者工具略有不同，但它們都提供檢視 JavaScript 日誌的控制台。以下是主流瀏覽器的文檔鏈接：

- **[Blink] Chrome/Chromium（例如 Chrome、Edge）：** [Chrome DevTools 文檔](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox：** [Firefox 開發者工具文檔](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari：** [Safari 開發者工具文檔](https://developer.apple.com/safari/tools/)

## ⚙️ 應用伺服器/後端日誌（Python）

Open WebUI 的後端使用 Pythons 內建 `logging` 模組來記錄伺服器端的事件和訊息。這些日誌對於理解伺服器行為、診斷錯誤和監控性能至關重要。

**關鍵概念：**

- **Python `logging` 模組：** Open WebUI 利用標準的 Python `logging` 庫。如果您熟悉 Python 的日誌記錄，這部分將會比較直接。（欲了解更詳盡信息，請參閱 [Python Logging 文檔](https://docs.python.org/3/howto/logging.html#logging-levels)）。
- **控制台輸出：** 默認情況下，後端日誌會輸出到控制台（標準輸出），這使得它們可在您的終端或 Docker 容器日誌中檢視。
- **日誌層級：** 日誌層級控制日誌的詳細程度。您可以配置 Open WebUI 顯示更多或較少的詳細資訊，具體取決於這些層級。

### 🚦 日誌層級說明

Python 日誌使用層級等級來按嚴重性分類日誌訊息。以下是這些層級的簡介，從最嚴重到最不嚴重：

| 層級       | 數值         | 描述                                                                      | 用例                                                                        |
| ----------- | ------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `CRITICAL`  | 50            | **嚴重錯誤** 可能導致應用的終止。                                            | 災難性失敗、數據損壞。                                                       |
| `ERROR`     | 40            | **錯誤** 表示問題，但應用程序可能仍然可以運行。                             | 可恢復的錯誤、操作失敗。                                                     |
| `WARNING`   | 30            | **潛在問題** 或應該仔細調查的非預期情況。                                   | 即將棄用警告、資源約束等。                                                   |
| `INFO`      | 20            | **一般訊息** 關於應用程序運行狀態。                                        | 啟動消息、關鍵事件、正常操作流。                                             |
| `DEBUG`     | 10            | **詳細調試信息** 為開發者提供細節。                                        | 函數調用、變數值、詳細執行步驟。                                             |
| `NOTSET`    | 0             | **記錄所有消息。** （如果未設置，通常默認為 `WARNING`）。                  | 捕獲所有信息，通常用於非常特定的調試用途。                                   |

**默認層級：** Open WebUI 的默認日誌層級是 `INFO`。

### 🌍 全域日誌層級（`GLOBAL_LOG_LEVEL`）

您可以使用 `GLOBAL_LOG_LEVEL` 環境變數更改整個 Open WebUI 後端的 **全域** 日誌層級。這是控制日誌詳略程度最簡單的方式。

**工作原理：**

設定 `GLOBAL_LOG_LEVEL` 可以配置 Python 中的根記錄器，影響 Open WebUI 中的所有記錄器，並可能影響使用 [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig) 的某些第三方庫。這採用了 `logging.basicConfig(force=True)`，意味著它將覆蓋任何現有的根記錄器配置。

**範例：設定為 `DEBUG`**

- **Docker 參數：**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`)：**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**影響：** 將 `GLOBAL_LOG_LEVEL` 設定為 `DEBUG` 將產生最詳細的日誌，包括對開發和故障排除有幫助的詳細資訊。對於生產環境，將其設置為 `INFO` 或 `WARNING` 可能更合適，以減少日誌量。

### ⚙️ 應用/後端特定的記錄級別

為了更細粒度的控制，Open WebUI 提供了環境變數來設置特定後端組件的記錄級別。記錄功能仍在持續改進中，但可以使用這些環境變數提供一定程度的控制。這些變數允許您為應用的不同部分微調記錄。

**可用的環境變數：**

| 環境變數          | 組件/模組                                                    | 描述                                                                 |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | 音訊處理                                                    | 與音訊轉錄（faster-whisper）、語音合成 (TTS) 和音訊處理相關的記錄。         |
| `COMFYUI_LOG_LEVEL`  | ComfyUI 整合                                                | 與 ComfyUI 的互動記錄（如果您正在使用該整合）。                     |
| `CONFIG_LOG_LEVEL`   | 配置管理                                                   | 與加載和處理 Open WebUI 配置檔案相關的記錄。                            |
| `DB_LOG_LEVEL`       | 資料庫操作（Peewee）                                        | 與使用 Peewee ORM（物件關係映射器）進行資料庫互動相關的記錄。             |
| `IMAGES_LOG_LEVEL`   | 圖像生成（AUTOMATIC1111/Stable Diffusion）                  | 與圖像生成任務相關的記錄，尤其是在使用 AUTOMATIC1111 Stable Diffusion 整合時。 |
| `MAIN_LOG_LEVEL`     | 主應用執行（根記錄器）                                       | 來自主應用程式入口點和根記錄器的記錄。                                  |
| `MODELS_LOG_LEVEL`   | 模型管理                                                   | 與加載、管理和與語言模型（LLMs）互動（包括身份驗證）相關的記錄。            |
| `OLLAMA_LOG_LEVEL`   | Ollama 後端整合                                            | 與 Ollama 後端的通信和互動記錄。                                       |
| `OPENAI_LOG_LEVEL`   | OpenAI API 整合                                            | 與 OpenAI API 的互動記錄（例如，使用 GPT 模型）。                      |
| `RAG_LOG_LEVEL`      | 檢索增強生成（RAG）                                         | RAG 管道的記錄，包括 Chroma 向量資料庫和 Sentence-Transformers。       |
| `WEBHOOK_LOG_LEVEL`  | 身份驗證 Webhook                                           | 身份驗證 Webhook 功能的擴展記錄。                                       |

**如何使用：**

您可以使用與 `GLOBAL_LOG_LEVEL` 相同的方式設置這些環境變數（Docker 參數，Docker Compose `environment` 區段）。例如，要獲取有關 Ollama 互動的更詳細記錄，您可以設置：

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**重要注意事項：** 不同於 `GLOBAL_LOG_LEVEL`，這些應用特定的變數可能不會影響 *所有* 第三方模組的記錄，它們主要控制 Open WebUI 代碼庫內的記錄。

通過理解和利用這些記錄機制，您可以高效地監控、調試並深入了解您的 Open WebUI 實例。
