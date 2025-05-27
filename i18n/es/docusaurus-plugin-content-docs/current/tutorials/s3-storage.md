---
sidebar_position: 320
title: "🪣 Cambiar a almacenamiento S3"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve únicamente como una demostración sobre cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# 🪣 Cambiar a almacenamiento S3

Esta guía proporciona instrucciones sobre cómo cambiar el almacenamiento predeterminado `local` en la configuración de Open WebUI a Amazon S3.

## Requisitos previos

Para seguir este tutorial, debes tener lo siguiente:

- Una cuenta activa de AWS
- Una clave de acceso de AWS activa y una clave secreta
- Permisos de IAM en AWS para crear y subir objetos en S3
- Docker instalado en tu sistema

## Qué es Amazon S3

Directamente desde el sitio web de AWS:

"Amazon S3 es un servicio de almacenamiento de objetos que ofrece escalabilidad líder en la industria, disponibilidad de datos, seguridad y rendimiento. Almacena y protege cualquier cantidad de datos para una variedad de casos de uso, como lagos de datos, sitios web, aplicaciones nativas en la nube, respaldos, archivos, aprendizaje automático y análisis. Amazon S3 está diseñado para una durabilidad del 99.999999999% (11 nueves) y almacena datos para millones de clientes en todo el mundo."

Para más información sobre S3, visita: [Página Oficial de Amazon S3](https://aws.amazon.com/s3/)

# Cómo configurar

## 1. Variables de entorno requeridas

Para configurar esta opción, necesitas reunir las siguientes variables de entorno:

| **Variable de Entorno de Open-WebUI** | **Valor de Ejemplo**                           |
|---------------------------------------|-----------------------------------------------|
| `S3_ACCESS_KEY_ID`                    | ABC123                                        |
| `S3_SECRET_ACCESS_KEY`                | SuperSecret                                   |
| `S3_ENDPOINT_URL`                     | https://s3.us-east-1.amazonaws.com            |
| `S3_REGION_NAME`                      | us-east-1                                     |
| `S3_BUCKET_NAME`                      | my-awesome-bucket-name                        |

- S3_ACCESS_KEY_ID: Este es un identificador para la clave de acceso de tu cuenta de AWS. Lo obtienes desde el AWS Management Console o AWS CLI al crear una clave de acceso.
- S3_SECRET_ACCESS_KEY: Esta es la parte secreta de tu par de claves de acceso de AWS. Se proporciona cuando creas una clave de acceso en AWS y debe almacenarse de manera segura.
- S3_ENDPOINT_URL: Esta URL dirige a tu punto final del servicio S3 y típicamente se encuentra en la documentación del servicio AWS o en la configuración de la cuenta.
- S3_REGION_NAME: Esta es la región de AWS donde reside tu bucket de S3, como "us-east-1". Puedes identificarla desde el AWS Management Console bajo los detalles de tu bucket de S3.
- S3_BUCKET_NAME: Este es el nombre único de tu bucket de S3, que especificaste al crear el bucket en AWS.

Para obtener una lista completa de las URLs de los puntos finales disponibles de S3, consulta: [Puntos finales regulares de Amazon S3](https://docs.aws.amazon.com/general/latest/gr/s3.html)

Consulta todas las opciones de configuración de `Cloud Storage` aquí: [Configuración de Cloud Storage de Open-WebUI](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Ejecutar Open-WebUI

Antes de lanzar nuestra instancia de Open-WebUI, existe una última variable de entorno llamada `STORAGE_PROVIDER` que necesitamos configurar. Esta variable indica a Open-WebUI qué proveedor quieres usar. Por defecto, `STORAGE_PROVIDER` está vacío, lo que significa que Open-WebUI utiliza almacenamiento local.

| **Proveedor de Almacenamiento** | **Tipo** | **Descripción**                                                                           | **Por Defecto** |
|----------------------------------|----------|-----------------------------------------------------------------------------------------|-----------------|
| `local`                          | str      | Por defecto utiliza almacenamiento local si se proporciona una cadena vacía (` `)         | Sí              |
| `s3`                             | str      | Usa la biblioteca cliente S3 y las variables de entorno relacionadas mencionadas en Amazon S3 Storage | No              |
| `gcs`                            | str      | Usa la biblioteca cliente de GCS y las variables de entorno relacionadas mencionadas en Google Cloud Storage | No         |

Para usar Amazon S3, necesitamos configurar `STORAGE_PROVIDER` como "S3" junto con todas las variables de entorno que reunimos en el Paso 1 (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`).

Aquí, también estoy configurando `ENV` como "dev", lo que nos permitirá ver los documentos Swagger de Open-WebUI para que podamos probar y confirmar que la configuración del almacenamiento S3 funciona como se espera.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="my-awesome-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. Prueba de la configuración

Ahora que tenemos Open-WebUI ejecutándose, subamos un archivo de texto simple `Hello, World` y probemos nuestra configuración.

![Subir un archivo en Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

Y confirmemos que estamos obteniendo una respuesta del LLM seleccionado.

![Obtener una respuesta en Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

¡Genial! Parece que todo funciona como se esperaba en Open-WebUI. Ahora verifiquemos que el archivo de texto realmente se subió y se almacenó en el bucket S3 especificado. Usando la Consola de Administración de AWS, podemos ver que ahora hay un archivo en el bucket S3. Además del nombre del archivo que subimos (`hello.txt`), puedes ver que el nombre del objeto se ha completado con un ID único. Así es como Open-WebUI rastrea todos los archivos subidos.

![Obtener una respuesta en Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Usando la documentación swagger de Open-WebUI, podemos obtener toda la información relacionada con este archivo utilizando el extremo `/api/v1/files/{id}` y proporcionando el ID único (4405fabb-603e-4919-972b-2b39d6ad7f5b).

![Inspeccionar el archivo por ID](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
