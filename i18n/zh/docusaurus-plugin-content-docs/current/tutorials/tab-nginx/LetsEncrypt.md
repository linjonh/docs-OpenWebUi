### Lets Encrypt

Lets Encrypt 提供免费 SSL 证书，这些证书被大多数浏览器信任，非常适合生产环境。

#### 前提条件

- **Certbot** 已安装到您的系统中。
- DNS 记录已正确配置指向您的服务器。

#### 步骤

1. **为 Nginx 文件创建目录：**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **创建 Nginx 配置文件：**

    **`conf.d/open-webui.conf`：**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # 添加 WebSocket 支持（适用于版本 0.5.0 及更高版本）
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # （可选）禁用代理缓存，以便更好地流式传输模型响应
            proxy_buffering off;

            # （可选）增加最大请求大小，以支持较大的附件和长音频消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **简化版 Lets Encrypt 脚本：**

    **`enable_letsencrypt.sh`：**

    ```bash
    #!/bin/bash

    # 描述：使用 Certbot 获取和安装 Lets Encrypt SSL 证书的简化脚本。

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # 如果 Certbot 未安装，安装它
    if ! command -v certbot &> /dev/null; then
        echo "未找到 Certbot。正在安装..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # 获取 SSL 证书
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # 重载 Nginx 以应用更改
    sudo systemctl reload nginx

    echo "Lets Encrypt SSL 证书已安装且 Nginx 已重载。"
    ```

    **使脚本可执行：**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **更新 Docker Compose 配置：**

    将 Nginx 服务添加到您的 `docker-compose.yml` 文件中：

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

5. **启动 Nginx 服务：**

    ```bash
    docker compose up -d nginx
    ```

6. **运行 Lets Encrypt 脚本：**

    执行脚本以获取并安装 SSL 证书：

    ```bash
    ./enable_letsencrypt.sh
    ```

#### 访问 WebUI

通过 HTTPS 访问 Open WebUI：

[https://your_domain_or_IP](https://your_domain_or_IP)
