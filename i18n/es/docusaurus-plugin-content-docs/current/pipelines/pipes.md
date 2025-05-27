---
sidebar_position: 2
title: "🔧 Pipes"
---

# Pipes
Los Pipes son funciones que se pueden usar para realizar acciones antes de devolver mensajes de LLM al usuario. Ejemplos de posibles acciones que se pueden realizar con Pipes son Recuperación de Generación Aumentada (RAG), enviar solicitudes a proveedores de LLM que no sean OpenAI (como Anthropic, Azure OpenAI o Google), o ejecutar funciones directamente en la interfaz web. Los Pipes pueden alojarse como una Función o en un servidor de Pipelines. Se mantiene una lista de ejemplos en el [repositorio de Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/pipelines). El flujo de trabajo general se puede ver en la siguiente imagen.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="Flujo de Trabajo de Pipe" />
  </a>
</p>

Los Pipes definidos en tu WebUI aparecen como un nuevo modelo con una designación "Externa" adjunta a ellos. Un ejemplo de dos modelos de Pipe, `Database RAG Pipeline` y `DOOM`, se puede ver a continuación junto a dos modelos autogestionados:

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="Modelos de Pipe en WebUI" />
  </a>
</p>
