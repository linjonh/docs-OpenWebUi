### 使用 `uv` 安装

`uv` 运行时管理器可确保像 Open WebUI 这样的应用程序的 Python 环境管理无缝运行。按照以下步骤开始操作：

#### 1. 安装 `uv`

根据你的操作系统选择适当的安装命令：

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. 运行 Open WebUI

安装 `uv` 后，运行 Open WebUI 将非常简单。使用以下命令，同时确保设置 `DATA_DIR` 环境变量以避免数据丢失。以下为各平台的示例路径：

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
