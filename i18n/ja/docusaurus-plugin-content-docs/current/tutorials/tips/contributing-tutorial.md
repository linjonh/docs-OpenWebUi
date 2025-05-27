---
sidebar_position: 2
title: "🤝 チュートリアルへの貢献"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは行われていません。これは、特定の使用ケースに応じてOpen WebUIをカスタマイズする方法のデモとしてのみ提供されています。貢献したいですか？寄稿チュートリアルをご覧ください。
:::

# チュートリアルへの貢献

Open WebUIドキュメントへのチュートリアル貢献にご興味をお持ちいただきありがとうございます。以下の手順に従って環境をセットアップし、チュートリアルを送信してください。

## 手順

1. **`openwebui/docs` GitHubリポジトリをフォークする**

   - GitHubの[Open WebUIドキュメントリポジトリ](https://github.com/open-webui/docs)に移動します。
   - 右上の**フォーク**ボタンをクリックして、自分のGitHubアカウントにコピーを作成します。

2. **GitHub Actionsを有効にする**

   - フォークしたリポジトリで、**Actions** タブに移動します。
   - 要求された場合は、画面の指示に従ってGitHub Actionsを有効にします。

3. **GitHub Pagesを有効にする**

   - フォークしたリポジトリの**設定** > **Pages**に移動します。
   - **ソース**セクションで、デプロイするブランチ（例：`main`）とフォルダ（例：`/docs`）を選択します。
   - **保存**ボタンをクリックしてGitHub Pagesを有効にします。

4. **GitHub環境変数を設定する**

   - フォークしたリポジトリで、**設定** > **秘密情報と変数** > **Actions** > **変数**に移動します。
   - 次の環境変数を追加します：
     - `BASE_URL` を `/docs` （またはフォーク用の選択したベースURL）に設定。
     - `SITE_URL` を `https://<your-github-username>.github.io/` に設定。

### 📝 GitHub Pages ワークフローと構成ファイルの更新

カスタム設定に適合させるためにデプロイ設定を調整する必要がある場合は、以下の手順を実行してください：

a. **`.github/workflows/gh-pages.yml` を更新**

- 必要に応じて、`BASE_URL`と`SITE_URL`の環境変数をビルドステップに追加します：

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **`docusaurus.config.ts` を環境変数を使用して変更**

- ローカルまたは直接のデプロイメント向けのデフォルト値と共に、これらの環境変数を使用するように`docusaurus.config.ts`を更新します：

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "ChatGPTスタイルのWebUI（かつてのOllama WebUI）",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- このセットアップにより、フォークやカスタムセットアップで一貫したデプロイメントの動作が保証されます。

5. **`gh-pages` GitHub ワークフローを実行**

   - **Actions** タブで、`gh-pages` ワークフローを見つけます。
   - 必要に応じてワークフローを手動でトリガーするか、設定に基づいて自動的に実行される場合があります。

6. **フォークしたコピーにアクセス**

   - `https://<your-github-username>.github.io/<BASE_URL>` を訪問してフォークしたドキュメントを確認します。

7. **変更内容を作成する**

   - フォークしたリポジトリで、適切なディレクトリ（例：`docs/tutorial/`）に移動します。
   - チュートリアルのための新しいMarkdownファイルを作成するか、既存のファイルを編集します。
   - チュートリアルに非サポート警告バナーを含めてください。

8. **プルリクエストを送信する**

   - チュートリアルが準備できたら、フォークしたリポジトリに変更をコミットします。
   - 元の`open-webui/docs`リポジトリに移動します。
   - **新しいプルリクエスト**をクリックし、ソースとしてフォークとブランチを選択します。
   - PRの説明的なタイトルと説明を追加します。
   - レビューのためにプルリクエストを提出してください。

## 重要

コミュニティが寄稿したチュートリアルには、以下を含める必要があります：

```
:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは行われていません。これは、特定の使用ケースに応じてOpen WebUIをカスタマイズする方法のデモとしてのみ提供されています。貢献したいですか？寄稿チュートリアルをご覧ください。
:::
```

---

:::tip ローカルでDocusaurusをテストする方法
以下のコマンドを使用して、ローカルでDocusaurusサイトをテストできます：

```bash
npm install   # 依存関係をインストール
npm run build # プロダクション向けにサイトをビルド
```

これにより、デプロイ前に問題を発見することができます。
:::

---
