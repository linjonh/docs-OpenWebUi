---
sidebar_position: 3
title: "⚙️ Vannes"
---

# Vannes

`Vannes` (voir la page dédiée [Vannes & UserValves](../features/plugin/valves/index.mdx)) peuvent également être définies pour un `Pipeline`. En bref, les `Vannes` sont des variables d'entrée définies par pipeline.

Les `Vannes` sont définies comme une sous-classe de la classe `Pipeline`, et initialisées dans le cadre de la méthode `__init__` de la classe `Pipeline`.

Lors de l'ajout de vannes à votre pipeline, incluez une méthode permettant de s'assurer que les vannes peuvent être reconfigurées par les administrateurs dans l'interface utilisateur web. Voici quelques options pour cela :

- Utilisez `os.getenv()` pour définir une variable d'environnement à utiliser pour le pipeline, et une valeur par défaut à utiliser si la variable d'environnement n'est pas définie. Un exemple est donné ci-dessous :

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- Définissez la vanne avec le type `Optional`, ce qui permettra au pipeline de se charger même si aucune valeur n'est définie pour cette vanne.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

Si vous ne laissez pas de méthode pour mettre à jour les vannes dans l'interface utilisateur web, vous verrez l'erreur suivante dans le journal du serveur des Pipelines après avoir essayé d'ajouter un pipeline dans l'interface utilisateur web :
`WARNING:root:No Pipeline class found in <pipeline name>`
