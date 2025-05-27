---
sidebar_position: 40
title: "🔗 Okta OIDC SSO 統合"
---

:::warning
このチュートリアルはコミュニティの貢献により提供されており、Open WebUIチームによるサポートはありません。このチュートリアルは、Open WebUIを特定の利用ケースにカスタマイズする方法を示すデモとして提供されています。貢献したい場合は、貢献チュートリアルをチェックしてください。
:::

# 🔗 Okta OIDC SSO 統合

## 概要

このドキュメントページでは、Okta OIDC シングルサインオン (SSO) と Open WebUI を統合するために必要な手順を説明します。また、Okta グループメンバーシップに基づく Open WebUI ユーザーグループ管理の**オプション**機能、**ジャストインタイム (JIT) グループ生成**を含む方法についても説明します。これらの手順に従うことで、ユーザーは Okta 資格情報を使用して Open WebUI にログインできるようになります。グループ同期 (`ENABLE_OAUTH_GROUP_MANAGEMENT`) を有効にする場合、各ログイン時に Okta のグループに基づいて Open WebUI 内の関連グループにユーザーが自動的に割り当てられます。また、JIT グループ生成 (`ENABLE_OAUTH_GROUP_CREATION`) も有効にすると、ログイン時に Okta の請求に存在するが Open WebUI に存在しないグループが自動的に作成されます。

### 前提条件

* 新規または既存の Open WebUI インスタンス。
* アプリケーションを作成および構成する管理権限を持つ Okta アカウント。
* OIDC、Okta アプリケーション構成、および Open WebUI 環境変数の基本的な理解。

## Okta のセットアップ

まず、Okta 組織内で OIDC アプリケーションを構成し、グループ情報を Open WebUI に渡すグループ請求を設定する必要があります。

### 1. Okta で OIDC アプリケーションを作成/構成

1. Okta 管理コンソールにログインします。
2. **Applications > Applications** に移動します。
3. 新しい **OIDC - OpenID Connect** アプリケーションを作成する（**Web Application** をタイプとして選択）、または Open WebUI に使用したい既存のアプリケーションを選択します。
4. 設定中またはアプリケーションの **General** 設定タブで、**Sign-in redirect URIs** を構成します。Open WebUI インスタンスの URI の後に `/oauth/oidc/callback` を追加します。例: `https://your-open-webui.com/oauth/oidc/callback`。
5. アプリケーションの **General** タブで提供される **Client ID** と **Client secret** をメモします。これらは Open WebUI の設定で必要になります。
6. **Assignments** タブで、このアプリケーションに割り当てる正しいユーザーまたはグループを確保します。

### 2. ID トークンにグループ請求を追加

**(オプション)** Okta のグループに基づいて Open WebUI で自動グループ管理を有効にするために、Okta を構成して ID トークン内でユーザーのグループメンバーシップを送信する必要があります。SSO ログインのみが必要で、Open WebUI 内でグループを手動で管理する方が良い場合、このセクションをスキップできます。

1. 管理コンソールで **Applications > Applications** に移動し、OIDC クライアントアプリを選択します。
2. **Sign On** タブに移動し、**OpenID Connect ID Token** セクションで **Edit** をクリックします。
3. **Group claim type** セクションで **Filter** を選択します。
4. **Group claims filter** セクションで:
   * 請求名として `groups` を入力します（既定値がある場合はそれを使用）。
   * ドロップダウンから **Matches regex** を選択します。
   * 正規表現フィールドに `.*` を入力します。これにより、ユーザーが所属しているすべてのグループが含まれます。必要に応じて、より具体的な正規表現を使用することができます。
5. **Save** をクリックします。
6. **Back to applications** リンクをクリックします。
7. アプリケーションの **More** ボタンのドロップダウンメニューから **Refresh Application Data** をクリックします。

*より高度なグループ請求構成については、Okta の[トークンのカスタマイズ](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/)および[グループ関数](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions)に関するドキュメントを参照してください。*

## Open WebUI の構成

Open WebUI で Okta OIDC SSO を有効にするには、次の基本的な環境変数を設定する必要があります。オプションのグループ管理機能を有効にする場合は追加の変数が必要です。

```bash
# --- OIDC コア設定 ---
# Okta を介してユーザーがアカウントを作成できるようにする場合は、OAuth サインアップを有効にします
# ENABLE_OAUTH_SIGNUP="true"

# Okta アプリケーションの Client ID
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# Okta アプリケーションの Client Secret
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# Okta 組織の OIDC ディスカバリー URL
# フォーマット: https://<your-okta-domain>/.well-known/openid-configuration
# または特定の認証サーバーの場合: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# ログインボタンに表示される名前（例: "Login with Okta"）
OAUTH_PROVIDER_NAME="Okta"

# 要求するスコープ（既定では通常十分です）
# OAUTH_SCOPES="openid email profile groups" # 既定値でない場合は groups を含めること

# --- OAuth グループ管理（オプション） ---
# グループ請求を Okta に構成した場合のみ "true" に設定します (ステップ 2)
# そして、ログイン時にOktaグループに基づいてOpen WebUIグループが管理されることを望む場合。
# これにより既存のグループが同期されます。ユーザーはOpen WebUIグループに追加/削除され、
# 彼らのOktaグループクレームに一致するようになります。
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# ENABLE_OAUTH_GROUP_MANAGEMENT が true の場合のみ必要です。
# グループ情報を含むIDトークン内のクレーム名 (Okta設定と一致する必要があります)
# OAUTH_GROUP_CLAIM="groups"

# オプション: Oktaのクレームに存在するがOpen WebUIに存在しないグループを即時作成（Just-in-Time, JIT）で作成を有効にする。
# ENABLE_OAUTH_GROUP_MANAGEMENT="true" が必要です。
# false（デフォルト）に設定すると、既存のグループのみが同期されます。
# ENABLE_OAUTH_GROUP_CREATION="false"
```

`YOUR_OKTA_CLIENT_ID`、`YOUR_OKTA_CLIENT_SECRET`、および `YOUR_OKTA_OIDC_DISCOVERY_URL` をOktaアプリケーション設定から取得した実際の値に置き換えてください。

Oktaクレームに基づいたグループ同期を有効にするには、`ENABLE_OAUTH_GROUP_MANAGEMENT="true"` を設定し、`OAUTH_GROUP_CLAIM` がOktaで設定されたクレーム名と一致することを確認します（デフォルトは `groups` です）。

Oktaに存在し、Open WebUIにまだ存在しないグループを自動で即時作成（JIT）するには、`ENABLE_OAUTH_GROUP_CREATION="true"` を設定します。既存のOpen WebUIグループのメンバーシップのみを管理したい場合は、この設定を `false` のままにしておくことができます。

:::warning グループメンバーシップ管理
`ENABLE_OAUTH_GROUP_MANAGEMENT` が `true` に設定されると、Open WebUI内のユーザーのグループメンバーシップは、Oktaクレームで受け取ったグループと**厳密に同期**されます。つまり:
* ユーザーはOktaクレームに一致するOpen WebUIグループに**追加**されます。
* Oktaクレームに存在しないグループについては、Open WebUI内のいかなるグループからも（手動作成またはOpen WebUI内で割り当てたグループを含めて）**削除**されます。

必要なすべてのグループがOkta内で正しく設定され、グループクレームに含まれていることを確認してください。
:::

:::info マルチノードデプロイメントにおけるセッションの永続性

Open WebUIを複数ノード（例: Kubernetesクラスタまたはロードバランサ経由）にデプロイする際、特にSSOの場合、ユーザー体験のシームレスさを確保するためにセッションの永続性が重要です。`WEBUI_SECRET_KEY` 環境変数を**すべての** Open WebUIインスタンスで**同一の安全かつユニークな値**に設定してください。
:::

```bash
# 例: 強力な秘密キーを生成 (例: openssl rand -hex 32 を使用して)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

このキーがすべてのノードで一貫していない場合、セッショントークンが他のノードで有効にならないため、異なるノードにルーティングされた場合にユーザーはログインを再度要求される可能性があります。デフォルトでは、Dockerイメージは初回スタート時にランダムキーを生成しますが、これはマルチノード設定には適していません。

:::tip 標準ログインフォームの無効化

Okta（および潜在的には他の設定されたOAuthプロバイダー）を使用したログインのみを許可する場合、以下の環境変数を設定することで標準のメール/パスワードログインフォームを無効にできます:
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger 重要な前提条件
`ENABLE_LOGIN_FORM="false"` を設定するには、`ENABLE_OAUTH_SIGNUP="true"` も設定する必要があります。ログインフォームを無効にしOAuthサインアップを有効にしない場合、**ユーザー（管理者を含む）がログインできなくなります。** 少なくとも1つのOAuthプロバイダーが構成され、`ENABLE_OAUTH_SIGNUP` が有効に設定されていることを確認してください。
:::

これらの環境変数を設定した後、Open WebUIインスタンスを再起動してください。

## 検証

1. Open WebUIログインページに移動します。`OAUTH_PROVIDER_NAME` に設定されている値に基づいた「Oktaでログイン」というラベルの付いたボタンが表示されるべきです。
2. ボタンをクリックして、Oktaログインフローを通じて認証を行います。
3. 認証が成功すると、Open WebUIに戻りログインされます。
4. `ENABLE_OAUTH_GROUP_MANAGEMENT` がtrueの場合、非管理者ユーザーとしてログインしてください。Open WebUI内の彼らのグループは現在のOktaグループメンバーシップを厳密に反映するはずです（Oktaクレームにないグループメンバーシップは削除されます）。`ENABLE_OAUTH_GROUP_CREATION` もtrueの場合、Oktaクレームに存在し、以前にOpen WebUIに存在しなかったグループが自動的に作成されているはずです。管理者ユーザーのグループはSSOを通じて自動的に更新されません。
5. OIDCまたはグループ関連のエラーが発生した場合、Open WebUIサーバーログを確認してください。

## トラブルシューティング

* **400 Bad Request/リダイレクトURIの不一致:** Oktaアプリケーションの**サインインリダイレクトURI**が`<your-open-webui-url>/oauth/oidc/callback`と正確に一致していることを再確認してください。
* **グループが同期されない:** `OAUTH_GROUP_CLAIM` 環境変数がOktaのIDトークン設定で構成されたクレーム名と一致していることを確認してください。グループの変更後にユーザーがログアウトして再ログインしたことを確認してください - OIDCを更新するにはログインフローが必要です。管理者グループは同期されないことを忘れないでください。
*   **設定エラー:** OIDC設定に関する詳細なエラーメッセージについては、Open WebUIサーバーログを確認してください。
*   公式の[Open WebUI SSO ドキュメント](/features/sso.md)を参照してください。
*   [Okta開発者ドキュメント](https://developer.okta.com/docs/)を参照してください。