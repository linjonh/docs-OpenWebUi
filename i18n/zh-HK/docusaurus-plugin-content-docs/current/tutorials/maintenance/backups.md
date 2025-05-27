---
sidebar_position: 1000
title: "💾 備份"
---
 
 :::警告
此教學由社群貢獻完成，並未獲得 Open WebUI 團隊的支援。它僅用於展示如何根據您的特定使用案例自訂 Open WebUI。如果您想貢獻，請查看貢獻教學。
:::

 # 備份您的實例

 沒有人喜歡丟失資料！

 如果您正在自行託管 Open WebUI，那麼您可能希望制定某種正式的備份計劃，以確保保留您的部分配置的第二或第三份副本。

 本指南旨在推薦一些基本建議，用戶可以根據這些建議進行備份。

 本指南假設用戶已通過 Docker 安裝 Open WebUI（或打算這樣做）

 ## 確保資料持久性

首先，在使用 Docker 部署您的堆疊之前，確保您的 Docker Compose 使用了持久化的資料存儲。如果您使用的是 [Github 儲存庫中的 Docker Compose](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml)，這已經處理好了。但制定自己的變化時，可能容易忘記去檢查。

Docker 容器是臨時性的，因此資料必須持久化以確保它能夠留存在主機檔案系統中。

## 使用 Docker 卷

如果您使用的是專案儲存庫中的 Docker Compose，您將使用 Docker 卷部署 Open Web UI。

對於 Ollama 和 Open WebUI，其掛載如下：

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

要查找主機上的實際綁定路徑，執行：

`docker volume inspect ollama` 

以及

`docker volume inspect open-webui`

## 使用直接主機綁定

某些用戶以直接（固定）綁定方式部署 Open Web UI 到主機檔案系統，例如：

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

如果這是您部署實例的方式，請注意根目錄上的路徑。

## 撰寫備份腳本

不論您的實例如何配置，檢查伺服器上的應用資料存儲是值得的，以了解您將備份哪些資料。您應該看到如下內容：

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## 持久化資料存儲中的檔案 

| 檔案/目錄 | 描述 |
|---|---|
| `audit.log` | 用於審核事件的日誌檔案。 |
| `cache/` | 用於存儲快取資料的目錄。 |
| `uploads/` | 用於存儲使用者上傳檔案的目錄。 |
| `vector_db/` | 包含 ChromaDB 向量資料庫的目錄。 |
| `webui.db` | SQLite 資料庫，用於持久存儲其他實例資料 |

# 檔案級備份方法

備份應用資料的第一種方法是採取檔案級備份方法，確保持久化的 Open Web UI 資料被妥善備份。

技術服務可以被備份的方式幾乎是無限的，但 `rsync` 仍然是進行增量備份的熱門選擇，因此將用作演示。

用戶可以針對整個 `data` 目錄進行備份以同時備份所有實例數據，或者針對個別組件創建選定的備份任務。您也可以為目標添加更具描述性的名稱。

一個範例 rsync 任務可能如下：

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 當前目錄（檔案結構所在位置）
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 儲存桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置檔案名稱
# 確保已使用您的 B2 憑據配置 rclone

# 定義源目錄和目標目錄
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# 排除 cache 和 audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# 構建 rclone 的排除參數
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# 執行 rclone 同步的函數，帶錯誤檢查
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在同步 $SOURCE 到 $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "錯誤：rclone 同步 $SOURCE 到 $DEST 失敗"
        exit 1
    fi
}

# 對每個目錄/檔案執行 rclone 同步
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "備份成功完成。"
exit 0
```

## Rsync 任務與容器中斷

為了保持數據完整性，通常建議在冷文件系統上執行數據庫備份。我們的默認模型備份任務可以稍作修改，先關閉堆棧，執行備份腳本後再重新啟動。

當然，此方法的缺點是會導致實例停機。可考慮在您不會使用實例的時間執行此任務，或者對運行中的數據進行“每日軟體”備份，對冷數據進行更強大的每週備份。

```bash
#!/bin/bash

# 配置
COMPOSE_FILE="docker-compose.yml" # docker-compose.yml 文件的路徑
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 存儲桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置文件名稱
SOURCE_DIR="."  # 當前目錄（文件結構所在的位置）

# 定義來源和目標目錄
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# 排除緩存和 audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# 為 rclone 構造排除參數
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# 執行 rclone 同步並檢查錯誤的函數
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在將 $SOURCE 同步到 $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "錯誤：rclone 同步失敗，來源：$SOURCE，目標：$DEST"
        exit 1
    fi
}

# 1. 停止 Docker Compose 環境
echo "正在停止 Docker Compose 環境..."
docker-compose -f "$COMPOSE_FILE" down

# 2. 執行備份
echo "開始備份..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. 啟動 Docker Compose 環境
echo "正在啟動 Docker Compose 環境..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "備份成功完成。"
exit 0
```

## 使用 SQLite 和 ChromaDB 的備份腳本將備份存儲到 B2 遠端

```bash
#!/bin/bash
#
# 備份腳本將 ChromaDB 和 SQLite 備份到 Backblaze B2 存儲桶
# openwebuiweeklies，保留 3 個每週快照。
# 快照是獨立且完全可恢復的。
# 使用 ChromaDB 和 SQLite 的原生備份機制。
# 排除 audit.log、cache 和 uploads 目錄。
#
# 確保 rclone 已正確安裝和配置。
# 安裝 rclone: https://rclone.org/install/
# 配置 rclone: https://rclone.org/b2/

# 資料來源目錄（包含 ChromaDB 和 SQLite 數據）
SOURCE="/var/lib/open-webui/data"

# B2 存儲桶名稱和遠端名稱
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# 備份目錄的時間戳
TIMESTAMP=$(date +%Y-%m-%d)

# 備份目錄名稱
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# B2 存儲桶中備份目錄的完整路徑
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# 要保留的每週快照數量
NUM_SNAPSHOTS=3

# 排除過濾器（在數據庫備份之後應用）
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDB 備份設置（根據需要進行調整）
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # ChromaDB 數據目錄的路徑
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # ChromaDB 備份的存檔文件

# SQLite 備份設置（根據需要進行調整）
SQLITE_DB_FILE="$SOURCE/webui.db" # SQLite 數據庫文件的路徑
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # SQLite 備份的臨時文件

# 備份 ChromaDB 的函數
backup_chromadb() {
  echo "正在備份 ChromaDB..."

  # 為 vector_db 目錄創建一個 tar 存檔
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDB 備份完成。"
}

# 備份 SQLite 的函數
backup_sqlite() {
  echo "正在備份 SQLite 數據庫..."
  # 使用 .backup 命令備份 SQLite 數據庫
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # 將備份文件移動到來源目錄
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLite 備份完成。"
}

# 執行數據庫備份
backup_chromadb
backup_sqlite

# 使用排除規則進行備份
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# 刪除舊備份，只保留最近的 NUM_SNAPSHOTS 個快照
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "備份完成至 $DESTINATION"
```

---

## 時間點快照

除了進行備份，用戶可能還希望創建時間點快照，這些快照可以存儲在本地（服務器上），遠端，或者同時存儲兩處。

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 要快照的目錄（當前目錄）
SNAPSHOT_DIR="/snapshots" # 存儲快照的目錄
TIMESTAMP=$(date +%Y%m%d%H%M%S) # 生成時間戳

# 如果快照目錄不存在，則創建
mkdir -p "$SNAPSHOT_DIR"

# 創建快照名稱
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# 執行 rsync 快照
echo "正在創建快照: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# 檢查 rsync 是否成功
if [ $? -eq 0 ]; then
  echo "快照創建成功。"
else
  echo "錯誤: 快照創建失敗。"
  exit 1
fi

exit 0
```
## 使用 Crontab 進行排程

添加備份腳本並配置備份存儲後，請確保測試腳本以確認它們按預期運行。建議啟用日誌記錄。

根據所需的運行頻率，使用 crontab 設置新腳本。

# 商業工具

除了編寫自己的備份腳本外，還可以使用商業軟件，一般通過在伺服器上安裝代理程式來簡化備份操作的復雜性。本文主要描述原理，未涉及這些商業方案，但這些方案提供了簡便的解決方案。

---

# 主機層級備份

您的 Open WebUI 實例可能被部署在您控制的主機（實體或虛擬化）。

主機層級備份涉及創建快照或備份整個虛擬機，而不僅僅僅是運行的應用程序。

有些人可能希望將其作為主要或唯一的保護方法，而其他人可能更願意將其作為額外的數據保護層。

# 我需要多少個備份？

您希望做多少備份取決於您的個人風險承受能力。但是，請記住，最佳實踐是*不要*將應用程序本身視為一個備份副本（即便它位於雲端！）。這意味著，即使您將實例配置在 VPS 上，仍然建議保留兩個（獨立的）備份副本。

一個適合大多數家庭用戶的示例備份計劃：

## 示例備份計劃 1（主要+2 副本）

| 頻率 | 目標 | 技術 | 描述 |
|---|---|---|---|
| 每日增量備份 | 雲存儲（S3/B2） | rsync | 每日增量備份推送到雲存儲桶（S3 或 B2）。 |
| 每週增量備份 | 本地存儲（家庭 NAS） | rsync | 每週增量備份從伺服器拉取至本地存儲（例如家庭 NAS）。 |

## 示例備份計劃 2（主要+3 副本）

此備份計劃稍微更復雜，但更全面……涉及每日推送至兩個雲存儲提供商以提供額外的冗餘。

| 頻率 | 目標 | 技術 | 描述 |
|---|---|---|---|
| 每日增量備份 | 雲存儲（S3） | rsync | 每日增量備份推送到 S3 雲存儲桶。 |
| 每日增量備份 | 雲存儲（B2） | rsync | 每日增量備份推送到 Backblaze B2 雲存儲桶。 |
| 每週增量備份 | 本地存儲（家庭 NAS） | rsync | 每週增量備份從伺服器拉取至本地存儲（例如家庭 NAS）。 |

# 其他主題

為了使本指南保持合理的全面性，這些額外主題被省略，但根據您為實例設置和維護數據保護計劃所能花費的時間，這些可能值得深入考慮：

| 主題 | 描述 |
|---|---|
| SQLite 內建備份 | 考慮使用 SQLite 的 `.backup` 指令作為一致的數據庫備份解決方案。 |
| 加密 | 修改備份腳本以加入靜態加密功能以增強安全性。 |
| 災難恢復和測試 | 制定災難恢復計劃並定期測試備份與還原過程。 |
| 替代備份工具 | 探索其他命令列備份工具，如 `borgbackup` 或 `restic`，以獲取更多實用功能。 |
| 電子郵件通知和 Webhook | 實施電子郵件通知或 Webhook，以監控備份成功或失敗情況。 |
