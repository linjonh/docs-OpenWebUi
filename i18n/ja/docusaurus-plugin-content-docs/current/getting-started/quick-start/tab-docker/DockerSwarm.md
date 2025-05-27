## Docker Swarm

このインストール方法はDocker Swarmに関する知識を必要とします。スタックファイルを使用してDocker Swarm内で3つの別個のコンテナをサービスとしてデプロイします。

これには、ChromaDB、Ollama、およびOpenWebUIの分離されたコンテナが含まれます。
さらに、セットアップを詳しく説明するために事前設定された[環境変数](/getting-started/env-configuration)が含まれています。

ハードウェア構成に基づいて適切なコマンドを選択してください:

- **開始前**:

  ボリューム用のディレクトリをホスト上で作成する必要があります。または、カスタムの場所やボリュームを指定できます。
  
  現在の例では`docker-stack.yaml`と同じディレクトリ内の孤立した`data`ディレクトリを使用しています。
  
      - **例**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **GPU対応**:

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
          CORS_ALLOW_ORIGIN: "*" # 現在のデフォルトですが、ライブ前に変更する必要があります
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

  - **追加要件**:

      1. CUDAが有効であることを確認します。OSとGPUの手順に従ってください。
      2. Docker GPUサポートを有効にする方法については、[Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html "Nvidiaのサイトで")を参照してください。
      3. [GPUでDocker Swarmを構成する方法についてはこちらのガイドに従ってください](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - `/etc/nvidia-container-runtime/config.toml`で_GPUリソース_を有効にし、`swarm-resource = "DOCKER_RESOURCE_GPU"`をコメントアウト解除してGPUリソース広告を有効にします。各ノードのこれらのファイルを更新した後、Dockerデーモンを再起動する必要があります。

- **CPU対応**:
  
    `docker-stack.yaml`内のOllamaサービスを変更し、`generic_resources:`の行を削除します。

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

- **Dockerスタックのデプロイ**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
