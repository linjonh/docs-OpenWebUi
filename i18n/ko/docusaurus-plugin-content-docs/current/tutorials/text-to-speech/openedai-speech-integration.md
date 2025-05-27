---
sidebar_position: 2
title: "🗨️ Docker를 사용한 Openedai-speech 사용"
---

:::warning
이 튜토리얼은 커뮤니티 기여이며 Open WebUI 팀에서 지원하지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 커스터마이징하는 방법을 시연하는 용도로만 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

**Docker를 사용하여 Open WebUI에 `openedai-speech` 통합하기**
============================================================

**`openedai-speech`란 무엇인가요?**
----------------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech)는 OpenAI 오디오/음성 API와 호환되는 텍스트-음성 변환 서버입니다.

이 서비스는 `/v1/audio/speech` 엔드포인트를 제공하며, 맞춤형 음성 복제 기능을 갖춘 무료 및 개인적인 텍스트-음성 변환 경험을 제공합니다. 이 서비스는 OpenAI와 제휴되지 않았으며 OpenAI API 키가 필요하지 않습니다.
:::

**필수 요건**
-------------

* 시스템에 Docker 설치됨
* Docker 컨테이너에서 실행 중인 Open WebUI
* Docker 및 Docker Compose에 대한 기본적인 이해

**옵션 1: Docker Compose 사용**
-----------------------------

**1단계: `openedai-speech` 서비스를 위한 새 폴더 생성**
--------------------------------------------------

`docker-compose.yml` 및 `speech.env` 파일을 저장할 새로운 폴더, 예를 들어 `openedai-speech-service`,를 생성합니다.

**2단계: GitHub에서 `openedai-speech` 리포지토리 복제**
------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

이 명령은 `openedai-speech` 리포지토리를 로컬 머신에 다운로드하며, Docker Compose 파일(`docker-compose.yml`, `docker-compose.min.yml`, 및 `docker-compose.rocm.yml`)과 기타 필요한 파일이 포함됩니다.

**3단계: `sample.env` 파일을 `speech.env`로 이름 변경 (필요 시 사용자 지정)**
-----------------------------------------------------------------------

`openedai-speech` 리포지토리 폴더에서 다음 내용을 가진 `speech.env`라는 새 파일을 생성합니다:

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**4단계: Docker Compose 파일 선택**
-----------------------------------

다음 Docker Compose 파일 중 하나를 사용할 수 있습니다:

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): 이 파일은 `ghcr.io/matatonic/openedai-speech` 이미지를 사용하며 [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)에서 빌드합니다.
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): 이 파일은 `ghcr.io/matatonic/openedai-speech-min` 이미지를 사용하며 [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min)에서 빌드합니다.
  이 이미지는 Piper 지원만 포함된 최소 버전으로 GPU가 필요하지 않습니다.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): 이 파일은 `ghcr.io/matatonic/openedai-speech-rocm` 이미지를 사용하며 ROCm 지원이 포함된 [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)에서 빌드합니다.

**4단계: 선택한 Docker 이미지 빌드**
------------------------------------

Docker Compose 파일 실행 전에 Docker 이미지를 빌드해야 합니다:

* **Nvidia GPU(CUDA 지원)**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU(ROCm 지원)**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **CPU 전용, GPU 없음(Piper만 지원)**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**5단계: 올바른 `docker compose up -d` 명령 실행**
---------------------------------------------------

* **Nvidia GPU(CUDA 지원)**: `openedai-speech` 서비스를 데탯 모드에서 시작하려면 다음 명령을 실행하세요:

```bash
docker compose up -d
```

* **AMD GPU(ROCm 지원)**: `openedai-speech` 서비스를 데탯 모드에서 시작하려면 다음 명령을 실행하세요:

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64(Apple M-series, Raspberry Pi)**: 여기서는 XTTS가 CPU 지원만 받으며 매우 느립니다. XTTS를 사용해 CPU(느림)로 Nvidia 이미지를 사용할 수 있거나 Piper만 사용 가능한 이미지를 사용하는 것이 좋습니다:

```bash
docker compose -f docker-compose.min.yml up -d
```

* **CPU 전용, GPU 없음(Piper만 지원)**: Piper 지원만 포함된 최소 docker 이미지 사용 - 크기가 약 1GB(< 1GB vs. 8GB):

```bash
docker compose -f docker-compose.min.yml up -d
```

이 명령은 `openedai-speech` 서비스를 데탯 모드에서 시작합니다.

**옵션 2: Docker Run 명령 사용**
-------------------------------

다음의 Docker 실행 명령어를 사용하여 `openedai-speech` 서비스를 분리된 모드로 시작할 수 있습니다:

* **Nvidia GPU (CUDA)**: 다음 명령어를 실행하여 `openedai-speech` 서비스를 빌드하고 시작하세요:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: 다음 명령어를 실행하여 `openedai-speech` 서비스를 빌드하고 시작하세요:

> ROCm 지원을 활성화하려면 `speech.env` 파일에서 `#USE_ROCM=1` 줄의 주석을 해제하세요.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **CPU 전용, GPU 없음 (Piper만 사용)**: 다음 명령어를 실행하여 `openedai-speech` 서비스를 빌드하고 시작하세요:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**6단계: Open WebUI을 TTS에 `openedai-speech`를 사용하도록 설정하기**
-----------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Open WebUI 설정을 열고 **관리 패널 > 설정 > 오디오**의 TTS 설정으로 이동하세요. 아래 설정을 추가하세요:

* **API 기본 URL**: `http://host.docker.internal:8000/v1`
* **API 키**: `sk-111111111` (이것은 예제 API 키이며, `openedai-speech`는 API 키가 필요하지 않습니다. 이 필드에 무엇이든 입력하면 됩니다.)

**7단계: 목소리 선택하기**
--------------------------

`TTS Voice`에서 Admin Panel의 오디오 설정 메뉴에서 아래의 선택지 중에서 사용할 `TTS 모델`을 설정할 수 있습니다. 이 모델의 목소리는 영어에 최적화되어 있습니다.

* `tts-1` 또는 `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova`, 그리고 `shimmer` (`tts-1-hd`는 설정 가능하며, 기본적으로 OpenAI 샘플을 사용)

**8단계: 변경 사항을 저장하고 자연스럽게 들리는 목소리를 시작하세요**
------------------------------------------------------------

`저장` 버튼을 눌러 Open WebUI 설정에 변경 사항을 적용하세요. 페이지를 새로 고쳐 변경 사항이 완전히 적용되도록 하고 `openedai-speech` 통합을 사용하여 자연스러운 음성으로 텍스트 응답을 읽어주는 텍스트 음성 변환을 즐기세요.

**모델 세부 사항:**
--------------------

`openedai-speech`는 각각 고유한 강점과 요구 조건을 가진 여러 텍스트 음성 변환 모델을 지원합니다. 아래 모델이 제공됩니다:

* **Piper TTS** (매우 빠르고 CPU에서 실행됨): `voice_to_speaker.yaml` 구성 파일을 통해 [Piper 목소리](https://rhasspy.github.io/piper-samples/)를 사용할 수 있습니다. 이 모델은 낮은 지연 시간과 높은 성능이 필요한 애플리케이션에 적합합니다. Piper TTS는 [다국어](https://github.com/matatonic/openedai-speech#multilingual) 목소리도 지원합니다.
* **Coqui AI/TTS XTTS v2** (빠르지만 약 4GB GPU VRAM과 CUDA를 사용하는 Nvidia GPU 필요): 이 모델은 Coqui AI의 XTTS v2 음성 복제 기술을 사용하여 고품질 목소리를 생성합니다. 더 강력한 GPU가 필요하지만 훌륭한 성능과 고품질 오디오를 제공합니다. Coqui는 [다국어](https://github.com/matatonic/openedai-speech#multilingual) 목소리도 지원합니다.
* **Beta Parler-TTS Support** (실험적이고 느림): 이 모델은 Parler-TTS 프레임워크를 사용하여 목소리를 생성합니다. 현재 베타 상태이지만 스피커 목소리의 기본 특징을 설명할 수 있습니다. 정확한 목소리는 생성마다 약간 다를 수 있지만 제공된 스피커 설명과 유사해야 합니다. 목소리를 설명하는 영감을 얻으려면 [Text Description to Speech](https://www.text-description-to-speech.com/)를 참조하세요.

**문제 해결**
----------------

`openedai-speech`를 Open WebUI에 통합하는 데 문제가 있는 경우, 아래 문제 해결 단계를 따라주세요:

* **`openedai-speech` 서비스 확인**: `openedai-speech` 서비스가 실행 중이고 docker-compose.yml 파일에 지정된 포트가 노출되어 있는지 확인하세요.
* **host.docker.internal에 대한 접근 확인**: Open WebUI 컨테이너 내에서 `host.docker.internal` 호스트 이름이 해석 가능한지 확인하세요. 이는 `openedai-speech`가 PC의 `localhost`를 통해 노출되지만 `open-webui`는 일반적으로 컨테이너 내에서 접근할 수 없기 때문에 필요합니다. 호스트에서 파일을 컨테이너에 마운트하기 위해 예를 들어 openedai-speech가 제공할 디렉토리에 볼륨을 추가하려면 docker-compose.yml 파일을 수정할 수 있습니다.
* **API 키 설정 검토**: `openedai-speech`는 API 키가 필요하지 않으므로 API 키가 더미 값으로 설정되었거나 체크 해제되었는지 확인하세요.
* **음성 설정 확인**: TTS에 사용할 음성이 `voice_to_speaker.yaml` 파일에 존재하며, 해당 파일(예: 음성 XML 파일)이 올바른 디렉터리에 있는지 확인하세요.
* **음성 모델 경로 확인**: 음성 모델 로드에 문제가 있는 경우, `voice_to_speaker.yaml` 파일의 경로가 실제 음성 모델 위치와 일치하는지 다시 확인하세요.

**추가 문제 해결 팁**
------------------------------------

* openedai-speech 로그에서 문제의 원인을 나타내는 오류 또는 경고 메시지가 있는지 확인하세요.
* `docker-compose.yml` 파일이 환경에 맞게 올바르게 설정되었는지 확인하세요.
* 여전히 문제가 발생하면 `openedai-speech` 서비스나 도커 환경 전체를 재시작해 보세요.
* 문제가 지속되면 `openedai-speech` GitHub 저장소를 참조하거나 관련 커뮤니티 포럼에서 도움을 요청하세요.

**FAQ**
-------

**생성된 오디오의 감정 범위를 어떻게 제어할 수 있나요?**

생성된 오디오의 감정 출력을 직접적으로 제어하는 메커니즘은 없습니다. 대문자 사용이나 문법 같은 특정 요소는 출력 오디오에 영향을 미칠 수 있지만, 내부 테스트 결과는 혼재되어 있습니다.

**음성 파일은 어디에 저장되나요? 설정 파일은 어디에 있나요?**

사용 가능한 음성 및 해당 속성을 정의하는 설정 파일은 config 볼륨에 저장됩니다. 기본 음성은 voice_to_speaker.default.yaml에 정의되어 있습니다.

**추가 리소스**
------------------------

`openedai-speech`를 사용하도록 Open WebUI를 구성하는 방법(환경 변수를 설정하는 방법 포함)에 대한 자세한 내용은 [Open WebUI 문서](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech)를 참조하세요.

`openedai-speech`에 대한 자세한 내용은 [GitHub 저장소](https://github.com/matatonic/openedai-speech)를 방문하세요.

**openedai-speech에 새로운 음성 추가 방법:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
`docker-compose.yml` 파일에서 포트 번호를 열려 있고 사용 가능한 모든 포트로 변경할 수 있지만, Open WebUI 관리자 오디오 설정에서 **API Base URL**을 해당 사항에 맞게 업데이트하세요.
:::
