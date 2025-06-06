---
sidebar_position: 320
title: "🪣 Переключение на хранилище S3"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного кейса использования. Хотите внести свой вклад? Ознакомьтесь с руководством по внесению изменений.
:::

# 🪣 Переключение на хранилище S3

В этом руководстве изложены инструкции о том, как переключить стандартное хранилище `local` в конфигурации Open WebUI на Amazon S3.

## Предварительные требования

Для выполнения этого учебника вам понадобится:

- Активная учетная запись AWS
- Активный AWS Access Key и Secret Key
- IAM-разрешения в AWS для создания и отправки объектов в S3
- Установленный Docker на вашем устройстве

## Что такое Amazon S3

Прямо с веб-сайта AWS:

"Amazon S3 — это сервис объектного хранилища, который предлагает лидирующую в отрасли масштабируемость, доступность данных, безопасность и производительность. Храните и защищайте любые объемы данных для различных вариантов использования, таких как озера данных, веб-сайты, облачно-ориентированные приложения, резервное копирование, архивирование, машинное обучение и аналитика. Amazon S3 разработан для обеспечения 99.999999999% (11 девяток) устойчивости и хранит данные для миллионов клиентов по всему миру."

Чтобы узнать больше о S3, посетите: [Официальная страница Amazon S3](https://aws.amazon.com/s3/)

# Как настроить

## 1. Необходимые переменные окружения

Для настройки этой опции необходимо собрать следующие переменные окружения:

| **Переменная окружения Open-WebUI** | **Пример значения**                          |
|------------------------------------|---------------------------------------------|
| `S3_ACCESS_KEY_ID`                 | ABC123                                      |
| `S3_SECRET_ACCESS_KEY`             | SuperSecret                                 |
| `S3_ENDPOINT_URL`                  | https://s3.us-east-1.amazonaws.com          |
| `S3_REGION_NAME`                   | us-east-1                                   |
| `S3_BUCKET_NAME`                   | my-awesome-bucket-name                      |

- S3_ACCESS_KEY_ID: Идентификатор вашего ключа доступа AWS. Вы получаете его из консоли управления AWS или AWS CLI при создании ключа доступа.
- S3_SECRET_ACCESS_KEY: Секретная часть пары ключей доступа AWS. Она предоставляется при создании ключа доступа в AWS и должна храниться в надежном месте.
- S3_ENDPOINT_URL: Этот URL ведет к вашему конечному пункту службы S3, который обычно можно найти в документации или настройках учетной записи AWS.
- S3_REGION_NAME: Регион AWS, где находится ваш S3-бакет, например, "us-east-1". Вы можете найти эту информацию в консоли управления AWS в деталях своего S3-бакета.
- S3_BUCKET_NAME: Уникальное имя вашего S3-бакета, указанное вами при его создании в AWS.

Полный список доступных URL-адресов конечных пунктов S3 можно найти здесь: [Обычные конечные пункты Amazon S3](https://docs.aws.amazon.com/general/latest/gr/s3.html)

Просмотрите все опции конфигурации `Cloud Storage` здесь: [Open-WebUI Cloud Storage Config](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Запустите Open-WebUI

Перед запуском экземпляра Open-WebUI необходимо установить еще одну переменную окружения `STORAGE_PROVIDER`. Эта переменная сообщает Open-WebUI, какого провайдера вы хотите использовать. По умолчанию `STORAGE_PROVIDER` остается пустым, что означает использование локального хранилища.

| **Провайдер хранения** | **Тип** | **Описание**                                                                                   | **По умолчанию** |
|-----------------------|---------|-------------------------------------------------------------------------------------------------|------------------|
| `local`               | str     | По умолчанию используется локальное хранилище, если предоставлена пустая строка (`' '`)         | Да              |
| `s3`                  | str     | Использует клиентскую библиотеку S3 и связанные переменные окружения, упомянутые в разделе Amazon S3 Storage | Нет             |
| `gcs`                 | str     | Использует клиентскую библиотеку GCS и связанные переменные окружения, упомянутые в разделе Google Cloud Storage | Нет             |

Чтобы использовать Amazon S3, необходимо установить `STORAGE_PROVIDER` в значение "S3", а также все переменные окружения, собранные в шаге 1 (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`).

Здесь я также устанавливаю `ENV` в значение "dev", что позволит нам увидеть документацию Swagger Open-WebUI и дополнительно протестировать настройку хранилища S3, чтобы убедиться, что она работает как ожидалось.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="my-awesome-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. Проверка настроек

Теперь, когда Open-WebUI запущен, давайте загрузим простой текстовый файл `Hello, World` и протестируем наши настройки.

![Загрузка файла в Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

И убедимся, что мы получаем ответ от выбранной LLM.

![Получение ответа в Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

Отлично! Похоже, все работает как ожидалось в Open-WebUI. Теперь давайте проверим, действительно ли текстовый файл был загружен и сохранен в указанном S3-букете. Используя AWS Management Console, мы можем увидеть, что теперь в S3-букете есть файл. Помимо имени загруженного файла (`hello.txt`), вы можете увидеть, что имя объекта было дополнено уникальным идентификатором. Таким образом Open-WebUI отслеживает все загруженные файлы.

![Получение ответа в Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Используя swagger-документы Open-WebUI, мы можем получить всю информацию, связанную с этим файлом, используя конечную точку `/api/v1/files/{id}` и передав уникальный идентификатор (4405fabb-603e-4919-972b-2b39d6ad7f5b).

![Просмотр файла по ID](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
