---
sidebar_position: 1
title: "🚰 過濾器"
---

# 過濾器

過濾器用於對用戶傳入的消息和助手（LLM）傳出的消息執行操作。在過濾器中可以採取的潛在操作包括將消息發送到監控平臺（例如 Langfuse 或 DataDog）、修改消息內容、攔截有害消息、將消息翻譯成其他語言或限制來自某些用戶的消息速率。有關示例列表在 [Pipelines repo](https://github.com/open-webui/pipelines/tree/main/examples/filters) 中維護。過濾器可以作為函數執行，或者在 Pipelines 伺服器上執行。一般的工作流程可以參考下圖。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="過濾器工作流程" />
  </a>
</p>

當在模型或管道上啟用了過濾器管道時，用戶的傳入消息（或「入口」）將被傳遞到過濾器進行處理。過濾器對消息執行所需操作後，向 LLM 模型請求聊天完成。最後，過濾器對傳出的 LLM 消息（或「出口」）進行後處理，然後將其發送給用戶。
