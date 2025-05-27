---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Deseja contribuir? Confira o tutorial de contribuição.
:::

## 👁️ Mistral OCR

Esta documentação fornece um guia passo a passo para integrar o Mistral OCR com o Open WebUI. O Mistral OCR é uma biblioteca de reconhecimento ótico de caracteres projetada para extrair texto de vários formatos de arquivo baseados em imagem—including PDFs digitalizados, imagens e documentos manuscritos—em dados estruturados como JSON ou texto simples. Com suporte avançado para reconhecimento de texto multilíngue, análise de layout e interpretação de manuscritos, o Mistral OCR simplifica o processo de digitalização e processamento de documentos para aplicações de IA como busca, sumarização e extração de dados, tudo através de uma interface robusta e personalizável.

Pré-requisitos
------------

* Instância do Open WebUI
* Conta na Mistral AI

Etapas de Integração
----------------

### Etapa 1: Cadastre-se ou faça login no console da Mistral AI

* Acesse `https://console.mistral.ai`
* Siga as instruções conforme indicado no processo
* Após a autorização bem-sucedida, você deverá ser recebido na página inicial do Console

### Etapa 2: Gere uma chave de API

* Acesse `API Keys` ou `https://console.mistral.ai/api-keys`
* Crie uma nova chave e certifique-se de copiá-la

### Etapa 3: Configure o Open WebUI para usar o Mistral OCR

* Faça login na sua instância do Open WebUI.
* Navegue até o menu de configurações do `Admin Panel`.
* Clique em `Settings`.
* Clique na aba `Documents`.
* Altere a opção do menu suspenso de extração de conteúdo `Default` para `Mistral OCR`.
* Cole a chave de API no campo
* Salve no Admin Panel.

Verificando o Mistral OCR
=====================================

Para verificar se o Mistral OCR está funcionando corretamente no script, consulte `https://docs.mistral.ai/capabilities/document/`


### Conclusão

Integrar o Mistral OCR ao Open WebUI é uma maneira simples e eficaz de aprimorar o processamento de documentos e as capacidades de extração de conteúdo. Ao seguir os passos deste guia, você pode configurar o Mistral OCR como o mecanismo de extração padrão e aproveitar seus recursos avançados de reconhecimento de texto. Uma vez configurado, o Mistral OCR permite uma análise poderosa de documentos multilíngues com suporte para vários formatos, melhorando as capacidades de análise de documentos orientadas por IA no Open WebUI.
