---
sidebar_position: 2
title: "🔧 파이프"
---

# 파이프
파이프는 사용자가 LLM 메시지를 반환하기 전에 작업을 수행할 수 있도록 도와주는 함수입니다. 파이프를 사용하여 취할 수 있는 작업의 예는 Retrieval Augmented Generation (RAG), OpenAI 외의 LLM 제공자에게 요청 보내기(예: Anthropic, Azure OpenAI, 또는 Google), 또는 웹 UI에서 직접 기능을 실행하는 것입니다. 파이프는 함수로 호스팅하거나 파이프라인 서버에서 실행할 수 있습니다. 예제 목록은 [Pipelines repo](https://github.com/open-webui/pipelines/tree/main/examples/pipelines)에서 관리됩니다. 일반적인 워크플로우는 아래 이미지에서 확인할 수 있습니다.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="파이프 워크플로우" />
  </a>
</p>

웹 UI에 정의된 파이프는 "External" 표시와 함께 새 모델로 나타납니다. 'Database RAG Pipeline'과 'DOOM'이라는 두 가지 파이프 모델의 예는 아래의 두 개의 셀프호스팅 모델 옆에 표시된 이미지를 통해 확인할 수 있습니다:

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="웹 UI에서의 파이프 모델" />
  </a>
</p>
