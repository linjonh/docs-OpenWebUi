### Lets Encrypt

Lets Encrypt는 대부분의 브라우저에서 신뢰받는 무료 SSL 인증서를 제공하며, 프로덕션 환경에 적합합니다.

#### 준비사항

- **Certbot**이 시스템에 설치되어 있어야 합니다.
- DNS 레코드가 서버를 올바르게 가리키도록 구성되어야 합니다.

#### 단계

1. **Nginx 파일을 위한 디렉토리 생성:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx 설정 파일 생성:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name your_domain_or_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # WebSocket 지원 추가 (버전 0.5.0 이후 필수)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (선택사항) 모델의 스트리밍 응답을 위해 프록시 버퍼링 비활성화
            proxy_buffering off;

            # (선택사항) 큰 첨부파일과 긴 오디오 메시지 처리 위한 최대 요청 크기 증가
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **간소화된 Lets Encrypt 스크립트:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # 설명: Certbot을 사용하여 Lets Encrypt SSL 인증서를 가져오고 설치하는 간단한 스크립트.

    DOMAIN="your_domain_or_IP"
    EMAIL="your_email@example.com"

    # Certbot 설치 안된 경우 설치
    if ! command -v certbot &> /dev/null; then
        echo "Certbot을 찾을 수 없습니다. 설치 중..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # SSL 인증서 가져오기
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # 변경 사항 적용을 위해 Nginx 재시작
    sudo systemctl reload nginx

    echo "Lets Encrypt SSL 인증서가 설치되고 Nginx가 다시 로드되었습니다."
    ```

    **스크립트에 실행 권한 부여:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Docker Compose 구성 업데이트:**

    `docker-compose.yml` 파일에 Nginx 서비스를 추가하세요:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "80:80"
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Nginx 서비스 시작:**

    ```bash
    docker compose up -d nginx
    ```

6. **Lets Encrypt 스크립트 실행:**

    인증서를 가져오고 설치하기 위해 스크립트를 실행하세요:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### WebUI에 액세스

HTTPS를 통해 Open WebUI에 액세스하세요:

[https://your_domain_or_IP](https://your_domain_or_IP)
