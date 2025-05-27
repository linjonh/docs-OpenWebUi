### Nginx Proxy Manager

O Nginx Proxy Manager (NPM) permite gerenciar facilmente proxies reversos e proteger suas aplicações locais, como o Open WebUI, com certificados SSL válidos da Lets Encrypt.
Essa configuração habilita acesso HTTPS, necessário para utilizar recursos de entrada por voz em muitos navegadores móveis devido às exigências de segurança, sem expor diretamente a porta específica da aplicação para a internet.

#### Pré-requisitos

- Um servidor doméstico executando Docker e o contêiner do open-webui em execução.
- Um nome de domínio (opções gratuitas como DuckDNS ou pagas como Namecheap/GoDaddy).
- Conhecimento básico de Docker e configuração de DNS.

#### Etapas

1. **Criar diretórios para os arquivos do Nginx:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Configurar o Nginx Proxy Manager com o Docker:**

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

Execute o contêiner:
```bash
docker-compose up -d
```
3. **Configurar DNS e domínio:**

    * Faça login no seu provedor de domínio (por exemplo, DuckDNS) e crie um domínio.
    * Aponte o domínio para o IP local do seu proxy (por exemplo, 192.168.0.6).
    * Se estiver usando DuckDNS, obtenha um token de API no painel deles.

###### Aqui está um exemplo simples de como isso é feito em https://www.duckdns.org/domains :
    
4. **Configurar certificados SSL:**
* Acesse o Nginx Proxy Manager em http://server_ip:81. Por exemplo: ``192.168.0.6:81``
* Faça login com as credenciais padrão (admin@example.com / changeme). Altere-as quando solicitado.
* Vá para SSL Certificates → Add SSL Certificate → Lets Encrypt.
* Insira seu e-mail e o nome de domínio obtido do DuckDNS. Um nome de domínio contém um asterisco e outro não. Exemplo: ``*.hello.duckdns.org`` e ``hello.duckdns.org``.
* Selecione Use a DNS challenge, escolha DuckDNS, e cole seu token de API. Exemplo:
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Concorde com os termos da Let’s Encrypt e salve. Altere o tempo de propagação **se necessário** (120 segundos).

5. **Criar hosts de proxy:**
* Para cada serviço (por exemplo, openwebui, nextcloud), vá para Hosts → Proxy Hosts → Add Proxy Host.
* Preencha o nome do domínio (por exemplo, openwebui.hello.duckdns.org).
* Configure o esquema para HTTP (padrão), habilite ``Websockets support`` e aponte para o IP do Docker (se o docker com o open-webui estiver sendo executado no mesmo computador que o gerenciador do NGINX, este será o mesmo IP anterior (exemplo: ``192.168.0.6``)).
* Selecione o certificado SSL gerado anteriormente, force SSL, e habilite HTTP/2.
6. **Adicione sua URL ao open-webui (caso contrário, aparecerá um erro de HTTPS):**

* Vá para seu open-webui → Painel de Administração → Configurações → Geral
* No campo de texto **Webhook URL**, insira sua URL através da qual você conectará ao open-webui via Nginx reverse proxy. Exemplo: ``hello.duckdns.org`` (não essencial com este) ou ``openwebui.hello.duckdns.org`` (essencial com este).

#### Acessar o WebUI:

Acesse o Open WebUI via HTTPS em ``hello.duckdns.org`` ou ``openwebui.hello.duckdns.org`` (dependendo de como foi configurado).

###### Nota sobre firewall: Esteja ciente de que o software local de firewall (como Portmaster) pode bloquear o tráfego de rede interna Docker ou as portas necessárias. Se houver problemas, verifique as regras do seu firewall para garantir que a comunicação necessária para esta configuração esteja permitida.
