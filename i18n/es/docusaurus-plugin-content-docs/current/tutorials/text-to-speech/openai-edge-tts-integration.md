---
sidebar_position: 1
title: "🗨️ Edge TTS Usando Docker"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve solo como una demostración para personalizar Open WebUI según tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial para colaboradores.
:::

# Integrando `openai-edge-tts` 🗣️ con Open WebUI

## ¿Qué es `openai-edge-tts`? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) es una API de texto a voz que imita el endpoint de la API de OpenAI, permitiendo un reemplazo directo en escenarios donde puedes definir la URL del endpoint, como con Open WebUI.

Utiliza el paquete [edge-tts](https://github.com/rany2/edge-tts), que aprovecha la función gratuita "Leer en voz alta" del navegador Edge para emular una solicitud a Microsoft / Azure y recibir texto a voz de alta calidad de forma gratuita.

[Prueba las voces aquí](https://tts.travisvn.com)

<details>
  <summary>¿En qué se diferencia de 'openedai-speech'?</summary>

Al igual que [openedai-speech](https://github.com/matatonic/openedai-speech), [openai-edge-tts](https://github.com/travisvn/openai-edge-tts) es un endpoint de API de texto a voz que imita el endpoint de la API de OpenAI, permitiendo un reemplazo directo en escenarios donde se puede llamar al endpoint de OpenAI Speech y se puede configurar la URL del servidor.

`openedai-speech` es una opción más integral que permite la generación completamente offline de voz con múltiples modalidades para elegir.

`openai-edge-tts` es una opción más simple que utiliza un paquete de Python llamado `edge-tts` para generar el audio.

</details>

## Requisitos

- Docker instalado en tu sistema
- Open WebUI en funcionamiento

## ⚡️ Inicio rápido

La forma más sencilla de empezar sin tener que configurar nada es ejecutar el siguiente comando:

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

Esto ejecutará el servicio en el puerto 5050 con todas las configuraciones predeterminadas.

## Configurando Open WebUI para usar `openai-edge-tts`

- Abre el Panel de Administración y ve a `Configuración` -> `Audio`
- Configura tus ajustes de TTS para que coincidan con la captura de pantalla a continuación
- _Nota: aquí puedes especificar la voz de TTS_

![Captura de pantalla de los ajustes de administración de Open WebUI para Audio, añadiendo los endpoints correctos para este proyecto](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
La clave API predeterminada es la cadena `your_api_key_here`. No necesitas cambiar ese valor si no necesitas seguridad adicional.
:::

**¡Y eso es todo! Puedes terminar aquí**

# Por favor, ⭐️ puntúa el repositorio en GitHub si encuentras útil [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts)


<details>
  <summary>Ejecutar con Python</summary>
  
### 🐍 Ejecutar con Python

Si prefieres ejecutar este proyecto directamente con Python, sigue estos pasos para configurar un entorno virtual, instalar dependencias y arrancar el servidor.

#### 1. Clonar el repositorio

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. Configurar un entorno virtual

Crea y activa un entorno virtual para aislar las dependencias:

```bash
# Para macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Para Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. Instalar dependencias

Usa `pip` para instalar los paquetes requeridos listados en `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 4. Configurar variables de entorno

Crea un archivo `.env` en el directorio raíz y establece las siguientes variables:

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

#### 5. Ejecutar el servidor

Ya configurado, inicia el servidor con:

```bash
python app/server.py
```

El servidor se iniciará en `http://localhost:5050`.

#### 6. Probar la API

Ahora puedes interactuar con la API en `http://localhost:5050/v1/audio/speech` y otros endpoints disponibles. Consulta la sección Uso para ejemplos de solicitudes.

</details>

<details>
  <summary>Detalles de uso</summary>
  
##### Endpoint: `/v1/audio/speech` (alias `/audio/speech`)

Genera audio a partir del texto de entrada. Parámetros disponibles:

**Parámetro requerido:**

- **input** (cadena): El texto a convertir en audio (hasta 4096 caracteres).

**Parámetros opcionales:**

- **model** (cadena): Configura como "tts-1" o "tts-1-hd" (predeterminado: `"tts-1"`).
- **voice** (cadena): Una de las voces compatibles con OpenAI (alloy, echo, fable, onyx, nova, shimmer) o cualquier voz válida de `edge-tts` (predeterminado: `"en-US-AvaNeural"`).
- **response_format** (cadena): Formato de audio. Opciones: `mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (predeterminado: `mp3`).
- **speed** (número): Velocidad de reproducción (0.25 a 4.0). El valor predeterminado es `1.0`.

:::tip
Puedes explorar las voces disponibles y escuchar vistas previas en [tts.travisvn.com](https://tts.travisvn.com)
:::

Ejemplo de solicitud con `curl` guardando la salida en un archivo mp3:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "¡Hola! Soy tu asistente de IA. Dime cómo puedo ayudar a dar vida a tus ideas.",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

O, para alinearse con los parámetros del endpoint de la API de OpenAI:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "¡Hola! Soy tu asistente de IA. Dime cómo puedo ayudar a dar vida a tus ideas.",
    "voice": "alloy"
  } \
  --output speech.mp3
```

Y un ejemplo de un idioma diferente al inglés:

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### Endpoints adicionales

- **POST/GET /v1/models**: Lista los modelos de TTS disponibles.
- **POST/GET /v1/voices**: Lista las voces de `edge-tts` para un idioma / localización dado.
- **POST/GET /v1/voices/all**: Lista todas las voces de `edge-tts`, con información sobre soporte de idiomas.

:::info
El `/v1` ahora es opcional.

Además, hay endpoints para **Azure AI Speech** y **ElevenLabs** para soporte futuro potencial si los endpoints personalizados de API se permiten para estas opciones en Open WebUI.

Estos pueden deshabilitarse configurando la variable de entorno `EXPAND_API=False`.
:::

</details>

## 🐳 Configuración rápida para Docker

Puedes configurar las variables de entorno en el comando utilizado para ejecutar el proyecto

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
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
El texto de markdown ahora se pasa a través de un filtro para una mejor legibilidad y soporte.

Puedes desactivar esto configurando la variable de entorno `REMOVE_FILTER=True`.
:::

## Recursos adicionales

Para obtener más información sobre `openai-edge-tts`, puedes visitar el [repositorio de GitHub](https://github.com/travisvn/openai-edge-tts)

Para soporte directo, puedes visitar el [Discord de Voice AI & TTS](https://tts.travisvn.com/discord)

## 🎙️ Muestras de voz

[Escucha muestras de voz y consulta todas las voces disponibles de Edge TTS](https://tts.travisvn.com/)
