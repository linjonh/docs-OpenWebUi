---
sidebar_position: 20
title: "💥 Мониторинг и отладка с Langfuse"
---

# Интеграция Langfuse с Open WebUI

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) предлагает решения для наблюдаемости и оценки качества с открытым исходным кодом для Open WebUI. Включив интеграцию с Langfuse, вы можете отслеживать данные вашего приложения с помощью Langfuse для разработки, мониторинга и улучшения использования Open WebUI, включая:

- [Трассировки](https://langfuse.com/docs/tracing) приложений
- Паттерны использования
- Данные о стоимости по пользователю и модели
- Повторение сессий для поиска и исправления ошибок
- [Оценки](https://langfuse.com/docs/scores/overview)

## Как интегрировать Langfuse с Open WebUI

![Интеграция Langfuse](https://langfuse.com/images/docs/openwebui-integration.gif)
_Шаги интеграции Langfuse_

[Pipelines](https://github.com/open-webui/pipelines/) в Open WebUI — это фреймворк, независимый от пользовательского интерфейса, для плагинов OpenAI API. Он позволяет внедрение плагинов, которые перехватывают, обрабатывают и перенаправляют пользовательские запросы в конечную языковую модель (LLM), обеспечивая расширенный контроль и настройку работы с запросами.

Чтобы отслеживать данные вашего приложения с Langfuse, вы можете использовать [конвейер Langfuse](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py), который позволяет в режиме реального времени мониторить и анализировать взаимодействия сообщений.

## Краткое руководство по началу работы

### Шаг 1: Настройка Open WebUI

Убедитесь, что Open WebUI запущен. Для этого ознакомьтесь с [документацией Open WebUI](https://docs.openwebui.com/).

### Шаг 2: Настройка Pipelines

Запустите [Pipelines](https://github.com/open-webui/pipelines/) с помощью Docker. Используйте следующую команду для запуска Pipelines:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### Шаг 3: Соединение Open WebUI с Pipelines

В _Настройках администратора_ создайте новое соединение типа OpenAI API и сохраните его с следующими данными:

- **URL:**`http://host.docker.internal:9099` (это адрес ранее запущенного Docker контейнера).
- **Пароль:** 0p3n-w3bu! (стандартный пароль)

![Настройки Open WebUI](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### Шаг 4: Добавление Langfuse Filter Pipeline

Далее, перейдите в _Настройки администратора_ -> _Pipelines_ и добавьте Langfuse Filter Pipeline. Укажите, что Pipelines слушает на`http://host.docker.internal:9099` (как было настроено ранее) и установите [Langfuse Filter Pipeline](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py), используя опцию _Install from Github URL_ с следующим URL:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

Теперь добавьте ваши API-ключи Langfuse ниже. Если вы еще не зарегистрировались в Langfuse, вы можете получить свои API-ключи, создав аккаунт [здесь](https://cloud.langfuse.com).

![Open WebUI добавление Langfuse Pipeline](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**Примечание:** Чтобы фиксировать использование (количество токенов) для моделей OpenAi при включенной потоковой передаче, вам нужно перейти в настройки модели в Open WebUI и отметить поле "Usage" [ссылку](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586) ниже пункта _Capabilities_._

### Шаг 5: Просмотр трассировок в Langfuse

Теперь вы можете взаимодействовать с вашим приложением Open WebUI и видеть трассировки в Langfuse.

[Пример трассировки](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) в интерфейсе Langfuse:

![Пример трассировки Open WebUI в Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## Узнайте больше

Для получения полного руководства о Pipelines в Open WebUI посетите [этот пост](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/).
