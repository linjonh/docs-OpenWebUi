
# Verwendung von virtuellen Umgebungen

Erstellen Sie isolierte Python-Umgebungen mit `venv`.

## Schritte

1. **Erstellen Sie eine virtuelle Umgebung:**

   ```bash
   python3 -m venv venv
   ```

2. **Aktivieren Sie die virtuelle Umgebung:**

   - Unter Linux/macOS:

     ```bash
     source venv/bin/activate
     ```

   - Unter Windows:

     ```bash
     venv\Scripts\activate
     ```

3. **Installieren Sie Open WebUI:**

   ```bash
   pip install open-webui
   ```

4. **Starten Sie den Server:**

   ```bash
   open-webui serve
   ```
