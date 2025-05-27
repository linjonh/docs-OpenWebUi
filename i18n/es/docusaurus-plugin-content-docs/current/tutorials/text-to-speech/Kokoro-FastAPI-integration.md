---
sidebar_position: 2
title: "🗨️ Kokoro-FastAPI Usando Docker"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el apoyo del equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## ¿Qué es `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) es un envoltorio FastAPI con Docker para el modelo de texto a voz [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) que implementa la especificación de los puntos de acceso de la API de OpenAI. Ofrece una conversión de texto a voz de alto rendimiento con velocidades de generación impresionantes.

## Características clave

- Punto de acceso de voz compatible con OpenAI con combinación de voces en línea
- Inferencia acelerada por GPU NVIDIA o CPU Onnx
- Soporte de transmisión con división variable
- Soporte para múltiples formatos de audio (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- Interfaz web integrada en localhost:8880/web (o contenedor adicional en el repositorio para gradio)
- Puntos de acceso de fonemas para conversión y generación

## Voces

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

- Docker instalado en tu sistema
- Open WebUI funcionando
- Para soporte de GPU: GPU NVIDIA con CUDA 12.3
- Para solo CPU: Sin requisitos especiales

## ⚡️ Inicio rápido

### Puedes elegir entre versiones para GPU o CPU

### Versión GPU (Requiere GPU NVIDIA con CUDA 12.8)

Usando docker run:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

O docker compose, creando un archivo `docker-compose.yml` y ejecutando `docker compose up`. Por ejemplo:

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
Es posible que necesites instalar y configurar [el NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### Versión CPU (Inferencia optimizada con ONNX)

Usando docker run:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

Usando docker compose:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Configuración de Open WebUI para usar `Kokoro-FastAPI`

Para usar Kokoro-FastAPI con Open WebUI, sigue estos pasos:

- Abre el Panel de Administración y ve a `Configuración` -> `Audio`
- Configura tu TTS Settings para que coincidan con los siguientes valores:
- - Motor de Conversión de Texto a Voz: OpenAI
  - URL Base de API: `http://localhost:8880/v1` # puede que debas usar `host.docker.internal` en lugar de `localhost`
  - Clave de API: `not-needed`
  - Modelo TTS: `kokoro`
  - Voz TTS: `af_bella` # también acepta el mapeo de voces existentes de OAI para compatibilidad

:::info
La clave de API predeterminada es la cadena `not-needed`. No necesitas cambiar ese valor a menos que requieras mayor seguridad.
:::

## Construcción del contenedor de Docker

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # o docker/gpu
docker compose up --build
```

**¡Eso es todo!**

Para más información sobre cómo construir el contenedor de Docker, incluyendo el cambio de puertos, por favor consulta el repositorio de [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)
