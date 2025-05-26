---
sidebar_position: 1
title: "必应 (Bing)"
---

:::warning
本教程是社区贡献内容，并未得到 Open WebUI 团队的支持。它仅作为自定义 Open WebUI 以满足您特定用例的示范。如果想贡献内容，请查看贡献教程。
:::

## 必应 API

### 设置

1. 访问 [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) 并创建一个新资源。创建完成后，您将被重定向到资源概览页面。在该页面选择“单击此处管理密钥”。![单击此处管理密钥](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. 在密钥管理页面中，找到 Key1 或 Key2，并复制您需要的密钥。
3. 打开 Open WebUI 管理面板，切换到设置选项卡，然后选择 Web 搜索。
4. 启用 Web 搜索选项，并将 Web 搜索引擎设置为 bing。
5. 在 `SearchApi API 密钥` 中填写您从 [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) 仪表板中复制的 `API 密钥`。
6. 点击 `保存`。
