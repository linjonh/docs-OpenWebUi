---
sidebar_position: 20
title: "💥 Monitoramento e Depuração com Langfuse"
---

# Integração do Langfuse com Open WebUI

[Langfuse](https://langfuse.com/) ([GitHub](https://github.com/langfuse/langfuse)) oferece observabilidade e avaliações de código aberto para Open WebUI. Ao ativar a integração com Langfuse, você pode rastrear os dados do seu aplicativo com Langfuse para desenvolver, monitorar e melhorar o uso do Open WebUI, incluindo:

- [Rastreamentos](https://langfuse.com/docs/tracing) de aplicação
- Padrões de uso
- Dados de custo por usuário e modelo
- Sessões de replay para depuração de problemas
- [Avaliações](https://langfuse.com/docs/scores/overview)

## Como integrar Langfuse com Open WebUI

![Integração do Langfuse](https://langfuse.com/images/docs/openwebui-integration.gif)
_Etapas de integração do Langfuse_

[Pipelines](https://github.com/open-webui/pipelines/) no Open WebUI é uma estrutura independente de interface para plugins da API OpenAI. Ele permite a injeção de plugins que interceptam, processam e encaminham os prompts dos usuários para o LLM final, proporcionando maior controle e personalização no processamento de prompts.

Para rastrear os dados do seu aplicativo com Langfuse, você pode usar o [pipeline do Langfuse](https://github.com/open-webui/pipelines/blob/d4fca4c37c4b8603be7797245e749e9086f35130/examples/filters/langfuse_filter_pipeline.py), que permite monitoramento e análise em tempo real das interações de mensagens.

## Guia Rápido

### Passo 1: Configurar Open WebUI

Certifique-se de que o Open WebUI esteja em execução. Para isso, consulte a [documentação do Open WebUI](https://docs.openwebui.com/).

### Passo 2: Configurar Pipelines

Inicie o [Pipelines](https://github.com/open-webui/pipelines/) usando Docker. Use o comando abaixo para iniciar o Pipelines:

```bash
docker run -p 9099:9099 --add-host=host.docker.internal:host-gateway -v pipelines:/app/pipelines --name pipelines --restart always ghcr.io/open-webui/pipelines:main
```

### Passo 3: Conectar Open WebUI ao Pipelines

Nas _Configurações de Administração_, crie e salve uma nova conexão do tipo API OpenAI com os seguintes detalhes:

- **URL:**`http://host.docker.internal:9099` (este é o local onde o contêiner Docker lançado anteriormente está sendo executado).
- **Senha:** 0p3n-w3bu! (senha padrão)

![Configurações do Open WebUI](https://langfuse.com/images/docs/openwebui-setup-settings.png)

### Passo 4: Adicionar o Pipeline do Filtro Langfuse

Em seguida, navegue para _Configurações de Administração_ -> _Pipelines_ e adicione o Pipeline do Filtro Langfuse. Especifique que o Pipelines está escutando em`http://host.docker.internal:9099` (como configurado anteriormente) e instale o [Pipeline do Filtro Langfuse](https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py) usando a opção _Instalar via URL do GitHub_ com o seguinte URL:

```
https://github.com/open-webui/pipelines/blob/main/examples/filters/langfuse_filter_pipeline.py
```

Agora, adicione suas chaves de API do Langfuse abaixo. Se você ainda não se inscreveu no Langfuse, pode obter suas chaves de API criando uma conta [aqui](https://cloud.langfuse.com).

![Open WebUI adicionar Pipeline Langfuse](https://langfuse.com//images/docs/openwebui-add-pipeline.png)

_**Nota:** Para capturar o uso (contagem de tokens) para modelos OpenAI enquanto o streaming está ativado, você deve navegar para as configurações do modelo no Open WebUI e marcar a caixa "Uso" [aqui](https://github.com/open-webui/open-webui/discussions/5770#discussioncomment-10778586) abaixo de _Capacidades_._

### Passo 5: Ver seus rastreamentos no Langfuse

Agora você pode interagir com seu aplicativo Open WebUI e ver os rastreamentos no Langfuse.

[Exemplo de rastreamento](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/904a8c1f-4974-4f8f-8a2f-129ae78d99c5?observation=fe5b127b-e71c-45ab-8ee5-439d4c0edc28) na interface do Langfuse:

![Exemplo de Rastreamento do Open WebUI no Langfuse](https://langfuse.com/images/docs/openwebui-example-trace.png)

## Saiba mais

Para um guia abrangente sobre Pipelines do Open WebUI, visite [este post](https://ikasten.io/2024/06/03/getting-started-with-openwebui-pipelines/).
