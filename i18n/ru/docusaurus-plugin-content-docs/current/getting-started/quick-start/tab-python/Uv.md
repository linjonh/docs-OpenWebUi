### Установка с помощью `uv`

Менеджер выполнения `uv` обеспечивает простое управление Python-окружениями для приложений, таких как Open WebUI. Следуйте этим шагам, чтобы начать:

#### 1. Установите `uv`

Выберите соответствующую команду установки для вашей операционной системы:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Запустите Open WebUI

После установки `uv` запуск Open WebUI становится простым. Используйте команду ниже, не забывая установить переменную среды `DATA_DIR`, чтобы избежать потери данных. Примеры путей указаны для каждой платформы:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
