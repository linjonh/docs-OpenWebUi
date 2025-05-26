---
sidebar_position: 4
title: 🐳 安装Docker
---

:::warning
本教程是社区贡献的内容，未经Open WebUI团队支持。该教程仅作为示例，展示如何根据您的特定用例自定义Open WebUI。想贡献内容？请查看贡献教程。
:::

# 安装Docker

## 针对Windows和Mac用户

- 从[Docker官网](https://www.docker.com/products/docker-desktop)下载Docker Desktop。  
- 按照网站上的安装说明进行操作。  
- 安装完成后，**打开Docker Desktop**以确保其正常运行。

---

## 针对Ubuntu用户

1. **打开终端。**

2. **设置Docker的apt源库：**

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
如果使用的是**Ubuntu衍生版**（例如Linux Mint），将`VERSION_CODENAME`替换为`UBUNTU_CODENAME`。
:::

3. **安装Docker引擎：**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **验证Docker安装：**

   ```bash
   sudo docker run hello-world
   ```

---

## 对于其他Linux发行版

对于其他Linux发行版，请参考[Docker官方文档](https://docs.docker.com/engine/install/)。

---

## 安装并验证Ollama

1. 从[https://ollama.com/](https://ollama.com/)**下载Ollama**。

2. **验证Ollama安装：**
   - 打开浏览器并访问：
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/)。
   - 注意：端口可能因安装而异。
