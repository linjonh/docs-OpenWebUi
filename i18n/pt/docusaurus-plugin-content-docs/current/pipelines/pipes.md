---
sidebar_position: 2
title: "🔧 Pipes"
---

# Pipes
Os Pipes são funções que podem ser usadas para realizar ações antes de retornar mensagens dos LLMs (Modelos de Linguagem Extensiva) ao usuário. Exemplos de ações potenciais que você pode realizar com Pipes incluem Geração Aumentada por Recuperação (RAG), envio de requisições para provedores de LLMs que não são da OpenAI (como Anthropic, Azure OpenAI ou Google), ou execução de funções diretamente na sua interface web. Os Pipes podem ser hospedados como uma Função ou em um servidor de Pipelines. Uma lista de exemplos é mantida no [repositório Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/pipelines). O fluxo de trabalho geral pode ser visto na imagem abaixo.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="Fluxo de Trabalho do Pipe" />
  </a>
</p>

Os Pipes definidos na sua WebUI aparecem como um novo modelo com uma designação "Externa" anexada a eles. Um exemplo de dois modelos Pipe, `Pipeline de RAG de Banco de Dados` e `DOOM`, pode ser visto abaixo ao lado de dois modelos auto-hospedados:

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="Modelos de Pipe na WebUI" />
  </a>
</p>
