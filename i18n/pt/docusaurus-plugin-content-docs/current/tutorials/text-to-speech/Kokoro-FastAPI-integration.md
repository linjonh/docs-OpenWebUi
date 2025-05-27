---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI Usando Docker"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## O que é `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) é um wrapper FastAPI dockerizado para o modelo de texto-para-fala [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) que implementa a especificação do endpoint da API OpenAI. Ele oferece texto-para-fala de alto desempenho com velocidades de geração impressionantes.

## Principais Funcionalidades

- Endpoint de fala compatível com OpenAI com combinação de voz inline
- Inferência acelerada por GPU NVIDIA ou Onnx em CPU
- Suporte a streaming com fragmentação variável
- Suporte a vários formatos de áudio (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- Interface web integrada em localhost:8880/web (ou container adicional no repositório para gradio)
- Endpoints de fonema para conversão e geração

## Vozes

- af
- af_bella
- af_irulan
- af_nicole
- af_sarah
- af_sky
- am_adam
- am_michael
- am_gurney
- bf_emma
- bf_isabella
- bm_george
- bm_lewis

## Idiomas

- en_us
- en_uk

## Requisitos

- Docker instalado no seu sistema
- Open WebUI em execução
- Para suporte a GPU: GPU NVIDIA com CUDA 12.3
- Para apenas CPU: Nenhum requisito especial

## ⚡️ Início Rápido

### Você pode escolher entre versões para GPU ou CPU

### Versão GPU (Requer GPU NVIDIA com CUDA 12.8)

Usando docker run:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

Ou docker compose, criando um arquivo `docker-compose.yml` e executando `docker compose up`. Por exemplo:

```yaml
name: kokoro
services:
    kokoro-fastapi-gpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-gpu:v0.2.1
        restart: always
        deploy:
            resources:
                reservations:
                    devices:
                        - driver: nvidia
                          count: all
                          capabilities:
                              - gpu
```

:::info
Você pode precisar instalar e configurar [o NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### Versão CPU (Inferência otimizada para ONNX)

Com docker run:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

Com docker compose:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Configurando o Open WebUI para usar o `Kokoro-FastAPI`

Para usar o Kokoro-FastAPI com o Open WebUI, siga estas etapas:

- Abra o Painel Administrativo e vá para `Configurações` -> `Áudio`
- Defina suas configurações de TTS para corresponder ao seguinte:
- - Motor de Texto-para-Fala: OpenAI
  - URL Base da API: `http://localhost:8880/v1` # você pode precisar usar `host.docker.internal` em vez de `localhost`
  - Chave de API: `not-needed`
  - Modelo de TTS: `kokoro`
  - Voz de TTS: `af_bella` # também aceita mapeamento de vozes existentes do OAI para compatibilidade

:::info
A chave de API padrão é a string `not-needed`. Você não precisa alterar esse valor caso não precise de segurança adicional.
:::

## Construindo o Contêiner Docker

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # ou docker/gpu
docker compose up --build
```

**É isso!**

Para mais informações sobre como construir o contêiner Docker, incluindo alteração de portas, consulte o repositório [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)
