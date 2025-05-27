## 更新中

ローカルのDockerインストールを最新バージョンに更新するには、**Watchtower**を使用するか、手動でコンテナを更新する方法があります。

### オプション1: Watchtowerを使用

[Watchtower](https://containrrr.dev/watchtower/)を使用すると、更新プロセスを自動化できます:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(`open-webui`を異なるコンテナ名に置き換えてください。)_

### オプション2: 手動更新

1. 現在のコンテナを停止して削除します:

   ```bash
   docker rm -f open-webui
   ```

2. 最新バージョンをプルします:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. コンテナを再起動します:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

どちらの方法でも、Dockerインスタンスを最新のビルドで更新して稼働させることができます。
