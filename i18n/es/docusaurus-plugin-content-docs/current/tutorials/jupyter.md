---
sidebar_position: 321
title: "🐍 Integración con Jupyter Notebook"
---

:::warning
Este tutorial es una contribución de la comunidad y no es respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

> [!WARNING]
> Esta documentación se creó basada en la versión actual (0.5.16) y se está actualizando constantemente.


# Integración con Jupyter Notebook

A partir de v0.5.11, Open-WebUI lanzó una nueva función llamada `Soporte para Jupyter Notebook en el Intérprete de Código`. Esta función permite integrar Open-WebUI con Jupyter. Ya ha habido varias mejoras a esta función en las versiones posteriores, así que revisa cuidadosamente las notas de la versión.

Este tutorial le guía a través de lo básico para configurar la conexión entre ambos servicios.

- [Ver notas de la versión v0.5.11](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [Ver notas de la versión v0.5.15](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## ¿Qué son los Jupyter Notebooks?

Jupyter Notebook es una aplicación web de código abierto que permite a los usuarios crear y compartir documentos que contienen código en vivo, ecuaciones, visualizaciones y texto narrativo. Es particularmente popular en la ciencia de datos, el cálculo científico y la educación porque permite a los usuarios combinar código ejecutable (en lenguajes como Python, R o Julia) con texto explicativo, imágenes y visualizaciones interactivas, todo en un solo documento. Los Jupyter Notebooks son especialmente útiles para el análisis y la exploración de datos porque permiten ejecutar código en pequeños segmentos manejables mientras se documentan el proceso de pensamiento y los hallazgos. Este formato facilita la experimentación, depuración del código y la creación de reportes comprensivos y compartibles que demuestran tanto el proceso de análisis como los resultados.

Consulta el sitio web de Jupyter para más información en: [Proyecto Jupyter](https://jupyter.org/)

## Paso 0: Resumen de Configuración

Aquí está la configuración objetivo que vamos a configurar a través de este tutorial.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-code-execution.png)

# Paso 1: Iniciar OUI y Jupyter

Para lograr esto, utilicé `docker-compose` para iniciar un stack que incluye ambos servicios, junto con mis LLMs, pero esto también debería funcionar si se ejecutan cada contenedor de Docker por separado.

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

Puedes iniciar el stack anterior ejecutando el siguiente comando en el directorio donde se guarda el archivo `docker-compose`:

```bash title="Ejecutar docker-compose"
docker-compose up -d
```

Ahora deberías poder acceder a ambos servicios en las siguientes URLs:

| Servicio | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

Al acceder al servicio de Jupyter, necesitarás el `JUPYTER_TOKEN` definido anteriormente. Para este tutorial, he elegido un valor de token ficticio de `123456`.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-token.png)

# Paso 2: Configurar la Ejecución de Código para Jupyter

Ahora que tenemos Open-WebUI y Jupyter en ejecución, necesitamos configurar la Ejecución de Código de Open-WebUI para usar Jupyter en Panel de Administración -> Configuración -> Ejecución de Código. Dado que Open-WebUI está lanzando y mejorando constantemente esta función, recomiendo siempre revisar las configuraciones posibles en el archivo [`configs.py`](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) para lo último y lo mejor. A partir de la v0.5.16, esto incluye lo siguiente:

| Variable de Entorno Open-WebUI | Valor |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## Paso 3: Probar la Conexión

Para comenzar, confirmemos lo que hay en nuestro directorio de Jupyter. Como puedes ver en la imagen a continuación, solo tenemos una carpeta vacía `work`.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-empty.png)

### Crear un archivo CSV

Ejecutemos nuestro primer comando. Asegúrate de haber seleccionado el botón `Ejecución de Código`.

```
Comando: Crea dos archivos CSV usando datos ficticios. El primer CSV debe ser creado usando python básico y el segundo CSV debe ser creado usando la biblioteca pandas. Nombra los archivos CSV como data1.csv y data2.csv
```

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-create-csv.png)

Podemos ver que los CSVs fueron creados y ahora son accesibles dentro de Jupyter.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-view-csv.png)

### Crear una Visualización

Ejecutemos nuestro segundo comando. Nuevamente, asegúrate de haber seleccionado el botón `Ejecución de Código`.

```
Comando: Crea varias visualizaciones en python usando matplotlib y seaborn y guárdalas en jupyter
```

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-create-viz.png)

Podemos ver que las visualizaciones fueron creadas y ahora son accesibles dentro de Jupyter.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-view-viz.png)

### Crear un Notebook

Ejecutemos juntos nuestro último comando. En este comando, crearemos un notebook completamente nuevo utilizando solo un comando.

```
Comando: Escribe código python para leer y escribir archivos json y guárdalo en mi notebook llamado notebook.ipynb
```

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-create-notebook.png)

Podemos ver que las visualizaciones fueron creadas y ahora son accesibles dentro de Jupyter.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-view-notebook.png)

## Nota sobre el flujo de trabajo

Durante las pruebas de esta función, noté varias veces que Open-WebUI no guardaba automáticamente el código o los resultados generados en mi instancia de Jupyter. Para forzar la salida del archivo/elemento que creé, seguía este flujo de trabajo de dos pasos, que primero crea el artefacto de código que quiero y luego pide que lo guarde en mi instancia de Jupyter.

![Configuración de Ejecución de Código](/images/tutorials/jupyter/jupyter-workflow.png)

## ¿Cómo estás usando esta función?

¿Estás utilizando la función de Ejecución de Código y/o Jupyter? Si es así, por favor contáctame. Me encantaría saber cómo estás utilizándolo para seguir agregando ejemplos a este tutorial de otras formas increíbles en que puedes usar esta función.
