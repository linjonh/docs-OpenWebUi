---
sidebar_position: 16
title: "Yacy"
---

:::警告
此教程为社区贡献内容，并非由Open WebUI团队提供支持，仅作为自定义Open WebUI以适应具体使用情况的示例。想要贡献？查看贡献教程。
:::

## Yacy API

### 设置

1. 前往：`管理员面板` -> `设置` -> `网页搜索`
2. 切换`启用网页搜索`
3. 从下拉菜单中将`网页搜索引擎`设置为`yacy`
4. 将`Yacy实例URL`设置为以下示例之一：

    * `http://yacy:8090`（使用容器名称和公开的端口，适用于基于Docker的设置）
    * `http://host.docker.internal:8090`（使用`host.docker.internal`的DNS名称和主机端口，适用于基于Docker的设置）
    * `https://<yacy.local>:8443`（使用本地域名，适用于本地网络访问）
    * `https://yacy.example.com`（使用自定义域名的自托管Yacy实例，适用于公共或私人访问）
    * `https://yacy.example.com:8443`（通过默认的Yacy https端口使用https）

5. 如果您的Yacy实例需要身份验证，可选地输入您的Yacy用户名和密码。如果两者都留空，则跳过摘要认证
6. 点击保存

![Open WebUI管理员面板显示Yacy配置](/images/tutorial_yacy.png)
