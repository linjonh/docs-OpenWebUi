---
sidebar_position: 4100
title: "🦊 Firefox AI Chatbot Sidebar"
---

:::warning
이 자습서는 커뮤니티 기여로 작성되었으며 Open WebUI 팀의 공식 지원을 받지 않습니다. 이 자습서는 Open WebUI를 특정 사용 사례에 맞게 사용자 정의하는 방법을 시연하기 위해 제공됩니다. 기여를 원하신다면, 기여 자습서를 확인해 보세요.
:::

## 🦊 Firefox AI Chatbot 사이드바

# Mozilla Firefox에서 Open WebUI를 로컬 AI 채팅봇 브라우저 어시스턴트로 통합

## 사전 요구 사항

Mozilla Firefox에서 Open WebUI를 AI 채팅봇 브라우저 어시스턴트로 통합하기 전에 다음이 준비되어야 합니다:

* Open WebUI 인스턴스의 URL (로컬 또는 도메인)
* Firefox 브라우저가 설치되어 있어야 함

## Firefox에서 AI 채팅봇 활성화

1. 햄버거 버튼(오른쪽 상단에서 `X` 버튼 바로 아래에 있는 세 개의 가로선 버튼)을 클릭합니다.
2. Firefox 설정을 엽니다.
3. `Firefox Labs` 섹션을 클릭합니다.
4. `AI Chatbot`을 활성화합니다.

또는 다음 섹션에서 설명된 것처럼 `about:config` 페이지를 통해 AI Chatbot을 활성화할 수 있습니다.

## about:config 설정 구성

1. Firefox 주소 표시줄에 `about:config`를 입력합니다.
2. `위험을 수락하고 계속하기` 버튼을 클릭합니다.
3. `browser.ml.chat.enabled`를 검색하고 활성화되지 않은 경우 `true`로 전환합니다 (Firefox Labs를 통해 이미 활성화되지 않았을 경우).
4. `browser.ml.chat.hideLocalhost`를 검색하고 `false`로 전환합니다.

### browser.ml.chat.prompts.#

사용자 지정 프롬프트를 추가하려면 다음 단계를 따르세요:

1. `browser.ml.chat.prompts.#`로 검색합니다 (`#`는 숫자로 대체, 예: `0`, `1`, `2`, 등등).
2. `+` 버튼을 클릭하여 새 프롬프트를 추가합니다.
3. 프롬프트 라벨, 값, 그리고 ID를 입력합니다 (예: `{"id":"My Prompt", "value": "이것은 나의 사용자 지정 프롬프트입니다.", "label": "My Prompt"}`).
4. 원하는 만큼 더 많은 프롬프트를 추가하려면 위 단계를 반복합니다.

### browser.ml.chat.provider

1. `browser.ml.chat.provider`를 검색합니다.
2. 선택적으로 매개변수를 포함하여 Open WebUI 인스턴스 URL을 입력합니다 (예: `https://my-open-webui-instance.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`).

## Open WebUI의 URL 매개변수

다음 URL 매개변수를 사용하여 Open WebUI 인스턴스를 사용자 정의할 수 있습니다:

### 모델 및 모델 선택

* `models`: 채팅 세션에 여러 모델을 지정합니다 (쉼표로 구분된 리스트, 예: `/?models=model1,model2`).
* `model`: 채팅 세션에 단일 모델을 지정합니다 (예: `/?model=model1`).

### YouTube 전사

* `youtube`: YouTube 동영상 ID를 제공하여 채팅에서 동영상을 전사합니다 (예: `/?youtube=VIDEO_ID`).

### 웹 검색

* `web-search`: 이 매개변수를 `true`로 설정하여 웹 검색 기능을 활성화 (예: `/?web-search=true`).

### 도구 선택

* `tools` 또는 `tool-ids`: 채팅에서 활성화할 도구 ID의 쉼표로 구분된 리스트를 지정합니다 (예: `/?tools=tool1,tool2` 또는 `/?tool-ids=tool1,tool2`).

### 통화 오버레이

* `call`: 이 매개변수를 `true`로 설정하여 채팅 인터페이스에서 동영상 또는 통화 오버레이를 활성화합니다 (예: `/?call=true`).

### 초기 쿼리 프롬프트

* `q`: 채팅에 초기 쿼리 또는 프롬프트를 설정합니다 (예: `/?q=Hello%20there`).

### 임시 채팅 세션

* `temporary-chat`: 이 매개변수를 `true`로 설정하여 채팅을 임시 세션으로 표시합니다 (예: `/?temporary-chat=true`).

URL 매개변수 및 이를 사용하는 방법에 대한 자세한 내용은 https://docs.openwebui.com/features/chat-features/url-params 를 참조하세요.

## 추가 about:config 설정

추가 사용자 지정을 위해 다음 `about:config` 설정을 조정할 수 있습니다:

* `browser.ml.chat.shortcuts`: AI 채팅봇 사이드바용 사용자 지정 단축키 활성화
* `browser.ml.chat.shortcuts.custom`: AI 채팅봇 사이드바용 사용자 지정 단축키 활성화
* `browser.ml.chat.shortcuts.longPress`: 단축키의 길게 누르기 지연 시간 설정
* `browser.ml.chat.sidebar`: AI 채팅봇 사이드바 활성화
* `browser.ml.checkForMemory`: 모델 로드 전에 사용 가능한 메모리 확인
* `browser.ml.defaultModelMemoryUsage`: 모델의 기본 메모리 사용량 설정
* `browser.ml.enable`: Firefox에서 기계 학습 기능 활성화
* `browser.ml.logLevel`: 기계 학습 기능의 로그 레벨 설정
* `browser.ml.maximumMemoryPressure`: 최대 메모리 압력 임계값 설정
* `browser.ml.minimumPhysicalMemory`: 필요한 최소 물리적 메모리 설정
* `browser.ml.modelCacheMaxSize`: 모델 캐시의 최대 크기 설정
* `browser.ml.modelCacheTimeout`: 모델 캐시의 타임아웃 설정
* `browser.ml.modelHubRootUrl`: 모델 허브의 루트 URL 설정
* `browser.ml.modelHubUrlTemplate`: 모델 허브의 URL 템플릿 설정
* `browser.ml.queueWaitInterval`: 큐 대기 간격 설정
* `browser.ml.queueWaitTimeout`: 큐 대기 타임아웃 설정

## AI 채팅봇 사이드바 액세스

AI 채팅봇 사이드바에 액세스하려면 다음 중 하나의 방법을 사용하세요:

* `CTRL+B`를 눌러 북마크 사이드바를 열고 AI 채팅봇으로 전환
* `CTRL+Alt+X`를 눌러 AI 채팅봇 사이드바를 직접 열기