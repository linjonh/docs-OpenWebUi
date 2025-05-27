---
sidebar_position: 2
title: "🤝 Contribuyendo con Tutoriales"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# Contribuyendo con Tutoriales

Apreciamos tu interés en contribuir con tutoriales a la documentación de Open WebUI. Sigue los pasos a continuación para configurar tu entorno y enviar tu tutorial.

## Pasos

1. **Haz un Fork del Repositorio de GitHub `openwebui/docs`**

   - Ve al [Repositorio de Documentación de Open WebUI](https://github.com/open-webui/docs) en GitHub.
   - Haz clic en el botón **Fork** en la esquina superior derecha para crear una copia bajo tu cuenta de GitHub.

2. **Habilita las Acciones de GitHub**

   - En tu repositorio clonado, ve a la pestaña **Actions**.
   - Si se solicita, habilita las Acciones de GitHub siguiendo las instrucciones en pantalla.

3. **Habilita GitHub Pages**

   - Ve a **Settings** > **Pages** en tu repositorio clonado.
   - En **Source**, selecciona la rama que deseas implementar (por ejemplo, `main`) y la carpeta (por ejemplo, `/docs`).
   - Haz clic en **Save** para habilitar GitHub Pages.

4. **Configura las Variables de Entorno de GitHub**

   - En tu repositorio clonado, ve a **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Agrega las siguientes variables de entorno:
     - `BASE_URL` configurado como `/docs` (o tu URL base elegida para el fork).
     - `SITE_URL` configurado como `https://<tu-usuario-github>.github.io/`.

### 📝 Actualizando el Flujo de Trabajo de GitHub Pages y el Archivo de Configuración

Si necesitas ajustar la configuración de implementación para tu configuración personalizada, esto es lo que debes hacer:

a. **Actualiza `.github/workflows/gh-pages.yml`**

- Agrega variables de entorno para `BASE_URL` y `SITE_URL` al paso de construcción si es necesario:

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **Modifica `docusaurus.config.ts` para Usar Variables de Entorno**

- Actualiza `docusaurus.config.ts` para usar estas variables de entorno, con valores predeterminados para implementaciones locales o directas:

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "Interfaz Web estilo ChatGPT para LLMs (Anteriormente Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- Esta configuración garantiza un comportamiento de implementación consistente para forks y configuraciones personalizadas.

5. **Ejecuta el Flujo de Trabajo `gh-pages` de GitHub**

   - En la pestaña **Actions**, localiza el flujo de trabajo `gh-pages`.
   - Actívalo manualmente si es necesario, o puede ejecutarse automáticamente según tu configuración.

6. **Visita Tu Copia Clonada**

   - Visita `https://<tu-usuario-github>.github.io/<BASE_URL>` para ver tu documentación clonada.

7. **Escribe Tus Cambios**

   - En tu repositorio clonado, navega al directorio apropiado (por ejemplo, `docs/tutorial/`).
   - Crea un nuevo archivo markdown para tu tutorial o edita los existentes.
   - Asegúrate de que tu tutorial incluya el banner de advertencia de no soportado.

8. **Envía un Pull Request**

   - Una vez que tu tutorial esté listo, haz commit de tus cambios a tu repositorio clonado.
   - Ve al repositorio original `open-webui/docs`.
   - Haz clic en **New Pull Request** y selecciona tu fork y rama como la fuente.
   - Proporciona un título y descripción descriptivos para tu PR.
   - Envía el pull request para su revisión.

## Importante

Los tutoriales contribuidos por la comunidad deben incluir lo siguiente:

```
:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::
```

---

:::tip Cómo Probar Docusaurus Localmente
Puedes probar tu sitio de Docusaurus localmente con los siguientes comandos:

```bash
npm install   # Instalar dependencias
npm run build # Construir el sitio para producción
```

Esto te ayudará a detectar cualquier problema antes de implementar.
:::

---
