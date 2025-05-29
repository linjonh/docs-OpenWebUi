---
sidebar_position: 400
title: "🔗 Endpoints da API"
---

Este guia fornece informações essenciais sobre como interagir com os endpoints da API de forma eficaz para alcançar integração e automação perfeitas usando nossos modelos. Observe que esta é uma configuração experimental e pode sofrer atualizações futuras para melhorias.

## Autenticação

Para garantir acesso seguro à API, é necessária autenticação 🛡️. Você pode autenticar suas solicitações de API usando o mecanismo Bearer Token. Obtenha sua chave de API em **Configurações > Conta** na Open WebUI ou, alternativamente, use um JWT (JSON Web Token) para autenticação.

## Endpoints Notáveis da API

### 📜 Recuperar Todos os Modelos

- **Endpoint**: `GET /api/models`
- **Descrição**: Busca todos os modelos criados ou adicionados via Open WebUI.
- **Exemplo**:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/models
  ```

### 💬 Completações de Chat

- **Endpoint**: `POST /api/chat/completions`
- **Descrição**: Serve como um endpoint de completas de chat compatível com a API OpenAI para modelos no Open WebUI, incluindo modelos Ollama, modelos OpenAI e modelos de Função do Open WebUI.

- **Exemplo com Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "llama3.1",
        "messages": [
          {
            "role": "user",
            "content": "Por que o céu é azul?"
          }
        ]
      }
  ```
  
- **Exemplo em Python**:
  ```python
  import requests
  
  def chat_with_model(token):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {
        "model": "granite3.1-dense:8b",
        "messages": [
          {
            "role": "user",
            "content": "Por que o céu é azul?"
          }
        ]
      }
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

### 🦙 Suporte ao Proxy da API Ollama

Se você deseja interagir diretamente com os modelos Ollama — incluindo geração de embeddings ou streaming bruto de prompts — o Open WebUI oferece uma passagem transparente para a API Ollama nativa via rota proxy.

- **URL Base**: `/ollama/<api>`
- **Referência**: [Documentação da API Ollama](https://github.com/ollama/ollama/blob/main/docs/api.md)

#### 🔁 Gerar Completações (Streaming)

```bash
curl http://localhost:3000/ollama/api/generate -d {
  "model": "llama3.2",
  "prompt": "Por que o céu é azul?"
}
```

#### 📦 Listar Modelos Disponíveis

```bash
curl http://localhost:3000/ollama/api/tags
```

#### 🧠 Gerar Embeddings

```bash
curl -X POST http://localhost:3000/ollama/api/embed -d {
  "model": "llama3.2",
  "input": ["Open WebUI é incrível!", "Vamos gerar embeddings."]
}
```

Isso é ideal para construir índices de pesquisa, sistemas de recuperação ou pipelines personalizados usando modelos Ollama integrados ao Open WebUI.

### 🧩 Geração Aumentada por Recuperação (RAG)

O recurso de Geração Aumentada por Recuperação (RAG) permite aprimorar as respostas incorporando dados de fontes externas. Abaixo, você encontrará os métodos para gerenciar arquivos e coleções de conhecimento via a API, e como usá-los em completas de chat de forma eficaz.

#### Envio de Arquivos

Para utilizar dados externos em respostas RAG, você precisa primeiro enviar os arquivos. O conteúdo do arquivo enviado é automaticamente extraído e armazenado em um banco de dados vetorial.

- **Endpoint**: `POST /api/v1/files/`
- **Exemplo com Curl**:

  ```bash
  curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Accept: application/json" \
  -F "file=@/path/to/your/file" http://localhost:3000/api/v1/files/
  ```

- **Exemplo em Python**:

  ```python
  import requests
  
  def upload_file(token, file_path):
      url = http://localhost:3000/api/v1/files/
      headers = {
          Authorization: fBearer {token},
          Accept: application/json
      }
      files = {file: open(file_path, rb)}
      response = requests.post(url, headers=headers, files=files)
      return response.json()
  ```

#### Adicionar Arquivos às Coleções de Conhecimento

Após o upload, você pode agrupar arquivos em uma coleção de conhecimento ou referenciá-los individualmente em chats.

- **Endpoint**: `POST /api/v1/knowledge/{id}/file/add`
- **Exemplo com Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {"file_id": "your-file-id-here"}
  ```

- **Exemplo em Python**:

  ```python
  import requests

  def add_file_to_knowledge(token, knowledge_id, file_id):
      url = fhttp://localhost:3000/api/v1/knowledge/{knowledge_id}/file/add
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      data = {file_id: file_id}
      response = requests.post(url, headers=headers, json=data)
      return response.json()
  ```

#### Usando Arquivos e Coleções em Conclusões de Conversa

Você pode referenciar tanto arquivos individuais quanto coleções inteiras em suas consultas RAG para respostas enriquecidas.

##### Usando um Arquivo Individual em Conclusões de Conversa

Este método é benéfico quando você deseja focar a resposta do modelo de chat no conteúdo de um arquivo específico.

- **Endpoint**: `POST /api/chat/completions`
- **Exemplo Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Explique os conceitos neste documento."}
        ],
        "files": [
          {"type": "file", "id": "your-file-id-here"}
        ]
      }
  ```

- **Exemplo Python**:

  ```python
  import requests

  def chat_with_file(token, model, query, file_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: file, id: file_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

##### Usando uma Coleção de Conhecimento em Conclusões de Conversa

Aproveite uma coleção de conhecimento para melhorar a resposta quando a consulta pode se beneficiar de um contexto mais amplo ou de vários documentos.

- **Endpoint**: `POST /api/chat/completions`
- **Exemplo Curl**:

  ```bash
  curl -X POST http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
        "model": "gpt-4-turbo",
        "messages": [
          {"role": "user", "content": "Forneça insights sobre as perspectivas históricas abordadas na coleção."}
        ],
        "files": [
          {"type": "collection", "id": "your-collection-id-here"}
        ]
      }
  ```

- **Exemplo Python**:

  ```python
  import requests
  
  def chat_with_collection(token, model, query, collection_id):
      url = http://localhost:3000/api/chat/completions
      headers = {
          Authorization: fBearer {token},
          Content-Type: application/json
      }
      payload = {
          model: model,
          messages: [{role: user, content: query}],
          files: [{type: collection, id: collection_id}]
      }
      response = requests.post(url, headers=headers, json=payload)
      return response.json()
  ```

Esses métodos permitem uma utilização eficaz de conhecimento externo via arquivos enviados e coleções de conhecimento organizadas, melhorando as capacidades das aplicações de chat utilizando a API Open WebUI. Esteja usando arquivos individualmente ou dentro de coleções, você pode personalizar a integração com base em suas necessidades específicas.

## Vantagens de Usar o Open WebUI como um Provedor LLM Unificado

O Open WebUI oferece uma variedade de benefícios, tornando-se uma ferramenta essencial para desenvolvedores e empresas:

- **Interface Unificada**: Simplifique suas interações com diferentes LLMs por meio de uma única plataforma integrada.
- **Facilidade de Implementação**: Início rápido de integração com documentação abrangente e suporte da comunidade.

## Links da Documentação Swagger

:::important
Certifique-se de definir a variável de ambiente `ENV` como `dev` para acessar a documentação Swagger de qualquer um desses serviços. Sem essa configuração, a documentação não estará disponível.
:::

Acesse uma documentação detalhada da API para diferentes serviços fornecidos pelo Open WebUI:

| Aplicação   | Caminho da Documentação |
|-------------|-------------------------|
| Principal   | `/docs`                 |


Seguindo estas diretrizes, você pode integrar rapidamente e começar a utilizar a API Open WebUI. Caso encontre algum problema ou tenha questões, sinta-se à vontade para entrar em contato através da nossa Comunidade Discord ou consultar as FAQs. Feliz codificação! 🌟
