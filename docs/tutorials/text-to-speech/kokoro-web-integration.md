---
sidebar_position: 2
title: "🗨️ Kokoro Web - 让 Open WebUI 的语音合成变得轻松"
---

:::warning
本教程由社区贡献，并未获得 Open WebUI 团队的支持，仅作为如何定制 Open WebUI 以满足特定需求的示例。想要贡献？请查看贡献教程。
:::

## 什么是 `Kokoro Web`？

[Kokoro Web](https://github.com/eduardolat/kokoro-web) 提供了一个轻量级、兼容 OpenAI 的 API，用于强大的 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文本转语音模型。这款工具可以无缝集成到 Open WebUI 中，为您的 AI 对话带来自然的语音体验。

## 🚀 两步集成

### 1. 部署 Kokoro Web API（只需一条命令）

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # 更改为任意密钥，作为您的 OpenAI 兼容 API 密钥
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

运行命令：`docker compose up -d`

### 2. 连接到 OpenWebUI（30 秒即可完成）

1. 在 OpenWebUI 中，转到 `Admin Panel` → `Settings` → `Audio`
2. 配置以下内容：
   - 文本转语音引擎：`OpenAI`
   - API 基础 URL：`http://localhost:3000/api/v1`  
     （如果使用 Docker：`http://host.docker.internal:3000/api/v1`）
   - API 密钥：`your-api-key`（来自步骤 1）
   - TTS 模型：`model_q8f16`（尺寸和质量的最佳平衡）
   - TTS 语音：`af_heart`（默认温暖、自然的英语语音）。您可以从 [Kokoro Web Demo](https://voice-generator.pages.dev) 更改为其他语音或格式。

**完成！您的 OpenWebUI 现在具备 AI 语音功能。**

## 🌍 支持的语言

Kokoro Web 支持 8 种语言，每种语言均有专为其优化的特定语音：

- 英语（美国）- en-us
- 英语（英国）- en-gb
- 日语 - ja
- 中文 - cmn
- 西班牙语 - es-419
- 印地语 - hi
- 意大利语 - it
- 葡萄牙语（巴西）- pt-br

每种语言都有专属语音，以实现最佳发音和自然流畅。完整的语言专属语音列表请见 [GitHub 仓库](https://github.com/eduardolat/kokoro-web)，或者使用 [Kokoro Web Demo](https://voice-generator.pages.dev) 立即预览和创建自定义语音。

## 💾 针对任意硬件优化的模型

选择适合您硬件需求的模型：

| 模型 ID | 优化方式 | 大小 | 理想用途 |
|----------|-------------|------|-----------|
| model_q8f16 | 混合精度 | 86 MB | **推荐** - 最佳平衡 |
| model_quantized | 8 位量化 | 92.4 MB | 良好的 CPU 性能 |
| model_uint8f16 | 混合精度 | 114 MB | 中端 CPU 上更高的质量 |
| model_q4f16 | 4 位和 fp16 权重 | 154 MB | 更高的质量，同时高效 |
| model_fp16 | fp16 | 163 MB | 高质量 |
| model_uint8 | 8 位和混合优化 | 177 MB | 平衡选项 |
| model_q4 | 4 位矩阵乘法 | 305 MB | 高质量选项 |
| model | fp32 | 326 MB | 最大质量（稍慢） |

## ✨ 安装前先体验

访问 [**Kokoro Web Demo**](https://voice-generator.pages.dev) 即刻预览所有语音功能。此演示：

- **完全在浏览器中运行** - 无需服务器
- **永久免费** - 没有使用限制或注册要求
- **零安装** - 只需访问网站即可开始使用
- **所有功能可用** - 立即测试任何语音或语言

## 需要更多帮助？

如需更多选项、语音定制指南和高级设置，请访问 [GitHub 仓库](https://github.com/eduardolat/kokoro-web)。

**在 OpenWebUI 的对话中享受自然 AI 语音吧！**
