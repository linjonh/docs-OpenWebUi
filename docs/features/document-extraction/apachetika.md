---
sidebar_position: 4000
title: "🪶 Apache Tika 提取"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持。它仅用作展示如何为您的特定用例自定义 Open WebUI。如果您想贡献，可以查看贡献教程。
:::

## 🪶 Apache Tika 提取

本文档提供了将 Apache Tika 与 Open WebUI 集成的分步指南。Apache Tika 是一个内容分析工具包，可用于检测和提取元数据以及来自超过一千种不同文件类型的文本内容。所有这些文件类型都可以通过单一接口解析，使得 Tika 在搜索引擎索引、内容分析、翻译等方面非常实用。

先决条件
------------

* 一个 Open WebUI 实例
* 已在系统上安装 Docker
* 为 Open WebUI 设置的 Docker 网络

集成步骤
----------------

### 第 1 步：创建一个 Docker Compose 文件或运行 Apache Tika 的 Docker 命令

可以通过以下两种方式运行 Apache Tika：

**选项 1：使用 Docker Compose**

在与 Open WebUI 实例相同的目录中创建一个名为 `docker-compose.yml` 的新文件。将以下配置添加到文件中：

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

使用以下命令运行 Docker Compose 文件：

```bash
docker-compose up -d
```

**选项 2：使用 Docker Run 命令**

或者，您也可以使用以下 Docker 命令运行 Apache Tika：

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

请注意，如果您选择使用 Docker run 命令，则需要指定 `--network` 标志，以便将容器运行在与 Open WebUI 实例相同的网络中。

### 第 2 步：配置 Open WebUI 使用 Apache Tika

要将 Apache Tika 设置为 Open WebUI 中的上下文提取引擎，请按照以下步骤操作：

* 登录您的 Open WebUI 实例。
* 导航至 `Admin Panel` 设置菜单。
* 点击 `Settings`。
* 点击 `Documents` 标签。
* 将 `Default` 内容提取引擎下拉菜单更改为 `Tika`。
* 将上下文提取引擎 URL 更新为 `http://tika:9998`。
* 保存更改。

 验证 Docker 中的 Apache Tika
=====================================

要验证 Apache Tika 在 Docker 环境中是否正常工作，可以按以下步骤操作：

### 1. 启动 Apache Tika Docker 容器

首先，确保 Apache Tika Docker 容器正在运行。您可以使用以下命令启动它：

```bash
docker run -p 9998:9998 apache/tika
```

此命令启动 Apache Tika 容器，并将容器的端口 9998 映射到本地机器的端口 9998。

### 2. 验证服务器是否运行

您可以通过发送 GET 请求来验证 Apache Tika 服务器是否正在运行：

```bash
curl -X GET http://localhost:9998/tika
```

此命令应返回以下响应：

```
This is Tika Server. Please PUT
```

### 3. 验证集成

或者，您还可以尝试发送文件进行分析以测试集成。通过 `curl` 命令，可以测试 Apache Tika：

```bash
curl -T test.txt http://localhost:9998/tika
```

将 `test.txt` 替换为本地机器上的一个文本文件的路径。

Apache Tika 会返回检测到的文件的元数据和内容类型。

### 使用脚本验证 Apache Tika

如果您希望自动化验证过程，此脚本会将文件发送到 Apache Tika 并检查返回的元数据。如果元数据存在，脚本将输出成功消息以及文件的元数据；否则，它将输出错误消息和来自 Apache Tika 的响应。

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # 将文件发送到 Apache Tika 并验证输出
        response = requests.put(tika_url, files={'file': open(file_path, 'rb')})

        if response.status_code == 200:
            print("Apache Tika 成功分析了文件。")
            print("来自 Apache Tika 的响应：")
            print(response.text)
        else:
            print("分析文件时出错：")
            print(f"状态码：{response.status_code}")
            print(f"来自 Apache Tika 的响应：{response.text}")
    except Exception as e:
        print(f"发生错误：{e}")

if __name__ == "__main__":
    file_path = "test.txt"  # 替换为您的文件路径
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

运行脚本的说明：

### 先决条件

* 系统上必须安装 Python 3.x
* 必须安装 `requests` 库（可以通过 pip 安装：`pip install requests`）
* 必须运行 Apache Tika Docker 容器（使用命令 `docker run -p 9998:9998 apache/tika`）
* 将 `"test.txt"` 替换为您要发送给 Apache Tika 的文件路径

### 运行脚本

1. 将脚本保存为 `verify_tika.py`（例如，使用 Notepad 或 Sublime Text 之类的文本编辑器）
2. 打开终端或命令提示符
3. 使用 `cd` 命令导航到保存脚本的目录
4. 使用以下命令运行脚本：`python verify_tika.py`
5. 脚本将输出一条消息，指示 Apache Tika 是否正常工作

注意：如果遇到任何问题，请确保 Apache Tika 容器正确运行，并且文件已被发送到正确的 URL。

### 总结

通过遵循这些步骤，您可以验证 Apache Tika 在 Docker 环境中是否正常工作。您可以通过发送文件进行分析、使用 GET 请求验证服务器是否正在运行，或者使用脚本自动化该过程。如果遇到任何问题，请确保 Apache Tika 容器正确运行，并且文件已被发送到正确的 URL。

故障排除
--------------

* 确保 Apache Tika 服务正在运行并可从 Open WebUI 实例访问。
* 检查 Docker 日志中是否有与 Apache Tika 服务相关的任何错误或问题。
* 验证 Open WebUI 中上下文提取引擎的 URL 是否配置正确。

集成的好处
----------------------

将 Apache Tika 与 Open WebUI 集成具有以下几个好处：

* **改进的元数据提取**：Apache Tika 的高级元数据提取功能可以帮助您从文件中提取准确且相关的数据。
* **支持多种文件格式**：Apache Tika 支持多种文件格式，是处理多样化文件类型的理想解决方案。
* **增强的内容分析**：Apache Tika 的高级内容分析功能可以帮助您从文件中提取有价值的见解。

总结
----------

将 Apache Tika 与 Open WebUI 集成是一个简单的过程，可以改进 Open WebUI 实例的元数据提取能力。通过遵循本说明中概述的步骤，您可以轻松设置 Apache Tika 作为 Open WebUI 的上下文提取引擎。
