### 使用 `uv` 安裝 

`uv` 運行時管理器確保了對於像 Open WebUI 等應用程式的 Python 環境管理變得無縫銜接。按照以下步驟開始使用：

#### 1. 安裝 `uv`

選擇對應您操作系統的安裝命令：

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. 運行 Open WebUI

當 `uv` 安裝完成後，運行 Open WebUI 變得非常簡單。使用下方的命令，並確保設定 `DATA_DIR` 環境變數以避免數據丟失。以下提供各平台的範例路徑：

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
