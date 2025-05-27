---
sidebar_position: 1
title: "🗨️ Docker를 사용한 Edge TTS"
---

:::warning
이 튜토리얼은 커뮤니티 기여사항으로 Open WebUI 팀에서 지원하지 않습니다. 특정 사용 사례에 맞춰 Open WebUI를 사용자 정의하는 방법을 보여주기 위한 목적입니다. 기여를 원하시나요? 기여 튜토리얼을 확인하세요.
:::

# Open WebUI에 `openai-edge-tts` 🗣️ 통합하기

## `openai-edge-tts`란 무엇인가요?

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts)는 텍스트를 음성으로 변환하는 API로, OpenAI API 엔드포인트를 모방하여 Open WebUI와 같은 엔드포인트 URL을 정의할 수 있는 시나리오에서 직접 대체할 수 있습니다.

이를 위해 [edge-tts](https://github.com/rany2/edge-tts) 패키지를 사용합니다. 이 패키지는 Edge 브라우저의 무료 "낭독" 기능을 활용하여 Microsoft / Azure 요청을 에뮬레이션하여 고품질의 텍스트-음성 변환을 무료로 제공합니다.

[여기에서 음성을 샘플링하세요](https://tts.travisvn.com)

<details>
  <summary>'openedai-speech'와의 차이점은 무엇인가요?</summary>

[openedai-speech](https://github.com/matatonic/openedai-speech)과 유사하게, [openai-edge-tts](https://github.com/travisvn/openai-edge-tts)는 OpenAI API 엔드포인트를 모방하여 OpenAI Speech 엔드포인트가 호출 가능하고 서버 엔드포인트 URL을 구성할 수 있는 시나리오에서 직접 대체할 수 있는 텍스트-음성 변환 API 엔드포인트입니다.

`openedai-speech`는 오프라인에서 실행되는 여러 모드의 음성을 생성할 수 있는 더 포괄적인 옵션입니다.

`openai-edge-tts`는 Python 패키지 `edge-tts`를 사용하여 간단하게 오디오를 생성하는 더 간단한 옵션입니다.

</details>

## 요구 사항

- 시스템에 Docker 설치됨
- Open WebUI 실행 중

## ⚡️ 빠른 시작

구성을 하지 않고도 가장 간단하게 시작하려면 아래 명령어를 실행하세요:

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

이는 기본 설정을 사용하여 포트 5050에서 서비스를 실행합니다.

## Open WebUI에서 `openai-edge-tts` 사용 설정

- 관리자 패널을 열고 `Settings` -> `Audio`로 이동
- 아래 스크린샷에 맞게 TTS 설정을 적용하세요
- _참고: 여기에서 TTS 음성을 지정할 수 있습니다_

![이 프로젝트에 맞는 엔드포인트 추가를 위한 Open WebUI 관리자 설정 스크린샷](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
기본 API 키는 `your_api_key_here` 문자열입니다. 추가 보안이 필요하지 않은 경우 해당 값을 변경할 필요가 없습니다.
:::

**그리고 끝입니다! 여기서 끝낼 수 있습니다**

# GitHub에서 [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts)가 유용하다면 반드시 ⭐️ 별표를 남겨주세요


<details>
  <summary>Python으로 실행하기</summary>
  
### 🐍 Python으로 실행하기

Python으로 직접 이 프로젝트를 실행하려면 가상 환경 설정, 종속성 설치 및 서버 시작 단계를 따르세요.

#### 1. 저장소 클론하기

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. 가상 환경 설정

종속성을 격리하기 위해 가상 환경을 생성하고 활성화하세요:

```bash
# macOS/Linux 용
python3 -m venv venv
source venv/bin/activate

# Windows 용
python -m venv venv
venv\Scripts\activate
```

#### 3. 종속성 설치

`requirements.txt`에 나열된 필수 패키지를 설치하려면 `pip`를 사용하세요:

```bash
pip install -r requirements.txt
```

#### 4. 환경 변수 구성

루트 디렉터리에 `.env` 파일을 생성하고 다음 변수를 설정하세요:

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. 서버 실행

구성이 완료되었으면 아래 명령어로 서버를 시작하세요:

```bash
python app/server.py
```

서버는 `http://localhost:5050`에서 실행됩니다.

#### 6. API 테스트

이제 `http://localhost:5050/v1/audio/speech` 및 사용 가능한 다른 엔드포인트와 상호작용할 수 있습니다. 요청 예제는 사용법 섹션을 참조하세요.

</details>

<details>
  <summary>사용법 세부 정보</summary>
  
##### 엔드포인트: `/v1/audio/speech` (`/audio/speech`로 대체 가능)

입력 텍스트에서 오디오를 생성합니다. 사용 가능한 매개변수:

**필수 매개변수:**

- **input** (string): 오디오로 변환할 텍스트(최대 4096자).

**선택 매개변수:**

- **model** (string): "tts-1" 또는 "tts-1-hd"로 설정 가능(기본값: `"tts-1"`).
- **voice** (string): OpenAI 호환 음성(alloy, echo, fable, onyx, nova, shimmer) 또는 유효한 `edge-tts` 음성(기본값: `"en-US-AvaNeural"`).
- **response_format** (string): 오디오 형식. 옵션: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (기본값: `mp3`).
- **speed** (number): 재생 속도(0.25에서 4.0). 기본값은 `1.0`입니다.

:::tip
[tts.travisvn.com](https://tts.travisvn.com)에서 사용 가능한 음성을 탐색하고 샘플 미리보기를 들을 수 있습니다.
:::

예시 요청: `curl`을 사용하여 mp3 파일로 출력을 저장:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "안녕하세요, 저는 당신의 AI 비서입니다! 당신의 아이디어를 실현하는 데 어떻게 도와드릴지 말씀해주세요.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

또는 OpenAI API 엔드포인트 매개변수에 맞게 작성하려면:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "안녕하세요, 저는 당신의 AI 비서입니다! 당신의 아이디어를 실현하는 데 어떻게 도와드릴지 말씀해주세요.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

그리고 영어가 아닌 다른 언어의 예:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### 추가 엔드포인트

- **POST/GET /v1/models**: 사용 가능한 TTS 모델 목록을 제공합니다.
- **POST/GET /v1/voices**: 특정 언어/로케일에 대한 `edge-tts` 목소리를 나열합니다.
- **POST/GET /v1/voices/all**: 모든 `edge-tts` 목소리를 언어 지원 정보와 함께 나열합니다.

:::info
`/v1`은 이제 선택 사항입니다.

또한, **Azure AI Speech** 및 **ElevenLabs**와 같은 맞춤형 API 엔드포인트가 Open WebUI에서 허용될 경우 향후 지원을 위해 엔드포인트가 제공됩니다.

`EXPAND_API=False` 환경 변수를 설정하여 이를 비활성화할 수 있습니다.
:::

</details>

## 🐳 Docker를 위한 빠른 설정

프로젝트 실행에 사용되는 명령에서 환경 변수를 구성할 수 있습니다.

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
마크다운 텍스트는 이제 읽기 용이성과 지원을 향상시키기 위해 필터를 거칩니다.

`REMOVE_FILTER=True` 환경 변수를 설정하여 이를 비활성화할 수 있습니다.
:::

## 추가 자료

`openai-edge-tts`에 대한 자세한 정보는 [GitHub repo](https://github.com/travisvn/openai-edge-tts)에서 확인할 수 있습니다.

직접적인 지원이 필요하다면 [Voice AI & TTS Discord](https://tts.travisvn.com/discord)를 방문하세요.

## 🎙️ 목소리 샘플

[목소리 샘플 재생 및 사용 가능한 모든 Edge TTS 목소리 보기](https://tts.travisvn.com/)
