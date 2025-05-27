---
sidebar_position: 5
title: "Google PSE"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API do Google PSE

### Configuração

1. Acesse o Google Developers, use [Programmable Search Engine](https://developers.google.com/custom-search) e faça login ou crie uma conta.
2. Vá para o [painel de controle](https://programmablesearchengine.google.com/controlpanel/all) e clique no botão `Adicionar`
3. Insira um nome para o motor de busca, configure as outras propriedades conforme suas necessidades, verifique que você não é um robô e clique no botão `Criar`.
4. Gere a `Chave da API` e obtenha o `ID do Motor de Busca`. (Disponível após o motor ser criado)
5. Com a `Chave da API` e o `ID do Motor de Busca`, abra o `Painel Admin do Open WebUI`, clique na aba `Configurações` e depois clique em `Busca na Web`
6. Habilite `Busca na Web` e configure `Motor de Busca na Web` para `google_pse`
7. Preencha `Chave da API do Google PSE` com a `Chave da API` e `ID do Motor do Google PSE` (# 4)
8. Clique em `Salvar`

![Painel Admin do Open WebUI](/images/tutorial_google_pse1.png)

#### Nota

Você precisa habilitar `Busca na Web` no campo de prompt, usando o botão de mais (`+`).
Pesquise na web ;-)

![Habilitar Busca na Web](/images/tutorial_google_pse2.png)
