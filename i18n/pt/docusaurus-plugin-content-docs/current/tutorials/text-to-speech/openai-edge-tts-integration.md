---
sidebar_position: 1
title: "🗨️ Edge TTS Usando Docker"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Integrando `openai-edge-tts` 🗣️ com Open WebUI

## O que é `openai-edge-tts`?

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) é uma API de texto para fala que imita o endpoint da API do OpenAI, permitindo uma substituição direta em cenários onde você pode definir a URL do endpoint, como no Open WebUI.

Ele utiliza o pacote [edge-tts](https://github.com/rany2/edge-tts), que aproveita o recurso gratuito "Ler em voz alta" do navegador Edge para emular uma solicitação à Microsoft / Azure e, assim, obter texto para fala de alta qualidade gratuitamente.

[Teste as vozes aqui](https://tts.travisvn.com)

<details>
  <summary>Como é diferente de openedai-speech?</summary>

Semelhante ao [openedai-speech](https://github.com/matatonic/openedai-speech), [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) é um endpoint de API de texto para fala que imita o endpoint da API do OpenAI, permitindo uma substituição direta em cenários onde o endpoint de fala do OpenAI pode ser chamado e a URL do endpoint do servidor pode ser configurada.

`openedai-speech` é uma opção mais completa que permite a geração totalmente offline de fala com várias modalidades para escolher.

`openai-edge-tts` é uma opção mais simples que usa um pacote Python chamado `edge-tts` para gerar o áudio.

</details>

## Requisitos

- Docker instalado no seu sistema
- Open WebUI em execução

## ⚡️ Início rápido

A maneira mais simples de começar sem precisar configurar nada é executar o comando abaixo

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

Isso executará o serviço na porta 5050 com todas as configurações padrão

## Configurando o Open WebUI para usar `openai-edge-tts`

- Abra o Painel de Administração e vá para `Configurações` -> `Áudio`
- Configure suas configurações de TTS para corresponder à captura de tela abaixo
- _Nota: você pode especificar a Voz TTS aqui_

![Captura de tela das Configurações de Áudio do Open WebUI adicionando os endpoints corretos para este projeto](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
A chave de API padrão é a string `your_api_key_here`. Você não precisa modificar esse valor se não precisar de segurança adicional.
:::

**E é isso! Você pode parar aqui**

# Por favor ⭐️ avalie o repositório no GitHub se você achar [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) útil


<details>
  <summary>Executando com Python</summary>
  
### 🐍 Executando com Python

Se você preferir executar este projeto diretamente com Python, siga estas etapas para configurar um ambiente virtual, instalar as dependências e iniciar o servidor.

#### 1. Clone o Repositório

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. Configure um Ambiente Virtual

Crie e ative um ambiente virtual para isolar as dependências:

```bash
# Para macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Para Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. Instale as Dependências

Use `pip` para instalar os pacotes necessários listados em `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 4. Configure Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz e defina as seguintes variáveis:

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. Execute o Servidor

Depois de configurado, inicie o servidor com:

```bash
python app/server.py
```

O servidor começará a executar em `http://localhost:5050`.

#### 6. Teste a API

Agora você pode interagir com a API em `http://localhost:5050/v1/audio/speech` e outros endpoints disponíveis. Veja a seção de Uso para exemplos de requisição.

</details>

<details>
  <summary>Detalhes de uso</summary>
  
##### Endpoint: `/v1/audio/speech` (alias com `/audio/speech`)

Gera áudio a partir do texto de entrada. Parâmetros disponíveis:

**Parâmetro Obrigatório:**

- **input** (string): O texto a ser convertido em áudio (até 4096 caracteres).

**Parâmetros Opcionais:**

- **model** (string): Defina como "tts-1" ou "tts-1-hd" (padrão: `"tts-1"`).
- **voice** (string): Uma das vozes compatíveis com OpenAI (alloy, echo, fable, onyx, nova, shimmer) ou qualquer voz válida do `edge-tts` (padrão: `"en-US-AvaNeural"`).
- **response_format** (string): Formato do áudio. Opções: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (padrão: `mp3`).
- **speed** (número): Velocidade de reprodução (0.25 a 4.0). O padrão é `1.0`.

:::tip
Você pode navegar pelas vozes disponíveis e ouvir pré-visualizações de amostras em [tts.travisvn.com](https://tts.travisvn.com)
:::

Exemplo de requisição com `curl` e salvando a saída em um arquivo mp3:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_api_key_aqui" \
  -d {
    "input": "Olá, eu sou o seu assistente de IA! Apenas me diga como posso ajudar a dar vida às suas ideias.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

Ou, para estar em conformidade com os parâmetros do endpoint da API OpenAI:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_api_key_aqui" \
  -d {
    "model": "tts-1",
    "input": "Olá, eu sou o seu assistente de IA! Apenas me diga como posso ajudar a dar vida às suas ideias.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

E um exemplo de um idioma diferente do inglês:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_api_key_aqui" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### Endpoints Adicionais

- **POST/GET /v1/models**: Lista os modelos de TTS disponíveis.
- **POST/GET /v1/voices**: Lista as vozes `edge-tts` para um idioma / localidade específico.
- **POST/GET /v1/voices/all**: Lista todas as vozes `edge-tts`, com informações de suporte ao idioma.

:::info
O `/v1` agora é opcional.

Além disso, há endpoints para **Azure AI Speech** e **ElevenLabs** para suporte futuro potencial, caso endpoints de API personalizados sejam permitidos para essas opções no Open WebUI.

Esses podem ser desabilitados configurando a variável de ambiente `EXPAND_API=False`.
:::

</details>

## 🐳 Configuração Rápida para Docker

Você pode configurar as variáveis de ambiente no comando usado para executar o projeto

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=seu_api_key_aqui \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
O texto markdown agora passa por um filtro para melhor legibilidade e suporte.

Você pode desabilitar isso configurando a variável de ambiente `REMOVE_FILTER=True`.
:::

## Recursos Adicionais

Para mais informações sobre `openai-edge-tts`, você pode visitar o [repositório GitHub](https://github.com/travisvn/openai-edge-tts)

Para suporte direto, você pode visitar o [Discord Voice AI & TTS](https://tts.travisvn.com/discord)

## 🎙️ Exemplos de Vozes

[Ouça exemplos de vozes e veja todas as vozes disponíveis do Edge TTS](https://tts.travisvn.com/)
