---
sidebar_position: 9
title: "SearchApi"
---

:::warning
此教學是社群貢獻內容，並非由 Open WebUI 團隊提供支持。僅用於展示如何根據您的特定需求自訂 Open WebUI。想要投稿貢獻？請查看投稿教學。
:::

## SearchApi API

[SearchApi](https://searchapi.io) 是一套實時 SERP API 集合。任何返回 `organic_results` 的現有或未來的 SERP 引擎均可支持。默認的網頁搜尋引擎是 `google`，但也可以更改為 `bing`、`baidu`、`google_news`、`bing_news`、`google_scholar`、`google_patents` 等其他引擎。

### 設置

1. 訪問 [SearchApi](https://searchapi.io)，並登入或創建新帳戶。
2. 前往 `Dashboard` 並複製 API 金鑰。
3. 使用 `API 金鑰`，開啟 `Open WebUI 管理面板`，點擊 `設置` 標籤，然後點擊 `網頁搜尋`。
4. 啟用 `網頁搜尋`，並將 `網頁搜尋引擎` 設定為 `searchapi`。
5. 將 `SearchApi API Key` 欄位填入您在第 2 步從 [SearchApi](https://www.searchapi.io/) 的仪表板複製的 `API 金鑰`。
6. 【可選】輸入您想要查詢的 `SearchApi 引擎` 名稱。例如，`google`、`bing`、`baidu`、`google_news`、`bing_news`、`google_videos`、`google_scholar` 和 `google_patents`。默認設為 `google`。
7. 點擊 `保存`。

![Open WebUI 管理面板](/images/tutorial_searchapi_search.png)

#### 注意

您需要在提示欄中啟用 `網頁搜尋`，使用加號（`+`）按鈕，以使用 [SearchApi](https://www.searchapi.io/) 引擎搜尋網頁。

![啟用網頁搜尋](/images/enable_web_search.png)
