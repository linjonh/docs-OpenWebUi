---
sidebar_position: 4100
title: "🦊 Firefox AI聊天机器人侧边栏"
---

:::warning
本教程是社区贡献内容，不受Open WebUI团队支持。它仅作为如何根据您的特定用例自定义Open WebUI的演示。想要做出贡献？请查看贡献教程。
:::

## 🦊 Firefox AI聊天机器人侧边栏

# 在Mozilla Firefox中将Open WebUI集成为本地AI聊天机器人浏览器助手

## 先决条件

在将Open WebUI集成为Mozilla Firefox中的AI聊天机器人浏览器助手之前，请确保您已经拥有：

* Open WebUI实例URL（本地或域名）
* 已安装Firefox浏览器

## 在Firefox中启用AI聊天机器人

1. 点击汉堡按钮（三条横线按钮，位于右上角，`X`按钮下方）
2. 打开Firefox设置
2. 点击`Firefox实验室`部分
3. 打开`AI聊天机器人`开关

或者，您可以通过`about:config`页面启用AI聊天机器人（在下一部分中描述）。

## 配置about:config设置

1. 在Firefox地址栏中输入`about:config`
2. 点击`接受风险并继续`
3. 搜索`browser.ml.chat.enabled`并将其切换为`true`，如果尚未通过Firefox实验室启用
4. 搜索`browser.ml.chat.hideLocalhost`并将其切换为`false`

### browser.ml.chat.prompts.#

要添加自定义提示，请按照以下步骤操作：

1. 搜索`browser.ml.chat.prompts.#`（将`#`替换为数字，例如`0`，`1`，`2`等）
2. 点击`+`按钮以添加新提示
3. 输入提示标签、值和ID（例如`{"id":"我的提示", "value": "这是我的自定义提示。", "label": "我的提示"}`）
4. 重复该过程以根据需要添加更多提示

### browser.ml.chat.provider

1. 搜索`browser.ml.chat.provider`
2. 输入您的Open WebUI实例URL，包括任何可选参数（例如`https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`）

## Open WebUI的URL参数

以下URL参数可用于自定义您的Open WebUI实例：

### 模型和模型选择

* `models`: 为聊天会话指定多个模型（逗号分隔的列表，例如`/?models=model1,model2`）
* `model`: 为聊天会话指定单个模型（例如`/?model=model1`）

### YouTube视频转录

* `youtube`: 提供YouTube视频ID以在聊天中转录视频（例如`/?youtube=VIDEO_ID`）

### 网页搜索

* `web-search`: 通过设置此参数为`true`启用网页搜索功能（例如`/?web-search=true`）

### 工具选择

* `tools`或`tool-ids`: 指定逗号分隔的工具ID列表，以在聊天中激活（例如`/?tools=tool1,tool2`或`/?tool-ids=tool1,tool2`）

### 通话覆盖层

* `call`: 通过设置此参数为`true`在聊天界面中启用视频或通话覆盖层（例如`/?call=true`）

### 初始查询提示

* `q`: 为聊天设置初始查询或提示（例如`/?q=Hello%20there`）

### 临时聊天会话

* `temporary-chat`: 通过将此参数设置为`true`将聊天标记为临时会话（例如`/?temporary-chat=true`）

请参阅https://docs.openwebui.com/features/chat-features/url-params了解更多关于URL参数及其用法的信息。

## 其他about:config设置

以下`about:config`设置可以进行调整以进一步自定义：

* `browser.ml.chat.shortcuts`: 启用AI聊天机器人侧边栏的自定义快捷方式
* `browser.ml.chat.shortcuts.custom`: 启用AI聊天机器人侧边栏的自定义快捷键
* `browser.ml.chat.shortcuts.longPress`: 设置快捷键的长按延迟
* `browser.ml.chat.sidebar`: 启用AI聊天机器人侧边栏
* `browser.ml.checkForMemory`: 在加载模型之前检查可用内存
* `browser.ml.defaultModelMemoryUsage`: 设置模型的默认内存使用量
* `browser.ml.enable`: 启用Firefox中的机器学习功能
* `browser.ml.logLevel`: 设置机器学习功能的日志级别
* `browser.ml.maximumMemoryPressure`: 设置最大内存压力阈值
* `browser.ml.minimumPhysicalMemory`: 设置所需的最低物理内存
* `browser.ml.modelCacheMaxSize`: 设置模型缓存的最大大小
* `browser.ml.modelCacheTimeout`: 设置模型缓存超时
* `browser.ml.modelHubRootUrl`: 设置模型库的根URL
* `browser.ml.modelHubUrlTemplate`: 设置模型库的URL模板
* `browser.ml.queueWaitInterval`: 设置队列等待时间间隔
* `browser.ml.queueWaitTimeout`: 设置队列等待超时时间

## 访问AI聊天机器人侧边栏

要访问AI聊天机器人侧边栏，可以使用以下方法之一：

* 按`CTRL+B`打开书签侧边栏并切换到AI聊天机器人
* 按`CTRL+Alt+X`直接打开AI聊天机器人侧边栏