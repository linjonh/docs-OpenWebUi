---
sidebar_position: 2
title: "🗨️ Kokoro Web - Effortless TTS for Open WebUI"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성된 것으로 Open WebUI 팀에서 지원하지 않습니다. 특정 용도에 맞게 Open WebUI를 사용자 정의하는 방법을 설명하기 위한 예제일 뿐입니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

## `Kokoro Web`이란 무엇인가요?

[Kokoro Web](https://github.com/eduardolat/kokoro-web)은 OpenAI 호환 API를 제공하며 강력한 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 텍스트-투-스피치 모델과 통합하여 Open WebUI에서 자연스러운 음성으로 AI 대화를 향상시킵니다.

## 🚀 두 단계 통합

### 1. Kokoro Web API 배포 (한 줄 명령으로 실행)

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # OpenAI 호환 API 키로 사용할 비밀 키로 변경하세요
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

실행 방법: `docker compose up -d`

### 2. OpenWebUI 연결 (30초 소요)

1. OpenWebUI에서 `관리 패널` → `설정` → `오디오`로 이동하세요.
2. 다음을 설정하세요:
   - 텍스트-투-스피치 엔진: `OpenAI`
   - API 기본 URL: `http://localhost:3000/api/v1`  
     (도커 사용 시: `http://host.docker.internal:3000/api/v1`)
   - API 키: `your-api-key` (1단계에서 생성한 API 키)
   - TTS 모델: `model_q8f16` (크기/품질 균형 추천)
   - TTS 음성: `af_heart` (기본 따뜻하고 자연스러운 영어 음성). 이를 [Kokoro Web Demo](https://voice-generator.pages.dev)에서 제공되는 다른 음성이나 공식으로 변경할 수 있습니다.

**이제 OpenWebUI가 AI 음성 기능을 갖췄습니다.**

## 🌍 지원 언어

Kokoro Web은 각 언어에 최적화된 특정 음성으로 다음 8가지 언어를 지원합니다:

- 영어 (미국) - en-us
- 영어 (영국) - en-gb
- 일본어 - ja
- 중국어 - cmn
- 스페인어 - es-419
- 힌디어 - hi
- 이탈리아어 - it
- 포르투갈어 (브라질) - pt-br

각 언어는 최적의 발음과 자연스러운 흐름을 위해 전용 음성을 가지고 있습니다. 전체 언어별 음성 목록은 [GitHub 저장소](https://github.com/eduardolat/kokoro-web)를 확인하거나 [Kokoro Web Demo](https://voice-generator.pages.dev)를 사용하여 즉시 음성을 미리 보기 및 사용자 정의할 수 있습니다.

## 💾 하드웨어에 최적화된 모델

하드웨어 요구 사항에 맞는 모델을 선택하세요:

| 모델 ID | 최적화 | 크기 | 추천 용도 |
|----------|-------------|------|-----------|
| model_q8f16 | 혼합 정밀도 | 86 MB | **추천** - 크기/품질 균형 최적 |
| model_quantized | 8비트 | 92.4 MB | 좋은 CPU 성능 |
| model_uint8f16 | 혼합 정밀도 | 114 MB | 중급 CPU에서 더 나은 품질 |
| model_q4f16 | 4비트 & fp16 가중치 | 154 MB | 더 높은 품질, 여전히 효율적 |
| model_fp16 | fp16 | 163 MB | 프리미엄 품질 |
| model_uint8 | 8비트 & 혼합 | 177 MB | 균형 있는 옵션 |
| model_q4 | 4비트 matmul | 305 MB | 고품질 옵션 |
| model | fp32 | 326 MB | 최대 품질 (느림) |

## ✨ 설치 전 먼저 체험해보세요

[**Kokoro Web Demo**](https://voice-generator.pages.dev)에 방문하여 모든 음성을 즉시 미리 보세요. 이 데모는:

- **브라우저에서 100% 실행** - 서버 필요 없음
- **영원히 무료** - 사용 제한 및 등록 필요 없음
- **설치 필요 없음** - 웹사이트에 방문하여 즉시 시작
- **모든 기능 포함** - 모든 음성과 언어를 즉시 테스트 가능

## 추가 도움이 필요한가요?

추가 옵션, 음성 사용자 정의 가이드 및 고급 설정은 [GitHub 저장소](https://github.com/eduardolat/kokoro-web)를 참조하세요.

**OpenWebUI 대화에서 자연스러운 AI 음성을 즐겨보세요!**
