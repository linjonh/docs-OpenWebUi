---
sidebar_position: 2
title: "환경 변수"
---


# 환경 변수 목록


:::info
모든 Open WebUI 환경 변수의 전체 목록은 [환경 변수 설정](/getting-started/env-configuration) 페이지를 참조하세요.
:::

다음은 음성을 텍스트로 변환(STT)을 위한 환경 변수 요약입니다.

# 음성을 텍스트로 변환(STT)을 위한 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `WHISPER_MODEL` | 로컬 음성을 텍스트로 변환하기 위한 Whisper 모델 설정 |
| `WHISPER_MODEL_DIR` | Whisper 모델 파일을 저장할 디렉터리 지정 |
| `WHISPER_LANGUAGE` | Whisper에 사용할 음성을 텍스트로 변환하는 ISO 639-1(하와이어와 광둥어의 경우 ISO 639-2) 언어 지정(설정되지 않은 경우 예측됨) |
| `AUDIO_STT_ENGINE` | 사용할 음성을 텍스트로 변환하는 엔진 지정(로컬 Whisper의 경우 비워 두거나 `openai` 사용) |
| `AUDIO_STT_MODEL` | OpenAI 호환 엔드포인트용 음성을 텍스트로 변환하는 모델 지정 |
| `AUDIO_STT_OPENAI_API_BASE_URL` | 음성을 텍스트로 변환하기 위한 OpenAI 호환 기본 URL 설정 |
| `AUDIO_STT_OPENAI_API_KEY` | 음성을 텍스트로 변환하기 위한 OpenAI API 키 설정 |