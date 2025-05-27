---
sidebar_position: 3
title: "⚙️ Válvulas"
---

# Válvulas

`Válvulas` (veja a página dedicada [Válvulas & UserValves](../features/plugin/valves/index.mdx)) também podem ser definidas para o `Pipeline`. Em resumo, `Válvulas` são variáveis de entrada configuradas por pipeline.

`Válvulas` são definidas como uma subclasse da classe `Pipeline` e inicializadas como parte do método `__init__` da classe `Pipeline`.

Ao adicionar válvulas ao seu pipeline, inclua uma forma de garantir que as válvulas possam ser reconfiguradas pelos administradores na interface web. Há algumas opções para isso:

- Use `os.getenv()` para definir uma variável de ambiente a ser usada no pipeline e um valor padrão a ser usado caso a variável de ambiente não esteja configurada. Um exemplo pode ser visto abaixo:

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- Defina a válvula como do tipo `Optional`, o que permitirá que o pipeline seja carregado mesmo que nenhum valor seja configurado para a válvula.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

Se você não deixar uma forma de atualizar as válvulas na interface web, verá o seguinte erro no log do servidor de Pipelines após tentar adicionar um pipeline na interface web:
`WARNING:root:No Pipeline class found in <pipeline name>`
