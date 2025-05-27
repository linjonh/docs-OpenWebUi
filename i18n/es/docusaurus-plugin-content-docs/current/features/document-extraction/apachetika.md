---
sidebar_position: 4000
title: "🪶 Extracción con Apache Tika"
---

:::warning
Este tutorial es una contribución comunitaria y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

## 🪶 Extracción con Apache Tika

Esta documentación proporciona una guía paso a paso para integrar Apache Tika con Open WebUI. Apache Tika es una herramienta de análisis de contenido que puede usarse para detectar y extraer metadatos y contenido en texto de más de mil tipos diferentes de archivos. Todos estos tipos de archivos pueden analizarse a través de una única interfaz, lo que hace que Tika sea útil para la indexación de motores de búsqueda, análisis de contenido, traducción y mucho más.

Requisitos
------------

* Instancia de Open WebUI
* Docker instalado en su sistema
* Red Docker configurada para Open WebUI

Pasos de integración
----------------

### Paso 1: Crear un archivo Docker Compose o ejecutar el comando Docker para Apache Tika

Tienes dos opciones para ejecutar Apache Tika:

**Opción 1: Usar Docker Compose**

Crea un nuevo archivo llamado `docker-compose.yml` en el mismo directorio que tu instancia de Open WebUI. Agrega la siguiente configuración al archivo:

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

Ejecuta el archivo Docker Compose usando el siguiente comando:

```bash
docker-compose up -d
```

**Opción 2: Usar el comando Docker Run**

Alternativamente, puedes ejecutar Apache Tika utilizando el siguiente comando de Docker:

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

Ten en cuenta que si eliges usar el comando de ejecución de Docker, deberás especificar el flag `--network` si deseas ejecutar el contenedor en la misma red que tu instancia de Open WebUI.

### Paso 2: Configurar Open WebUI para usar Apache Tika

Para usar Apache Tika como el motor de extracción de contexto en Open WebUI, sigue estos pasos:

* Inicia sesión en tu instancia de Open WebUI.
* Navega al menú de configuración del `Panel de Administración`.
* Haz clic en `Configuraciones`.
* Haz clic en la pestaña `Documentos`.
* Cambia el desplegable del motor de extracción de contenido `Predeterminado` a `Tika`.
* Actualiza la URL del motor de extracción de contexto a `http://tika:9998`.
* Guarda los cambios.

 Verificación de Apache Tika en Docker
=====================================

Para verificar que Apache Tika está funcionando correctamente en un entorno Docker, puedes seguir estos pasos:

### 1. Inicia el contenedor Docker de Apache Tika

Primero, asegúrate de que el contenedor Docker de Apache Tika esté ejecutándose. Puedes iniciarlo usando el siguiente comando:

```bash
docker run -p 9998:9998 apache/tika
```

Este comando inicia el contenedor de Apache Tika y mapea el puerto 9998 del contenedor al puerto 9998 de tu máquina local.

### 2. Verifica que el servidor está ejecutándose

Puedes verificar que el servidor de Apache Tika está ejecutándose enviando una solicitud GET:

```bash
curl -X GET http://localhost:9998/tika
```

Este comando debería devolver la siguiente respuesta:

```
This is Tika Server. Please PUT
```

### 3. Verifica la integración

Alternativamente, también puedes intentar enviar un archivo para análisis para probar la integración. Puedes probar Apache Tika enviando un archivo para análisis usando el comando `curl`:

```bash
curl -T test.txt http://localhost:9998/tika
```

Reemplaza `test.txt` con la ruta a un archivo de texto en tu máquina local.

Apache Tika responderá con los metadatos detectados y el tipo de contenido del archivo.

### Usando un script para verificar Apache Tika

Si deseas automatizar el proceso de verificación, este script envía un archivo a Apache Tika y verifica la respuesta para los metadatos esperados. Si los metadatos están presentes, el script mostrará un mensaje de éxito junto con los metadatos del archivo; de lo contrario, mostrará un mensaje de error y la respuesta de Apache Tika.

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # Envía el archivo a Apache Tika y verifica la salida
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tika analizó correctamente el archivo.")
            print("Respuesta de Apache Tika:")
            print(response.text)
        else:
            print("Error analizando el archivo:")
            print(f"Código de estado: {response.status_code}")
            print(f"Respuesta de Apache Tika: {response.text}")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # Reemplazar con la ruta a tu archivo
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

Instrucciones para ejecutar el script:

### Requisitos

* Python 3.x debe estar instalado en tu sistema
* La librería `requests` debe estar instalada (puedes instalarla usando pip: `pip install requests`)
* El contenedor Docker de Apache Tika debe estar en ejecución (usa el comando `docker run -p 9998:9998 apache/tika`)
* Reemplaza `"test.txt"` con la ruta al archivo que deseas enviar a Apache Tika

### Ejecutando el Script

1. Guarda el script como `verify_tika.py` (por ejemplo, usando un editor de texto como Notepad o Sublime Text)
2. Abre una terminal o línea de comandos
3. Navega al directorio donde guardaste el script (usando el comando `cd`)
4. Ejecuta el script usando el siguiente comando: `python verify_tika.py`
5. El script mostrará un mensaje indicando si Apache Tika está funcionando correctamente

Nota: Si encuentras algún problema, asegúrate de que el contenedor de Apache Tika esté funcionando correctamente y que el archivo se esté enviando a la URL correcta.

### Conclusión

Siguiendo estos pasos, puedes verificar que Apache Tika esté funcionando correctamente en un entorno Docker. Puedes probar la configuración enviando un archivo para análisis, verificando que el servidor esté funcionando con una petición GET, o usando un script para automatizar el proceso. Si encuentras algún problema, asegúrate de que el contenedor de Apache Tika esté funcionando correctamente y que el archivo se esté enviando a la URL correcta.

Resolución de problemas
-----------------------

* Asegúrate de que el servicio Apache Tika esté en ejecución y sea accesible desde la instancia de Open WebUI.
* Revisa los registros de Docker en busca de errores o problemas relacionados con el servicio Apache Tika.
* Verifica que la URL del motor de extracción de contexto esté configurada correctamente en Open WebUI.

Beneficios de la Integración
----------------------------

La integración de Apache Tika con Open WebUI ofrece varios beneficios, entre ellos:

* **Mejora en la Extracción de Metadatos**: Las capacidades avanzadas de extracción de metadatos de Apache Tika pueden ayudarte a extraer datos precisos y relevantes de tus archivos.
* **Compatibilidad con Múltiples Formatos de Archivo**: Apache Tika admite una amplia gama de formatos de archivo, convirtiéndolo en una solución ideal para organizaciones que trabajan con diversos tipos de archivos.
* **Análisis de Contenido Mejorado**: Las capacidades avanzadas de análisis de contenido de Apache Tika pueden ayudarte a extraer información valiosa de tus archivos.

Conclusión
----------

La integración de Apache Tika con Open WebUI es un proceso sencillo que puede mejorar las capacidades de extracción de metadatos de tu instancia de Open WebUI. Siguiendo los pasos detallados en esta documentación, puedes configurar fácilmente Apache Tika como un motor de extracción de contexto para Open WebUI.
