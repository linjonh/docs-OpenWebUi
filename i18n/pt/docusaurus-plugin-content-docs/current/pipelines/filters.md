---
sidebar_position: 1
title: "🚰 Filtros"
---

# Filtros

Os filtros são usados para realizar ações em mensagens recebidas de usuários e mensagens enviadas do assistente (LLM). As ações potenciais que podem ser realizadas em um filtro incluem enviar mensagens para plataformas de monitoramento (como Langfuse ou DataDog), modificar o conteúdo das mensagens, bloquear mensagens tóxicas, traduzir mensagens para outro idioma ou limitar a taxa de mensagens de determinados usuários. Uma lista de exemplos é mantida no [repositório Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/filters). Os filtros podem ser executados como uma Função ou em um servidor Pipelines. O fluxo geral pode ser visto na imagem abaixo.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="Fluxo de Trabalho de Filtros" />
  </a>
</p>

Quando uma pipeline de filtro é habilitada em um modelo ou pipeline, a mensagem recebida do usuário (ou "entrada") é passada ao filtro para processamento. O filtro realiza a ação desejada na mensagem antes de solicitar a conclusão do chat ao modelo LLM. Finalmente, o filtro realiza o pós-processamento na mensagem enviada pelo LLM (ou "saída") antes de enviá-la ao usuário.
