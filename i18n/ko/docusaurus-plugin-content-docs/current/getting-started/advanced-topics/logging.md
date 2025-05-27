---
sidebar_position: 5
title: "📜 오픈 WebUI에서 로그 기록"
---

# 오픈 WebUI 로그 기록 이해하기 🪵

로그 기록은 디버깅, 모니터링, 그리고 Open WebUI가 어떻게 동작하는지 이해하는 데 필수적입니다. 이 가이드는 **브라우저 클라이언트** (프론트엔드)와 **응용 프로그램 서버/백엔드**에서 로그 기록이 어떻게 작동하는지를 설명합니다.

## 🖥️ 브라우저 클라이언트 로그 기록 (프론트엔드)

프론트엔드 개발 및 디버깅을 위해, Open WebUI는 표준 브라우저 콘솔 로그 기록을 사용합니다. 이는 웹 브라우저의 내장 개발자 도구를 통해 직접 로그를 볼 수 있음을 의미합니다.

**브라우저 로그에 접근하는 방법:**

1. **개발자 도구 열기:** 대부분의 브라우저에서 개발자 도구를 열 수 있는 방법은:
   - Open WebUI 페이지에서 **오른쪽 클릭**한 후 "검사" 또는 "요소 검사"를 선택하십시오.
   - **F12** (macOS에서는 Cmd+Opt+I)를 누르십시오.

2. **"콘솔" 탭으로 이동:** 개발자 도구 패널에서 "콘솔" 탭을 찾아 클릭하십시오.

**브라우저 로그 유형:**

Open WebUI는 주로 [JavaScripts](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) `console.log()`를 사용하여 클라이언트 측 로그 기록을 수행합니다. 콘솔에서 다음과 같은 메시지를 볼 수 있습니다:

- **정보 메시지:** 일반적인 애플리케이션 흐름 및 상태.
- **경고:** 잠재적 문제 또는 비치명적 오류.
- **오류:** 기능에 영향을 미칠 수 있는 문제.

**브라우저별 개발자 도구:**

다른 브라우저는 약간 다른 개발자 도구를 제공하지만, 모두 JavaScript 로그를 볼 수 있는 콘솔을 제공합니다. 인기 있는 브라우저의 문서 링크는 다음과 같습니다:

- **[Blink] Chrome/Chromium (e.g., Chrome, Edge):** [Chrome 개발자 도구 문서](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox:** [Firefox 개발자 도구 문서](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari:** [Safari 개발자 도구 문서](https://developer.apple.com/safari/tools/)

## ⚙️ 응용 프로그램 서버/백엔드 로그 기록 (Python)

Open WebUI 백엔드는 Python의 내장 `logging` 모듈을 사용하여 서버 측 이벤트와 정보를 기록합니다. 이러한 로그는 서버 동작 이해, 오류 진단 및 성능 모니터링에 매우 중요합니다.

**핵심 개념:**

- **Python `logging` 모듈:** Open WebUI는 표준 Python `logging` 라이브러리를 활용합니다. Python 로그 기록에 익숙하다면 이 섹션은 쉽게 이해될 것입니다.  (더 자세한 정보는 [Python 로그 기록 문서](https://docs.python.org/3/howto/logging.html#logging-levels)를 참고하십시오).
- **콘솔 출력:** 기본적으로 백엔드 로그는 콘솔(표준 출력)에 전송되며, 이를 통해 터미널 또는 Docker 컨테이너 로그에서 볼 수 있습니다.
- **로그 레벨:** 로그 레벨은 로그의 상세도를 제어합니다. 이러한 레벨에 따라 Open WebUI가 더 많은 또는 적은 세부 정보를 표시하도록 설정할 수 있습니다.

### 🚦 로그 레벨 설명

Python 로그 기록은 심각도에 따라 로그 메시지를 분류하기 위해 계층 구조의 레벨을 사용합니다. 여기 심각도 높은 순서대로 레벨을 설명합니다:

| 레벨         | 숫자 값         | 설명                                                                  | 사용 사례                                                               |
| ----------- | ------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `CRITICAL`  | 50            | **치명적인 오류**로 응용 프로그램 종료로 이어질 수 있습니다.         | 재앙적인 실패, 데이터 손상.                                           |
| `ERROR`     | 40            | **오류**로 문제를 나타내지만 응용 프로그램은 여전히 작동할 수 있습니다. | 복구 가능한 오류, 작업 실패.                                         |
| `WARNING`   | 30            | **잠재적 문제** 또는 조사해야 할 예기치 않은 상황.                    | 사용 중단 경고, 리소스 제한.                                         |
| `INFO`      | 20            | **일반적인 정보 메시지**로 응용 프로그램 작동에 관한 내용.             | 시작 메시지, 주요 이벤트, 정상 작동 흐름.                             |
| `DEBUG`     | 10            | **개발자를 위한 상세 디버깅 정보.**                                   | 함수 호출, 변수 값, 상세 실행 단계.                                   |
| `NOTSET`    | 0             | **모든 메시지가 기록됨.** (설정되지 않은 경우 기본적으로 `WARNING` 사용). | 매우 특정한 디버깅에 유용하며 모든 것을 캡처.                        |

**기본 레벨:** Open WebUI의 기본 로그 레벨은 `INFO`입니다.

### 🌍 전역 로그 레벨 (`GLOBAL_LOG_LEVEL`)

Open WebUI 백엔드의 **전역** 로그 레벨을 `GLOBAL_LOG_LEVEL` 환경 변수를 사용하여 변경할 수 있습니다. 이는 전체 로그 상세도를 제어하는 가장 간단한 방법입니다.

**작동 방식:**

`GLOBAL_LOG_LEVEL`을 설정하면 Python의 루트 로거가 구성되어 Open WebUI 전체 및 일부 외부 라이브러리([basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig)을 사용하는 라이브러리)에 영향을 미칩니다. `logging.basicConfig(force=True)`를 사용하므로 기존 루트 로거 구성을 덮어씁니다.

**예제: `DEBUG`로 설정하기**

- **Docker 매개변수:**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**영향:** `GLOBAL_LOG_LEVEL`을 `DEBUG`로 설정하면 매우 자세한 로그가 생성되며, 이는 개발 및 문제 해결에 유용합니다. 프로덕션 환경에서는 로그 볼륨을 줄이기 위해 `INFO` 또는 `WARNING`이 더 적합할 수 있습니다.

### ⚙️ 앱/백엔드 특정 로깅 레벨

더 세부적인 제어를 위해 Open WebUI는 특정 백엔드 컴포넌트의 로깅 수준을 설정하기 위한 환경 변수를 제공합니다. 로깅은 계속 진행 중인 작업이지만 이러한 환경 변수를 사용하여 어느 정도 제어할 수 있습니다. 이러한 변수는 애플리케이션의 다양한 부분별 로깅을 세밀하게 조정할 수 있게 해줍니다.

**사용 가능한 환경 변수:**

| 환경 변수            | 컴포넌트/모듈                                                          | 설명                                                                                                        |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | 오디오 처리                                                          | 오디오 전사(faster-whisper), 음성 합성(TTS), 오디오 처리 관련 로깅.                                         |
| `COMFYUI_LOG_LEVEL`  | ComfyUI 통합                                                         | ComfyUI와의 상호작용에 대한 로깅, 이 통합을 사용하는 경우.                                                 |
| `CONFIG_LOG_LEVEL`   | 구성 관리                                                            | Open WebUI 구성 파일의 로딩 및 처리를 관련한 로깅.                                                         |
| `DB_LOG_LEVEL`       | 데이터베이스 작업 (Peewee)                                            | Peewee ORM(객체 관계 매퍼)을 사용한 데이터베이스 상호작용에 대한 로깅.                                    |
| `IMAGES_LOG_LEVEL`   | 이미지 생성 (AUTOMATIC1111/Stable Diffusion)                        | 이미지 생성 작업, 특히 AUTOMATIC1111 Stable Diffusion 통합을 사용하는 경우의 로깅.                          |
| `MAIN_LOG_LEVEL`     | 메인 애플리케이션 실행 (루트 로거)                                    | 메인 앱 진입점 및 루트 로거에서 오는 로깅.                                                                 |
| `MODELS_LOG_LEVEL`   | 모델 관리                                                            | 언어 모델(LLMs) 로딩, 관리 및 상호작용 관련 로깅, 인증을 포함합니다.                                        |
| `OLLAMA_LOG_LEVEL`   | Ollama 백엔드 통합                                                   | Ollama 백엔드와의 커뮤니케이션 및 상호작용에 대한 로깅.                                                    |
| `OPENAI_LOG_LEVEL`   | OpenAI API 통합                                                      | OpenAI API와의 상호작용에 대한 로깅 (예: GPT 모델).                                                        |
| `RAG_LOG_LEVEL`      | Retrieval-Augmented Generation (RAG)                                | RAG 파이프라인, Chroma 벡터 데이터베이스 및 Sentence-Transformers와 관련된 로깅.                            |
| `WEBHOOK_LOG_LEVEL`  | 인증 웹훅                                                           | 인증 웹훅 기능에 대한 확장된 로깅.                                                                          |

**사용 방법:**

`GLOBAL_LOG_LEVEL`처럼 이러한 환경 변수를 설정할 수 있습니다(Docker 매개변수, Docker Compose `environment` 섹션). 예를 들어, Ollama 상호작용에 대한 세부 로깅을 더 많이 얻으려면 다음과 같이 설정할 수 있습니다:

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**중요 사항:** `GLOBAL_LOG_LEVEL`과 달리, 이러한 앱 특정 변수들은 *모든* 외부 모듈에서의 로깅에 영향을 미치지 않을 수 있습니다. 주로 Open WebUI 코드베이스 내에서 로깅을 제어합니다.

이러한 로깅 메커니즘을 이해하고 활용하면 Open WebUI 인스턴스를 효과적으로 모니터링하고 디버깅하며 통찰력을 얻을 수 있습니다.
