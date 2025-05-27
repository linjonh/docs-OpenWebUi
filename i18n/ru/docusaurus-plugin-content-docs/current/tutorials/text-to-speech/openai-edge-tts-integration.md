---
sidebar_position: 1
title: "🗨️ Edge TTS Использование Docker"
---

:::warning
Этот учебник создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного варианта использования. Хотите внести вклад? Ознакомьтесь с руководством по внесению взносов.
:::

# Интеграция `openai-edge-tts` 🗣️ с Open WebUI

## Что такое `openai-edge-tts`? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) — это API преобразования текста в речь, которое имитирует конечную точку API OpenAI, позволяя напрямую заменять её в сценариях, где вы можете задать URL конечной точки, как в случае с Open WebUI.

Он использует пакет [edge-tts](https://github.com/rany2/edge-tts), который использует бесплатную функцию "Чтение вслух" браузера Edge для имитации запроса к Microsoft / Azure, чтобы получить текст в формате речи очень высокого качества бесплатно.

[Попробуйте голоса здесь](https://tts.travisvn.com)

<details>
  <summary>Чем это отличается от openedai-speech?</summary>

Похожий на [openedai-speech](https://github.com/matatonic/openedai-speech), [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) предоставляет API преобразования текста в речь, который имитирует API OpenAI, позволяя заменить его в сценариях, где доступна конечная точка OpenAI Speech, и можно настроить URL сервера.

`openedai-speech` — более комплексный вариант, позволяющий генерировать речь полностью оффлайн с большим выбором режимов.

`openai-edge-tts` — более простой вариант, который использует Python-пакет `edge-tts` для генерации аудио.

</details>

## Требования

- Установленный Docker на вашей системе
- Работающий Open WebUI

## ⚡️ Быстрый старт

Самый простой способ начать без необходимости конфигурации — выполнить команду ниже

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

Это запустит службу на порту 5050 с использованием всех настроек по умолчанию

## Настройка Open WebUI для использования `openai-edge-tts`

- Откройте Панель администратора и перейдите в `Настройки` -> `Аудио`
- Настройте параметры TTS в соответствии с приведённым ниже скриншотом
- _Примечание: здесь вы можете указать голос TTS_

![Скриншот настроек администраторской панели Open WebUI для аудио с добавлением правильных конечных точек для этого проекта](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
Ключ API по умолчанию — строка `your_api_key_here`. Вам не обязательно изменять это значение, если не нужна дополнительная защита.
:::

**И это всё! Вы можете остановиться здесь**

# Поставьте ⭐️ репозиторию на GitHub, если вы находите [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) полезным


<details>
  <summary>Запуск с Python</summary>
  
### 🐍 Запуск с Python

Если вы предпочитаете запустить этот проект напрямую с помощью Python, выполните следующие шаги для настройки виртуального окружения, установки зависимостей и запуска сервера.

#### 1. Клонирование репозитория

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. Настройка виртуального окружения

Создайте и активируйте виртуальное окружение для изоляции зависимостей:

```bash
# Для macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Для Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. Установка зависимостей

Используйте `pip` для установки необходимых пакетов из `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 4. Настройка переменных окружения

Создайте файл `.env` в корневой директории и укажите следующие переменные:

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. Запуск сервера

После настройки запустите сервер с помощью:

```bash
python app/server.py
```

Сервер начнёт работать по адресу `http://localhost:5050`.

#### 6. Тестирование API

Теперь вы можете взаимодействовать с API по адресу `http://localhost:5050/v1/audio/speech` и другим доступным конечным точкам. Ознакомьтесь с разделом "Использование" для примеров запросов.

</details>

<details>
  <summary>Детали использования</summary>
  
##### Конечная точка: `/v1/audio/speech` (с алиасом `/audio/speech`)

Генерирует аудио на основе входного текста. Доступные параметры:

**Обязательный параметр:**

- **input** (строка): Текст для преобразования в аудио (до 4096 символов).

**Необязательные параметры:**

- **model** (строка): Установите "tts-1" или "tts-1-hd" (по умолчанию: `"tts-1"`).
- **voice** (строка): Один из голосов, совместимых с OpenAI (alloy, echo, fable, onyx, nova, shimmer) или любой допустимый голос `edge-tts` (по умолчанию: `"en-US-AvaNeural"`).
- **response_format** (строка): Формат аудио. Варианты: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (по умолчанию: `mp3`).
- **speed** (число): Скорость воспроизведения (от 0.25 до 4.0). По умолчанию `1.0`.

:::tip
Вы можете просматривать доступные голоса и прослушивать образцы на [tts.travisvn.com](https://tts.travisvn.com)
:::

Пример запроса с использованием `curl` и сохранением результата в mp3 файл:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "Привет, я ваш AI-ассистент! Просто скажите, как я могу помочь воплотить ваши идеи в жизнь.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

Или, чтобы соответствовать параметрам конечной точки API OpenAI:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "Привет, я ваш AI-ассистент! Просто скажите, как я могу помочь воплотить ваши идеи в жизнь.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

И пример на языке, отличном от английского:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### Дополнительные конечные точки

- **POST/GET /v1/models**: Список доступных моделей TTS.
- **POST/GET /v1/voices**: Список голосов `edge-tts` для заданного языка / региона.
- **POST/GET /v1/voices/all**: Список всех голосов `edge-tts` с информацией о поддержке языков.

:::info
Префикс `/v1` теперь является необязательным.

Кроме того, существуют конечные точки для **Azure AI Speech** и **ElevenLabs** для потенциальной будущей поддержки, если пользовательские конечные точки API будут разрешены в Open WebUI.

Их можно отключить, установив переменную окружения `EXPAND_API=False`.
:::

</details>

## 🐳 Быстрая настройка для Docker

Вы можете настроить переменные окружения в команде для запуска проекта

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
Текст в формате markdown теперь проходит через фильтр для улучшенной читаемости и поддержки.

Вы можете отключить это, установив переменную окружения `REMOVE_FILTER=True`.
:::

## Дополнительные ресурсы

Для получения дополнительной информации о `openai-edge-tts` вы можете посетить [репозиторий GitHub](https://github.com/travisvn/openai-edge-tts)

Для прямой поддержки вы можете посетить [Voice AI & TTS Discord](https://tts.travisvn.com/discord)

## 🎙️ Примеры голосов

[Послушайте примеры голосов и посмотрите все доступные голоса Edge TTS](https://tts.travisvn.com/)
