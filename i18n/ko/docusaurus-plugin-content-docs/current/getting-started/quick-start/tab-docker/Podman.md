
# Podman 사용하기

Podman은 OCI 컨테이너를 개발, 관리 및 실행하기 위한 데몬리스 컨테이너 엔진입니다.

## 기본 명령어

- **컨테이너 실행:**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **실행 중인 컨테이너 목록 보기:**

  ```bash
  podman ps
  ```

## Podman 네트워킹

네트워킹 문제가 발생하면 slirp4netns를 사용하여 포드의 네트워크 설정을 조정하여 컨테이너가 컴퓨터의 포트에 접근할 수 있도록 합니다.

[slirp4netns 설치](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install)를 확인하고 이전에 존재하는 컨테이너를 `podman rm`을 사용하여 제거한 후 새 컨테이너를 시작합니다.

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

컴퓨터에서 Ollama를 사용하고 있다면(컨테이너 내부에서 실행하지 않는 경우),

open-webui 내부로 이동한 후, Settings > Admin Settings > Connections로 이동하여 새로운 Ollama API 연결을 `http://10.0.2.2:[OLLAMA PORT]`에 생성합니다. 기본적으로 Ollama 포트는 11434입니다.


Podman [문서](https://podman.io/)를 참조하여 고급 설정을 확인하세요.
