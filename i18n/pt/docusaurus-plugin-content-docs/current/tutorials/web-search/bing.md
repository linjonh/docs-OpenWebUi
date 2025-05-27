---
sidebar_position: 1
title: "Bing"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API do Bing

### Configuração

1. Acesse o [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) e crie um novo recurso. Após a criação, você será redirecionado para a página de visão geral do recurso. De lá, selecione "Clique aqui para gerenciar chaves." ![clique aqui para gerenciar chaves](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. Na página de gerenciamento de chaves, localize Key1 ou Key2 e copie a chave desejada.
3. Abra o Painel de Administração do Open WebUI, vá para a guia Configurações e, em seguida, selecione Pesquisa na Web.
4. Habilite a opção de pesquisa na Web e defina o mecanismo de pesquisa na Web para Bing.
5. Preencha `SearchApi API Key` com a `chave da API` que você copiou no passo 2 do painel [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch).
6. Clique em `Salvar`.
