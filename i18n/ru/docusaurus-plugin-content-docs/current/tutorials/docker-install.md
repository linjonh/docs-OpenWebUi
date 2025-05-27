---
sidebar_position: 4
title: 🐳 Установка Docker
---

:::warning
Этот урок является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного использования. Хотите внести вклад? Ознакомьтесь с руководством по внесению изменений.
:::

# Установка Docker

## Для пользователей Windows и Mac

- Загрузите Docker Desktop с [официального сайта Docker](https://www.docker.com/products/docker-desktop).
- Следуйте инструкциям по установке на сайте.
- После установки **откройте Docker Desktop**, чтобы убедиться, что он работает правильно.

---

## Для пользователей Ubuntu

1. **Откройте терминал.**

2. **Настройте репозиторий apt Docker:**

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
Если вы используете **производные Ubuntu** (например, Linux Mint), используйте `UBUNTU_CODENAME` вместо `VERSION_CODENAME`.
:::

3. **Установите Docker Engine:**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Проверьте установку Docker:**

   ```bash
   sudo docker run hello-world
   ```

---

## Для других дистрибутивов Linux

Для других дистрибутивов Linux обратитесь к [официальной документации Docker](https://docs.docker.com/engine/install/).

---

## Установка и проверка Ollama

1. **Скачайте Ollama** с [https://ollama.com/](https://ollama.com/).

2. **Проверьте установку Ollama:**
   - Откройте браузер и перейдите по адресу:
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - Примечание: Порт может изменяться в зависимости от вашей установки.
