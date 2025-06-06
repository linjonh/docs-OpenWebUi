---
sidebar_position: 0
title: "🤖 모델"
---

`Open WebUI`의 `Workspace` 내의 `모델` 섹션은 특정 목적에 맞게 사용자 정의 모델을 생성하고 관리할 수 있는 강력한 도구입니다. 이 섹션은 모든 모델 파일에 대한 중앙 허브 역할을 하며, 편집, 복제, 공유, 내보내기 및 숨기기와 같은 다양한 기능을 제공합니다.

### 모델 파일 관리

`모델` 섹션에서 다음 작업을 수행할 수 있습니다:

* **편집**: 모델 파일의 세부 정보를 확인하고 성격 등 변경 가능합니다.
* **복제**: 모델 파일의 사본을 만들고, 복제된 `모델 ID`에는 `-clone`이 추가됩니다. 기본 모델은 복제할 수 없으며, 먼저 모델을 생성해야 복제가 가능합니다.
* **공유**: `공유` 버튼을 클릭하여 모델 파일을 Open WebUI 커뮤니티와 공유할 수 있으며, [https://openwebui.com/models/create](https://openwebui.com/models/create)로 리디렉션됩니다.
* **내보내기**: 모델 파일의 `.json` 내보내기를 PC에 다운로드합니다.
* **숨기기**: 모델 선택 드롭다운에서 모델 파일을 숨길 수 있습니다.

### 모델 파일 편집

모델 파일을 편집할 때 다음 설정을 사용자 정의할 수 있습니다:

* **아바타 사진**: 모델 파일을 나타낼 아바타 사진을 업로드합니다.
* **모델 이름**: 모델 파일의 이름을 변경합니다.
* **시스템 프롬프트**: 모델 파일에 선택적인 시스템 프롬프트를 제공합니다.
* **모델 매개변수**: 모델 파일의 매개변수를 조정합니다.
* **프롬프트 제안**: 새 채팅 페이지에 표시될 프롬프트를 추가합니다.
* **문서**: 모델 파일에 문서를 추가합니다(항상 RAG [Retrieval Augmented Generation]).
* **도구, 필터 및 작업**: 모델 파일에서 사용할 수 있는 도구, 필터 및 작업을 선택합니다.
* **비전**: 다중 모달 기능을 활성화하기 위한 `비전`을 토글합니다.
* **태그**: 모델 선택 드롭다운에서 모델 이름 옆에 표시될 태그를 추가합니다.

### 모델 검색 및 가져오기/내보내기

`모델` 섹션에는 모델 가져오기와 내보내기 기능도 포함되어 있습니다:

* **모델 가져오기**: .json 파일 또는 기타 소스에서 모델을 가져오기 위해 이 버튼을 사용합니다.
* **모델 내보내기**: 모든 모델 파일을 단일 .json 파일로 내보내기 위해 이 버튼을 사용합니다.

모델을 다운로드하려면 `연결` 탭의 **Ollama 설정**으로 이동합니다.
또는 모델 선택 드롭다운에서 `ollama run hf.co/[모델 작성자]/[모델 이름]`과 같은 명령을 입력하여 직접 모델을 다운로드할 수 있습니다.
이 작업은 다운로드 버튼으로 표시되는 "Pull [Model Name]"를 생성합니다.

### 모델 전환

   **예제**: **Mistral**, **LLaVA**, 및 **GPT-3.5** 사용을 통한 다단계 작업 전환

* **시나리오**: 다단계 대화에서는 간단한 FAQ 시작, 이미지 해석, 창의적 응답 생성과 같은 다양한 작업 유형이 포함됩니다.
* **전환 이유**: 사용자는 각 모델의 특정 강점을 활용할 수 있습니다:
  * **Mistral**은 일반적인 질문에 대해 계산 시간과 비용을 줄이기 위해 사용.
  * **LLaVA**는 이미지 기반 데이터에서 통찰을 얻기 위한 시각적 작업에 사용.
  * **GPT-3.5**는 보다 정교하고 뉘앙스 있는 언어 출력을 생성하기 위해 사용.
* **프로세스**: 사용자는 작업 유형에 따라 모델을 전환하여 효율성과 응답 품질을 극대화합니다.

    **사용 방법**:
    1. **모델 선택**: 채팅 인터페이스 내에서 모델 전환기 드롭다운에서 원하는 모델을 선택합니다. 동시에 최대 두 개의 모델을 선택할 수 있으며, 두 응답이 생성됩니다. 화살표를 사용하여 응답 간 이동이 가능합니다.
    2. **컨텍스트 유지**: Open WebUI는 모델 전환 시 대화 컨텍스트를 유지하여 매끄러운 전환을 제공합니다.
