## 업데이트 중

로컬 Docker 설치를 최신 버전으로 업데이트하려면 **Watchtower**를 사용하거나 컨테이너를 수동으로 업데이트할 수 있습니다.

### 옵션 1: Watchtower 사용

[Watchtower](https://containrrr.dev/watchtower/)를 사용하면 업데이트 프로세스를 자동화할 수 있습니다:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(`open-webui`를 컨테이너 이름과 다르다면 해당 이름으로 교체하세요.)_

### 옵션 2: 수동 업데이트

1. 현재 컨테이너를 중지하고 제거합니다:

   ```bash
   docker rm -f open-webui
   ```

2. 최신 버전을 가져옵니다:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. 컨테이너를 다시 시작합니다:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

이 두 가지 방법으로 Docker 인스턴스를 최신 빌드로 업데이트하고 실행할 수 있습니다.
