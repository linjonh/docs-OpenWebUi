---
sidebar_position: 321
title: "🐍 Jupyter Notebook 集成"
---

:::warning
本教程是社区贡献内容，并未获得 Open WebUI 团队的支持。它仅作为如何根据您的特定需求定制 Open WebUI 的一个示例。想要贡献？请查看贡献教程。
:::

> [!WARNING]
> 本文档基于当前版本（0.5.16）创建，并在不断更新中。


# Jupyter Notebook 集成

从 v0.5.11 开始，Open-WebUI 发布了一项新功能，名为 `代码解释器中的 Jupyter Notebook 支持`。此功能允许您将 Open-WebUI 集成到 Jupyter 中。在随后的版本中，该功能已经有了许多改进，因此请仔细查看发布说明。

本教程将带您了解如何设置两项服务之间的连接的基础知识。

- [查看 v0.5.11 发布说明](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [查看 v0.5.15 发布说明](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## 什么是 Jupyter Notebook

Jupyter Notebook 是一个开源的网络应用，允许用户创建和共享包含实时代码、方程式、可视化和叙述性文本的文档。由于用户能够将可执行代码（如 Python、R 或 Julia）与解释性文本、图像和交互式可视化组合到同一个文档中，它在数据科学、科学计算和教育领域非常受欢迎。Jupyter Notebook 特别适合于数据分析和探索，因为它允许用户以小且易管理的块执行代码，同时记录思路和发现。这种格式使用户可以轻松地试验、调试代码以及创建全面且可共享的报告，展示分析过程和结果。

更多信息请参见 Jupyter 的官网：[Project Juptyer](https://jupyter.org/)

## 第 0 步：配置摘要

以下是本教程中要设置的目标配置。

![代码执行配置](/images/tutorials/jupyter/jupyter-code-execution.png)

# 第 1 步：启动 OUI 和 Jupyter

为实现这一目标，我使用了 `docker-compose` 启动一个包含两项服务（以及我的 LLMs）的栈，但如果分别运行每个 Docker 容器，这也是可行的。

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

您可以通过运行以下命令启动位于 `docker-compose` 文件所在目录的栈：

```bash title="运行 docker-compose"
docker-compose up -d
```

现在，您应该能够通过以下 URL 访问两项服务：

| 服务 | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

在访问 Jupyter 服务时，您将需要以上定义的 `JUPYTER_TOKEN`。对于本教程，我选择了一个虚拟 token 值 `123456`。

![代码执行配置](/images/tutorials/jupyter/jupyter-token.png)

# 第 2 步：为 Jupyter 配置代码执行

现在我们运行了 Open-WebUI 和 Jupyter，需要在 Admin Panel -> Settings -> Code Execution 中将 Open-WebUI 的代码执行配置为使用 Jupyter。由于 Open-WebUI 不断发布和改进此功能，我建议您始终查看 [`configs.py` 文件](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) 以获取最新和最全面的配置。截至 v0.5.16，包括如下配置：

| Open-WebUI 环境变量 | 值 |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## 第 3 步：测试连接

首先，让我们确认 Jupyter 目录中有什么。如以下图片所示，我们只有一个空的 `work` 文件夹。

![代码执行配置](/images/tutorials/jupyter/jupyter-empty.png)

### 创建一个CSV文件

让我们运行第一个提示。请确保您已经选择了`代码执行`按钮。

```
提示：使用虚构数据创建两个CSV文件。第一个CSV使用纯Python创建，第二个CSV使用pandas库创建。将CSV文件命名为data1.csv和data2.csv。
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-csv.png)

可以看到CSV文件已被创建，现在可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-csv.png)

### 创建可视化

让我们运行第二个提示。同样，请确保您已经选择了`代码执行`按钮。

```
提示：使用matplotlib和seaborn在Python中创建多个可视化，并保存到Jupyter。
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-viz.png)

可以看到可视化图表已被创建，现在可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-viz.png)

### 创建一个笔记本

让我们一起运行最后一个提示。在这个提示中，我们将仅通过提示创建一个全新的笔记本。

```
提示：编写Python代码来读取和写入JSON文件，并将其保存到名为notebook.ipynb的笔记本中。
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-notebook.png)

可以看到可视化图表已被创建，现在可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-notebook.png)

## 关于工作流程的说明

在测试此功能时，我多次注意到Open-WebUI不会自动将生成的代码或输出保存到我的Jupyter实例中。为强制输出我创建的文件/项目，我经常按照以下两步工作流程，首先创建我想要的代码构件，然后让它将其保存到我的Jupyter实例中。

![代码执行配置](/images/tutorials/jupyter/jupyter-workflow.png)

## 您如何使用这个功能？

您是否在使用代码执行功能和/或Jupyter？如果是，请联系我们。我非常想知道您如何使用它，这样我就可以继续在本教程中添加其他有趣示例，展示您可以如何使用此功能！
