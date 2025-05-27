---
sidebar_position: 1000
title: "💾 Sauvegardes"
---
 
 :::warning
Ce tutoriel est une contribution de la communauté et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

 # Sauvegarder votre instance

 Personne n'aime perdre des données ! 

 Si vous hébergez Open WebUI vous-même, vous pourriez envisager de mettre en place un plan de sauvegarde formel pour garantir que vous disposez d'une deuxième et troisième copie de certaines parties de votre configuration.

 Ce guide vise à recommander des mesures de base pour les utilisateurs qui souhaitent le faire. 

 Ce guide suppose que l'utilisateur a installé Open WebUI via Docker (ou prévoit de le faire).

 ## Assurer la persistance des données

Premièrement, avant de déployer votre pile avec Docker, assurez-vous que votre Docker Compose utilise un stockage de données persistant. Si vous utilisez le Docker Compose [provenant du dépôt GitHub](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml), cela est déjà pris en charge. Mais il est facile de créer ses propres variations et d'oublier de vérifier cela.

Les conteneurs Docker sont éphémères et les données doivent être persistées pour garantir leur survie sur le système de fichiers hôte.

## Utilisation des volumes Docker

Si vous utilisez le Docker Compose provenant du dépôt du projet, vous déploierez Open WebUI à l'aide de volumes Docker.

Pour Ollama et Open WebUI, les montages sont les suivants :

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

Pour trouver le chemin d'accès réel sur l'hôte, exécutez :

`docker volume inspect ollama` 

et

`docker volume inspect open-webui`

## Utilisation des montages directs sur l'hôte

Certains utilisateurs déploient Open WebUI avec des montages directs (fixes) sur le système de fichiers hôte, comme ceci :

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

Si c'est comme cela que vous avez déployé votre instance, vous devrez noter les chemins à la racine.

## Script pour une tâche de sauvegarde

Peu importe la manière dont votre instance est provisionnée, il est utile d'inspecter le stockage des données de l'application sur votre serveur pour comprendre les données que vous sauvegarderez. Vous devriez voir quelque chose comme ceci :

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## Fichiers dans le stockage de données persistant 

| Fichier/Répertoire | Description |
|---|---|
| `audit.log` | Fichier journal des événements d'audit. |
| `cache/` | Répertoire pour stocker les données mises en cache. |
| `uploads/` | Répertoire pour stocker les fichiers téléchargés par les utilisateurs. |
| `vector_db/` | Répertoire contenant la base de données vectorielle ChromaDB. |
| `webui.db` | Base de données SQLite pour le stockage persistant des autres données de l'instance |

# Approches de sauvegarde au niveau des fichiers

La première façon de sauvegarder les données de l'application est d'adopter une approche de sauvegarde au niveau des fichiers pour garantir que les données persistantes d'Open WebUI sont correctement sauvegardées.

Il existe une infinité de façons dont les services techniques peuvent être sauvegardés, mais `rsync` reste un favori populaire pour les tâches incrémentielles et sera utilisé comme démonstration.

Les utilisateurs pourraient cibler l'ensemble du répertoire de `data` pour sauvegarder toutes les données de l'instance à la fois ou créer des tâches de sauvegarde plus sélectives ciblant des composants individuels. Vous pourriez également ajouter des noms plus descriptifs pour les cibles.

Un modèle de tâche rsync pourrait ressembler à ceci :

```bash
#!/bin/bash

# Configuration
SOURCE_DIR="."  # Répertoire actuel (où réside la structure des fichiers)
B2_BUCKET="b2://OpenWebUI-backups" # Votre bucket Backblaze B2
B2_PROFILE="your_rclone_profile" # Le nom de votre profil rclone
# Assurez-vous que rclone est configuré avec vos identifiants B2

# Définir les répertoires source et destination
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Exclure le cache et audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construire les arguments exclus pour rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Fonction pour exécuter la synchronisation rclone avec vérification des erreurs
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Synchronisation de $SOURCE vers $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Erreur : la synchronisation rclone a échoué pour $SOURCE vers $DEST"
        exit 1
    fi
}

# Exécuter la synchronisation rclone pour chaque répertoire/fichier
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "Sauvegarde terminée avec succès."
exit 0
```

## Interruption du travail Rsync avec le conteneur

Pour maintenir l'intégrité des données, il est généralement recommandé d'exécuter des sauvegardes de bases de données sur des systèmes de fichiers à froid. Notre modèle de tâche de sauvegarde par défaut peut être légèrement modifié pour arrêter la pile avant d'exécuter le script de sauvegarde et la redémarrer après.

L'inconvénient de cette approche, bien sûr, est qu'elle entraînera des temps d'arrêt de l'instance. Envisagez d'exécuter la tâche à des moments où vous n'utiliserez pas l'instance ou de prendre des "logiciels" quotidiens (sur les données en cours d'exécution) et des hebdomadaires plus robustes (sur les données froides).

```bash
#!/bin/bash

# Configuration
COMPOSE_FILE="docker-compose.yml" # Chemin du fichier docker-compose.yml
B2_BUCKET="b2://OpenWebUI-backups" # Votre bucket Backblaze B2
B2_PROFILE="your_rclone_profile" # Le nom de votre profil rclone
SOURCE_DIR="."  # Répertoire actuel (où se trouve la structure de fichiers)

# Définissez les répertoires source et destination
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Exclure cache et audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construire les arguments d'exclusion pour rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Fonction pour effectuer une synchronisation rclone avec vérification des erreurs
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Synchronisation de $SOURCE vers $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Erreur : la synchronisation rclone a échoué pour $SOURCE vers $DEST"
        exit 1
    fi
}

# 1. Arrêter l'environnement Docker Compose
echo "Arrêt de l'environnement Docker Compose..."
docker-compose -f "$COMPOSE_FILE" down

# 2. Effectuer la sauvegarde
echo "Démarrage de la sauvegarde..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Relancer l'environnement Docker Compose
echo "Redémarrage de l'environnement Docker Compose..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Sauvegarde terminée avec succès."
exit 0
```

## Script de Sauvegarde de Modèle Utilisant les Fonctions de Sauvegarde SQLite & ChromaDB vers le Distant B2

```bash
#!/bin/bash
#
# Script de sauvegarde pour sauvegarder ChromaDB et SQLite dans un bucket Backblaze B2
# openwebuiweeklies, en conservant 3 instantanés hebdomadaires.
# Les instantanés sont indépendants et entièrement restaurables.
# Utilise les mécanismes de sauvegarde natifs de ChromaDB et SQLite.
# Exclut audit.log, cache et les répertoires uploads.
#
# Assurez-vous que rclone est installé et correctement configuré.
# Installer rclone : https://rclone.org/install/
# Configurer rclone : https://rclone.org/b2/

# Répertoire source (contenant les données ChromaDB et SQLite)
SOURCE="/var/lib/open-webui/data"

# Nom du bucket B2 et nom distant
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# Horodatage pour le répertoire de sauvegarde
TIMESTAMP=$(date +%Y-%m-%d)

# Nom du répertoire de sauvegarde
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# Chemin complet vers le répertoire de sauvegarde dans le bucket B2
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# Nombre d'instantanés hebdomadaires à conserver
NUM_SNAPSHOTS=3

# Filtres d'exclusion (appliqués *après* les sauvegardes de base de données)
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# Paramètres de Sauvegarde ChromaDB (à ajuster si nécessaire)
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # Chemin du répertoire de données ChromaDB
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # Fichier d'archive pour la sauvegarde ChromaDB

# Paramètres de Sauvegarde SQLite (à ajuster si nécessaire)
SQLITE_DB_FILE="$SOURCE/webui.db" # Chemin vers le fichier de base de données SQLite
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # Fichier temporaire pour la sauvegarde SQLite

# Fonction pour sauvegarder ChromaDB
backup_chromadb() {
  echo "Sauvegarde de ChromaDB..."

  # Créer une archive tar du répertoire vector_db
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "Sauvegarde de ChromaDB terminée."
}

# Fonction pour sauvegarder SQLite
backup_sqlite() {
  echo "Sauvegarde de la base de données SQLite..."
  # Sauvegarder la base de données SQLite avec la commande .backup
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # Déplacer le fichier de sauvegarde dans le répertoire source
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "Sauvegarde SQLite terminée."
}

# Effectuer des sauvegardes de base de données
backup_chromadb
backup_sqlite

# Effectuer la sauvegarde avec les exclusions
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# Supprimer les anciennes sauvegardes en conservant les NUM_SNAPSHOTS les plus récents
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "Sauvegarde terminée vers $DESTINATION"
```

---

## Instantanés Ponctuels

En plus des sauvegardes, les utilisateurs peuvent aussi souhaiter créer des instantanés ponctuels pouvant être stockés localement (sur le serveur), à distance, ou les deux.

```bash
#!/bin/bash

# Configuration
SOURCE_DIR="."  # Répertoire à sauvegarder (répertoire actuel)
SNAPSHOT_DIR="/snapshots" # Répertoire pour stocker les sauvegardes
TIMESTAMP=$(date +%Y%m%d%H%M%S) # Générer un timestamp

# Créer le répertoire de sauvegarde s'il n'existe pas
mkdir -p "$SNAPSHOT_DIR"

# Créer le nom de la sauvegarde
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# Effectuer la sauvegarde avec rsync
echo "Création de la sauvegarde : $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# Vérifier si la commande rsync a réussi
if [ $? -eq 0 ]; then
  echo "Sauvegarde créée avec succès."
else
  echo "Erreur : Échec de la création de la sauvegarde."
  exit 1
fi

exit 0
```
## Crontab pour la planification

Une fois que vous avez ajouté votre script de sauvegarde et provisionné votre stockage de sauvegarde, vous devrez tester les scripts pour vous assurer qu'ils fonctionnent comme prévu. La journalisation est fortement recommandée.

Configurez vos nouveaux scripts pour qu'ils s'exécutent via des crontabs selon la fréquence d'exécution souhaitée.

# Utilitaires commerciaux

En plus de créer vos propres scripts de sauvegarde, vous pouvez trouver des solutions commerciales qui fonctionnent généralement en installant des agents sur votre serveur afin de simplifier la complexité des sauvegardes. Ces solutions sortent du cadre de cet article mais offrent des options pratiques.

---

# Sauvegardes au niveau de l'hôte

Votre instance Open WebUI peut être hébergée sur un serveur (physique ou virtualisé) que vous contrôlez.

Les sauvegardes au niveau de l'hôte consistent à créer des instantanés ou des sauvegardes de l'ensemble de la machine virtuelle plutôt que des applications exécutées.

Certains peuvent souhaiter les utiliser comme leur principale ou seule protection, tandis que d'autres pourraient vouloir les ajouter comme protection supplémentaire des données.

# Combien de sauvegardes dois-je avoir ?

La quantité de sauvegardes que vous souhaiterez effectuer dépend de votre tolérance personnelle au risque. Cependant, rappelez-vous qu'il est préférable de *ne pas* considérer l'application elle-même comme une copie de sauvegarde (même si elle est dans le cloud !). Cela signifie que si vous avez configuré votre instance sur un VPS, il est toujours raisonnable de conserver deux copies de sauvegarde indépendantes.

Un exemple de plan de sauvegarde qui répondrait aux besoins de nombreux utilisateurs domestiques :

## Plan de sauvegarde modèle 1 (principal + 2 copies)

| Fréquence | Cible | Technologie | Description |
|---|---|---|---|
| Incrémental quotidien | Stockage Cloud (S3/B2) | rsync | Sauvegarde incrémentale quotidienne poussée vers un bucket de stockage cloud (S3 ou B2). |
| Incrémental hebdomadaire | Stockage local (NAS domestique) | rsync | Sauvegarde incrémentale hebdomadaire récupérée depuis le serveur vers un stockage local (par exemple, un NAS domestique). |

## Plan de sauvegarde modèle 2 (principal + 3 copies)

Ce plan de sauvegarde est un peu plus complexe mais aussi plus complet. Il implique des sauvegardes quotidiennes vers deux fournisseurs de stockage cloud pour une redondance supplémentaire.

| Fréquence | Cible | Technologie | Description |
|---|---|---|---|
| Incrémental quotidien | Stockage Cloud (S3) | rsync | Sauvegarde incrémentale quotidienne poussée vers un bucket de stockage cloud S3. |
| Incrémental quotidien | Stockage Cloud (B2) | rsync | Sauvegarde incrémentale quotidienne poussée vers un bucket de stockage cloud Backblaze B2. |
| Incrémental hebdomadaire | Stockage local (NAS domestique) | rsync | Sauvegarde incrémentale hebdomadaire récupérée depuis le serveur vers un stockage local (par exemple, un NAS domestique). |

# Sujets supplémentaires

Dans l'intérêt de garder ce guide raisonnablement complet, ces sujets supplémentaires ont été omis mais pourraient mériter votre considération en fonction du temps que vous avez à consacrer à la configuration et à la maintenance d'un plan de protection des données pour votre instance :

| Sujet | Description |
|---|---|
| Sauvegarde intégrée SQLite | Envisagez d'utiliser la commande `.backup` de SQLite pour une solution de sauvegarde de base de données cohérente. |
| Cryptage | Modifiez les scripts de sauvegarde pour intégrer un cryptage au repos afin d'améliorer la sécurité. |
| Récupération et test de sinistre | Développez un plan de récupération en cas de sinistre et testez régulièrement le processus de sauvegarde et de restauration. |
| Outils de sauvegarde alternatifs | Explorez d'autres outils de sauvegarde en ligne de commande comme `borgbackup` ou `restic` pour des fonctionnalités avancées. |
| Notifications par email et webhooks | Mettez en œuvre des notifications par email ou des webhooks pour surveiller le succès ou l'échec des sauvegardes. |
