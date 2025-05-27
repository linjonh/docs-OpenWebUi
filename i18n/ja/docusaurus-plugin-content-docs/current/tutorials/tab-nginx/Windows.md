### WindowsでDockerを使用せず、自己署名証明書とNginxを使用する方法

基本的な内部開発用のインストールでは、Nginxと自己署名証明書を使用してOpen WebUIをHTTPSへプロキシすることで、LAN上のマイク入力などの機能を利用できます。（デフォルトでは、ほとんどのブラウザは非セキュアなlocalhost以外のURLでマイク入力を許可しません）

このガイドは、pipを使用してOpen WebUIをインストールし、`open-webui serve`を実行していることを前提としています。

#### ステップ1: 証明書生成用のOpenSSLをインストール

まずOpenSSLをインストールする必要があります。

[Shining Light Productions (SLP)](https://slproweb.com/)のウェブサイトから事前にコンパイルされたバイナリをダウンロードしてインストールできます。

または、[Chocolatey](https://chocolatey.org/)をインストール済みの場合は、それを使用してOpenSSLを迅速にインストールできます:

1. コマンドプロンプトまたはPowerShellを開きます。
2. 次のコマンドを実行してOpenSSLをインストールします:
   ```bash
   choco install openssl -y
   ```

---

### **インストールの確認**
インストール後、コマンドプロンプトを開いて以下を入力します:
```bash
openssl version
```
OpenSSLバージョン（例: `OpenSSL 3.x.x ...`）が表示されれば、正しくインストールされています。

#### ステップ2: Nginxをインストール

[nginx.org](https://nginx.org)からWindows版公式Nginxをダウンロードするか、Chocolateyのようなパッケージマネージャーを使用します。
 ダウンロードしたZIPファイルをディレクトリに解凍します（例: C:\nginx）。

#### ステップ3: 証明書生成

以下のコマンドを実行します:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

生成されたnginx.keyとnginx.crtファイルを任意のフォルダ、もしくはC:\nginxディレクトリに移動します。

#### ステップ4: Nginxの設定

C:\nginx\conf\nginx.confをテキストエディタで開きます。

Open WebUIをローカルLAN経由でアクセス可能にする場合は、`ipconfig`を使用してLANのIPアドレスを確認してください（例: 192.168.1.15）。

以下のように設定します:

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

    # WebSocket (ストリーミング) を適切に処理するために必要
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # 全HTTPトラフィックをHTTPSにリダイレクト
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # HTTPSトラフィックを処理
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL設定（正しいパスを確認）
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # ローカルサービスへのプロキシ設定
        location / {
            # proxy_passはopen-webuiの実行中のlocalhostバージョンを指す必要があります
            proxy_pass http://localhost:8080;

            # WebSocketサポートを追加 (バージョン0.5.0以降で必須)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (オプション) モデルからのストリーミング応答を改善するためプロキシバッファリングを無効化
            proxy_buffering off;

            # (オプション) 大きな添付ファイルや長い音声メッセージのための最大リクエストサイズを増加
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

ファイルを保存し、`nginx -t`を実行して設定にエラーや構文問題がないことを確認します。Nginxをインストールした方法によっては、まず`cd C:\nginx`を実行する必要があります。

`nginx`を実行してNginxを起動します。すでにNginxサービスが開始されている場合は、`nginx -s reload`を実行して新しい設定をリロードできます。

---

これで、https://192.168.1.15（または適切なLANのIPアドレス）でOpen WebUIにアクセスできるようになります。必要に応じてWindowsファイアウォールのアクセスを許可してください。
