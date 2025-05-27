---
sidebar_position: 2
title: "🗨️ Usando Docker con Openedai-speech"
---

:::warning
Este tutorial es una contribución comunitaria y no está respaldado por el equipo de Open WebUI. Solo sirve como demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Deseas contribuir? Consulta el tutorial de contribución.
:::

**Integrando `openedai-speech` en Open WebUI usando Docker**
============================================================

**¿Qué es `openedai-speech`?**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) es un servidor de texto a voz compatible con la API de audio/voz de OpenAI.

Sirve el endpoint `/v1/audio/speech` y ofrece una experiencia de texto a voz gratuita y privada con capacidades personalizadas de clonación de voz. Este servicio no está afiliado de ninguna manera a OpenAI y no requiere una clave de API de OpenAI.
:::

**Requisitos**
--------------

* Docker instalado en tu sistema
* Open WebUI ejecutándose en un contenedor Docker
* Conocimientos básicos sobre Docker y Docker Compose

**Opción 1: Usar Docker Compose**
--------------------------------

**Paso 1: Crea una nueva carpeta para el servicio `openedai-speech`**
--------------------------------------------------------------------

Crea una nueva carpeta, por ejemplo, `openedai-speech-service`, para almacenar los archivos `docker-compose.yml` y `speech.env`.

**Paso 2: Clona el repositorio de `openedai-speech` desde GitHub**
-----------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

Esto descargará el repositorio `openedai-speech` en tu máquina local, que incluye los archivos de Docker Compose (`docker-compose.yml`, `docker-compose.min.yml` y `docker-compose.rocm.yml`) y otros archivos necesarios.

**Paso 3: Renombra el archivo `sample.env` a `speech.env` (personaliza si es necesario)**
------------------------------------------------------------------------------------------

En la carpeta del repositorio `openedai-speech`, crea un nuevo archivo llamado `speech.env` con el siguiente contenido:

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**Paso 4: Elige un archivo de Docker Compose**
---------------------------------------------

Puedes usar cualquiera de los siguientes archivos de Docker Compose:

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): Este archivo utiliza la imagen `ghcr.io/matatonic/openedai-speech` y se construye desde el [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile).
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): Este archivo utiliza la imagen `ghcr.io/matatonic/openedai-speech-min` y se construye desde [Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min).
  Esta imagen es una versión mínima que solo incluye soporte para Piper y no requiere una GPU.
* [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): Este archivo utiliza la imagen `ghcr.io/matatonic/openedai-speech-rocm` y se construye desde [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile) con soporte ROCm.

**Paso 4: Construye la imagen de Docker elegida**
------------------------------------------------

Antes de ejecutar el archivo de Docker Compose, necesitas construir la imagen de Docker:

* **GPU Nvidia (soporte CUDA)**:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **GPU AMD (soporte ROCm)**:

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **Solo CPU, Sin GPU (solo Piper)**:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**Paso 5: Ejecuta el comando correcto `docker compose up -d`**
-------------------------------------------------------------

* **GPU Nvidia (soporte CUDA)**: Ejecuta el siguiente comando para iniciar el servicio `openedai-speech` en modo desacoplado:

```bash
docker compose up -d
```

* **GPU AMD (soporte ROCm)**: Ejecuta el siguiente comando para iniciar el servicio `openedai-speech` en modo desacoplado:

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64 (Serie M de Apple, Raspberry Pi)**: XTTS solo tiene soporte para CPU aquí y será muy lento. Puedes usar la imagen Nvidia para XTTS con CPU (lenta) o usar la imagen solo Piper (recomendada):

```bash
docker compose -f docker-compose.min.yml up -d
```

* **Solo CPU, Sin GPU (solo Piper)**: Para una imagen mínima de Docker con solo soporte para Piper (< 1GB vs. 8GB):

```bash
docker compose -f docker-compose.min.yml up -d
```

Esto iniciará el servicio `openedai-speech` en modo desacoplado.

**Opción 2: Usar comandos Docker Run**
-----------------------------------

También puedes usar los siguientes comandos de ejecución de Docker para iniciar el servicio `openedai-speech` en modo separado:

* **Nvidia GPU (CUDA)**: Ejecuta el siguiente comando para construir e iniciar el servicio `openedai-speech`:

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**: Ejecuta el siguiente comando para construir e iniciar el servicio `openedai-speech`:

> Para habilitar el soporte de ROCm, descomenta la línea `#USE_ROCM=1` en el archivo `speech.env`.

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **Solo CPU, sin GPU (Solo Piper)**: Ejecuta el siguiente comando para construir e iniciar el servicio `openedai-speech`:

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**Paso 6: Configurar Open WebUI para usar `openedai-speech` para TTS**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

Abre la configuración de Open WebUI y navega a la configuración de TTS bajo **Panel de Administración > Configuración > Audio**. Agrega la siguiente configuración:

* **API Base URL**: `http://host.docker.internal:8000/v1`
* **API Key**: `sk-111111111` (Ten en cuenta que esta es una clave API de prueba, ya que `openedai-speech` no requiere una clave API. Puedes usar cualquier valor para este campo, siempre y cuando sea llenado.)

**Paso 7: Elegir una voz**
--------------------------

En `TTS Voice` dentro del mismo menú de configuración de audio en el panel de administración, puedes configurar el `TTS Model` para usar a partir de las siguientes opciones que soporta `openedai-speech`. Las voces de estos modelos están optimizadas para el idioma inglés.

* `tts-1` o `tts-1-hd`: `alloy`, `echo`, `echo-alt`, `fable`, `onyx`, `nova`, y `shimmer` (`tts-1-hd` es configurable; usa muestras de OpenAI por defecto)

**Paso 8: Presiona `Save` para aplicar los cambios y empezar a disfrutar voces naturales**
--------------------------------------------------------------------------------------------

Presiona el botón `Save` para aplicar los cambios a la configuración de Open WebUI. Actualiza la página para que el cambio surta efecto por completo y disfruta de la integración de `openedai-speech` dentro de Open WebUI para leer en voz alta respuestas de texto con texto a voz en una voz de sonido natural.

**Detalles del modelo:**
------------------

`openedai-speech` soporta múltiples modelos de texto a voz, cada uno con sus propias fortalezas y requisitos. Los siguientes modelos están disponibles:

* **Piper TTS** (muy rápido, corre en CPU): Usa tus propias [voces Piper](https://rhasspy.github.io/piper-samples/) vía el archivo de configuración `voice_to_speaker.yaml`. Este modelo es excelente para aplicaciones que requieren baja latencia y alto rendimiento. Piper TTS también soporta voces [multilingües](https://github.com/matatonic/openedai-speech#multilingual).
* **Coqui AI/TTS XTTS v2** (rápido, pero requiere aproximadamente 4GB de VRAM GPU y GPU Nvidia con CUDA): Este modelo utiliza la tecnología de clonación de voz XTTS v2 de Coqui AI para generar voces de alta calidad. Aunque requiere una GPU más potente, proporciona excelente rendimiento y audio de alta calidad. Coqui también soporta voces [multilingües](https://github.com/matatonic/openedai-speech#multilingual).
* **Soporte Beta Parler-TTS** (experimental, más lento): Este modelo utiliza el marco Parler-TTS para generar voces. Aunque está actualmente en beta, permite describir características muy básicas de la voz del hablante. La voz exacta será ligeramente diferente en cada generación, pero debería ser similar a la descripción del hablante proporcionada. Para inspiración sobre cómo describir voces, consulta [Text Description to Speech](https://www.text-description-to-speech.com/).

**Solución de problemas**
-------------------

Si encuentras algún problema al integrar `openedai-speech` con Open WebUI, sigue estos pasos de solución de problemas:

* **Verifica el servicio `openedai-speech`**: Asegúrate de que el servicio `openedai-speech` esté en ejecución y que el puerto que especificaste en el archivo docker-compose.yml esté expuesto.
* **Comprueba el acceso a host.docker.internal**: Verifica que el nombre de host `host.docker.internal` sea resolvible desde dentro del contenedor de Open WebUI. Esto es necesario porque `openedai-speech` está expuesto a través de `localhost` en tu PC, pero `open-webui` normalmente no puede acceder a él desde dentro de su contenedor. Puedes agregar un volumen al archivo docker-compose.yml para montar un archivo del host al contenedor, por ejemplo, a un directorio que será servido por openedai-speech.
* **Revisar la configuración de la clave API**: Asegúrate de que la clave API esté configurada con un valor de prueba o efectivamente sin marcar porque `openedai-speech` no requiere una clave API.
* **Verificar configuración de voz**: Comprueba que la voz que estás intentando usar para TTS exista en tu archivo `voice_to_speaker.yaml` y que los archivos correspondientes (por ejemplo, archivos XML de voz) estén presentes en el directorio correcto.
* **Verificar rutas del modelo de voz**: Si experimentas problemas al cargar el modelo de voz, verifica que las rutas en tu archivo `voice_to_speaker.yaml` coincidan con las ubicaciones reales de tus modelos de voz.

**Consejos Adicionales para Solucionar Problemas**
------------------------------------

* Revisa los registros de openedai-speech en busca de errores o advertencias que puedan indicar dónde está el problema.
* Verifica que el archivo `docker-compose.yml` esté correctamente configurado para tu entorno.
* Si aún tienes problemas, intenta reiniciar el servicio `openedai-speech` o todo el entorno Docker.
* Si el problema persiste, consulta el repositorio de GitHub de `openedai-speech` o busca ayuda en un foro comunitario relevante.

**FAQ**
-------

**¿Cómo puedo controlar el rango emocional del audio generado?**

No existe un mecanismo directo para controlar la salida emocional del audio generado. Factores como la capitalización o la gramática pueden afectar el audio de salida, pero las pruebas internas han producido resultados mixtos.

**¿Dónde se almacenan los archivos de voz? ¿Qué hay del archivo de configuración?**.

Los archivos de configuración, que definen las voces disponibles y sus propiedades, están almacenados en el volumen de configuración. Específicamente, las voces predeterminadas están definidas en voice_to_speaker.default.yaml.

**Recursos Adicionales**
------------------------

Para más información sobre cómo configurar Open WebUI para usar `openedai-speech`, incluyendo la configuración de las variables de entorno, consulta la [documentación de Open WebUI](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech).

Para más información sobre `openedai-speech`, visita el [repositorio de GitHub](https://github.com/matatonic/openedai-speech).

**Cómo añadir más voces a openedai-speech:**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
Puedes cambiar el número de puerto en el archivo `docker-compose.yml` por cualquier puerto abierto y utilizable, pero asegúrate de actualizar la **URL Base API** en la configuración de Audio del Administrador de Open WebUI en consecuencia.
:::
