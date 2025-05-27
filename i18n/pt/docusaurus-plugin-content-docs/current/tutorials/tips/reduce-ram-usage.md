---
sidebar_position: 10
title: "✂️ Reduzir Uso de RAM"
---

# Reduzir Uso de RAM

Se você estiver implementando esta imagem em um ambiente com restrição de RAM, há algumas coisas que você pode fazer para reduzir o tamanho da imagem.

Em um Raspberry Pi 4 (arm64) com a versão v0.3.10, foi possível reduzir o consumo de memória em repouso de >1GB para ~200MB (conforme observado com `docker container stats`).

## TLDR

Defina as seguintes variáveis de ambiente (ou as respectivas configurações de UI para uma implantação existente): `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`.

## Explicação mais longa

Grande parte do consumo de memória é devido a modelos de aprendizado de máquina carregados. Mesmo se você estiver usando um modelo de linguagem externo (OpenAI ou ollama não incorporado), muitos modelos podem ser carregados para fins adicionais.

A partir da versão v0.3.10, isso inclui:

* Conversão de fala para texto (whisper por padrão)
* Motor de incorporação RAG (padrão para o modelo local SentenceTransformers)
* Motor de geração de imagens (desativado por padrão)

Os dois primeiros estão habilitados e configurados para modelos locais por padrão. Você pode alterar os modelos no painel de administração (RAG: categoria Documentos, configurá-lo para Ollama ou OpenAI, Fala para texto: seção Áudio, trabalhar com OpenAI ou WebAPI).
Se você estiver implementando uma nova imagem Docker, também poderá defini-los com as seguintes variáveis de ambiente: `RAG_EMBEDDING_ENGINE: ollama`, `AUDIO_STT_ENGINE: openai`. Observe que essas variáveis de ambiente não têm efeito se um `config.json` já existir.
