### Nginx代理管理器

Nginx代理管理器（NPM）可以帮助您轻松管理反向代理，并使用Lets Encrypt生成的有效SSL证书保护您的本地应用程序（如Open WebUI）。
此设置启用了HTTPS访问，这对于许多移动浏览器因安全需求使用语音输入功能是必要的，同时无需将应用程序的特定端口直接暴露到互联网。

#### 前提条件

- 一个运行Docker且运行open-webui容器的家庭服务器。
- 一个域名（例如DuckDNS的免费选项或Namecheap/GoDaddy等付费选项）。
- 基本的Docker和DNS配置知识。

#### 步骤

1. **为Nginx文件创建目录：**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **使用Docker设置Nginx代理管理器：**

    ```bash
    nano docker-compose.yml
    ```

```yaml
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 81:81
      - 443:443
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

运行容器：
```bash
docker-compose up -d
```
3. **配置DNS和域名：**

    * 登录您的域名提供商（例如DuckDNS），并创建一个域名。
    * 将域名指向您的代理的本地IP（例如：192.168.0.6）。
    * 如果使用DuckDNS，从其控制面板获取一个API令牌。

###### 这里是一个简单的示例，展示如何在https://www.duckdns.org/domains完成：
    
4. **设置SSL证书：**
* 访问Nginx代理管理器，地址为http://server_ip:81。例如：``192.168.0.6:81``
* 使用默认凭据登录（admin@example.com / changeme）。按提示更改密码。
* 转到SSL证书 → 添加SSL证书 → Lets Encrypt。
* 输入您的电子邮件和从DuckDNS获取的域名。一个域名包含星号，另一个没有。例如：``*.hello.duckdns.org``和``hello.duckdns.org``。
* 选择使用DNS验证，选择DuckDNS，并粘贴您的API令牌。例如：
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* 同意Let’s Encrypt的条款并保存。根据需要更改传播时间（建议120秒）。

5. **创建代理主机：**
* 对于每个服务（例如：openwebui、nextcloud），转到主机 → 代理主机 → 添加代理主机。
* 填写域名（例如：openwebui.hello.duckdns.org）。
* 将协议设置为HTTP（默认），启用``Websockets支持``，并指向您的Docker IP（如果运行open-webui的Docker与NGINX管理器同处一台计算机上，这将是之前的相同IP，例如：``192.168.0.6``）。
* 选择之前生成的SSL证书，强制SSL并启用HTTP/2。
6. **将您的URL添加到open-webui（否则会出现HTTPS错误）：**

* 转到您的open-webui → 管理面板 → 设置 → 常规
* 在**Webhook URL**文本框中，输入您的URL，通过该URL您将通过Nginx反向代理连接到您的open-webui。例如：``hello.duckdns.org``（此情况非必须）或``openwebui.hello.duckdns.org``（此情况必须）。

#### 访问WebUI：

通过HTTPS访问Open WebUI，地址为``hello.duckdns.org``或``openwebui.hello.duckdns.org``（根据您的设置方式）。

###### 防火墙注意事项：请注意，本地防火墙软件（如Portmaster）可能会阻止内部Docker网络流量或所需端口。如果遇到问题，请检查您的防火墙规则是否允许此设置所需的通信。
