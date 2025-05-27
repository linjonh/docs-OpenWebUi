---
sidebar_position: 4000
title: "🐤 Extração de Documentos Docling"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Deseja contribuir? Confira o tutorial sobre como contribuir.
:::

## 🐤 Extração de Documentos Docling

Esta documentação fornece um guia passo a passo para integrar o Docling com o Open WebUI. O Docling é uma biblioteca de processamento de documentos projetada para transformar uma ampla variedade de formatos de arquivo — incluindo PDFs, documentos do Word, planilhas, HTML e imagens — em dados estruturados, como JSON ou Markdown. Com suporte integrado para detecção de layout, análise de tabelas e processamento com sensibilidade ao idioma, o Docling simplifica a preparação de documentos para aplicações de IA, como busca, sumarização e geração aumentada por recuperação, tudo através de uma interface unificada e extensível.

Pré-requisitos
------------

* Instância do Open WebUI
* Docker instalado no seu sistema
* Rede Docker configurada para o Open WebUI

Etapas de Integração
----------------

### Etapa 1: Execute o Comando Docker para o Docling-Serve

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*Com suporte a GPU:
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### Etapa 2: Configure o Open WebUI para usar o Docling

* Faça login em sua instância do Open WebUI.
* Navegue até o menu de configurações no `Painel de Administração`.
* Clique em `Configurações`.
* Clique na aba `Documentos`.
* Altere o menu suspenso do mecanismo de extração de conteúdo `Padrão` para `Docling`.
* Atualize a URL do mecanismo de extração de contexto para `http://host.docker.internal:5001`.
* Salve as alterações.

Verificação do Docling no Docker
=====================================

Para verificar se o Docling está funcionando corretamente em um ambiente Docker, você pode seguir estas etapas:

### 1. Inicie o Contêiner Docker do Docling

Primeiro, certifique-se de que o contêiner Docker do Docling está em execução. Você pode iniciá-lo usando o seguinte comando:

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

Este comando inicia o contêiner do Docling e mapeia a porta 5001 do contêiner para a porta 5001 em sua máquina local.

### 2. Verifique se o Servidor está em Execução

* Acesse `http://127.0.0.1:5001/ui/` 
* A URL deve levar a uma interface para usar o Docling

### 3. Verifique a Integração

* Tente fazer upload de alguns arquivos por meio da interface e ele deve retornar a saída no formato MD ou no formato desejado

### Conclusão

Integrar o Docling ao Open WebUI é uma maneira simples e eficaz de aprimorar as capacidades de processamento de documentos e extração de conteúdo. Seguindo as etapas deste guia, você pode configurar o Docling como o mecanismo padrão de extração e verificar se está funcionando corretamente em um ambiente Docker. Após configurado, o Docling permite um poderoso processamento de documentos independente do formato para dar suporte a recursos de IA mais avançados no Open WebUI.
