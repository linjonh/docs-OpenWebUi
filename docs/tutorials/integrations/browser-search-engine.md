---
sidebar_position: 16
title: "🌐 浏览器搜索引擎"
---

:::warning
本教程由社区贡献，未得到 Open WebUI 团队的支持。它仅作为一个如何定制 Open WebUI 以满足特定使用场景的示例。想要贡献？查看贡献教程。
:::

# 浏览器搜索引擎集成

Open WebUI 允许直接集成到您的网页浏览器中。本教程将指导您将 Open WebUI 设置为自定义搜索引擎，从而能够轻松地通过浏览器地址栏执行查询。

## 将 Open WebUI 设置为搜索引擎

### 前置要求

开始之前，请确保：

- 您已安装 Chrome 或其他支持的浏览器。
- `WEBUI_URL` 环境变量配置正确，可以通过 Docker 环境变量设置或按照[入门指南](/getting-started/env-configuration)中的说明在 `.env` 文件中配置。

### 步骤 1：设置 WEBUI_URL 环境变量

设置 `WEBUI_URL` 环境变量可以确保您的浏览器知道查询的目标地址。

#### 使用 Docker 环境变量

如果您通过 Docker 运行 Open WebUI，可以在 `docker run` 命令中设置环境变量：

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<your-open-webui-url>" \
  ghcr.io/open-webui/open-webui:main
```

或者，您可以将该变量添加到 `.env` 文件中：

```plaintext
WEBUI_URL=https://<your-open-webui-url>
```

### 步骤 2：将 Open WebUI 添加为自定义搜索引擎

### 针对 Chrome

1. 打开 Chrome 并进入 **设置**。
2. 从侧边栏选择 **搜索引擎**，然后点击 **管理搜索引擎**。
3. 点击 **添加** 创建一个新搜索引擎。
4. 填写以下详细信息：
    - **搜索引擎**：Open WebUI Search
    - **关键词**：webui（或者任何您喜欢的关键词）
    - **包含 %s 作为查询占位的 URL**：

      ```
      https://<your-open-webui-url>/?q=%s
      ```

5. 点击 **添加** 保存配置。

### 针对 Firefox

1. 在 Firefox 中打开 Open WebUI。
2. 点击地址栏以展开。
3. 点击展开地址栏底部绿色圆圈内的加号图标。这会将 Open WebUI 的搜索添加到您的搜索引擎首选项中。

或者：

1. 在 Firefox 中打开 Open WebUI。
2. 右键单击地址栏。
3. 从上下文菜单中选择“添加 Open WebUI”（或类似选项）。

### 可选：使用特定模型

如果希望使用特定模型进行搜索，可以修改 URL 格式以包含模型 ID：

```
https://<your-open-webui-url>/?models=<model_id>&q=%s
```

**注意：** 模型 ID 需要进行 URL 编码。特殊字符如空格或斜杠需要编码（例如，`my model` 转换为 `my%20model`）。

## 示例用法

设置完成后，您可以直接从地址栏进行搜索。只需输入您选择的关键词，然后输入查询内容：

```
webui your search query
```

该命令会将您重定向到带有查询结果的 Open WebUI 界面。

## 故障排除

如果遇到任何问题，请检查以下事项：

- 确保 `WEBUI_URL` 配置正确，并指向有效的 Open WebUI 实例。
- 仔细检查您浏览器设置中搜索引擎的 URL 格式是否正确输入。
- 确认您的互联网连接正常，并且 Open WebUI 服务正在平稳运行。
