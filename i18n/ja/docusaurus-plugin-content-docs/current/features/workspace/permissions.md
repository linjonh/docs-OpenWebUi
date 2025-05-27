---
sidebar_position: 3
title: "🔒 パーミッション"
---

Open WebUI の `Workspace` 内の `Permissions` セクションでは、管理者がユーザーへのアクセス制御と機能の利用可能性を設定できます。この強力なシステムにより、アプリケーション内でユーザーがアクセス・変更できる内容を詳細に制御することが可能です。

管理者は以下の方法でパーミッションを管理できます:

1. **ユーザーインターフェース:** Workspace の Permissions セクションは、パーミッションを設定するためのグラフィカルインターフェースを提供します。
2. **環境変数:** 環境変数を使用してパーミッションを設定できます。これらは `PersistentConfig` 変数として保存されます。
3. **グループ管理:** ユーザーを事前設定されたパーミッションを持つグループに割り当てることができます。

## Workspace パーミッション

Workspace パーミッションは、Open WebUI プラットフォームの主要なコンポーネントへのアクセスを制御します:

* **モデルアクセス**: ユーザーがカスタムモデルにアクセスして管理できるようにするトグル。(環境変数: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **ナレッジアクセス**: ユーザーがナレッジベースにアクセスして管理できるようにするトグル。(環境変数: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **プロンプトアクセス**: ユーザーが保存されたプロンプトにアクセスして管理できるようにするトグル。(環境変数: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **ツールアクセス**: ユーザーがツールにアクセスして管理できるようにするトグル。(環境変数: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *注: これを有効化すると、ユーザーはサーバーに任意のコードをアップロードできるようになります。*

## チャットパーミッション

チャットパーミッションは、チャット会話内でユーザーが行えるアクションを決定します:

* **チャットコントロール許可**: チャットコントロールオプションへのアクセスを有効化するトグル。
* **ファイルアップロード許可**: チャットセッション中にユーザーがファイルをアップロードできるようにするトグル。(環境変数: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **チャット削除許可**: ユーザーがチャット会話を削除できるようにするトグル。(環境変数: `USER_PERMISSIONS_CHAT_DELETE`)
* **チャット編集許可**: ユーザーがチャット会話内のメッセージを編集できるようにするトグル。(環境変数: `USER_PERMISSIONS_CHAT_EDIT`)
* **一時チャット許可**: ユーザーが一時的なチャットセッションを作成できるようにするトグル。(環境変数: `USER_PERMISSIONS_CHAT_TEMPORARY`)

## 機能パーミッション

機能パーミッションは、Open WebUI 内の特殊な機能へのアクセスを制御します:

* **ウェブ検索**: チャットセッション中にユーザーがウェブ検索を実行できるようにするトグル。(環境変数: `ENABLE_RAG_WEB_SEARCH`)
* **画像生成**: ユーザーが画像を生成できるようにするトグル。(環境変数: `ENABLE_IMAGE_GENERATION`)
* **コードインタープリター**: ユーザーがコードインタープリター機能を使用できるようにするトグル。(環境変数: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **直接ツールサーバー接続**: ユーザーがツールサーバーへ直接接続できるようにするトグル。(環境変数: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## デフォルトのパーミッション設定

デフォルトでは、Open WebUI は以下のパーミッション設定を適用します:

**Workspace パーミッション**:
- モデルアクセス: 無効 (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- ナレッジアクセス: 無効 (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- プロンプトアクセス: 無効 (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- ツールアクセス: 無効 (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**チャットパーミッション**:
- チャットコントロール許可: 有効
- ファイルアップロード許可: 有効 (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- チャット削除許可: 有効 (`USER_PERMISSIONS_CHAT_DELETE=True`)
- チャット編集許可: 有効 (`USER_PERMISSIONS_CHAT_EDIT=True`)
- 一時チャット許可: 有効 (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**機能パーミッション**:
- ウェブ検索: 有効 (`ENABLE_RAG_WEB_SEARCH=True`)
- 画像生成: 有効 (`ENABLE_IMAGE_GENERATION=True`)
- コードインタープリター: 有効 (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- 直接ツールサーバー接続: 無効 (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

管理者は管理パネルの「users」セクション内のユーザーインターフェースでデフォルトのパーミッションを変更することができます。

## パーミッションの管理

管理者はユーザーインターフェースまたは設定内の対応する環境変数を設定することで、これらのパーミッションを調整できます。すべてのパーミッション関連の環境変数は `PersistentConfig` 変数としてマークされており、初回起動後に内部的に保存され、Open WebUI インターフェースを通じて管理することができます。

この柔軟性により、組織はセキュリティポリシーを実装しながら、ユーザーに必要なツールを提供することができます。パーミッションに関連する環境変数の詳細については、[環境変数設定](../../getting-started/env-configuration.md#workspace-permissions) ドキュメントを参照してください。
