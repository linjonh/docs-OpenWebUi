---
sidebar_position: 2
title: "🗨️ Использование Kokoro-FastAPI с Docker"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного случая использования. Хотите внести вклад? Ознакомьтесь с учебником по внесению вклада.
:::

## Что такое `Kokoro-FastAPI`?

[Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) — это контейнеризированная оболочка FastAPI для модели преобразования текста в речь [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), реализующая спецификацию конечной точки API OpenAI. Она предлагает высокопроизводительное преобразование текста в речь с впечатляющими скоростями генерации.

## Основные особенности

- Конечная точка речевого API, совместимая с OpenAI, с встроенной комбинацией голосов
- Ускоренная обработка на GPU NVIDIA или CPU при помощи Onnx
- Поддержка потоковой передачи с переменной длиной фрагментов
- Поддержка множества форматов аудио (`.mp3`, `.wav`, `.opus`, `.flac`, `.aac`, `.pcm`)
- Встроенный веб-интерфейс на localhost:8880/web (или дополнительный контейнер в репозитории для gradio)
- Конечные точки фонем для конверсии и генерации

## Голоса

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

## Языки

- en_us
- en_uk

## Требования

- Установленный на вашей системе Docker
- Запущенный Open WebUI
- Для поддержки GPU: GPU NVIDIA с CUDA 12.3
- Для процессора: Без специальных требований

## ⚡️ Быстрый старт

### Вы можете выбрать между версиями для GPU или CPU

### Версия для GPU (требуется GPU NVIDIA с CUDA 12.8)

Используя docker run:

```bash
docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu
```

Или docker compose, создав файл `docker-compose.yml` и запустив `docker compose up`. Например:

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
Вам может понадобиться установить и настроить [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
:::

### Версия для CPU (оптимизированная обработка ONNX)

С использованием docker run:

```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu
```

С использованием docker compose:

```yaml
name: kokoro
services:
    kokoro-fastapi-cpu:
        ports:
            - 8880:8880
        image: ghcr.io/remsky/kokoro-fastapi-cpu
        restart: always
```

## Настройка Open WebUI для использования `Kokoro-FastAPI`

Для использования Kokoro-FastAPI с Open WebUI выполните следующие шаги:

- Откройте Панель администратора и перейдите в `Настройки` -> `Аудио`
- Настройте параметры TTS следующим образом:
- - Движок преобразования текста в речь: OpenAI
  - Базовый URL API: `http://localhost:8880/v1` # возможно, потребуется использовать `host.docker.internal` вместо `localhost`
  - Ключ API: `not-needed`
  - Модель TTS: `kokoro`
  - Голос TTS: `af_bella` # также поддерживается сопоставление существующих голосов OAI для совместимости

:::info
Ключ API по умолчанию — строка `not-needed`. Вам не нужно изменять это значение, если вам не требуется дополнительная безопасность.
:::

## Создание контейнера Docker

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
cd docker/cpu # или docker/gpu
docker compose up --build
```

**Вот и все!**

Для получения дополнительной информации о создании контейнера Docker, включая изменение портов, пожалуйста, обратитесь к репозиторию [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI)
