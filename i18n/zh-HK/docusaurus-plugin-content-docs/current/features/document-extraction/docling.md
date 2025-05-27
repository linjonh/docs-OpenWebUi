---
sidebar_position: 4000
title: "🐤 Docling 文件提取"
---

:::warning
此教程為社群貢獻，並未得到 Open WebUI 團隊的支持。它僅用於展示如何針對特定使用案例自訂 Open WebUI。如有興趣貢獻，請查看貢獻教程。
:::

## 🐤 Docling 文件提取

本文檔提供了將 Docling 與 Open WebUI 集成的分步指南。Docling 是一個文件處理庫，旨在將多種檔案格式（包括 PDF、Word 檔案、電子表格、HTML 和圖像）轉換為結構化數據，如 JSON 或 Markdown。通過內建的佈局檢測、表格解析和語言感知處理功能，Docling 通過統一且可擴展的介面簡化人工智慧應用（如搜索、摘要和檢索增強生成）的文件準備過程。

前置需求
------------

* Open WebUI 實例
* 已在系統中安裝 Docker
* 為 Open WebUI 設置的 Docker 網絡

集成步驟
----------------

### 第一步：執行 Docling-Serve 的 Docker 命令

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*啟用 GPU 支持：
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### 第二步：配置 Open WebUI 以使用 Docling

* 登錄您的 Open WebUI 實例。
* 進入 `管理面板` 設置選單。
* 點擊 `設置`。
* 點擊 `文件` 標籤。
* 將 `默認`內容提取引擎下拉選單更改為 `Docling`。
* 將內容提取引擎 URL 更新為 `http://host.docker.internal:5001`。
* 保存更改。

在 Docker 中驗證 Docling
=====================================

要驗證 Docling 在 Docker 環境中是否正常工作，您可以執行以下步驟：

### 1. 啟動 Docling Docker 容器

首先，確保 Docling Docker 容器正在運行。您可以使用以下命令啟動它：

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

此命令將啟動 Docling 容器，並將容器中的端口 5001 映射到本地機器上的端口 5001。

### 2. 驗證服務是否正在運行

* 訪問 `http://127.0.0.1:5001/ui/` 
* 該 URL 應顯示 Docling 的 UI 可供使用

### 3. 驗證集成

* 您可以嘗試通過 UI 上傳一些文件，輸出應以 MD 格式或您所需的格式返回

### 結論

將 Docling 與 Open WebUI 集成是一種簡單有效的方式來增強文件處理和內容提取功能。通過遵循本指南中的步驟，您可以將 Docling 設置為默認提取引擎並驗證其在 Docker 環境中的順利運行。一旦配置完成，Docling 將能夠支持功能更強大、不受格式限制的文件解析，助力 Open WebUI 更加先進的人工智慧功能。
