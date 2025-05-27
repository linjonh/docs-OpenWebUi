---
sidebar_position: 15
title: "SerpApi"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API SerpApi

[SerpApi](https://serpapi.com/) Raspagem de resultados do Google e outros motores de busca utilizando nossa API rápida, fácil e completa. Qualquer motor de busca existente ou futuro que retorne `organic_results` é suportado. O motor de busca padrão é o `google`, mas pode ser alterado para `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` e outros.

### Configuração

1. Acesse [SerpApi](https://serpapi.com/) e faça login ou crie uma nova conta.
2. Vá para o `Dashboard` e copie a chave da API.
3. Com a `chave da API`, abra o `Painel de Administração do Open WebUI`, clique na aba `Configurações`, e depois clique em `Pesquisa na Web`. 
4. Ative a `Pesquisa na Web` e defina o `Motor de Busca na Web` para `serpapi`.
5. Preencha `Chave da API SerpApi` com a `chave da API` que você copiou na etapa 2 do dashboard da [SerpApi](https://serpapi.com/).
6. [Opcional] Insira o nome do `Motor SerpApi` que você deseja consultar. Exemplos: `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar` e `google_patents`. Por padrão, está definido como `google`. Encontre mais opções na [documentação da SerpApi](https://serpapi.com/dashboard).
7. Clique em `Salvar`.

![Painel de Administração do Open WebUI](/images/tutorial_serpapi_search.png)

#### Nota

Você precisa ativar a `Pesquisa na Web` no campo de sugestão para pesquisar na web usando os motores da [SerpApi](https://serpapi.com/).

![ativar Pesquisa na Web](/images/enable_web_search.png)
