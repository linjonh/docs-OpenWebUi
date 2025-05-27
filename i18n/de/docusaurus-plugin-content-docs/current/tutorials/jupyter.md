---
sidebar_position: 321
title: "🐍 Jupyter Notebook Integration"
---

:::warnung
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

> [!WARNUNG]
> Diese Dokumentation wurde basierend auf der aktuellen Version (0.5.16) erstellt und wird ständig aktualisiert.


# Jupyter Notebook Integration

Ab Version v0.5.11 hat Open-WebUI eine neue Funktion namens `Jupyter Notebook Support in Code Interpreter` veröffentlicht. Diese Funktion ermöglicht die Integration von Open-WebUI mit Jupyter. Es gab bereits mehrere Verbesserungen dieser Funktion in den nachfolgenden Versionen, überprüfen Sie daher sorgfältig die Versionshinweise.

Dieses Tutorial führt Sie durch die Grundlagen der Einrichtung der Verbindung zwischen den beiden Diensten.

- [Versionshinweise v0.5.11 ansehen](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [Versionshinweise v0.5.15 ansehen](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## Was sind Jupyter Notebooks

Jupyter Notebook ist eine Open-Source-Webanwendung, die es Benutzern ermöglicht, Dokumente mit live ausführbarem Code, Gleichungen, Visualisierungen und narrativen Text zu erstellen und zu teilen. Es ist besonders beliebt in der Datenwissenschaft, wissenschaftlichen Berechnungen und Bildung, da es die Kombination von ausführbarem Code (in Sprachen wie Python, R oder Julia) mit erklärendem Text, Bildern und interaktiven Visualisierungen in einem einzigen Dokument ermöglicht. Jupyter Notebooks sind besonders nützlich für Datenanalyse und Exploration, da sie es Benutzern ermöglichen, Code in kleinen, handhabbaren Stücken auszuführen, während sie ihren Denkprozess und ihre Ergebnisse dokumentieren. Dieses Format erleichtert das Experimentieren, Debuggen von Code und Erstellen umfassender, teilbarer Berichte, die sowohl den Analyseprozess als auch die Ergebnisse demonstrieren.

Weitere Informationen finden Sie auf Jupyters Website: [Projekt Juptyer](https://jupyter.org/)

## Schritt 0: Konfigurationsübersicht

Hier ist die Zielkonfiguration, die wir in diesem Tutorial einrichten werden.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-code-execution.png)

# Schritt 1: Starten von OUI und Jupyter

Um dies zu erreichen, habe ich `docker-compose` verwendet, um einen Stack zu starten, der beide Dienste sowie meine LLMs enthält. Dies sollte jedoch auch funktionieren, wenn jeder Docker-Container getrennt ausgeführt wird.

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

Sie können den oben genannten Stack starten, indem Sie den folgenden Befehl im Verzeichnis ausführen, in dem die `docker-compose`-Datei gespeichert ist:

```bash title="Run docker-compose"
docker-compose up -d
```

Sie sollten nun auf beide Dienste unter den folgenden URLs zugreifen können:

| Dienst | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

Beim Zugriff auf den Jupyter-Dienst benötigen Sie das oben definierte `JUPYTER_TOKEN`. Für dieses Tutorial habe ich einen Dummy-Tokenwert von `123456` ausgewählt.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-token.png)

# Schritt 2: Konfiguration der Codeausführung für Jupyter

Jetzt, da Open-WebUI und Jupyter laufen, müssen wir Open-WebUIs Codeausführung unter Admin Panel -> Einstellungen -> Codeausführung so konfigurieren, dass Jupyter verwendet wird. Da Open-WebUI diese Funktion ständig erweitert und verbessert, empfehle ich, immer die möglichen Konfigurationen in der [`configs.py`-Datei](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) auf dem neuesten Stand zu überprüfen. Ab Version v0.5.16 umfasst dies Folgendes:

| Open-WebUI Env Var | Wert |
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

## Schritt 3: Verbindung testen

Beginnen wir damit, zu bestätigen, was sich in unserem Jupyter-Verzeichnis befindet. Wie Sie auf dem Bild unten sehen können, haben wir nur einen leeren `work`-Ordner.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-empty.png)

### Erstelle eine CSV-Datei

Lass uns unseren ersten Prompt ausführen. Stelle sicher, dass du die Schaltfläche `Code Execution` ausgewählt hast.

```
Prompt: Erstelle zwei CSV-Dateien mit gefälschten Daten. Die erste CSV sollte mit Vanilla-Python erstellt werden, die zweite CSV sollte mit der Pandas-Bibliothek erstellt werden. Nenne die CSVs data1.csv und data2.csv.
```

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-create-csv.png)

Wir können sehen, dass die CSVs erstellt wurden und jetzt innerhalb von Jupyter zugänglich sind.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-view-csv.png)

### Erstelle eine Visualisierung

Lass uns unseren zweiten Prompt ausführen. Wähle erneut die Schaltfläche `Code Execution` aus.

```
Prompt: Erstelle mehrere Visualisierungen in Python mithilfe von Matplotlib und Seaborn und speichere sie in Jupyter.
```

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-create-viz.png)

Wir können sehen, dass die Visualisierungen erstellt wurden und jetzt innerhalb von Jupyter zugänglich sind.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-view-viz.png)

### Erstelle ein Notebook

Lass uns zusammen unseren letzten Prompt ausführen. In diesem Prompt erstellen wir ein komplett neues Notebook, nur mithilfe eines Prompts.

```
Prompt: Schreibe Python-Code, um JSON-Dateien zu lesen und zu schreiben, und speichere dies in meinem Notebook namens notebook.ipynb.
```

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-create-notebook.png)

Wir können sehen, dass die Visualisierungen erstellt wurden und jetzt innerhalb von Jupyter zugänglich sind.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-view-notebook.png)

## Hinweis zum Workflow

Beim Testen dieser Funktion habe ich mehrmals bemerkt, dass Open-WebUI den Code oder die in Open-WebUI generierten Ausgaben nicht automatisch in meiner Jupyter-Instanz speichert. Um zu erzwingen, dass die von mir erstellte Datei/das Element ausgegeben wird, habe ich häufig diesen zweistufigen Workflow befolgt, der zuerst das gewünschte Code-Artefakt erstellt und dann fordert, es in meiner Jupyter-Instanz zu speichern.

![Code Execution Configuration](/images/tutorials/jupyter/jupyter-workflow.png)

## Wie nutzt du diese Funktion?

Verwendest du die Code Execution-Funktion und/oder Jupyter? Wenn ja, melde dich bitte. Ich würde gerne hören, wie du sie nutzt, damit ich weiterhin Beispiele zu diesem Tutorial hinzufügen kann, die zeigen, wie man diese Funktion auf andere großartige Arten verwenden kann!
