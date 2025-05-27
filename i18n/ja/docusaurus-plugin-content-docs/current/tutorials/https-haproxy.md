---
sidebar_position: 201
title: "🔒 HAProxyでHTTPSを利用する"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは受けられません。このチュートリアルは特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を示すものです。貢献したいですか？貢献方法のチュートリアルをチェックしてください。
:::

# Open WebUI向けのHAProxyの設定

HAProxy（High Availability Proxy）は、高性能かつ柔軟な負荷分散およびリバースプロキシソリューションで、大量の接続を比較的低リソースで処理するよう設計されています。詳細については以下を参照してください: https://www.haproxy.org/

## HAProxyとLets Encryptのインストール

まず、HAProxyとLets Encryptのcertbotをインストールします:
### Redhat系
```sudo dnf install haproxy certbot openssl -y```
### Debian系
```sudo apt install haproxy certbot openssl -y```

## HAProxyの基本設定

HAProxyの設定は通常```/etc/haproxy/haproxy.cfg```に保存されます。このファイルには、HAProxyの動作方法を決定するすべての設定指示が含まれています。

Open WebUIでHAProxyを動作させるための基本設定は非常にシンプルです。

```
 #---------------------------------------------------------------------
# グローバル設定
#---------------------------------------------------------------------
global
    # これらのメッセージを/var/log/haproxy.logに転送するには:
    #
    # 1) syslogがネットワークログイベントを受け入れるよう設定する。
    #    これは/etc/sysconfig/syslogでSYSLOGD_OPTIONSに-rオプションを追加することで行う。
    #
    # 2) local2イベントを/var/log/haproxy.logファイルに追加する
    #    次のような行を/etc/sysconfig/syslogに追加します:
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
	
	# dh-paramを適切な値に調整
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# listen および backend セクションで指定されない場合に使用される共通デフォルト
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
	#SSLなし
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #Lets Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#サブドメイン方式
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #パス方式
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#SSLリクエストをLets Encryptに送信
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUIチャット
backend owui_chat
    # X-FORWARDED-FORを追加
    option forwardfor
    # X-CLIENT-IPを追加
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Open WebUIとLets Encryptの両方にACLレコード（ルーター）が追加されているのがわかります。OWUIでWebSocketを使用するにはSSLを設定する必要があり、Lets Encryptを使用するのが最も簡単です。

ドメインに専用サブドメイン（例: chat.yourdomain.com）を割り当てるサブドメイン方式と、特定のパス（例: yourdomain.com/owui/）を経由してOpen WebUIにアクセスするパス方式があります。使用する方法を選び、それぞれに応じて設定を更新してください。

:::info
HAProxyサーバーにポート80および443を解放する必要があります。これらのポートはLets Encryptがドメインを検証するため、またHTTPSトラフィック用に必要です。また、DNSレコードを適切に設定してHAProxyサーバーを指すようにする必要があります。HAProxyを家庭で運用する場合は、ルーターでポート80および443をHAProxyサーバーに転送するポートフォワーディングを使用する必要があります。
:::

## Lets EncryptでのSSL証明書の発行

HAProxyを起動する前に、Lets Encryptが正式な証明書を発行するまでの間、プレースホルダとして使用する自己署名証明書を生成します。自己署名証明書の生成方法は次のとおりです:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

次に、鍵と証明書を結合してHAProxyが使用できるPEMファイルを作成します:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
ニーズと設定に基づいてHAProxy構成を更新することを確認してください。
:::

HAProxy構成を設定した後、Certbotを使用してSSL証明書を取得および管理することができます。CertbotはLet's Encryptとの検証プロセスを処理し、有効期限が近づいた際に自動的に証明書を更新します(Certbotの自動更新サービスを使用している場合)。

HAProxy構成を検証するには、`haproxy -c -f /etc/haproxy/haproxy.cfg`を実行します。エラーがなければ、`systemctl start haproxy`でHAProxyを起動し、`systemctl status haproxy`で実行中であることを確認できます。

システム起動時にHAProxyを自動的に開始するには、`systemctl enable haproxy`を実行します。

HAProxyを構成したら、Let's Encryptを使用して有効なSSL証明書を発行できます。
まず、Let's Encryptに登録する必要があります。一度だけ登録すれば十分です:

`certbot register --agree-tos --email your@email.com --non-interactive`

次に証明書をリクエストできます:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

証明書が発行されたら、証明書と秘密鍵ファイルを1つのPEMファイルに結合する必要があります。これをHAProxyが使用できます。

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
次に、HAProxyを再起動して新しい証明書を適用します:
`systemctl restart haproxy`

## HAProxy Manager (簡単なデプロイオプション)

HAProxy構成およびLet's Encrypt SSLを自動的に管理するツールが必要な場合は、簡単なPythonスクリプトを作成し、HAProxyの構成とLet's Encrypt証明書ライフサイクルを管理するためのDockerコンテナを用意しました。

https://github.com/shadowdao/haproxy-manager

:::warning
スクリプトまたはコンテナを使用する場合、ポート8000を公開しないでください！
:::