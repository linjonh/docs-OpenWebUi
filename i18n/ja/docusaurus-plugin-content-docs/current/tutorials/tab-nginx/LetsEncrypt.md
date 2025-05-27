### Lets Encrypt

Lets Encryptは、ほとんどのブラウザに信頼される無料のSSL証明書を提供しており、本番環境に適しています。

#### 前提条件

- **Certbot**がシステムにインストールされていること。
- DNSレコードが正しく設定され、サーバーにポイントしていること。

#### 手順

1. **Nginxファイル用のディレクトリを作成する:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx設定ファイルを作成する:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # WebSocketサポートを追加（バージョン0.5.0以降で必要）
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # （オプション）モデルから流れる応答を改善するためにプロキシバッファリングを無効化
            proxy_buffering off;

            # （オプション）大きな添付ファイルや長い音声メッセージのための最大リクエストサイズを増加
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **簡易Lets Encryptスクリプト:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # 説明: Certbotを使用してLets Encrypt SSL証明書を取得、インストールする簡易スクリプト。

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # Certbotをインストール（インストールされていない場合）
    if ! command -v certbot &> /dev/null; then
        echo "Certbotが見つかりません。インストール中..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # SSL証明書を取得
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Nginxを再起動して変更を適用
    sudo systemctl reload nginx

    echo "Lets Encrypt SSL証明書がインストールされ、Nginxが再起動されました。"
    ```

    **スクリプトを実行可能にする:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Docker Composeの設定を更新:**

    `docker-compose.yml`にNginxサービスを追加:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "80:80"
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Nginxサービスを開始:**

    ```bash
    docker compose up -d nginx
    ```

6. **Lets Encryptスクリプトを実行:**

    SSL証明書を取得しインストールするスクリプトを実行:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### WebUIにアクセス

HTTPS経由でOpen WebUIにアクセス:

[https://your_domain_or_IP](https://your_domain_or_IP)
