---
sidebar_position: 5
title: "Google PSE"
---

:::warning
Этот урок является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного использования. Хотите внести вклад? Ознакомьтесь с руководством по вкладу.
:::

## Google PSE API

### Настройка

1. Перейдите в Google Developers, воспользуйтесь [Programmable Search Engine](https://developers.google.com/custom-search), и войдите в систему или создайте аккаунт.
2. Перейдите на [панель управления](https://programmablesearchengine.google.com/controlpanel/all) и нажмите кнопку `Add`.
3. Введите имя поисковой системы, задайте другие параметры в соответствии с вашими потребностями, подтвердите, что вы не робот, и нажмите кнопку `Create`.
4. Сгенерируйте `API key` и получите `Search engine ID`. (Доступно после создания поисковой системы)
5. С `API key` и `Search engine ID` откройте `панель администратора Open WebUI` и нажмите вкладку `Settings`, затем нажмите `Web Search`.
6. Включите `Web search` и установите `Web Search Engine` на `google_pse`.
7. Заполните `Google PSE API Key` ключом `API key` и `Google PSE Engine Id` (# 4).
8. Нажмите `Save`.

![Панель администратора Open WebUI](/images/tutorial_google_pse1.png)

#### Примечание

Вы должны включить `Web search` в поле подсказки, используя кнопку плюс (`+`).
Ищите в интернете ;-)

![включить Web search](/images/tutorial_google_pse2.png)
