---
sidebar_position: 2
title: "🔧 管線"
---

# 管線
管線是可以在向使用者返回 LLM 訊息之前執行操作的函數。可以使用管線進行的操作舉例包括檢索增強生成（RAG）、向非 OpenAI 的 LLM 提供商（例如 Anthropic、Azure OpenAI 或 Google）發送請求，或直接在網頁 UI 中執行函數。管線可以作為函數托管，或者在管線伺服器上運行。範例列表維護在 [Pipelines repo](https://github.com/open-webui/pipelines/tree/main/examples/pipelines) 中。通用的工作流程可以在下圖中看到。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="管線工作流程" />
  </a>
</p>

定義在 WebUI 中的管線會作為一個新的模型顯示，並附加 "外部" 標籤。以下展示了兩個管線模型（`Database RAG Pipeline` 和 `DOOM`）的範例，它們顯示在兩個自托管模型旁邊：

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="WebUI 中的管線模型" />
  </a>
</p>
