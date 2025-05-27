---
sidebar_position: 1000
title: "💾 Sicherungen"
---
 
 :::warnung
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

 # Sicherung Ihrer Instanz

 Niemand mag es, Daten zu verlieren! 

 Wenn Sie Open WebUI selbst hosten, möchten Sie möglicherweise eine Art formellen Sicherungsplan einrichten, um sicherzustellen, dass Sie eine zweite und dritte Kopie von Teilen Ihrer Konfiguration behalten.

 Diese Anleitung soll einige grundlegende Empfehlungen geben, wie Benutzer vorgehen könnten. 

 Diese Anleitung geht davon aus, dass der Benutzer Open WebUI über Docker installiert hat (oder dies beabsichtigt).

 ## Sicherstellen der Datenpersistenz

Zunächst sollten Sie vor der Bereitstellung Ihres Stacks mit Docker sicherstellen, dass Ihr Docker-Compose einen persistenten Datenspeicher verwendet. Wenn Sie das Docker-Compose [aus dem Github-Repository](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml) verwenden, ist dies bereits erledigt. Es ist jedoch leicht, eigene Variationen vorzunehmen und zu vergessen, dies zu überprüfen.

Docker-Container sind vergänglich, und Daten müssen persistiert werden, um ihr Überleben auf dem Host-Dateisystem sicherzustellen.

## Verwendung von Docker-Volumes

Wenn Sie das Docker-Compose aus dem Projekt-Repository verwenden, werden Sie Open WebUI mit Docker-Volumes bereitstellen.

Für Ollama und Open WebUI sind die Mounts:

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

Um den tatsächlichen Bindepfad auf dem Host zu finden, führen Sie aus:

`docker volume inspect ollama` 

und

`docker volume inspect open-webui`

## Verwendung direkter Host-Bindungen

Einige Benutzer stellen Open WebUI mit direkten (festen) Bindungen an das Host-Dateisystem bereit, wie folgt:

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

Wenn dies die Art ist, wie Sie Ihre Instanz bereitgestellt haben, sollten Sie die Pfade im Root-Verzeichnis beachten.

## Skripten eines Sicherungsauftrags

Unabhängig davon, wie Ihre Instanz bereitgestellt wird, lohnt es sich, das Datenspeicher der App auf Ihrem Server zu inspizieren, um zu verstehen, welche Daten Sie sichern werden. Sie sollten etwa Folgendes sehen:

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## Dateien im persistenten Datenspeicher

| Datei/Verzeichnis | Beschreibung |
|---|---|
| `audit.log` | Protokolldatei für Überwachungsergebnisse. |
| `cache/` | Verzeichnis für das Speichern von zwischengespeicherten Daten. |
| `uploads/` | Verzeichnis für das Speichern von durch Benutzer hochgeladenen Dateien. |
| `vector_db/` | Verzeichnis, das die ChromaDB-Vektordatenbank enthält. |
| `webui.db` | SQLite-Datenbank für die langfristige Speicherung anderer Instanzdaten |

# Ansätze für Datei-Level-Sicherungen

Der erste Weg, die Anwendungsdaten zu sichern, besteht darin, einen Datei-Level-Sicherungsansatz zu verwenden, um sicherzustellen, dass die persistenten Open WebUI-Daten ordnungsgemäß gesichert werden.

Es gibt fast eine unendliche Anzahl von Möglichkeiten, technische Dienste zu sichern, aber `rsync` bleibt ein beliebter Favorit für inkrementelle Aufgaben und wird daher als Beispiel verwendet.

Benutzer könnten das gesamte `data`-Verzeichnis sichern, um alle Instanzdaten auf einmal zu sichern, oder selektivere Sicherungsaufträge für einzelne Komponenten erstellen. Sie könnten auch beschreibendere Namen für die Ziele hinzufügen.

Ein Modell rsync-Auftrag könnte wie folgt aussehen:

```bash
#!/bin/bash

# Konfiguration
SOURCE_DIR="."  # Aktuelles Verzeichnis (wo die Dateistruktur liegt)
B2_BUCKET="b2://OpenWebUI-backups" # Ihr Backblaze B2 Bucket
B2_PROFILE="your_rclone_profile" # Ihr rclone Profilname
# Stellen Sie sicher, dass rclone mit Ihren B2-Anmeldedaten konfiguriert ist

# Quell- und Zielverzeichnisse definieren
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# cache und audit.log ausschließen
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Ausschlussargumente für rclone erstellen
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Funktion zum Ausführen des rclone-Syncs mit Fehlerüberprüfung
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Synchronisiere $SOURCE mit $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Fehler: rclone-Sync fehlgeschlagen für $SOURCE nach $DEST"
        exit 1
    fi
}

# rclone-Sync für jedes Verzeichnis/Datei ausführen
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "Sicherung erfolgreich abgeschlossen."
exit 0
```

## Rsync-Auftrag mit Unterbrechung des Containers

Um die Datenintegrität zu gewährleisten, wird allgemein empfohlen, Datenbanksicherungen auf nicht aktiven Dateisystemen durchzuführen. Unser Standard-Model-Backup-Job kann leicht modifiziert werden, um den Stack vor dem Ausführen des Sicherungsskripts herunterzufahren und anschließend wiederherzustellen.

Der Nachteil dieses Ansatzes ist natürlich, dass es zu einer Ausfallzeit der Instanz führen wird. Ziehen Sie in Betracht, die Aufgabe zu Zeiten auszuführen, in denen Sie die Instanz nicht nutzen, oder "Software"-Tagesbackups (auf den laufenden Daten) und robustere Wochenbackups (auf kalten Daten) zu erstellen.

```bash
#!/bin/bash

# Konfiguration
COMPOSE_FILE="docker-compose.yml" # Pfad zu Ihrer docker-compose.yml-Datei
B2_BUCKET="b2://OpenWebUI-backups" # Ihr Backblaze B2-Bucket
B2_PROFILE="your_rclone_profile" # Ihr rclone-Profilname
SOURCE_DIR="."  # Aktuelles Verzeichnis (in dem sich die Dateistruktur befindet)

# Quell- und Zielverzeichnisse definieren
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Cache und audit.log ausschließen
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Ausschlussargumente für rclone erstellen
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Funktion, um rclone sync mit Fehlerprüfung auszuführen
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Synchronisiere $SOURCE nach $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Fehler: rclone sync für $SOURCE nach $DEST fehlgeschlagen"
        exit 1
    fi
}

# 1. Docker Compose-Umgebung stoppen
echo "Docker Compose-Umgebung wird gestoppt..."
docker-compose -f "$COMPOSE_FILE" down

# 2. Backup durchführen
echo "Backup wird gestartet..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Docker Compose-Umgebung starten
echo "Docker Compose-Umgebung wird gestartet..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Backup erfolgreich abgeschlossen."
exit 0
```

## Modellbackup-Skript mit SQLite- und ChromaDB-Sicherungsfunktionen in B2 Remote

```bash
#!/bin/bash
#
# Backup-Skript zur Sicherung von ChromaDB und SQLite in Backblaze B2-Bucket
# openwebuiweeklies, mit 3 wöchentlichen Snapshots.
# Snapshots sind unabhängig und vollständig wiederherstellbar.
# Verwendet native Sicherungsmechanismen von ChromaDB und SQLite.
# Schließt audit.log, Cache- und Uploads-Verzeichnisse aus.
#
# Stellen Sie sicher, dass rclone installiert und richtig konfiguriert ist.
# Installieren Sie rclone: https://rclone.org/install/
# Konfigurieren Sie rclone: https://rclone.org/b2/

# Quellverzeichnis (mit ChromaDB und SQLite-Daten)
SOURCE="/var/lib/open-webui/data"

# B2-Bucket-Name und Remote-Name
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# Zeitstempel für das Sicherungsverzeichnis
TIMESTAMP=$(date +%Y-%m-%d)

# Name des Sicherungsverzeichnisses
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# Vollständiger Pfad zum Sicherungsverzeichnis im B2-Bucket
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# Anzahl der wöchentlichen Snapshots, die behalten werden sollen
NUM_SNAPSHOTS=3

# Ausschlussfilter (nach der Datenbanksicherung angewendet)
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDB-Sicherungseinstellungen (nach Bedarf anpassen)
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # Pfad zum ChromaDB-Datenverzeichnis
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # Archivdatei für ChromaDB-Backup

# SQLite-Sicherungseinstellungen (nach Bedarf anpassen)
SQLITE_DB_FILE="$SOURCE/webui.db" # Pfad zur SQLite-Datenbankdatei
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # Temporäre Datei für SQLite-Backup

# Funktion zur Sicherung von ChromaDB
backup_chromadb() {
  echo "Sichere ChromaDB..."

  # Erstellen eines Tar-Archivs des vector_db-Verzeichnisses
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDB-Sicherung abgeschlossen."
}

# Funktion zur Sicherung von SQLite
backup_sqlite() {
  echo "Sichere SQLite-Datenbank..."
  # Sichern der SQLite-Datenbank mit dem .backup-Befehl
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # Verschieben der Sicherungsdatei ins Quellverzeichnis
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLite-Sicherung abgeschlossen."
}

# Führen Sie die Datenbanksicherungen durch
backup_chromadb
backup_sqlite

# Backup mit Ausschlüssen durchführen
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# Alte Backups löschen und die aktuellsten NUM_SNAPSHOTS behalten
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "Backup abgeschlossen: $DESTINATION"
```

---

## Point-in-Time-Snapshots

Zusätzlich zur Erstellung von Sicherungen möchten Benutzer möglicherweise auch Point-in-Time-Snapshots erstellen, die lokal (auf dem Server), remote oder beides gespeichert werden können.

```bash
#!/bin/bash

# Konfiguration
SOURCE_DIR="."  # Verzeichnis zum Snapshoten (aktuelles Verzeichnis)
SNAPSHOT_DIR="/snapshots" # Verzeichnis zum Speichern der Snapshots
TIMESTAMP=$(date +%Y%m%d%H%M%S) # Zeitstempel generieren

# Erstelle das Snapshot-Verzeichnis, falls es nicht existiert
mkdir -p "$SNAPSHOT_DIR"

# Erstellt den Schnappschussnamen
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# Führe den rsync-Snapshot durch
echo "Erstelle Snapshot: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# Überprüfe, ob rsync erfolgreich war
if [ $? -eq 0 ]; then
  echo "Snapshot erfolgreich erstellt."
else
  echo "Fehler: Snapshot-Erstellung fehlgeschlagen."
  exit 1
fi

exit 0
```
## Crontab zur Planung

Sobald Sie Ihr Backup-Skript hinzugefügt und Ihren Backup-Speicher bereitgestellt haben, sollten Sie die Skripte testen, um sicherzustellen, dass sie wie erwartet ausgeführt werden. Logging wird dringend empfohlen.

Richten Sie Ihre neuen Skripte so ein, dass sie mit Crontabs gemäß der gewünschten Ausführungsfrequenz laufen.

# Kommerzielle Utilities

Neben der Skripterstellung eigener Backup-Jobs können Sie auch kommerzielle Angebote finden, die im Allgemeinen durch die Installation von Agents auf Ihrem Server funktionieren, die die Komplexität der Backup-Ausführung abstrahieren. Diese liegen außerhalb des Rahmens dieses Artikels, bieten jedoch bequeme Lösungen.

---

# Host-Level-Backups

Ihre Open WebUI-Instanz könnte auf einem Host (physisch oder virtualisiert) bereitgestellt sein, den Sie kontrollieren.

Host-Level-Backups beinhalten das Erstellen von Snapshots oder Backups der gesamten VM, anstatt von Anwendungen.

Einige möchten sie möglicherweise als primären oder einzigen Schutz nutzen, während andere sie als zusätzliche Datenschichten einbinden möchten.

# Wie viele Backups brauche ich?

Die Anzahl der Backups, die Sie erstellen möchten, hängt von Ihrem persönlichen Risikotoleranzniveau ab. Bedenken Sie jedoch, dass es bewährte Praxis ist, *nicht* die Anwendung selbst als Backup-Kopie zu betrachten (auch wenn sie in der Cloud liegt!). Das bedeutet, dass es selbst bei einer Bereitstellung Ihrer Instanz auf einem VPS immer noch eine sinnvolle Empfehlung ist, zwei (unabhängige) Backup-Kopien zu behalten.

Ein Beispiel-Backup-Plan, der die Bedürfnisse vieler Heimanwender abdeckt:

## Modell-Backup-Plan 1 (primär + 2 Kopien)

| Häufigkeit | Ziel | Technologie | Beschreibung |
|---|---|---|---|
| Tägliches inkrementelles Backup | Cloud-Speicher (S3/B2) | rsync | Täglich inkrementelles Backup, das in eine Cloud-Speicher-Bucket (S3 oder B2) hochgeladen wird. |
| Wöchentliches inkrementelles Backup | Lokaler Speicher (Heim-NAS) | rsync | Wöchentlich inkrementelles Backup, das vom Server auf lokalen Speicher (z.B. ein Heim-NAS) kopiert wird. |

## Modell-Backup-Plan 2 (primär + 3 Kopien)

Dieser Backup-Plan ist etwas komplizierter, aber auch umfassender. Er umfasst tägliche Übertragungen zu zwei Cloud-Speicheranbietern für zusätzliche Redundanz.

| Häufigkeit | Ziel | Technologie | Beschreibung |
|---|---|---|---|
| Tägliches inkrementelles Backup | Cloud-Speicher (S3) | rsync | Täglich inkrementelles Backup, das in eine S3-Cloud-Speicher-Bucket hochgeladen wird. |
| Tägliches inkrementelles Backup | Cloud-Speicher (B2) | rsync | Täglich inkrementelles Backup, das in eine Backblaze B2-Cloud-Speicher-Bucket hochgeladen wird. |
| Wöchentliches inkrementelles Backup | Lokaler Speicher (Heim-NAS) | rsync | Wöchentlich inkrementelles Backup, das vom Server auf lokalen Speicher (z.B. ein Heim-NAS) kopiert wird. |

# Zusätzliche Themen

Zur Wahrung der Übersichtlichkeit wurden diese zusätzlichen Themen weggelassen, könnten jedoch je nach Ihrer verfügbaren Zeit zur Einrichtung und Pflege eines Datenschutzplans für Ihre Instanz Berücksichtigung finden:

| Thema | Beschreibung |
|---|---|
| SQLite-Integrierte Backup-Funktion | Ziehen Sie in Betracht, den SQLite-Befehl `.backup` für eine konsistente Datenbanksicherungs-Lösung zu verwenden. |
| Verschlüsselung | Ändern Sie Backup-Skripte, um die Verschlüsselung im Ruhezustand für mehr Sicherheit zu integrieren. |
| Katastrophenwiederherstellung und Tests | Entwickeln Sie einen Plan zur Katastrophenwiederherstellung und testen Sie regelmäßig den Backup- und Wiederherstellungsprozess. |
| Alternative Backup-Werkzeuge | Erkunden Sie andere Befehlszeilen-Backup-Tools wie `borgbackup` oder `restic` für erweiterte Funktionen. |
| E-Mail-Benachrichtigungen und Webhooks | Implementieren Sie E-Mail-Benachrichtigungen oder Webhooks, um den Erfolg oder das Scheitern von Backups zu überwachen. |
