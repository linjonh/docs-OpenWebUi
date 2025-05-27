---
sidebar_position: 4000
title: "🪶 Apache Tika Extraction"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 사용자 지정하는 방법을 보여주는 데만 목적을 두고 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해 보세요.
:::

## 🪶 Apache Tika Extraction

이 문서는 Apache Tika를 Open WebUI에 통합하는 단계별 가이드를 제공합니다. Apache Tika는 콘텐츠 분석 툴킷으로, 1,000개 이상의 다양한 파일 유형에서 메타데이터와 텍스트 콘텐츠를 감지 및 추출하는 데 사용할 수 있습니다. Tika는 검색 엔진 색인 생성, 콘텐츠 분석, 번역 등 다양한 작업에 유용합니다.

전제 조건
------------

* Open WebUI 인스턴스
* 시스템에 설치된 Docker
* Open WebUI용으로 설정된 Docker 네트워크

통합 단계
----------------

### 1단계: Docker Compose 파일 생성 또는 Docker 명령 실행하여 Apache Tika 실행

Apache Tika를 실행하는 두 가지 옵션이 있습니다:

**옵션 1: Docker Compose 사용**

Open WebUI 인스턴스와 동일한 디렉터리에 `docker-compose.yml`이라는 새 파일을 생성하세요. 파일에 다음 구성을 추가합니다:

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

다음 명령을 사용하여 Docker Compose 파일을 실행하세요:

```bash
docker-compose up -d
```

**옵션 2: Docker 실행 명령 사용**

또는 다음 Docker 명령을 사용하여 Apache Tika를 실행할 수 있습니다:

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

Docker 실행 명령을 사용하는 경우 Open WebUI 인스턴스와 동일한 네트워크에서 컨테이너를 실행하려면 `--network` 플래그를 지정해야 합니다.

### 2단계: Open WebUI를 Apache Tika 사용으로 구성

Open WebUI에서 Apache Tika를 컨텍스트 추출 엔진으로 사용하려면 다음 단계를 따르세요:

* Open WebUI 인스턴스에 로그인합니다.
* `관리 패널` 설정 메뉴로 이동합니다.
* `설정`을 클릭합니다.
* `문서` 탭을 클릭합니다.
* `기본` 콘텐츠 추출 엔진 드롭다운을 `Tika`로 변경합니다.
* 컨텍스트 추출 엔진 URL을 `http://tika:9998`로 업데이트합니다.
* 변경 사항을 저장합니다.

 Docker에서 Apache Tika 검증
=====================================

Docker 환경에서 Apache Tika가 올바르게 작동하는지 확인하려면 다음 단계를 수행할 수 있습니다:

### 1. Apache Tika Docker 컨테이너 시작

먼저 Apache Tika Docker 컨테이너가 실행되고 있는지 확인하세요. 다음 명령을 사용하여 컨테이너를 시작할 수 있습니다:

```bash
docker run -p 9998:9998 apache/tika
```

이 명령은 Apache Tika 컨테이너를 시작하고 컨테이너의 포트 9998을 로컬 머신의 포트 9998에 연결합니다.

### 2. 서버 실행 여부 확인

GET 요청을 보내 Apache Tika 서버가 실행되고 있는지 확인할 수 있습니다:

```bash
curl -X GET http://localhost:9998/tika
```

이 명령은 다음 응답을 반환해야 합니다:

```
This is Tika Server. Please PUT
```

### 3. 통합 검증

또는 파일을 분석을 위해 전송하여 통합을 테스트할 수도 있습니다. `curl` 명령을 사용하여 파일을 분석을 위해 Apache Tika로 전송할 수 있습니다:

```bash
curl -T test.txt http://localhost:9998/tika
```

로컬 머신의 텍스트 파일 경로를 `test.txt` 대신 입력하세요.

Apache Tika는 파일의 감지된 메타데이터와 콘텐츠 유형으로 응답합니다.

### Apache Tika를 검증하는 스크립트 사용

자동화된 검증 프로세스를 원하시면 아래 스크립트를 사용할 수 있습니다. 이 스크립트는 파일을 Apache Tika로 전송하고 응답 내에서 기대되는 메타데이터를 확인합니다. 메타데이터가 존재하는 경우 스크립트는 성공 메시지와 파일의 메타데이터를 출력하며, 그렇지 않은 경우 오류 메시지와 Tika의 응답을 출력합니다.

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # 파일을 Apache Tika로 전송하고 출력 확인
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tika가 파일을 성공적으로 분석했습니다.")
            print("Apache Tika의 응답:")
            print(response.text)
        else:
            print("파일 분석 중 오류 발생:")
            print(f"상태 코드: {response.status_code}")
            print(f"Apache Tika의 응답: {response.text}")
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # 파일 경로를 여기에 입력하세요
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

스크립트를 실행하기 위한 지침:

### 전제 조건

* Python 3.x가 시스템에 설치되어 있어야 합니다
* `requests` 라이브러리가 설치되어야 합니다 (pip 사용: `pip install requests`)
* Apache Tika Docker 컨테이너가 실행 중이어야 합니다 (명령어 `docker run -p 9998:9998 apache/tika` 사용)
* `"test.txt"`를 Apache Tika에 보낼 파일 경로로 바꾸세요

### 스크립트 실행하기

1. 스크립트를 `verify_tika.py`로 저장하세요 (예: Notepad 또는 Sublime Text와 같은 텍스트 편집기를 사용하여 저장)
2. 터미널 또는 명령 프롬프트를 엽니다
3. 스크립트를 저장한 디렉토리로 이동합니다 (`cd` 명령어 사용)
4. 다음 명령어를 사용하여 스크립트를 실행합니다: `python verify_tika.py`
5. 스크립트가 Apache Tika가 올바르게 작동하는지 확인하는 메시지를 출력할 것입니다

참고: 문제가 발생하면 Apache Tika 컨테이너가 올바르게 실행 중인지 확인하고 파일이 올바른 URL로 전송되었는지 확인하세요.

### 결론

위의 단계를 따르면 Docker 환경에서 Apache Tika가 올바르게 작동하는지 확인할 수 있습니다. 파일을 분석하기 위해 보내는 것, GET 요청으로 서버가 작동 중인지 확인하는 것 또는 프로세스를 자동화하기 위한 스크립트 활용으로 설정을 테스트할 수 있습니다. 문제가 발생하면 Apache Tika 컨테이너가 올바르게 실행 중인지 확인하고 파일이 올바른 URL로 전송되었는지 확인하세요.

문제 해결
--------------

* Apache Tika 서비스가 실행 중이며 Open WebUI 인스턴스에서 접근 가능해야 합니다.
* Docker 로그를 확인하여 Apache Tika 서비스와 관련된 오류 또는 문제를 확인하세요.
* Open WebUI에서 컨텍스트 추출 엔진 URL이 올바르게 설정되었는지 확인하세요.

통합의 이점
----------------------

Apache Tika를 Open WebUI에 통합하면 다음과 같은 여러 이점을 제공합니다:

* **향상된 메타데이터 추출**: Apache Tika의 고급 메타데이터 추출 기능은 파일에서 정확하고 관련성 높은 데이터를 추출하는 데 도움을 줄 수 있습니다.
* **다양한 파일 형식 지원**: Apache Tika는 광범위한 파일 형식을 지원하므로 다양한 파일 유형을 처리하는 조직에 적합한 솔루션입니다.
* **향상된 콘텐츠 분석**: Apache Tika의 고급 콘텐츠 분석 기능은 파일에서 유용한 통찰력을 추출하는 데 도움을 줄 수 있습니다.

결론
----------

Apache Tika를 Open WebUI에 통합하는 과정은 간단하며 Open WebUI 인스턴스의 메타데이터 추출 기능을 향상시킬 수 있는 효과적인 방법입니다. 이 문서에서 설명한 단계를 따르면 Open WebUI를 위한 컨텍스트 추출 엔진으로 Apache Tika를 쉽게 설정할 수 있습니다.
