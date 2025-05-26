---
sidebar_position: 5
title: "Google PSE"
---

:::warning
本教程是社区贡献内容，并未获得 Open WebUI 团队的支持。它仅作为如何根据您的具体使用案例自定义 Open WebUI 的演示。如有意贡献，请查看贡献教程。
:::

## Google PSE API

### 设置

1. 访问 Google Developers，使用 [可编程搜索引擎](https://developers.google.com/custom-search)，登录或创建账户。
2. 转到 [控制面板](https://programmablesearchengine.google.com/controlpanel/all)，点击 `添加` 按钮。
3. 输入搜索引擎名称，设置其他属性以适应您的需求，验证您不是机器人，然后点击 `创建` 按钮。
4. 生成 `API 密钥` 并获取 `搜索引擎 ID`。（创建引擎后可用）
5. 使用 `API 密钥` 和 `搜索引擎 ID`，打开 `Open WebUI 管理面板`，点击 `设置` 标签页，然后点击 `网页搜索`。
6. 启用 `网页搜索` 并将 `网页搜索引擎` 设置为 `google_pse`。
7. 将 `Google PSE API 密钥` 填写为 `API 密钥`，并填写 `Google PSE 引擎 ID`（# 4）。
8. 点击 `保存`。

![Open WebUI 管理面板](/images/tutorial_google_pse1.png)

#### 注意

您需要使用加号 (`+`) 按钮，在提示字段中启用 `网页搜索`。
搜索网络 ;-)

![启用网页搜索](/images/tutorial_google_pse2.png)
