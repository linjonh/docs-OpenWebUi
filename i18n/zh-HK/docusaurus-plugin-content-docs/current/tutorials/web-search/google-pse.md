---
sidebar_position: 5
title: "Google PSE"
---

:::warning
此教學是社群貢獻內容，並不受 Open WebUI 團隊支持。它僅用於展示如何根據您的特定使用情況自定義 Open WebUI。想要貢獻嗎？請查看貢獻教學。
:::

## Google PSE API

### 設置

1. 前往 Google Developers，使用 [可編程搜索引擎](https://developers.google.com/custom-search)，並登錄或建立帳戶。
2. 前往 [控制面板](https://programmablesearchengine.google.com/controlpanel/all)，然後點擊 `新增` 按鈕。
3. 輸入搜索引擎名稱，設置其他屬性以滿足您的需求，驗證您不是機器人，然後點擊 `建立` 按鈕。
4. 生成 `API 金鑰` 並獲取 `搜索引擎 ID`。（創建引擎後即可使用）
5. 擁有 `API 金鑰` 和 `搜索引擎 ID` 後，打開 `Open WebUI 管理面板`，點擊 `設定` 頁籤，然後點擊 `Web 搜索`。
6. 啟用 `Web 搜索` 並將 `Web 搜索引擎` 設置為 `google_pse`。
7. 將 `Google PSE API Key` 填入該 `API 金鑰` 和 `Google PSE Engine Id` (# 4)。
8. 點擊 `儲存`。

![Open WebUI 管理面板](/images/tutorial_google_pse1.png)

#### 注意

您需要在提示框中通過加號（`+`）按鈕啟用 `Web 搜索`。
搜索網頁 ;-)

![啟用 Web 搜索](/images/tutorial_google_pse2.png)
