## Docker Swarm

이 설치 방법은 Docker Swarm에 대한 지식이 필요하며, 스택 파일을 사용해 Docker Swarm에서 3개의 개별 컨테이너를 서비스로 배포합니다.

이 방법은 ChromaDB, Ollama, OpenWebUI의 격리된 컨테이너를 포함합니다.
추가적으로 설정을 더 잘 이해하기 위한 미리 채워진 [환경 변수](/getting-started/env-configuration)가 제공됩니다.

하드웨어 설정에 따라 적합한 명령을 선택하세요:

- **시작 전 준비사항**:

  호스트에서 볼륨을 위한 디렉토리를 생성해야 하거나 사용자 지정 위치 또는 볼륨을 지정할 수 있습니다.
  
  현재 예시는 `docker-stack.yaml`과 동일한 디렉토리 내의 격리된 디렉토리 `data`를 사용합니다.
  
      - **예를 들어**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **GPU 지원 사용**:

  #### Docker-stack.yaml

    ```yaml
    version: '3.9'

    services:
      openWebUI:
        image: ghcr.io/open-webui/open-webui:main
        depends_on:
            - chromadb
            - ollama
        volumes:
          - ./data/open-webui:/app/backend/data
        environment:
          DATA_DIR: /app/backend/data 
          OLLAMA_BASE_URLS: http://ollama:11434
          CHROMA_HTTP_PORT: 8000
          CHROMA_HTTP_HOST: chromadb
          CHROMA_TENANT: default_tenant
          VECTOR_DB: chroma
          WEBUI_NAME: Awesome ChatBot
          CORS_ALLOW_ORIGIN: "*" # 현재 기본값이며, 라이브 환경에서는 변경 필요
          RAG_EMBEDDING_ENGINE: ollama
          RAG_EMBEDDING_MODEL: nomic-embed-text-v1.5
          RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE: "True"
        ports:
          - target: 8080
            published: 8080
            mode: overlay
        deploy:
          replicas: 1
          restart_policy:
            condition: any
            delay: 5s
            max_attempts: 3

      chromadb:
        hostname: chromadb
        image: chromadb/chroma:0.5.15
        volumes:
          - ./data/chromadb:/chroma/chroma
        environment:
          - IS_PERSISTENT=TRUE
          - ALLOW_RESET=TRUE
          - PERSIST_DIRECTORY=/chroma/chroma
        ports: 
          - target: 8000
            published: 8000
            mode: overlay
        deploy:
          replicas: 1
          restart_policy:
            condition: any
            delay: 5s
            max_attempts: 3
        healthcheck: 
          test: ["CMD-SHELL", "curl localhost:8000/api/v1/heartbeat || exit 1"]
          interval: 10s
          retries: 2
          start_period: 5s
          timeout: 10s

      ollama:
        image: ollama/ollama:latest
        hostname: ollama
        ports:
          - target: 11434
            published: 11434
            mode: overlay
        deploy:
          resources:
            reservations:
              generic_resources:
                - discrete_resource_spec:
                    kind: "NVIDIA-GPU"
                    value: 0
          replicas: 1
          restart_policy:
            condition: any
            delay: 5s
            max_attempts: 3
        volumes:
          - ./data/ollama:/root/.ollama

    ```

  - **추가 요구 사항**:

      1. CUDA가 활성화되어 있는지 확인하세요. OS 및 GPU 지침을 따르세요.
      2. Docker GPU 지원을 활성화하세요. [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html "Nvidia의 웹사이트에서 안내")를 참조하세요.
      3. [Docker Swarm에서 GPU를 사용하는 설정 방법](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)을 따라 설정하세요.
    - `/etc/nvidia-container-runtime/config.toml`에서 _GPU Resource_ 를 활성화하고 `swarm-resource = "DOCKER_RESOURCE_GPU"`를 주석 해제하여 GPU 리소스 광고를 활성화합니다. 각 노드에서 이러한 파일을 업데이트한 후 Docker 데몬을 다시 시작해야 합니다.

- **CPU 지원 사용**:
  
    `docker-stack.yaml` 내 Ollama 서비스를 수정하고 `generic_resources:`에 대한 줄을 제거하세요.

    ```yaml
        ollama:
      image: ollama/ollama:latest
      hostname: ollama
      ports:
        - target: 11434
          published: 11434
          mode: overlay
      deploy:
        replicas: 1
        restart_policy:
          condition: any
          delay: 5s
          max_attempts: 3
      volumes:
        - ./data/ollama:/root/.ollama
    ```

- **Docker 스택 배포**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
