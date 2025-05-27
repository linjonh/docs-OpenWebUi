### Lets Encrypt

Lets Encrypt fornece certificados SSL gratuitos confiáveis pela maioria dos navegadores, ideal para ambientes de produção.

#### Pré-requisitos

- **Certbot** instalado no seu sistema.
- Registros DNS configurados corretamente para apontar para o seu servidor.

#### Etapas

1. **Crie Diretórios para Arquivos do Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Crie o Arquivo de Configuração do Nginx:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 80;
        server_name seu_dominio_ou_IP;

        location / {
            proxy_pass http://host.docker.internal:3000;
    
            # Adicionar suporte para WebSocket (Necessário para a versão 0.5.0 e superiores)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Desativar o buffer do proxy para melhor resposta de streaming dos modelos
            proxy_buffering off;

            # (Opcional) Aumentar o tamanho máximo da solicitação para anexos grandes e mensagens de áudio longas
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Script Simplificado do Lets Encrypt:**

    **`enable_letsencrypt.sh`:**

    ```bash
    #!/bin/bash

    # Descrição: Script simplificado para obter e instalar certificados SSL Lets Encrypt usando o Certbot.

    DOMAIN="seu_dominio_ou_IP"
    EMAIL="seu_email@exemplo.com"

    # Instalar Certbot se não estiver instalado
    if ! command -v certbot &> /dev/null; then
        echo "Certbot não encontrado. Instalando..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi

    # Obter certificado SSL
    sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

    # Recarregar Nginx para aplicar mudanças
    sudo systemctl reload nginx

    echo "O certificado SSL Lets Encrypt foi instalado e o Nginx recarregado."
    ```

    **Tornar o script executável:**

    ```bash
    chmod +x enable_letsencrypt.sh
    ```

4. **Atualize a Configuração do Docker Compose:**

    Adicione o serviço Nginx ao seu `docker-compose.yml`:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "80:80"
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Inicie o Serviço Nginx:**

    ```bash
    docker compose up -d nginx
    ```

6. **Execute o Script do Lets Encrypt:**

    Execute o script para obter e instalar o certificado SSL:

    ```bash
    ./enable_letsencrypt.sh
    ```

#### Acesse o WebUI

Acesse o Open WebUI via HTTPS em:

[https://seu_dominio_ou_IP](https://seu_dominio_ou_IP)
