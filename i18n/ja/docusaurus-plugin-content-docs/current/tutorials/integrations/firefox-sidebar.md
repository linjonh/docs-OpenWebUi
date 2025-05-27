---
sidebar_position: 4100
title: "🦊 Firefox AIチャットボットサイドバー"
---

:::warning
このチュートリアルはコミュニティによる寄稿です。Open WebUIチームによってサポートされているわけではありません。このチュートリアルはOpen WebUIを特定のユースケースに合わせてカスタマイズする方法を示すデモンストレーション目的のみです。寄稿したい場合は、寄稿のチュートリアルを参照してください。
:::

## 🦊 Firefox AIチャットボットサイドバー

# Mozilla FirefoxでOpen WebUIをローカルAIチャットボットブラウザアシスタントとして統合する

## 前提条件

Mozilla FirefoxでOpen WebUIをAIチャットボットブラウザアシスタントとして統合する前に、以下を確認してください:

* Open WebUIインスタンスURL（ローカルまたはドメイン）
* Firefoxブラウザがインストールされていること

## FirefoxでAIチャットボットを有効にする

1. ハンバーガーボタン（三本の横線があるボタン、右上の`X`ボタンの直下）をクリック
2. Firefox設定を開く
2. `Firefoxラボ`セクションをクリック
3. `AIチャットボット`をオンに切り替える

または、次のセクションで説明される`about:config`ページを通じてAIチャットボットを有効にすることもできます。

## about:config設定を構成する

1. Firefoxアドレスバーに`about:config`と入力
2. `リスクを受け入れて続行`をクリック
3. `browser.ml.chat.enabled`を検索し、まだFirefoxラボで有効にされていない場合は`true`に切り替える
4. `browser.ml.chat.hideLocalhost`を検索し、`false`に切り替える

### browser.ml.chat.prompts.#

カスタムプロンプトを追加する手順:

1. `browser.ml.chat.prompts.#`を検索（`#`を数字に置き換えます。例: `0`, `1`, `2`など）
2. `+`ボタンをクリックして新しいプロンプトを追加
3. プロンプトのラベル、値、IDを入力（例: `{"id":"My Prompt", "value": "これは私のカスタムプロンプトです。", "label": "My Prompt"}`）
4. 必要に応じてプロンプトを追加するプロセスを繰り返す

### browser.ml.chat.provider

1. `browser.ml.chat.provider`を検索
2. Open WebUIインスタンスURLを入力（オプションのパラメータを含む場合があります。例: `https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`）

## Open WebUIのURLパラメータ

次のURLパラメータを使用してOpen WebUIインスタンスをカスタマイズできます:

### モデルとモデル選択

* `models`: チャットセッションで複数モデルを指定（コンマ区切りリスト、例: `/?models=model1,model2`）
* `model`: チャットセッションで単一モデルを指定（例: `/?model=model1`）

### YouTube文字起こし

* `youtube`: チャット内でビデオを文字起こしするためにYouTubeビデオIDを提供（例: `/?youtube=VIDEO_ID`）

### ウェブ検索

* `web-search`: このパラメータを`true`に設定してウェブ検索機能を有効化（例: `/?web-search=true`）

### ツール選択

* `tools`または`tool-ids`: チャットでアクティブにするツールIDのコンマ区切りリストを指定（例: `/?tools=tool1,tool2`または`/?tool-ids=tool1,tool2`）

### 通話オーバーレイ

* `call`: このパラメータを`true`に設定してチャットインターフェイスでビデオまたは通話オーバーレイを有効化（例: `/?call=true`）

### 初期クエリプロンプト

* `q`: チャット用の初期クエリまたはプロンプトを設定（例: `/?q=Hello%20there`）

### 一時的なチャットセッション

* `temporary-chat`: このパラメータを`true`に設定してチャットを一時的なセッションとしてマーク（例: `/?temporary-chat=true`）

URLパラメータの詳細および使用方法については、https://docs.openwebui.com/features/chat-features/url-paramsをご覧ください。

## その他のabout:config設定

以下の`about:config`設定を調整してさらにカスタマイズできます:

* `browser.ml.chat.shortcuts`: AIチャットボットサイドバーのカスタムショートカットを有効化
* `browser.ml.chat.shortcuts.custom`: AIチャットボットサイドバーのカスタムショートカットキーを有効化
* `browser.ml.chat.shortcuts.longPress`: ショートカットキーの長押し遅延を設定
* `browser.ml.chat.sidebar`: AIチャットボットサイドバーを有効化
* `browser.ml.checkForMemory`: モデルを読み込む前に利用可能なメモリをチェック
* `browser.ml.defaultModelMemoryUsage`: モデルのデフォルトのメモリ使用量を設定
* `browser.ml.enable`: Firefoxで機械学習機能を有効化
* `browser.ml.logLevel`: 機械学習機能のログレベルを設定
* `browser.ml.maximumMemoryPressure`: 最大メモリ圧力の閾値を設定
* `browser.ml.minimumPhysicalMemory`: 必要な最小物理メモリを設定
* `browser.ml.modelCacheMaxSize`: モデルキャッシュの最大サイズを設定
* `browser.ml.modelCacheTimeout`: モデルキャッシュのタイムアウトを設定
* `browser.ml.modelHubRootUrl`: モデルハブのルートURLを設定
* `browser.ml.modelHubUrlTemplate`: モデルハブのURLテンプレートを設定
* `browser.ml.queueWaitInterval`: キュー待機の間隔を設定
* `browser.ml.queueWaitTimeout`: キュー待機のタイムアウトを設定

## AIチャットボットサイドバーへのアクセス方法

AIチャットボットサイドバーにアクセスするには、次の方法を使用します:

* `CTRL+B`を押してブックマークサイドバーを開き、AIチャットボットに切り替え
* `CTRL+Alt+X`を押してAIチャットボットサイドバーを直接開く