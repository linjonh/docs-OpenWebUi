### Instalação com `uv` 

O gerenciador de runtime `uv` garante uma gestão perfeita do ambiente Python para aplicativos como Open WebUI. Siga estes passos para começar:

#### 1. Instalar `uv`

Escolha o comando de instalação apropriado para o seu sistema operacional:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Executar Open WebUI

Uma vez que o `uv` está instalado, executar o Open WebUI é muito simples. Use o comando abaixo, certificando-se de configurar a variável de ambiente `DATA_DIR` para evitar perda de dados. Exemplos de caminhos são fornecidos para cada plataforma:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
