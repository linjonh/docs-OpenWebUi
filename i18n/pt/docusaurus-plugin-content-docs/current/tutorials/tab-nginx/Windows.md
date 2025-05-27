### Utilizando um Certificado Autoassinado e Nginx no Windows sem Docker

Para instalações internas/de desenvolvimento básicas, você pode usar o nginx e um certificado autoassinado para redirecionar o Open WebUI para https, permitindo o uso de recursos como entrada de microfone em uma rede LAN. (Por padrão, a maioria dos navegadores não permitirá entrada de microfone em URLs inseguras que não sejam localhost)

Este guia assume que você instalou o Open WebUI usando pip e está executando `open-webui serve`

#### Passo 1: Instalando openssl para geração de certificado

Primeiro você precisará instalar o openssl

Você pode baixar e instalar binários pré-compilados do site [Shining Light Productions (SLP)](https://slproweb.com/).

Alternativamente, se você tiver [Chocolatey](https://chocolatey.org/) instalado, pode utilizá-lo para instalar o OpenSSL rapidamente:

1. Abra o Prompt de Comando ou PowerShell.
2. Execute o seguinte comando para instalar o OpenSSL:
   ```bash
   choco install openssl -y
   ```

---

### **Verificar Instalação**
Após a instalação, abra um Prompt de Comando e digite:
```bash
openssl version
```
Se exibir a versão do OpenSSL (por exemplo, `OpenSSL 3.x.x ...`), ele foi instalado corretamente.

#### Passo 2: Instalando nginx

Baixe o Nginx oficial para Windows de [nginx.org](https://nginx.org) ou use um gerenciador de pacotes como Chocolatey.
 Extraia o arquivo ZIP baixado para um diretório (ex.: C:\nginx).

#### Passo 3: Gerar certificado

Execute o seguinte comando:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

Mova os arquivos nginx.key e nginx.crt gerados para uma pasta de sua escolha, ou para o diretório C:\nginx

#### Passo 4: Configurar nginx

Abra o arquivo C:\nginx\conf\nginx.conf em um editor de texto

Se você quiser que o Open WebUI seja acessível pela sua LAN local, certifique-se de anotar o endereço IP da sua LAN usando `ipconfig`, por exemplo, 192.168.1.15

Configure conforme segue:

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  $remote_addr - $remote_user [$time_local] "$request" 
    #                  $status $body_bytes_sent "$http_referer" 
    #                  "$http_user_agent" "$http_x_forwarded_for";

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  120;

    #gzip  on;

    # necessário para lidar corretamente com websockets (transmissão)
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # Redirecionar todo o tráfego HTTP para HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # Lidar com tráfego HTTPS
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # Configurações SSL (certifique-se de que os caminhos estão corretos)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # Configuração de proxy para o serviço local
        location / {
            # proxy_pass deve apontar para sua versão localhost em execução do open-webui
            proxy_pass http://localhost:8080;

            # Adicionar suporte ao WebSocket (Necessário para versão 0.5.0 e superior)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Desabilitar o buffer de proxy para melhor resposta de streaming dos modelos
            proxy_buffering off;

            # (Opcional) Aumentar o tamanho máximo de requisição para anexos grandes e mensagens de áudio longas
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

Salve o arquivo e verifique se a configuração não possui erros ou problemas de sintaxe executando `nginx -t`. Você pode precisar executar `cd C:\nginx` primeiro, dependendo de como você o instalou.

Execute o nginx executando `nginx`. Se um serviço nginx já estiver iniciado, você pode recarregar a nova configuração executando `nginx -s reload`

---

Agora você deve conseguir acessar o Open WebUI em https://192.168.1.15 (ou no endereço IP de sua LAN conforme apropriado). Certifique-se de permitir acesso no firewall do Windows conforme necessário.
