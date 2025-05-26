---
sidebar_position: 4000
title: "🐤 Docling 文档提取"
---

:::warning
本教程是由社区贡献，未经过 Open WebUI 团队支持。它仅作为如何针对您的特定用例自定义 Open WebUI 的演示。希望贡献内容？请查看贡献教程。
:::

## 🐤 Docling 文档提取

本文档提供了将 Docling 整合到 Open WebUI 中的分步指南。Docling 是一个文档处理库，设计用于将各种文件格式（包括 PDF、Word 文档、电子表格、HTML 和图像）转换为结构化数据，如 JSON 或 Markdown。凭借内置的布局检测、表格解析和语言感知处理支持，Docling 通过统一且可扩展的界面简化了面向 AI 应用（如搜索、摘要和增强型生成）的文档准备工作。

先决条件
------------

* Open WebUI 实例
* 已在系统中安装 Docker
* 为 Open WebUI 设置的 Docker 网络

集成步骤
----------------

### 第 1 步：运行 Docling-Serve 的 Docker 命令

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*支持 GPU 的版本：
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### 第 2 步：配置 Open WebUI 使用 Docling

* 登录到您的 Open WebUI 实例。
* 导航到 `Admin Panel` 设置菜单。
* 点击 `Settings`。
* 点击 `Documents` 选项卡。
* 将 `Default` 内容提取引擎下拉菜单更改为 `Docling`。
* 将上下文提取引擎 URL 更新为 `http://host.docker.internal:5001`。
* 保存更改。

验证 Docker 中的 Docling
=====================================

要验证 Docling 在 Docker 环境中是否正常工作，可以按照以下步骤进行：

### 1. 启动 Docling Docker 容器

首先，确保 Docling Docker 容器正在运行。您可以使用以下命令启动它：

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

此命令启动 Docling 容器，并将容器的 5001 端口映射到本地机器的 5001 端口。

### 2. 验证服务器是否运行

* 访问 `http://127.0.0.1:5001/ui/` 
* 该 URL 应该会显示一个 UI 界面供您使用 Docling

### 3. 验证集成

* 您可以尝试通过 UI 上传一些文件，并检查它是否返回 MD 格式或您期望的格式的输出

### 总结

将 Docling 集成到 Open WebUI 是一种简易且高效的方法，可增强文档处理和内容提取功能。通过遵循本指南中的步骤，您可以将 Docling 设置为默认提取引擎，并在 Docker 环境中验证其运行情况。一旦配置完成，Docling 将实现强大的、与格式无关的文档解析，为 Open WebUI 提供更高级的 AI 功能支持。
