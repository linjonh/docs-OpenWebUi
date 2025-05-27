## Docker Swarm

Diese Installationsmethode erfordert Kenntnisse über Docker Swarms, da ein Stack-Datei verwendet wird, um drei separate Container als Dienste in einem Docker Swarm bereitzustellen.

Es umfasst isolierte Container von ChromaDB, Ollama und OpenWebUI.
Zusätzlich gibt es vorausgefüllte [Umgebungsvariablen](/getting-started/env-configuration), um die Einrichtung weiter zu veranschaulichen.

Wählen Sie den passenden Befehl basierend auf Ihrer Hardware-Konfiguration:

- **Vor dem Start**:

  Verzeichnisse für Ihre Volumes müssen auf dem Host erstellt werden, oder Sie können einen benutzerdefinierten Speicherort oder ein Volume angeben.
  
  Das aktuelle Beispiel verwendet ein isoliertes Verzeichnis `data`, das sich im selben Verzeichnis wie die `docker-stack.yaml` befindet.
  
      - **Zum Beispiel**:
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **Mit GPU-Unterstützung**:

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
          CORS_ALLOW_ORIGIN: "*" # Dies ist der aktuelle Standard, muss vor dem Live-Schalten geändert werden.
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

  - **Zusätzliche Anforderungen**:

      1. Stellen Sie sicher, dass CUDA aktiviert ist, und folgen Sie den Anweisungen Ihres Betriebssystems und Ihrer GPU.
      2. Aktivieren Sie die GPU-Unterstützung für Docker, siehe [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html " auf der Website von Nvidia.")
      3. Folgen Sie der [Anleitung zur konfiguration von Docker Swarm zur Arbeit mit Ihrer GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - Stellen Sie sicher, dass die _GPU-Ressource_ in `/etc/nvidia-container-runtime/config.toml` aktiviert ist und aktivieren Sie die GPU-Ressourcen-Werbung, indem Sie die Zeile `swarm-resource = "DOCKER_RESOURCE_GPU"` auskommentieren. Der Docker-Daemon muss nach dem Aktualisieren dieser Dateien auf jedem Knoten neu gestartet werden.

- **Mit CPU-Unterstützung**:
  
    Modifizieren Sie den Ollama-Dienst innerhalb der `docker-stack.yaml` und entfernen Sie die Zeilen für `generic_resources:`

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

- **Docker-Stack bereitstellen**:
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
