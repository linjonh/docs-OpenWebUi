---
sidebar_position: 16
title: "🌐 브라우저 검색 엔진"
---

:::경고
이 튜토리얼은 커뮤니티의 기여로 작성된 것으로, Open WebUI 팀에서 지원하지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 사용자 지정하는 방법을 시연하기 위해 제공됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인해보세요.
:::

# 브라우저 검색 엔진 통합

Open WebUI를 웹 브라우저에 직접 통합할 수 있습니다. 이 튜토리얼은 Open WebUI를 사용자 지정 검색 엔진으로 설정하여 브라우저의 주소창에서 간편하게 쿼리를 실행할 수 있도록 하는 방법을 안내합니다.

## Open WebUI를 검색 엔진으로 설정하기

### 사전 준비

시작하기 전에 다음 사항을 확인하십시오:

- Chrome 또는 다른 지원되는 브라우저가 설치되어 있어야 합니다.
- `WEBUI_URL` 환경 변수가 옳게 설정되어 있어야 합니다. 이는 Docker 환경 변수를 사용하거나 [시작 가이드](/getting-started/env-configuration)에 명시된 대로 `.env` 파일에 설정해야 합니다.

### 1단계: WEBUI_URL 환경 변수 설정

`WEBUI_URL` 환경 변수를 설정하면 브라우저가 쿼리를 어디로 보내야 하는지 알 수 있습니다.

#### Docker 환경 변수 사용

Docker를 사용하여 Open WebUI를 실행 중인 경우, `docker run` 명령에서 환경 변수를 설정할 수 있습니다:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<your-open-webui-url>" \
  ghcr.io/open-webui/open-webui:main
```

또는 `.env` 파일에 변수를 추가할 수 있습니다:

```plaintext
WEBUI_URL=https://<your-open-webui-url>
```

### 2단계: Open WebUI를 사용자 지정 검색 엔진으로 추가

### Chrome용

1. Chrome을 열고 **설정**으로 이동합니다.
2. 사이드바에서 **검색 엔진**을 선택하고, **검색 엔진 관리**를 클릭합니다.
3. **추가** 버튼을 클릭하여 새로운 검색 엔진을 만듭니다.
4. 다음과 같이 세부 정보를 입력합니다:
    - **검색 엔진**: Open WebUI Search
    - **키워드**: webui (또는 원하는 키워드)
    - **%s 대신에 쿼리를 넣은 URL**:

      ```
      https://<your-open-webui-url>/?q=%s
      ```

5. **추가**를 클릭하여 구성을 저장합니다.

### Firefox용

1. Firefox에서 Open WebUI로 이동합니다.
2. 주소창을 클릭하여 확장합니다.
3. 확장된 주소창 하단에 녹색 원으로 둘러싸인 더하기 아이콘을 클릭합니다. 이를 통해 Open WebUI의 검색이 설정에서 검색 엔진에 추가됩니다.

또는:

1. Firefox에서 Open WebUI로 이동합니다.
2. 주소창에서 마우스 오른쪽 버튼을 클릭합니다.
3. 컨텍스트 메뉴에서 "Add Open WebUI"(또는 유사 이름)를 선택합니다.

### 선택 사항: 특정 모델 사용

특정 모델을 검색에 사용하고자 한다면, URL 형식을 수정하여 모델 ID를 포함하십시오:

```
https://<your-open-webui-url>/?models=<model_id>&q=%s
```

**참고:** 모델 ID는 URL 인코딩되어야 합니다. 공백이나 슬래시 같은 특수 문자는 인코딩 필요 (예: `my model`은 `my%20model`로 변환).

## 사용 예시

검색 엔진 설정이 완료되면 주소창에서 즉시 검색을 실행할 수 있습니다. 선택한 키워드와 쿼리를 입력하세요:

```
webui your search query
```

이 명령은 검색 결과가 포함된 Open WebUI 인터페이스로 이동합니다.

## 문제 해결

문제가 발생할 경우, 다음을 확인하십시오:

- `WEBUI_URL`이 올바르게 구성되어 있고 유효한 Open WebUI 인스턴스를 가리키는지 확인합니다.
- 브라우저 설정에서 검색 엔진 URL 형식이 제대로 입력되었는지 확인합니다.
- 인터넷 연결이 활성 상태인지, Open WebUI 서비스가 정상적으로 실행 중인지 확인합니다.
