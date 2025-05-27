---
sidebar_position: 1000
title: "💾 バックアップ"
---
 
 :::warning
このチュートリアルはコミュニティによる寄稿であり、Open WebUIチームによるサポートはありません。これは、特定の使用ケースに合わせてOpen WebUIをカスタマイズする方法を示すデモンストレーションとして提供されています。寄稿したい場合は、寄稿チュートリアルをご覧ください。
:::

 # インスタンスのバックアップ

 データを失うのは誰も好きではありません！ 

 Open WebUIを自己ホストしている場合、設定の一部を保持するために二重三重のバックアップを実施するようなフォーマルなバックアップ計画を設けることをお勧めします。

 このガイドは、その方法について基本的な推奨を提供することを目的としています。 

 このガイドでは、ユーザーがDockerを介してOpen WebUIをインストールしている（またはインストールする予定である）ことを前提としています。

 ## データの永続性を確保する

まず、Dockerでスタックをデプロイする前に、Docker Composeに永続的なデータストアが使用されていることを確認してください。[Githubのリポジトリ](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml)にあるDocker Composeを使用している場合、既に対応されています。しかし、独自のバリエーションを作成するときにこれを忘れることは簡単です。

Dockerコンテナは一時的なものであり、ホストファイルシステムでデータを保持する必要があります。

## Dockerボリュームの使用

プロジェクトリポジトリのDocker Composeを使用する場合、Open WebUIはDockerボリュームを使用してデプロイされます。 

OllamaとOpen WebUIのマウントは以下の通りです:

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

ホスト上の実際のバインドパスを見つけるには、以下を実行してください:

`docker volume inspect ollama` 

そして

`docker volume inspect open-webui`

## 直接ホストバインドの使用

一部のユーザーは、ホストファイルシステムへの直接（固定）バインドを使用してOpen Web UIをデプロイします。例えば以下のように:

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

この方法でインスタンスをデプロイしている場合、ルート上のパスに注意してください。 

## バックアップジョブのスクリプト化

インスタンスがどのように提供されているかに関わらず、サーバー上のアプリのデータストアを確認し、バックアップするデータを理解することは重要です。以下のようなものが表示されるはずです:

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## 永続的データストア内のファイル 

| ファイル/ディレクトリ | 説明 |
|---|---|
| `audit.log` | イベントの監査ログファイル。 |
| `cache/` | キャッシュデータを保存するディレクトリ。 |
| `uploads/` | ユーザーアップロードファイルを保存するディレクトリ。 |
| `vector_db/` | ChromaDBベクトルデータベースを含むディレクトリ。 |
| `webui.db` | その他のインスタンスデータを永続的に保存するSQLiteデータベース |

# ファイルレベルのバックアップアプローチ

アプリケーションデータをバックアップする最初の方法は、ファイルレベルバックアップアプローチを採用し、永続的なOpen WebUIデータを適切にバックアップすることです。

技術サービスをバックアップする方法はほぼ無限に存在しますが、`rsync`はインクリメンタルジョブにおいて依然として人気であり、デモンストレーションとして使用されます。

ユーザーはインスタンスデータ全体を一度にバックアップするために`data`ディレクトリ全体をターゲットにしたり、個々のコンポーネントをターゲットにしたより選択的なバックアップジョブを作成することができます。ターゲットにもっと説明的な名前を追加することもできます。 

モデルとなるrsyncジョブは以下のようになります:

```bash
#!/bin/bash

# 設定
SOURCE_DIR="."  # 現在のディレクトリ（ファイル構造の所在）
B2_BUCKET="b2://OpenWebUI-backups" # Backblaze B2バケット
B2_PROFILE="your_rclone_profile" # rcloneプロファイル名
# rcloneがB2資格情報で設定されていることを確認

# ソースと宛先ディレクトリの定義
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# cacheとaudit.logを除外
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# rclone用の除外引数を構築
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude '$EXCLUDE'"
done

# エラーチェック付きのrclone同期を実行する関数
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Syncing '$SOURCE' to '$DEST'..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Error: rclone sync failed for '$SOURCE' to '$DEST'"
        exit 1
    fi
}

# 各ディレクトリ/ファイルのrclone同期を実行
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "バックアップが正常に完了しました。"
exit 0
```

## コンテナの中断を伴うRsyncジョブ

データの整合性を維持するため、データベースのバックアップは一般的にコールドファイルシステムで実行することが推奨されます。デフォルトのモデルバックアップジョブを少し修正して、バックアップスクリプトを実行する前にスタックを一旦停止し、完了後に再起動するようにできます。

この方法の欠点は、インスタンスのダウンタイムが発生することです。そのため、インスタンスを使用しない時間帯にジョブを実行したり、稼働中のデータに対して「ソフトウェア」デイリーを取ったり、コールドデータに対してより堅固なウィークリーを取ることを検討してください。

```bash
#!/bin/bash

# 設定
COMPOSE_FILE="docker-compose.yml" # docker-compose.ymlファイルへのパス
B2_BUCKET="b2://OpenWebUI-backups" # バックブレイズB2バケット
B2_PROFILE="your_rclone_profile" # rcloneプロファイル名
SOURCE_DIR="."  # 現在のディレクトリ（ファイル構造が存在する場所）

# ソースと宛先のディレクトリを定義
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# キャッシュとaudit.logを除外
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# rclone用の除外引数を構築
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# rcloneの同期をエラーチェックとともに実行する関数
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "$SOURCE を $DEST に同期中..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "エラー: $SOURCE から $DEST へのrclone同期に失敗しました"
        exit 1
    fi
}

# 1. Docker Compose環境を停止
echo "Docker Compose環境を停止中..."
docker-compose -f "$COMPOSE_FILE" down

# 2. バックアップを実行
echo "バックアップを開始..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Docker Compose環境を起動
echo "Docker Compose環境を起動中..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "バックアップが正常に完了しました。"
exit 0
```

## SQLiteとChromaDBバックアップ機能を利用したB2リモートへのモデルバックアップスクリプト

```bash
#!/bin/bash
#
# ChromaDBとSQLiteをバックブレイズB2バケットにバックアップするスクリプト
# openwebuiweeklies, 3つのウィークリースナップショットを維持。
# スナップショットは独立しており、完全に復元可能。
# ChromaDBとSQLiteのネイティブバックアップ機能を使用。
# audit.log、キャッシュ、およびuploadsディレクトリを除外。
#
# rcloneが正しくインストールおよび設定されていることを確認。
# rcloneのインストール: https://rclone.org/install/
# rcloneの設定: https://rclone.org/b2/

# ソースディレクトリ (ChromaDBとSQLiteデータを含む)
SOURCE="/var/lib/open-webui/data"

# B2バケット名とリモート名
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# バックアップディレクトリのタイムスタンプ
TIMESTAMP=$(date +%Y-%m-%d)

# バックアップディレクトリの名前
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# B2バケット内のバックアップディレクトリへのフルパス
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# 保持するウィークリースナップショットの数
NUM_SNAPSHOTS=3

# 除外フィルタ（データベースバックアップ後に適用）
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDBバックアップ設定（必要に応じて調整）
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # ChromaDBデータディレクトリへのパス
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # ChromaDBバックアップのアーカイブファイル

# SQLiteバックアップ設定（必要に応じて調整）
SQLITE_DB_FILE="$SOURCE/webui.db" # SQLiteデータベースファイルへのパス
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # SQLiteバックアップ用一時ファイル

# ChromaDBのバックアップ関数
backup_chromadb() {
  echo "ChromaDBをバックアップ中..."

  # vector_dbディレクトリのtarアーカイブを作成
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDBのバックアップが完了しました。"
}

# SQLiteのバックアップ関数
backup_sqlite() {
  echo "SQLiteデータベースをバックアップ中..."
  # SQLiteデータベースを.backupコマンドを使用してバックアップ
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # バックアップファイルをソースディレクトリに移動
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLiteのバックアップが完了しました。"
}

# データベースバックアップを実行
backup_chromadb
backup_sqlite

# 除外項目を適用しながらバックアップを実行
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# 最新のNUM_SNAPSHOTSを保持して古いバックアップを削除
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "$DESTINATIONにバックアップが完了しました"
```

---

## 時点でのスナップショット

バックアップの取得に加えて、ユーザーは時点でのスナップショットを作成して、ローカル（サーバー上）またはリモート、もしくはその両方に保存することもできます。

```bash
#!/bin/bash

# 設定
SOURCE_DIR="."  # スナップショットを作成するディレクトリ（現在のディレクトリ）
SNAPSHOT_DIR="/snapshots" # スナップショットを保存するディレクトリ
TIMESTAMP=$(date +%Y%m%d%H%M%S) # タイムスタンプを生成

# スナップショットディレクトリが存在しない場合は作成
mkdir -p "$SNAPSHOT_DIR"

# スナップショット名を作成
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# rsyncスナップショットを実行
echo "スナップショットを作成中: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# rsyncが成功したかを確認
if [ $? -eq 0 ]; then
  echo "スナップショットが正常に作成されました。"
else
  echo "エラー: スナップショットの作成に失敗しました。"
  exit 1
fi

exit 0
```
## スケジュール設定のためのCrontab

バックアップスクリプトを追加してバックアップストレージをプロビジョニングしたら、スクリプトが期待通りに動作することを確認してください。ログを記録することを強くお勧めします。

希望する実行頻度に合わせてCrontabを使って新しいスクリプトを設定してください。

# 商業ユーティリティ

バックアップジョブをスクリプト化する以外に、サーバーにエージェントをインストールしてバックアップの複雑さを抽象化する商業的な提供も見つかります。この記事の範囲を超えますが、便利なソリューションです。

---

# ホストレベルバックアップ

あなたのOpen WebUIインスタンスは、あなたが管理するホスト（物理または仮想化）にプロビジョニングされている可能性があります。

ホストレベルバックアップでは、実行中のアプリケーションではなく、VM全体のスナップショットまたはバックアップを作成します。

主な保護手段として利用する人もいれば、追加のデータ保護として組み込む人もいます。

# バックアップはどれくらい必要ですか？

必要なバックアップの数は、個人のリスク許容度によって異なります。ただし、アプリケーション自体をバックアップコピーとみなさない（たとえそれがクラウドに存在していても！）のがベストプラクティスです。つまり、インスタンスをVPSにプロビジョニングしている場合でも、2つの（独立した）バックアップコピーを保持することは合理的な推奨です。

多くの家庭ユーザーのニーズを満たす例としてのバックアップ計画:

## モデルバックアップ計画1（プライマリ + 2コピー）

| 頻度 | 対象 | 技術 | 説明 |
|---|---|---|---|
| 毎日増分 | クラウドストレージ（S3/B2） | rsync | クラウドストレージバケット（S3またはB2）に送信される毎日の増分バックアップ。 |
| 毎週増分 | オンサイトストレージ（ホームNAS） | rsync | サーバーからオンサイトストレージ（例: ホームNAS）にプルされる毎週の増分バックアップ。 |

## モデルバックアップ計画2（プライマリ + 3コピー）

このバックアップ計画は少し複雑ですが、より包括的です。追加の冗長性のために、2つのクラウドストレージプロバイダーへの毎日の送信を含みます。

| 頻度 | 対象 | 技術 | 説明 |
|---|---|---|---|
| 毎日増分 | クラウドストレージ（S3） | rsync | S3クラウドストレージバケットに送信される毎日の増分バックアップ。 |
| 毎日増分 | クラウドストレージ（B2） | rsync | Backblaze B2クラウドストレージバケットに送信される毎日の増分バックアップ。 |
| 毎週増分 | オンサイトストレージ（ホームNAS） | rsync | サーバーからオンサイトストレージ（例: ホームNAS）にプルされる毎週の増分バックアップ。 |

# その他のトピック

このガイドを適度に包括的に保つために、以下の追加テーマは省略されましたが、インスタンスのデータ保護計画の設定と維持にどれだけの時間を割けるかによっては検討する価値があります:

| トピック | 説明 |
|---|---|
| SQLite組み込みバックアップ | SQLiteの`.backup`コマンドを使用して、一貫したデータベースバックアップソリューションを検討する。 |
| 暗号化 | バックアップスクリプトを修正して、セキュリティを強化するために保存時の暗号化を組み込む。 |
| 災害復旧とテスト | 災害復旧計画を策定し、バックアップと復元プロセスを定期的にテストする。 |
| 代替バックアップツール | `borgbackup`や`restic`などの他のコマンドラインバックアップツールを探して、高度な機能を利用する。 |
| メール通知とWebhook | バックアップの成功または失敗を監視するためのメール通知やWebhookを実装する。 |
