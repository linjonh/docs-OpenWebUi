---
sidebar_position: 1000
title: "💾 백업"
---
 
 :::경고
이 튜토리얼은 커뮤니티 기여로 제작되었으며 Open WebUI 팀에서 지원하지 않습니다. 이는 특정 사용 사례에 맞춰 Open WebUI를 사용자 정의하는 방법을 보여주는 데에만 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

 # 인스턴스를 백업하기

 아무도 데이터를 잃고 싶어하지 않습니다! 

 Open WebUI를 자가 호스팅하는 경우라면, 구성 요소 일부를 보존하기 위해 정식 백업 계획을 시행하고 싶을 수 있습니다.

 이 가이드는 사용자가 이를 수행하는 기본 권장 사항을 제공하려는 의도로 작성되었습니다. 

 이 가이드는 사용자가 Docker를 통해 Open WebUI를 설치했거나 설치할 의도가 있다고 가정합니다.

 ## 데이터 지속성 확보

먼저 Docker를 사용해 스택을 배포하기 전에, Docker Compose가 지속 가능한 데이터 스토어를 사용하는지 확인하세요. Docker Compose [Github 저장소에서](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml) 제공된 구성 파일을 사용하는 경우 이미 이러한 작업이 처리되어 있습니다. 하지만 사용자가 개별적으로 변형하여 이 부분을 확인하는 것을 잊기 쉬운 점을 유의하세요.

Docker 컨테이너는 일시적이며 데이터는 호스트 파일 시스템에서 생존하기 위해 지속적으로 유지되어야 합니다.

## Docker 볼륨 사용

프로젝트 저장소에서 제공된 Docker Compose를 사용하는 경우 Open Web UI를 Docker 볼륨을 사용해 배포하게 됩니다.

Ollama 및 Open WebUI의 설치 경로는 다음과 같습니다:

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

호스트에서 실제 경로를 찾으려면 다음을 실행하세요:

`docker volume inspect ollama` 

그리고

`docker volume inspect open-webui`

## 호스트 직접 바인드 사용

일부 사용자는 Open Web UI를 호스트 파일 시스템에 직접 (고정된) 바인드로 배포합니다, 아래와 같습니다:

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

이 방식으로 인스턴스를 배포했다면, 루트 경로들을 기록해 두세요.

## 백업 작업의 스크립팅

어떻게 인스턴스가 구성되었든지 간에 서버의 앱 데이터 스토어를 검사하여 어떤 데이터를 백업할 것인지 이해하는 것이 중요합니다. 다음과 같은 구조를 확인할 수 있어야 합니다:

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## 지속 가능한 데이터 스토어의 파일들

| 파일/디렉터리 | 설명 |
|---|---|
| `audit.log` | 이벤트 감사 기록 파일 |
| `cache/` | 캐시 데이터 저장 디렉터리 |
| `uploads/` | 사용자 업로드 파일 저장 디렉터리 |
| `vector_db/` | ChromaDB 벡터 데이터베이스를 포함한 디렉터리 |
| `webui.db` | 기타 인스턴스 데이터를 영구 저장하기 위한 SQLite 데이터베이스 |

# 파일 수준 백업 접근법

애플리케이션 데이터를 백업하는 첫 번째 방법은 파일 수준 백업 접근법으로, Open Web UI의 지속적인 데이터를 제대로 백업할 수 있도록 하는 것입니다.

기술 서비스는 거의 무한한 방법으로 백업될 수 있으나, 증분 작업을 위해 `rsync`는 여전히 인기가 있으며 데모로 사용될 것입니다.

사용자는 전체 `data` 디렉터리를 대상으로 삼아 모든 인스턴스 데이터를 한 번에 백업하거나 개별 구성 요소를 대상으로 하는 더 선택적인 백업 작업을 생성할 수 있습니다. 대상에 대한 더 많은 설명 이름을 추가할 수도 있습니다.

모범적인 rsync 작업은 다음과 같을 수 있습니다:

```bash
#!/bin/bash

# 구성
SOURCE_DIR="."  # 파일 구조가 위치한 현재 디렉터리
B2_BUCKET="b2://OpenWebUI-backups" # Backblaze B2 버킷
B2_PROFILE="your_rclone_profile" # rclone 프로파일 이름
# rclone이 B2 인증 정보로 구성되었는지 확인

# 출처 및 대상 디렉터리 정의
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# cache 및 audit.log 제외
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# rclone 제외 인수 구성
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# 오류 검사로 rclone 동기화 수행 함수
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Syncing $SOURCE to $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Error: rclone sync failed for $SOURCE to $DEST"
        exit 1
    fi
}

# 각 디렉터리/파일에 대해 rclone 동기화 수행
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "백업이 성공적으로 완료되었습니다."
exit 0
```

## 컨테이너 중단을 동반한 Rsync 작업

데이터 무결성을 유지하려면 일반적으로 데이터베이스 백업을 정지된 파일 시스템에서 실행하는 것이 좋습니다. 기본 모델 백업 작업을 약간 수정하여 백업 스크립트를 실행하기 전에 스택을 중단하고 이후 다시 시작하도록 설정할 수 있습니다.

이 방법의 단점은 인스턴스 다운타임을 수반한다는 것입니다. 사용하지 않는 시간대에 작업을 실행하거나 실행 중인 데이터에 대해 일일 소프트웨어 백업을 수행하고 정지된 데이터에 대해 더 견고한 주간 백업을 고려하십시오.

```bash
#!/bin/bash

# 설정
COMPOSE_FILE="docker-compose.yml" # docker-compose.yml 파일의 경로
B2_BUCKET="b2://OpenWebUI-backups" # Backblaze B2 버킷
B2_PROFILE="your_rclone_profile" # rclone 프로필 이름
SOURCE_DIR="."  # 현재 디렉토리 (파일 구조가 있는 위치)

# 소스 및 대상 디렉토리 정의
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# cache 및 audit.log 제외
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# rclone의 제외 인수 구성
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# rclone 동기화 수행 및 오류 확인을 위한 함수
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "$SOURCE를 $DEST로 동기화 중..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "오류: $SOURCE를 $DEST로 동기화 실패"
        exit 1
    fi
}

# 1. Docker Compose 환경 중단
echo "Docker Compose 환경 중단 중..."
docker-compose -f "$COMPOSE_FILE" down

# 2. 백업 수행
echo "백업 시작 중..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Docker Compose 환경 시작
echo "Docker Compose 환경 시작 중..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "백업이 성공적으로 완료되었습니다."
exit 0
```

## SQLite와 ChromaDB 백업 기능을 사용하여 B2 원격으로 모델 백업 스크립트

```bash
#!/bin/bash
#
# Backblaze B2 버킷에 ChromaDB 및 SQLite를 백업하는 스크립트
# openwebuiweeklies를 사용하여 3개의 주간 스냅샷을 유지합니다.
# 스냅샷은 독립적이고 완전히 복원 가능합니다.
# ChromaDB와 SQLite의 기본 백업 메커니즘을 사용합니다.
# audit.log, cache 및 uploads 디렉토리를 제외합니다.
#
# rclone이 올바르게 설치되고 구성되었는지 확인하세요.
# rclone 설치: https://rclone.org/install/
# rclone 구성: https://rclone.org/b2/

# ChromaDB 및 SQLite 데이터가 포함된 소스 디렉토리
SOURCE="/var/lib/open-webui/data"

# B2 버킷 이름 및 원격 이름
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# 백업 디렉토리용 타임스탬프
TIMESTAMP=$(date +%Y-%m-%d)

# 백업 디렉토리 이름
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# B2 버킷의 백업 디렉토리에 대한 전체 경로
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# 유지할 주간 스냅샷의 수
NUM_SNAPSHOTS=3

# 제외 필터 (데이터베이스 백업 이후 적용)
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# ChromaDB 백업 설정 (필요에 따라 조정)
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # ChromaDB 데이터 디렉토리 경로
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # ChromaDB 백업을 위한 아카이브 파일

# SQLite 백업 설정 (필요에 따라 조정)
SQLITE_DB_FILE="$SOURCE/webui.db" # SQLite 데이터베이스 파일 경로
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # SQLite 백업 임시 파일

# ChromaDB 백업 함수
backup_chromadb() {
  echo "ChromaDB 백업 중..."

  # vector_db 디렉토리를 tar 아카이브로 만들기
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "ChromaDB 백업 완료."
}

# SQLite 백업 함수
backup_sqlite() {
  echo "SQLite 데이터베이스 백업 중..."
  # .backup 명령을 사용하여 SQLite 데이터베이스 백업
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # 백업 파일을 소스 디렉토리로 이동
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "SQLite 백업 완료."
}

# 데이터베이스 백업 수행
backup_chromadb
backup_sqlite

# 제외를 적용하여 백업 수행
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# 오래된 백업 제거, 최근 NUM_SNAPSHOTS만 유지
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "$DESTINATION으로 백업 완료"
```

---

## 시점 스냅샷(Point In Time Snapshots)

백업 외에도 사용자는 로컬(서버에) 또는 원격지 혹은 둘 다에 시점 스냅샷을 생성하여 저장할 수 있습니다.

```bash
#!/bin/bash

# 설정
SOURCE_DIR="."  # 스냅샷할 디렉토리(현재 디렉토리)
SNAPSHOT_DIR="/snapshots" # 스냅샷을 저장할 디렉토리
TIMESTAMP=$(date +%Y%m%d%H%M%S) # 타임스탬프 생성

# 스냅샷 디렉토리가 없으면 생성
mkdir -p "$SNAPSHOT_DIR"

# 스냅샷 이름 생성
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# rsync 스냅샷 수행
echo "스냅샷 생성 중: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# rsync 성공 확인
if [ $? -eq 0 ]; then
  echo "스냅샷이 성공적으로 생성되었습니다."
else
  echo "오류: 스냅샷 생성 실패."
  exit 1
fi

exit 0
```
## Crontab을 사용한 일정 설정

백업 스크립트를 추가하고 백업 스토리지를 설정한 후에는 스크립트가 기대대로 작동하는지 품질 검사를 수행해야 합니다. 로그 기록이 매우 추천됩니다.

원하는 실행 빈도에 따라 스크립트를 crontab에 설정하십시오.

# 상용 유틸리티

자체 백업 작업을 스크립팅하는 것 외에도 서버에 에이전트를 설치하여 백업 실행의 복잡성을 추상화하는 상용 제품을 찾을 수 있습니다. 이러한 내용은 이 문서의 범위를 벗어나지만 편리한 솔루션을 제공합니다.

---

# 호스트 수준 백업

Open WebUI 인스턴스는 물리적 또는 가상 호스트에서 프로비저닝 될 수 있습니다.

호스트 수준 백업은 실행 중인 애플리케이션 대신 전체 VM의 스냅샷 또는 백업을 생성하는 것을 포함합니다.

일부는 이를 주요 또는 유일한 보호책으로 활용할 수 있으며 다른 일부는 추가적으로 데이터를 보호하기 위해 이를 계층적으로 적용할 수 있습니다.

# 얼마나 많은 백업이 필요합니까?

취할 백업 수는 개인적인 위험 허용 수준에 따라 다릅니다. 그러나 애플리케이션 자체를 백업 사본으로 간주하지 않는 것이 모범 사례임을 기억하십시오(비록 클라우드에 있다 하더라도!). 이는 인스턴스를 VPS에 프로비저닝 한 경우에도 두 개의 독립적인 백업 사본을 유지하는 것이 합리적인 추천임을 의미합니다.

많은 홈 사용자 요구를 충족하는 백업 계획 예시:

## 모델 백업 계획 1 (주요 + 2 사본)

| 빈도 | 대상 | 기술 | 설명 |
|---|---|---|---|
| 일일 증분 | 클라우드 스토리지 (S3/B2) | rsync | 클라우드 스토리지 버킷(S3 또는 B2)에 일일 증분 백업을 푸시합니다. |
| 주간 증분 | 온사이트 스토리지 (홈 NAS) | rsync | 서버에서 온사이트 스토리지(예: 홈 NAS)로 주간 증분 백업을 가져옵니다. |

## 모델 백업 계획 2 (주요 + 3 사본)

이 백업 계획은 조금 더 복잡하지만 더 포괄적입니다. 추가적인 중복성을 위해 두 개의 클라우드 스토리지 제공자에 일일 푸시를 포함합니다.

| 빈도 | 대상 | 기술 | 설명 |
|---|---|---|---|
| 일일 증분 | 클라우드 스토리지 (S3) | rsync | S3 클라우드 스토리지 버킷으로 일일 증분 백업을 푸시합니다. |
| 일일 증분 | 클라우드 스토리지 (B2) | rsync | Backblaze B2 클라우드 스토리지 버킷으로 일일 증분 백업을 푸시합니다. |
| 주간 증분 | 온사이트 스토리지 (홈 NAS) | rsync | 서버에서 온사이트 스토리지(예: 홈 NAS)로 주간 증분 백업을 가져옵니다. |

# 추가 주제

이 가이드를 적절히 포괄적으로 유지하기 위해 이러한 추가 주제는 생략되었지만 인스턴스의 데이터 보호 계획을 설정하고 유지하는 데 할애할 시간이 얼마나 되는지에 따라 검토할 만한 가치가 있습니다:

| 주제 | 설명 |
|---|---|
| SQLite 기반 백업 | 안정적인 데이터베이스 백업 솔루션을 위해 SQLite의 `.backup` 명령을 고려하십시오. |
| 암호화 | 백업 스크립트를 수정하여 보안을 강화하기 위해 대기 중 암호화를 포함시킵니다. |
| 재난 복구 및 테스트 | 재난 복구 계획을 개발하고 정기적으로 백업 및 복구 프로세스를 테스트하십시오. |
| 대체 백업 도구 | `borgbackup` 또는 `restic`과 같은 다른 명령줄 백업 도구를 탐색하여 고급 기능을 활용하십시오. |
| 이메일 알림 및 웹훅 | 백업 성공 또는 실패를 모니터링하기 위해 이메일 알림 또는 웹훅을 구현하십시오. |
