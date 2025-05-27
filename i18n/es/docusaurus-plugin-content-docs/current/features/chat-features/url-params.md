---
sidebar_position: 5
title: "🔗 Parámetros de URL"
---

En Open WebUI, las sesiones de chat se pueden personalizar a través de varios parámetros de URL. Estos parámetros permiten configurar ajustes específicos, habilitar funciones y definir configuraciones de modelos para cada sesión de chat. Este enfoque proporciona flexibilidad y control sobre las sesiones de chat individuales directamente desde la URL.

## Descripción general de los parámetros de URL

La siguiente tabla enumera los parámetros de URL disponibles, su función y ejemplos de uso.

| **Parámetro**      | **Descripción**                                                                  | **Ejemplo**                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | Especifica los modelos a usar, como una lista separada por comas.                | `/?models=model1,model2`         |
| `model`            | Especifica un único modelo para usar en la sesión de chat.                       | `/?model=model1`                 |
| `youtube`          | Especifica un ID de video de YouTube para transcribir dentro del chat.           | `/?youtube=VIDEO_ID`             |
| `web-search`       | Habilita la funcionalidad de búsqueda web si se establece como `true`.           | `/?web-search=true`              |
| `tools` o `tool-ids` | Especifica una lista separada por comas de IDs de herramientas para activar en el chat. | `/?tools=tool1,tool2`            |
| `call`             | Habilita una superposición de llamada si se establece como `true`.               | `/?call=true`                    |
| `q`                | Configura una consulta o mensaje inicial para el chat.                           | `/?q=Hello%20there`              |
| `temporary-chat`   | Marca el chat como temporal si se establece como `true`, para sesiones de una sola vez. | `/?temporary-chat=true`          |

### 1. **Modelos y selección de modelos**

- **Descripción**: Los parámetros `models` y `model` permiten especificar qué [modelos de lenguaje](/features/workspace/models.md) deben usarse para una sesión de chat en particular.
- **Cómo configurarlo**: Puedes usar `models` para múltiples modelos o `model` para un solo modelo.
- **Ejemplo**:
  - `/?models=model1,model2` – Esto inicializa el chat con `model1` y `model2`.
  - `/?model=model1` – Esto establece `model1` como el único modelo para el chat.

### 2. **Transcripción de YouTube**

- **Descripción**: El parámetro `youtube` toma un ID de video de YouTube, habilitando que el chat transcriba el video especificado.
- **Cómo configurarlo**: Usa el ID del video de YouTube como valor para este parámetro.
- **Ejemplo**: `/?youtube=VIDEO_ID`
- **Comportamiento**: Esto activa la funcionalidad de transcripción dentro del chat para el video de YouTube proporcionado.

### 3. **Búsqueda Web**

- **Descripción**: Habilitar `web-search` permite que la sesión de chat acceda a la funcionalidad de [búsqueda web](/category/-web-search).
- **Cómo configurarlo**: Establece este parámetro como `true` para habilitar la búsqueda web.
- **Ejemplo**: `/?web-search=true`
- **Comportamiento**: Si está habilitado, el chat puede recuperar resultados de búsqueda web como parte de sus respuestas.

### 4. **Selección de herramientas**

- **Descripción**: Los parámetros `tools` o `tool-ids` especifican qué [herramientas](/features/plugin/tools) activar dentro del chat.
- **Cómo configurarlo**: Proporciona una lista separada por comas de IDs de herramientas como el valor del parámetro.
- **Ejemplo**: `/?tools=tool1,tool2` o `/?tool-ids=tool1,tool2`
- **Comportamiento**: Cada ID de herramienta se activa dentro de la sesión para la interacción del usuario.

### 5. **Superposición de llamada**

- **Descripción**: El parámetro `call` habilita una superposición de video o llamada en la interfaz del chat.
- **Cómo configurarlo**: Configura el parámetro como `true` para habilitar la superposición de llamada.
- **Ejemplo**: `/?call=true`
- **Comportamiento**: Activa una superposición de interfaz de llamada, permitiendo características como transcripción en vivo e ingreso de video.

### 6. **Consulta inicial**

- **Descripción**: El parámetro `q` permite configurar una consulta o mensaje inicial para el chat.
- **Cómo configurarlo**: Especifica el texto de la consulta o mensaje como valor del parámetro.
- **Ejemplo**: `/?q=Hello%20there`
- **Comportamiento**: El chat comienza con el mensaje especificado, enviándolo automáticamente como el primer mensaje.

### 7. **Sesiones de chat temporales**

- **Descripción**: El parámetro `temporary-chat` marca el chat como una sesión temporal. Esto puede limitar características como guardar el historial de chat o aplicar configuraciones persistentes.
- **Cómo configurarlo**: Configura este parámetro como `true` para una sesión de chat temporal.
- **Ejemplo**: `/?temporary-chat=true`
- **Comportamiento**: Esto inicia una sesión de chat desechable sin guardar el historial ni aplicar configuraciones avanzadas.

<details>
<summary>Ejemplo de caso de uso</summary>
:::tip **Sesión de chat temporal**
Supongamos que un usuario quiere iniciar una sesión de chat rápida sin guardar el historial. Puede hacerlo configurando `temporary-chat=true` en la URL. Esto proporciona un entorno de chat desechable ideal para interacciones únicas.
:::
</details>

## Usar múltiples parámetros juntos

Estos parámetros de URL pueden combinarse para crear sesiones de chat altamente personalizadas. Por ejemplo:

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hola%20ahí&temporary-chat=true
```

Esta URL hará lo siguiente:

- Iniciar el chat con `model1` y `model2`.
- Habilitar la transcripción de YouTube, la búsqueda web y las herramientas especificadas.
- Mostrar una superposición de llamada.
- Establecer una entrada inicial de "Hola ahí."
- Marcar el chat como temporal, evitando que se guarde el historial.
