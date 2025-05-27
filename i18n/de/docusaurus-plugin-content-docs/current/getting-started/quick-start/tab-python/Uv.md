### Installation mit `uv` 

Der `uv` Laufzeitmanager gewährleistet eine nahtlose Verwaltung von Python-Umgebungen für Anwendungen wie Open WebUI. Befolgen Sie diese Schritte, um zu beginnen:

#### 1. Installieren Sie `uv`

Wählen Sie den passenden Installationsbefehl für Ihr Betriebssystem:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Open WebUI ausführen

Sobald `uv` installiert ist, ist das Ausführen von Open WebUI kinderleicht. Verwenden Sie den untenstehenden Befehl und stellen Sie sicher, die Umgebungsvariable `DATA_DIR` festzulegen, um Datenverluste zu vermeiden. Beispielpfade sind für jede Plattform angegeben:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell):  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
