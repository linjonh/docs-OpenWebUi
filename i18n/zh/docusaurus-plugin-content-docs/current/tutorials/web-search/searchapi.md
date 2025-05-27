---
sidebar_position: 9
title: "搜索API"
---

:::警告
本教程是社区贡献内容，不受Open WebUI团队支持。它仅用于展示如何根据您的特定用例自定义Open WebUI。想要贡献？请查看贡献教程。
:::

## 搜索API

[SearchApi](https://searchapi.io) 是一系列实时搜索引擎结果页（SERP）API。任何返回`organic_results`的现有或即将推出的搜索引擎都受支持。默认的网络搜索引擎是`google`，但可以更改为`bing`、`baidu`、`google_news`、`bing_news`、`google_scholar`、`google_patents`等。

### 设置

1. 访问[SearchApi](https://searchapi.io)，登录或创建一个新账户。
2. 进入`仪表盘`并复制API密钥。
3. 凭借`API密钥`，打开`Open WebUI管理面板`，点击`设置`选项卡，然后点击`网页搜索`。
4. 启用`网页搜索`并将`网页搜索引擎设置`为`searchapi`。
5. 在`SearchApi API密钥`中填写您从[SearchApi](https://www.searchapi.io/)仪表盘中复制的`API密钥`。
6. [可选] 输入您想要查询的`SearchApi引擎`名称。例如，`google`、`bing`、`baidu`、`google_news`、`bing_news`、`google_videos`、`google_scholar`和`google_patents`。默认情况下，设置为`google`。
7. 点击`保存`。

![Open WebUI管理面板](/images/tutorial_searchapi_search.png)

#### 注意

您需要在提示字段中启用`网页搜索`，使用加号（`+`）按钮通过[SearchApi](https://www.searchapi.io/)引擎搜索网页。

![启用网页搜索](/images/enable_web_search.png)
