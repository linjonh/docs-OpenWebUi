---
sidebar_position: 20
title: "💥 Langfuse로 모니터링 및 디버깅"
---

# Langfuse와 Open WebUI 통합

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse))는 Open WebUI에 대한 오픈 소스 가시성 및 평가 기능을 제공합니다. Langfuse 통합을 활성화하면 애플리케이션 데이터를 Langfuse를 통해 추적할 수 있으며, 다음을 포함하여 Open WebUI 사용을 개발, 모니터링, 개선할 수 있습니다:

- 애플리케이션 [추적](https://langfuse.com/docs/tracing)
- 사용 패턴
- 사용자와 모델에 따른 비용 데이터
- 문제를 디버깅하기 위한 세션 재생
- [평가](https://langfuse.com/docs/scores/overview)

## Langfuse와 Open WebUI를 통합하는 방법

![Langfuse Integration](https://langfuse.com/images/docs/openwebui-integration.gif)
_Langfuse 통합 단계_

Open WebUI의 [Pipelines](https://github.com/open-webui/pipelines/)는 OpenAI API 플러그인을 위한 UI에 독립적인 프레임워크입니다. 이를 통해 플러그인을 삽입하여 사용자 프롬프트를 요약하고, 처리하고, 최종 LLM으로 전달할 수 있어 프롬프트 처리 제어 및 맞춤화를 강화할 수 있습니다.

애플리케이션 데이터를 Langfuse로 추적하려면 [Langfuse 파이프라인](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py)을 사용할 수 있습니다. 이를 통해 메시지 상호작용에 대한 실시간 모니터링과 분석이 가능합니다.

## 빠른 시작 가이드

### 1단계: Open WebUI 설정

Open WebUI가 실행 중인지 확인하세요. 이를 위해 [Open WebUI 문서](https://docs.openwebui.com/)를 참조하세요.

### 2단계: Pipelines 설정

Docker를 사용하여 [Pipelines](https://github.com/open-webui/pipelines/)를 시작합니다. 아래 명령어를 사용해 Pipelines를 시작하세요:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### 3단계: Pipelines와 Open WebUI 연결

_관리자 설정_에서 새 OpenAI API 타입 연결을 생성하고 아래와 같은 세부 정보를 저장하세요:

- **URL:**`http://host.docker.internal:9099` (이 URL은 이전에 실행한 Docker 컨테이너가 실행되고 있는 위치입니다).
- **비밀번호:** 0p3n-w3bu! (기본 비밀번호)

![Open WebUI Settings](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### 4단계: Langfuse 필터 파이프라인 추가

다음으로 _관리자 설정_ -> _Pipelines_로 이동하여 Langfuse 필터 파이프라인을 추가하세요. Pipelines가`http://host.docker.internal:9099`에서 대기 중임을 지정하고 [Langfuse 필터 파이프라인](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py)을 설치하려면 _GitHub URL에서 설치_ 옵션을 사용하여 아래 URL을 입력하세요:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

이제 아래에 Langfuse API 키를 추가하세요. 아직 Langfuse에 가입하지 않았다면 [여기](https://cloud.langfuse.com)에서 계정을 생성하여 API 키를 얻을 수 있습니다.

![Open WebUI add Langfuse Pipeline](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**참고:** 스트리밍이 활성화된 OpenAI 모델에서 사용량(토큰 수)을 캡처하려면 Open WebUI의 모델 설정으로 이동하여 _기능_ 아래에 있는 ["사용량" 상자](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586)를 확인해야 합니다._

### 5단계: Langfuse에서 추적 보기

이제 Open WebUI 애플리케이션과 상호작용하고 Langfuse에서 추적을 확인할 수 있습니다.

[Langfuse UI의 예제 추적](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28):

![Open WebUI Example Trace in Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## 더 알아보기

Open WebUI Pipelines에 대한 포괄적인 가이드는 [이 글](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/)을 참조하세요.
