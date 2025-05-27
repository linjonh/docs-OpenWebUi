---
sidebar_position: 13
title: "⚛️ Continue.dev Extensión VSCode con Open WebUI"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Sirve solo como una demostración sobre cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# Integrando la Extensión Continue.dev VSCode con Open WebUI

### Descargar Extensión

Puedes descargar la extensión VSCode aquí en el [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.continue)

Una vez instalada, deberías tener ahora una pestaña "continue" en la barra lateral. Ábrela.

Haz clic en el selector de Asistente encima del campo principal de chat. Luego, pasa el ratón por encima de "Asistente Local" y deberías ver un icono de configuración (parece un engranaje).

Una vez que hagas clic en el icono de configuración, un archivo `config.yaml` debería abrirse en el editor.

Aquí podrás configurar Continue para usar Open WebUI.

---

Actualmente, el proveedor "ollama" no soporta autenticación, por lo que no podemos usar este proveedor con Open WebUI.

Sin embargo, Ollama y Open WebUI tienen compatibilidad con la especificación de API de OpenAI. Puedes ver una publicación del blog de Ollama [aquí](https://ollama.com/blog/openai-compatibility) sobre esto.

Aún podemos configurar Continue para usar el proveedor 'openai', lo cual nos permitirá usar el token de autenticación de Open WebUI.

---

## Configuración

En `config.yaml`, todo lo que necesitas hacer es agregar/cambiar las siguientes opciones.

### Cambiar proveedor a openai

```yaml
provider: openai
```

### Agregar o actualizar apiBase

Establece esto a tu dominio de Open Web UI al final.

```yaml
apiBase: http://localhost:3000/ # Si seguiste la guía de inicio rápido con Docker
```

### Agregar apiKey

```yaml
apiKey: sk-79970662256d425eb274fc4563d4525b # Reemplazar con tu clave API
```

Puedes encontrar y generar tu clave API en Open WebUI -> Configuración -> Cuenta -> Claves API

Deberás copiar la "Clave API" (esta comienza con sk-)

## Configuración Ejemplo

Aquí tienes un ejemplo básico de config.yaml usando Open WebUI a través de un proveedor openai. Usando Granite Code como el modelo.
Asegúrate de cargar el modelo en tus instancias de ollama previamente.

```yaml
name: Asistente Local
version: 1.0.0
schema: v1
models:
  - name: Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://TUOPENWEBUI/ollama/v1
    apiKey: sk-TU-CLAVE-API
    roles:
      - chat
      - edit

  - name: Modelo ABC de pipeline
    provider: openai
    model: PIPELINE_MODEL_ID
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://TUOPENWEBUI/api
    apiKey: sk-TU-CLAVE-API
    roles:
      - chat
      - edit

  - name: Autocompletar Granite Code
    provider: openai
    model: granite-code:latest
    env:
      useLegacyCompletionsEndpoint: false
    apiBase: http://localhost:3000/ollama/v1
    apiKey: sk-TU-CLAVE-API
    roles:
      - autocomplete

prompts:
  - name: prueba
    description: Escribir tests unitarios para el código seleccionado
    prompt: |
      Escribe un conjunto completo de tests unitarios para el código seleccionado. Debería configurar, ejecutar tests que verifiquen la corrección incluyendo casos extremos importantes, y desmontar. Asegúrate de que los tests sean completos y sofisticados. Proporciona los tests solo como resultado del chat, no edites ningún archivo.
```

¡Guarda tu `config.yaml` y eso es todo!

Ahora deberías ver tu modelo en la selección de modelos de la pestaña Continue.

Selecciona tu modelo y ahora deberías estar chateando a través de Open WebUI (y/o cualquier [pipeline](/pipelines) que hayas configurado).

Puedes hacer esto para tantos modelos como desees usar. Aunque cualquier modelo debería funcionar, deberías usar un modelo que esté diseñado para código.

Consulta la documentación de Continue para una configuración adicional, [Documentación de Continue](https://docs.continue.dev/reference/Model%20Providers/openai)
