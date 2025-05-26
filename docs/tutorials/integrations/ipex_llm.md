---
sidebar_position: 11
title: "🖥️ 使用 Intel GPU 和 IPEX-LLM 设置本地 LLM"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持。它仅用于示范如何根据特定需求自定义 Open WebUI。想要贡献？请查看贡献教程。
:::

:::note
本指南已经通过[手动安装](/getting-started/index.md)验证与 Open WebUI 的设置。
:::

# 使用 Intel GPU 和 IPEX-LLM 设置本地 LLM

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm) 是一个用于在 Intel CPU 和 GPU（例如配备集成 GPU 的本地 PC，离散 GPU 如 Arc A 系列、Flex 和 Max）上运行 LLM 的 PyTorch 库，具有非常低的延迟。
:::

本教程演示如何通过**在 Intel GPU 上运行的 IPEX-LLM 加速 Ollama 后端**设置 Open WebUI。按照此指南，您甚至可以在低成本的 PC（例如仅配备集成 GPU）上设置 Open WebUI，获得流畅的体验。

## 在 Intel GPU 上启动 Ollama Serve

请参阅 IPEX-LLM 官方文档中的[本指南](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html)，了解如何安装和运行由 IPEX-LLM 加速的 Ollama serve。

:::tip
如果您希望从其他机器访问 Ollama 服务，请确保在执行 `ollama serve` 命令之前设置或导出环境变量 `OLLAMA_HOST=0.0.0.0`。
:::

## 配置 Open WebUI

通过菜单中的**设置 -> 连接**访问 Ollama 设置。默认情况下，**Ollama 基础 URL**预设为 https://localhost:11434，如下面的截图所示。要验证 Ollama 服务连接状态，请单击文本框旁的**刷新按钮**。如果 WebUI 无法与 Ollama 服务器建立连接，您将看到一条错误消息，提示`WebUI 无法连接到 Ollama`。

![Open WebUI Ollama 设置失败](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

如果连接成功，您将看到一条消息提示`服务连接已验证`，如下面的截图所示。

![Open WebUI Ollama 设置成功](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
如果您想使用托管在其他 URL 下的 Ollama 服务器，只需将 **Ollama 基础 URL** 更新为新 URL，然后按下**刷新按钮**重新确认与 Ollama 的连接。
:::
