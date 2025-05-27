---
sidebar_position: 1
title: "必应"
---

:::警告
本教程由社区贡献，并未得到开放WebUI团队的支持。它仅作为如何针对您的具体使用案例自定义开放WebUI的示例。如果想要贡献，请查看贡献教程。
:::

## 必应API

### 设置

1. 前往[AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)，创建一个新资源。创建完成后，您将被重定向到资源概览页。在那里，选择"点击此处管理密钥"。 ![点击此处管理密钥](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. 在密钥管理页面，找到Key1或Key2，然后复制您选择的密钥。
3. 打开开放WebUI管理面板，切换到设置选项卡，然后选择网页搜索。
4. 启用网页搜索选项，并将网页搜索引擎设置为bing。
5. 使用您在步骤2中从[AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)仪表板中复制的`API密钥`填写`SearchApi API Key`。
6. 点击`保存`。
