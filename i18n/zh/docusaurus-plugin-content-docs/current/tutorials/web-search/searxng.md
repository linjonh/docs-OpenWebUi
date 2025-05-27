---
sidebar_position: 10
title: "SearXNG"
---

:::warning
本教程为社区贡献，由 Open WebUI 团队不提供支持。仅作为如何为您的特定使用场景自定义 Open WebUI 的演示。想要贡献？查阅贡献教程。
:::

本指南提供了使用 Docker 设置 SearXNG 实现 Open WebUI 网页搜索功能的说明。

## SearXNG（Docker）

> “**SearXNG 是一个免费互联网元搜索引擎，聚合来自各种搜索服务和数据库的结果。用户不会被跟踪或归档。**”

## 1. SearXNG 配置

要将 SearXNG 配置为与 Open WebUI 配合使用，请按以下步骤操作：

**步骤 1: `git clone` SearXNG Docker 并导航至文件夹：**

1. 创建一个新目录 `searxng-docker`

 克隆 searxng-docker 仓库。该文件夹将包含您的 SearXNG 配置文件。有关配置说明，请参阅 [SearXNG 文档](https://docs.searxng.org/)。

```bash
git clone https://github.com/searxng/searxng-docker.git
```

导航到 `searxng-docker` 仓库：

```bash
cd searxng-docker
```

**步骤 2: 找到并修改 `.env` 文件：**

1. 从 `.env` 文件中取消注释 `SEARXNG_HOSTNAME` 并相应设置：

```bash
# 默认监听 https://localhost
# 若要更改此设置：
# * 取消注释 SEARXNG_HOSTNAME，并将 <host> 替换为 SearXNG 主机名
# * 取消注释 LETSENCRYPT_EMAIL，并将 <email> 替换为您的电子邮件（需要创建 Let's Encrypt 证书）

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# 可选：
# 如果运行非常小或非常大的实例，您可能需要更改每个 uwsgi 工作线程和工作线程使用的数量
# 更多工作线程（=进程）意味着可以同时处理更多的搜索请求，但也会导致更多的资源使用

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**步骤 3: 修改 `docker-compose.yaml` 文件**

3. 修改 `docker-compose.yaml` 文件以移除 `localhost` 限制：

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**步骤 4: 授予必要权限**

4. 在根目录中运行以下命令允许容器创建新配置文件：

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**步骤 5: 创建非限制性 `limiter.toml` 文件**

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

**步骤 6: 删除默认的 `settings.yml` 文件**

6. 如果存在默认的 `searxng-docker/searxng/settings.yml` 文件，请将其删除，因为它将在 SearXNG 第一次启动时重新生成：

```bash
rm searxng-docker/searxng/settings.yml
```

**步骤 7: 创建新的 `settings.yml` 文件**

:::note
运行时必须从 `docker-compose.yaml` 文件中删除 `cap_drop: - ALL`，以便 `searxng` 服务成功创建 `/etc/searxng/uwsgi.ini` 。这是因为 `cap_drop: - ALL` 指令移除了所有能力，包括创建 `uwsgi.ini` 文件所需的能力。首次运行后，应再次将 `cap_drop: - ALL` 添加到 `docker-compose.yaml` 文件中以增强安全性。
:::

7. 暂时启动容器以生成新的 settings.yml 文件：

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**步骤 8: 添加格式并更新端口号**

8. 向 `searxng-docker/searxng/settings.yml` 文件中添加 HTML 和 JSON 格式：

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

为您的 SearXNG 实例生成一个密钥：

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windows 用户可以使用以下 PowerShell 脚本生成密钥：

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

在 `server` 部分更新端口号以匹配之前设置的端口号（此处为 `8080`）：

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

根据需要更改 `bind_address`：

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### 配置文件

#### searxng-docker/searxng/settings.yml（摘录）

默认的`settings.yml`文件包含许多引擎设置。以下是默认`settings.yml`文件的可能内容：

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# 参见https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url在SEARXNG_BASE_URL环境变量中定义，参见.env和docker-compose.yml
  secret_key: "ultrasecretkey"  # 请更改！
  limiter: true  # 可为私人实例禁用
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
    - json # json是必需的
  # 删除格式以拒绝访问，请使用小写。
  # formats: [html, csv, json, rss]
redis:
  # 连接redis数据库的URL。由${SEARXNG_REDIS_URL}覆盖。
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

settings.yml文件中的SearXNG端口应与docker-compose.yml文件中的端口号匹配。

</details>

**步骤9：更新`uwsgi.ini`文件**

确保你的`searxng-docker/searxng/uwsgi.ini`文件与以下内容匹配：

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# 谁将运行代码
uid = searxng
gid = searxng

# 工作线程数量（通常为CPU数量）
# 默认值：%k（等于CPU核心数量，参见Dockerfile）
workers = %k

# 每个工作线程的线程数
# 默认值：4（参见Dockerfile）
threads = 4

# 创建的socket的权限
chmod-socket = 666

# 使用的插件和解释器配置
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# 要导入的模块
module = searx.webapp

# 虚拟环境和python路径
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# 自动将进程名称设置为有意义值
auto-procname = true

# 为隐私禁用请求日志
disable-logging = true
log-5xx = true

# 设置请求的最大大小（不包括请求体）
buffer-size = 8192

# 禁用保持连接
# 参见https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi提供静态文件服务
static-map = /static=/usr/local/searxng/searx/static
# 过期时间设置为一天
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. 替代设置

或者，如果你不想修改默认配置，你可以简单地创建一个空的`searxng-docker`文件夹并遵循其余的设置说明。

### Docker Compose设置

将以下环境变量添加到您的Open WebUI的`docker-compose.yaml`文件中：

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

为SearXNG创建一个`.env`文件：

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

接下来，将以下内容添加到SearXNG的`docker-compose.yaml`文件中：

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

你的堆栈可以通过以下命令启动：

```bash
docker compose up -d
```

:::note
首次运行时，您必须从`docker-compose.yaml`文件中移除`cap_drop: - ALL`以便`searxng`服务成功创建`/etc/searxng/uwsgi.ini`。这是必要的，因为`cap_drop: - ALL`指令会移除所有权限，包括创建`uwsgi.ini`文件所需的权限。在首次运行后，您应重新添加`cap_drop: - ALL`到`docker-compose.yaml`文件以提高安全性。
:::

或者，您可以直接使用`docker run`运行SearXNG：

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3.确认连接

在命令行界面确认从您的Open WebUI容器实例连接到SearXNG：

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. 图形界面设置

1. 导航至：`管理员面板` -> `设置` -> `网页搜索`
2. 切换启用`网页搜索`
3. 在下拉菜单中将`网页搜索引擎`设置为`searxng`
4. 设置 `Searxng Query URL` 为以下示例之一：

* `http://searxng:8080/search?q=<query>` （使用容器名称和开放端口，适用于基于 Docker 的设置）
* `http://host.docker.internal:8080/search?q=<query>` （使用 `host.docker.internal` DNS 名称和主机端口，适用于基于 Docker 的设置）
* `http://<searxng.local>/search?q=<query>` （使用本地域名，适用于本地网络访问）
* `https://<search.domain.com>/search?q=<query>` （使用自定义域名用于托管 SearXNG 实例，适用于公共或私人访问）

**请注意，`/search?q=<query>` 部分是必需的。**

5. 根据需要调整 `Search Result Count` 和 `Concurrent Requests` 的值
6. 保存更改

![SearXNG GUI 配置](/images/tutorial_searxng_config.png)

## 5. 在聊天中使用网页搜索

要访问网页搜索，请点击消息输入框旁的 +。

您可以在此切换网页搜索开/关。

![网页搜索 UI 切换](/images/web_search_toggle.png)

通过完成这些步骤，您将成功使用 Open WebUI 设置 SearXNG，从而可以使用 SearXNG 引擎进行网页搜索。

#### 注意

您必须明确在聊天中切换此功能的开/关。

此功能针对每个会话启用，例如重新加载页面或切换到另一个聊天时会自动关闭。
