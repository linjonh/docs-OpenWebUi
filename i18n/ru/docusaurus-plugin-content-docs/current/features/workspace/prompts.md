---
sidebar_position: 2
title: "📚 Подсказки"
---

Раздел `Подсказки` в `Рабочем пространстве` Open WebUI позволяет пользователям создавать, управлять и делиться пользовательскими подсказками. Эта функция упрощает взаимодействие с моделями ИИ, позволяя сохранять часто используемые подсказки и легко получать к ним доступ через команды со слэшем.

### Управление подсказками

Интерфейс Подсказок предоставляет несколько ключевых функций для управления пользовательскими подсказками:

* **Создание**: Разрабатывайте новые подсказки с настраиваемыми заголовками, уровнями доступа и содержанием.
* **Поделитесь**: Делитесь подсказками с другими пользователями в зависимости от настроенных разрешений доступа.
* **Контроль доступа**: Установите видимость и разрешения на использование для каждой подсказки (подробнее см. в разделе [Разрешения](./permissions.md)).
* **Команды со слэшем**: Быстро получайте доступ к подсказкам, используя пользовательские команды со слэшем во время чата.

### Создание и редактирование подсказок

При создании или редактировании подсказки вы можете настроить следующие параметры:

* **Заголовок**: Присвойте вашей подсказке описательное название для легкой идентификации.
* **Доступ**: Установите уровень доступа, чтобы контролировать, кто может видеть и использовать подсказку.
* **Команда**: Определите команду со слэшем, которая будет запускать подсказку (например, `/summarize`).
* **Содержание подсказки**: Напишите текст подсказки, который будет отправлен модели.

### Переменные подсказок

Open WebUI поддерживает динамические переменные подсказок, которые можно включать в ваши подсказки:

* **Содержимое буфера обмена**: Используйте `{{CLIPBOARD}}` для вставки содержимого из буфера обмена.
* **Дата и время**:
  * `{{CURRENT_DATE}}`: Текущая дата
  * `{{CURRENT_DATETIME}}`: Текущая дата и время
  * `{{CURRENT_TIME}}`: Текущее время
  * `{{CURRENT_TIMEZONE}}`: Текущая временная зона
  * `{{CURRENT_WEEKDAY}}`: Текущий день недели
* **Информация о пользователе**:
  * `{{USER_NAME}}`: Имя текущего пользователя
  * `{{USER_LANGUAGE}}`: Выбранный язык пользователя
  * `{{USER_LOCATION}}`: Местоположение пользователя (требуется HTTPS и переключатель в Настройки > Интерфейс)

### Руководство по использованию переменных

* Обрамляйте переменные двойными фигурными скобками: `{{переменная}}`
* Переменная `{{USER_LOCATION}}` требует:
  * Защищенного соединения HTTPS
  * Включения функции в Настройки > Интерфейс
* Переменная `{{CLIPBOARD}}` требует разрешения на доступ к буферу обмена с вашего устройства

### Контроль доступа и разрешения

Управление подсказками контролируется следующими настройками разрешений:

* **Доступ к подсказкам**: Пользователям требуется разрешение `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS` для создания и управления подсказками.
* Для получения подробной информации о настройке разрешений см. [документацию по разрешениям](./permissions.md).

### Лучшие практики

* Используйте четкие, описательные заголовки для подсказок
* Создавайте интуитивно понятные команды со слэшем, отражающие цель подсказки
* Документируйте любые специфические требования или ожидаемые входные данные в описании подсказки
* Тестируйте подсказки с различными комбинациями переменных, чтобы убедиться, что они работают должным образом
* Внимательно подходите к уровням доступа при совместном использовании подсказок с другими пользователями - общедоступный доступ означает, что подсказка будет автоматически отображаться для всех пользователей, когда они вводят `/` в чате, поэтому избегайте создания слишком большого их количества.
