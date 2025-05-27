---
sidebar_position: 10
title: "SearXNG"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Serve apenas como demonstração de como personalizar o Open WebUI para seu caso específico. Gostaria de contribuir? Veja o tutorial de contribuição.
:::

Este guia fornece instruções sobre como configurar capacidades de busca na web no Open WebUI usando SearXNG em Docker.

## SearXNG (Docker)

> "**SearXNG é um mecanismo de metabusca na internet gratuito que agrega resultados de vários serviços e bancos de dados de busca. Os usuários não são rastreados nem perfilados.**"

## 1. Configuração do SearXNG

Para configurar o SearXNG de forma ideal para uso com o Open WebUI, siga estas etapas:

**Etapa 1: `git clone` do Docker do SearXNG e navegue até a pasta:**

1. Crie um Novo Diretório `searxng-docker`

Clone o repositório searxng-docker. Esta pasta conterá seus arquivos de configuração do SearXNG. Consulte a [documentação do SearXNG](https://docs.searxng.org/) para instruções de configuração.

```bash
git clone https://github.com/searxng/searxng-docker.git
```

Navegue até o repositório `searxng-docker`:

```bash
cd searxng-docker
```

**Etapa 2: Localize e modifique o arquivo `.env`:**

1. Descomente `SEARXNG_HOSTNAME` do arquivo `.env` e configure-o conforme necessário:

```bash
# Por padrão, ouça em https://localhost
# Para alterar isso:
# * descomente SEARXNG_HOSTNAME, e substitua <host> pelo nome do host do SearXNG
# * descomente LETSENCRYPT_EMAIL, e substitua <email> pelo seu email (necessário para criar um certificado Let's Encrypt)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# Opcional:
# Se você executa uma instância muito pequena ou muito grande, talvez queira ajustar o número de trabalhadores uwsgi e threads por trabalhador
# Mais trabalhadores (= processos) significa que mais solicitações de busca podem ser manipuladas ao mesmo tempo, mas isso também causa maior uso de recursos

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**Etapa 3: Modifique o arquivo `docker-compose.yaml`**

3. Remova a restrição `localhost` modificando o arquivo `docker-compose.yaml`:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**Etapa 4: Conceda as Permissões Necessárias**

4. Permita que o container crie novos arquivos de configuração executando o seguinte comando no diretório raiz:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**Etapa 5: Crie um Arquivo `limiter.toml` Sem Restrição**

5. Crie um arquivo de configuração `searxng-docker/searxng/limiter.toml` sem restrição:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# Este arquivo de configuração atualiza o arquivo de configuração padrão
# Veja https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# ativa o método link_token no método ip_limit
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**Etapa 6: Remova o Arquivo Padrão `settings.yml`**

6. Exclua o arquivo padrão `searxng-docker/searxng/settings.yml` se ele existir, pois será regenerado na primeira inicialização do SearXNG:

```bash
rm searxng-docker/searxng/settings.yml
```

**Etapa 7: Crie um Novo Arquivo `settings.yml`**

:::note
Na primeira execução, você deve remover `cap_drop: - ALL` do arquivo `docker-compose.yaml` para que o serviço `searxng` consiga criar com sucesso `/etc/searxng/uwsgi.ini`. Isso é necessário porque a diretiva `cap_drop: - ALL` remove todas as capacidades, incluindo aquelas necessárias para a criação do arquivo `uwsgi.ini`. Após a primeira execução, você deve re-adicionar `cap_drop: - ALL` ao arquivo `docker-compose.yaml` por motivos de segurança.
:::

7. Suba o container momentaneamente para gerar um novo arquivo settings.yml:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**Etapa 8: Adicione Formatos e Atualize o Número da Porta**

8. Adicione os formatos HTML e JSON ao arquivo `searxng-docker/searxng/settings.yml`:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

Gere uma chave secreta para sua instância do SearXNG:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Usuários do Windows podem usar o seguinte script em Powershell para gerar a chave secreta:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

Atualize o número da porta na seção `server` para corresponder ao que você configurou anteriormente (neste caso, `8080`):

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

Altere o `bind_address` conforme desejado:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### Arquivos de Configuração

#### searxng-docker/searxng/settings.yml (Extrato)

O arquivo padrão `settings.yml` contém várias configurações de mecanismos. Abaixo está um extrato de como o arquivo padrão `settings.yml` pode se parecer:

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# veja https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url é definido na variável de ambiente SEARXNG_BASE_URL, veja .env e docker-compose.yml
  secret_key: "ultrasecretkey"  # altere isso!
  limiter: true  # pode ser desativado para uma instância privada
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
    - json # json é obrigatório
  # remova o formato para negar o acesso, use letras minúsculas.
  # formats: [html, csv, json, rss]
redis:
  # URL para conectar ao banco de dados redis. É sobrescrito por ${SEARXNG_REDIS_URL}.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

A porta no arquivo settings.yml para o SearXNG deve corresponder ao número da porta no arquivo docker-compose.yml para o SearXNG.

</details>

**Passo 9: Atualize o arquivo `uwsgi.ini`**

9. Certifique-se de que o arquivo `searxng-docker/searxng/uwsgi.ini` corresponda ao seguinte:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# Quem irá executar o código
uid = searxng
gid = searxng

# Número de workers (geralmente a contagem de CPUs)
# valor padrão: %k (= número de núcleos da CPU, veja Dockerfile)
workers = %k

# Número de threads por worker
# valor padrão: 4 (veja Dockerfile)
threads = 4

# Direito concedido ao socket criado
chmod-socket = 666

# Plugin a ser usado e configuração do interpretador
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# Módulo a ser importado
module = searx.webapp

# Virtualenv e caminho do Python
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# define automaticamente nomes de processo para algo significativo
auto-procname = true

# Desativar registro de solicitações para privacidade
disable-logging = true
log-5xx = true

# Definir o tamanho máximo de uma solicitação (excluindo o corpo da solicitação)
buffer-size = 8192

# Sem keep alive
# Veja https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi serve os arquivos estáticos
static-map = /static=/usr/local/searxng/searx/static
# expiração configurada para um dia
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. Configuração Alternativa

Alternativamente, se você não quiser modificar a configuração padrão, você pode simplesmente criar uma pasta vazia `searxng-docker` e seguir as instruções restantes de configuração.

### Configuração do Docker Compose

Adicione as seguintes variáveis de ambiente ao arquivo Open WebUI `docker-compose.yaml`:

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

Crie um arquivo `.env` para o SearXNG:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

Em seguida, adicione o seguinte ao arquivo `docker-compose.yaml` do SearXNG:

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

Seu conjunto está pronto para ser iniciado com:

```bash
docker compose up -d
```

:::note
Na primeira execução, você deve remover `cap_drop: - ALL` do arquivo `docker-compose.yaml` para que o serviço `searxng` consiga criar o arquivo `/etc/searxng/uwsgi.ini`. Isso é necessário porque a diretiva `cap_drop: - ALL` remove todas as capacidades, incluindo aquelas necessárias para criar o arquivo `uwsgi.ini`. Após a primeira execução, você deve re-adicionar `cap_drop: - ALL` ao arquivo `docker-compose.yaml` por razões de segurança.
:::

Alternativamente, você pode executar o SearXNG diretamente usando `docker run`:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. Confirmar Conectividade

Confirme a conectividade com o SearXNG a partir da sua instância de contêiner Open WebUI na interface de linha de comando:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. Configuração da Interface Gráfica

1. Navegue até: `Painel de Admin` -> `Configurações` -> `Pesquisa Web`
2. Ative `Habilitar Pesquisa Web`
3. Defina `Mecanismo de Pesquisa Web` no menu suspenso como `searxng`
4. Defina `URL de Consulta Searxng` como um dos seguintes exemplos:

* `http://searxng:8080/search?q=<query>` (utilizando o nome do contêiner e a porta exposta, adequado para configurações baseadas em Docker)
* `http://host.docker.internal:8080/search?q=<query>` (utilizando o nome DNS `host.docker.internal` e a porta do host, adequado para configurações baseadas em Docker)
* `http://<searxng.local>/search?q=<query>` (utilizando um nome de domínio local, adequado para acesso em rede local)
* `https://<search.domain.com>/search?q=<query>` (utilizando um nome de domínio personalizado para uma instância SearXNG auto-hospedada, adequado para acesso público ou privado)

**Observe que a parte `/search?q=<query>` é obrigatória.**

5. Ajuste os valores de `Quantidade de Resultados de Pesquisa` e `Solicitações Simultâneas` conforme necessário
6. Salve as alterações

![Configuração de GUI SearXNG](/images/tutorial_searxng_config.png)

## 5. Utilizando a Pesquisa Web em um Chat

Para acessar a Pesquisa Web, clique no + ao lado do campo de entrada da mensagem.

Aqui você pode ativar/desativar a Pesquisa Web.

![Alternância de UI de Pesquisa Web](/images/web_search_toggle.png)

Seguindo estes passos, você terá configurado com sucesso o SearXNG com o Open WebUI, permitindo que realize buscas na web usando o mecanismo SearXNG.

#### Nota

Você terá que ativar/desativar explicitamente isso em um chat.

Isso é ativado por sessão, por exemplo, recarregar a página ou mudar para outro chat desativará a função.
