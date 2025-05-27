---
sidebar_position: 16
title: "Yacy"
---

:::warning
本教程由社群貢獻，並非 Open WebUI 團隊所支援。它僅作為如何自訂 Open WebUI 以適應您的特定使用情境的示範。想貢獻？請查看貢獻教程。
:::

## Yacy API

### 設置

1. 前往: `管理面板` -> `設定` -> `網路搜索`
2. 切換開啟 `啟用網路搜索`
3. 從下拉選單中將 `網路搜索引擎` 設置為 `yacy`
4. 將 `Yacy 實例網址` 設置為以下範例之一：

* `http://yacy:8090` （使用容器名稱和暴露的埠，適用於基於 Docker 的設置）
* `http://host.docker.internal:8090` （使用 `host.docker.internal` DNS 名稱和主機埠，適用於基於 Docker 的設置）
* `https://<yacy.local>:8443` （使用本地域名，適用於本地網路存取）
* `https://yacy.example.com` （使用自定域名的自托管 Yacy 實例，適用於公開或私人存取）
* `https://yacy.example.com:8443` （使用 https 並透過 Yacy 默認的 https 埠）

5. 如果您的 Yacy 實例需要驗證，您可以選擇性地輸入您的 Yacy 使用者名稱和密碼。如果兩者均留空，將跳過摘要驗證。
6. 按下保存

![Open WebUI 管理面板顯示 Yacy 設定](/images/tutorial_yacy.png)
