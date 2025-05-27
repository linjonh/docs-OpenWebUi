---
sidebar_position: 11
title: "🖥️ Intel GPU에서 IPEX-LLM을 사용한 Local LLM 설정"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀의 지원을 받지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 사용자 정의하는 방법을 보여주는 데 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인해보세요.
:::

:::note
이 가이드는 [수동 설치](/getting-started/index.md)를 통한 Open WebUI 설정이 확인되었습니다.
:::

# Intel GPU에서 IPEX-LLM을 사용한 Local LLM 설정

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm)은 낮은 지연 시간으로 Intel CPU 및 GPU(예: iGPU가 장착된 로컬 PC, Arc A-Series, Flex 및 Max와 같은 디스크리트 GPU)에서 LLM을 실행하기 위한 PyTorch 라이브러리입니다.
:::

이 튜토리얼은 Intel GPU에서 호스팅되는 **IPEX-LLM 가속 Ollama 백엔드와 함께 Open WebUI를 설정하는 방법을 보여줍니다.** 이 가이드를 따라하면 통합 GPU만 있는 저가형 PC에서도 Open WebUI를 원활한 경험으로 설정할 수 있습니다.

## Intel GPU에서 Ollama Serve 시작하기

Intel GPU에서 IPEX-LLM으로 가속된 Ollama 서버를 설치하고 실행하는 방법은 IPEX-LLM 공식 문서의 [이 가이드](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html)를 참조하십시오.

:::tip
다른 기기에서 Ollama 서비스를 이용하려면 `OLLAMA_HOST=0.0.0.0` 환경 변수를 설정하거나 내보낸 후 `ollama serve` 명령을 실행해야 합니다.
:::

## Open WebUI 구성

메뉴에서 **설정 -> 연결**을 통해 Ollama 설정에 접근하십시오. 기본적으로 **Ollama 기본 URL**은 `https://localhost:11434`로 설정되어 있으며, 아래 스냅샷과 같이 표시됩니다. Ollama 서비스 연결 상태를 확인하려면, 텍스트 박스 옆에 있는 **새로 고침 버튼**을 클릭하십시오. WebUI가 Ollama 서버와 연결되지 않으면 `WebUI could not connect to Ollama`라는 오류 메시지가 표시됩니다.

![Open WebUI Ollama Setting Failure](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

연결이 성공하면 `Service Connection Verified`라는 메시지가 표시됩니다. 아래에 설명된 바와 같습니다.

![Open WebUI Ollama Setting Success](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
다른 URL에서 호스팅된 Ollama 서버를 사용하려면 **Ollama 기본 URL**을 새 URL로 업데이트하고 **새로 고침** 버튼을 눌러 Ollama와의 연결을 다시 확인하십시오.
:::
