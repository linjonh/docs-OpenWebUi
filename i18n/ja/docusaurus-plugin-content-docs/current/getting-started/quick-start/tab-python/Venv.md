
# 仮想環境の使用

`venv`を使用してPythonの仮想環境を作成します。

## 手順

1. **仮想環境を作成する:**

   ```bash
   python3 -m venv venv
   ```

2. **仮想環境を有効化する:**

   - Linux/macOSの場合:

     ```bash
     source venv/bin/activate
     ```

   - Windowsの場合:

     ```bash
     venv\Scripts\activate
     ```

3. **Open WebUIをインストールする:**

   ```bash
   pip install open-webui
   ```

4. **サーバーを開始する:**

   ```bash
   open-webui serve
   ```
