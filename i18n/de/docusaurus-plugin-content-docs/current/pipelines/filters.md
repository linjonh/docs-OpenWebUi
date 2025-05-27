---
sidebar_position: 1
title: "🚰 Filter"
---

# Filter

Filter werden verwendet, um Aktionen gegen eingehende Benutzernachrichten und ausgehende Assistenten (LLM)-Nachrichten durchzuführen. Mögliche Aktionen, die in einem Filter durchgeführt werden können, umfassen das Senden von Nachrichten an Überwachungsplattformen (wie Langfuse oder DataDog), das Ändern von Nachrichteninhalten, das Blockieren von toxischen Nachrichten, das Übersetzen von Nachrichten in eine andere Sprache oder das Begrenzen der Nachrichtenrate von bestimmten Benutzern. Eine Liste von Beispielen wird im [Pipelines-Repo](https://github.com/open-webui/pipelines/tree/main/examples/filters) bereitgestellt. Filter können als Funktion oder auf einem Pipelines-Server ausgeführt werden. Der allgemeine Workflow ist im Bild unten dargestellt.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="Filter-Workflow" />
  </a>
</p>

Wenn eine Filter-Pipeline auf einem Modell oder Rohr aktiviert ist, wird die eingehende Nachricht vom Benutzer (oder "Inlet") zur Verarbeitung an den Filter weitergeleitet. Der Filter führt die gewünschte Aktion an der Nachricht aus, bevor die Chat-Komplettierung vom LLM-Modell angefordert wird. Schließlich führt der Filter eine Nachbearbeitung der ausgehenden LLM-Nachricht (oder "Outlet") durch, bevor diese an den Benutzer gesendet wird.
