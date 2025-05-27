---
sidebar_position: 4000
title: "🐤 Docling ドキュメント抽出"
---

:::warning
このチュートリアルはコミュニティによる寄稿であり、Open WebUIチームによってサポートされているものではありません。これは、特定のユースケースに対してOpen WebUIをカスタマイズする方法を示すデモとしてのみ提供されています。寄稿したいですか？寄稿に関するチュートリアルをチェックしてください。
:::

## 🐤 Docling ドキュメント抽出

このドキュメントは、DoclingをOpen WebUIに統合するためのステップバイステップガイドを提供します。Doclingは、PDF、Word文書、スプレッドシート、HTML、画像など、さまざまなファイル形式をJSONやMarkdownといった構造化データに変換するために設計されたドキュメント処理ライブラリです。レイアウト検出やテーブル解析、言語対応処理の組み込みサポートを備えたDoclingは、検索、要約、取得拡張生成などのAIアプリケーション向けのドキュメント準備を、統一され拡張可能なインターフェースを通じて効率化します。

前提条件
------------

* Open WebUIのインスタンス
* システムにインストールされたDocker
* Open WebUI用に設定されたDockerネットワーク

統合手順
----------------

### 手順1: Docling-ServeのDockerコマンドを実行

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*GPUサポートの場合：
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### 手順2: Open WebUIをDoclingを使用するように設定

* Open WebUIのインスタンスにログインします。
* `Admin Panel` 設定メニューに移動します。
* `Settings` をクリックします。
* `Documents` タブをクリックします。
* `Default` コンテンツ抽出エンジンドロップダウンを `Docling` に変更します。
* 文脈抽出エンジンのURLを `http://host.docker.internal:5001` に更新します。
* 変更を保存します。

Docker内のDoclingの確認
=====================================

Docker環境でDoclingが正しく動作していることを確認するには、以下の手順を実行します。

### 1. Docling Dockerコンテナを開始する

まず、Docling Dockerコンテナが実行されていることを確認します。次のコマンドを使用して開始できます：

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

このコマンドは、Doclingコンテナを起動し、コンテナのポート5001をローカルマシンのポート5001にマッピングします。

### 2. サーバーが稼働しているか確認する

* `http://127.0.0.1:5001/ui/` にアクセスします。
* このURLは、Doclingを使用するためのUIにつながるはずです。

### 3. 統合を確認する

* UIを介していくつかのファイルをアップロードしてみて、MD形式または希望の形式で出力が返されることを確認します。

### 結論

DoclingをOpen WebUIに統合することは、ドキュメント処理とコンテンツ抽出機能を強化するためのシンプルかつ効果的な方法です。このガイドの手順に従うことで、Doclingをデフォルトの抽出エンジンとして設定し、Docker環境でそれがスムーズに動作することを確認できます。一度設定が完了すれば、Doclingを使用して強力で形式に依存しないドキュメント解析が可能となり、Open WebUIのより高度なAI機能をサポートすることができます。
