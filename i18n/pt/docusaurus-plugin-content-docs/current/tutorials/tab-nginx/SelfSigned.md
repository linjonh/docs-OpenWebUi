### Certificado Autoassinado


Usar certificados autoassinados é adequado para desenvolvimento ou uso interno onde a confiança não é uma preocupação crítica.

#### Passos

1. **Crie Diretórios para Arquivos do Nginx:**

    ```bash
    mkdir -p conf.d ssl
    ```

2. **Crie o Arquivo de Configuração do Nginx:**

    **`conf.d/open-webui.conf`:**

    ```nginx
    server {
        listen 443 ssl;
        server_name seu_dominio_ou_IP;

        ssl_certificate /etc/nginx/ssl/nginx.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        location / {
            proxy_pass http://host.docker.internal:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Desativar buffering do proxy para melhor transmissão de respostas dos modelos
            proxy_buffering off;

            # (Opcional) Aumentar o tamanho máximo da solicitação para anexos grandes e mensagens de áudio longas
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }
    ```

3. **Gerar Certificados SSL Autoassinados:**

    ```bash
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/nginx.key \
    -out ssl/nginx.crt \
    -subj "/CN=seu_dominio_ou_IP"
    ```

4. **Atualizar Configuração do Docker Compose:**

    Adicione o serviço Nginx ao seu `docker-compose.yml`:

    ```yaml
    services:
      nginx:
        image: nginx:alpine
        ports:
          - "443:443"
        volumes:
          - ./conf.d:/etc/nginx/conf.d
          - ./ssl:/etc/nginx/ssl
        depends_on:
          - open-webui
    ```

5. **Iniciar o Serviço Nginx:**

    ```bash
    docker compose up -d nginx
    ```

#### Acessar a WebUI

Acesse o Open WebUI via HTTPS em:

[https://seu_dominio_ou_IP](https://seu_dominio_ou_IP)

---
