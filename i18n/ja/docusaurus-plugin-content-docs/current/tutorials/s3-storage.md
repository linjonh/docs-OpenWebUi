---
sidebar_position: 320
title: "🪣 S3ストレージへの切り替え"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートはありません。このチュートリアルは特定の利用目的に合わせてOpen WebUIをカスタマイズする方法のデモとしてのみ使用されます。貢献したいですか？貢献チュートリアルをご覧ください。
:::

# 🪣 S3ストレージへの切り替え

このガイドでは、Open WebUIのデフォルトの`local`ストレージをAmazon S3に切り替える手順を説明します。

## 前提条件

このチュートリアルに従うためには、以下が必要です:

- 有効なAWSアカウント
- 有効なAWSアクセスキーとシークレットキー
- AWS内でS3にオブジェクトを作成および配置するためのIAM権限
- システムにDockerがインストールされていること

## Amazon S3とは

AWS公式ウェブサイトより:

"Amazon S3は、業界最高水準のスケーラビリティ、データの可用性、セキュリティ、パフォーマンスを提供するオブジェクトストレージサービスです。データ湖、ウェブサイト、クラウドネイティブアプリケーション、バックアップ、アーカイブ、機械学習、分析などの多様な用途のデータを任意の量保存し保護します。Amazon S3は11 9sの耐久性（99.999999999%）を達成するように設計されており、世界中の何百万もの顧客のデータを保存しています。"

S3の詳細はこちらをご覧ください: [Amazon S3公式ページ](https://aws.amazon.com/s3/)

# セットアップ方法

## 1. 必要な環境変数

このオプションを構成するには、以下の環境変数を収集する必要があります:

| **Open-WebUI環境変数**         | **例**                                   |
|---------------------------------|------------------------------------------|
| `S3_ACCESS_KEY_ID`              | ABC123                                   |
| `S3_SECRET_ACCESS_KEY`          | SuperSecret                              |
| `S3_ENDPOINT_URL`               | https://s3.us-east-1.amazonaws.com       |
| `S3_REGION_NAME`                | us-east-1                                |
| `S3_BUCKET_NAME`                | my-awesome-bucket-name                   |

- S3_ACCESS_KEY_ID: AWSアカウントのアクセスキーの識別子です。AWS管理コンソールまたはAWS CLIでアクセスキーを作成すると取得できます。
- S3_SECRET_ACCESS_KEY: AWSのアクセスキーの秘密部分です。AWSでアクセスキーを作成すると提供され、安全に保管する必要があります。
- S3_ENDPOINT_URL: S3サービスエンドポイントにアクセスするためのURLで、通常AWSサービスのドキュメントやアカウント設定で見つけることができます。
- S3_REGION_NAME: S3バケットが存在するAWSリージョン、例えば"us-east-1"です。AWS管理コンソール内のS3バケット詳細で確認できます。
- S3_BUCKET_NAME: AWSでバケットを作成する際に指定したS3バケットの一意な名前です。

利用可能なS3エンドポイントURLの完全なリストは、こちらをご覧ください: [Amazon S3 通常エンドポイント](https://docs.aws.amazon.com/general/latest/gr/s3.html)

`Cloud Storage`構成オプション全体はこちらをご覧ください: [Open-WebUI クラウドストレージ構成](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Open-WebUIを実行する

Open-WebUIのインスタンスを起動する前に、最後の環境変数`STORAGE_PROVIDER`を設定する必要があります。この変数は、Open-WebUIに使用したいプロバイダーを伝えます。デフォルトでは、`STORAGE_PROVIDER`は空白であり、Open-WebUIはローカルストレージを使用します。

| **ストレージプロバイダー**         | **種類**    | **説明**                                                                                     | **デフォルト** |
|---------------------------------|----------|-------------------------------------------------------------------------------------------|-------------|
| `local`                        | str      | 空の文字列（` `）が提供される場合はローカルストレージがデフォルトになります                         | はい          |
| `s3`                           | str      | S3クライアントライブラリとAmazon S3ストレージで記載されている関連環境変数を使用します                 | いいえ        |
| `gcs`                          | str      | GCSクライアントライブラリとGoogle Cloud Storageで記載されている関連環境変数を使用します             | いいえ        |

Amazon S3を使用するには、`STORAGE_PROVIDER`を"S3"に設定し、ステップ1で収集したすべての環境変数（`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`）を設定する必要があります。

ここでは、`ENV`を"dev"に設定しています。これにより、Open-WebUIのSwaggerドキュメントを確認し、S3ストレージのセットアップが期待通りに機能しているかをテストすることができます。

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

## 3. セットアップをテストする

Open-WebUIが動作していることを確認したので、簡単な`Hello, World`テキストファイルをアップロードし、セットアップをテストしてみましょう。

![Open-WebUIでファイルをアップロードする](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

そして、選択したLLMからのレスポンスが得られていることを確認してください。

![Open-WebUIでレスポンスを取得する](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

素晴らしい！Open-WebUIで期待通りに動作しているようです。次に、テキストファイルが実際にアップロードされ、指定されたS3バケットに保存されていることを確認しましょう。AWSマネジメントコンソールを使用して、S3バケットにアップロードしたファイルが存在することが確認できます。アップロードしたファイル名（`hello.txt`）に加えて、オブジェクトの名前にユニークIDが付加されていることがわかります。これはOpen-WebUIがアップロードされたファイルをすべて追跡する方法です。

![Open-WebUIでレスポンスを取得する](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Open-WebUIのSwaggerドキュメントを使用して、このファイルに関連するすべての情報を取得することができます。`/api/v1/files/{id}`エンドポイントでユニークID（4405fabb-603e-4919-972b-2b39d6ad7f5b）を渡してください。

![IDでファイルを検査](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
