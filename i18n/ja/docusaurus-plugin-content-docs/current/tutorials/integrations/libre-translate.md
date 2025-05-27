---
sidebar_position: 25
title: "🔠 LibreTranslateの統合"
---

:::warning
このチュートリアルはコミュニティによる寄稿であり、Open WebUIチームによってサポートされていません。本チュートリアルは、Open WebUIを特定のユースケースに合わせてカスタマイズする方法を示すデモンストレーションとしてのみ提供されています。寄稿を希望される場合は、寄稿チュートリアルをご覧ください。
:::

概要
--------

LibreTranslateは、幅広い言語をサポートする無料かつオープンソースの機械翻訳APIです。LibreTranslateは自己ホスト型でオフライン動作が可能であり、セットアップが簡単です。他のAPIとは異なり、GoogleやAzureなどのプロプライエタリプロバイダーに依存して翻訳を行うことはありません。代わりに、その翻訳エンジンはオープンソースの[Argos Translate](https://github.com/argosopentech/argos-translate)ライブラリによって支えられています。LibreTranslateをOpen WebUIに統合して、その機械翻訳能力を活用することができます。このドキュメントでは、DockerでLibreTranslateをセットアップし、Open WebUI内で統合を構成するためのステップバイステップガイドを提供します。

DockerでLibreTranslateをセットアップする
-----------------------------------

DockerでLibreTranslateをセットアップするには、以下の手順を実行してください。

### ステップ1: Docker Composeファイルを作成する

`docker-compose.yml`という新しいファイルを任意のディレクトリ内に作成します。このファイルに以下の構成を追加してください。

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### ステップ2: `stack.env`ファイルを作成する

`docker-compose.yml`ファイルと同じディレクトリに`stack.env`という新しいファイルを作成します。このファイルに以下の構成を追加してください。

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### ステップ3: Docker Composeファイルを実行する

以下のコマンドを実行してLibreTranslateサービスを開始します。

```bash
docker-compose up -d
```

これにより、LibreTranslateサービスがデタッチモードで起動します。

Open WebUIでの統合を構成する
-------------------------------------------

DockerでLibreTranslateを起動したら、Open WebUI内で統合を構成することができます。以下のようなコミュニティ統合が利用可能です。

* [LibreTranslateフィルタ機能](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslateアクション機能](https://openwebui.com/f/jthesse/libretranslate_action)
* [多言語LibreTranslateアクション機能](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslateフィルタパイプライン](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

あなたのニーズに最適な統合を選択し、その指示に従ってOpen WebUI内で構成してください。

LibreTranslateパイプラインと機能が対応する言語:
実際にはLibreTranslate内で見つけられるすべての言語ですが、以下に一覧を示します。
```
アルバニア語、アラビア語、アゼルバイジャン語、ベンガル語、ブルガリア語、カタロニア語、バレンシア語、中国語、チェコ語、デンマーク語、オランダ語、英語、フラマン語、エスペラント語、エストニア語、フィンランド語、フランス語、ドイツ語、ギリシャ語、ヘブライ語、ヒンディー語、ハンガリー語、インドネシア語、アイルランド語、イタリア語、日本語、韓国語、ラトビア語、リトアニア語、マレー語、ペルシャ語、ポーランド語、ポルトガル語、ルーマニア語、モルダビア語、モルドバ語、ロシア語、スロバキア語、スロベニア語、スペイン語、カスティーリャ語、スウェーデン語、タガログ語、タイ語、トルコ語、ウクライナ語、ウルドゥー語
```

トラブルシューティング
--------------

* LibreTranslateサービスが稼働してアクセス可能であることを確認してください。
* Docker構成が正しいことを確認してください。
* LibreTranslateのログでエラーがないか確認してください。

統合のメリット
----------------------

LibreTranslateをOpen WebUIと統合することで、以下のようなメリットがあります。

* 幅広い言語の機械翻訳能力。
* テキスト分析と処理の改善。
* 言語関連タスクの機能強化。

結論
----------

LibreTranslateをOpen WebUIと統合するプロセスは簡単であり、Open WebUIの機能を向上させることができます。このドキュメントで概説された手順に従うことで、LibreTranslateをDocker上でセットアップし、Open WebUI内で統合を構成することができます。
