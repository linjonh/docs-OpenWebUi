## Docker Swarm

此安装方法需要了解 Docker Swarm，因为它使用堆栈文件在 Docker Swarm 中以服务形式部署 3 个独立的容器。

它包括 ChromaDB、Ollama 和 OpenWebUI 的隔离容器。
此外，还提供了预填充的[环境变量](/getting-started/env-configuration)以进一步说明设置。

根据您的硬件设置选择适当的命令：

- **开始之前**：

  您需要在主机上创建用于存储卷的目录，或者您可以指定自定义位置或卷。
  
  当前示例使用了一个隔离的目录 `data`，它位于与 `docker-stack.yaml` 相同的目录中。
  
      - **例如**：
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **支持 GPU**：

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
          CORS_ALLOW_ORIGIN: "*" # 这是当前的默认值，上线前需要更改
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

  - **其他要求**：

      1. 确保启用了 CUDA，请按照您的操作系统和 GPU 的说明进行操作。
      2. 启用 Docker 的 GPU 支持，参见 [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html "对 Nvidia 网站上的相关内容的引用。")
      3. 按照 [此处的指南](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus) 配置 Docker Swarm 使用您的 GPU。
    - 确保在 `/etc/nvidia-container-runtime/config.toml` 文件中启用 _GPU Resource_，并通过取消注释 `swarm-resource = "DOCKER_RESOURCE_GPU"` 启用 GPU 资源广告。更新这些文件后，每个节点都必须重启 Docker 守护进程。

- **支持 CPU**：
  
    修改 `docker-stack.yaml` 中的 Ollama 服务并移除 `generic_resources:` 的相关行。

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
