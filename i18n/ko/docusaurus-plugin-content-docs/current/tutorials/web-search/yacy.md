---
sidebar_position: 16
title: "Yacy"
---

:::경고
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 커스터마이즈 하는 방법을 시연하는 데에만 사용됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인하십시오.
:::

## Yacy API

### 설정

1. 다음으로 이동하십시오: `관리 패널` -> `설정` -> `웹 검색`
2. `웹 검색 활성화`를 토글하십시오
3. 드롭다운 메뉴에서 `웹 검색 엔진`을 `yacy`로 설정하십시오
4. `Yacy 인스턴스 URL`을 다음 예 중 하나로 설정하십시오:

    * `http://yacy:8090` (컨테이너 이름과 노출된 포트를 사용하며, Docker 기반 설정에 적합)
    * `http://host.docker.internal:8090` (`host.docker.internal` DNS 이름과 호스트 포트를 사용하며, Docker 기반 설정에 적합)
    * `https://<yacy.local>:8443` (로컬 도메인 이름을 사용하며, 로컬 네트워크 액세스에 적합)
    * `https://yacy.example.com` (자체 호스팅 Yacy 인스턴스를 위한 사용자 지정 도메인 이름을 사용하며, 공개 또는 비공개 액세스에 적합)
    * `https://yacy.example.com:8443` (기본 Yacy https 포트를 사용하는 https 연결)

5. 인증이 필요한 Yacy 인스턴스의 경우, 선택적으로 Yacy 사용자 이름과 비밀번호를 입력하십시오. 둘 다 비워두면, 다이제스트 인증은 건너뜁니다
6. 저장 버튼을 누르십시오

![Yacy 설정을 보여주는 Open WebUI 관리 패널](/images/tutorial_yacy.png)
