---
sidebar_position: 17
title: "🪝 Webhook 整合"
---

概覽
--------

Open WebUI 提供了一個 webhook 功能，允許在有新用戶註冊到您的實例時自動接收通知。這是通過向 Open WebUI 提供一個 webhook URL，當新用戶帳號創建後，它就會向該 URL 發送通知。

在 Open WebUI 中配置 Webhooks
---------------------------------

您需要從支持 webhooks 的外部服務（例如 Discord 頻道或 Slack 工作區）獲取一個 webhook URL。此 URL 將用於接收來自 Open WebUI 的通知。

要在 Open WebUI 中配置 webhook，有兩種選擇：

### 選項一：通過管理界面配置

1. 以管理員身份登錄到您的 Open WebUI 實例。
2. 導航到 `Admin Panel`。
3. 點擊位於頂部的 `Settings` 標籤。
4. 從那裡進入管理面板的 `General` 設置部分。
5. 找到 `Webhook URL` 欄位並輸入 webhook URL。
6. 保存更改。

### 選項二：通過環境變數配置

或者，您可以通過設置 `WEBHOOK_URL` 環境變數來配置 webhook URL。有關 Open WebUI 中環境變數的更多信息，請參閱 [環境變數配置](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url)。

### 步驟三：驗證 Webhook

要驗證 webhook 是否正常工作，請在 Open WebUI 中創建一個新用戶帳號。如果 webhook 配置正確，您應立即在指定的 webhook URL 收到通知。

Webhook 負載格式
----------------------

由 Open WebUI 發送的 webhook 負載是純文本形式，包含有關新用戶帳戶的簡單通知消息。負載格式如下：

```
新用戶註冊: <username>
```

例如，如果一位名為 "Tim" 的用戶註冊，發送的負載將為：

```
新用戶註冊: Tim
```

疑難排解
--------------

* 確保 webhook URL 正確且格式正確。
* 驗證 webhook 服務是否已啟用並正確配置。
* 檢查 Open WebUI 日誌中是否有與 webhook 相關的錯誤。
* 驗證連接是否未被防火牆或代理中斷或阻止。
* webhook 伺服器可能暫時不可用或遇到高延遲。
* 如果是通過 webhook 服務提供，確認 Webhook API 密鑰是否已失效、過期或被吊銷。

注意：Open WebUI 中的 webhook 功能仍在逐步完善，我們計劃在未來增加更多功能和事件類型。
