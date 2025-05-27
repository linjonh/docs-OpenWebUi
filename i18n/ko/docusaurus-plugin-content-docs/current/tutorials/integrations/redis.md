---
sidebar_position: 30
title: "🔗 Redis Websocket 지원"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성된 것이며 Open WebUI 팀에서 공식적으로 지원하지 않습니다. 특정 사용 사례에 맞추어 Open WebUI를 커스터마이징하는 방법에 대한 데모로 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

# 🔗 Redis Websocket 지원

## 개요

이 문서는 Redis와 Open WebUI를 통합하여 Websocket 지원을 활성화하는 방법에 대한 단계를 설명합니다. 이 단계를 따르면, Open WebUI 인스턴스에서 Websocket 기능을 활성화하여 클라이언트와 애플리케이션 간 실시간 통신 및 업데이트를 가능하게 할 수 있습니다.

### 선행 조건

* 유효한 Open WebUI 인스턴스 (버전 1.0 이상에서 실행 중)
* Redis 컨테이너 (이 예제에서는 최신 Redis 7.x 릴리즈를 기반으로 하는 `docker.io/valkey/valkey:8.0.1-alpine`을 사용합니다)
* Docker Composer (버전 2.0 이상) 시스템에 설치됨
* Open WebUI와 Redis 사이의 통신을 위한 Docker 네트워크
* Docker, Redis, Open WebUI에 대한 기본적인 이해

## Redis 설정하기

Websocket 지원을 위해 Redis를 설정하려면 아래 내용을 포함하는 `docker-compose.yml` 파일을 생성해야 합니다:

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Notes

`ports` 지시는 대부분의 경우 필요하지 않기 때문에 구성에 포함되지 않았습니다. Redis 서비스는 Docker 네트워크 내에서 Open WebUI 서비스에 의해 접근 가능합니다. 하지만 Docker 네트워크 외부에서 Redis 인스턴스에 접근해야 하는 경우 (`예: 디버깅 또는 모니터링 목적`) `ports` 지시를 추가하여 Redis 포트를 노출할 수 있습니다 (`예: `6379:6379`).

위 구성은 `redis-valkey`라는 이름의 Redis 컨테이너를 설정하고 데이터 지속성을 위한 볼륨을 마운트합니다. `healthcheck` 지시는 컨테이너가 `ping` 명령에 응답하지 않을 경우 재시작되도록 보장합니다. `--save 30 1` 명령 옵션은 30분마다 변경된 키가 최소 1개인 상태에서 Redis 데이터베이스를 디스크에 저장합니다.

:::

Open WebUI와 Redis 간의 통신을 위한 Docker 네트워크를 생성하려면 다음 명령을 실행하세요:

```bash
docker network create openwebui-network
```

## Open WebUI 설정

Open WebUI에서 Websocket 지원을 활성화하려면 Open WebUI 인스턴스에 다음 환경 변수를 설정해야 합니다:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

이 환경 변수는 Websocket 지원을 활성화하고 Redis를 Websocket 매니저로 지정하며 Redis URL을 정의합니다. `WEBSOCKET_REDIS_URL` 값을 Redis 인스턴스의 실제 IP 주소로 대체하세요.

Docker를 사용하여 Open WebUI를 실행할 때 동일한 Docker 네트워크에 연결해야 합니다:

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

`127.0.0.1`을 Docker 네트워크 내 Redis 컨테이너의 실제 IP 주소로 바꾸세요.

## 검증

Redis가 적절하게 설정되고 Open WebUI가 구성되었다면 Open WebUI 인스턴스를 시작할 때 다음 로그 메시지가 나타납니다:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

이 메시지는 Open WebUI가 Websocket 관리를 위해 Redis를 사용하고 있음을 확인합니다. `docker exec` 명령을 사용하여 Redis 인스턴스가 실행 중이고 연결을 수락하고 있는지 확인할 수도 있습니다:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

이 명령은 Redis 인스턴스가 제대로 실행되고 있다면 `PONG`을 출력해야 합니다. 이 명령이 실패하면 대신 다음 명령을 시도할 수 있습니다:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## 문제 해결

Redis 또는 Open WebUI에서 Websocket 지원과 관련된 문제가 발생할 경우 다음 자료를 참조하여 문제를 해결할 수 있습니다:

* [Redis 문서](https://redis.io/docs)
* [Docker Compose 문서](https://docs.docker.com/compose/overview/)
* [sysctl 문서](https://man7.org/linux/man-pages/man8/sysctl.8.html)
