---
sidebar_position: 2
title: "🗨️ Kokoro Web - TTS Fácil de Usar para Open WebUI"
---

:::warning
Este tutorial é uma contribuição da comunidade e não conta com suporte da equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## O que é `Kokoro Web`?

[Kokoro Web](https://github.com/eduardolat/kokoro-web) fornece uma API compatível com OpenAI para o poderoso modelo de conversão de texto em fala [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), integrando-se perfeitamente ao Open WebUI para melhorar suas conversas de IA com vozes de som natural.

## 🚀 Integração em Dois Passos

### 1. Configurar a API Kokoro Web (Um Comando)

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # Altere isso para qualquer chave secreta que você usará como sua chave de API compatível com OpenAI
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

Execute com: `docker compose up -d`

### 2. Conectar à OpenWebUI (30 Segundos)

1. No OpenWebUI, vá em `Painel de Administração` → `Configurações` → `Áudio`
2. Configure:
   - Motor de Conversão de Texto em Fala: `OpenAI`
   - URL Base da API: `http://localhost:3000/api/v1`
     (Se estiver usando Docker: `http://host.docker.internal:3000/api/v1`)
   - Chave de API: `your-api-key` (do passo 1)
   - Modelo de TTS: `model_q8f16` (melhor equilíbrio entre tamanho/qualidade)
   - Voz de TTS: `af_heart` (voz padrão, cálida e natural em inglês). Você pode alterar para qualquer outra voz ou fórmula do [Demo Kokoro Web](https://voice-generator.pages.dev)

**Isso é tudo! Seu OpenWebUI agora tem capacidades de voz de IA.**

## 🌍 Idiomas Suportados

Kokoro Web suporta 8 idiomas com vozes específicas otimizadas para cada um:

- Inglês (EUA) - en-us
- Inglês (Reino Unido) - en-gb
- Japonês - ja
- Chinês - cmn
- Espanhol - es-419
- Hindi - hi
- Italiano - it
- Português (Brasil) - pt-br

Cada idioma possui vozes dedicadas para pronúncia e fluxo natural ideais. Veja o [repositório GitHub](https://github.com/eduardolat/kokoro-web) para a lista completa de vozes específicas do idioma ou utilize o [Demo Kokoro Web](https://voice-generator.pages.dev) para visualizar e criar suas próprias vozes personalizadas instantaneamente.

## 💾 Modelos Otimizados para Qualquer Hardware

Escolha o modelo que melhor se adapta às suas necessidades de hardware:

| ID do Modelo | Otimização | Tamanho | Ideal Para |
|--------------|------------|---------|------------|
| model_q8f16 | Precisão mista | 86 MB | **Recomendado** - Melhor equilíbrio |
| model_quantized | 8 bits | 92.4 MB | Bom desempenho em CPU |
| model_uint8f16 | Precisão mista | 114 MB | Melhor qualidade em CPUs intermediárias |
| model_q4f16 | Pesos de 4 bits e fp16 | 154 MB | Qualidade mais alta, ainda eficiente |
| model_fp16 | fp16 | 163 MB | Qualidade premium |
| model_uint8 | 8 bits e misto | 177 MB | Opção equilibrada |
| model_q4 | Matmul de 4 bits | 305 MB | Opção de alta qualidade |
| model | fp32 | 326 MB | Qualidade máxima (mais lento) |

## ✨ Experimente Antes de Instalar

Visite o [**Demo Kokoro Web**](https://voice-generator.pages.dev) para visualizar todas as vozes instantaneamente. Este demo:

- **Funciona 100% no seu navegador** - Não é necessário servidor
- **Gratuito para sempre** - Sem limites de uso ou necessidade de registro
- **Sem instalação** - Apenas acesse o site e comece a criar
- **Todos os recursos incluídos** - Teste qualquer voz ou idioma imediatamente

## Precisa de Mais Ajuda?

Para opções adicionais, guias de personalização de voz e configurações avançadas, visite o [repositório GitHub](https://github.com/eduardolat/kokoro-web).

**Desfrute de vozes naturais de IA em suas conversas no OpenWebUI!**
