---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPIをDockerで使用"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートはありません。特定のユースケースに合わせてOpen WebUIをカスタマイズする方法のデモとしてのみ提供されています。貢献したい場合は、貢献チュートリアルをご確認ください。
:::

## `Kokoro-FastAPI`とは？

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)は、[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)のテキスト読み上げモデルを利用したDocker化されたFastAPIラッパーで、OpenAI APIエンドポイント仕様を実装しています。高性能なテキスト読み上げと驚異的な生成速度を提供します。

## 主な特徴

- OpenAI互換の音声エンドポイント（インライン音声組み合わせ対応）
- NVIDIA GPUによるアクセラレーションまたはCPU Onnx推論
- 変動チャンクでのストリーミングサポート
- 複数の音声フォーマット対応（`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`）
- localhost:8880/webでアクセス可能な統合Webインターフェース（またはリポジトリ内の追加コンテナーによるGradio対応）
- 変換および生成に対応する音素エンドポイント

## 声

- af
- af_bella
- af_irulan
- af_nicole
- af_sarah
- af_sky
- am_adam
- am_michael
- am_gurney
- bf_emma
- bf_isabella
- bm_george
- bm_lewis

## 言語

- en_us
- en_uk

## 必要条件

- システムにDockerがインストールされていること
- Open WebUIが稼働していること
- GPUサポートの場合：CUDA 12.3対応のNVIDIA GPU
- CPUのみの場合：特別な要件なし

## ⚡️ クイックスタート

### GPU版またはCPU版を選ぶことができます

### GPU版 (CUDA 12.8対応のNVIDIA GPUが必要)

docker runを使用：

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

またはdocker composeでは、`docker-compose.yml`ファイルを作成して`docker compose up`を実行します。例：

```yaml
name: kokoro
services:
    kokoro-fastapi-gpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-gpu:v0.2.1
        restart: always
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
```

:::info
[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)をインストールして設定する必要がある場合があります。
:::

### CPU版 (ONNX最適化推論)

docker runを使用：

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

docker composeを使用：

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Open WebUIを`Kokoro-FastAPI`で使用する設定

Open WebUIでKokoro-FastAPIを使用するには、以下の手順を実行してください：

- 管理パネルを開き、`Settings` -> `Audio`に移動
- 以下の設定に合わせてTTS設定を変更：
- - テキスト読み上げエンジン：OpenAI
  - API Base URL: `http://localhost:8880/v1` # `localhost`の代わりに`host.docker.internal`を使用する必要がある場合があります
  - API Key: `not-needed`
  - TTSモデル：`kokoro`
  - TTSボイス：`af_bella` # 既存のOAI音声の互換性のためのマッピングも受け入れます

:::info
デフォルトのAPIキーは文字列`not-needed`です。追加のセキュリティが必要ない場合、この値を変更する必要はありません。
:::

## Dockerコンテナーの構築

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # または docker/gpu
docker compose up --build
```

**これで完了です！**

Dockerコンテナーの構築に関する詳細情報（ポート変更を含む）は、[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)リポジトリを参照してください。
