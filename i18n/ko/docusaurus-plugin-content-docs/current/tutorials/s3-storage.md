---
sidebar_position: 320
title: "🪣 S3 Storage로 전환하기"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 작성되었으며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞춰 Open WebUI를 사용자 지정하는 방법을 보여주는 데 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

# 🪣 S3 Storage로 전환하기

이 가이드에서는 Open WebUI 구성의 기본 `local` 저장소를 Amazon S3로 전환하는 방법에 대해 설명합니다.

## 사전 요구 사항

이 튜토리얼을 따라하려면 다음이 필요합니다:

- 활성 AWS 계정
- 활성 AWS 액세스 키와 비밀 키
- AWS IAM 권한 (S3에서 객체 생성 및 배치)
- 시스템에 Docker 설치

## Amazon S3란?

AWS 웹사이트에서 직접 제공한 정보:

"Amazon S3는 업계 최고의 확장성, 데이터 가용성, 보안, 성능을 제공하는 객체 저장소 서비스입니다. 데이터 레이크, 웹사이트, 클라우드 네이티브 애플리케이션, 백업, 아카이브, 머신 러닝, 분석 등 다양한 사용 사례를 위해 데이터를 저장하고 보호하세요. Amazon S3는 99.999999999% (11 9's)의 내구성을 제공하며, 전 세계 수백만 고객의 데이터를 저장합니다."

S3에 대해 자세히 알아보려면: [Amazon S3 공식 페이지](https://aws.amazon.com/s3/)

# 설정 방법

## 1. 필요한 환경 변수

이 옵션을 구성하려면 다음 환경 변수를 수집해야 합니다:

| **Open-WebUI 환경 변수** | **예시 값**                              |
|--------------------------------|---------------------------------------|
| `S3_ACCESS_KEY_ID`             | ABC123                                |
| `S3_SECRET_ACCESS_KEY`         | SuperSecret                           |
| `S3_ENDPOINT_URL`              | https://s3.us-east-1.amazonaws.com    |
| `S3_REGION_NAME`               | us-east-1                             |
| `S3_BUCKET_NAME`               | my-awesome-bucket-name                |

- S3_ACCESS_KEY_ID: AWS 계정의 액세스 키 식별자입니다. 액세스 키 생성 시 AWS 관리 콘솔 또는 AWS CLI에서 받습니다.
- S3_SECRET_ACCESS_KEY: AWS 액세스 키 쌍의 비밀 키입니다. AWS에서 액세스 키를 생성할 때 제공되며 안전하게 보관해야 합니다.
- S3_ENDPOINT_URL: S3 서비스 엔드포인트를 가리키는 URL로 AWS 서비스 문서 또는 계정 설정에서 찾을 수 있습니다.
- S3_REGION_NAME: S3 버킷이 위치한 AWS 지역으로, 예: "us-east-1"입니다. 이는 AWS 관리 콘솔에서 S3 버킷 세부 정보에서 확인 가능합니다.
- S3_BUCKET_NAME: AWS에서 버킷을 생성할 때 지정한 고유한 S3 버킷 이름입니다.

사용 가능한 S3 엔드포인트 URL의 전체 목록은 여기에서 확인하세요: [Amazon S3 Regular Endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html)

모든 `클라우드 저장소` 구성 옵션을 확인하세요: [Open-WebUI Cloud Storage Config](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Open-WebUI 실행하기

Open-WebUI 인스턴스를 실행하기 전에 `STORAGE_PROVIDER`라는 마지막 환경 변수를 설정해야 합니다. 이 변수는 Open-WebUI에게 사용할 공급자를 알려줍니다. 기본적으로 `STORAGE_PROVIDER`는 비어있어 Open-WebUI가 로컬 저장소를 사용합니다.

| **저장소 공급자** | **유형** | **설명**                                                                               | **기본값** |
|-------------------|----------|---------------------------------------------------------------------------------------|-------------|
| `local`           | str      | 빈 문자열 (`' '`)이 제공될 경우 기본적으로 로컬 저장소를 사용합니다                             | 예          |
| `s3`              | str      | Amazon S3 저장소에서 언급된 관련 환경 변수와 S3 클라이언트 라이브러리를 사용합니다             | 아니요       |
| `gcs`             | str      | Google Cloud Storage에서 언급된 관련 환경 변수와 GCS 클라이언트 라이브러리를 사용합니다         | 아니요       |

Amazon S3를 사용하려면 `STORAGE_PROVIDER`를 "S3"로 설정해야 하며 1단계에서 수집한 모든 환경 변수(`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`)를 설정해야 합니다.

여기서는 `ENV`를 "dev"로 설정하여 Open-WebUI Swagger 문서를 확인하고 S3 저장소 설정이 예상대로 작동하는지 테스트할 수 있도록 합니다.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="my-awesome-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. 설정 테스트하기

Open-WebUI가 실행되고 있는 상태에서 간단한 `Hello, World` 텍스트 파일을 업로드하여 설정을 테스트해봅시다.

![Open-WebUI에서 파일 업로드하기](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

선택한 LLM으로부터 응답을 받는지 확인해 봅시다.

![Open-WebUI에서 응답 확인하기](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

좋아요! 모든 것이 Open-WebUI에서 예상대로 작동하는 것처럼 보입니다. 이제 해당 텍스트 파일이 실제로 업로드되었고 지정한 S3 버킷에 저장되었는지 확인해봅시다. AWS Management Console을 사용하면 S3 버킷에 파일이 있는 것을 볼 수 있습니다. 우리가 업로드한 파일 이름(`hello.txt`) 외에도 객체 이름에 고유 ID가 추가된 것을 볼 수 있습니다. 이는 Open-WebUI가 업로드된 모든 파일을 추적하는 방식입니다.

![Open-WebUI에서 응답 확인하기](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Open-WebUI의 swagger 문서를 사용하여 `/api/v1/files/{id}` 엔드포인트와 고유 ID (4405fabb-603e-4919-972b-2b39d6ad7f5b)를 전달하여 이 파일과 관련된 모든 정보를 얻을 수 있습니다.

![ID로 파일 탐색하기](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
