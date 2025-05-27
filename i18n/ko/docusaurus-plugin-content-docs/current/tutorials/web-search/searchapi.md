---
sidebar_position: 9
title: "SearchApi"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에서 공식적으로 지원하지 않습니다. 특정 사용 사례에 맞게 Open WebUI를 맞춤화하는 방법을 시연하는 데 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해 보세요.
:::

## SearchApi API

[SearchApi](https://searchapi.io)는 실시간 SERP API 모음입니다. `organic_results`를 반환하는 기존 또는 신규 SERP 엔진이 모두 지원됩니다. 기본 웹 검색 엔진은 `google`이지만, `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` 등의 다른 엔진으로 변경할 수 있습니다.

### 설정

1. [SearchApi](https://searchapi.io)에 접속하여 로그인하거나 새 계정을 생성하세요.
2. `대시보드`로 이동하여 API 키를 복사하세요.
3. `API 키`를 사용하여 `Open WebUI 관리자 패널`을 열고 `설정` 탭을 클릭한 다음, `웹 검색`을 클릭하세요.
4. `웹 검색`을 활성화하고 `웹 검색 엔진`을 `searchapi`로 설정하세요.
5. [SearchApi](https://www.searchapi.io/) 대시보드에서 2단계에서 복사한 `API 키`를 `SearchApi API 키`에 입력하세요.
6. [선택 사항] 사용하려는 `SearchApi 엔진` 이름을 입력하세요. 예: `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar`, `google_patents`. 기본값은 `google`로 설정되어 있습니다.
7. `저장` 버튼을 클릭하세요.

![Open WebUI 관리자 패널](/images/tutorial_searchapi_search.png)

#### 메모

[SearchApi](https://www.searchapi.io/) 엔진을 사용하여 웹을 검색하려면, 프롬프트 필드에서 더하기 (`+`) 버튼을 사용하여 `웹 검색`을 활성화해야 합니다.

![웹 검색 활성화](/images/enable_web_search.png)
