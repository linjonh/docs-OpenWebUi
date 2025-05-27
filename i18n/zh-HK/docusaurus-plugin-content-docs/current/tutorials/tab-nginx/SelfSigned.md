### 自簽證書


使用自簽證書適合於開發或內部使用，在此情況下信任不是關鍵問題。

#### 操作步驟

1. **建立 Nginx 文件目錄：**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **建立 Nginx 配置文件：**

    **`conf.d/open-webui.conf`：**

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

            # （可選）禁用代理緩衝以提高模型流式響應性能
            proxy_buffering off;

            # （可選）增加最大請求大小以支持較大的附件和較長的音頻消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **生成自簽 SSL 證書：**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **更新 Docker Compose 配置：**

    在 `docker-compose.yml` 添加 Nginx 服務：

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

5. **啟動 Nginx 服務：**

    ```bash
    docker compose up -d nginx
    ```

#### 訪問 WebUI

通過 HTTPS 訪問 Open WebUI：

[https://your_domain_or_IP](https://your_domain_or_IP)

---
