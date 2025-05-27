---
sidebar_position: 3
title: "🔎 Open WebUI RAG 튜토리얼"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀의 지원을 받지 않습니다. 특정 용도에 맞게 Open WebUI를 커스터마이징하는 방법을 보여주기 위한 데모로 사용됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

# 튜토리얼: Open WebUI Documentation로 RAG 구성하기

이 튜토리얼에서는 **검색 증강 생성(RAG)**을 사용하여 Open WebUI에서 실세계 문서를 지식 베이스로 로드하는 방법을 배웁니다. 최신 **Open WebUI Documentation**을 사용 예제로 설정하는 방법을 보여드립니다.

---

## 개요

### RAG란 무엇인가요?

검색 증강 생성(RAG)은 **LLM**과 외부 소스에서 검색한 **지식**을 결합합니다. 시스템이 업로드된 문서나 지식 베이스에서 관련 데이터를 검색하여 응답의 품질과 정확성을 향상시킵니다.

이 튜토리얼에서는 다음을 설명합니다:

- 최신 Open WebUI Documentation을 지식 베이스로 업로드하는 방법.
- 이를 사용자 지정 모델에 연결하는 방법.
- 지식 베이스를 쿼리하여 지원을 강화하는 방법.

---

## 설정

### Open WebUI Documentation을 지식 베이스로 설정하기: 단계별

**Open WebUI Documentation**으로 RAG를 설정하는 단계:

1. **문서 다운로드**:
   - 최신 문서 다운로드:
     [https://github.com/open-webui/docs/archive/refs/heads/main.zip](https://github.com/open-webui/docs/archive/refs/heads/main.zip)

2. **파일 압축 해제**:
   - `main.zip` 파일을 압축 해제하여 모든 문서 파일을 얻습니다.

3. **Markdown 파일 찾기**:
   - 추출된 폴더에서 `.md` 및 `.mdx` 확장자를 가진 모든 파일을 찾습니다 (팁: `*.md*`로 검색하세요).

4. **지식 베이스 생성**:
   - **Workspace** > **Knowledge** > **+ Create a Knowledge Base**로 이동합니다.
   - 이름: `Open WebUI Documentation`
   - 목적: **Assistance**

   > **Create Knowledge**를 클릭합니다.

5. **파일 업로드**:
   - 추출된 폴더에서 `.md` 및 `.mdx` 파일을 드래그하여 **Open WebUI Documentation** 지식 베이스로 업로드합니다.

---

## 모델 생성 및 구성

### 지식 베이스와 사용자 지정 모델 생성

1. **모델로 이동**:
   - **Workspace** > **Models** > **+ Add New Model**로 이동합니다.

2. **모델 구성**:
   - **이름**: `Open WebUI`
   - **기초 모델**: *(적합한 Llama 또는 다른 사용 가능한 모델 선택)*
   - **지식 소스**: 드롭다운에서 **Open WebUI Documentation** 선택.

3. **모델 저장**.

---

## 예제 및 사용법

### Open WebUI Documentation 모델 쿼리하기

1. **새로운 채팅 시작**:
   - **New Chat**로 이동하여 `Open WebUI` 모델 선택.

2. **쿼리 예제**:

   ```
   사용자: "환경 변수를 어떻게 구성하나요?"
   시스템: "섹션 3.2를 참고하세요: `.env` 파일을 사용하여 설정을 관리합니다."
   ```

   ```
   사용자: "Docker를 사용하여 Open WebUI를 업데이트하려면 어떻게 해야 하나요?"
   시스템: "`docker/updating.md`를 참고하세요: `docker pull`을 사용하고 컨테이너를 재시작하십시오."
   ```

   RAG 활성화 모델을 사용하면 시스템이 문서에서 가장 관련성이 높은 섹션을 검색하여 질문에 답변합니다.

---

## 다음 단계

### 다음 단계

- **더 많은 지식 추가**: 문서를 추가하여 지식 베이스를 계속 확장하세요.

---

이 설정으로 **Open WebUI Documentation**을 효과적으로 사용하여 사용자에게 관련 정보를 검색하여 지원할 수 있습니다. 지식 강화 모델을 제작 및 쿼리하는 즐거움을 느껴보세요!
