### Instalación con `uv` 

El gestor de tiempo de ejecución `uv` garantiza una gestión impecable del entorno de Python para aplicaciones como Open WebUI. Siga estos pasos para comenzar:

#### 1. Instalar `uv`

Elija el comando de instalación adecuado para su sistema operativo:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Ejecutar Open WebUI

Una vez instalado `uv`, ejecutar Open WebUI es muy sencillo. Utilice el siguiente comando, asegurándose de configurar la variable de entorno `DATA_DIR` para evitar la pérdida de datos. Se proporcionan ejemplos de rutas para cada plataforma:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
