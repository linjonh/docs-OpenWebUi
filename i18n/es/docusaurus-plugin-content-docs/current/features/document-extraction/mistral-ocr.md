---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Su propósito es solamente demostrar cómo personalizar Open WebUI para un caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## 👁️ Mistral OCR

Esta documentación proporciona una guía paso a paso para integrar Mistral OCR con Open WebUI. Mistral OCR es una biblioteca de reconocimiento óptico de caracteres diseñada para extraer texto de una variedad de formatos de archivo basados en imágenes, incluidos PDFs escaneados, imágenes y documentos manuscritos, y convertirlo en datos estructurados, como JSON o texto plano. Con soporte avanzado para reconocimiento de texto multilingüe, análisis de diseño y interpretación de escritura a mano, Mistral OCR simplifica el proceso de digitalización y procesamiento de documentos para aplicaciones de IA como búsqueda, resumen y extracción de datos, todo a través de una interfaz robusta y personalizable.

Requisitos previos
-------------------

* Instancia de Open WebUI
* Cuenta de Mistral AI

Pasos de Integración
---------------------

### Paso 1: Regístrate o inicia sesión en la consola de Mistral AI

* Ve a `https://console.mistral.ai`
* Sigue las instrucciones indicadas en el proceso
* Después de una autorización exitosa, deberías ser recibido en la página principal de la consola

### Paso 2: Genera una clave API

* Ve a `API Keys` o a `https://console.mistral.ai/api-keys`
* Crea una nueva clave y asegúrate de copiarla

### Paso 3: Configura Open WebUI para usar Mistral OCR

* Inicia sesión en tu instancia de Open WebUI.
* Navega al menú de configuración del `Panel de Administración`.
* Haz clic en `Configuración`.
* Haz clic en la pestaña `Documentos`.
* Cambia el menú desplegable del motor predeterminado de extracción de contenido a `Mistral OCR`.
* Pega la clave API en el campo.
* Guarda el Panel de Administración.

Verificación de Mistral OCR
=====================================

Para verificar que Mistral OCR está funcionando correctamente en el script, consulta `https://docs.mistral.ai/capabilities/document/`


### Conclusión

Integrar Mistral OCR con Open WebUI es una manera simple y efectiva de mejorar las capacidades de procesamiento de documentos y extracción de contenido. Siguiendo los pasos en esta guía, puedes configurar Mistral OCR como el motor de extracción predeterminado y aprovechar sus avanzadas funciones de reconocimiento de texto. Una vez configurado, Mistral OCR permite un análisis potente y multilingüe de documentos con soporte para varios formatos, mejorando las capacidades de análisis de documentos impulsadas por IA en Open WebUI.
