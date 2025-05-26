### 在Windows上使用自签名证书和Nginx（不使用Docker）

对于基本的内部或开发安装，您可以使用nginx和自签名证书来将Open WebUI代理到https，从而在局域网内使用麦克风输入等功能。（默认情况下，大多数浏览器不会允许在不安全的非localhost URL上使用麦克风输入）

本指南假定您使用pip安装了Open WebUI，并正在运行`open-webui serve`

#### 第一步：安装openssl以生成证书

您首先需要安装openssl。

您可以从[Shining Light Productions (SLP)](https://slproweb.com/)网站下载并安装预编译的二进制文件。

或者，如果您已经安装了[Chocolatey](https://chocolatey.org/)，可以使用它快速安装OpenSSL：

1. 打开命令提示符或PowerShell。
2. 运行以下命令安装OpenSSL：
   ```bash
   choco install openssl -y
   ```

---

### **验证安装**
安装完成后，打开命令提示符并输入：
```bash
openssl version
```
如果显示OpenSSL版本（例如，`OpenSSL 3.x.x ...`），则表示安装成功。

#### 第二步：安装nginx

从[nginx.org](https://nginx.org)下载官方Windows版Nginx，或使用像Chocolatey这样的包管理器下载。
将下载的ZIP文件解压到一个目录（例如，C:\nginx）。

#### 第三步：生成证书

运行以下命令：

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

将生成的nginx.key和nginx.crt文件移动到您选择的文件夹，或移动到C:\nginx目录。

#### 第四步：配置nginx

使用文本编辑器打开C:\nginx\conf\nginx.conf。

如果您希望Open WebUI能够通过局域网访问，请使用`ipconfig`确定您的局域网IP地址，例如192.168.1.15。

按以下方式进行设置：

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  120;

    #gzip  on;

    # 处理WebSocket（流式）所需的设置
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    # 将所有HTTP流量重定向到HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # 处理HTTPS流量
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL 设置（确保路径正确）
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # 将流量代理到本地服务
        location / {
            # proxy_pass应指向您运行的localhost版本的open-webui
            proxy_pass http://localhost:8080;

            # 添加WebSocket支持（版本0.5.0及以上所需）
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            #（可选）禁用代理缓冲以增强模型的流式响应
            proxy_buffering off;

            #（可选）增加最大请求大小以支持较大的附件和长音频消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

保存文件，并通过运行`nginx -t`检查配置是否没有错误或语法问题。根据您的安装方式，您可能需要先运行`cd C:\nginx`。

运行nginx，通过运行`nginx`启动服务。如果已有nginx服务启动，可以运行`nginx -s reload`重新加载新的配置。

---

您现在应该能够通过https://192.168.1.15（或您的局域网IP地址）访问Open WebUI。请确保根据需要允许Windows防火墙访问。
