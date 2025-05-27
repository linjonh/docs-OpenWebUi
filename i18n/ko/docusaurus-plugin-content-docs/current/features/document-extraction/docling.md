---
sidebar_position: 4000
title: "🐤 Docling 문서 추출"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀의 공식 지원을 받지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞춰 Open WebUI를 커스터마이징하는 방법을 보여주기 위한 데모로 제공됩니다. 기여를 원하시면 기여 튜토리얼을 확인하십시오.
:::

## 🐤 Docling 문서 추출

이 문서는 Docling을 Open WebUI와 통합하는 단계별 가이드를 제공합니다. Docling은 PDF, 워드 문서, 스프레드시트, HTML, 이미지와 같은 다양한 파일 형식을 JSON 또는 Markdown과 같은 구조화된 데이터로 변환하도록 설계된 문서 처리 라이브러리입니다. Docling은 레이아웃 감지, 표 분석, 언어 인식 처리에 대한 내장 지원을 통해 AI 애플리케이션(예: 검색, 요약, 검색 증강 생성)을 위한 문서 준비를 통합된 확장 가능한 인터페이스로 간소화합니다.

필수 조건
------------

* Open WebUI 인스턴스
* 시스템에 설치된 Docker
* Open WebUI를 위한 Docker 네트워크 설정

통합 단계
----------------

### 단계 1: Docling-Serve용 Docker 명령 실행

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*GPU 지원 버전:
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### 단계 2: Open WebUI를 Docling과 연결하기

* Open WebUI 인스턴스에 로그인하세요.
* `관리자 패널` 설정 메뉴로 이동하세요.
* `설정`을 클릭하세요.
* `문서` 탭을 클릭하세요.
* `기본` 콘텐츠 추출 엔진 드롭다운에서 `Docling`으로 변경하세요.
* 컨텍스트 추출 엔진 URL을 `http://host.docker.internal:5001`로 업데이트하세요.
* 변경 사항을 저장하세요.

Docker에서 Docling 확인
=====================================

Docker 환경에서 Docling이 올바르게 작동하는지 확인하려면 다음 단계를 따르세요:

### 1. Docling Docker 컨테이너 시작

우선 Docling Docker 컨테이너가 실행 중인지 확인하세요. 다음 명령을 사용하여 시작할 수 있습니다:

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

이 명령은 Docling 컨테이너를 시작하고 로컬 머신의 포트 5001과 컨테이너 포트 5001을 매핑합니다.

### 2. 서버 실행 여부 확인

* `http://127.0.0.1:5001/ui/`로 이동하세요.
* URL은 Docling을 사용할 수 있는 UI로 연결되어야 합니다.

### 3. 통합 확인

* UI를 통해 일부 파일을 업로드하면 MD 형식 또는 원하는 출력 형식으로 결과를 반환해야 합니다.

### 결론

Docling을 Open WebUI와 통합하면 문서 처리와 콘텐츠 추출 기능을 향상시키는 간단하고 효과적인 방법입니다. 이 가이드의 단계를 따르면 Docling을 기본 추출 엔진으로 설정하고 Docker 환경에서 원활하게 작동하는지 확인할 수 있습니다. 구성된 이후에는 Docling을 통해 고급 AI 기능을 지원하기 위해 강력하고 형식에 구애받지 않는 문서 분석이 가능합니다.
