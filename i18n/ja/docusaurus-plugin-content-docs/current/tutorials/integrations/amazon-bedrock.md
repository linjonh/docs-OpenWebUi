---
sidebar_position: 31
title: "🛌 Amazon Bedrockとの統合"
---

:::warning
このチュートリアルはコミュニティからの寄稿であり、Open WebUIチームによるサポートはありません。これは、特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を示すデモとして提供されています。寄稿を希望される方は、寄稿用のチュートリアルをご覧ください。
:::

---

# Open-WebUIとAmazon Bedrockの統合

このチュートリアルでは、Amazon BedrockとOpen-WebUIを統合するための最も一般的で人気のあるアプローチについて説明します。

## 前提条件


このチュートリアルに従うには、以下が必要です。

- 有効なAWSアカウント
- 有効なAWSアクセスキーとシークレットキー
- Bedrockモデルを有効化するためのIAMパーミッション、または既に有効化されたモデル
- システムにDockerがインストールされていること


## Amazon Bedrockとは

AWSのウェブサイトから直接引用:

"Amazon Bedrockは完全に管理されたサービスであり、AI21 Labs、Anthropic、Cohere、Luma、Meta、Mistral AI、Poolside（近日公開予定）、Stability AI、Amazonなどの主要なAI企業が提供する高性能なファウンデーションモデル（FM）を単一のAPIを通じて選択できるほか、セキュリティ、プライバシー、責任あるAIを兼ね備えた生成AIアプリケーションを構築するために必要な幅広い機能を提供します。Amazon Bedrockを使用すると、ユースケースに最適なFMを簡単に試行・評価し、微調整やリトリーバル強化型生成（RAG）などの技術を用いて独自のデータでカスタマイズし、エンタープライズシステムやデータソースを使用してタスクを実行するエージェントを構築できます。Amazon Bedrockはサーバーレスであるため、インフラストラクチャの管理は不要で、既に慣れ親しんでいるAWSサービスを使用して生成AI機能をアプリケーションに安全に統合・展開することが可能です。"

Bedrockについて詳しく知りたい方はこちらをご覧ください: [Amazon Bedrock公式ページ](https://aws.amazon.com/bedrock/)

# 統合手順

## 手順 1: Amazon Bedrockベースモデルへのアクセスを確認

Bedrockとの統合を行う前に、利用可能なベースモデルに少なくとも1つ、できれば複数アクセスできることを確認する必要があります。執筆時点（2025年2月）で、利用可能なベースモデルは47種類でした。以下のスクリーンショットで複数のモデルにアクセス可能であることを確認できます。モデルにアクセス可能かどうかは、モデルの隣に「✅ Access Granted」と表示されているかで判断できます。モデルにアクセスできない場合、次のステップでエラーが発生します。

AWSはこれらのモデルのリクエストアクセス/有効化に関する良いドキュメントを提供しています: [Amazon Bedrockモデルアクセスドキュメント](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock Base Models](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## 手順 2: Bedrock Access Gatewayの設定

少なくとも1つのBedrockベースモデルへのアクセスが確認できたら、Bedrock Access Gateway（BAG）を設定する必要があります。BAGはAWSが開発したプロキシまたはミドルウェアであり、AWSネイティブエンドポイント/SDKをBedrockでラップし、代わりにOpen-WebUIが必要とするOpenAIスキーマに互換性のあるエンドポイントを公開します。

参考までに、エンドポイント間の簡単なマッピングを以下に示します:


| OpenAIエンドポイント       | Bedrockメソッド             |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse または converse_stream    |
| `/embeddings`           | invoke_model           |

BAGのリポジトリはこちらにあります: [Bedrock Access Gatewayリポジトリ](https://github.com/aws-samples/bedrock-access-gateway)

BAGをセットアップするには、以下の手順を実行してください:
- BAGリポジトリをクローンする
- デフォルトの`dockerfile`を削除する
- `Dockerfile_ecs`という名前のファイルを`Dockerfile`に変更する

これでDockerコンテナをビルドして起動する準備が整いました:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

これで、BAGのSwaggerページにアクセスできるはずです: http://localhost:8000/docs

![Bedrock Access Gateway Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## 手順 3: Open-WebUIに接続を追加

BAGが稼働している今、これをOpen-WebUIの新しい接続として追加する時が来ました。

- 管理パネルで、[設定] -> [接続]に進みます。
- "+"（プラス）ボタンを使用して、OpenAIの下に新しい接続を追加します。
- URLには"http://host.docker.internal:8000/api/v1"を使用します。
- パスワードは、BAGで定義されているデフォルトのパスワード"bedrock"を使用します。このパスワードはBAG設定（DEFAULT_API_KEYSを参照）でいつでも変更できます。
- 「接続を検証」ボタンをクリックすると、右上に「サーバー接続検証済み」の通知が表示されます。

![新しい接続を追加](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## ステップ4: Bedrockベースモデルの使用を開始する

すべてのBedrockモデルが利用可能であることが確認できます!

![Bedrockモデルの使用](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## その他の役立つチュートリアル

Open-WebUIをAmazon Bedrockと統合する際に非常に役立つチュートリアルをいくつか紹介します。

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
