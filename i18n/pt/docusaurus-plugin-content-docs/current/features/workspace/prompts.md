---
sidebar_position: 2
title: "📚 Prompts"
---

A seção `Prompts` do `Workspace` no Open WebUI permite que os usuários criem, gerenciem e compartilhem prompts personalizados. Este recurso simplifica as interações com modelos de IA, permitindo que os usuários salvem prompts usados com frequência e os acessem facilmente por meio de comandos de barra.

### Gerenciamento de Prompts

A interface de Prompts oferece vários recursos principais para gerenciar seus prompts personalizados:

* **Criar**: Crie novos prompts com títulos personalizáveis, níveis de acesso e conteúdo.
* **Compartilhar**: Compartilhe prompts com outros usuários com base nas permissões de acesso configuradas.
* **Controle de Acesso**: Defina visibilidade e permissões de uso para cada prompt (consulte [Permissões](./permissions.md) para mais detalhes).
* **Comandos de Barra**: Acesse rapidamente os prompts usando comandos personalizados de barra durante sessões de chat.

### Criando e Editando Prompts

Ao criar ou editar um prompt, você pode configurar as seguintes definições:

* **Título**: Dê ao seu prompt um nome descritivo para fácil identificação.
* **Acesso**: Defina o nível de acesso para controlar quem pode visualizar e usar o prompt.
* **Comando**: Defina um comando de barra que ativará o prompt (por exemplo, `/resumir`).
* **Conteúdo do Prompt**: Escreva o texto real do prompt que será enviado para o modelo.

### Variáveis de Prompt

O Open WebUI suporta variáveis dinâmicas de prompts que podem ser incluídas nos seus prompts:

* **Conteúdo da Área de Transferência**: Use `{{CLIPBOARD}}` para inserir conteúdo da sua área de transferência.
* **Data e Hora**:
  * `{{CURRENT_DATE}}`: Data atual
  * `{{CURRENT_DATETIME}}`: Data e hora atuais
  * `{{CURRENT_TIME}}`: Hora atual
  * `{{CURRENT_TIMEZONE}}`: Fuso horário atual
  * `{{CURRENT_WEEKDAY}}`: Dia da semana atual
* **Informações do Usuário**:
  * `{{USER_NAME}}`: Nome do usuário atual
  * `{{USER_LANGUAGE}}`: Idioma selecionado pelo usuário
  * `{{USER_LOCATION}}`: Localização do usuário (requer HTTPS e alternância em Configurações > Interface)

### Diretrizes de Uso de Variáveis

* Envolva as variáveis com chaves duplas: `{{variavel}}`
* A variável `{{USER_LOCATION}}` requer:
  * Uma conexão segura HTTPS
  * Ativação do recurso em Configurações > Interface
* A variável `{{CLIPBOARD}}` requer permissão de acesso à área de transferência do seu dispositivo

### Controle de Acesso e Permissões

O gerenciamento de prompts é controlado pelas seguintes configurações de permissão:

* **Acesso aos Prompts**: Os usuários precisam da permissão `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS` para criar e gerenciar prompts.
* Para informações detalhadas sobre como configurar permissões, consulte a [documentação de Permissões](./permissions.md).

### Boas Práticas

* Use títulos claros e descritivos para os seus prompts
* Crie comandos de barra intuitivos que reflitam o propósito do prompt
* Documente quaisquer requisitos específicos ou entradas esperadas na descrição do prompt
* Teste prompts com diferentes combinações de variáveis para garantir que funcionem conforme o esperado
* Considere cuidadosamente os níveis de acesso ao compartilhar prompts com outros usuários - o compartilhamento público significa que ele aparecerá automaticamente para todos os usuários quando eles digitarem `/` em uma conversa; portanto, evite criar muitos prompts.
