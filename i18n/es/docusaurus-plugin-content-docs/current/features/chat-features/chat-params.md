---
sidebar_position: 4
title: "⚙️ Parámetros del Chat"
---

Dentro de Open WebUI, hay tres niveles para configurar un **Prompt del Sistema** y **Parámetros Avanzados**: por chat, por modelo y por cuenta. Este sistema jerárquico permite flexibilidad al tiempo que mantiene una administración y control estructurados.

## Diagrama de Jerarquía de Prompt del Sistema y Parámetros Avanzados

| **Nivel** | **Definición** | **Permisos de Modificación** | **Capacidades de Sobrescritura** |
| --- | --- | --- | --- |
| **Por Chat** | Prompt del sistema y parámetros avanzados para una instancia de chat específica | Los usuarios pueden modificar, pero no pueden sobrescribir la configuración específica del modelo | Restringido para sobrescribir la configuración específica del modelo |
| **Por Cuenta** | Prompt del sistema y parámetros avanzados predeterminados para una cuenta de usuario específica | Los usuarios pueden configurar, pero pueden ser sobrescritos por configuraciones específicas del modelo | La configuración del usuario puede ser sobrescrita por la configuración específica del modelo |
| **Por Modelo** | Prompt del sistema y parámetros avanzados predeterminados para un modelo específico | Los administradores pueden configurar, los usuarios no pueden modificar | Las configuraciones específicas de administrador tienen prioridad, y las configuraciones de usuario pueden ser sobrescritas |

### 1. **Por chat:**

- **Descripción**: La configuración por chat se refiere al prompt del sistema y parámetros avanzados configurados para una instancia de chat específica. Esta configuración solo se aplica a la conversación actual y no afecta a futuros chats.
- **Cómo configurar**: Los usuarios pueden modificar el prompt del sistema y los parámetros avanzados de una instancia de chat específica dentro de la sección **Controles del Chat** en la barra lateral derecha de Open WebUI.
- **Capacidades de sobrescritura**: Los usuarios tienen restringido sobrescribir el **Prompt del Sistema** o parámetros **Avanzados** específicos ya configurados por un administrador a nivel de modelo (**#2**). Esto asegura consistencia y adhesión a configuraciones específicas del modelo.

<details>
<summary>Ejemplo de Caso de Uso</summary>
:::tip **Por chat:**
Supongamos que un usuario desea configurar un prompt del sistema personalizado para una conversación específica. Puede hacerlo accediendo a la sección **Controles del Chat** y modificando el campo **Prompt del Sistema**. Estos cambios solo se aplicarán a la sesión de chat actual.
:::
</details>

### 2. **Por cuenta:**

- **Descripción**: La configuración por cuenta se refiere al prompt del sistema predeterminado y parámetros avanzados configurados para una cuenta de usuario específica. Cualquier cambio específico del usuario puede servir como respaldo en situaciones donde no se hayan definido configuraciones de nivel inferior.
- **Cómo configurar**: Los usuarios pueden configurar su propio prompt del sistema y parámetros avanzados para su cuenta dentro de la sección **General** del menú **Ajustes** en Open WebUI.
- **Capacidades de sobrescritura**: Los usuarios tienen la capacidad de configurar su propio prompt del sistema en su cuenta, pero deben tener en cuenta que dichos parámetros aún pueden ser sobrescritos si un administrador ya configuró el **Prompt del Sistema** o parámetros **Avanzados** específicos en una base por modelo para el modelo particular que se está utilizando.

<details>
<summary>Ejemplo de Caso de Uso</summary>
:::tip **Por cuenta:**
Supongamos que un usuario desea configurar su propio prompt del sistema para su cuenta. Puede hacerlo accediendo al menú **Ajustes** y modificando el campo **Prompt del Sistema**.
:::
</details>

### 3. **Por modelo:**

- **Descripción**: La configuración por modelo se refiere al prompt del sistema predeterminado y parámetros avanzados configurados para un modelo específico. Estas configuraciones son aplicables a todas las instancias de chat que utilizan ese modelo.
- **Cómo configurar**: Los administradores pueden configurar el prompt del sistema predeterminado y los parámetros avanzados para un modelo específico dentro de la sección **Modelos** del **Espacio de Trabajo** en Open WebUI.
- **Capacidades de sobrescritura**: Las cuentas de **Usuario** tienen restringido modificar el **Prompt del Sistema** o parámetros **Avanzados** específicos a nivel de modelo (**#3**). Esta restricción previene que los usuarios alteren inadecuadamente las configuraciones predeterminadas.
- **Preservación de la longitud del contexto:** Cuando el **Prompt del Sistema** o parámetros **Avanzados** de un modelo son configurados manualmente en la sección **Espacio de Trabajo** por un **Administrador**, dicho **Prompt del Sistema** o parámetros **Avanzados** configurados manualmente no pueden ser sobrescritos ni ajustados a nivel por cuenta en la sección **General** o en los **Controles del Chat** por una cuenta de **Usuario**. Esto asegura consistencia y previene recargas excesivas del modelo cuando cambia la configuración de longitud de contexto del usuario.
- **Precedencia del modelo:** Si un **Prompt del Sistema** o un parámetro **Avanzado** de un modelo está preconfigurado en la sección Espacio de Trabajo por un **Administrador**, cualquier cambio de longitud de contexto realizado por una cuenta de **Usuario** en la sección **General** o en **Controles del Chat** será ignorado, manteniendo el valor preconfigurado para ese modelo. Se advierte que los parámetros que no hayan sido configurados por una cuenta de **Administrador** aún pueden ser ajustados manualmente por una cuenta de **Usuario** a nivel por cuenta o por chat.

<details>
<summary>Ejemplo de Caso de Uso</summary>
:::tip **Por modelo**:
Supongamos que un administrador quiere configurar un mensaje del sistema predeterminado para un modelo específico. Puede hacerlo accediendo a la sección **Modelos** y modificando el campo **Mensaje del Sistema** para el modelo correspondiente. Todas las instancias de chat que usen este modelo utilizarán automáticamente el mensaje del sistema y los parámetros avanzados del modelo.
:::
</details>


## **Optimizar Configuración del Mensaje del Sistema para Máxima Flexibilidad**

:::tip **Consejos Adicionales**
**Este consejo aplica tanto para administradores como para cuentas de usuario. Para lograr la máxima flexibilidad con tus mensajes del sistema, recomendamos considerar la siguiente configuración:**

- Asigna tu principal Mensaje del Sistema (**es decir, para darle al LLM un carácter definitorio**) que deseas usar en el campo **Mensaje del Sistema** en las configuraciones **Generales**. Esto lo establece a nivel de cuenta y permite que funcione como el mensaje del sistema para todos tus LLM sin necesidad de ajustes dentro de un modelo en la sección **Espacio de Trabajo**.

- Para tu Mensaje del Sistema secundario (**es decir, para asignar una tarea al LLM**), elige si colocarlo en el campo **Mensaje del Sistema** dentro de la barra lateral **Controles del Chat** (en base a cada chat) o en la sección **Modelos** de la sección **Espacio de Trabajo** (en base a cada modelo) para administradores, permitiéndote configurarlos directamente. Esto permite que el mensaje del sistema a nivel de cuenta pueda funcionar en conjunto con el mensaje del sistema a nivel de chat proporcionado por **Controles del Chat**, o con el mensaje del sistema a nivel de modelo proporcionado por **Modelos**.

- Como administrador, deberías asignar los parámetros de tu LLM en base a cada modelo usando la sección **Modelos** para una flexibilidad óptima. Para ambos Mensajes del Sistema secundarios, asegúrate de configurarlos de una manera que maximice la flexibilidad y minimice los ajustes requeridos en diferentes instancias de cuenta o de chat. Es esencial que tanto tu cuenta de administrador como todas las cuentas de usuario comprendan el orden de prioridad por el cual los mensajes del sistema dentro de **Controles del Chat** y la sección **Modelos** serán aplicados al **LLM**.
:::
