---
sidebar_position: 8
title: "Mojeek"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API de Busca Mojeek

### Configuração

1. Por favor, visite a [página da API de Busca Mojeek](https://www.mojeek.com/services/search/web-search-api/) para obter uma `Chave de API`
2. Com a `Chave de API`, abra o `painel de administração do Open WebUI`, clique na aba `Configurações` e depois em `Busca na Web`
3. Ative a opção `Busca na Web` e defina `Motor de Busca na Web` como `mojeek`
4. Preencha `Chave da API de Busca Mojeek` com a `Chave de API`
5. Clique em `Salvar`

### Configuração do Docker Compose

Adicione as seguintes variáveis de ambiente ao arquivo `docker-compose.yaml` do Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "mojeek"
      BRAVE_SEARCH_API_KEY: "YOUR_MOJEEK_API_KEY"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
```
