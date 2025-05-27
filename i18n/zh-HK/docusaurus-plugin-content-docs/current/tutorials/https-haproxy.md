---
sidebar_position: 201
title: "🔒 使用 HAProxy 配置 HTTPS"
---

:::warning
本教學由社群貢獻，並未受到 Open WebUI 團隊的支持。僅用作展示如何根據您的特定使用案例自訂 Open WebUI。如果希望貢獻？可以查看貢獻指南。
:::

# 為 Open WebUI 配置 HAProxy

HAProxy（高可用代理）是一種專業的負載均衡及反向代理解決方案，具有高度可配置性，設計目的是在資源消耗較低的情況下處理大量連接。欲了解更多資訊，請參見：https://www.haproxy.org/

## 安裝 HAProxy 和 Lets Encrypt

首先，安裝 HAProxy 和 Lets Encrypt 的 certbot：
### Redhat 衍生版
```sudo dnf install haproxy certbot openssl -y```
### Debian 衍生版
```sudo apt install haproxy certbot openssl -y```

## HAProxy 基本配置

HAProxy 的配置預設存儲於 ```/etc/haproxy/haproxy.cfg``` 文件。該文件包含所有決定 HAProxy 運行方式的配置指令。

HAProxy 與 Open WebUI 配合使用的基本配置非常簡單。

```
 #---------------------------------------------------------------------
# 全域設置
#---------------------------------------------------------------------
global
    # 將這些消息輸出到 /var/log/haproxy.log，您需要執行以下操作：
    #
    # 1）配置 syslog 接受網路日誌事件。這可以通過
    #    在 /etc/sysconfig/syslog 中添加 -r 選項完成。
    #
    # 2）配置 local2 事件記錄到 /var/log/haproxy.log 文件。
    #   您可以在 /etc/sysconfig/syslog 中添加以下行：
    #
    #    local2.*                       /var/log/haproxy.log
    #
    log         127.0.0.1 local2

    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
	
	#調整 dh-param 數值，如果太低
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# 通用默認設置，所有 listen 和 backend 每節將使用這些設置，
# 如果未在它們的區塊中指定
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       #except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    300s
    timeout queue           2m
    timeout connect         120s
    timeout client          10m
    timeout server          10m
    timeout http-keep-alive 120s
    timeout check           10s
    maxconn                 3000

#http
frontend web
	#非 SSL
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #Lets Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#子域名方法
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #路徑方法
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#將 SSL 請求傳遞給 Lets Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI 聊天
backend owui_chat
    # 添加 X-FORWARDED-FOR
    option forwardfor
    # 添加 X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

您將看到我們有 Open WebUI 和 Lets Encrypt 的 ACL 記錄（路由器）。要使用 OWUI 的 WebSocket，您需要配置 SSL，而最簡單的方法是使用 Lets Encrypt。

您可以使用子域名方法或路徑方法將流量路由到 Open WebUI。子域名方法需要專用子域名（例如：chat.yourdomain.com），而路徑方法允許您通過域上的特定路徑（例如：yourdomain.com/owui/）訪問 Open WebUI。選擇最適合您需求的方法並相應更新配置。

:::info
您需要將 80 和 443 埠對外暴露給 HAProxy 伺服器。這些埠是 Lets Encrypt 驗證您的域以及處理 HTTPS 流量所需的。您還需要確保將您的 DNS 記錄正確配置至 HAProxy 伺服器。如果您在家中運行 HAProxy，則需要在路由器中設置埠轉發，將 80 和 443 埠轉發至 HAProxy 伺服器。
:::

## 使用 Lets Encrypt 頒發 SSL 憑證

在啟動 HAProxy 前，您需要生成自簽名憑證作為佔位符，直到 Lets Encrypt 頒發適當的憑證。以下是生成自簽名憑證的方式：

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

然後將密鑰和證書合併到 HAProxy 可用的 PEM 文件中：

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
請確保根據您的需求和配置更新 HAProxy 配置。
:::

一旦您設置好 HAProxy 配置，就可以使用 certbot 獲取和管理您的 SSL 證書。Certbot 將處理與 Lets Encrypt 的驗證過程，並在證書臨近到期時自動更新它們（假設您使用 certbot 的自動更新服務）。

您可以通過運行 `haproxy -c -f /etc/haproxy/haproxy.cfg` 驗證 HAProxy 配置。如果沒有錯誤，您可以使用 `systemctl start haproxy` 啟動 HAProxy，並通過 `systemctl status haproxy` 驗證其運行狀態。

為了確保 HAProxy 隨系統啟動，請使用 `systemctl enable haproxy`。

當您配置好 HAProxy 後，可以使用 Lets Encrypt 簽發有效的 SSL 證書。
首先，您需要向 Lets Encrypt 註冊。此操作通常只需要執行一次：

`certbot register --agree-tos --email your@email.com --non-interactive`

然後您可以請求您的證書：

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

一旦證書簽發後，您需要將證書和私鑰文件合併到 HAProxy 可用的單個 PEM 文件中。

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
然後您可以重新啟動 HAProxy 以應用新的證書：
`systemctl restart haproxy`

## HAProxy 管理器（簡易部署選項）

如果您想要自動管理 HAProxy 配置和 Lets Encrypt SSL，我編寫了一個簡單的 Python 腳本並創建了一個 Docker 容器，您可以使用它來創建和管理 HAProxy 配置以及管理 Lets Encrypt 證書生命周期。

https://github.com/shadowdao/haproxy-manager

:::warning
如果使用該腳本或容器，請不要將 8000 端口公開！
:::