---
sidebar_position: 4100
title: "🦊 Firefox AI 聊天机器人侧边栏"
---

:::warning
本教程是社区贡献，不受 Open WebUI 团队支持，仅作为如何自定义 Open WebUI 以适应您的特定用例的演示。想要贡献？请查看贡献教程。
:::

## 🦊 Firefox AI 聊天机器人侧边栏

# 在 Mozilla Firefox 中将 Open WebUI 集成为本地 AI 聊天机器人浏览器助理

## 先决条件

在将 Open WebUI 集成为 Mozilla Firefox 的 AI 聊天机器人浏览器助理之前，请确保您已准备好以下内容：

* Open WebUI 实例 URL（本地或域）
* 已安装 Firefox 浏览器

## 在 Firefox 中启用 AI 聊天机器人

1. 点击汉堡按钮（三条横线按钮位于右上角，`X` 按钮下方）
2. 打开 Firefox 设置
2. 点击 `Firefox 实验室` 部分
3. 打开 `AI 聊天机器人` 开关

或者，您可以通过 `about:config` 页面启用 AI 聊天机器人（在下节中描述）。

## 配置 about:config 设置

1. 在 Firefox 地址栏中输入 `about:config`
2. 点击 `接受风险并继续`
3. 搜索 `browser.ml.chat.enabled`，如果它尚未通过 Firefox 实验室启用，则将其切换为 `true`
4. 搜索 `browser.ml.chat.hideLocalhost` 并将其切换为 `false`

### browser.ml.chat.prompts.#

要添加自定义提示，请按照以下步骤操作：

1. 搜索 `browser.ml.chat.prompts.#`（将 `#` 替换为数字，例如 `0`, `1`, `2` 等）
2. 点击 `+` 按钮添加新提示
3. 输入提示标签、值和 ID（例如 `{ "id": "我的提示", "value": "这是我的自定义提示。", "label": "我的提示" }`）
4. 重复此过程以根据需要添加更多提示

### browser.ml.chat.provider

1. 搜索 `browser.ml.chat.provider`
2. 输入您的 Open WebUI 实例 URL，包括任何可选参数（例如 `https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`）

## Open WebUI 的 URL 参数

以下 URL 参数可用于自定义您的 Open WebUI 实例：

### 模型及模型选择

* `models`：为聊天会话指定多个模型（逗号分隔列表）（例如：`/?models=model1,model2`）
* `model`：为聊天会话指定单个模型（例如：`/?model=model1`）

### YouTube 转录

* `youtube`：提供一个 YouTube 视频 ID 以在聊天中转录视频（例如：`/?youtube=VIDEO_ID`）

### 网络搜索

* `web-search`：通过将此参数设置为 `true` 启用网络搜索功能（例如：`/?web-search=true`）

### 工具选择

* `tools` 或 `tool-ids`：指定要在聊天中激活的工具 ID 的逗号分隔列表（例如：`/?tools=tool1,tool2` 或 `/?tool-ids=tool1,tool2`）

### 通话覆盖

* `call`：通过将此参数设置为 `true`，在聊天界面中启用视频或通话覆盖（例如：`/?call=true`）

### 初始查询提示

* `q`：为聊天设置一个初始查询或提示（例如：`/?q=Hello%20there`）

### 临时聊天会话

* `temporary-chat`：通过将此参数设置为 `true`，将聊天标记为临时会话（例如：`/?temporary-chat=true`）

有关 URL 参数及其使用方式的更多信息，请参见 https://docs.openwebui.com/features/chat-features/url-params。

## 其他 about:config 设置

可以调整以下 `about:config` 设置以进一步自定义：

* `browser.ml.chat.shortcuts`：为 AI 聊天机器人侧边栏启用自定义快捷方式
* `browser.ml.chat.shortcuts.custom`：为 AI 聊天机器人侧边栏启用自定义快捷键
* `browser.ml.chat.shortcuts.longPress`：设置快捷键的长按延迟
* `browser.ml.chat.sidebar`：启用 AI 聊天机器人侧边栏
* `browser.ml.checkForMemory`：加载模型前检查可用内存
* `browser.ml.defaultModelMemoryUsage`：设置模型的默认内存使用量
* `browser.ml.enable`：启用 Firefox 中的机器学习功能
* `browser.ml.logLevel`：设置机器学习功能的日志级别
* `browser.ml.maximumMemoryPressure`：设置最大内存压力阈值
* `browser.ml.minimumPhysicalMemory`：设置所需的最小物理内存
* `browser.ml.modelCacheMaxSize`：设置模型缓存的最大大小
* `browser.ml.modelCacheTimeout`：设置模型缓存的超时
* `browser.ml.modelHubRootUrl`：设置模型中心的根 URL
* `browser.ml.modelHubUrlTemplate`：设置模型中心的 URL 模板
* `browser.ml.queueWaitInterval`：设置队列等待的间隔
* `browser.ml.queueWaitTimeout`：设置队列等待的超时

## 访问 AI 聊天机器人侧边栏

若要访问 AI 聊天机器人侧边栏，请使用以下方法之一：

* 按 `CTRL+B` 打开书签侧边栏并切换到 AI 聊天机器人
* 按 `CTRL+Alt+X` 直接打开 AI 聊天机器人侧边栏