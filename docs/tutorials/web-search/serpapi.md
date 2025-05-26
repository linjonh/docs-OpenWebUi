---
sidebar_position: 15
title: "SerpApi"
---

:::warning
本教程是社区贡献，不受 Open WebUI 团队支持，仅作为如何根据您的特定用例自定义 Open WebUI 的演示。想要贡献？查看贡献教程。
:::

## SerpApi API

[SerpApi](https://serpapi.com/) 从我们快速、易用且完整的 API 中抓取 Google 和其他搜索引擎。支持任何现有或即将出现的返回 `organic_results` 的 SERP 引擎。默认的网络搜索引擎是 `google`，但可以更改为 `bing`、`baidu`、`google_news`、`google_scholar`、`google_patents` 等。

### 设置

1. 前往 [SerpApi](https://serpapi.com/)，登录或创建一个新账户。
2. 进入 `Dashboard` 并复制 API 密钥。
3. 使用 `API 密钥`，打开 `Open WebUI 管理面板` 并点击 `Settings` 选项卡，然后点击 `Web Search`。
4. 启用 `Web search` 并将 `Web Search Engine` 设置为 `serpapi`。
5. 使用您在步骤 2 中从 [SerpApi](https://serpapi.com/) 仪表板复制的 `API 密钥` 填写 `SerpApi API Key`。
6. [可选] 输入您想查询的 `SerpApi Engine` 名称。例如，`google`、`bing`、`baidu`、`google_news`、`google_videos`、`google_scholar` 和 `google_patents`。默认设置为 `google`。更多选项请查阅 [SerpApi 文档](https://serpapi.com/dashboard)。
7. 点击 `Save`。

![Open WebUI 管理面板](/images/tutorial_serpapi_search.png)

#### 注意

您需要在提示字段中启用 `Web search` 才能使用 [SerpApi](https://serpapi.com/) 引擎搜索网络。

![启用 Web search](/images/enable_web_search.png)
