---
sidebar_position: 2
title: "🗨️ Kokoro Web - 简便的开放 WebUI 文本转语音"
---

:::warning
本教程为社区贡献内容，不受 Open WebUI 团队支持。它仅供演示如何自定义 Open WebUI 来满足您的特定用例。想要贡献？请查看贡献指南。
:::

## 什么是 `Kokoro Web`？

[Kokoro Web](https://github.com/eduardolat/kokoro-web) 提供了一个轻量级的、兼容 OpenAI 的 API，适用于强大的 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文本转语音模型，与 Open WebUI 无缝集成，为您的 AI 对话增添自然语音效果。

## 🚀 两步集成

### 1. 部署 Kokoro Web API（一步命令）

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # 更改为任何密钥，作为与 OpenAI 兼容的 API 密钥
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

运行：`docker compose up -d`

### 2. 连接 OpenWebUI（30 秒）

1. 在 OpenWebUI 中，进入 `管理面板` → `设置` → `音频`
2. 配置：
   - 文本转语音引擎：`OpenAI`
   - API 基本 URL：`http://localhost:3000/api/v1`
     （如果使用 Docker：`http://host.docker.internal:3000/api/v1`）
   - API 密钥：`your-api-key`（从步骤 1 获取）
   - TTS 模型：`model_q8f16`（大小/质量的最佳平衡）
   - TTS 声音：`af_heart`（默认温暖自然的英语语音）。您可以更改为其他声音或 [Kokoro Web 示例](https://voice-generator.pages.dev) 中的任何其他公式。

**完成了！您的 OpenWebUI 现在具有 AI 语音功能。**

## 🌍 支持的语言

Kokoro Web 支持 8 种语言，每种语言都有针对性优化的语音：

- 英语（美国） - en-us
- 英语（英国） - en-gb
- 日语 - ja
- 中文 - cmn
- 西班牙语 - es-419
- 印地语 - hi
- 意大利语 - it
- 葡萄牙语（巴西） - pt-br

每种语言都拥有专门的语音，以获得最佳发音和自然流畅性。请查看 [GitHub 仓库](https://github.com/eduardolat/kokoro-web) 以获取语言专用语音的完整列表，或使用 [Kokoro Web 示例](https://voice-generator.pages.dev) 即时预览并创建自定义语音。

## 💾 针对任意硬件优化的模型

选择适合您硬件需求的模型：

| 模型 ID | 优化方式 | 大小 | 理想用途 |
|----------|-------------|------|-----------|
| model_q8f16 | 混合精度 | 86 MB | **推荐** - 大小与质量的最佳平衡 |
| model_quantized | 8 位 | 92.4 MB | 良好的 CPU 性能 |
| model_uint8f16 | 混合精度 | 114 MB | 中端 CPU 下更好的质量 |
| model_q4f16 | 4 位和 fp16 权重 | 154 MB | 更高质量，仍然高效 |
| model_fp16 | fp16 | 163 MB | 优质质量 |
| model_uint8 | 8 位和混合 | 177 MB | 平衡选项 |
| model_q4 | 4 位矩阵乘法 | 305 MB | 高质量选项 |
| model | fp32 | 326 MB | 最高质量（速度较慢） |

## ✨ 安装前先体验

访问 [**Kokoro Web 示例**](https://voice-generator.pages.dev) 即时预览所有语音。该示例：

- **完全在浏览器运行** - 无需服务器
- **永久免费** - 无使用限制，无需注册
- **零安装** - 只需访问网站即可开始创建
- **包括所有功能** - 即刻测试任意语音或语言

## 需要更多帮助？

有关其他选项、语音自定义指南和高级设置，请访问 [GitHub 仓库](https://github.com/eduardolat/kokoro-web)。

**在 OpenWebUI 对话中尽享自然 AI 语音！**
