---
sidebar_position: 30
title: "🔗 Redis Websocket 支持"
---

:::warning
本教程是社区贡献内容，并未得到 Open WebUI 团队的支持。它仅用于演示如何根据您的特定用例自定义 Open WebUI。如果您想贡献，请查看贡献教程。
:::

# 🔗 Redis Websocket 支持

## 概述

此文档页面概述了将 Redis 与 Open WebUI 集成以支持 websocket 的步骤。通过遵循这些步骤，您将能够在 Open WebUI 实例中启用 websocket 功能，实现客户端与应用程序之间的实时通信和更新。

### 前提条件

* 有效的 Open WebUI 实例（运行版本 1.0 或更高）
* 一个 Redis 容器（在此示例中使用 `docker.io/valkey/valkey:8.0.1-alpine`，基于最新的 Redis 7.x 版本）
* 在系统上安装 Docker Composer（版本 2.0 或更高）
* 用于 Open WebUI 与 Redis 通信的 Docker 网络
* 基本了解 Docker、Redis 和 Open WebUI

## 设置 Redis

要为 websocket 支持设置 Redis，您需要创建一个包含以下内容的 `docker-compose.yml` 文件：

```yml
version: '3.9'
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = 'PONG' ]"
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

:::info 注意

此配置未包括 `ports` 指令，因为在大多数情况下它不是必需的。Redis 服务仍然可以通过 Docker 网络由 Open WebUI 服务访问。但是，如果您需要从 Docker 网络外访问 Redis 实例（例如用于调试或监控），可以添加 `ports` 指令来公开 Redis 端口（例如 `6379:6379`）。

上述配置设置了一个名为 `redis-valkey` 的 Redis 容器，并挂载了一个数据持久化卷。通过 `healthcheck` 指令可以确保在容器无法响应 `ping` 命令时重新启动容器。`--save 30 1` 命令选项表示每 30 分钟保存一次 Redis 数据库到磁盘，如果至少有 1 个键发生了变化。

:::

要创建一个用于 Open WebUI 与 Redis 通信的 Docker 网络，请运行以下命令：

```bash
docker network create openwebui-network
```

## 配置 Open WebUI

要在 Open WebUI 中启用 websocket 支持，您需要为 Open WebUI 实例设置以下环境变量：

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

这些环境变量启用 websocket 支持，指定 Redis 为 websocket 管理器，并定义 Redis URL。请确保将 `WEBSOCKET_REDIS_URL` 的值替换为 Redis 实例的实际 IP 地址。

在使用 Docker 运行 Open WebUI 时，需要将其连接到相同的 Docker 网络：

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

将 `127.0.0.1` 替换为 Docker 网络中 Redis 容器的实际 IP 地址。

## 验证

如果您已正确设置 Redis 并配置 Open WebUI，在启动 Open WebUI 实例时，您应该会看到以下日志消息：

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

这表明 Open WebUI 正在使用 Redis 管理 websocket。您还可以使用 `docker exec` 命令验证 Redis 实例正在运行并接受连接：

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

此命令应输出 `PONG`，表示 Redis 实例运行正常。如果此命令失败，可以尝试以下命令：

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## 故障排除

如果您在使用 Redis 或 Open WebUI websocket 支持时遇到问题，可以参考以下资源进行故障排除：

* [Redis 文档](https://redis.io/docs)
* [Docker Compose 文档](https://docs.docker.com/compose/overview/)
* [sysctl 文档](https://man7.org/linux/man-pages/man8/sysctl.8.html)
