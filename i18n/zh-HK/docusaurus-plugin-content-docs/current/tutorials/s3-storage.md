---
sidebar_position: 320
title: "🪣 切換至 S3 存儲"
---

:::warning
本教程由社群貢獻而成，並未獲得 Open WebUI 團隊的支援。它僅作為如何根據您的特定使用案例自訂 Open WebUI 的示範。想要貢獻？請參閱貢獻教程。
:::

# 🪣 切換至 S3 存儲

本指南提供如何將 Open WebUI 配置中的預設 `local` 存儲切換為 Amazon S3 的指導。

## 前置需求

要完成本教程，您需要以下的準備：

- AWS 活躍帳戶
- AWS 存取金鑰和秘密金鑰
- AWS 中的 IAM 權限以在 S3 中創建及存放物件
- 您系統上已安裝的 Docker

## 什麼是 Amazon S3

直接引用 AWS 網站：

"Amazon S3 是一種對象存儲服務，提供領先業界的可擴展性、數據可用性、安全性和性能。您可以為數據湖、網站、雲原生應用、備份、歸檔、機器學習和分析等一系列使用案例存儲並保護任意數量的數據。Amazon S3 專為 99.999999999%（十一個 9）的耐久性設計，並為遍布全球的數百萬客戶存儲數據。"

想了解更多有關 S3 的資訊，請訪問：[Amazon S3 官方頁面](https://aws.amazon.com/s3/)

# 設置方式

## 1. 所需環境變數

要配置此選項，您需要蒐集以下環境變數：

| **Open-WebUI 環境變數**             | **範例值**                                  |
|-------------------------------------|---------------------------------------------|
| `S3_ACCESS_KEY_ID`                  | ABC123                                      |
| `S3_SECRET_ACCESS_KEY`              | SuperSecret                                 |
| `S3_ENDPOINT_URL`                   | https://s3.us-east-1.amazonaws.com          |
| `S3_REGION_NAME`                    | us-east-1                                   |
| `S3_BUCKET_NAME`                    | my-awesome-bucket-name                      |

- S3_ACCESS_KEY_ID：這是您 AWS 帳戶存取金鑰的標識符。您可以通過 AWS 管理主控台或 AWS CLI 在創建存取金鑰時獲取此信息。
- S3_SECRET_ACCESS_KEY：這是您 AWS 存取金鑰對的秘密部分。在 AWS 創建存取金鑰時提供，應妥善保管。
- S3_ENDPOINT_URL：此 URL 指向您的 S3 服務端點，通常可以在 AWS 服務文檔或帳戶設置中找到。
- S3_REGION_NAME：這是您 S3 存儲桶所在的 AWS 區域，例如 "us-east-1"。您可以在 AWS 管理主控台中的 S3 存儲桶詳細資訊檢查到。
- S3_BUCKET_NAME：這是您在 AWS 創建存儲桶時指定的唯一存儲桶名稱。

查看完整的 S3 端點 URL 列表，請參閱：[Amazon S3 常規端點](https://docs.aws.amazon.com/general/latest/gr/s3.html)

查看所有 `Cloud Storage` 配置選項，請參閱：[Open-WebUI 雲存儲配置](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. 運行 Open-WebUI

在我們啟動 Open-WebUI 之前，還需要設置一個最後的環境變數名為 `STORAGE_PROVIDER`。此變數告知 Open-WebUI 您想使用哪個存儲提供者。默認情況下，`STORAGE_PROVIDER` 為空，這意味著 Open-WebUI 使用本地存儲。

| **存儲提供者**     | **類型** | **描述**                                                                     | **默認** |
|--------------------|----------|-----------------------------------------------------------------------------|---------|
| `local`            | str      | 如果提供空字符串 (`' '`) 則默認使用本地存儲                                    | 是       |
| `s3`               | str      | 使用 S3 客戶端庫以及 Amazon S3 存儲中提到的相關環境變數                        | 否       |
| `gcs`              | str      | 使用 GCS 客戶端庫以及 Google Cloud Storage 中提到的相關環境變數                | 否       |

要使用 Amazon S3，我們需要將 `STORAGE_PROVIDER` 設置為 "S3"，並設置在步骤 1 中蒐集的所有環境變數 (`S3_ACCESS_KEY_ID`、`S3_SECRET_ACCESS_KEY`、`S3_ENDPOINT_URL`、`S3_REGION_NAME`、`S3_BUCKET_NAME`)。

同時，我將 `ENV` 設置為 "dev"，這將使我們能夠查看 Open-WebUI 的 Swagger 文檔，以進一步測試並確認 S3 存儲設置是否按預期運行。

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="my-awesome-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. 測試設定

現在我們已經啟用了 Open-WebUI，讓我們上傳一個簡單的 `Hello, World` 文本檔案來測試我們的設定。

![在 Open-WebUI 中上傳檔案](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

並確認我們從所選的 LLM 獲得了響應。

![在 Open-WebUI 中獲得響應](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

太棒了！看起來 Open-WebUI 的一切都如預期運作。現在讓我們驗證該文本檔案是否確實被上傳並存儲在指定的 S3 存儲桶中。使用 AWS 管理控制台，我們可以看到 S3 存儲桶中現在有一個檔案。除了我們上傳的檔案名稱（`hello.txt`），您還可以看到對象的名稱被附加了一個唯一的 ID。這是 Open-WebUI 追蹤所有上傳檔案的方式。

![在 Open-WebUI 中獲得響應](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

使用 Open-WebUI 的 swagger 文件，我們可以使用 `/api/v1/files/{id}` 端點並傳遞唯一 ID（4405fabb-603e-4919-972b-2b39d6ad7f5b）獲取與此檔案相關的所有資訊。

![通過 ID 檢視檔案](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
