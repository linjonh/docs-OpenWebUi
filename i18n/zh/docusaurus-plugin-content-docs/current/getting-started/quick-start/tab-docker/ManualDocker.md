## 使用Docker快速开始 🐳

按照以下步骤通过Docker安装Open WebUI。

## 步骤1：拉取Open WebUI镜像

首先从GitHub容器注册表拉取最新的Open WebUI Docker镜像。

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## 步骤2：运行容器

使用默认设置运行容器。此命令包括一个卷映射以保证数据持久存储。

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### 重要参数说明

- **卷映射 (`-v open-webui:/app/backend/data`)**: 保证数据持久存储，防止容器重启时的数据丢失。
- **端口映射 (`-p 3000:8080`)**: 将WebUI暴露在本地机器的3000端口。

### 使用GPU支持

为了支持Nvidia GPU，在`docker run`命令中添加`--gpus all`：

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### 单用户模式 (禁用登录功能)

若为单用户配置无需登录页面，请将`WEBUI_AUTH`环境变量设置为`False`：

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
进行此更改后，无法在单用户模式和多账户模式之间切换。
:::

#### 高级配置：连接到另一台服务器上的Ollama

若需将Open WebUI连接到其他主机上的Ollama服务器，请添加`OLLAMA_BASE_URL`环境变量：

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## 访问WebUI

容器运行后，可通过以下地址访问Open WebUI：

[http://localhost:3000](http://localhost:3000)

有关每个Docker参数的详细说明，请参见[Docker的文档](https://docs.docker.com/engine/reference/commandline/run/)。
