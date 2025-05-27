---
sidebar_position: 11
title: "🖥️ Intel GPU上でIPEX-LLMを使用したローカルLLMセットアップ"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは提供されていません。特定の使用ケースに合わせてOpen WebUIをカスタマイズする方法を示す目的のみで提供されています。貢献したいですか？貢献ガイドをチェックしてください。
:::

:::note
このガイドは[手動インストール](/getting-started/index.md)を通じてOpen WebUIをセットアップする場合に検証済みです。
:::

# Intel GPU上でIPEX-LLMを使用したローカルLLMセットアップ

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm)は、Intel CPUおよびGPU（例：iGPUを持つローカルPC、Arc AシリーズのようなディスクリートGPU、Flex、Max）でLLMを非常に低遅延で実行するためのPyTorchライブラリです。
:::

このチュートリアルでは、**Intel GPU上でホストされるIPEX-LLM加速Ollamaバックエンド**を使用してOpen WebUIをセットアップする方法を示します。このガイドに従うことで、低コストのPC（統合GPUのみ）でもスムーズな体験でOpen WebUIをセットアップできるようになります。

## Intel GPUでOllama Serveを起動

Intel GPU上でIPEX-LLMにより加速されたOllama serveをインストールし実行する方法については、IPEX-LLM公式ドキュメントの[このガイド](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html)を参照してください。

:::tip
別のマシンからOllamaサービスにアクセスしたい場合、コマンド`ollama serve`を実行する前に環境変数`OLLAMA_HOST=0.0.0.0`を設定またはエクスポートしてください。
:::

## Open WebUIを構成

メニューの**設定 -> 接続**を通じてOllama設定にアクセスします。デフォルトでは、**Ollama Base URL** は`https://localhost:11434`に設定されています。以下のスナップショットに示されています。Ollamaサービス接続のステータスを確認するには、テキストボックスの横にある**更新ボタン**をクリックします。WebUIがOllamaサーバーとの接続を確立できない場合、`WebUI could not connect to Ollama`というエラーメッセージが表示されます。

![Open WebUI Ollama Setting Failure](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

接続が成功すると、以下に示されているように`Service Connection Verified`というメッセージが表示されます。

![Open WebUI Ollama Setting Success](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
異なるURLでホストされているOllamaサーバーを使用したい場合は、単に**Ollama Base URL**を新しいURLに更新し、接続を再確認するために**更新**ボタンを押してください。
:::
