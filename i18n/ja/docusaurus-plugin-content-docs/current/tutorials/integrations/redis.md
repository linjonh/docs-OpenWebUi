---
sidebar_position: 30
title: "🔗 Redis Websocket対応"
---

:::warning
このチュートリアルはコミュニティからの提供であり、Open WebUIチームによるサポートはありません。特定の使用例に応じたOpen WebUIのカスタマイズ方法を示すデモとしての役割を果たしています。寄稿したい方はこちらの寄稿チュートリアルをご覧ください。
:::

# 🔗 Redis Websocket対応

## 概要

このドキュメントページでは、Open WebUIにRedisを統合してWebsocket対応させる手順を説明します。この手順を実施することで、Open WebUIインスタンスにWebsocket機能を有効化し、クライアントとアプリケーション間でリアルタイムの通信と更新を可能にします。

### 前提条件

* 有効なOpen WebUIインスタンス（バージョン1.0以上が動作している必要あり）
* Redisコンテナ（ここでは最新のRedis 7.xリリースを基にした`docker.io/valkey/valkey:8.0.1-alpine`を使用します）
* Docker Compose（バージョン2.0以上）がシステムにインストールされている必要あり
* Open WebUIとRedis間の通信に必要なDockerネットワーク
* Docker、Redis、Open WebUIの基本的な知識

## Redisのセットアップ

RedisをWebsocket対応させるには、以下の内容を含む`docker-compose.yml`ファイルを作成する必要があります：

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info メモ

`ports`ディレクティブはこの構成に含まれていませんが、大半の場合必要ありません。RedisサービスはDockerネットワーク内でOpen WebUIサービスからアクセス可能です。しかし、Dockerネットワーク外からRedisインスタンスにアクセスする必要がある場合（例：デバッグや監視目的）、`ports`ディレクティブを追加してRedisポート（例：`6379:6379`）を公開できます。

上記の構成では、`redis-valkey`という名前のRedisコンテナをセットアップし、データ永続化のためにボリュームをマウントします。また、`healthcheck`ディレクティブは`ping`コマンドに応答できない場合にコンテナを再起動するよう設定されます。`--save 30 1`コマンドオプションは、少なくとも1つのキーが変更された場合に30分ごとにRedisデータベースをディスクに保存します。

:::

Open WebUIとRedis間で通信するためのDockerネットワークを作成するには、以下のコマンドを実行します：

```bash
docker network create openwebui-network
```

## Open WebUIの構成

Open WebUIでWebsocketを有効化するには、インスタンスに以下の環境変数を設定する必要があります：

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

これらの環境変数はWebsocketを有効化し、RedisをWebsocketマネージャーとして指定し、RedisのURLを定義します。`WEBSOCKET_REDIS_URL`の値は、Redisインスタンスの実際のIPアドレスに置き換える必要があります。

Dockerを使用してOpen WebUIを実行する場合、同じDockerネットワークに接続する必要があります：

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

`127.0.0.1`をDockerネットワーク内のRedisコンテナの実際のIPアドレスで置き換えてください。

## 検証

Redisを適切にセットアップし、Open WebUIを構成している場合、Open WebUIインスタンスを起動すると以下のログメッセージが表示されます：

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

これにより、Open WebUIがWebsocket管理にRedisを使用していることが確認できます。また、`docker exec`コマンドを使用してRedisインスタンスが稼働していることを確認することもできます：

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

このコマンドは、Redisインスタンスが正常に稼働している場合、`PONG`という出力を返します。このコマンドが失敗した場合は、以下のコマンドを試してください：

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## トラブルシューティング

RedisやOpen WebUIのWebsocket対応に問題が発生した場合は、以下のリソースを参考にしてください：

* [Redis ドキュメント](https://redis.io/docs)
* [Docker Compose ドキュメント](https://docs.docker.com/compose/overview/)
* [sysctl ドキュメント](https://man7.org/linux/man-pages/man8/sysctl.8.html)
