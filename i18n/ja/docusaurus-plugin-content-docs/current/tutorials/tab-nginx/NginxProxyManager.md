### Nginx Proxy Manager

Nginx Proxy Manager (NPM) は、Open WebUI のようなローカルアプリケーションを、Lets Encrypt の有効な SSL 証明書を使用して簡単に管理し、安全にリバースプロキシすることができます。
この設定により、HTTPS アクセスが可能になり、多くのモバイルブラウザで音声入力機能を使用するために必要なセキュリティ要件を満たしつつ、アプリケーション固有のポートを直接インターネットに公開することなく使用できます。

#### 前提条件

- Docker を実行しているホームサーバーと open-webui コンテナが動作していること。
- ドメイン名（DuckDNS のような無料オプション、Namecheap や GoDaddy のような有料オプション）。
- Docker と DNS 設定に関する基本的な知識。

#### 手順

1. **Nginx ファイル用ディレクトリを作成:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Docker を使用して Nginx Proxy Managerをセットアップ:**

    ```bash
    nano docker-compose.yml
    ```

```yaml
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 81:81
      - 443:443
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

コンテナを実行:
```bash
docker-compose up -d
```
3. **DNSとドメインを設定:**

    * ドメインプロバイダー（例: DuckDNS）にログインしてドメインを作成します。
    * ドメインをプロキシのローカルIPに指定します（例: 192.168.0.6）。
    * DuckDNSを使用する場合は、ダッシュボードからAPIトークンを取得します。

###### 以下は https://www.duckdns.org/domains の簡単な例です:
    
4. **SSL証明書を設定:**
* http://server_ip:81 で Nginx Proxy Manager にアクセスします。 例: ``192.168.0.6:81``
* デフォルトの資格情報（admin@example.com / changeme）でログインし、要求されたら変更します。
* SSL 証明書 → SSL 証明書の追加 → Lets Encrypt に進みます。
* DuckDNSで取得したメールアドレスとドメイン名を記入します。一つのドメイン名にはアスタリスクが含まれ、もう一つのドメインには含まれていません。例: ``*.hello.duckdns.org`` と ``hello.duckdns.org``。
* DNSチャレンジを使用するオプションを選択し、DuckDNSを選んでAPIトークンを貼り付けます。 例: 
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Let’s Encrypt の利用規約に同意して保存します。必要に応じて伝播時間を変更します (**120秒**の場合あり)。

5. **プロキシホストを作成:**
* 各サービス (例: openwebui、nextcloud) のために、Hosts → Proxy Hosts → Add Proxy Host に進みます。
* ドメイン名（例: openwebui.hello.duckdns.org）を入力します。
* スキームをHTTPに設定（デフォルト）し、``Websockets support`` を有効にし、Docker IPを指定します（nginx manager と open-webui が同じコンピュータで動作する場合は、前述のIPと同じになります。例: ``192.168.0.6``）
* 先ほど生成したSSL証明書を選択し、SSLを強制し、HTTP/2を有効にします。
6. **open-webuiへのURLを追加（HTTPSエラー回避のため）:**

* ご自身のopen-webui → 管理パネル → 設定 → 一般 に移動します。
* **Webhook URL**テキストフィールドに、Nginx リバースプロキシ経由で open-webui に接続する際のURLを入力します。例: ``hello.duckdns.org`` （これは必須ではない）または ``openwebui.hello.duckdns.org`` （これは必須）。

#### WebUIへのアクセス:

HTTPS経由でOpen WebUIにアクセスします。例: ``hello.duckdns.org`` または ``openwebui.hello.duckdns.org``（設定に応じて）。

###### ファイアウォールに関する注意: ローカルファイアウォールソフトウェア（Portmasterなど）が Dockerの内部ネットワークトラフィックや必要なポートをブロックする可能性があります。この設定が機能しない場合は、問題解決のためにファイアウォールルールを確認してください。
