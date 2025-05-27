## Docker Swarm

Este método de instalación requiere conocimientos sobre Docker Swarms, ya que utiliza un archivo de pila para implementar 3 contenedores separados como servicios en un Docker Swarm.

Incluye contenedores aislados de ChromaDB, Ollama y OpenWebUI.
Además, hay [Variables de Entorno](/getting-started/env-configuration) preconfiguradas para ilustrar aún más la configuración.

Elija el comando apropiado según la configuración de su hardware:

- **Antes de comenzar**:

  Se deben crear directorios para sus volúmenes en el host, o puede especificar una ubicación o volumen personalizado.
  
  El ejemplo actual utiliza un directorio aislado `data`, que está dentro del mismo directorio que el `docker-stack.yaml`.
  
      - **Por ejemplo**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **Con soporte para GPU**:

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
          CORS_ALLOW_ORIGIN: "*" # Este es el valor predeterminado actual, será necesario cambiar antes de ponerlo en producción
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

  - **Requisitos adicionales**:

      1. Asegúrese de que CUDA esté habilitado, siga las instrucciones de su sistema operativo y GPU para esto.
      2. Habilite el soporte de GPU para Docker, consulte [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html " sitio web de Nvidia.")
      3. Siga la [Guía aquí para configurar Docker Swarm con su GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - Asegúrese de que el _Recurso de GPU_ esté habilitado en `/etc/nvidia-container-runtime/config.toml` y habilite la publicidad de recursos GPU mediante la descomentarización de `swarm-resource = "DOCKER_RESOURCE_GPU"`. El demonio de Docker debe reiniciarse después de actualizar estos archivos en cada nodo.

- **Con soporte para CPU**:
  
    Modifique el servicio Ollama dentro del `docker-stack.yaml` y elimine las líneas para `generic_resources:`

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

- **Desplegar la pila de Docker**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
