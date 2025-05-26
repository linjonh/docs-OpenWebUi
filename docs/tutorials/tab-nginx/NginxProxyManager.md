### Nginx代理管理器

Nginx代理管理器（NPM）允许您轻松管理反向代理，并通过Let&apos;s Encrypt提供的有效SSL证书保护您的本地应用程序，例如Open WebUI。
此设置启用了HTTPS访问，这对于许多移动浏览器因其安全性要求而使用语音输入功能是必要的，同时不直接将应用程序的特定端口暴露到互联网上。

#### 前置条件

- 一台运行Docker的家庭服务器和运行中的open-webui容器。
- 一个域名（例如免费的DuckDNS或付费的Namecheap/GoDaddy）。
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
    image: &apos;jc21/nginx-proxy-manager:latest&apos;
    restart: unless-stopped
    ports:
      - &apos;80:80&apos;
      - &apos;81:81&apos;
      - &apos;443:443&apos;
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

运行容器：
```bash
docker-compose up -d
```
3. **配置DNS和域名：**

    * 登录到您的域名提供商（例如DuckDNS）并创建一个域名。
    * 将域名指向您的代理的本地IP（例如：192.168.0.6）。
    * 如果使用DuckDNS，从他们的仪表盘获取一个API令牌。

###### 以下是一个简单的示例，展示了在https://www.duckdns.org/domains上的操作：
    
4. **设置SSL证书：**
* 通过http://server_ip:81访问Nginx代理管理器。例如：``192.168.0.6:81``
* 使用默认的凭据登录（admin@example.com / changeme）。按照提示更改它们。
* 转到SSL证书 → 添加SSL证书 → Let&apos;s Encrypt。
* 输入您的电子邮件和从DuckDNS获得的域名。一个域名包含星号，另一个不包含。例如：``*.hello.duckdns.org``和``hello.duckdns.org``。
* 选择使用DNS挑战，选择DuckDNS，并粘贴您的API令牌。例如：
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* 同意Let&apos;s Encrypt条款并保存。如果需要，请调整传播时间**（120秒）**。

5. **创建代理主机：**
* 对于每个服务（例如openwebui、nextcloud），转到主机 → 代理主机 → 添加代理主机。
* 填写域名（例如：openwebui.hello.duckdns.org）。
* 将方案设置为HTTP（默认），启用``Websockets支持``并指向您的Docker IP（如果open-webui的Docker运行在与NGINX管理器相同的计算机上，这将是之前的相同IP，例如：``192.168.0.6``）。
* 选择之前生成的SSL证书，强制SSL，并启用HTTP/2。
6. **添加您的URL到open-webui（否则会遇到HTTPS错误）：**

* 转到您的open-webui → 管理面板 → 设置 → 通用
* 在**Webhook URL**文本字段中，输入您通过Nginx反向代理连接到open-webui的URL。例如：``hello.duckdns.org``（对于此例非必需）或``openwebui.hello.duckdns.org``（对于此例必需）。

#### 访问WebUI：

通过HTTPS访问Open WebUI：``hello.duckdns.org``或``openwebui.hello.duckdns.org``（根据您的设置方式）。

###### 防火墙注意事项：注意，本地防火墙软件（例如Portmaster）可能会阻止内部Docker网络流量或所需端口。如果发生问题，请检查防火墙规则以确保允许此设置所需的通信。
