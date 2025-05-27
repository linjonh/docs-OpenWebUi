---
sidebar_position: 201
title: "🔒 HAProxy를 이용한 HTTPS"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 사용자 설정하는 방법을 보여주기만 합니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

# Open WebUI를 위한 HAProxy 설정

HAProxy (High Availability Proxy)는 전문적인 로드 밸런싱 및 리버스 프록시 솔루션으로 높은 수준의 설정 가능성과 상대적으로 낮은 리소스 소모량으로 많은 연결을 처리하도록 설계되었습니다. 자세한 내용은 다음을 참조하세요: https://www.haproxy.org/

## HAProxy와 Lets Encrypt 설치

먼저 HAProxy와 Lets Encrypt의 certbot을 설치하세요:
### Redhat derivatives
```sudo dnf install haproxy certbot openssl -y```
### Debian derivatives
```sudo apt install haproxy certbot openssl -y```

## HAProxy 기본 설정

HAProxy의 설정은 기본적으로 ```/etc/haproxy/haproxy.cfg```에 저장됩니다. 이 파일은 HAProxy의 동작을 결정하는 모든 설정 지시어를 포함합니다.

Open WebUI와 함께 작동하도록 HAProxy의 기본 설정은 매우 간단합니다.

```
 #---------------------------------------------------------------------
# 전역 설정
#---------------------------------------------------------------------
global
    # 이러한 메시지가 /var/log/haproxy.log에 기록되도록 하려면:
    # 1) syslog가 네트워크 로그 이벤트를 수신하도록 설정해야 합니다.
    #    이는 /etc/sysconfig/syslog의 SYSLOGD_OPTIONS에 -r 옵션을 추가하여 수행됩니다.
    # 2) local2 이벤트가 /var/log/haproxy.log 파일로 이동하도록 설정해야 합니다.
    #    /etc/sysconfig/syslog에 다음과 같은 라인을 추가할 수 있습니다.
    #    local2.*                       /var/log/haproxy.log
    log         127.0.0.1 local2

    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
	
	#dh-param 값 조정(너무 낮은 경우)
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# listen 및 backend 섹션이 설정되지 않은 경우 사용할 일반 기본값
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
	#비SSL
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #Lets Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#서브도메인 방식
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #경로 방식
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#SSL 요청을 Lets Encrypt로 전달
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI Chat
backend owui_chat
    # X-FORWARDED-FOR 추가
    option forwardfor
    # X-CLIENT-IP 추가
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

우리는 Open WebUI와 Lets Encrypt를 위한 ACL 기록(라우터)을 설정했습니다. OWUI에서 WebSocket을 사용하려면 SSL이 구성되어야 하며, 가장 쉬운 방법은 Lets Encrypt를 사용하는 것입니다.

Open WebUI로 트래픽을 라우팅하는 데에는 서브도메인 방식 또는 경로 방식을 사용할 수 있습니다. 서브도메인 방식은 전용 서브도메인 (예: chat.yourdomain.com)이 필요하며, 경로 방식은 특정 도메인 경로 (예: yourdomain.com/owui/)를 통해 Open WebUI에 액세스할 수 있도록 합니다. 필요에 따라 적절한 방법을 선택하고 설정을 업데이트하세요.

:::info
80번 포트와 443번 포트를 HAProxy 서버로 노출시켜야 합니다. 이 포트는 Lets Encrypt가 도메인을 인증하고 HTTPS 트래픽을 처리하는 데 필요합니다. 또한 DNS 기록이 HAProxy 서버를 가리키도록 올바르게 설정되었는지 확인해야 합니다. 홈에서 HAProxy를 실행하는 경우, 라우터에서 80번 및 443번 포트를 HAProxy 서버로 포워딩해야 합니다.
:::

## Lets Encrypt로 SSL 인증서 발급

HAProxy를 시작하기 전에 Lets Encrypt가 적합한 인증서를 발급할 때까지 자리 표시자로 사용할 자체 서명 인증서를 생성해야 합니다. 자체 서명 인증서를 생성하는 방법은 다음과 같습니다:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

그 다음, 키와 인증서를 결합하여 HAProxy가 사용할 수 있는 PEM 파일을 만드세요:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
필요와 구성에 따라 HAProxy 구성을 업데이트하는 것을 잊지 마세요.
:::

HAProxy 구성을 설정한 후에는 certbot을 사용하여 SSL 인증서를 얻고 관리할 수 있습니다. Certbot은 Lets Encrypt와의 검증 과정을 처리하고 자동 갱신 서비스를 사용하는 경우 인증서가 만료되기 전에 자동으로 갱신합니다.

`haproxy -c -f /etc/haproxy/haproxy.cfg` 명령어를 실행하여 HAProxy 구성을 검증할 수 있습니다. 오류가 없으면 `systemctl start haproxy`를 실행하여 HAProxy를 시작하고 `systemctl status haproxy`로 실행 상태를 확인할 수 있습니다.

HAProxy가 시스템과 함께 시작되도록 하려면 `systemctl enable haproxy`를 실행하세요.

HAProxy를 구성한 후, Lets Encrypt를 사용하여 유효한 SSL 인증서를 발급받으세요.
먼저, Lets Encrypt에 등록해야 합니다. 이 작업은 한 번만 수행하면 됩니다:

`certbot register --agree-tos --email your@email.com --non-interactive`

그다음, 인증서를 요청할 수 있습니다:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

인증서가 발급되면, 인증서와 개인 키 파일을 HAProxy가 사용할 수 있는 하나의 PEM 파일로 병합해야 합니다.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
그런 다음 HAProxy를 재시작하여 새 인증서를 적용하세요:
`systemctl restart haproxy`

## HAProxy 관리자(간편 배포 옵션)

HAProxy 구성과 Lets Encrypt SSL을 자동으로 관리하려면, 제가 작성한 간단한 파이썬 스크립트와 도커 컨테이너를 사용할 수 있습니다. 이를 통해 HAProxy 구성을 생성 및 관리하고 Lets Encrypt 인증서 수명 주기를 관리할 수 있습니다.

https://github.com/shadowdao/haproxy-manager

:::warning
스크립트 또는 컨테이너를 사용하는 경우에는 반드시 포트 8000을 공용으로 노출하지 마세요!
:::