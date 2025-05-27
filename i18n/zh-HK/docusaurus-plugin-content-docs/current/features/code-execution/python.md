---
sidebar_position: 2
title: "🐍 Python 程式碼執行"
---

# 🐍 Python 程式碼執行

## 概述

Open WebUI 允許在瀏覽器中執行客戶端端的 Python 程式碼，利用 Pyodide 在聊天的程式碼區塊內執行腳本。此功能能讓大型語言模型（LLM）生成可以直接在瀏覽器中執行的 Python 腳本，並利用 Pyodide 支援的一系列函式庫。

為了保持使用者的隱私性與靈活性，Open WebUI 會鏡像 PyPI 套件，避免直接進行外部網路請求。這種方法還允許在無網際網路的環境中使用 Pyodide。

Open WebUI 前端包含一個獨立的 WASM（WebAssembly）Python 環境，由 Pyodide 提供支援，可以執行由 LLM 生成的基本 Python 腳本。此環境旨在易於使用，無需額外設定或安裝。

## 支援的函式庫

Pyodide 程式碼執行被配置為僅加載在 scripts/prepare-pyodide.js 中配置的套件，並隨後添加到 "CodeBlock.svelte" 裡。目前 Open WebUI 支援以下 Pyodide 套件:

* micropip
* packaging
* requests
* beautifulsoup4
* numpy
* pandas
* matplotlib
* scikit-learn
* scipy
* regex

這些函式庫可用於執行各種任務，例如數據操作、機器學習和網頁爬取。如果您想要執行的套件未被編譯到 Open WebUI 所附帶的 Pyodide 中，那麼該套件將無法使用。

## 啟動 Python 程式碼執行

要執行 Python 程式碼，可以在聊天中詢問 LLM 為您編寫一個 Python 腳本。一旦 LLM 生成了程式碼，程式碼區塊右上方就會出現一個 `執行 (Run)` 按鈕。點擊該按鈕即可使用 Pyodide 運行程式碼。為了在程式碼區塊底部顯示結果，確保程式碼中至少有一個 print 陳述來顯示結果。

## 使用 Python 程式碼執行的提示

* 在編寫 Python 程式碼時，請記住程式碼執行時會在 Pyodide 環境中運行。您可以在詢問程式碼時提及 "Pyodide 環境"，以通知 LLM。
* 研究 Pyodide 文檔，以了解該環境的功能和限制。
* 嘗試使用不同的函式庫和腳本，以探索 Open WebUI 中 Python 程式碼執行的可能性。

## Pyodide 文檔

* [Pyodide 文檔](https://pyodide.org/en/stable/)

## 程式碼範例

以下是一個使用 Pyodide 可執行的簡單 Python 腳本範例：

```python
import pandas as pd

# 建立一個範例 DataFrame
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# 印出 DataFrame
print(df)
```

此腳本將使用 pandas 建立一個範例 DataFrame，並在您的聊天中的程式碼區塊下方打印出結果。

## 擴展支援的函式庫清單

想要突破可能性的界限？要擴展支援的函式庫清單，請按照以下步驟進行：

1. **分叉 Pyodide 存儲庫** 以建立您的自定版本。
2. **從 Pyodide 的現有套件列表中挑選新的套件**，或探索 Open WebUI 目前缺少的高品質套件。
3. **將新的套件集成到您的分叉存儲庫中**，解鎖更多可能性。
