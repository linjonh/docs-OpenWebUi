---
sidebar_position: 6
title: "📊 Monitorando Seu WebUI Aberto"
---

# Monitore a Saúde do Seu WebUI Aberto 🩺

Monitorar sua instância do WebUI Aberto é crucial para garantir que ela funcione de forma confiável, tenha um bom desempenho e permita que você identifique e resolva problemas rapidamente. Este guia descreve três níveis de monitoramento, desde verificações básicas de disponibilidade até testes detalhados de resposta do modelo.

**Por que monitorar?**

* **Garantir disponibilidade:** Detecte proativamente interrupções e falhas de serviço.
* **Insights de desempenho:** Acompanhe os tempos de resposta e identifique possíveis gargalos.
* **Detecção antecipada de problemas:** Identifique problemas antes que eles afetem significativamente os usuários.
* **Tranquilidade:** Tenha confiança de que sua instância do WebUI Aberto está funcionando perfeitamente.

## 🚦 Níveis de Monitoramento

Cobriremos três níveis de monitoramento, progredindo do básico ao mais abrangente:

1. **Verificação básica de saúde:** Verifica se o serviço WebUI Aberto está funcionando e respondendo.
2. **Verificação de conectividade do modelo:** Confirma que o WebUI Aberto pode se conectar e listar seus modelos configurados.
3. **Teste de resposta do modelo (Verificação detalhada de saúde):** Garante que os modelos possam processar solicitações e gerar respostas.

## Nível 1: Endpoint de Verificação Básica de Saúde ✅

O nível mais simples de monitoramento é verificar o endpoint `/health`. Este endpoint é acessível publicamente (não requer autenticação) e retorna um código de status `200 OK` quando o serviço WebUI Aberto está funcionando corretamente.

**Como testar:**

Você pode usar `curl` ou qualquer cliente HTTP para verificar este endpoint:

```bash
   # Verificação básica de saúde - sem autenticação necessária
   curl https://sua-instancia-do-webui-aberto/health
```

**Saída esperada:** Uma verificação de saúde bem-sucedida retornará um código de status HTTP `200 OK`. Normalmente, o conteúdo do corpo de resposta não é importante para uma verificação básica de saúde.

### Usando o Uptime Kuma para Verificações Básicas de Saúde 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) é uma excelente ferramenta de monitoramento de tempo de atividade, de código aberto e fácil de usar, auto-hospedada. É altamente recomendada para monitorar o WebUI Aberto.

**Passos para configurar no Uptime Kuma:**

1. **Adicionar um novo monitor:** No painel do Uptime Kuma, clique em "Add New Monitor".
2. **Configurar as configurações do monitor:**
   * **Tipo de monitor:** Selecione "HTTP(s)".
   * **Nome:** Dê ao seu monitor um nome descritivo, por exemplo, "Verificação de Saúde do WebUI Aberto".
   * **URL:** Insira a URL do endpoint de verificação de saúde: `http://sua-instancia-do-webui-aberto:8080/health` (Substitua `sua-instancia-do-webui-aberto:8080` pelo endereço e porta reais do seu WebUI Aberto).
   * **Intervalo de monitoramento:** Defina a frequência das verificações (por exemplo, `60 segundos` para cada minuto).
   * **Número de tentativas:** Defina o número de tentativas antes de considerar o serviço como inativo (por exemplo, `3` tentativas).

**O que esta verificação verifica:**

* **Disponibilidade do servidor web:** Certifica-se de que o servidor web (por exemplo, Nginx, Uvicorn) está respondendo às solicitações.
* **Aplicativo em execução:** Confirma que o aplicativo WebUI Aberto está rodando e inicializado.
* **Conectividade básica com o banco de dados:** Normalmente inclui uma verificação básica para garantir que o aplicativo possa se conectar ao banco de dados.

## Nível 2: Conectividade do Modelo no WebUI Aberto 🔗

Para ir além da disponibilidade básica, você pode monitorar o endpoint `/api/models`. Este endpoint **requer autenticação** e verifica se o WebUI Aberto pode se comunicar com sucesso com seus provedores de modelo configurados (por exemplo, Ollama, OpenAI) e recuperar uma lista de modelos disponíveis.

**Por que monitorar a conectividade do modelo?**

* **Problemas do provedor de modelo:** Detecte problemas com seus serviços de provedores de modelo (por exemplo, falhas de API, problemas de autenticação).
* **Erros de configuração:** Identifique erros de configuração nas configurações dos provedores de modelo no WebUI Aberto.
* **Garantir disponibilidade do modelo:** Confirme que os modelos que você espera que estejam disponíveis estão realmente acessíveis pelo WebUI Aberto.

**Detalhes do Endpoint da API:**

Consulte a [documentação da API do WebUI Aberto](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models) para obter todos os detalhes sobre o endpoint `/api/models` e sua estrutura de resposta.

**Como testar com `curl` (autenticado):**

Você precisará de uma chave de API para acessar este endpoint. Consulte a seção "Configuração de Autenticação" abaixo para instruções sobre como gerar uma chave de API.

```bash
   # Verificação de conectividade do modelo autenticada
   curl -H "Authorization: Bearer SUA_CHAVE_DE_API" https://sua-instancia-do-webui-aberto/api/models
```

*(Substitua `SUA_CHAVE_DE_API` pela sua chave de API real e `sua-instancia-do-webui-aberto` pelo endereço do seu WebUI Aberto.)*

**Saída esperada:** Uma solicitação bem-sucedida retornará um código de status `200 OK` e uma resposta JSON contendo uma lista de modelos.

### Configuração de Autenticação para a Chave de API 🔑

Antes de monitorar o endpoint `/api/models`, você precisa ativar as chaves de API no WebUI Aberto e gerar uma:

1. **Ativar Chaves de API (Requer Administrador):**
   * Faça login no WebUI Aberto como administrador.
   * Vá para **Configurações do Admin** (geralmente no menu superior direito) > **Geral**.
   * Encontre a configuração "Habilitar Chave API" e **ative-a**.
   * Clique em **Salvar Alterações**.

2. **Gerar uma Chave API (Configurações do Usuário):**
   * Vá para suas **Configurações do Usuário** (geralmente clicando no ícone do perfil no canto superior direito).
   * Navegue para a seção **Conta**.
   * Clique em **Gerar Nova Chave API**.
   * Dê um nome descritivo para a chave API (ex.: "Chave API de Monitoramento").
   * **Copie a chave API gerada** e armazene-a com segurança. Você precisará dela para sua configuração de monitoramento.

   *(Opcional, mas Recomendado):* Para melhores práticas de segurança, considere criar uma **conta de usuário não administrativa** especificamente para monitoramento e gerar uma chave API para esse usuário. Isso limita o impacto potencial caso a chave API de monitoramento seja comprometida.

   *Se você não visualizar a opção de geração de chave API em suas configurações, entre em contato com o administrador do Open WebUI para garantir que as chaves API estejam habilitadas.*

### Usando o Uptime Kuma para Monitoramento de Conectividade do Modelo 🐻

1. **Crie um Novo Monitor no Uptime Kuma:**
   * Tipo de Monitor: "HTTP(s) - Consulta JSON".
   * Nome: "Verificação de Conectividade do Modelo Open WebUI".
   * URL: `http://sua-instancia-open-webui:8080/api/models` (Substitua pelo seu URL).
   * Método: "GET".
   * Código de Status Esperado: `200`.

2. **Configure a Consulta JSON (Verificar Lista de Modelos):**
   * **Consulta JSON:**  `$count(data[*])>0`
     * **Explicação:** Esta consulta JSONata verifica se o array `data` na resposta da API (que contém a lista de modelos) tem uma contagem maior que 0. Em outras palavras, verifica se pelo menos um modelo é retornado.
   * **Valor Esperado:** `true` (A consulta deve retornar `true` se modelos forem listados).

3. **Adicione Cabeçalhos de Autenticação:**
   * Na seção "Cabeçalhos" da configuração do monitor no Uptime Kuma, clique em "Adicionar Cabeçalho".
   * **Nome do Cabeçalho:** `Authorization`
   * **Valor do Cabeçalho:** `Bearer SUA_CHAVE_API` (Substitua `SUA_CHAVE_API` pela chave API que você gerou).

4. **Defina o Intervalo de Monitoramento:** Intervalo recomendado: `300 segundos` (5 minutos) ou mais, já que a lista de modelos geralmente não muda com muita frequência.

**Consultas JSON Alternativas (Avançadas):**

Você pode usar consultas JSONata mais específicas para verificar modelos ou provedores específicos. Aqui estão alguns exemplos:

* **Verificar pelo menos um modelo da Ollama:**  `$count(data[owned_by=ollama])>0`
* **Verificar se um modelo específico existe (ex.: gpt-4o):** `$exists(data[id=gpt-4o])`
* **Verificar se vários modelos específicos existem (ex.: gpt-4o e gpt-4o-mini):** `$count(data[id in [gpt-4o, gpt-4o-mini]]) = 2`

Você pode testar e refinar suas consultas JSONata em [jsonata.org](https://try.jsonata.org/) usando uma resposta de API de exemplo para garantir que funcionem conforme esperado.

## Nível 3: Teste de Resposta do Modelo (Verificação Profunda de Saúde) 🤖

Para o monitoramento mais abrangente, você pode testar se os modelos são realmente capazes de processar solicitações e gerar respostas. Isso envolve o envio de uma solicitação de conclusão de chat simples ao endpoint `/api/chat/completions`.

**Por que Testar Respostas dos Modelos?**

* **Verificação de Ponta a Ponta:** Confirma que todo o pipeline do modelo está funcionando, desde a solicitação da API até a resposta do modelo.
* **Problemas de Carregamento do Modelo:** Detecta problemas com modelos específicos que não conseguem carregar ou responder.
* **Erros de Processamento de Backend:** Identifica erros na lógica de backend que podem impedir que os modelos gerem respostas.

**Como Testar com `curl` (Solicitação POST Autenticada):**

Este teste requer uma chave API e envia uma solicitação POST com uma mensagem simples ao endpoint de conclusões de chat.

```bash
# Teste de resposta do modelo - solicitação POST autenticada
curl -X POST https://sua-instancia-open-webui/api/chat/completions \
  -H "Authorization: Bearer SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d {
    "messages": [{"role": "user", "content": "Responda com a palavra SAUDÁVEL"}],
    "model": "llama3.1",  # Substitua por um modelo que você espera que esteja disponível
    "temperature": 0      # Configure a temperatura para 0 para respostas consistentes
  }
```

*(Substitua `SUA_CHAVE_API`, `sua-instancia-open-webui` e `llama3.1` pelos seus valores reais.)*

**Saída Esperada:** Uma solicitação bem-sucedida retornará um código de status `200 OK` e uma resposta JSON contendo uma conclusão de chat. Você pode verificar se a resposta inclui a palavra "SAUDÁVEL" (ou uma resposta similar esperada com base no seu prompt).

**Configurar o Monitoramento do Nível 3 no Uptime Kuma envolveria configurar um monitor HTTP(s) com uma solicitação POST, corpo JSON, cabeçalhos de autenticação e, potencialmente, uma consulta JSON para validar o conteúdo da resposta. Esta é uma configuração mais avançada e pode ser personalizada com base nas suas necessidades específicas.**

Ao implementar esses níveis de monitoramento, você pode garantir de forma proativa a saúde, confiabilidade e desempenho da sua instância Open WebUI, proporcionando uma experiência consistentemente positiva para os usuários.
