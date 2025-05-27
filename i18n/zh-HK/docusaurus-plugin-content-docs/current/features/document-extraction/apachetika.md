---
sidebar_position: 4000
title: "🪶 Apache Tika 提取"
---

:::warning
本教程由社群提供，並未由 Open WebUI 團隊支援。它僅用於展示如何根據特定使用場景自訂 Open WebUI。想要貢獻？請查看貢獻教程。
:::

## 🪶 Apache Tika 提取

本文檔提供了將 Apache Tika 整合到 Open WebUI 的逐步指南。Apache Tika 是一種內容分析工具包，可用於從超過一千種不同的檔案類型中檢測和提取元資料和文本內容。所有這些檔案類型都可以通過單一介面進行解析，使得 Tika 在搜索引擎索引、內容分析、翻譯等方面非常有用。

前置條件
------------

* Open WebUI 實例
* 系統已安裝 Docker
* 為 Open WebUI 設置的 Docker 網路

整合步驟
----------------

### 步驟 1：創建 Docker Compose 檔案或執行 Docker 命令以啟動 Apache Tika

您有兩種方式運行 Apache Tika：

**選項 1：使用 Docker Compose**

在與 Open WebUI 實例相同的目錄下創建一個名為 `docker-compose.yml` 的新檔案。將以下設定新增到檔案中：

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

運行下列命令執行 Docker Compose 檔案：

```bash
docker-compose up -d
```

**選項 2：使用 Docker Run 命令**

或者，您可以使用以下 Docker 命令運行 Apache Tika：

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

請注意，如果選擇使用 Docker 運行命令，並希望容器與 Open WebUI 實例位於同一網路中，則需要指定 `--network` 標誌。

### 步驟 2：配置 Open WebUI 使用 Apache Tika

要在 Open WebUI 中將 Apache Tika 用作上下文提取引擎，請按以下步驟操作：

* 登錄到您的 Open WebUI 實例。
* 前往 `管理面板` 的設定菜單。
* 點擊 `設定`。
* 點擊 `文檔` 標籤。
* 將 `預設` 內容提取引擎下拉選單更改為 `Tika`。
* 將上下文提取引擎 URL 更新為 `http://tika:9998`。
* 保存更改。

 驗證 Docker 中的 Apache Tika
=====================================

要驗證 Apache Tika 在 Docker 環境中是否正常運行，您可以按照以下步驟操作：

### 1. 啟動 Apache Tika Docker 容器

首先，確保 Apache Tika Docker 容器正在運行。您可以使用以下命令啟動它：

```bash
docker run -p 9998:9998 apache/tika
```

此命令啟動 Apache Tika 容器，並將容器的 9998 埠映射到本地機器的 9998 埠。

### 2. 驗證伺服器正在運行

您可以通過發送 GET 請求來驗證 Apache Tika 伺服器是否正在運行：

```bash
curl -X GET http://localhost:9998/tika
```

此命令應返回以下響應：

```
This is Tika Server. Please PUT
```

### 3. 驗證整合

另外，您也可以嘗試發送檔案進行分析以測試整合。您可以使用 `curl` 命令測試 Apache Tika：

```bash
curl -T test.txt http://localhost:9998/tika
```

將 `test.txt` 替換為本地機器上一個文本檔案的路徑。

Apache Tika 將返回檔案的檢測元資料和內容類型。

### 使用腳本驗證 Apache Tika

如果您希望自動化驗證過程，可以使用該腳本將一個檔案發送到 Apache Tika 並檢查響應中的預期元資料。如果元資料存在，腳本將輸出成功訊息以及檔案的元資料；否則，將輸出錯誤訊息以及來自 Apache Tika 的響應。

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # 將檔案發送到 Apache Tika 並驗證輸出
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tika 成功分析了該檔案。")
            print("來自 Apache Tika 的響應：")
            print(response.text)
        else:
            print("分析檔案時出現錯誤：")
            print(f"狀態碼: {response.status_code}")
            print(f"來自 Apache Tika 的響應: {response.text}")
    except Exception as e:
        print(f"發生錯誤: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # 替換為您的檔案路徑
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

運行腳本的說明：

### 前置條件

* 系統上應安裝 Python 3.x
* 必須安裝 `requests` 函式庫（可以使用 pip 安裝：`pip install requests`）
* Apache Tika Docker 容器必須在運行中（使用 `docker run -p 9998:9998 apache/tika` 指令）
* 將 `"test.txt"` 替換為您要發送給 Apache Tika 的文件路徑

### 運行腳本

1. 將腳本保存為 `verify_tika.py`（例如，使用文本編輯器如 Notepad 或 Sublime Text）
2. 打開終端或命令提示符
3. 使用 `cd` 命令導航到保存腳本的目錄
4. 使用以下指令運行腳本：`python verify_tika.py`
5. 腳本將輸出一條消息，指示 Apache Tika 是否正常工作

注意：如果遇到任何問題，請確保 Apache Tika 容器正確運行，且文件已發送至正確的 URL。

### 結論

按照這些步驟，您可以驗證 Apache Tika 在 Docker 環境中是否正常工作。您可以通過發送文件進行分析、通過 GET 請求驗證服務是否運行，或使用腳本來自動化該過程。如果遇到任何問題，請確保 Apache Tika 容器正確運行，且文件已發送至正確的 URL。

故障排除
--------------

* 確保 Apache Tika 服務正在運行並可從 Open WebUI 實例訪問。
* 檢查 Docker 日誌中有關 Apache Tika 服務的任何錯誤或問題。
* 驗證 Open WebUI 中的上下文提取引擎 URL 配置是否正確。

集成的優勢
----------------------

將 Apache Tika 集成到 Open WebUI 提供了許多好處，包括：

* **改進的元數據提取**：Apache Tika 的高級元數據提取功能可以幫助您從文件中提取準確且相關的數據。
* **支持多種文件格式**：Apache Tika 支持多種文件格式，是處理多樣化文件類型的理想解決方案。
* **增強的內容分析**：Apache Tika 的高級內容分析功能可以幫助您從文件中提取有價值的洞察。

結論
----------

將 Apache Tika 集成到 Open WebUI 是一個簡單的過程，可以改進您的 Open WebUI 實例的元數據提取能力。通過遵循本文件中概述的步驟，您可以輕鬆地將 Apache Tika 設置為 Open WebUI 的上下文提取引擎。
