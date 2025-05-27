---
sidebar_position: 31
title: "🛌 Integrar com o Amazon Bedrock"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

---

# Integrando o Open-WebUI com o Amazon Bedrock

Neste tutorial, exploraremos uma das abordagens mais comuns e populares para integrar o Open-WebUI com o Amazon Bedrock.

## Pré-requisitos


Para seguir este tutorial, você deve ter o seguinte:

- Uma conta AWS ativa
- Uma Chave de Acesso AWS e uma Chave Secreta ativas
- Permissões IAM na AWS para habilitar modelos do Bedrock ou modelos já habilitados
- Docker instalado no seu sistema


## O que é o Amazon Bedrock

Diretamente do site da AWS:

"O Amazon Bedrock é um serviço totalmente gerenciado que oferece uma escolha de modelos base de alto desempenho (FMs) de empresas líderes de IA como AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside (em breve), Stability AI e Amazon por meio de uma única API, juntamente com um amplo conjunto de capacidades que você precisa para construir aplicativos de IA generativa com segurança, privacidade e IA responsável. Usando o Amazon Bedrock, você pode experimentar e avaliar facilmente os principais FMs para seu caso de uso, personalizá-los em privado com seus dados usando técnicas como ajuste fino e Recuperação de Geração Aumentada (RAG) e criar agentes que executam tarefas usando seus sistemas e fontes de dados empresariais. Como o Amazon Bedrock é serverless, você não precisa gerenciar nenhuma infraestrutura e pode integrar e implantar com segurança capacidades de IA generativa em seus aplicativos usando os serviços da AWS com os quais você já está familiarizado."

Para saber mais sobre o Bedrock, visite: [Página Oficial do Amazon Bedrock](https://aws.amazon.com/bedrock/)

# Passos para Integração

## Passo 1: Verifique o acesso aos Modelos Base do Amazon Bedrock

Antes que possamos integrar com o Bedrock, primeiro você deve verificar se tem acesso a pelo menos um, mas preferivelmente vários, dos Modelos Base disponíveis. No momento desta escrita (fev 2025), havia 47 modelos base disponíveis. Você pode ver na captura de tela abaixo que tenho acesso a vários modelos. Você saberá se tem acesso a um modelo se ele exibir "✅ Acesso Concedido" ao lado do modelo. Se você não tiver acesso a nenhum modelo, ocorrerá um erro na próxima etapa.

A AWS fornece boa documentação sobre solicitação de acesso/habilitação para esses modelos aqui: [Documentação de Acesso aos Modelos do Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Modelos Base do Amazon Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## Passo 2: Configure o Gateway de Acesso ao Bedrock

Agora que temos acesso a pelo menos um modelo base do Bedrock, precisamos configurar o Gateway de Acesso ao Bedrock, ou BAG. Você pode pensar no BAG como um tipo de proxy ou middleware desenvolvido pela AWS que envolve os endpoints/SDK nativos da AWS para o Bedrock e, por sua vez, expõe endpoints compatíveis com o esquema do OpenAI, que é o que o Open-WebUI requer.

Para referência, aqui está um mapeamento simples entre os endpoints:


| Endpoint da OpenAI       | Método do Bedrock         |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse ou converse_stream    |
| `/embeddings`           | invoke_model           |

O repositório do BAG pode ser encontrado aqui: [Repositório do Gateway de Acesso ao Bedrock](https://github.com/aws-samples/bedrock-access-gateway)

Para configurar o BAG, siga os passos abaixo:
- Clone o repositório do BAG
- Remova o `dockerfile` padrão
- Renomeie o `Dockerfile_ecs` para `Dockerfile`

Agora estamos prontos para criar e lançar o contêiner Docker usando:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

Agora você deve conseguir acessar a página swagger do BAG em: http://localhost:8000/docs

![Swagger do Gateway de Acesso ao Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## Passo 3: Adicione Conexão no Open-WebUI

Agora que você tem o BAG em execução, é hora de adicioná-lo como uma nova conexão no Open-WebUI.

- No Painel de Administração, vá para Configurações -> Conexões.
- Use o botão "+" para adicionar uma nova conexão sob o OpenAI
- Para a URL, use "http://host.docker.internal:8000/api/v1"
- Para a senha, a senha padrão definida no BAG é "bedrock". Você sempre pode alterar essa senha nas configurações do BAG (consulte DEFAULT_API_KEYS)
- Clique no botão "Verificar Conexão" e você deve ver um alerta "Conexão com o servidor verificada" no canto superior direito

![Adicionar Nova Conexão](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## Etapa 4: Comece a usar os Modelos Base do Bedrock

Agora você deve ver todos os seus modelos Bedrock disponíveis!

![Usar Modelos Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## Outros Tutoriais Úteis

Estes são alguns outros tutoriais muito úteis ao trabalhar para integrar Open-WebUI com Amazon Bedrock.

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
