---
sidebar_position: 15
title: "SerpApi"
---

:::warning
本教程是社区贡献内容，并未得到 Open WebUI 团队的支持。此教程仅作为如何根据您的具体使用场景自定义 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

## SerpApi API

[SerpApi](https://serpapi.com/) 从我们快速、简单且完整的 API 中抓取 Google 和其他搜索引擎。支持任何现有或即将推出的返回 `organic_results` 的搜索引擎。默认的网络搜索引擎是 `google`，但可以设置为 `bing`、`baidu`、`google_news`、`google_scholar`、`google_patents` 和其他。

### 设置

1. 前往 [SerpApi](https://serpapi.com/)，登录或创建一个新账户。
2. 进入 `Dashboard` 并复制 API 密钥。
3. 使用 `API 密钥`，打开 `Open WebUI 管理面板`，点击 `设置` 标签页，然后点击 `网络搜索`。
4. 启用 `网络搜索`，并将 `网络搜索引擎` 设置为 `serpapi`。
5. 在 `SerpApi API 密钥` 填入您在步骤 2 从 [SerpApi](https://serpapi.com/) 仪表盘中复制的 `API 密钥`。
6. [可选] 输入您想查询的 `SerpApi 引擎` 名称。例如，`google`、`bing`、`baidu`、`google_news`、`google_videos`、`google_scholar` 和 `google_patents`。默认设置是 `google`。关于更多选项，请参阅 [SerpApi 文档](https://serpapi.com/dashboard)。
7. 点击 `保存`。

![Open WebUI 管理面板](/images/tutorial_serpapi_search.png)

#### 注意

您需要在提示字段中启用 `网络搜索`，以便使用 [SerpApi](https://serpapi.com/) 引擎进行网络搜索。

![启用网络搜索](/images/enable_web_search.png)
