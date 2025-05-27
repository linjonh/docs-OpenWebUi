---
sidebar_position: 25
title: "🔠 Интеграция LibreTranslate"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для ваших конкретных задач. Хотите внести вклад? Ознакомьтесь с учебником по вкладу.
:::

Обзор
------

LibreTranslate — это бесплатный и с открытым исходным кодом API для машинного перевода, который поддерживает широкий спектр языков. LibreTranslate можно развернуть локально, он не зависит от подключения к интернету, прост в настройке и, в отличие от других API, не полагается на проприетарных провайдеров, таких как Google или Azure, для выполнения переводов. Вместо этого его движок работает на открытой библиотеке [Argos Translate](https://github.com/argosopentech/argos-translate). Вы можете интегрировать LibreTranslate с Open WebUI, чтобы использовать его возможности машинного перевода. Это руководство предоставляет пошаговую инструкцию по настройке LibreTranslate в Docker и интеграции его с Open WebUI.

Настройка LibreTranslate в Docker
---------------------------------

Чтобы настроить LibreTranslate в Docker, выполните следующие шаги:

### Шаг 1: Создайте файл Docker Compose

Создайте новый файл с именем `docker-compose.yml` в папке на ваш выбор. Добавьте следующую конфигурацию в файл:

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### Шаг 2: Создайте файл `stack.env`

Создайте новый файл с именем `stack.env` в той же папке, что и ваш файл `docker-compose.yml`. Добавьте следующую конфигурацию в файл:

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### Шаг 3: Запустите файл Docker Compose

Введите следующую команду, чтобы запустить сервис LibreTranslate:

```bash
docker-compose up -d
```

Это запустит сервис LibreTranslate в фоновом режиме.

Настройка интеграции в Open WebUI
--------------------------------

После того как вы запустили LibreTranslate в Docker, вы можете настроить интеграцию в Open WebUI. Доступно несколько интеграций, созданных сообществом, включая:

* [Функция фильтра LibreTranslate](https://openwebui.com/f/iamg30/libretranslate_filter)
* [Функция действия LibreTranslate](https://openwebui.com/f/jthesse/libretranslate_action)
* [Многоязычная функция действия LibreTranslate](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [Конвейер фильтров LibreTranslate](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

Выберите интеграцию, которая лучше всего подходит для ваших задач, и следуйте инструкциям по ее настройке в Open WebUI.

Поддерживаемые языки для конвейера и функций LibreTranslate:
На самом деле все языки, доступные в LibreTranslate, но вот список:
```
Албанский, арабский, азербайджанский, бенгальский, болгарский, каталанский, валенсийский, китайский, чешский, датский, нидерландский, английский, фламандский, эсперанто, эстонский, финский, французский, немецкий, греческий, иврит, хинди, венгерский, индонезийский, ирландский, итальянский, японский, корейский, латвийский, литовский, малайский, персидский, польский, португальский, румынский, молдавский, русский, словацкий, словенский, испанский, кастильский, шведский, тагальский, тайский, турецкий, украинский, урду
```

Устранение неполадок
-------------------

* Убедитесь, что сервис LibreTranslate запущен и доступен.
* Проверьте правильность конфигурации Docker.
* Проверьте журналы LibreTranslate на наличие ошибок.

Преимущества интеграции
----------------------

Интеграция LibreTranslate с Open WebUI предоставляет несколько преимуществ, включая:

* Возможности машинного перевода для широкого спектра языков.
* Улучшенный анализ текста и обработки.
* Расширенный функционал для задач, связанных с языком.

Заключение
----------

Интеграция LibreTranslate с Open WebUI — это простой процесс, который может расширить функциональность вашего экземпляра Open WebUI. Следуя шагам, изложенным в этом руководстве, вы сможете настроить LibreTranslate в Docker и интегрировать его с Open WebUI.
