---
sidebar_position: 1
title: "🗨️ 구성"
---

Open Web UI는 로컬, 브라우저 및 원격 음성 인식을 모두 지원합니다.

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## 클라우드 / 원격 음성 인식 제공업체

현재 아래의 클라우드 음성 인식 제공업체를 지원합니다. API 키는 환경 변수(OpenAI) 또는 관리자 설정 페이지(두 키 모두)에서 구성할 수 있습니다.

 | 서비스  | API 키 필요 여부 |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI는 내장 브라우저 음성 인식 제공업체를 통해 STT를 제공합니다.

## 음성 인식 제공업체 설정하기

음성 인식 제공업체를 설정하려면:

- 관리자 설정으로 이동하세요.
- 오디오 선택
- API 키를 제공하고 드롭다운에서 모델을 선택하세요.

![alt text](/images/tutorials/stt/stt-config.png)

## 사용자 수준 설정

관리자 패널에서 프로비저닝된 인스턴스 설정 외에도 추가 기능을 제공할 사용자 수준 설정이 있습니다.

*   **STT 설정:** 음성 인식 기능과 관련된 설정을 포함합니다.
*   **음성 인식 엔진:** 음성 인식에 사용되는 엔진을 결정합니다(기본값 또는 Web API).
 

![alt text](/images/tutorials/stt/user-settings.png)

## 음성 인식 사용하기

음성 인식은 음성을 사용하여 프롬프트를 "작성"하는 매우 효율적인 방법을 제공하며 데스크톱 및 모바일 기기에서 모두 안정적으로 작동합니다.

음성 인식을 사용하려면 마이크 아이콘을 클릭하세요:

![alt text](/images/tutorials/stt/stt-operation.png)

실시간 오디오 웨이브폼은 음성 캡처가 성공적으로 이루어졌음을 나타냅니다:

![alt text](/images/tutorials/stt/stt-in-progress.png)

## 음성 인식 모드 작업

녹음이 시작되면 다음을 수행할 수 있습니다:

- 체크 아이콘을 클릭하여 녹음을 저장합니다(완료 후 자동 전송이 활성화된 경우 완료를 위해 전송되며, 그렇지 않은 경우 수동으로 전송할 수 있습니다).
- 녹음을 중단하고 새로 시작하려면 x 아이콘을 클릭하여 녹음 인터페이스를 종료할 수 있습니다.

![alt text](/images/tutorials/stt/endstt.png)
