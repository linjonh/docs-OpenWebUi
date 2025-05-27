---
sidebar_position: 30
title: "🔗 Suporte ao Websocket Redis"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# 🔗 Suporte ao Websocket Redis

## Visão Geral

Esta página de documentação descreve as etapas necessárias para integrar o Redis ao Open WebUI para suporte a websockets. Seguindo essas etapas, você poderá habilitar a funcionalidade de websocket na sua instância do Open WebUI, permitindo comunicação e atualizações em tempo real entre os clientes e sua aplicação.

### Pré-requisitos

* Uma instância válida do Open WebUI (rodando a versão 1.0 ou superior)
* Um contêiner Redis (usaremos `docker.io/valkey/valkey:8.0.1-alpine` neste exemplo, que é baseado na última versão do Redis 7.x)
* Docker Composer (versão 2.0 ou superior) instalado no seu sistema
* Uma rede Docker para comunicação entre o Open WebUI e o Redis
* Conhecimento básico de Docker, Redis e Open WebUI

## Configurando o Redis

Para configurar o Redis para suporte a websockets, você precisará criar um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Notas

A diretiva `ports` não está incluída nesta configuração, pois não é necessária na maioria dos casos. O serviço Redis ainda será acessível dentro da rede Docker pelo serviço Open WebUI. No entanto, se você precisar acessar a instância Redis de fora da rede Docker (por exemplo, para fins de depuração ou monitoramento), poderá adicionar a diretiva `ports` para expor a porta do Redis (por exemplo, `6379:6379`).

A configuração acima configura um contêiner Redis chamado `redis-valkey` e monta um volume para persistência de dados. A diretiva `healthcheck` garante que o contêiner seja reiniciado se não responder ao comando `ping`. A opção de comando `--save 30 1` salva o banco de dados Redis no disco a cada 30 minutos, caso pelo menos uma chave tenha sido alterada.

:::

Para criar uma rede Docker para comunicação entre Open WebUI e Redis, execute o seguinte comando:

```bash
docker network create openwebui-network
```

## Configurando o Open WebUI

Para habilitar o suporte a websockets no Open WebUI, você precisará definir as seguintes variáveis de ambiente para sua instância do Open WebUI:

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

Essas variáveis de ambiente habilitam o suporte a websockets, especificam o Redis como o gerenciador de websockets e definem o URL do Redis. Certifique-se de substituir o valor de `WEBSOCKET_REDIS_URL` pelo endereço IP real da sua instância Redis.

Ao executar o Open WebUI usando o Docker, você precisa conectá-lo à mesma rede Docker:

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

Substitua `127.0.0.1` pelo endereço IP real do seu contêiner Redis na rede Docker.

## Verificação

Se você configurou corretamente o Redis e o Open WebUI, deverá ver a seguinte mensagem de log ao iniciar sua instância do Open WebUI:

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

Isso confirma que o Open WebUI está usando o Redis para gerenciamento de websockets. Você também pode usar o comando `docker exec` para verificar se a instância do Redis está em execução e aceitando conexões:

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

Este comando deve retornar `PONG` se a instância do Redis estiver funcionando corretamente. Se este comando falhar, você pode tentar este comando alternativo:

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Solução de Problemas

Se você encontrar problemas com o Redis ou o suporte a websockets no Open WebUI, pode consultar os seguintes recursos para solução de problemas:

* [Documentação do Redis](https://redis.io/docs)
* [Documentação do Docker Compose](https://docs.docker.com/compose/overview/)
* [Documentação do sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html)
