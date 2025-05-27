---
sidebar_position: 15
title: "SerpApi"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración sobre cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## API de SerpApi

[SerpApi](https://serpapi.com/) Raspa Google y otros motores de búsqueda desde nuestra rápida, fácil y completa API. Cualquier motor SERP existente o próximo que devuelva `organic_results` es compatible. El motor de búsqueda web predeterminado es `google`, pero se puede cambiar a `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` y otros.

### Configuración

1. Ve a [SerpApi](https://serpapi.com/) e inicia sesión o crea una nueva cuenta.
2. Ve a `Dashboard` y copia la clave de API.
3. Con la `clave de API`, abre el `panel de administración de Open WebUI` y haz clic en la pestaña `Configuración`, luego haz clic en `Búsqueda web`.
4. Habilita `Búsqueda web` y configura el `Motor de búsqueda web` a `serpapi`.
5. Rellena la `Clave de API de SerpApi` con la `clave de API` que copiaste en el paso 2 desde el panel de [SerpApi](https://serpapi.com/).
6. [Opcional] Ingresa el nombre del `motor de SerpApi` que deseas consultar. Por ejemplo, `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar` y `google_patents`. Por defecto, está configurado como `google`. Encuentra más opciones en la [documentación de SerpApi](https://serpapi.com/dashboard).
7. Haz clic en `Guardar`.

![Panel de administración de Open WebUI](/images/tutorial_serpapi_search.png)

#### Nota

Debes habilitar `Búsqueda web` en el campo de aviso para buscar en la web utilizando los motores de [SerpApi](https://serpapi.com/).

![Habilitar búsqueda web](/images/enable_web_search.png)
