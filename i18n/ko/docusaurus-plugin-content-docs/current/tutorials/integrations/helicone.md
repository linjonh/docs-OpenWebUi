---
title: "🕵🏻‍♀️ Helicone으로 LLM 요청 모니터링하기"
sidebar_position: 19
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀의 공식 지원을 받지 않습니다. 이는 Open WebUI를 특정 사용 사례에 맞게 사용자 정의하는 방법을 시연하기 위한 것입니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해 보세요.
:::

# Open WebUI에 Helicone 통합하기

Helicone은 개발자가 Open WebUI 배포를 포함한 **프로덕션 준비 완료** 애플리케이션을 모니터링, 디버그 및 개선할 수 있도록 지원하는 오픈 소스 LLM 관측 플랫폼입니다.

Helicone을 활성화하면 LLM 요청을 기록하고, 프롬프트를 평가하고 실험하며, 프로덕션으로 변경 사항을 자신 있게 푸시할 수 있도록 즉각적인 인사이트를 얻을 수 있습니다.

- **모델 유형 간 통합된 보기로 실시간 모니터링**: 로컬 Ollama 모델과 클라우드 API를 단일 인터페이스에서 모니터링
- **요청 시각화 및 다시 실행**: 각 모델에 보낸 프롬프트와 LLM이 생성한 출력을 Open WebUI에서 정확히 확인 가능
- **로컬 LLM 성능 추적**: 자체 호스팅 모델의 응답 시간 및 처리량 측정
- **모델별 사용 분석**: Open WebUI 설정에서 서로 다른 모델 간 사용 패턴 비교
- **사용자 분석**으로 상호작용 패턴 이해
- **디버그 기능**으로 모델 응답 문제 해결
- **비용 추적**으로 공급자별 LLM 사용 비용 관리


## OpenWebUI에 Helicone 통합 방법

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### 1단계: Helicone 계정 생성 및 API 키 생성

[Helicone 계정](https://www.helicone.ai/)을 생성하고 로그인하여 [여기에서 API 키를 생성](https://us.helicone.ai/settings/api-keys)하세요.

*— [쓰기 전용 API 키](https://docs.helicone.ai/helicone-headers/helicone-auth)를 생성해야 합니다. 이는 Helicone에 데이터 기록만 허용하고 개인 데이터에 대한 읽기 접근을 허용하지 않음을 보장합니다.*

### 2단계: OpenAI 계정 생성 및 API 키 생성

OpenAI 계정을 생성하고 [OpenAIs Developer Portal](https://platform.openai.com/account/api-keys)에 로그인하여 API 키를 생성하세요.

### 3단계: Helicone의 기본 URL을 사용하여 Open WebUI 애플리케이션 실행

첫 번째 Open WebUI 애플리케이션을 실행하려면 [Open WebUI 문서](https://docs.openwebui.com/)의 명령을 사용하고 Helicone의 API 기본 URL을 포함하십시오. 이를 통해 자동으로 질의하고 모니터링할 수 있습니다.

```bash
   # 환경 변수를 설정하세요
   export HELICONE_API_KEY=<YOUR_API_KEY>
   export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

   # Helicone 통합으로 Open WebUI 실행
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

이미 Open WebUI 애플리케이션이 배포된 경우, `Admin Panel` > `Settings` > `Connections`로 이동하여 "Managing OpenAI API Connections"의 `+` 기호를 클릭하세요. 다음 속성을 업데이트하세요:

- `API Base URL`은 ``https://oai.helicone.ai/v1/<YOUR_HELICONE_API_KEY>``로 설정합니다.
- `API KEY`는 OpenAI API 키를 사용합니다.

![Open WebUI Helicone Setup](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### 4단계: 모니터링이 작동하는지 확인

통합이 올바르게 작동하는지 확인하려면 Helicone의 대시보드에 로그인하여 "Requests" 탭을 검토하세요.

Open WebUI 인터페이스를 통해 수행한 요청이 이미 Helicone에 기록되고 있는 것을 확인할 수 있습니다.

![Example Helicone Trace](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## 더 알아보기

Helicone에 대한 포괄적인 가이드는 [Helicone의 문서](https://docs.helicone.ai/getting-started/quick-start)에서 확인할 수 있습니다.
