---
sidebar_position: 3
title: "⚙️ Válvulas"
---

# Válvulas

`Válvulas` (ver la página dedicada [Válvulas y UserValves](../features/plugin/valves/index.mdx)) también pueden ser configuradas para `Pipeline`. En resumen, las `Válvulas` son variables de entrada que se configuran por canalización.

Las `Válvulas` se configuran como una subclase de la clase `Pipeline`, y se inicializan como parte del método `__init__` de la clase `Pipeline`.

Cuando añadas válvulas a tu canalización, incluye una manera de garantizar que los administradores puedan reconfigurar las válvulas mediante la interfaz web. Hay varias opciones para esto:

- Utiliza `os.getenv()` para establecer una variable de entorno para usar en la canalización, y un valor predeterminado para usar si la variable de entorno no está configurada. Un ejemplo se muestra a continuación:

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- Configura la válvula con el tipo `Optional`, lo que permitirá que la canalización se cargue incluso si no se establece ningún valor para la válvula.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

Si no dejas una manera para que las válvulas se actualicen en la interfaz web, verás el siguiente error en el registro del servidor de Pipelines después de intentar agregar una canalización a la interfaz web:
`WARNING:root:No Pipeline class found in <pipeline name>`
