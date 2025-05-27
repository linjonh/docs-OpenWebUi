### Nginx Proxy Manager

Nginx Proxy Manager (NPM)은 Open WebUI와 같은 로컬 애플리케이션을 유효한 Lets Encrypt SSL 인증서를 사용하여 보호하고 리버스 프록시를 쉽게 관리할 수 있도록 합니다.
이 설정은 응용 프로그램의 특정 포트를 직접 인터넷에 노출하지 않고도 HTTPS 액세스를 가능하게 하며, 많은 모바일 브라우저에서 보안 요구 사항으로 인해 음성 입력 기능을 사용하는 데 필요합니다.

#### 사전 조건

- Docker 및 open-webui 컨테이너가 실행 중인 홈 서버.
- 도메인 이름 (DuckDNS와 같은 무료 옵션 또는 Namecheap/GoDaddy와 같은 유료 옵션).
- Docker 및 DNS 구성에 대한 기본 지식.

#### 단계별 설정

1. **Nginx 파일을 위한 디렉토리 만들기:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Docker를 사용하여 Nginx Proxy Manager 설정:**

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

컨테이너 실행:
```bash
docker-compose up -d
```
3. **DNS 및 도메인 구성:**

    * 도메인 제공업체에 로그인하여 (예: DuckDNS) 도메인을 생성합니다.
    * 도메인을 프록시의 로컬 IP(예: 192.168.0.6)로 포인트합니다.
    * DuckDNS를 사용하는 경우 대시보드에서 API 토큰을 가져옵니다.

###### https://www.duckdns.org/domains 에서 설정 방법에 대한 간단한 예:
    
4. **SSL 인증서 설정:**
* Nginx Proxy Manager에 http://server_ip:81로 액세스합니다. 예: ``192.168.0.6:81``
* 기본 자격 증명(admin@example.com / changeme)으로 로그인합니다. 요구사항에 따라 변경합니다.
* SSL Certificates → Add SSL Certificate → Lets Encrypt로 이동합니다.
* DuckDNS에서 받은 이메일과 도메인 이름을 작성합니다. 도메인 이름 하나에는 별표가 포함되고 하나에는 포함되지 않습니다. 예: ``*.hello.duckdns.org`` 및 ``hello.duckdns.org``.
* DNS challenge를 사용하고 DuckDNS를 선택한 후 API 토큰을 붙여넣습니다. 예: 
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Let’s Encrypt 이용 약관에 동의하고 저장하십시오. 필요시 전파 시간 변경(120초).

5. **프록시 호스트 생성:**
* 각 서비스(e.g., openwebui, nextcloud)에 대해 Hosts → Proxy Hosts → Add Proxy Host로 이동합니다.
* 도메인 이름 입력(e.g., openwebui.hello.duckdns.org).
* HTTP 스킴을 기본값으로 설정하고, ``Websockets support`` 활성화 후 Docker IP를 지정합니다(open-webui와 NGINX 관리자가 같은 컴퓨터에서 실행되는 경우, 이전과 동일한 IP 예시: ``192.168.0.6``).
* 이전에 생성된 SSL 인증서를 선택하고 SSL을 강제 활성화하며 HTTP/2를 활성화합니다.
6. **open-webui에 URL 추가 (그렇지 않으면 HTTPS 오류 발생):**

* open-webui → 관리 패널 → 설정 → 일반으로 이동합니다.
* **Webhook URL** 텍스트 필드에 Nginx 리버스 프록시를 통해 open-webui에 연결할 URL을 입력합니다. 예: ``hello.duckdns.org`` (필수 아님) 또는 ``openwebui.hello.duckdns.org`` (필수).

#### WebUI 액세스:

Open WebUI에 HTTPS를 통해 액세스 합니다: ``hello.duckdns.org`` 또는 ``openwebui.hello.duckdns.org`` (설정한 방식에 따라).

###### 방화벽 참고: 로컬 방화벽 소프트웨어(예: Portmaster)가 내부 Docker 네트워크 트래픽 또는 필요한 포트를 차단할 수 있습니다. 문제가 발생하면 이 설정에 필요한 통신이 허용되는지 확인하기 위해 방화벽 규칙을 점검하십시오.
