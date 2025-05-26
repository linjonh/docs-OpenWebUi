---
sidebar_position: 201
title: "🔒 使用 HAProxy 实现 HTTPS"
---

:::warning
本教程由社区贡献，并未得到 Open WebUI 团队的支持。它仅作为如何根据您的特定需求自定义 Open WebUI 的示范。想要贡献？查看贡献教程。
:::

# 针对 Open WebUI 的 HAProxy 配置

HAProxy（高可用代理）是一种专门的负载均衡和反向代理解决方案，具有高度可配置性，并设计用于以相对较低的资源开销处理大量连接。更多信息请访问：https://www.haproxy.org/

## 安装 HAProxy 和 Let&apos;s Encrypt

首先，安装 HAProxy 和 Let&apos;s Encrypt 的 certbot：
### Redhat 衍生系统
```sudo dnf install haproxy certbot openssl -y```
### Debian 衍生系统
```sudo apt install haproxy certbot openssl -y```

## HAProxy 配置基础

HAProxy 的配置默认存储在 ```/etc/haproxy/haproxy.cfg``` 文件中。该文件包含了所有定义 HAProxy 如何运行的配置指令。

将 HAProxy 配置为支持 Open WebUI 的基础配置相对简单。

```
 #---------------------------------------------------------------------
# 全局设置
#---------------------------------------------------------------------
global
    # 如果想将这些消息记录到 /var/log/haproxy.log，您需要：
    #
    # 1) 配置 syslog 以接受网络日志事件。通过向 /etc/sysconfig/syslog 中的
    #    SYSLOGD_OPTIONS 添加 &apos;-r&apos; 选项实现
    #
    # 2) 配置 local2 事件将其写入 /var/log/haproxy.log 文件。
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
	
	#调整 dh-param 值，如果过低
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# 所有 &apos;listen&apos; 和 &apos;backend&apos; 部分的通用默认值
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

    #Let&apos;s Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#子域名方式
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #路径方式
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#将 SSL 请求传递给 Let&apos;s Encrypt
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

可以看到，我们为 Open WebUI 和 Let&apos;s Encrypt 配置了 ACL 记录（路由器）。要在 Open WebUI 中使用 WebSocket，您需要配置 SSL，最简单的方法是使用 Let&apos;s Encrypt。

您可以选择使用子域名方法或者路径方法来将流量路由到 Open WebUI。子域名方法需要一个专用子域名（例如，chat.yourdomain.com），而路径方法允许您通过域名的特定路径访问 Open WebUI（例如，yourdomain.com/owui/）。请选择最适合您需求的方法并相应更新配置。

:::info
您需要将 80 和 443 端口暴露给您的 HAProxy 服务器。这些端口对于 Let&apos;s Encrypt 验证您的域名以及处理 HTTPS 流量是必需的。此外，您需要确保您的 DNS 记录已正确配置且指向您的 HAProxy 服务器。如果您在家中运行 HAProxy，则需要在路由器中使用端口转发，将 80 和 443 端口转发到您的 HAProxy 服务器。
:::

## 使用 Let&apos;s Encrypt 签发 SSL 证书

在启动 HAProxy 之前，您需要生成一个自签名证书，以便在 Let&apos;s Encrypt 签发正式证书之前使用。以下是如何生成自签名证书：

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

然后将密钥和证书合并成一个HAProxy可用的PEM文件：

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
确保根据您的需求和配置更新HAProxy配置。
:::

一旦您的HAProxy配置设置完成，您可以使用certbot来获取和管理您的SSL证书。Certbot将处理与Let's Encrypt的验证过程，并在证书即将过期时（假设您使用certbot自动续订服务）自动更新您的证书。

您可以通过运行`haproxy -c -f /etc/haproxy/haproxy.cfg`验证HAProxy配置。如果没有错误，您可以通过`systemctl start haproxy`启动HAProxy，并通过`systemctl status haproxy`验证其是否运行。

要确保HAProxy随系统启动运行，可以执行`systemctl enable haproxy`。

配置好HAProxy后，您可以使用Let's Encrypt发放有效的SSL证书。
首先，您需要注册Let's Encrypt。这只需要执行一次：

`certbot register --agree-tos --email your@email.com --non-interactive`

然后，您可以请求您的证书：

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

证书颁发后，您需要将证书和私钥文件合并到一个HAProxy可用的PEM文件中。

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
然后，您可以重启HAProxy以应用新的证书：
`systemctl restart haproxy`

## HAProxy管理器（便捷部署选项）

如果您希望有一个工具自动管理您的HAProxy配置和Let's Encrypt SSL证书，我编写了一个简单的Python脚本并创建了一个Docker容器，您可以用来创建和管理您的HAProxy配置并管理Let's Encrypt证书生命周期。

https://github.com/shadowdao/haproxy-manager

:::warning
如果您使用该脚本或容器，请勿公开暴露端口8000！
:::