## Dockerでのクイックスタート 🐳

以下のステップに従ってDockerを使ってOpen WebUIをインストールします。

## ステップ1: Open WebUIイメージを取得

まず、GitHub Container Registryから最新のOpen WebUI Dockerイメージを取得します。

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## ステップ2: コンテナを実行

デフォルト設定でコンテナを実行します。このコマンドにはデータを永続的に保存するためのボリュームマッピングが含まれています。

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### 重要なフラグ

- **ボリュームマッピング (`-v open-webui:/app/backend/data`)**: データを永続的に保存します。これによりコンテナ再起動時のデータ損失を防ぎます。
- **ポートマッピング (`-p 3000:8080`)**: ローカルマシンのポート3000でWebUIを公開します。

### GPUサポートを使用する場合

Nvidia GPUサポートを利用するには、`--gpus all`を`docker run`コマンドに追加します。

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### シングルユーザーモード（ログインの無効化）

シングルユーザー設定でログイン画面をスキップするには、`WEBUI_AUTH`環境変数を`False`に設定します。

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
この変更後、シングルユーザーモードとマルチアカウントモードを切り替えることはできません。
:::

#### 高度な設定: 別サーバー上のOllamaへの接続

Open WebUIを別ホストにあるOllamaサーバーに接続するには、`OLLAMA_BASE_URL`環境変数を追加します。

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## WebUIにアクセスする

コンテナが稼働した後、以下のURLからOpen WebUIにアクセスできます。

[http://localhost:3000](http://localhost:3000)

Dockerの各フラグの詳細は、[Dockerのドキュメント](https://docs.docker.com/engine/reference/commandline/run/)を参照してください。
