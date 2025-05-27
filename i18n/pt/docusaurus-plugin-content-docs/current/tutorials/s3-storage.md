---
sidebar_position: 320
title: "🪣 Alternando para Armazenamento S3"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é apoiado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Deseja contribuir? Confira o tutorial de contribuição.
:::

# 🪣 Alternando para Armazenamento S3

Este guia fornece instruções sobre como alternar o armazenamento padrão `local` na configuração do Open WebUI para o Amazon S3.

## Pré-requisitos

Para seguir este tutorial, você deve ter o seguinte:

- Uma conta AWS ativa
- Uma Chave de Acesso AWS ativa e uma Chave Secreta
- Permissões IAM na AWS para criar e colocar objetos no S3
- Docker instalado no seu sistema

## O que é o Amazon S3

Diretamente do site da AWS:

"Amazon S3 é um serviço de armazenamento de objetos que oferece escalabilidade líder de mercado, disponibilidade de dados, segurança e desempenho. Armazene e proteja qualquer quantidade de dados para uma gama de casos de uso, como lakes de dados, sites, aplicativos nativos da nuvem, backups, arquivamento, aprendizado de máquina e análise. O Amazon S3 é projetado para 99,999999999% (11 9s) de durabilidade e armazena dados para milhões de clientes em todo o mundo."

Para saber mais sobre o S3, visite: [Página Oficial do Amazon S3](https://aws.amazon.com/s3/)

# Como Configurar

## 1. Variáveis de ambiente necessárias

Para configurar esta opção, você precisa reunir as seguintes variáveis de ambiente:

| **Variável de Ambiente do Open-WebUI** | **Valor de Exemplo**                           |
|---------------------------------------|-----------------------------------------------|
| `S3_ACCESS_KEY_ID`                    | ABC123                                        |
| `S3_SECRET_ACCESS_KEY`                | SuperSecret                                   |
| `S3_ENDPOINT_URL`                     | https://s3.us-east-1.amazonaws.com            |
| `S3_REGION_NAME`                      | us-east-1                                     |
| `S3_BUCKET_NAME`                      | my-awesome-bucket-name                        |

- S3_ACCESS_KEY_ID: Este é um identificador para a chave de acesso da sua conta AWS. Você obtém isso no AWS Management Console ou AWS CLI ao criar uma chave de acesso.
- S3_SECRET_ACCESS_KEY: Esta é a parte secreta do par de chaves de acesso AWS. É fornecida ao criar uma chave de acesso na AWS e deve ser armazenada com segurança.
- S3_ENDPOINT_URL: Este URL direciona para o endpoint do serviço S3 e normalmente pode ser encontrado na documentação do serviço AWS ou nas configurações da conta.
- S3_REGION_NAME: Esta é a região da AWS onde está localizado seu bucket S3, como "us-east-1". Você pode identificar isso no AWS Management Console nos detalhes do seu bucket S3.
- S3_BUCKET_NAME: Este é o nome único do seu bucket S3, que você especificou ao criar o bucket na AWS.

Para uma lista completa dos URLs de endpoint disponíveis do S3, consulte: [Amazon S3 Regular Endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html)

Veja todas as opções de configuração de `Armazenamento na Nuvem` aqui: [Configuração de Armazenamento na Nuvem - Open-WebUI](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Execute o Open-WebUI

Antes de lançar nossa instância do Open-WebUI, há uma última variável de ambiente chamada `STORAGE_PROVIDER` que precisamos definir. Esta variável indica ao Open-WebUI qual provedor você deseja usar. Por padrão, `STORAGE_PROVIDER` está vazio, o que significa que o Open-WebUI usa armazenamento local.

| **Provedor de Armazenamento** | **Tipo** | **Descrição**                                                                                     | **Padrão** |
|------------------------------|----------|-------------------------------------------------------------------------------------------------|-------------|
| `local`                     | str      | Padrão para armazenamento local se uma string vazia (` `) for fornecida                        | Sim         |
| `s3`                        | str      | Usa a biblioteca cliente S3 e variáveis de ambiente relacionadas mencionadas no Armazenamento Amazon S3     | Não          |
| `gcs`                       | str      | Usa a biblioteca cliente GCS e variáveis de ambiente relacionadas mencionadas no Armazenamento Google Cloud | Não          |

Para usar o Amazon S3, precisamos definir `STORAGE_PROVIDER` como "S3" junto com todas as variáveis de ambiente que reunimos na Etapa 1 (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`).

Aqui, também estou definindo o `ENV` como "dev", o que nos permitirá ver os documentos Swagger do Open-WebUI para que possamos testar e confirmar ainda mais que a configuração do armazenamento S3 está funcionando conforme esperado.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="my-awesome-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. Teste a configuração

Agora que temos Open-WebUI em execução, vamos enviar um arquivo de texto simples `Hello, World` e testar nossa configuração.

![Envie um arquivo no Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

E confirme que estamos recebendo uma resposta do LLM selecionado.

![Obtenha uma resposta no Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

Ótimo! Parece que tudo funcionou como esperado no Open-WebUI. Agora, vamos verificar se o arquivo de texto foi realmente enviado e armazenado no bucket S3 especificado. Usando o Console de Gerenciamento da AWS, podemos ver que agora há um arquivo no bucket S3. Além do nome do arquivo que enviamos (`hello.txt`), você pode ver que o nome do objeto foi complementado com um ID exclusivo. É assim que o Open-WebUI rastreia todos os arquivos enviados.

![Obtenha uma resposta no Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Usando a documentação swagger do Open-WebUI, podemos obter todas as informações relacionadas a este arquivo usando o endpoint `/api/v1/files/{id}` e passando o ID exclusivo (4405fabb-603e-4919-972b-2b39d6ad7f5b).

![Inspecione o arquivo por ID](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
