---
sidebar_position: 3
title: "🔒 권한"
---

`Workspace` 내 Open WebUI의 `Permissions` 섹션은 관리자가 사용자에 대한 접근 권한과 기능 이용 가능 여부를 구성할 수 있도록 합니다. 이 강력한 시스템은 애플리케이션 내에서 사용자가 접근하고 수정할 수 있는 항목에 대해 세밀한 제어를 가능하게 합니다.

관리자는 다음과 같은 방법으로 권한을 관리할 수 있습니다:

1. **사용자 인터페이스:** Workspace의 Permissions 섹션은 권한을 구성하기 위한 그래픽 인터페이스를 제공합니다.
2. **환경 변수:** 환경 변수를 사용하여 권한을 설정하며, 이러한 변수는 `PersistentConfig` 변수로 저장됩니다.
3. **그룹 관리:** 사전 정의된 권한이 있는 그룹에 사용자를 할당합니다.

## Workspace 권한

Workspace 권한은 Open WebUI 플랫폼의 핵심 구성 요소에 대한 접근을 제어합니다:

* **모델 접근**: 사용자가 사용자 정의 모델에 접근하고 관리할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **지식 접근**: 사용자가 지식 베이스에 접근하고 관리할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **프롬프트 접근**: 사용자가 저장된 프롬프트에 접근하고 관리할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **도구 접근**: 사용자가 도구를 접근하고 관리할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *참고: 이 옵션을 활성화하면 사용자가 서버에 임의의 코드를 업로드할 수 있게 됩니다.*

## 채팅 권한

채팅 권한은 사용자들이 채팅 대화에서 수행할 수 있는 작업을 결정합니다:

* **채팅 제어 허용**: 채팅 제어 옵션에 접근할 수 있도록 허용합니다.
* **파일 업로드 허용**: 사용자들이 채팅 세션 중 파일을 업로드할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **채팅 삭제 허용**: 사용자들이 채팅 대화를 삭제할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_CHAT_DELETE`)
* **채팅 편집 허용**: 사용자들이 채팅 대화에서 메시지를 편집할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_CHAT_EDIT`)
* **임시 채팅 허용**: 사용자들이 임시 채팅 세션을 생성할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_CHAT_TEMPORARY`)

## 기능 권한

기능 권한은 Open WebUI에서의 특화된 기능에 대한 접근을 제어합니다:

* **웹 검색**: 사용자가 채팅 세션 중 웹 검색을 수행할 수 있도록 허용합니다. (환경 변수: `ENABLE_RAG_WEB_SEARCH`)
* **이미지 생성**: 사용자가 이미지를 생성할 수 있도록 허용합니다. (환경 변수: `ENABLE_IMAGE_GENERATION`)
* **코드 해석기**: 사용자가 코드 해석기 기능을 사용할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **직접 도구 서버**: 사용자가 도구 서버에 직접 연결할 수 있도록 허용합니다. (환경 변수: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## 기본 권한 설정

기본적으로 Open WebUI는 다음과 같은 권한 설정을 적용합니다:

**Workspace 권한**:
- 모델 접근: 비활성화 (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- 지식 접근: 비활성화 (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- 프롬프트 접근: 비활성화 (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- 도구 접근: 비활성화 (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**채팅 권한**:
- 채팅 제어 허용: 활성화
- 파일 업로드 허용: 활성화 (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- 채팅 삭제 허용: 활성화 (`USER_PERMISSIONS_CHAT_DELETE=True`)
- 채팅 편집 허용: 활성화 (`USER_PERMISSIONS_CHAT_EDIT=True`)
- 임시 채팅 허용: 활성화 (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**기능 권한**:
- 웹 검색: 활성화 (`ENABLE_RAG_WEB_SEARCH=True`)
- 이미지 생성: 활성화 (`ENABLE_IMAGE_GENERATION=True`)
- 코드 해석기: 활성화 (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- 직접 도구 서버: 비활성화 (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

관리자는 관리자 패널의 "users" 섹션에서 기본 권한을 변경할 수 있습니다.

## 권한 관리

관리자는 사용자 인터페이스를 통해 혹은 구성에서 해당 환경 변수를 설정하여 이러한 권한을 조정할 수 있습니다. 권한과 관련된 모든 환경 변수는 `PersistentConfig` 변수로 표시되며, 처음 실행 후 내부적으로 저장되고 Open WebUI 인터페이스를 통해 관리할 수 있습니다.

이 유연성은 조직이 보안 정책을 구현하면서도 사용자에게 필요한 도구를 제공할 수 있도록 합니다. 권한과 관련된 환경 변수에 대한 자세한 정보는 [환경 변수 구성](../../getting-started/env-configuration.md#workspace-permissions) 문서를 참조하세요.
