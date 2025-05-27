---
sidebar_position: 4
title: "🌍 환경 변수 구성"
---


## 개요

Open WebUI는 애플리케이션의 다양한 측면을 사용자화하고 구성할 수 있는 광범위한 환경 변수를 제공합니다. 이 페이지는 사용 가능한 모든 환경 변수를 포괄적으로 참조하며, 변수의 유형, 기본값 및 설명을 제공합니다.
새로운 변수가 도입될 때마다 이 페이지는 증가하는 설정 옵션을 반영하여 업데이트될 것입니다.

:::info

이 페이지는 Open WebUI 릴리스 버전 [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9)에 맞게 최신 상태를 유지하고 있으며, 이후에는 환경 변수에 대한 더 정확한 설명, 기본값 및 옵션들을 나열하고 설명을 개선하기 위해 진행 중입니다.

:::

### `PersistentConfig` 환경 변수에 대한 중요한 참고 사항

:::note

Open WebUI를 처음 실행할 때 모든 환경 변수는 동일하게 취급되며 애플리케이션 구성을 위해 사용할 수 있습니다. 그러나 `PersistentConfig`로 표시된 환경 변수의 값은 내부적으로 보관되고 저장됩니다.

최초 실행 후 컨테이너를 재시작하면 `PersistentConfig` 환경 변수는 더 이상 외부 환경 변수 값을 사용하지 않고 대신 내부적으로 저장된 값을 사용합니다.

반면에 일반 환경 변수는 이후 재시작 시 계속 업데이트되어 적용됩니다.

Open WebUI 내부에서 직접 `PersistentConfig` 환경 변수의 값을 업데이트할 수 있으며, 이러한 변경 사항은 내부적으로 저장됩니다. 이를 통해 외부 환경 변수와 독립적으로 이러한 구성 설정을 관리할 수 있습니다.

`PersistentConfig` 환경 변수는 아래 문서에서 명확히 표시되므로 그 작동 방식에 대해 인지할 수 있습니다.

:::

## 애플리케이션/백엔드

다음 환경 변수는 `backend/open_webui/config.py`에서 Open WebUI 시작 구성 제공을 위해 사용됩니다. 일부 변수는 Open WebUI를 직접 실행하거나 Docker를 통해 실행할 경우 기본값이 다를 수 있습니다. 로깅 환경 변수에 대한 자세한 내용은 [로그 문서](https://docs.openwebui.com/getting-started/advanced-topics/logging)를 참조하세요.

### 일반

#### `WEBUI_URL`

- 유형: `str`
- 기본값: `http://localhost:3000`
- 설명: Open WebUI에 접근 가능한 URL을 지정합니다. 현재 검색 엔진 지원에 사용됩니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_SIGNUP`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 계정 생성 여부를 전환합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_LOGIN_FORM`

- 유형: `bool`
- 기본값: `True`
- 설명: 이메일, 비밀번호, 로그인 및 "또는"(단, `ENABLE_OAUTH_SIGNUP`이 True로 설정된 경우에만) 요소들을 전환합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::danger

이 설정은 [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup)가 사용 중이며 `True`로 설정된 경우에만 **False**로 설정해야 합니다. 그렇지 않으면 로그인할 수 없습니다.

:::

#### `DEFAULT_LOCALE`

- 유형: `str`
- 기본값: `en`
- 설명: 애플리케이션의 기본 로케일을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DEFAULT_MODELS`

- 유형: `str`
- 기본값: 빈 문자열 (' '), 즉 `None`.
- 설명: 기본 언어 모델을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DEFAULT_USER_ROLE`

- 유형: `str`
- 옵션:
  - `pending` - 새로운 사용자는 관리자가 수동으로 계정을 활성화할 때까지 대기 상태입니다.
  - `user` - 새로운 사용자는 정규 사용자 권한으로 자동 활성화됩니다.
  - `admin` - 새로운 사용자는 관리자 권한으로 자동 활성화됩니다.
- 기본값: `pending`
- 설명: 새로운 사용자에게 할당되는 기본 역할을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `PENDING_USER_OVERLAY_TITLE`

- 유형: `str`
- 기본값: 빈 문자열 (' ')
- 설명: 대기 사용자 오버레이에 대한 사용자 정의 제목을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `PENDING_USER_OVERLAY_CONTENT`

- 유형: `str`
- 기본값: 빈 문자열 (' ')
- 설명: 대기 사용자 오버레이에 대한 사용자 정의 텍스트 콘텐츠를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_CHANNELS`

- 유형: `bool`
- 기본값: `False`
- 설명: 채널 지원을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEBHOOK_URL`

- 유형: `str`
- 설명: Discord/Slack/Microsoft Teams와의 통합을 위한 웹훅을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_ADMIN_EXPORT`

- 유형: `bool`
- 기본값: `True`
- 설명: 관리자 사용자가 데이터를 내보낼 수 있도록 제어합니다.

#### `ENABLE_ADMIN_CHAT_ACCESS`

- 유형: `bool`
- 기본값: `True`
- 설명: 관리자 사용자가 모든 채팅에 접근할 수 있도록 활성화합니다.

#### `ENABLE_USER_WEBHOOKS`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 웹훅을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RESPONSE_WATERMARK`

- 유형: `str`
- 기본값: 빈 문자열 ( )
- 설명: 채팅 메시지를 복사할 때 포함될 사용자 정의 텍스트를 설정합니다. 예: `"이 텍스트는 AI 생성입니다"` -> 복사 시 모든 메시지에 "이 텍스트는 AI 생성입니다"가 추가됩니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `THREAD_POOL_SIZE`

- 유형: `int`
- 기본값: `0`
- 설명: FastAPI/AnyIO 차단 호출을 위한 스레드 풀 크기를 설정합니다. 기본적으로 (0으로 설정된 경우) FastAPI/AnyIO는 `40`개의 스레드를 사용합니다. 대규모 인스턴스와 많은 동시 사용자 경우, 차단을 방지하기 위해 `THREAD_POOL_SIZE`를 증가시켜야 할 수 있습니다.

#### `SHOW_ADMIN_DETAILS`

- 유형: `bool`
- 기본값: `True`
- 설명: 인터페이스에서 관리자 사용자 세부 정보를 표시할지 여부를 토글합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ADMIN_EMAIL`

- 유형: `str`
- 설명: `SHOW_ADMIN_DETAILS`에 의해 표시되는 관리자 이메일을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENV`

- 유형: `str`
- 옵션:
  - `dev` - `/docs`에서 FastAPI API 문서를 활성화합니다.
  - `prod` - 여러 환경 변수를 자동으로 구성합니다.
- 기본값:
  - **백엔드 기본값**: `dev`
  - **Docker 기본값**: `prod`
- 설명: 환경 설정.

#### `ENABLE_PERSISTENT_CONFIG`

- 유형: `bool`
- 기본값: `True`
- 설명: `False`로 설정하면 모든 `PersistentConfig` 변수를 일반 변수로 처리합니다.

#### `CUSTOM_NAME`

- 유형: `str`
- 설명: **api.openwebui.com**에서 메타데이터를 검색하여 `WEBUI_NAME`을 설정합니다.

#### `WEBUI_NAME`

- 유형: `str`
- 기본값: `Open WebUI`
- 설명: 주요 WebUI 이름을 설정합니다. 덮어쓴 경우 `(Open WebUI)`가 추가됩니다.

#### `PORT`

- 유형: `int`
- 기본값: `8080`
- 설명: Open WebUI를 실행할 포트를 설정합니다.

:::info
Python을 통해 애플리케이션을 실행하고 `open-webui serve` 명령을 사용하는 경우, `PORT` 구성을 사용하여 포트를 설정할 수 없습니다. 대신 `--port` 플래그를 사용하는 명령줄 인수로 직접 지정해야 합니다. 예:

```bash
open-webui serve --port 9999
```

이는 Open WebUI를 포트 `9999`에서 실행합니다. 이 모드에서는 `PORT` 환경 변수가 무시됩니다.
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- 유형: `bool`
- 기본값: `False`
- 설명: 활성화되면 전송 스트림 채팅 데이터를 최대한 실시간으로 데이터베이스에 저장하여 데이터 지속성을 보장합니다. 이 기능은 강력한 데이터 복구를 제공하며 정확한 세션 추적을 허용합니다. 그러나 데이터베이스에 저장하는 데 지연이 생긴다는 단점이 있습니다. 이 기능을 비활성화하면 성능이 향상되고 지연 시간이 줄어들지만, 시스템 오류 또는 충돌이 발생했을 경우 데이터 손실 위험이 있습니다. 애플리케이션의 요구사항과 수용 가능한 절충에 따라 사용하십시오.

#### `BYPASS_MODEL_ACCESS_CONTROL`

- 유형: `bool`
- 기본값: `False`
- 설명: 모델 접근 제어를 우회합니다.

#### `WEBUI_BUILD_HASH`

- 유형: `str`
- 기본값: `dev-build`
- 설명: 릴리스를 위한 Git SHA 식별에 사용됩니다.

#### `WEBUI_BANNERS`

- 유형: `list` of `dict`
- 기본값: `[]`
- 설명: 사용자에게 표시할 배너 목록입니다. 배너 형식은 다음과 같습니다:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::info

`.env` 파일에서 이 환경 변수를 설정할 때 따옴표를 이스케이프하여 전체 값을 이중 따옴표로 묶고 내부 따옴표를 이스케이프된 따옴표 (`\"`)로 사용하십시오. 예:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"Your messages are stored.\", \"content\": \"Your messages are stored and may be reviewed by human people. LLMs are prone to hallucinations, check sources.\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- 유형: `bool`
- 기본값: `False`
- 설명: NVIDIA CUDA 지원으로 Docker 이미지를 구축합니다. 로컬 Whisper 및 임베딩을 위한 GPU 가속을 활성화합니다.

#### `EXTERNAL_PWA_MANIFEST_URL`

- 유형: `str`
- 기본값: 빈 문자열 ( ), 기본값은 `None`으로 설정되어 있습니다.
- 설명: 완전히 정의된 URL로 설정되었을 경우 (예: https://path/to/manifest.webmanifest), /manifest.json으로 전송되는 요청은 외부 manifest 파일을 사용합니다. 정의되지 않은 경우 기본 manifest.json 파일이 사용됩니다.

#### `ENABLE_TITLE_GENERATION`

- 타입: `bool`
- 기본값: `True`
- 설명: 채팅 제목 생성 활성화 또는 비활성화.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LICENSE_KEY`

- 타입: `str`
- 기본값: `None`
- 설명: 사용해야 할 라이센스 키 지정(Enterprise 사용자 전용).
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SSL_ASSERT_FINGERPRINT`

- 타입: `str`
- 기본값: 빈 문자열(' '), 기본값으로 `None` 설정됨.
- 설명: 사용할 SSL 인증 지문 지정.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DEFAULT_PROMPT_SUGGESTIONS`

- 타입: `list` of `dict`
- 기본값: `[]`(기본 내장된 프롬프트 제안을 사용한다는 의미)
- 설명: 프롬프트 제안 목록. 프롬프트 제안의 형식은 아래와 같습니다:

```json
[{"title": ["Title part 1", "Title part 2"], "content": "prompt"}]
```

### AIOHTTP 클라이언트

#### `AIOHTTP_CLIENT_TIMEOUT`

- 타입: `int`
- 기본값: `300`
- 설명: AIOHTTP 클라이언트의 시간 초과 기간(초)을 지정합니다. 이는 Ollama 및 OpenAI 엔드포인트와의 연결과 같은 항목에 영향을 미칩니다.

:::info

클라이언트가 응답을 기다리는 최대 시간이 이 변수로 설정됩니다.
빈 문자열(' ')을 설정하면 시간 초과가 `None`으로 설정되며, 이는 시간 초과를 비활성화하고 클라이언트가 무기한 대기하도록 허용합니다.

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- 타입: `int`
- 기본값: `10`
- 설명: 모델 목록을 가져오는 데 필요한 시간 초과를 초 단위로 설정합니다. 네트워크 지연 시간으로 인해 모델 목록을 성공적으로 가져오기 위해 더 긴 시간 초과가 필요할 경우 유용할 수 있습니다.

:::note
AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST는 기본적으로 10초로 설정되어 웹 UI를 열 때 필요한 모든 연결을 사용할 수 있도록 합니다. 이 지속 시간은 네트워크 지연이 더 높은 경우에도 모델 목록을 가져올 수 있도록 충분한 시간을 제공합니다. 더 빠른 시간 초과가 선호되면 이 값을 낮출 수 있지만, 네트워크 상태에 따라 일부 연결이 끊어질 수 있으니 유의하십시오.
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- 타입: `int`
- 설명: 모델 목록을 가져오는 데 필요한 시간 초과를 초 단위로 설정합니다. 네트워크 지연 시간으로 인해 모델 목록을 성공적으로 가져오기 위해 더 긴 시간 초과가 필요할 경우 유용할 수 있습니다.

### 디렉터리

#### `DATA_DIR`

- 타입: `str`
- 기본값: `./data`
- 설명: 업로드, 캐시, 벡터 데이터베이스 등을 포함한 데이터 저장을 위한 기본 디렉터리 지정.

#### `FONTS_DIR`

- 타입: `str`
- 설명: 폰트에 대한 디렉터리 지정.

#### `FRONTEND_BUILD_DIR`

- 타입: `str`
- 기본값: `../build`
- 설명: 빌드된 프런트엔드 파일의 위치를 지정합니다.

#### `STATIC_DIR`

- 타입: `str`
- 기본값: `./static`
- 설명: 파비콘과 같은 정적 파일에 대한 디렉터리 지정.

### Ollama

#### `ENABLE_OLLAMA_API`

- 타입: `bool`
- 기본값: `True`
- 설명: Ollama API 사용 활성화.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL`는 사용 중지됨) {#ollama_base_url}

- 타입: `str`
- 기본값: `http://localhost:11434`
- Docker 기본값:
  - `K8S_FLAG`가 설정된 경우: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - `USE_OLLAMA_DOCKER=True`인 경우: `http://localhost:11434`
  - 그 외: `http://host.docker.internal:11434`
- 설명: Ollama 백엔드 URL 구성.

#### `OLLAMA_BASE_URLS`

- 타입: `str`
- 설명: 세미콜론(`;`)으로 구분된 로드 밸런싱된 Ollama 백엔드 호스트를 구성합니다. [`OLLAMA_BASE_URL`](#ollama_base_url) 참조. [`OLLAMA_BASE_URL`](#ollama_base_url)보다 우선합니다.
- 예: `http://host-one:11434;http://host-two:11434`
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USE_OLLAMA_DOCKER`

- 타입: `bool`
- 기본값: `False`
- 설명: 번들된 Ollama 인스턴스와 함께 도커 이미지를 빌드합니다.

#### `K8S_FLAG`

- 타입: `bool`
- 기본값: `False`
- 설명: 설정된 경우, Helm 차트 배포를 가정하고 [`OLLAMA_BASE_URL`](#ollama_base_url)을 `http://ollama-service.open-webui.svc.cluster.local:11434`로 설정합니다.

### OpenAI

#### `ENABLE_OPENAI_API`

- 타입: `bool`
- 기본값: `True`
- 설명: OpenAI API 사용 활성화.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OPENAI_API_BASE_URL`

- 타입: `str`
- 기본값: `https://api.openai.com/v1`
- 설명: OpenAI 기본 API URL 구성.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OPENAI_API_BASE_URLS`

- 타입: `str`
- 설명: 세미콜론으로 분리된 균형 잡힌 OpenAI 기본 API URL 지원.
- 예: `http://host-one:11434;http://host-two:11434`
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OPENAI_API_KEY`

- 타입: `str`
- 설명: OpenAI API 키를 설정합니다.
- 예시: `sk-124781258123`
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `OPENAI_API_KEYS`

- 유형: `str`
- 설명: 세미콜론으로 구분된 여러 OpenAI API 키를 지원합니다.
- 예시: `sk-124781258123;sk-4389759834759834`
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

### 작업

#### `TASK_MODEL`

- 유형: `str`
- 설명: 제목 및 웹 검색 쿼리 생성과 같은 작업에 사용되는 기본 모델
Ollama 모델을 사용할 때.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `TASK_MODEL_EXTERNAL`

- 유형: `str`
- 설명: 제목 및 웹 검색 쿼리 생성과 같은 작업에 사용되는 기본 모델
OpenAI 호환 엔드포인트를 사용할 때.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- 유형: `str`
- 설명: 대화 제목을 생성할 때 사용하는 프롬프트.
- 기본값: `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE` 환경 변수의 값.

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### 작업:
대화 기록을 요약하는 간결한 3-5단어 제목과 이모지를 생성합니다.
### 지침:
- 제목은 대화의 주요 테마 또는 주제를 명확히 나타내야 합니다.
- 주제를 이해하는데 도움을 줄 수 있는 이모지를 사용하되, 인용 부호나 특별한 서식을 피하십시오.
- 제목은 대화의 주요 언어로 작성하되, 다국어일 경우 기본값으로 영어를 사용하십시오.
- 과도한 창의성보다 정확성을 우선으로 하며, 간단하고 명확하게 작성하십시오.
### 출력:
JSON 형식: { "title": "여기에 간결한 제목 작성" }
### 예제:
- { "title": "📉 주식 시장 동향" },
- { "title": "🍪 완벽한 초콜릿 칩 레시피" },
- { "title": "음악 스트리밍의 진화" },
- { "title": "원격 근무 생산성 팁" },
- { "title": "헬스케어의 인공지능" },
- { "title": "🎮 비디오 게임 개발 통찰" }
### 대화 기록:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- 유형: `str`
- 설명: 도구를 호출할 때 사용하는 프롬프트.
- 기본값: `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE` 환경 변수의 값.

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
사용 가능한 도구: {{TOOLS}}

쿼리에 따라 적절한 도구를 선택하고 반환하는 것이 당신의 작업입니다. 다음 지침을 따르십시오:

- 추가 텍스트 또는 설명 없이 JSON 객체만 반환하십시오.

- 쿼리에 해당하는 도구가 없는 경우 빈 배열을 반환하십시오: 
   {
     "tool_calls": []
   }

- 하나 이상의 도구가 쿼리와 일치하는 경우, "tool_calls" 배열을 포함하는 JSON 응답을 구성하십시오. 배열 내 객체는 다음을 포함합니다:
   - "name": 도구의 이름.
   - "parameters": 필요한 매개 변수와 해당 값을 포함하는 사전.

JSON 응답의 형식은 엄격하게:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

### 코드 실행

#### `ENABLE_CODE_EXECUTION`

- 유형: `bool`
- 기본값: `True`
- 설명: 코드 실행의 활성화 또는 비활성화.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_ENGINE`

- 유형: `str`
- 기본값: `pyodide`
- 설명: 사용할 코드 실행 엔진을 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_JUPYTER_URL`

- 유형: `str`
- 기본값: `None`
- 설명: 코드 실행에 사용할 Jupyter URL을 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_JUPYTER_AUTH`

- 유형: `str`
- 기본값: `None`
- 설명: 코드 실행에 사용할 Jupyter 인증 방법을 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- 유형: `str`
- 기본값: `None`
- 설명: 코드 실행에 사용할 Jupyter 인증 토큰을 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- 유형: `str`
- 기본값: `None`
- 설명: 코드 실행에 사용할 Jupyter 인증 비밀번호를 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- 유형: `str`
- 기본값: 빈 문자열(' '), 기본값은 `None`입니다.
- 설명: Jupyter 코드 실행의 시간 초과를 지정합니다.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

### 코드 인터프리터

#### `ENABLE_CODE_INTERPRETER`

- 유형: `bool`
- 기본값: `True`
- 설명: 코드 인터프리터의 활성화 또는 비활성화.
- 지속성: 이 환경 변수가 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_ENGINE`

- 유형: `str`
- 기본값: `pyodide`
- 설명: 사용하려는 코드 인터프리터 엔진을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- 유형: `str`
- 기본값: `None`
- 설명: 코드 인터프리터에 사용되는 프롬프트 템플릿을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_JUPYTER_URL`

- 유형: `str`
- 기본값: 빈 문자열 ( ), `None`이 기본값으로 설정되어 있음.
- 설명: 코드 인터프리터에 사용되는 Jupyter URL을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- 유형: `str`
- 기본값: 빈 문자열 ( ), `None`이 기본값으로 설정되어 있음.
- 설명: 코드 인터프리터를 위한 Jupyter 인증 방법을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- 유형: `str`
- 기본값: 빈 문자열 ( ), `None`이 기본값으로 설정되어 있음.
- 설명: 코드 인터프리터를 위한 Jupyter 인증 토큰을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- 유형: `str`
- 기본값: 빈 문자열 ( ), `None`이 기본값으로 설정되어 있음.
- 설명: 코드 인터프리터를 위한 Jupyter 인증 비밀번호를 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- 유형: `str`
- 기본값: 빈 문자열 ( ), `None`이 기본값으로 설정되어 있음.
- 설명: Jupyter 코드 인터프리터의 타임아웃을 지정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 직접 연결 (OpenAPI/MCPO Tool Servers)

#### `ENABLE_DIRECT_CONNECTIONS`

- 유형: `bool`
- 기본값: `True`
- 설명: 직접 연결을 활성화하거나 비활성화합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 자동완성

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 자동완성 생성을 활성화하거나 비활성화합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::정보

`ENABLE_AUTOCOMPLETE_GENERATION`을 활성화하려면 `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` 및 `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`을 적절히 구성해야 합니다.

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- 유형: `int`
- 기본값: `-1`
- 설명: 자동완성 생성에 대한 최대 입력 길이를 설정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- 유형: `str`
- 기본값: `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` 환경 변수의 값.

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### 작업:
당신은 자동완성 시스템입니다. `<text>`와 주어진 언어의 **완성 유형** 유형에 따라 텍스트를 계속해 주세요.

### **지침**:
1. `<text>`의 문맥과 의미를 분석합니다.
2. `<type>`을 사용하여 출력을 안내합니다:
   - **일반**: 자연스럽고 간결한 계속을 제공합니다.
   - **검색 쿼리**: 현실적인 검색 쿼리를 생성하는 것처럼 완성합니다.
3. `<text>`를 바로 계속하는 것으로 시작하세요. 텍스트를 반복하거나, 바꾸거나, 모델로서 응답하지 마세요. 단순히 텍스트를 완성하세요.
4. 계속하기 위해 다음을 보장하세요:
   - `<text>`에서 자연스럽게 이어집니다.
   - 반복, 과도한 설명 또는 관련 없는 아이디어를 피합니다.
5. 확실하지 않은 경우 반환하세요: `{ "text": "" }`.

### **출력 규칙**:
- JSON 형식으로만 응답하세요: `{ "text": "<your_completion>" }`.

### **예시**:
#### 예시 1:
입력:
<type>General</type>
<text>The sun was setting over the horizon, painting the sky</text>
출력:
{ "text": "with vibrant shades of orange and pink." }

#### 예시 2:
입력:
<type>Search Query</type>
<text>Top-rated restaurants in</text>
출력:
{ "text": "New York City for Italian cuisine." }

---
### 문맥:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### 출력:
```

- 설명: 자동완성 생성을 위한 프롬프트 템플릿을 설정합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 평가 아레나 모델

#### `ENABLE_EVALUATION_ARENA_MODELS`

- 유형: `bool`
- 기본값: `True`
- 설명: 평가 아레나 모델을 활성화하거나 비활성화합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_MESSAGE_RATING`

- 유형: `bool`
- 기본값: `True`
- 설명: 메시지 평가 기능을 활성화합니다.
- 영구성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_COMMUNITY_SHARING`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자가 커뮤니티에 공유 버튼을 표시할지 여부를 제어합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 태그 생성

#### `ENABLE_TAGS_GENERATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 태그 생성을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- 유형: `str`
- 기본값: `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE` 환경 변수의 값.

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### 작업:
대화 기록의 주요 주제를 분류하는 1-3개의 넓은 태그와 1-3개의 더 구체적인 하위 주제 태그를 생성합니다.

### 가이드라인:
- 상위 수준 도메인으로 시작합니다 (예: 과학, 기술, 철학, 예술, 정치, 비즈니스, 건강, 스포츠, 엔터테인먼트, 교육)
- 대화에서 강하게 나타나는 관련 하위 분야/도메인을 포함하도록 고려하세요.
- 내용이 너무 짧거나 (3개 이하 메시지) 너무 다양한 경우 ["일반"]만 사용합니다.
- 대화의 주요 언어를 사용합니다; 다국어라면 기본적으로 영어를 사용하세요.
- 정확성을 우선으로 하고 구체성은 그다음입니다.

### 출력:
JSON 형식: { "tags": ["tag1", "tag2", "tag3"] }

### 대화 기록:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 설명: 태그 생성을 위한 프롬프트 템플릿을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### API 키 엔드포인트 제한

#### `ENABLE_API_KEY`

- 유형: `bool`
- 기본값: `True`
- 설명: API 키 인증을 활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- 유형: `bool`
- 기본값: `False`
- 설명: 추가 보안 및 구성 가능성을 위해 API 키 엔드포인트 제한을 활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `API_KEY_ALLOWED_ENDPOINTS`

- 유형: `str`
- 설명: API 키 엔드포인트 제한이 활성화되었을 때 허용된 API 엔드포인트의 쉼표로 구분된 목록을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::참고

`API_KEY_ALLOWED_ENDPOINTS` 값은 `/api/v1/messages, /api/v1/channels`와 같은 엔드포인트 URL의 쉼표로 구분된 목록이어야 합니다.

:::

#### `JWT_EXPIRES_IN`

- 유형: `int`
- 기본값: `-1`
- 설명: JWT 만료 시간을 초 단위로 설정합니다. 유효한 시간 단위: `s`, `m`, `h`, `d`, `w` 또는 만료 없음의 경우에는 `-1`.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 보안 변수

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- 유형: `bool`
- 기본값: `False`
- 설명: 사용자 정보(이름, ID, 이메일, 역할)를 X-헤더로 OpenAI API 및 Ollama API에 전달합니다.
활성화된 경우 다음 헤더가 전달됩니다:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 웹사이트에서 SSL 인증을 우회합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- 유형: `str`
- 옵션:
  - `lax` - `SameSite` 속성을 lax로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 세션 쿠키를 전송할 수 있도록 허용합니다.
  - `strict` - `SameSite` 속성을 strict로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 세션 쿠키를 차단합니다.
  - `none` - `SameSite` 속성을 none으로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 세션 쿠키를 전송할 수 있도록 허용하되, HTTPS로만 전송되도록 합니다.
- 기본값: `lax`
- 설명: 세션 쿠키의 `SameSite` 속성을 설정합니다.

:::경고

`ENABLE_OAUTH_SIGNUP`이 활성화된 경우 `WEBUI_SESSION_COOKIE_SAME_SITE`를 `strict`로 설정하면 로그인 실패가 발생할 수 있습니다. 이는 Open WebUI가 OAuth 공급자에서의 콜백을 유효화하기 위해 세션 쿠키를 사용하게 됨으로 인해 CSRF 공격을 방지할 수 있는 이유 때문입니다.

하지만 `strict` 세션 쿠키는 콜백 요청과 함께 전송되지 않아 로그인 문제를 초래할 수 있습니다. 이 문제를 경험한다면 기본 값인 `lax`를 사용하세요.

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- 유형: `bool`
- 기본값: `False`
- 설명: `Secure` 속성을 세션 쿠키에 설정합니다 (`True`로 설정된 경우).

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- 유형: `str`
- 옵션:
  - `lax` - `SameSite` 속성을 lax로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 인증 쿠키를 전송할 수 있도록 허용합니다.
  - `strict` - `SameSite` 속성을 strict로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 인증 쿠키를 차단합니다.
  - `none` - `SameSite` 속성을 none으로 설정하여 제3자 웹사이트에서 시작된 요청과 함께 인증 쿠키를 전송할 수 있도록 허용하되, HTTPS로만 전송되도록 합니다.
- 기본값: `lax`
- 설명: 인증 쿠키의 `SameSite` 속성을 설정합니다.

:::참고

값이 설정되지 않은 경우 `WEBUI_SESSION_COOKIE_SAME_SITE`가 기본값으로 사용됩니다.

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- 유형: `bool`
- 기본값: `False`
- 설명: `True`로 설정하면 인증 쿠키에 `Secure` 속성을 설정합니다.

:::정보

값이 설정되지 않은 경우, `WEBUI_SESSION_COOKIE_SECURE`가 대체로 사용됩니다.

:::

#### `WEBUI_AUTH`

- 유형: `bool`
- 기본값: `True`
- 설명: 이 설정은 인증 활성화 또는 비활성화를 제어합니다.

:::위험

`False`로 설정된 경우, Open WebUI 인스턴스에 대한 인증이 비활성화됩니다. 그러나
인증을 끄는 것은 기존 사용자가 없는 새로 설치된 상황에서만 가능합니다. 이미 등록된 사용자가 있는 경우, 직접적으로 인증을 비활성화할 수 없습니다.
인증을 끄는 목적이라면 데이터베이스에 사용자가 추가되지 않았는지 확인해야 합니다.

:::

#### `WEBUI_SECRET_KEY`

- 유형: `str`
- 기본값: `t0p-s3cr3t`
- 도커 기본값: 첫 실행 시 랜덤으로 생성
- 설명: JSON Web Token에 사용되는 랜덤 문자열을 재정의합니다.

:::정보

로드 밸런서가 있는 다중 노드 클러스터에서 Open-WebUI를 배포할 때, 모든 인스턴스에서 동일한
WEBUI_SECRET_KEY 값을 사용해야 합니다. 이를 통해 사용자는 노드가 교체되거나 다른 노드로 세션이 전달될 경우에도
작업을 계속 진행할 수 있습니다. 그렇지 않으면 노드가 변경될 때마다 다시 로그인해야 합니다.

:::

#### `OFFLINE_MODE`

- 유형: `bool`
- 기본값: `False`
- 설명: 오프라인 모드를 활성화하거나 비활성화합니다.

#### `RESET_CONFIG_ON_START`

- 유형: `bool`
- 기본값: `False`
- 설명: 시작 시 `config.json` 파일을 초기화합니다.

#### `SAFE_MODE`

- 유형: `bool`
- 기본값: `False`
- 설명: 안전 모드를 활성화하여 잠재적으로 위험한 기능을 비활성화하고 모든 기능을 비활성화합니다.

#### `CORS_ALLOW_ORIGIN`

- 유형: `str`
- 기본값: `*`
- 설명: Cross-Origin Resource Sharing (CORS) 허용 출처를 설정합니다.

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- 유형: `bool`
- 기본값: `False`
- 설명: 자체 모델링 파일에 Hub에서 정의된 사용자 지정 모델을 허용할지를 결정합니다.

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- 유형: `bool`
- 기본값: `False`
- 설명: 다시 랭킹을 위한 허브에서 자체 모델링 파일에 정의된 사용자 지정 모델을 허용할지를 결정합니다.

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- 유형: `bool`
- 기본값: `True`
- 설명: Sentence-Transformer 모델의 자동 업데이트를 전환합니다.

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- 유형: `bool`
- 기본값: `True`
- 설명: 다시 랭킹 모델의 자동 업데이트를 전환합니다.

## 벡터 데이터베이스

#### `VECTOR_DB`

- 유형: `str`
- 옵션:
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- 기본값: `chroma`
- 설명: 사용할 벡터 데이터베이스 시스템을 지정합니다. 이 설정은 임베딩을 관리하기 위해 사용할 벡터 저장 시스템을 결정합니다.

### ChromaDB

#### `CHROMA_TENANT`

- 유형: `str`
- 기본값: `chromadb.DEFAULT_TENANT` ( `chromadb` 모듈의 상수값)
- 설명: RAG 임베딩을 위해 사용할 ChromaDB 테넌트를 설정합니다.

#### `CHROMA_DATABASE`

- 유형: `str`
- 기본값: `chromadb.DEFAULT_DATABASE` ( `chromadb` 모듈의 상수값)
- 설명: RAG 임베딩을 위해 사용할 ChromaDB 테넌트 내 데이터베이스를 설정합니다.

#### `CHROMA_HTTP_HOST`

- 유형: `str`
- 설명: 원격 ChromaDB 서버의 호스트 이름을 지정합니다. 설정되지 않은 경우 로컬 ChromaDB 인스턴스를 사용합니다.

#### `CHROMA_HTTP_PORT`

- 유형: `int`
- 기본값: `8000`
- 설명: 원격 ChromaDB 서버의 포트를 지정합니다.

#### `CHROMA_HTTP_HEADERS`

- 유형: `str`
- 설명: 모든 ChromaDB 요청과 함께 포함될 HTTP 헤더의 쉼표로 구분된 목록.
- 예시: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`.

#### `CHROMA_HTTP_SSL`

- 유형: `bool`
- 기본값: `False`
- 설명: ChromaDB 서버 연결에 SSL을 사용할지 여부를 제어합니다.

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- 유형: `str`
- 설명: 원격 ChromaDB 서버용 인증 공급자를 지정합니다.
- 예시: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- 유형: `str`
- 설명: 원격 ChromaDB 서버용 인증 자격을 지정합니다.
- 예시: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- 유형: `str`
- 기본값: 빈 문자열 (' '), 기본값은 `None`으로 설정됩니다.
- 설명: Elasticsearch API 키를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_CA_CERTS`

- 유형: `str`
- 기본값: 빈 문자열 (' '), 기본값은 `None`으로 설정됩니다.
- 설명: Elasticsearch 인증 기관 인증서 경로를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_CLOUD_ID`

- 유형: `str`
- 기본값: 빈 문자열 (' '), 기본값은 `None`으로 설정됩니다.
- 설명: Elasticsearch 클라우드 ID를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_INDEX_PREFIX`

- 유형: `str`
- 기본값: `open_webui_collections`
- Description: Elasticsearch 인덱스의 접두사를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_PASSWORD`

- Type: `str`
- Default: 기본값은 빈 문자열 ( )이며, `None`으로 설정됩니다.
- Description: Elasticsearch의 비밀번호를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_URL`

- Type: `str`
- Default: `https://localhost:9200`
- Description: Elasticsearch 인스턴스의 URL을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ELASTICSEARCH_USERNAME`

- Type: `str`
- Default: 기본값은 빈 문자열 ( )이며, `None`으로 설정됩니다.
- Description: Elasticsearch의 사용자 이름을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

### Milvus

#### `MILVUS_URI`

- Type: `str`
- Default: `${DATA_DIR}/vector_db/milvus.db`
- Description: Milvus 벡터 데이터베이스에 연결할 URI를 설정합니다. 이는 배포 구성에 따라 로컬 또는 원격 Milvus 서버를 가리킬 수 있습니다.

#### `MILVUS_DB`

- Type: `str`
- Default: `default`
- Description: Milvus 인스턴스 내에서 연결할 데이터베이스를 설정합니다.

#### `MILVUS_TOKEN`

- Type: `str`
- Default: `None`
- Description: Milvus에 사용될 선택적 연결 토큰을 설정합니다.

#### `MILVUS_INDEX_TYPE`

- Type: `str`
- Default: `HNSW`
- Options: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- Description: Milvus에서 새 컬렉션을 생성할 때 사용될 인덱스 유형을 설정합니다. `AUTOINDEX`는 일반적으로 Milvus 단독형에 권장됩니다. `HNSW`는 더 나은 성능을 제공할 수 있으나 일반적으로 클러스터된 Milvus 설정이 필요합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MILVUS_METRIC_TYPE`

- Type: `str`
- Default: `COSINE`
- Options: `COSINE`, `IP`, `L2`
- Description: Milvus에서 벡터 유사도 검색을 위한 메트릭 유형을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MILVUS_HNSW_M`

- Type: `int`
- Default: `16`
- Description: Milvus에서 HNSW 인덱스 유형의 `M` 파라미터를 설정합니다. 이는 생성 중 새 요소마다 생성되는 양방향 링크 수에 영향을 미칩니다. `MILVUS_INDEX_TYPE`이 `HNSW`일 경우에만 적용됩니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MILVUS_HNSW_EFCONSTRUCTION`

- Type: `int`
- Default: `100`
- Description: Milvus에서 HNSW 인덱스 유형의 `efConstruction` 파라미터를 설정합니다. 이는 인덱스 생성 중 가장 가까운 이웃을 위한 동적 목록 크기에 영향을 미칩니다. `MILVUS_INDEX_TYPE`이 `HNSW`일 경우에만 적용됩니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MILVUS_IVF_FLAT_NLIST`

- Type: `int`
- Default: `128`
- Description: Milvus에서 IVF_FLAT 인덱스 유형의 `nlist` 파라미터를 설정합니다. 이는 클러스터 유닛 수를 나타냅니다. `MILVUS_INDEX_TYPE`이 `IVF_FLAT`일 경우에만 적용됩니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- Type: `bool`
- Default: `False`
- Description: OpenSearch 인증서 검증을 활성화하거나 비활성화합니다.

#### `OPENSEARCH_PASSWORD`

- Type: `str`
- Default: `None`
- Description: OpenSearch 비밀번호를 설정합니다.

#### `OPENSEARCH_SSL`

- Type: `bool`
- Default: `True`
- Description: OpenSearch SSL을 활성화하거나 비활성화합니다.

#### `OPENSEARCH_URI`

- Type: `str`
- Default: `https://localhost:9200`
- Description: OpenSearch의 URI를 설정합니다.

#### `OPENSEARCH_USERNAME`

- Type: `str`
- Default: `None`
- Description: OpenSearch 사용자 이름을 설정합니다.

### PGVector

#### `PGVECTOR_DB_URL`

- Type: `str`
- Default: `DATABASE_URL` 환경 변수의 값
- Description: 모델 저장을 위한 데이터베이스 URL을 설정합니다.

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- Type: `str`
- Default: `1536`
- Description: PGVector 초기화를 위한 최대 벡터 길이를 설정합니다.

### Qdrant

#### `QDRANT_API_KEY`

- Type: `str`
- Description: Qdrant API 키를 설정합니다.

#### `QDRANT_URI`

- Type: `str`
- Description: Qdrant의 URI를 설정합니다.

#### `QDRANT_ON_DISK`

- Type: `bool`
- Default: `False`
- Description: 메모리 매핑(온디스크) 스토리지를 활성화합니다.

#### `QDRANT_PREFER_GRPC`

- Type: `bool`
- Default: `False`
- Description: 가능하면 gRPC 인터페이스를 사용합니다.

#### `QDRANT_GRPC_PORT`

- Type: `int`
- Default: `6334`
- Description: Qdrant의 gRPC 포트 번호를 설정합니다.

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- Type: `bool`
- Default: `False`
- Description: Qdrant 컬렉션 관리를 위한 멀티테넌시 패턴을 활성화하여 유사 벡터 데이터 구조를 통합함으로써 RAM 사용량과 컴퓨팅 오버헤드를 대폭 줄입니다. 활성화를 추천합니다.

:::info

이 설정은 이전 패턴(비멀티테넌시)으로 생성된 모든 Qdrant 컬렉션 연결을 끊습니다. 기존 지식을 마이그레이션하려면 `Admin Settings` > `Documents` > `Reindex Knowledge Base`로 이동하십시오.

이전 패턴에서 생성된 Qdrant 컬렉션은 여전히 리소스를 소비합니다.

현재 UI에 벡터 DB만 리셋하는 버튼은 없습니다. 지식을 멀티 테넌시로 마이그레이션하려면:
- 네이티브 Qdrant 클라이언트를 사용하여 `open_webui-knowledge` 접두사가 있는 모든 컬렉션 (또는 Open WebUI와 관련된 모든 컬렉션을 제거하려면 `open_webui` 접두사가 있는 모든 컬렉션)을 제거합니다.
- `관리 설정` > `문서` > `지식 베이스 재색인`으로 이동하여 기존 지식 베이스를 마이그레이션합니다.

`지식 베이스 재색인`은 기존 지식 베이스만 마이그레이션합니다.

:::

:::위험

멀티 테넌시 패턴을 기본값으로 사용하기로 결정하고 이전 지식을 마이그레이션할 필요가 없다면, `관리 설정` > `문서`에서 벡터와 지식을 리셋하여 `open_webui` 접두사가 있는 모든 컬렉션 및 저장된 모든 지식을 삭제할 수 있습니다.

:::

### Pinecone

Pinecone을 벡터 스토어로 사용할 때 다음 환경 변수를 사용하여 동작을 제어합니다. 이 변수들을 `.env` 파일 또는 배포 환경에 설정해야 합니다.

#### `PINECONE_API_KEY`

- 유형: `str`
- 기본값: `없음`
- 설명: Pinecone 서비스에 인증하는 데 사용되는 API 키를 설정합니다.

#### `PINECONE_ENVIRONMENT`

- 유형: `str`
- 기본값: `없음`
- 설명: 연결할 Pinecone 환경을 지정합니다 (예: `us-west1-gcp`, `gcp-starter` 등).

#### `PINECONE_INDEX_NAME`

- 유형: `str`
- 기본값: `open-webui-index`
- 설명: 벡터 임베딩을 저장하고 쿼리하는 데 사용할 Pinecone 인덱스의 이름을 정의합니다.

#### `PINECONE_DIMENSION`

- 유형: `int`
- 기본값: `1536`
- 설명: 벡터 임베딩의 차원입니다. 인덱스에서 예상하는 차원과 일치해야 합니다 (대개 사용된 모델에 따라 768, 1024, 1536 또는 3072).

#### `PINECONE_METRIC`

- 유형: `str`
- 기본값: `cosine`
- 옵션: `cosine`, `dotproduct`, `euclidean`
- 설명: Pinecone 인덱스 내에서 벡터 비교를 위해 사용할 유사성 메트릭을 지정합니다.

#### `PINECONE_CLOUD`

- 유형: `str`
- 기본값: `aws`
- 옵션: `aws`, `gcp`, `azure`
- 설명: Pinecone 인덱스가 호스팅된 클라우드 공급자를 지정합니다.

## RAG 콘텐츠 추출 엔진

#### `CONTENT_EXTRACTION_ENGINE`

- 유형: `str`
- 옵션:
  - 기본값 사용하려면 비워 두기
  - `external` - 외부 로더 사용
  - `tika` - 로컬 Apache Tika 서버 사용
  - `docling` - Docling 엔진 사용
  - `document_intelligence` - Document Intelligence 엔진 사용
  - `mistral_ocr` - Mistral OCR 엔진 사용
- 설명: 문서 수집을 위한 콘텐츠 추출 엔진을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MISTRAL_OCR_API_KEY`

- 유형: `str`
- 기본값: `없음`
- 설명: Mistral OCR API 키를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- 유형: `str`
- 기본값: `없음`
- 설명: 외부 문서 로더 서비스의 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- 유형: `str`
- 기본값: `없음`
- 설명: 외부 문서 로더 서비스에 인증하기 위한 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `TIKA_SERVER_URL`

- 유형: `str`
- 기본값: `http://localhost:9998`
- 설명: Apache Tika 서버의 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DOCLING_SERVER_URL`

- 유형: `str`
- 기본값: `http://docling:5001`
- 설명: Docling 서버의 URL을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DOCLING_OCR_ENGINE`

- 유형: `str`
- 기본값: `tesseract`
- 설명: Docling에서 사용하는 OCR 엔진을 지정합니다.
  지원되는 값: `tesseract` (기본값), `easyocr`, `ocrmac`, `rapidocr`, `tesserocr`.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DOCLING_OCR_LANG`

- 유형: `str`
- 기본값: `eng,fra,deu,spa` (기본 `tesseract` 엔진 사용 시)
- 설명: 설정된 `DOCLING_OCR_ENGINE`과 함께 사용할 OCR 언어(s)를 지정합니다.
  형식 및 사용 가능한 언어 코드는 선택된 OCR 엔진에 따라 다릅니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 정보 검색 증강 생성 (RAG)

#### `RAG_EMBEDDING_ENGINE`

- 유형: `str`
- 옵션:
  - 비워 둬서 `기본값 (SentenceTransformers)` 사용 - SentenceTransformers를 사용하여 임베딩 생성.
  - `ollama` - Ollama API를 사용하여 임베딩 생성.
  - `openai` - OpenAI API를 사용하여 임베딩 생성.
- 설명: RAG에 사용할 임베딩 엔진을 선택합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_EMBEDDING_MODEL`

- 유형: `str`
- 기본값: `sentence-transformers/all-MiniLM-L6-v2`
- 설명: 임베딩에 사용할 모델을 설정합니다. 로컬에서는 Sentence-Transformer 모델을 사용합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_RAG_HYBRID_SEARCH`

- 유형: `bool`
- 기본값: `False`
- 설명: `BM25` + `ChromaDB`를 사용한 앙상블 검색을 활성화하며, `sentence_transformers` 모델을 사용해 다시 순위를 매깁니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_TOP_K`

- 유형: `int`
- 기본값: `3`
- 설명: RAG 사용 시 임베딩에 사용될 결과의 기본 개수를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_TOP_K_RERANKER`

- 유형: `int`
- 기본값: `3`
- 설명: RAG 사용 시 다시 순위를 매길 결과의 기본 개수를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_RELEVANCE_THRESHOLD`

- 유형: `float`
- 기본값: `0.0`
- 설명: 다시 순위를 매길 때 문서를 고려하는 관련도 임계값을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_HYBRID_BM25_WEIGHT`

- 유형: `float`
- 기본값: `0.5`
- 설명: 하이브리드 검색 중 키워드 검색 (BM25)에 부여된 가중치를 설정합니다. 1은 키워드 검색만, 0은 벡터 검색만을 의미합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_TEMPLATE`

- 유형: `str`
- 기본값: `DEFAULT_RAG_TEMPLATE` 환경 변수의 값

`DEFAULT_RAG_TEMPLATE`:

```
### 작업:
주어진 context를 사용해 사용자 질문에 응답하되, `<source>` 태그에 명시적인 id 속성(예: <source id="1">)이 포함된 경우에만 [id] 형식으로 인용을 삽입합니다.

### 가이드라인:
- 답변을 모르는 경우, 그 사실을 명확히 밝힙니다.
- 질문이 명확하지 않으면 사용자에게 추가 질문을 요청하세요.
- 사용자의 질문이 작성된 언어로 답변합니다.
- context가 읽기 어렵거나 품질이 낮은 경우, 사용자에게 알리고 최선의 답변을 제공합니다.
- 답변이 context에 없지만 지식이 있는 경우, 사용자에게 이를 설명하고 자신의 이해를 바탕으로 답변을 제공합니다.
- **오직 `<source>` 태그에 id 속성이 포함된 경우에만 [id] 형식으로 인용을 추가합니다.**
- `<source>` 태그에 id 속성이 포함되지 않은 경우 인용하지 않습니다.
- 응답에 XML 태그를 포함하지 마십시오.
- 인용이 제공된 정보와 직접적으로 관련되도록 구성하고 간결해야 합니다.

### 인용 예제:
사용자가 특정 주제에 대해 질문하고, 정보가 id 속성이 있는 출처에서 제공된 경우, 다음 예제와 같이 인용이 포함된 답변을 제공해야 합니다:
* "연구에 따르면, 제안된 방법은 효율성을 20% 향상시킵니다 [1]."

### 출력:
context에 id 속성이 있는 `<source>` 태그가 있는 경우에만 [id] 형식으로 인용을 포함하여 사용자 질문에 명확하고 직접적으로 답변하십시오.

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- 설명: RAG 문서를 채팅 응답에 삽입할 때 사용할 템플릿
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_TEXT_SPLITTER`

- 유형: `str`
- 옵션:
  - `character`
  - `token`
- 기본값: `character`
- 설명: RAG 모델의 텍스트 분할기를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `TIKTOKEN_CACHE_DIR`

- 유형: `str`
- 기본값: `{CACHE_DIR}/tiktoken`
- 설명: TikToken 캐시 디렉토리를 설정합니다.

#### `TIKTOKEN_ENCODING_NAME`

- 유형: `str`
- 기본값: `cl100k_base`
- 설명: TikToken의 인코딩 이름을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CHUNK_SIZE`

- 유형: `int`
- 기본값: `1000`
- 설명: 임베딩을 위한 문서 청크 크기를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `CHUNK_OVERLAP`

- 유형: `int`
- 기본값: `100`
- 설명: 청크 간 중첩의 양을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `PDF_EXTRACT_IMAGES`

- 유형: `bool`
- 기본값: `False`
- 설명: 문서를 로드할 때 PDF에서 OCR을 사용해 이미지를 추출합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_FILE_MAX_SIZE`

- 유형: `int`
- 설명: 문서 삽입을 위해 업로드 가능한 파일의 최대 크기(MB)를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_FILE_MAX_COUNT`

- 유형: `int`
- 설명: 문서 삽입을 위해 한 번에 업로드할 수 있는 파일의 최대 개수를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::정보

`RAG_FILE_MAX_SIZE` 및 `RAG_FILE_MAX_COUNT`를 설정할 때 과도한 파일 업로드와 잠재적 성능 문제를 방지하기 위해 값이 적절한지 확인하십시오.

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- 설명: 업로드가 허용되는 파일 확장자를 지정합니다.

```json
["pdf,docx,txt"]
```

- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_RERANKING_MODEL`

- 유형: `str`
- 설명: 결과를 재순위화하기 위한 모델을 설정합니다. 로컬에서는 Sentence-Transformer 모델을 사용합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_OPENAI_API_BASE_URL`

- 유형: `str`
- 기본값: `${OPENAI_API_BASE_URL}`
- 설명: RAG 임베딩에 사용할 OpenAI 기본 API URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_OPENAI_API_KEY`

- 유형: `str`
- 기본값: `${OPENAI_API_KEY}`
- 설명: RAG 임베딩에 사용할 OpenAI API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- 유형: `int`
- 기본값: `1`
- 설명: OpenAI 임베딩에 대한 배치 크기를 설정합니다.

#### `RAG_EMBEDDING_BATCH_SIZE`

- 유형: `int`
- 기본값: `1`
- 설명: RAG (Retrieval-Augmented Generator) 모델의 임베딩 배치 크기를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_OLLAMA_API_KEY`

- 유형: `str`
- 설명: RAG 모델에서 사용하는 Ollama API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_OLLAMA_BASE_URL`

- 유형: `str`
- 설명: RAG 모델에서 사용하는 Ollama API의 기본 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 검색 쿼리 생성을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- 유형: `str`
- 기본값: `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE` 환경 변수의 값.

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### 작업:
주어진 언어로 검색 쿼리를 생성할 필요성을 판단하기 위해 채팅 내역을 분석하십시오. 기본적으로, **1-3개의 포괄적이고 관련성 있는 검색 쿼리 생성을 우선으로 합니다** 추가 정보가 필요 없다고 절대적으로 확신하지 않는 한. 최소한의 불확실성이 있어도 포괄적, 최신, 가치있는 정보를 검색해내는 것이 목표입니다. 검색이 확실히 필요하지 않은 경우 빈 목록을 반환하십시오.

### 지침:
- **JSON 객체로만** 응답하십시오. 어떤 형태의 추가 설명, 해설, 문자는 엄격히 금지됩니다.
- 검색 쿼리를 생성할 경우, 응답 형식은 다음과 같습니다: { "queries": ["query1", "query2"] }. 각 쿼리는 독특하고 간결하며 주제와 관련성이 있어야 합니다.
- 유용한 결과를 검색으로 얻을 수 없다고 확실히 확신하는 경우에만 다음을 반환하십시오: { "queries": [] }.
- 유용하거나 업데이트된 정보를 제공할 가능성이 **조금이라도** 있는 경우 검색 쿼리 생성을 추천하십시오.
- 불필요한 상세 설명, 주석, 가정은 피하고 고품질 검색 쿼리를 구성하는 데 집중하십시오.
- 오늘 날짜는: {{CURRENT_DATE}} 입니다.
- 정보를 최대한 포괄하며 실행 가능한 쿼리를 생성하는 것을 우선시하십시오.

### 출력:
엄격히 JSON 형식으로 반환:
{
  "queries": ["query1", "query2"]
}

### 채팅 내역:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- 설명: 쿼리 생성을 위한 템플릿 프롬프트를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- 유형: `bool`
- 기본값: `False`
- 설명: 임베딩 및 검색 프로세스를 생략합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- 유형: `str`
- 기본값: `None`
- 설명: 문서 인텔리전스의 엔드포인트를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `DOCUMENT_INTELLIGENCE_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: 문서 인텔리전스를 위한 키를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- 유형: `bool`
- 기본값: `False`
- 설명: RAG의 로컬 웹 패치 활성화 여부를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- 유형: `str`
- 기본값: `None`
- 설명: RAG 임베딩 콘텐츠의 접두사를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- 유형: `str`
- 기본값: `None`
- 설명: RAG 임베딩 접두사 필드 이름을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_EMBEDDING_QUERY_PREFIX`

- 유형: `str`
- 기본값: `None`
- 설명: RAG 임베딩 쿼리 접두사를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `RAG_FULL_CONTEXT`

- 유형: `bool`
- 기본값: `False`
- 설명: RAG의 전체 컨텍스트 사용 여부를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### Google 드라이브

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- 유형: `bool`
- 기본값: `False`
- 설명: Google Drive 통합을 활성화하거나 비활성화합니다. true로 설정되고 `GOOGLE_DRIVE_CLIENT_ID` 및 `GOOGLE_DRIVE_API_KEY`가 모두 구성된 경우, Google Drive가 채팅 UI에서 업로드 옵션으로 나타납니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::info

`GOOGLE_DRIVE_INTEGRATION`을 활성화할 때, `GOOGLE_DRIVE_CLIENT_ID` 및 `GOOGLE_DRIVE_API_KEY`를 정확히 구성했는지 확인하고 Google의 서비스 이용 약관 및 사용 지침을 검토하십시오.

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- 유형: `str`
- 설명: Google Drive를 위한 클라이언트 ID를 설정합니다(클라이언트가 Drive API 및 Picker API를 활성화한 상태에서 구성되어야 함).
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_DRIVE_API_KEY`

- 유형: `str`
- 설명: Google Drive 통합을 위한 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- 유형: `bool`
- 기본값: `False`
- 설명: OneDrive 통합을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ONEDRIVE_CLIENT_ID`

- 유형: `str`
- 기본값: `None`
- 설명: OneDrive 통합을 위한 클라이언트 ID를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 웹 검색

#### `ENABLE_WEB_SEARCH`

- 유형: `bool`
- 기본값: `False`
- 설명: 웹 검색 기능을 활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_SEARCH_QUERY_GENERATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 검색 쿼리 생성을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEB_SEARCH_TRUST_ENV`

- 유형: `bool`
- 기본값: `False`
- 설명: 웹 검색 콘텐츠 가져오기 시 `http_proxy` 및 `https_proxy`에서 설정한 프록시를 활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEB_SEARCH_RESULT_COUNT`

- 유형: `int`
- 기본값: `3`
- 설명: 수집할 검색 결과 최대 개수입니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- 유형: `int`
- 기본값: `10`
- 설명: 검색 결과에서 반환된 웹페이지를 크롤링할 때 동시 요청 수입니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEB_SEARCH_ENGINE`

- 유형: `str`
- 옵션:
  - `searxng` - [SearXNG](https://github.com/searxng/searxng) 검색 엔진을 사용합니다.
  - `google_pse` - [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/)을 사용합니다.
  - `brave` - [Brave](https://brave.com/search/api/) 검색 엔진을 사용합니다.
  - `kagi` - [Kagi](https://www.kagi.com/) 검색 엔진을 사용합니다.
  - `mojeek` - [Mojeek](https://www.mojeek.com/) 검색 엔진을 사용합니다.
  - `bocha` - Bocha 검색 엔진을 사용합니다.
  - `serpstack` - [Serpstack](https://serpstack.com/) 검색 엔진을 사용합니다.
  - `serper` - [Serper](https://serper.dev/) 검색 엔진을 사용합니다.
  - `serply` - [Serply](https://serply.io/) 검색 엔진을 사용합니다.
  - `searchapi` - [SearchAPI](https://www.searchapi.io/) 검색 엔진을 사용합니다.
  - `serpapi` - [SerpApi](https://serpapi.com/) 검색 엔진을 사용합니다.
  - `duckduckgo` - [DuckDuckGo](https://duckduckgo.com/) 검색 엔진을 사용합니다.
  - `tavily` - [Tavily](https://tavily.com/) 검색 엔진을 사용합니다.
  - `jina` - [Jina](https://jina.ai/) 검색 엔진을 사용합니다.
  - `bing` - [Bing](https://www.bing.com/) 검색 엔진을 사용합니다.
  - `exa` - [Exa](https://exa.ai/) 검색 엔진을 사용합니다.
  - `perplexity` - [Perplexity AI](https://www.perplexity.ai/) 검색 엔진을 사용합니다.
  - `sougou` - [Sougou](https://www.sogou.com/) 검색 엔진을 사용합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- 유형: `bool`
- 기본값: `False`
- 설명: 웹 검색 임베딩 및 검색 과정을 우회합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SEARXNG_QUERY_URL`

- 유형: `str`
- 설명: JSON 출력을 지원하는 [SearXNG 검색 API](https://docs.searxng.org/dev/search_api.html) URL입니다. `<query>`는 검색 쿼리로 대체됩니다. 예: `http://searxng.local/search?q=<query>`
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_PSE_API_KEY`

- 유형: `str`
- 설명: Google Programmable Search Engine(PSE) 서비스의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_PSE_ENGINE_ID`

- 유형: `str`
- 설명: Google Programmable Search Engine (PSE) 서비스의 엔진 ID입니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BRAVE_SEARCH_API_KEY`

- 유형: `str`
- 설명: Brave Search API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `KAGI_SEARCH_API_KEY`

- 유형: `str`
- 설명: Kagi Search API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MOJEEK_SEARCH_API_KEY`

- 유형: `str`
- 설명: Mojeek Search API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPSTACK_API_KEY`

- 유형: `str`
- 설명: Serpstack 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPSTACK_HTTPS`

- 유형: `bool`
- 기본값: `True`
- 설명: Serpstack 요청에 HTTPS 사용을 구성합니다. 무료 등급 요청은 HTTP로만 제한됩니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPER_API_KEY`

- 유형: `str`
- 설명: Serper 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPLY_API_KEY`

- 유형: `str`
- 설명: Serply 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SEARCHAPI_API_KEY`

- 유형: `str`
- 설명: SearchAPI의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SEARCHAPI_ENGINE`

- 유형: `str`
- 설명: SearchAPI 엔진을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `TAVILY_API_KEY`

- 유형: `str`
- 설명: Tavily 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `JINA_API_KEY`

- 유형: `str`
- 설명: Jina의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BING_SEARCH_V7_ENDPOINT`

- 유형: `str`
- 설명: Bing 검색 API의 엔드포인트를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- 유형: `str`
- 기본값: `https://api.bing.microsoft.com/v7.0/search`
- 설명: Bing 검색 API의 구독 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `BOCHA_SEARCH_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: Bocha 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `EXA_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: Exa 검색 API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPAPI_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: SerpAPI의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SERPAPI_ENGINE`

- 유형: `str`
- 기본값: `None`
- 설명: SerpAPI에 사용할 검색 엔진을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SOUGOU_API_SID`

- 유형: `str`
- 기본값: `None`
- 설명: Sogou API SID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `SOUGOU_API_SK`

- 유형: `str`
- 기본값: `None`
- 설명: Sogou API SK를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `TAVILY_EXTRACT_DEPTH`

- 유형: `str`
- 기본값: `basic`
- 설명: Tavily 검색 결과에 대한 추출 깊이를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 웹 로더 설정

#### `WEB_LOADER_ENGINE`

- 유형: `str`
- 기본값: `safe_web`
- 설명: 웹 콘텐츠를 검색하고 처리하는 로더를 지정합니다.
- 옵션:
  - `requests` - 오류 처리가 향상된 Requests 모듈을 사용합니다.
  - `playwright` - 더 고급 웹 페이지 렌더링 및 상호 작용을 위해 Playwright를 사용합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::info

Playwright를 사용할 때 두 가지 옵션이 있습니다:

1. `PLAYWRIGHT_WS_URI`가 설정되지 않은 경우, Chromium 종속성을 포함한 Playwright가 Open WebUI 컨테이너에 런칭 시 자동 설치됩니다.
2. `PLAYWRIGHT_WS_URI`가 설정된 경우, Open WebUI는 로컬 종속성을 설치하지 않고 원격 브라우저 인스턴스에 연결합니다.

:::

#### `PLAYWRIGHT_WS_URL`

- 유형: `str`
- 기본값: `None`
- 설명: 원격 Playwright 브라우저 인스턴스의 WebSocket URI를 지정합니다. 설정된 경우 Open WebUI는 로컬에 브라우저 종속성을 설치하는 대신 이 원격 브라우저를 사용합니다. 이 기능은 Open WebUI 컨테이너를 경량화하고 브라우저와의 분리를 유지하려는 컨테이너 환경에서 특히 유용합니다. 예: `ws://playwright:3000`
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::팁

`PLAYWRIGHT_WS_URL`을 사용하여 원격 Playwright 브라우저를 사용하는 것이 유용한 경우:

- Open WebUI 컨테이너 크기를 줄이려는 경우
- 기본 브라우저인 Chromium이 아닌 다른 브라우저를 사용하려는 경우
- 비-헤드리스(GUI) 브라우저에 연결하려는 경우

:::

#### `FIRECRAWL_API_BASE_URL`

- 유형: `str`
- 기본값: `https://api.firecrawl.dev`
- 설명: Firecrawl API의 기본 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `FIRECRAWL_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: Firecrawl API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `PERPLEXITY_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: Perplexity API의 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `PLAYWRIGHT_TIMEOUT`

- 유형: `int`
- 기본값: 빈 문자열 (` ' ' `), 기본값은 `None`으로 설정되어 있습니다.
- 설명: Playwright 요청의 타임아웃을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### YouTube 로더

#### `YOUTUBE_LOADER_PROXY_URL`

- 유형: `str`
- 설명: YouTube 로더에 대한 프록시 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `YOUTUBE_LOADER_LANGUAGE`

- 유형: `str`
- 기본값: `en`
- 설명: YouTube 비디오 전사를 가져올 때 시도할 언어 코드를 우선 순위에 따라 쉼표로 구분한 목록으로 입력합니다.
- 예: `es,de`로 설정한 경우, 먼저 스페인어 전사를 시도한 후 스페인어가 없으면 독일어 전사를 시도하며, 마지막으로 영어를 시도합니다. 참고: 지정된 언어 중 사용할 수 있는 언어가 없고 `en`이 목록에 포함되어 있지 않은 경우, 시스템은 마지막으로 영어를 자동으로 시도합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 오디오

### Whisper 음성-텍스트 변환 (로컬)

#### `WHISPER_MODEL`

- 유형: `str`
- 기본값: `base`
- 설명: 음성-텍스트 변환을 위해 사용할 Whisper 모델을 설정합니다. 백엔드는 int8로 양자화된 faster_whisper를 사용합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WHISPER_MODEL_DIR`

- 유형: `str`
- 기본값: `${DATA_DIR}/cache/whisper/models`
- 설명: Whisper 모델 파일을 저장할 디렉토리를 지정합니다.

#### `WHISPER_VAD_FILTER`

- 유형: `bool`
- 기본값: `False`
- 설명: Whisper 음성-텍스트 변환에 음성 활동 감지(VAD) 필터를 적용할지 여부를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WHISPER_MODEL_AUTO_UPDATE`

- 유형: `bool`
- 기본값: `False`
- 설명: Whisper 모델의 자동 업데이트를 활성화합니다.

#### `WHISPER_LANGUAGE`

- 유형: `str`
- 기본값: `None`
- 설명: ISO 639-1 언어 코드를 사용하여 Whisper가 음성-텍스트 변환에 사용할 언어를 지정합니다 (하와이어와 광둥어의 경우 ISO 639-2 사용). Whisper는 기본적으로 언어를 예측합니다.

### 음성-텍스트 변환 (OpenAI)

#### `AUDIO_STT_ENGINE`

- 유형: `str`
- 옵션:
  - 비워 두면 로컬 Whisper 엔진을 음성-텍스트 변환에 사용합니다.
  - `openai` - OpenAI 엔진을 사용합니다.
  - `deepgram` - Deepgram 엔진을 사용합니다.
  - `azure` - Azure 엔진을 사용합니다.
- 설명: 사용할 음성-텍스트 변환 엔진을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_STT_MODEL`

- 유형: `str`
- 기본값: `whisper-1`
- 설명: OpenAI 호환 엔드포인트에 사용할 음성-텍스트 변환 모델을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- 유형: `str`
- 기본값: `${OPENAI_API_BASE_URL}`
- 설명: 음성-텍스트 변환에 사용할 OpenAI 호환 기본 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_STT_OPENAI_API_KEY`

- 유형: `str`
- 기본값: `${OPENAI_API_KEY}`
- 설명: 음성-텍스트 변환에 사용할 OpenAI API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 음성-텍스트 변환 (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: 음성-텍스트 변환에 사용할 Azure API 키를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_STT_AZURE_REGION`

- 유형: `str`
- 기본값: `None`
- 설명: 음성-텍스트 변환에 사용할 Azure 지역을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_STT_AZURE_LOCALES`

- 유형: `str`
- 기본값: `None`
- 설명: Azure 음성-텍스트 변환에 사용할 로케일을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 음성-텍스트 변환 (Deepgram)

#### `DEEPGRAM_API_KEY`

- 유형: `str`
- 기본값: `None`
- 설명: 음성-텍스트 변환에 사용할 Deepgram API 키를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 음성 합성

#### `AUDIO_TTS_API_KEY`

- 유형: `str`
- 설명: 음성 합성을 위한 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_ENGINE`

- 유형: `str`
- 옵션:
  - 기본 웹API 엔진 음성 합성을 사용하려면 비워 두십시오.
  - `azure` - Azure 엔진을 사용하여 음성 합성을 수행합니다.
  - `elevenlabs` - ElevenLabs 엔진을 사용하여 음성 합성을 수행합니다.
  - `openai` - OpenAI 엔진을 사용하여 음성 합성을 수행합니다.
  - `transformers` - SentenceTransformers를 사용하여 음성 합성을 수행합니다.
- 설명: 사용할 음성 합성 엔진을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_MODEL`

- 유형: `str`
- 기본값: `tts-1`
- 설명: 사용할 OpenAI 음성 합성 모델을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_VOICE`

- 유형: `str`
- 기본값: `alloy`
- 설명: 사용할 OpenAI 음성 합성 음성을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_SPLIT_ON`

- 유형: `str`
- 기본값: `punctuation`
- 설명: 사용할 OpenAI 음성 합성 분할 기준을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### Azure 음성 합성

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- 유형: `str`
- 설명: Azure 음성 합성 지역을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- 유형: `str`
- 설명: Azure 음성 합성의 출력 형식을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### OpenAI 음성 합성

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- 유형: `str`
- 기본값: `${OPENAI_API_BASE_URL}`
- 설명: 텍스트를 음성으로 변환하는 데 사용할 OpenAI 호환 기본 URL을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUDIO_TTS_OPENAI_API_KEY`

- 유형: `str`
- 기본값: `${OPENAI_API_KEY}`
- 설명: 음성 합성을 위해 사용할 API 키를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 이미지 생성

#### `IMAGE_GENERATION_ENGINE`

- 유형: `str`
- 옵션:
  - `openai` - OpenAI DALL-E를 사용하여 이미지 생성.
  - `comfyui` - ComfyUI 엔진을 사용하여 이미지 생성.
  - `automatic1111` - AUTOMATIC1111 엔진을 사용하여 이미지 생성.
  - `gemini` - Gemini를 사용하여 이미지 생성.
- 기본값: `openai`
- 설명: 이미지 생성을 위해 사용할 엔진을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_IMAGE_GENERATION`

- 유형: `bool`
- 기본값: `False`
- 설명: 이미지 생성 기능을 활성화 또는 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- 유형: `bool`
- 기본값: `True`
- 설명: 이미지 프롬프트 생성을 활성화 또는 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- 유형: `str`
- 기본값: `None`
- 설명: 이미지 프롬프트 생성을 위한 템플릿을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### 작업:
주어진 언어와 컨텍스트를 기반으로 이미지 생성 작업을 위한 자세한 프롬프트를 작성하십시오. 마치 볼 수 없는 사람에게 이미지에 대해 설명하는 것처럼 이미지 요소를 설명하십시오. 관련된 세부 정보, 색상, 모양 및 기타 중요한 요소를 포함하십시오.

### 지침:
- 이미지의 가장 중요한 측면에 집중하여 설명적이고 자세히 작성하십시오.
- 이미지에 존재하지 않는 정보 추가나 가정을 하지 마십시오.
- 대화의 주요 언어를 사용하십시오. 다국어라면 기본적으로 영어를 사용하십시오.
- 이미지가 너무 복잡하다면 가장 두드러진 요소에 집중하십시오.

### 출력:
엄격히 JSON 형식으로 반환하십시오:
{
    "prompt": "자세한 설명을 여기에 작성하십시오."
}

### 채팅 기록:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- 유형: `str`
- 기본값: `512x512`
- 설명: 생성할 기본 이미지 크기를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGE_STEPS`

- 유형: `int`
- 기본값: `50`
- 설명: ComfyUI 및 AUTOMATIC1111에서 사용되는 이미지 생성에 대한 기본 반복 단계를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGE_GENERATION_MODEL`

- 유형: `str`
- 설명: 이미지 생성을 위한 기본 모델을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- 유형: `str`
- 설명: AUTOMATIC1111의 Stable Diffusion API URL을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUTOMATIC1111_API_AUTH`

- 유형: `str`
- Description: AUTOMATIC1111 API 인증을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUTOMATIC1111_CFG_SCALE`

- Type: `float`
- Description: AUTOMATIC1111 추론의 스케일을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUTOMATIC1111_SAMPLER`

- Type: `str`
- Description: AUTOMATIC1111 추론의 샘플러를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `AUTOMATIC1111_SCHEDULER`

- Type: `str`
- Description: AUTOMATIC1111 추론의 스케줄러를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

### ComfyUI

#### `COMFYUI_BASE_URL`

- Type: `str`
- Description: ComfyUI 이미지 생성 API의 URL을 지정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `COMFYUI_API_KEY`

- Type: `str`
- Description: ComfyUI의 API 키를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `COMFYUI_WORKFLOW`

- Type: `str`
- Default:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  }
}
```

- Description: ComfyUI 워크플로를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

### Gemini

#### `GEMINI_API_BASE_URL`

- Type: `str`
- Default: `None`
- Description: Gemini의 API URL을 지정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GEMINI_API_KEY`

- Type: `str`
- Default: `None`
- Description: Gemini API 키를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGES_GEMINI_API_BASE_URL`

- Type: `str`
- Default: `None`
- Description: Gemini 이미지 생성 API의 URL을 지정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGES_GEMINI_API_KEY`

- Type: `str`
- Default: `None`
- Description: 이미지 생성용 Gemini API 키를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- Type: `str`
- Default: `${OPENAI_API_BASE_URL}`
- Description: DALL-E 이미지 생성을 위한 OpenAI 호환 기본 URL을 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `IMAGES_OPENAI_API_KEY`

- Type: `str`
- Default: `${OPENAI_API_KEY}`
- Description: DALL-E 이미지 생성을 위한 API 키를 설정합니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- Type: `bool`
- Default: `False`
- Description: OAuth를 통한 가입 시 계정 생성을 활성화합니다. `ENABLE_SIGNUP`과는 다릅니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

:::danger

`ENABLE_OAUTH_SIGNUP`이 `True`로 설정된 경우 `ENABLE_LOGIN_FORM`을 반드시 `False`로 설정해야 합니다. 그렇지 않으면 로그인할 수 없습니다.

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- Type: `bool`
- Default: `False`
- Description: 활성화되면 동일한 이메일을 사용하는 기존 계정과 OAuth 계정을 병합합니다. 이는 일부 OAuth 제공자가 이메일 주소를 확인하지 않을 수 있으므로 안전하지 않으며 계정 도용 가능성이 있을 수 있습니다.
- Persistence: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- Type: `bool`
- Default: `False`
- 설명: 활성화되면 로그인 시 OAuth에서 제공된 사진으로 로컬 사용자 프로필 사진을 업데이트합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- 유형: `str`
- 설명: 인증을 위한 신뢰할 수 있는 요청 헤더를 정의합니다. [SSO 문서](/features/sso)를 참조하세요.

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- 유형: `str`
- 설명: `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` 헤더를 사용하여 등록하는 사용자의 사용자 이름에 대한 신뢰할 수 있는 요청 헤더를 정의합니다. [SSO 문서](/features/sso)를 참조하세요.

### Google

https://support.google.com/cloud/answer/6158849?hl=en을 참조하세요.

#### `GOOGLE_CLIENT_ID`

- 유형: `str`
- 설명: Google OAuth의 클라이언트 ID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_CLIENT_SECRET`

- 유형: `str`
- 설명: Google OAuth의 클라이언트 비밀을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_OAUTH_SCOPE`

- 유형: `str`
- 기본값: `openid email profile`
- 설명: Google OAuth 인증 범위를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GOOGLE_REDIRECT_URI`

- 유형: `str`
- 기본값: `<backend>/oauth/google/callback`
- 설명: Google OAuth의 리디렉션 URI를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### Microsoft

https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app를 참조하세요.

#### `MICROSOFT_CLIENT_ID`

- 유형: `str`
- 설명: Microsoft OAuth의 클라이언트 ID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MICROSOFT_CLIENT_SECRET`

- 유형: `str`
- 설명: Microsoft OAuth의 클라이언트 비밀을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MICROSOFT_CLIENT_TENANT_ID`

- 유형: `str`
- 설명: Microsoft OAuth의 테넌트 ID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MICROSOFT_OAUTH_SCOPE`

- 유형: `str`
- 기본값: `openid email profile`
- 설명: Microsoft OAuth 인증 범위를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `MICROSOFT_REDIRECT_URI`

- 유형: `str`
- 기본값: `<backend>/oauth/microsoft/callback`
- 설명: Microsoft OAuth의 리디렉션 URI를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### GitHub

https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps를 참조하세요.

#### `GITHUB_CLIENT_ID`

- 유형: `str`
- 설명: GitHub OAuth의 클라이언트 ID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GITHUB_CLIENT_SECRET`

- 유형: `str`
- 설명: GitHub OAuth의 클라이언트 비밀을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GITHUB_CLIENT_SCOPE`

- 유형: `str`
- 기본값: `user:email`
- 설명: GitHub OAuth 인증 범위를 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `GITHUB_CLIENT_REDIRECT_URI`

- 유형: `str`
- 기본값: `<backend>/oauth/github/callback`
- 설명: GitHub OAuth의 리디렉션 URI를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- 유형: `str`
- 설명: OIDC의 클라이언트 ID를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_CLIENT_SECRET`

- 유형: `str`
- 설명: OIDC의 클라이언트 비밀을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OPENID_PROVIDER_URL`

- 유형: `str`
- 설명: `.well-known/openid-configuration` 엔드포인트의 경로
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OPENID_REDIRECT_URI`

- 유형: `str`
- 기본값: `<backend>/oauth/oidc/callback`
- 설명: OIDC의 리디렉션 URI를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_SCOPES`

- 유형: `str`
- 기본값: `openid email profile`
- 설명: OIDC 인증 범위를 설정합니다. `openid`와 `email`은 필수입니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_CODE_CHALLENGE_METHOD`

- 유형: `str`
- 기본값: 빈 문자열( ), 기본으로 `None`이 설정되어 있습니다.
- 설명: OAuth 인증을 위한 코드 챌린지 방법을 지정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_PROVIDER_NAME`

- 유형: `str`
- 기본값: `SSO`
- 설명: OIDC 제공자 이름을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_USERNAME_CLAIM`

- 유형: `str`
- 기본값: `name`
- 설명: OpenID 사용자 이름 claim을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_EMAIL_CLAIM`

- 유형: `str`
- 기본값: `email`
- 설명: OpenID용 이메일 클레임 설정하기.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_PICTURE_CLAIM`

- 유형: `str`
- 기본값: `picture`
- 설명: OpenID용 이미지(아바타) 클레임 설정하기.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_GROUP_CLAIM`

- 유형: `str`
- 기본값: `groups`
- 설명: OAuth 인증에 사용되는 그룹 클레임 지정.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- 유형: `bool`
- 기본값: `False`
- 설명: OAuth 위임 역할 관리를 활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- 유형: `bool`
- 기본값: `False`
- 설명: OAuth 그룹 관리를 활성화 또는 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_ROLES_CLAIM`

- 유형: `str`
- 기본값: `roles`
- 설명: OIDC 토큰에서 역할 클레임을 확인하도록 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_ALLOWED_ROLES`

- 유형: `str`
- 기본값: `user,admin`
- 설명: 플랫폼에 대한 액세스가 허용되는 역할을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_ADMIN_ROLES`

- 유형: `str`
- 기본값: `admin`
- 설명: 관리자로 간주되는 역할을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `OAUTH_ALLOWED_DOMAINS`

- 유형: `str`
- 기본값: `*`
- 설명: OAuth 인증에 허용되는 도메인을 지정합니다. (예: "example1.com,example2.com")
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## LDAP

#### `ENABLE_LDAP`

- 유형: `bool`
- 기본값: `False`
- 설명: LDAP 인증을 활성화 또는 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SERVER_LABEL`

- 유형: `str`
- 설명: LDAP 서버의 라벨을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SERVER_HOST`

- 유형: `str`
- 기본값: `localhost`
- 설명: LDAP 서버의 호스트 이름을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SERVER_PORT`

- 유형: `int`
- 기본값: `389`
- 설명: LDAP 서버의 포트 번호를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- 유형: `str`
- 설명: LDAP 인증에서 메일로 사용할 속성을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- 유형: `str`
- 설명: LDAP 인증에서 사용자 이름으로 사용할 속성을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_APP_DN`

- 유형: `str`
- 설명: LDAP 애플리케이션의 고유 이름을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_APP_PASSWORD`

- 유형: `str`
- 설명: LDAP 애플리케이션 비밀번호를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SEARCH_BASE`

- 유형: `str`
- 설명: LDAP 인증에 검색할 기준을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SEARCH_FILTER`

- 유형: `str`
- 기본값: `None`
- 설명: LDAP 검색에 사용할 단일 필터를 설정합니다. `LDAP_SEARCH_FILTERS`의 대안입니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_SEARCH_FILTERS`

- 유형: `str`
- 설명: LDAP 검색에 사용할 필터를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_USE_TLS`

- 유형: `bool`
- 기본값: `True`
- 설명: LDAP 연결에 TLS를 사용 여부를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_CA_CERT_FILE`

- 유형: `str`
- 설명: LDAP CA 인증서 파일의 경로를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_VALIDATE_CERT`

- 유형: `bool`
- 설명: LDAP CA 인증서 유효성을 검증할지를 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `LDAP_CIPHERS`

- 유형: `str`
- 기본값: `ALL`
- 설명: LDAP 연결에 사용할 암호화 방법을 설정합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 사용자 권한

### 채팅 권한

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자가 채팅 제어에 접근할 수 있는 권한을 활성화 또는 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅에 파일을 업로드할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_DELETE`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅을 삭제할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_EDIT`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅을 수정할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_STT`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅에서 음성을 텍스트로 변환할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_TTS`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅에서 텍스트를 음성으로 변환할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_CALL`

- 유형: `str`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅에서 통화를 할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- 유형: `str`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 채팅에서 여러 모델을 사용할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- 유형: `bool`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 임시 채팅을 생성할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- 유형: `str`
- 기본값: `False`
- 설명: 사용자를 위한 임시 채팅이 강제 적용되는지 여부를 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 기능 권한

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- 유형: `str`
- 기본값: `False`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 직접 도구 서버에 액세스할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- 유형: `str`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 웹 검색 기능을 사용할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- 유형: `str`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 이미지 생성 기능을 사용할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- 유형: `str`
- 기본값: `True`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 코드 인터프리터 기능을 사용할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

### 워크스페이스 권한

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- 유형: `bool`
- 기본값: `False`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 워크스페이스 모델에 액세스할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- 유형: `bool`
- 기본값: `False`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 워크스페이스 지식에 액세스할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- 유형: `bool`
- 기본값: `False`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 워크스페이스 프롬프트에 액세스할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- 유형: `bool`
- 기본값: `False`
- 설명: 사용자 권한을 활성화하거나 비활성화하여 워크스페이스 도구에 액세스할 수 있도록 합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- 유형: `str`
- 기본값: `False`
- 설명: 워크스페이스 모델을 공개적으로 공유할 수 있는 권한을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- 유형: `str`
- 기본값: `False`
- 설명: 워크스페이스 지식을 공개적으로 공유할 수 있는 권한을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- 유형: `str`
- 기본값: `False`
- 설명: 워크스페이스 프롬프트를 공개적으로 공유할 수 있는 권한을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- 유형: `str`
- 기본값: `False`
- 설명: 워크스페이스 도구를 공개적으로 공유할 수 있는 권한을 활성화하거나 비활성화합니다.
- 지속성: 이 환경 변수는 `PersistentConfig` 변수입니다.

## 기타 환경 변수

이 변수들은 Open WebUI에 특정되지 않지만 특정 상황에서 여전히 유용할 수 있습니다.

### 클라우드 스토리지

#### `STORAGE_PROVIDER`

- 유형: `str`
- 선택 가능 옵션:
  - `s3` - S3 클라이언트 라이브러리와 [Amazon S3 스토리지](#amazon-s3-storage)에 언급된 관련 환경 변수를 사용
  - `gcs` - GCS 클라이언트 라이브러리와 [Google Cloud Storage](#google-cloud-storage)에 언급된 관련 환경 변수를 사용
  - `azure` - Azure 클라이언트 라이브러리와 [Microsoft Azure Storage](#microsoft-azure-storage)에 언급된 관련 환경 변수를 사용
- 기본값: 빈 문자열( ), 이는 `local`로 기본 설정됩니다
- 설명: 스토리지 공급자를 설정합니다.

#### Amazon S3 스토리지

#### `S3_ACCESS_KEY_ID`

- 유형: `str`
- 설명: S3 스토리지의 액세스 키 ID를 설정합니다.

#### `S3_ADDRESSING_STYLE`

- 유형: `str`
- 기본값: `None`
- 설명: S3 스토리지에 사용할 주소 지정 스타일을 지정합니다 (예: path, virtual).

#### `S3_BUCKET_NAME`

- 유형: `str`
- 설명: S3 스토리지의 버킷 이름을 설정합니다.

#### `S3_ENDPOINT_URL`

- 유형: `str`
- 설명: S3 스토리지의 엔드포인트 URL을 설정합니다.

#### `S3_KEY_PREFIX`

- 유형: `str`
- 설명: S3 객체의 키 접두어를 설정합니다.

#### `S3_REGION_NAME`

- 유형: `str`
- 설명: S3 스토리지의 지역 이름을 설정합니다.

#### `S3_SECRET_ACCESS_KEY`

- 유형: `str`
- 설명: S3 스토리지의 비밀 액세스 키를 설정합니다.

#### `S3_USE_ACCELERATE_ENDPOINT`

- 유형: `str`
- 기본값: `False`
- 설명: S3 스토리지의 가속화된 엔드포인트를 사용할지 여부를 지정합니다.

#### `S3_ENABLE_TAGGING`

- 유형: `str`
- 기본값: `False`
- 설명: 더 나은 조직화, 검색 및 파일 관리 정책과의 통합을 위해 업로드 후 S3 객체 태그를 활성화합니다. Cloudflare R2를 사용하는 경우 항상 `False`로 설정되며, R2는 객체 태그를 지원하지 않습니다.

#### Google Cloud 스토리지

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- 유형: `str`
- 설명: Google 애플리케이션 자격증명 JSON 파일의 내용.
  - 선택사항 - 제공되지 않으면 자격증명은 환경에서 가져옵니다. 로컬에서 실행하면 사용자 자격 증명, Google Compute Engine에서 실행하면 Google 메타데이터 서버에서 가져옵니다.
  - 서비스 계정에 대한 파일 생성은 이 [가이드](https://developers.google.com/workspace/guides/create-credentials#service-account)에 따라 진행할 수 있습니다.

#### `GCS_BUCKET_NAME`

- 유형: `str`
- 설명: Google Cloud 스토리지의 버킷 이름을 설정합니다. 버킷은 이미 존재해야 합니다.

#### Microsoft Azure 스토리지

#### `AZURE_STORAGE_ENDPOINT`

- 유형: `str`
- 설명: Azure 스토리지의 엔드포인트 URL을 설정합니다.

#### `AZURE_STORAGE_CONTAINER_NAME`

- 유형: `str`
- 설명: Azure 스토리지의 컨테이너 이름을 설정합니다.

#### `AZURE_STORAGE_KEY`

- 유형: `str`
- 설명: Azure 스토리지의 액세스 키를 설정합니다.
  - 선택사항 - 제공되지 않으면 자격증명은 환경에서 가져옵니다. 로컬에서 실행하면 사용자 자격 증명, Azure 서비스에서 실행하면 Managed Identity를 가져옵니다.

### 데이터베이스 풀

#### `DATABASE_URL`

- 유형: `str`
- 기본값: `sqlite:///${DATA_DIR}/webui.db`
- 설명: 연결할 데이터베이스 URL을 지정합니다.

:::info

SQLite와 Postgres를 지원합니다. URL을 변경해도 데이터베이스 간 데이터가 마이그레이션되지 않습니다.
URL 스키마에 대한 문서는 [여기](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls)에서 확인 가능합니다.

:::

#### `DATABASE_SCHEMA`

- 유형: `str`
- 기본값: `None`
- 설명: 연결할 데이터베이스 스키마를 지정합니다.

#### `DATABASE_POOL_SIZE`

- 유형: `int`
- 기본값: `0`
- 설명: 데이터베이스 풀 크기를 지정합니다. `0`으로 설정하면 풀링이 비활성화됩니다.

#### `DATABASE_POOL_MAX_OVERFLOW`

- 유형: `int`
- 기본값: `0`
- 설명: 데이터베이스 풀 최대 오버플로를 지정합니다.

:::info

이 설정에 대한 자세한 정보는 [여기](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow)에서 확인할 수 있습니다.

:::

#### `DATABASE_POOL_TIMEOUT`

- 유형: `int`
- 기본값: `30`
- 설명: 연결을 얻기 위한 데이터베이스 풀 타임아웃(초)을 지정합니다.

:::info

이 설정에 대한 자세한 정보는 [여기](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout)에서 확인할 수 있습니다.

:::

#### `DATABASE_POOL_RECYCLE`

- 유형: `int`
- 기본값: `3600`
- 설명: 데이터베이스 풀 재활용 시간(초)을 지정합니다.

:::info

이 설정에 대한 자세한 정보는 [여기](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle)에서 확인할 수 있습니다.

:::

### Redis

#### `REDIS_URL`

- 유형: `str`
- 예: `redis://localhost:6379/0`
- 설명: 앱 상태를 위한 Redis 인스턴스의 URL을 지정합니다.

:::info

Open-WebUI를 멀티 노드/작업자 클러스터로 배포할 때, REDIS_URL 값을 설정해야 합니다. 이를 설정하지 않으면 작업자들이 서로 통신할 수 없어 세션, 지속성 및 앱 상태의 일관성 문제가 발생합니다.

:::

#### `REDIS_SENTINEL_HOSTS`

- 유형: `str`
- 설명: 앱 상태를 위한 Redis Sentinel의 쉼표로 구분된 목록입니다. 지정된 경우, `REDIS_URL`의 "hostname"은 Sentinel 서비스 이름으로 해석됩니다.

#### `REDIS_SENTINEL_PORT`

- 타입: `int`
- 기본값: `26379`
- 설명: 앱 상태 Redis를 위한 Sentinel 포트입니다.

#### `ENABLE_WEBSOCKET_SUPPORT`

- 타입: `bool`
- 기본값: `True`
- 설명: Open WebUI에서 웹소켓 지원을 활성화합니다.

:::info

Open-WebUI를 다중 노드/작업자 클러스터에 배포할 때, 반드시 ENABLE_WEBSOCKET_SUPPORT 값을 설정해야 합니다. 설정하지 않으면 웹소켓의 일관성과 지속성 문제를 초래할 수 있습니다.

:::

#### `WEBSOCKET_MANAGER`

- 타입: `str`
- 기본값: `redis`
- 설명: 사용할 웹소켓 관리자를 지정합니다 (이 경우 Redis).

:::info

Open-WebUI를 다중 노드/작업자 클러스터에 배포할 때, 반드시 WEBSOCKET_MANAGER 값을 설정하고, Redis와 같은 키-값 기반 NoSQL 데이터베이스를 사용해야 합니다. 그렇지 않으면 웹소켓의 일관성과 지속성 문제를 초래할 수 있습니다.

:::

#### `WEBSOCKET_REDIS_URL`

- 타입: `str`
- 기본값: `${REDIS_URL}`
- 설명: 웹소켓 통신을 위한 Redis 인스턴스의 URL을 지정합니다. 이는 `REDIS_URL`과는 별개로, 실제로는 두 값을 모두 설정하는 것이 권장됩니다.

:::info

Open-WebUI를 다중 노드/작업자 클러스터에 배포할 때, 반드시 WEBSOCKET_REDIS_URL 값을 설정하고, Redis와 같은 키-값 기반 NoSQL 데이터베이스를 사용해야 합니다. 그렇지 않으면 웹소켓의 일관성과 지속성 문제를 초래할 수 있습니다.

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- 타입: `str`
- 설명: 웹소켓용 Redis Sentinel의 쉼표로 구분된 목록입니다. 지정된 경우, `WEBSOCKET_REDIS_URL`의 "hostname"이 Sentinel 서비스 이름으로 해석됩니다.

#### `WEBSOCKET_SENTINEL_PORT`

- 타입: `int`
- 기본값: `26379`
- 설명: 웹소켓 Redis를 위한 Sentinel 포트입니다.

### Uvicorn 설정

#### `UVICORN_WORKERS`

- 타입: `int`
- 기본값: `1`
- 설명: Uvicorn이 요청을 처리하기 위해 생성하는 작업자 프로세스 수를 제어합니다. 각 작업자는 별도의 프로세스에서 애플리케이션 인스턴스를 실행합니다.

:::info

Kubernetes와 같은 오케스트레이션 환경이나 Helm 차트를 사용할 경우, UVICORN_WORKERS를 1로 유지하는 것이 권장됩니다. 컨테이너 오케스트레이션 플랫폼은 자체적으로 포드 복제를 통해 확장 메커니즘을 제공하며, 컨테이너 내부에서 다중 작업자를 사용하는 것은 리소스 할당 문제를 초래하고 수평 확장 전략을 복잡하게 만들 수 있습니다.

UVICORN_WORKERS를 사용할 경우, 확장 가능한 다중 인스턴스 설정과 관련된 환경 변수를 적절히 설정해야 합니다.

:::

### 프록시 설정

Open WebUI는 HTTP 및 HTTPS 검색을 위한 프록시 지원을 제공합니다. 프록시 설정을 지정하려면 Open WebUI는 다음 환경 변수를 사용합니다:

#### `http_proxy`

- 타입: `str`
- 설명: HTTP 프록시에 대한 URL을 설정합니다.

#### `https_proxy`

- 타입: `str`
- 설명: HTTPS 프록시에 대한 URL을 설정합니다.

#### `no_proxy`

- 타입: `str`
- 설명: 프록시를 사용하지 않을 도메인 확장자(또는 IP 주소)를 쉼표로 구분하여 나열합니다. 예를 들어, no_proxy를 `.mit.edu`로 설정하면 MIT에서 문서를 액세스할 때 프록시가 우회됩니다.

### 필요한 Python 패키지 설치

Open WebUI는 pip 설치 프로세스를 사용자 정의하기 위한 환경 변수를 제공합니다. 아래는 Open WebUI에서 패키지 설치 동작을 조정하기 위해 사용하는 환경 변수입니다:

#### `PIP_OPTIONS`

- 타입: `str`
- 설명: 패키지를 설치할 때 pip이 사용할 추가 명령 옵션을 지정합니다. 예를 들어, `--upgrade`, `--user` 또는 `--no-cache-dir`와 같은 플래그를 포함시켜 설치 프로세스를 제어할 수 있습니다.

#### `PIP_PACKAGE_INDEX_OPTIONS`

- 타입: `str`
- 설명: pip의 사용자 정의 패키지 인덱스 동작을 정의합니다. 이 설정에는 추가 또는 대체 인덱스 URL(e.g., `--extra-index-url`), 인증 자격 증명 또는 다양한 위치에서 패키지가 검색되는 방식을 관리하기 위한 기타 매개변수를 포함할 수 있습니다.
