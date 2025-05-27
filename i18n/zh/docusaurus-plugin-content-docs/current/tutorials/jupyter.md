---
sidebar_position: 321
title: "🐍 Jupyter Notebook 集成"
---

:::warning
此教程是社区贡献内容，并未得到 Open WebUI 团队的支持。它仅作为定制 Open WebUI 以满足您特定需求的示例。如果您想贡献，可以查看贡献教程。
:::

> [!WARNING]
> 此文档基于当前版本（0.5.16）创建，并在不断更新中。


# Jupyter Notebook 集成

从 v0.5.11 开始，Open-WebUI 引入了一项新功能，名为 `代码解释器中的 Jupyter Notebook 支持`。此功能允许您将 Open-WebUI 与 Jupyter 集成。在随后的版本中，此功能已经进行了一些改进，请仔细查看发布说明。

本教程将指导您完成设置两项服务之间连接的基本步骤。

- [查看 v0.5.11 发布说明](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [查看 v0.5.15 发布说明](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## 什么是 Jupyter Notebook

Jupyter Notebook 是一个开源的 Web 应用程序，允许用户创建和共享包含实时代码、公式、可视化以及叙述性文本的文档。它在数据科学、科学计算和教育中尤其受欢迎，因为它使用户能够将可执行的代码（例如 Python、R 或 Julia）与解释性文本、图像及交互式可视化组合在一个文档中。Jupyter Notebook 对数据分析和探索特别有用，因为它允许用户以小块代码的形式执行，同时记录他们的思考过程和发现。这种格式使得实验、调试代码以及创建展示分析过程和结果的全面共享报告变得十分容易。

查看 Jupyter 的网站以了解更多信息：[Project Jupyter](https://jupyter.org/)

## 步骤 0: 配置摘要

以下是我们将在本教程中设置的目标配置。

![代码执行配置](/images/tutorials/jupyter/jupyter-code-execution.png)

# 步骤 1: 启动 OUI 和 Jupyter

为了实现这一目标，我使用 `docker-compose` 启动了一个包含这两个服务以及我的 LLMs 的栈，不过如果单独运行每个 Docker 容器，这也应该有效。

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

您可以通过在保存 `docker-compose` 文件的目录中运行以下命令来启动上面的栈：

```bash title="运行 docker-compose"
docker-compose up -d
```

您现在应该能够通过以下 URL 访问两个服务：

| 服务 | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

访问 Jupyter 服务时，您需要上述定义的 `JUPYTER_TOKEN`。在本教程中，我选择了一个示例 token 值 `123456`。

![代码执行配置](/images/tutorials/jupyter/jupyter-token.png)

# 步骤 2: 配置 Jupyter 的代码执行

现在我们已经运行了 Open-WebUI 和 Jupyter，我们需要在 Open-WebUI 的代码执行中进行配置以使用 Jupyter。可以通过管理面板 -> 设置 -> 代码执行完成配置。由于 Open-WebUI 不断发布和改进此功能，我建议您始终查看 [`configs.py` 文件](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) 以了解最新的配置选项。到 v0.5.16 为止，包括以下内容：

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

## 步骤 3: 测试连接

首先，让我们确认 Jupyter 目录中的内容。从下面的图片中可以看到，我们只有一个空的 `work` 文件夹。

![代码执行配置](/images/tutorials/jupyter/jupyter-empty.png)

### 创建一个CSV文件

让我们运行第一个提示。确保您已选择`代码执行`按钮。

```
提示：使用虚构数据创建两个CSV文件。第一个CSV应该使用原生Python创建，第二个CSV应该使用Pandas库创建。命名为data1.csv和data2.csv
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-csv.png)

我们可以看到CSV文件已经创建并可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-csv.png)

### 创建一个可视化

让我们运行第二个提示。同样，确保您已选择`代码执行`按钮。

```
提示：使用matplotlib和seaborn在Python中创建几个可视化，并将它们保存到Jupyter。
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-viz.png)

我们可以看到可视化已经创建并可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-viz.png)

### 创建一个Notebook

让我们一起运行最后一个提示。在此提示中，我们将仅通过提示创建一个全新的Notebook。

```
提示：编写Python代码来读取和写入JSON文件，并将其保存到我的名为notebook.ipynb的Notebook中
```

![代码执行配置](/images/tutorials/jupyter/jupyter-create-notebook.png)

我们可以看到Notebook已创建并可以在Jupyter中访问。

![代码执行配置](/images/tutorials/jupyter/jupyter-view-notebook.png)

## 关于工作流程的说明

在测试此功能时，我发现Open-WebUI有几次没有自动保存它在Open-WebUI中生成的代码或输出到我的Jupyter实例。为了强制它输出我创建的文件/项目，我经常采用这种两步工作流程，首先创建我想要的代码工件，然后要求它保存到我的Jupyter实例中。

![代码执行配置](/images/tutorials/jupyter/jupyter-workflow.png)

## 您如何使用此功能？

您是否在使用代码执行功能和/或Jupyter？如果是，请随时联系。我很乐意听听您是如何使用它的，以便我能继续为本教程添加更多示例，展示您可以使用此功能的其他精彩方式！
