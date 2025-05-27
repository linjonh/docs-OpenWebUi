---
sidebar_position: 1
title: "🐋 使用 Llama.cpp 运行 DeepSeek R1 Dynamic 1.58-bit"
---

特别感谢 **UnslothAI** 的卓越贡献！感谢他们的辛勤工作，我们现在可以在 **Llama.cpp** 上运行 **完整的 DeepSeek-R1** 671B 参数模型及其动态 1.58-bit 量化版本（压缩至仅 131GB）！最棒的是？您不再需要担心需要大型企业级 GPU 或服务器——现在可以在您的个人机器上运行此模型（对于大多数消费者硬件来说速度较慢）。

:::note
Ollama 上唯一真正的 **DeepSeek-R1** 模型是此处提供的 **671B 版本**：[https://ollama.com/library/deepseek-r1:671b](https://ollama.com/library/deepseek-r1:671b)。其他版本是 **蒸馏** 模型。
:::

本指南重点介绍如何使用 **Open WebUI** 集成的 **Llama.cpp** 运行 **完整的 DeepSeek-R1 动态 1.58-bit 量化模型**。在此教程中，我们将使用 **M4 Max + 128GB RAM** 机器演示步骤。您可以根据自己的配置进行调整。

---

## 步骤 1：安装 Llama.cpp

您可以选择：
- [下载预编译二进制文件](https://github.com/ggerganov/llama.cpp/releases)
- **或者自行构建**：请按照此处的说明操作：[Llama.cpp 构建指南](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md)

## 步骤 2：下载由 UnslothAI 提供的模型

前往 [Unsloth 的 Hugging Face 页面](https://huggingface.co/unsloth/DeepSeek-R1-GGUF) 并下载适当的 **动态量化版本** 的 DeepSeek-R1。在本教程中，我们将使用 **1.58-bit (131GB)** 版本，此版本进行了高度优化，但仍然异常功能强大。


:::tip
了解您的 "工作目录" —— 即您的 Python 脚本或终端会话正在运行的目录。模型文件默认会下载到该目录的子文件夹中，因此请务必知道其路径！例如，如果您在 `/Users/yourname/Documents/projects` 下运行以下命令，下载的模型会保存在 `/Users/yourname/Documents/projects/DeepSeek-R1-GGUF` 下。
:::

了解有关 UnslothAI 的开发过程及为何这些动态量化版本效率如此之高的更多信息，请查看他们的博客文章：[UnslothAI DeepSeek R1 动态量化](https://unsloth.ai/blog/deepseekr1-dynamic)。

以下是如何以代码形式下载模型：
```python
# 在运行之前安装 Hugging Face 所需的依赖项：
# pip install huggingface_hub hf_transfer

from huggingface_hub import snapshot_download

snapshot_download(
    repo_id = "unsloth/DeepSeek-R1-GGUF",  # 指定 Hugging Face 仓库
    local_dir = "DeepSeek-R1-GGUF",         # 模型将下载到这个目录
    allow_patterns = ["*UD-IQ1_S*"],        # 仅下载 1.58-bit 版本
)
```

下载完成后，您会发现模型文件的目录结构如下：
```
DeepSeek-R1-GGUF/
├── DeepSeek-R1-UD-IQ1_S/
│   ├── DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00002-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00003-of-00003.gguf
```

:::info
🛠️ 在后续步骤中更新路径以 **匹配您的具体目录结构**。例如，如果您的脚本位于 `/Users/tim/Downloads` 中，那么 GGUF 文件的完整路径将为：
`/Users/tim/Downloads/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`。
:::

## 步骤 3：确保安装并运行了 Open WebUI

如果您尚未安装 **Open WebUI**，不必担心！安装非常简单。只需按照 [Open WebUI 文档](https://docs.openwebui.com/) 操作即可。安装完成后启动应用程序——稍后我们将连接它以与 DeepSeek-R1 模型交互。


## 步骤 4：使用 Llama.cpp 提供模型服务

现在模型已下载，下一步是使用 **Llama.cpp 的服务模式** 运行它。开始之前：

1. **找到 `llama-server` 二进制文件。**
   如果您从源码构建（如步骤 1 所述），`llama-server` 可执行文件将位于 `llama.cpp/build/bin` 中。使用 `cd` 命令导航到这个目录：
   ```bash
   cd [path-to-llama-cpp]/llama.cpp/build/bin
   ```

   将 `[path-to-llama-cpp]` 替换为您的 Llama.cpp 克隆或构建位置。例如：
   ```bash
   cd ~/Documents/workspace/llama.cpp/build/bin
   ```

2. **指向您的模型文件夹。**
   使用步骤 2 中生成的 GGUF 文件的完整路径。在提供模型服务时，指定拆分 GGUF 文件的第一个部分（例如，`DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`）。

以下是启动服务器的命令：
```bash
./llama-server \
    --model /[your-directory]/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```


:::tip
🔑 **基于您的设备自定义参数：**

- **`--model`：** 将 `/[your-directory]/` 替换为在步骤2中下载GGUF文件的路径。
- **`--port`：** 服务器默认端口是 `8080`，但您可以根据端口可用性随意更改。
- **`--ctx-size`：** 确定上下文长度（标记数量）。如果您的硬件允许，可以增加此值，但要注意RAM/VRAM使用量的增加。
- **`--n-gpu-layers`：** 设置要卸载到GPU的层数，以实现更快的推断。具体数值取决于您的GPU内存容量——请参考Unsloth的性能推荐表。
:::

例如，如果您的模型下载到 `/Users/tim/Documents/workspace`，您的命令将如下所示：
```bash
./llama-server \
    --model /Users/tim/Documents/workspace/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```

启动服务器后，它将在以下地址托管一个**本地OpenAI兼容API**端点：
```
http://127.0.0.1:10000
```

:::info
🖥️ **Llama.cpp服务器已运行**

![服务器截图](/images/tutorials/deepseek/serve.png)

运行命令后，您应会看到一条消息，确认服务器已启动并正在监听端口10000。
:::

请确保**保持此终端会话运行**，因为它会服务于后续的所有步骤。

## 第五步：将Llama.cpp连接到Open WebUI

1. 在Open WebUI中打开**管理员设置**。
2. 进入**连接 > OpenAI连接**。
3. 为新的连接添加以下详细信息：
   - URL: `http://127.0.0.1:10000/v1`（或者当在docker中运行Open WebUI时使用 `http://host.docker.internal:10000/v1`）
   - API Key: `none`

:::info
🖥️ **在Open WebUI中添加连接**

![连接截图](/images/tutorials/deepseek/connection.png)

保存连接后，您应该可直接从Open WebUI中查询**DeepSeek-R1**！ 🎉
:::

保存连接后，您可以开始直接从Open WebUI查询**DeepSeek-R1**！ 🎉

---

## 示例：生成响应

现在您可以使用Open WebUI的聊天界面与**DeepSeek-R1动态1.58位模型**进行交互。

![响应截图](/images/tutorials/deepseek/response.png)

---

## 注意事项

- **性能：**
  在个人设备上运行体量为131GB的DeepSeek-R1模型将会**非常慢**。即便是在我们的M4 Max（128GB RAM）上，推断速度也只是中等水平。但仍然能够在普通设备上运行，证明了UnslothAI的优化。

- **VRAM/内存需求：**
  确保拥有足够的VRAM和系统RAM以获得最佳性能。如果是低端GPU或仅用CPU运行，速度可能较慢（但仍然可以运行）。

---

感谢**UnslothAI**和**Llama.cpp**，现在个人已经可以运行这一最大的开源推理模型之一——**DeepSeek-R1**（1.58位版本）。尽管在消费者级硬件上运行这些模型具有挑战性，但能够无需庞大的计算基础设施完成它是一项重大的技术里程碑。

⭐ 万分感谢社区推动了开放AI研究的边界。

祝您实验愉快！ 🚀
