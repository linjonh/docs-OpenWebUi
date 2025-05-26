---
sidebar_position: 9
title: "SearchApi"
---

:::warning
此教程为社区贡献内容，并未得到 Open WebUI 团队的支持，仅作为展示如何根据特定使用需求自定义 Open WebUI。想要贡献？请查看贡献教程。
:::

## SearchApi API

[SearchApi](https://searchapi.io) 是一系列实时的 SERP API。任何返回 `organic_results` 的现有或即将推出的 SERP 引擎均受支持。默认的网页搜索引擎是 `google`，但可以更改为 `bing`、`baidu`、`google_news`、`bing_news`、`google_scholar`、`google_patents` 等。

### 设置

1. 前往 [SearchApi](https://searchapi.io)，登录或创建新账户。
2. 进入 `Dashboard` 并复制 API 密钥。
3. 使用 `API 密钥`，打开 `Open WebUI 管理面板`，点击 `Settings` 标签，然后点击 `Web Search`。
4. 启用 `Web search` 并将 `Web Search Engine` 设置为 `searchapi`。
5. 将 `SearchApi API Key` 填入从 [SearchApi](https://www.searchapi.io/) 仪表板步骤 2 中复制的 `API 密钥`。
6. [可选] 输入您想查询的 `SearchApi` 引擎名称。例如: `google`、`bing`、`baidu`、`google_news`、`bing_news`、`google_videos`、`google_scholar` 和 `google_patents`。默认情况下为 `google`。
7. 点击 `Save`。

![Open WebUI 管理面板](/images/tutorial_searchapi_search.png)

#### 注意

您需要在提示字段中启用 `Web search`，使用加号 (`+`) 按钮通过 [SearchApi](https://www.searchapi.io/) 引擎进行网页搜索。

![启用 Web search](/images/enable_web_search.png)
