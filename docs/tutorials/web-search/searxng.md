---
sidebar_position: 10
title: "SearXNG"
---

:::warning
本教程是社区贡献的内容，不由 Open WebUI 团队提供支持。仅作为如何为您的特定使用案例自定义 Open WebUI 的演示。想要贡献？查看贡献教程。
:::

本指南提供了使用 Docker 中的 SearXNG 在 Open WebUI 中设置网页搜索功能的说明。

## SearXNG (Docker)

> "**SearXNG 是一个免费的互联网元搜索引擎，它聚合来自各种搜索服务和数据库的结果。用户既不会被跟踪，也不会被分析。**"

## 1. SearXNG 配置

按照以下步骤为 Open WebUI 优化配置 SearXNG：

**第 1 步：`git clone` SearXNG Docker 并导航到文件夹：**

1. 创建一个新目录 `searxng-docker`

 克隆 searxng-docker 仓库。该文件夹将包含您的 SearXNG 配置文件。请参阅 [SearXNG 文档](https://docs.searxng.org/) 了解配置说明。

```bash
git clone https://github.com/searxng/searxng-docker.git
```

导航到 `searxng-docker` 仓库：

```bash
cd searxng-docker
```

**第 2 步：定位并修改 `.env` 文件：**

1. 在 `.env` 文件中取消注释 `SEARXNG_HOSTNAME` 并进行相应设置：

```bash
# 默认监听 https://localhost
# 如需更改：
# * 取消注释 SEARXNG_HOSTNAME，并将 <host> 替换为 SearXNG 主机名
# * 取消注释 LETSENCRYPT_EMAIL，并将 <email> 替换为您的电子邮件（需要创建 Let's Encrypt 证书）

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# 可选项：
# 如果运行的是非常小或非常大的实例，您可能需要更改使用的 uwsgi 工作线程及每个工作的线程数
# 更多的工作线程（= 进程）意味着可以同时处理更多的搜索请求，但也会导致更多资源使用

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**第 3 步：修改 `docker-compose.yaml` 文件**

3. 修改 `docker-compose.yaml` 文件去掉 `localhost` 限制：

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**第 4 步：授予必要的权限**

4. 在根目录运行以下命令允许容器创建新的配置文件：

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**第 5 步：创建一个非限制性的 `limiter.toml` 文件**

5. 创建一个非限制性的 `searxng-docker/searxng/limiter.toml` 配置文件：

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# 此配置文件更新默认配置文件
# 请参阅 https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# 在 ip_limit 方法中激活 link_token 方法
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**第 6 步：删除默认的 `settings.yml` 文件**

6. 如果存在，请删除默认的 `searxng-docker/searxng/settings.yml` 文件，因为它将在 SearXNG 的首次启动时重新生成：

```bash
rm searxng-docker/searxng/settings.yml
```

**第 7 步：创建一个新的 `settings.yml` 文件**

:::note
首次运行时，您必须从 `docker-compose.yaml` 文件中的 `cap_drop: - ALL` 中移除 `searxng` 服务，以成功创建 `/etc/searxng/uwsgi.ini`。这是必要的，因为 `cap_drop: - ALL` 指令移除了所有能力，包括创建 `uwsgi.ini` 文件所需的能力。在第一次运行之后，出于安全考虑，您应该将 `cap_drop: - ALL` 重新添加到 `docker-compose.yaml` 文件中。
:::

7. 短暂启动容器以生成一个新的 settings.yml 文件：

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**第 8 步：添加格式并更新端口号**

8. 在 `searxng-docker/searxng/settings.yml` 文件中添加 HTML 和 JSON 格式：

```bash
sed -i 's/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/' searxng-docker/searxng/settings.yml
```

为您的 SearXNG 实例生成一个秘密密钥：

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windows 用户可以使用以下 PowerShell 脚本生成秘密密钥：

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace 'ultrasecretkey', $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

在 `server` 部分更新端口号以匹配您之前设置的端口号（此例为 `8080`）：

```bash
sed -i 's/port: 8080/port: 8080/' searxng-docker/searxng/settings.yml
```

根据需要更改 `bind_address`：

```bash
sed -i 's/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/' searxng-docker/searxng/settings.yml
```

#### 配置文件

#### searxng-docker/searxng/settings.yml（摘录）

默认的`settings.yml`文件包含许多引擎设置。以下是默认`settings.yml`文件的一个摘录示例：

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# 请参阅 https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url 在 SEARXNG_BASE_URL 环境变量中定义，请参阅 .env 和 docker-compose.yml
  secret_key: "ultrasecretkey"  # 更改此值！
  limiter: true  # 对于私有实例可以禁用
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
    - json # 必须包含 JSON 格式
  # 移除格式将拒绝访问，请使用小写。
  # formats: [html, csv, json, rss]
redis:
  # 连接 Redis 数据库的 URL，被 ${SEARXNG_REDIS_URL} 覆盖。
  # 请参阅 https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

在 SearXNG 的 settings.yml 文件中设置的端口应与 docker-compose.yml 文件中 SearXNG 的端口号相匹配。

</details>

**步骤 9：更新 `uwsgi.ini` 文件**

9. 确保你的 `searxng-docker/searxng/uwsgi.ini` 文件与以下内容匹配：

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# 代码运行的用户
uid = searxng
gid = searxng

# 工作进程的数量（通常是 CPU 数量）
# 默认值: %k (= CPU 核心数量，请参阅 Dockerfile)
workers = %k

# 每个工作进程的线程数量
# 默认值: 4 (请参阅 Dockerfile)
threads = 4

# 创建的套接字的权限
chmod-socket = 666

# 使用的插件和解释器配置
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# 要导入的模块
module = searx.webapp

# 虚拟环境和 Python 路径
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# 自动设置进程名称为有意义的名称
auto-procname = true

# 隐私原因禁用请求日志
disable-logging = true
log-5xx = true

# 设置请求的最大大小（不包括请求正文）
buffer-size = 8192

# 无持久连接
# 请参阅 https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi 服务静态文件
static-map = /static=/usr/local/searxng/searx/static
# 设置过期时间为一天
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. 替代设置

或者，如果您不想修改默认配置，可以简单地创建一个空的`searxng-docker`文件夹并按照其余设置说明进行操作。

### Docker Compose 设置

将以下环境变量添加到您的 Open WebUI 的`docker-compose.yaml`文件：

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

为 SearXNG 创建一个 `.env` 文件：

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

接下来，将以下内容添加到 SearXNG 的 `docker-compose.yaml` 文件：

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

您的栈可以使用以下命令启动：

```bash
docker compose up -d
```

:::note
首次运行时，必须从`docker-compose.yaml`文件中移除`cap_drop: - ALL`，以便`searxng`服务成功创建`/etc/searxng/uwsgi.ini`。这是因为`cap_drop: - ALL`指令移除了所有能力，包括创建`uwsgi.ini`文件所需的能力。首次运行后，应为了安全原因重新添加`cap_drop: - ALL`到`docker-compose.yaml`文件中。
:::

或者，可以直接使用`docker run`运行 SearXNG：

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. 确认连接

从您的 Open WebUI 容器实例确认与 SearXNG 的连接，在命令行中运行以下命令：

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. GUI 配置

1. 导航至：`管理面板` -> `设置` -> `网页搜索`
2. 切换开启`启用网页搜索`
3. 从下拉菜单中设置`网页搜索引擎`为`searxng`
4. 将 `Searxng Query URL` 设置为以下示例之一：

* `http://searxng:8080/search?q=<query>` （使用容器名称和暴露端口，适用于基于 Docker 的设置）
* `http://host.docker.internal:8080/search?q=<query>` （使用 `host.docker.internal` DNS 名称和主机端口，适用于基于 Docker 的设置）
* `http://<searxng.local>/search?q=<query>` （使用本地域名，适用于本地网络访问）
* `https://<search.domain.com>/search?q=<query>` （使用自定义域名的自托管 SearXNG 实例，适用于公共或私人访问）

**请注意，`/search?q=<query>` 部分是必须的。**

5. 根据需要调整 `搜索结果数量` 和 `并发请求` 的值
6. 保存更改

![SearXNG GUI 配置](/images/tutorial_searxng_config.png)

## 5. 在聊天中使用网页搜索

要访问网页搜索，点击消息输入字段旁边的 `+`。

在这里您可以开启/关闭网页搜索。

![网页搜索界面切换](/images/web_search_toggle.png)

按照这些步骤，您将成功设置 SearXNG 和 Open WebUI，从而能够使用 SearXNG 引擎进行网页搜索。

#### 注意

您需要在聊天中显式地开启/关闭该功能。

这是基于单个会话启用的，例如重新加载页面或切换到另一个聊天时会自动关闭。
