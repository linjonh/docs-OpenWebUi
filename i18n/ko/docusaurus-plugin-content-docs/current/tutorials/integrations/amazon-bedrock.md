---
sidebar_position: 31
title: "🛌 Amazon Bedrock과 통합"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에서 지원하지 않습니다. 특정 용도에 맞게 Open WebUI를 사용자 정의하는 방법을 시연하기 위한 목적만으로 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

---

# Open-WebUI와 Amazon Bedrock 통합

이 튜토리얼에서는 Open-WebUI를 Amazon Bedrock과 통합하는 가장 일반적이고 인기 있는 접근 방식을 살펴봅니다.

## 사전 준비사항


이 튜토리얼을 따라하기 위해서는 다음이 필요합니다:

- 활성화된 AWS 계정
- 활성화된 AWS 액세스 키 및 비밀 키
- Bedrock 모델을 활성화할 수 있는 AWS의 IAM 권한 또는 이미 활성화된 모델
- 시스템에 설치된 Docker


## Amazon Bedrock이란

AWS 웹사이트에 따르면:

"Amazon Bedrock은 AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside(곧 출시 예정), Stability AI, Amazon과 같은 주요 AI 회사의 고성능 파운데이션 모델(FM)을 하나의 API로 제공하는 완전 관리형 서비스입니다. 이를 통해 보안, 프라이버시 및 책임 있는 AI를 갖춘 생성형 AI 애플리케이션을 구축하기 위한 다양한 기능을 제공합니다. Amazon Bedrock을 사용하면 사용 사례에 적합한 최고 FM을 손쉽게 실험하고 평가하며, 미세 조정 및 검색 증강 생성(RAG)과 같은 기술을 사용해 개인 데이터를 사용해 맞춤화하거나 엔터프라이즈 시스템 및 데이터 소스를 사용해 작업을 실행하는 에이전트를 구축할 수 있습니다. Amazon Bedrock은 서버리스이므로 인프라를 관리할 필요가 없으며 이미 익숙한 AWS 서비스를 사용해 생성형 AI 기능을 애플리케이션에 안전하게 통합하고 배포할 수 있습니다."

Bedrock에 대한 자세한 내용은: [Amazon Bedrock 공식 페이지](https://aws.amazon.com/bedrock/)를 방문하세요.

# 통합 단계

## 1단계: Amazon Bedrock Base Model 액세스 확인

Bedrock과 통합하기 전에 최소 하나 이상의 사용 가능한 Base Model에 액세스해야 합니다. 가능한 많을수록 좋습니다. 작성 시점(2025년 2월)에는 47개의 베이스 모델이 제공되었습니다. 아래 스크린샷에서 여러 모델에 액세스할 수 있음을 확인할 수 있습니다. 모델 옆에 "✅ Access Granted"라고 표시되면 해당 모델에 액세스할 수 있음을 나타냅니다. 어느 모델에도 접근할 수 없는 경우 다음 단계에서 오류가 발생할 것입니다.

AWS는 이러한 모델에 대한 요청을 액세스하고 활성화하는 방법에 대해 좋은 문서를 제공하고 있습니다: [Amazon Bedrock 모델 액세스 문서](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock Base Models](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## 2단계: Bedrock Access Gateway 구성

하나 이상의 Bedrock 베이스 모델에 액세스한 후에는 Bedrock Access Gateway(BAG)를 구성해야 합니다. BAG은 AWS 네이티브 엔드포인트/SDK를 감싸고 Open-WebUI에서 요구하는 OpenAI 스키마와 호환되는 엔드포인트를 노출하는 AWS에서 개발한 프록시 또는 미들웨어와 같습니다.

참고로, 엔드포인트 간 간단한 매핑은 다음과 같습니다:


| OpenAI Endpoint       | Bedrock Method         |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse or converse_stream    |
| `/embeddings`           | invoke_model           |

BAG 레포는 다음 위치에서 찾을 수 있습니다: [Bedrock Access Gateway Repo](https://github.com/aws-samples/bedrock-access-gateway)

BAG을 설정하기 위한 단계는 다음과 같습니다:
- BAG 레포를 클론합니다.
- 기본 `dockerfile`을 제거합니다.
- `Dockerfile_ecs`의 이름을 `Dockerfile`로 변경합니다.

이제 아래 명령을 사용하여 Docker 컨테이너를 빌드하고 실행할 준비가 완료되었습니다:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

이제 BAG의 swagger 페이지에 액세스할 수 있습니다: http://localhost:8000/docs

![Bedrock Access Gateway Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## 3단계: Open-WebUI에 연결 추가

이제 BAG이 실행되고 있으므로 Open-WebUI에 새 연결을 추가할 때입니다.

- 관리자 패널에서 Settings -> Connections로 이동합니다.
- "+" (플러스) 버튼을 사용하여 OpenAI 아래에 새 연결을 추가합니다.
- URL에 "http://host.docker.internal:8000/api/v1"를 입력합니다.
- 비밀번호는 BAG 기본 설정에서 "bedrock"으로 정의된 비밀번호를 사용합니다. 이 비밀번호는 BAG 설정(DEFAULT_API_KEYS)에서 변경할 수 있습니다.
- "Verify Connection" 버튼을 클릭하면 오른쪽 상단에 "Server connection verified" 알림이 표시됩니다.

![새 연결 추가하기](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## 4단계: Bedrock 기본 모델 사용 시작

이제 모든 Bedrock 모델이 표시됩니다!

![Bedrock 모델 사용하기](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## 기타 유용한 튜토리얼

Amazon Bedrock와 Open-WebUI 통합 작업 시 유용한 몇 가지 다른 튜토리얼입니다.

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
