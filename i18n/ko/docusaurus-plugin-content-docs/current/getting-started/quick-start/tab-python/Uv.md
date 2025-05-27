### `uv`를 사용한 설치 

`uv` 런타임 관리자는 Open WebUI와 같은 애플리케이션을 위한 원활한 파이썬 환경 관리를 보장합니다. 아래의 단계를 따라 시작하세요:

#### 1. `uv` 설치

운영 체제에 맞는 설치 명령을 선택하세요:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Open WebUI 실행

`uv`가 설치된 후 Open WebUI 실행은 간단합니다. 데이터 손실을 방지하기 위해 `DATA_DIR` 환경 변수를 설정하고 아래 명령을 사용하세요. 각 플랫폼에 대한 예제 경로는 다음과 같습니다:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
