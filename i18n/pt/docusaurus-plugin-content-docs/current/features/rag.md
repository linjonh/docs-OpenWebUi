---
sidebar_position: 11
title: "🔎 Recuperação Aumentada por Geração (RAG)"
---

:::warning

Se você estiver usando **Ollama**, observe que ele **define por padrão um comprimento de contexto de 2048 tokens**. Isso significa que os dados recuperados podem **não ser utilizados de forma alguma** devido à falta de espaço na janela de contexto disponível. Para melhorar o desempenho da **Recuperação Aumentada por Geração (RAG)**, você deve **aumentar o comprimento do contexto** para **8192+ tokens** nas configurações do modelo Ollama.

:::


Recuperação Aumentada por Geração (RAG) é uma tecnologia de ponta que aprimora as capacidades de conversação dos chatbots, incorporando o contexto de diversas fontes. Ela funciona recuperando informações relevantes de um amplo espectro de fontes, como documentos locais e remotos, conteúdo da web e até fontes multimídia como vídeos do YouTube. O texto recuperado é então combinado com um modelo RAG predefinido e prefixado ao prompt do usuário, fornecendo uma resposta mais informada e contextualmente relevante.

Uma das principais vantagens do RAG é sua capacidade de acessar e integrar informações de diversas fontes, tornando-o uma solução ideal para cenários de conversação complexos. Por exemplo, quando um usuário faz uma pergunta relacionada a um documento ou página web específica, o RAG pode recuperar e incorporar as informações relevantes dessa fonte na resposta do chat. O RAG também pode recuperar e incorporar informações de fontes multimídia como vídeos do YouTube. Ao analisar as transcrições ou legendas desses vídeos, o RAG pode extrair informações relevantes e incorporá-las na resposta do chat.




## Integração Local e Remota do RAG

Os documentos locais devem primeiro ser carregados na seção Documentos da área de Trabalho para acessá-los usando o símbolo `#` antes de uma consulta. Clique no URL formatado que aparece acima da caixa de chat. Uma vez selecionado, um ícone de documento aparece acima de `Enviar uma mensagem`, indicando recuperação bem-sucedida.

Você também pode carregar documentos na área de trabalho com acesso a eles iniciando um prompt com `#`, seguido de um URL. Isso pode ajudar a incorporar diretamente conteúdo da web às suas conversas.

## Pesquisa na Web para RAG

Para integração de conteúdo da web, inicie uma consulta no chat com `#`, seguido pelo URL alvo. Clique no URL formatado na caixa que aparece acima do chat. Uma vez selecionado, um ícone de documento aparece acima de `Enviar uma mensagem`, indicando recuperação bem-sucedida. O WebUI abre e faz a busca e análise das informações do URL, quando possível.

:::tip
Páginas da web frequentemente contêm informações extras, como navegação e rodapé. Para melhores resultados, linke uma versão bruta ou com formato amigável de leitura da página.
:::

## Personalização de Modelo do RAG

Personalize o modelo RAG a partir do menu `Painel Admin` > `Configurações` > `Documentos`.

## Suporte a Embedding do RAG

Altere o modelo de embedding do RAG diretamente no menu `Painel Admin` > `Configurações` > `Documentos`. Essa funcionalidade suporta modelos Ollama e OpenAI, permitindo melhorar o processamento de documentos conforme suas necessidades.

## Citações na Funcionalidade do RAG

A funcionalidade RAG permite aos usuários rastrear facilmente o contexto dos documentos fornecidos aos LLMs com citações adicionadas como pontos de referência. Isso garante transparência e responsabilidade no uso de fontes externas dentro das suas conversas.

## Pipeline Aprimorada do RAG

O recurso híbrido de pesquisa acionável para nossa funcionalidade de embedding do RAG aprimora a funcionalidade RAG via `BM25`, com reclassificação impulsionada pelo `CrossEncoder` e limites configuráveis de pontuação de relevância. Isso proporciona uma experiência RAG mais precisa e personalizada para o seu caso de uso específico.

## Pipeline RAG para YouTube

O pipeline dedicado do RAG para resumir vídeos do YouTube via URLs oferece interação suave com as transcrições de vídeos diretamente. Esse recurso inovador permite incorporar conteúdo de vídeo nas suas conversas, enriquecendo ainda mais sua experiência conversacional.

## Análise de Documentos

Uma variedade de analisadores extrai conteúdo de documentos locais e remotos. Para mais, veja a função [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328).

## Integração com Google Drive

Quando emparelhado com um projeto Google Cloud que tenha APIs Google Picker e Google Drive habilitadas, esse recurso permite que os usuários acessem diretamente seus arquivos do Drive pela interface do chat e carreguem documentos, slides, planilhas e outros, usando-os como contexto para o chat. Pode ser habilitado pelo menu `Painel Admin` > `Configurações` > `Documentos`. É necessário definir as variáveis de ambiente [`GOOGLE_DRIVE_API_KEY e GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) para utilizá-lo.

### Instruções Detalhadas
1. Crie um cliente OAuth 2.0 e configure tanto as origens JavaScript autorizadas quanto os URIs de redirecionamento autorizados para o URL (inclua a porta, se houver) que você usa para acessar sua instância do Open-WebUI.
1. Anote o ID do Cliente associado a esse cliente OAuth.
1. Certifique-se de habilitar tanto a API do Google Drive quanto a API do Google Picker para o seu projeto.
1. Também configure seu aplicativo (projeto) como Teste e adicione seu e-mail do Google Drive à Lista de Usuários.
1. Defina o escopo de permissão para incluir tudo o que essas APIs oferecem. E como o aplicativo estará no modo de Teste, nenhuma verificação será necessária pelo Google para permitir que o aplicativo acesse os dados dos usuários de teste limitados.
1. Vá para a página da API do Google Picker e clique no botão para criar credenciais.
1. Crie uma chave API e, em Restrições de Aplicativos, escolha Websites. Depois, adicione o URL da sua instância Open-WebUI, o mesmo que as configurações de Origem JavaScript Autorizada e URIs de Redirecionamento Autorizados na etapa 1.
1. Configure restrições de API na Chave API para ter acesso apenas às APIs do Google Drive e Google Picker.
1. Configure a variável de ambiente `GOOGLE_DRIVE_CLIENT_ID` com o ID do Cliente do cliente OAuth da etapa 2.
1. Configure a variável de ambiente `GOOGLE_DRIVE_API_KEY` com o valor da Chave API configurada na etapa 7 (NÃO o segredo do cliente OAuth da etapa 2).
1. Configure o `GOOGLE_REDIRECT_URI` para o URL da minha instância Open-WebUI (inclua a porta, caso exista).
1. Então, reinicie sua instância Open-WebUI com essas três variáveis de ambiente.
1. Depois disso, certifique-se de que o Google Drive foi habilitado em `Admin Panel` < `Configurações` < `Documentos` < `Google Drive`.
