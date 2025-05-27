---
sidebar_position: 4100
title: "🦊 Barra lateral do Chatbot de IA do Firefox"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para o seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## 🦊 Barra lateral do Chatbot de IA do Firefox

# Integrando o Open WebUI como um Assistente de Navegador Local de Chatbot de IA no Mozilla Firefox

## Pré-requisitos

Antes de integrar o Open WebUI como um assistente de navegador de chatbot de IA no Mozilla Firefox, certifique-se de ter:

* URL da instância do Open WebUI (local ou domínio)
* Navegador Firefox instalado

## Ativando o Chatbot de IA no Firefox

1. Clique no botão do menu hambúrguer (três linhas horizontais no canto superior direito, logo abaixo do botão `X`)
2. Abra as configurações do Firefox
2. Clique na seção `Firefox Labs`
3. Ative o `Chatbot de IA`

Alternativamente, você pode ativar o Chatbot de IA através da página `about:config` (descrita na próxima seção).

## Configurando as configurações do about:config

1. Digite `about:config` na barra de endereços do Firefox
2. Clique em `Aceitar o Risco e Continuar`
3. Procure por `browser.ml.chat.enabled` e altere para `true` se ainda não estiver ativado no Firefox Labs
4. Procure por `browser.ml.chat.hideLocalhost` e altere para `false`

### browser.ml.chat.prompts.#

Para adicionar prompts personalizados, siga estas etapas:

1. Procure por `browser.ml.chat.prompts.#` (substitua `#` por um número, ex.: `0`, `1`, `2`, etc.)
2. Clique no botão `+` para adicionar um novo prompt
3. Insira o rótulo, valor e ID do prompt (ex.: `{"id":"Meu Prompt", "value": "Este é meu prompt personalizado.", "label": "Meu Prompt"}`)
4. Repita o processo para adicionar mais prompts conforme desejado

### browser.ml.chat.provider

1. Procure por `browser.ml.chat.provider`
2. Insira o URL da sua instância do Open WebUI, incluindo quaisquer parâmetros opcionais (ex.: `https://minha-instancia-open-webui.com/?model=browser-productivity-assistant&temporary-chat=true&tools=jina_web_scrape`)

## Parâmetros de URL para Open WebUI

Os seguintes parâmetros de URL podem ser usados para personalizar sua instância do Open WebUI:

### Modelos e Seleção de Modelos

* `models`: Especificar múltiplos modelos (lista separada por vírgulas) para a sessão de chat (ex.: `/?models=model1,model2`)
* `model`: Especificar um único modelo para a sessão de chat (ex.: `/?model=model1`)

### Transcrição do YouTube

* `youtube`: Fornecer um ID de vídeo do YouTube para transcrever o vídeo no chat (ex.: `/?youtube=ID_DO_VIDEO`)

### Pesquisa na Web

* `web-search`: Ativar funcionalidade de pesquisa na web configurando este parâmetro como `true` (ex.: `/?web-search=true`)

### Seleção de Ferramentas

* `tools` ou `tool-ids`: Especificar uma lista separada por vírgulas de IDs de ferramentas para ativar no chat (ex.: `/?tools=ferramenta1,ferramenta2` ou `/?tool-ids=ferramenta1,ferramenta2`)

### Sobreposição de Chamadas

* `call`: Ativar uma sobreposição de videochamada ou chamada na interface do chat configurando este parâmetro como `true` (ex.: `/?call=true`)

### Prompt de Consulta Inicial

* `q`: Definir uma consulta ou prompt inicial para o chat (ex.: `/?q=Olá%20quem%20está%20aí`)

### Sessões Temporárias de Chat

* `temporary-chat`: Marcar o chat como uma sessão temporária configurando este parâmetro como `true` (ex.: `/?temporary-chat=true`)

Consulte https://docs.openwebui.com/features/chat-features/url-params para mais informações sobre os parâmetros de URL e como usá-los.

## Configurações Adicionais do about:config

As seguintes configurações `about:config` podem ser ajustadas para maior personalização:

* `browser.ml.chat.shortcuts`: Ativar atalhos personalizados para a barra lateral do chatbot de IA
* `browser.ml.chat.shortcuts.custom`: Ativar teclas de atalho personalizadas para a barra lateral do chatbot de IA
* `browser.ml.chat.shortcuts.longPress`: Definir o atraso de longa pressão para teclas de atalho
* `browser.ml.chat.sidebar`: Ativar a barra lateral do chatbot de IA
* `browser.ml.checkForMemory`: Verificar a memória disponível antes de carregar os modelos
* `browser.ml.defaultModelMemoryUsage`: Definir o uso padrão de memória para modelos
* `browser.ml.enable`: Ativar os recursos de aprendizado de máquina no Firefox
* `browser.ml.logLevel`: Definir o nível de log para os recursos de aprendizado de máquina
* `browser.ml.maximumMemoryPressure`: Definir o limite máximo de pressão de memória
* `browser.ml.minimumPhysicalMemory`: Definir a memória física mínima necessária
* `browser.ml.modelCacheMaxSize`: Definir o tamanho máximo do cache de modelos
* `browser.ml.modelCacheTimeout`: Definir o tempo limite para o cache de modelos
* `browser.ml.modelHubRootUrl`: Definir o URL raiz para o hub de modelos
* `browser.ml.modelHubUrlTemplate`: Definir o modelo de URL para o hub de modelos
* `browser.ml.queueWaitInterval`: Definir o intervalo de espera da fila
* `browser.ml.queueWaitTimeout`: Definir o tempo limite de espera da fila

## Acessando a Barra Lateral do Chatbot de IA

Para acessar a barra lateral do chatbot de IA, use um dos seguintes métodos:

* Pressione `CTRL+B` para abrir a barra lateral de favoritos e alternar para o Chatbot de IA
* Pressione `CTRL+Alt+X` para abrir diretamente a barra lateral do chatbot de IA