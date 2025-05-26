---
sidebar_position: 25
title: "🔠 LibreTranslate 集成"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持，仅用于展示如何根据特定用例定制 Open WebUI。想要贡献？查看贡献教程。
:::

概述
--------

LibreTranslate 是免费的开源机器翻译 API，支持多种语言。LibreTranslate 是自托管的，支持离线运行，且易于设置，与其他 API 不同，它无需依赖 Google 或 Azure 等专有提供商来完成翻译任务。相反，它的翻译引擎由开源的 [Argos Translate](https://github.com/argosopentech/argos-translate) 库提供支持。你可以将 LibreTranslate 与 Open WebUI 集成，以利用其机器翻译功能。本文档提供了在 Docker 中设置 LibreTranslate 并在 Open WebUI 中进行集成配置的分步指南。

在 Docker 中设置 LibreTranslate
-----------------------------------

按照以下步骤在 Docker 中设置 LibreTranslate：

### 步骤 1：创建 Docker Compose 文件

在任意目录中创建一个名为 `docker-compose.yml` 的新文件，并在文件中添加以下配置：

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: ['CMD-SHELL', './venv/bin/python scripts/healthcheck.py']
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### 步骤 2：创建 `stack.env` 文件

在与 `docker-compose.yml` 文件相同的目录中创建一个名为 `stack.env` 的新文件，并添加以下配置：

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### 步骤 3：运行 Docker Compose 文件

运行以下命令以启动 LibreTranslate 服务：

```bash
docker-compose up -d
```

这将以后台模式启动 LibreTranslate 服务。

在 Open WebUI 中配置集成
-------------------------------------------

在 Docker 中启动 LibreTranslate 后，可以在 Open WebUI 中配置集成。以下是一些社区集成插件可用：

* [LibreTranslate 筛选功能](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslate 动作功能](https://openwebui.com/f/jthesse/libretranslate_action)
* [多语言 LibreTranslate 动作功能](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslate 筛选功能管道](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

选择最适合您需求的集成，并按照说明在 Open WebUI 中配置。

LibreTranslate 管道与功能支持的语言：
实际上支持所有 LibreTranslate 中的语言，以下是具体列表：
```
阿尔巴尼亚语、阿拉伯语、阿塞拜疆语、孟加拉语、保加利亚语、加泰罗尼亚语、巴伦西亚语、中文、捷克语、丹麦语、荷兰语、英语、弗拉芒语、世界语、爱沙尼亚语、芬兰语、法语、德语、希腊语、希伯来语、印地语、匈牙利语、印度尼西亚语、爱尔兰语、意大利语、日语、韩语、拉脱维亚语、立陶宛语、马来语、波斯语、波兰语、葡萄牙语、罗马尼亚语、摩尔多瓦语、俄罗斯语、斯洛伐克语、斯洛文尼亚语、西班牙语、卡斯蒂利亚语、瑞典语、他加禄语、泰语、土耳其语、乌克兰语、乌尔都语
```

故障排除
--------------

* 确保 LibreTranslate 服务正在运行且可访问。
* 验证 Docker 配置是否正确。
* 检查 LibreTranslate 日志是否有任何错误。

集成的优势
----------------------

将 LibreTranslate 与 Open WebUI 集成具有以下优势：

* 实现多种语言的机器翻译功能。
* 提高文本分析和处理能力。
* 增强与语言相关任务的功能。

结论
----------

将 LibreTranslate 集成到 Open WebUI 是一个简单的过程，可以增强您的 Open WebUI 实例的功能。通过遵循本文档中的步骤，您可以在 Docker 中设置 LibreTranslate 并在 Open WebUI 中进行配置。
