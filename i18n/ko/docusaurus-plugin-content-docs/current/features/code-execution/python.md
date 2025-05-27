---
sidebar_position: 2
title: "🐍 Python 코드 실행"
---

# 🐍 Python 코드 실행

## 개요

Open WebUI는 브라우저에서 고객 측면에서 Python 코드를 실행할 수 있도록 하며, Pyodide를 사용하여 채팅 내 코드 블록에서 스크립트를 실행할 수 있게 합니다. 이 기능은 대규모 언어 모델(LLMs)이 브라우저에서 직접 실행할 수 있는 Python 스크립트를 생성할 수 있도록 하며, Pyodide가 지원하는 다양한 라이브러리를 활용할 수 있습니다.

사용자 개인정보와 유연성을 유지하기 위해 Open WebUI는 PyPI 패키지를 미러링하여 외부 네트워크 요청을 직접적으로 피합니다. 이 접근법은 인터넷 접속이 없는 환경에서도 Pyodide를 사용할 수 있도록 합니다.

Open WebUI 프론트엔드는 Pyodide로 구동되는 독립적인 WASM (WebAssembly) Python 환경을 포함하며, LLMs가 생성한 기본적인 Python 스크립트를 실행할 수 있습니다. 이 환경은 추가적인 설치나 준비 과정 없이도 사용이 간편하도록 설계되었습니다.

## 지원되는 라이브러리

Pyodide 코드 실행은 scripts/prepare-pyodide.js에 구성된 패키지만 로드되도록 설정되며 이후 "CodeBlock.svelte"에 추가됩니다. 현재 Open WebUI에서 지원되는 Pyodide 패키지는 다음과 같습니다:

* micropip
* packaging
* requests
* beautifulsoup4
* numpy
* pandas
* matplotlib
* scikit-learn
* scipy
* regex

이러한 라이브러리는 데이터 조작, 머신러닝, 웹 스크레이핑 등의 다양한 작업을 수행하는 데 사용될 수 있습니다. Open WebUI와 함께 제공되는 Pyodide에 컴파일되지 않은 패키지는 사용할 수 없습니다.

## Python 코드 실행 호출

Python 코드를 실행하려면 채팅 내에서 LLM에게 Python 스크립트를 작성하도록 요청하십시오. LLM이 코드를 생성하면 코드 블록의 오른쪽 상단에 `실행` 버튼이 나타납니다. 이 버튼을 클릭하면 Pyodide를 사용하여 코드가 실행됩니다. 코드 블록 하단에 결과를 표시하려면 코드 내에 최소 하나의 print 문을 포함시켜 결과를 표시해야 합니다.

## Python 코드 실행 사용 팁

* Python 코드를 작성할 때 코드가 실행될 때 Pyodide 환경에서 실행된다는 점을 염두에 두십시오. 코드를 요청할 때 "Pyodide 환경"이라고 언급하여 LLM에게 알릴 수 있습니다.
* Pyodide 문서를 조사하여 환경의 기능과 제한 사항을 이해하십시오.
* 다양한 라이브러리와 스크립트를 실험하여 Open WebUI를 통해 Python 코드 실행 가능성을 탐색하십시오.

## Pyodide 문서

* [Pyodide 문서](https://pyodide.org/en/stable/)

## 코드 예제

다음은 Pyodide를 사용하여 실행할 수 있는 간단한 Python 스크립트 예제입니다:

```python
import pandas as pd

# 샘플 데이터프레임 생성
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# 데이터프레임 출력
print(df)
```

이 스크립트는 pandas를 사용하여 샘플 데이터프레임을 생성하고 채팅 내 코드 블록 아래에 출력합니다.

## 지원되는 라이브러리 목록 확장

가능성의 경계를 넘어 확장하고 싶으신가요? 지원되는 라이브러리 목록을 확장하려면 다음 단계를 따르십시오:

1. **Pyodide 저장소를 포크**하여 개인 버전을 생성하십시오.
2. Pyodide 내 기존 패키지 목록에서 **새로운 패키지 선택**하거나 Open WebUI에서 현재 누락된 고품질 패키지를 탐색하십시오.
3. 포크된 저장소에 **새로운 패키지 통합**하여 더욱 많은 가능성을 열어보십시오.
