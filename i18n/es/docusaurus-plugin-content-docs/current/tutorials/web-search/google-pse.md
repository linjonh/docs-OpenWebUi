---
sidebar_position: 5
title: "Google PSE"
---

:::warning
Este tutorial es una contribución de la comunidad y no es compatible con el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## API de Google PSE

### Configuración

1. Ve a Google Developers, utiliza [Programmable Search Engine](https://developers.google.com/custom-search) e inicia sesión o crea una cuenta.
2. Ve al [panel de control](https://programmablesearchengine.google.com/controlpanel/all) y haz clic en el botón `Agregar`.
3. Ingresa un nombre para el motor de búsqueda, configura las demás propiedades según tus necesidades, verifica que no eres un robot y haz clic en el botón `Crear`.
4. Genera la `clave de API` y obtén el `ID del motor de búsqueda`. (Disponible después de que se crea el motor).
5. Con la `clave de API` y el `ID del motor de búsqueda`, abre el `panel de administración de Open WebUI` y haz clic en la pestaña `Configuraciones`, luego haz clic en `Búsqueda web`.
6. Habilita la `Búsqueda web` y establece `Motor de búsqueda web` en `google_pse`.
7. Completa el campo `Google PSE API Key` con la `clave de API` y el campo `Google PSE Engine Id` (# 4).
8. Haz clic en `Guardar`.

![Panel de administración de Open WebUI](/images/tutorial_google_pse1.png)

#### Nota

Debes habilitar la `Búsqueda web` en el campo de aviso, utilizando el botón más (`+`).
¡Busca en la web! ;-)

![Habilitar Búsqueda web](/images/tutorial_google_pse2.png)
