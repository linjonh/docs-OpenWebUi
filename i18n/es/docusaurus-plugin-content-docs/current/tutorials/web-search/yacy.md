---
sidebar_position: 16
title: "Yacy"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribución.
:::

## API de Yacy

### Configuración

1. Navega a: `Panel de administración` -> `Configuración` -> `Búsqueda en la web`
2. Activa `Habilitar búsqueda en la web`
3. Selecciona `Motor de búsqueda web` del menú desplegable como `yacy`
4. Establezca la `URL de instancia Yacy` en uno de los siguientes ejemplos:

    * `http://yacy:8090` (usando el nombre del contenedor y el puerto expuesto, adecuado para configuraciones basadas en Docker)
    * `http://host.docker.internal:8090` (usando el nombre DNS `host.docker.internal` y el puerto del host, adecuado para configuraciones basadas en Docker)
    * `https://<yacy.local>:8443` (usando un nombre de dominio local, adecuado para acceso a red local)
    * `https://yacy.example.com` (usando un nombre de dominio personalizado para una instancia de Yacy autohospedada, adecuado para acceso público o privado)
    * `https://yacy.example.com:8443` (utilizando HTTPS sobre el puerto HTTPS predeterminado de Yacy)

5. Opcionalmente, ingresa tu nombre de usuario y contraseña de Yacy si se requiere autenticación para tu instancia de Yacy. Si ambos campos se dejan en blanco, se omitirá la autenticación con digest.
6. Presiona guardar

![Panel de administración de Open WebUI mostrando la configuración de Yacy](/images/tutorial_yacy.png)
