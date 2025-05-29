---
sidebar_position: 1
title: "Bing"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso específico de uso. ¿Quieres contribuir? Revisa el tutorial de contribuciones.
:::

## Bing API

### Configuración

1. Navega al [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) y crea un nuevo recurso. Después de crearlo, serás redirigido a la página de vista general del recurso. Desde allí, selecciona "Haz clic aquí para administrar claves." ![haz clic aquí para administrar claves](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. En la página de administración de claves, localiza Key1 o Key2 y copia la clave deseada.
3. Abre el Panel de Administración de Open WebUI, cambia a la pestaña de Configuración y luego selecciona Búsqueda Web.
4. Habilita la opción de búsqueda en la web y configura el Motor de Búsqueda Web como bing.
5. Llena `SearchApi API Key` con la `clave API` que copiaste en el paso 2 desde el panel de [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch).
6. Haz clic en `Guardar`.
