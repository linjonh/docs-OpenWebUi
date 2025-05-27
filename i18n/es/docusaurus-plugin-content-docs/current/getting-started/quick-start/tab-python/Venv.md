
# Usando Entornos Virtuales

Crea entornos aislados de Python utilizando `venv`.

## Pasos

1. **Crear un Entorno Virtual:**

   ```bash
   python3 -m venv venv
   ```

2. **Activar el Entorno Virtual:**

   - En Linux/macOS:

     ```bash
     source venv/bin/activate
     ```

   - En Windows:

     ```bash
     venv\Scripts\activate
     ```

3. **Instalar Open WebUI:**

   ```bash
   pip install open-webui
   ```

4. **Iniciar el Servidor:**

   ```bash
   open-webui serve
   ```
