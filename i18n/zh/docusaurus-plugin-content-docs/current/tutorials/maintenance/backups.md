---
sidebar_position: 1000
title: "💾 备份"
---
 
 :::warning
本教程是社区贡献内容，不受 Open WebUI 团队支持。它仅用于演示如何针对您的特定使用案例自定义 Open WebUI。想要贡献？请查看贡献教程。
:::

 #  备份您的实例

 没有人喜欢丢失数据！ 

 如果您是自行托管 Open WebUI，那么您可能希望制定某种形式的正式备份计划，以确保您保留配置部分的第二份和第三份备份。

 本指南旨在为用户推荐一些如何进行备份的基本建议。

 本指南假定用户已通过 Docker 安装 Open WebUI（或计划这样做）

 ## 确保数据持久性

首先，在使用 Docker 部署堆栈之前，请确保您的 Docker Compose 使用了持久数据存储。如果您使用的是 [Github 仓库](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml) 中的 Docker Compose，这已被处理。但自定义您的变体时，很容易忘记验证这一点。

Docker 容器是临时的，数据必须持久化才能在主机文件系统上保留。

## 使用 Docker 卷

如果您使用的是项目仓库中的 Docker Compose，您将通过 Docker 卷部署 Open Web UI。

对于 Ollama 和 Open WebUI，挂载路径是：

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

要在主机上找到实际绑定路径，请运行：

`docker volume inspect ollama` 

和

`docker volume inspect open-webui`

## 使用主机直接绑定

一些用户通过直接（固定）绑定到主机文件系统的方式部署 Open Web UI，如下所示：

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

如果您是如此部署的实例，您需要记录根上的路径。

## 脚本化备份任务

不论您的实例如何配置，检查服务器上的应用数据存储以了解您要备份的数据是值得的。您应看到类似这样的内容：

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## 持久数据存储中的文件 

| 文件/目录 | 描述 |
|---|---|
| `audit.log` | 事件审计日志文件。 |
| `cache/` | 用于存储缓存数据的目录。 |
| `uploads/` | 用于存储用户上传文件的目录。 |
| `vector_db/` | 包含 ChromaDB 向量数据库的目录。 |
| `webui.db` | 用于其他实例数据持久存储的 SQLite 数据库。 |

# 文件级备份方法

备份应用数据的第一种方法是采取文件级备份方法，确保持久的 Open Web UI 数据得到正确备份。

有几乎无数种备份技术服务的方法，但 `rsync` 作为增量任务的热门选择，将用于演示。

用户可以目标整个 `data` 目录，以一次性备份所有实例数据，或者创建更有选择性的备份任务，仅针对具体组件。您还可以为目标添加更具描述性的名称。

一个示例 rsync 任务可能看起来像这样：

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 当前目录（文件结构所在位置）
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 存储桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置文件名
# 确保 rclone 已配置您的 B2 凭据

# 定义源目录和目标目录
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

# 为 rclone 构造排除参数
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# 用错误检查执行 rclone 同步的函数
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在同步 $SOURCE 到 $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "错误：rclone 同步失败：从 $SOURCE 到 $DEST"
        exit 1
    fi
}

# 为每个目录/文件执行 rclone 同步
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "备份成功完成。"
exit 0
```

## 使用容器中断的Rsync备份任务

为了维护数据完整性，通常建议在冷文件系统上进行数据库备份。我们的默认模型备份任务可以稍作修改，在运行备份脚本之前停掉服务栈并在之后重启。

这种方法的缺点当然是会导致实例停机。可以考虑在您不会使用实例的时间运行任务，或者对运行中的数据进行“软件”日常备份并对冷数据进行更强健的每周备份。

```bash
#!/bin/bash

# 配置
COMPOSE_FILE="docker-compose.yml" # docker-compose.yml 文件的路径
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 存储桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置文件名
SOURCE_DIR="."  # 当前目录（文件结构所在位置）

# 定义源目录和目标目录
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# 排除缓存和 audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# 为 rclone 构建排除参数
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# 执行 rclone 同步并进行错误检查的函数
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在同步 $SOURCE 到 $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "错误: 从 $SOURCE 到 $DEST 的 rclone 同步失败"
        exit 1
    fi
}

# 1. 停止 Docker Compose 环境
echo "正在停止 Docker Compose 环境..."
docker-compose -f "$COMPOSE_FILE" down

# 2. 进行备份
echo "开始备份..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. 启动 Docker Compose 环境
echo "正在启动 Docker Compose 环境..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "备份成功完成."
exit 0
```

## 使用 SQLite 和 ChromaDB 备份函数到 B2 远程的模型备份脚本

```bash
#!/bin/bash
#
# 备份脚本，将 ChromaDB 和 SQLite 数据备份到 Backblaze B2 存储桶
# openwebuiweeklies，保留 3 个每周快照。
# 快照是独立的并可完全恢复。
# 使用 ChromaDB 和 SQLite 原生备份机制。
# 排除 audit.log、cache 和 uploads 目录。
#
# 确保 rclone 已正确安装和配置。
# 安装 rclone: https://rclone.org/install/
# 配置 rclone: https://rclone.org/b2/

# 源目录（包含 ChromaDB 和 SQLite 数据）
SOURCE="/var/lib/open-webui/data"

# B2 存储桶名称和远程名称
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# 备份目录的时间戳
TIMESTAMP=$(date +%Y-%m-%d)

# 备份目录名称
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# B2 存储桶中备份目录的完整路径
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# 保留的每周快照数量
NUM_SNAPSHOTS=3

# 排除过滤器（在数据库备份之后应用）
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDB 备份设置（根据需要调整）
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # ChromaDB 数据目录的路径
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # ChromaDB 备份的存档文件

# SQLite 备份设置（根据需要调整）
SQLITE_DB_FILE="$SOURCE/webui.db" # SQLite 数据库文件的路径
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # SQLite 备份的临时文件

# 备份 ChromaDB 的函数
backup_chromadb() {
  echo "正在备份 ChromaDB..."

  # 创建 vector_db 目录的 tar 存档
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDB 备份完成."
}

# 备份 SQLite 的函数
backup_sqlite() {
  echo "正在备份 SQLite 数据库..."
  # 使用 .backup 命令备份 SQLite 数据库
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # 将备份文件移动到源目录
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLite 备份完成."
}

# 执行数据库备份
backup_chromadb
backup_sqlite

# 使用排除项进行备份
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# 删除旧的备份，仅保留最近的 NUM_SNAPSHOTS 个
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "备份完成到 $DESTINATION"
```

---

## 时间点快照

除备份外，用户还可以创建时间点快照，这些快照可以存储在本地（服务器上）、远程，或者两者。

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 要快照的目录（当前目录）
SNAPSHOT_DIR="/snapshots" # 存储快照的目录
TIMESTAMP=$(date +%Y%m%d%H%M%S) # 生成时间戳

# 如果快照目录不存在，则创建该目录
mkdir -p "$SNAPSHOT_DIR"

# 创建快照名称
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# 执行rsync快照
echo "正在创建快照: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# 检查rsync是否成功
if [ $? -eq 0 ]; then
  echo "快照创建成功。"
else
  echo "错误: 快照创建失败。"
  exit 1
fi

exit 0
```
## 定时任务调度（Crontab）

在添加备份脚本并配置备份存储后，您需要对脚本进行质量检查，以确保它们按预期运行。建议启用日志记录。

根据所需的运行频率，使用crontab设置您的新脚本以运行。

# 商业备份工具

除了编写自己的备份脚本，您还可以找到一些商业产品，这些产品通常通过在您的服务器上安装代理程序来简化备份运行的复杂性。这些超出了本文的讨论范围，但提供了便捷的解决方案。

---

# 主机级备份

您的Open WebUI实例可能部署在您控制的主机（物理或虚拟化）上。

主机级备份指的是对整个虚拟机进行快照或备份，而不是仅针对运行的应用程序。

有些人可能希望将其作为主要或唯一的保护措施，而其他人可能希望将其作为额外的数据保护层。

# 我需要多少个备份？

您希望进行的备份数量取决于您的风险承受能力。然而，请记住，最好不要将应用程序本身视为备份副本（即使它运行在云端！）。这意味着如果您将实例部署在一个VPS上，仍然建议保留两个（独立的）备份副本。

以下是一个适合许多家庭用户的备份计划示例：

## 示例备份计划1（主要+2个副本）

| 频率 | 目标 | 技术 | 描述 |
|---|---|---|---|
| 每日增量 | 云存储 (S3/B2) | rsync | 每日增量备份推送到云存储桶（S3或B2）。 |
| 每周增量 | 本地存储（家庭NAS） | rsync | 每周增量备份从服务器拉取到本地存储（例如家庭NAS）。 |

## 示例备份计划2（主要+3个副本）

这个备份计划稍微复杂一点，但也更加全面，包括每日推送到两个云存储提供商以增加冗余。

| 频率 | 目标 | 技术 | 描述 |
|---|---|---|---|
| 每日增量 | 云存储 (S3) | rsync | 每日增量备份推送到S3云存储桶。 |
| 每日增量 | 云存储 (B2) | rsync | 每日增量备份推送到Backblaze B2云存储桶。 |
| 每周增量 | 本地存储（家庭NAS） | rsync | 每周增量备份从服务器拉取到本地存储（例如家庭NAS）。 |

# 其他主题

为了使本指南尽量详尽，这些其他主题未被包含，但根据您为实例数据保护计划设置和维护投入的时间，可能值得您的关注：

| 主题 | 描述 |
|---|---|
| SQLite内置备份 | 考虑使用SQLite的`.backup`命令来实现一致的数据库备份解决方案。 |
| 加密 | 修改备份脚本以加入静态数据加密，从而增强安全性。 |
| 灾难恢复与测试 | 制定灾难恢复计划并定期测试备份和恢复流程。 |
| 替代备份工具 | 探索其他命令行备份工具，如`borgbackup`或`restic`，以提供高级功能。 |
| 邮件通知与Webhook | 实现邮件通知或Webhook以监控备份成功或失败。 |
