---
sidebar_position: 1000
title: "💾 Copias de Seguridad"
---
 
 :::advertencia
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tus casos de uso específicos. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

 # Hacer Copia de Seguridad de Tu Instancia

 ¡A nadie le gusta perder datos! 

 Si estás autohospedando Open WebUI, tal vez desees instituir algún tipo de plan de respaldo formal para asegurar que retienes una segunda y tercera copia de partes de tu configuración.

 Esta guía está destinada a recomendar algunas sugerencias básicas sobre cómo los usuarios podrían hacerlo. 

 Esta guía asume que el usuario ha instalado Open WebUI mediante Docker (o planea hacerlo)

 ## Asegurar la persistencia de datos

Primero, antes de desplegar tu configuración con Docker, asegúrate de que tu Docker Compose utilice un almacén de datos persistente. Si estás utilizando el Docker Compose [del repositorio de Github](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml), ya está resuelto. Pero es fácil crear tus propias variaciones y olvidar verificar esto.

Los contenedores Docker son efímeros y los datos deben ser persistidos para asegurar su supervivencia en el sistema de archivos del host.

## Usar volúmenes de Docker

Si estás utilizando el Docker Compose del repositorio del proyecto, estarás implementando Open Web UI utilizando volúmenes Docker. 

Para Ollama y Open WebUI las monturas son:

```yaml
ollama:
  volumes:
    - ollama:/root/.ollama
```

```yaml
open-webui:
  volumes:
    - open-webui:/app/backend/data
```

Para encontrar la ruta de enlace real en el host, ejecuta:

`docker volume inspect ollama` 

y

`docker volume inspect open-webui`

## Usar enlaces directos al host

Algunos usuarios implementan Open Web UI con enlaces directos (fijos) al sistema de archivos del host, como este:

```yaml
services:
  ollama:
    container_name: ollama
    image: ollama/ollama:${OLLAMA_DOCKER_TAG-latest}
    volumes:
      - /opt/ollama:/root/.ollama
  open-webui:
    container_name: open-webui
    image: ghcr.io/open-webui/open-webui:${WEBUI_DOCKER_TAG-main}
    volumes:
      - /opt/open-webui:/app/backend/data
```

Si así es como has implementado tu instancia, querrás anotar las rutas en el root. 

## Configuración de un Trabajo de Copia de Seguridad

Cualquiera que sea la forma en que tu instancia está provisiónada, vale la pena inspeccionar el almacén de datos de la aplicación en tu servidor para entender qué datos respaldarás. Deberías ver algo como esto:

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## Archivos en el almacén de datos persistentes 

| Archivo/Directorio | Descripción |
|---|---|
| `audit.log` | Archivo de registro para auditoría de eventos. |
| `cache/` | Directorio para almacenar datos en caché. |
| `uploads/` | Directorio para almacenar archivos subidos por los usuarios. |
| `vector_db/` | Directorio que contiene la base de datos vectorial ChromaDB. |
| `webui.db` | Base de datos SQLite para almacenamiento persistente de otros datos de la instancia |

# Enfoques de Respaldo a Nivel de Archivos

La primera forma de hacer una copia de seguridad de los datos de la aplicación es utilizando un enfoque de respaldo a nivel de archivo, asegurando que los datos persistentes de Open Web UI sean respaldados correctamente.

Hay un número casi infinito de formas en que los servicios técnicos pueden ser respaldados, pero `rsync` sigue siendo una opción popular para trabajos incrementales, por lo que se utilizará como demostración.

Los usuarios podrían apuntar al directorio completo de `data` para respaldar todos los datos de la instancia a la vez o crear trabajos de respaldo más selectivos que apunten a componentes individuales. También podrías agregar nombres más descriptivos para los objetivos. 

Un trabajo modelo con rsync podría verse así:

```bash
#!/bin/bash

# Configuración
SOURCE_DIR="."  # Directorio actual (donde reside la estructura de archivos)
B2_BUCKET="b2://OpenWebUI-backups" # Tu bucket Backblaze B2
B2_PROFILE="your_rclone_profile" # Tu nombre de perfil de rclone
# Asegúrate de que rclone esté configurado con tus credenciales de B2

# Define directorios de origen y destino
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Excluir cache y audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construir argumentos de exclusión para rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Función para ejecutar sincronización con rclone y comprobación de errores
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Sincronizando $SOURCE con $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Error: la sincronización con rclone falló para $SOURCE con $DEST"
        exit 1
    fi
}

# Realizar sincronización con rclone para cada directorio/archivo
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "Copia de seguridad completada exitosamente."
exit 0
```

## Trabajo Rsync con Interrupción de Contenedor

Para mantener la integridad de los datos, generalmente se recomienda realizar copias de seguridad de bases de datos en sistemas de archivos fríos. Nuestro trabajo de copia de seguridad de modelo predeterminado puede modificarse ligeramente para bajar la pila antes de ejecutar el script de copia de seguridad y volver a subirla después.

La desventaja de este enfoque, por supuesto, es que implicará tiempo de inactividad de la instancia. Considere ejecutar el trabajo en momentos en que no esté utilizando la instancia o tomar "diarios de software" (en los datos en ejecución) y "semanales" más robustos (en datos fríos).

```bash
#!/bin/bash

# Configuración
COMPOSE_FILE="docker-compose.yml" # Ruta a tu archivo docker-compose.yml
B2_BUCKET="b2://OpenWebUI-backups" # Tu bucket de Backblaze B2
B2_PROFILE="your_rclone_profile" # Nombre de tu perfil rclone
SOURCE_DIR="."  # Directorio actual (donde reside la estructura de archivos)

# Definir directorios fuente y destino
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Excluir cache y audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construir argumentos de exclusión para rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Función para realizar sincronización rclone con verificación de errores
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Sincronizando $SOURCE a $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Error: la sincronización de rclone falló para $SOURCE a $DEST"
        exit 1
    fi
}

# 1. Detener el entorno de Docker Compose
echo "Deteniendo el entorno Docker Compose..."
docker-compose -f "$COMPOSE_FILE" down

# 2. Realizar la copia de seguridad
echo "Iniciando copia de seguridad..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Iniciar el entorno Docker Compose
echo "Iniciando el entorno Docker Compose..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Copia de seguridad completada exitosamente."
exit 0
```

## Script de Copia de Seguridad de Modelo Usando Funciones de Copia de Seguridad de SQLite & ChromaDB a Backblaze B2 Remoto

```bash
#!/bin/bash
#
# Script de copia de seguridad para respaldar ChromaDB y SQLite en el bucket de Backblaze B2
# openwebuiweeklies, manteniendo 3 instantáneas semanales.
# Las instantáneas son independientes y completamente restaurables.
# Usa los mecanismos nativos de copia de seguridad de ChromaDB y SQLite.
# Excluye audit.log, cache y directorios de uploads.
#
# Asegúrate de que rclone esté instalado y configurado correctamente.
# Instalar rclone: https://rclone.org/install/
# Configurar rclone: https://rclone.org/b2/

# Directorio fuente (que contiene datos de ChromaDB y SQLite)
SOURCE="/var/lib/open-webui/data"

# Nombre de bucket y nombre remoto de B2
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# Timestamp para el directorio de copia de seguridad
TIMESTAMP=$(date +%Y-%m-%d)

# Nombre del directorio de copia de seguridad
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# Ruta completa al directorio de copia de seguridad en el bucket B2
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# Número de instantáneas semanales para mantener
NUM_SNAPSHOTS=3

# Filtros de exclusión (aplicados *después* de las copias de seguridad de la base de datos)
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# Configuración de Copia de Seguridad ChromaDB (Ajustar según sea necesario)
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # Ruta al directorio de datos de ChromaDB
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # Archivo de copia de seguridad de ChromaDB

# Configuración de Copia de Seguridad SQLite (Ajustar según sea necesario)
SQLITE_DB_FILE="$SOURCE/webui.db" # Ruta al archivo de base de datos SQLite
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # Archivo temporal de copia de seguridad de SQLite

# Función para respaldar ChromaDB
backup_chromadb() {
  echo "Respaldando ChromaDB..."

  # Crear un archivo tar del directorio vector_db
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "Copia de seguridad de ChromaDB completada."
}

# Función para respaldar SQLite
backup_sqlite() {
  echo "Respaldando base de datos SQLite..."
  # Respaldar la base de datos SQLite usando el comando .backup
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # Mover el archivo de respaldo al directorio fuente
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "Copia de seguridad de SQLite completada."
}

# Realizar copias de seguridad de bases de datos
backup_chromadb
backup_sqlite

# Ejecute la copia de seguridad con exclusiones
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# Eliminar respaldos antiguos, manteniendo las más recientes NUM_SNAPSHOTS
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "Copia de seguridad completada a $DESTINATION"
```

---

## Instantáneas de Punto en el Tiempo

Además de tomar copias de seguridad, los usuarios también pueden desear crear instantáneas de punto en el tiempo que podrían almacenarse localmente (en el servidor), de forma remota, o ambas.

```bash
#!/bin/bash

# Configuración
SOURCE_DIR="."  # Directorio para instantáneas (directorio actual)
SNAPSHOT_DIR="/snapshots" # Directorio para almacenar instantáneas
TIMESTAMP=$(date +%Y%m%d%H%M%S) # Generar marca de tiempo

# Crear el directorio de instantáneas si no existe
mkdir -p "$SNAPSHOT_DIR"

# Crear el nombre de la instantánea
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# Realizar la instantánea con rsync
echo "Creando instantánea: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# Comprobar si rsync fue exitoso
if [ $? -eq 0 ]; then
  echo "Instantánea creada exitosamente."
else
  echo "Error: No se pudo crear la instantánea."
  exit 1
fi

exit 0
```
## Crontab para programación

Una vez que hayas agregado tu script de respaldo y provisto tu almacenamiento de respaldo, deberás verificar que los scripts se ejecuten como esperabas. Es muy recomendable habilitar registros de eventos.

Configura tu(s) script(s) nuevo(s) para que se ejecuten usando crontabs según la frecuencia deseada.

# Utilidades comerciales

Además de crear tus propios scripts de respaldo, puedes encontrar opciones comerciales que generalmente funcionan instalando agentes en tu servidor para gestionar las complejidades de realizar respaldos. Estos están fuera del alcance de este artículo pero brindan soluciones convenientes.

---

# Respaldos a nivel de anfitrión

Tu instancia de Open WebUI podría estar alojada en un servidor físico o virtual que controlas.

Los respaldos a nivel de anfitrión implican crear instantáneas o respaldos de toda la máquina virtual en lugar de aplicaciones específicas en ejecución.

Algunos usuarios podrían preferir utilizarlos como su protección principal o única, mientras que otros podrían integrarlos como protecciones adicionales de sus datos.

# ¿Cuántos respaldos necesito?

La cantidad de respaldos que desees realizar depende de tu nivel personal de tolerancia al riesgo. Sin embargo, recuerda que es una buena práctica *no* considerar la propia aplicación como una copia de respaldo (¡incluso si está en la nube!). Esto significa que si tu instancia está en un VPS, aún es razonable recomendar mantener dos copias de respaldo (independientes).

Un ejemplo de plan de respaldo que cubriría las necesidades de muchos usuarios domésticos:

## Plan de respaldo modelo 1 (principal + 2 copias)

| Frecuencia | Destino | Tecnología | Descripción |
|---|---|---|---|
| Incremental diario | Almacenamiento en la nube (S3/B2) | rsync | Respaldo incremental diario enviado a un bucket de almacenamiento en la nube (S3 o B2). |
| Incremental semanal | Almacenamiento local (NAS doméstico) | rsync | Respaldo incremental semanal tirado del servidor a almacenamiento local (por ejemplo, un NAS doméstico). |

## Plan de respaldo modelo 2 (principal + 3 copias)

Este plan de respaldo es un poco más complicado pero también más completo. Implica envíos diarios a dos proveedores de almacenamiento en la nube para mayor redundancia.

| Frecuencia | Destino | Tecnología | Descripción |
|---|---|---|---|
| Incremental diario | Almacenamiento en la nube (S3) | rsync | Respaldo incremental diario enviado a un bucket de almacenamiento en la nube de S3. |
| Incremental diario | Almacenamiento en la nube (B2) | rsync | Respaldo incremental diario enviado a un bucket de almacenamiento en la nube de Backblaze B2. |
| Incremental semanal | Almacenamiento local (NAS doméstico) | rsync | Respaldo incremental semanal tirado del servidor a almacenamiento local (por ejemplo, un NAS doméstico). |

# Temas adicionales

Con el interés de mantener esta guía razonablemente completa, se omitieron estos temas adicionales pero podrían ser valiosos según el tiempo que tengas para dedicar a configurar y mantener un plan de protección de datos para tu instancia:

| Tema | Descripción |
|---|---|
| Respaldo integrado de SQLite | Considera usar el comando `.backup` de SQLite para una solución consistente de respaldo de bases de datos. |
| Encriptación | Modifica los scripts de respaldo para incorporar encriptación en reposo para mayor seguridad. |
| Recuperación ante desastres y pruebas | Desarrolla un plan de recuperación ante desastres y prueba regularmente el proceso de respaldo y restauración. |
| Herramientas de respaldo alternativas | Explora otras herramientas de línea de comandos, como `borgbackup` o `restic`, para funciones avanzadas. |
| Notificaciones por correo electrónico y webhooks | Implementa notificaciones por correo electrónico o webhooks para monitorear el éxito o fallo de los respaldos. |
