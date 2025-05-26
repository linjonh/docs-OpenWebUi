---
sidebar_position: 16
title: "Yacy"
---

:::warning
本教程由社区贡献，不受 Open WebUI 团队支持，仅作为如何为您的特定使用案例定制 Open WebUI 的示例。想要贡献？请查看贡献教程。
:::

## Yacy API

### 设置

1. 导航至：`管理面板` -> `设置` -> `网页搜索`
2. 切换 `启用网页搜索`
3. 从下拉菜单中将 `网页搜索引擎` 设置为 `yacy`
4. 将 `Yacy 实例 URL` 设置为以下示例之一：

    * `http://yacy:8090`（使用容器名称和暴露端口，适用于基于 Docker 的设置）
    * `http://host.docker.internal:8090`（使用 `host.docker.internal` 的 DNS 名称和主机端口，适用于基于 Docker 的设置）
    * `https://<yacy.local>:8443`（使用本地域名，适用于本地网络访问）
    * `https://yacy.example.com`（使用自定义域名的自托管 Yacy 实例，适用于公共或私有访问）
    * `https://yacy.example.com:8443`（在默认 Yacy https 端口上使用 https）

5. 如果您的 Yacy 实例需要身份验证，可以选择输入您的 Yacy 用户名和密码。如果两者均留空，将跳过摘要身份验证。
6. 按保存

![Open WebUI 管理面板显示 Yacy 配置](/images/tutorial_yacy.png)
