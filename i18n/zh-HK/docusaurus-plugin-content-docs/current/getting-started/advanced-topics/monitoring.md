---
sidebar_position: 6
title: "📊 監控您的 Open WebUI"
---

# 使用監控保持您的 Open WebUI 健康 🩺

監控您的 Open WebUI 實例至關重要，可以確保其可靠運行、性能良好，並能快速識別和解決任何問題。本指南概述了三個監控層次，從基本可用性檢查到深入的模型響應測試。

**為什麼要監控？**

* **確保正常運行時間：** 主動檢測中斷和服務崩潰。
* **性能洞察力：** 追蹤響應時間並識別潛在的瓶頸。
* **早期問題檢測：** 在問題顯著影響用戶之前捕捉問題。
* **放心無憂：** 確保您的 Open WebUI 實例運行順暢，帶來信心。

## 🚦 監控層次

我們將介紹三個監控層次，從基本到更全面：

1. **基本健康檢查：** 驗證 Open WebUI 服務是否正在運行並響應。
2. **模型連接檢查：** 確認 Open WebUI 能夠連接到並列出您配置的模型。
3. **模型響應測試（深度健康檢查）：** 確保模型能夠實際處理請求並生成響應。

## 層次 1：基本健康檢查端點 ✅

最簡單的監控層次是檢查 `/health` 端點。此端點是公開訪問的（不需要身分驗證），當 Open WebUI 服務正常運行時會返回 `200 OK` 狀態碼。

**如何測試：**

您可以使用 `curl` 或任何 HTTP 客戶端檢查此端點：

```bash
   # 基本健康檢查 - 無需身分驗證
   curl https://your-open-webui-instance/health
```

**預期輸出：** 成功的健康檢查將返回 `200 OK` HTTP 狀態碼。響應正文的內容通常對基本健康檢查並不重要。

### 使用 Uptime Kuma 進行基本健康檢查 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) 是一款出色的開源、易於使用的自託管運行時間監控工具。強烈推薦用於監控 Open WebUI。

**在 Uptime Kuma 中設置的步驟：**

1. **添加新監控：** 在 Uptime Kuma 儀表板中，點擊 "Add New Monitor" 添加新監控。
2. **配置監控設置：**
   * **監控類型：** 選擇 "HTTP(s)"。
   * **名稱：** 給您的監控起一個描述性名稱，例如 "Open WebUI 健康檢查"。
   * **URL：** 輸入健康檢查端點的 URL：`http://your-open-webui-instance:8080/health`（將 `your-open-webui-instance:8080` 替換為您的實際 Open WebUI 地址和端口）。
   * **監控間隔：** 設置檢查頻率（例如，每分鐘一次為 `60 seconds`）。
   * **重試次數：** 設置在認為服務不可用之前的重試次數（例如 `3 次重試`）。

**此檢查驗證什麼：**

* **Web 服務器可用性：** 確保 Web 服務器（例如 Nginx、Uvicorn）響應請求。
* **應用程序運行：** 確認 Open WebUI 應用程序本身正在運行並已初始化。
* **基本數據庫連接：** 通常包括檢查應用程序是否可以連接到數據庫的基本檢查。

## 層次 2：Open WebUI 模型連接 🔗

超越基本可用性，您可以監控 `/api/models` 端點。此端點**需要身分驗證**，並驗證 Open WebUI 是否能成功與您配置的模型提供商（例如 Ollama、OpenAI）通信並檢索可用模型的列表。

**為什麼要監控模型連接？**

* **模型提供商問題：** 檢測模型提供商服務的問題（例如 API 中斷、身分驗證失敗）。
* **配置錯誤：** 識別 Open WebUI 中模型提供商設置的配置問題。
* **確保模型可用性：** 確認您期望可用的模型實際上可供 Open WebUI 访问。

**API 端點詳情：**

請參見 [Open WebUI API 文檔](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models)，瞭解有關 `/api/models` 端點及其響應結構的完整詳細信息。

**如何使用 `curl` 測試（需身分驗證）：**

您需要 API 密鑰才能訪問此端點。請參見以下 "身分驗證設置" 部分了解如何生成 API 密鑰。

```bash
   # 身分驗證的模型連接檢查
   curl -H "Authorization: Bearer YOUR_API_KEY" https://your-open-webui-instance/api/models
```

*(將 `YOUR_API_KEY` 替換為您的實際 API 密鑰，將 `your-open-webui-instance` 替換為您的 Open WebUI 地址。)*

**預期輸出：** 成功的請求將返回 `200 OK` 狀態碼和包含模型列表的 JSON 響應。

### API 密鑰的身分驗證設置 🔑

在您可以監控 `/api/models` 端點之前，需要啟用 Open WebUI 中的 API 密鑰並生成一個密鑰：

1. **啟用 API 密鑰（需要管理員權限）：**
   * 作為管理員登錄 Open WebUI。
   * 前往 **管理員設定**（通常在右上角菜單） > **一般設定**。
   * 找到「啟用 API 金鑰」設定並將其 **開啟**。
   * 點擊 **保存變更**。

2. **生成 API 金鑰（使用者設定）：**
   * 前往你的 **使用者設定**（通常點擊右上角的個人圖標）。
   * 導覽至 **賬戶** 部分。
   * 點擊 **生成新的 API 金鑰**。
   * 為該金鑰提供具描述性的名稱（例如 "監控用 API 金鑰"）。
   * **複製生成的 API 金鑰**並安全地保存。你將需要它來配置你的監控設置。

   *（可選但建議）：* 為了最佳安全實踐，考慮建立一個專門用於監控的 **非管理員用戶帳戶**，並為該用戶生成一個 API 金鑰。這可以限制在監控 API 金鑰被洩露時的潛在影響。

   *如果你在設定中未看到生成 API 金鑰的選項，請聯絡你的 Open WebUI 管理員，確保 API 金鑰功能已啟用。*

### 使用 Uptime Kuma 進行模型連接性監控 🐻

1. **在 Uptime Kuma 中創建新的監控器：**
   * 監控類型："HTTP(s) - JSON Query"。
   * 名稱："Open WebUI 模型連接檢查"。
   * URL：`http://your-open-webui-instance:8080/api/models`（替換為你的 URL）。
   * 方法："GET"。
   * 預期狀態碼：`200`。

2. **配置 JSON 查詢（驗證模型列表）：**
   * **JSON 查詢：** `$count(data[*])>0`
     * **說明：** 此 JSONata 查詢檢查 API 響應中的 `data` 數組（包含模型列表）的計數是否大於 0。換句話說，它驗證是否返回了至少一個模型。
   * **預期值：** `true`（如果列出了模型，查詢應返回 `true`）。

3. **添加身份驗證標頭：**
   * 在 Uptime Kuma 監控器配置的「標頭」部分，點擊「添加標頭」。
   * **標頭名稱：** `Authorization`
   * **標頭值：** `Bearer YOUR_API_KEY`（將 `YOUR_API_KEY` 替換為你生成的 API 金鑰）。

4. **設置監控間隔：** 建議間隔：`300 秒`（5 分鐘）或更長時間，因為模型列表通常不會頻繁更改。

**替代 JSON 查詢（進階）：**

你可以使用更特定的 JSONata 查詢來檢查特定模型或提供者。以下是一些範例：

* **檢查至少有一個 Ollama 模型：** `$count(data[owned_by=ollama])>0`
* **檢查是否存在特定模型（例如：gpt-4o）：** `$exists(data[id=gpt-4o])`
* **檢查是否存在多個特定模型（例如：gpt-4o 和 gpt-4o-mini）：** `$count(data[id in [gpt-4o, gpt-4o-mini]]) = 2`

你可以在 [jsonata.org](https://try.jsonata.org/) 測試和調整你的 JSONata 查詢，使用範例 API 響應來確保它們按預期工作。

## 第三級：模型響應測試（深度健康檢查）🤖

為了進行最全面的監控，你可以測試模型是否能夠處理請求並生成響應。這包括向 `/api/chat/completions` 端點發送一個簡單的聊天完成請求。

**為什麼測試模型響應？**

* **端到端驗證：** 確認整個模型管線是否正常運作，從 API 請求到模型響應。
* **模型加載問題：** 檢測無法加載或響應的特定模型問題。
* **後端處理錯誤：** 捕捉後端邏輯中的錯誤，這些錯誤可能會阻止模型生成完成響應。

**如何使用 `curl` 測試（帶身份驗證的 POST 請求）：**

此測試需要 API 金鑰，並向聊天完成端點發送一個帶有簡單消息的 POST 請求。

```bash
# 測試模型響應 - 帶身份驗證的 POST 請求
curl -X POST https://your-open-webui-instance/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
    "messages": [{"role": "user", "content": "請回應單字 HEALTHY"}],
    "model": "llama3.1",  # 替換為你預期可用的模型
    "temperature": 0      # 將溫度設置為 0 以獲取一致的響應
  }
```

*(將 `YOUR_API_KEY`、`your-open-webui-instance` 和 `llama3.1` 替換為你的實際值。)*

**預期輸出：** 成功的請求將返回 `200 OK` 狀態碼和包含聊天完成的 JSON 響應。你可以驗證響應中是否包含了 "HEALTHY"（或根據你的提示預期的類似回應）。

**在 Uptime Kuma 中設置第三級監控將涉及配置具有 POST 請求、JSON 主體、身份驗證標頭的 HTTP(s) 監控，並可能添加 JSON 查詢以驗證響應內容。這是一個更高級的設置，可以根據你的具體需求進行定制。**

通過實施這些監控級別，你可以主動確保你的 Open WebUI 實例的健康性、可靠性和性能，為用戶提供持續的良好體驗。
