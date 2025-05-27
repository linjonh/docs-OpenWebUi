---
sidebar_position: 3
title: "🔎 Tutorial Open WebUI RAG"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Tutorial: Configurando RAG com a Documentação do Open WebUI

Neste tutorial, você aprenderá como usar a **Geração com Recuperação de Informação (RAG)** com o Open WebUI para carregar documentação do mundo real como uma base de conhecimento. Vamos explicar como usar a última **Documentação do Open WebUI** como exemplo para essa configuração.

---

## Visão Geral

### O que é RAG?

A Geração com Recuperação de Informação (RAG) combina **LLMs** com **conhecimentos recuperados** de fontes externas. O sistema recupera dados relevantes de documentos carregados ou bases de conhecimento, melhorando a qualidade e precisão das respostas.

Este tutorial demonstra como:

- Carregar a última Documentação do Open WebUI como uma base de conhecimento.
- Conectá-la a um modelo personalizado.
- Consultar a base de conhecimento para obter assistência aprimorada.

---

## Configuração

### Configuração Passo a Passo: Documentação do Open WebUI como Base de Conhecimento

Siga estas etapas para configurar o RAG com **Documentação do Open WebUI**:

1. **Baixe a Documentação**:
   - Baixe a última documentação:
     [https://github.com/open-webui/docs/archive/refs/heads/main.zip](https://github.com/open-webui/docs/archive/refs/heads/main.zip)

2. **Extraia os Arquivos**:
   - Extraia o arquivo `main.zip` para obter todos os arquivos de documentação.

3. **Localize os Arquivos Markdown**:
   - Na pasta extraída, localize todos os arquivos com extensões `.md` e `.mdx` (dica: procure por `*.md*`).

4. **Crie uma Base de Conhecimento**:
   - Vá para **Workspace** > **Knowledge** > **+ Create a Knowledge Base**.
   - Nome: `Documentação do Open WebUI`
   - Propósito: **Assistência**

   > Clique em **Criar Conhecimento**.

5. **Carregue os Arquivos**:
   - Arraste e solte os arquivos `.md` e `.mdx` da pasta extraída para a base de conhecimento **Documentação do Open WebUI**.

---

## Criar e Configurar o Modelo

### Criar um Modelo Personalizado com a Base de Conhecimento

1. **Acesse Modelos**:
   - Vá para **Workspace** > **Models** > **+ Add New Model**.

2. **Configure o Modelo**:
   - **Nome**: `Open WebUI`
   - **Modelo Base**: *(Selecione o modelo Llama apropriado ou outro disponível)*
   - **Fonte de Conhecimento**: Selecione **Documentação do Open WebUI** no menu suspenso.

3. **Salve o Modelo**.

---

## Exemplos e Uso

### Consultar o Modelo de Documentação do Open WebUI

1. **Inicie um Novo Chat**:
   - Vá para **New Chat** e selecione o modelo `Open WebUI`.

2. **Exemplos de Consultas**:

   ```
   Usuário: "Como configuro variáveis de ambiente?"
   Sistema: "Consulte a Seção 3.2: Use o arquivo `.env` para gerenciar configurações."
   ```

   ```
   Usuário: "Como faço para atualizar o Open WebUI usando Docker?"
   Sistema: "Consulte `docker/updating.md`: Use `docker pull` e reinicie o contêiner."
   ```

   Com o modelo habilitado para RAG, o sistema recupera as seções mais relevantes da documentação para responder à consulta.

---

## Próximos Passos

### Próximos Passos

- **Adicione Mais Conhecimento**: Continue expandindo sua base de conhecimento adicionando mais documentos.

---

Com esta configuração, você pode usar efetivamente a **Documentação do Open WebUI** para ajudar os usuários recuperando informações relevantes para suas consultas. Divirta-se construindo e consultando seus modelos personalizados com conhecimento aprimorado!
