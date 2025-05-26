---
sidebar_position: 3
title: "⚙️ 阀门"
---

# 阀门

`阀门`（请参阅专门的 [阀门和用户阀门](../features/plugin/valves/index.mdx) 页面）也可以为 `Pipeline` 设置。简单来说，`阀门` 是针对每个管道设置的输入变量。

`阀门` 是作为 `Pipeline` 类的子类设置的，并在 `Pipeline` 类的 `__init__` 方法中初始化。

为管道添加阀门时，请确保管理员可以通过 web UI 对阀门进行重新配置。以下是几种可选方案：

- 使用 `os.getenv()` 设置用于管道的环境变量，并设置一个默认值，以备环境变量未设置时使用。以下是一个示例：

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- 将阀门设置为 `Optional` 类型，这将允许管道在未设置阀门值的情况下加载。

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

如果您未留出一个方式让阀门在 web UI 中进行更新，那么在尝试将管道添加到 web UI 后，您将在管道服务器日志中看到以下错误：
`WARNING:root:No Pipeline class found in <pipeline name>`
