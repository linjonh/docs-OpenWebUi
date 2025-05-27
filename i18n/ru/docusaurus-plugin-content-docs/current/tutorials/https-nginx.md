---
sidebar_position: 200
title: "🔒 HTTPS через Nginx"
---

:::warning
Этот учебник создан сообществом и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для конкретного использования. Хотите внести свой вклад? Ознакомьтесь с учебником по внесению изменений.
:::

# HTTPS через Nginx

Обеспечение безопасной связи между вашими пользователями и Open WebUI имеет первостепенное значение. HTTPS (HyperText Transfer Protocol Secure) шифрует передаваемые данные, защищая их от перехвата и подделки. Настраивая Nginx как обратный прокси-сервер, вы можете легко добавить HTTPS к вашему развертыванию Open WebUI, повышая безопасность и надежность.

Это руководство предлагает три метода настройки HTTPS:

- **Самоподписанные сертификаты**: подходит для разработки и внутреннего использования, с использованием Docker.
- **Lets Encrypt**: идеально для производственных сред, где требуются доверенные SSL-сертификаты, с использованием Docker.
- **Windows+Самоподписанные**: упрощённые инструкции для разработки и внутреннего использования на Windows, Docker не требуется.

Выберите метод, который лучше всего соответствует вашим требованиям к развертыванию.


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx Proxy Manager">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="Самоподписанные">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## Следующие шаги

После настройки HTTPS, заходите в Open WebUI безопасно по адресу:

- [https://localhost](https://localhost)

Убедитесь, что ваши DNS-записи правильно настроены, если вы используете имя домена. Для производственных сред рекомендуется использовать Lets Encrypt для доверенных SSL-сертификатов.

---
