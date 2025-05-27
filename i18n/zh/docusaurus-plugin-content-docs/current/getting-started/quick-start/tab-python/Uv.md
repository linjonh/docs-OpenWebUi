### 使用`uv`进行安装

`uv`运行时管理器确保像Open WebUI这样的应用程序可以无缝管理Python环境。按照以下步骤开始使用：

#### 1. 安装`uv`

根据您的操作系统选择适合的安装命令：

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. 运行Open WebUI

安装`uv`后，运行Open WebUI变得非常简单。使用以下命令，确保设置`DATA_DIR`环境变量以避免数据丢失。以下为各平台提供的示例路径：

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
