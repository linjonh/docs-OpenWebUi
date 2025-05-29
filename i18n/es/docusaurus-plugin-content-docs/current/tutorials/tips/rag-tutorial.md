---
sidebar_position: 3
title: "🔎 Tutorial de Open WebUI RAG"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Sirve únicamente como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribuciones.
:::

# Tutorial: Configuración de RAG con la Documentación de Open WebUI

En este tutorial, aprenderás a usar **Generación Incrementada por Recuperación (RAG)** con Open WebUI para cargar documentación del mundo real como base de conocimiento. Te guiaremos sobre cómo usar la última **Documentación de Open WebUI** como ejemplo para esta configuración.

---

## Descripción General

### ¿Qué es RAG?

La Generación Incrementada por Recuperación (RAG) combina **Modelos de Lenguaje Grande (LLMs)** con **conocimiento recuperado** de fuentes externas. El sistema recupera datos relevantes de documentos cargados o bases de conocimiento, mejorando la calidad y precisión de las respuestas.

Este tutorial demuestra cómo:

- Cargar la última Documentación de Open WebUI como base de conocimiento.
- Conectarla a un modelo personalizado.
- Consultar la base de conocimiento para asistencia mejorada.

---

## Configuración

### Configuración Paso a Paso: Documentación de Open WebUI como Base de Conocimiento

Sigue estos pasos para configurar RAG con la **Documentación de Open WebUI**:

1. **Descargar la Documentación**:
   - Descarga la última documentación:
     [https://github.com/open-webui/docs/archive/refs/heads/main.zip](https://github.com/open-webui/docs/archive/refs/heads/main.zip)

2. **Extraer los Archivos**:
   - Extrae el archivo `main.zip` para obtener todos los archivos de documentación.

3. **Localizar los Archivos Markdown**:
   - En la carpeta extraída, localiza todos los archivos con extensiones `.md` y `.mdx` (consejo: busca `*.md*`).

4. **Crear una Base de Conocimiento**:
   - Ve a **Espacio de Trabajo** > **Conocimiento** > **+ Crear una Base de Conocimiento**.
   - Nómbrala: `Documentación de Open WebUI`
   - Propósito: **Asistencia**

   > Haz clic en **Crear Conocimiento**.

5. **Cargar los Archivos**:
   - Arrastra y suelta los archivos `.md` y `.mdx` desde la carpeta extraída a la base de conocimiento **Documentación de Open WebUI**.

---

## Crear y Configurar el Modelo

### Crear un Modelo Personalizado con la Base de Conocimiento

1. **Navegar a Modelos**:
   - Ve a **Espacio de Trabajo** > **Modelos** > **+ Agregar Nuevo Modelo**.

2. **Configurar el Modelo**:
   - **Nombre**: `Open WebUI`
   - **Modelo Base**: *(Selecciona el modelo Llama u otro disponible correspondiente)*
   - **Fuente de Conocimiento**: Selecciona **Documentación de Open WebUI** en el menú desplegable.

3. **Guardar el Modelo**.

---

## Ejemplos y Uso

### Consultar el Modelo de Documentación de Open WebUI

1. **Iniciar un Nuevo Chat**:
   - Navega a **Nuevo Chat** y selecciona el modelo `Open WebUI`.

2. **Ejemplos de Consultas**:

   ```
   Usuario: "¿Cómo configuro las variables de entorno?"
   Sistema: "Consulta la Sección 3.2: Usa el archivo `.env` para gestionar configuraciones."
   ```

   ```
   Usuario: "¿Cómo actualizo Open WebUI usando Docker?"
   Sistema: "Consulta `docker/updating.md`: Usa `docker pull` y reinicia el contenedor."
   ```

   Con el modelo habilitado para RAG, el sistema recupera las secciones más relevantes de la documentación para responder tu consulta.

---

## Próximos Pasos

### Próximos Pasos

- **Agregar Más Conocimiento**: Continúa ampliando tu base de conocimiento añadiendo más documentos.

---

Con esta configuración, puedes usar efectivamente la **Documentación de Open WebUI** para ayudar a los usuarios recuperando información relevante para sus consultas. ¡Disfruta construyendo y consultando tus modelos personalizados mejorados con conocimiento!
