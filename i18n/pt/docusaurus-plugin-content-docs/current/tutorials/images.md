---
sidebar_position: 6
title: "🎨 Geração de Imagens"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# 🎨 Geração de Imagens

O Open WebUI suporta geração de imagens por meio de três backends: **AUTOMATIC1111**, **ComfyUI** e **OpenAI DALL·E**. Este guia ajudará você a configurar e usar qualquer uma dessas opções.

## AUTOMATIC1111

O Open WebUI suporta geração de imagens através da [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) do **AUTOMATIC1111**. Aqui estão os passos para começar:

### Configuração Inicial

1. Certifique-se de que você tem o [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) instalado.
2. Inicie o AUTOMATIC1111 com flags adicionais para habilitar o acesso à API:

   ```
   ./webui.sh --api --listen
   ```

3. Para instalação no Docker do WebUI com as variáveis de ambiente pré-configuradas, use o seguinte comando:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Configurando o Open WebUI com AUTOMATIC1111

1. No Open WebUI, acesse o menu **Painel de Administração** > **Configurações** > **Imagens**.
2. Configure o campo `Motor de Geração de Imagens` para `Padrão (Automatic1111)`.
3. No campo URL da API, insira o endereço onde a API do AUTOMATIC1111 está acessível:

   ```
   http://<seu_endereço_automatic1111>:7860/
   ```

   Se você estiver executando uma instalação Docker do Open WebUI e AUTOMATIC1111 no mesmo host, use `http://host.docker.internal:7860/` como seu endereço.

## ComfyUI

O ComfyUI fornece uma interface alternativa para gerenciar e interagir com modelos de geração de imagens. Saiba mais ou baixe-o em sua [página do GitHub](https://github.com/comfyanonymous/ComfyUI). Abaixo estão as instruções de configuração para usar o ComfyUI junto com suas outras ferramentas.

### Configuração Inicial

1. Baixe e extraia o pacote de software ComfyUI do [GitHub](https://github.com/comfyanonymous/ComfyUI) no diretório desejado.
2. Para iniciar o ComfyUI, execute o seguinte comando:

   ```
   python main.py
   ```

   Para sistemas com pouca VRAM, inicie o ComfyUI com flags adicionais para reduzir o uso de memória:

   ```
   python main.py --lowvram
   ```

3. Para instalação no Docker do WebUI com as variáveis de ambiente pré-configuradas, use o seguinte comando:

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Configurando o Open WebUI com ComfyUI

#### Configurando Modelos FLUX.1

1. **Checkpoints do Modelo**:

* Baixe o modelo `FLUX.1-schnell` ou `FLUX.1-dev` da [página HuggingFace black-forest-labs](https://huggingface.co/black-forest-labs).
* Coloque os arquivos de checkpoint do modelo tanto nos diretórios `models/checkpoints` quanto `models/unet` do ComfyUI. Alternativamente, você pode criar um link simbólico entre os diretórios para garantir que ambos contenham os mesmos arquivos.

2. **Modelo VAE**:

* Baixe o `ae.safetensors` VAE [aqui](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors).
* Coloque-o no diretório `models/vae` do ComfyUI.

3. **Modelo CLIP**:

* Baixe o `clip_l.safetensors` [aqui](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Coloque-o no diretório `models/clip` do ComfyUI.

4. **Modelo T5XXL**:

* Baixe o `t5xxl_fp16.safetensors` ou `t5xxl_fp8_e4m3fn.safetensors` [aqui](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Coloque-o no diretório `models/clip` do ComfyUI.

Para integrar o ComfyUI ao Open WebUI, siga estes passos:

#### Passo 1: Configure as Configurações do Open WebUI

1. Acesse o **Painel de Administração** no Open WebUI.
2. Clique em **Configurações** e selecione a guia **Imagens**.
3. No campo `Motor de Geração de Imagens`, escolha `ComfyUI`.
4. No campo **URL da API**, insira o endereço onde a API do ComfyUI está acessível, seguindo este formato: `http://<seu_endereço_comfyui>:8188/`.
   * Defina a variável de ambiente `COMFYUI_BASE_URL` para este endereço para garantir que ela persista no WebUI.

#### Passo 2: Verifique a Conexão e Habilite a Geração de Imagens

1. Certifique-se de que o ComfyUI esteja funcionando e que você tenha verificado com sucesso a conexão com o Open WebUI. Não será possível prosseguir sem uma conexão bem-sucedida.
2. Uma vez verificada a conexão, habilite **Geração de Imagens (Experimental)**. Mais opções serão apresentadas a você.
3. Continue para a etapa 3 para os passos finais de configuração.

#### Etapa 3: Configurar as Configurações do ComfyUI e Importar Fluxo de Trabalho

1. Ative o modo de desenvolvedor dentro do ComfyUI. Para fazer isso, procure o ícone de engrenagem acima do botão **Queue Prompt** no ComfyUI e habilite a alternância `Dev Mode`.
2. Exporte o fluxo de trabalho desejado do ComfyUI no formato `API` usando o botão `Save (API Format)`. O arquivo será baixado como `workflow_api.json` se realizado corretamente.
3. Volte para o Open WebUI e clique no botão **Clique aqui para fazer upload de um arquivo workflow.json**.
4. Selecione o arquivo `workflow_api.json` para importar o fluxo de trabalho exportado do ComfyUI para o Open WebUI.
5. Após importar o fluxo de trabalho, você deve mapear os `ComfyUI Workflow Nodes` de acordo com os IDs dos nós de fluxo de trabalho importados.
6. Configure `Set Default Model` com o nome do arquivo do modelo sendo usado, como `flux1-dev.safetensors`.

:::info
Você pode precisar ajustar uma ou duas `Input Key` dentro da seção `ComfyUI Workflow Nodes` do Open WebUI para corresponder a um nó dentro do seu fluxo de trabalho.
Por exemplo, `seed` pode precisar ser renomeado para `noise_seed` para corresponder a um ID de nó dentro do seu fluxo de trabalho importado.
:::
:::tip
Alguns fluxos de trabalho, como os que usam qualquer um dos modelos Flux, podem utilizar vários IDs de nós que são necessários para preencher seus campos de entrada de nós dentro do Open WebUI. Se um campo de entrada de nó exigir vários IDs, os IDs dos nós devem ser separados por vírgulas (por exemplo, `1` ou `1, 2`).
:::

6. Clique em `Save` para aplicar as configurações e aproveite a geração de imagens com o ComfyUI integrado ao Open WebUI!

Após concluir essas etapas, sua configuração do ComfyUI deverá estar integrada ao Open WebUI, e você poderá usar os modelos Flux.1 para geração de imagens.

### Configurando com SwarmUI

SwarmUI utiliza ComfyUI como seu backend. Para que o Open WebUI funcione com o SwarmUI, você precisará adicionar `ComfyBackendDirect` ao `ComfyUI Base URL`. Além disso, será necessário configurar o SwarmUI com acesso LAN. Após os ajustes mencionados, configurar o SwarmUI para funcionar com o Open WebUI será igual ao [Passo um: Configurar Configurações do Open WebUI](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings) conforme descrito acima.
![Instale SwarmUI com Acesso LAN](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### SwarmUI API URL

O endereço que você deverá inserir como ComfyUI Base URL será semelhante a: `http://<seu_endereço_swarmui>:7801/ComfyBackendDirect`

## OpenAI DALL·E

O Open WebUI também suporta geração de imagens através das **APIs OpenAI DALL·E**. Esta opção inclui um seletor para escolher entre DALL·E 2 e DALL·E 3, cada um suportando diferentes tamanhos de imagens.

### Configuração Inicial

1. Obtenha uma [chave API](https://platform.openai.com/api-keys) da OpenAI.

### Configurando o Open WebUI

1. No Open WebUI, navegue até o menu **Painel Administrativo** > **Configurações** > **Imagens**.
2. Defina o campo `Image Generation Engine` como `Open AI (Dall-E)`.
3. Insira sua chave API da OpenAI.
4. Escolha o modelo DALL·E que deseja usar. Note que as opções de tamanho de imagem dependerão do modelo selecionado:
   * **DALL·E 2**: Suporta imagens de `256x256`, `512x512` ou `1024x1024`.
   * **DALL·E 3**: Suporta imagens de `1024x1024`, `1792x1024` ou `1024x1792`.

### Azure OpenAI

Usar diretamente Azure OpenAI DALL·E não é suportado, mas você pode [configurar um proxy LiteLLM](https://litellm.vercel.app/docs/image_generation) que é compatível com o `Open AI (Dall-E)` Image Generation Engine.

## Usando a Geração de Imagens

![Tutorial de Geração de Imagens](/images/tutorial_image_generation.png)

1. Primeiro, use um modelo de geração de texto para escrever um prompt para a geração de imagens.
2. Após a resposta terminar, você pode clicar no ícone de imagem para gerar uma imagem.
3. Depois que a imagem terminar de ser gerada, ela será retornada automaticamente no chat.

:::tip
    Você também pode editar a resposta do LLM e inserir seu prompt de geração de imagens como a mensagem
    para enviar para geração de imagens em vez de usar a resposta real fornecida pelo
    LLM.
:::
