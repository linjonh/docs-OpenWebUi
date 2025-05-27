---
sidebar_position: 25
title: "🔠 LibreTranslate Integration"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 이는 사용자의 특정 사용 사례에 맞춰 Open WebUI를 사용자 지정하는 방법의 예시로서만 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

개요
--------

LibreTranslate는 폭넓은 언어를 지원하는 무료 오픈 소스 기계 번역 API입니다. LibreTranslate는 자체 호스팅되고, 오프라인에서 사용 가능하며, 설정이 쉬우며, 다른 API와 달리 Google이나 Azure 같은 독점 제공업체에 의존하지 않고 번역을 수행합니다. 대신, 번역 엔진은 오픈 소스 [Argos Translate](https://github.com/argosopentech/argos-translate) 라이브러리에 의해 실행됩니다. LibreTranslate를 Open WebUI와 통합하여 기계 번역 기능을 활용할 수 있습니다. 이 문서는 Docker에서 LibreTranslate를 설정하고 Open WebUI 내에서 통합을 구성하는 단계별 가이드를 제공합니다.

Docker에서 LibreTranslate 설정하기
-----------------------------------

LibreTranslate를 Docker에 설정하려면 다음 단계를 따르세요:

### 1단계: Docker Compose 파일 생성

선택한 디렉터리에 `docker-compose.yml`이라는 새 파일을 생성하세요. 파일에 다음 구성을 추가하세요:

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### 2단계: `stack.env` 파일 생성

`docker-compose.yml` 파일과 같은 디렉터리에 `stack.env`라는 새 파일을 생성하세요. 파일에 다음 구성을 추가하세요:

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### 3단계: Docker Compose 파일 실행

LibreTranslate 서비스를 시작하려면 다음 명령을 실행하세요:

```bash
docker-compose up -d
```

이 명령으로 LibreTranslate 서비스가 분리 모드로 시작됩니다.

Open WebUI에서 통합 구성하기
-------------------------------------------

Docker에서 LibreTranslate를 실행한 다음, Open WebUI 내에서 통합을 구성할 수 있습니다. 다음은 사용할 수 있는 커뮤니티 통합입니다:

* [LibreTranslate 필터 기능](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslate 액션 기능](https://openwebui.com/f/jthesse/libretranslate_action)
* [다중 언어 LibreTranslate 액션 기능](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslate 필터 파이프라인](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

필요에 가장 적합한 통합을 선택하고 이를 Open WebUI에 구성하는 방법에 대한 지침을 따르세요.

LibreTranslate 파이프라인 및 기능이 지원하는 언어:
LibreTranslate 내에서 찾을 수 있는 모든 언어를 여기에 나열했습니다:
```
알바니아어, 아랍어, 아제르바이잔어, 벵골어, 불가리아어, 카탈로니아어, 발렌시아어, 중국어, 체코어, 덴마크어, 네덜란드어, 영어, 플레미쉬어, 에스페란토어, 에스토니아어, 핀란드어, 프랑스어, 독일어, 그리스어, 히브리어, 힌디어, 헝가리어, 인도네시아어, 아일랜드어, 이탈리아어, 일본어, 한국어, 라트비아어, 리투아니아어, 말레이어, 페르시아어, 폴란드어, 포르투갈어, 루마니아어, 몰다비아어, 몰도바어, 러시아어, 슬로바키아어, 슬로베니아어, 스페인어, 카스티야어, 스웨덴어, 타갈로그어, 태국어, 터키어, 우크라이나어, 우르두어
```

문제 해결
--------------

* LibreTranslate 서비스가 실행되고 접근 가능한지 확인하세요.
* Docker 구성이 올바른지 확인하세요.
* LibreTranslate 로그에서 오류를 확인하세요.

통합의 이점
----------------------

Open WebUI와 LibreTranslate를 통합하면 다음과 같은 여러 이점을 제공합니다:

* 다수의 언어에 대한 기계 번역 기능.
* 텍스트 분석 및 처리 개선.
* 언어 관련 작업을 위한 기능 향상.

결론
----------

Open WebUI와 LibreTranslate를 통합하는 것은 간단한 과정으로 Open WebUI 인스턴스의 기능을 향상시킬 수 있습니다. 이 문서에 설명된 단계를 따라 Docker에서 LibreTranslate를 설정하고 Open WebUI 내에서 통합을 구성하세요.
