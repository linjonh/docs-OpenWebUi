---
sidebar_position: 4100
title: "🦊 Firefox AI Chatbot Sidebar"
---

:::warning
此教學由社群貢獻，並未獲得 Open WebUI 團隊的支持。此教學僅用於展示如何根據您的特定使用案例自訂 Open WebUI。想要貢獻嗎？查看貢獻教學。
:::

## 🦊 Firefox AI 聊天機器人側邊欄

# 將 Open WebUI 整合為 Mozilla Firefox 本地 AI 聊天機器人瀏覽助手

## 先決條件

在將 Open WebUI 整合為 Mozilla Firefox AI 聊天機器人瀏覽助手之前，請確保您擁有：

* Open WebUI 實例 URL（本地或域名）
* 已安裝的 Firefox 瀏覽器

## 啟用 Firefox 中的 AI 聊天機器人

1. 點擊漢堡選單按鈕（三條橫線按鈕，位於右上角，緊貼 `X` 按鈕下方）
2. 開啟 Firefox 設定
2. 點擊 `Firefox Labs` 區段
3. 切換開啟 `AI Chatbot`

或者，您可以通過 `about:config` 頁面啟用 AI 聊天機器人（在下一節中描述）。

## 配置 about:config 設定

1. 在 Firefox 地址欄中輸入 `about:config`
2. 點擊 `接受風險並繼續`
3. 搜尋 `browser.ml.chat.enabled` 並將其切換為 `true`（如果尚未通過 Firefox Labs 啟用）
4. 搜尋 `browser.ml.chat.hideLocalhost` 並將其切換為 `false`

### browser.ml.chat.prompts.#

要添加自訂提示，請按照以下步驟操作：

1. 搜尋 `browser.ml.chat.prompts.#`（將 `#` 替換為數字，例如 `0`、`1`、`2` 等）
2. 點擊 `+` 按鈕添加新提示
3. 輸入提示標籤、值和 ID（例如 `{"id":"My Prompt", "value": "This is my custom prompt.", "label": "My Prompt"}`）
4. 根據需要重複該過程以添加更多提示

### browser.ml.chat.provider

1. 搜尋 `browser.ml.chat.provider`
2. 輸入您的 Open WebUI 實例 URL，包括任何可選參數（例如 `https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`）

## Open WebUI 的 URL 參數

以下 URL 參數可以用於自訂您的 Open WebUI 實例：

### 模型及模型選擇

* `models`: 指定多個模型（逗號分隔的列表）以進行聊天會話（例如 `/?models=model1,model2`）
* `model`: 指定單個模型作為聊天會話使用（例如 `/?model=model1`）

### YouTube 文字轉錄

* `youtube`: 提供 YouTube 影片 ID，以在聊天中轉錄影片內容（例如 `/?youtube=VIDEO_ID`）

### 網頁搜索

* `web-search`: 啟用網頁搜索功能，將該參數設置為 `true`（例如 `/?web-search=true`）

### 工具選擇

* `tools` 或 `tool-ids`: 指定以逗號分隔的工具 ID 列表，在聊天中啟用（例如 `/?tools=tool1,tool2` 或 `/?tool-ids=tool1,tool2`）

### 通話覆蓋層

* `call`: 在聊天介面中啟用影片或通話覆蓋層，將該參數設置為 `true`（例如 `/?call=true`）

### 初始查詢提示

* `q`: 設置聊天的初始查詢或提示（例如 `/?q=Hello%20there`）

### 臨時聊天會話

* `temporary-chat`: 通過將該參數設置為 `true` 將聊天標記為臨時會話（例如 `/?temporary-chat=true`）

查看 https://docs.openwebui.com/features/chat-features/url-params 以獲取有關 URL 參數及其使用的更多信息。

## 附加的 about:config 設定

以下 `about:config` 設定可以調整以進一步自訂：

* `browser.ml.chat.shortcuts`: 啟用 AI 聊天機器人側邊欄的自訂快捷鍵
* `browser.ml.chat.shortcuts.custom`: 啟用 AI 聊天機器人側邊欄的自訂快捷按鍵
* `browser.ml.chat.shortcuts.longPress`: 設定快捷按鍵的長按延遲
* `browser.ml.chat.sidebar`: 啟用 AI 聊天機器人側邊欄
* `browser.ml.checkForMemory`: 在加載模型之前檢查可用內存
* `browser.ml.defaultModelMemoryUsage`: 設定模型的默認內存使用量
* `browser.ml.enable`: 啟用 Firefox 中的機器學習功能
* `browser.ml.logLevel`: 設定機器學習功能的日誌級別
* `browser.ml.maximumMemoryPressure`: 設定最大內存壓力閾值
* `browser.ml.minimumPhysicalMemory`: 設定所需的最小物理內存
* `browser.ml.modelCacheMaxSize`: 設定模型緩存的最大大小
* `browser.ml.modelCacheTimeout`: 設定模型緩存的超時時間
* `browser.ml.modelHubRootUrl`: 設定模型集線器的根 URL
* `browser.ml.modelHubUrlTemplate`: 設定模型集線器的 URL 模板
* `browser.ml.queueWaitInterval`: 設定隊列等待的間隔時間
* `browser.ml.queueWaitTimeout`: 設定隊列等待的超時時間

## 訪問 AI 聊天機器人側邊欄

可用以下任一方法訪問 AI 聊天機器人側邊欄：

* 按 `CTRL+B` 開啟書籤側邊欄並切換到 AI 聊天機器人
* 按 `CTRL+Alt+X` 直接開啟 AI 聊天機器人側邊欄