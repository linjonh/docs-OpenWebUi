---
sidebar_position: 10
title: "SearXNG"
---

:::warning
Этот учебник создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для ваших конкретных нужд. Хотите внести вклад? Ознакомьтесь с учебником по внесению вклада.
:::

Данное руководство предоставляет инструкции по настройке возможностей веб-поиска в Open WebUI с использованием SearXNG в Docker.

## SearXNG (Docker)

> "**SearXNG — это бесплатный метапоисковик в интернете, агрегирующий результаты из различных поисковых сервисов и баз данных. Пользователи не отслеживаются и не профилируются.**"

## 1. Конфигурация SearXNG

Чтобы оптимально настроить SearXNG для использования с Open WebUI, выполните следующие шаги:

**Шаг 1: `git clone` репозиторий SearXNG Docker и перейдите в папку:**

1. Создайте новую директорию `searxng-docker`

Клонируйте репозиторий searxng-docker. Эта папка будет содержать ваши файлы конфигурации SearXNG. Обратитесь к [документации SearXNG](https://docs.searxng.org/) для инструкций по настройке.

```bash
git clone https://github.com/searxng/searxng-docker.git
```

Перейдите в репозиторий `searxng-docker`:

```bash
cd searxng-docker
```

**Шаг 2: Найдите и измените файл `.env`:**

1. Уберите комментарий с `SEARXNG_HOSTNAME` в файле `.env` и настройте его соответственно:

```bash
# По умолчанию слушается на https://localhost
# Чтобы изменить это:
# * уберите комментарий с SEARXNG_HOSTNAME и замените <host> на нужное имя хоста для SearXNG
# * уберите комментарий с LETSENCRYPT_EMAIL и замените <email> на вашу электронную почту (требуется для создания сертификата Lets Encrypt)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# Опционально:
# Если вы запускаете очень маленький или очень большой экземпляр, вы можете изменить количество процессов uwsgi и потоков на процесс
# Больше процессов (= workers) означает, что можно обрабатывать больше запросов одновременно, но это также увеличивает использование ресурсов

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**Шаг 3: Измените файл `docker-compose.yaml`**

3. Уберите ограничение `localhost`, изменив файл `docker-compose.yaml`:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**Шаг 4: Предоставьте необходимые разрешения**

4. Разрешите контейнеру создавать новые файлы конфигурации, запустив следующую команду в корневом каталоге:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**Шаг 5: Создайте файл `limiter.toml` без ограничений**

5. Создайте файл конфигурации `searxng-docker/searxng/limiter.toml` без ограничений:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# Этот конфигурационный файл обновляет файл конфигурации по умолчанию
# Смотрите https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# активировать метод link_token в методе ip_limit
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**Шаг 6: Удалите файл `settings.yml` по умолчанию**

6. Удалите файл `searxng-docker/searxng/settings.yml` по умолчанию, если он существует, поскольку он будет заново создан при первом запуске SearXNG:

```bash
rm searxng-docker/searxng/settings.yml
```

**Шаг 7: Создайте новый файл `settings.yml`**

:::note
При первом запуске необходимо удалить `cap_drop: - ALL` из файла `docker-compose.yaml`, чтобы служба `searxng` смогла успешно создать `/etc/searxng/uwsgi.ini`. Это необходимо, поскольку директива `cap_drop: - ALL` удаляет все полномочия, включая те, которые требуются для создания файла `uwsgi.ini`. После первого запуска рекомендуется снова добавить `cap_drop: - ALL` в файл `docker-compose.yaml` для обеспечения безопасности.
:::

7. Запустите контейнер временно, чтобы сгенерировать новый файл settings.yml:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**Шаг 8: Добавьте форматы и обновите номер порта**

8. Добавьте форматы HTML и JSON в файл `searxng-docker/searxng/settings.yml`:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

Сгенерируйте секретный ключ для вашего экземпляра SearXNG:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Пользователи Windows могут использовать следующий скрипт PowerShell для генерации секретного ключа:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

Обновите номер порта в разделе `server`, чтобы он соответствовал ранее установленному (в данном случае, `8080`):

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

Измените `bind_address` по желанию:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### Файлы конфигурации

#### searxng-docker/searxng/settings.yml (Извлечение)

Файл конфигурации `settings.yml` по умолчанию содержит множество настроек движка. Ниже приведен фрагмент того, как может выглядеть файл `settings.yml` по умолчанию:

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# см. https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url определяется переменной среды SEARXNG_BASE_URL, см. .env и docker-compose.yml
  secret_key: "ultrasecretkey"  # измените это!
  limiter: true  # можно отключить для приватной инстанции
  image_proxy: true
  port: 8080
  bind_address: "0.0.0.0"

ui:
  static_use_hash: true

search:
  safe_search: 0
  autocomplete: ""
  default_lang: ""
  formats:
    - html
    - json # json обязательно
  # удалите формат, чтобы запретить доступ, используйте нижний регистр.
  # formats: [html, csv, json, rss]
redis:
  # URL для подключения к базе данных Redis. Переопределяется ${SEARXNG_REDIS_URL}.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

Порт в файле settings.yml для SearXNG должен совпадать с номером порта в файле docker-compose.yml для SearXNG.

</details>

**Шаг 9: Обновите файл `uwsgi.ini`**

9. Убедитесь, что файл `searxng-docker/searxng/uwsgi.ini` соответствует следующему:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# Кто будет запускать код
uid = searxng
gid = searxng

# Количество рабочих процессов (обычно количество CPU)
# значение по умолчанию: %k (= количество ядер CPU, см. Dockerfile)
workers = %k

# Количество потоков на один рабочий процесс
# значение по умолчанию: 4 (см. Dockerfile)
threads = 4

# Права, предоставленные на созданный сокет
chmod-socket = 666

# Плагин для использования и конфигурация интерпретатора
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# Модуль для импорта
module = searx.webapp

# Виртуальное окружение и путь Python
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# автоматически устанавливать имя процесса на что-то значимое
auto-procname = true

# Отключить логирование запросов для конфиденциальности
disable-logging = true
log-5xx = true

# Установить максимальный размер запроса (исключая тело запроса)
buffer-size = 8192

# Нет постоянного подключения
# См. https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi обслуживает статические файлы
static-map = /static=/usr/local/searxng/searx/static
# срок действия установлен на один день
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. Альтернативная установка

В качестве альтернативы, если вы не хотите изменять конфигурацию по умолчанию, вы можете просто создать пустую папку `searxng-docker` и следовать остальным инструкциям по установке.

### Установка через Docker Compose

Добавьте следующие переменные окружения в ваш файл `docker-compose.yaml` для Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "searxng"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
      SEARXNG_QUERY_URL: "http://searxng:8080/search?q=<query>"
```

Создайте файл `.env` для SearXNG:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

Затем добавьте следующее в файл `docker-compose.yaml` для SearXNG:

```yaml
services:
  searxng:
    container_name: searxng
    image: searxng/searxng:latest
    ports:
      - "8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    env_file:
      - .env
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

Теперь ваш стек готов к запуску командой:

```bash
docker compose up -d
```

:::note
При первом запуске необходимо удалить `cap_drop: - ALL` из файла `docker-compose.yaml` для сервиса `searxng`, чтобы успешно создать файл `/etc/searxng/uwsgi.ini`. Это необходимо, так как директива `cap_drop: - ALL` удаляет все возможности, включая те, которые требуются для создания файла `uwsgi.ini`. После первого запуска рекомендуется вернуть `cap_drop: - ALL` в файл `docker-compose.yaml` по соображениям безопасности.
:::

В качестве альтернативы, вы можете запустить SearXNG напрямую с помощью команды `docker run`:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. Подтверждение подключения

Подтвердите подключение к SearXNG из вашего контейнера Open WebUI с помощью интерфейса командной строки:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. Конфигурация графического интерфейса

1. Перейдите в: `Admin Panel` -> `Settings` -> `Web Search`
2. Переключите `Enable Web Search`
3. Установите `Web Search Engine` в выпадающем меню на `searxng`
4. Установите `Searxng Query URL` на один из следующих примеров:

* `http://searxng:8080/search?q=<query>` (используя имя контейнера и открытый порт, подходит для сетапов на основе Docker)
* `http://host.docker.internal:8080/search?q=<query>` (используя DNS-имя `host.docker.internal` и порт хоста, подходит для сетапов на основе Docker)
* `http://<searxng.local>/search?q=<query>` (используя локальное доменное имя, подходит для локального сетевого доступа)
* `https://<search.domain.com>/search?q=<query>` (используя собственное доменное имя для самостоятельно размещённого экземпляра SearXNG, подходит для публичного или приватного доступа)

**Обратите внимание, часть `/search?q=<query>` является обязательной.**

5. Настройте значения для `Search Result Count` и `Concurrent Requests` в соответствии с вашими предпочтениями
6. Сохраните изменения

![Настройки интерфейса SearXNG](/images/tutorial_searxng_config.png)

## 5. Использование веб-поиска в чате

Чтобы получить доступ к веб-поиску, нажмите на + рядом с полем ввода сообщения.

Здесь вы можете включить или выключить веб-поиск.

![Переключатель веб-поиска](/images/web_search_toggle.png)

Следуя этим шагам, вы успешно настроите SearXNG с Open WebUI, что позволит вам выполнять веб-поиск, используя движок SearXNG.

#### Примечание

Вы должны явно включить или выключить эту функцию в чате.

Функция включается на сеанс, например, перезагрузка страницы или переход к другому чату отключит её.
