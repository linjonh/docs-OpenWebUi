---
sidebar_position: 5
title: "Google PSE"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 이는 특별한 사용 사례에 맞게 Open WebUI를 커스터마이징하는 방법을 시연하기 위한 것입니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해 보세요.
:::

## Google PSE API

### 설정

1. Google Developers에 방문하여 [프로그래머블 검색 엔진](https://developers.google.com/custom-search)을 이용하십시오. 로그인하거나 계정을 생성하십시오.
2. [제어판](https://programmablesearchengine.google.com/controlpanel/all)에 가서 `추가` 버튼을 클릭하십시오.
3. 검색 엔진 이름을 입력하고, 기타 속성을 맞춤 설정한 후 로봇이 아님을 확인한 뒤 `생성` 버튼을 클릭하십시오.
4. `API 키`를 생성하고 `검색 엔진 ID`를 가져오십시오. (엔진이 생성된 후에 이용 가능)
5. `API 키`와 `검색 엔진 ID`를 가지고 `Open WebUI 관리자 패널`을 열어 `설정` 탭을 클릭한 뒤 `웹 검색`을 클릭하십시오.
6. `웹 검색`을 활성화하고 `웹 검색 엔진`을 `google_pse`로 설정하십시오.
7. `Google PSE API Key`에 `API 키`를 입력하고 `Google PSE Engine Id` (#4)을 입력하십시오.
8. `저장` 버튼을 클릭하십시오.

![Open WebUI Admin panel](/images/tutorial_google_pse1.png)

#### 참고

프롬프트 필드에서 `웹 검색`을 활성화하려면 `+` 버튼을 사용해야 합니다.
웹 검색을 시도해 보세요 ;-)

![enable Web search](/images/tutorial_google_pse2.png)
