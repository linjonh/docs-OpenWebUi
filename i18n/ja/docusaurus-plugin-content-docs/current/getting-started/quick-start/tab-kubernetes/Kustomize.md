
# KubernetesのためのKustomizeセットアップ

KustomizeはKubernetes YAML構成をカスタマイズするためのツールです。

## 前提条件

- Kubernetesクラスタがセットアップ済み。
- Kustomizeがインストールされている。

## 手順

1. **Open WebUI Manifestsをクローンする:**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Manifestsを適用する:**

   ```bash
   kubectl apply -k .
   ```

3. **インストールの確認:**

   ```bash
   kubectl get pods
   ```

:::警告

Open WebUIを複数のノードやポッド、ワーカーを使用するクラスタ環境でスケールさせる場合、NoSQLキー値データベースをセットアップする必要があります。
すべてのサービスインスタンス間で同じ値に設定する必要があるいくつかの[環境変数](https://docs.openwebui.com/getting-started/env-configuration/)があります。これが正しく設定されない場合、一貫性の問題、セッションのエラー、その他の問題が発生する可能性があります！

:::

## WebUIにアクセスする

クラスタ外部からOpen WebUIにアクセスするために、ポート転送やロードバランシングを設定してください。
