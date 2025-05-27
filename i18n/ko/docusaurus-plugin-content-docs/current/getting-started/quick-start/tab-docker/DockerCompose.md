# Docker Compose 설정

Docker Compose를 사용하면 다중 컨테이너 Docker 애플리케이션 관리를 간소화할 수 있습니다.

Docker가 설치되어 있지 않다면 [Docker 설치 튜토리얼](../../../tutorials/docker-install.md)을 참고하세요.

Docker Compose는 추가 패키지 `docker-compose-v2`가 필요합니다.

**경고:** 오래된 Docker Compose 튜토리얼은 버전 1 구문을 참조할 수 있으며, `docker-compose build`처럼 하이픈을 사용하는 명령을 포함합니다. 버전 2 구문을 사용하는지 확인하세요. 예: `docker compose build` (하이픈 대신 공백 사용).

## 예제 `docker-compose.yml`

다음은 Docker Compose를 이용하여 Open WebUI를 설정하기 위한 예제 구성 파일입니다:

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## 서비스 시작하기

서비스를 시작하려면 다음 명령을 실행하세요:

```bash
docker compose up -d
```

## 도움말 스크립트

`run-compose.sh`라는 유용한 도움말 스크립트가 코드베이스에 포함되어 있습니다. 이 스크립트는 배포에 포함할 Docker Compose 파일을 선택하는 데 도움을 주어 설정 프로세스를 간소화합니다.

---

**참고:** Nvidia GPU 지원을 위해 이미지를 `ghcr.io/open-webui/open-webui:main`에서 `ghcr.io/open-webui/open-webui:cuda`로 변경하고, `docker-compose.yml` 파일에 서비스 정의에 다음을 추가하세요:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

이 설정은 애플리케이션이 GPU 리소스를 사용할 수 있을 때 이를 활용할 수 있도록 보장합니다.
