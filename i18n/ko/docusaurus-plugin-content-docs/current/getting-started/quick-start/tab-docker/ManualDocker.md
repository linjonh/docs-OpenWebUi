## Docker로 빠르게 시작하기 🐳

다음 단계에 따라 Docker를 사용하여 Open WebUI를 설치하십시오.

## 단계 1: Open WebUI 이미지 가져오기

GitHub 컨테이너 레지스트리에서 최신 Open WebUI Docker 이미지를 가져오십시오.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## 단계 2: 컨테이너 실행

기본 설정으로 컨테이너를 실행하십시오. 이 명령은 지속적인 데이터 저장을 보장하기 위해 볼륨 매핑을 포함합니다.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### 중요한 플래그

- **볼륨 매핑 (`-v open-webui:/app/backend/data`)**: 데이터의 지속적인 저장을 보장합니다. 컨테이너 재시작 시 데이터 손실을 방지합니다.
- **포트 매핑 (`-p 3000:8080`)**: 로컬 머신의 3000번 포트에서 WebUI를 노출합니다.

### GPU 지원 사용

Nvidia GPU 지원을 위해 `docker run` 명령에 `--gpus all`을 추가하십시오:

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### 단일 사용자 모드 (로그인 비활성화)

단일 사용자 설정을 위해 로그인 페이지를 건너뛰려면 `WEBUI_AUTH` 환경 변수를 `False`로 설정하십시오:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
이 변경 후 단일 사용자 모드와 다중 계정 모드 사이를 전환할 수 없습니다.
:::

#### 고급 설정: 다른 서버의 Ollama에 연결하기

Open WebUI를 다른 호스트에 위치한 Ollama 서버에 연결하려면 `OLLAMA_BASE_URL` 환경 변수를 추가하십시오:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## WebUI에 접속하기

컨테이너가 실행 중일 때 Open WebUI에 접속하려면 다음 URL로 이동하십시오:

[http://localhost:3000](http://localhost:3000)

각 Docker 플래그에 대한 자세한 도움말은 [Dockers 문서](https://docs.docker.com/engine/reference/commandline/run/)를 참조하십시오.
