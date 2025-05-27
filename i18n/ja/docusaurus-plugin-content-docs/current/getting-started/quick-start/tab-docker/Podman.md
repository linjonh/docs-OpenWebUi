
# Podmanの使用

Podmanは、OCIコンテナを開発、管理、実行するためのデーモンレスなコンテナエンジンです。

## 基本コマンド

- **コンテナを実行する：**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **実行中のコンテナの一覧：**

  ```bash
  podman ps
  ```

## Podmanでのネットワーキング

ネットワーク問題が発生した場合、slirp4netnsを使用してポッドのネットワーク設定を調整し、コンテナがコンピューターのポートにアクセスできるようにしてください。

[slirp4netnsをインストール](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install)していることを確認し、存在する場合は`podman rm`で以前のコンテナを削除し、次のコマンドで新しいコンテナを開始します。

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

PC上でOllamaを使用している場合（コンテナ内で実行していない場合）、

open-webui内に入ったら、[設定] > [管理設定] > [接続] に移動し、新しいOllama API接続を`http://10.0.2.2:[OLLAMA PORT]`として作成します。デフォルトでは、Ollamaのポートは11434です。


Podmanの[ドキュメント](https://podman.io/)を参照して、高度な設定を確認してください。
