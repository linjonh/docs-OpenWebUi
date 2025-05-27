---
sidebar_position: 1
title: "🗨️ Configuración"
---

Open Web UI admite reconocimiento de voz a texto local, en navegador y remoto.

![texto alternativo](/images/tutorials/stt/image.png)

![texto alternativo](/images/tutorials/stt/stt-providers.png)

## Proveedores de Reconocimiento de Voz a Texto en la Nube/Remotos

Actualmente se admiten los siguientes proveedores de reconocimiento de voz a texto en la nube. Las claves de API pueden configurarse como variables de entorno (OpenAI) o en la página de configuración del administrador (ambas claves).

 | Servicio  | Clave de API requerida |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI proporciona reconocimiento de voz a texto mediante el proveedor de STT integrado del navegador.

## Configurar Tu Proveedor de STT

Para configurar un proveedor de reconocimiento de voz a texto:

- Ve a la configuración del administrador.
- Elige Audio.
- Proporciona una clave de API y selecciona un modelo en el menú desplegable.

![texto alternativo](/images/tutorials/stt/stt-config.png)

## Configuraciones a Nivel de Usuario

Además de las configuraciones a nivel de instancia disponibles en el panel de administrador, también hay un par de configuraciones a nivel de usuario que pueden proporcionar funcionalidades adicionales.

* **Configuraciones de STT:** Contiene configuraciones relacionadas con la funcionalidad de reconocimiento de voz a texto.
* **Motor de Reconocimiento de Voz a Texto:** Determina el motor utilizado para el reconocimiento de voz (Predeterminado o Web API).
 

![texto alternativo](/images/tutorials/stt/user-settings.png)

## Usar STT

El reconocimiento de voz a texto ofrece una forma altamente eficiente de "escribir" indicaciones utilizando tu voz y funciona de manera robusta tanto en dispositivos de escritorio como en móviles.

Para usar STT, simplemente haz clic en el icono del micrófono:

![texto alternativo](/images/tutorials/stt/stt-operation.png)

Una forma de onda de audio en vivo indicará una captura de voz exitosa:

![texto alternativo](/images/tutorials/stt/stt-in-progress.png)

## Operación del Modo STT

Una vez que tu grabación haya comenzado, puedes:

- Hacer clic en el icono de marca para guardar la grabación (si el envío automático tras la finalización está habilitado, se enviará para completar; de lo contrario, puedes enviarlo manualmente).
- Si deseas abortar la grabación (por ejemplo, si deseas iniciar una nueva grabación), puedes hacer clic en el icono de x para salir de la interfaz de grabación.

![texto alternativo](/images/tutorials/stt/endstt.png)
