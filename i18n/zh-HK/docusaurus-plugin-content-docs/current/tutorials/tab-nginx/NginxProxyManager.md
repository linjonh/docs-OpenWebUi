### Nginx Proxy Manager

Nginx Proxy Manager (NPM) 可讓您輕鬆管理反向代理，並透過 Lets Encrypt 為您的本地應用程序（例如 Open WebUI）安全加密生成有效的 SSL 證書。
此設置啟用 HTTPS 訪問，可滿足許多移動瀏覽器使用語音輸入功能的安全要求，同時不用直接將應用程序的特定端口暴露至互聯網。

#### 前置條件

- 一台運行 Docker 的家庭服務器並且啟動 open-webui 容器。
- 一個域名（免費選擇如 DuckDNS 或付費選擇如 Namecheap/GoDaddy）。
- 基本的 Docker 和 DNS 配置知識。

#### 步驟

1. **為 Nginx 文件創建目錄：**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **使用 Docker 設置 Nginx Proxy Manager：**

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

啟動容器：
```bash
docker-compose up -d
```
3. **配置 DNS 和域名：**

    * 登錄到您的域名提供商（例如 DuckDNS）並創建一個域名。
    * 將域名指向您的代理的本地 IP（例如 192.168.0.6）。
    * 如果使用 DuckDNS，從其控制台獲取 API token。

###### 以下是如何在 https://www.duckdns.org/domains 執行簡單操作的示例：
    
4. **設置 SSL 證書：**
* 訪問 Nginx Proxy Manager 的網址 http://server_ip:81。例如：``192.168.0.6:81``
* 使用默認憑據登錄（admin@example.com / changeme），按要求更改憑據。
* 前往 SSL Certificates → Add SSL Certificate → Lets Encrypt。
* 輸入您的電子郵件和來自 DuckDNS 的域名。一個域包含星號，另一個不包含。示例：``*.hello.duckdns.org`` 和 ``hello.duckdns.org``。
* 選擇 Use a DNS challenge，選擇 DuckDNS，並粘貼您的 API token。例如：
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* 同意 Let’s Encrypt 規約並保存。如有需要更改傳播時間（如 120 秒）。

5. **創建代理主機：**
* 對於每個服務（例如 openwebui, nextcloud），前往 Hosts → Proxy Hosts → Add Proxy Host。
* 填寫域名（例如 openwebui.hello.duckdns.org）。
* 設置 scheme 為 HTTP（默認），啟用 ``Websockets support``，並指向您的 Docker IP（如果 Docker 和 open-webui 運行在同一台計算機上，則為前面提到的 IP，例如 ``192.168.0.6``）。
* 選擇之前生成的 SSL 證書，強制 SSL，並啟用 HTTP/2。
6. **將您的 URL 添加到 open-webui（否則會遇到 HTTPS 錯誤）：**

* 前往您的 open-webui → Admin Panel → Settings → General
* 在 **Webhook URL** 文本字段中，輸入您的 URL，通過 Nginx 反向代理連接到您的 open-webui。例如：``hello.duckdns.org``（此非必要）或 ``openwebui.hello.duckdns.org``（此必需）。

#### 訪問 WebUI：

通過 HTTPS 訪問 Open WebUI，地址為 ``hello.duckdns.org`` 或 ``openwebui.hello.duckdns.org``（按照您的設置方式）。

###### 防火牆注意：請注意，本地防火牆軟件（如 Portmaster）可能會阻止內部 Docker 網絡流量或必需端口。如果您遇到問題，請檢查防火牆規則以確保此設置所需的通信被允許。
