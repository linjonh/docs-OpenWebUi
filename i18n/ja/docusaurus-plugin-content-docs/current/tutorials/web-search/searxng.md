---
sidebar_position: 10
title: "SearXNG"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは提供されません。これは、Open WebUIを特定の使用事例に合わせてカスタマイズする方法を示すデモンストレーションとしてのみの役割を果たします。貢献したいですか？寄稿チュートリアルをご覧ください。
:::

このガイドでは、Docker内でSearXNGを使用してOpen WebUIでウェブ検索機能を設定する方法を説明します。

## SearXNG (Docker)

> "**SearXNGは、さまざまな検索サービスやデータベースから結果を集約する無料のインターネットメタ検索エンジンです。ユーザーは追跡されず、プロファイリングも行われません。**"

## 1. SearXNGの設定

Open WebUIでの使用に最適なSearXNGを設定するには、次の手順に従ってください:

**手順1: `git clone`でSearXNG Dockerを複製し、フォルダに移動する:**

1. 新しいディレクトリ`searxng-docker`を作成します。

 searxng-dockerリポジトリを複製します。このフォルダには、SearXNGの設定ファイルが含まれます。設定方法については、[SearXNGドキュメント](https://docs.searxng.org/)を参照してください。

```bash
git clone https://github.com/searxng/searxng-docker.git
```

`searxng-docker`リポジトリに移動します:

```bash
cd searxng-docker
```

**手順2: `.env`ファイルを見つけて変更する:**

1. `.env`ファイルの中の`SEARXNG_HOSTNAME`をコメント解除して、適切に設定します:

```bash
# デフォルトではhttps://localhostでリッスンします
# これを変更するには:
# * SEARXNG_HOSTNAMEをコメント解除し、<host>をSearXNGホスト名に置き換えます
# * LETSENCRYPT_EMAILをコメント解除し、<email>をメールアドレスに置き換えます (Lets Encrypt証明書を作成するために必要)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<メール>

# オプション:
# 非常に小さなインスタンスまたは非常に大きなインスタンスを実行している場合、uwsgiワーカーと各ワーカーのスレッドの量を調整したい可能性があります
# ワーカー(プロセス)が多いほど、同時に処理できる検索リクエストが増えますが、それに応じてリソース使用量も増加します

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**手順3: `docker-compose.yaml`ファイルを変更する**

3. `docker-compose.yaml`ファイルを修正して`localhost`制限を解除します:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**手順4: 必要な権限を付与する**

4. ルートディレクトリで以下のコマンドを実行し、コンテナが新しい設定ファイルを作成できるようにします:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**手順5: 制限のない`limiter.toml`ファイルを作成する**

5. 制限のない`searxng-docker/searxng/limiter.toml`設定ファイルを作成します:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# この設定ファイルはデフォルトの設定ファイルを更新します
# 詳細は https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml を参照

[botdetection.ip_limit]
# ip_limitメソッドでリンクトークンメソッドを有効にする
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**手順6: デフォルト`settings.yml`ファイルを削除する**

6. 存在する場合は、デフォルトの`searxng-docker/searxng/settings.yml`ファイルを削除します。これはSearXNGの初回起動時に再生成されます:

```bash
rm searxng-docker/searxng/settings.yml
```

**手順7: 新しい`settings.yml`ファイルを作成する**

:::note
最初の実行では、`docker-compose.yaml`ファイルから`cap_drop: - ALL`を削除する必要があります。これは、`searxng`サービスが`/etc/searxng/uwsgi.ini`を正常に作成するために必要です。このディレクティブはすべての能力を削除するため、`uwsgi.ini`ファイルの作成に必要な能力も削除されます。初回実行後、セキュリティのために`cap_drop: - ALL`を`docker-compose.yaml`ファイルに再追加する必要があります。
:::

7. 一時的にコンテナを起動し、新たな`settings.yml`ファイルを生成します:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**手順8: フォーマットを追加してポート番号を更新する**

8. `searxng-docker/searxng/settings.yml`ファイルにHTMLおよびJSONフォーマットを追加します:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

SearXNGインスタンス用のシークレットキーを生成します:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windowsユーザーは次のPowerShellスクリプトを使用してシークレットキーを生成できます:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

`server`セクション内で、ポート番号を以前に設定したもの（この場合、`8080`）に更新します:

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

`bind_address`を必要に応じて変更します:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### 設定ファイル

#### searxng-docker/searxng/settings.yml (抜粋)

デフォルトの `settings.yml` ファイルには多くのエンジン設定が含まれています。以下はデフォルトの `settings.yml` ファイルの抜粋例です。

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# 詳しくは https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings を参照
use_default_settings: true

server:
  # base_url は SEARXNG_BASE_URL 環境変数で定義されています。詳細は .env と docker-compose.yml を参照
  secret_key: "ultrasecretkey"  # ここを変更してください！
  limiter: true  # プライベートインスタンスの場合は無効化可能
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
    - json # json は必要です
  # フォーマットを削除してアクセスを拒否します。小文字を使用してください。
  # formats: [html, csv, json, rss]
redis:
  # Redis データベースに接続する URL。${SEARXNG_REDIS_URL} によって上書きされます。
  # 詳しくは https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis を参照
  url: redis://redis:6379/0
```

SearXNG の `settings.yml` ファイル内のポートは、docker-compose.yml ファイル内のポート番号と一致している必要があります。

</details>

**ステップ 9: `uwsgi.ini` ファイルを更新する**

9. `searxng-docker/searxng/uwsgi.ini` ファイルが以下と一致することを確認してください:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# コードを実行するユーザー
uid = searxng
gid = searxng

# ワーカーの数 (通常は CPU の数)
# デフォルト値: %k (= CPU コア数、Dockerfile を参照)
workers = %k

# ワーカーごとのスレッド数
# デフォルト値: 4 (Dockerfile を参照)
threads = 4

# 作成されたソケットの権限
chmod-socket = 666

# 使用するプラグインとインタープリター設定
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# インポートするモジュール
module = searx.webapp

# 仮想環境と Python パス
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# プロセス名を自動的に意味のあるものに設定
auto-procname = true

# プライバシーのためリクエストログを無効化
disable-logging = true
log-5xx = true

# リクエストの最大サイズを設定 (リクエストボディを除く)
buffer-size = 8192

# キープアライブを無効化
# 詳しくは https://github.com/searx/searx-docker/issues/24 を参照
add-header = Connection: close

# uwsgi が静的ファイルを提供します
static-map = /static=/usr/local/searxng/searx/static
# 有効期限を1日に設定
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. 代替セットアップ

デフォルト設定を変更したくない場合は、単に空の `searxng-docker` フォルダーを作成し、他のセットアップ手順に従うことができます。

### Docker Compose セットアップ

Open WebUI の `docker-compose.yaml` ファイルに以下の環境変数を追加します:

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

SearXNG 用の `.env` ファイルを作成します:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

次に、SearXNG の `docker-compose.yaml` ファイルに以下を追加します:

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

スタックを以下で起動できます:

```bash
docker compose up -d
```

:::note
最初の実行時には、SearXNG サービスが `/etc/searxng/uwsgi.ini` を正しく作成できるようにするため、`docker-compose.yaml` ファイルから `cap_drop: - ALL` を削除する必要があります。これは、`cap_drop: - ALL` ディレクティブがすべての権限を削除するため、`uwsgi.ini` ファイルの作成に必要な権限も削除されることによります。初回実行後、安全性を向上させるために `cap_drop: - ALL` を `docker-compose.yaml` ファイルに再追加してください。
:::

または、`docker run` を使用して SearXNG を直接実行できます:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. 接続確認

コマンドラインインターフェースで Open WebUI コンテナインスタンスから SearXNG への接続を確認してください:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. GUI 設定

1. 移動: `管理パネル` -> `設定` -> `ウェブ検索`
2. `ウェブ検索を有効化` を切り替えます
3. ドロップダウンメニューで `ウェブ検索エンジン` を `searxng` に設定します
4. `Searxng Query URL`を以下の例のいずれかに設定してください:

* `http://searxng:8080/search?q=<query>` (コンテナ名と公開ポートを使用する、Dockerベースのセットアップに適した設定)
* `http://host.docker.internal:8080/search?q=<query>` (`host.docker.internal`のDNS名とホストポートを使用する、Dockerベースのセットアップに適した設定)
* `http://<searxng.local>/search?q=<query>` (ローカルドメイン名を使用する、ローカルネットワークアクセスに適した設定)
* `https://<search.domain.com>/search?q=<query>` (セルフホスティングされたSearXNGインスタンス用のカスタムドメイン名を使用する、公開またはプライベートアクセスに適した設定)

**注意: `/search?q=<query>` の部分は必須です。**

5. `Search Result Count`と`Concurrent Requests`の値を必要に応じて調整してください
6. 変更を保存する

![SearXNG GUI 設定](/images/tutorial_searxng_config.png)

## 5. チャットでWeb検索を使用する

Web検索にアクセスするには、メッセージ入力フィールドの横にある+をクリックしてください。

ここでWeb検索をオン/オフすることができます。

![Web検索UIトグル](/images/web_search_toggle.png)

これらのステップに従うことで、SearXNGとOpen WebUIを正常にセットアップし、SearXNGエンジンを使用してウェブ検索を行うことができるようになります。

#### 注意

これをチャット内で明示的にオン/オフに切り替える必要があります。

これはセッションごとに有効になります。例えば、ページをリロードしたり、別のチャットに切り替えるとオフになります。
