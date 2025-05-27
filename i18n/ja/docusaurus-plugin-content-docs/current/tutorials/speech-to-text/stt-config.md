---
sidebar_position: 1
title: "🗨️  設定"
---

Open Web UIは、ローカル、ブラウザ、リモートの音声からテキスト変換をサポートしています。

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## クラウド / リモート音声からテキスト変換プロバイダー

現在サポートされているクラウド音声からテキスト変換プロバイダーは以下の通りです。APIキーは環境変数（OpenAI）として、または管理設定ページで設定できます（両方のキー）。

 | サービス  | APIキーが必要 |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPIは、組み込みのブラウザSTTプロバイダーを介してSTTを提供します。

## STTプロバイダーの設定方法

音声からテキスト変換プロバイダーを設定するには:

- 管理設定ページに移動する  
- 「オーディオ」を選ぶ
- APIキーを入力し、ドロップダウンからモデルを選択する  

![alt text](/images/tutorials/stt/stt-config.png)

## ユーザーレベルの設定

管理パネルで設定されたインスタンス設定に加えて、追加の機能を提供するいくつかのユーザーレベル設定があります。

*   **STT設定:** 音声からテキスト変換機能に関連する設定を含んでいます。
*   **音声からテキストエンジン:** 音声認識に使用されるエンジンを決定します（デフォルトまたはWeb API）。
 

![alt text](/images/tutorials/stt/user-settings.png)

## STTの使用方法

音声からテキスト変換は、デスクトップやモバイルデバイスの両方で高い効率性を持ち、音声を使用して"プロンプトを書く"方法を提供します。

STTを使用するには、単にマイクアイコンをクリックします:

![alt text](/images/tutorials/stt/stt-operation.png)

ライブオーディオ波形が音声キャプチャの成功を示します:

![alt text](/images/tutorials/stt/stt-in-progress.png)

## STTモード操作

録音が始まったら、以下を行うことができます:

- チェックアイコンをクリックして録音を保存します（完了後即送信が有効になっている場合は送信されます。それ以外の場合は手動で送信可能）
- 録音を中止したい場合（例えば、新しい録音を開始したい場合）、xアイコンをクリックして録音インターフェイスを終了します

![alt text](/images/tutorials/stt/endstt.png)
