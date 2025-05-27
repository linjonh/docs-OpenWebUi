---
sidebar_position: 5
title: "Google PSE"
---

:::警告
本教程由社区贡献，不受 Open WebUI 团队支持。仅作为如何针对特定使用案例定制 Open WebUI 的演示。想要贡献？查阅贡献教程。
:::

## Google PSE API

### 设置

1. 访问 Google 开发者，使用 [可编程搜索引擎](https://developers.google.com/custom-search)，登录或创建账号。
2. 进入 [控制面板](https://programmablesearchengine.google.com/controlpanel/all) 并点击 `添加` 按钮
3. 输入搜索引擎名称，设置其他属性以满足您的需求，验证您不是机器人并点击 `创建` 按钮。
4. 生成 `API 密钥` 并获取 `搜索引擎 ID`。（在创建引擎后可用）
5. 使用 `API 密钥` 和 `搜索引擎 ID`，打开 `Open WebUI 管理面板` 并点击 `设置` 标签，然后点击 `网页搜索`
6. 启用 `网页搜索` 并将 `网页搜索引擎` 设置为 `google_pse`
7. 使用 `API 密钥` 填写 `Google PSE API 密钥` 以及 `Google PSE 引擎 ID`（# 4）
8. 点击 `保存`

![Open WebUI 管理面板](/images/tutorial_google_pse1.png)

#### 注意

您需要在提示字段中使用加号 (`+`) 按钮来启用 `网页搜索`。
搜索网络 ;-)

![启用网页搜索](/images/tutorial_google_pse2.png)
