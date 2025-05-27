---
sidebar_position: 1
title: "🏺 Artefactos"
---


# ¿Qué son los Artefactos y cómo los uso en Open WebUI?

Los artefactos en Open WebUI son una característica innovadora inspirada en los Artefactos de Claude.AI, que te permite interactuar con contenido significativo e independiente generado por un LLM dentro de un chat. Te permiten ver, modificar, construir sobre o hacer referencia a piezas sustanciales de contenido separadamente de la conversación principal, facilitando el trabajo con resultados complejos y asegurando que puedas visitar información importante más tarde.

## ¿Cuándo usa Open WebUI Artefactos?

Open WebUI crea un Artefacto cuando el contenido generado cumple con criterios específicos adaptados a nuestra plataforma:

1. **Renderizable**: Para ser mostrado como un Artefacto, el contenido debe estar en un formato que Open WebUI soporte para su renderización. Esto incluye:

* Sitios web HTML de una sola página
* Imágenes en formato Scalable Vector Graphics (SVG)
* Páginas web completas, que incluyen HTML, Javascript y CSS todo en el mismo Artefacto. Ten en cuenta que se requiere HTML si se genera una página web completa.
* Visualizaciones ThreeJS y otras bibliotecas de visualización JavaScript como D3.js.

Otros tipos de contenido como documentos (Markdown o texto plano), fragmentos de código y componentes React no se renderizan como Artefactos en Open WebUI.

## ¿Cómo crea Artefactos el modelo de Open WebUI?

Para usar artefactos en Open WebUI, un modelo debe proporcionar contenido que active el proceso de renderización para crear un artefacto. Esto implica generar código HTML válido, SVG u otros formatos compatibles para la renderización de artefactos. Cuando el contenido generado cumple con los criterios mencionados anteriormente, Open WebUI lo mostrará como un Artefacto interactivo.

## ¿Cómo uso los Artefactos en Open WebUI?

Cuando Open WebUI crea un Artefacto, verás el contenido mostrado en una ventana de Artefactos dedicada al lado derecho del chat principal. Aquí tienes cómo interactuar con los Artefactos:

* **Edición e iteración**: Solicita a un LLM dentro del chat que edite o itere sobre el contenido, y estas actualizaciones se mostrarán directamente en la ventana de Artefactos. Puedes cambiar entre versiones usando el selector de versiones en la parte inferior izquierda del Artefacto. Cada edición crea una nueva versión, lo que te permite rastrear los cambios utilizando el selector de versiones.
* **Actualizaciones**: Open WebUI puede actualizar un Artefacto existente basado en tus mensajes. La ventana de Artefactos mostrará el contenido más reciente.
* **Acciones**: Accede a acciones adicionales para el Artefacto, como copiar el contenido o abrir el artefacto en pantalla completa, ubicado en la esquina inferior derecha del Artefacto.

## Edición de Artefactos

1. **Actualizaciones específicas**: Describe lo que deseas cambiar y dónde. Por ejemplo:

* "Cambia el color de la barra en el gráfico de azul a rojo."
* "Actualiza el título de la imagen SVG a 'Nuevo Título'."

2. **Reescrituras completas**: Solicita cambios mayores que afecten a la mayor parte del contenido para una reestructuración sustancial o actualizaciones de varias secciones. Por ejemplo:

* "Reescribe este sitio web HTML de una sola página para que sea una página de aterrizaje en su lugar."
* "Rediseña este SVG para que esté animado usando ThreeJS."

**Mejores prácticas**:

* Sé específico sobre qué parte del Artefacto deseas cambiar.
* Referencia texto único identificador alrededor de tu cambio deseado para actualizaciones específicas.
* Considera si una pequeña actualización o una reescritura completa es más apropiada para tus necesidades.

## Casos de Uso

Los artefactos en Open WebUI permiten que diversos equipos creen productos de alta calidad de manera rápida y eficiente. Aquí hay algunos ejemplos adaptados a nuestra plataforma:

* **Diseñadores**:
  * Crear gráficos SVG interactivos para diseño UI/UX.
  * Diseñar sitios web HTML de una sola página o páginas de aterrizaje.
* **Desarrolladores**: Crear prototipos HTML simples o generar iconos SVG para proyectos.
* **Especialistas en Marketing**:
  * Diseñar páginas de aterrizaje para campañas con métricas de rendimiento.
  * Crear gráficos SVG para anuncios creativos o publicaciones en redes sociales.

## Ejemplos de Proyectos que puedes crear con los Artefactos de Open WebUI

Los artefactos en Open WebUI permiten que diversos equipos e individuos creen productos de alta calidad de manera rápida y eficiente. Aquí hay algunos ejemplos adaptados a nuestra plataforma, que muestran la versatilidad de los artefactos e inspiran a explorar su potencial:

1. **Visualizaciones Interactivas**

* Componentes utilizados: ThreeJS, D3.js y SVG
* Beneficios: Crear historias de datos inmersivas con visualizaciones interactivas. Los Artefactos de Open WebUI te permiten cambiar entre versiones, lo que facilita probar diferentes enfoques de visualización y rastrear los cambios.

Proyecto Ejemplo: Construir un gráfico de línea interactivo con ThreeJS para visualizar los precios de acciones a lo largo del tiempo. Actualizar los colores y escalas del gráfico en versiones separadas para comparar diferentes estrategias de visualización.

2. **Aplicaciones Web de Una Sola Página**

* Componentes utilizados: HTML, CSS y JavaScript
* Beneficios: Desarrollar aplicaciones web de una sola página directamente dentro de Open WebUI. Editar e iterar sobre el contenido utilizando actualizaciones específicas y reescrituras completas.

Proyecto de ejemplo: Diseña una aplicación de lista de tareas con una interfaz de usuario construida utilizando HTML y CSS. Usa JavaScript para añadir funcionalidades interactivas. Actualiza el diseño y la UI/UX de la aplicación mediante actualizaciones específicas y revisiones completas.

3. **Gráficos SVG Animados**

* Componentes utilizados: SVG y ThreeJS
* Beneficios: Crea gráficos SVG animados atractivos para campañas de marketing, redes sociales o diseño web. Los Artefactos de Open WebUI te permiten editar e iterar los gráficos en una sola ventana.

Proyecto de ejemplo: Diseña un logo SVG animado para la marca de una empresa. Usa ThreeJS para añadir efectos de animación y las actualizaciones específicas de Open WebUI para afinar los colores y el diseño del logo.

4. **Prototipos de Páginas Web**

* Componentes utilizados: HTML, CSS y JavaScript
* Beneficios: Construye y prueba prototipos de páginas web directamente dentro de Open WebUI. Cambia entre versiones para comparar diferentes enfoques de diseño y perfeccionar el prototipo.

Proyecto de ejemplo: Desarrolla un prototipo para un nuevo sitio web de comercio electrónico utilizando HTML, CSS y JavaScript. Usa las actualizaciones específicas de Open WebUI para perfeccionar la navegación, el diseño y la UI/UX.

5. **Narración Interactiva**

* Componentes utilizados: HTML, CSS y JavaScript
* Beneficios: Crea historias interactivas con efectos de desplazamiento, animaciones y otros elementos interactivos. Los Artefactos de Open WebUI te permiten perfeccionar la historia y probar diferentes versiones.

Proyecto de ejemplo: Construye una historia interactiva sobre la historia de una empresa, utilizando efectos de desplazamiento y animaciones para captar la atención del lector. Usa actualizaciones específicas para perfeccionar la narrativa de la historia y el selector de versiones de Open WebUI para probar diferentes versiones.
