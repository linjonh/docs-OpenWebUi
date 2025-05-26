---
sidebar_position: 1000
title: "💾 备份"
---
 
 :::warning
本教程是社区贡献的内容，并未经过 Open WebUI 团队的支持。它仅用作如何为您的特定用例定制 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

 #  备份您的实例

 没有人喜欢丢失数据！ 

 如果您是自行托管 Open WebUI，您可能希望制定某种正式的备份计划，以确保保留配置部分的第二份和第三份副本。

 本指南旨在为用户推荐一些基本建议，说明用户可以如何执行此操作。 

 本指南假定用户已通过 Docker 安装了 Open WebUI（或计划这样做）。

 ## 确保数据持久化

首先，在使用 Docker 部署您的栈之前，请确保您的 Docker Compose 使用的是持久化数据存储。如果您使用的是 [来自 Github 仓库](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml) 的 Docker Compose，那已经处理好了。但自行制作变体时很容易忘记验证这一点。

Docker 容器是临时性的，数据必须持久化以确保其在主机文件系统上的存活。

## 使用 Docker 卷

如果您使用的是项目库中的 Docker Compose 文件，您将使用 Docker 卷部署 Open Web UI。

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

要在主机上找到实际的绑定路径，请运行：

`docker volume inspect ollama` 

以及

`docker volume inspect open-webui`

## 使用直接主机绑定

有些用户通过直接（固定）绑定到主机文件系统的方式部署 Open Web UI，例如：

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

如果这是您部署实例的方式，您需要注意在根目录下的路径。

## 脚本化备份作业

无论您的实例是如何配置的，检查服务器上应用的数据存储以了解您将备份哪些数据都是值得的。您应该会看到类似这样的内容：

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## 持久化数据存储中的文件

| 文件/目录 | 描述 |
|---|---|
| `audit.log` | 审计事件的日志文件。 |
| `cache/` | 存储缓存数据的目录。 |
| `uploads/` | 存储用户上传文件的目录。 |
| `vector_db/` | 包含 ChromaDB 向量数据库的目录。 |
| `webui.db` | 用于存储其他实例数据的 SQLite 数据库。 |

# 文件级备份方法

第一种备份应用数据的方法是采用文件级备份方法以确保 Open Web UI 的持久化数据得到妥善备份。

有无数种技术服务可以备份的方法，但 `rsync` 作为增量备份作业的热门选择常被采用。因此我们用它来作为演示。

用户可以目标整个 `data` 目录一次备份所有实例数据，或者创建更有选择性的备份作业，针对个别组件。您还可以为目标添加更具描述性的名称。

一个示例 rsync 作业可能看起来像这样：

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 当前目录（文件结构所在的位置）
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 存储桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置文件名称
# 确保 rclone 已配置好您的 B2 凭据

# 定义源和目标目录
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

# 构造 rclone 的排除参数
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude &apos;$EXCLUDE&apos;"
done

# 定义带错误检查的 rclone 同步函数
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在同步 &apos;$SOURCE&apos; 到 &apos;$DEST&apos;..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "错误：rclone 同步失败，源 &apos;$SOURCE&apos; 到目标 &apos;$DEST&apos;"
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

## Rsync 作业与容器中断

为了保持数据完整性，通常建议在冷文件系统上运行数据库备份。我们默认的模型备份作业可以稍作修改以在运行备份脚本之前关闭堆栈，并在完成后重新启动。

这种方法的缺点是它会导致实例停机。建议在不使用实例的时间运行该作业，或者对运行中的数据进行“软件”日备份，并对冷数据进行更可靠的周备份。

```bash
#!/bin/bash

# 配置
COMPOSE_FILE="docker-compose.yml" # docker-compose.yml 文件路径
B2_BUCKET="b2://OpenWebUI-backups" # 您的 Backblaze B2 存储桶
B2_PROFILE="your_rclone_profile" # 您的 rclone 配置文件名称
SOURCE_DIR="."  # 当前目录（文件结构所在的位置）

# 定义源和目标目录
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

# 构建rclone的排除参数
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude '$EXCLUDE'"
done

# 用错误检查功能执行rclone同步
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "正在将 '$SOURCE' 同步到 '$DEST'..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "错误: 对 '$SOURCE' 到 '$DEST' 的 rclone 同步失败"
        exit 1
    fi
}

# 1. 停止Docker Compose环境
echo "停止Docker Compose环境..."
docker-compose -f "$COMPOSE_FILE" down

# 2. 执行备份
echo "启动备份..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. 启动Docker Compose环境
echo "启动Docker Compose环境..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "备份成功完成."
exit 0
```

## 使用SQLite和ChromaDB备份功能到B2远程的模型备份脚本

```bash
#!/bin/bash
#
# 备份脚本，将ChromaDB和SQLite备份到Backblaze B2存储桶
# openwebuiweeklies，维护3个每周快照。
# 快照是独立的并且可以完全恢复。
# 使用ChromaDB和SQLite的原生备份机制。
# 排除audit.log、缓存目录和uploads目录。
#
# 确保rclone已正确安装和配置。
# 安装rclone: https://rclone.org/install/
# 配置rclone: https://rclone.org/b2/

# 源目录（包含ChromaDB和SQLite数据）
SOURCE="/var/lib/open-webui/data"

# B2存储桶名称和远程名称
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# 用于备份目录的时间戳
TIMESTAMP=$(date +%Y-%m-%d)

# 备份目录名称
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# B2存储桶中备份目录的完整路径
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# 每周快照的保留数量
NUM_SNAPSHOTS=3

# 排除过滤器（在数据库备份之后应用）
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDB备份设置（根据需要调整）
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # ChromaDB数据目录路径
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # ChromaDB备份的存档文件

# SQLite备份设置（根据需要调整）
SQLITE_DB_FILE="$SOURCE/webui.db" # SQLite数据库文件路径
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # SQLite备份的临时文件

# 备份ChromaDB的函数
backup_chromadb() {
  echo "正在备份ChromaDB..."

  # 创建vector_db目录的tar归档
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDB备份完成."
}

# 备份SQLite的函数
backup_sqlite() {
  echo "正在备份SQLite数据库..."
  # 使用.backup命令备份SQLite数据库
  sqlite3 "$SQLITE_DB_FILE" ".backup '$SQLITE_BACKUP_FILE'"

  # 将备份文件移动到源目录
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLite备份完成."
}

# 执行数据库备份
backup_chromadb
backup_sqlite

# 执行带有排除项的备份
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# 删除旧备份，仅保留最新的NUM_SNAPSHOTS
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "备份已完成到 $DESTINATION"
```

---

## 时间点快照

除了执行备份之外，用户可能还希望创建可以存储在本地（服务器上）、远程或两者的时间点快照。

```bash
#!/bin/bash

# 配置
SOURCE_DIR="."  # 要快照的目录（当前目录）
SNAPSHOT_DIR="/snapshots" # 存储快照的目录
TIMESTAMP=$(date +%Y%m%d%H%M%S) # 生成时间戳

# 如果快照目录不存在，则创建
mkdir -p "$SNAPSHOT_DIR"

# 创建快照名称
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# 执行 rsync 快照
echo "创建快照: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# 检查 rsync 是否成功
if [ $? -eq 0 ]; then
  echo "快照创建成功."
else
  echo "错误: 快照创建失败."
  exit 1
fi

exit 0
```
## 调度使用 Crontab

添加备份脚本并配置备份存储后，你需要对脚本进行质量检查（QA），以确保它们按预期运行。建议启用日志记录。

根据所需的运行频率，使用 crontab 设置新脚本进行定时运行。

# 商业工具

除了编写自己的备份脚本，您还可以找到商业解决方案，这些通常通过在您的服务器上安装代理来简化备份任务运行的复杂性。这些超出了本文的范围，但它们提供了便利的解决方案。

---

# 主机级备份

您的 Open WebUI 实例可能设置在您控制的主机（物理或虚拟化）上。

主机级备份涉及创建整个虚拟机的快照或备份，而不是单独运行应用程序。

有些人可能希望将它们作为主要或唯一的保护措施，而另一些人则可能希望将它们作为额外的数据保护层。

# 我需要多少备份？

您希望进行的备份数量取决于您个人的风险承受能力。但是，请记住，*最好不要*将应用程序本身视为备份副本（即使它存在于云中！）。这意味着，如果您在 VPS 上设置了实例，合理的建议是保留两个（独立）备份副本。

以下是一份能够满足许多家庭用户需求的备份计划示例：

## 示例备份计划 1（主备 + 两个副本）

| 频率 | 目标 | 技术 | 描述 |
|---|---|---|---|
| 每日增量 | 云存储（S3/B2） | rsync | 通过 rsync 推送每日增量备份到云存储桶（S3 或 B2）。 |
| 每周增量 | 本地存储（家庭 NAS） | rsync | 通过 rsync 从服务器拉取每周增量备份到本地存储（例如家庭 NAS）。 |

## 示例备份计划 2（主备 + 三个副本）

此备份计划稍微复杂一些，但也更全面。它包括每日推送到两个云存储提供商以提高冗余。

| 频率 | 目标 | 技术 | 描述 |
|---|---|---|---|
| 每日增量 | 云存储（S3） | rsync | 通过 rsync 推送每日增量备份到 S3 云存储桶。 |
| 每日增量 | 云存储（B2） | rsync | 通过 rsync 推送每日增量备份到 Backblaze B2 云存储桶。 |
| 每周增量 | 本地存储（家庭 NAS） | rsync | 通过 rsync 从服务器拉取每周增量备份到本地存储（例如家庭 NAS）。 |

# 其他主题

为了使本指南足够全面，以下额外主题被省略，但根据您的时间投入情况，可能值得考虑这些内容以设置和维护实例的数据保护计划：

| 主题 | 描述 |
|---|---|
| SQLite 内置备份 | 考虑使用 SQLite 的 `.backup` 命令作为一致的数据库备份解决方案。 |
| 加密 | 修改备份脚本来包含静态加密以增强安全性。 |
| 灾难恢复与测试 | 制定灾难恢复计划并定期测试备份与恢复流程。 |
| 替代备份工具 | 探索其他命令行备份工具，例如 `borgbackup` 或 `restic`，以获得更高级的功能。 |
| 邮件通知与 Webhooks | 实现邮件通知或 Webhooks 来监控备份的成功或失败。 |
