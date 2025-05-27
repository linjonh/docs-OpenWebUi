---
sidebar_position: 6
title: "📊 Monitoreando tu Open WebUI"
---

# Mantén saludable tu Open WebUI con monitoreo 🩺

Monitorear tu instancia de Open WebUI es crucial para garantizar que funcione de manera confiable, tenga un buen rendimiento y te permita identificar y resolver problemas rápidamente. Esta guía detalla tres niveles de monitoreo, desde verificaciones básicas de disponibilidad hasta pruebas detalladas de respuesta del modelo.

**¿Por qué monitorear?**

* **Garantiza el tiempo de actividad:** Detecta proactivamente interrupciones y fallos en el servicio.
* **Información sobre el rendimiento:** Rastrea tiempos de respuesta e identifica posibles cuellos de botella.
* **Detección temprana de problemas:** Identifica problemas antes de que impacten significativamente a los usuarios.
* **Tranquilidad:** Obtén la confianza de que tu instancia de Open WebUI está funcionando sin problemas.

## 🚦 Niveles de monitoreo

Cubriremos tres niveles de monitoreo, progresando de lo básico a lo más completo:

1. **Chequeo básico de salud:** Verifica si el servicio de Open WebUI está en funcionamiento y respondiendo.
2. **Chequeo de conectividad del modelo:** Confirma que Open WebUI puede conectarse y listar tus modelos configurados.
3. **Pruebas de respuesta del modelo (Chequeo de salud profundo):** Garantiza que los modelos puedan procesar solicitudes y generar respuestas realmente.

## Nivel 1: Chequeo básico de salud con endpoint ✅

El nivel más sencillo de monitoreo es verificar el endpoint `/health`. Este endpoint es accesible públicamente (sin necesidad de autenticación) y devuelve un código de estado `200 OK` cuando el servicio de Open WebUI está funcionando correctamente.

**Cómo probar:**

Puedes usar `curl` o cualquier cliente HTTP para verificar este endpoint:

```bash
   # Chequeo básico de salud - no se necesita autenticación
   curl https://tu-instancia-open-webui/health
```

**Resultado esperado:** Un chequeo exitoso devolverá un código de estado HTTP `200 OK`. El contenido del cuerpo de la respuesta generalmente no es importante para un chequeo básico de salud.

### Usando Uptime Kuma para chequeos básicos de salud 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) es una herramienta fantástica, de código abierto y fácil de usar para monitoreo de tiempo de actividad alojada por ti mismo. Es muy recomendable para monitorear Open WebUI.

**Pasos para configurar en Uptime Kuma:**

1. **Agregar un nuevo monitor:** En tu panel de Uptime Kuma, haz clic en "Add New Monitor".
2. **Configurar ajustes del monitor:**
   * **Tipo de monitor:** Selecciona "HTTP(s)".
   * **Nombre:** Asigna un nombre descriptivo a tu monitor, por ejemplo, "Chequeo de salud Open WebUI".
   * **URL:** Ingresa la URL del endpoint de chequeo de salud: `http://tu-instancia-open-webui:8080/health` (Reemplaza `tu-instancia-open-webui:8080` con la dirección y puerto reales de tu Open WebUI).
   * **Intervalo de monitoreo:** Establece la frecuencia de las comprobaciones (ejemplo: `60 segundos` cada minuto).
   * **Recuento de reintentos:** Configura el número de reintentos antes de considerar el servicio como caído (ejemplo: `3` reintentos).

**Qué verifica este chequeo:**

* **Disponibilidad del servidor web:** Garantiza que el servidor web (ejemplo: Nginx, Uvicorn) esté respondiendo a solicitudes.
* **Aplicación en ejecución:** Confirma que la aplicación de Open WebUI está funcionando e inicializada.
* **Conectividad básica a la base de datos:** Por lo general, incluye una verificación básica para asegurarse de que la aplicación pueda conectarse a la base de datos.

## Nivel 2: Conectividad de modelo Open WebUI 🔗

Para ir más allá de la disponibilidad básica, puedes monitorear el endpoint `/api/models`. Este endpoint **requiere autenticación** y verifica que Open WebUI pueda comunicarse exitosamente con tus proveedores de modelo configurados (ejemplo: Ollama, OpenAI) y recuperar una lista de modelos disponibles.

**¿Por qué monitorear la conectividad del modelo?**

* **Problemas con el proveedor de modelos:** Detecta problemas con los servicios de tus proveedores de modelos (ejemplo: interrupciones de API, fallos de autenticación).
* **Errores de configuración:** Identifica errores de configuración en los ajustes del proveedor de modelos dentro de Open WebUI.
* **Garantiza la disponibilidad de modelos:** Confirma que los modelos que esperas estén disponibles sean realmente accesibles desde Open WebUI.

**Detalles del endpoint API:**

Consulta la [documentación API de Open WebUI](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models) para detalles completos sobre el endpoint `/api/models` y su estructura de respuesta.

**Cómo probar con `curl` (Autenticado):**

Necesitarás una clave API para acceder a este endpoint. Consulta la sección "Configuración de autenticación" abajo para instrucciones sobre cómo generar una clave API.

```bash
   # Chequeo autenticado de conectividad de modelos
   curl -H "Authorization: Bearer TU_CLAVE_API" https://tu-instancia-open-webui/api/models
```

*(Reemplaza `TU_CLAVE_API` con tu clave API actual y `tu-instancia-open-webui` con la dirección de tu Open WebUI.)*

**Resultado esperado:** Una solicitud exitosa devolverá un código de estado `200 OK` y una respuesta JSON que contiene una lista de modelos.

### Configuración de autenticación para clave API 🔑

Antes de poder monitorear el endpoint `/api/models`, necesitas habilitar claves API en Open WebUI y generar una:

1. **Habilitar claves API (se requiere administrador):**
   * Inicia sesión en Open WebUI como administrador.
   * Ve a **Configuración de Administración** (normalmente en el menú de la esquina superior derecha) > **General**.
   * Encuentra la opción "Habilitar Clave API" y **actívala**.
   * Haz clic en **Guardar Cambios**.

2. **Generar una Clave API (Configuraciones de Usuario):**
   * Ve a tus **Configuraciones de Usuario** (normalmente haciendo clic en el icono de tu perfil en la esquina superior derecha).
   * Navega a la sección **Cuenta**.
   * Haz clic en **Generar Nueva Clave API**.
   * Asigna un nombre descriptivo a la clave API (por ejemplo, "Clave API de Monitoreo").
   * **Copia la clave API generada** y guárdala de forma segura. La necesitarás para tu configuración de monitoreo.

   *(Opcional pero Recomendado):* Por mejores prácticas de seguridad, considera crear una cuenta de usuario **no administrador** específicamente para el monitoreo y genera una clave API para ese usuario. Esto limita el impacto potencial si la clave API de monitoreo es comprometida.

   *Si no ves la opción de generación de clave API en tus configuraciones, contacta al administrador de Open WebUI para asegurarte de que las claves API estén habilitadas.*

### Usar Uptime Kuma para el Monitoreo de Conectividad del Modelo 🐻

1. **Crear un Nuevo Monitor en Uptime Kuma:**
   * Tipo de Monitor: "HTTP(s) - Consulta JSON".
   * Nombre: "Comprobación de Conectividad de Modelo Open WebUI".
   * URL: `http://tu-instancia-open-webui:8080/api/models` (Reemplázalo con tu URL).
   * Método: "GET".
   * Código de Estado Esperado: `200`.

2. **Configurar Consulta JSON (Verificar Lista de Modelos):**
   * **Consulta JSON:**  `$count(data[*])>0`
     * **Explicación:** Esta consulta JSONata verifica si la matriz `data` en la respuesta de la API (que contiene la lista de modelos) tiene un conteo mayor que 0. En otras palabras, verifica que al menos un modelo sea devuelto.
   * **Valor Esperado:** `true` (La consulta debería devolver `true` si los modelos están listados).

3. **Agregar Encabezados de Autenticación:**
   * En la sección "Headers" de la configuración del monitor de Uptime Kuma, haz clic en "Agregar Encabezado".
   * **Nombre del Encabezado:** `Authorization`
   * **Valor del Encabezado:** `Bearer TU_CLAVE_API` (Reemplaza `TU_CLAVE_API` con la clave API que generaste).

4. **Establecer Intervalo de Monitoreo:** Intervalo recomendado: `300 segundos` (5 minutos) o más, ya que las listas de modelos típicamente no cambian con gran frecuencia.

**Consultas JSON Alternativas (Avanzado):**

Puedes usar consultas JSONata más específicas para verificar modelos o proveedores particulares. Aquí hay algunos ejemplos:

* **Verificar al menos un modelo Ollama:** `$count(data[owned_by='ollama'])>0`
* **Verificar si existe un modelo específico (por ejemplo, 'gpt-4o'):** `$exists(data[id='gpt-4o'])`
* **Verificar si existen múltiples modelos específicos (por ejemplo, 'gpt-4o' y 'gpt-4o-mini'):** `$count(data[id in ['gpt-4o', 'gpt-4o-mini']]) = 2`

Puedes probar y refinar tus consultas JSONata en [jsonata.org](https://try.jsonata.org/) utilizando una muestra de respuesta de API para asegurarte de que funcionen como se espera.

## Nivel 3: Pruebas de Respuesta de Modelo (Verificación Profunda de Salud) 🤖

Para el monitoreo más completo, puedes probar si los modelos realmente son capaces de procesar solicitudes y generar respuestas. Esto involucra enviar una solicitud de completación de chat simple al endpoint `/api/chat/completions`.

**¿Por qué Probar Respuestas de Modelo?**

* **Verificación de Fin a Fin:** Confirma que toda la canalización del modelo está funcionando, desde la solicitud de API hasta la respuesta del modelo.
* **Problemas de Carga del Modelo:** Detecta problemas con modelos específicos que pueden fallar al cargarse o responder.
* **Errores de Procesamiento en el Backend:** Atrapa errores en la lógica del backend que podrían prevenir que los modelos generen completaciones.

**Cómo Probar con `curl` (Solicitud POST Autenticada):**

Esta prueba requiere una clave API y envía una solicitud POST con un mensaje simple al endpoint de completaciones de chat.

```bash
# Probar respuesta del modelo - solicitud POST autenticada
curl -X POST https://tu-instancia-open-webui/api/chat/completions \
  -H "Authorization: Bearer TU_CLAVE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Responde con la palabra SALUDABLE"}],
    "model": "llama3.1",  # Reemplazar con un modelo que esperes que esté disponible
    "temperature": 0      # Establecer temperatura en 0 para respuestas consistentes
  }'
```

*(Reemplaza `TU_CLAVE_API`, `tu-instancia-open-webui` y `llama3.1` con tus valores reales.)*

**Salida Esperada:** Una solicitud exitosa devolverá un código de estado `200 OK` y una respuesta JSON que contiene una completación de chat. Puedes verificar que la respuesta incluya la palabra "SALUDABLE" (o una respuesta similar esperada según tu solicitud).

**Configurar el Nivel 3 de Monitoreo en Uptime Kuma implicaría configurar un monitor HTTP(s) con una solicitud POST, cuerpo JSON, encabezados de autenticación y posiblemente una consulta JSON para validar el contenido de la respuesta. Esto es una configuración más avanzada y puede personalizarse según tus necesidades específicas.**

Implementando estos niveles de monitoreo, puedes garantizar proactivamente la salud, fiabilidad y rendimiento de tu instancia de Open WebUI, proporcionando una experiencia consistentemente positiva para los usuarios.
