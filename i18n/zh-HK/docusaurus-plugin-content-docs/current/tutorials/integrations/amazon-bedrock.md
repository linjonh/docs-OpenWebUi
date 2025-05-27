---
sidebar_position: 31
title: "🛌 與 Amazon Bedrock 整合"
---

:::warning
本教程為社群貢獻，並非由 Open WebUI 團隊支援。它僅用於展示如何根據您的特定需求自訂 Open WebUI。要貢獻內容？請查看貢獻教程。
:::

---

# 整合 Open-WebUI 與 Amazon Bedrock

在本教程中，我們將探討如何整合 Open-WebUI 與 Amazon Bedrock 的一個最常用且最受歡迎的方法。

## 前置條件


要跟隨本教程，您需要具備以下條件：

- 一個有效的 AWS 帳戶
- 有效的 AWS 訪問金鑰和密鑰
- AWS 中啟用 Bedrock 模型的 IAM 權限或已啟用的模型
- 您系統上已安裝 Docker


## 什麼是 Amazon Bedrock

來源於 AWS 官方網站：

"Amazon Bedrock 是一項完全托管的服務，提供您可以通過單一 API 使用的高性能基礎模型（FMs），這些模型來自領先的人工智能公司，如 AI21 Labs、Anthropic、Cohere、Luma、Meta、Mistral AI、poolside（即將推出）、Stability AI 和亞馬遜。此外，它還提供一系列廣泛的功能，供您用於建立安全性、隱私及負責任的 AI 應用程式。使用 Amazon Bedrock，您可以輕鬆針對您的使用案例實驗並評估頂級基礎模型，通過微調和檢索增強生成（RAG）等技術使用您的數據進行私密自訂，並構建執行任務的代理工具，這些工具可使用您的企業系統和數據來源。由於 Amazon Bedrock 是無伺服器的，您不需要管理任何基礎設施，並且可以使用您已熟悉的 AWS 服務安全地整合和部署生成式 AI 功能到應用程式中。"

想了解更多有關 Bedrock 的資訊，請訪問：[Amazon Bedrock 官方網站](https://aws.amazon.com/bedrock/)

# 整合步驟

## 第一步：驗證對 Amazon Bedrock 基礎模型的訪問權限

在我們開始與 Bedrock 整合之前，您首先需要驗證是否擁有至少一個（最好擁有多個）可用基礎模型的訪問權限。截至目前撰寫（2025 年 2 月），有 47 個基礎模型可用。您可以在以下截圖中看到我擁有多個模型的訪問權限。如果模型旁顯示 "✅ 訪問已授予"，則表示您擁有該模型的訪問權限。如果您未擁有任何模型的訪問權限，則在下一步中您將收到錯誤。

AWS 提供了良好的文件來請求訪問/啟用這些模型，詳見：[Amazon Bedrock 模型訪問文檔](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock 基礎模型](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## 第二步：配置 Bedrock 訪問網關

現在我們已擁有至少一個 Bedrock 基礎模型的訪問權限，接下來需要配置 Bedrock 訪問網關（BAG）。可以將 BAG 視為由 AWS 開發的一個代理或中間件，它包裹 AWS 原生端點/SDK，並進一步暴露與 OpenAI 架構相容的端點，這是 Open-WebUI 所需的。

為參考，以下是端點之間的簡單對應：


| OpenAI 端點       | Bedrock 方法         |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse 或 converse_stream    |
| `/embeddings`           | invoke_model           |

BAG 資料庫可於此查看：[Bedrock 訪問網關資料庫](https://github.com/aws-samples/bedrock-access-gateway)

要設置 BAG，請按照以下步驟進行：
- 克隆 BAG 資料庫
- 移除預設 `dockerfile`
- 將 `Dockerfile_ecs` 的名稱更改為 `Dockerfile`

我們現在可以使用以下命令構建並啟動 Docker 容器：

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

您現在應該可以在以下頁面訪問 BAG 的 Swagger 頁面：http://localhost:8000/docs

![Bedrock 訪問網關 Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## 第三步：在 Open-WebUI 中新增連接

現在 BAG 已經運行，接下來是將其作為 Open-WebUI 中的新連接。

- 在管理面板中，前往 Settings -> Connections。
- 使用「+」（加號）按鈕在 OpenAI 下新增新連接。
- 在 URL 欄位中使用 "http://host.docker.internal:8000/api/v1"
- 預設密碼在 BAG 中定義為 "bedrock"，您可以隨時在 BAG 設置中更改此密碼（見 DEFAULT_API_KEYS）。
- 點擊「Verify Connection」按鈕，您應該會在右上角看到 "Server connection verified" 提示。

![新增連線](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## 步驟4：開始使用 Bedrock 基礎模型

現在你應該可以看到所有可用的 Bedrock 模型了！

![使用 Bedrock 模型](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## 其他有用的教程

以下是一些在整合 Open-WebUI 與 Amazon Bedrock 時非常有幫助的教程。

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
