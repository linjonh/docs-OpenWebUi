---
title: "🕵🏻‍♀️ HeliconeでLLMリクエストを監視"
sidebar_position: 19
---

:::warning
このチュートリアルはコミュニティ貢献によるものであり、Open WebUIチームによって公式にサポートされているものではありません。特定のユースケースに合わせてOpen WebUIをカスタマイズする方法をデモンストレーションとして提供します。寄稿を希望する場合は、投稿チュートリアルをご覧ください。
:::

# Open WebUIとHeliconeの統合

Heliconeは、開発者向けに**運用準備が整った**アプリケーションを監視、デバッグ、改善するためのオープンソースLLM可視化プラットフォームです。これには、Open WebUIデプロイメントが含まれます。

Heliconeを有効にすると、LLMリクエストをログし、プロンプトを評価・実験し、即時の洞察を得ることで、自信を持ってプロダクションへの変更を進めることができます。

- **モデルタイプをまたぐ統合ビューによるリアルタイム監視**: ローカルのOllamaモデルとクラウドAPIを一つのインターフェースで監視
- **リクエストの視覚化と再実行**: Open WebUIでどのプロンプトが各モデルに送信され、生成されたLLMの出力を評価可能
- **ローカルLLM性能追跡**: セルフホストされたモデルの応答時間とスループットを測定
- **モデル別の利用分析**: Open WebUIセットアップ内での異なるモデルの利用パターンを比較
- **ユーザー分析**: インタラクションパターンを理解
- **デバッグ機能**: モデルレスポンスの問題をトラブルシューティング
- **コスト追跡**: 各プロバイダーでのLLM利用の費用を追跡


## Open WebUIとHeliconeを統合する方法

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube動画プレイヤー"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### ステップ1: Heliconeアカウントを作成し、APIキーを生成

[Heliconeアカウント](https://www.helicone.ai/)を作成してログインし、[こちらでAPIキーを生成](https://us.helicone.ai/settings/api-keys)。

*— [書き込み専用APIキー](https://docs.helicone.ai/helicone-headers/helicone-auth)を生成することをお勧めします。これにより、プライベートデータへの読み取りアクセスなしでHeliconeにログデータを送信するだけが許可されます。*

### ステップ2: OpenAIアカウントを作成し、APIキーを生成

 OpenAIアカウントを作成し、[OpenAIの開発者ポータル](https://platform.openai.com/account/api-keys)にログインしてAPIキーを生成。

### ステップ3: HeliconeのベースURLを使用してOpen WebUIアプリケーションを実行

最初のOpen WebUIアプリケーションを起動するには、[Open WebUIドキュメント](https://docs.openwebui.com/)のコマンドを使用し、HeliconeのAPI BASE URLを含めて、自動的にクエリと監視を行えるようにします。

```bash
   # 環境変数を設定
   export HELICONE_API_KEY=<YOUR_API_KEY>
   export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

   # Helicone統合でOpen WebUIを実行
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

既にOpen WebUIアプリケーションが展開されている場合は、 `管理パネル` > `設定` > `接続`に移動し、「OpenAI API接続を管理」のための「+」記号をクリックします。次のプロパティを更新します:

- `APIベースURL`は ``https://oai.helicone.ai/v1/<YOUR_HELICONE_API_KEY>``
- `APIキー`はOpenAI APIキーです。

![Open WebUI Heliconeセットアップ](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### ステップ4: 監視が正常に機能していることを確認

統合が正常に機能していることを確認するには、Heliconeのダッシュボードにログインし、「リクエスト」タブを確認します。

すでにOpen WebUIインターフェースを通じて行ったリクエストがHeliconeにログに記録されていることが確認できます。

![Heliconeのトレース例](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## 詳細を学ぶ

Heliconeの包括的ガイドについては、[こちらのHeliconeドキュメント](https://docs.helicone.ai/getting-started/quick-start)をご覧ください。
