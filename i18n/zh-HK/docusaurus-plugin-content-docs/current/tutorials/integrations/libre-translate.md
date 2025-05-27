---
sidebar_position: 25
title: "🔠 LibreTranslate 整合"
---

:::warning
本教程為社群貢獻內容，並未獲得 Open WebUI 團隊的支援。此教程僅為展示如何根據您的特定使用情境自訂 Open WebUI。想要貢獻？請查看貢獻教程。
:::

概述
--------

LibreTranslate 是一種免費且開源的機器翻譯 API，支持多種語言。LibreTranslate 可以自行託管、離線使用且易於設置，與其他 API 不同，它不依賴於 Google 或 Azure 等專有提供商進行翻譯。其翻譯引擎由開源的 [Argos Translate](https://github.com/argosopentech/argos-translate) 庫提供支援。您可以將 LibreTranslate 整合到 Open WebUI 中，以利用其機器翻譯功能。本文件提供了一個逐步指南，用於在 Docker 中設置 LibreTranslate 並在 Open WebUI 中配置整合功能。

在 Docker 中設置 LibreTranslate
--------------------------------

按照以下步驟設置 Docker 中的 LibreTranslate：

### 第一步：創建一個 Docker Compose 文件

在您選擇的目錄中創建一個名為 `docker-compose.yml` 的新文件。在文件中添加以下配置：

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
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### 第二步：創建 `stack.env` 文件

在與 `docker-compose.yml` 同一目錄中創建一個名為 `stack.env` 的新文件。在文件中添加以下配置：

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

### 第三步：運行 Docker Compose 文件

運行以下命令啟動 LibreTranslate 服務：

```bash
docker-compose up -d
```

這將以分離模式啟動 LibreTranslate 服務。

在 Open WebUI 中配置整合功能
--------------------------------

一旦您在 Docker 中啟動了 LibreTranslate，您可以在 Open WebUI 中配置整合功能。有幾種社群整合選項可用，包括：

* [LibreTranslate 過濾函數](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslate 行動函數](https://openwebui.com/f/jthesse/libretranslate_action)
* [多語言 LibreTranslate 行動函數](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslate 過濾管線](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

選擇最適合您需求的整合選項，並按照指導在 Open WebUI 中進行配置。

LibreTranslate 管線與函數支持的語言：
實際上是所有 LibreTranslate 支持的語言，但以下列出清單：
```
阿爾巴尼亞語、阿拉伯語、阿塞拜疆語、孟加拉語、保加利亞語、加泰羅尼亞語、瓦倫西亞語、中文、捷克語、丹麥語、荷蘭語、英語、弗拉芒語、世界語、愛沙尼亞語、芬蘭語、法語、德語、希臘語、希伯來語、印地語、匈牙利語、印尼語、愛爾蘭語、意大利語、日語、韓語、拉脫維亞語、立陶宛語、馬來語、波斯語、波蘭語、葡萄牙語、羅馬尼亞語、摩爾多瓦語、俄語、斯洛伐克語、斯洛維尼亞語、西班牙語、卡斯蒂利亞語、瑞典語、塔加路語、泰語、土耳其語、烏克蘭語、烏爾都語
```

故障排除
--------------

* 確保 LibreTranslate 服務正在運行且可訪問。
* 驗證 Docker 配置是否正確。
* 檢查 LibreTranslate 日誌中的任何錯誤。

整合的好處
----------------------

將 LibreTranslate 與 Open WebUI 整合提供了幾項好處，包括：

* 支持多種語言的機器翻譯功能。
* 改善文本分析和處理。
* 增強與語言相關任務的功能。

結論
----------

將 LibreTranslate 整合到 Open WebUI 中是一個簡單的過程，可以提升您的 Open WebUI 實例的功能。通過遵循本文所列的步驟，您可以在 Docker 中設置 LibreTranslate 並在 Open WebUI 中配置整合功能。
