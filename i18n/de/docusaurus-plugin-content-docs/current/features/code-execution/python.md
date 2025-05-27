---
sidebar_position: 2
title: "🐍 Python Code-Ausführung"
---

# 🐍 Python Code-Ausführung

## Übersicht

Open WebUI ermöglicht die clientseitige Ausführung von Python-Code im Browser, indem Pyodide verwendet wird, um Skripte innerhalb eines Codeblocks in einem Chat auszuführen. Diese Funktion ermöglicht es großen Sprachmodellen (LLMs), Python-Skripte zu generieren, die direkt im Browser ausgeführt werden können, und dabei eine Vielzahl von Bibliotheken zu nutzen, die von Pyodide unterstützt werden.

Um die Privatsphäre und Flexibilität der Nutzer zu gewährleisten, spiegelt Open WebUI PyPI-Pakete, um direkte externe Netzwerk-Anfragen zu vermeiden. Dieser Ansatz ermöglicht auch die Nutzung von Pyodide in Umgebungen ohne Internetzugang.

Das Open-WebUI-Frontend enthält eine eigenständige WASM (WebAssembly)-Python-Umgebung, die von Pyodide betrieben wird und grundlegende Python-Skripte ausführen kann, die von LLMs generiert werden. Diese Umgebung ist benutzerfreundlich und erfordert keine zusätzliche Konfiguration oder Installation.

## Unterstützte Bibliotheken

Die Pyodide-Code-Ausführung ist so konfiguriert, dass nur Pakete geladen werden, die in scripts/prepare-pyodide.js konfiguriert sind und anschließend zu "CodeBlock.svelte" hinzugefügt werden. Die folgenden Pyodide-Pakete werden derzeit von Open WebUI unterstützt:

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

Mit diesen Bibliotheken können verschiedene Aufgaben wie Datenmanipulation, maschinelles Lernen und Web-Scraping durchgeführt werden. Wenn das Paket, das Sie ausführen möchten, nicht in dem Pyodide enthalten ist, das wir mit Open WebUI bereitstellen, kann das Paket nicht verwendet werden.

## Ausführung von Python-Code aufrufen

Um Python-Code auszuführen, bitten Sie ein LLM innerhalb eines Chats, ein Python-Skript für Sie zu schreiben. Sobald das LLM den Code generiert hat, erscheint oben rechts im Codeblock ein `Run`-Button. Durch Klicken auf diesen Button wird der Code mit Pyodide ausgeführt. Um das Ergebnis am unteren Ende eines Codeblocks anzuzeigen, stellen Sie sicher, dass mindestens eine Druckanweisung (`print`) im Code enthalten ist, um ein Ergebnis darzustellen.

## Tipps zur Nutzung der Python Code-Ausführung

* Beachten Sie beim Schreiben von Python-Code, dass dieser in einer Pyodide-Umgebung ausgeführt wird. Sie können dem LLM dies mitteilen, indem Sie beim Anfordern von Code die "Pyodide-Umgebung" erwähnen.
* Recherchieren Sie in der Pyodide-Dokumentation, um die Möglichkeiten und Einschränkungen der Umgebung zu verstehen.
* Experimentieren Sie mit verschiedenen Bibliotheken und Skripten, um die Möglichkeiten der Python-Code-Ausführung in Open WebUI zu erkunden.

## Pyodide-Dokumentation

* [Pyodide-Dokumentation](https://pyodide.org/en/stable/)

## Code-Beispiel

Hier ist ein Beispiel für ein einfaches Python-Skript, das mit Pyodide ausgeführt werden kann:

```python
import pandas as pd

# Erstellen Sie ein Beispiel-DataFrame
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# Drucken Sie das DataFrame
print(df)
```

Dieses Skript erstellt ein Beispiel-DataFrame mit pandas und gibt es unterhalb des Codeblocks innerhalb Ihres Chats aus.

## Erweiterung der Liste unterstützter Bibliotheken

Möchten Sie die Grenzen des Möglichen erweitern? Um die Liste unterstützter Bibliotheken zu erweitern, folgen Sie diesen Schritten:

1. **Gabeln Sie das Pyodide-Repository**, um Ihre eigene Version zu erstellen.
2. **Wählen Sie neue Pakete** aus der bestehenden Liste von Paketen innerhalb von Pyodide oder erkunden Sie hochwertige Pakete, die Open WebUI derzeit fehlen.
3. **Integrieren Sie die neuen Pakete** in Ihr gegabeltes Repository, um noch mehr Möglichkeiten zu erschließen.
