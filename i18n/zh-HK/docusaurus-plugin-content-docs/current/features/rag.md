---
sidebar_position: 11
title: "🔎 檢索增強生成（RAG）"
---

:::warning

如果您使用 **Ollama**，請注意其預設 **上下文長度為 2048 個 token**。這意味著檢索到的資料可能 **完全未被使用**，因為它無法適合可用的上下文窗口。為了提高 **檢索增強生成（RAG）性能**，您應該在 Ollama 模型設定中將上下文長度增加到 **8192+ token**。

:::


檢索增強生成（Retrieval Augmented Generation，RAG）是一項前沿技術，旨在透過整合多種來源的上下文來增強聊天機器人的對話能力。它通過從本地和遠端文件、網頁內容，甚至是多媒體來源（例如 YouTube 視頻）檢索相關資訊來運作。檢索到的文本與預設的 RAG 範本結合，並前置到使用者的提問，提供更加知情且具有上下文相關性的回應。

RAG 的一大優勢是能夠訪問並整合多種來源的資訊，使其成為複雜對話場景的理想解決方案。例如，當使用者提出與特定文件或網頁相關的問題時，RAG 可以檢索並整合該來源中的相關資訊到聊天回應中。RAG 也能從多媒體來源（如 YouTube 視頻）檢索並整合資訊，透過分析這些視頻的文字紀錄或字幕，提取相關資訊並整合到聊天回應中。




## 本地與遠端 RAG 集成

要使用 `#` 符號在查詢前訪問本地文件，必須先透過工作區區域的文件部分上傳。此外，點擊聊天框上方顯示的格式化 URL。一旦選擇，文件圖標就會顯示在 `Send a message` 上方，表示檢索成功。

您也可以通過在提示中以 `#` 開頭，後接 URL 的方式將文件載入工作區域，這可幫助直接將網頁內容整合到您的對話中。

## 網頁搜尋支援 RAG

為了整合網頁內容，可在聊天中以 `#` 開頭，後接目標 URL 點擊聊天框上方顯示的格式化 URL。一旦選擇，文件圖標就會顯示在 `Send a message` 上方，表示檢索成功。若可以，Open WebUI 會檢索並解析 URL 的資訊。

:::tip
網頁通常包含多餘資訊，例如導航欄與頁腳。為了獲得更佳的結果，請鏈接到原始或適合閱讀的版本頁面。
:::

## RAG 範本定制

可通過 `管理面板` > `設定` > `文件` 菜單定制 RAG 範本。

## RAG 嵌入模型支援

可直接在 `管理面板` > `設定` > `文件` 菜單更改 RAG 嵌入模型。此功能支援 Ollama 與 OpenAI 模型，使您能根據需求提升文件處理能力。

## RAG 特性中的引用

RAG 特性使使用者能輕鬆跟蹤餵入 LLM 的文件上下文，並添加引用作為參考點。這確保了在聊天中使用外部來源的透明性與問責性。

## 增強型 RAG 管道

可切換的混合搜尋子功能使我們的 RAG 嵌入功能透過 `BM25` 增強，並由 `CrossEncoder` 驅動重新排序，以及可設定的相關度分數閾值。這為您的具體使用案例提供更精確且量身定制的 RAG 體驗。

## YouTube RAG 管道

專為透過視頻 URL 摘要 YouTube 視頻設計的 RAG 管道，使能與視頻文字紀錄直接交互。此創新功能允許您將視頻內容整合到您的聊天中，進一步豐富您的對話體驗。

## 文件解析

多種解析器可提取本地與遠端文件中的內容。詳情請參見[`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328)功能。

## Google Drive 集成

與啟用了 Google Picker API 和 Google Drive API 的 Google Cloud 專案搭配使用時，該功能允許使用者直接從聊天介面訪問其 Drive 文件並上傳文件、簡報、試算表等，並將其作為上下文上傳到您的聊天。可在 `管理面板` > `設定` > `文件` 菜單中啟用。必須設定[`GOOGLE_DRIVE_API_KEY 和 GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md)環境變數才能使用。

### 詳細指引
1. 創建 OAuth 2.0 用戶端並配置授權的 JavaScript 起源與授權的重定向 URI，設置為您用於訪問 Open-WebUI 實例的 URL（包括端口，若有）。
1. 記下與該OAuth客戶端相關的客戶端ID。
1. 確保為您的專案啟用Google Drive API和Google Picker API。
1. 設定您的應用程式（專案）為測試模式，並將您的Google Drive電子郵件新增至使用者列表。
1. 設定權限範圍，以包括這些API提供的所有功能。由於應用程式處於測試模式，Google不需要進行驗證即可允許應用程式存取有限測試使用者的數據。
1. 進入Google Picker API頁面，然後點擊創建憑證按鈕。
1. 創建一個API Key，然後在應用程式限制下選擇網站。接著將您的Open-WebUI實例的URL加入，與步驟1中的授權JavaScript來源和授權重新導向URI設置相同。
1. 在API Key上設置API限制，使其僅能存取Google Drive API和Google Picker API。
1. 設定環境變數`GOOGLE_DRIVE_CLIENT_ID`為步驟2中的OAuth客戶端的客戶端ID。
1. 設定環境變數`GOOGLE_DRIVE_API_KEY`為步驟7中設定的API Key值（不是步驟2中的OAuth客戶端密鑰）。
1. 設定`GOOGLE_REDIRECT_URI`為我的Open-WebUI實例URL（包含埠，若有）。
1. 然後使用這三個環境變數重新啟動您的Open-WebUI實例。
1. 接著，確保在`管理面板` < `設定` < `文件` < `Google Drive`下啟用了Google Drive。
