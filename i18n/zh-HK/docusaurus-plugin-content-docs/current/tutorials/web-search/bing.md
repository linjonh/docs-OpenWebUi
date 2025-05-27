---
sidebar_position: 1
title: "Bing"
---

:::warning
此教程為社群貢獻，並非由 Open WebUI 團隊支持。它僅用於展示如何根據您的特定需求自定義 Open WebUI。想要貢獻？查看貢獻教程。
:::

## Bing API

### 設置

1. 前往 [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) 並創建一個新的資源。資源創建完成後，您將被重定向到資源概覽頁面。在該頁面選擇 "點擊此處管理金鑰"。![點擊此處管理金鑰](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. 在金鑰管理頁面中，找到 Key1 或 Key2，並複製您需要的金鑰。
3. 打開 Open WebUI 管理面板，切換到設置頁籤，然後選擇 Web 搜索。
4. 啟用 Web 搜索選項，並將 Web 搜索引擎設置為 bing。
5. 在 `SearchApi API Key` 中填寫您在步驟 2 的 [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) 儀表板中複製的 `API 金鑰`。
6. 點擊 `保存`。
