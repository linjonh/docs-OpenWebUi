## Быстрый старт с Docker 🐳

Следуйте этим шагам, чтобы установить Open WebUI с помощью Docker.

## Шаг 1: Загрузка образа Open WebUI

Начните с загрузки последнего Docker-образа Open WebUI из реестра контейнеров GitHub.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## Шаг 2: Запуск контейнера

Запустите контейнер с настройками по умолчанию. Эта команда включает маппинг тома для обеспечения постоянного хранения данных.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### Важные Флаги

- **Маппинг тома (`-v open-webui:/app/backend/data`)**: Обеспечивает постоянное хранение ваших данных. Это предотвращает потерю данных между перезапусками контейнера.
- **Маппинг портов (`-p 3000:8080`)**: Открывает доступ к WebUI на порту 3000 вашей локальной машины.

### Использование GPU

Для поддержки GPU Nvidia добавьте `--gpus all` в команду `docker run`:

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### Однопользовательский режим (отключение входа)

Чтобы обойти страницу входа в режиме одного пользователя, установите переменную окружения `WEBUI_AUTH` в значение `False`:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
Вы не можете переключаться между однопользовательским режимом и режимом мультиаккаунтов после этого изменения.
:::

#### Расширенная конфигурация: Подключение к Ollama на другом сервере

Чтобы подключить Open WebUI к серверу Ollama, расположенному на другом хосте, добавьте переменную окружения `OLLAMA_BASE_URL`:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## Доступ к WebUI

После запуска контейнера, откройте доступ к Open WebUI по адресу:

[http://localhost:3000](http://localhost:3000)

Для подробной помощи по каждому флагу Docker, смотрите [документацию Docker](https://docs.docker.com/engine/reference/commandline/run/).
