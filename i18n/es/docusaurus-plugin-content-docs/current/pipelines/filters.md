---
sidebar_position: 1
title: "🚰 Filtros"
---

# Filtros

Los filtros se utilizan para realizar acciones contra los mensajes entrantes de los usuarios y los mensajes salientes del asistente (LLM). Las acciones potenciales que se pueden realizar en un filtro incluyen enviar mensajes a plataformas de monitoreo (como Langfuse o DataDog), modificar el contenido del mensaje, bloquear mensajes tóxicos, traducir mensajes a otro idioma o limitar la frecuencia de mensajes de ciertos usuarios. Se mantiene una lista de ejemplos en el [repositorio de Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/filters). Los filtros pueden ejecutarse como una Función o en un servidor de Pipelines. El flujo de trabajo general puede observarse en la imagen a continuación.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="Flujo de trabajo de filtros" />
  </a>
</p>

Cuando se habilita una canalización de filtros en un modelo o tubo, el mensaje entrante del usuario (o "entrada") se pasa al filtro para su procesamiento. El filtro realiza la acción deseada contra el mensaje antes de solicitar la finalización del chat desde el modelo LLM. Finalmente, el filtro realiza un post-procesamiento en el mensaje saliente del LLM (o "salida") antes de enviarlo al usuario.
