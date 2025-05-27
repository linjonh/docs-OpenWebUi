## Docker Swarm

Этот метод установки требует знания Docker Swarm, так как используется стек-файл для развертывания трех отдельных контейнеров как сервисов в Docker Swarm.

Включаются изолированные контейнеры ChromaDB, Ollama и OpenWebUI.
Дополнительно предоставлены предзаполненные [переменные окружения](/getting-started/env-configuration) для лучшего понимания настройки.

Выберите подходящую команду в зависимости от аппаратной конфигурации:

- **Перед началом**:

  Каталоги для ваших томов должны быть созданы на хосте, или вы можете указать пользовательское местоположение или том.
  
  Текущий пример использует изолированный каталог `data`, который находится в том же директории, что и `docker-stack.yaml`.
  
      - **Например**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **С поддержкой GPU**:

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
          CORS_ALLOW_ORIGIN: "*" # Это текущий настройка по умолчанию, необходимо изменить перед использованием в производстве
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

  - **Дополнительные требования**:

      1. Убедитесь, что CUDA включена — следуйте инструкциям для вашей ОС и GPU.
      2. Включите поддержку GPU в Docker — смотрите [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html "На сайте Nvidia.")
      3. Следуйте [инструкции по настройке Docker Swarm для работы с GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - Убедитесь, что _GPU Resource_ включен в `/etc/nvidia-container-runtime/config.toml`, и включите рекламу ресурса GPU, раскомментировав `swarm-resource = "DOCKER_RESOURCE_GPU"`. После обновления этих файлов на каждом узле необходимо перезапустить демон Docker.

- **С поддержкой CPU**:
  
    Измените сервис Ollama в `docker-stack.yaml` и удалите строки с `generic_resources:`

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

- **Развертывание Docker Stack**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
