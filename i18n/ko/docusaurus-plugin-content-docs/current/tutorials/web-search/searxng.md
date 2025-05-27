---
sidebar_position: 10
title: "SearXNG"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에서 지원하지 않습니다. 이것은 Open WebUI를 특정 사용 사례에 맞게 사용자 지정하는 방법을 보여주기 위한 데모로만 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

이 가이드는 Docker에서 SearXNG를 사용하여 Open WebUI에서 웹 검색 기능을 설정하는 방법에 대한 지침을 제공합니다.

## SearXNG (Docker)

> "**SearXNG는 다양한 검색 서비스와 데이터베이스의 결과를 통합하는 무료 인터넷 메타 검색 엔진입니다. 사용자는 추적되거나 프로파일링되지 않습니다.**"

## 1. SearXNG 구성

SearXNG를 Open WebUI와 최적으로 사용하려면 다음 단계를 따르세요:

**1단계: `git clone`하여 SearXNG Docker를 복제하고 폴더로 이동하세요:**

1. 새로운 디렉터리 `searxng-docker`를 생성합니다.

searxng-docker 저장소를 복제합니다. 이 폴더는 SearXNG 구성 파일을 포함합니다. 구성 지침은 [SearXNG 문서](https://docs.searxng.org/)를 참조하세요.

```bash
git clone https://github.com/searxng/searxng-docker.git
```

`searxng-docker` 저장소로 이동합니다:

```bash
cd searxng-docker
```

**2단계: `.env` 파일을 찾아 수정하세요:**

1. `.env` 파일에서 `SEARXNG_HOSTNAME`의 주석을 제거하고 적절히 설정합니다:

```bash
# 기본적으로 https://localhost에서 청취
# 이를 변경하려면:
# * SEARXNG_HOSTNAME의 주석을 제거하고, <host>를 SearXNG 호스트 이름으로 대체
# * LETSENCRYPT_EMAIL의 주석을 제거하고, <email>을 이메일로 대체 (Lets Encrypt 인증서를 생성하는 데 필요)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# 선택 사항:
# 작은 인스턴스나 큰 인스턴스를 실행할 경우 사용되는 uwsgi worker 및 쓰레드 수를 변경할 수 있습니다.
# 더 많은 worker(=프로세스)는 동시에 더 많은 검색 요청을 처리할 수 있지만 리소스 사용량도 증가합니다.

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**3단계: `docker-compose.yaml` 파일 수정**

3. `localhost` 제한을 제거하기 위해 `docker-compose.yaml` 파일을 수정합니다:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**4단계: 필요한 권한 부여**

4. 루트 디렉터리에서 다음 명령을 실행하여 컨테이너가 새 구성 파일을 생성할 수 있는 권한을 부여합니다:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**5단계: 제한 없는 `limiter.toml` 파일 생성**

5. 제한 없는 `searxng-docker/searxng/limiter.toml` 구성 파일을 생성합니다:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# 이 구성 파일은 기본 구성 파일을 업데이트합니다.
# 자세한 내용은 https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml 를 참조하세요.

[botdetection.ip_limit]
# ip_limit 방법에서 link_token 방법 활성화
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**6단계: 기본 `settings.yml` 파일 삭제**

6. 기본 `searxng-docker/searxng/settings.yml` 파일이 존재하는 경우 삭제합니다. 이는 SearXNG 첫 실행 시 새로 생성됩니다:

```bash
rm searxng-docker/searxng/settings.yml
```

**7단계: 새 `settings.yml` 파일 생성**

:::note
첫 실행 시 `docker-compose.yaml` 파일에서 `cap_drop: - ALL`을 제거해야 `searxng` 서비스가 `/etc/searxng/uwsgi.ini`를 성공적으로 생성할 수 있습니다. 이는 `cap_drop: - ALL` 지시가 모든 권한을 제거하여 필요한 파일 생성 권한까지 제거하기 때문입니다. 첫 실행 후에는 보안을 위해 `cap_drop: - ALL`을 다시 추가하십시오.
:::

7. 컨테이너를 잠시 실행하여 새 `settings.yml` 파일을 생성합니다:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**8단계: 포맷 추가 및 포트 번호 업데이트**

8. HTML 및 JSON 포맷을 `searxng-docker/searxng/settings.yml` 파일에 추가합니다:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

SearXNG 인스턴스의 비밀 키를 생성합니다:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windows 사용자는 비밀 키를 생성하기 위해 다음 파워셸 스크립트를 사용할 수 있습니다:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

`server` 섹션에서 포트 번호를 앞서 설정한 번호(이 경우 `8080`)로 업데이트합니다:

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

`bind_address`를 원하는 값으로 변경합니다:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### 구성 파일

#### searxng-docker/searxng/settings.yml (추출)

기본 `settings.yml` 파일에는 많은 엔진 설정이 포함되어 있습니다. 아래는 기본 `settings.yml` 파일의 예제입니다:

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url은 환경 변수 SEARXNG_BASE_URL에서 정의되어 있으며, .env 및 docker-compose.yml을 참조하세요.
  secret_key: "ultrasecretkey"  # 변경하세요!
  limiter: true  # 개인 인스턴스의 경우 비활성화할 수 있습니다.
  image_proxy: true
  port: 8080
  bind_address: "0.0.0.0"

ui:
  static_use_hash: true

search:
  safe_search: 0
  autocomplete: ""
  default_lang: ""
  formats:
    - html
    - json # json은 필수입니다.
  # 형식을 제거하여 접근을 거부할 수 있으며, 소문자를 사용하세요.
  # formats: [html, csv, json, rss]
redis:
  # Redis 데이터베이스에 연결할 URL. ${SEARXNG_REDIS_URL}에 의해 덮어씁니다.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

SearXNG의 settings.yml 파일의 포트는 docker-compose.yml 파일의 포트 번호와 일치해야 합니다.

</details>

**단계 9: `uwsgi.ini` 파일 업데이트**

9. 다음 내용을 확인하여 `searxng-docker/searxng/uwsgi.ini` 파일이 아래와 일치하는지 확인하세요:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# 코드 실행 사용자 지정
uid = searxng
gid = searxng

# 워커 수 (보통 CPU 코어 수)
# 기본값: %k (= CPU 코어 수, Dockerfile 참조)
workers = %k

# 워커당 스레드 수
# 기본값: 4 (Dockerfile 참조)
threads = 4

# 생성된 소켓의 권한
chmod-socket = 666

# 사용할 플러그인 및 인터프리터 설정
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# 가져올 모듈
module = searx.webapp

# 가상 환경 및 Python 경로
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# 자동으로 프로세스 이름을 유의미한 것으로 설정
auto-procname = true

# 프라이버시를 위한 요청 로깅 비활성화
disable-logging = true
log-5xx = true

# 요청 최대 크기 설정 (요청 본문 제외)
buffer-size = 8192

# Keep alive 없음
# https://github.com/searx/searx-docker/issues/24 참조
add-header = Connection: close

# uwsgi가 정적 파일을 제공
static-map = /static=/usr/local/searxng/searx/static
# 하루로 만료 시간 설정
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. 대안 설정

기본 구성을 수정하고 싶지 않다면, 빈 `searxng-docker` 폴더를 만들고 나머지 설정 지침을 따르기만 하면 됩니다.

### Docker Compose 설정

다음 환경 변수를 Open WebUI의 `docker-compose.yaml` 파일에 추가하세요:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "searxng"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
      SEARXNG_QUERY_URL: "http://searxng:8080/search?q=<query>"
```

SearXNG를 위한 `.env` 파일을 생성하세요:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

다음 내용을 SearXNG의 `docker-compose.yaml` 파일에 추가하세요:

```yaml
services:
  searxng:
    container_name: searxng
    image: searxng/searxng:latest
    ports:
      - "8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    env_file:
      - .env
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

이제 스택을 다음 명령으로 실행할 준비가 되었습니다:

```bash
docker compose up -d
```

:::참고
처음 실행 시 SearXNG 서비스가 `/etc/searxng/uwsgi.ini`를 성공적으로 생성하기 위해서 `docker-compose.yaml` 파일에서 `cap_drop: - ALL`을 제거해야 합니다. 이는 `cap_drop: - ALL` 지시문이 모든 권한을 제거하기 때문입니다. 이후 보안을 위해 `cap_drop: - ALL`을 다시 추가해야 합니다.
:::

또는 `docker run`을 사용하여 SearXNG를 직접 실행할 수도 있습니다:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. 연결 상태 확인

Open WebUI 컨테이너 인스턴스에서 SearXNG와 연결 상태를 명령줄 인터페이스를 통해 확인하세요:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. GUI 설정

1. 이동: `Admin Panel` -> `Settings` -> `Web Search`
2. `Enable Web Search` 활성화
3. 드롭다운 메뉴에서 `Web Search Engine`을 `searxng`로 설정
4. `Searxng Query URL`을 아래 예시 중 하나로 설정하세요:

* `http://searxng:8080/search?q=<query>` (컨테이너 이름과 노출된 포트를 사용하여 Docker 기반 설정에 적합)
* `http://host.docker.internal:8080/search?q=<query>` (`host.docker.internal` DNS 이름과 호스트 포트를 사용하여 Docker 기반 설정에 적합)
* `http://<searxng.local>/search?q=<query>` (로컬 도메인 이름을 사용하여 로컬 네트워크 접근에 적합)
* `https://<search.domain.com>/search?q=<query>` (사용자 정의 도메인 이름을 사용하여 자체 호스팅된 SearXNG 인스턴스에 대해 공용 또는 개인 접근에 적합)

**`/search?q=<query>` 부분은 필수입니다.**

5. `Search Result Count` 및 `Concurrent Requests` 값을 적절히 조정하세요
6. 변경 사항 저장

![SearXNG GUI Configuration](/images/tutorial_searxng_config.png)

## 5. 채팅에서 웹 검색 사용하기

웹 검색에 접근하려면 메시지 입력 필드 옆에 있는 +를 클릭하세요.

여기에서 웹 검색을 켜거나 끌 수 있습니다.

![Web Search UI Toggle](/images/web_search_toggle.png)

이 단계를 따르면, Open WebUI와 함께 SearXNG를 성공적으로 설정하여 SearXNG 엔진을 사용하여 웹 검색을 수행할 수 있습니다.

#### 참고

채팅에서 이를 명시적으로 켜거나 꺼야 합니다.

이는 세션별로 활성화되며 페이지를 새로 고침하거나 다른 채팅으로 이동하면 비활성화됩니다.
