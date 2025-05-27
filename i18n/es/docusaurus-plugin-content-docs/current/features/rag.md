---
sidebar_position: 11
title: "🔎 Generación Aumentada por Recuperación (RAG)"
---

:::warning

Si estás utilizando **Ollama**, ten en cuenta que **por defecto utiliza un contexto de 2048 tokens**. Esto significa que los datos recuperados pueden **no ser utilizados en absoluto** porque no caben dentro de la ventana de contexto disponible. Para mejorar el rendimiento de la **Generación Aumentada por Recuperación (RAG)**, deberías **aumentar la longitud del contexto** a **8192+ tokens** en la configuración de tu modelo Ollama.

:::


La Generación Aumentada por Recuperación (RAG) es una tecnología de vanguardia que mejora las capacidades conversacionales de los chatbots incorporando contexto de diversas fuentes. Funciona recuperando información relevante de una amplia variedad de fuentes como documentos locales y remotos, contenido web e incluso fuentes multimedia como videos de YouTube. El texto recuperado se combina con una plantilla RAG predefinida y se antepone al mensaje del usuario, proporcionando una respuesta más informada y contextualmente relevante.

Una de las principales ventajas de RAG es su capacidad para acceder e integrar información de una variedad de fuentes, lo que la convierte en una solución ideal para escenarios conversacionales complejos. Por ejemplo, cuando un usuario hace una pregunta relacionada con un documento o página web específicos, RAG puede recuperar e incorporar la información relevante de esa fuente en la respuesta del chat. RAG también puede recuperar e incorporar información de fuentes multimedia como videos de YouTube. Analizando las transcripciones o subtítulos de estos videos, RAG puede extraer información relevante e integrarla en la respuesta del chat.




## Integración RAG Local y Remota

Los documentos locales deben cargarse primero a través de la sección de Documentos en el área de Espacio de Trabajo para acceder a ellos usando el símbolo `#` antes de una consulta. Haz clic en la URL formateada que aparece encima del cuadro de chat. Una vez seleccionado, aparece un ícono de documento sobre `Enviar un mensaje`, indicando una recuperación exitosa.

También puedes cargar documentos en el área de espacio de trabajo con su acceso iniciando un mensaje con `#`, seguido de una URL. Esto puede ayudar a incorporar contenido web directamente en tus conversaciones.

## Búsqueda Web para RAG

Para la integración de contenido web, comienza una consulta en un chat con `#`, seguido de la URL objetivo. Haz clic en la URL formateada en el cuadro que aparece encima del cuadro de chat. Una vez seleccionado, aparece un ícono de documento sobre `Enviar un mensaje`, indicando una recuperación exitosa. Open WebUI recupera y analiza información de la URL si es posible.

:::tip
Las páginas web a menudo contienen información adicional como navegación y pies de página. Para mejores resultados, enlaza una versión limpia o en modo lectura de la página.
:::

## Personalización de Plantilla RAG

Personaliza la plantilla RAG desde el menú `Panel de Administración` > `Configuración` > `Documentos`.

## Soporte de Embedding de RAG

Cambia el modelo de embedding de RAG directamente en el menú `Panel de Administración` > `Configuración` > `Documentos`. Esta función es compatible con los modelos Ollama y OpenAI, lo que te permite mejorar el procesamiento de documentos según tus necesidades.

## Citaciones en la Función RAG

La función RAG permite a los usuarios rastrear fácilmente el contexto de los documentos proporcionados a los LLMs con citaciones añadidas como puntos de referencia. Esto garantiza transparencia y responsabilidad en el uso de fuentes externas dentro de tus chats.

## Canalización Mejorada de RAG

La subfunción de búsqueda híbrida conmutante para nuestra función de embedding RAG mejora la funcionalidad de RAG a través de `BM25`, con reordenamiento potenciado por `CrossEncoder`, y umbrales configurables de puntajes de relevancia. Esto proporciona una experiencia RAG más precisa y adaptada a tu caso de uso específico.

## Canalización RAG para YouTube

La canalización RAG dedicada para resumir videos de YouTube mediante URLs permite una interacción fluida con transcripciones de video directamente. Esta innovadora función te permite incorporar contenido de video en tus chats, enriqueciendo aún más tu experiencia conversacional.

## Análisis de Documentos

Una variedad de analizadores extraen contenido de documentos locales y remotos. Para más información, consulta la función [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328).

## Integración de Google Drive

Cuando se combina con un proyecto de Google Cloud que tenga habilitadas las APIs de Google Picker y Google Drive, esta función permite a los usuarios acceder directamente a sus archivos de Drive desde la interfaz de chat y cargar documentos, diapositivas, hojas de cálculo y más, y los sube como contexto para tu chat. Puede habilitarse en el menú `Panel de Administración` > `Configuración` > `Documentos`. Es necesario configurar las variables de entorno [`GOOGLE_DRIVE_API_KEY y GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md) para usarla.

### Instrucciones Detalladas
1. Crea un cliente OAuth 2.0 y configura tanto los orígenes autorizados de JavaScript como la URI de redirección autorizada a la URL (incluye el puerto si es necesario) que usas para acceder a tu instancia de Open-WebUI.
1. Tome nota del ID de cliente asociado con ese cliente OAuth.
1. Asegúrese de habilitar tanto la API de Google Drive como la API de Google Picker para su proyecto.
1. Además, establezca su aplicación (proyecto) como Prueba y agregue su correo electrónico de Google Drive a la lista de usuarios.
1. Establezca el alcance de permisos para incluir todo lo que esas APIs tienen para ofrecer. Y dado que la aplicación estaría en modo de prueba, Google no requiere verificación para permitir que la aplicación acceda a los datos de los usuarios de prueba limitados.
1. Vaya a la página de la API de Google Picker y haga clic en el botón para crear credenciales.
1. Cree una clave de API y bajo restricciones de aplicaciones elija Sitios web. Luego agregue la URL de su instancia de Open-WebUI, igual que en la configuración de Orígenes de JavaScript autorizados y URI de redireccionamiento autorizados en el paso 1.
1. Configure restricciones de API en la clave de API para acceder únicamente a la API de Google Drive y la API de Google Picker.
1. Configure la variable de entorno, `GOOGLE_DRIVE_CLIENT_ID` con el ID de cliente del cliente OAuth del paso 2.
1. Configure la variable de entorno `GOOGLE_DRIVE_API_KEY` con el valor de la clave de API configurada en el paso 7 (NO con el secreto del cliente OAuth del paso 2).
1. Configure `GOOGLE_REDIRECT_URI` con la URL de mi instancia de Open-WebUI (incluya el puerto, si hay).
1. Luego reinicie su instancia de Open-WebUI con esas tres variables de entorno.
1. Después de eso, asegúrese de que Google Drive esté habilitado en `Panel de administración` < `Configuración` < `Documentos` < `Google Drive`
