
# Использование Podman

Podman — это бездемонный контейнерный движок для разработки, управления и запуска OCI-контейнеров.

## Основные команды

- **Запуск контейнера:**

  ```bash
  podman run -d --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
  ```

- **Список работающих контейнеров:**

  ```bash
  podman ps
  ```

## Сетевые настройки с Podman

Если возникают проблемы с сетью, используйте slirp4netns для настройки сетевых параметров пода, чтобы контейнер мог получить доступ к портам вашего компьютера.

Убедитесь, что у вас [установлен slirp4netns](https://github.com/rootless-containers/slirp4netns?tab=readme-ov-file#install), удалите предыдущий контейнер, если он существует, с помощью `podman rm` и запустите новый контейнер с

```bash
  podman run -d --network=slirp4netns:allow_host_loopback=true --name openwebui -p 3000:8080 -v open-webui:/app/backend/data ghcr.io/open-webui/open-webui:main
```

Если вы используете Ollama с вашего компьютера (не внутри контейнера),

После входа в open-webui перейдите в Настройки > Настройки администратора > Соединения и создайте новое API-соединение Ollama на `http://10.0.2.2:[OLLAMA PORT]`. По умолчанию порт Ollama — 11434.


Обратитесь к [документации Podman](https://podman.io/) для получения информации о расширенных настройках.
