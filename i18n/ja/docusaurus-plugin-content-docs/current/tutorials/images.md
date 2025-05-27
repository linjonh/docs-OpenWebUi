---
sidebar_position: 6
title: "🎨 画像生成"
---

:::warning
このチュートリアルはコミュニティ貢献によるものであり、Open WebUIチームによってサポートされているわけではありません。これは特定のユースケースに応じてOpen WebUIをカスタマイズする方法を示すデモンストレーションとしてのみ提供されています。貢献したい場合は、貢献チュートリアルをご覧ください。
:::

# 🎨 画像生成

Open WebUIは、**AUTOMATIC1111**, **ComfyUI**, **OpenAI DALL·E**の3つのバックエンドを介した画像生成をサポートしています。このガイドでは、これらのいずれかのオプションをセットアップして使用する方法を説明します。

## AUTOMATIC1111

Open WebUIは、**AUTOMATIC1111**の[API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)を通じて画像生成をサポートしています。以下は、始めるための手順です。

### 初期設定

1. [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)をインストールしてください。
2. APIアクセスを有効にする追加のフラグを使用してAUTOMATIC1111を起動します。

   ```
   ./webui.sh --api --listen
   ```

3. WebUIをDockerで環境変数をプリセットしてインストールする場合は、次のコマンドを使用します。

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### AUTOMATIC1111を利用したOpen WebUIの設定

1. Open WebUIで、**Admin Panel** > **Settings** > **Images** メニューに移動します。
2. `Image Generation Engine`フィールドを`Default (Automatic1111)`に設定します。
3. API URLフィールドにAUTOMATIC1111のAPIにアクセス可能なアドレスを入力します。

   ```
   http://<your_automatic1111_address>:7860/
   ```

   Open WebUIとAUTOMATIC1111を同じホストでDockerを使用して運用している場合は、アドレスとして`http://host.docker.internal:7860/`を使用してください。

## ComfyUI

ComfyUIは画像生成モデルを管理・操作するための代替インターフェースを提供します。詳細やダウンロードについては[GitHubページ](https://github.com/comfyanonymous/ComfyUI)をご覧ください。以下にComfyUIを他のツールと連携させるためのセットアップ手順を示します。

### 初期設定

1. [GitHub](https://github.com/comfyanonymous/ComfyUI)からComfyUIソフトウェアパッケージをダウンロードして、希望のディレクトリに解凍します。
2. ComfyUIを起動するには、次のコマンドを実行します。

   ```
   python main.py
   ```

   VRAMが少ないシステムの場合は、メモリ使用量を減らすフラグを追加してComfyUIを起動してください。

   ```
   python main.py --lowvram
   ```

3. WebUIをDockerで環境変数をプリセットしてインストールする際のコマンドは次のとおりです。

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### ComfyUIを利用したOpen WebUIの設定

#### FLUX.1モデルのセットアップ

1. **モデルチェックポイント**:

* [black-forest-labsのHuggingFaceページ](https://huggingface.co/black-forest-labs)から`FLUX.1-schnell`または`FLUX.1-dev`モデルをダウンロードします。
* モデルチェックポイントをComfyUIの`models/checkpoints`と`models/unet`ディレクトリの両方に配置します。または、`models/checkpoints`と`models/unet`の間にシンボリックリンクを作成して、両ディレクトリに同じモデルチェックポイントが含まれるようにすることができます。

2. **VAEモデル**:

* [ここ](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors)から`ae.safetensors` VAEをダウンロードします。
* ComfyUIの`models/vae`ディレクトリに配置してください。

3. **CLIPモデル**:

* [ここ](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main)から`clip_l.safetensors`をダウンロードします。
* ComfyUIの`models/clip`ディレクトリに配置してください。

4. **T5XXLモデル**:

* [ここ](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main)から`t5xxl_fp16.safetensors`または`t5xxl_fp8_e4m3fn.safetensors`モデルをダウンロードします。
* ComfyUIの`models/clip`ディレクトリに配置してください。

ComfyUIをOpen WebUIに統合するには、以下の手順に従ってください。

#### ステップ1: Open WebUI設定の構成

1. Open WebUIの**Admin Panel**に移動します。
2. **Settings**をクリックし、次に**Images**タブを選択します。
3. `Image Generation Engine`フィールドで`ComfyUI`を選択します。
4. **API URL**フィールドにComfyUIのAPIにアクセス可能なアドレスを以下の形式で入力します: `http://<your_comfyui_address>:8188/`。
   * 環境変数`COMFYUI_BASE_URL`をこのアドレスに設定して、WebUI内で永続化させます。

#### ステップ2: 接続の確認と画像生成の有効化

1. ComfyUIが実行中で、Open WebUIとの接続が成功していることを確認してください。接続が成功しない場合、次の手順に進むことはできません。
2. 接続が確認された後で、**Image Generation (Experimental)**を有効にします。さらに多くのオプションが表示されます。
3. 最終的な設定ステップのためにステップ3に進みます。

#### ステップ3: ComfyUIの設定とワークフローのインポート

1. ComfyUI内でデベロッパーモードを有効にします。そのためには、ComfyUI内の「**Queue Prompt**」ボタンの上にあるギアアイコンを探し、「`Dev Mode`」トグルを有効にします。
2. ComfyUIで「Save (API Format)」ボタンを使用して、`API形式`で希望のワークフローをエクスポートします。正しく操作すると、ファイルは`workflow_api.json`としてダウンロードされます。
3. Open WebUIに戻り、「**Click here to upload a workflow.json file**」ボタンをクリックします。
4. `workflow_api.json`ファイルを選択して、ComfyUIからエクスポートされたワークフローをOpen WebUIにインポートします。
5. ワークフローをインポートした後、インポートされたワークフローノードIDに従って`ComfyUI Workflow Nodes`をマッピングする必要があります。
6. 使用中のモデルファイル名（例: `flux1-dev.safetensors`）に「Set Default Model」を設定します。

:::info
Open WebUIの`ComfyUI Workflow Nodes`セクション内でワークフロー内のノードに一致させるために、`Input Key`を1つまたは2つ調整する必要がある場合があります。
例えば、`seed`を`noise_seed`に変更してインポートされたワークフローノードIDと一致させる必要がある場合があります。
:::
:::tip
Fluxモデルのいずれかを使用するワークフローなどでは、Open WebUI内のノード入力フィールドに必要な複数のノードIDを使用する場合があります。ノード入力フィールドが複数のIDを必要とする場合、ノードIDはカンマで区切って入力してください（例: `1` または `1, 2`）。
:::

6. 「Save」をクリックして設定を適用し、ComfyUIがOpen WebUIに統合された状態で画像生成をお楽しみください！

これらの手順を完了すると、ComfyUIのセットアップがOpen WebUIに統合され、Flux.1モデルを使用して画像生成が可能になります。

### SwarmUIでの設定

SwarmUIはバックエンドとしてComfyUIを利用します。SwarmUIをOpen WebUIで動作させるには、`ComfyUI Base URL`に`ComfyBackendDirect`を追加する必要があります。また、SwarmUIにLANアクセスを設定することをお勧めします。上記の調整を行った後は、SwarmUIをOpen WebUIで動作させる設定は、上述した[ステップ1: Open WebUI設定の構成](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings)と同じです。
![LANアクセスを使用したSwarmUIのインストール](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

ComfyUI Base URLに入力するアドレスは以下のようになります：`http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUIは、**OpenAI DALL·E API**を使用した画像生成もサポートしています。このオプションには、DALL·E 2とDALL·E 3の間で選択できるセレクタが含まれており、それぞれ異なる画像サイズをサポートしています。

### 初期設定

1. OpenAIから[APIキー](https://platform.openai.com/api-keys)を取得します。

### Open WebUIの設定

1. Open WebUIで、**Admin Panel** > **Settings** > **Images**メニューに移動します。
2. 「Image Generation Engine」フィールドを`Open AI (Dall-E)`に設定します。
3. OpenAIのAPIキーを入力します。
4. 使用したいDALL·Eモデルを選択します。選択したモデルによって画像サイズのオプションが異なることに注意してください：
   * **DALL·E 2**: `256x256`、`512x512`、または`1024x1024`の画像をサポート。
   * **DALL·E 3**: `1024x1024`、`1792x1024`、または`1024x1792`の画像をサポート。

### Azure OpenAI

直接Azure OpenAI DALL·Eを使用することはサポートされていませんが、[LiteLLMプロキシを設定](https://litellm.vercel.app/docs/image_generation)することで、`Open AI (Dall-E)`画像生成エンジンと互換性を持たせることができます。

## 画像生成の使用方法

![画像生成チュートリアル](/images/tutorial_image_generation.png)

1. まず、テキスト生成モデルを使用して画像生成のプロンプトを作成します。
2. 応答が完了した後、画像アイコンをクリックして画像を生成します。
3. 画像生成が完了すると、自動的にチャットに返されます。

:::tip
    LLMの応答を編集して、提示された応答を使用せずに、メッセージとして
    画像生成プロンプトを入力し、送信することも可能です。
:::
