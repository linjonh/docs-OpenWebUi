---
sidebar_position: 1
title: "🚰 필터"
---

# 필터

필터는 사용자로부터 들어오는 메시지와 어시스턴트(LLM)로부터 나가는 메시지에 대해 작업을 수행하는 데 사용됩니다. 필터에서 수행할 수 있는 잠재적인 작업에는 모니터링 플랫폼(Langfuse 또는 DataDog 등)에 메시지를 보내기, 메시지 내용 수정, 유해한 메시지 차단, 메시지를 다른 언어로 번역, 특정 사용자로부터의 메시지 속도 제한 등이 포함됩니다. 예시 목록은 [Pipelines repo](https://github.com/open-webui/pipelines/tree/main/examples/filters)에서 관리됩니다. 필터는 함수로 실행되거나 파이프라인 서버에서 실행될 수 있습니다. 일반적인 작업 흐름은 아래 이미지에서 확인할 수 있습니다.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="필터 작업 흐름" />
  </a>
</p>

필터 파이프라인을 모델이나 파이프에 활성화하면, 사용자로부터 들어오는 메시지("inlet")는 필터에 전달되어 처리됩니다. 필터는 메시지에 대해 원하는 작업을 수행한 후 LLM 모델에 채팅 완료 요청을 보냅니다. 마지막으로, 필터는 LLM에서 나가는 메시지("outlet")를 사용자에게 전송하기 전에 후처리를 수행합니다.
