---
sidebar_position: 20
title: "💥 使用 Langfuse 進行監控和除錯"
---

# 與 Open WebUI 整合 Langfuse

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) 為 Open WebUI 提供開源的可觀察性和評估功能。啟用 Langfuse 整合後，您可以使用 Langfuse 跟蹤您的應用程式數據，以開發、監控及改善對 Open WebUI 的使用，包括：

- 應用程式 [追蹤](https://langfuse.com/docs/tracing)
- 使用模式
- 按用戶和模型的成本數據
- 重播會話以調試問題
- [評估](https://langfuse.com/docs/scores/overview)

## 如何將 Langfuse 與 Open WebUI 整合

![Langfuse 整合](https://langfuse.com/images/docs/openwebui-integration.gif)
_Langfuse 整合步驟_

[Pipelines](https://github.com/open-webui/pipelines/) 是 Open WebUI 中一個與使用者界面無關的框架，用於 OpenAI API 插件。它允許插入攔截、處理和轉發用戶提示的插件，從而增強對提示處理的控制和自訂功能。

要使用 Langfuse 跟蹤您的應用程式數據，您可以使用 [Langfuse pipeline](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py)，這可以實現消息互動的實時監控和分析。

## 快速入門指南

### 步驟 1: 安裝 Open WebUI

確保 Open WebUI 正在運行。如需操作指南，請參考 [Open WebUI 文檔](https://docs.openwebui.com/)。

### 步驟 2: 安裝 Pipelines

使用 Docker 啟動 [Pipelines](https://github.com/open-webui/pipelines/)。運行以下命令以啟動 Pipelines：

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### 步驟 3: 將 Open WebUI 與 Pipelines 連接

在 _管理設置_ 中，創建並保存一個新的 OpenAI API 類型的連接，填入以下詳細信息：

- **URL:**`http://host.docker.internal:9099`（這是之前啟動的 Docker 容器運行所在的地址）。
- **密碼:** 0p3n-w3bu!（默認密碼）

![Open WebUI 設置](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### 步驟 4: 添加 Langfuse 過濾管道

接下來，導航到 _管理設置_ -> _Pipelines_，並添加 Langfuse 過濾管道。指定 Pipelines 在`http://host.docker.internal:9099`（之前配置的地址）上監聽，並使用如下的 _從 Github URL 安裝_ 選項安裝 [Langfuse 過濾管道](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py)：

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

現在，在下方添加您的 Langfuse API 金鑰。如果您尚未註冊 Langfuse，您可以通過 [此處](https://cloud.langfuse.com) 創建帳戶以獲取您的 API 金鑰。

![Open WebUI 添加 Langfuse 管道](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**注意:** 為了在啟用流模式時捕獲 OpenAI 模型的使用情況（例如令牌計數），您需要導航到 Open WebUI 的模型設置，並在 _功能_ 下勾選 "Usage" [選項](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586)。_

### 步驟 5: 在 Langfuse 中查看您的追蹤記錄

現在，您可以與您的 Open WebUI 應用程式互動，並在 Langfuse 中查看追蹤記錄。

[範例追蹤](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) 在 Langfuse UI 中的顯示：

![Open WebUI 範例追蹤在 Langfuse 中顯示](https://langfuse.com/images/docs/openwebui-example-trace.png)

## 瞭解更多

有關 Open WebUI Pipelines 的完整指南，請訪問 [這篇文章](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/)。
