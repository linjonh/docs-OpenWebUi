---
sidebar_position: 13
title: "🔰 Banners Personalizáveis"
---

Visão Geral
--------

O Open WebUI oferece um recurso que permite aos administradores criar banners personalizáveis com persistência no arquivo `config.json`. Esses banners podem incluir opções para conteúdo, cor de fundo (informação, aviso, erro ou sucesso) e possibilidade de serem descartáveis. Os banners estão acessíveis apenas para usuários conectados, garantindo a confidencialidade de informações sensíveis.

Configurando Banners pelo Painel Administrativo
----------------------------------------------

Para configurar banners pelo painel administrativo, siga estas etapas:

1. Faça login na sua instância do Open WebUI como administrador.
2. Navegue até `Painel Administrativo` -> `Configurações` -> `Interface`.
3. Localize a opção `Banners` logo acima da opção `Sugestões de Prompt Padrão`.
4. Clique no ícone `+` para adicionar um novo banner.
5. Selecione o tipo de banner e configure o texto do banner conforme desejado.
6. Escolha se o banner pode ser descartável ou não.
7. Defina o timestamp para o banner (opcional).
8. Pressione `Salvar` na parte inferior da página para salvar o banner.

Configurando Banners através de Variáveis de Ambiente
----------------------------------------------------

Alternativamente, você pode configurar banners por meio de variáveis de ambiente. Para isso, você precisará definir a variável de ambiente `WEBUI_BANNERS` com uma lista de dicionários no seguinte formato:

```json
[{"id": "string","type": "string [info, success, warning, error]","title": "string","content": "string","dismissible": False,"timestamp": 1000}]
```

Para mais informações sobre como configurar variáveis de ambiente no Open WebUI, veja [Configuração de Variáveis de Ambiente](https://docs.openwebui.com/getting-started/env-configuration#webui_banners).

Descrição das Variáveis de Ambiente
-----------------------------------

* `WEBUI_BANNERS`:
  * Tipo: lista de dicionários
  * Padrão: `[]`
  * Descrição: Lista de banners a serem exibidos para os usuários.

Opções de Banner
----------------

* `id`: Identificador único para o banner.
* `type`: Cor de fundo do banner (informação, sucesso, aviso, erro).
* `title`: Título do banner.
* `content`: Conteúdo do banner.
* `dismissible`: Se o banner pode ser descartável ou não.
* `timestamp`: Timestamp do banner (opcional).

Perguntas Frequentes
---------------------

* P: Posso configurar banners pelo painel administrativo?
R: Sim, você pode configurar banners pelo painel administrativo navegando até `Painel Administrativo` -> `Configurações` -> `Interface` e clicando no ícone `+` para adicionar um novo banner.
* P: Posso configurar banners através de variáveis de ambiente?
R: Sim, você pode configurar banners por meio de variáveis de ambiente definindo a variável de ambiente `WEBUI_BANNERS` com uma lista de dicionários.
* P: Qual é o formato para a variável de ambiente `WEBUI_BANNERS`?
R: O formato para a variável de ambiente `WEBUI_BANNERS` é uma lista de dicionários com as seguintes chaves: `id`, `type`, `title`, `content`, `dismissible` e `timestamp`.
* P: Posso tornar os banners descartáveis?
R: Sim, você pode tornar os banners descartáveis configurando a chave `dismissible` como `True` na configuração do banner ou alternando a opção de descartabilidade para um banner dentro da interface do usuário.
