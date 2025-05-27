---
title: "🕵🏻‍♀️ 使用 Helicone 監控你的 LLM 請求"
sidebar_position: 19
---

:::warning
此教程為社群貢獻內容，並未由 Open WebUI 團隊提供支援。僅用於展示如何針對特定使用案例自訂 Open WebUI。想貢獻嗎？查看貢獻教程。
:::

# Helicone 與 Open WebUI 的整合

Helicone 是一個開源的 LLM 可觀察性平台，幫助開發者監控、除錯及改進包括 Open WebUI 部署在內的 **生產準備** 應用程式。

啟用 Helicone 後，你可以記錄 LLM 請求，評估並試驗提示，並獲得即時洞察，助你充滿信心地進行生產部署。

- **跨模型類型的集中化即時監控**：通過單個介面同時監控本地 Ollama 模型和雲端 API
- **請求視覺化及回放**：查看發送至 Open WebUI 每個模型的提示，以及由 LLM 生成的輸出以進行評估
- **本地 LLM 性能追蹤**：測量自我託管模型的響應時間和吞吐量
- **按模型的使用分析**：比較 Open WebUI 設置中不同模型的使用模式
- **用戶分析**以了解互動模式
- **除錯功能**用於排查模型回應的問題
- **成本追蹤**跨供應商的 LLM 使用情況


## 如何將 Helicone 整合至 OpenWebUI

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube 視頻播放"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### 第一步：創建 Helicone 帳戶並生成你的 API 金鑰

創建一個 [Helicone 帳戶](https://www.helicone.ai/)，並登錄以生成 [API 金鑰](https://us.helicone.ai/settings/api-keys)。

*— 請務必生成一個 [僅寫入 API 金鑰](https://docs.helicone.ai/helicone-headers/helicone-auth)。這可確保你僅允許記錄數據至 Helicone，而無法讀取你的私人數據。*

### 第二步：創建 OpenAI 帳戶並生成你的 API 金鑰

創建一個 OpenAI 帳戶，並登錄至 [OpenAIs Developer Portal](https://platform.openai.com/account/api-keys) 生成 API 金鑰。

### 第三步：使用 Helicone 的基本 URL 運行你的 Open WebUI 應用

使用 [Open WebUI 文檔](https://docs.openwebui.com/) 中的指令啟動你的第一個 Open WebUI 應用，並包含 Helicone 的 API BASE URL，讓你能自動查詢並監控。

```bash
   # 設置你的環境變數
   export HELICONE_API_KEY=<YOUR_API_KEY>
   export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

   # 運行帶有 Helicone 整合的 Open WebUI
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

如果你已部署了 Open WebUI 應用，請到 `管理後台` > `設置` > `連接`，然後點擊「管理 OpenAI API 連接」中的 `+`。更新以下屬性：

- 你的 `API 基本 URL` 將是 ``https://oai.helicone.ai/v1/<YOUR_HELICONE_API_KEY>``
- `API 金鑰` 為你的 OpenAI API 金鑰。

![Open WebUI Helicone 設置](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### 第四步：確認監控正常運行

為確認你的整合是否正常工作，登錄 Helicone 的儀表板並查看「請求」標籤。

你應能看到通過 Open WebUI 介面已發出的請求，這些請求已被記錄到 Helicone 中。

![示例 Helicone 跟蹤](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## 了解更多

如需了解 Helicone 的完整教程，可以查看 [Helicones 文檔](https://docs.helicone.ai/getting-started/quick-start)。
