---
sidebar_position: 31
title: "🛌 Интеграция с Amazon Bedrock"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного использования. Хотите внести свой вклад? Ознакомьтесь с учебником по внесению вклада.
:::

---

# Интеграция Open-WebUI с Amazon Bedrock

В этом учебнике мы изучим один из самых популярных способов интеграции Open-WebUI с Amazon Bedrock.

## Предварительные требования


Для того чтобы следовать этому учебнику, у вас должны быть следующие элементы:

- Активная учетная запись AWS
- Активный ключ доступа AWS Access Key и секретный ключ Secret Key
- Полномочия IAM в AWS для активации моделей Bedrock или уже активированные модели
- Установленный Docker на вашей системе


## Что такое Amazon Bedrock

Прямо с сайта AWS:

"Amazon Bedrock — это полностью управляемый сервис, который предлагает выбор высокопроизводительных базовых моделей (FMs) от ведущих ИИ-компаний, таких как AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside (скоро будет доступно), Stability AI и Amazon через единый API, а также широкий набор возможностей, необходимых для создания генеративных ИИ-приложений с учетом безопасности, конфиденциальности и ответственного подхода к ИИ. Используя Amazon Bedrock, вы можете легко экспериментировать и оценивать топовые FM для вашего использования, настраивать их под свои данные с помощью таких техник, как тонкая настройка или Retrieval Augmented Generation (RAG), и создавать агентов, выполняющих задачи с использованием ваших корпоративных систем и источников данных. Поскольку Amazon Bedrock является серверлесс-решением, вам не нужно управлять инфраструктурой, а вы можете безопасно интегрировать и внедрять генеративные ИИ-возможности в ваши приложения, используя уже знакомые вам сервисы AWS."

Чтобы узнать больше о Bedrock, посетите: [Официальную страницу Amazon Bedrock](https://aws.amazon.com/bedrock/)

# Шаги по интеграции

## Шаг 1: Убедитесь в наличии доступа к базовым моделям Amazon Bedrock

Прежде чем мы сможем интегрироваться с Bedrock, вам сначала нужно убедиться, что у вас есть доступ по крайней мере к одной, а лучше к нескольким доступным базовым моделям. На момент написания (февраль 2025 года) было доступно 47 базовых моделей. Вы можете увидеть на скриншоте ниже, что у меня есть доступ ко многим моделям. Вы узнаете, есть ли у вас доступ к модели, если рядом с моделью стоит отметка "✅ Access Granted". Если у вас нет доступа к моделям, вы получите ошибку на следующем шаге.

AWS предоставляет хорошую документацию по запросу доступа/активации этих моделей здесь: [Документация по доступу к моделям Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Базовые модели Amazon Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## Шаг 2: Настройка Bedrock Access Gateway

Теперь, когда у нас есть доступ по крайней мере к одной базовой модели Bedrock, нам нужно настроить Bedrock Access Gateway, или BAG. Вы можете представить BAG как своего рода прокси или посреднический слой, разработанный AWS, который оборачивает нативные конечные точки/SDK AWS для Bedrock и, в свою очередь, предоставляет конечные точки, совместимые со схемой OpenAI, что требуется Open-WebUI.

Для справки, вот простая таблица соответствия между конечными точками:

| Конечная точка OpenAI | Метод Bedrock             |
|-----------------------|--------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse или converse_stream    |
| `/embeddings`           | invoke_model               |

Репозиторий BAG доступен здесь: [Bedrock Access Gateway Repo](https://github.com/aws-samples/bedrock-access-gateway)

Чтобы настроить BAG, выполните следующие шаги:
- Клонируйте репозиторий BAG
- Удалите файл `dockerfile` по умолчанию
- Переименуйте файл `Dockerfile_ecs` в `Dockerfile`

Теперь мы готовы создать и запустить докер-контейнер с помощью:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

Теперь вы сможете получить доступ к swagger-странице BAG по адресу: http://localhost:8000/docs

![Swagger Bedrock Access Gateway](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## Шаг 3: Добавление подключения в Open-WebUI

Теперь, когда BAG работает, пора добавить его как новое подключение в Open-WebUI.

- В панели администратора перейдите в Настройки -> Connections.
- Используйте кнопку "+" (плюс), чтобы добавить новое подключение в разделе OpenAI.
- Для URL используйте "http://host.docker.internal:8000/api/v1"
- Для пароля используйте значение "bedrock" по умолчанию, указанное в BAG. Вы всегда можете изменить этот пароль в настройках BAG (см. DEFAULT_API_KEYS).
- Нажмите кнопку "Verify Connection", и вы должны увидеть сообщение "Server connection verified" в правом верхнем углу.

![Добавить новое соединение](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## Шаг 4: Начните использовать базовые модели Bedrock

Теперь вы должны видеть все доступные модели Bedrock!

![Использовать модели Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## Другие полезные обучающие материалы

Вот несколько других полезных руководств по интеграции Open-WebUI с Amazon Bedrock.

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
