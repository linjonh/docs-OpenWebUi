---
sidebar_position: 6
title: "🎨 图像生成"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持，仅作为如何根据您的具体使用案例定制 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

# 🎨 图像生成

Open WebUI 通过三个后端支持图像生成：**AUTOMATIC1111**、**ComfyUI** 和 **OpenAI DALL·E**。本指南将帮助您设置并使用这些选项之一。

## AUTOMATIC1111

Open WebUI 通过 **AUTOMATIC1111** [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) 支持图像生成。以下是入门步骤：

### 初始化设置

1. 确保您已安装 [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)。
2. 使用附加参数启动 AUTOMATIC1111 以启用 API 访问：

   ```
   ./webui.sh --api --listen
   ```

3. 对于带有预设环境变量的 WebUI Docker 安装，请使用以下命令：

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### 在 Open WebUI 中使用 AUTOMATIC1111

1. 在 Open WebUI 中，导航至 **管理面板** > **设置** > **图像** 菜单。
2. 将 `Image Generation Engine` 字段设置为 `Default (Automatic1111)`。
3. 在 API URL 字段中输入 AUTOMATIC1111 API 可访问的地址：

   ```
   http://<your_automatic1111_address>:7860/
   ```

   如果您在同一主机上运行 Open WebUI 和 AUTOMATIC1111 的 Docker 安装，请使用 `http://host.docker.internal:7860/` 作为地址。

## ComfyUI

ComfyUI 提供了管理和与图像生成模型交互的替代界面。了解更多内容或从其 [GitHub 页面](https://github.com/comfyanonymous/ComfyUI) 下载软件包。以下是让 ComfyUI 与您的其他工具一起运行的设置说明。

### 初始化设置

1. 从 [GitHub](https://github.com/comfyanonymous/ComfyUI) 下载并解压 ComfyUI 软件包至目标目录。
2. 要启动 ComfyUI，请运行以下命令：

   ```
   python main.py
   ```

   对于显存较低的系统，使用附加参数启动 ComfyUI 以减少内存占用：

   ```
   python main.py --lowvram
   ```

3. 对于带有预设环境变量的 WebUI Docker 安装，请使用以下命令：

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### 在 Open WebUI 中使用 ComfyUI

#### 设置 FLUX.1 模型

1. **模型检查点**：

* 从 [black-forest-labs HuggingFace 页面](https://huggingface.co/black-forest-labs) 下载 `FLUX.1-schnell` 或 `FLUX.1-dev` 模型。
* 将模型检查点放置在 ComfyUI 的 `models/checkpoints` 和 `models/unet` 目录中。或者，您可以在 `models/checkpoints` 和 `models/unet` 之间创建符号链接，以确保两个目录包含相同的模型检查点。

2. **VAE 模型**：

* 从 [这里](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors) 下载 `ae.safetensors` VAE。
* 将其放置在 ComfyUI 的 `models/vae` 目录中。

3. **CLIP 模型**：

* 从 [这里](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) 下载 `clip_l.safetensors`。
* 将其放置在 ComfyUI 的 `models/clip` 目录中。

4. **T5XXL 模型**：

* 从 [这里](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) 下载 `t5xxl_fp16.safetensors` 或 `t5xxl_fp8_e4m3fn.safetensors`。
* 将其放置在 ComfyUI 的 `models/clip` 目录中。

要将 ComfyUI 集成到 Open WebUI 中，请按以下步骤操作：

#### 第一步：配置 Open WebUI 设置

1. 导航至 Open WebUI 的 **管理面板**。
2. 点击 **设置**，然后选择 **图像** 标签。
3. 在 `Image Generation Engine` 字段中选择 `ComfyUI`。
4. 在 **API URL** 字段中输入 ComfyUI API 可访问的地址，格式如下：`http://<your_comfyui_address>:8188/`。
   * 将环境变量 `COMFYUI_BASE_URL` 设置为此地址，以确保其在 WebUI 中持久化。

#### 第二步：验证连接并启用图像生成

1. 确保 ComfyUI 正在运行，并且您已成功验证与 Open WebUI 的连接。在成功连接之前无法继续。
2. 一旦连接成功，打开 **Image Generation (Experimental)** 开关。您将看到更多选项。
3. 继续第3步完成最终配置步骤。

#### 第3步：配置 ComfyUI 设置并导入工作流

1. 在 ComfyUI 中启用开发者模式。为此，请找到 ComfyUI 内 **Queue Prompt** 按钮上方的齿轮图标，并启用 `Dev Mode` 开关。
2. 使用 ComfyUI 的 `Save (API Format)` 按钮以 `API 格式`导出所需的工作流。如果操作正确，文件将以 `workflow_api.json` 的形式下载。
3. 返回 Open WebUI 并点击 **点击这里上传 workflow.json 文件** 按钮。
4. 选择 `workflow_api.json` 文件以将 ComfyUI 中导出的工作流导入到 Open WebUI 中。
5. 导入工作流后，必须根据导入的工作流节点 ID 映射 `ComfyUI Workflow Nodes`。
6. 将 `Set Default Model` 设置为正在使用的模型文件的名称，例如 `flux1-dev.safetensors`。

:::info
您可能需要在 Open WebUI 的 `ComfyUI Workflow Nodes` 部分调整一个或多个 `Input Key` 以匹配您工作流中的某个节点。
例如，`seed` 可能需要重命名为 `noise_seed` 才能匹配导入工作流中的节点 ID。
:::
:::tip
某些工作流（例如使用任何 Flux 模型的工作流）可能使用多个节点 ID，这些节点 ID 必须填入 Open WebUI 的节点条目字段。如果一个节点条目字段需要多个 ID，则这些节点 ID 应以逗号分隔（例如 `1` 或 `1, 2`）。
:::

6. 点击 `Save` 应用设置，并享受 ComfyUI 集成到 Open WebUI 后的图像生成吧！

完成上述步骤后，您的 ComfyUI 设置应已与 Open WebUI 集成，您可以使用 Flux.1 模型进行图像生成。

### 配置 SwarmUI

SwarmUI 使用 ComfyUI 作为其后端。要让 Open WebUI 与 SwarmUI 一起正常工作，您需要将 `ComfyBackendDirect` 添加到 `ComfyUI Base URL` 中。此外，您需要设置 SwarmUI 的 LAN 访问权限。完成上述调整后，设置 SwarmUI 与 Open WebUI 一起工作的步骤与 [第 1 步：配置 Open WebUI 设置](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings) 中描述的设置是相同的。
![安装具有 LAN 访问权限的 SwarmUI](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

您将输入作为 ComfyUI Base URL 的地址为：`http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI 还支持通过 **OpenAI DALL·E APIs** 生成图像。此选项包括一个选择器，可选择使用 DALL·E 2 或 DALL·E 3，它们分别支持不同的图像尺寸。

### 初步设置

1. 从 OpenAI 处获取 [API 密钥](https://platform.openai.com/api-keys)。

### 配置 Open WebUI

1. 在 Open WebUI 中，导航至 **Admin Panel** > **Settings** > **Images** 菜单。
2. 将 `Image Generation Engine` 字段设置为 `Open AI (Dall-E)`。
3. 输入您的 OpenAI API 密钥。
4. 选择您希望使用的 DALL·E 模型。请注意，图像尺寸选项将取决于所选模型：
   * **DALL·E 2**: 支持 `256x256`、`512x512` 或 `1024x1024` 图像。
   * **DALL·E 3**: 支持 `1024x1024`、`1792x1024` 或 `1024x1792` 图像。

### Azure OpenAI

直接使用 Azure OpenAI Dall-E 是不支持的，但您可以 [设置 LiteLLM 代理](https://litellm.vercel.app/docs/image_generation)，其与 `Open AI (Dall-E)` 图像生成引擎兼容。

## 使用图像生成功能

![图像生成教程](/images/tutorial_image_generation.png)

1. 首先，使用文本生成模型编写图像生成的提示。
2. 响应完成后，您可以点击图片图标生成图像。
3. 图像生成完成后，它会自动在聊天中返回。

:::tip
    您还可以编辑 LLM&apos;s 的响应并将您的图像生成提示作为消息输入
    用于图像生成，而不是使用 LLM 提供的实际响应。
:::
