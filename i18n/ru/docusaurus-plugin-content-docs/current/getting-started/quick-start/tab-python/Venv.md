
# Использование виртуальных окружений

Создавайте изолированные окружения Python с помощью `venv`.

## Шаги

1. **Создайте виртуальное окружение:**

   ```bash
   python3 -m venv venv
   ```

2. **Активируйте виртуальное окружение:**

   - На Linux/macOS:

     ```bash
     source venv/bin/activate
     ```

   - На Windows:

     ```bash
     venv\Scripts\activate
     ```

3. **Установите Open WebUI:**

   ```bash
   pip install open-webui
   ```

4. **Запустите сервер:**

   ```bash
   open-webui serve
   ```
