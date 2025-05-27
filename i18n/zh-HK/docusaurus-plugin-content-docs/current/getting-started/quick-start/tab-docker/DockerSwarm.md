## Docker Swarm

此安裝方式需要瞭解 Docker Swarm，因為它使用 stack 文件在 Docker Swarm 中部署 3 個獨立的容器作為服務。

包括 ChromaDB、Ollama 和 OpenWebUI 的獨立容器。
此外，還提供已填充的[環境變數](/getting-started/env-configuration)來進一步展示設置。

根據您的硬件設置選擇適當命令：

- **啟動前**：

  需要在主機上創建磁碟卷的目錄，或者您可以指定自定義位置或磁碟卷。
  
  當前範例使用了隔離目錄 `data`，它位於與 `docker-stack.yaml` 相同的目錄中。
  
      - **例如**：
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **支援 GPU**：

  #### Docker-stack.yaml

    ```yaml
    version: 3.9

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
          CORS_ALLOW_ORIGIN: "*" # 這是當前的預設值，在上線前需要更改
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

  - **額外需求**：

      1. 確保 CUDA 已啟用，按照您的操作系統和 GPU 的指示進行。
      2. 啟用 Docker GPU 支援，請參閱[Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html " on Nvidias site.")
      3. 按照[這裡的指南配置 Docker Swarm 與您的 GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - 在 `/etc/nvidia-container-runtime/config.toml` 文件中確保已啟用 _GPU 資源_，並通過取消註解 `swarm-resource = "DOCKER_RESOURCE_GPU"` 啟用 GPU 資源廣告。在每個節點上更新這些文件後需要重新啟動 Docker 守護程序。

- **支援 CPU**：
  
    修改 `docker-stack.yaml` 中的 Ollama 服務並移除 `generic_resources:` 的行。

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

- **部署 Docker Stack**：
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
