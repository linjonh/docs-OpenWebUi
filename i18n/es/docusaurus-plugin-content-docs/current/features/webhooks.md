---
sidebar_position: 17
title: "🪝 Integraciones de Webhook"
---

Descripción general
--------

Open WebUI ofrece una característica de webhook que te permite recibir notificaciones automáticamente cada vez que se registren nuevos usuarios en tu instancia. Esto se realiza proporcionando una URL de webhook a Open WebUI, que enviará notificaciones a esa URL cuando se cree una nueva cuenta de usuario.

Configuración de Webhooks en Open WebUI
---------------------------------

Necesitarás obtener una URL de webhook de un servicio externo que soporte webhooks, como un canal de Discord o un espacio de trabajo Slack. Esta URL será utilizada para recibir notificaciones de Open WebUI.

Para configurar webhooks en Open WebUI, tienes dos opciones:

### Opción 1: Configurar a través de la interfaz de administrador

1. Inicia sesión en tu instancia de Open WebUI como administrador.
2. Navega al `Panel de Administración`.
3. Haz clic en la pestaña `Configuraciones` ubicada en la parte superior.
4. Desde allí, navega a la sección `General` de configuración en el panel de administración.
5. Localiza el campo `URL de Webhook` e ingresa la URL del webhook.
6. Guarda los cambios.

### Opción 2: Configurar a través de Variables de Entorno

Alternativamente, puedes configurar la URL del webhook configurando la variable de entorno `WEBHOOK_URL`. Para más información sobre variables de entorno en Open WebUI, consulta [Configuración de Variables de Entorno](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url).

### Paso 3: Verificar el Webhook

Para verificar que el webhook está funcionando correctamente, crea una nueva cuenta de usuario en Open WebUI. Si el webhook está configurado correctamente, deberías recibir una notificación en la URL del webhook especificada.

Formato del Payload del Webhook
----------------------

El payload del webhook enviado por Open WebUI está en texto plano y contiene un mensaje de notificación simple sobre la nueva cuenta de usuario. El formato del payload es el siguiente:

```
Nuevo usuario registrado: <username>
```

Por ejemplo, si un usuario llamado "Tim" se registra, el payload enviado sería:

```
Nuevo usuario registrado: Tim
```

Resolución de problemas
--------------

* Asegúrate de que la URL del webhook sea correcta y esté correctamente formateada.
* Verifica que el servicio de webhook esté habilitado y configurado correctamente.
* Revisa los registros de Open WebUI para detectar cualquier error relacionado con el webhook.
* Verifica que la conexión no haya sido interrumpida o bloqueada por un firewall o proxy.
* El servidor del webhook podría estar temporalmente no disponible o enfrentando alta latencia.
* Si se proporciona a través del servicio de webhook, verifica si la clave API del webhook es inválida, está expirada o revocada.

Nota: La característica de webhook en Open WebUI sigue evolucionando, y planeamos agregar más funcionalidades y tipos de eventos en el futuro.
