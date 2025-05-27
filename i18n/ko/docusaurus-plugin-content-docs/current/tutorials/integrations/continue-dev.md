---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode Extension with Open WebUI"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성된 것이며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 따라 Open WebUI를 사용자 정의하는 방법에 대한 데모로만 제공됩니다. 기여를 원하시면 기여 튜토리얼을 확인하세요.
:::

# Continue.dev VSCode 확장 프로그램과 Open WebUI 통합

### 확장 프로그램 다운로드

[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)에서 VSCode 확장 프로그램을 다운로드할 수 있습니다.

설치하면 이제 사이드바에 continue 탭이 나타납니다. 이를 열어보세요.

메인 채팅 입력창 위의 Assistant 선택기를 클릭하십시오. 그런 다음 "Local Assistant" 위로 마우스를 올리면 설정 아이콘(톱니바퀴 형태)을 볼 수 있습니다.

설정 아이콘을 클릭하면 `config.yaml`이 편집기에서 열립니다.

여기서 Open WebUI를 사용하도록 continue를 구성할 수 있습니다.

---

현재 ollama 제공자는 인증을 지원하지 않으므로 Open WebUI와 함께 사용할 수 없습니다.

그러나 Ollama와 Open WebUI 모두 OpenAI API 사양과 호환됩니다. Ollama의 블로그 게시물을 [여기](https://ollama.com/blog/openai-compatibility)에서 참조할 수 있습니다.

그래도 Continue를 Open WebUI의 인증 토큰을 사용할 수 있는 openai 제공자로 설정할 수 있습니다.

---

## 설정

`config.yaml`에서 다음 옵션을 추가하거나 변경해야 합니다.

### 제공자를 openai로 변경

```yaml
provider: openai
```

### apiBase 추가 또는 업데이트

이를 Open WebUI 도메인 끝으로 설정하십시오.

```yaml
apiBase: http://localhost:3000/ #Getting Started Docker를 따랐다면
```

### apiKey 추가

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # API 키로 교체하세요
```

Open WebUI -> Settings -> Account -> API Keys에서 API 키를 찾고 생성할 수 있습니다.

API 키를 복사하세요("sk-"로 시작됨)

## 예제 설정

다음은 openai 제공자를 통해 Open WebUI를 사용하는 config.yaml의 기본 예제입니다. Granite Code를 모델로 사용합니다.
모델을 ollama 인스턴스에 미리 로드해 두세요.

```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Model ABC from pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Autocomplete
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: test
    description: 선택한 코드에 대한 유닛 테스트 작성
    prompt: |
      선택한 코드에 대한 포괄적인 유닛 테스트 세트를 작성하십시오. 설정하고, 테스트를 실행하며 올바름을 확인하는 중요한 엣지 케이스를 포함하고, 종료하십시오. 테스트가 완벽하고 정교한지 확인하십시오. 파일을 수정하지 않고 채팅 출력으로만 테스트를 제공하십시오.
```

`config.yaml`을 저장하면 끝입니다!

이제 Continue 탭 모델 선택에 모델이 나타날 것입니다.

이를 선택하면 Open WebUI를 통해 채팅을 시작할 수 있습니다(설정된 [파이프라인](/pipelines)도 포함).

사용하고자 하는 만큼 많은 모델에 대해 이 작업을 수행할 수 있지만, 어떤 모델이든 동작은 하지만 코드 설계를 위해 만들어진 모델을 사용하는 것이 좋습니다.

추가 Continue 구성을 위해 Continue 문서를 참조하세요, [Continue Documentation](https://docs.continue.dev/reference/Model%20Providers/openai)
