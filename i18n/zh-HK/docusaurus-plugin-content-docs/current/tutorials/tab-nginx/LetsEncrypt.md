### Lets Encrypt

Lets Encrypt 提供免費的 SSL 憑證，大多數瀏覽器皆信任，非常適合用於生產環境。

#### 先決條件

- **Certbot** 已安裝於您的系統中。
- DNS 記錄已正確配置為指向您的伺服器。

#### 步驟

1. **為 Nginx 文件創建目錄：**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **創建 Nginx 配置文件：**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # 添加 WebSocket 支援（適用於 0.5.0 及以上版本）
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # （可選）禁用代理緩衝以改善模型的串流響應
            proxy_buffering off;

            # （可選）增加最大請求大小以支援大型附件和長語音消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **簡化 Lets Encrypt 腳本：**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # 描述：使用 Certbot 獲取並安裝 Lets Encrypt SSL 憑證的簡化腳本。

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # 如果 Certbot 未安裝，則安裝它
    if ! command -v certbot &> /dev/null; then
        echo "未找到 Certbot。正在安裝..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # 獲取 SSL 憑證
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # 重新加載 Nginx 以應用更改
    sudo systemctl reload nginx

    echo "Lets Encrypt SSL 憑證已安裝且 Nginx 已重新加載。"
    ```

    **使腳本可執行：**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **更新 Docker Compose 配置：**

    向您的 `docker-compose.yml` 中添加 Nginx 服務：

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

5. **啟動 Nginx 服務：**

    ```bash
    docker compose up -d nginx
    ```

6. **運行 Lets Encrypt 腳本：**

    執行腳本以獲取並安裝 SSL 憑證：

    ```bash
    ./enable_letsencrypt.sh
    ```

#### 訪問 WebUI

通過 HTTPS 訪問 Open WebUI：

[https://your_domain_or_IP](https://your_domain_or_IP)
