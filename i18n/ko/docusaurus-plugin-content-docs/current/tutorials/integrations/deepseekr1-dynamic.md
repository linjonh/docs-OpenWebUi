---
sidebar_position: 1
title: "🐋 Llama.cpp에서 DeepSeek R1 Dynamic 1.58-bit 실행하기"
---

**UnslothAI**의 놀라운 노력에 큰 박수를 보냅니다! 이들의 노력 덕분에 이제 **전체 DeepSeek-R1** 671B 파라미터 모델을 동적 1.58-bit 양자화된 형태(압축해 131GB로 줄임)로 **Llama.cpp**에서 실행할 수 있게 되었습니다! 가장 좋은 점은, 엄청난 엔터프라이즈급 GPU나 서버가 없어도 더 이상 좌절할 필요가 없다는 것입니다. 소비자용 하드웨어 대부분에서는 느리겠지만, 여전히 개인 컴퓨터에서 이 모델을 실행할 수 있습니다.

:::note
Ollama에서 유일하게 진정한 **DeepSeek-R1** 모델은 여기에 있는 **671B 버전**입니다: [https://ollama.com/library/deepseek-r1:671b](https://ollama.com/library/deepseek-r1:671b). 다른 버전은 **축소**된 모델입니다.
:::

이 가이드는 **Llama.cpp**와 **Open WebUI**를 통합하여 **전체 DeepSeek-R1 Dynamic 1.58-bit 양자화 모델**을 실행하는 방법에 중점을 둡니다. 이 튜토리얼에서는 **M4 Max + 128GB RAM** 구성의 기계를 사용해 단계를 보여드립니다. 설정은 자신의 구성에 맞게 조정할 수 있습니다.

---

## 1단계: Llama.cpp 설치하기

다음을 선택할 수 있습니다:
- [미리 빌드된 바이너리 다운로드](https://github.com/ggerganov/llama.cpp/releases)
- **직접 빌드하기**: 여기를 따라 안내하세요: [Llama.cpp 빌드 가이드](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md)

## 2단계: UnslothAI가 제공하는 모델 다운로드

[Unsloth의 Hugging Face 페이지](https://huggingface.co/unsloth/DeepSeek-R1-GGUF)로 이동하여 적절한 **동적 양자화 버전**의 DeepSeek-R1을 다운로드하세요. 이 튜토리얼에서는 **1.58-bit (131GB)** 버전을 사용합니다. 이 버전은 매우 최적화되었지만 놀랍도록 기능적입니다.


:::tip
"작업 디렉토리"를 알고 있어야 합니다 — Python 스크립트나 터미널 세션이 실행되는 위치입니다. 기본적으로 모델 파일은 해당 디렉토리의 하위 폴더에 다운로드되므로 경로를 알고 있어야 합니다! 예를 들어, 아래 명령을 `/Users/yourname/Documents/projects`에서 실행하면 다운로드된 모델은 `/Users/yourname/Documents/projects/DeepSeek-R1-GGUF`에 저장됩니다.
:::

UnslothAI의 개발 프로세스와 이러한 동적 양자화 버전이 왜 이렇게 효율적인지에 대한 자세한 내용은 그들의 블로그 게시물을 참고하세요: [UnslothAI DeepSeek R1 Dynamic Quantization](https://unsloth.ai/blog/deepseekr1-dynamic).

다음은 모델을 프로그래밍 방식으로 다운로드하는 방법입니다:
```python
# Hugging Face 종속성을 먼저 설치하세요:
# pip install huggingface_hub hf_transfer

from huggingface_hub import snapshot_download

snapshot_download(
    repo_id = "unsloth/DeepSeek-R1-GGUF",  # Hugging Face 저장소 지정
    local_dir = "DeepSeek-R1-GGUF",         # 이 디렉토리에 모델이 다운로드됨
    allow_patterns = ["*UD-IQ1_S*"],        # 1.58-bit 버전만 다운로드
)
```

다운로드가 완료되면 디렉토리 구조는 다음과 같이 나타납니다:
```
DeepSeek-R1-GGUF/
├── DeepSeek-R1-UD-IQ1_S/
│   ├── DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00002-of-00003.gguf
│   ├── DeepSeek-R1-UD-IQ1_S-00003-of-00003.gguf
```

:::info
🛠️ 이후 단계에서 **특정 디렉토리 구조에 맞게 경로를 업데이트**하세요. 예를 들어, 스크립트가 `/Users/tim/Downloads`에 있다면, GGUF 파일의 전체 경로는 다음과 같습니다: 
`/Users/tim/Downloads/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`.
:::

## 3단계: Open WebUI 설치 및 실행 확인

아직 **Open WebUI**가 설치되지 않았다면 걱정하지 마세요! 간단하게 설정할 수 있습니다. [Open WebUI 문서](https://docs.openwebui.com/)를 따라가면 됩니다. 설치 후 응용 프로그램을 시작하세요 — 나중에 DeepSeek-R1 모델과 상호 작용하기 위해 이를 연결할 것입니다.


## 4단계: Llama.cpp를 사용하여 모델 서빙

모델을 다운로드한 다음 단계는 **Llama.cpp의 서버 모드**를 사용해 실행하는 것입니다. 시작하기 전에:

1. **`llama-server` 바이너리를 찾으세요.**
   1단계에서 설명한 대로 소스에서 빌드했다면, `llama-server` 실행 파일은 `llama.cpp/build/bin`에 위치할 것입니다. `cd` 명령을 사용해 이 디렉토리로 이동하세요:
   ```bash
   cd [path-to-llama-cpp]/llama.cpp/build/bin
   ```

   `[path-to-llama-cpp]`를 Llama.cpp를 클론하거나 빌드한 위치로 대체하세요. 예를 들어:
   ```bash
   cd ~/Documents/workspace/llama.cpp/build/bin
   ```

2. **모델 폴더를 지정하세요.**
   2단계에서 생성된 GGUF 파일의 전체 경로를 사용하세요. 모델을 서빙할 때, 분할된 GGUF 파일의 첫 번째 부분을 지정합니다(예: `DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf`).

다음은 서버를 시작하는 명령입니다:
```bash
./llama-server \
    --model /[your-directory]/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```


:::tip
🔑 **기계에 따라 사용자 정의할 매개변수:**  

- **`--model`:** 2단계에서 GGUF 파일을 다운로드받은 경로를 `/[your-directory]/`로 대체하세요.  
- **`--port`:** 서버 기본값은 `8080`이지만, 사용 가능한 포트에 따라 자유롭게 변경하세요.  
- **`--ctx-size`:** 컨텍스트 길이(토큰 수)를 결정합니다. 하드웨어가 허용하더라도 RAM/VRAM 사용량이 증가할 수 있으니 주의하세요.  
- **`--n-gpu-layers`:** GPU에서 더 빠른 추론을 위해 오프로드할 레이어 수를 설정합니다. 정확한 수는 GPU의 메모리 용량에 따라 달라지며, Unsloth의 표를 참조하세요.
:::

예를 들어, 모델이 `/Users/tim/Documents/workspace`에 다운로드된 경우 명령은 다음과 같이 보일 것입니다:  
```bash
./llama-server \
    --model /Users/tim/Documents/workspace/DeepSeek-R1-GGUF/DeepSeek-R1-UD-IQ1_S/DeepSeek-R1-UD-IQ1_S-00001-of-00003.gguf \
    --port 10000 \
    --ctx-size 1024 \
    --n-gpu-layers 40
```

서버가 시작되면, 다음 **로컬 OpenAI 호환 API** 엔드포인트를 호스팅합니다:  
```
http://127.0.0.1:10000
```

:::info
🖥️ **Llama.cpp 서버 실행 중**  

![서버 스크린샷](/images/tutorials/deepseek/serve.png)  

명령 실행 후 서버가 활성화되어 포트 10000에서 대기 중임을 확인하는 메시지가 표시됩니다.
:::

이 터미널 세션을 계속 실행 상태로 유지하세요. 모델이 이후 모든 단계에서 사용됩니다.

## 5단계: Llama.cpp를 Open WebUI에 연결  

1. Open WebUI의 **관리자 설정**으로 이동하세요.  
2. **Connections > OpenAI Connections**로 이동하세요.  
3. 새 연결에 다음 세부정보를 추가하세요:  
   - URL: `http://127.0.0.1:10000/v1` (또는 Open WebUI를 도커에서 실행 중일 때는 `http://host.docker.internal:10000/v1`)
   - API 키: `none`

:::info
🖥️ **Open WebUI에서 연결 추가 중**  

![연결 스크린샷](/images/tutorials/deepseek/connection.png)  

명령 실행 후 서버가 활성화되어 포트 10000에서 대기 중임을 확인하는 메시지가 표시됩니다.
:::

연결이 저장되면 Open WebUI에서 **DeepSeek-R1**을 직접 쿼리할 수 있습니다! 🎉  

---

## 예제: 응답 생성  

이제 Open WebUI의 채팅 인터페이스를 사용하여 **DeepSeek-R1 Dynamic 1.58-bit 모델**과 상호 작용할 수 있습니다.  

![응답 스크린샷](/images/tutorials/deepseek/response.png)  

---

## 참고 사항 및 고려사항  

- **성능:**  
  DeepSeek-R1과 같은 대규모 131GB 모델을 개인 하드웨어에서 실행할 경우 **느립니다**. M4 Max(128GB RAM)에서도 추론 속도는 그리 빠르지 않았습니다. 하지만 이것이 작동한다는 사실 자체가 UnslothAI의 최적화에 대한 증거입니다.  

- **VRAM/메모리 요구 사항:**  
  최적의 성능을 위해 충분한 VRAM과 시스템 RAM이 필요합니다. 저사양 GPU나 CPU 전용 설정에서는 속도가 느려질 수 있지만 여전히 가능합니다.  

---

**UnslothAI**와 **Llama.cpp** 덕분에 가장 큰 오픈소스 추론 모델 중 하나인 **DeepSeek-R1** (1.58-bit 버전)을 개인이 실행할 수 있게 되었습니다. 이렇게 대규모 모델을 일반 소비자 하드웨어에서 실행할 수 있다는 점은 대단한 기술적 이정표입니다.  

⭐ 오픈 AI 연구의 경계를 넓힌 커뮤니티에 큰 감사를 전합니다.  

즐거운 실험 되세요! 🚀  
