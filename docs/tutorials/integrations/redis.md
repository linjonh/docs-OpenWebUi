---
sidebar_position: 30
title: "🔗 Redis Websocket 支持"
---

:::warning
本教程是由社区贡献，不受 Open WebUI 团队支持。它仅作为定制 Open WebUI 以满足特定用例的演示。如果您愿意贡献，请查看贡献教程。
:::

# 🔗 Redis Websocket 支持

## 概览

本页面文档介绍了如何将 Redis 集成到 Open WebUI 以支持 websocket 的步骤。通过遵循这些步骤，您将能够在 Open WebUI 实例中启用 websocket 功能，从而允许客户端与您的应用程序之间进行实时通信和更新。

### 前置条件

* 有效的 Open WebUI 实例（运行 1.0 或更高版本）
* 一个 Redis 容器（我们将在此示例中使用 `docker.io/valkey/valkey:8.0.1-alpine`，它基于最新的 Redis 7.x 版本）
* 在系统上安装了 Docker Composer（2.0 或更高版本）
* 一个用于 Open WebUI 和 Redis 通信的 Docker 网络
* 对 Docker、Redis 和 Open WebUI 的基本了解

## 设置 Redis

要设置支持 websocket 的 Redis，您需要创建一个 `docker-compose.yml` 文件，内容如下：

```yml
version: &apos;3.9&apos;
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = &apos;PONG&apos; ]"
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

:::info 提示

该配置中未包含 `ports` 指令，因为在大多数情况下，它不是必要的。Redis 服务仍可以通过 Docker 网络从 Open WebUI 服务内部访问。然而，如果您需要从 Docker 网络外部访问 Redis 实例（例如调试或监控目的），可以添加 `ports` 指令以暴露 Redis 端口（例如 `6379:6379`）。

上述配置设置了一个名为 `redis-valkey` 的 Redis 容器，并为数据持久化挂载了一个卷。`healthcheck` 指令确保容器在未能响应 `ping` 命令时重新启动。`--save 30 1` 命令选项会在 Redis 数据库中至少有 1 个键更改时，每 30 分钟保存一次到磁盘。

:::

要为 Open WebUI 和 Redis 之间的通信创建 Docker 网络，请运行以下命令：

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

这些环境变量启用了 websocket 支持，指定 Redis 作为 websocket 管理器，并定义了 Redis URL。请确保将 `WEBSOCKET_REDIS_URL` 值替换为 Redis 实例的实际 IP 地址。

使用 Docker 运行 Open WebUI 时，需要将其连接到相同的 Docker 网络：

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

请将 `127.0.0.1` 替换为 Docker 网络中 Redis 容器的实际 IP 地址。

## 验证

如果您已正确设置 Redis 并配置 Open WebUI，当启动 Open WebUI 实例时，您应该会看到如下日志消息：

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

这表明 Open WebUI 正在使用 Redis 管理 websocket。您还可以使用 `docker exec` 命令验证 Redis 实例是否正在运行并接受连接：

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

此命令应输出 `PONG`，表明 Redis 实例运行正常。如果该命令失败，您可以尝试以下命令：

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## 排错

如果在使用 Redis 或 Open WebUI 的 websocket 支持时遇到问题，您可以参考以下资源以排查问题：

* [Redis 文档](https://redis.io/docs)
* [Docker Compose 文档](https://docs.docker.com/compose/overview/)
* [sysctl 文档](https://man7.org/linux/man-pages/man8/sysctl.8.html)
