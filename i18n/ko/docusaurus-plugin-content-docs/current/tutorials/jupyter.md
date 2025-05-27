---
sidebar_position: 321
title: "🐍 Jupyter Notebook 통합"
---

:::warning
이 튜토리얼은 커뮤니티 기여로 생성되었으며 Open WebUI 팀에서 지원하지 않습니다. 특정 사용 사례에 맞게 Open WebUI를 사용자 정의하는 방법을 보여주기 위한 데모로만 제공됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인해보세요.
:::

> [!WARNING]
> 이 문서는 현재 버전(0.5.16)을 기반으로 작성되었으며 지속적으로 업데이트되고 있습니다.


# Jupyter Notebook 통합

v0.5.11부터 Open-WebUI는 `코드 해석기에서 Jupyter Notebook 지원`이라는 새로운 기능을 출시했습니다. 이 기능은 Open-WebUI와 Jupyter를 통합할 수 있는 기능을 제공합니다. 후속 릴리스에서 이 기능에 대해 여러 개선 사항이 있었으므로 릴리스 노트 내용을 주의 깊게 검토하십시오.

이 튜토리얼은 두 서비스 간의 연결을 설정하는 기초에 대해 안내합니다.

- [v0.5.11 릴리스 노트 보기](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [v0.5.15 릴리스 노트 보기](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## Jupyter Notebook이란 무엇인가

Jupyter Notebook은 실행 가능한 코드, 공식, 시각화 및 서술 텍스트가 포함된 문서를 생성하고 공유할 수 있도록 하는 오픈 소스 웹 애플리케이션입니다. 이는 특히 데이터 과학, 과학 계산 및 교육에서 널리 사용되며, Python, R, Julia와 같은 언어로 실행 가능한 코드를 설명 텍스트, 이미지 및 인터랙티브 시각화와 하나의 문서로 결합할 수 있게 해 줍니다. Jupyter Notebook은 사용자가 분석 과정과 결과를 보여주는 포괄적이고 공유 가능한 보고서를 생성하는 동시에 코드 디버깅 및 실험을 쉽게 수행할 수 있도록 하기 때문에 데이터 분석 및 탐구에 특히 유용합니다.

Jupyter 웹사이트에서 더 많은 정보를 확인하세요: [Project Juptyer](https://jupyter.org/)

## 단계 0: 설정 요약

이 튜토리얼을 통해 설정하려는 목표 구성을 아래에 표시합니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-code-execution.png)

# 단계 1: OUI와 Jupyter 실행

`docker-compose`를 사용하여 두 서비스와 내 LLM을 포함하는 스택을 실행했습니다. 별도의 도커 컨테이너를 각각 실행해도 작동해야 합니다.

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

위의 스택은 `docker-compose` 파일이 저장된 디렉토리에서 아래 명령어를 실행하여 시작할 수 있습니다:

```bash title="docker-compose 실행"
docker-compose up -d
```

이제 다음 URL에서 두 서비스를 이용할 수 있어야 합니다:

| 서비스 | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

Jupyter 서비스를 이용할 때 위에서 정의한 `JUPYTER_TOKEN`이 필요합니다. 이 튜토리얼에서는 `123456`이라는 더미 토큰 값을 선택했습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-token.png)

# 단계 2: Jupyter를 위한 코드 실행 구성

이제 Open-WebUI와 Jupyter를 실행했으니, Open-WebUI의 코드 실행을 Admin Panel -> Settings -> Code Execution에서 Jupyter를 사용할 수 있도록 구성해야 합니다. Open-WebUI는 지속적으로 이 기능을 개선하고 있으므로, 최신 설정을 확인하기 위해 [`configs.py` 파일](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72)을 항상 검토하는 것을 권장합니다. v0.5.16 기준으로 설정은 다음과 같습니다:

| Open-WebUI 환경 변수 | 값 |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## 단계 3: 연결 테스트

우선 Jupyter 디렉토리에 무엇이 있는지 확인해 보겠습니다. 아래 이미지에서 볼 수 있듯이 현재는 빈 `work` 폴더만 있습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-empty.png)

### CSV 파일 생성

첫 번째 프롬프트를 실행해 봅시다. `Code Execution` 버튼을 선택했는지 확인하세요.

```
프롬프트: 가짜 데이터를 사용하여 두 개의 CSV 파일을 생성하세요. 첫 번째 CSV는 기본 파이썬을 사용하여 생성하고, 두 번째 CSV는 pandas 라이브러리를 사용하여 생성하세요. CSV 파일 이름은 각각 data1.csv와 data2.csv로 하세요.
```

![코드 실행 구성](/images/tutorials/jupyter/jupyter-create-csv.png)

CSV 파일이 생성되었으며 현재 Jupyter에서 액세스할 수 있음을 확인할 수 있습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-view-csv.png)

### 시각화 생성

두 번째 프롬프트를 실행해 봅시다. 다시 한 번, `Code Execution` 버튼을 선택했는지 확인하세요.

```
프롬프트: matplotlib과 seaborn을 사용하여 파이썬에서 여러 가지 시각화를 생성하고 이를 jupyter에 저장하세요.
```

![코드 실행 구성](/images/tutorials/jupyter/jupyter-create-viz.png)

시각화가 생성되었으며 현재 Jupyter에서 액세스할 수 있음을 확인할 수 있습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-view-viz.png)

### 노트북 생성

마지막 프롬프트를 함께 실행해 봅시다. 이번 프롬프트에서는 프롬프트만 사용하여 완전히 새 노트북을 생성합니다.

```
프롬프트: json 파일을 읽고 쓰는 파이썬 코드를 작성하고 이를 notebook.ipynb라는 이름의 내 노트북에 저장하세요.
```

![코드 실행 구성](/images/tutorials/jupyter/jupyter-create-notebook.png)

시각화가 생성되었으며 현재 Jupyter에서 액세스할 수 있음을 확인할 수 있습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-view-notebook.png)

## 워크플로우에 대한 참고 사항

이 기능을 테스트하면서 Open-WebUI에서 생성된 코드나 출력을 내 Jupyter 인스턴스에 자동으로 저장하지 않는 경우가 여러 번 있음을 알게 되었습니다. 제가 생성한 파일/항목을 출력하도록 강제하려면, 먼저 원하는 코드 아티팩트를 생성한 다음 이를 Jupyter 인스턴스에 저장하도록 요청하는 두 단계의 워크플로를 자주 따랐습니다.

![코드 실행 구성](/images/tutorials/jupyter/jupyter-workflow.png)

## 이 기능을 어떻게 사용하고 계신가요?

Code Execution 기능과/또는 Jupyter를 사용 중이신가요? 그렇다면 꼭 연락 주세요. 이 기능을 사용하는 다른 멋진 방법의 예를 이 튜토리얼에 계속 추가할 수 있도록 여러분의 사용 사례를 듣고 싶습니다!
