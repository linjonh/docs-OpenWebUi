---
sidebar_position: 3
title: "⚙️ 閥門"
---

# 閥門

`閥門`（請參閱專用的[閥門與使用者閥門](../features/plugin/valves/index.mdx)頁面）也可以設定於`Pipeline`。簡而言之，`閥門`是每個管線都被設定的輸入變數。

`閥門`被設定為`Pipeline`類的子類，並在`Pipeline`類的`__init__`方法中初始化。

在向您的管線添加閥門時，需包括一種方式，以確保閥門能夠由管理員在網頁UI中重新配置。以下是幾個選項：

- 使用`os.getenv()`設定管線要使用的環境變數，並設定當環境變數未被設置時需使用的默認值。一個範例如下：

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- 將閥門設為`Optional`類型，這將允許即使閥門未設置任何值，管線仍然加載。

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

如果您未提供在網頁UI中更新閥門的方式，則在嘗試將管線添加到網頁UI後，您將在管線伺服器日誌中看到以下錯誤：
`WARNING:root:No Pipeline class found in <pipeline name>`
