### `uv`によるインストール

`uv`ランタイムマネージャーは、Open WebUIのようなアプリケーションのためにPython環境管理をシームレスに行います。以下の手順に従って開始してください:

#### 1. `uv`をインストール

お使いのオペレーティングシステムに適したインストールコマンドを選んでください:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Open WebUIを実行

`uv`をインストールしたら、Open WebUIの実行は簡単です。以下のコマンドを使用し、データの損失を防ぐために`DATA_DIR`環境変数を設定してください。各プラットフォームでの例を示しています:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
