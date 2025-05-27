## Docker Swarm

Cette méthode d'installation nécessite des connaissances sur Docker Swarm, car elle utilise un fichier stack pour déployer 3 conteneurs distincts en tant que services dans un Docker Swarm.

Elle comprend des conteneurs isolés de ChromaDB, Ollama et OpenWebUI.
De plus, des [Variables d'Environnement](/getting-started/env-configuration) préremplies sont incluses pour mieux illustrer la configuration.

Choisissez la commande appropriée en fonction de votre configuration matérielle :

- **Avant de commencer** :

  Les répertoires pour vos volumes doivent être créés sur l'hôte, ou vous pouvez spécifier un emplacement ou un volume personnalisé.
  
  L'exemple actuel utilise un répertoire isolé `data`, qui se trouve dans le même répertoire que le fichier `docker-stack.yaml`.
  
      - **Par exemple** :
  
        ```bash
        mkdir -p data/open-webui data/chromadb data/ollama
        ```

- **Avec support GPU** :

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
          WEBUI_NAME: Super Bot de Chat
          CORS_ALLOW_ORIGIN: "*" # Ceci est la valeur par défaut actuelle, devra être modifié avant une mise en production
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

  - **Prérequis supplémentaires** :

      1. Assurez-vous que CUDA est activé, suivez les instructions spécifiques à votre OS et GPU.
      2. Activez la prise en charge GPU dans Docker, voir le [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html " sur le site de Nvidia.")
      3. Suivez le [Guide ici pour configurer Docker Swarm avec votre GPU](https://gist.github.com/tomlankhorst/33da3c4b9edbde5c83fc1244f010815c#configuring-docker-to-work-with-your-gpus)
    - Assurez-vous que _GPU Resource_ est activé dans `/etc/nvidia-container-runtime/config.toml` et activez l'annonce des ressources GPU en décommentant `swarm-resource = "DOCKER_RESOURCE_GPU"`. Le démon Docker doit être redémarré après la mise à jour de ces fichiers sur chaque nœud.

- **Avec support CPU** :
  
    Modifiez le service Ollama dans `docker-stack.yaml` et supprimez les lignes pour `generic_resources:`

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

- **Déployez la stack Docker** :
  
  ```bash
  docker stack deploy -c docker-stack.yaml -d super-awesome-ai
  ```
