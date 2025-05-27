---
sidebar_position: 321
title: "🐍 Jupyter Notebook 整合"
---

:::warning
此教學為社群貢獻內容，並不受 Open WebUI 團隊支持。它僅用於演示如何針對您的特定用途自定義 Open WebUI。如想貢獻，請查看貢獻教學。
:::

> [!WARNING]
> 該文檔基於當前版本（0.5.16）建立，並持續更新中。


# Jupyter Notebook 整合

從 v0.5.11 開始，Open-WebUI 發布了一個名為 `Jupyter Notebook 支援於代碼解釋器` 的新功能。此功能允許您將 Open-WebUI 與 Jupyter 整合。在隨後的版本中，該功能已得到多次改進，因此請仔細查看版本更新說明。

本教學將逐步指導您如何設置兩個服務之間的連接。

- [查看 v0.5.11 版本更新說明](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [查看 v0.5.15 版本更新說明](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## 什麼是 Jupyter Notebooks

Jupyter Notebook 是一個開源的網頁應用程式，允許用戶創建並分享包含實時代碼、數學公式、數據可視化和敘述文字的文檔。由於它能將可執行代碼（如 Python、R 或 Julia 語言）、解釋文字、圖片和交互式視覺內容結合到一個文檔中，因此在數據科學、科學計算與教育中備受青睞。Jupyter Notebooks 尤其適用於數據分析與探索，因為它允許用戶以小且可管理的塊執行代碼，同時記錄其思考過程和發現。此格式便於實驗、調試代碼，並創建既全面又易於分享的報告，說明分析過程及結果。

請參閱 Jupyter 的網站以了解更多資訊：[Project Juptyer](https://jupyter.org/)

## 第 0 步：配置摘要

以下是本教學中將設定的目標配置。

![代碼執行配置](/images/tutorials/jupyter/jupyter-code-execution.png)

# 第 1 步：啟動 OUI 和 Jupyter

為實現此目的，我使用 `docker-compose` 啟動了一個包括兩個服務及我的 LLMs 的棧，但若分別運行每個 docker 容器，應該也能運行成功。

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

您可以在保存 `docker-compose` 文件的目錄中執行以下命令來啟動上述棧：

```bash title="運行 docker-compose"
docker-compose up -d
```

現在，您應該能夠通過以下 URL 訪問兩個服務：

| 服務 | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

在訪問 Jupyter 服務時，您將需要上面定義的 `JUPYTER_TOKEN`。對於本教學，我選擇的示例 token 值是 `123456`。

![代碼執行配置](/images/tutorials/jupyter/jupyter-token.png)

# 第 2 步：配置 Jupyter 的代碼執行

現在我們已經運行了 Open-WebUI 和 Jupyter，我們需要在 Open-WebUI 的管理面板 -> 設置 -> 代碼執行中配置 Open-WebUI 的代碼執行功能以使用 Jupyter。由於 Open-WebUI 不斷發布和改進此功能，我建議您始終查看 [`configs.py` 文件](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72)中的配置，以獲取最新與更佳的配置。截至 v0.5.16，配置包含以下內容：

| Open-WebUI 環境變數 | 值 |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## 第 3 步：測試連接

首先，讓我們確認 Jupyter 目錄中的內容。如下面的圖片所示，我們只有一個空的 `work` 文件夾。

![代碼執行配置](/images/tutorials/jupyter/jupyter-empty.png)

### 建立 CSV

讓我們執行第一個提示。確定您已選擇 `Code Execution` 按鈕。

```
提示：使用虛構數據建立兩個 CSV 文件。一個使用純 Python 創建，另一個使用 pandas 庫創建。命名為 data1.csv 和 data2.csv。
```

![程式執行設定](/images/tutorials/jupyter/jupyter-create-csv.png)

我們可以看到這些 CSV 文件已建立並可在 Jupyter 中訪問。

![程式執行設定](/images/tutorials/jupyter/jupyter-view-csv.png)

### 建立視覺化

讓我們執行第二個提示。同樣，確定您已選擇 `Code Execution` 按鈕。

```
提示：使用 matplotlib 和 seaborn 在 Python 中建立多個視覺化並保存到 Jupyter。
```

![程式執行設定](/images/tutorials/jupyter/jupyter-create-viz.png)

我們可以看到這些視覺化已建立並可在 Jupyter 中訪問。

![程式執行設定](/images/tutorials/jupyter/jupyter-view-viz.png)

### 建立筆記本

讓我們一起執行最後一個提示。在這個提示中，我們將使用僅提示來建立一個全新的筆記本。

```
提示：編寫 Python 代碼來讀取和寫入 JSON 文件並保存到名為 notebook.ipynb 的筆記本中。
```

![程式執行設定](/images/tutorials/jupyter/jupyter-create-notebook.png)

我們可以看到視覺化已建立並可在 Jupyter 中訪問。

![程式執行設定](/images/tutorials/jupyter/jupyter-view-notebook.png)

## 關於工作流程的注意事項

在測試此功能時，我多次注意到 Open-WebUI 不會自動將 Open-WebUI 中生成的代碼或輸出保存到我的 Jupyter 實例中。為了強制其輸出我創建的文件/項目，我經常採用以下兩步工作流程，首先建立我想要的代碼工件，然後要求它保存到我的 Jupyter 實例中。

![程式執行設定](/images/tutorials/jupyter/jupyter-workflow.png)

## 您如何使用此功能？

您是否在使用程式執行功能和/或 Jupyter？如果是，請聯繫我。我很想知道您如何使用它，以便我可以繼續為教程增加其他有趣的使用方法的示例！
