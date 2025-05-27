---
sidebar_position: 25
title: "🔠 Integración de LibreTranslate"
---

:::warning
Este tutorial es una contribución comunitaria y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribución.
:::

Descripción general
--------------------

LibreTranslate es una API de traducción automática gratuita y de código abierto que admite una amplia gama de idiomas. LibreTranslate es autohospedada, funciona sin conexión, es fácil de configurar y, a diferencia de otras API, no depende de proveedores propietarios como Google o Azure para realizar traducciones. En cambio, su motor de traducción está impulsado por la biblioteca de código abierto [Argos Translate](https://github.com/argosopentech/argos-translate). Puede integrar LibreTranslate con Open WebUI para aprovechar sus capacidades de traducción automática. Esta documentación ofrece una guía paso a paso para configurar LibreTranslate en Docker y configurar la integración dentro de Open WebUI.

Configuración de LibreTranslate en Docker
------------------------------------------

Para configurar LibreTranslate en Docker, siga estos pasos:

### Paso 1: Crear un archivo Docker Compose

Cree un nuevo archivo llamado `docker-compose.yml` en un directorio de su elección. Agregue la siguiente configuración al archivo:

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### Paso 2: Crear un archivo `stack.env`

Cree un nuevo archivo llamado `stack.env` en el mismo directorio que su archivo `docker-compose.yml`. Agregue la siguiente configuración al archivo:

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### Paso 3: Ejecutar el archivo Docker Compose

Ejecute el siguiente comando para iniciar el servicio LibreTranslate:

```bash
docker-compose up -d
```

Esto iniciará el servicio LibreTranslate en modo separado.

Configuración de la integración en Open WebUI
---------------------------------------------

Una vez que tenga LibreTranslate en funcionamiento en Docker, puede configurar la integración dentro de Open WebUI. Hay varias integraciones comunitarias disponibles, incluidas:

* [Función de filtro de LibreTranslate](https://openwebui.com/f/iamg30/libretranslate_filter)
* [Función de acción de LibreTranslate](https://openwebui.com/f/jthesse/libretranslate_action)
* [Función de acción multilanguage de LibreTranslate](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [Pipeline de filtro de LibreTranslate](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

Elija la integración que mejor se adapte a sus necesidades y siga las instrucciones para configurarla dentro de Open WebUI.

Idiomas compatibles con el pipeline y la función de LibreTranslate:
Realmente todos los idiomas que se pueden encontrar dentro de LibreTranslate, pero aquí está la lista:
```
Albanés, Árabe, Azerbaiyano, Bengalí, Búlgaro, Catalán, Valenciano, Chino, Checo, Danés, Holandés, Inglés, Flamenco, Esperanto, Estonio, Finés, Francés, Alemán, Griego, Hebreo, Hindi, Húngaro, Indonesio, Irlandés, Italiano, Japonés, Coreano, Letón, Lituano, Malayo, Persa, Polaco, Portugués, Rumano, Moldavo, Moldovano, Ruso, Eslovaco, Esloveno, Español, Castellano, Sueco, Tagalo, Tailandés, Turco, Ucraniano, Urdú
```

Resolución de problemas
------------------------

* Asegúrese de que el servicio LibreTranslate esté en funcionamiento y accesible.
* Verifique que la configuración de Docker sea correcta.
* Revise los registros de LibreTranslate en busca de posibles errores.

Beneficios de la integración
----------------------------

La integración de LibreTranslate con Open WebUI ofrece varios beneficios, entre ellos:

* Capacidades de traducción automática para una amplia gama de idiomas.
* Mejora del análisis y procesamiento de texto.
* Funcionalidad mejorada para tareas relacionadas con el idioma.

Conclusión
----------

La integración de LibreTranslate con Open WebUI es un proceso sencillo que puede mejorar la funcionalidad de su instancia de Open WebUI. Siguiendo los pasos descritos en esta documentación, puede configurar LibreTranslate en Docker y configurar la integración dentro de Open WebUI.
