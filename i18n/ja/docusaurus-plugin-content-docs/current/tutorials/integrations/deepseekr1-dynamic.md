---
sidebar_position: 1
title: "🐋 Llama.cppでDeepSeek R1 Dynamic 1.58-bitを実行"
---

**UnslothAI**に大感謝！彼らの素晴らしい努力のおかげで、**Llama.cpp**で**完全なDeepSeek-R1** 671Bパラメーターモデルを動的1.58ビット量子化形式（わずか131GBに圧縮）で実行できるようになりました！しかも最高なことに、大規模なエンタープライズ向けGPUやサーバーを必要とせず、自宅のマシンで実行可能になりました（多くの一般消費者向けハードウェアでは遅い可能性がありますが）。

:::note
Ollama上で利用可能な唯一真正の**DeepSeek-R1**モデルは、以下の**671Bバージョン**のみです：[https://ollama.com/library/deepseek-r1:671b](https://ollama.com/library/deepseek-r1:671b)。他のバージョンは**蒸留版モデル**です。
:::

このガイドは、**Open WebUI**統合の**Llama.cpp**を使用して**完全なDeepSeek-R1 Dynamic 1.58-bit量子化モデル**を実行する方法に焦点を当てています。本チュートリアルは、**M4 Max + 128GB RAM**マシンを使用した手順を示していますが、自身の構成に合わせて設定を調整することが可能です。

---

## ステップ1: Llama.cppをインストール

以下のどちらかを行います：
- [プリビルドバイナリをダウンロード](https://github.com/ggerganov/llama.cpp/releases)
- **自分でビルドする**: 以下のガイドを参照してください: [Llama.cpp ビルドガイド](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md)

## ステップ2: UnslothAI提供のモデルをダウンロード

[UnslothのHugging Faceページ](https://huggingface.co/unsloth/DeepSeek-R1-GGUF)にアクセスし、DeepSeek-R1の適切な**動的量子化版**をダウンロードしてください。本チュートリアルでは、**1.58-bit (131GB)**版を使用します。この版は高度に最適化されていながら、驚くべきことに非常に機能的です。


:::tip
「作業ディレクトリ」を把握しておいてください — Pythonスクリプトまたはターミナルセッションが動作している場所のことです。モデルファイルはデフォルトでそのディレクトリのサブフォルダにダウンロードされるため、そのパスを確認しておきましょう。例えば、以下のコマンドを`/Users/yourname/Documents/projects`で実行している場合、ダウンロードされたモデルは`/Users/yourname/Documents/projects/DeepSeek-R1-GGUF`に保存されます。
:::

UnslothAIの開発プロセスや、これらの動的量子化版がなぜ効率的であるのかについて詳しく知りたい場合は、彼らのブログ投稿をチェックしてください：[UnslothAI DeepSeek R1 動的量子化](https://unsloth.ai/blog/deepseekr1-dynamic)。

以下はプログラムを使用してモデルをダウンロードする方法です：
```python
# Hugging Faceの依存関係を実行する前にインストールします：
# pip install huggingface_hub hf_transfer

from huggingface_hub import snapshot_download

snapshot_download(
    repo_id = "unsloth/DeepSeek-R1-GGUF",  # Hugging Faceリポジトリを指定
    local_dir = "DeepSeek-R1-GGUF",         # このディレクトリにモデルをダウンロード
    allow_patterns = ["*UD-IQ1_S*"],        # 1.58-bit版のみをダウンロード
)
```

ダウンロードが完了すると、以下のようなディレクトリ構造でモデルファイルが見つかります：
```
DeepSeek-R1-GGUF/
├── DeepSeek-R1-UD-IQ1_S/
│   ├── DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00002-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00003-of-00003.gguf
```

:::info
🛠️ 後の手順で**自分の特定のディレクトリ構造に合わせてパスを更新**してください。例えば、スクリプトを`/Users/tim/Downloads`で実行している場合、GGUFファイルの完全なパスは：
`/Users/tim/Downloads/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`となります。
:::

## ステップ3: Open WebUIがインストールされ稼働していることを確認

**Open WebUI**がまだインストールされていない場合でも心配ありません！簡単にセットアップできます。[Open WebUIの公式ドキュメント](https://docs.openwebui.com/)を参照してください。インストールが完了したら、アプリケーションを起動します。後の手順でDeepSeek-R1モデルと接続するために使用します。


## ステップ4: Llama.cppを使用してモデルを提供

モデルをダウンロードしたら、次のステップは**Llama.cppのサーバーモード**を使用して実行することです。開始する前に：

1. **`llama-server`バイナリを見つけます。**
   ソースからビルドしている場合（ステップ1を参照）、`llama-server`実行ファイルは`llama.cpp/build/bin`にあります。`cd`コマンドを使用してこのディレクトリに移動します：
   ```bash
   cd [path-to-llama-cpp]/llama.cpp/build/bin
   ```

   `[path-to-llama-cpp]`を、Llama.cppをクローンまたはビルドした場所で置き換えます。例えば：
   ```bash
   cd ~/Documents/workspace/llama.cpp/build/bin
   ```

2. **モデルフォルダを指定。**
   ステップ2で作成したダウンロードされたGGUFファイルのフルパスを使用します。モデルを提供する際、分割GGUFファイルの最初の部分を指定します（例：`DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`）。

以下は、サーバーを起動するためのコマンドです：
```bash
./llama-server \
    --model /[your-directory]/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```


:::tip
🔑 **マシンに基づいたカスタマイズ可能なパラメータ:**  

- **`--model`:** ステップ2でGGUFファイルをダウンロードしたディレクトリのパスを`/[your-directory]/`に置き換えてください。  
- **`--port`:** サーバーのデフォルトポートは`8080`ですが、使用可能なポートに応じて変更できます。  
- **`--ctx-size`:** コンテキスト長（トークン数）を決定します。ハードウェアが許せば増やすことができますが、RAM/VRAM使用量増加に注意してください。  
- **`--n-gpu-layers`:** 推論速度を上げるためGPUにオフロードするレイヤー数を設定します。具体的な数はGPUのメモリ容量によって異なります。Unslothのテーブルを参考にしてください。
:::

例えば、モデルが`/Users/tim/Documents/workspace`にダウンロードされた場合、コマンドは以下のようになります:  
```bash
./llama-server \
    --model /Users/tim/Documents/workspace/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```

サーバーが起動すると、以下の**ローカルOpenAI互換API**エンドポイントをホストします:  
```
http://127.0.0.1:10000
```

:::info
🖥️ **Llama.cppサーバーが実行中**  

![Server Screenshot](/images/tutorials/deepseek/serve.png)  

コマンドを実行後、ポート10000でサーバーがアクティブであることを確認するメッセージが表示されます。
:::

このターミナルセッションを**終了しないでください**。次のステップでモデルを提供するために必要です。

## ステップ5: Llama.cppをOpen WebUIに接続する  

1. Open WebUIの**管理設定**に移動してください。  
2. **Connections > OpenAI Connections**に進んでください。  
3. 新しい接続の詳細を以下のように追加してください:  
   - URL: `http://127.0.0.1:10000/v1` (またはOpen WebUIをDockerで実行する場合は`http://host.docker.internal:10000/v1`)
   - APIキー: `none`

:::info
🖥️ **Open WebUIでの接続の追加**  

![Connection Screenshot](/images/tutorials/deepseek/connection.png)  

コマンドを実行後、ポート10000でサーバーがアクティブであることを確認するメッセージが表示されます。
:::

接続を保存すると、Open WebUIから**DeepSeek-R1**を直接クエリできるようになります！ 🎉  

---

## 例: 応答の生成  

Open WebUIのチャットインターフェースを使用して、**DeepSeek-R1 Dynamic 1.58-bitモデル**と対話できます。  

![Response Screenshot](/images/tutorials/deepseek/response.png)  

---

## 注意事項と検討  

- **パフォーマンス:**  
  DeepSeek-R1のような131GBの大規模モデルを個人のハードウェアで実行するのは**遅い**です。M4 Max（128GB RAM）を使用しても推論速度は控えめでした。ただ、それが動作するという事実は、UnslothAIの最適化の証です。  

- **VRAM/メモリ要求:**  
  最適なパフォーマンスのために十分なVRAMとシステムRAMを確保してください。低スペックのGPUやCPUのみのセットアップでは、速度が遅くなりますが、それでも実行可能です。  

---

**UnslothAI**と**Llama.cpp**のおかげで、オープンソースの最大級の推論モデルである**DeepSeek-R1**（1.58-bitバージョン）の実行が個人の手にも届きました。このようなモデルを消費者ハードウェアで実行するのは難しいですが、大規模な計算インフラなしで実行できる能力は重要な技術的マイルストーンです。  

⭐ オープンAI研究の限界を押し広げるコミュニティに心から感謝します。  

実験を楽しんでください！ 🚀  
