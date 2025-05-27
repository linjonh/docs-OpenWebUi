---
sidebar_position: 3
title: "⚙️ 밸브"
---

# 밸브

`밸브` (전용 [밸브 & 유저밸브](../features/plugin/valves/index.mdx) 페이지 참조)는 `파이프라인`에도 설정할 수 있습니다. 간단히 말해서, `밸브`는 파이프라인별로 설정된 입력 변수입니다.

`밸브`는 `Pipeline` 클래스의 하위 클래스로 설정되며, `Pipeline` 클래스의 `__init__` 메서드의 일부로 초기화됩니다.

파이프라인에 밸브를 추가할 때는 관리자들이 웹 UI에서 밸브를 재구성할 수 있도록 하는 방법을 포함하세요. 여기에 몇 가지 옵션이 있습니다:

- `os.getenv()`을 사용하여 파이프라인에서 사용할 환경 변수를 설정하고, 환경 변수가 설정되지 않은 경우 사용할 기본값을 설정합니다. 아래에 예제가 있습니다:

```python
self.valves = self.Valves(
    **{
        "LLAMAINDEX_OLLAMA_BASE_URL": os.getenv("LLAMAINDEX_OLLAMA_BASE_URL", "http://localhost:11434"),
        "LLAMAINDEX_MODEL_NAME": os.getenv("LLAMAINDEX_MODEL_NAME", "llama3"),
        "LLAMAINDEX_EMBEDDING_MODEL_NAME": os.getenv("LLAMAINDEX_EMBEDDING_MODEL_NAME", "nomic-embed-text"),
    }
)
```

- 밸브를 `Optional` 타입으로 설정하여 밸브에 값을 설정하지 않아도 파이프라인이 로드되도록 합니다.

```python
class Pipeline:
    class Valves(BaseModel):
        target_user_roles: List[str] = ["user"]
        max_turns: Optional[int] = None
```

웹 UI에서 밸브를 업데이트 할 방법을 남겨두지 않으면, 웹 UI에 파이프라인을 추가한 후 파이프라인 서버 로그에서 다음과 같은 에러를 보게 됩니다:
`WARNING:root:No Pipeline class found in <pipeline name>`
