---
sidebar_position: 31
title: "🛌 Integrar con Amazon Bedrock"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

---

# Integrar Open-WebUI con Amazon Bedrock

En este tutorial, exploraremos uno de los enfoques más comunes y populares para integrar Open-WebUI con Amazon Bedrock.

## Prerrequisitos


Para seguir este tutorial, debes contar con lo siguiente:

- Una cuenta activa de AWS
- Una Clave de Acceso y una Clave Secreta de AWS activas
- Permisos IAM en AWS para habilitar modelos de Bedrock o modelos ya habilitados
- Docker instalado en tu sistema


## ¿Qué es Amazon Bedrock?

Directamente desde el sitio web de AWS:

"Amazon Bedrock es un servicio completamente administrado que ofrece una selección de modelos de base de alto rendimiento (FMs) de empresas líderes en IA como AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside (próximamente), Stability AI y Amazon, a través de una única API, junto con un amplio conjunto de capacidades que necesitas para construir aplicaciones generativas de IA con seguridad, privacidad y ética responsable en IA. Con Amazon Bedrock, puedes experimentar fácilmente con y evaluar los principales FMs para tu caso de uso, personalizarlos de manera privada con tus datos usando técnicas como ajuste fino y generación aumentada por recuperación (RAG), y construir agentes que ejecuten tareas usando los sistemas empresariales y las fuentes de datos de tu organización. Como Amazon Bedrock es sin servidor, no tienes que administrar ninguna infraestructura y puedes integrar e implementar de manera segura capacidades de IA generativa en tus aplicaciones usando los servicios de AWS con los que ya estás familiarizado."

Para obtener más información sobre Bedrock, visita: [Página oficial de Amazon Bedrock](https://aws.amazon.com/bedrock/)

# Pasos de Integración

## Paso 1: Verificar acceso a los Modelos Base de Amazon Bedrock

Antes de que podamos integrar con Bedrock, primero debes verificar que tienes acceso al menos a uno, pero preferiblemente a varios, de los Modelos Base disponibles. Al momento de escribir esto (febrero 2025), había 47 modelos base disponibles. En la captura de pantalla a continuación, puedes ver que tengo acceso a varios modelos. Sabrás que tienes acceso a un modelo si dice "✅ Acceso concedido" junto al modelo. Si no tienes acceso a ningún modelo, obtendrás un error en el siguiente paso.

AWS proporciona una buena documentación para solicitar acceso/habilitar estos modelos aquí: [Documentación de acceso a modelos de Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Modelos Base de Amazon Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## Paso 2: Configurar el Gateway de Acceso a Bedrock

Ahora que tenemos acceso al menos a un modelo base de Bedrock, necesitamos configurar el Gateway de Acceso a Bedrock, o BAG. Puedes pensar en el BAG como una especie de proxy o middleware desarrollado por AWS que envuelve los extremos/SDK nativos de AWS para Bedrock y, a su vez, expone puntos finales que son compatibles con el esquema de OpenAI, que es lo que requiere Open-WebUI.

Como referencia, aquí hay un sencillo mapeo entre los puntos finales:

| Punto final de OpenAI       | Método de Bedrock         |
|----------------------------|---------------------------|
| `/models`                  | list_inference_profiles   |
| `/models/{model_id}`       | list_inference_profiles   |
| `/chat/completions`        | converse o converse_stream|
| `/embeddings`              | invoke_model              |

El repositorio del BAG se puede encontrar aquí: [Repositorio del Gateway de Acceso a Bedrock](https://github.com/aws-samples/bedrock-access-gateway)

Para configurar el BAG, sigue los siguientes pasos:
- Clona el repositorio del BAG
- Elimina el `dockerfile` predeterminado
- Cambia el nombre de `Dockerfile_ecs` a `Dockerfile`

Ahora estamos listos para construir e iniciar el contenedor de Docker usando:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

Ahora deberías poder acceder a la página de swagger del BAG en: http://localhost:8000/docs

![Swagger del Gateway de Acceso a Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## Paso 3: Agregar la Conexión en Open-WebUI

Ahora que tienes el BAG funcionando, es hora de agregarlo como una nueva conexión en Open-WebUI.

- En el Panel de Administración, ve a Configuración -> Conexiones.
- Usa el botón "+" (más) para agregar una nueva conexión bajo OpenAI
- Para la URL, utiliza "http://host.docker.internal:8000/api/v1"
- Para la contraseña, la contraseña predeterminada definida en BAG es "bedrock". Siempre puedes cambiar esta contraseña en la configuración de BAG (ver DEFAULT_API_KEYS)
- Haz clic en el botón "Verificar Conexión" y deberías ver la alerta "Conexión al servidor verificada" en la esquina superior derecha

![Agregar nueva conexión](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## Paso 4: Comienza a usar los modelos base de Bedrock

¡Ahora deberías ver todos tus modelos de Bedrock disponibles!

![Usar modelos de Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## Otros tutoriales útiles

Estos son algunos otros tutoriales muy útiles para integrar Open-WebUI con Amazon Bedrock.

- https://gauravve.medium.com/conectando-open-webui-a-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/usando-amazon-bedrock-con-openwebui-cuando-trabajas-con-datos-sensibles/
