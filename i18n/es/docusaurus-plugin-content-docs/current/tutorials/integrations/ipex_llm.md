---
sidebar_position: 11
title: "🖥️ Configuración local de LLM con IPEX-LLM en GPU de Intel"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Solo sirve como demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

:::note
Esta guía ha sido verificada con la configuración de Open WebUI mediante [Instalación Manual](/getting-started/index.md).
:::

# Configuración local de LLM con IPEX-LLM en GPU de Intel

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm) es una biblioteca de PyTorch para ejecutar LLM en CPU y GPU de Intel (por ejemplo, PC local con iGPU, GPU discreta como Arc A-Series, Flex y Max) con una latencia muy baja.
:::

Este tutorial demuestra cómo configurar Open WebUI con **backend Ollama acelerado por IPEX-LLM alojado en GPU de Intel**. Siguiendo esta guía, podrá configurar Open WebUI incluso en una PC de bajo costo (es decir, solo con GPU integrada) con una experiencia fluida.

## Inicie Ollama Serve en GPU de Intel

Consulte [esta guía](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html) de la documentación oficial de IPEX-LLM sobre cómo instalar y ejecutar Ollama serve acelerado por IPEX-LLM en GPU de Intel.

:::tip
Si desea acceder al servicio Ollama desde otra máquina, asegúrese de configurar o exportar la variable de entorno `OLLAMA_HOST=0.0.0.0` antes de ejecutar el comando `ollama serve`.
:::

## Configure Open WebUI

Acceda a la configuración de Ollama a través de **Settings -> Connections** en el menú. Por defecto, la **URL Base de Ollama** está configurada como `https://localhost:11434`, como se ilustra en la imagen a continuación. Para verificar el estado de la conexión al servicio Ollama, haga clic en el **botón de refrescar** ubicado junto al cuadro de texto. Si el WebUI no puede establecer una conexión con el servidor Ollama, verá un mensaje de error que indica, `WebUI no pudo conectarse a Ollama`.

![Error de configuración de Open WebUI Ollama](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

Si la conexión es exitosa, verá un mensaje indicando `Conexión al servicio verificada`, como se ilustra a continuación.

![Éxito en la configuración de Open WebUI Ollama](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
Si desea utilizar un servidor Ollama alojado en una URL diferente, simplemente actualice la **URL Base de Ollama** a la nueva URL y presione el **botón de refrescar** para volver a confirmar la conexión con Ollama.
:::
