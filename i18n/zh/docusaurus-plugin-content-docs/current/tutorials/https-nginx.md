---
sidebar_position: 200
title: "🔒 使用 Nginx 配置 HTTPS"
---

:::warning
本教程由社区贡献，Open WebUI 团队不提供支持。它仅作为如何根据您的具体需求自定义 Open WebUI 的一个示例。想要贡献？请查看贡献教程。
:::

# 使用 Nginx 配置 HTTPS

确保您的用户与 Open WebUI 之间的通信安全至关重要。HTTPS（超文本传输协议安全版）对传输的数据进行加密，保护其免受窃听和篡改。通过将 Nginx 配置为反向代理，您可以无缝地为 Open WebUI 部署添加 HTTPS，从而增强安全性和可信度。

本指南提供了三种设置 HTTPS 的方法：

- **自签名证书**：适用于开发和内部使用，使用 Docker。
- **Lets Encrypt**：适用于需要可信 SSL 证书的生产环境，使用 Docker。
- **Windows+自签名**：适用于 Windows 上开发和内部使用的简化说明，不需要 Docker。

选择最适合您部署需求的方法。


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx Proxy Manager">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="自签名">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## 下一步

设置 HTTPS 后，您可以通过以下路径安全地访问 Open WebUI：

- [https://localhost](https://localhost)

如果您使用域名，请确保 DNS 记录正确配置。对于生产环境，建议使用 Lets Encrypt 获取可信 SSL 证书。

---
