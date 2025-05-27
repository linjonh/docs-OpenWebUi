---
sidebar_position: 11
title: "🖥️ Configuração Local de LLM com IPEX-LLM na GPU Intel"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Deseja contribuir? Confira o tutorial de contribuição.
:::

:::note
Este guia foi verificado com a configuração do Open WebUI feita por meio da [Instalação Manual](/getting-started/index.md).
:::

# Configuração Local de LLM com IPEX-LLM na GPU Intel

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm) é uma biblioteca PyTorch para executar LLM em CPUs e GPUs Intel (por exemplo, PC local com iGPU, GPU discreta como Arc A-Series, Flex e Max) com latência muito baixa.
:::

Este tutorial demonstra como configurar o Open WebUI com o **backend Ollama acelerado por IPEX-LLM hospedado na GPU Intel**. Ao seguir este guia, você poderá configurar o Open WebUI mesmo em um PC de baixo custo (ou seja, apenas com GPU integrada) com uma experiência suave.

## Iniciar o Ollama Serve na GPU Intel

Consulte [este guia](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html) na documentação oficial do IPEX-LLM sobre como instalar e executar o Ollama serve acelerado pelo IPEX-LLM na GPU Intel.

:::tip
Se você desejar acessar o serviço Ollama a partir de outra máquina, certifique-se de definir ou exportar a variável de ambiente `OLLAMA_HOST=0.0.0.0` antes de executar o comando `ollama serve`.
:::

## Configurar o Open WebUI

Acesse as configurações Ollama através de **Configurações -> Conexões** no menu. Por padrão, a **URL Base do Ollama** é pré-configurada como `https://localhost:11434`, conforme ilustrado na imagem abaixo. Para verificar o status da conexão com o serviço Ollama, clique no **botão Atualizar** localizado ao lado da caixa de texto. Se o WebUI não for capaz de estabelecer conexão com o servidor Ollama, você verá uma mensagem de erro informando, `WebUI não conseguiu conectar-se ao Ollama`.

![Falha na Configuração do Ollama no Open WebUI](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

Se a conexão for bem-sucedida, você verá uma mensagem informando `Conexão com o Serviço Verificada`, conforme ilustrado abaixo.

![Sucesso na Configuração do Ollama no Open WebUI](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
Se você quiser usar um servidor Ollama hospedado em uma URL diferente, basta atualizar a **URL Base do Ollama** para o novo endereço e pressionar o **botão Atualizar** para re-confirmar a conexão com o Ollama.
:::
