---
sidebar_position: 3
title: "🔒 Permissões"
---

A seção `Permissões` do `Workspace` dentro do Open WebUI permite que os administradores configurem controles de acesso e disponibilidade de recursos para os usuários. Este sistema poderoso possibilita um controle detalhado sobre o que os usuários podem acessar e modificar dentro do aplicativo.

Os administradores podem gerenciar permissões das seguintes maneiras:

1. **Interface do Usuário:** A seção de Permissões do Workspace oferece uma interface gráfica para configuração de permissões.
2. **Variáveis de Ambiente:** As permissões podem ser configuradas usando variáveis de ambiente, armazenadas como variáveis `PersistentConfig`.
3. **Gerenciamento de Grupos:** Atribuir usuários a grupos com permissões predefinidas.

## Permissões do Workspace

As permissões do Workspace controlam o acesso aos componentes principais da plataforma Open WebUI:

* **Acesso a Modelos**: Alternar para permitir que os usuários acessem e gerenciem modelos personalizados. (Variável de ambiente: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **Acesso ao Conhecimento**: Alternar para permitir que os usuários acessem e gerenciem bases de conhecimento. (Variável de ambiente: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **Acesso a Prompt**: Alternar para permitir que os usuários acessem e gerenciem prompts salvos. (Variável de ambiente: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **Acesso a Ferramentas**: Alternar para permitir que os usuários acessem e gerenciem ferramentas. (Variável de ambiente: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *Nota: Ativar isso dá aos usuários a capacidade de enviar código arbitrário para o servidor.*

## Permissões de Chat

As permissões de chat determinam quais ações os usuários podem realizar dentro das conversas de chat:

* **Permitir Controles de Chat**: Alternar para habilitar o acesso às opções de controle de chat.
* **Permitir Upload de Arquivos**: Alternar para autorizar os usuários a enviarem arquivos durante as sessões de chat. (Variável de ambiente: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **Permitir Exclusão de Chat**: Alternar para permitir que os usuários excluam conversas de chat. (Variável de ambiente: `USER_PERMISSIONS_CHAT_DELETE`)
* **Permitir Edição de Chat**: Alternar para permitir que os usuários editem mensagens nas conversas do chat. (Variável de ambiente: `USER_PERMISSIONS_CHAT_EDIT`)
* **Permitir Chat Temporário**: Alternar para permitir que os usuários criem sessões de chat temporárias. (Variável de ambiente: `USER_PERMISSIONS_CHAT_TEMPORARY`)

## Permissões de Recursos

As permissões de recursos controlam o acesso a capacidades especializadas dentro do Open WebUI:

* **Pesquisa na Web**: Alternar para permitir que os usuários realizem pesquisas na web durante sessões de chat. (Variável de ambiente: `ENABLE_RAG_WEB_SEARCH`)
* **Geração de Imagens**: Alternar para permitir que os usuários gerem imagens. (Variável de ambiente: `ENABLE_IMAGE_GENERATION`)
* **Interpretador de Código**: Alternar para permitir que os usuários utilizem o recurso de interpretador de código. (Variável de ambiente: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **Servidores de Ferramentas Diretos**: Alternar para permitir que os usuários se conectem diretamente aos servidores de ferramentas. (Variável de ambiente: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## Configurações Padrão de Permissões

Por padrão, o Open WebUI aplica as seguintes configurações de permissões:

**Permissões do Workspace**:
- Acesso a Modelos: Desativado (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- Acesso ao Conhecimento: Desativado (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- Acesso a Prompt: Desativado (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- Acesso a Ferramentas: Desativado (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**Permissões de Chat**:
- Permitir Controles de Chat: Ativado
- Permitir Upload de Arquivos: Ativado (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- Permitir Exclusão de Chat: Ativado (`USER_PERMISSIONS_CHAT_DELETE=True`)
- Permitir Edição de Chat: Ativado (`USER_PERMISSIONS_CHAT_EDIT=True`)
- Permitir Chat Temporário: Ativado (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**Permissões de Recursos**:
- Pesquisa na Web: Ativado (`ENABLE_RAG_WEB_SEARCH=True`)
- Geração de Imagens: Ativado (`ENABLE_IMAGE_GENERATION=True`)
- Interpretador de Código: Ativado (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- Servidores de Ferramentas Diretos: Desativado (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

Os administradores podem alterar as permissões padrão na interface do usuário, em "usuários" no painel de administração.

## Gerenciando Permissões

Os administradores podem ajustar essas permissões através da interface do usuário ou configurando as variáveis de ambiente correspondentes na configuração. Todas as variáveis de ambiente relacionadas às permissões são marcadas como variáveis `PersistentConfig`, o que significa que são armazenadas internamente após o primeiro lançamento e podem ser gerenciadas através da interface do Open WebUI.

Essa flexibilidade permite que as organizações implementem políticas de segurança enquanto ainda fornecem aos usuários as ferramentas necessárias. Para mais informações detalhadas sobre variáveis de ambiente relacionadas às permissões, consulte a documentação [Configuração de Variável de Ambiente](../../getting-started/env-configuration.md#workspace-permissions).
