---
title: "🕵🏻‍♀️ Monitorea tus solicitudes LLM con Helicone"
sidebar_position: 19
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Revisa el tutorial para colaboradores.
:::

# Integración de Helicone con Open WebUI

Helicone es una plataforma de observabilidad LLM de código abierto para desarrolladores que permite monitorear, depurar y mejorar aplicaciones **listas para producción**, incluida tu implementación de Open WebUI.

Al habilitar Helicone, puedes registrar solicitudes LLM, evaluar y experimentar con indicaciones, y obtener información instantánea que te ayuda a implementar cambios en producción con confianza.

- **Monitoreo en tiempo real con vista consolidada entre tipos de modelo**: Monitorea tanto los modelos locales de Ollama como las API en la nube a través de una única interfaz
- **Visualización y reproducción de solicitudes**: Ve exactamente qué indicaciones se enviaron a cada modelo en Open WebUI y las salidas generadas por los LLM para su evaluación
- **Seguimiento del rendimiento del LLM local**: Mide los tiempos de respuesta y el rendimiento de tus modelos autoalojados
- **Analítica de uso por modelo**: Compara patrones de uso entre diferentes modelos en tu configuración de Open WebUI
- **Analítica de usuario** para comprender los patrones de interacción
- **Capacidades de depuración** para resolver problemas con las respuestas del modelo
- **Seguimiento de costos** para tu uso de LLM entre proveedores


## Cómo integrar Helicone con Open WebUI

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="Reproductor de video de YouTube"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### Paso 1: Crea una cuenta de Helicone y genera tu clave API

Crea una [cuenta de Helicone](https://www.helicone.ai/) e inicia sesión para generar una [clave API aquí](https://us.helicone.ai/settings/api-keys).

*— Asegúrate de generar una [clave API de solo escritura](https://docs.helicone.ai/helicone-headers/helicone-auth). Esto garantiza que solo permites registrar datos en Helicone sin acceso de lectura a tus datos privados.*

### Paso 2: Crea una cuenta de OpenAI y genera tu clave API

Crea una cuenta de OpenAI e inicia sesión en el [Portal de Desarrolladores de OpenAI](https://platform.openai.com/account/api-keys) para generar una clave API.

### Paso 3: Ejecuta tu aplicación Open WebUI usando la URL base de Helicone

Para lanzar tu primera aplicación Open WebUI, utiliza el comando de los [documentos de Open WebUI](https://docs.openwebui.com/) e incluye la URL BASE de la API de Helicone para que puedas consultar y monitorear automáticamente.

```bash
   # Configura tus variables de entorno
   export HELICONE_API_KEY=<TU_CLAVE_API>
   export OPENAI_API_KEY=<TU_CLAVE_API_DE_OPENAI>

   # Ejecuta Open WebUI con la integración de Helicone
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

Si ya tienes una aplicación Open WebUI desplegada, ve al `Panel Administrativo` > `Configuraciones` > `Conexiones` y haz clic en el signo `+` para "Gestionar conexiones API de OpenAI". Actualiza las siguientes propiedades:

- Tu `URL Base de API` sería ``https://oai.helicone.ai/v1/<TU_CLAVE_API_DE_HELICONE>``
- La `CLAVE API` sería tu clave API de OpenAI.

![Configuración de Open WebUI con Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### Paso 4: Asegúrate de que el monitoreo esté funcionando

Para verificar que tu integración está funcionando, inicia sesión en el tablero de Helicone y revisa la pestaña "Solicitudes".

Deberías ver las solicitudes que has realizado a través de tu interfaz de Open WebUI ya registradas en Helicone.

![Ejemplo de traza en Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## Aprende más

Para obtener una guía completa sobre Helicone, puedes consultar [la documentación de Helicone aquí](https://docs.helicone.ai/getting-started/quick-start).
