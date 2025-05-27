---
sidebar_position: 4
title: 🐳 安装 Docker
---

:::warning
本教程是社区贡献内容，未获得 Open WebUI 团队支持。它仅作为示例展示如何根据具体用例定制 Open WebUI。如有兴趣贡献，请查看贡献教程。
:::

# 安装 Docker

## 面向 Windows 和 Mac 用户

- 从 [Docker 官方网站](https://www.docker.com/products/docker-desktop)下载 Docker Desktop。
- 按照网站上的安装说明进行操作。
- 安装完成后，**打开 Docker Desktop**以确保其运行正常。

---

## 面向 Ubuntu 用户

1. **打开终端。**

2. **设置 Docker 的 apt 软件仓库：**

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
如果使用 **Ubuntu 衍生版本**（例如 Linux Mint），请使用 `UBUNTU_CODENAME` 替代 `VERSION_CODENAME`。
:::

3. **安装 Docker 引擎：**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **验证 Docker 安装：**

   ```bash
   sudo docker run hello-world
   ```

---

## 面向其他 Linux 发行版用户

有关其他 Linux 发行版的安装，请参考 [Docker 官方文档](https://docs.docker.com/engine/install/)。

---

## 安装和验证 Ollama

1. **从 [https://ollama.com/](https://ollama.com/) 下载 Ollama**。

2. **验证 Ollama 安装：**
   - 打开浏览器，访问以下地址：
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/)。
   - 注意：端口可能会因安装而有所不同。
