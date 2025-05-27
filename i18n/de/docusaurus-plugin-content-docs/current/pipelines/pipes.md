---
sidebar_position: 2
title: "🔧 Pipes"
---

# Pipes
Pipes sind Funktionen, die verwendet werden können, um Aktionen durchzuführen, bevor LLM-Nachrichten an den Benutzer zurückgegeben werden. Beispiele für mögliche Aktionen, die Sie mit Pipes durchführen können, sind Retrieval Augmented Generation (RAG), das Senden von Anfragen an Nicht-OpenAI-LLM-Anbieter (wie Anthropic, Azure OpenAI oder Google) oder das Ausführen von Funktionen direkt in Ihrer Web-UI. Pipes können als Funktion oder auf einem Pipeline-Server gehostet werden. Eine Liste von Beispielen wird im [Pipelines-Repository](https://github.com/open-webui/pipelines/tree/main/examples/pipelines) gepflegt. Der allgemeine Workflow ist im Bild unten dargestellt.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="Pipe-Workflow" />
  </a>
</p>

Pipes, die in Ihrer WebUI definiert sind, erscheinen als neues Modell mit einer "Extern"-Bezeichnung. Ein Beispiel für zwei Pipe-Modelle, `Database RAG Pipeline` und `DOOM`, ist unten neben zwei selbst gehosteten Modellen zu sehen:

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="Pipe-Modelle in der WebUI" />
  </a>
</p>
