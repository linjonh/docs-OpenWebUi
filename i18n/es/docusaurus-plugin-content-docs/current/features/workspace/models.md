---
sidebar_position: 0
title: "🤖 Modelos"
---

La sección `Modelos` dentro del `Espacio de Trabajo` de Open WebUI es una herramienta poderosa que te permite crear y gestionar modelos personalizados adaptados a propósitos específicos. Esta sección actúa como un centro central para todos tus archivos de modelo, proporcionando una variedad de funciones para editar, clonar, compartir, exportar y ocultar tus modelos.

### Gestión de archivos de modelo

Desde la sección `Modelos`, puedes realizar las siguientes acciones en tus archivos de modelo:

* **Editar**: Profundiza en los detalles de tu archivo de modelo y realiza cambios en su carácter y más.
* **Clonar**: Crea una copia de un archivo de modelo, la cual se adjuntará con `-clone` al `ID del Modelo` clonado. Ten en cuenta que no puedes clonar un modelo base; primero debes crear un modelo antes de clonarlo.
* **Compartir**: Comparte tu archivo de modelo con la comunidad de Open WebUI haciendo clic en el botón `Compartir`, el cual te redirigirá a [https://openwebui.com/models/create](https://openwebui.com/models/create).
* **Exportar**: Descarga la exportación `.json` del archivo de modelo en tu PC.
* **Ocultar**: Oculta el archivo de modelo del menú desplegable de selección de modelos dentro de los chats.

### Edición de archivos de modelo

Al editar un archivo de modelo, puedes personalizar los siguientes ajustes:

* **Foto del Avatar**: Subir una foto de avatar para representar tu archivo de modelo.
* **Nombre del Modelo**: Cambiar el nombre de tu archivo de modelo.
* **Prompt de Sistema**: Proporcionar un prompt de sistema opcional para tu archivo de modelo.
* **Parámetros del Modelo**: Ajustar los parámetros de tu archivo de modelo.
* **Sugerencias de Prompts**: Agregar prompts que se mostrarán en una nueva página de chat.
* **Documentos**: Agregar documentos al archivo de modelo (siempre con RAG [Generación Aumentada por Recuperación]).
* **Herramientas, Filtros y Acciones**: Seleccionar las herramientas, filtros y acciones que estarán disponibles para el archivo de modelo.
* **Visión**: Activar la opción para habilitar `Visión` para modelos multimodales.
* **Etiquetas**: Agregar etiquetas al archivo de modelo que se mostrarán junto al nombre del modelo en el menú desplegable de selección de modelos.

### Descubrimiento e Importación/Exportación de Modelos

La sección `Modelos` también incluye funciones para importar y exportar modelos:

* **Importar Modelos**: Utiliza este botón para importar modelos desde un archivo .json u otras fuentes.
* **Exportar Modelos**: Utiliza este botón para exportar todos tus archivos de modelo en un único archivo .json.

Para descargar modelos, navega a la configuración **Ollama Settings** en la pestaña Conexiones.
Alternativamente, también puedes descargar modelos directamente escribiendo un comando como `ollama run hf.co/[creador del modelo]/[nombre del modelo]` en el menú desplegable de selección de modelos.
Esta acción creará un botón etiquetado como "Pull [Nombre del Modelo]" para la descarga.

### Cambio de Modelos

   **Ejemplo**: Cambiar entre **Mistral**, **LLaVA**, y **GPT-3.5** en una tarea de múltiples etapas

* **Escenario**: Una conversación de múltiples etapas implica diferentes tipos de tareas, como comenzar con un simple FAQ, interpretar una imagen y luego generar una respuesta creativa.
* **Razón para el Cambio**: El usuario puede aprovechar las fortalezas específicas de cada modelo para cada etapa:
  * **Mistral** para preguntas generales y reducir el tiempo y costo de cómputo.
  * **LLaVA** para tareas visuales y obtener ideas basadas en datos de imágenes.
  * **GPT-3.5** para generar un resultado lingüístico más sofisticado y matizado.
* **Proceso**: El usuario cambia entre modelos dependiendo del tipo de tarea para maximizar la eficiencia y calidad de respuesta.

    **Cómo hacerlo**:
    1. **Seleccionar el Modelo**: Dentro de la interfaz de chat, selecciona los modelos deseados desde el menú desplegable del selector de modelos. Puedes seleccionar hasta dos modelos simultáneamente, y se generarán ambas respuestas. Luego puedes navegar entre ellas utilizando las flechas adelante y atrás.
    2. **Preservación del Contexto**: Open WebUI conserva el contexto de la conversación durante los cambios de modelo, permitiendo transiciones fluidas.
