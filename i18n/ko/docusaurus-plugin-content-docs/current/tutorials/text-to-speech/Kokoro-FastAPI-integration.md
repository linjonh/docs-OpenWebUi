---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI Using Docker"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 특정 용도에 맞게 Open WebUI를 사용자 정의하는 방법을 보여주는 데 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

## `Kokoro-FastAPI`란 무엇인가요?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)는 OpenAI API 엔드포인트 사양을 구현한 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 텍스트-음성 변환 모델을 위한 Docker 기반 FastAPI 래퍼입니다. 고속 생성 속도를 제공하며 고성능 텍스트-음성 변환 기능을 자랑합니다.

## 주요 기능

- OpenAI 호환 음성 엔드포인트와 인라인 음성 결합
- NVIDIA GPU 가속 또는 CPU Onnx 추론
- 가변 청크 스트리밍 지원
- 여러 오디오 포맷 지원 (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- localhost:8880/web에서 통합 웹 인터페이스 (또는 저장소의 추가 컨테이너에는 gradio 포함)
- 변환 및 생성용 음소 엔드포인트

## 음성

- af
- af_bella
- af_irulan
- af_nicole
- af_sarah
- af_sky
- am_adam
- am_michael
- am_gurney
- bf_emma
- bf_isabella
- bm_george
- bm_lewis

## 언어

- en_us
- en_uk

## 요구 사항

- 시스템에 Docker 설치 필요
- Open WebUI 실행 중
- GPU 지원의 경우: CUDA 12.3이 포함된 NVIDIA GPU
- CPU 전용의 경우: 특별한 요구 사항 없음

## ⚡️ 빠른 시작

### GPU 또는 CPU 버전 중 선택할 수 있습니다

### GPU 버전 (CUDA 12.8이 필요한 NVIDIA GPU)

docker run을 사용:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

또는 docker compose를 사용하여 `docker-compose.yml` 파일을 생성하고 `docker compose up`을 실행: 예:

```yaml
name: kokoro
services:
    kokoro-fastapi-gpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-gpu:v0.2.1
        restart: always
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
```

:::info
[NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)을 설치하고 구성해야 할 수 있습니다
:::

### CPU 버전 (ONNX 최적화 추론)

docker run을 사용:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

docker compose를 사용:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Open WebUI에서 `Kokoro-FastAPI` 설정하기

Open WebUI에서 Kokoro-FastAPI를 사용하려면 다음 단계를 따르세요:

- 관리자 패널을 열고 `Settings` -> `Audio`로 이동
- TTS 설정을 다음과 같이 지정:
- - 텍스트-음성 변환 엔진: OpenAI
  - API 기본 URL: `http://localhost:8880/v1` # 필요에 따라 `localhost` 대신 `host.docker.internal` 사용
  - API 키: `not-needed`
  - TTS 모델: `kokoro`
  - TTS 음성: `af_bella` # 기존 OAI 음성과의 호환성을 위한 매핑도 허용

:::info
기본 API 키는 `not-needed` 문자열입니다. 추가 보안이 필요하지 않으면 해당 값을 변경할 필요가 없습니다.
:::

## Docker 컨테이너 빌드하기

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # 또는 docker/gpu
docker compose up --build
```

**끝났습니다!**

Docker 컨테이너 빌드에 관한 추가 정보, 포트 변경 포함한 세부 사항은 [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) 저장소를 참고하세요
