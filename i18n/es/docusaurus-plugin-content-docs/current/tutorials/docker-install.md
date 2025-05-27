---
sidebar_position: 4
title: 🐳 Instalación de Docker
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial para colaboradores.
:::

# Instalación de Docker

## Para Usuarios de Windows y Mac

- Descarga Docker Desktop desde [el sitio oficial de Docker](https://www.docker.com/products/docker-desktop).  
- Sigue las instrucciones de instalación en el sitio web.  
- Después de la instalación, **abre Docker Desktop** para asegurarte de que esté funcionando correctamente.

---

## Para Usuarios de Ubuntu

1. **Abre tu terminal.**

2. **Configura el repositorio apt de Docker:**

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
Si usas una **derivada de Ubuntu** (por ejemplo, Linux Mint), utiliza `UBUNTU_CODENAME` en lugar de `VERSION_CODENAME`.
:::

3. **Instala Docker Engine:**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Verifica la instalación de Docker:**

   ```bash
   sudo docker run hello-world
   ```

---

## Para Otras Distribuciones de Linux

Para otras distribuciones de Linux, consulta la [documentación oficial de Docker](https://docs.docker.com/engine/install/).

---

## Instalar y Verificar Ollama

1. **Descarga Ollama** desde [https://ollama.com/](https://ollama.com/).

2. **Verifica la instalación de Ollama:**
   - Abre un navegador y navega a:
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - Nota: El puerto puede variar según tu instalación.
