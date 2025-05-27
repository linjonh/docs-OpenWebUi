## Docker Swarm

Este método de instalação requer conhecimento sobre Docker Swarm, pois utiliza um arquivo de stack para implantar 3 contêineres separados como serviços em um Docker Swarm.

Inclui contêineres isolados de ChromaDB, Ollama e OpenWebUI.
Além disso, existem [Variáveis de Ambiente](/getting-started/env-configuration) pré-configuradas para ilustrar melhor a configuração.

Escolha o comando apropriado com base na sua configuração de hardware:

- **Antes de começar**:

  Diretórios para seus volumes precisam ser criados no host, ou você pode especificar um local ou volume personalizado.
  
  O exemplo atual utiliza um diretório isolado `data`, que está dentro do mesmo diretório que o `docker-stack.yaml`.
  
      - **Por exemplo**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **Com suporte para GPU**:

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
          CORS_ALLOW_ORIGIN: "*" # Este é o padrão atual, precisará mudar antes de ir ao vivo
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

  - **Requisitos adicionais**:

      1. Certifique-se de que o CUDA está habilitado, siga as instruções para seu sistema operacional e GPU.
      2. Habilite o suporte a GPU no Docker, veja [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html " no site da Nvidia.")
      3. Siga o [Guia aqui sobre como configurar o Docker Swarm para trabalhar com sua GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - Certifique-se de que o _Recurso GPU_ está habilitado em `/etc/nvidia-container-runtime/config.toml` e habilite a publicidade do recurso GPU descomentando `swarm-resource = "DOCKER_RESOURCE_GPU"`. O daemon do docker deve ser reiniciado após atualizar esses arquivos em cada nó.

- **Com suporte para CPU**:
  
    Modifique o serviço Ollama dentro de `docker-stack.yaml` e remova as linhas para `generic_resources:`

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

- **Implantar o Docker Stack**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
