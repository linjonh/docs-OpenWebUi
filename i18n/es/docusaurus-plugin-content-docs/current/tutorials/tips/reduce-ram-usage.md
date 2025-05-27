---
sidebar_position: 10
title: "✂️ Reducir el uso de RAM"
---

# Reducir el uso de RAM

Si estás desplegando esta imagen en un entorno con restricciones de RAM, hay algunas cosas que puedes hacer para reducir el tamaño de la imagen.

En una Raspberry Pi 4 (arm64) con la versión v0.3.10, esto logró reducir el consumo de memoria en reposo de >1GB a ~200MB (según se observó con `docker container stats`).

## Resumen rápido

Establece las siguientes variables de entorno (o la configuración respectiva en la interfaz de usuario para un despliegue existente): `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`.

## Explicación más detallada

Gran parte del consumo de memoria se debe a los modelos de aprendizaje automático cargados. Incluso si estás utilizando un modelo de lenguaje externo (OpenAI u Ollama independiente), muchos modelos pueden cargarse para propósitos adicionales.

A partir de la versión v0.3.10, esto incluye:

* Reconocimiento de voz a texto (whisper por defecto)
* Motor de incrustación RAG (por defecto un modelo local de SentenceTransformers)
* Motor de generación de imágenes (deshabilitado por defecto)

Los primeros 2 están habilitados y configurados con modelos locales por defecto. Puedes cambiar los modelos en el panel de administración (RAG: categoría Documentos, configúralo a Ollama o OpenAI, Voz a texto: sección de Audio, funciona con OpenAI o WebAPI).
Si estás desplegando una imagen nueva de Docker, también puedes configurarlos con las siguientes variables de entorno: `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`. Ten en cuenta que estas variables de entorno no tienen efecto si ya existe un `config.json`.
