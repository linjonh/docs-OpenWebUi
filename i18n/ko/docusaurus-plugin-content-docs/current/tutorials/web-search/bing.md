---
sidebar_position: 1
title: "빙(Bing)"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성된 것이며 Open WebUI 팀에서 지원하지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 커스터마이즈하는 방법을 설명하기 위한 데모 용도로만 제공됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인해 보세요.
:::

## 빙 API

### 설정

1. [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)로 이동하여 새 리소스를 생성하세요. 생성 후 리소스 개요 페이지로 리다이렉트됩니다. 그곳에서 "키 관리하려면 여기를 클릭"을 선택하세요. ![키 관리하려면 여기를 클릭](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. 키 관리 페이지에서 Key1 또는 Key2를 찾고 원하는 키를 복사하세요.
3. Open WebUI 관리자 패널을 열고 설정 탭으로 전환한 다음 웹 검색(Web Search)을 선택하세요.
4. 웹 검색(Web Search) 옵션을 활성화하고 웹 검색 엔진을 bing으로 설정하세요.
5. `SearchApi API Key` 필드에 [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) 대시보드에서 2단계에서 복사한 `API 키`를 입력하세요.
6. `저장`을 클릭하세요.
