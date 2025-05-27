
# Kubernetes用Helmのセットアップ

HelmはKubernetesアプリケーションの管理を支援します。

## 前提条件

- Kubernetesクラスターがセットアップされています。
- Helmがインストールされています。

## 手順

1. **Open WebUI Helmリポジトリを追加:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Open WebUI Chartをインストール:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **インストールの確認:**

   ```bash
   kubectl get pods
   ```

:::警告

Open WebUIをクラスタ環境で複数のノード／Pod／ワーカーを使用してスケールする場合、NoSQLキー値データベースのセットアップが必要です。
全てのサービスインスタンスで同じ値に設定しなければならない[環境変数](https://docs.openwebui.com/getting-started/env-configuration/)があります。これを怠ると、一貫性の問題、不正なセッション、その他の問題が発生します！

:::

## WebUIへのアクセス

クラスター外部からOpen WebUIにアクセスするためにポートフォワーディングまたはロードバランシングを設定します。
