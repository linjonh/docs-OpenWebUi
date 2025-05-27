---
sidebar_position: 4000
title: "🐤 Docling 文档提取"
---

:::warning
本教程是社区贡献，未获得 Open WebUI 团队的支持。它仅作为定制 Open WebUI 以满足特定使用案例的示范。如果想要贡献，请查看贡献教程。
:::

## 🐤 Docling 文档提取

此文档提供将 Docling 集成到 Open WebUI 的分步指南。Docling 是一个文档处理库，旨在将各种文件格式（包括 PDF、Word 文档、电子表格、HTML 和图像）转换为结构化数据（如 JSON 或 Markdown）。借助内置的布局检测、表格解析和语言感知处理功能，Docling 通过统一且可扩展的接口简化了面向人工智能应用（如搜索、摘要和增强检索生成）的文档准备工作。

前提条件
------------

* Open WebUI 实例
* 系统上已安装 Docker
* 为 Open WebUI 设置的 Docker 网络

集成步骤
----------------

### 第 1 步：运行 Docling-Serve 的 Docker 命令

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*支持 GPU：
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### 第 2 步：配置 Open WebUI 使用 Docling

* 登录到你的 Open WebUI 实例。
* 进入 `Admin Panel` 设置菜单。
* 点击 `Settings`。
* 点击 `Documents` 标签。
* 将 `Default` 内容提取引擎下拉菜单更改为 `Docling`。
* 将上下文提取引擎的 URL 更新为 `http://host.docker.internal:5001`。
* 保存更改。

在 Docker 中验证 Docling
=====================================

要验证 Docling 在 Docker 环境中是否正常工作，可以按照以下步骤进行：

### 1. 启动 Docling Docker 容器

首先，确保 Docling Docker 容器正在运行。你可以使用以下命令启动它：

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

此命令启动 Docling 容器，并将容器的端口 5001 映射到本地机器的端口 5001。

### 2. 验证服务器是否运行

* 前往 `http://127.0.0.1:5001/ui/`
* 该 URL 应该指向一个可用于 Docling 的 UI

### 3. 验证集成

* 你可以尝试通过 UI 上传一些文件，它应该会返回 MD 格式或你需要的格式的输出

### 结论

将 Docling 与 Open WebUI 集成是一种简单有效的方式，可增强文档处理和内容提取能力。通过本指南中的步骤，你可以设置 Docling 为默认提取引擎，并验证其在 Docker 环境中运行顺畅。一旦配置完成，Docling 就能提供强大的、格式无关的文档解析，以支持 Open WebUI 中更高级的 AI 功能。
