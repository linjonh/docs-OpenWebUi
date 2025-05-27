---
sidebar_position: 1
title: "Bing"
---

:::警告
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによる公式なサポートは提供されていません。特定のユースケースにあわせてOpen WebUIをカスタマイズする方法のデモンストレーションとしてのみ提供されています。貢献したい場合は、貢献に関するチュートリアルをご覧ください。
:::

## Bing API

### 設定

1. [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)に移動し、新しいリソースを作成します。作成後、リソース概要ページへリダイレクトされます。そこで、「キー管理をクリックしてください」を選択します。 ![キー管理をクリックしてください](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. キー管理ページで、Key1またはKey2を確認し、目的のキーをコピーします。
3. Open WebUI管理パネルを開き、設定タブに移動して、Web検索を選択します。
4. Web検索オプションを有効にし、Web検索エンジンをbingに設定します。
5. [SearchApi API Key]に、手順2で[AazurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)ダッシュボードからコピーした`APIキー`を入力します。
6. `保存`をクリックします。
