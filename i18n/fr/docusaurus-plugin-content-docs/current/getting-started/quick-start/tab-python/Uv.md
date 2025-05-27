### Installation avec `uv` 

Le gestionnaire d'exécution `uv` garantit une gestion transparente de l'environnement Python pour les applications comme Open WebUI. Suivez ces étapes pour démarrer :

#### 1. Installer `uv`

Choisissez la commande d'installation appropriée pour votre système d'exploitation :

- **macOS/Linux** :  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows** :  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Exécuter Open WebUI

Une fois `uv` installé, utiliser Open WebUI est un jeu d'enfant. Utilisez la commande ci-dessous, en veillant à définir la variable d'environnement `DATA_DIR` pour éviter toute perte de données. Des exemples de chemins sont fournis pour chaque plateforme :

- **macOS/Linux** :  
  ```bash
  DATA_DIR=~/.open-webui uvx --python 3.11 open-webui@latest serve
  ```

- **Windows** (PowerShell) :  
  ```powershell
  $env:DATA_DIR="C:\open-webui\data"; uvx --python 3.11 open-webui@latest serve
  ```
