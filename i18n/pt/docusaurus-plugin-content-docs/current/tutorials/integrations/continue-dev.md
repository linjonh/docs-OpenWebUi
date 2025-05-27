---
sidebar_position: 13
title: "⚛️ Continue.dev VSCode Extension com Open WebUI"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é apoiado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Integrando Continue.dev VSCode Extension com Open WebUI

### Baixar Extensão

Você pode baixar a extensão VSCode aqui na [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)

Depois de instalada, você deve ter agora uma aba 'continue' na barra lateral. Abra esta aba.

Clique no seletor de Assistente acima do campo principal de entrada de chat. Em seguida, passe o mouse sobre "Assistente Local" e você deve ver um ícone de configurações (parece uma engrenagem).

Após clicar no ícone de configurações, um `config.yaml` deve ser aberto no editor.

Aqui você poderá configurar o Continue para usar o Open WebUI.

---

Atualmente o provedor 'ollama' não suporta autenticação, então não podemos usar este provedor com o Open WebUI.

No entanto, Ollama e Open WebUI possuem compatibilidade com a especificação da API OpenAI. Você pode ver um post no blog da Ollama [aqui](https://ollama.com/blog/openai-compatibility) sobre isso.

Ainda assim, podemos configurar o Continue para usar o provedor openai, permitindo-nos utilizar o token de autenticação do Open WebUI.

---

## Configuração

No `config.yaml`, tudo que você precisa fazer é adicionar/alterar as seguintes opções.

### Alterar provedor para openai

```yaml
provider: openai
```

### Adicionar ou atualizar apiBase

Defina isso para o domínio do Open WebUI ao final.

```yaml
apiBase: http://localhost:3000/ #Se você seguiu o Guia de Introdução com Docker
```

### Adicionar apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # Substitua pela sua chave de API
```

Você pode encontrar e gerar sua chave de API no Open WebUI -> Configurações -> Conta -> Chaves da API

Você vai querer copiar a "Chave da API" (começa com sk-)

## Exemplo de Configuração

Aqui está um exemplo básico de config.yaml usando Open WebUI via um provedor openai. Utilizando Granite Code como o modelo.
Certifique-se de carregar o modelo na sua(s) instância(s) Ollama com antecedência.

```yaml
name: Assistente Local
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Modelo ABC do pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://YOUROPENWEBUI/api
    apiKey: sk-YOUR-API-KEY
    roles:
      - chat
      - edit

  - name: Autocompletar Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-YOUR-API-KEY
    roles:
      - autocomplete

prompts:
  - name: teste
    description: Escreva testes unitários para o código destacado
    prompt: |
      Escreva um conjunto abrangente de testes unitários para o código selecionado. Ele deve configurar, executar testes que verifiquem a correção, incluindo casos extremos importantes, e encerrar. Certifique-se de que os testes sejam completos e sofisticados. Forneça os testes apenas como saída do chat, sem editar nenhum arquivo.
```

Salve seu `config.yaml` e pronto!

Agora você deve ver o modelo na seleção de modelo da aba Continue.

Selecione-o e agora você deve estar interagindo via Open WebUI (e/ou qualquer [pipelines](/pipelines) que você configurou)

Você pode fazer isso para quantos modelos quiser usar, embora qualquer modelo deva funcionar, você deve usar um modelo projetado para código.

Consulte a documentação do Continue para configurações adicionais, [Documentação do Continue](https://docs.continue.dev/reference/Model%20Providers/openai)
