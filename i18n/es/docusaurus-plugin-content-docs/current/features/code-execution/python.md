---
sidebar_position: 2
title: "🐍 Ejecución de Código Python"
---

# 🐍 Ejecución de Código Python

## Resumen

Open WebUI permite la ejecución del código Python en el navegador del lado del cliente, utilizando Pyodide para ejecutar scripts dentro de un bloque de código en un chat. Esta función permite que los Modelos de Lenguaje Grande (LLMs) generen scripts de Python que pueden ejecutarse directamente en el navegador, aprovechando una variedad de bibliotecas admitidas por Pyodide.

Para mantener la privacidad y flexibilidad del usuario, Open WebUI refleja los paquetes de PyPI, evitando solicitudes externas directas a la red. Este enfoque también permite el uso de Pyodide en entornos sin acceso a internet.

La interfaz de Open WebUI incluye un entorno de Python seleccionado y autónomo basado en WASM (WebAssembly), impulsado por Pyodide, que puede ejecutar scripts básicos de Python generados por LLMs. Este entorno está diseñado para ser fácil de usar y no requiere configuración ni instalación adicional.

## Bibliotecas Compatibles

La ejecución de código de Pyodide está configurada para cargar solo los paquetes configurados en scripts/prepare-pyodide.js y luego agregados a "CodeBlock.svelte". Los siguientes paquetes de Pyodide son actualmente compatibles con Open WebUI:

* micropip
* packaging
* requests
* beautifulsoup4
* numpy
* pandas
* matplotlib
* scikit-learn
* scipy
* regex

Estas bibliotecas pueden utilizarse para realizar diversas tareas, como manipulación de datos, aprendizaje automático y extracción de datos web. Si el paquete que deseas ejecutar no está compilado dentro del Pyodide que se envía con Open WebUI, el paquete no podrá ser utilizado.

## Invocando Ejecución de Código Python

Para ejecutar el código Python, pídele a un LLM en un chat que escriba un script de Python para ti. Una vez que el LLM haya generado el código, aparecerá un botón `Run` en la parte superior derecha del bloque de código. Al hacer clic en este botón, se ejecutará el código utilizando Pyodide. Para mostrar el resultado en la parte inferior de un bloque de código, asegúrate de incluir al menos una declaración de impresión dentro del código para mostrar un resultado.

## Consejos para Usar la Ejecución de Código Python

* Al escribir código Python, ten en cuenta que el código se ejecutará en un entorno Pyodide. Puedes informar al LLM sobre esto mencionando "entorno Pyodide" cuando solicites el código.
* Investiga la documentación de Pyodide para comprender las capacidades y limitaciones del entorno.
* Experimenta con diferentes bibliotecas y scripts para explorar las posibilidades de la ejecución de código Python en Open WebUI.

## Documentación de Pyodide

* [Documentación de Pyodide](https://pyodide.org/en/stable/)

## Ejemplo de Código

Aquí hay un ejemplo de un script simple de Python que puede ejecutarse utilizando Pyodide:

```python
import pandas as pd

# Crear un DataFrame de muestra
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# Imprimir el DataFrame
print(df)
```

Este script creará un DataFrame de muestra utilizando pandas y lo imprimirá debajo del bloque de código dentro de tu chat.

## Ampliando la Lista de Bibliotecas Compatibles

¿Quieres ampliar las posibilidades? Para extender la lista de bibliotecas compatibles, sigue estos pasos:

1. **Haz un fork del repositorio de Pyodide** para crear tu propia versión.
2. **Elige nuevos paquetes** de la lista de paquetes existentes dentro de Pyodide o explora paquetes de alta calidad que Open WebUI no tiene actualmente.
3. **Integra los nuevos paquetes** en tu repositorio bifurcado para desbloquear aún más posibilidades.
