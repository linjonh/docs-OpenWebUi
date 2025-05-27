---
sidebar_position: 3
title: "⚙️ バルブ"
---

# バルブ

`Valves`（専用の[Valves & UserValves](../features/plugin/valves/index.mdx)ページを参照）も`Pipeline`に設定できます。簡単に言えば、`Valves`はパイプラインごとに設定される入力変数です。

`Valves`は`Pipeline`クラスのサブクラスとして設定され、`Pipeline`クラスの`__init__`メソッドの一部として初期化されます。

パイプラインにバルブを追加する際には、ウェブUIで管理者がバルブを再構成できる方法を含める必要があります。以下のような選択肢があります：

- `os.getenv()`を使用して環境変数をパイプラインで使用するよう設定し、環境変数が設定されていない場合はデフォルト値を使用する方法。以下に例を示します：

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- バルブを`Optional`型に設定し、バルブに値が設定されていなくてもパイプラインがロードできるようにする方法。

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

もしウェブUIでバルブを更新する方法を考慮しない場合、以下のようなエラーがパイプラインサーバのログに表示されます：
`WARNING:root:No Pipeline class found in <pipeline name>`
