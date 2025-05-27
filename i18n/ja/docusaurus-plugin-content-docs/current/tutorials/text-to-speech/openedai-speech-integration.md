---
sidebar_position: 2
title: "🗨️ Docker を使用した Openedai-speech"
---

:::warning
このチュートリアルはコミュニティ貢献によるものであり、Open WebUI チームによってサポートされていません。この資料は、Open WebUI を特定の使用例に合わせてカスタマイズする方法を示すデモンストレーションとして提供されています。貢献したい方は、貢献のチュートリアルをチェックしてください。
:::

**Docker を使用して `openedai-speech` を Open WebUI に統合する**
================================================================

**`openedai-speech` とは何ですか？**
---------------------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) は、OpenAI オーディオ/スピーチ API と互換性のあるテキストから音声への変換サーバーです。

`/v1/audio/speech` エンドポイントを提供し、カスタム音声クローン機能を備えた無料かつプライベートなテキストから音声への変換体験を提供します。このサービスは OpenAI と提携しておらず、OpenAI API キーは必要ありません。
:::

**必要条件**
-----------

* システムに Docker がインストールされていること
* Docker コンテナで実行されている Open WebUI
* Docker および Docker Compose の基本的な知識

**オプション 1: Docker Compose を使用する**
-------------------------------------------

**ステップ 1: `openedai-speech` サービス用の新しいフォルダーを作成する**
-----------------------------------------------------------------------

例として、`openedai-speech-service` という新しいフォルダーを作成して、`docker-compose.yml` および `speech.env` ファイルを保存します。

**ステップ 2: GitHub から `openedai-speech` リポジトリをクローンする**
----------------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

これにより、Docker Compose ファイル（`docker-compose.yml`、`docker-compose.min.yml`、`docker-compose.rocm.yml`）を含む `openedai-speech` リポジトリと他の必要なファイルがローカルマシンにダウンロードされます。

**ステップ 3: `sample.env` ファイルを `speech.env` にリネームする（必要に応じてカスタマイズ）**
--------------------------------------------------------------------------------

`openedai-speech` リポジトリフォルダー内に、以下の内容で `speech.env` という新しいファイルを作成します：

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**ステップ 4: Docker Compose ファイルを選択する**
---------------------------------------------

以下の Docker Compose ファイルのいずれかを使用できます：

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): このファイルは、`ghcr.io/matatonic/openedai-speech` イメージを使用し、[Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) からビルドします。
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): このファイルは、`ghcr.io/matatonic/openedai-speech-min` イメージを使用し、[Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min) からビルドします。このイメージは Piper のみをサポートするミニマルバージョンで、GPU を必要としません。
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): ROCm サポート付きで [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) から構築される `ghcr.io/matatonic/openedai-speech-rocm` イメージを使用します。

**ステップ 4: 選択した Docker イメージをビルドする**
----------------------------------------------------

Docker Compose ファイルを実行する前に、Docker イメージをビルドする必要があります：

* **Nvidia GPU（CUDA サポート）**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU（ROCm サポート）**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **CPU のみ、GPU なし（Piper のみ）**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**ステップ 5: 正しい `docker compose up -d` コマンドを実行する**
----------------------------------------------------------------

* **Nvidia GPU（CUDA サポート）**: 分離モードで `openedai-speech` サービスを開始するには、次のコマンドを実行します：

```bash
docker compose up -d
```

* **AMD GPU（ROCm サポート）**: 分離モードで `openedai-speech` サービスを開始するには、次のコマンドを実行します：

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Apple M シリーズ、Raspberry Pi)**: XTTS はここでは CPU サポートのみで非常に遅いです。XTTS を CPU（遅い）で使用する Nvidia イメージ、または Piper のみのイメージ（推奨）を使用できます：

```bash
docker compose -f docker-compose.min.yml up -d
```

* **CPU のみ、GPU なし（Piper のみ）**: Piper のみをサポートするミニマル Docker イメージの場合（< 1GB 対 8GB）：

```bash
docker compose -f docker-compose.min.yml up -d
```

これにより、分離モードで `openedai-speech` サービスが開始されます。

**オプション 2: Docker 実行コマンドを使用する**
-------------------------------------------

次のDocker実行コマンドを使用して、`openedai-speech`サービスを分離モードで起動することもできます：

* **Nvidia GPU (CUDA)**: 次のコマンドを実行して`openedai-speech`サービスを構築および起動します：

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: 次のコマンドを実行して`openedai-speech`サービスを構築および起動します：

> ROCmのサポートを有効化するには、`speech.env`ファイル内の`#USE_ROCM=1`行のコメントを解除してください。

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **CPUのみ、GPU無し (Piper専用)**: 次のコマンドを実行して`openedai-speech`サービスを構築および起動します：

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**ステップ6: Open WebUIの設定でTTSに`openedai-speech`を使用するよう構成する**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Open WebUIの設定を開き、**Admin Panel > Settings > Audio**の下にあるTTS設定に進み、次の設定を追加してください：

* **API Base URL**: `http://host.docker.internal:8000/v1`
* **API Key**: `sk-111111111` （これはダミーのAPIキーです。`openedai-speech`はAPIキーを必要としないため、このフィールドには任意の値を入力できます。）

**ステップ7: 音声を選択する**
--------------------------

管理パネル内のオーディオ設定メニューで`TTS Voice`セクションを選択し、下記の選択肢から`openedai-speech`がサポートする`TTS Model`を設定できます。これらのモデルの音声は英語に最適化されています。

* `tts-1` または `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova`, および `shimmer` （`tts-1-hd`は構成可能で、デフォルトではOpenAIサンプルを使用します）

**ステップ8: `Save`を押して変更を適用し、自然な音声を楽しむ**
--------------------------------------------------------------------------------------------

`Save`ボタンを押してOpen WebUI設定への変更を適用します。変更を完全に適用するにはページをリフレッシュしてください。そして、自然な音声でのテキスト読み上げを可能にする`openedai-speech`統合をOpen WebUI内で楽しんでください。

**モデル詳細:**
------------------

`openedai-speech`は、各モデルが個々の長所と要件を持つ複数のテキスト読み上げモデルをサポートしています。以下のモデルが利用可能です：

* **Piper TTS**（非常に高速、CPUで動作）：`voice_to_speaker.yaml`設定ファイルを使用して、自分の[Piper音声](https://rhasspy.github.io/piper-samples/)を使用可能。このモデルは低遅延と高性能を必要とするアプリケーションに最適です。また、Piper TTSは[多言語](https://github.com/matatonic/openedai-speech#multilingual)音声もサポートしています。
* **Coqui AI/TTS XTTS v2**（高速、約4GBのGPU VRAM & CUDA対応Nvidia GPUが必要）：このモデルでは、Coqui AIのXTTS v2音声クローン技術を使用して高品質な音声を生成します。より強力なGPUが必要ですが、優れたパフォーマンスと高品質のオーディオを提供します。Coquiは[多言語](https://github.com/matatonic/openedai-speech#multilingual)音声もサポートしています。
* **Beta Parler-TTSサポート**（実験的、より低速）：このモデルはParler-TTSフレームワークを使用して音声を生成します。現在ベータ版ですが、スピーカー音声の基本的な特徴を記述することで使用できます。生成ごとに音声は若干異なりますが、提供されたスピーカーの説明に似た音声になります。音声についての詳細情報を得るには、[Text Description to Speech](https://www.text-description-to-speech.com/)を参照してください。

**トラブルシューティング**
-------------------

`openedai-speech`をOpen WebUIに統合する際に問題が発生した場合は、以下のトラブルシューティング手順に従ってください：

* **`openedai-speech`サービスを確認**: `openedai-speech`サービスが実行中であり、docker-compose.ymlファイルで指定したポートが公開されていることを確認します。
* **host.docker.internalへのアクセスを確認**: Open WebUIコンテナ内から`host.docker.internal`というホスト名が解決可能であることを確認します。これは、`openedai-speech`がPC上で`localhost`経由で公開されていることに起因しますが、`open-webui`は通常、自分自身のコンテナ内からこれにアクセスできません。たとえば、ホストファイルを`openedai-speech`で提供されるディレクトリにマウントするフォルダをdocker-compose.ymlファイルに追加することでこれを解決できます。
* **APIキー設定の確認**: APIキーをダミー値に設定するか、使用しない状態にしていることを確認してください。`openedai-speech`にはAPIキーが必要ありません。
* **音声設定の確認**: 使用しようとしているテキスト読み上げ音声が`voice_to_speaker.yaml`ファイルに存在しており、対応するファイル（例: 音声XMLファイル）が正しいディレクトリに存在していることを確認してください。
* **音声モデルのパスを確認**: 音声モデル読み込みに問題が発生している場合は、`voice_to_speaker.yaml`ファイル内のパスが音声モデルの実際の保存場所と一致していることを再確認してください。

**追加のトラブルシューティングのヒント**
------------------------------------

* `openedai-speech`のログを確認して、問題の原因となっている可能性のあるエラーメッセージや警告を探してください。
* `docker-compose.yml`ファイルが環境に合わせて正しく設定されていることを確認してください。
* 問題が解決しない場合は、`openedai-speech`サービスまたはDocker環境全体を再起動してみてください。
* 問題が継続する場合は、`openedai-speech`のGitHubリポジトリまたは関連するコミュニティフォーラムで支援を求めてください。

**FAQ**
-------

**生成された音声の感情範囲を制御する方法はありますか？**

生成された音声の感情的出力を直接制御する仕組みはありません。大文字や文法などの要素が音声の出力に影響を与える可能性はありますが、内部テストの結果は混在しています。

**音声ファイルはどこに保存されていますか？設定ファイルはどうですか？**

音声の定義とプロパティを定義する設定ファイルは、configボリュームに保存されています。特に、デフォルトの音声はvoice_to_speaker.default.yamlで定義されています。

**追加情報**
------------------------

`openedai-speech`を使用するようにOpen WebUIを設定する方法（環境変数の設定を含む）について詳しくは、[Open WebUIドキュメント](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech)をご覧ください。

`openedai-speech`について詳しく知りたい場合は、[GitHubリポジトリ](https://github.com/matatonic/openedai-speech)をご覧ください。

**openedai-speechにより多くの音声を追加する方法:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
`docker-compose.yml`ファイルでポート番号を使用可能な空きポートに変更できますが、必ずOpen WebUI管理オーディオ設定の**APIベースURL**をそれに応じて更新してください。
:::
