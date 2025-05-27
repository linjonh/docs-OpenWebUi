---
sidebar_position: 4
title: 🐳 Instalando Docker
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Instalando Docker

## Para Usuários de Windows e Mac

- Faça o download do Docker Desktop no [site oficial do Docker](https://www.docker.com/products/docker-desktop).
- Siga as instruções de instalação no site.
- Após a instalação, **abra o Docker Desktop** para garantir que está funcionando corretamente.

---

## Para Usuários de Ubuntu

1. **Abra seu terminal.**

2. **Configure o repositório apt do Docker:**

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
Se estiver usando uma **derivação do Ubuntu** (por exemplo, Linux Mint), use `UBUNTU_CODENAME` em vez de `VERSION_CODENAME`.
:::

3. **Instale o Docker Engine:**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Verifique a Instalação do Docker:**

   ```bash
   sudo docker run hello-world
   ```

---

## Para Outras Distribuições Linux

Para outras distribuições Linux, consulte a [documentação oficial do Docker](https://docs.docker.com/engine/install/).

---

## Instale e Verifique Ollama

1. **Baixe o Ollama** em [https://ollama.com/](https://ollama.com/).

2. **Verifique a Instalação do Ollama:**
   - Abra um navegador e navegue até:
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - Nota: A porta pode variar de acordo com sua instalação.
