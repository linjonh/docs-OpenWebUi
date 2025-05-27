---
sidebar_position: 14
title: "🛃 사용자 지정 CA 스토어 설정"
---

:::warning
이 튜토리얼은 커뮤니티 기여의 일환이며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 맞춤화하는 방법에 대한 데모로만 제공됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인하세요.
:::

OI를 실행하려고 할 때 `[SSL: CERTIFICATE_VERIFY_FAILED]` 오류가 발생한다면, 대부분 네트워크에서 HTTPS 트래픽이 차단되고 있을 가능성이 높습니다(예: 기업 네트워크).

이 문제를 해결하려면 새로운 인증서를 OI의 신뢰 스토어에 추가해야 합니다.

**사전에 빌드된 Docker 이미지 사용 시**:

1. `docker run` 명령줄 옵션으로 `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro`를 전달하여 호스트 머신에서 컨테이너로 인증서 스토어를 마운트합니다.
2. `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt`를 설정하여 Python이 시스템 신뢰 스토어를 사용하도록 강제합니다(참조: https://docs.docker.com/reference/cli/docker/container/run/#env).

환경 변수 `REQUESTS_CA_BUNDLE`이 작동하지 않는다면 동일한 값을 사용하여 대신 `SSL_CERT_FILE`을 설정해보십시오([httpx documentation](https://www.python-httpx.org/environment_variables/#ssl_cert_file) 참조).

[@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210)의 `compose.yaml` 예제:

```yaml
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - /var/containers/openwebui:/app/backend/data:rw
      - /etc/containers/openwebui/compusrv.crt:/etc/ssl/certs/ca-certificates.crt:ro
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      - WEBUI_NAME=compusrv
      - ENABLE_SIGNUP=False
      - ENABLE_COMMUNITY_SHARING=False
      - WEBUI_SESSION_COOKIE_SAME_SITE=strict
      - WEBUI_SESSION_COOKIE_SECURE=True
      - ENABLE_OLLAMA_API=False
      - REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```

`ro` 플래그는 CA 스토어를 읽기 전용으로 마운트하여 호스트 CA 스토어의 우발적 변경을 방지합니다.
**로컬 개발용**:

UI에 변경을 원할 경우, 또는 빌드 프로세스에서 인증서를 추가할 수 있습니다. 이를 위해 `Dockerfile`을 수정할 수 있습니다.
빌드는 [다중 단계](https://docs.docker.com/build/building/multi-stage/)로 이루어지므로 다음 단계를 모두 사용해야 합니다.

1. 프론트엔드 (`build` 단계):

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. 백엔드 (`base` 단계):

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
