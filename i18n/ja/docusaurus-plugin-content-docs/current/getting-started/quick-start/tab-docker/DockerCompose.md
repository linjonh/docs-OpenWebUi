# Docker Compose セットアップ

Docker Composeを利用することで、複数のコンテナを使用するDockerアプリケーションの管理が簡単になります。

Dockerがインストールされていない場合は、こちらの[Dockerインストールチュートリアル](../../../tutorials/docker-install.md)をご確認ください。

Docker Composeには追加パッケージ`docker-compose-v2`が必要です。

**警告:** 古いDocker Composeチュートリアルではバージョン1の構文が参照されることがあり、`docker-compose build`のようなコマンドが使われています。バージョン2の構文を利用してください。例えば`docker compose build`のようにスペースを使用します（ハイフンではなくスペースに注意してください）。

## `docker-compose.yml`の例

Docker Composeを使用してOpen WebUIを設定する例の構成ファイルは以下の通りです:

```yaml
version: '3'
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## サービスの起動

サービスを開始するには、以下のコマンドを実行してください:

```bash
docker compose up -d
```

## ヘルパースクリプト

コードベースには`run-compose.sh`という便利なヘルパースクリプトが含まれています。このスクリプトは、デプロイメントに含めるDocker Composeファイルを選択し、セットアッププロセスを効率化するのに役立ちます。

---

**注意:** Nvidia GPUをサポートするには、イメージを`ghcr.io/open-webui/open-webui:main`から`ghcr.io/open-webui/open-webui:cuda`に変更し、以下の内容を`docker-compose.yml`ファイルのサービス定義に追加してください:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

この設定により、アプリケーションが利用可能な場合にGPUリソースを活用できるようになります。
