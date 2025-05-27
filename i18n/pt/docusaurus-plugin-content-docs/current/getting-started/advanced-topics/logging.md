---
sidebar_position: 5
title: "📜 Logging no Open WebUI"
---

# Entendendo o Logging no Open WebUI 🪵

O logging é essencial para depuração, monitoramento e compreensão de como o Open WebUI está se comportando. Este guia explica como o logging funciona tanto no **cliente do navegador** (frontend) quanto no **servidor de aplicação/backend**.

## 🖥️ Logging no Cliente do Navegador (Frontend)

Para desenvolvimento e depuração no frontend, o Open WebUI utiliza o logging padrão do console do navegador. Isso significa que você pode ver os logs diretamente nas ferramentas de desenvolvedor embutidas no seu navegador.

**Como Acessar os Logs do Navegador:**

1. **Abra as Ferramentas de Desenvolvedor:** Na maioria dos navegadores, você pode abrir as ferramentas de desenvolvedor por:
   - **Clicando com o botão direito** em qualquer lugar na página do Open WebUI e selecionando "Inspecionar" ou "Inspecionar Elemento".
   - Pressionando **F12** (ou Cmd+Opt+I no macOS).

2. **Navegue até a Aba "Console":** Dentro do painel das ferramentas de desenvolvedor, encontre e clique na aba "Console".

**Tipos de Logs do Navegador:**

O Open WebUI utiliza principalmente o `console.log()` do [JavaScripts](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) para logging no lado do cliente. Você verá vários tipos de mensagens no console, incluindo:

- **Mensagens Informativas:** Fluxo geral da aplicação e status.
- **Avisos:** Possíveis problemas ou erros não críticos.
- **Erros:** Problemas que podem estar afetando a funcionalidade.

**Ferramentas de Desenvolvedor Específicas do Navegador:**

Diferentes navegadores oferecem ferramentas de desenvolvedor ligeiramente diferentes, mas todos fornecem um console para visualizar os logs de JavaScript. Aqui estão links para a documentação de navegadores populares:

- **[Blink] Chrome/Chromium (e.g., Chrome, Edge):** [Documentação do Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox:** [Documentação das Ferramentas de Desenvolvedor do Firefox](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari:** [Documentação das Ferramentas de Desenvolvedor do Safari](https://developer.apple.com/safari/tools/)

## ⚙️ Logging no Servidor de Aplicação/Backend (Python)

O backend do Open WebUI usa o módulo `logging` embutido do Python para registrar eventos e informações no lado do servidor. Esses logs são cruciais para entender o comportamento do servidor, diagnosticar erros e monitorar o desempenho.

**Conceitos-Chave:**

- **Módulo `logging` do Python:** O Open WebUI utiliza a biblioteca padrão de logging do Python. Se você está familiarizado com o logging em Python, encontrará esta seção direta.  (Para informações mais detalhadas, veja a [Documentação de Logging do Python](https://docs.python.org/3/howto/logging.html#logging-levels)).
- **Saída no Console:** Por padrão, os logs do backend são enviados para o console (saída padrão), tornando-os visíveis no seu terminal ou logs do container Docker.
- **Níveis de Logging:**  Os níveis de logging controlam a verbosidade dos logs. Você pode configurar o Open WebUI para mostrar mais ou menos informações detalhadas com base nesses níveis.

### 🚦 Níveis de Logging Explicados

O logging em Python usa uma hierarquia de níveis para categorizar mensagens por severidade. Aqui está uma descrição dos níveis, do mais severo ao menos severo:

| Nível       | Valor Numérico | Descrição                                                                    | Caso de Uso                                                                 |
| ----------- | ------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `CRITICAL`  | 50            | **Erros graves** que podem levar a terminação da aplicação.                  | Falhas catastróficas, corrupção de dados.                                  |
| `ERROR`     | 40            | **Erros** que indicam problemas, mas a aplicação ainda pode funcionar.       | Erros recuperáveis, operações falhadas.                                    |
| `WARNING`   | 30            | **Problemas potenciais** ou situações inesperadas que devem ser investigadas.| Avisos de depreciação, restrições de recursos.                             |
| `INFO`      | 20            | **Mensagens informativas gerais** sobre a operação da aplicação.             | Mensagens de inicialização, eventos principais, fluxo normal de operação.  |
| `DEBUG`     | 10            | **Informações detalhadas de depuração** para desenvolvedores.                | Chamadas de função, valores de variáveis, etapas detalhadas de execução.   |
| `NOTSET`    | 0             | **Todas as mensagens são registradas.** (Normalmente, padrão para `WARNING` se não configurado). | Útil para capturar absolutamente tudo, normalmente para depuração muito específica. |

**Nível Padrão:** O nível de logging padrão do Open WebUI é `INFO`.

### 🌍 Nível de Logging Global (`GLOBAL_LOG_LEVEL`)

Você pode alterar o nível de logging **global** para todo o backend do Open WebUI utilizando a variável de ambiente `GLOBAL_LOG_LEVEL`. Esta é a maneira mais direta de controlar a verbosidade geral do logging.

**Como Funciona:**

Configurar `GLOBAL_LOG_LEVEL` ajusta o logger raiz no Python, afetando todos os loggers no Open WebUI e potencialmente algumas bibliotecas de terceiros que utilizam [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig). Ele usa `logging.basicConfig(force=True)`, o que significa que irá sobrescrever qualquer configuração pré-existente do logger raiz.

**Exemplo: Definir como `DEBUG`**

- **Parâmetro do Docker:**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**Impacto:** Definir `GLOBAL_LOG_LEVEL` como `DEBUG` produzirá os logs mais detalhados, incluindo informações úteis para desenvolvimento e solução de problemas. Para ambientes de produção, `INFO` ou `WARNING` podem ser mais apropriados para reduzir o volume de logs.

### ⚙️ Níveis de Registro Específicos do App/Backend

Para controle mais granular, o Open WebUI fornece variáveis de ambiente para ajustar os níveis de registro para componentes específicos do backend. O registro ainda está em andamento, mas algum nível de controle é disponibilizado usando essas variáveis de ambiente. Essas variáveis permitem que você ajuste os logs para diferentes partes do aplicativo.

**Variáveis de Ambiente Disponíveis:**

| Variável de Ambiente | Componente/Módulo                                                   | Descrição                                                                                                   |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `AUDIO_LOG_LEVEL`    | Processamento de Áudio                                              | Registro relacionado à transcrição de áudio (faster-whisper), conversão de texto em fala (TTS) e manipulação de áudio. |
| `COMFYUI_LOG_LEVEL`  | Integração ComfyUI                                                 | Registro para interações com o ComfyUI, caso você esteja utilizando essa integração.                      |
| `CONFIG_LOG_LEVEL`   | Gerenciamento de Configuração                                       | Registro relacionado ao carregamento e processamento dos arquivos de configuração do Open WebUI.          |
| `DB_LOG_LEVEL`       | Operações de Banco de Dados (Peewee)                               | Registro para interações com bancos de dados usando o ORM (Object-Relational Mapper) Peewee.              |
| `IMAGES_LOG_LEVEL`   | Geração de Imagens (AUTOMATIC1111/Stable Diffusion)                | Registro para tarefas de geração de imagens, especialmente quando utilizando a integração AUTOMATIC1111 Stable Diffusion. |
| `MAIN_LOG_LEVEL`     | Execução da Aplicação Principal (Logger Raiz)                      | Registro do ponto de entrada principal da aplicação e do logger raiz.                                     |
| `MODELS_LOG_LEVEL`   | Gerenciamento de Modelos                                           | Registro relacionado ao carregamento, gerenciamento e interação com modelos de linguagem (LLMs), incluindo autenticação. |
| `OLLAMA_LOG_LEVEL`   | Integração com Backend Ollama                                      | Registro para comunicação e interação com o backend Ollama.                                               |
| `OPENAI_LOG_LEVEL`   | Integração com API do OpenAI                                       | Registro para interações com a API do OpenAI (por exemplo, para modelos como GPT).                        |
| `RAG_LOG_LEVEL`      | Geração Aumentada por Recuperação (RAG)                           | Registro para o pipeline RAG, incluindo o banco de dados vetorial Chroma e Sentence-Transformers.          |
| `WEBHOOK_LOG_LEVEL`  | Webhook de Autenticação                                            | Registro detalhado para a funcionalidade de webhook de autenticação.                                      |

**Como Usar:**

Você pode configurar essas variáveis de ambiente da mesma forma que `GLOBAL_LOG_LEVEL` (parâmetros do Docker, seção de `environment` no Docker Compose). Por exemplo, para obter registros mais detalhados para interações com Ollama, você poderia definir:

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**Nota Importante:** Diferentemente de `GLOBAL_LOG_LEVEL`, essas variáveis específicas do aplicativo podem não afetar o registro de *todos* os módulos de terceiros. Elas controlam principalmente os registros dentro do código-base do Open WebUI.

Ao compreender e utilizar esses mecanismos de registro, você pode monitorar, depurar e obter insights efetivos sobre sua instância do Open WebUI.
