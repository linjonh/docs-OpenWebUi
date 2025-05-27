---
sidebar_position: 2
title: "🔧 パイプ"
---

# パイプ
パイプは、ユーザーにLLMメッセージを返す前にアクションを実行するために使用できる関数です。パイプを使用して実行できる可能性のあるアクションの例には、取得拡張生成（RAG）、Anthropic、Azure OpenAI、またはGoogleなどの非OpenAI LLMプロバイダーへのリクエスト送信、またはWeb UI内での関数の直接実行などがあります。パイプは関数として、またはPipelinesサーバー上でホスト可能です。例のリストは[Pipelinesリポジトリ](https://github.com/open-webui/pipelines/tree/main/examples/pipelines)に維持されています。一般的なワークフローは以下の画像に示されています。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="パイプワークフロー" />
  </a>
</p>

WebUI内で定義されたパイプは、「External」という指定が付いた新しいモデルとして表示されます。`Database RAG Pipeline`と`DOOM`の2つのパイプモデルの例が、以下のように2つの自己ホスト型モデルに隣接して表示されます。

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="WebUI内のパイプモデル" />
  </a>
</p>
