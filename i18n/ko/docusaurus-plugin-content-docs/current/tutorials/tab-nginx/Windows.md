### Windows에서 Docker 없이 자체 서명 인증서와 Nginx 사용하기

기본적인 내부/개발 설치의 경우, self-signed certificate와 nginx를 사용하여 Open WebUI를 HTTPS로 프록시할 수 있습니다. 이를 통해 LAN을 통해 마이크 입력과 같은 기능을 사용할 수 있습니다. (기본적으로 대부분의 브라우저는 안전하지 않은 non-localhost URL에서 마이크 입력을 허용하지 않습니다)

이 가이드는 pip으로 Open WebUI를 설치하고 `open-webui serve`를 실행하고 있다고 가정합니다

#### 1단계: 인증서 생성을 위한 openssl 설치

먼저 openssl을 설치해야 합니다

[Shining Light Productions (SLP)](https://slproweb.com/) 웹사이트에서 미리 컴파일된 바이너리를 내려받아 설치할 수 있습니다.

또는 [Chocolatey](https://chocolatey.org/)가 설치되어 있다면, 이를 사용해 빠르게 OpenSSL을 설치할 수 있습니다:

1. 명령 프롬프트 또는 PowerShell을 엽니다.
2. 다음 명령어를 실행하여 OpenSSL을 설치합니다:
   ```bash
   choco install openssl -y
   ```

---

### **설치 확인**
설치 후, 명령 프롬프트를 열고 다음을 입력합니다:
```bash
openssl version
```
`OpenSSL 3.x.x ...` 과 같이 OpenSSL 버전을 표시한다면 설치가 완료된 것입니다.

#### 2단계: nginx 설치

공식 Windows용 Nginx를 [nginx.org](https://nginx.org)에서 다운로드하거나 Chocolatey와 같은 패키지 관리자를 사용할 수 있습니다.
다운로드한 ZIP 파일을 디렉토리에 압축 해제합니다 (예: C:\nginx).

#### 3단계: 인증서 생성

다음 명령어를 실행합니다:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

생성된 nginx.key 및 nginx.crt 파일을 선택한 폴더로 이동하거나 C:\nginx 디렉토리로 이동합니다.

#### 4단계: nginx 구성

C:\nginx\conf\nginx.conf를 텍스트 편집기로 엽니다

Open WebUI가 로컬 LAN 상에서 접근 가능하게 설정하려면 `ipconfig` 를 사용하여 LAN IP 주소 (예: 192.168.1.15)를 확인하십시오.

다음과 같이 설정합니다:

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

    # WebSocket (스트리밍) 처리를 적절하게 하기 위해 필요
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # 모든 HTTP 트래픽을 HTTPS로 리디렉션
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # HTTPS 트래픽 처리
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL 설정 (경로가 올바른지 확인)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP 스테이플링
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # 로컬 서비스로의 프록시 설정
        location / {
            # proxy_pass는 실행 중인 localhost 버전의 open-webui를 가리켜야 합니다
            proxy_pass http://localhost:8080;

            # WebSocket 지원 추가 (0.5.0 이상 버전에서 필요)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (선택 사항) 모델로부터 더 나은 스트리밍 응답을 위해 프록시 버퍼링 비활성화
            proxy_buffering off;

            # (선택 사항) 큰 첨부파일 및 긴 음성 메시지 처리를 위해 요청 크기 증가
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

파일을 저장하고 `nginx -t` 명령어를 실행하여 구성에 오류나 문법 문제가 없는지 확인합니다. 설치 방식에 따라 먼저 `cd C:\nginx` 명령어를 실행해야 할 수도 있습니다.

`nginx` 명령어를 실행하여 nginx를 실행합니다. 이미 nginx 서비스가 시작된 경우, `nginx -s reload` 명령어를 실행하여 새 구성을 다시 로드할 수 있습니다.

---

이제 https://192.168.1.15 (또는 적절한 로컬 LAN IP)에서 Open WebUI에 액세스할 수 있어야 합니다. 필요한 경우 Windows 방화벽 액세스를 허용하십시오.
