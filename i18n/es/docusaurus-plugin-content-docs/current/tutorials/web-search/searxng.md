---
sidebar_position: 10
title: "SearXNG"
---

:::warning
Este tutorial es una contribución de la comunidad y no cuenta con el soporte del equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

Esta guía proporciona instrucciones sobre cómo configurar capacidades de búsqueda web en Open WebUI utilizando SearXNG en Docker.

## SearXNG (Docker)

> "**SearXNG es un motor de metabúsqueda de internet gratuito que agrega resultados de varios servicios de búsqueda y bases de datos. Los usuarios no son rastreados ni perfilados.**"

## 1. Configuración de SearXNG

Para configurar SearXNG de manera óptima para usar con Open WebUI, sigue estos pasos:

**Paso 1: `git clone` SearXNG Docker y navega a la carpeta:**

1. Crea un nuevo directorio `searxng-docker`

 Clona el repositorio de searxng-docker. Esta carpeta contendrá tus archivos de configuración de SearXNG. Consulta la [documentación de SearXNG](https://docs.searxng.org/) para obtener instrucciones de configuración.

```bash
git clone https://github.com/searxng/searxng-docker.git
```

Navega al repositorio `searxng-docker`:

```bash
cd searxng-docker
```

**Paso 2: Localiza y modifica el archivo `.env`:**

1. Descomenta `SEARXNG_HOSTNAME` del archivo `.env` y configúralo adecuadamente:

```bash
# Por defecto escucha en https://localhost
# Para cambiar esto:
# * descomenta SEARXNG_HOSTNAME, y reemplaza <host> por el nombre del host de SearXNG
# * descomenta LETSENCRYPT_EMAIL, y reemplaza <email> por tu correo electrónico (requerido para crear un certificado de Let's Encrypt)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# Opcional:
# Si vas a usar una instancia muy pequeña o muy grande, es posible que desees cambiar la cantidad de trabajadores uwsgi y los hilos por trabajador
# Más trabajadores (= procesos) significan que más solicitudes de búsqueda pueden manejarse al mismo tiempo, pero también consumen más recursos

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**Paso 3: Modifica el archivo `docker-compose.yaml`**

3. Elimina la restricción de `localhost` modificando el archivo `docker-compose.yaml`:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**Paso 4: Otorga los permisos necesarios**

4. Permite que el contenedor cree nuevos archivos de configuración ejecutando el siguiente comando en el directorio raíz:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**Paso 5: Crea un archivo `limiter.toml` sin restricciones**

5. Crea un archivo de configuración `searxng-docker/searxng/limiter.toml` sin restricciones:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# Este archivo de configuración actualiza el archivo de configuración predeterminado
# Consulta https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# activa el método link_token en el método ip_limit
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**Paso 6: Elimina el archivo predeterminado `settings.yml`**

6. Elimina el archivo predeterminado `searxng-docker/searxng/settings.yml` si existe, ya que será regenerado en el primer inicio de SearXNG:

```bash
rm searxng-docker/searxng/settings.yml
```

**Paso 7: Crea un archivo `settings.yml` nuevo**

:::note
En la primera ejecución, debes eliminar `cap_drop: - ALL` del archivo `docker-compose.yaml` para que el servicio `searxng` pueda crear exitosamente `/etc/searxng/uwsgi`.ini. Esto es necesario porque la directiva `cap_drop: - ALL` elimina todas las capacidades, incluidas las necesarias para crear el archivo `uwsgi.ini`. Tras la primera ejecución, debes volver a añadir `cap_drop: - ALL` al archivo `docker-compose.yaml` por motivos de seguridad.
:::

7. Inicia el contenedor momentáneamente para generar un nuevo archivo `settings.yml`:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**Paso 8: Agrega formatos y actualiza el número de puerto**

8. Agrega los formatos HTML y JSON al archivo `searxng-docker/searxng/settings.yml`:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

Genera una clave secreta para tu instancia de SearXNG:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Los usuarios de Windows pueden usar el siguiente script de PowerShell para generar la clave secreta:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

Actualiza el número de puerto en la sección `server` para que coincida con el que configuraste anteriormente (en este caso, `8080`):

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

Cambia la `bind_address` como desees:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### Archivos de Configuración

#### searxng-docker/searxng/settings.yml (Extracto)

El archivo `settings.yml` predeterminado contiene muchas configuraciones de motores. A continuación se muestra un extracto de cómo podría ser el archivo `settings.yml` predeterminado:

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# ver https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url se define en la variable de entorno SEARXNG_BASE_URL, ver .env y docker-compose.yml
  secret_key: "ultrasecretkey"  # ¡cambie esto!
  limiter: true  # puede deshabilitarse para una instancia privada
  image_proxy: true
  port: 8080
  bind_address: "0.0.0.0"

ui:
  static_use_hash: true

search:
  safe_search: 0
  autocomplete: ""
  default_lang: ""
  formats:
    - html
    - json # json es necesario
  # elimine formato para denegar acceso, use minúsculas.
  # formats: [html, csv, json, rss]
redis:
  # URL para conectar la base de datos redis. Puede ser sobrescrita por ${SEARXNG_REDIS_URL}.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

El puerto en el archivo settings.yml para SearXNG debe coincidir con el número de puerto en su archivo docker-compose.yml para SearXNG.

</details>

**Paso 9: Actualizar Archivo `uwsgi.ini`**

9. Asegúrese de que su archivo `searxng-docker/searxng/uwsgi.ini` coincida con lo siguiente:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# Quién ejecutará el código
uid = searxng
gid = searxng

# Número de trabajadores (usualmente cantidad de CPUs)
# valor predeterminado: %k (= número de núcleos CPU, ver Dockerfile)
workers = %k

# Número de hilos por trabajador
# valor predeterminado: 4 (ver Dockerfile)
threads = 4

# Permisos asignados al socket creado
chmod-socket = 666

# Complemento a utilizar y configuración del intérprete
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# Módulo para importar
module = searx.webapp

# Rutas de virtualenv y python
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# Asignar automáticamente nombres de procesos significativos
auto-procname = true

# Desactivar el registro de solicitudes por privacidad
disable-logging = true
log-5xx = true

# Establecer tamaño máximo de una solicitud (excluido el cuerpo de la solicitud)
buffer-size = 8192

# Sin mantener conexión activa
# Ver https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi sirve los archivos estáticos
static-map = /static=/usr/local/searxng/searx/static
# caducidad configurada a un día
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. Configuración Alternativa

Alternativamente, si no desea modificar la configuración predeterminada, puede simplemente crear una carpeta vacía `searxng-docker` y seguir el resto de las instrucciones de configuración.

### Configuración de Docker Compose

Agregue las siguientes variables de entorno a su archivo `docker-compose.yaml` de Open WebUI:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "searxng"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
      SEARXNG_QUERY_URL: "http://searxng:8080/search?q=<query>"
```

Cree un archivo `.env` para SearXNG:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

A continuación, agregue lo siguiente al archivo `docker-compose.yaml` de SearXNG:

```yaml
services:
  searxng:
    container_name: searxng
    image: searxng/searxng:latest
    ports:
      - "8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    env_file:
      - .env
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

Su stack está listo para ser lanzado con:

```bash
docker compose up -d
```

:::note
En la primera ejecución, debe eliminar `cap_drop: - ALL` del archivo `docker-compose.yaml` para que el servicio `searxng` cree correctamente `/etc/searxng/uwsgi`.ini. Esto es necesario porque la directiva `cap_drop: - ALL` elimina todas las capacidades, incluidas las necesarias para la creación del archivo `uwsgi.ini`. Después de la primera ejecución, debería volver a agregar `cap_drop: - ALL` al archivo `docker-compose.yaml` por razones de seguridad.
:::

Alternativamente, puede ejecutar SearXNG directamente usando `docker run`:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. Confirmar Conectividad

Confirme la conectividad con SearXNG desde su instancia de contenedor Open WebUI en su interfaz de línea de comandos:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. Configuración de GUI

1. Navegue a: `Panel de administración` -> `Configuraciones` -> `Búsqueda web`
2. Habilite `Activar búsqueda web`
3. Configure `Motor de búsqueda web` desde el menú desplegable a `searxng`
4. Configure `URL de consulta de Searxng` con uno de los siguientes ejemplos:

* `http://searxng:8080/search?q=<query>` (usando el nombre del contenedor y el puerto expuesto, adecuado para configuraciones basadas en Docker)
* `http://host.docker.internal:8080/search?q=<query>` (usando el nombre DNS `host.docker.internal` y el puerto del host, adecuado para configuraciones basadas en Docker)
* `http://<searxng.local>/search?q=<query>` (usando un nombre de dominio local, adecuado para acceso a redes locales)
* `https://<search.domain.com>/search?q=<query>` (usando un nombre de dominio personalizado para una instancia de SearXNG autohospedada, adecuado para acceso público o privado)

**Es importante que la parte `/search?q=<query>` sea obligatoria.**

5. Ajuste los valores de `Cantidad de resultados de búsqueda` y `Solicitudes concurrentes` según corresponda.
6. Guarde los cambios

![Configuración de la GUI de SearXNG](/images/tutorial_searxng_config.png)

## 5. Uso de Búsqueda Web en un chat

Para acceder a la Búsqueda Web, haga clic en el + al lado del campo de entrada de mensaje.

Aquí puede alternar la Búsqueda Web Encendida/Apagada.

![Alternar interfaz de usuario de búsqueda web](/images/web_search_toggle.png)

Siguiendo estos pasos, habrá configurado exitosamente SearXNG con Open WebUI, lo que le permitirá realizar búsquedas web utilizando el motor de SearXNG.

#### Nota

Tendrá que alternar esto explícitamente entre Encendido/Apagado en un chat.

Esto está habilitado por sesión; por ejemplo, recargar la página o cambiar a otro chat lo desactivará.
