# Configuração do Docker Compose

Usar o Docker Compose simplifica a gestão de aplicações Docker com múltiplos contêineres.

Se você não tiver o Docker instalado, confira nosso [tutorial de instalação do Docker](../../../tutorials/docker-install.md).

O Docker Compose requer um pacote adicional, `docker-compose-v2`.

**Aviso:** Tutoriais antigos do Docker Compose podem fazer referência à sintaxe da versão 1, que utiliza comandos como `docker-compose build`. Certifique-se de usar a sintaxe da versão 2, que utiliza comandos como `docker compose build` (note o espaço em vez de um hífen).

## Exemplo de `docker-compose.yml`

Aqui está um arquivo de configuração exemplo para configurar o Open WebUI com Docker Compose:

```yaml
version: 3
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
volumes:
  open-webui:
```

## Iniciando os Serviços

Para iniciar os serviços, execute o seguinte comando:

```bash
docker compose up -d
```

## Script Auxiliar

Um script auxiliar útil chamado `run-compose.sh` está incluído na base de código. Este script ajuda a escolher quais arquivos Docker Compose incluir na sua implantação, facilitando o processo de configuração.

---

**Nota:** Para suporte à GPU Nvidia, altere a imagem de `ghcr.io/open-webui/open-webui:main` para `ghcr.io/open-webui/open-webui:cuda` e adicione o seguinte à definição do serviço no arquivo `docker-compose.yml`:

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          count: all
          capabilities: [gpu]
```

Essa configuração garante que sua aplicação possa utilizar recursos de GPU quando disponíveis.
