---
sidebar_position: 1
title: "🗨️ 配置設定"
---

Open Web UI 支援本地、瀏覽器及遠端的語音轉文字。

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## 雲端 / 遠端語音轉文字供應商

目前支持以下雲端語音轉文字供應商。API 金鑰可以配置為環境變數（OpenAI）或透過管理員設定頁面（兩者金鑰）。

 | 服務  | 需要 API 金鑰 |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI 提供 STT 支援內建的瀏覽器 STT 供應商。

## 配置您的 STT 供應商

要配置語音轉文字供應商:

- 前往管理員設定
- 選擇 "Audio"
- 提供 API 金鑰並從下拉清單中選擇模型

![alt text](/images/tutorials/stt/stt-config.png)

## 使用者層級的設定

除管理面板中設定的實例配置外，還有一些使用者層級的設定，可以提供額外功能。

*   **STT 設定:** 包含與語音轉文字功能相關的設定。
*   **語音轉文字引擎:** 決定用於語音識別的引擎（預設或 Web API）。
 

![alt text](/images/tutorials/stt/user-settings.png)

## 使用 STT

語音轉文字提供了一種高效的方式，利用您的聲音 "書寫" 提示，並且能在桌面及移動設備上穩健執行。

要使用 STT，只需點擊麥克風圖標：

![alt text](/images/tutorials/stt/stt-operation.png)

即時音頻波形將顯示成功捕捉聲音：

![alt text](/images/tutorials/stt/stt-in-progress.png)

## STT 模式操作

錄音開始後，您可以:

- 點擊勾號圖標保存錄音（如果啟用錄音完成後自動發送，它將完成後發送；否則，您可以手動發送）
- 如果您希望放棄錄音（例如，想重新開始一個新錄音），可以點擊 x 圖標退出錄音界面

![alt text](/images/tutorials/stt/endstt.png)
