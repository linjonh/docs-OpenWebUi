---
sidebar_position: 13
title: "⚛️ Расширение Continue.dev VSCode с Open WebUI"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для конкретного случая использования. Хотите внести вклад? Ознакомьтесь с учебником по внесению изменений.
:::

# Интеграция расширения Continue.dev VSCode с Open WebUI

### Скачивание расширения

Вы можете скачать расширение VSCode здесь на [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)

После установки у вас должен появиться вкладка 'continue' в боковой панели. Откройте её.

Щелкните на селектор помощника над главным вводом чата. Затем наведите курсор на "Локальный помощник", и вы увидите значок настроек (выглядит как шестеренка).

После нажатия на значок настроек файл `config.yaml` должен открыться в редакторе.

Здесь вы сможете настроить использование Open WebUI с помощью Continue.

---

В настоящее время провайдер 'ollama' не поддерживает аутентификацию, поэтому мы не можем использовать этот провайдер с Open WebUI.

Тем не менее Ollama и Open WebUI оба совместимы со спецификацией API OpenAI. Вы можете посмотреть пост в блоге от Ollama [здесь](https://ollama.com/blog/openai-compatibility) на эту тему.

Мы все еще можем настроить Continue для использования провайдера openai, который позволит нам использовать токен аутентификации Open WebUI.

---

## Конфигурация

В `config.yaml` вам нужно будет добавить/изменить следующие параметры.

### Измените провайдера на openai

```yaml
provider: openai
```

### Добавьте или обновите параметр apiBase

Установите это значение на домен вашего Open WebUI в конце.

```yaml
apiBase: http://localhost:3000/ #Если вы следовали инструкциям Getting Started Docker
```

### Добавьте apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # Замените вашим API ключом
```

Вы можете найти и сгенерировать ваш API ключ через Open WebUI -> Настройки -> Аккаунт -> API ключи

Вам нужно будет скопировать "API ключ" (он начинается с sk-)

## Пример конфигурации

Вот базовый пример config.yaml, использующего Open WebUI через провайдера openai. Используется модель Granite Code.
Убедитесь, что вы предварительно загрузили модель в свои экземпляры ollama.

```yaml
name: Локальный помощник
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Модель ABC из конвейера
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Granite Code Автодополнение
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: тест
    description: Напишите модульные тесты для выделенного кода
    prompt: |
      Напишите полный набор модульных тестов для выделенного кода. Они должны включать настройку, выполнение тестов для проверки правильности, включая важные крайние случаи, и завершение. Убедитесь, что тесты полные и сложные. Дайте тесты только как выходной чат, не редактируйте какие-либо файлы.
```

Сохраните ваш `config.yaml`, и всё готово!

Теперь вы должны видеть вашу модель в выборе моделей вкладки Continue.

Выберите её, и теперь вы должны начать общение через Open WebUI (и/или любые [конвейеры](/pipelines), которые вы настроили).

Вы можете сделать это для стольких моделей, сколько пожелаете. Хотя любая модель должна работать, лучше использовать модель, разработанную для кода.

См. документацию continue для дополнительной конфигурации continue, [Документация Continue](https://docs.continue.dev/reference/Model%20Providers/openai)
