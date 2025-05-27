---
sidebar_position: 4000
title: "🐤 Extracción de Documentos con Docling"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve únicamente como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## 🐤 Extracción de Documentos con Docling

Esta documentación proporciona una guía paso a paso para integrar Docling con Open WebUI. Docling es una biblioteca de procesamiento de documentos diseñada para transformar una amplia gama de formatos de archivo (incluidos PDFs, documentos Word, hojas de cálculo, HTML e imágenes) en datos estructurados como JSON o Markdown. Con soporte integrado para detección de diseño, análisis de tablas y procesamiento con reconocimiento de idioma, Docling simplifica la preparación de documentos para aplicaciones de IA como búsqueda, resumen y generación aumentada por recuperación, todo a través de una interfaz unificada y extensible.

Prerrequisitos
------------

* Instancia de Open WebUI
* Docker instalado en tu sistema
* Red de Docker configurada para Open WebUI

Pasos para la Integración
----------------

### Paso 1: Ejecutar el Comando Docker para Docling-Serve

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*Con soporte para GPU:
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### Paso 2: Configurar Open WebUI para usar Docling

* Inicia sesión en tu instancia de Open WebUI.
* Navega al menú de configuración del `Panel Admin`.
* Haz clic en `Configuración`.
* Haz clic en la pestaña `Documentos`.
* Cambia el motor de extracción de contenido `Predeterminado` al motor `Docling`.
* Actualiza la URL del motor de extracción de contexto a `http://host.docker.internal:5001`.
* Guarda los cambios.

Verificación de Docling en Docker
=====================================

Para verificar que Docling está funcionando correctamente en un entorno Docker, puedes seguir los siguientes pasos:

### 1. Inicia el Contenedor Docker de Docling

Primero, asegúrate de que el contenedor Docker de Docling esté en ejecución. Puedes iniciarlo utilizando el siguiente comando:

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

Este comando inicia el contenedor de Docling y asigna el puerto 5001 del contenedor al puerto 5001 de tu máquina local.

### 2. Verifica que el Servidor está en Ejecución

* Ve a `http://127.0.0.1:5001/ui/`
* La URL debería dirigir a una interfaz de usuario para usar Docling

### 3. Verifica la Integración 

* Puedes intentar cargar algunos archivos a través de la interfaz de usuario, y debería devolver la salida en formato MD o en tu formato deseado.

### Conclusión

Integrar Docling con Open WebUI es una forma sencilla y efectiva de mejorar las capacidades de procesamiento de documentos y extracción de contenido. Siguiendo los pasos de esta guía, puedes configurar Docling como el motor de extracción predeterminado y verificar que está funcionando sin problemas en un entorno Docker. Una vez configurado, Docling habilita un análisis de documentos poderoso y agnóstico al formato para soportar características de IA más avanzadas en Open WebUI.
