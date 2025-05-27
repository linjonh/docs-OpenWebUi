### 自己署名証明書


自己署名証明書を使用するのは、信頼性が重要な懸念事項でない開発や内部利用に適しています。

#### 手順

1. **Nginxファイル用ディレクトリを作成する:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx構成ファイルを作成する:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name your_domain_or_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (任意) モデルからのストリーミングレスポンスを向上させるためにプロキシバッファリングを無効化
            proxy_buffering off;

            # (任意) 大きな添付ファイルや長い音声メッセージのために最大リクエストサイズを増加
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **自己署名SSL証明書を生成する:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **Docker Composeの構成を更新する:**

    `docker-compose.yml`にNginxサービスを追加する:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Nginxサービスを開始する:**

    ```bash
    docker compose up -d nginx
    ```

#### WebUIにアクセス

Open WebUIにHTTPSを介してアクセスする:

[https://your_domain_or_IP](https://your_domain_or_IP)

---
