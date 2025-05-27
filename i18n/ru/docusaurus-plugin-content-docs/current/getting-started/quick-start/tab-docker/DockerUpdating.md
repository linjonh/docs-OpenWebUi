## Обновление

Чтобы обновить вашу локальную установку Docker до последней версии, вы можете использовать **Watchtower** или вручную обновить контейнер.

### Вариант 1: Использование Watchtower

С помощью [Watchtower](https://containrrr.dev/watchtower/) вы можете автоматизировать процесс обновления:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(Замените `open-webui` на имя вашего контейнера, если оно отличается.)_

### Вариант 2: Ручное обновление

1. Остановите и удалите текущий контейнер:

   ```bash
   docker rm -f open-webui
   ```

2. Скачайте последнюю версию:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. Запустите контейнер снова:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

Оба метода позволят обновить ваш Docker до последней сборки и запустить его.
