---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
本教程是社区贡献，不受 Open WebUI 团队支持。它仅作为如何根据您的具体用例自定义 Open WebUI 的示例。如果想要贡献内容，请查看贡献教程。
:::

## 👁️ Mistral OCR

本文档提供了将 Mistral OCR 与 Open WebUI 集成的分步指南。Mistral OCR 是一个光学字符识别库，旨在从包括扫描的 PDFs、图像和手写文档在内的各种基于图像的文件格式中提取文本，并将其转换为结构化数据（例如 JSON 或纯文本）。借助对多语言文本识别、布局分析和手写解释的高级支持，Mistral OCR 简化了文档数字化和处理的过程，适用于搜索、摘要和数据提取等 AI 应用，并通过强大且可定制的界面实现。

前提条件
------------

* Open WebUI 实例
* Mistral AI 账号

集成步骤
----------------

### 第一步：注册或登录 Mistral AI 控制台

* 访问 `https://console.mistral.ai`
* 按照流程中的说明操作
* 成功授权后，您将进入控制台主页

### 第二步：生成 API 密钥

* 访问 `API Keys` 或 `https://console.mistral.ai/api-keys`
* 创建一个新密钥并确保将其复制

### 第三步：配置 Open WebUI 使用 Mistral OCR

* 登录到您的 Open WebUI 实例。
* 导航到 `管理面板` 设置菜单。
* 点击 `设置`。
* 点击 `文档` 标签。
* 将 `默认` 内容提取引擎下拉菜单更改为 `Mistral OCR`。
* 在字段中粘贴 API 密钥
* 保存管理面板。

验证 Mistral OCR
=====================================

要验证 Mistral OCR 是否在脚本中正常工作，请参阅 `https://docs.mistral.ai/capabilities/document/`


### 结论

将 Mistral OCR 与 Open WebUI 集成是一种简单且高效的方法，可以增强文档处理和内容提取能力。按照本指南中的步骤，您可以将 Mistral OCR 设置为默认提取引擎，利用其先进的文本识别功能。一旦配置完成，Mistral OCR 可以支持多种格式的强大多语言文档解析，提升 Open WebUI 中基于 AI 的文档分析能力。
