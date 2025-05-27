---
sidebar_position: 2
title: "Variáveis de Ambiente"
---


# Lista de Variáveis de Ambiente


:::info
Para uma lista completa de todas as variáveis de ambiente do Open WebUI, veja a página [Configuração de Variáveis de Ambiente](/getting-started/env-configuration).
:::

A seguir está um resumo das variáveis de ambiente para conversão de fala em texto (STT).

# Variáveis de Ambiente Para Conversão de Fala em Texto (STT)

| Variável | Descrição |
|----------|-------------|
| `WHISPER_MODEL` | Define o modelo Whisper a ser usado para conversão de fala em texto local |
| `WHISPER_MODEL_DIR` | Especifica o diretório para armazenar os arquivos do modelo Whisper |
| `WHISPER_LANGUAGE` | Especifica o idioma de fala em texto no formato ISO 639-1 (ISO 639-2 para o Havaiano e Cantonês) para o Whisper (o idioma é previsto, a menos que definido) |
| `AUDIO_STT_ENGINE` | Especifica o mecanismo de conversão de fala em texto a ser usado (vazio para Whisper local ou `openai`) |
| `AUDIO_STT_MODEL` | Especifica o modelo de fala em texto para endpoints compatíveis com OpenAI |
| `AUDIO_STT_OPENAI_API_BASE_URL` | Define a URL base compatível com OpenAI para conversão de fala em texto |
| `AUDIO_STT_OPENAI_API_KEY` | Define a chave de API do OpenAI para conversão de fala em texto |