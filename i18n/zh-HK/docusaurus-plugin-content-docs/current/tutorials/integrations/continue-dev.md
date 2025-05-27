---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode 擴展與 Open WebUI 結合"
---

:::warning
本教程由社群提供，並未獲得 Open WebUI 團隊的支持。僅作為客製化 Open WebUI 的示範，適用於您的特定需求。想要貢獻？查看貢獻教程。
:::

# 結合 Continue.dev VSCode 擴展與 Open WebUI

### 下載擴展

您可以在[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)下載 VSCode 擴展程式

安裝完成後，您應該在側邊欄上看到continue標籤。打開它。

點擊主要聊天輸入框上方的助手選擇器。然後將滑鼠移至 "Local Assistant"，應該會看到一個設置圖標（看起來像齒輪）。

點擊設置圖標後，`config.yaml` 應該會在編輯器中打開。

在這裡，您可以配置 continue 以使用 Open WebUI。

---

目前ollama提供者不支持身份驗證，因此我們無法使用該提供者與 Open WebUI 結合。

然而 Ollama 和 Open WebUI 都支持 OpenAI API 規範。您可以查看 Ollama 的[這篇博客文章](https://ollama.com/blog/openai-compatibility)。

我們仍然可以設置 Continue 使用 openai 提供者，這將使我們能夠使用 Open WebUI 的身份驗證令牌。

---

## 配置

在 `config.yaml` 中，您需要做的只是添加或更改以下選項。

### 將提供者更改為 openai

```yaml
provider: openai
```

### 添加或更新 apiBase

將此設置為您 Open Web UI 網域結尾。

```yaml
apiBase: http://localhost:3000/ # 如果您遵循開始使用 Docker 的教程
```

### 添加 apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # 使用您的 API Key 替換
```

您可以在 Open WebUI 中找到並生成您的 API Key -> 設置 -> 帳戶 -> API Keys

您需要複製 "API Key"（以 sk- 開頭）

## 配置範例

以下是使用 Open WebUI 和 openai 提供者的 config.yaml 的基礎範例。使用 Granite Code 作為模型。
確保您事先將模型拉取至您的 ollama 實例/。

```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Model ABC from pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplete
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: 為突出顯示的代碼撰寫單元測試
    prompt: |
      為所選代碼撰寫一套完整的單元測試。它應該設定、運行正確性的測試（包含重要的邊界案例）並拆解。確保測試是完整且複雜的。僅以聊天輸出提供測試，不要編輯任何檔案。
```

保存您的 `config.yaml` 就完成了！

您現在應該會在 Continue 標籤中的模型選擇看到您的模型。

選擇它，您現在應該在使用 Open WebUI 進行聊天（以及或任何您設置的[pipelines](/pipelines)）

您可以為您想使用的多個模型進行此設置，雖然任何模型都可以使用，但最好使用專為代碼設計的模型。

查看 continue 文檔以了解更多 continue 配置，[Continue 文檔](https://docs.continue.dev/reference/Model%20Providers/openai)
