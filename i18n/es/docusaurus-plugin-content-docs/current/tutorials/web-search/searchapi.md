---
sidebar_position: 9
title: "SearchApi"
---

:::advertencia
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Solo sirve como una demostración sobre cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribución.
:::

## API SearchApi

[SearchApi](https://searchapi.io) es una colección de APIs SERP en tiempo real. Cualquier motor SERP existente o futuro que devuelva `organic_results` es compatible. El motor de búsqueda web predeterminado es `google`, pero se puede cambiar a `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` y otros.

### Configuración

1. Ve a [SearchApi](https://searchapi.io) y inicia sesión o crea una nueva cuenta.
2. Ve a `Dashboard` y copia la clave API.
3. Con la `clave API`, abre el `Panel de administración de Open WebUI` y haz clic en la pestaña `Configuración`, luego haz clic en `Búsqueda web`.
4. Habilita la `Búsqueda web` y establece `Motor de búsqueda web` en `searchapi`.
5. Completa el campo `Clave API de SearchApi` con la `clave API` que copiaste en el paso 2 desde el panel de [SearchApi](https://www.searchapi.io/).
6. [Opcional] Ingresa el nombre del `motor de SearchApi` que deseas consultar. Por ejemplo, `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar` y `google_patents`. Por defecto, está configurado en `google`.
7. Haz clic en `Guardar`.

![Panel de administración de Open WebUI](/images/tutorial_searchapi_search.png)

#### Nota

Debes habilitar la `Búsqueda web` en el campo de entrada, utilizando el botón más (`+`) para buscar en la web usando los motores de [SearchApi](https://www.searchapi.io/).

![habilitar Búsqueda web](/images/enable_web_search.png)
