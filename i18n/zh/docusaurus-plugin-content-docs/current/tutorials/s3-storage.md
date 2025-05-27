---
sidebar_position: 320
title: "🪣 切换至 S3 存储"
---

:::warning
本教程由社区贡献，未获得 Open WebUI 团队支持。其仅作为一个展示如何根据具体用例定制 Open WebUI 的示例。想要贡献？查看贡献教程。
:::

# 🪣 切换至 S3 存储

此指南提供了将 Open WebUI 配置中的默认 `local` 存储切换为 Amazon S3 的说明。

## 前提条件

要完成本教程，您必须具备以下条件：

- 一个有效的 AWS 账户
- 一个有效的 AWS 访问密钥和秘密密钥
- AWS 中的 IAM 权限以在 S3 中创建和上传对象
- 您系统中安装了 Docker

## 什么是 Amazon S3

来自 AWS 官方网站：

“Amazon S3 是一种对象存储服务，提供行业领先的可扩展性、数据可用性、安全性和性能。支持多种使用场景，例如数据湖、网站、云原生应用程序、备份、归档、机器学习和分析。Amazon S3 设计拥有 99.999999999%（11 个 9）数据持久性，并为世界各地的数百万客户存储数据。”

想了解更多 S3，请访问：[Amazon S3 官方页面](https://aws.amazon.com/s3/)

# 如何设置

## 1. 必需的环境变量

为了配置此选项，您需要收集以下环境变量：

| **Open-WebUI 环境变量** | **示例值**                                    |
|---------------------------|---------------------------------------------|
| `S3_ACCESS_KEY_ID`        | ABC123                                      |
| `S3_SECRET_ACCESS_KEY`    | SuperSecret                                 |
| `S3_ENDPOINT_URL`         | https://s3.us-east-1.amazonaws.com          |
| `S3_REGION_NAME`          | us-east-1                                   |
| `S3_BUCKET_NAME`          | my-awesome-bucket-name                      |

- S3_ACCESS_KEY_ID: 这是您 AWS 账户访问密钥的标识符。您可以从 AWS 管理控制台或 AWS CLI 中创建访问密钥时获得。
- S3_SECRET_ACCESS_KEY: 这是 AWS 访问密钥对的秘密部分。它是在您创建访问密钥时提供的，应安全存储。
- S3_ENDPOINT_URL: 此 URL 指向您的 S3 服务端点，通常可以在 AWS 服务文档或账户设置中找到。
- S3_REGION_NAME: 此字段指向您的 S3 桶所在的 AWS 区域，例如 "us-east-1"。您可以在 AWS 管理控制台中查看 S3 桶的详细信息找到。
- S3_BUCKET_NAME: 此字段是您在 AWS 中创建桶时指定的唯一名称。

有关可用 S3 端点 URL 的完整列表，请参阅：[Amazon S3 常规端点](https://docs.aws.amazon.com/general/latest/gr/s3.html)

查看所有 `Cloud Storage` 配置选项：[Open-WebUI 云存储配置](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. 运行 Open-WebUI

在我们启动 Open-WebUI 实例之前，我们需要设置一个名为 `STORAGE_PROVIDER` 的环境变量。此变量告诉 Open-WebUI 您想使用哪个存储提供者。默认情况下，`STORAGE_PROVIDER` 为空，这意味着 Open-WebUI 使用本地存储。

| **存储提供者**        | **类型** | **描述**                                                                    | **默认值** |
|--------------------------|----------|------------------------------------------------------------------------------|-----------|
| `local`                 | str      | 如果提供空字符串（`' '`），则默认为本地存储                               | 是         |
| `s3`                    | str      | 使用 S3 客户端库及提到的相关环境变量                                       | 否         |
| `gcs`                   | str      | 使用 GCS 客户端库及提到的相关环境变量                                       | 否         |

要使用 Amazon S3，我们需要将 `STORAGE_PROVIDER` 设置为 "S3"，并设置我们在第 1 步中收集的所有环境变量（`S3_ACCESS_KEY_ID`、`S3_SECRET_ACCESS_KEY`、`S3_ENDPOINT_URL`、`S3_REGION_NAME`、`S3_BUCKET_NAME`）。

这里，我还将 `ENV` 设置为 "dev"，这将允许我们查看 Open-WebUI 的 Swagger 文档，以便进一步测试并确认 S3 存储设置是否正常工作。

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

既然我们已经运行了 Open-WebUI，现在让我们上传一个简单的 `Hello, World` 文本文件并测试我们的设置。

![在 Open-WebUI 上传文件](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

并确认我们从所选 LLM 得到了响应。

![在 Open-WebUI 获取响应](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

太棒了！看起来 Open-WebUI 按预期正常工作了。现在让我们验证文本文件确实被上传并存储在指定的 S3 存储桶中。使用 AWS 管理控制台，我们可以看到现在 S3 存储桶中有一个文件。除了我们上传的文件名 (`hello.txt`) 之外，你还可以看到对象名称被附加了一个唯一 ID。这就是 Open-WebUI 跟踪所有上传文件的方式。

![在 Open-WebUI 获取响应](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

使用 Open-WebUI 的 swagger 文档，我们可以通过 `/api/v1/files/{id}` 端点并传入唯一 ID (4405fabb-603e-4919-972b-2b39d6ad7f5b) 获取与该文件相关的所有信息。

![通过 ID 检查文件](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
