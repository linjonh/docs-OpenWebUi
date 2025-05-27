---
sidebar_position: 10
title: "✂️ RAM 사용 줄이기"
---

# RAM 사용 줄이기

이 이미지를 RAM이 제한된 환경에서 배포하는 경우 이미지를 슬림화할 수 있는 몇 가지 방법이 있습니다.

라즈베리 파이 4 (arm64)에서 v0.3.10 버전을 사용하여 이를 실행하면 유휴 메모리 소비가 >1GB에서 ~200MB로 줄어들었습니다 (`docker container stats`로 관찰함).

## 간단 요약

다음 환경 변수를 설정하세요 (또는 이미 배포된 경우에는 해당 UI 설정): `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`.

## 자세한 설명

메모리 소비의 많은 부분은 로드된 ML 모델 때문입니다. 외부 언어 모델(OpenAI 또는 개별 Ollama)을 사용하는 경우에도 추가 목적을 위해 많은 모델이 로드될 수 있습니다.

v0.3.10 기준으로 포함된 내용은 다음과 같습니다:

* 음성-텍스트 변환 (기본적으로 Whisper)
* RAG 임베딩 엔진 (기본적으로 로컬 SentenceTransformers 모델)
* 이미지 생성 엔진 (기본적으로 비활성화됨)

첫 번째 두 가지는 기본적으로 로컬 모델로 설정되어 활성화됩니다. 관리자 패널에서 모델을 변경할 수 있습니다 (RAG: 문서 카테고리, Ollama 또는 OpenAI로 설정, 음성-텍스트 변환: 오디오 섹션, OpenAI 또는 WebAPI로 작업).
새로운 Docker 이미지를 배포하는 경우 다음 환경 변수를 설정하여 이를 설정할 수도 있습니다: `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`. 이러한 환경 변수는 이미 `config.json`이 존재하는 경우에는 아무런 효과가 없습니다.
