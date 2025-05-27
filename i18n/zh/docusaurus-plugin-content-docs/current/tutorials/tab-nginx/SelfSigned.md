### 自签名证书


使用自签名证书适用于开发或内部使用的场景，在这些场景中信任问题不是关键性考虑。

#### 步骤

1. **为 Nginx 文件创建目录：**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **创建 Nginx 配置文件：**

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

            # （可选）禁用代理缓冲以更好地从模型流式响应
            proxy_buffering off;

            # （可选）增加最大请求大小以支持大附件及长音频消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **生成自签名 SSL 证书：**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **更新 Docker Compose 配置：**

    在 `docker-compose.yml` 中添加 Nginx 服务：

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

5. **启动 Nginx 服务：**

    ```bash
    docker compose up -d nginx
    ```

#### 访问 WebUI

通过 HTTPS 访问 Open WebUI 地址：

[https://your_domain_or_IP](https://your_domain_or_IP)

---
