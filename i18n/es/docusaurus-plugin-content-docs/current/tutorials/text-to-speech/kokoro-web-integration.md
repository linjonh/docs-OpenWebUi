---
sidebar_position: 2
title: "🗨️ Kokoro Web - TTS sin esfuerzo para Open WebUI"
---

:::warning
Este tutorial es una contribución de la comunidad y no está soportado por el equipo de Open WebUI. Sólo sirve como una demostración sobre cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial para contribuir.
:::

## ¿Qué es `Kokoro Web`?

[Kokoro Web](https://github.com/eduardolat/kokoro-web) proporciona una API ligera compatible con OpenAI para el potente modelo de texto a voz [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), integrándose perfectamente con Open WebUI para mejorar tus conversaciones de IA con voces naturales.

## 🚀 Integración en dos pasos

### 1. Implementar la API de Kokoro Web (un comando)

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # Cambia esto a cualquier clave secreta para usar como tu clave API compatible con OpenAI
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

Ejecuta con: `docker compose up -d`

### 2. Conectar OpenWebUI (30 segundos)

1. En OpenWebUI, ve a `Panel de Administración` → `Configuración` → `Audio`
2. Configura:
   - Motor de Texto a Voz: `OpenAI`
   - URL base de la API: `http://localhost:3000/api/v1`
     (Si usas Docker: `http://host.docker.internal:3000/api/v1`)
   - Clave API: `your-api-key` (del paso 1)
   - Modelo TTS: `model_q8f16` (mejor equilibrio entre tamaño/calidad)
   - Voz TTS: `af_heart` (voz predeterminada cálida y natural en inglés). Puedes cambiar esto a cualquier otra voz o fórmula del [Demo de Kokoro Web](https://voice-generator.pages.dev)

**¡Eso es todo! Ahora tu OpenWebUI tiene capacidades de voz IA.**

## 🌍 Idiomas compatibles

Kokoro Web admite 8 idiomas con voces específicas optimizadas para cada uno:

- Inglés (US) - en-us
- Inglés (UK) - en-gb
- Japonés - ja
- Chino - cmn
- Español - es-419
- Hindi - hi
- Italiano - it
- Portugués (Brasil) - pt-br

Cada idioma tiene voces dedicadas para una pronunciación óptima y un flujo natural. Consulta el [repositorio de GitHub](https://github.com/eduardolat/kokoro-web) para la lista completa de voces específicas por idioma o usa el [Demo de Kokoro Web](https://voice-generator.pages.dev) para previsualizar y crear tus propias voces personalizadas de inmediato.

## 💾 Modelos optimizados para cualquier hardware

Elige el modelo que se ajuste a las necesidades de tu hardware:

| ID del modelo | Optimización | Tamaño | Ideal para |
|---------------|-------------|--------|-----------|
| model_q8f16 | Precisión mixta | 86 MB | **Recomendado** - Mejor equilibrio |
| model_quantized | 8 bits | 92.4 MB | Buen rendimiento en CPU |
| model_uint8f16 | Precisión mixta | 114 MB | Mejor calidad en CPUs de gama media |
| model_q4f16 | Pesos de 4 bits y fp16 | 154 MB | Mayor calidad, aún eficiente |
| model_fp16 | fp16 | 163 MB | Calidad premium |
| model_uint8 | 8 bits y mixto | 177 MB | Opción equilibrada |
| model_q4 | Matrices de 4 bits | 305 MB | Opción de alta calidad |
| model | fp32 | 326 MB | Máxima calidad (más lento) |

## ✨ Prueba antes de instalar

Visita el [**Demo de Kokoro Web**](https://voice-generator.pages.dev) para previsualizar todas las voces al instante. Este demo:

- **Funciona 100% en tu navegador** - No se requiere servidor
- **Gratis para siempre** - Sin límites de uso ni registro necesario
- **Cero instalación** - Simplemente visita el sitio web y comienza a crear
- **Incluye todas las funcionalidades** - Prueba cualquier voz o idioma de inmediato

## ¿Necesitas más ayuda?

Para opciones adicionales, guías de personalización de voces y configuraciones avanzadas, visita el [repositorio de GitHub](https://github.com/eduardolat/kokoro-web).

**¡Disfruta de voces IA naturales en tus conversaciones de OpenWebUI!**
