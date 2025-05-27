### 자체 서명 인증서


자체 서명 인증서는 신뢰가 중요한 문제가 되지 않는 개발 또는 내부 사용에 적합합니다.

#### 단계

1. **Nginx 파일을 위한 디렉토리 생성:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Nginx 구성 파일 생성:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name your_domain_or_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (선택 사항) 모델의 스트리밍 응답을 향상시키기 위해 프록시 버퍼링 비활성화
            proxy_buffering off;

            # (선택 사항) 큰 첨부 파일 및 긴 오디오 메시지를 위한 최대 요청 크기 증가
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **자체 서명 SSL 인증서 생성:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=your_domain_or_IP"
    ```

4. **Docker Compose 구성 업데이트:**

    `docker-compose.yml`에 Nginx 서비스를 추가합니다:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
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

#### WebUI 액세스

HTTPS를 통해 Open WebUI에 액세스할 수 있습니다:

[https://your_domain_or_IP](https://your_domain_or_IP)

---
