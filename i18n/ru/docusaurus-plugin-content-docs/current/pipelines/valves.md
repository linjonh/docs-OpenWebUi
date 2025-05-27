---
sidebar_position: 3
title: "⚙️ Клапаны"
---

# Клапаны

`Клапаны` (см. посвященную страницу [Valves & UserValves](../features/plugin/valves/index.mdx)) также могут быть установлены для `Pipeline`. Кратко, `Клапаны` — это входные переменные, которые задаются для каждого конвейера.

`Клапаны` задаются как подкласс класса `Pipeline` и инициализируются как часть метода `__init__` класса `Pipeline`.

При добавлении клапанов в ваш конвейер, включите способ, который позволит администраторам перенастраивать клапаны в веб-интерфейсе. Существует несколько вариантов для этого:

- Использовать `os.getenv()` для установки переменной окружения, которая будет использоваться для конвейера, и значение по умолчанию, если переменная окружения не задана. Пример приведен ниже:

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- Задавать клапан как тип `Optional`, что позволит конвейеру загружаться, даже если значение для клапана не задано.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

Если вы не оставите способ обновления клапанов в веб-интерфейсе, то в журнале сервера Pipelines появится следующая ошибка после попытки добавления конвейера в веб-интерфейс:
`WARNING:root:No Pipeline class found in <pipeline name>`
