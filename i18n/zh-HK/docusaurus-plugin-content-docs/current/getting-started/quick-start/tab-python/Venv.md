
# 使用虛擬環境

使用 `venv` 建立隔離的 Python 環境。

## 步驟

1. **建立虛擬環境：**

   ```bash
   python3 -m venv venv
   ```

2. **啟用虛擬環境：**

   - 在 Linux/macOS 上：

     ```bash
     source venv/bin/activate
     ```

   - 在 Windows 上：

     ```bash
     venv\Scripts\activate
     ```

3. **安裝 Open WebUI：**

   ```bash
   pip install open-webui
   ```

4. **啟動伺服器：**

   ```bash
   open-webui serve
   ```
