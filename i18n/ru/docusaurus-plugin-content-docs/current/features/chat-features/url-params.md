---
sidebar_position: 5
title: "🔗 Параметры URL"
---

В Open WebUI сеансы чата можно настраивать с помощью различных параметров URL. Эти параметры позволяют установить определённые конфигурации, включить функции и определить настройки модели для каждого сеанса чата. Такой подход предоставляет гибкость и контроль над отдельными сеансами чата непосредственно из URL.

## Обзор параметров URL

Следующая таблица перечисляет доступные параметры URL, их функции и примеры использования.

| **Параметр**      | **Описание**                                                                  | **Пример**                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | Указывает модели для использования в виде списка, разделённого запятыми.                     | `/?models=model1,model2`         |
| `model`            | Указывает одну модель для использования в сеансе чата.                       | `/?model=model1`                 |
| `youtube`          | Указывает ID видео на YouTube для его транскрипции в чате.                 | `/?youtube=VIDEO_ID`             |
| `web-search`       | Включает функцию веб-поиска, если установлено значение `true`.                              | `/?web-search=true`              |
| `tools` или `tool-ids` | Указывает список ID инструментов, которые нужно активировать в чате, разделённый запятыми.          | `/?tools=tool1,tool2`            |
| `call`             | Включает наложение звонка, если установлено значение `true`.                                        | `/?call=true`                    |
| `q`                | Устанавливает начальный запрос или подсказку для чата.                                   | `/?q=Hello%20there`              |
| `temporary-chat`   | Отмечает чат как временный, если установлено значение `true`, для одноразового использования.            | `/?temporary-chat=true`          |

### 1. **Модели и выбор модели**

- **Описание**: Параметры `models` и `model` позволяют указать, какие [языковые модели](/features/workspace/models.md) следует использовать для конкретного сеанса чата.
- **Как задать**: Вы можете использовать либо `models` для нескольких моделей, либо `model` для одной модели.
- **Пример**:
  - `/?models=model1,model2` – Инициализирует чат с `model1` и `model2`.
  - `/?model=model1` – Устанавливает `model1` в качестве единственной модели для чата.

### 2. **Транскрипция YouTube**

- **Описание**: Параметр `youtube` принимает ID видео на YouTube, позволяя чату транскрибировать указанное видео.
- **Как задать**: Используйте ID видео на YouTube в качестве значения для этого параметра.
- **Пример**: `/?youtube=VIDEO_ID`
- **Поведение**: Этот параметр активирует функцию транскрипции в чате для указанного видео на YouTube.

### 3. **Веб-поиск**

- **Описание**: Включение `web-search` позволяет чату использовать функции [веб-поиска](/category/-web-search).
- **Как задать**: Установите параметр `true`, чтобы включить веб-поиск.
- **Пример**: `/?web-search=true`
- **Поведение**: Если включено, чат может использовать результаты веб-поиска как часть своих ответов.

### 4. **Выбор инструментов**

- **Описание**: Параметры `tools` или `tool-ids` указывают, какие [инструменты](/features/plugin/tools) активировать в чате.
- **Как задать**: Перечислите ID инструментов через запятую в качестве значения параметра.
- **Пример**: `/?tools=tool1,tool2` или `/?tool-ids=tool1,tool2`
- **Поведение**: Каждый ID инструмента будет активирован в сеансе для взаимодействия пользователя.

### 5. **Наложение звонка**

- **Описание**: Параметр `call` включает наложение видео или звонка в интерфейсе чата.
- **Как задать**: Задайте параметр как `true`, чтобы включить наложение звонка.
- **Пример**: `/?call=true`
- **Поведение**: Активирует интерфейс наложения звонка, позволяя функции, такие как живая транскрипция и ввод видео.

### 6. **Начальный запрос**

- **Описание**: Параметр `q` позволяет задать начальный запрос или подсказку для чата.
- **Как задать**: Укажите текст запроса или подсказки в качестве значения параметра.
- **Пример**: `/?q=Hello%20there`
- **Поведение**: Чат запускается с указанной подсказкой, автоматически отправляя её как первое сообщение.

### 7. **Временные сеансы чата**

- **Описание**: Параметр `temporary-chat` отмечает сеанс чата как временный. Это может ограничить такие функции, как сохранение истории чата или применение постоянных настроек.
- **Как задать**: Установите этот параметр как `true` для временного сеанса чата.
- **Пример**: `/?temporary-chat=true`
- **Поведение**: Инициирует одноразовый сеанс чата без сохранения истории или применения сложных настроек.

<details>
<summary>Пример использования</summary>
:::tip **Временный сеанс чата**
Предположим, пользователь хочет начать быстрый чат, не сохраняя историю. Он может сделать это, установив `temporary-chat=true` в URL. Это обеспечивает одноразовую среду чата, идеально подходящую для одноразовых взаимодействий.
:::
</details>

## Использование нескольких параметров вместе

Эти параметры URL можно комбинировать для создания высоко настроенных сеансов чата. Например:

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hello%20there&temporary-chat=true
```

Этот URL выполнит следующие действия:

- Инициализирует чат с использованием `model1` и `model2`.
- Включит транскрипцию с YouTube, веб-поиск и указанные инструменты.
- Отобразит оверлей для звонка.
- Установит начальный запрос "Hello there."
- Пометит чат как временный, избегая сохранения истории.
