---
sidebar_position: 11
title: "🖥️ 使用IPEX-LLM在Intel GPU上本地设置LLM"
---

:::warning
本教程是社区贡献内容，未获得Open WebUI团队的支持，仅作为如何定制Open WebUI以满足您的特定需求的演示。如果您想贡献，请查看贡献教程。
:::

:::note
本指南已通过[手动安装](/getting-started/index.md)的Open WebUI设置进行验证。
:::

# 使用IPEX-LLM在Intel GPU上本地设置LLM

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm)是一个用于在Intel CPU和GPU（例如，带iGPU的本地PC，独立GPU如Arc A系列、Flex和Max）上运行LLM的PyTorch库，具有非常低的延迟。
:::

本教程演示了如何在**由IPEX-LLM加速并托管在Intel GPU上的Ollama后端**设置Open WebUI。通过遵循本指南，您甚至可以在成本低廉的PC（例如仅配备集成GPU）上设置流畅运行的Open WebUI。

## 在Intel GPU上启动Ollama服务

请参考IPEX-LLM官方文档中的[此指南](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html)，了解如何安装并在Intel GPU上运行由IPEX-LLM加速的Ollama服务。

:::tip
如果您想从另一台机器访问Ollama服务，请确保在执行命令`ollama serve`之前设置或导出环境变量`OLLAMA_HOST=0.0.0.0`。
:::

## 配置Open WebUI

通过菜单中的**设置 -> 连接**访问Ollama设置。默认情况下，**Ollama基础URL**预设为`https://localhost:11434`，如下图所示。要验证Ollama服务连接状态，请点击文本框旁边的**刷新按钮**。如果WebUI无法与Ollama服务器建立连接，您将看到一条错误消息，内容为`WebUI无法连接到Ollama`。

![Open WebUI Ollama 设置失败](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

如果连接成功，您将看到消息`服务连接已验证`，如下图所示。

![Open WebUI Ollama 设置成功](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
如果您希望使用托管在其他URL上的Ollama服务器，只需将**Ollama基础URL**更新为新URL，并按**刷新**按钮重新确认与Ollama的连接。
:::
