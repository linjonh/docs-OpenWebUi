---
sidebar_position: 16
title: "🌐 浏览器搜索引擎"
---

:::warning
本教程是社区贡献内容，并未获得 Open WebUI 团队的支持。它仅作为定制 Open WebUI 以满足特定使用案例的示范。想参与贡献？请查看贡献教程。
:::

# 浏览器搜索引擎集成

Open WebUI 允许您直接集成到您的网络浏览器中。本教程将指导您如何将 Open WebUI 设置为自定义搜索引擎，从而可以方便地通过浏览器的地址栏执行查询。

## 将 Open WebUI 设置为搜索引擎

### 前提条件

在开始之前，请确保：

- 您已安装 Chrome 或其他支持的浏览器。
- 已正确设置 `WEBUI_URL` 环境变量，可以通过 Docker 环境变量或在 `.env` 文件中按照 [入门指南](/getting-started/env-configuration) 中的说明进行设置。

### 步骤 1：设置 WEBUI_URL 环境变量

设置 `WEBUI_URL` 环境变量确保您的浏览器知道将查询指向何处。

#### 使用 Docker 环境变量

如果您使用 Docker 运行 Open WebUI，可以在您的 `docker run` 命令中设置环境变量：

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

或者，您可以将变量添加到 `.env` 文件中：

```plaintext
WEBUI_URL=https://<your-open-webui-url>
```

### 步骤 2：将 Open WebUI 添加为自定义搜索引擎

### 针对 Chrome

1. 打开 Chrome 并导航到 **设置**。
2. 从侧边栏中选择 **搜索引擎**，然后单击 **管理搜索引擎**。
3. 单击 **添加** 来创建新的搜索引擎。
4. 按以下内容填写详细信息：
    - **搜索引擎**：Open WebUI Search
    - **关键字**：webui（或任何您喜欢的关键字）
    - **带有 %s 作为查询占位的 URL**：

      ```
      https://<your-open-webui-url>/?q=%s
      ```

5. 单击 **添加** 保存配置。

### 针对 Firefox

1. 在 Firefox 中打开 Open WebUI。
2. 点击地址栏放大部分。
3. 点击地址栏底部绿色圆圈中的加号图标。这会将 Open WebUI 的搜索添加到您的首选搜索引擎中。

或者：

1. 在 Firefox 中打开 Open WebUI。
2. 右键单击地址栏。
3. 从上下文菜单中选择 "添加 Open WebUI"（或类似项）。

### 可选：使用特定模型

如果您希望使用特定模型进行搜索，请修改 URL 格式以包含模型 ID：

```
https://<your-open-webui-url>/?models=<model_id>&q=%s
```

**注意：** 模型 ID 需要进行 URL 编码。特殊字符如空格或斜杠需要编码（例如，`my model` 变为 `my%20model`）。

## 使用示例

设置完搜索引擎后，您可以直接从地址栏执行搜索。只需输入您选择的关键字，然后输入查询：

```
webui 您的查询内容
```

此命令会将您重定向到 Open WebUI 界面并显示搜索结果。

## 故障排除

如果遇到任何问题，请检查以下内容：

- 确保 `WEBUI_URL` 配置正确且指向有效的 Open WebUI 实例。
- 仔细检查浏览器设置中是否正确输入了搜索引擎 URL 格式。
- 确认您的网络连接正常且 Open WebUI 服务运行顺畅。
