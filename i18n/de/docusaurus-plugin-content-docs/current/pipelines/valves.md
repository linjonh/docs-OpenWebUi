---
sidebar_position: 3
title: "⚙️ Ventile"
---

# Ventile

`Ventile` (siehe die spezifische Seite [Ventile & BenutzerVentile](../features/plugin/valves/index.mdx)) können auch für die `Pipeline` festgelegt werden. Kurz gesagt, `Ventile` sind Eingabevariablen, die pro Pipeline festgelegt werden.

`Ventile` werden als Unterklasse der `Pipeline`-Klasse definiert und als Teil der `__init__`-Methode der `Pipeline`-Klasse initialisiert.

Wenn Sie Ventile zu Ihrer Pipeline hinzufügen, stellen Sie sicher, dass Administratoren sie in der Web-UI neu konfigurieren können. Hierfür gibt es einige Optionen:

- Verwenden Sie `os.getenv()`, um eine Umgebungsvariable für die Pipeline festzulegen, und legen Sie einen Standardwert fest, falls die Umgebungsvariable nicht gesetzt ist. Ein Beispiel ist unten dargestellt:

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- Setzen Sie das Ventil auf den Typ `Optional`, sodass die Pipeline geladen werden kann, auch wenn kein Wert für das Ventil festgelegt ist.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

Wenn Sie keine Möglichkeit lassen, Ventile in der Web-UI zu aktualisieren, wird nach dem Hinzufügen einer Pipeline zur Web-UI folgender Fehler im Pipelines-Server-Log angezeigt:
`WARNING:root:No Pipeline class found in <pipeline name>`
