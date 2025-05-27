---
sidebar_position: 8
title: "모직(Mojeek)"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 만들어졌으며 Open WebUI 팀에서 지원하지 않습니다. 특정 사용 사례에 맞게 Open WebUI를 커스터마이징하는 방법을 보여주는 데에만 사용됩니다. 기여를 원하시나요? 기여 튜토리얼을 확인하세요.
:::

## 모직 검색 API

### 설정

1. [모직 검색 API 페이지](https://www.mojeek.com/services/search/web-search-api/)를 방문하여 `API 키`를 얻으세요.
2. `API 키`를 사용하여 `Open WebUI 관리 패널`을 열고 `설정` 탭을 클릭한 다음 `웹 검색`을 클릭하세요.
3. `웹 검색`을 활성화하고 `웹 검색 엔진`을 `mojeek`으로 설정하세요.
4. `모직 검색 API 키`에 `API 키`를 입력하세요.
5. `저장`을 클릭하세요.

### 도커 컴포즈 설정

Open WebUI의 `docker-compose.yaml` 파일에 다음 환경 변수를 추가하세요:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
