---
sidebar_position: 2
title: "Brave"
---

:::warning
이 튜토리얼은 커뮤니티 기부로 제공되며 Open WebUI 팀의 지원을 받지 않습니다. 이는 특정 사용 사례에 따라 Open WebUI를 사용자 정의하는 방법을 보여주는 데만 사용됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인하세요.
:::

## Brave API

### Docker Compose 설정

Open WebUI `docker-compose.yaml` 파일에 다음 환경 변수를 추가하세요:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "brave"
      BRAVE_SEARCH_API_KEY: "YOUR_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
