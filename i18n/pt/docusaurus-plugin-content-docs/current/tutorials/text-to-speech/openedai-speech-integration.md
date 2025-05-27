---
sidebar_position: 2
title: "🗨️ Openedai-speech Usando Docker"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

**Integrando `openedai-speech` ao Open WebUI usando Docker**
===========================================================

**O que é `openedai-speech`?**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) é um servidor de texto para fala compatível com a API de áudio/fala do OpenAI.

Ele serve o endpoint `/v1/audio/speech` e oferece uma experiência de texto para fala gratuita e privada com capacidades de clonagem de voz personalizada. Este serviço não possui qualquer afiliação com OpenAI e não requer uma chave de API do OpenAI.
:::

**Requisitos**
--------------

* Docker instalado em seu sistema
* Open WebUI executando em um contêiner Docker
* Conhecimento básico sobre Docker e Docker Compose

**Opção 1: Usando Docker Compose**
----------------------------------

**Etapa 1: Crie uma nova pasta para o serviço `openedai-speech`**
----------------------------------------------------------------

Crie uma nova pasta, por exemplo, `openedai-speech-service`, para armazenar os arquivos `docker-compose.yml` e `speech.env`.

**Etapa 2: Clone o repositório `openedai-speech` do GitHub**
----------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

Isso baixará o repositório `openedai-speech` para sua máquina local, incluindo os arquivos Docker Compose (`docker-compose.yml`, `docker-compose.min.yml` e `docker-compose.rocm.yml`) e outros arquivos necessários.

**Etapa 3: Renomeie o arquivo `sample.env` para `speech.env` (Personalize se necessário)**
---------------------------------------------------------------------------------------

Na pasta do repositório `openedai-speech`, crie um novo arquivo chamado `speech.env` com o seguinte conteúdo:

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**Etapa 4: Escolha um arquivo Docker Compose**
--------------------------------------------

Você pode usar qualquer um dos seguintes arquivos Docker Compose:

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): Este arquivo usa a imagem `ghcr.io/matatonic/openedai-speech` e é construído a partir do [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile).
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): Este arquivo usa a imagem `ghcr.io/matatonic/openedai-speech-min` e é construído a partir do [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min). Esta imagem é uma versão mínima que inclui apenas suporte ao Piper e não requer uma GPU.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): Este arquivo usa a imagem `ghcr.io/matatonic/openedai-speech-rocm` e é construído a partir do [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) com suporte ao ROCm.

**Etapa 4: Construa a imagem Docker escolhida**
--------------------------------------------

Antes de executar o arquivo Docker Compose, você precisa construir a imagem Docker:

* **GPU Nvidia (suporte CUDA)**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **GPU AMD (suporte ROCm)**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **Somente CPU, sem GPU (apenas Piper)**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**Etapa 5: Execute o comando correto `docker compose up -d`**
-----------------------------------------------------------

* **GPU Nvidia (suporte CUDA)**: Execute o seguinte comando para iniciar o serviço `openedai-speech` em modo desconectado:

```bash
docker compose up -d
```

* **GPU AMD (suporte ROCm)**: Execute o seguinte comando para iniciar o serviço `openedai-speech` em modo desconectado:

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Apple M-series, Raspberry Pi)**: XTTS tem suporte apenas para CPU aqui e será muito lento. Você pode usar a imagem Nvidia para XTTS com CPU (lento), ou usar a imagem apenas Piper (recomendado):

```bash
docker compose -f docker-compose.min.yml up -d
```

* **Somente CPU, sem GPU (apenas Piper)**: Para uma imagem Docker mínima com apenas suporte Piper (< 1GB contra 8GB):

```bash
docker compose -f docker-compose.min.yml up -d
```

Isso iniciará o serviço `openedai-speech` em modo desconectado.

**Opção 2: Usando comandos Docker Run**
-------------------------------------


Você também pode usar os seguintes comandos Docker run para iniciar o serviço `openedai-speech` no modo desanexado:

* **Nvidia GPU (CUDA)**: Execute o seguinte comando para construir e iniciar o serviço `openedai-speech`:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: Execute o seguinte comando para construir e iniciar o serviço `openedai-speech`:

> Para habilitar o suporte ao ROCm, descomente a linha `#USE_ROCM=1` no arquivo `speech.env`.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **Somente CPU, Sem GPU (Apenas Piper)**: Execute o seguinte comando para construir e iniciar o serviço `openedai-speech`:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**Passo 6: Configurando o Open WebUI para usar `openedai-speech` para TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Abra as configurações do Open WebUI e navegue para as Configurações TTS em **Painel de Administrador > Configurações > Áudio**. Adicione a seguinte configuração:

* **URL Base da API**: `http://host.docker.internal:8000/v1`
* **Chave da API**: `sk-111111111` (Observe que esta é uma chave de API fictícia, pois `openedai-speech` não requer uma chave de API. Você pode usar qualquer valor para este campo, desde que esteja preenchido.)

**Passo 7: Escolha uma voz**
--------------------------

Na opção `TTS Voice` dentro do mesmo menu de configurações de áudio no painel de administração, você pode configurar o `TTS Model` a ser usado a partir das opções abaixo que o `openedai-speech` suporta. As vozes desses modelos são otimizadas para o idioma inglês.

* `tts-1` ou `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova` e `shimmer` (`tts-1-hd` é configurável; usa amostras do OpenAI por padrão)

**Passo 8: Pressione `Salvar` para aplicar as alterações e começar a desfrutar de vozes com som natural**
--------------------------------------------------------------------------------------------

Pressione o botão `Salvar` para aplicar as alterações nas configurações do Open WebUI. Atualize a página para que a alteração tenha efeito total e aproveite a integração do `openedai-speech` no Open WebUI para ler respostas em texto em voz natural.

**Detalhes do Modelo:**
------------------

`openedai-speech` suporta vários modelos de conversão de texto em fala, cada um com suas próprias forças e requisitos. Os seguintes modelos estão disponíveis:

* **Piper TTS** (muito rápido, funciona em CPU): Use suas próprias [vozes Piper](https://rhasspy.github.io/piper-samples/) através do arquivo de configuração `voice_to_speaker.yaml`. Este modelo é ideal para aplicações que requerem baixa latência e alto desempenho. Piper TTS também suporta vozes [multilíngues](https://github.com/matatonic/openedai-speech#multilingual).
* **Coqui AI/TTS XTTS v2** (rápido, mas requer cerca de 4GB de VRAM GPU e Nvidia GPU com CUDA): Este modelo usa a tecnologia de clonagem de voz XTTS v2 da Coqui AI para gerar vozes de alta qualidade. Embora exija uma GPU mais potente, oferece excelente desempenho e áudio de alta qualidade. Coqui também suporta vozes [multilíngues](https://github.com/matatonic/openedai-speech#multilingual).
* **Suporte Beta Parler-TTS** (experimental, mais lento): Este modelo usa a estrutura Parler-TTS para gerar vozes. Embora esteja atualmente em beta, permite descrever características muito básicas da voz do locutor. A voz exata será ligeiramente diferente a cada geração, mas deve ser semelhante à descrição fornecida do locutor. Para inspiração sobre como descrever vozes, consulte [Descrição de Texto para Fala](https://www.text-description-to-speech.com/).

**Solução de Problemas**
-------------------

Se você encontrar problemas ao integrar `openedai-speech` com Open WebUI, siga estas etapas de solução de problemas:

* **Verificar o serviço `openedai-speech`**: Certifique-se de que o serviço `openedai-speech` esteja em execução e a porta especificada no arquivo docker-compose.yml esteja exposta.
* **Verifique o acesso ao host.docker.internal**: Certifique-se de que o nome de host `host.docker.internal` pode ser resolvido de dentro do contêiner do Open WebUI. Isso é necessário porque o `openedai-speech` está exposto via `localhost` no seu PC, mas o `open-webui` normalmente não pode acessá-lo de dentro de seu contêiner. Você pode adicionar um volume ao arquivo docker-compose.yml para montar um arquivo do host no contêiner, por exemplo, para um diretório que será servido pelo openedai-speech.
* **Revisar a configuração da chave da API**: Certifique-se de que a chave da API esteja configurada como um valor fictício ou efetivamente desligada, pois o `openedai-speech` não requer uma chave da API.
* **Verificar a configuração de voz**: Confirme se a voz que você está tentando usar para TTS existe no seu arquivo `voice_to_speaker.yaml` e se os arquivos correspondentes (por exemplo, arquivos XML de voz) estão presentes no diretório correto.
* **Verificar os caminhos dos modelos de voz**: Se estiver enfrentando problemas ao carregar modelos de voz, verifique se os caminhos no seu arquivo `voice_to_speaker.yaml` correspondem aos locais reais de seus modelos de voz.

**Dicas Adicionais de Solução de Problemas**
------------------------------------------

* Verifique os logs do `openedai-speech` para erros ou avisos que possam indicar onde está o problema.
* Certifique-se de que o arquivo `docker-compose.yml` está corretamente configurado para o seu ambiente.
* Se ainda estiver enfrentando problemas, tente reiniciar o serviço `openedai-speech` ou todo o ambiente Docker.
* Se o problema persistir, consulte o repositório GitHub do `openedai-speech` ou busque ajuda em um fórum da comunidade relevante.

**FAQ**
-------

**Como posso controlar a variação emocional do áudio gerado?**

Não há um mecanismo direto para controlar a saída emocional do áudio gerado. Certos fatores, como capitalização ou gramática, podem afetar o áudio de saída, mas os testes internos apresentaram resultados variados.

**Onde os arquivos de voz são armazenados? E o arquivo de configuração?**

Os arquivos de configuração, que definem as vozes disponíveis e suas propriedades, são armazenados no volume de configuração. Especificamente, as vozes padrão são definidas em `voice_to_speaker.default.yaml`.

**Recursos Adicionais**
-----------------------

Para mais informações sobre como configurar o Open WebUI para usar o `openedai-speech`, incluindo como definir variáveis de ambiente, veja a [documentação do Open WebUI](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech).

Para mais informações sobre o `openedai-speech`, visite o [repositório do GitHub](https://github.com/matatonic/openedai-speech).

**Como adicionar mais vozes ao openedai-speech:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
Você pode alterar o número da porta no arquivo `docker-compose.yml` para qualquer porta aberta e utilizável, mas certifique-se de atualizar a **Base URL da API** nas configurações de áudio do Open WebUI Admin de acordo.
:::
