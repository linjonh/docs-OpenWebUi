---
sidebar_position: 5
title: "🔗 Parâmetros de URL"
---

No Open WebUI, sessões de chat podem ser customizadas por meio de vários parâmetros de URL. Esses parâmetros permitem que você configure opções específicas, ative funcionalidades e defina configurações de modelo para cada sessão de chat. Essa abordagem proporciona flexibilidade e controle sobre sessões de chat individuais diretamente a partir da URL.

## Visão Geral dos Parâmetros de URL

A tabela a seguir lista os parâmetros de URL disponíveis, sua função e exemplos de uso.

| **Parâmetro**      | **Descrição**                                                                  | **Exemplo**                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | Especifica os modelos a serem utilizados, como uma lista separada por vírgulas.                     | `/?models=model1,model2`         |
| `model`            | Especifica um único modelo para ser usado na sessão de chat.                       | `/?model=model1`                 |
| `youtube`          | Especifica um ID de vídeo do YouTube para ser transcrito dentro do chat.                 | `/?youtube=VIDEO_ID`             |
| `web-search`       | Ativa a funcionalidade de busca na web se definido como `true`.                              | `/?web-search=true`              |
| `tools` ou `tool-ids` | Especifica uma lista separada por vírgulas de IDs de ferramentas para ativar no chat.          | `/?tools=tool1,tool2`            |
| `call`             | Ativa um overlay de chamada se definido como `true`.                                        | `/?call=true`                    |
| `q`                | Define uma consulta inicial ou prompt para o chat.                                   | `/?q=Hello%20there`              |
| `temporary-chat`   | Marca o chat como temporário se definido como `true`, para sessões únicas.            | `/?temporary-chat=true`          |

### 1. **Seleção de Modelos**

- **Descrição**: Os parâmetros `models` e `model` permitem que você especifique quais [modelos linguísticos](/features/workspace/models.md) devem ser usados para uma determinada sessão de chat.
- **Como Configurar**: Você pode usar `models` para vários modelos ou `model` para um único modelo.
- **Exemplo**:
  - `/?models=model1,model2` – Isso inicializa o chat com `model1` e `model2`.
  - `/?model=model1` – Isso define `model1` como o único modelo para o chat.

### 2. **Transcrição de YouTube**

- **Descrição**: O parâmetro `youtube` aceita um ID de vídeo do YouTube, permitindo que o chat transcreva o vídeo especificado.
- **Como Configurar**: Use o ID do vídeo do YouTube como o valor para este parâmetro.
- **Exemplo**: `/?youtube=VIDEO_ID`
- **Comportamento**: Isso ativa a funcionalidade de transcrição dentro do chat para o vídeo do YouTube fornecido.

### 3. **Busca na Web**

- **Descrição**: Ativar `web-search` permite que a sessão de chat acesse a funcionalidade de [busca na web](/category/-web-search).
- **Como Configurar**: Defina este parâmetro como `true` para ativar a busca na web.
- **Exemplo**: `/?web-search=true`
- **Comportamento**: Se ativado, o chat pode recuperar resultados de busca na web como parte de suas respostas.

### 4. **Seleção de Ferramentas**

- **Descrição**: Os parâmetros `tools` ou `tool-ids` especificam quais [ferramentas](/features/plugin/tools) ativar dentro do chat.
- **Como Configurar**: Forneça uma lista separada por vírgulas de IDs de ferramentas como valor do parâmetro.
- **Exemplo**: `/?tools=tool1,tool2` ou `/?tool-ids=tool1,tool2`
- **Comportamento**: Cada ID de ferramenta é correspondido e ativado dentro da sessão para interação do usuário.

### 5. **Overlay de Chamada**

- **Descrição**: O parâmetro `call` habilita um overlay de vídeo ou chamada na interface de chat.
- **Como Configurar**: Defina o parâmetro como `true` para ativar o overlay de chamada.
- **Exemplo**: `/?call=true`
- **Comportamento**: Ativa um overlay de interface de chamada, permitindo funcionalidades como transcrição em tempo real e entrada de vídeo.

### 6. **Prompt de Consulta Inicial**

- **Descrição**: O parâmetro `q` permite definir uma consulta inicial ou prompt para o chat.
- **Como Configurar**: Especifique o texto da consulta ou prompt como valor do parâmetro.
- **Exemplo**: `/?q=Hello%20there`
- **Comportamento**: O chat começa com o prompt especificado, enviando-o automaticamente como a primeira mensagem.

### 7. **Sessões de Chat Temporárias**

- **Descrição**: O parâmetro `temporary-chat` marca o chat como uma sessão temporária. Isso pode limitar recursos como salvar histórico de chat ou aplicar configurações persistentes.
- **Como Configurar**: Defina este parâmetro como `true` para uma sessão de chat temporária.
- **Exemplo**: `/?temporary-chat=true`
- **Comportamento**: Isso inicia uma sessão de chat descartável sem salvar histórico ou aplicar configurações avançadas.

<details>
<summary>Exemplo de Caso de Uso</summary>
:::tip **Sessão de Chat Temporária**
Suponha que um usuário queira iniciar uma sessão de chat rápida sem salvar o histórico. Ele pode fazer isso configurando `temporary-chat=true` no URL. Isso proporciona um ambiente descartável de chat ideal para interações únicas.
:::
</details>

## Usando Múltiplos Parâmetros Juntos

Esses parâmetros de URL podem ser combinados para criar sessões de chat altamente personalizadas. Por exemplo:

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hello%20there&temporary-chat=true
```

Este URL irá:

- Inicializar o chat com `model1` e `model2`.
- Habilitar transcrição do YouTube, pesquisa na web e ferramentas especificadas.
- Exibir um sobreposto de chamada.
- Definir um prompt inicial como "Olá."
- Marcar o chat como temporário, evitando o salvamento do histórico.
