---
sidebar_position: 2
title: "Variables de Entorno"
---


# Lista de Variables de Entorno


:::info
Para ver una lista completa de todas las variables de entorno de Open WebUI, consulta la página de [Configuración de Variables de Entorno](/getting-started/env-configuration).
:::

Lo siguiente es un resumen de las variables de entorno para convertir voz a texto (STT).

# Variables de Entorno para Voz a Texto (STT)

| Variable | Descripción |
|----------|-------------|
| `WHISPER_MODEL` | Establece el modelo Whisper a utilizar para la conversión local de voz a texto |
| `WHISPER_MODEL_DIR` | Especifica el directorio para almacenar los archivos del modelo Whisper |
| `WHISPER_LANGUAGE` | Especifica el idioma de voz a texto según ISO 639-1 (ISO 639-2 para hawaiano y cantonés) que se usará con Whisper (el idioma es predicho a menos que se establezca) |
| `AUDIO_STT_ENGINE` | Especifica el motor de Voz a Texto a utilizar (vacío para Whisper local o `openai`) |
| `AUDIO_STT_MODEL` | Especifica el modelo de Voz a Texto para puntos finales compatibles con OpenAI |
| `AUDIO_STT_OPENAI_API_BASE_URL` | Establece la URL base compatible con OpenAI para Voz a Texto |
| `AUDIO_STT_OPENAI_API_KEY` | Establece la clave API de OpenAI para Voz a Texto |