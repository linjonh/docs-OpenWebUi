---
sidebar_position: 5
title: "Google PSE"
---

:::warning
このチュートリアルはコミュニティからの貢献であり、Open WebUI チームによってサポートされていません。これは、特定のユースケースに合わせて Open WebUI をカスタマイズする方法を示すデモンストレーションとしてのみ役立ちます。貢献したい場合は、寄稿チュートリアルをチェックしてください。
:::

## Google PSE API

### セットアップ

1. Google Developers にアクセスし、[Programmable Search Engine](https://developers.google.com/custom-search) を使用し、ログインまたはアカウントを作成します。
2. [コントロールパネル](https://programmablesearchengine.google.com/controlpanel/all) に移動し、`追加` ボタンをクリックします。
3. 検索エンジンの名前を入力し、他のプロパティをニーズに合わせて設定し、「ロボットではありません」を確認してから `作成` ボタンをクリックします。
4. `APIキー` を生成し、`検索エンジンID` を取得します。（エンジン作成後に利用可能）
5. `APIキー` と `検索エンジンID` を使用して `Open WebUI 管理パネル` を開き、`設定` タブをクリックし、その後 `Web 検索` をクリックします。
6. `Web検索` を有効にし、`Web 検索エンジン` を `google_pse` に設定します。
7. `Google PSE APIキー` に `APIキー` を入力し、`Google PSE エンジン ID` (# 4) を入力します。
8. `保存` をクリックします。

![Open WebUI 管理パネル](/images/tutorial_google_pse1.png)

#### 注意事項

`Web検索` を有効にするには、プロンプトフィールドでプラス (`+`) ボタンを使用します。
ウェブで検索しましょう ;-)

![Web検索を有効化](/images/tutorial_google_pse2.png)
