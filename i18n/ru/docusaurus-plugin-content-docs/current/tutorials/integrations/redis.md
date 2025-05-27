---
sidebar_position: 30
title: "🔗 Поддержка Redis Websocket"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI под ваши специфические задачи. Хотите внести свой вклад? Ознакомьтесь с руководством по вкладу.
:::

# 🔗 Поддержка Redis Websocket

## Общая информация

На этой странице документации описаны шаги, необходимые для интеграции Redis с Open WebUI для поддержки websocket. Следуя этим шагам, вы сможете включить функцию websocket в вашем экземпляре Open WebUI, что позволит обеспечить обмен сообщениями и обновления в реальном времени между клиентами и вашим приложением.

### Необходимые условия

* Действующий экземпляр Open WebUI (версии 1.0 или выше)
* Контейнер Redis (в данном примере мы используем `docker.io/valkey/valkey:8.0.1-alpine`, который основан на последнем выпуске Redis 7.x)
* Установленный Docker Composer (версии 2.0 или выше)
* Сеть Docker для обеспечения связи между Open WebUI и Redis
* Базовые знания о Docker, Redis и Open WebUI

## Настройка Redis

Чтобы настроить Redis для поддержки websocket, вам нужно создать файл `docker-compose.yml` со следующим содержимым:

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Заметки

Директива `ports` отсутствует в этой конфигурации, так как в большинстве случаев она не требуется. Сервис Redis будет доступен внутри сети Docker для службы Open WebUI. Однако, если вам необходимо получить доступ к экземпляру Redis извне сети Docker (например, для отладки или мониторинга), можно добавить директиву `ports`, чтобы открыть порт Redis (например, `6379:6379`).

Конфигурация устанавливает контейнер Redis с именем `redis-valkey` и подключает том для сохранения данных. Директива `healthcheck` обеспечивает перезапуск контейнера, если он перестает отвечать на команду `ping`. Опция команды `--save 30 1` сохраняет базу данных Redis на диск каждые 30 минут при условии, что хотя бы один ключ был изменен.

:::

Чтобы создать сеть Docker для связи между Open WebUI и Redis, выполните следующую команду:

```bash
docker network create openwebui-network
```

## Настройка Open WebUI

Чтобы включить поддержку websocket в Open WebUI, вам нужно установить следующие переменные окружения для вашего экземпляра Open WebUI:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

Эти переменные окружения включают поддержку websocket, указывают Redis как менеджер websocket и определяют URL-адрес Redis. Убедитесь, что вы заменили значение `WEBSOCKET_REDIS_URL` на фактический IP-адрес вашего экземпляра Redis.

При использовании Docker для запуска Open WebUI подключите его к той же сети Docker:

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

Замените `127.0.0.1` на фактический IP-адрес вашего контейнера Redis в сети Docker.

## Проверка

Если вы правильно настроили Redis и Open WebUI, то при запуске вашего экземпляра Open WebUI вы должны увидеть следующее сообщение в логах:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

Это подтверждает, что Open WebUI использует Redis для управления websocket. Вы также можете использовать команду `docker exec`, чтобы проверить, работает ли экземпляр Redis и принимает ли подключения:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

Эта команда должна вывести `PONG`, если экземпляр Redis работает корректно. Если команда не работает, попробуйте следующую:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Устранение неполадок

Если вы столкнулись с проблемами с Redis или поддержкой websocket в Open WebUI, обратитесь к следующим ресурсам для устранения неполадок:

* [Документация Redis](https://redis.io/docs)
* [Документация Docker Compose](https://docs.docker.com/compose/overview/)
* [Документация sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html)
