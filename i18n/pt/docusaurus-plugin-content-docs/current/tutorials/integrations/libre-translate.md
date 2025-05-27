---
sidebar_position: 25
title: "🔠 Integração do LibreTranslate"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é apoiado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para casos de uso específicos. Quer contribuir? Confira o tutorial de contribuição.
:::

Visão Geral
--------

O LibreTranslate é uma API de tradução automática gratuita e de código aberto que suporta uma ampla gama de idiomas. O LibreTranslate é auto-hospedado, funciona offline e é fácil de configurar. Diferentemente de outras APIs, ele não depende de provedores proprietários como Google ou Azure para realizar traduções. Em vez disso, seu motor de tradução é alimentado pela biblioteca open source [Argos Translate](https://github.com/argosopentech/argos-translate). Você pode integrar o LibreTranslate com o Open WebUI para aproveitar suas capacidades de tradução automática. Esta documentação fornece um guia passo a passo para configurar o LibreTranslate no Docker e configurar a integração no Open WebUI.

Configurando o LibreTranslate no Docker
-----------------------------------------

Para configurar o LibreTranslate no Docker, siga estas etapas:

### Etapa 1: Criar um arquivo Docker Compose

Crie um novo arquivo chamado `docker-compose.yml` em um diretório de sua escolha. Adicione a seguinte configuração ao arquivo:

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### Etapa 2: Criar um arquivo `stack.env`

Crie um novo arquivo chamado `stack.env` no mesmo diretório que o arquivo `docker-compose.yml`. Adicione a seguinte configuração ao arquivo:

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### Etapa 3: Executar o arquivo Docker Compose

Execute o seguinte comando para iniciar o serviço LibreTranslate:

```bash
docker-compose up -d
```

Isso iniciará o serviço LibreTranslate em modo detached.

Configurando a Integração no Open WebUI
-------------------------------------------

Depois de ter o LibreTranslate em execução no Docker, você pode configurar a integração no Open WebUI. Há várias integrações da comunidade disponíveis, incluindo:

* [Função de Filtro do LibreTranslate](https://openwebui.com/f/iamg30/libretranslate_filter)
* [Função de Ação do LibreTranslate](https://openwebui.com/f/jthesse/libretranslate_action)
* [Função de Ação MultiIdioma do LibreTranslate](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [Pipeline de Filtro do LibreTranslate](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

Escolha a integração que melhor atenda às suas necessidades e siga as instruções para configurá-la no Open WebUI.

Idiomas suportados para o pipeline e função do LibreTranslate:
Praticamente todos os idiomas encontrados no LibreTranslate, mas aqui está a lista:
```
Albanês, Árabe, Azerbaijano, Bengali, Búlgaro, Catalão, Valenciano, Chinês, Tcheco, Dinamarquês, Holandês, Inglês, Flamengo, Esperanto, Estoniano, Finlandês, Francês, Alemão, Grego, Hebraico, Hindu, Húngaro, Indonésio, Irlandês, Italiano, Japonês, Coreano, Letão, Lituano, Malaio, Persa, Polonês, Português, Romeno, Moldávio, Moldávio, Russo, Eslovaco, Esloveno, Espanhol, Castelhano, Sueco, Tagalo, Tailandês, Turco, Ucraniano, Urdu
```

Solução de Problemas
-------------------

* Certifique-se de que o serviço LibreTranslate está em execução e acessível.
* Verifique se a configuração do Docker está correta.
* Verifique os logs do LibreTranslate para erros.

Benefícios da Integração
----------------------------

Integrar o LibreTranslate ao Open WebUI oferece vários benefícios, incluindo:

* Capacidades de tradução automática para uma ampla gama de idiomas.
* Melhoria na análise e processamento de textos.
* Funcionalidade aprimorada para tarefas relacionadas a idiomas.

Conclusão
----------

Integrar o LibreTranslate ao Open WebUI é um processo simples que pode melhorar a funcionalidade da sua instância Open WebUI. Seguindo os passos descritos nesta documentação, você pode configurar o LibreTranslate no Docker e configurar a integração no Open WebUI.
