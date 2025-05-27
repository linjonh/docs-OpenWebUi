---
sidebar_position: 15
title: "SerpApi"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에 의해 지원되지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 커스터마이징하는 방법을 데모로 보여주기 위한 목적으로 작성되었습니다. 기여를 원하십니까? 기여 튜토리얼을 확인해보세요.
:::

## SerpApi API

[SerpApi](https://serpapi.com/)는 Google 및 다른 검색 엔진을 빠르고 쉽고 완벽한 API를 통해 스크랩합니다. `organic_results`를 반환하는 기존 또는 새로 나올 SERP 엔진을 모두 지원합니다. 기본 웹 검색 엔진은 `google`이지만, `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` 및 다른 엔진으로 변경할 수 있습니다.

### 설정

1. [SerpApi](https://serpapi.com/)로 이동하여 로그인하거나 새 계정을 만듭니다.
2. `Dashboard`로 이동하여 API 키를 복사합니다.
3. `API 키`를 가지고 `Open WebUI 관리자 패널`을 열고 `Settings` 탭을 클릭한 다음 `Web Search`를 클릭합니다.
4. `Web search`를 활성화하고 `Web Search Engine`을 `serpapi`로 설정합니다.
5. [SerpApi](https://serpapi.com/) 대시보드에서 2단계에서 복사한 `API 키`로 `SerpApi API Key`를 채웁니다.
6. [선택 사항] 쿼리하려는 `SerpApi 엔진` 이름을 입력합니다. 예: `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar`, `google_patents`. 기본값은 `google`로 설정되어 있습니다. 더 많은 옵션은 [SerpApi 문서](https://serpapi.com/dashboard)에서 확인하세요.
7. `Save`를 클릭합니다.

![Open WebUI 관리자 패널](/images/tutorial_serpapi_search.png)

#### 참고

웹을 검색하려면 [SerpApi](https://serpapi.com/) 엔진을 사용하여 프롬프트 필드에서 `Web search`를 활성화해야 합니다.

![Web search 활성화](/images/enable_web_search.png)
