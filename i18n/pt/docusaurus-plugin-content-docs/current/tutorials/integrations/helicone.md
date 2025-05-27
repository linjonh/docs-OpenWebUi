---
title: "🕵🏻‍♀️ Monitore suas solicitações LLM com Helicone"
sidebar_position: 19
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Integração do Helicone com Open WebUI

Helicone é uma plataforma open-source de observabilidade LLM para desenvolvedores monitorarem, depurarem e melhorarem aplicações **prontas para produção**, incluindo sua implantação do Open WebUI.

Ao habilitar o Helicone, você pode registrar solicitações LLM, avaliar e experimentar prompts, e obter insights instantâneos que ajudam você a implementar mudanças na produção com confiança.

- **Monitoramento em tempo real com visualização consolidada dos tipos de modelos**: Monitore tanto modelos locais do Ollama quanto APIs na nuvem através de uma interface única
- **Visualização e reprodução de solicitações**: Veja exatamente quais prompts foram enviados para cada modelo no Open WebUI e os resultados gerados pelos LLMs para avaliação
- **Acompanhamento de desempenho de LLMs locais**: Meça tempos de resposta e throughput de seus modelos autohospedados
- **Análise de uso por modelo**: Compare padrões de uso entre diferentes modelos em sua configuração do Open WebUI
- **Análise de usuários** para entender padrões de interação
- **Capacidades de depuração** para solucionar problemas com respostas do modelo
- **Rastreamento de custos** do uso de LLMs entre diferentes provedores


## Como integrar Helicone com OpenWebUI

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="Reprodutor de vídeo do YouTube"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### Etapa 1: Crie uma conta Helicone e gere sua chave de API

Crie uma [conta Helicone](https://www.helicone.ai/) e faça login para gerar uma [chave de API aqui](https://us.helicone.ai/settings/api-keys).

*— Certifique-se de gerar uma [chave de API de escrita apenas](https://docs.helicone.ai/helicone-headers/helicone-auth). Isso garante que você apenas permita o registro de dados no Helicone sem acesso de leitura aos seus dados privados.*

### Etapa 2: Crie uma conta OpenAI e gere sua chave de API

Crie uma conta OpenAI e faça login no [Portal do Desenvolvedor da OpenAI](https://platform.openai.com/account/api-keys) para gerar uma chave de API.

### Etapa 3: Execute sua aplicação Open WebUI usando a URL base do Helicone

Para lançar sua primeira aplicação Open WebUI, use o comando dos [documentos do Open WebUI](https://docs.openwebui.com/) e inclua a URL BASE da API do Helicone para que você possa consultar e monitorar automaticamente.

```bash
   # Configure suas variáveis de ambiente
   export HELICONE_API_KEY=<SUA_CHAVE_DE_API>
   export OPENAI_API_KEY=<SUA_CHAVE_DE_API_DO_OPENAI>

   # Execute o Open WebUI com integração Helicone
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

Se você já tem uma aplicação do Open WebUI implantada, acesse o `Painel de Administração` > `Configurações` > `Conexões` e clique no sinal `+` em "Gerenciar Conexões de API do OpenAI". Atualize as seguintes propriedades:

- Sua `URL Base da API` seria ``https://oai.helicone.ai/v1/<SUA_CHAVE_DE_API_HELICONE>``
- A `CHAVE DE API` seria sua chave de API do OpenAI.

![Configuração Open WebUI Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### Etapa 4: Certifique-se de que o monitoramento está funcionando

Para garantir que sua integração está funcionando, faça login no painel do Helicone e revise a aba "Solicitações".

Você deverá ver as solicitações feitas através da interface do Open WebUI já registradas no Helicone.

![Exemplo de Registro Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## Saiba mais

Para um guia abrangente sobre o Helicone, você pode verificar [a documentação do Helicone aqui](https://docs.helicone.ai/getting-started/quick-start).
