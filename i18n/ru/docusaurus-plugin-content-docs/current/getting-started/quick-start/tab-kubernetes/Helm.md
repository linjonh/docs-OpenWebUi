
# Настройка Helm для Kubernetes

Helm помогает управлять приложениями Kubernetes.

## Требования

- Кластер Kubernetes настроен.
- Helm установлен.

## Шаги

1. **Добавьте репозиторий Open WebUI Helm:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Установите чарт Open WebUI:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **Проверьте установку:**

   ```bash
   kubectl get pods
   ```

:::warning

Если вы планируете масштабировать Open WebUI, используя несколько узлов/подов/воркеров в кластерной среде, вам необходимо настроить NoSQL key-value базу данных.
Есть некоторые [переменные окружения](https://docs.openwebui.com/getting-started/env-configuration/), которые нужно установить на одинаковые значения для всех экземпляров сервисов, в противном случае могут возникнуть проблемы с консистентностью, ошибочные сессии и другие проблемы!

:::

## Доступ к WebUI

Настройте перенаправление портов или балансировку нагрузки, чтобы получить доступ к Open WebUI извне кластера.
