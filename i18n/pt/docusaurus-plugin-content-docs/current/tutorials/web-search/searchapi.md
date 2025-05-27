---
sidebar_position: 9
title: "SearchApi"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para o seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API SearchApi

[SearchApi](https://searchapi.io) é uma coleção de APIs SERP em tempo real. Qualquer mecanismo SERP existente ou futuro que retorne `organic_results` é compatível. O mecanismo de pesquisa web padrão é o `google`, mas pode ser alterado para `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` e outros.

### Configuração

1. Vá para [SearchApi](https://searchapi.io) e faça login ou crie uma nova conta.
2. Vá para `Dashboard` e copie a chave da API.
3. Com a `chave da API`, abra o `Painel Admin do Open WebUI` e clique na aba `Configurações`, depois clique em `Pesquisa na Web`.
4. Habilite a opção `Pesquisa na web` e configure `Mecanismo de Pesquisa na Web` para `searchapi`.
5. Preencha o campo `Chave da API do SearchApi` com a `chave da API` que você copiou no passo 2 do dashboard do [SearchApi](https://www.searchapi.io/).
6. [Opcional] Insira o nome do `mecanismo SearchApi` que você deseja consultar. Exemplos: `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar` e `google_patents`. Por padrão, ele é definido como `google`.
7. Clique em `Salvar`.

![Painel Admin do Open WebUI](/images/tutorial_searchapi_search.png)

#### Nota

Você precisa habilitar a opção `Pesquisa na web` no campo prompt, usando o botão de mais (`+`) para pesquisar na web usando os mecanismos do [SearchApi](https://www.searchapi.io/).

![habilitar Pesquisa na web](/images/enable_web_search.png)
