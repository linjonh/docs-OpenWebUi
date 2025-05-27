---
sidebar_position: 2
title: "🗨️ Использование Openedai-speech с Docker"
---

:::warning
Этот учебник создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для ваших конкретных случаев использования. Хотите внести вклад? Ознакомьтесь с руководством по внесению изменений.
:::

**Интеграция `openedai-speech` в Open WebUI с использованием Docker**
===================================================================

**Что такое `openedai-speech`?**
--------------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) — это сервер для преобразования текста в речь, совместимый с аудио/речевым API OpenAI.

Он обслуживает конечную точку `/v1/audio/speech` и предоставляет бесплатный, частный функционал преобразования текста в речь с возможностью создания пользовательских голосов. Этот сервис никак не связан с OpenAI и не требует ключа API OpenAI.
:::

**Требования**
---------------

* Установленный Docker на вашей системе
* Open WebUI, работающий в Docker-контейнере
* Базовые знания Docker и Docker Compose

**Вариант 1: Использование Docker Compose**
------------------------------------------

**Шаг 1: Создайте новую папку для сервиса `openedai-speech`**
------------------------------------------------------------

Создайте новую папку, например, `openedai-speech-service`, для хранения файлов `docker-compose.yml` и `speech.env`.

**Шаг 2: Клонируйте репозиторий `openedai-speech` с GitHub**
----------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

Это скачает репозиторий `openedai-speech` на ваш локальный компьютер, включая файлы Docker Compose (`docker-compose.yml`, `docker-compose.min.yml` и `docker-compose.rocm.yml`) и другие необходимые файлы.

**Шаг 3: Переименуйте файл `sample.env` в `speech.env` (Настройте, если необходимо)**
------------------------------------------------------------------------------

В папке репозитория `openedai-speech` создайте новый файл с названием `speech.env` со следующим содержимым:

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**Шаг 4: Выберите файл Docker Compose**
--------------------------------------

Вы можете использовать любой из следующих файлов Docker Compose:

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): Этот файл использует образ `ghcr.io/matatonic/openedai-speech` и строится из [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile).
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): Этот файл использует образ `ghcr.io/matatonic/openedai-speech-min` и строится из [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min).
  Этот образ — минимальная версия, которая поддерживает только Piper и не требует GPU.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): Этот файл использует образ `ghcr.io/matatonic/openedai-speech-rocm` и строится из [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) с поддержкой ROCm.

**Шаг 4: Сборка выбранного образа Docker**
-----------------------------------------

Перед запуском файла Docker Compose необходимо собрать образ Docker:

* **Nvidia GPU (поддержка CUDA)**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU (поддержка ROCm)**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **Только CPU, без GPU (только Piper)**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**Шаг 5: Запустите команду `docker compose up -d` для выбранного файла**
------------------------------------------------------------------------

* **Nvidia GPU (поддержка CUDA)**: Запустите следующую команду для старта сервиса `openedai-speech` в фоновом режиме:

```bash
docker compose up -d
```

* **AMD GPU (поддержка ROCm)**: Запустите следующую команду для старта сервиса `openedai-speech` в фоновом режиме:

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Apple M-series, Raspberry Pi)**: XTTS поддерживает только CPU в этом режиме, и работа будет очень медленной. Вы можете использовать образ Nvidia для XTTS с CPU (медленно), либо образ только для Piper (рекомендуется):

```bash
docker compose -f docker-compose.min.yml up -d
```

* **Только CPU, без GPU (только Piper)**: Для минимального образа с поддержкой только Piper (< 1GB вместо 8GB):

```bash
docker compose -f docker-compose.min.yml up -d
```

Это запустит сервис `openedai-speech` в фоновом режиме.

**Вариант 2: Использование команд Docker Run**
---------------------------------------------

Вы также можете использовать следующие команды запуска Docker, чтобы запустить сервис `openedai-speech` в фоновом режиме:

* **Nvidia GPU (CUDA)**: Выполните следующую команду для сборки и запуска сервиса `openedai-speech`:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: Выполните следующую команду для сборки и запуска сервиса `openedai-speech`:

> Чтобы включить поддержку ROCm, раскомментируйте строку `#USE_ROCM=1` в файле `speech.env`.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **Только CPU, без GPU (только Piper)**: Выполните следующую команду для сборки и запуска сервиса `openedai-speech`:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**Шаг 6: Настройка Open WebUI для использования `openedai-speech` для TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Откройте настройки Open WebUI и перейдите в раздел настроек TTS под **Admin Panel > Settings > Audio**. Добавьте следующую настройку:

* **API Base URL**: `http://host.docker.internal:8000/v1`
* **API Key**: `sk-111111111` (Обратите внимание, что это фиктивный API ключ, так как `openedai-speech` не требует API ключа. Вы можете использовать любой ключ по своему выбору, при условии, что это поле заполнено.)

**Шаг 7: Выберите голос**
--------------------------

В разделе `TTS Voice` того же меню настроек аудио в панели администратора, вы можете установить модель `TTS Model` из следующих доступных вариантов, поддерживаемых `openedai-speech`. Голоса этих моделей оптимизированы для английского языка.

* `tts-1` или `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova`, и `shimmer` (`tts-1-hd` настраивается; по умолчанию использует семплы OpenAI)

**Шаг 8: Нажмите `Сохранить`, чтобы применить изменения и начать наслаждаться естественно звучащими голосами**
--------------------------------------------------------------------------------------------

Нажмите кнопку `Сохранить`, чтобы применить изменения в ваших настройках Open WebUI. Обновите страницу, чтобы изменения полностью вступили в силу, и наслаждайтесь использованием интеграции `openedai-speech` в Open WebUI для озвучивания текста технологиями синтеза речи с естественным звучанием.

**Детали модели:**
------------------

`openedai-speech` поддерживает несколько моделей синтеза речи, каждая из которых имеет свои преимущества и требования. Доступны следующие модели:

* **Piper TTS** (очень быстро, работает на CPU): Используйте свои собственные [голоса Piper](https://rhasspy.github.io/piper-samples/) через файл конфигурации `voice_to_speaker.yaml`. Эта модель отлично подходит для приложений, требующих низкой задержки и высокой производительности. Piper TTS также поддерживает [многоязычные](https://github.com/matatonic/openedai-speech#multilingual) голоса.
* **Coqui AI/TTS XTTS v2** (быстрый, но требует около 4ГБ VRAM GPU и Nvidia GPU с CUDA): Эта модель использует технологию создания голосов Coqui AIs XTTS v2 для генерации высококачественных голосов. Хотя это требует более мощного GPU, она обеспечивает отличное качество и высокопроизводительный звук. Coqui также поддерживает [многоязычные](https://github.com/matatonic/openedai-speech#multilingual) голоса.
* **Бета-версия поддержки Parler-TTS** (экспериментально, медленнее): Эта модель использует фреймворк Parler-TTS для генерации голосов. Хотя это пока бета-версия, она позволяет описывать основные характеристики голоса диктора. Точный голос будет слегка отличаться при каждом генерации, но должен быть похож на описанный голос диктора. Для вдохновения, как описывать голоса, смотрите [Text Description to Speech](https://www.text-description-to-speech.com/).

**Устранение неполадок**
-------------------

Если у вас возникают проблемы с интеграцией `openedai-speech` с Open WebUI, следуйте этим шагам по устранению неполадок:

* **Проверьте сервис `openedai-speech`**: Убедитесь, что сервис `openedai-speech` работает и указанный вами порт в файле docker-compose.yml открыт.
* **Проверьте доступ к `host.docker.internal`**: Убедитесь, что хост `host.docker.internal` разрешается из контейнера Open WebUI. Это необходимо, так как `openedai-speech` экспонируется через `localhost` на вашем ПК, но `open-webui` обычно не имеет доступа к нему из своего контейнера. Вы можете добавить том в файл docker-compose.yml, чтобы смонтировать файл с хоста в контейнер, например, в директорию, обслуживаемую `openedai-speech`.
* **Просмотрите конфигурацию ключа API**: Убедитесь, что ключ API установлен на фиктивное значение или фактически не проверен, так как `openedai-speech` не требует ключа API.
* **Проверьте конфигурацию голоса**: Убедитесь, что голос, который вы пытаетесь использовать для преобразования текста в речь, существует в вашем файле `voice_to_speaker.yaml`, а соответствующие файлы (например, XML-файлы голоса) находятся в правильной директории.
* **Проверьте пути к моделям голоса**: Если у вас возникают проблемы с загрузкой модели голоса, дважды проверьте, что пути в вашем файле `voice_to_speaker.yaml` соответствуют фактическому расположению ваших моделей.

**Дополнительные советы по устранению неполадок**
------------------------------------

* Проверьте журналы `openedai-speech` на наличие ошибок или предупреждений, которые могут указать, где находится проблема.
* Убедитесь, что файл `docker-compose.yml` правильно настроен для вашей среды.
* Если проблемы продолжаются, попробуйте перезапустить сервис `openedai-speech` или всю среду Docker.
* Если проблема не решается, обратитесь к репозиторию `openedai-speech` на GitHub или попросите помощи на соответствующем форуме сообщества.

**Часто задаваемые вопросы**
-------

**Как я могу контролировать эмоциональный диапазон генерируемого звука?**

Нет прямого механизма для управления эмоциональным выходом сгенерированного аудио. Некоторые факторы, такие как использование заглавных букв или грамматика, могут влиять на выходное аудио, но внутренние тесты дали смешанные результаты.

**Где хранятся файлы голосов? А как насчет конфигурационного файла?**.

Конфигурационные файлы, которые определяют доступные голоса и их свойства, хранятся в объеме конфигурации. В частности, голоса по умолчанию определены в файле `voice_to_speaker.default.yaml`.

**Дополнительные ресурсы**
------------------------

Для получения дополнительной информации о настройке Open WebUI для работы с `openedai-speech`, включая установку переменных среды, смотрите [документацию Open WebUI](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech).

Для получения дополнительной информации о `openedai-speech` посетите [репозиторий GitHub](https://github.com/matatonic/openedai-speech).

**Как добавить больше голосов в openedai-speech:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
Вы можете изменить номер порта в файле `docker-compose.yml` на любой открытый и доступный порт, но не забудьте обновить **API Base URL** в настройках Audio админпанели Open WebUI.
:::
