---
sidebar_position: 2
title: "🗨️ Kokoro Web - 輕鬆為 Open WebUI 提供 TTS 功能"
---

:::warning
本教程由社群貢獻，並未由 Open WebUI 團隊提供支援。此教程僅作為如何客製化 Open WebUI 以適應您的特定用例的示範。想要參與貢獻？查看貢獻教程。
:::

## 什麼是 `Kokoro Web`?

[Kokoro Web](https://github.com/eduardolat/kokoro-web) 提供了一個輕量級的、與 OpenAI 兼容的 API，用於功能強大的 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 文本轉語音模型，能無縫整合至 Open WebUI，讓您的 AI 對話擁有自然流暢的語音效果。

## 🚀 兩步驟整合

### 1. 部署 Kokoro Web API（只需一條指令）

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # 更改為任意密鑰以作為您的 OpenAI 兼容 API 密鑰
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

執行：`docker compose up -d`

### 2. 連接 OpenWebUI（僅需30秒）

1. 在 OpenWebUI 中，進入 `管理面板` → `設定` → `音訊`
2. 設定如下：
   - 文本轉語音引擎：`OpenAI`
   - API 基本網址：`http://localhost:3000/api/v1`  
     （若使用 Docker：`http://host.docker.internal:3000/api/v1`）
   - API 密鑰：`your-api-key`（來自步驟一）
   - TTS 模型：`model_q8f16`（大小與品質的最佳平衡）
   - TTS 語音：`af_heart`（預設溫暖自然的英語配音）。您可以將其更改為來自 [Kokoro Web Demo](https://voice-generator.pages.dev) 的其他語音或公式。

完成！您的 OpenWebUI 現已擁有 AI 語音功能。

## 🌍 支援語言

Kokoro Web 支援8種語言，每種語言都擁有特別優化的語音：

- 英語（美國）：en-us
- 英語（英國）：en-gb
- 日語：ja
- 中文：cmn
- 西班牙語：es-419
- 印地語：hi
- 意大利語：it
- 葡萄牙語（巴西）：pt-br

每種語言均設有專屬語音，能提供最佳發音和自然流暢性。詳細語音列表請參見 [GitHub 儲存庫](https://github.com/eduardolat/kokoro-web)，或使用 [Kokoro Web Demo](https://voice-generator.pages.dev) 即時預覽並創建自訂語音。

## 💾 針對任何硬體優化的模型

選擇適合您硬體需求的模型：

| 模型 ID | 優化方式 | 大小 | 理想用途 |
|----------|-------------|------|-----------|
| model_q8f16 | 混合精度 | 86 MB | **推薦** - 最佳平衡 |
| model_quantized | 8位元 | 92.4 MB | 良好的 CPU 效能 |
| model_uint8f16 | 混合精度 | 114 MB | 中端 CPU 上品質更佳 |
| model_q4f16 | 4位元與 fp16 權重 | 154 MB | 更高品質，仍高效 |
| model_fp16 | fp16 | 163 MB | 高品質 |
| model_uint8 | 8位元與混合 | 177 MB | 平衡選項 |
| model_q4 | 4位元矩陣乘法 | 305 MB | 高品質選項 |
| model | fp32 | 326 MB | 最高品質（較慢） |

## ✨ 安裝前試用

造訪 [**Kokoro Web Demo**](https://voice-generator.pages.dev)，立即即時預覽所有語音。此展示頁面提供以下特性：

- **完全在您的瀏覽器中執行** - 無需伺服器
- **完全免費** - 無使用限制或需註冊
- **零安裝** - 直接造訪網站即可開始使用
- **所有功能包含在內** - 立即測試任何語音或語言

## 需要更多幫助？

如需更多選項、語音自定義指南和進階設定，請造訪 [GitHub 儲存庫](https://github.com/eduardolat/kokoro-web)。

**在您的 OpenWebUI 對話中享受自然的 AI 語音！**
