---
sidebar_position: 4
title: "🌍 Configuração de Variáveis de Ambiente"
---


## Visão Geral

O Open WebUI fornece uma ampla gama de variáveis de ambiente que permitem personalizar e configurar
vários aspectos da aplicação. Esta página serve como uma referência abrangente para todas as
variáveis de ambiente disponíveis, fornecendo seus tipos, valores padrão e descrições.
Conforme novas variáveis são introduzidas, esta página será atualizada para refletir as crescentes opções de configuração.

:::info

Esta página está atualizada com a versão de lançamento [v0.6.9](https://github.com/open-webui/open-webui/releases/tag/v0.6.9) do Open WebUI, mas ainda está sendo aprimorada para incluir descrições mais precisas, listar opções disponíveis para variáveis de ambiente, valores padrão e melhorar as descrições.

:::

### Nota Importante sobre Variáveis de Ambiente `PersistentConfig`

:::note

Ao iniciar o Open WebUI pela primeira vez, todas as variáveis de ambiente são tratadas igualmente e podem ser usadas para configurar o aplicativo. No entanto, para variáveis de ambiente marcadas como `PersistentConfig`, seus valores são persistidos e armazenados internamente.

Após o primeiro lançamento, se você reiniciar o contêiner, as variáveis de ambiente `PersistentConfig` não usarão mais os valores das variáveis de ambiente externas. Em vez disso, utilizarão os valores armazenados internamente.

Em contraste, variáveis de ambiente regulares continuarão sendo atualizadas e aplicadas a cada reinicialização subsequente.

Você pode atualizar os valores das variáveis de ambiente `PersistentConfig` diretamente dentro do Open WebUI, e essas alterações serão armazenadas internamente. Isso permite que você gerencie essas configurações independentemente das variáveis de ambiente externas.

Observe que as variáveis de ambiente `PersistentConfig` estão claramente marcadas como tal na documentação abaixo para que você possa estar ciente de como elas se comportarão.

:::

## App/Backend

As variáveis de ambiente a seguir são usadas por `backend/open_webui/config.py` para fornecer a
configuração de inicialização do Open WebUI. Observe que algumas variáveis podem ter valores padrão
diferentes dependendo se você está executando o Open WebUI diretamente ou via Docker. Para mais informações
sobre variáveis de ambiente de log, veja nossa [documentação de log](https://docs.openwebui.com/getting-started/advanced-topics/logging).

### Geral

#### `WEBUI_URL`

- Tipo: `str`
- Padrão: `http://localhost:3000`
- Descrição: Especifica a URL onde o Open WebUI está acessível. Atualmente usado para suporte de mecanismos de busca.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_SIGNUP`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a criação de conta de usuário.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_LOGIN_FORM`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa os elementos de email, senha, login e "ou" (apenas quando `ENABLE_OAUTH_SIGNUP` está ativado).
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::danger

Isso deve **apenas** ser definido como `False` quando [ENABLE_OAUTH_SIGNUP](https://docs.openwebui.com/getting-started/env-configuration/#enable_oauth_signup)
também estiver sendo usado e definido como `True`. Caso contrário, ocorrerá a impossibilidade de login.

:::

#### `DEFAULT_LOCALE`

- Tipo: `str`
- Padrão: `en`
- Descrição: Define o local padrão da aplicação.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `DEFAULT_MODELS`

- Tipo: `str`
- Padrão: String vazia ( ), ou seja, `None`.
- Descrição: Define um modelo de linguagem padrão.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `DEFAULT_USER_ROLE`

- Tipo: `str`
- Opções:
  - `pending` - Novos usuários ficam pendentes até que suas contas sejam ativadas manualmente por um administrador.
  - `user` - Novos usuários são automaticamente ativados com permissões regulares.
  - `admin` - Novos usuários são automaticamente ativados com permissões de administrador.
- Padrão: `pending`
- Descrição: Define o papel padrão atribuído aos novos usuários.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `PENDING_USER_OVERLAY_TITLE`

- Tipo: `str`
- Padrão: String vazia ( )
- Descrição: Define um título personalizado para a sobreposição de usuário pendente.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `PENDING_USER_OVERLAY_CONTENT`

- Tipo: `str`
- Padrão: String vazia ( )
- Descrição: Define um conteúdo textual personalizado para a sobreposição de usuário pendente.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_CHANNELS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa o suporte a canais.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `WEBHOOK_URL`

- Tipo: `str`
- Descrição: Define um webhook para integração com Discord/Slack/Microsoft Teams.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `ENABLE_ADMIN_EXPORT`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Controla se os usuários administradores podem exportar dados.

#### `ENABLE_ADMIN_CHAT_ACCESS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Permite que os usuários administradores acessem todos os chats.

#### `ENABLE_USER_WEBHOOKS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa os webhooks de usuários.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `RESPONSE_WATERMARK`

- Tipo: `str`
- Padrão: String vazia ( )
- Descrição: Define um texto personalizado que será incluído quando você copiar uma mensagem no chat. Por exemplo, `"Este texto foi gerado por IA"` -> adicionará "Este texto foi gerado por IA" a todas as mensagens ao serem copiadas.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `THREAD_POOL_SIZE`

- Tipo: `int`
- Padrão: `0`
- Descrição: Define o tamanho do pool de threads para chamadas bloqueantes do FastAPI/AnyIO. Por padrão (quando definido como 0), o FastAPI/AnyIO usa `40` threads. No caso de grandes instâncias e muitos usuários concorrentes, pode ser necessário aumentar `THREAD_POOL_SIZE` para evitar bloqueios.

#### `SHOW_ADMIN_DETAILS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Alterna se os detalhes do usuário administrador serão exibidos na interface.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `ADMIN_EMAIL`

- Tipo: `str`
- Descrição: Define o email do administrador exibido por `SHOW_ADMIN_DETAILS`.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `ENV`

- Tipo: `str`
- Opções:
  - `dev` - Ativa a documentação da API FastAPI em `/docs`
  - `prod` - Configura automaticamente várias variáveis de ambiente
- Padrão:
  - **Padrão Backend**: `dev`
  - **Padrão Docker**: `prod`
- Descrição: Configuração de ambiente.

#### `ENABLE_PERSISTENT_CONFIG`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Se definido como `False`, todas as variáveis `PersistentConfig` são tratadas como variáveis regulares.

#### `CUSTOM_NAME`

- Tipo: `str`
- Descrição: Define o `WEBUI_NAME`, mas consulta **api.openwebui.com** para metadados.

#### `WEBUI_NAME`

- Tipo: `str`
- Padrão: `Open WebUI`
- Descrição: Define o nome principal do WebUI. Adiciona `(Open WebUI)` se for substituído.

#### `PORT`

- Tipo: `int`
- Padrão: `8080`
- Descrição: Define a porta para executar o Open WebUI.

:::info
Se você estiver executando o aplicativo via Python e usando o comando `open-webui serve`, não poderá definir a porta usando a configuração `PORT`. Em vez disso, você deve especificá-la diretamente como um argumento de linha de comando usando a flag `--port`. Por exemplo:

```bash
open-webui serve --port 9999
```

Isso executará o Open WebUI na porta `9999`. A variável de ambiente `PORT` será desconsiderada nesse modo.
:::

#### `ENABLE_REALTIME_CHAT_SAVE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Quando ativado, o sistema salva cada bloco de dados de chat transmitidos em tempo real no banco de dados para garantir máxima persistência de dados. Este recurso oferece recuperação robusta de dados e permite rastreamento preciso da sessão. No entanto, o trade-off é o aumento da latência, já que salvar no banco de dados introduz um atraso. Desativar este recurso pode melhorar o desempenho e reduzir atrasos, mas há risco de perda de dados em caso de falha ou crash do sistema. Use com base nos requisitos de sua aplicação e trade-offs aceitáveis.

#### `BYPASS_MODEL_ACCESS_CONTROL`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ignora o controle de acesso ao modelo.

#### `WEBUI_BUILD_HASH`

- Tipo: `str`
- Padrão: `dev-build`
- Descrição: Usado para identificar o SHA do Git do build para lançamentos.

#### `WEBUI_BANNERS`

- Tipo: `list` de `dict`
- Padrão: `[]`
- Descrição: Lista de banners para mostrar aos usuários. O formato para os banners é:

```json
[{"id": "string", "type": "string [info, success, warning, error]", "title": "string", "content": "string", "dismissible": false, "timestamp": 1000}]
```

- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

:::info

Ao definir esta variável de ambiente em um arquivo `.env`, certifique-se de escapar as aspas, envolvendo todo o valor em aspas duplas e usando aspas escapadas (`\"`) para as aspas internas. Exemplo:

```
WEBUI_BANNERS="[{\"id\": \"1\", \"type\": \"warning\", \"title\": \"Suas mensagens são armazenadas.\", \"content\": \"Suas mensagens são armazenadas e podem ser revisadas por pessoas. LLMs estão sujeitas a alucinações, verifique as fontes.\", \"dismissible\": true, \"timestamp\": 1000}]"
```

:::

#### `USE_CUDA_DOCKER`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Compila a imagem Docker com suporte a NVIDIA CUDA. Habilita aceleração de GPU para Whisper local e embeddings.

#### `EXTERNAL_PWA_MANIFEST_URL`

- Tipo: `str`
- Padrão: String vazia ( ), já que `None` é definido como padrão.
- Descrição: Quando definido como um URL totalmente qualificado (ex.: https://path/to/manifest.webmanifest), as solicitações enviadas para /manifest.json usarão o arquivo de manifesto externo. Quando não definido, o arquivo padrão manifest.json será usado.

#### `ENABLE_TITLE_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita a geração de títulos de chat.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LICENSE_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica a chave de licença a ser usada (somente para usuários Enterprise).
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SSL_ASSERT_FINGERPRINT`

- Tipo: `str`
- Padrão: String vazia ( ), pois `None` é definido como padrão.
- Descrição: Especifica a impressão digital do certificado SSL a ser usada.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `DEFAULT_PROMPT_SUGGESTIONS`

- Tipo: `list` de `dict`
- Padrão: `[]` (o que significa usar as sugestões de prompt padrão integrada)
- Descrição: Lista de sugestões de prompt. O formato para sugestões de prompt é:

```json
[{"title": ["Parte do título 1", "Parte do título 2"], "content": "prompt"}]
```

### Cliente AIOHTTP

#### `AIOHTTP_CLIENT_TIMEOUT`

- Tipo: `int`
- Padrão: `300`
- Descrição: Especifica a duração do tempo limite em segundos para o cliente AIOHTTP. Isso impacta coisas como conexões com os endpoints do Ollama e OpenAI.

:::info

Este é o tempo máximo que o cliente aguardará por uma resposta antes de expirar.
Se definido como uma string vazia ( ), o tempo limite será definido como `None`, efetivamente desabilitando o limite de tempo e permitindo que o cliente espere indefinidamente.

:::

#### `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST`

- Tipo: `int`
- Padrão: `10`
- Descrição: Define o tempo limite em segundos para buscar a lista de modelos. Isso pode ser útil em casos onde a latência de rede exige um tempo limite mais longo para recuperar com sucesso a lista de modelos.

:::note
O `AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST` está definido como 10 segundos por padrão para ajudar a garantir que todas as conexões necessárias estejam disponíveis ao abrir a interface web. Essa duração permite tempo suficiente para recuperar a lista de modelos mesmo em casos de latência de rede mais alta. Você pode reduzir esse valor se preferir limites de tempo mais rápidos, mas tenha em mente que isso pode levar a algumas conexões serem interrompidas, dependendo das condições da sua rede.
:::

#### `AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST`

- Tipo: `int`
- Descrição: Define o tempo limite em segundos para buscar a lista de modelos. Isso pode ser útil em casos onde a latência de rede exige um tempo limite mais longo para recuperar com sucesso a lista de modelos.

### Diretórios

#### `DATA_DIR`

- Tipo: `str`
- Padrão: `./data`
- Descrição: Especifica o diretório base para armazenamento de dados, incluindo uploads, cache, banco de dados vetorial, etc.

#### `FONTS_DIR`

- Tipo: `str`
- Descrição: Especifica o diretório para fontes.

#### `FRONTEND_BUILD_DIR`

- Tipo: `str`
- Padrão: `../build`
- Descrição: Especifica a localização dos arquivos do frontend construídos.

#### `STATIC_DIR`

- Tipo: `str`
- Padrão: `./static`
- Descrição: Especifica o diretório para arquivos estáticos, como o favicon.

### Ollama

#### `ENABLE_OLLAMA_API`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita o uso das APIs do Ollama.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OLLAMA_BASE_URL` (`OLLAMA_API_BASE_URL` está obsoleto) {#ollama_base_url}

- Tipo: `str`
- Padrão: `http://localhost:11434`
- Padrão no Docker:
  - Se `K8S_FLAG` estiver definido: `http://ollama-service.open-webui.svc.cluster.local:11434`
  - Se `USE_OLLAMA_DOCKER=True`: `http://localhost:11434`
  - Senão `http://host.docker.internal:11434`
- Descrição: Configura o URL de backend do Ollama.

#### `OLLAMA_BASE_URLS`

- Tipo: `str`
- Descrição: Configura hosts de backend Ollama balanceados, separados por `;`. Veja
[`OLLAMA_BASE_URL`](#ollama_base_url). Tem precedência sobre [`OLLAMA_BASE_URL`](#ollama_base_url).
- Exemplo: `http://host-one:11434;http://host-two:11434`
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USE_OLLAMA_DOCKER`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Compila a imagem do Docker com uma instância Ollama integrada.

#### `K8S_FLAG`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Se definido, assume a implantação do Helm chart e define [`OLLAMA_BASE_URL`](#ollama_base_url) como `http://ollama-service.open-webui.svc.cluster.local:11434`

### OpenAI

#### `ENABLE_OPENAI_API`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita o uso das APIs do OpenAI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OPENAI_API_BASE_URL`

- Tipo: `str`
- Padrão: `https://api.openai.com/v1`
- Descrição: Configura o URL base da API do OpenAI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OPENAI_API_BASE_URLS`

- Tipo: `str`
- Descrição: Suporta URLs base da API do OpenAI balanceados, separados por ponto-e-vírgula.
- Exemplo: `http://host-one:11434;http://host-two:11434`
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OPENAI_API_KEY`

- Tipo: `str`
- Descrição: Define a chave da API do OpenAI.
- Exemplo: `sk-124781258123`
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OPENAI_API_KEYS`

- Tipo: `str`
- Descrição: Suporta múltiplas chaves de API OpenAI, separadas por ponto e vírgula.
- Exemplo: `sk-124781258123;sk-4389759834759834`
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Tarefas

#### `TASK_MODEL`

- Tipo: `str`
- Descrição: O modelo padrão a ser utilizado para tarefas como geração de títulos e consultas de pesquisa na web
quando se utilizam modelos Ollama.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TASK_MODEL_EXTERNAL`

- Tipo: `str`
- Descrição: O modelo padrão a ser utilizado para tarefas como geração de títulos e consultas de pesquisa na web
quando se utilizam endpoints compatíveis com OpenAI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TITLE_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Descrição: Prompt a ser utilizado para gerar títulos de conversas.
- Padrão: O valor da variável de ambiente `DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TITLE_GENERATION_PROMPT_TEMPLATE`:

```
### Tarefa:
Gerar um título conciso, de 3 a 5 palavras, com um emoji que resuma o histórico da conversa.
### Diretrizes:
- O título deve representar claramente o tema ou assunto principal da conversa.
- Use emojis que melhoram o entendimento do tema, mas evite aspas ou formatação especial.
- Escreva o título na língua principal do bate-papo; use inglês como padrão se for multilíngue.
- Priorize a precisão em vez de criatividade excessiva; mantenha o título claro e simples.
### Saída:
Formato JSON: { "title": "seu título conciso aqui" }
### Exemplos:
- { "title": "📉 Tendências do Mercado de Ações" },
- { "title": "🍪 Receita Perfeita de Chocolate Chip" },
- { "title": "Evolução do Streaming de Música" },
- { "title": "Dicas de Produtividade no Trabalho Remoto" },
- { "title": "Inteligência Artificial na Saúde" },
- { "title": "🎮 Insights sobre o Desenvolvimento de Jogos" }
### Histórico da Conversa:
<chat_history>
{{MESSAGES:END:2}}
</chat_history>
```

- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`

- Tipo: `str`
- Descrição: Prompt a ser utilizado ao chamar ferramentas.
- Padrão: O valor da variável de ambiente `DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`.

`DEFAULT_TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE`:

```
Ferramentas Disponíveis: {{TOOLS}}

Sua tarefa é escolher e retornar a(s) ferramenta(s) correta(s) da lista de ferramentas disponíveis com base na consulta. Siga estas diretrizes:

- Retorne apenas o objeto JSON, sem texto ou explicação adicional.

- Se nenhuma ferramenta corresponder à consulta, retorne um array vazio: 
   {
     "tool_calls": []
   }

- Se uma ou mais ferramentas corresponderem à consulta, construa uma resposta JSON contendo um array "tool_calls" com objetos que incluem:
   - "name": O nome da ferramenta.
   - "parameters": Um dicionário de parâmetros necessários e seus valores correspondentes.

O formato para a resposta JSON é estritamente:
{
  "tool_calls": [
    {"name": "toolName1", "parameters": {"key1": "value1"}},
    {"name": "toolName2", "parameters": {"key2": "value2"}}
  ]
}
```

- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Execução de Código

#### `ENABLE_CODE_EXECUTION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a execução de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_ENGINE`

- Tipo: `str`
- Padrão: `pyodide`
- Descrição: Especifica o mecanismo de execução de código a ser utilizado.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_URL`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica a URL do Jupyter para a execução de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o método de autenticação do Jupyter para a execução de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_TOKEN`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o token de autenticação do Jupyter para a execução de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_AUTH_PASSWORD`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica a senha de autenticação do Jupyter para a execução de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_EXECUTION_JUPYTER_TIMEOUT`

- Tipo: `str`
- Padrão: String vazia ( ), já que `None` é definido como padrão.
- Descrição: Especifica o tempo limite para a execução de código no Jupyter.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Interpretador de Código

#### `ENABLE_CODE_INTERPRETER`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_ENGINE`

- Tipo: `str`
- Padrão: `pyodide`
- Descrição: Especifica o mecanismo de interpretação de código a ser usado.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_PROMPT_TEMPLATE`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o modelo de prompt a ser usado para o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_URL`

- Tipo: `str`
- Padrão: String vazia ( ), uma vez que `None` está definido como padrão.
- Descrição: Especifica a URL do Jupyter a ser usada para o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH`

- Tipo: `str`
- Padrão: String vazia ( ), uma vez que `None` está definido como padrão.
- Descrição: Especifica o método de autenticação do Jupyter a ser usado para o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN`

- Tipo: `str`
- Padrão: String vazia ( ), uma vez que `None` está definido como padrão.
- Descrição: Especifica o token de autenticação do Jupyter a ser usado para o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD`

- Tipo: `str`
- Padrão: String vazia ( ), uma vez que `None` está definido como padrão.
- Descrição: Especifica a senha de autenticação do Jupyter a ser usada para o interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CODE_INTERPRETER_JUPYTER_TIMEOUT`

- Tipo: `str`
- Padrão: String vazia ( ), uma vez que `None` está definido como padrão.
- Descrição: Especifica o tempo limite para o interpretador de código Jupyter.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Conexões Diretas (Servidores de Ferramentas OpenAPI/MCPO)

#### `ENABLE_DIRECT_CONNECTIONS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita conexões diretas.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Autocompletar

#### `ENABLE_AUTOCOMPLETE_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita a geração de autocompletar.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::info

Ao habilitar `ENABLE_AUTOCOMPLETE_GENERATION`, certifique-se de configurar também `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH` e `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE` de forma adequada.

:::

#### `AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH`

- Tipo: `int`
- Padrão: `-1`
- Descrição: Define o comprimento máximo de entrada para geração de autocompletar.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Padrão: O valor da variável de ambiente `DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE`:

```
### Tarefa:
Você é um sistema de autocompletar. Continue o texto em `<text>` com base no **tipo de completamento** em `<type>` e na linguagem fornecida.

### **Instruções**:
1. Analise `<text>` para contexto e significado.
2. Use `<type>` para orientar sua saída:
   - **Geral**: Forneça uma continuação natural e concisa.
   - **Consulta de busca**: Complete como se estivesse gerando uma consulta de busca realista.
3. Comece como se estivesse diretamente continuando `<text>`. Não **repita**, parafraseie ou responda como um modelo. Simplesmente complete o texto.
4. Certifique-se de que a continuação:
   - Flui naturalmente de `<text>`.
   - Evite repetição, explicação excessiva ou ideias não relacionadas.
5. Se estiver em dúvida, retorne: `{ "text": "" }`.

### **Regras de Saída**:
- Responda apenas no formato JSON: `{ "text": "<sua_completacao>" }`.

### **Exemplos**:
#### Exemplo 1:
Entrada:
<type>General</type>
<text>O sol estava se pondo no horizonte, pintando o céu</text>
Saída:
{ "text": "com tons vibrantes de laranja e rosa." }

#### Exemplo 2:
Entrada:
<type>Search Query</type>
<text>Melhores restaurantes em</text>
Saída:
{ "text": "Nova York para culinária italiana." }

---
### Contexto:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
<type>{{TYPE}}</type>
<text>{{PROMPT}}</text>
#### Saída:
```

- Descrição: Define o modelo de prompt para geração de autocompletar.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Modelo de Arena de Avaliação

#### `ENABLE_EVALUATION_ARENA_MODELS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita modelos de arena de avaliação.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_MESSAGE_RATING`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita o recurso de classificação de mensagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_COMMUNITY_SHARING`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Controla se os usuários devem visualizar o botão para compartilhar com a comunidade.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Geração de Tags

#### `ENABLE_TAGS_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita a geração de tags.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TAGS_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Padrão: O valor da variável de ambiente `DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_TAGS_GENERATION_PROMPT_TEMPLATE`:

```
### Tarefa:
Gerar 1-3 tags gerais categorizando os principais temas do histórico do chat, juntamente com 1-3 tags mais específicas de subtemas.

### Diretrizes:
- Comece com domínios de alto nível (por exemplo, Ciência, Tecnologia, Filosofia, Artes, Política, Negócios, Saúde, Esportes, Entretenimento, Educação)
- Considere incluir subcampos/subdomínios relevantes se estiverem fortemente representados durante a conversa
- Se o conteúdo for muito curto (menos de 3 mensagens) ou muito diverso, use apenas ["Geral"]
- Use o idioma principal do chat; padrão para inglês se multilíngue
- Priorize precisão sobre especificidade

### Saída:
Formato JSON: { "tags": ["tag1", "tag2", "tag3"] }

### Histórico do Chat:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Descrição: Define o modelo de prompt para geração de tags.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Restrições de Endpoint de Chave API

#### `ENABLE_API_KEY`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita autenticação de chave API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_API_KEY_ENDPOINT_RESTRICTIONS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita restrições de endpoint de chave API para maior segurança e configurabilidade.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `API_KEY_ALLOWED_ENDPOINTS`

- Tipo: `str`
- Descrição: Especifica uma lista separada por vírgulas de endpoints API permitidos quando as restrições de endpoint de chave API estão habilitadas.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::note

O valor de `API_KEY_ALLOWED_ENDPOINTS` deve ser uma lista separada por vírgulas de URLs de endpoint, como `/api/v1/messages, /api/v1/channels`.

:::

#### `JWT_EXPIRES_IN`

- Tipo: `int`
- Padrão: `-1`
- Descrição: Define o tempo de expiração do JWT em segundos. Unidades de tempo válidas: `s`, `m`, `h`, `d`, `w` ou `-1` para sem expiração.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## Variáveis de Segurança

#### `ENABLE_FORWARD_USER_INFO_HEADERS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Encaminha informações do usuário (nome, ID, email e função) como X-headers para a API OpenAI e a API Ollama.
Se habilitado, os seguintes cabeçalhos são encaminhados:
  - `X-OpenWebUI-User-Name`
  - `X-OpenWebUI-User-Id`
  - `X-OpenWebUI-User-Email`
  - `X-OpenWebUI-User-Role`

#### `ENABLE_WEB_LOADER_SSL_VERIFICATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ignorar verificação SSL para RAG em sites.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `WEBUI_SESSION_COOKIE_SAME_SITE`

- Tipo: `str`
- Opções:
  - `lax` - Define o atributo `SameSite` como lax, permitindo que cookies de sessão sejam enviados com
requisições iniciadas por sites de terceiros.
  - `strict` - Define o atributo `SameSite` como strict, bloqueando cookies de sessão de serem enviados
com requisições iniciadas por sites de terceiros.
  - `none` - Define o atributo `SameSite` como none, permitindo que cookies de sessão sejam enviados com
requisições iniciadas por sites de terceiros, mas apenas via HTTPS.
- Padrão: `lax`
- Descrição: Define o atributo `SameSite` para cookies de sessão.

:::warning

Quando `ENABLE_OAUTH_SIGNUP` está habilitado, definir `WEBUI_SESSION_COOKIE_SAME_SITE` como `strict` pode causar falhas de login. Isso ocorre porque o Open WebUI usa um cookie de sessão para validar o callback do provedor OAuth, o que ajuda a prevenir ataques CSRF.

No entanto, um cookie de sessão `strict` não é enviado com a requisição de callback, levando a possíveis problemas de login. Se você experimentar esse problema, use o valor padrão `lax`.

:::

#### `WEBUI_SESSION_COOKIE_SECURE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Define o atributo `Secure` para cookies de sessão se configurado como `True`.

#### `WEBUI_AUTH_COOKIE_SAME_SITE`

- Tipo: `str`
- Opções:
  - `lax` - Define o atributo `SameSite` como lax, permitindo que cookies de autenticação sejam enviados com
requisições iniciadas por sites de terceiros.
  - `strict` - Define o atributo `SameSite` como strict, bloqueando cookies de autenticação de serem enviados
com requisições iniciadas por sites de terceiros.
  - `none` - Define o atributo `SameSite` como none, permitindo que cookies de autenticação sejam enviados com
requisições iniciadas por sites de terceiros, mas apenas via HTTPS.
- Padrão: `lax`
- Descrição: Define o atributo `SameSite` para cookies de autenticação.

:::info

Se o valor não estiver configurado, `WEBUI_SESSION_COOKIE_SAME_SITE` será usado como fallback.

:::

#### `WEBUI_AUTH_COOKIE_SECURE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Define o atributo `Secure` para cookies de autenticação se configurado como `True`.

:::info

Se o valor não for definido, `WEBUI_SESSION_COOKIE_SECURE` será usado como alternativa.

:::

#### `WEBUI_AUTH`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Esta configuração habilita ou desabilita a autenticação.

:::danger

Se configurado como `False`, a autenticação será desabilitada para sua instância do Open WebUI. No entanto, é
importante observar que desativar a autenticação só é possível em instalações novas sem
usuários existentes. Se já houver usuários registrados, você não poderá desativar a autenticação
diretamente. Certifique-se de que não há usuários presentes no banco de dados se pretende desativar `WEBUI_AUTH`.

:::

#### `WEBUI_SECRET_KEY`

- Tipo: `str`
- Padrão: `t0p-s3cr3t`
- Padrão no Docker: Gerado aleatoriamente na primeira inicialização
- Descrição: Substitui a string gerada aleatoriamente usada para JSON Web Token.

:::info

Ao implantar o Open-WebUI em um cluster com múltiplos nós e um balanceador de carga, é necessário garantir que o valor de WEBUI_SECRET_KEY seja o mesmo em todas as instâncias para permitir que os usuários continuem trabalhando caso um nó seja reciclado ou sua sessão seja transferida para outro nó. Sem esta configuração, eles precisarão fazer login novamente cada vez que o nó subjacente mudar.

:::

#### `OFFLINE_MODE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita ou desabilita o modo offline.

#### `RESET_CONFIG_ON_START`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Reseta o arquivo `config.json` na inicialização.

#### `SAFE_MODE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita o modo seguro, que desabilita funções potencialmente inseguras, desativando todas as funções.

#### `CORS_ALLOW_ORIGIN`

- Tipo: `str`
- Padrão: `*`
- Descrição: Define as origens permitidas para o compartilhamento de recursos entre origens (CORS).

#### `RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Determina se modelos personalizados definidos no Hub em seus próprios arquivos de modelagem serão permitidos.

#### `RAG_RERANKING_MODEL_TRUST_REMOTE_CODE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Determina se modelos personalizados definidos no Hub em seus próprios arquivos de modelagem para reranqueamento serão permitidos.

#### `RAG_EMBEDDING_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Alterna a atualização automática do modelo Sentence-Transformer.

#### `RAG_RERANKING_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Alterna a atualização automática do modelo de reranqueamento.

## Banco de Dados Vetorial

#### `VECTOR_DB`

- Tipo: `str`
- Opções:
- `chroma`, `elasticsearch`, `milvus`, `opensearch`, `pgvector`, `qdrant`, `pinecone`
- Padrão: `chroma`
- Descrição: Especifica qual sistema de banco de dados vetorial usar. Essa configuração determina qual sistema de armazenamento vetorial será utilizado para gerenciar embeddings.

### ChromaDB

#### `CHROMA_TENANT`

- Tipo: `str`
- Padrão: O valor de `chromadb.DEFAULT_TENANT` (uma constante no módulo `chromadb`)
- Descrição: Define o inquilino para o ChromaDB usar na incorporação de RAG.

#### `CHROMA_DATABASE`

- Tipo: `str`
- Padrão: O valor de `chromadb.DEFAULT_DATABASE` (uma constante no módulo `chromadb`)
- Descrição: Define o banco de dados no inquilino do ChromaDB para usar na incorporação de RAG.

#### `CHROMA_HTTP_HOST`

- Tipo: `str`
- Descrição: Especifica o nome do host de um servidor ChromaDB remoto. Usa uma instância local do ChromaDB se não configurado.

#### `CHROMA_HTTP_PORT`

- Tipo: `int`
- Padrão: `8000`
- Descrição: Especifica a porta de um servidor ChromaDB remoto.

#### `CHROMA_HTTP_HEADERS`

- Tipo: `str`
- Descrição: Uma lista separada por vírgulas de cabeçalhos HTTP para incluir em todas as solicitações ao ChromaDB.
- Exemplo: `Authorization=Bearer heuhagfuahefj,User-Agent=OpenWebUI`.

#### `CHROMA_HTTP_SSL`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Controla se SSL é usado para conexões ao servidor ChromaDB.

#### `CHROMA_CLIENT_AUTH_PROVIDER`

- Tipo: `str`
- Descrição: Especifica um provedor de autenticação para o servidor remoto ChromaDB.
- Exemplo: `chromadb.auth.basic_authn.BasicAuthClientProvider`

#### `CHROMA_CLIENT_AUTH_CREDENTIALS`

- Tipo: `str`
- Descrição: Especifica credenciais de autenticação para o servidor remoto ChromaDB.
- Exemplo: `username:password`

### Elasticsearch

#### `ELASTICSEARCH_API_KEY`

- Tipo: `str`
- Padrão: String vazia (` ''`), já que o valor padrão é `None`.
- Descrição: Especifica a chave API do Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_CA_CERTS`

- Tipo: `str`
- Padrão: String vazia (`''`), já que o valor padrão é `None`.
- Descrição: Especifica o caminho para os certificados CA do Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_CLOUD_ID`

- Tipo: `str`
- Padrão: String vazia (`''`), já que o valor padrão é `None`.
- Descrição: Especifica o ID na nuvem do Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_INDEX_PREFIX`

- Tipo: `str`
- Padrão: `open_webui_collections`
- Descrição: Especifica o prefixo para o índice do Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_PASSWORD`

- Tipo: `str`
- Padrão: String vazia ( ), já que `None` é definido como padrão.
- Descrição: Especifica a senha para o Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_URL`

- Tipo: `str`
- Padrão: `https://localhost:9200`
- Descrição: Especifica a URL para a instância do Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ELASTICSEARCH_USERNAME`

- Tipo: `str`
- Padrão: String vazia ( ), já que `None` é definido como padrão.
- Descrição: Especifica o nome de usuário para o Elasticsearch.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Milvus

#### `MILVUS_URI`

- Tipo: `str`
- Padrão: `${DATA_DIR}/vector_db/milvus.db`
- Descrição: Especifica o URI para conexão ao banco de dados vetorial Milvus. Isso pode apontar para um servidor Milvus local ou remoto com base na configuração de implantação.

#### `MILVUS_DB`

- Tipo: `str`
- Padrão: `default`
- Descrição: Especifica o banco de dados para se conectar dentro de uma instância do Milvus.

#### `MILVUS_TOKEN`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica um token de conexão opcional para o Milvus.

#### `MILVUS_INDEX_TYPE`

- Tipo: `str`
- Padrão: `HNSW`
- Opções: `AUTOINDEX`, `FLAT`, `IVF_FLAT`, `HNSW`
- Descrição: Especifica o tipo de índice a ser usado ao criar uma nova coleção no Milvus. `AUTOINDEX` é geralmente recomendado para o Milvus independente. `HNSW` pode oferecer melhor desempenho, mas normalmente requer uma configuração Milvus clusterizada.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `MILVUS_METRIC_TYPE`

- Tipo: `str`
- Padrão: `COSINE`
- Opções: `COSINE`, `IP`, `L2`
- Descrição: Especifica o tipo de métrica para busca de similaridade vetorial no Milvus.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `MILVUS_HNSW_M`

- Tipo: `int`
- Padrão: `16`
- Descrição: Especifica o parâmetro `M` para o tipo de índice HNSW no Milvus. Isso influencia o número de links bidirecionais criados para cada novo elemento durante a construção. Aplicável apenas se `MILVUS_INDEX_TYPE` for `HNSW`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `MILVUS_HNSW_EFCONSTRUCTION`

- Tipo: `int`
- Padrão: `100`
- Descrição: Especifica o parâmetro `efConstruction` para o tipo de índice HNSW no Milvus. Isso influencia o tamanho da lista dinâmica para os vizinhos mais próximos durante a construção do índice. Aplicável apenas se `MILVUS_INDEX_TYPE` for `HNSW`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `MILVUS_IVF_FLAT_NLIST`

- Tipo: `int`
- Padrão: `128`
- Descrição: Especifica o parâmetro `nlist` para o tipo de índice IVF_FLAT no Milvus. Este é o número de unidades de cluster. Aplicável apenas se `MILVUS_INDEX_TYPE` for `IVF_FLAT`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### OpenSearch

#### `OPENSEARCH_CERT_VERIFY`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a verificação de certificado do OpenSearch.

#### `OPENSEARCH_PASSWORD`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a senha para o OpenSearch.

#### `OPENSEARCH_SSL`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa o SSL para o OpenSearch.

#### `OPENSEARCH_URI`

- Tipo: `str`
- Padrão: `https://localhost:9200`
- Descrição: Define o URI para o OpenSearch.

#### `OPENSEARCH_USERNAME`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define o nome de usuário para o OpenSearch.

### PGVector

#### `PGVECTOR_DB_URL`

- Tipo: `str`
- Padrão: O valor da variável de ambiente `DATABASE_URL`
- Descrição: Define a URL do banco de dados para armazenamento de modelos.

#### `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH`

- Tipo: `str`
- Padrão: `1536`
- Descrição: Especifica o comprimento máximo do vetor para a inicialização do PGVector.

### Qdrant

#### `QDRANT_API_KEY`

- Tipo: `str`
- Descrição: Define a chave API para o Qdrant.

#### `QDRANT_URI`

- Tipo: `str`
- Descrição: Define o URI para o Qdrant.

#### `QDRANT_ON_DISK`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita o uso de memmap (também conhecido como armazenamento em disco).

#### `QDRANT_PREFER_GRPC`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Usa a interface gPRC sempre que possível.

#### `QDRANT_GRPC_PORT`

- Tipo: `int`
- Padrão: `6334`
- Descrição: Define o número da porta gRPC para o Qdrant.

#### `ENABLE_QDRANT_MULTITENANCY_MODE`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa o padrão de multitenancy para o gerenciamento de coleções do Qdrant, o que reduz significativamente o uso de RAM e a sobrecarga computacional consolidando estruturas de dados vetoriais similares. Recomenda-se ativar.

:::info

Isso desconectará todas as coleções do Qdrant criadas no padrão anterior, que não é multitenancy. Vá para `Admin Settings` > `Documents` > `Reindex Knowledge Base` para migrar os conhecimentos existentes.

As coleções Qdrant criadas no padrão anterior ainda consumirão recursos.

Atualmente, não há um botão na interface para apenas redefinir o banco de dados vetorial. Se você quiser migrar o conhecimento para multitenancy:
- Remova todas as coleções com o prefixo `open_webui-knowledge` (ou o prefixo `open_webui` para remover todas as coleções relacionadas ao Open WebUI) usando o cliente nativo do Qdrant
- Vá para `Configurações do Administrador` > `Documentos` > `Reindexar Base de Conhecimento` para migrar a base de conhecimento existente

`Reindexar Base de Conhecimento` migrará SOMENTE a base de conhecimento

:::

:::danger

Se você decidir usar o padrão multitenancy como padrão e não precisar migrar o conhecimento antigo, vá para `Configurações do Administrador` > `Documentos` para redefinir os vetores e o conhecimento, o que excluirá todas as coleções com o prefixo `open_webui` e todo o conhecimento armazenado.

:::

### Pinecone

Ao usar o Pinecone como o repositório vetorial, as seguintes variáveis de ambiente são usadas para controlar seu comportamento. Certifique-se de definir essas variáveis no seu arquivo `.env` ou ambiente de implantação.

#### `PINECONE_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave de API usada para autenticar com o serviço Pinecone.

#### `PINECONE_ENVIRONMENT`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o ambiente Pinecone para se conectar (ex.: `us-west1-gcp`, `gcp-starter`, etc.).

#### `PINECONE_INDEX_NAME`

- Tipo: `str`
- Padrão: `open-webui-index`
- Descrição: Define o nome do índice Pinecone que será usado para armazenar e consultar incorporações vetoriais.

#### `PINECONE_DIMENSION`

- Tipo: `int`
- Padrão: `1536`
- Descrição: A dimensionalidade das incorporações vetoriais. Deve corresponder à dimensão esperada pelo índice (comumente 768, 1024, 1536 ou 3072 dependendo do modelo usado).

#### `PINECONE_METRIC`

- Tipo: `str`
- Padrão: `cosine`
- Opções: `cosine`, `dotproduct`, `euclidean`
- Descrição: Especifica a métrica de similaridade a ser usada para comparações vetoriais dentro do índice Pinecone.

#### `PINECONE_CLOUD`

- Tipo: `str`
- Padrão: `aws`
- Opções: `aws`, `gcp`, `azure`
- Descrição: Especifica o provedor de nuvem onde o índice Pinecone está hospedado.

## Motor de Extração de Conteúdo RAG

#### `CONTENT_EXTRACTION_ENGINE`

- Tipo: `str`
- Opções:
  - Deixe vazio para usar o padrão
  - `external` - Usar carregador externo
  - `tika` - Usar um servidor Apache Tika local
  - `docling` - Usar o motor Docling
  - `document_intelligence` - Usar o motor Document Intelligence
  - `mistral_ocr` - Usar o motor Mistral OCR
- Descrição: Define o motor de extração de conteúdo para ingestão de documentos.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `MISTRAL_OCR_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica a chave da API do Mistral OCR a ser usada.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_URL`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define o URL para o serviço de carregador de documentos externo.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `EXTERNAL_DOCUMENT_LOADER_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave da API para autenticação com o serviço de carregador de documentos externo.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `TIKA_SERVER_URL`

- Tipo: `str`
- Padrão: `http://localhost:9998`
- Descrição: Define o URL para o servidor Apache Tika.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `DOCLING_SERVER_URL`

- Tipo: `str`
- Padrão: `http://docling:5001`
- Descrição: Especifica o URL para o servidor Docling.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `DOCLING_OCR_ENGINE`

- Tipo: `str`  
- Padrão: `tesseract`  
- Descrição: Especifica o motor OCR usado pelo Docling.  
  Os valores suportados incluem: `tesseract` (padrão), `easyocr`, `ocrmac`, `rapidocr` e `tesserocr`.  
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `DOCLING_OCR_LANG`

- Tipo: `str`  
- Padrão: `eng,fra,deu,spa` (quando usando o motor `tesseract` padrão)  
- Descrição: Especifica as linguagens OCR a serem usadas com o `DOCLING_OCR_ENGINE` configurado.  
  O formato e os códigos de idioma disponíveis dependem do motor OCR selecionado.  
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

## Geração de Recuperação Aumentada (RAG)

#### `RAG_EMBEDDING_ENGINE`

- Tipo: `str`
- Opções:
  - Deixe vazio para `Default (SentenceTransformers)` - Usa SentenceTransformers para incorporações.
  - `ollama` - Usa a API Ollama para incorporações.
  - `openai` - Usa a API OpenAI para incorporações.
- Descrição: Seleciona um motor de incorporação para usar com RAG.
- Persistência: Esta variável de ambiente é uma variável do tipo `PersistentConfig`.

#### `RAG_EMBEDDING_MODEL`

- Tipo: `str`
- Padrão: `sentence-transformers/all-MiniLM-L6-v2`
- Descrição: Define um modelo para incorporações. Localmente, é usado um modelo Sentence-Transformer.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_RAG_HYBRID_SEARCH`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita o uso de busca em conjunto com `BM25` + `ChromaDB`, com reranqueamento usando modelos do tipo `sentence_transformers`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_TOP_K`

- Tipo: `int`
- Padrão: `3`
- Descrição: Define o número padrão de resultados a considerar para a incorporação ao usar RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_TOP_K_RERANKER`

- Tipo: `int`
- Padrão: `3`
- Descrição: Define o número padrão de resultados a considerar para o reranqueador ao usar RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_RELEVANCE_THRESHOLD`

- Tipo: `float`
- Padrão: `0.0`
- Descrição: Define o limite de relevância para considerar documentos ao usar com reranqueamento.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_HYBRID_BM25_WEIGHT`

- Tipo: `float`
- Padrão: `0.5`
- Descrição: Define o peso dado à busca por palavras-chave (BM25) durante a busca híbrida. 1 significa apenas busca por palavras-chave, 0 significa apenas busca vetorial.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_TEMPLATE`

- Tipo: `str`
- Padrão: O valor da variável de ambiente `DEFAULT_RAG_TEMPLATE`.

`DEFAULT_RAG_TEMPLATE`:

```
### Tarefa:
Responda à consulta do usuário usando o contexto fornecido, incorporando citações no formato [id] **apenas quando a tag <source> incluir um atributo id explícito** (por exemplo, <source id="1">).

### Diretrizes:
- Se você não souber a resposta, diga claramente isso.
- Se estiver em dúvida, peça esclarecimento ao usuário.
- Responda na mesma língua da consulta do usuário.
- Se o contexto for ilegível ou de baixa qualidade, informe o usuário e forneça a melhor resposta possível.
- Se a resposta não estiver no contexto, mas você possuir o conhecimento, explique isso ao usuário e forneça a resposta com base em sua própria compreensão.
- **Inclua citações inline usando [id] (por exemplo, [1], [2]) somente quando a tag <source> incluir um atributo id.**
- Não cite se a tag <source> não contiver um atributo id.
- Não use tags XML na sua resposta.
- Assegure que as citações sejam concisas e diretamente relacionadas à informação fornecida.

### Exemplo de Citação:
Se o usuário perguntar sobre um assunto específico e a informação for encontrada em uma fonte com um atributo id fornecido, a resposta deve incluir a citação como no exemplo a seguir:
* "De acordo com o estudo, o método proposto aumenta a eficiência em 20% [1]."

### Saída:
Forneça uma resposta clara e direta à consulta do usuário, incluindo citações inline no formato [id] apenas quando a tag <source> com atributo id estiver presente no contexto.

<context>
{{CONTEXT}}
</context>

<user_query>
{{QUERY}}
</user_query>
```

- Descrição: Modelo a ser usado ao injetar documentos RAG em uma conclusão de chat.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_TEXT_SPLITTER`

- Tipo: `str`
- Opções:
  - `character`
  - `token`
- Padrão: `character`
- Descrição: Define o divisor de texto para modelos RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TIKTOKEN_CACHE_DIR`

- Tipo: `str`
- Padrão: `{CACHE_DIR}/tiktoken`
- Descrição: Define o diretório para o cache TikToken.

#### `TIKTOKEN_ENCODING_NAME`

- Tipo: `str`
- Padrão: `cl100k_base`
- Descrição: Define o nome da codificação para TikToken.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CHUNK_SIZE`

- Tipo: `int`
- Padrão: `1000`
- Descrição: Define o tamanho do fragmento do documento para incorporações.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `CHUNK_OVERLAP`

- Tipo: `int`
- Padrão: `100`
- Descrição: Especifica quanto de sobreposição deve haver entre fragmentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `PDF_EXTRACT_IMAGES`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Extrai imagens de PDFs usando OCR ao carregar documentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_FILE_MAX_SIZE`

- Tipo: `int`
- Descrição: Define o tamanho máximo de um arquivo em megabytes que pode ser carregado para ingestão de documentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_FILE_MAX_COUNT`

- Tipo: `int`
- Descrição: Define o número máximo de arquivos que podem ser carregados de uma vez para ingestão de documentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::info

Ao configurar `RAG_FILE_MAX_SIZE` e `RAG_FILE_MAX_COUNT`, certifique-se de que os valores sejam razoáveis para evitar uploads excessivos de arquivos e possíveis problemas de desempenho.

:::

#### `RAG_ALLOWED_FILE_EXTENSIONS`

- Tipo: `list` de `str`
- Padrão: `[]` (o que significa que todos os tipos de arquivo suportados são permitidos)
- Descrição: Especifica quais extensões de arquivo são permitidas para upload.

```json
["pdf,docx,txt"]
```

- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_RERANKING_MODEL`

- Tipo: `str`
- Descrição: Define um modelo para reranqueamento de resultados. Localmente, um modelo Sentence-Transformer é usado.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_OPENAI_API_BASE_URL`

- Tipo: `str`
- Padrão: `${OPENAI_API_BASE_URL}`
- Descrição: Define a URL base da API OpenAI a ser usada para embeddings RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_OPENAI_API_KEY`

- Tipo: `str`
- Padrão: `${OPENAI_API_KEY}`
- Descrição: Define a chave da API OpenAI a ser usada para embeddings RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_EMBEDDING_OPENAI_BATCH_SIZE`

- Tipo: `int`
- Padrão: `1`
- Descrição: Define o tamanho do lote para embeddings OpenAI.

#### `RAG_EMBEDDING_BATCH_SIZE`

- Tipo: `int`
- Padrão: `1`
- Descrição: Define o tamanho do lote para embedding em modelos RAG (Retrieval-Augmented Generator).
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_OLLAMA_API_KEY`

- Tipo: `str`
- Descrição: Define a chave da API para a API Ollama usada em modelos RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_OLLAMA_BASE_URL`

- Tipo: `str`
- Descrição: Define a URL base para a API Ollama usada em modelos RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_RETRIEVAL_QUERY_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita a geração de consulta de recuperação.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `QUERY_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Padrão: O valor da variável de ambiente `DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`.

`DEFAULT_QUERY_GENERATION_PROMPT_TEMPLATE`:

```
### Tarefa:
Analise o histórico de bate-papo para determinar a necessidade de gerar consultas de pesquisa, no idioma fornecido. Por padrão, **priorize a geração de 1-3 consultas de pesquisa amplas e relevantes**, a menos que tenha absoluta certeza de que nenhuma informação adicional é necessária. O objetivo é recuperar informações abrangentes, atualizadas e valiosas mesmo com mínima incerteza. Se nenhuma pesquisa for inequivocamente necessária, retorne uma lista vazia.

### Diretrizes:
- Responda **EXCLUSIVAMENTE** com um objeto JSON. Qualquer forma de comentário extra, explicação ou texto adicional é estritamente proibida.
- Ao gerar consultas de pesquisa, responda no formato: { "queries": ["consulta1", "consulta2"] }, garantindo que cada consulta seja distinta, concisa e relevante para o tópico.
- Se e somente se tiver certeza absoluta de que nenhum resultado útil pode ser recuperado por uma pesquisa, retorne: { "queries": [] }.
- Prefira sugerir consultas de pesquisa caso haja **qualquer chance** de que possam fornecer informações úteis ou atualizadas.
- Seja conciso e focado em compor consultas de pesquisa de alta qualidade, evitando elaborações desnecessárias, comentários ou suposições.
- A data de hoje é: {{CURRENT_DATE}}.
- Sempre priorize fornecer consultas acionáveis e amplas que maximizem a cobertura informacional.

### Resultado:
Retorne estritamente no formato JSON:
{
  "queries": ["consulta1", "consulta2"]
}

### Histórico de bate-papo:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

- Descrição: Define o modelo de prompt para geração de consultas.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `BYPASS_EMBEDDING_AND_RETRIEVAL`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ignora o processo de embedding e recuperação.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_ENDPOINT`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o endpoint para inteligência de documentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `DOCUMENT_INTELLIGENCE_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica a chave para inteligência de documentos.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_RAG_LOCAL_WEB_FETCH`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita ou desabilita o fetch local da web para RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_EMBEDDING_CONTENT_PREFIX`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o prefixo para o conteúdo de embedding RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_EMBEDDING_PREFIX_FIELD_NAME`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o nome do campo para o prefixo de embedding RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_EMBEDDING_QUERY_PREFIX`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o prefixo para a consulta de embedding RAG.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `RAG_FULL_CONTEXT`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Especifica se deve usar o contexto completo para RAG.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### Google Drive

#### `ENABLE_GOOGLE_DRIVE_INTEGRATION`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a integração com o Google Drive. Se configurado como verdadeiro, e `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` forem ambos configurados, o Google Drive aparecerá como uma opção de upload na interface de chat.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

:::info

Ao ativar `GOOGLE_DRIVE_INTEGRATION`, certifique-se de que configurou corretamente `GOOGLE_DRIVE_CLIENT_ID` e `GOOGLE_DRIVE_API_KEY`, e tenha revisado os termos de serviço e diretrizes de uso do Google.

:::

#### `GOOGLE_DRIVE_CLIENT_ID`

- Tipo: `str`
- Descrição: Define o ID do cliente para o Google Drive (o cliente deve ser configurado com a API do Drive e a API Picker ativadas).
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_DRIVE_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para a integração com o Google Drive.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### OneDrive

#### `ENABLE_ONEDRIVE_INTEGRATION`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a integração com o OneDrive.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `ONEDRIVE_CLIENT_ID`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o ID do cliente para a integração com o OneDrive.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

## Busca na Web

#### `ENABLE_WEB_SEARCH`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa o recurso de busca na web.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `ENABLE_SEARCH_QUERY_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a geração de consultas de pesquisa.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WEB_SEARCH_TRUST_ENV`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa o proxy definido por `http_proxy` e `https_proxy` durante a obtenção de conteúdos de busca na web.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WEB_SEARCH_RESULT_COUNT`

- Tipo: `int`
- Padrão: `3`
- Descrição: Número máximo de resultados de busca para rastrear.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WEB_SEARCH_CONCURRENT_REQUESTS`

- Tipo: `int`
- Padrão: `10`
- Descrição: Número de requisições simultâneas para rastrear páginas da web retornadas nos resultados de busca.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WEB_SEARCH_ENGINE`

- Tipo: `str`
- Opções:
  - `searxng` - Usa o mecanismo de busca [SearXNG](https://github.com/searxng/searxng).
  - `google_pse` - Usa o [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/).
  - `brave` - Usa o mecanismo de busca [Brave](https://brave.com/search/api/).
  - `kagi` - Usa o mecanismo de busca [Kagi](https://www.kagi.com/).
  - `mojeek` - Usa o mecanismo de busca [Mojeek](https://www.mojeek.com/).
  - `bocha` - Usa o mecanismo de busca Bocha.
  - `serpstack` - Usa o mecanismo de busca [Serpstack](https://serpstack.com/).
  - `serper` - Usa o mecanismo de busca [Serper](https://serper.dev/).
  - `serply` - Usa o mecanismo de busca [Serply](https://serply.io/).
  - `searchapi` - Usa o mecanismo de busca [SearchAPI](https://www.searchapi.io/).
  - `serpapi` - Usa o mecanismo de busca [SerpApi](https://serpapi.com/).
  - `duckduckgo` - Usa o mecanismo de busca [DuckDuckGo](https://duckduckgo.com/).
  - `tavily` - Usa o mecanismo de busca [Tavily](https://tavily.com/).
  - `jina` - Usa o mecanismo de busca [Jina](https://jina.ai/).
  - `bing` - Usa o mecanismo de busca [Bing](https://www.bing.com/).
  - `exa` - Usa o mecanismo de busca [Exa](https://exa.ai/).
  - `perplexity` - Usa o mecanismo de busca [Perplexity AI](https://www.perplexity.ai/).
  - `sougou` - Usa o mecanismo de busca [Sougou](https://www.sogou.com/).
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ignora o processo de incorporação e recuperação da busca na web.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `SEARXNG_QUERY_URL`

- Tipo: `str`
- Descrição: A URL da API de busca [SearXNG](https://docs.searxng.org/dev/search_api.html) que suporta saída JSON. `<query>` é substituído pela consulta de busca. Exemplo: `http://searxng.local/search?q=<query>`
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_PSE_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o serviço Google Programmable Search Engine (PSE).
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_PSE_ENGINE_ID`

- Tipo: `str`
- Descrição: O ID do mecanismo para o serviço Google Programmable Search Engine (PSE).
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `BRAVE_SEARCH_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Brave Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `KAGI_SEARCH_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Kagi Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `MOJEEK_SEARCH_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Mojeek Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPSTACK_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Serpstack search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPSTACK_HTTPS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Configura o uso de HTTPS para solicitações do Serpstack. Solicitações no plano gratuito são restritas apenas a HTTP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPER_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Serper search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPLY_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Serply search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SEARCHAPI_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o SearchAPI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SEARCHAPI_ENGINE`

- Tipo: `str`
- Descrição: Define o mecanismo do SearchAPI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TAVILY_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Tavily search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `JINA_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para o Jina.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `BING_SEARCH_V7_ENDPOINT`

- Tipo: `str`
- Descrição: Define o endpoint para o Bing Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `BING_SEARCH_V7_SUBSCRIPTION_KEY`

- Tipo: `str`
- Padrão: `https://api.bing.microsoft.com/v7.0/search`
- Descrição: Define a chave de assinatura para o Bing Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `BOCHA_SEARCH_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave de API para o Bocha Search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `EXA_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave de API para o Exa search API.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPAPI_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave de API para o SerpAPI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SERPAPI_ENGINE`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o mecanismo de busca a ser usado para o SerpAPI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SOUGOU_API_SID`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define o SID da API Sogou.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `SOUGOU_API_SK`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define o SK da API Sogou.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `TAVILY_EXTRACT_DEPTH`

- Tipo: `str`
- Padrão: `basic`
- Descrição: Especifica a profundidade de extração para os resultados de busca do Tavily.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Configuração do Web Loader

#### `WEB_LOADER_ENGINE`

- Tipo: `str`
- Padrão: `safe_web`
- Descrição: Especifica o carregador a ser usado para recuperar e processar conteúdo web.
- Opções:
  - `requests` - Usa o módulo Requests com tratamento de erros aprimorado.
  - `playwright` - Usa o Playwright para renderização e interação avançada com páginas da web.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::info

Ao usar `playwright`, você tem duas opções:

1. Se `PLAYWRIGHT_WS_URI` não estiver definido, o Playwright com dependências do Chromium será automaticamente instalado no contêiner Open WebUI ao inicializar.
2. Se `PLAYWRIGHT_WS_URI` estiver definido, o Open WebUI se conectará a uma instância de navegador remoto em vez de instalar dependências localmente.

:::

#### `PLAYWRIGHT_WS_URL`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o URI WebSocket de uma instância remota do navegador Playwright. Quando definido, o Open WebUI usará este navegador remoto em vez de instalar as dependências do navegador localmente. Isso é particularmente útil em ambientes conteinerizados onde você deseja manter o contêiner Open WebUI leve e separado das dependências do navegador. Exemplo: `ws://playwright:3000`
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

:::dica

Usar um navegador remoto Playwright via `PLAYWRIGHT_WS_URL` pode ser benéfico para:

- Reduzir o tamanho do contêiner Open WebUI
- Usar um navegador diferente do padrão Chromium
- Conectar-se a um navegador com interface gráfica (GUI), não apenas headless

:::

#### `FIRECRAWL_API_BASE_URL`

- Tipo: `str`
- Padrão: `https://api.firecrawl.dev`
- Descrição: Define a URL base para a API Firecrawl.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `FIRECRAWL_API_KEY`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Define a chave da API Firecrawl.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `PERPLEXITY_API_KEY`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Define a chave da API Perplexity.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `PLAYWRIGHT_TIMEOUT`

- Tipo: `int`
- Padrão: String vazia (' '), pois o valor padrão é `Nenhum`.
- Descrição: Especifica o tempo limite para solicitações do Playwright.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### Carregador do YouTube

#### `YOUTUBE_LOADER_PROXY_URL`

- Tipo: `str`
- Descrição: Define a URL do proxy para o carregador do YouTube.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `YOUTUBE_LOADER_LANGUAGE`

- Tipo: `str`
- Padrão: `en`
- Descrição: Lista de códigos de idioma separados por vírgulas para tentar ao buscar transcrições de vídeos do YouTube, em ordem de prioridade.
- Exemplo: Se configurado para `es,de`, primeiro serão tentadas transcrições em espanhol; caso não estejam disponíveis, serão tentadas em alemão e, por último, em inglês. Nota: Se nenhum desses idiomas estiver disponível e `en` não estiver na lista, o sistema tentará automaticamente o inglês como último recurso.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

## Áudio

### Whisper Speech-to-Text (Local)

#### `WHISPER_MODEL`

- Tipo: `str`
- Padrão: `base`
- Descrição: Define o modelo Whisper a ser usado para Speech-to-Text. O backend utilizado é o faster_whisper com quantização em `int8`.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WHISPER_MODEL_DIR`

- Tipo: `str`
- Padrão: `${DATA_DIR}/cache/whisper/models`
- Descrição: Especifica o diretório onde os arquivos do modelo Whisper serão armazenados.

#### `WHISPER_VAD_FILTER`

- Tipo: `bool`
- Padrão: `Falso`
- Descrição: Especifica se um filtro de Detecção de Atividade Vocal (VAD) deve ser aplicado no Whisper Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WHISPER_MODEL_AUTO_UPDATE`

- Tipo: `bool`
- Padrão: `Falso`
- Descrição: Alterna a atualização automática do modelo Whisper.

#### `WHISPER_LANGUAGE`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Especifica o idioma ISO 639-1 que Whisper usa para STT (ISO 639-2 para havaiano e cantonês). O Whisper prevê o idioma por padrão.

### Speech-to-Text (OpenAI)

#### `AUDIO_STT_ENGINE`

- Tipo: `str`
- Opções:
  - Deixar vazio para usar o mecanismo Whisper local integrado para Speech-to-Text.
  - `openai` - Usa o mecanismo OpenAI para Speech-to-Text.
  - `deepgram`- Usa o mecanismo Deepgram para Speech-to-Text.
  - `azure` Usa o mecanismo Azure para Speech-to-Text.
- Descrição: Especifica o mecanismo de Speech-to-Text a ser usado.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `AUDIO_STT_MODEL`

- Tipo: `str`
- Padrão: `whisper-1`
- Descrição: Especifica o modelo de Speech-to-Text a ser usado para endpoints compatíveis com OpenAI.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_BASE_URL`

- Tipo: `str`
- Padrão: `${OPENAI_API_BASE_URL}`
- Descrição: Define a URL base compatível com OpenAI a ser usada para Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `AUDIO_STT_OPENAI_API_KEY`

- Tipo: `str`
- Padrão: `${OPENAI_API_KEY}`
- Descrição: Define a chave de API OpenAI a ser usada para Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### Speech-to-Text (Azure)

#### `AUDIO_STT_AZURE_API_KEY`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Especifica a chave de API Azure a ser usada para Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `AUDIO_STT_AZURE_REGION`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Especifica a região Azure a ser usada para Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `AUDIO_STT_AZURE_LOCALES`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Especifica os locais a serem usados para Azure Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### Speech-to-Text (Deepgram)

#### `DEEPGRAM_API_KEY`

- Tipo: `str`
- Padrão: `Nenhum`
- Descrição: Especifica a chave de API do Deepgram a ser usada para Speech-to-Text.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Texto para Fala

#### `AUDIO_TTS_API_KEY`

- Tipo: `str`
- Descrição: Define a chave de API para Texto para Fala.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_ENGINE`

- Tipo: `str`
- Opções:
  - Deixe vazio para usar o motor WebAPI interno para Texto para Fala.
  - `azure` - Usa o motor Azure para Texto para Fala.
  - `elevenlabs` - Usa o motor ElevenLabs para Texto para Fala.
  - `openai` - Usa o motor OpenAI para Texto para Fala.
  - `transformers` - Usa SentenceTransformers para Texto para Fala.
- Descrição: Especifica o motor de Texto para Fala a ser utilizado.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_MODEL`

- Tipo: `str`
- Padrão: `tts-1`
- Descrição: Especifica o modelo de Texto para Fala do OpenAI a ser utilizado.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_VOICE`

- Tipo: `str`
- Padrão: `alloy`
- Descrição: Define a voz de Texto para Fala do OpenAI a ser utilizada.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_SPLIT_ON`

- Tipo: `str`
- Padrão: `punctuation`
- Descrição: Define a divisão de Texto para Fala do OpenAI a ser utilizada.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Azure Texto para Fala

#### `AUDIO_TTS_AZURE_SPEECH_REGION`

- Tipo: `str`
- Descrição: Define a região para Azure Texto para Fala.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT`

- Tipo: `str`
- Descrição: Define o formato de saída para Azure Texto para Fala.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### OpenAI Texto para Fala

#### `AUDIO_TTS_OPENAI_API_BASE_URL`

- Tipo: `str`
- Padrão: `${OPENAI_API_BASE_URL}`
- Descrição: Define a URL base compatível com OpenAI a ser utilizada para Texto para Fala.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUDIO_TTS_OPENAI_API_KEY`

- Tipo: `str`
- Padrão: `${OPENAI_API_KEY}`
- Descrição: Define a chave de API a ser utilizada para Texto para Fala.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## Geração de Imagem

#### `IMAGE_GENERATION_ENGINE`

- Tipo: `str`
- Opções:
  - `openai` - Usa o OpenAI DALL-E para geração de imagens.
  - `comfyui` - Usa o motor ComfyUI para geração de imagens.
  - `automatic1111` - Usa o motor AUTOMATIC1111 para geração de imagens.
  - `gemini` - Usa o Gemini para geração de imagens.
- Padrão: `openai`
- Descrição: Especifica o motor a ser utilizado para geração de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_IMAGE_GENERATION`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita ou desabilita os recursos de geração de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_IMAGE_PROMPT_GENERATION`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita ou desabilita a geração de prompts de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o modelo a ser usado para gerar prompts de imagem.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

`DEFAULT_IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE`:

```
### Tarefa:
Gere um prompt detalhado para uma tarefa de geração de imagem com base no idioma e no contexto fornecidos. Descreva a imagem como se estivesse explicando para alguém que não consegue vê-la. Inclua detalhes relevantes, cores, formas e quaisquer outros elementos importantes.

### Diretrizes:
- Seja descritivo e detalhado, focando nos aspectos mais importantes da imagem.
- Evite fazer suposições ou adicionar informações que não estejam presentes na imagem.
- Use o idioma primário do chat; por padrão, use o inglês se multilíngue.
- Se a imagem for muito complexa, concentre-se nos elementos mais proeminentes.

### Saída:
Retorne estritamente no formato JSON:
{
    "prompt": "Sua descrição detalhada aqui."
}

### Histórico de Chat:
<chat_history>
{{MESSAGES:END:6}}
</chat_history>
```

#### `IMAGE_SIZE`

- Tipo: `str`
- Padrão: `512x512`
- Descrição: Define o tamanho padrão da imagem a ser gerada.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGE_STEPS`

- Tipo: `int`
- Padrão: `50`
- Descrição: Define os passos de iteração padrão para geração de imagens. Usado para ComfyUI e AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGE_GENERATION_MODEL`

- Tipo: `str`
- Descrição: Modelo padrão a ser usado para geração de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### AUTOMATIC1111

#### `AUTOMATIC1111_BASE_URL`

- Tipo: `str`
- Descrição: Especifica a URL para a API de Stable Diffusion do AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUTOMATIC1111_API_AUTH`

- Tipo: `str`
- Descrição: Define a autenticação da API AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUTOMATIC1111_CFG_SCALE`

- Tipo: `float`
- Descrição: Define a escala para a inferência do AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUTOMATIC1111_SAMPLER`

- Tipo: `str`
- Descrição: Define o amostrador para a inferência do AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `AUTOMATIC1111_SCHEDULER`

- Tipo: `str`
- Descrição: Define o agendador para a inferência do AUTOMATIC1111.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### ComfyUI

#### `COMFYUI_BASE_URL`

- Tipo: `str`
- Descrição: Especifica o URL da API de geração de imagens do ComfyUI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `COMFYUI_API_KEY`

- Tipo: `str`
- Descrição: Define a chave da API para o ComfyUI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `COMFYUI_WORKFLOW`

- Tipo: `str`
- Padrão:

```
{
  "3": {
    "inputs": {
      "seed": 0,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "4",
        0
      ],
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "4": {
    "inputs": {
      "ckpt_name": "model.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "5": {
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "Empty Latent Image"
    }
  },
  "6": {
    "inputs": {
      "text": "Prompt",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "text": "",
      "clip": [
        "4",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "4",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "Save Image"
    }
  }
}
```

- Descrição: Define o fluxo de trabalho do ComfyUI.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Gemini

#### `GEMINI_API_BASE_URL`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o URL da API do Gemini.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `GEMINI_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave da API para o Gemini.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGES_GEMINI_API_BASE_URL`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o URL da API de geração de imagens do Gemini.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGES_GEMINI_API_KEY`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define a chave da API do Gemini para geração de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### OpenAI DALL-E

#### `IMAGES_OPENAI_API_BASE_URL`

- Tipo: `str`
- Padrão: `${OPENAI_API_BASE_URL}`
- Descrição: Define o URL base compatível com OpenAI para geração de imagens DALL-E.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `IMAGES_OPENAI_API_KEY`

- Tipo: `str`
- Padrão: `${OPENAI_API_KEY}`
- Descrição: Define a chave da API para geração de imagens DALL-E.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## OAuth

#### `ENABLE_OAUTH_SIGNUP`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Habilita a criação de contas ao se inscrever via OAuth. Distinto de `ENABLE_SIGNUP`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

:::danger

`ENABLE_LOGIN_FORM` deve ser configurado como `False` quando `ENABLE_OAUTH_SIGNUP` estiver configurado como `True`. Falhar em fazer isso resultará na incapacidade de fazer login.

:::

#### `OAUTH_MERGE_ACCOUNTS_BY_EMAIL`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Se habilitado, mescla contas OAuth com contas existentes usando o mesmo endereço de email. Isso é considerado inseguro, pois nem todos os provedores de OAuth verificarão endereços de email e pode levar a possíveis tomadas de contas.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_UPDATE_PICTURE_ON_LOGIN`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Se ativado, atualiza a foto do perfil do usuário local com a foto fornecida pelo OAuth ao fazer login.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`

- Tipo: `str`
- Descrição: Define o cabeçalho de solicitação confiável para autenticação. Veja [documentação SSO](/features/sso).

#### `WEBUI_AUTH_TRUSTED_NAME_HEADER`

- Tipo: `str`
- Descrição: Define o cabeçalho de solicitação confiável para o nome de usuário de qualquer pessoa que se registre usando o
cabeçalho `WEBUI_AUTH_TRUSTED_EMAIL_HEADER`. Veja [documentação SSO](/features/sso).

### Google

Veja https://support.google.com/cloud/answer/6158849?hl=pt

#### `GOOGLE_CLIENT_ID`

- Tipo: `str`
- Descrição: Define o ID do cliente para o OAuth do Google.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_CLIENT_SECRET`

- Tipo: `str`
- Descrição: Define o segredo do cliente para o OAuth do Google.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_OAUTH_SCOPE`

- Tipo: `str`
- Padrão: `openid email profile`
- Descrição: Define o escopo para a autenticação do OAuth do Google.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GOOGLE_REDIRECT_URI`

- Tipo: `str`
- Padrão: `<backend>/oauth/google/callback`
- Descrição: Define o URI de redirecionamento para o OAuth do Google.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### Microsoft

Veja https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app

#### `MICROSOFT_CLIENT_ID`

- Tipo: `str`
- Descrição: Define o ID do cliente para o OAuth da Microsoft.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `MICROSOFT_CLIENT_SECRET`

- Tipo: `str`
- Descrição: Define o segredo do cliente para o OAuth da Microsoft.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `MICROSOFT_CLIENT_TENANT_ID`

- Tipo: `str`
- Descrição: Define o ID do locatário para o OAuth da Microsoft.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `MICROSOFT_OAUTH_SCOPE`

- Tipo: `str`
- Padrão: `openid email profile`
- Descrição: Define o escopo para autenticação do OAuth da Microsoft.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `MICROSOFT_REDIRECT_URI`

- Tipo: `str`
- Padrão: `<backend>/oauth/microsoft/callback`
- Descrição: Define o URI de redirecionamento para o OAuth da Microsoft.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### GitHub

Veja https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### `GITHUB_CLIENT_ID`

- Tipo: `str`
- Descrição: Define o ID do cliente para o OAuth do GitHub.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GITHUB_CLIENT_SECRET`

- Tipo: `str`
- Descrição: Define o segredo do cliente para o OAuth do GitHub.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GITHUB_CLIENT_SCOPE`

- Tipo: `str`
- Padrão: `user:email`
- Descrição: Especifica o escopo para a autenticação do OAuth do GitHub.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `GITHUB_CLIENT_REDIRECT_URI`

- Tipo: `str`
- Padrão: `<backend>/oauth/github/callback`
- Descrição: Define o URI de redirecionamento para o OAuth do GitHub.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

### OpenID (OIDC)

#### `OAUTH_CLIENT_ID`

- Tipo: `str`
- Descrição: Define o ID do cliente para OIDC.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_CLIENT_SECRET`

- Tipo: `str`
- Descrição: Define o segredo do cliente para OIDC.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OPENID_PROVIDER_URL`

- Tipo: `str`
- Descrição: Caminho para o endpoint `.well-known/openid-configuration`
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OPENID_REDIRECT_URI`

- Tipo: `str`
- Padrão: `<backend>/oauth/oidc/callback`
- Descrição: Define o URI de redirecionamento para OIDC
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_SCOPES`

- Tipo: `str`
- Padrão: `openid email profile`
- Descrição: Define o escopo para autenticação OIDC. `openid` e `email` são obrigatórios.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_CODE_CHALLENGE_METHOD`

- Tipo: `str`
- Padrão: String vazia ( ), já que `None` é definido como padrão.
- Descrição: Especifica o método de desafio de código para autenticação OAuth.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_PROVIDER_NAME`

- Tipo: `str`
- Padrão: `SSO`
- Descrição: Define o nome para o provedor OIDC.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_USERNAME_CLAIM`

- Tipo: `str`
- Padrão: `name`
- Descrição: Define a reclamação de nome de usuário para OpenID.
- Persistência: Esta variável de ambiente é uma variável de `PersistentConfig`.

#### `OAUTH_EMAIL_CLAIM`

- Tipo: `str`
- Padrão: `email`
- Descrição: Defina a reivindicação de e-mail para OpenID.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_PICTURE_CLAIM`

- Tipo: `str`
- Padrão: `picture`
- Descrição: Defina a reivindicação de imagem (avatar) para OpenID.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_GROUP_CLAIM`

- Tipo: `str`
- Padrão: `groups`
- Descrição: Especifica a reivindicação de grupo para autenticação OAuth.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_OAUTH_ROLE_MANAGEMENT`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa o gerenciamento de funções para delegação OAuth.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `ENABLE_OAUTH_GROUP_MANAGEMENT`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa o gerenciamento de grupos do OAuth.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_ROLES_CLAIM`

- Tipo: `str`
- Padrão: `roles`
- Descrição: Define a reivindicação de funções para buscar no token OIDC.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_ALLOWED_ROLES`

- Tipo: `str`
- Padrão: `user,admin`
- Descrição: Define os papéis que têm permissão para acessar a plataforma.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_ADMIN_ROLES`

- Tipo: `str`
- Padrão: `admin`
- Descrição: Define os papéis considerados como administradores.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `OAUTH_ALLOWED_DOMAINS`

- Tipo: `str`
- Padrão: `*`
- Descrição: Especifica os domínios permitidos para autenticação OAuth. (Exemplo: "example1.com,example2.com").
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## LDAP

#### `ENABLE_LDAP`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a autenticação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_SERVER_LABEL`

- Tipo: `str`
- Descrição: Define o rótulo do servidor LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.


#### `LDAP_SERVER_HOST`

- Tipo: `str`
- Padrão: `localhost`
- Descrição: Define o nome do host do servidor LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_SERVER_PORT`

- Tipo: `int`
- Padrão: `389`
- Descrição: Define o número da porta do servidor LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_MAIL`

- Tipo: `str`
- Descrição: Define o atributo a ser usado como e-mail na autenticação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_ATTRIBUTE_FOR_USERNAME`

- Tipo: `str`
- Descrição: Define o atributo a ser usado como nome de usuário na autenticação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_APP_DN`

- Tipo: `str`
- Descrição: Define o nome distinto para a aplicação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_APP_PASSWORD`

- Tipo: `str`
- Descrição: Define a senha para a aplicação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_SEARCH_BASE`

- Tipo: `str`
- Descrição: Define a base de busca para autenticação LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_SEARCH_FILTER`

- Tipo: `str`
- Padrão: `None`
- Descrição: Define um único filtro para usar na busca LDAP. Alternativa para `LDAP_SEARCH_FILTERS`.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_SEARCH_FILTERS`

- Tipo: `str`
- Descrição: Define o filtro para usar na busca LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_USE_TLS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa o uso de TLS para conexão LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_CA_CERT_FILE`

- Tipo: `str`
- Descrição: Define o caminho para o arquivo de certificado CA do LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_VALIDATE_CERT`

- Tipo: `bool`
- Descrição: Define se deve validar o certificado CA do LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `LDAP_CIPHERS`

- Tipo: `str`
- Padrão: `ALL`
- Descrição: Define os cifradores a serem usados para conexão LDAP.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## Permissões de Usuário

### Permissões de Chat

#### `USER_PERMISSIONS_CHAT_CONTROLS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para acessar controles de chat.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_FILE_UPLOAD`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para fazer upload de arquivos em chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_DELETE`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para excluir chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_EDIT`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para editar chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_STT`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para usar a função de Fala para Texto em chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TTS`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para usar a função de Texto para Fala em chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_CALL`

- Tipo: `str`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para fazer chamadas em chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_MULTIPLE_MODELS`

- Tipo: `str`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para usar múltiplos modelos em chats.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para criar chats temporários.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa chats temporários obrigatórios para usuários.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Permissões de Funcionalidades

#### `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa a permissão do usuário para acessar servidores de ferramentas diretas.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_WEB_SEARCH`

- Tipo: `str`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para utilizar a funcionalidade de busca na web.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_IMAGE_GENERATION`

- Tipo: `str`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para usar a funcionalidade de geração de imagens.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`

- Tipo: `str`
- Padrão: `True`
- Descrição: Ativa ou desativa a permissão do usuário para usar a funcionalidade de interpretador de código.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

### Permissões do Espaço de Trabalho

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a permissão do usuário para acessar modelos no espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a permissão do usuário para acessar conhecimento no espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a permissão do usuário para acessar prompts no espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`

- Tipo: `bool`
- Padrão: `False`
- Descrição: Ativa ou desativa a permissão do usuário para acessar ferramentas no espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa o compartilhamento público de modelos do espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa o compartilhamento público de conhecimento do espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa o compartilhamento público de prompts do espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

#### `USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING`

- Tipo: `str`
- Padrão: `False`
- Descrição: Ativa ou desativa o compartilhamento público de ferramentas do espaço de trabalho.
- Persistência: Esta variável de ambiente é uma variável `PersistentConfig`.

## Outras Variáveis de Ambiente

Essas variáveis não são específicas para Open WebUI, mas ainda podem ser valiosas em certos contextos.

### Armazenamento em Nuvem

#### `STORAGE_PROVIDER`

- Tipo: `str`
- Opções:
  - `s3` - usa a biblioteca cliente S3 e variáveis de ambiente relacionadas mencionadas em [Armazenamento Amazon S3](#amazon-s3-storage)
  - `gcs` - usa a biblioteca cliente GCS e variáveis de ambiente relacionadas mencionadas em [Armazenamento Google Cloud](#google-cloud-storage)
  - `azure` - usa a biblioteca cliente Azure e variáveis de ambiente relacionadas mencionadas em [Armazenamento Microsoft Azure](#microsoft-azure-storage)
- Padrão: string vazia ( ), que por padrão é `local`
- Descrição: Define o provedor de armazenamento.

#### Armazenamento Amazon S3

#### `S3_ACCESS_KEY_ID`

- Tipo: `str`
- Descrição: Define a chave de acesso ID para armazenamento S3.

#### `S3_ADDRESSING_STYLE`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o estilo de endereçamento a ser usado para armazenamento S3 (e.g., path, virtual).

#### `S3_BUCKET_NAME`

- Tipo: `str`
- Descrição: Define o nome do bucket para armazenamento S3.

#### `S3_ENDPOINT_URL`

- Tipo: `str`
- Descrição: Define a URL do endpoint para armazenamento S3.

#### `S3_KEY_PREFIX`

- Tipo: `str`
- Descrição: Define o prefixo da chave para um objeto do S3.

#### `S3_REGION_NAME`

- Tipo: `str`
- Descrição: Define o nome da região para armazenamento S3.

#### `S3_SECRET_ACCESS_KEY`

- Tipo: `str`
- Descrição: Define a chave de acesso secreta para armazenamento S3.

#### `S3_USE_ACCELERATE_ENDPOINT`

- Tipo: `str`
- Padrão: `False`
- Descrição: Especifica se deve usar o endpoint acelerado para armazenamento S3.

#### `S3_ENABLE_TAGGING`

- Tipo: `str`
- Padrão: `False`
- Descrição: Habilita a marcação de objetos S3 após uploads para melhor organização, pesquisa e integração com políticas de gerenciamento de arquivos. Sempre definido como `False` ao usar o Cloudflare R2, pois o R2 não suporta marcação de objetos.

#### Armazenamento Google Cloud

#### `GOOGLE_APPLICATION_CREDENTIALS_JSON`

- Tipo: `str`
- Descrição: Conteúdo do arquivo JSON de credenciais de aplicativo do Google.
  - Opcional - se não fornecido, as credenciais serão obtidas do ambiente. Credenciais de usuário se executado localmente e servidor de Metadados do Google se executado em uma máquina do Google Compute Engine.
  - Um arquivo pode ser gerado para uma conta de serviço seguindo este [guia.](https://developers.google.com/workspace/guides/create-credentials#service-account)

#### `GCS_BUCKET_NAME`

- Tipo: `str`
- Descrição: Define o nome do bucket para armazenamento Google Cloud. O bucket deve já existir.

#### Armazenamento Microsoft Azure

#### `AZURE_STORAGE_ENDPOINT`

- Tipo: `str`
- Descrição: Define a URL do endpoint para Armazenamento Azure.

#### `AZURE_STORAGE_CONTAINER_NAME`

- Tipo: `str`
- Descrição: Define o nome do container para Armazenamento Azure.

#### `AZURE_STORAGE_KEY`

- Tipo: `str`
- Descrição: Define a chave de acesso para Armazenamento Azure.
  - Opcional - se não fornecido, as credenciais serão obtidas do ambiente. Credenciais de usuário se executado localmente e Identidade Gerenciada se executado em serviços Azure.

### Pool de Banco de Dados

#### `DATABASE_URL`

- Tipo: `str`
- Padrão: `sqlite:///${DATA_DIR}/webui.db`
- Descrição: Especifica a URL do banco de dados para conectar.

:::info

Suporta SQLite e Postgres. Alterar a URL não migra dados entre bancos de dados.
A documentação sobre o esquema de URLs está disponível [aqui](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls).

:::

#### `DATABASE_SCHEMA`

- Tipo: `str`
- Padrão: `None`
- Descrição: Especifica o esquema de banco de dados para conectar.

#### `DATABASE_POOL_SIZE`

- Tipo: `int`
- Padrão: `0`
- Descrição: Especifica o tamanho do pool de banco de dados. Um valor de `0` desativa o pooling.

#### `DATABASE_POOL_MAX_OVERFLOW`

- Tipo: `int`
- Padrão: `0`
- Descrição: Especifica o máximo de overflow do pool de banco de dados.

:::info

Mais informações sobre esta configuração podem ser encontradas [aqui](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.max_overflow).

:::

#### `DATABASE_POOL_TIMEOUT`

- Tipo: `int`
- Padrão: `30`
- Descrição: Especifica o tempo limite do pool de banco de dados em segundos para obter uma conexão.

:::info

Mais informações sobre esta configuração podem ser encontradas [aqui](https://docs.sqlalchemy.org/en/20/core/pooling.html#sqlalchemy.pool.QueuePool.params.timeout).

:::

#### `DATABASE_POOL_RECYCLE`

- Tipo: `int`
- Padrão: `3600`
- Descrição: Especifica o tempo de reciclagem do pool de banco de dados em segundos.

:::info

Mais informações sobre esta configuração podem ser encontradas [aqui](https://docs.sqlalchemy.org/en/20/core/pooling.html#setting-pool-recycle).

:::

### Redis

#### `REDIS_URL`

- Tipo: `str`
- Exemplo: `redis://localhost:6379/0`
- Descrição: Especifica a URL da instância Redis para o estado do aplicativo.

:::info

Ao implantar o Open-WebUI em um cluster multi-nó/trabalhador, você deve garantir que o valor de REDIS_URL seja configurado. Sem isso, problemas de sessão, persistência e consistência ocorrerão no estado do aplicativo, pois os trabalhadores não conseguirão se comunicar.

:::

#### `REDIS_SENTINEL_HOSTS`

- Tipo: `str`
- Descrição: Lista separada por vírgulas de Sentinelas Redis para estado da aplicação. Se especificado, o "hostname" em `REDIS_URL` será interpretado como o nome do serviço Sentinel.

#### `REDIS_SENTINEL_PORT`

- Tipo: `int`
- Padrão: `26379`
- Descrição: Porta do Sentinel para o Redis do estado da aplicação.

#### `ENABLE_WEBSOCKET_SUPPORT`

- Tipo: `bool`
- Padrão: `True`
- Descrição: Habilita suporte a websocket no Open WebUI.

:::info

Ao implantar o Open-WebUI em um cluster de múltiplos nós/trabalhadores, você deve garantir que o valor de ENABLE_WEBSOCKET_SUPPORT esteja definido. Sem ele, problemas de consistência e persistência de websocket ocorrerão.

:::

#### `WEBSOCKET_MANAGER`

- Tipo: `str`
- Padrão: `redis`
- Descrição: Especifica o gerenciador de websocket a ser usado (neste caso, Redis).

:::info

Ao implantar o Open-WebUI em um cluster de múltiplos nós/trabalhadores, você deve garantir que o valor de WEBSOCKET_MANAGER esteja definido e um banco de dados NoSQL de chave-valor como o Redis seja usado. Sem ele, problemas de consistência e persistência de websocket ocorrerão.

:::

#### `WEBSOCKET_REDIS_URL`

- Tipo: `str`
- Padrão: `${REDIS_URL}`
- Descrição: Especifica a URL da instância Redis para comunicação websocket. É distinto de `REDIS_URL` e, na prática, é recomendável definir ambos.

:::info

Ao implantar o Open-WebUI em um cluster de múltiplos nós/trabalhadores, você deve garantir que o valor de WEBSOCKET_REDIS_URL esteja definido e um banco de dados NoSQL de chave-valor como o Redis seja usado. Sem ele, problemas de consistência e persistência de websocket ocorrerão.

:::

#### `WEBSOCKET_SENTINEL_HOSTS`

- Tipo: `str`
- Descrição: Lista separada por vírgulas de Sentinelas Redis para websocket. Se especificado, o "hostname" em `WEBSOCKET_REDIS_URL` será interpretado como o nome do serviço Sentinel.

#### `WEBSOCKET_SENTINEL_PORT`

- Tipo: `int`
- Padrão: `26379`
- Descrição: Porta do Sentinel para o Redis do websocket.

### Configurações do Uvicorn

#### `UVICORN_WORKERS`

- Tipo: `int`
- Padrão: `1`
- Descrição: Controla o número de processos de trabalhadores que o Uvicorn gera para lidar com solicitações. Cada trabalhador executa sua própria instância do aplicativo em processo separado.

:::info

Ao implantar em ambientes orquestrados como Kubernetes ou usar Helm charts, é recomendado manter UVICORN_WORKERS definido como 1. Plataformas de orquestração de contêineres já fornecem seus próprios mecanismos de escalonamento através da replicação de pods, e usar múltiplos trabalhadores em contêineres pode levar a problemas de alocação de recursos e complicar estratégias de escalonamento horizontal.

Se você usar UVICORN_WORKERS, também precisa garantir que as variáveis de ambiente relacionadas para configurações de múltiplas instâncias escaláveis estejam devidamente configuradas.

:::

### Configurações de Proxy

O Open WebUI suporta o uso de proxies para recuperações HTTP e HTTPS. Para especificar configurações de proxy,
o Open WebUI utiliza as seguintes variáveis de ambiente:

#### `http_proxy`

- Tipo: `str`
- Descrição: Define a URL para o proxy HTTP.

#### `https_proxy`

- Tipo: `str`
- Descrição: Define a URL para o proxy HTTPS.

#### `no_proxy`

- Tipo: `str`
- Descrição: Lista extensões de domínio (ou endereços IP) para as quais o proxy não deve ser usado,
separados por vírgulas. Por exemplo, definir no_proxy como .mit.edu garante que o proxy seja
ignorado ao acessar documentos do MIT.

### Instalar Pacotes Python Necessários

O Open WebUI fornece variáveis de ambiente para personalizar o processo de instalação de pacotes via pip. Abaixo estão as variáveis de ambiente usadas pelo Open WebUI para ajustar o comportamento da instalação de pacotes:

#### `PIP_OPTIONS`

- Tipo: `str`
- Descrição: Especifica opções adicionais de linha de comando que o pip deve usar ao instalar pacotes. Por exemplo, você pode incluir flags como `--upgrade`, `--user` ou `--no-cache-dir` para controlar o processo de instalação.

#### `PIP_PACKAGE_INDEX_OPTIONS`

- Tipo: `str`
- Descrição: Define comportamento personalizado para o índice de pacotes do pip. Isso pode incluir a especificação de URLs de índice adicionais ou alternativos (por exemplo, `--extra-index-url`), credenciais de autenticação ou outros parâmetros para gerenciar como os pacotes são recuperados de diferentes locais.
