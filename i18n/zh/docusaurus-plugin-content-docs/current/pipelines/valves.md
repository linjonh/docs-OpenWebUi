---
sidebar_position: 3
title: "⚙️ 阀门"
---

# 阀门

`阀门`（参见专门的[阀门和用户阀门](../features/plugin/valves/index.mdx)页面）也可以为`Pipeline`设置。简而言之，`阀门`是每个流水线设置的输入变量。

`阀门`作为`Pipeline`类的子类设置，并在`Pipeline`类的`__init__`方法中初始化。

在向流水线添加阀门时，请包括一种方法以确保管理员可以通过Web UI重新配置阀门。以下是几个选项：

- 使用`os.getenv()`为流水线设置一个环境变量，并设置一个默认值作为备用，如果环境变量未设置则使用该默认值。如下所示的例子：

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- 将阀门设置为`Optional`类型，这将允许流水线加载，即使未为阀门设置值。

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

如果你没有留下在Web UI中更新阀门的方法，在尝试将流水线添加到Web UI后，你将在流水线服务器日志中看到以下错误：
`WARNING:root:No Pipeline class found in <pipeline name>`
