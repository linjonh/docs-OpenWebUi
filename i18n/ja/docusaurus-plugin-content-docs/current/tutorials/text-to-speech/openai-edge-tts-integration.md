---
sidebar_position: 1
title: "🗨️ Docker を使用した Edge TTS"
---

:::warning
このチュートリアルはコミュニティの貢献により作成されたものであり、Open WebUIチームによってサポートされているわけではありません。特定のユースケースに合わせて Open WebUI をカスタマイズする方法のデモンストレーションとして機能します。貢献したい場合は、貢献チュートリアルを確認してください。
:::

# `openai-edge-tts` 🗣️ を Open WebUI と統合する

## `openai-edge-tts` とは？ 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) は、OpenAI API のエンドポイントを模倣したテキスト読み上げ API で、Open WebUI のようにエンドポイント URL を指定できるシナリオで直接置き換えることができます。

これは [edge-tts](https://github.com/rany2/edge-tts) パッケージを利用しており、Edge ブラウザの無料の「読み上げ」機能を活用して Microsoft/Azure にリクエストをエミュレートし、非常に高品質なテキスト読み上げを無料で提供します。

[音声サンプルはこちら](https://tts.travisvn.com)

<details>
  <summary>openedai-speech とどう違うのか？</summary>

[openedai-speech](https://github.com/matatonic/openedai-speech) に似ており、[openai-edge-tts](https://github.com/travisvn/openai-edge-tts) は、OpenAI API のエンドポイントを模倣したテキスト読み上げ API エンドポイントで、OpenAI Speech エンドポイントを呼び出せるシナリオでサーバーのエンドポイント URL を設定できる場合に直接置き換えが可能です。

`openedai-speech` は完全にオフラインで多くのモダリティから選択できる包括的なオプションです。

`openai-edge-tts` は、音声生成に `edge-tts` という Python パッケージを使用するシンプルなオプションです。

</details>

## 要件

- システムに Docker がインストールされていること
- Open WebUI が起動していること

## ⚡️ クイックスタート

何も設定せずに始める最も簡単な方法は、以下のコマンドを実行することです。

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

これにより、すべてのデフォルト設定でポート 5050 でサービスが実行されます。

## Open WebUI を `openai-edge-tts` に設定する

- 管理パネルを開き、`Settings` -> `Audio` に進みます。
- 以下のスクリーンショットと一致するように TTS 設定を調整します。
- _注: ここで TTS 音声を指定できます_

![このプロジェクトの正しいエンドポイントを追加するための Open WebUI 管理設定のスクリーンショット](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
デフォルトの API キーは `your_api_key_here` という文字列です。追加のセキュリティが必要ない場合はその値を変更する必要はありません。
:::

**これで完了です！ここで終了しても構いません。**

# もし [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) が役立つと思ったら GitHub のリポジトリに⭐️スターをお願いします。


<details>
  <summary>Python での実行</summary>
  
### 🐍 Python での実行

このプロジェクトを Python で直接実行したい場合は、仮想環境を設定し、依存関係をインストールしてサーバーを開始する以下の手順に従ってください。

#### 1. リポジトリをクローン

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. 仮想環境を設定

依存関係を分離するための仮想環境を作成してアクティベートします：

```bash
# macOS/Linux の場合
python3 -m venv venv
source venv/bin/activate

# Windows の場合
python -m venv venv
venv\Scripts\activate
```

#### 3. 依存関係をインストール

`requirements.txt` にリストされている必要なパッケージを `pip` を使用してインストールします：

```bash
pip install -r requirements.txt
```

#### 4. 環境変数を設定

プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の変数を設定します：

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. サーバーを実行

設定が完了したら、以下のコマンドでサーバーを開始します：

```bash
python app/server.py
```

サーバーは `http://localhost:5050` で実行されます。

#### 6. API のテスト

`http://localhost:5050/v1/audio/speech` および利用可能なその他のエンドポイントで API にアクセスできるようになります。リクエストの例については、使用法セクションを参照してください。

</details>

<details>
  <summary>使用詳細</summary>
  
##### エンドポイント: `/v1/audio/speech` （エイリアス `/audio/speech`）

入力されたテキストから音声を生成します。使用可能なパラメータ：

**必須パラメータ:**

- **input** (string): 音声に変換するテキスト（最大4096文字）。

**オプションパラメータ:**

- **model** (string): "tts-1" または "tts-1-hd" を設定（デフォルト: `"tts-1"`）。
- **voice** (string): OpenAI 互換の音声（alloy、echo、fable、onyx、nova、shimmer）または有効な `edge-tts` 音声（デフォルト: `"en-US-AvaNeural"`）。
- **response_format** (string): 音声フォーマット。オプション: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm`（デフォルト: `mp3`）。
- **speed** (number): 再生速度（0.25～4.0）。デフォルトは `1.0`。

:::tip
利用可能な音声を閲覧し、サンプルプレビューを聞くには [tts.travisvn.com](https://tts.travisvn.com) を確認してください。
:::

以下は `curl` を使用したリクエスト例で、出力を mp3 ファイルに保存します：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "こんにちは、私はあなたのAIアシスタントです！どのようにあなたのアイデアを実現するお手伝いができるか教えてください。",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

OpenAI APIエンドポイントパラメータに準拠する場合：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "こんにちは、私はあなたのAIアシスタントです！どのようにあなたのアイデアを実現するお手伝いができるか教えてください。",
    "voice": "alloy"
  } \
  --output speech.mp3
```

英語以外の言語例：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### 追加のエンドポイント

- **POST/GET /v1/models**: 使用可能なTTSモデルをリスト表示します。
- **POST/GET /v1/voices**: 指定された言語/ロケールに対応する `edge-tts` の声をリスト表示します。
- **POST/GET /v1/voices/all**: すべての `edge-tts` の声を言語サポート情報付きでリスト表示します。

:::info
/v1 は現在オプションです。

加えて、**Azure AI Speech**と**ElevenLabs**のエンドポイントがあり、これらのオプションがOpen WebUIで選択された場合にカスタムAPIエンドポイントをサポートします。

これらは環境変数 `EXPAND_API=False` を設定することで無効化できます。
:::

</details>

## 🐳 Dockerのクイック設定

プロジェクトを実行する際に使用するコマンドで環境変数を設定できます

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
現在、markdownテキストはより読みやすく、サポートされているフィルターを通して構成されています。

環境変数 `REMOVE_FILTER=True` を設定することでこれを無効化することができます。
:::

## 追加のリソース

`openai-edge-tts`の詳細については[GitHubリポジトリ](https://github.com/travisvn/openai-edge-tts)をご覧ください。

直接サポートを受けたい場合は[Voice AI & TTS Discord](https://tts.travisvn.com/discord)をご覧ください。

## 🎙️ 音声サンプル

[音声サンプルを再生して利用可能なEdge TTSの声をすべて確認する](https://tts.travisvn.com/)
