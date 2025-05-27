---
sidebar_position: 16
title: "🌐 Motor de Busca do Navegador"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é apoiado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Integração com Motor de Busca do Navegador

O Open WebUI permite que você integre diretamente ao seu navegador. Este tutorial irá orientá-lo no processo de configurar o Open WebUI como um motor de busca personalizado, possibilitando executar consultas facilmente pela barra de endereço do navegador.

## Configurando o Open WebUI como Motor de Busca

### Pré-requisitos

Antes de começar, certifique-se de que:

- Você tem Chrome ou outro navegador compatível instalado.
- A variável de ambiente `WEBUI_URL` está configurada corretamente, seja usando variáveis de ambiente do Docker ou no arquivo `.env`, conforme especificado no guia [Primeiros Passos](/getting-started/env-configuration).

### Passo 1: Configurar a Variável de Ambiente WEBUI_URL

Configurar a variável de ambiente `WEBUI_URL` garante que seu navegador saiba para onde direcionar as consultas.

#### Usando Variáveis de Ambiente do Docker

Se você estiver executando o Open WebUI usando Docker, pode configurar a variável de ambiente no seu comando `docker run`:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<sua-url-open-webui>" \
  ghcr.io/open-webui/open-webui:main
```

Alternativamente, você pode adicionar a variável ao seu arquivo `.env`:

```plaintext
WEBUI_URL=https://<sua-url-open-webui>
```

### Passo 2: Adicionar o Open WebUI como um Motor de Busca Personalizado

### Para Chrome

1. Abra o Chrome e navegue até **Configurações**.
2. Selecione **Motor de busca** na barra lateral e clique em **Gerenciar motores de busca**.
3. Clique em **Adicionar** para criar um novo motor de busca.
4. Preencha os detalhes como segue:
    - **Motor de busca**: Pesquisa Open WebUI
    - **Palavra-chave**: webui (ou qualquer palavra-chave que preferir)
    - **URL com %s no lugar da consulta**:

      ```
      https://<sua-url-open-webui>/?q=%s
      ```

5. Clique em **Adicionar** para salvar a configuração.

### Para Firefox

1. Acesse o Open WebUI no Firefox.
2. Expanda a barra de endereço clicando nela.
3. Clique no ícone de mais que está dentro de um círculo verde na parte inferior da barra de endereço expandida. Isso adiciona a pesquisa do Open WebUI aos motores de busca nas suas preferências.

Alternativamente:

1. Acesse o Open WebUI no Firefox.
2. Clique com o botão direito na barra de endereço.
3. Selecione "Adicionar Open WebUI" (ou similar) no menu de contexto.

### Opcional: Usando Modelos Específicos

Se desejar utilizar um modelo específico para sua pesquisa, modifique o formato da URL para incluir o ID do modelo:

```
https://<sua-url-open-webui>/?models=<model_id>&q=%s
```

**Nota:** O ID do modelo precisará ser codificado na URL. Caracteres especiais como espaços ou barras precisam ser codificados (ex.: `meu modelo` se torna `meu%20modelo`).

## Exemplo de Uso

Uma vez que o motor de busca está configurado, você pode realizar buscas diretamente na barra de endereço. Basta digitar a palavra-chave escolhida seguida pela sua consulta:

```
webui sua consulta de busca
```

Esse comando o redirecionará para a interface do Open WebUI com os resultados da pesquisa.

## Solução de Problemas

Se encontrar algum problema, verifique o seguinte:

- Certifique-se de que o `WEBUI_URL` está configurado corretamente e aponta para uma instância válida do Open WebUI.
- Verifique se o formato da URL do motor de busca está corretamente inserido nas configurações do navegador.
- Confirme se sua conexão com a internet está ativa e que o serviço Open WebUI está funcionando corretamente.
