---
sidebar_position: 15
title: "SerpApi"
---

:::warning
本教程為社群貢獻，未經 Open WebUI 團隊支持。它僅作為如何為特定需求自訂 Open WebUI 的演示。想要貢獻？請查看貢獻教程。
:::

## SerpApi API

[SerpApi](https://serpapi.com/) 從我們的快速、簡單和完整的 API 爬取 Google 和其他搜尋引擎的數據。支援返回 `organic_results` 的任何現有或即將推出的 SERP 引擎。預設的網頁搜尋引擎是 `google`，但可以更改為 `bing`、`baidu`、`google_news`、`google_scholar`、`google_patents` 等。

### 設置

1. 前往 [SerpApi](https://serpapi.com/)，登錄或創建新帳戶。
2. 前往 `Dashboard` 並複製 API 金鑰。
3. 使用 `API key`，打開 `Open WebUI 管理面板`，點擊 `設定` 分頁，然後點擊 `Web Search`。
4. 啟用 `Web search` 並將 `Web Search Engine` 設置為 `serpapi`。
5. 使用從 [SerpApi](https://serpapi.com/) Dashboard 中複製的 `API key` 填寫 `SerpApi API Key`。
6. [可選] 輸入您要查詢的 `SerpApi engine` 名稱。例如，`google`、`bing`、`baidu`、`google_news`、`google_videos`、`google_scholar` 和 `google_patents`。默認情況下設置為 `google`。更多選項請參考 [SerpApi 文件](https://serpapi.com/dashboard)。
7. 點擊 `Save`。

![Open WebUI 管理面板](/images/tutorial_serpapi_search.png)

#### 注意

您必須在提示欄中啟用 `Web search` 以使用 [SerpApi](https://serpapi.com/) 引擎搜尋網頁。

![啟用 Web search](/images/enable_web_search.png)
