---
sidebar_position: 6
title: "🎨 이미지 생성"
---

:::warning
이 튜토리얼은 커뮤니티 기여 내용이며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞게 Open WebUI를 커스터마이징하는 방법을 시연하려는 목적입니다. 기여를 원하시면 기여 튜토리얼을 확인하세요.
:::

# 🎨 이미지 생성

Open WebUI는 **AUTOMATIC1111**, **ComfyUI**, 및 **OpenAI DALL·E** 세 가지 백엔드를 통해 이미지 생성을 지원합니다. 이 가이드는 각 옵션을 설정하고 사용하는 방법을 안내합니다.

## AUTOMATIC1111

Open WebUI는 **AUTOMATIC1111** [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)를 통해 이미지 생성을 지원합니다. 시작하는 방법은 다음과 같습니다:

### 초기 설정

1. [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)을 설치했는지 확인하세요.
2. API 액세스를 활성화하기 위해 추가 플래그를 사용하여 AUTOMATIC1111을 실행하세요:

   ```
   ./webui.sh --api --listen
   ```

3. 환경 변수가 미리 설정된 WebUI의 Docker 설치는 다음 명령어를 사용하세요:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Open WebUI에서 AUTOMATIC1111 설정

1. Open WebUI에서 **관리 패널** > **설정** > **이미지** 메뉴로 이동하세요.
2. `이미지 생성 엔진` 필드를 `기본값 (Automatic1111)`으로 설정하세요.
3. API URL 필드에 AUTOMATIC1111 API에 접근 가능한 주소를 입력하세요:

   ```
   http://<your_automatic1111_address>:7860/
   ```

   Open WebUI와 AUTOMATIC1111을 동일한 호스트에서 Docker 설치를 실행하는 경우, 주소를 `http://host.docker.internal:7860/`로 사용하세요.

## ComfyUI

ComfyUI는 이미지 생성 모델을 관리하고 상호작용하기 위한 대안 인터페이스를 제공합니다. 자세한 내용이나 다운로드는 [GitHub 페이지](https://github.com/comfyanonymous/ComfyUI)에서 확인하세요. 아래는 기타 도구와 함께 ComfyUI를 실행하기 위한 설정 지침입니다.

### 초기 설정

1. 원하는 디렉토리에 [GitHub](https://github.com/comfyanonymous/ComfyUI)에서 ComfyUI 소프트웨어 패키지를 다운로드하고 압축을 푸세요.
2. ComfyUI를 시작하려면 다음 명령어를 실행하세요:

   ```
   python main.py
   ```

   VRAM이 낮은 시스템의 경우 추가 플래그를 사용하여 메모리 사용을 줄이는 방식으로 ComfyUI를 실행하세요:

   ```
   python main.py --lowvram
   ```

3. 환경 변수가 미리 설정된 WebUI의 Docker 설치는 다음 명령어를 사용하세요:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Open WebUI에서 ComfyUI 설정

#### FLUX.1 모델 설정

1. **모델 체크포인트**:

* `FLUX.1-schnell` 또는 `FLUX.1-dev` 모델을 [black-forest-labs HuggingFace 페이지](https://huggingface.co/black-forest-labs)에서 다운로드하세요.
* 모델 체크포인트를 ComfyUI의 `models/checkpoints`와 `models/unet` 디렉토리에 모두 배치하세요. 또는 `models/checkpoints`와 `models/unet` 간에 심볼릭 링크를 만들어 두 디렉토리가 동일한 모델 체크포인트를 포함하도록 설정하세요.

2. **VAE 모델**:

* `ae.safetensors` VAE를 [여기](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors)에서 다운로드하세요.
* 이를 ComfyUI의 `models/vae` 디렉토리에 배치하세요.

3. **CLIP 모델**:

* `clip_l.safetensors`를 [여기](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main)에서 다운로드하세요.
* 이를 ComfyUI의 `models/clip` 디렉토리에 배치하세요.

4. **T5XXL 모델**:

* `t5xxl_fp16.safetensors` 또는 `t5xxl_fp8_e4m3fn.safetensors` 모델을 [여기](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main)에서 다운로드하세요.
* 이를 ComfyUI의 `models/clip` 디렉토리에 배치하세요.

Open WebUI에 ComfyUI를 통합하려면 다음 단계를 따르세요:

#### 1단계: Open WebUI 설정 구성

1. Open WebUI의 **관리 패널**로 이동하세요.
2. **설정**을 클릭한 다음 **이미지** 탭을 선택하세요.
3. `이미지 생성 엔진` 필드에서 `ComfyUI`를 선택하세요.
4. **API URL** 필드에 다음 형식에 맞게 ComfyUI API에 접근 가능한 주소를 입력하세요: `http://<your_comfyui_address>:8188/`.
   * 환경 변수 `COMFYUI_BASE_URL`을 이 주소로 설정하여 WebUI 내에서 지속적으로 유지되도록 하세요.

#### 2단계: 연결 확인 및 이미지 생성 활성화

1. ComfyUI가 실행 중이고 Open WebUI와의 연결을 성공적으로 확인했는지 확인하세요. 성공적인 연결이 없으면 계속 진행할 수 없습니다.
2. 연결이 확인되면 **이미지 생성 (실험적)** 기능을 활성화하세요. 더 많은 옵션이 제공됩니다.
3. 마지막 구성 단계를 위해 3단계로 계속 진행하세요.

#### 3단계: ComfyUI 설정 구성 및 워크플로 가져오기

1. ComfyUI 내에서 개발자 모드를 활성화하십시오. 이를 위해 ComfyUI의 **Queue Prompt** 버튼 위에 있는 기어 아이콘을 찾아 `Dev Mode` 토글을 활성화합니다.
2. ComfyUI에서 원하는 워크플로를 `API 형식`으로 내보내기 위해 `Save (API Format)` 버튼을 사용하십시오. 올바르게 실행한 경우 파일은 `workflow_api.json`로 다운로드됩니다.
3. Open WebUI로 돌아가서 **workflow.json 파일 업로드를 클릭하세요** 버튼을 클릭하십시오.
4. ComfyUI에서 내보낸 워크플로를 Open WebUI로 가져오기 위해 `workflow_api.json` 파일을 선택하십시오.
5. 워크플로를 가져온 후, 가져온 워크플로 노드 ID에 따라 `ComfyUI 워크플로 노드`를 매핑해야 합니다.
6. 사용 중인 모델 파일의 이름(예: `flux1-dev.safetensors`)으로 `Set Default Model`을 설정하십시오.

:::info
측정 워크플로 내의 노드 ID에 맞추려면 Open WebUI의 `ComfyUI 워크플로 노드` 섹션에서 `Input Key`를 한두 개 조정해야 할 수 있습니다.
예를 들어, `seed`는 `noise_seed`로 이름을 변경해야 가져온 워크플로의 노드 ID와 일치할 수 있습니다.
:::
:::tip
Flux 모델을 사용하는 워크플로와 같은 일부 워크플로는 Open WebUI 내의 노드 항목 필드에 필요로 하는 다중 노드 ID를 활용할 수 있습니다. 노드 항목 필드에 여러 ID가 필요한 경우, 노드 ID는 쉼표로 구분되어야 합니다(예: `1` 또는 `1, 2`).
:::

6. `Save`를 클릭하여 설정을 적용하고 ComfyUI를 Open WebUI에 통합하여 이미지 생성을 즐기십시오!

이 단계를 완료한 후, ComfyUI 설정이 Open WebUI에 통합되어 Flux.1 모델을 사용하여 이미지 생성에 사용할 수 있습니다.

### SwarmUI와의 구성

SwarmUI는 ComfyUI를 백엔드로 사용합니다. Open WebUI가 SwarmUI와 함께 작동하도록 하려면 ComfyUI Base URL에 `ComfyBackendDirect`를 추가해야 합니다. 또한, SwarmUI에 LAN 액세스를 설정하고 싶을 것입니다. 위의 조정 후, Open WebUI를 SwarmUI와 작동하도록 설정하는 것은 위에서 설명한 대로 [1단계: Open WebUI 설정 구성](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings)과 동일합니다.
![SwarmUI를 LAN 액세스로 설치](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

ComfyUI Base URL로 입력할 주소는 다음과 같습니다: `http://<your_swarmui_address>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI는 **OpenAI DALL·E API**를 통해 이미지 생성도 지원합니다. 이 옵션에는 DALL·E 2와 DALL·E 3 중 하나를 선택할 수 있는 선택기가 포함되어 있으며, 각각 다른 이미지 크기를 지원합니다.

### 초기 설정

1. OpenAI에서 [API 키](https://platform.openai.com/api-keys)를 얻으십시오.

### Open WebUI 구성

1. Open WebUI에서 **관리 패널** > **설정** > **이미지** 메뉴로 이동하십시오.
2. `이미지 생성 엔진` 필드를 `Open AI (Dall-E)`로 설정하십시오.
3. OpenAI API 키를 입력하십시오.
4. 사용하고자 하는 DALL·E 모델을 선택하십시오. 선택된 모델에 따라 이미지 크기 옵션이 달라질 수 있습니다:
   * **DALL·E 2**: `256x256`, `512x512`, 또는 `1024x1024` 이미지를 지원합니다.
   * **DALL·E 3**: `1024x1024`, `1792x1024`, 또는 `1024x1792` 이미지를 지원합니다.

### Azure OpenAI

Azure OpenAI Dall-E를 직접 사용하는 것은 지원되지 않지만, `Open AI (Dall-E)` 이미지 생성 엔진과 호환되는 [LiteLLM 프록시를 설정](https://litellm.vercel.app/docs/image_generation)할 수 있습니다.

## 이미지 생성 사용법

![이미지 생성 튜토리얼](/images/tutorial_image_generation.png)

1. 먼저, 텍스트 생성 모델을 사용하여 이미지 생성을 위한 프롬프트를 작성합니다.
2. 응답이 완료되면, 그림 아이콘을 클릭하여 이미지를 생성할 수 있습니다.
3. 이미지가 생성 완료되면, 자동으로 채팅에 반환됩니다.

:::tip
    LLM의 응답을 수정하여 이미지 생성 프롬프트를 메시지로 입력하고 실제로 제공된 응답 대신 이미지를 생성하도록 보낼 수도 있습니다.
:::

:::