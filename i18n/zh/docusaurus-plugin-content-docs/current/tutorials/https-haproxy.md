---
sidebar_position: 201
title: "🔒 使用 HAProxy 配置 HTTPS"
---

:::warning
本教程是社区贡献的内容，并未得到 Open WebUI 团队的支持。此教程仅作为自定义 Open WebUI 以满足特定需求的演示。想要贡献？请查看贡献教程。
:::

# 为 Open WebUI 配置 HAProxy

HAProxy（高可用代理）是一种专门用于负载均衡和反向代理的解决方案，其高度可配置性和低资源占用设计使其能够处理大量连接。更多信息请访问：https://www.haproxy.org/

## 安装 HAProxy 和 Lets Encrypt

首先，安装 HAProxy 和 Lets Encrypt 的 certbot：
### Redhat 衍生版本
```sudo dnf install haproxy certbot openssl -y```
### Debian 衍生版本
```sudo apt install haproxy certbot openssl -y```

## HAProxy 配置基础

HAProxy 的配置文件默认存储在 ```/etc/haproxy/haproxy.cfg``` 中。此文件包含所有决定 HAProxy 如何运行的配置指令。

与 Open WebUI 一起使用的 HAProxy 基本配置非常简单。

```
 #---------------------------------------------------------------------
# 全局设置
#---------------------------------------------------------------------
global
    # 如果要将这些消息记录到 /var/log/haproxy.log 中，你需要：
    #
    # 1) 配置 syslog 以接受网络日志事件。这可以通过将
    #    -r 选项添加到 /etc/sysconfig/syslog 中的 SYSLOGD_OPTIONS 来实现
    #
    # 2) 配置 local2 事件记录到 /var/log/haproxy.log 文件。
    #   可以在 /etc/sysconfig/syslog 中添加如下行：
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
	
	# 如果 dh-param 值过低，请调整
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# 默认设置，所有的 listen 和 backend 区块将使用这些设置，
# 除非单独指定
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
	# 非 SSL
    bind 0.0.0.0:80
	# SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    # Lets Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	# 子域名方法
    acl chat-acl hdr(host) -i subdomain.domain.tld
    # 路径方法
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

# 将 SSL 请求传递给 Lets Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
# OWUI Chat
backend owui_chat
    # 添加 X-FORWARDED-FOR
    option forwardfor
    # 添加 X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

可以看到，我们为 Open WebUI 和 Lets Encrypt 配置了 ACL 记录（路由器）。要在 OWUI 中使用 WebSocket，则需要配置 SSL，最简单的办法是使用 Lets Encrypt。

你可以使用子域名方法或路径方法来将流量路由到 Open WebUI。子域名方法需要一个专用子域（例如：chat.yourdomain.com），而路径方法允许你通过特定路径（例如：yourdomain.com/owui/）访问 Open WebUI。选择最适合你需求的方法，并相应地更新配置。

:::info
你需要向 HAProxy 服务器暴露端口 80 和 443。这些端口是 Lets Encrypt 验证你的域名和处理 HTTPS 流量所需的。你还需要确保 DNS 记录已正确配置以指向你的 HAProxy 服务器。如果你在家中运行 HAProxy，则需要在路由器中使用端口转发将端口 80 和 443 转发到你的 HAProxy 服务器。
:::

## 使用 Lets Encrypt 签发 SSL 证书

在启动 HAProxy 之前，你需要生成一个自签名证书，作为占位证书，直到 Lets Encrypt 签发正式证书。以下是生成自签名证书的方法：

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

然后将密钥和证书合并为一个HAProxy可用的PEM文件：

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
请根据您的需求和配置更新HAProxy配置。
:::

设置好HAProxy配置后，可以使用certbot来获取和管理SSL证书。Certbot会处理与Lets Encrypt的验证过程，并在证书即将过期时自动更新（假设您使用了certbot自动更新服务）。

可以通过运行`haproxy -c -f /etc/haproxy/haproxy.cfg`来验证HAProxy配置。如果没有错误，可以通过`systemctl start haproxy`启动HAProxy，并通过`systemctl status haproxy`验证其是否正常运行。

为了确保HAProxy随系统启动，请运行`systemctl enable haproxy`。

配置好HAProxy后，可以使用Lets Encrypt颁发有效的SSL证书。
首先，您需要注册Lets Encrypt。这个步骤只需要完成一次：

`certbot register --agree-tos --email your@email.com --non-interactive`

然后，您可以申请证书：

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

证书颁发后，您需要将证书和私钥文件合并为一个HAProxy可用的PEM文件。

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
然后可以重启HAProxy以应用新证书：
`systemctl restart haproxy`

## HAProxy管理器（简单部署选项）

如果您希望有工具自动管理HAProxy配置和Lets Encrypt SSL，我编写了一个简单的Python脚本，并创建了一个Docker容器，您可以用它来创建和管理HAProxy配置并管理Lets Encrypt证书生命周期。

https://github.com/shadowdao/haproxy-manager

:::warning
使用脚本或容器时，请勿将端口8000暴露给公众！
:::