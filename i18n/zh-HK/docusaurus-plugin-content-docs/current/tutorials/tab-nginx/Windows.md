### 使用自簽憑證及Nginx在Windows上運行（不使用Docker）

對於基本的內部/開發安裝，您可以使用nginx和自簽憑證對Open WebUI進行代理，從而支持https，允許使用像LAN中的麥克風輸入這樣的功能。（默認情況下，大多數瀏覽器不允許在不安全的非localhost URL上使用麥克風輸入）

本指南假設您使用pip安裝了Open WebUI並運行`open-webui serve`

#### 第一步：安裝openssl以生成憑證

首先您需安裝openssl

您可以從[Shining Light Productions (SLP)](https://slproweb.com/)網站下載和安裝預編譯的二進制文件。

或者，若您已安裝[Chocolatey](https://chocolatey.org/)，可以快速使用它來安裝OpenSSL：

1. 打開命令提示符或PowerShell。
2. 運行以下命令以安裝OpenSSL：
   ```bash
   choco install openssl -y
   ```

---

### **驗證安裝**
安裝完成後，打開命令提示符並輸入：
```bash
openssl version
```
若顯示OpenSSL版本（例如，`OpenSSL 3.x.x ...`），則表示安裝成功。

#### 第二步：安裝nginx

從[nginx.org](https://nginx.org)下載官方的Windows版Nginx，或者使用像Chocolatey這樣的包管理工具。
 將下載的ZIP文件解壓到某個目錄（例如C:\nginx）。

#### 第三步：生成憑證

運行以下命令：

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

將生成的nginx.key和nginx.crt文件移動到任意選定的文件夾或C:\nginx目錄。

#### 第四步：配置nginx

用文本編輯器開啟C:\nginx\conf\nginx.conf

如需讓Open WebUI通過本地局域網訪問，請使用`ipconfig`查看您的局域網IP地址，例如192.168.1.15

設置如下：

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

    #log_format  main  $remote_addr - $remote_user [$time_local] "$request" 
    #                  $status $body_bytes_sent "$http_referer" 
    #                  "$http_user_agent" "$http_x_forwarded_for";

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  120;

    #gzip  on;

    # 用於正確處理websockets（流式）
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # 重定向所有HTTP流量至HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # 處理HTTPS流量
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL設置（確認路徑正確）
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # 將流量代理至您的本地服務
        location / {
            # proxy_pass應指向您正在本地運行的open-webui版本
            proxy_pass http://localhost:8080;

            # 增加WebSocket支持（自版本0.5.0起需要）
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            #（可選）禁用代理緩衝以更好地支持模型的流式響應
            proxy_buffering off;

            #（可選）增加最大請求大小以支持大型附件及長音頻消息
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

保存文件，並通過運行`nginx -t`檢查配置文件是否無錯誤或語法問題。根據您的安裝方式可能需要先運行`cd C:\nginx`。

通過運行`nginx`啟動nginx。如果已經有nginx服務運行，可通過運行`nginx -s reload`重新加載配置。

---

您現在應能通過https://192.168.1.15（或您的局域網IP）訪問Open WebUI。請根據需要允許Windows防火牆訪問。
