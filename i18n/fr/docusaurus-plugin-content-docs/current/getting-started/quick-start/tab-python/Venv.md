
# Utiliser des environnements virtuels

Créez des environnements Python isolés en utilisant `venv`.

## Étapes

1. **Créer un environnement virtuel :**

   ```bash
   python3 -m venv venv
   ```

2. **Activer l'environnement virtuel :**

   - Sous Linux/macOS :

     ```bash
     source venv/bin/activate
     ```

   - Sous Windows :

     ```bash
     venv\Scripts\activate
     ```

3. **Installer Open WebUI :**

   ```bash
   pip install open-webui
   ```

4. **Démarrer le serveur :**

   ```bash
   open-webui serve
   ```
