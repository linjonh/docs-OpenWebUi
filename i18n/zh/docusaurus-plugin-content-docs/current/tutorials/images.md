---
sidebar_position: 6
title: "🎨 图像生成"
---

:::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持。它仅作为如何根据您的具体用例自定义 Open WebUI 的演示。想要贡献？查看贡献教程。
:::

# 🎨 图像生成

Open WebUI 支持通过以下三种后端生成图像：**AUTOMATIC1111**、**ComfyUI** 和 **OpenAI DALL·E**。本指南将帮助您设置并使用其中任意一种选项。

## AUTOMATIC1111

Open WebUI 通过 **AUTOMATIC1111** 的 [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) 支持图像生成。以下是开始使用的步骤：

### 初始设置

1. 确保您已安装 [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)。
2. 启动 AUTOMATIC1111 时，添加额外的标志以启用 API 访问：

   ```
   ./webui.sh --api --listen
   ```

3. 如果您是使用 Docker 安装 WebUI 并预设了环境变量，运行以下命令：

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### 在 Open WebUI 中设置 AUTOMATIC1111

1. 在 Open WebUI 中，导航到 **管理面板** > **设置** > **图像** 菜单。
2. 将 `图像生成引擎` 字段设置为 `默认 (Automatic1111)`。
3. 在 API URL 字段中输入 AUTOMATIC1111 的 API 可访问地址：

   ```
   http://<your_automatic1111_address>:7860/
   ```

   如果您在同一主机上使用 Docker 安装了 Open WebUI 和 AUTOMATIC1111，请使用 `http://host.docker.internal:7860/` 作为地址。

## ComfyUI

ComfyUI 提供了一个管理和交互图像生成模型的替代界面。详情请访问其 [GitHub 页面](https://github.com/comfyanonymous/ComfyUI)。以下是设置 ComfyUI 并将其与其他工具配合使用的说明。

### 初始设置

1. 从 [GitHub](https://github.com/comfyanonymous/ComfyUI) 下载并解压 ComfyUI 软件包至您指定的目录。
2. 启动 ComfyUI，运行以下命令：

   ```
   python main.py
   ```

   如果您使用的是低显存系统，可以使用额外的标志以减少内存占用：

   ```
   python main.py --lowvram
   ```

3. 如果您是使用 Docker 安装 WebUI 并预设了环境变量，运行以下命令：

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### 在 Open WebUI 中设置 ComfyUI

#### 设置 FLUX.1 模型

1. **模型检查点**：

* 从 [black-forest-labs 的 HuggingFace 页面](https://huggingface.co/black-forest-labs) 下载 `FLUX.1-schnell` 或 `FLUX.1-dev` 模型。
* 将模型检查点放入 ComfyUI 的 `models/checkpoints` 和 `models/unet` 目录中。或者，您可以在 `models/checkpoints` 和 `models/unet` 之间创建一个符号链接，以确保两个目录包含相同的模型检查点。

2. **VAE 模型**：

* 从 [这里](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors) 下载 `ae.safetensors` VAE。
* 将其放到 ComfyUI 的 `models/vae` 目录中。

3. **CLIP 模型**：

* 从 [这里](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) 下载 `clip_l.safetensors`。
* 将其放到 ComfyUI 的 `models/clip` 目录中。

4. **T5XXL 模型**：

* 从 [这里](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main) 下载 `t5xxl_fp16.safetensors` 或 `t5xxl_fp8_e4m3fn.safetensors` 模型。
* 将其放到 ComfyUI 的 `models/clip` 目录中。

将 ComfyUI 集成到 Open WebUI 中，请执行以下步骤：

#### 第一步：配置 Open WebUI 设置

1. 在 Open WebUI 中导航到 **管理面板**。
2. 点击 **设置**，然后选择 **图像** 选项卡。
3. 在 `图像生成引擎` 字段中，选择 `ComfyUI`。
4. 在 **API URL** 字段中，输入 ComfyUI 的 API 可访问地址，格式如下：`http://<your_comfyui_address>:8188/`。
   * 将环境变量 `COMFYUI_BASE_URL` 设置为该地址，以确保地址在 WebUI 内持续有效。

#### 第二步：验证连接并启用图像生成

1. 确保 ComfyUI 正在运行，并且您已成功验证与 Open WebUI 的连接。未成功连接将无法继续。
2. 连接验证成功后，切换开启 **图像生成（实验性）**。更多选项将向您展示。
3. 继续进入步骤3完成最终的配置步骤。

#### 步骤3：配置ComfyUI设置并导入工作流

1. 在ComfyUI中启用开发者模式。在ComfyUI中，寻找**队列提示**（Queue Prompt）按钮上方的齿轮图标，然后启用`开发者模式`（Dev Mode）开关。
2. 在ComfyUI中使用`保存（API格式）`按钮以`API格式`导出所需的工作流。如果操作正确，文件将被下载为`workflow_api.json`。
3. 返回Open WebUI并单击**单击此处上传一个workflow.json文件**按钮。
4. 选择`workflow_api.json`文件，将从ComfyUI导出的工作流导入到Open WebUI。
5. 导入工作流后，您需要根据导入的工作流节点ID映射`ComfyUI 工作流节点`。
6. 将`设置默认模型`（Set Default Model）设置为正在使用的模型文件的名称，例如`flux1-dev.safetensors`。

:::信息
您可能需要在Open WebUI的`ComfyUI 工作流节点`部分调整一个或两个`输入键`（Input Key）以匹配您的工作流中的一个节点。
例如，可能需要将`seed`重命名为`noise_seed`以匹配您导入工作流中的某个节点ID。
:::
:::提示
一些工作流，例如使用任何Flux模型的工作流，可能会使用多个节点ID，这些ID在Open WebUI的节点条目字段中是必须填写的。如果一个节点条目字段需要多个ID，则节点ID应以逗号分隔（例如`1`或`1, 2`）。
:::

6. 单击`保存`（Save）以应用设置并享受将ComfyUI集成到Open WebUI后的图像生成！

完成以上步骤后，您的ComfyUI设置将集成到Open WebUI中，并且您可以使用Flux.1模型进行图像生成。

### 配置SwarmUI

SwarmUI将ComfyUI用作其后端。为了使Open WebUI与SwarmUI一起使用，您需要在`ComfyUI 基础URL`（ComfyUI Base URL）中附加`ComfyBackendDirect`。另外，您需要设置SwarmUI以支持LAN访问。完成上述调整后，将SwarmUI设置为与Open WebUI协作的步骤与[步骤1：配置Open WebUI设置](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings)中的内容相同。
![安装带有LAN访问的SwarmUI](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

您将输入为ComfyUI基础URL的地址将类似于：`http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI还支持通过**OpenAI DALL·E API**进行图像生成。该选项提供了一个选择器，可以选择DALL·E 2或DALL·E 3，它们支持不同的图像大小。

### 初始化设置

1. 从OpenAI获取一个[API密钥](https://platform.openai.com/api-keys)。

### 配置Open WebUI

1. 在Open WebUI中，导航到**管理员面板** > **设置** > **图像**菜单。
2. 将`图像生成引擎`字段设置为`Open AI (Dall-E)`。
3. 输入您的OpenAI API密钥。
4. 选择您想要使用的DALL·E模型。请注意，图像大小选项将取决于所选模型：
   * **DALL·E 2**：支持`256x256`、`512x512`和`1024x1024`图像。
   * **DALL·E 3**：支持`1024x1024`、`1792x1024`和`1024x1792`图像。

### Azure OpenAI

直接使用Azure OpenAI DALL-E是不支持的，但您可以设置一个[LiteLLM代理](https://litellm.vercel.app/docs/image_generation)，它兼容`Open AI (Dall-E)`图像生成引擎。

## 使用图像生成

![图像生成教程](/images/tutorial_image_generation.png)

1. 首先，使用文本生成模型为图像生成编写提示。
2. 当响应完成后，您可以单击图片图标生成图像。
3. 图像生成完成后，它会自动返回到聊天中。

:::提示
    您还可以编辑LLM的响应并将您的图像生成提示作为消息发送
    以进行图像生成，而不是使用LLM提供的实际响应。
:::
