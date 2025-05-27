---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
本教學是社群貢獻內容，並未獲得 Open WebUI 團隊的支持。它僅作為示範，展示如何自定義 Open WebUI 以適應您的特定使用情境。想要貢獻？請檢視貢獻教學。
:::

## 👁️ Mistral OCR

本文件提供了如何將 Mistral OCR 整合到 Open WebUI 的分步指南。Mistral OCR 是一個光學字符識別庫，設計用於從各種基於圖像的文件格式（包括掃描的 PDF、圖像和手寫文檔）中提取文本，並轉換為結構化數據，例如 JSON 或純文本。具有對多語言文本識別、版面分析和手寫解釋的高級支援，Mistral OCR 通過其穩健且可自定義的界面，簡化了文件數位化和處理過程，用於 AI 應用程序，如搜尋、摘要和數據提取。

先決條件
------------

* Open WebUI 實例
* Mistral AI 賬戶

整合步驟
----------------

### 步驟 1：註冊或登錄 Mistral AI 主控台

* 前往 `https://console.mistral.ai`
* 按照流程指示操作
* 成功授權後，您將進入主控台首頁

### 步驟 2：生成 API 金鑰

* 前往 `API Keys` 或 `https://console.mistral.ai/api-keys`
* 創建一個新的金鑰，並確保複製它

### 步驟 3：配置 Open WebUI 使用 Mistral OCR

* 登錄您的 Open WebUI 實例。
* 前往 `Admin Panel` 設置菜單。
* 點擊 `Settings`。
* 點擊 `Documents` 分頁。
* 將 `Default` 內容提取引擎下拉選單更改為 `Mistral OCR`。
* 在欄位中粘貼 API 金鑰
* 儲存管理面板。

驗證 Mistral OCR
=====================================

要驗證 Mistral OCR 在腳本中是否正常運行，請參考 `https://docs.mistral.ai/capabilities/document/`


### 總結

將 Mistral OCR 與 Open WebUI 整合是增強文件處理與內容提取能力的一個簡單而高效的方法。通過遵循本指南中的步驟，您可以將 Mistral OCR 配置為默認提取引擎並利用其高級文本識別功能。一旦完成配置，Mistral OCR 將能夠支持多種格式的強大多語言文檔解析，提升 Open WebUI 中的 AI 驅動文檔分析能力。
