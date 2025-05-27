---
sidebar_position: 5
title: "🛠️ Guía de Desarrollo Local"
---

# ¿Listo para contribuir a Open WebUI? ¡Comencemos! 🚀

¿Entusiasmado por sumergirte en el desarrollo de Open WebUI? Esta guía completa te llevará rápidamente por el proceso de configurar tu **entorno de desarrollo local** de manera fácil. Ya seas un desarrollador con experiencia o estés comenzando, te ayudaremos a realizar ajustes en el frontend, mejorar el backend y contribuir al futuro de Open WebUI. ¡Vamos a configurar tu entorno de desarrollo con pasos simples y detallados!

## Requisitos Previos

Antes de comenzar, asegúrate de que tu sistema cumpla con los siguientes requisitos mínimos:

- **Sistema Operativo:** Linux (o WSL en Windows), Windows 11, o macOS. *(Recomendado para mejor compatibilidad)*
- **Python:** Versión **3.11 o superior**. *(Requerido para servicios backend)*
- **Node.js:** Versión **22.10 o superior**. *(Requerido para el desarrollo del frontend)*
- **IDE (Recomendado):** Recomendamos usar un IDE como [VSCode](https://code.visualstudio.com/) para edición de código, depuración y acceso a la terminal integrada. ¡Si tienes un IDE favorito, siéntete libre de usarlo!
- **[Opcional] GitHub Desktop:** Para una gestión más sencilla del repositorio Git, especialmente si no estás familiarizado con Git en línea de comandos, considera instalar [GitHub Desktop](https://desktop.github.com/).

## Configurando tu Entorno Local

Configuraremos tanto el frontend (interfaz de usuario) como el backend (API y lógica del servidor) de Open WebUI.

### 1. Clonar el Repositorio

Primero, utiliza `git clone` para descargar el repositorio de Open WebUI en tu máquina local. Esto creará una copia local del proyecto en tu computadora.

1. **Abre tu terminal** (o Git Bash si estás en Windows y usas Git Bash).
2. **Navega al directorio** donde deseas almacenar el proyecto Open WebUI.
3. **Clona el repositorio:** Ejecuta el siguiente comando:

```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

   El comando `git clone` descarga los archivos del proyecto desde GitHub. El comando `cd open-webui` te lleva al directorio recién creado del proyecto.

### 2. Configuración del Frontend (Interfaz de Usuario)

Primero configuraremos la interfaz de usuario (lo que ves en tu navegador):

1. **Configura las Variables de Entorno:**
   - Copia el archivo de entorno de ejemplo a `.env`:

     ```bash
     cp -RPp .env.example .env
     ```

     Este comando copia el archivo `.env.example` a un nuevo archivo llamado `.env`. El archivo `.env` es donde configurarás las variables de entorno para el frontend.

   - **Personaliza `.env`**: Abre el archivo `.env` en tu editor de código (como VSCode). Este archivo contiene variables de configuración para el frontend, como endpoints de API y otros ajustes. Para el desarrollo local, la configuración predeterminada en `.env.example` generalmente es suficiente para comenzar. Sin embargo, puedes personalizarlas si es necesario.

  **Importante:** No comprometas información sensible en `.env` si planeas contribuir de vuelta al repositorio.

1. **Instala las Dependencias del Frontend:**
   - **Navega al directorio del frontend:** Si aún no estás en la raíz del proyecto (directorio `open-webui`), asegúrate de estar allí.

     ```bash
     # Si no estás en la raíz del proyecto, ejecuta:
     cd open-webui
     ```

   - Instala los paquetes necesarios de JavaScript:

     ```bash
     npm install
     ```

     Este comando utiliza `npm` (Node Package Manager) para leer el archivo `package.json` en la raíz del proyecto y descargar todas las bibliotecas y herramientas necesarias de JavaScript para que funcione el frontend. Esto puede tardar algunos minutos dependiendo de tu conexión a Internet.

2. **Inicia el Servidor de Desarrollo del Frontend:**

     ```bash
     npm run dev
     ```

     Este comando lanza el servidor de desarrollo del frontend. Si los pasos se siguieron correctamente, usualmente indicará que el servidor está funcionando y proporcionará una URL local.

     🎉 **Accede al Frontend:** Abre tu navegador web y visita [http://localhost:5173](http://localhost:5173). Deberías ver un mensaje indicando que el frontend de Open WebUI está en funcionamiento y esperando que el backend esté disponible. ¡No te preocupes por ese mensaje todavía! Vamos a configurar el backend a continuación. **Mantén esta terminal abierta** – está sirviendo tu frontend.

### 3. Configuración del Backend (API y Servidor)

Para una experiencia de desarrollo más fluida, **recomendamos encarecidamente** usar instancias de terminal separadas para tus procesos de frontend y backend. Esto mantiene tus flujos de trabajo organizados y facilita la gestión independiente de cada parte de la aplicación.

**¿Por qué Terminales Separadas?**

- **Aislamiento de Procesos:** Los servidores de desarrollo de frontend y backend son programas distintos. Ejecutarlos en terminales separadas asegura que no interfieran entre sí y permite reinicios o paradas independientes.
- **Registros y Salida Más Claros:** Cada terminal mostrará los registros y salidas específicos tanto del frontend como del backend. Esto facilita la depuración y el monitoreo, ya que no tendrás que buscar en registros entrelazados.
- **Menor Desorden en el Terminal:** Mezclar comandos de frontend y backend en un solo terminal puede ser confuso. Los terminales separados mantienen tu historial de comandos y procesos activos organizados.
- **Eficiencia Mejorada en el Flujo de Trabajo:** Puedes trabajar en tareas de frontend (como ejecutar `npm run dev`) en un terminal y simultáneamente gestionar tareas de backend (como iniciar el servidor o verificar los registros) en otro, sin tener que cambiar de contexto constantemente dentro de un solo terminal.

**Usar Terminales Integrados en VSCode (Recomendado):**

La función de terminal integrado de VSCode hace que la gestión de múltiples terminales sea increíblemente sencilla. Aquí te mostramos cómo aprovecharla para separar el frontend y el backend:

1. **Terminal de Frontend (Probablemente ya lo tengas):** Si seguiste los pasos de Configuración del Frontend, probablemente ya tengas un terminal abierto en VSCode en la raíz del proyecto (directorio `open-webui`). Aquí es donde ejecutarás tus comandos de frontend (`npm run dev`, etc.). Asegúrate de estar en el directorio `open-webui` para los siguientes pasos si aún no lo estás.

2. **Terminal de Backend (Abre uno Nuevo):**
   - En VSCode, ve a **Terminal > Nuevo Terminal** (o usa el atajo `Ctrl+Shift+` en Windows/Linux o `Cmd+Shift+` en macOS). Esto abrirá un nuevo panel de terminal integrado.
   - **Navega al directorio `backend`:** En este *nuevo* terminal, usa el comando `cd backend` para cambiar al directorio `backend` dentro de tu proyecto. Esto asegura que todos los comandos relacionados con el backend se ejecuten en el contexto correcto.

   Ahora tienes **dos instancias de terminal separadas dentro de VSCode**: una para el frontend (probablemente en el directorio `open-webui`) y otra específicamente para el backend (dentro del directorio `backend`). Puedes cambiar fácilmente entre estos terminales dentro de VSCode para gestionar tus procesos de frontend y backend de forma independiente. Esta configuración es muy recomendable para un flujo de trabajo más limpio y eficiente.

**Pasos de Configuración del Backend (en tu terminal *backend*):**

1. **Navega al Directorio del Backend:** (Ya deberías estar en el directorio `backend` en tu *nuevo* terminal desde el paso anterior). Si no, ejecuta:

   ```bash
   cd backend
   ```

2. **Crear y Activar un Entorno Conda (Recomendado):**
   - Recomendamos encarecidamente usar Conda para manejar las dependencias de Python y aislar el entorno de tu proyecto. Esto previene conflictos con otros proyectos de Python en tu sistema y asegura que tengas la versión y las bibliotecas correctas de Python.

     ```bash
     conda create --name open-webui python=3.11
     conda activate open-webui
     ```

     - `conda create --name open-webui python=3.11`: Este comando crea un nuevo entorno Conda llamado `open-webui` usando Python versión 3.11. Si eliges una versión diferente de Python 3.11.x, está bien.
     - `conda activate open-webui`: Este comando activa el entorno Conda recién creado. Una vez activado, el indicador de tu terminal generalmente cambia para indicar que estás en el entorno `open-webui` (por ejemplo, podría mostrar `(open-webui)` al principio de la línea).
  
    **Asegúrate de activar el entorno en tu terminal backend antes de continuar.**

     *(Usar Conda es opcional pero muy recomendable para gestionar las dependencias de Python y evitar conflictos.)* Si decides no usar Conda, asegúrate de usar Python 3.11 o superior y procede al siguiente paso, pero ten en cuenta los posibles conflictos de dependencias.

1. **Instalar Dependencias del Backend:**
     - En tu terminal *backend* (y con el entorno Conda activado si estás usándolo), ejecuta:

     ```bash
     pip install -r requirements.txt -U
     ```

     Este comando usa `pip` (Instalador de Paquetes de Python) para leer el archivo `requirements.txt` en el directorio `backend`. `requirements.txt` enumera todas las bibliotecas de Python que el backend necesita para ejecutarse. `pip install` descarga e instala estas bibliotecas en tu entorno de Python activo (tu entorno Conda si estás usándolo, o tu entorno Python del sistema en caso contrario). La bandera `-U` asegura que obtengas las versiones compatibles más recientes de las bibliotecas.

2. **Iniciar el Servidor de Desarrollo del Backend:**
     - En tu terminal *backend*, ejecuta:

     ```bash
     sh dev.sh
     ```

     Este comando ejecuta el script `dev.sh`. Este script probablemente contiene el comando para iniciar el servidor de desarrollo del backend. *(Puedes abrir y examinar el archivo `dev.sh` en tu editor de código para ver el comando exacto que se ejecuta si tienes curiosidad.)* El servidor del backend usualmente se inicia e imprime algún resultado en el terminal.

     📄 **Explora la documentación de la API:** Una vez que el backend esté funcionando, puedes acceder a la documentación de la API generada automáticamente en tu navegador web en [http://localhost:8080/docs](http://localhost:8080/docs). Esta documentación es increíblemente valiosa para comprender los puntos finales de la API del backend, cómo interactuar con el backend y qué datos espera y devuelve. ¡Mantén esta documentación a la mano mientras desarrollas!

🎉 **¡Felicidades!** Si has seguido todos los pasos, ahora deberías tener tanto los servidores de desarrollo del frontend como del backend ejecutándose localmente. Vuelve a la pestaña de tu navegador donde accediste al frontend (generalmente [http://localhost:5173](http://localhost:5173)). **Actualiza la página.** Ahora deberías ver la aplicación completa de Open WebUI ejecutándose en tu navegador, conectada a tu backend local.

## Solución de problemas comunes

Aquí hay soluciones a algunos problemas comunes que podrías encontrar durante la configuración o el desarrollo:

### 💥 "ERROR FATAL: Límite de Heap alcanzado" (Frontend)

Este error, que a menudo se ve durante el desarrollo del frontend, indica que Node.js se está quedando sin memoria durante el proceso de construcción, especialmente cuando se trabaja con aplicaciones frontend grandes.

**Solución:** Aumentar el tamaño del heap de Node.js. Esto le da a Node.js más memoria para trabajar. Tienes un par de opciones:

1. **Usar la variable de entorno `NODE_OPTIONS` (Recomendado para desarrollo):**
   - Esta es una forma temporal de aumentar el límite de memoria para la sesión actual del terminal. Antes de ejecutar `npm run dev` o `npm run build` en tu terminal del *frontend*, configura la variable de entorno `NODE_OPTIONS`:

     ```bash
     export NODE_OPTIONS="--max-old-space-size=4096" # Para Linux/macOS (bash, zsh)
     # set NODE_OPTIONS=--max-old-space-size=4096 # Para Windows (Command Prompt)
     # $env:NODE_OPTIONS="--max-old-space-size=4096" # Para Windows (PowerShell)
     npm run dev
     ```

     Elige el comando apropiado para tu sistema operativo y terminal. `4096` representa 4GB de memoria. Puedes intentar aumentar este valor aún más si es necesario (por ejemplo, `8192` para 8GB). Esta configuración solo se aplicará a los comandos ejecutados en la sesión actual del terminal.

2. **Modificar el `Dockerfile` (Para entornos Dockerizados):**
   - Si estás trabajando con Docker, puedes configurar de manera permanente la variable de entorno `NODE_OPTIONS` dentro de tu `Dockerfile`. Esto es útil para una asignación consistente de memoria en entornos Dockerizados, como se muestra en el ejemplo de la guía original:

     ```dockerfile
     ENV NODE_OPTIONS=--max-old-space-size=4096
     ```

   - **Asignar suficiente RAM:** Independientemente del método, asegúrate de que tu sistema o contenedor Docker tenga suficiente RAM disponible para que Node.js la utilice. **Se recomiendan al menos 4 GB de RAM**, y puede ser necesario más para proyectos más grandes o compilaciones complejas. Cierra aplicaciones innecesarias para liberar RAM.

### ⚠️ Conflictos de puertos (Frontend & Backend)

Si ves errores relacionados con los puertos, como "Dirección ya en uso" o "Puerto ya vinculado," significa que otra aplicación en tu sistema ya está utilizando el puerto `5173` (predeterminado para el frontend) o `8080` (predeterminado para el backend). Solo una aplicación puede utilizar un puerto específico a la vez.

**Solución:**

1. **Identificar el proceso en conflicto:** Necesitas averiguar qué aplicación está utilizando el puerto que necesitas.
   - **Linux/macOS:** Abre un terminal nuevo y usa los comandos `lsof` o `netstat`:
     - `lsof -i :5173` (o `:8080` para el puerto del backend)
     - `netstat -tulnp | grep 5173` (o `8080`)
     Estos comandos enumerarán el ID del proceso (PID) y el nombre del proceso que está utilizando el puerto especificado.
   - **Windows:** Abre Command Prompt o PowerShell como administrador y usa `netstat` o `Get-NetTCPConnection`:
     - `netstat -ano | findstr :5173` (o `:8080`) (Command Prompt)
     - `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess` (PowerShell)
     Estos comandos también mostrarán el PID del proceso que está utilizando el puerto.

2. **Terminar el proceso en conflicto:** Una vez que identifiques el ID del proceso (PID), puedes detener la aplicación que está utilizando ese puerto. **Ten cuidado al terminar procesos, especialmente si no estás seguro de qué son.**
   - **Linux/macOS:** Usa el comando `kill`: `kill <PID>` (reemplaza `<PID>` con el ID del proceso real). Si el proceso no termina con `kill`, puedes usar `kill -9 <PID>` (terminación forzada), pero utilízalo con precaución.
   - **Windows:** Usa el comando `taskkill` en Command Prompt o PowerShell como administrador: `taskkill /PID <PID> /F` (reemplaza `<PID>` con el ID del proceso). El flag `/F` fuerza la terminación.

3. **Alternativamente, cambiar los puertos (Avanzado):**
   - Si no puedes terminar el proceso en conflicto (por ejemplo, es un servicio del sistema que necesitas), puedes configurar Open WebUI para utilizar puertos diferentes para el frontend y/o backend. Esto generalmente implica modificar archivos de configuración.
     - **Puerto del Frontend:** Consulta la documentación del frontend o los archivos de configuración (a menudo en `vite.config.js` o similar) para saber cómo cambiar el puerto del servidor de desarrollo. Es posible que también necesites ajustar el archivo `.env` si el frontend utiliza variables de entorno para el puerto.
     - **Puerto de Backend:** Examine el script `dev.sh` o los archivos de configuración del backend para ver cómo se establece el puerto del backend. Es posible que necesite modificar el comando de inicio o un archivo de configuración para cambiar el puerto del backend. Si cambia el puerto del backend, probablemente necesitará actualizar el archivo `.env` del frontend para que apunte a la nueva URL del backend.

### 🔄 Recarga en Caliente No Funciona

La recarga en caliente (o reemplazo de módulos en caliente - HMR) es una característica fantástica de desarrollo que actualiza automáticamente su navegador cuando realiza cambios en el código. Si no funciona, puede ralentizar significativamente su flujo de trabajo de desarrollo.

**Pasos para Solucionar Problemas:**

1. **Verifique que los Servidores de Desarrollo estén Ejecutándose:** Verifique que `npm run dev` (frontend) y `sh dev.sh` (backend) estén ejecutándose en sus respectivos terminales y que no hayan encontrado ningún error. Busque mensajes en la salida del terminal que indiquen que están ejecutándose en "modo de monitoreo" o "modo de desarrollo". Si hay errores, abórdelos primero.
2. **Revise Mensajes de Modo de Monitoreo/HMR:** Cuando los servidores de desarrollo comienzan, generalmente imprimen mensajes en el terminal indicando que la recarga en caliente o el modo de monitoreo están habilitados. Busque frases como "HMR habilitado", "monitoreando cambios de archivos" o similares. Si no ve estos mensajes, podría haber un problema de configuración.
3. **Caché del Navegador:** A veces, la caché de su navegador puede impedir que vea los cambios más recientes, incluso si la recarga en caliente está funcionando. Intente un **refresh completo** en su navegador:
   - **Windows/Linux:** Ctrl+Shift+R
   - **macOS:** Cmd+Shift+R
   - Alternativamente, puede intentar limpiar la caché de su navegador o abrir el frontend en una ventana privada/incógnita.
4. **Problemas de Dependencias (Frontend):** Las dependencias del frontend desactualizadas o corruptas a veces pueden interferir con la recarga en caliente. Intente actualizar sus dependencias del frontend:
   - En su terminal del *frontend*, ejecute:
  
     ```bash
     rm -rf node_modules && npm install
     ```

     Este comando elimina el directorio `node_modules` (donde se almacenan las dependencias) y luego las reinstala desde cero. Esto puede resolver problemas causados por paquetes corruptos o desactualizados.
5. **Reinicio del Backend Requerido (Para Cambios en el Backend):** La recarga en caliente suele funcionar mejor para cambios en el código del frontend (UI, estilos, componentes). Para cambios significativos en el código del backend (especialmente cambios en la lógica del servidor, puntos finales de API o dependencias), es posible que necesite **reiniciar manualmente el servidor del backend** (deteniendo `sh dev.sh` en su terminal del backend y ejecutándolo nuevamente). La recarga en caliente para cambios en el backend a menudo es menos confiable o no se configura automáticamente en muchos entornos de desarrollo de backend.
6. **Problemas de IDE/Editor:** En casos raros, problemas con su IDE o editor de código podrían impedir que los cambios de archivo sean detectados correctamente por los servidores de desarrollo. Intente reiniciar su IDE o asegúrese de que los archivos se estén guardando correctamente.
7. **Problemas de Configuración (Avanzado):** Si ninguno de los pasos anteriores funciona, podría haber un problema de configuración más complejo con la configuración del servidor de desarrollo del frontend o backend. Consulte la documentación del proyecto, los archivos de configuración (por ejemplo, `vite.config.js` para el frontend, archivos de configuración del servidor del backend) o busque ayuda de la comunidad o los mantenedores de Open WebUI.

## Contribuyendo a Open WebUI

¡Damos una cálida bienvenida a sus contribuciones a Open WebUI! Su ayuda es valiosa para mejorar este proyecto aún más. Aquí hay una guía rápida para un flujo de trabajo de contribución eficaz y fluido:

1. **Entienda la Estructura del Proyecto:** Tómese un tiempo para familiarizarse con la estructura de directorios del proyecto, especialmente las carpetas `frontend` y `backend`. Mire el código, los archivos de configuración y la documentación para tener una idea de cómo están organizados.
2. **Comience con Contribuciones Pequeñas:** Si es nuevo en el proyecto, considere comenzar con contribuciones más pequeñas como:
   - **Mejoras en la documentación:** Corrija errores tipográficos, aclare explicaciones, agregue más detalles a la documentación.
   - **Corrección de errores:** Aborde errores o problemas reportados.
   - **Pequeñas mejoras de UI:** Mejore el diseño, corrija problemas menores de diseño.
   Estas contribuciones más pequeñas son una excelente forma de familiarizarse con el código y el proceso de contribución.
3. **Discuta Cambios Grandes Primero:** Si está planeando implementar una nueva característica importante o hacer cambios sustanciales, se recomienda **discutir sus ideas primero con los mantenedores o la comunidad del proyecto.** Puede hacerlo:
   - **Abriendo un issue** en el repositorio de GitHub para proponer su característica o cambio.
   - **Uniéndose a los canales comunitarios de Open WebUI** (si están disponibles, consulte el README o el sitio web del proyecto para obtener enlaces) y discuta sus ideas allí.
   Esto ayuda a garantizar que su contribución esté alineada con los objetivos del proyecto y evita esfuerzos desperdiciados en características que podrían no ser aceptadas.
4. **Cree una Rama Separada para su Trabajo:** **Nunca haga commits directamente en la rama `dev`.** Siempre cree una nueva rama para cada característica o corrección de errores en la que esté trabajando. Esto mantiene sus cambios aislados y facilita la administración y el envío de pull requests.
   - Para crear una nueva rama (por ejemplo, llamada `mi-rama-característica`) basada en la rama `dev`:
  
     ```bash
     git checkout dev
     git pull origin dev # Asegúrate de que tu rama local 'dev' esté actualizada
     git checkout -b mi-rama-de-característica
     ```

5. **Realiza commits frecuentes y escribe mensajes claros de commit:** Haz commits pequeños y lógicos a medida que desarrollas características o corriges errores. **Escribe mensajes de commit claros y concisos** que expliquen qué cambios realizaste y por qué. Los buenos mensajes de commit facilitan la comprensión del historial de cambios y son esenciales para la colaboración.
   - Ejemplo de un buen mensaje de commit: `Fix: Corregido error tipográfico en la documentación para la configuración del backend`
   - Ejemplo de un buen mensaje de commit: `Feat: Implementada página de perfil de usuario con visualización básica de información`
6. **Mantente sincronizado regularmente con la rama `dev`:** Mientras trabajas en tu rama, sincronízala periódicamente con los cambios más recientes de la rama `dev` para minimizar conflictos de fusión más tarde:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout mi-rama-de-característica
   git merge dev
   ```

   Resuelve cualquier conflicto de fusión que surja durante el paso `git merge`.
7. **Ejecuta pruebas (si están disponibles) antes de hacer push:** Aunque esta guía no detalla procedimientos de prueba específicos para Open WebUI, es una buena práctica ejecutar cualquier prueba disponible antes de subir tu código. Consulta la documentación del proyecto o el archivo `package.json` (para el frontend) y los archivos backend para comandos relacionados con pruebas (por ejemplo, `npm run test`, `pytest`, etc.). Ejecutar pruebas ayuda a garantizar que tus cambios no hayan introducido regresiones ni roto funcionalidades existentes.
8. **Envia un Pull Request (PR):** Una vez que hayas completado tu trabajo, lo hayas probado (si corresponde) y estés listo para contribuir con tus cambios, envía un pull request (PR) a la rama `dev` del repositorio Open WebUI en GitHub.
   - **Ve al repositorio Open WebUI en GitHub.**
   - **Navega a tu rama.**
   - **Haz clic en el botón "Contribute" o "Pull Request"** (generalmente verde).
   - **Rellena el formulario de PR:**
     - **Título:** Dale a tu PR un título claro y descriptivo que resuma tus cambios (por ejemplo, "Fix: Resuelto problema con la validación del formulario de inicio de sesión").
     - **Descripción:** Proporciona una descripción más detallada de tus cambios, el problema que estás resolviendo (si aplica) y cualquier contexto relevante. Vincula cualquier problema relacionado si lo hay.
   - **Envía el PR.**

   Los mantenedores del proyecto revisarán tu pull request, proporcionarán comentarios y posiblemente fusionarán tus cambios. Sé receptivo a los comentarios y prepárate para hacer revisiones si se solicitan.

**¡Gracias por leer esta guía completa y por tu interés en contribuir a Open WebUI! ¡Estamos emocionados de ver tus contribuciones y ayudarte a ser parte de la comunidad Open WebUI!** 🎉 ¡Feliz codificación!
