---
sidebar_position: 4
title: "🗨️ Compartir Chats"
---

### Activar Compartición Comunitaria

Para activar la compartición comunitaria, sigue estos pasos:

1. Ve a la página del **Panel de Administración** como **Administrador**.
2. Haz clic en la pestaña de **Configuración**.
3. Activa **Habilitar Compartición Comunitaria** dentro de la pestaña de configuración **General**.

:::note
**Nota:** Solo los Administradores pueden activar la opción **Habilitar Compartición Comunitaria**. Si esta opción está deshabilitada, ni los usuarios ni los Administradores verán la opción **Compartir con la Comunidad Open WebUI** para compartir sus chats. La compartición comunitaria debe ser habilitada por un Administrador para que los usuarios puedan compartir chats con la comunidad de Open WebUI.
:::

Esto activará la compartición comunitaria para todos los usuarios en tu instancia de Open WebUI.

### Compartir Chats

Para compartir un chat:

1. Selecciona la conversación de chat que deseas compartir.
2. Haz clic en los 3 puntos que aparecen al posar el cursor del ratón sobre el chat deseado.
3. Luego haz clic en la opción **Compartir**.
4. Selecciona **Compartir con la Comunidad Open WebUI** (si el **Administrador** ha activado **Habilitar Compartición Comunitaria**) o **Copiar Enlace**.

#### Compartir con la Comunidad Open WebUI

Cuando seleccionas `Compartir con la Comunidad Open WebUI`:

* Se abrirá una nueva pestaña que te permitirá subir tu chat como un instantáneo en el sitio web de la comunidad Open WebUI (https://openwebui.com/chats/upload).
* Puedes controlar quién puede ver tu chat subido escogiendo entre las siguientes configuraciones de acceso:
  * **Privado**: Solo tú puedes acceder a este chat.
  * **Público**: Cualquier persona en internet puede ver los mensajes mostrados en el instantáneo del chat.
  * **Público, Historial Completo**: Cualquier persona en internet puede ver el historial completo de regeneración de tu chat.

:::note
Nota: Puedes cambiar el nivel de permiso de tus chats compartidos en la plataforma comunitaria en cualquier momento desde tu cuenta en openwebui.com.

**Actualmente, los chats compartidos en el sitio web comunitario no se pueden encontrar mediante búsqueda. Sin embargo, se planean futuras actualizaciones para permitir que los chats públicos sean descubiertos por el público si su permiso está configurado como `Público` o `Público, Historial Completo`.**
:::

Ejemplo de un chat compartido en el sitio web de la plataforma comunitaria: https://openwebui.com/c/iamg30/5e3c569f-905e-4d68-a96d-8a99cc65c90f

#### Copiar un Enlace de Compartición

Cuando seleccionas `Copiar Enlace`, se genera un enlace único que puede ser compartido con otros.

**Consideraciones Importantes:**

* El chat compartido solo incluirá los mensajes que existían en el momento en que se creó el enlace. Cualquier mensaje nuevo enviado dentro del chat después de que se genere el enlace no será incluido, a menos que el enlace sea eliminado y actualizado con uno nuevo.
* El enlace generado actúa como un instantáneo estático del chat en el momento en que se generó.
* Para ver el chat compartido, los usuarios deben:
  1. Tener una cuenta en la instancia de Open WebUI donde se generó el enlace.
  2. Haber iniciado sesión en su cuenta en esa instancia.
* Si un usuario intenta acceder al enlace compartido sin haber iniciado sesión, será redirigido a la página de inicio de sesión para que inicie sesión antes de poder ver el chat compartido.

### Ver Chats Compartidos

Para ver un chat compartido:

1. Asegúrate de haber iniciado sesión en una cuenta en la instancia de Open WebUI donde se compartió el chat.
2. Haz clic en el enlace compartido que te proporcionaron.
3. El chat se mostrará en un formato de solo lectura.
4. Si el Administrador de la instancia de Open WebUI desde la cual se compartió el enlace compartido tiene habilitada la función de Texto a Voz, puede haber un botón de audio para que los mensajes sean leídos en voz alta (situacional).

### Actualizar Chats Compartidos

Para actualizar un chat compartido:

1. Selecciona la conversación de chat que deseas compartir.
2. Haz clic en los 3 puntos que aparecen al posar el cursor del ratón sobre el chat deseado.
3. Haz clic en la opción **Compartir**.
4. El Modal de **Compartir Chat** debería lucir diferente si ya has compartido un chat antes.

El Modal de **Compartir Chat** incluye las siguientes opciones:

* **antes**: Abre una nueva pestaña para ver el chat compartido previamente desde el enlace compartido.
* **eliminar este enlace**: Elimina el enlace compartido del chat y presenta el modal inicial de compartir chat.
* **Compartir con la Comunidad Open WebUI**: Abre una nueva pestaña para https://openwebui.com/chats/upload con el chat listo para ser compartido como un instantáneo.
* **Actualizar y Copiar Enlace**: Actualiza el instantáneo del chat del enlace compartido previamente y lo copia en el portapapeles de tu dispositivo.

### Eliminar Chats Compartidos

Para eliminar un enlace de un chat compartido:

1. Selecciona la conversación de chat para la que deseas eliminar el enlace compartido.
2. Haz clic en los 3 puntos que aparecen al posar el cursor del ratón sobre el chat deseado.
3. Haz clic en la opción **Compartir**.
4. El Modal de **Compartir Chat** debería lucir diferente si ya has compartido un chat antes.
5. Haz clic en **eliminar este enlace**.

Una vez eliminado, el enlace compartido ya no será válido, y los usuarios no podrán ver el chat compartido.

:::note
**Nota:** Los chats compartidos en la plataforma comunitaria no pueden ser eliminados. Para cambiar el nivel de acceso de un chat compartido en la plataforma comunitaria:
:::

1. Inicia sesión en tu cuenta de Open WebUI en openwebui.com.
2. Haz clic en tu nombre de usuario en la parte superior derecha del sitio web.
3. Haz clic en **Chats**.
4. Haz clic en el chat al que deseas cambiar los permisos de acceso.
5. Desplázate hasta la parte inferior del chat y actualiza su nivel de permisos.
6. Haz clic en el botón **Actualizar Chat**.
