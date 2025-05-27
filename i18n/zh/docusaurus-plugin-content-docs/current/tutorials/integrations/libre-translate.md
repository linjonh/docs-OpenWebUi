---
sidebar_position: 25
title: "🔠 LibreTranslate 集成"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持，仅作为如何自定义 Open WebUI 以满足您的特定使用需求的示范。想要贡献？请查看贡献教程。
:::

概述
--------

LibreTranslate 是一个免费开源的机器翻译 API，支持多种语言。LibreTranslate 是一个可本地部署、离线使用且易于设置的工具，与其他 API 不同，它不依赖 Google 或 Azure 等专有提供商进行翻译处理。其翻译引擎由开源库 [Argos Translate](https://github.com/argosopentech/argos-translate) 提供支持。您可以将 LibreTranslate 集成到 Open WebUI 中以利用其机器翻译功能。本文档提供了在 Docker 中设置 LibreTranslate 并在 Open WebUI 中配置集成的分步指南。

在 Docker 中设置 LibreTranslate
-----------------------------------

按照以下步骤在 Docker 中设置 LibreTranslate：

### 第 1 步：创建 Docker Compose 文件

在您选择的目录中创建一个名为 `docker-compose.yml` 的新文件，并将以下配置添加到文件中：

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

### 第 2 步：创建 `stack.env` 文件

在与 `docker-compose.yml` 文件相同的目录中创建一个名为 `stack.env` 的新文件，并将以下配置添加到文件中：

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

### 第 3 步：运行 Docker Compose 文件

运行以下命令以启动 LibreTranslate 服务：

```bash
docker-compose up -d
```

这将以分离模式启动 LibreTranslate 服务。

在 Open WebUI 中配置集成
-------------------------------------------

在 Docker 中成功运行 LibreTranslate 后，您可以在 Open WebUI 中配置集成。有多个社区集成可用，包括：

* [LibreTranslate 过滤功能](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslate 操作功能](https://openwebui.com/f/jthesse/libretranslate_action)
* [多语言 LibreTranslate 操作功能](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslate 过滤管道](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

选择最适合您需求的集成，并按照说明在 Open WebUI 中对其进行配置。

支持的语言（用于 LibreTranslate 管道和功能）：
确切来说就是 LibreTranslate 内所有语言，这里是列表：
```
阿尔巴尼亚语, 阿拉伯语, 阿塞拜疆语, 孟加拉语, 保加利亚语, 加泰罗尼亚语, 巴伦西亚语, 中文, 捷克语, 丹麦语, 荷兰语, 英语, 弗拉芒语, 世界语, 爱沙尼亚语, 芬兰语, 法语, 德语, 希腊语, 希伯来语, 印地语, 匈牙利语, 印尼语, 爱尔兰语, 意大利语, 日语, 韩语, 拉脱维亚语, 立陶宛语, 马来语, 波斯语, 波兰语, 葡萄牙语, 罗马尼亚语, 摩尔达维亚语, 摩尔多瓦语, 俄语, 斯洛伐克语, 斯洛文尼亚语, 西班牙语, 卡斯蒂利亚语, 瑞典语, 塔加洛语, 泰语, 土耳其语, 乌克兰语, 乌尔都语
```

故障排除
--------------

* 确保 LibreTranslate 服务已启动且可访问。
* 验证 Docker 配置是否正确。
* 检查 LibreTranslate 日志是否存在任何错误。

集成的优势
----------------------

将 LibreTranslate 集成到 Open WebUI 提供了几个优势，包括：

* 支持多种语言的机器翻译功能。
* 改善文本分析和处理。
* 提高语言相关任务的功能。

结论
----------

将 LibreTranslate 集成到 Open WebUI 是一个简单的过程，可以增强 Open WebUI 实例的功能。通过遵循本文档中的步骤，您可以在 Docker 中设置 LibreTranslate 并在 Open WebUI 中配置集成。
