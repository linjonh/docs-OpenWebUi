---
sidebar_position: 320
title: "🪣 切换到 S3 存储"
---

:::warning
本教程由社区贡献，并不受 Open WebUI 团队支持。它仅作为自定义 Open WebUI 以满足特定用例的演示。如有兴趣贡献内容？请查看贡献教程。
:::

# 🪣 切换到 S3 存储

本指南提供了将 Open WebUI 配置中的默认 `local` 存储切换到 Amazon S3 的说明。

## 前提条件

为了完成本教程，您需要具备以下条件：

- 一个有效的 AWS 账户
- 一个有效的 AWS 访问密钥和秘密密钥
- 拥有在 AWS 中创建和放置 S3 对象的 IAM 权限
- 系统上已安装 Docker

## 什么是 Amazon S3

直接引用 AWS 网站内容：

“Amazon S3 是一种对象存储服务，提供行业领先的可扩展性、数据可用性、安全性和性能。可以存储和保护各种场景的数据，例如数据湖、网站、云原生应用程序、备份、归档、机器学习和分析。Amazon S3 设计的持久性为 99.999999999%（11 个 9），并为全球数百万客户存储数据。”

想了解更多关于 S3 的信息，请访问：[Amazon S3 官方页面](https://aws.amazon.com/s3/)

# 如何设置

## 1. 所需的环境变量

为配置此选项，您需要收集以下环境变量：

| **Open-WebUI 环境变量**            | **示例值**                                   |
|-------------------------------------|---------------------------------------------|
| `S3_ACCESS_KEY_ID`                  | ABC123                                      |
| `S3_SECRET_ACCESS_KEY`              | SuperSecret                                 |
| `S3_ENDPOINT_URL`                   | https://s3.us-east-1.amazonaws.com          |
| `S3_REGION_NAME`                    | us-east-1                                   |
| `S3_BUCKET_NAME`                    | my-awesome-bucket-name                      |

- S3_ACCESS_KEY_ID：这是您的 AWS 账户访问密钥的标识符。您可以通过 AWS 管理控制台或 AWS CLI 创建访问密钥时获得它。
- S3_SECRET_ACCESS_KEY：这是 AWS 访问密钥对的秘密部分。创建访问密钥时提供，需安全存储。
- S3_ENDPOINT_URL：此 URL 指向您的 S3 服务端点，通常可以在 AWS 服务文档或账户设置中找到。
- S3_REGION_NAME：这是您的 S3 存储桶所在的 AWS 区域，例如 "us-east-1"。您可以在 AWS 管理控制台中查看您的 S3 存储桶详细信息。
- S3_BUCKET_NAME：这是您在 AWS 中创建存储桶时指定的唯一存储桶名称。

查看完整的 S3 端点 URL 列表，请参见：[Amazon S3 常规端点](https://docs.aws.amazon.com/general/latest/gr/s3.html)

查看所有 `云存储` 配置选项，请点击：[Open-WebUI 云存储配置](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. 运行 Open-WebUI

在启动 Open-WebUI 实例之前，我们还需要设置一个名为 `STORAGE_PROVIDER` 的环境变量。此变量告知 Open-WebUI 您希望使用哪个提供商。默认情况下，`STORAGE_PROVIDER` 为空，这意味着 Open-WebUI 使用本地存储。

| **存储提供商**       | **类型**    | **描述**                                                                                 | **默认值**  |
|----------------------|----------|-------------------------------------------------------------------------------------------------|-------------|
| `local`              | str      | 如果提供空字符串 (`' '`)，默认为本地存储                                                     | 是          |
| `s3`                 | str      | 使用 S3 客户端库以及 Amazon S3 存储中提到的相关环境变量                                    | 否          |
| `gcs`                | str      | 使用 GCS 客户端库以及 Google 云存储中提到的相关环境变量                                     | 否          |

要使用 Amazon S3，我们需要将 `STORAGE_PROVIDER` 设置为 "S3"，并同时设置在步骤 1 中收集的所有环境变量 (`S3_ACCESS_KEY_ID`、`S3_SECRET_ACCESS_KEY`、`S3_ENDPOINT_URL`、`S3_REGION_NAME`、`S3_BUCKET_NAME`)。

在这里，我还将 `ENV` 设置为 "dev"，这将允许我们查看 Open-WebUI 的 Swagger 文档，以进一步测试和确认 S3 存储设置是否正常。

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

## 3. 测试设置

既然我们已经让 Open-WebUI 运行起来了，让我们上传一个简单的 `Hello, World` 文本文件并测试我们的设置。

![在 Open-WebUI 中上传文件](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

并确认我们收到来自选定的 LLM 的响应。

![在 Open-WebUI 中获取响应](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

太好了！看起来 Open-WebUI 中一切都按预期正常运行。现在让我们验证文本文件是否确实上传并存储在指定的 S3 存储桶中。使用 AWS 管理控制台，我们可以看到现在 S3 存储桶中有一个文件。除了我们上传的文件名 (`hello.txt`) 之外，你还可以看到对象名称被附加了一个唯一 ID。这是 Open-WebUI 跟踪所有上传文件的方式。

![在 Open-WebUI 中获取响应](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

使用 Open-WebUI 的 swagger 文档，我们可以通过使用 `/api/v1/files/{id}` 端点并输入唯一 ID (4405fabb-603e-4919-972b-2b39d6ad7f5b) 来获取与此文件相关的所有信息。

![通过 ID 检查文件](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
