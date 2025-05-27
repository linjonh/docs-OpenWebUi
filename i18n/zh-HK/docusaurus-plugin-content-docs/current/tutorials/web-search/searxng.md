---
sidebar_position: 10
title: "SearXNG"
---

:::warning
此教學是社群貢獻的一部分，並未獲得Open WebUI團隊的支持。此處僅作為展示如何針對特定使用案例客製化Open WebUI。如有興趣貢獻，請查看貢獻教學。
:::

本指南提供如何在Open WebUI中使用Docker架設SearXNG來進行網頁搜尋功能的指導。

## SearXNG (Docker)

> "**SearXNG是一個免費的網際網路聚合搜尋引擎，可匯總多個搜尋服務及資料庫的結果。用戶不會被追蹤或建立個人檔案。**"

## 1. SearXNG 配置

要將SearXNG最佳化以搭配Open WebUI使用，請依照以下步驟進行設定：

**步驟 1: 使用 `git clone` 克隆 SearXNG Docker 並進入該資料夾:**

1. 建立新目錄 `searxng-docker`

 克隆searxng-docker倉庫。此資料夾將包含你的SearXNG配置文件。詳細配置指引請參考 [SearXNG文件](https://docs.searxng.org/)。

```bash
git clone https://github.com/searxng/searxng-docker.git
```

進入 `searxng-docker` 資料夾：

```bash
cd searxng-docker
```

**步驟 2: 找到並修改 `.env` 文件:**

1. 從 `.env` 文件中取消註解 `SEARXNG_HOSTNAME` 並進行設定：

```bash
# 默認監聽在 https://localhost
# 如果需要更改：
# * 取消註解 SEARXNG_HOSTNAME，並將 <host> 替換為 SearXNG 主機名
# * 取消註解 LETSENCRYPT_EMAIL，並將 <email> 替換為你的電子郵件（需創建 Lets Encrypt 證書）

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# 可選項：
# 如果運行小型或大型實例，你可能需要更改所用的uwsgi工作者數量和每個工作者的線程數量
# 更多工作者（=進程）意味著可以同時處理更多搜尋請求，但也會增加資源使用。

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**步驟 3: 修改 `docker-compose.yaml` 文件**

3. 通過修改 `docker-compose.yaml` 文件移除 `localhost` 限制：

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**步驟 4: 授予所需權限**

4. 在根目錄執行以下命令，允許容器創建新配置文件：

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**步驟 5: 創建無限制的 `limiter.toml` 文件**

5. 建立無限制的 `searxng-docker/searxng/limiter.toml` 配置文件：

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# 此配置文件更新默認配置文件
# 查看 https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# 啟用 ip_limit 方法中的 link_token 方法
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**步驟 6: 刪除默認的 `settings.yml` 文件**

6. 如果存在，刪除默認的 `searxng-docker/searxng/settings.yml` 文件，因為它會在第一次啟動SearXNG時重新生成：

```bash
rm searxng-docker/searxng/settings.yml
```

**步驟 7: 創建新的 `settings.yml` 文件**

:::note
第一次運行時，必須從 `docker-compose.yaml` 文件中刪除 `cap_drop: - ALL`，這樣 `searxng` 服務才能成功創建 `/etc/searxng/uwsgi`.ini。這是因為 `cap_drop: - ALL` 指令會移除所有權限，包括創建 `uwsgi.ini` 文件所需的權限。首次運行後，為了安全起見，應重新添加 `cap_drop: - ALL` 到 `docker-compose.yaml` 文件。
:::

7. 短暫啟動容器以生成新的 settings.yml 文件：

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**步驟 8: 添加格式並更新埠號**

8. 在 `searxng-docker/searxng/settings.yml` 文件中添加HTML和JSON格式：

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

為你的SearXNG實例生成一個密鑰：

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windows用戶可以使用以下Powershell腳本生成密鑰：

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

在 `server` 部分中更新埠號以匹配你先前設定的埠號（此處為 `8080`）：

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

根據需求更改 `bind_address`：

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### 配置文件

#### searxng-docker/searxng/settings.yml (摘錄)

預設的 `settings.yml` 檔案包含許多引擎的設定。以下是預設的 `settings.yml` 檔案可能的摘要內容：

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# 參見 https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url 使用 SEARXNG_BASE_URL 環境變數定義，參見 .env 和 docker-compose.yml
  secret_key: "ultrasecretkey"  # 請更改這個密鑰！
  limiter: true  # 可在私有實例中停用
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
    - json # 必需使用 json
  # 要拒絕存取某種格式，請移除該格式，使用小寫字母。
  # formats: [html, csv, json, rss]
redis:
  # 用於連接 Redis 資料庫的 URL，會被 ${SEARXNG_REDIS_URL} 覆蓋。
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

SearXNG 的 settings.yml 檔案中的埠號應與 docker-compose.yml 檔案中 SearXNG 的埠號一致。

</details>

**步驟 9：更新 `uwsgi.ini` 檔案**

9. 確保你的 `searxng-docker/searxng/uwsgi.ini` 檔案符合以下內容：

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# 執行程式碼的使用者
uid = searxng
gid = searxng

# 工作執行緒數量（通常等於 CPU 數目）
# 預設值：%k （= CPU 核心數量，請參見 Dockerfile）
workers = %k

# 每個工作執行緒的執行線程數
# 預設值：4（請參見 Dockerfile）
threads = 4

# 已建立的 socket 的操作權限制
chmod-socket = 666

# 使用的插件及解譯器設定
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# 載入的模組
module = searx.webapp

# 虛擬環境和 Python 路徑
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# 自動設定進程名稱為更易讀的描述
auto-procname = true

# 禁止請求日誌以保護隱私
disable-logging = true
log-5xx = true

# 設定請求的最大大小（不包含請求主體）
buffer-size = 8192

# 禁止持久連線
# 請參見 https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi 提供靜態文件
static-map = /static=/usr/local/searxng/searx/static
# 有效期限設定為一天
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. 替代設置

作為替代方案，如果你不想修改預設配置，你可以僅建立一個空的 `searxng-docker` 資料夾並按照其他設置指令繼續。

### Docker Compose 設置

將以下環境變數新增至你的 Open WebUI `docker-compose.yaml` 檔案：

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

為 SearXNG 創建 `.env` 檔案：

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

接著，將以下內容新增至 SearXNG 的 `docker-compose.yaml` 檔案：

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

你的堆疊可以使用以下命令啟動：

```bash
docker compose up -d
```

:::note
首次執行時，你必須從 `docker-compose.yaml` 檔案中移除 `cap_drop: - ALL`，以便 `searxng` 服務成功創建 `/etc/searxng/uwsgi.ini`。這是因為 `cap_drop: - ALL` 指示會移除所有權限，包括創建 `uwsgi.ini` 所需的權限。在首次執行後，出於安全原因，你應重新添加 `cap_drop: - ALL` 至 `docker-compose.yaml` 檔案。
:::

或者，你可以直接使用 `docker run` 執行 SearXNG：

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. 確認連接性

從你的 Open WebUI 容器實例的指令界面確認與 SearXNG 的連接：

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. GUI 配置

1. 前往：`Admin Panel` -> `Settings` -> `Web Search`
2. 切換 `Enable Web Search`
3. 從下拉選單中將 `Web Search Engine` 設置為 `searxng`
4. 設定 `Searxng Query URL` 為以下其中一個範例：

* `http://searxng:8080/search?q=<query>` (使用容器名稱和暴露的埠，適合基於 Docker 的設置)
* `http://host.docker.internal:8080/search?q=<query>` (使用 `host.docker.internal` DNS 名稱和主機埠，適合基於 Docker 的設置)
* `http://<searxng.local>/search?q=<query>` (使用本地域名稱，適合本地網路存取)
* `https://<search.domain.com>/search?q=<query>` (使用自定義域名稱的自託管 SearXNG 實例，適合公開或私密存取)

**請注意，`/search?q=<query>` 部分是必須的。**

5. 根據需要調整 `Search Result Count` 和 `Concurrent Requests` 的值
6. 儲存變更

![SearXNG GUI 設定畫面](/images/tutorial_searxng_config.png)

## 5. 在聊天中使用 Web Search

要使用 Web Search，點擊訊息輸入框旁的 +。

在這裡可以開關 Web Search。

![Web Search 介面開關](/images/web_search_toggle.png)

按照這些步驟，您將成功將 SearXNG 與 Open WebUI 設置完成，啟用使用 SearXNG 搜索引擎進行網路搜索。

#### 注意

您需要在聊天中明確切換開啟或關閉此功能。

這是基於每次會話的功能，例如重新載入頁面、切換到其他聊天都將自動關閉該功能。
