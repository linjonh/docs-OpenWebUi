---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
本教程是社区贡献，并未经过Open WebUI团队支持。它仅作为如何根据您的具体使用场景自定义Open WebUI的演示。如果您想贡献，请查看贡献教程。
:::

## 👁️ Mistral OCR

本文档提供了将Mistral OCR集成到Open WebUI中的分步指南。Mistral OCR是一款光学字符识别库，旨在从多种基于图像的文件格式（包括扫描PDF、图像和手写文件）中提取文本，并转换为结构化数据，如JSON或纯文本。它提供了高级的多语言文本识别、版面分析和手写解释支持，通过强大的自定义界面简化了文档数字化和处理过程，适用于搜索、摘要和数据提取等AI应用程序。

先决条件
------------

* Open WebUI实例
* Mistral AI账户

集成步骤
----------------

### 第一步：注册或登录Mistral AI控制台

* 访问 `https://console.mistral.ai`
* 按照流程说明进行操作
* 授权成功后，您应该会进入控制台首页

### 第二步：生成API密钥

* 访问 `API Keys` 或 `https://console.mistral.ai/api-keys`
* 创建一个新密钥并确保复制它

### 第三步：配置Open WebUI以使用Mistral OCR

* 登录您的Open WebUI实例。
* 转到 `管理面板` 设置菜单。
* 点击 `设置`。
* 点击 `文档` 选项卡。
* 将 `默认` 内容提取引擎下拉菜单更改为 `Mistral OCR`。
* 在字段中粘贴API密钥
* 保存管理面板。

验证Mistral OCR
=====================================

要验证Mistral OCR是否正常工作，请参考 `https://docs.mistral.ai/capabilities/document/`


### 结论

将Mistral OCR集成到Open WebUI中是一种简单有效的方法，可以增强文档处理和内容提取功能。通过遵循本指南中的步骤，您可以将Mistral OCR设置为默认提取引擎，并利用其先进的文本识别功能。配置完成后，Mistral OCR支持强大的多语言文档解析以及各种格式的支持，增强了Open WebUI中的AI驱动文档分析能力。
