---
sidebar_position: 0
title: "🤖 Modelos"
---

A seção `Modelos` do `Workspace` dentro do Open WebUI é uma ferramenta poderosa que permite criar e gerenciar modelos personalizados adaptados a finalidades específicas. Esta seção serve como um hub central para todos os seus arquivos de modelos, oferecendo uma variedade de recursos para editar, clonar, compartilhar, exportar e ocultar seus modelos.

### Gerenciamento de Arquivos de Modelos

Na seção `Modelos`, você pode realizar as seguintes ações nos seus arquivos de modelos:

* **Editar**: Mergulhe nos detalhes do seu arquivo de modelo e faça alterações em seu caráter e mais.
* **Clonar**: Crie uma cópia de um arquivo de modelo, que será anexada com `-clone` ao `Model ID` clonado. Note que você não pode clonar um modelo base; é necessário criar um modelo primeiro antes de cloná-lo.
* **Compartilhar**: Compartilhe seu arquivo de modelo com a comunidade do Open WebUI clicando no botão `Compartilhar`, que o redirecionará para [https://openwebui.com/models/create](https://openwebui.com/models/create).
* **Exportar**: Baixe a exportação `.json` do arquivo de modelo para o seu PC.
* **Ocultar**: Oculte o arquivo de modelo no menu suspenso do seletor de modelos dentro dos chats.

### Edição de Arquivos de Modelos

Ao editar um arquivo de modelo, você pode personalizar as seguintes configurações:

* **Foto do Avatar**: Carregue uma foto do avatar para representar seu arquivo de modelo.
* **Nome do Modelo**: Altere o nome do seu arquivo de modelo.
* **Prompt do Sistema**: Forneça um prompt do sistema opcional para seu arquivo de modelo.
* **Parâmetros do Modelo**: Ajuste os parâmetros do seu arquivo de modelo.
* **Sugestões de Prompts**: Adicione prompts que serão exibidos em uma nova página de chat.
* **Documentos**: Adicione documentos ao arquivo de modelo (sempre RAG [Geração Aumentada por Recuperação]).
* **Ferramentas, Filtros e Ações**: Selecione as ferramentas, filtros e ações que estarão disponíveis para o arquivo de modelo.
* **Visão**: Ative ou desative a `Visão` para modais múltiplos.
* **Tags**: Adicione tags ao arquivo de modelo que serão exibidas ao lado do nome do modelo no menu suspenso do seletor de modelos.

### Descoberta de Modelos e Importação/Exportação

A seção `Modelos` também inclui recursos para importar e exportar modelos:

* **Importar Modelos**: Use este botão para importar modelos de um arquivo .json ou outras fontes.
* **Exportar Modelos**: Use este botão para exportar todos os seus arquivos de modelos em um único arquivo .json.

Para baixar modelos, navegue para as **Configurações do Ollama** na aba de Conexões.
Alternativamente, você também pode baixar modelos diretamente digitando um comando como `ollama run hf.co/[model creator]/[model name]` no menu suspenso do seletor de modelos.
Esta ação criará um botão rotulado como "Pull [Model Name]" para baixar.

### Troca de Modelos

   **Exemplo**: Alternando entre **Mistral**, **LLaVA** e **GPT-3.5** em uma Tarefa Multiestágio

* **Cenário**: Uma conversa multietapa envolve diferentes tipos de tarefas, como começar com uma FAQ simples, interpretar uma imagem e, em seguida, gerar uma resposta criativa.
* **Motivo para Alternar**: O usuário pode aproveitar as forças específicas de cada modelo para cada etapa:
  * **Mistral** para perguntas gerais para reduzir o tempo de computação e custos.
  * **LLaVA** para tarefas visuais para obter insights de dados baseados em imagens.
  * **GPT-3.5** para gerar uma saída de linguagem mais sofisticada e detalhada.
* **Processo**: O usuário alterna entre os modelos, dependendo do tipo de tarefa, para maximizar a eficiência e a qualidade da resposta.

    **Como Fazer**:
    1. **Selecionar o Modelo**: Dentro da interface de bate-papo, selecione os modelos desejados no menu suspenso do trocador de modelos. Você pode selecionar até dois modelos simultaneamente, e ambas as respostas serão geradas. Você pode então navegar entre elas usando as setas para frente e para trás.
    2. **Preservação do Contexto**: O Open WebUI mantém o contexto da conversa ao trocar de modelos, permitindo transições suaves.
