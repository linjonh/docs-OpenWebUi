---
sidebar_position: 4
title: 🐳 Installation de Docker
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration pour montrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Installation de Docker

## Pour les utilisateurs de Windows et Mac

- Téléchargez Docker Desktop depuis le [site officiel de Docker](https://www.docker.com/products/docker-desktop).  
- Suivez les instructions d'installation sur le site Web.  
- Après l'installation, **ouvrez Docker Desktop** pour vous assurer qu'il fonctionne correctement.

---

## Pour les utilisateurs d'Ubuntu

1. **Ouvrez votre terminal.**

2. **Configurez le dépôt apt de Docker :**

   ```bash
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

:::note
Si vous utilisez une **dérivée d'Ubuntu** (par exemple, Linux Mint), utilisez `UBUNTU_CODENAME` au lieu de `VERSION_CODENAME`.
:::

3. **Installez Docker Engine :**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Vérifiez l'installation de Docker :**

   ```bash
   sudo docker run hello-world
   ```

---

## Pour d'autres distributions Linux

Pour d'autres distributions Linux, consultez la [documentation officielle de Docker](https://docs.docker.com/engine/install/).

---

## Installation et vérification d'Ollama

1. **Téléchargez Ollama** depuis [https://ollama.com/](https://ollama.com/).

2. **Vérifiez l'installation d'Ollama :**
   - Ouvrez un navigateur et accédez à :
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - Remarque : Le port peut varier en fonction de votre installation.
