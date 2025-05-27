---
sidebar_position: 4
title: 🐳 Docker installieren
---

:::warning
Dieses Tutorial ist ein Community-Beitrag und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Sehen Sie sich das Tutorial für Beiträger an.
:::

# Docker installieren

## Für Windows- und Mac-Benutzer

- Laden Sie Docker Desktop von [Dockers offizieller Website](https://www.docker.com/products/docker-desktop) herunter.
- Folgen Sie den Installationsanweisungen auf der Website.
- Öffnen Sie nach der Installation **Docker Desktop**, um sicherzustellen, dass es ordnungsgemäß läuft.

---

## Für Ubuntu-Benutzer

1. **Öffnen Sie Ihr Terminal.**

2. **Richten Sie das apt-Repository von Docker ein:**

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
Falls Sie eine **Ubuntu-Derivat** verwenden (z. B. Linux Mint), verwenden Sie `UBUNTU_CODENAME` anstelle von `VERSION_CODENAME`.
:::

3. **Installieren Sie die Docker Engine:**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Überprüfen Sie die Docker-Installation:**

   ```bash
   sudo docker run hello-world
   ```

---

## Für andere Linux-Distributionen

Für andere Linux-Distributionen lesen Sie die [offizielle Docker-Dokumentation](https://docs.docker.com/engine/install/).

---

## Ollama installieren und überprüfen

1. **Laden Sie Ollama herunter** von [https://ollama.com/](https://ollama.com/).

2. **Überprüfen Sie die Ollama-Installation:**
   - Öffnen Sie einen Browser und navigieren Sie zu:
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - Hinweis: Der Port kann je nach Installation variieren.
