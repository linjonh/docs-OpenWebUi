---
sidebar_position: 200
title: "🔒 使用 Nginx 配置 HTTPS"
---

:::warning
本教程由社区贡献，未获得 Open WebUI 团队支持。它仅作为一个如何根据您的特定用例定制 Open WebUI 的演示。想要贡献？查看贡献教程。
:::

# 使用 Nginx 配置 HTTPS

确保您的用户与 Open WebUI 之间的安全通信至关重要。HTTPS（超文本传输安全协议）对传输的数据进行加密，保护其免受窃听和篡改。通过将 Nginx 配置为反向代理，您可以无缝地为 Open WebUI 部署添加 HTTPS，从而增强安全性和可信度。

本指南提供了三种设置 HTTPS 的方法：

- **自签名证书**：适用于开发和内部使用，使用 Docker。
- **Let&apos;s Encrypt**：适用于需要受信任 SSL 证书的生产环境，使用 Docker。
- **Windows + 自签名**：简化用于 Windows 上的开发和内部使用，无需 Docker。

选择最适合您部署需求的方法。


import Tabs from &apos;@theme/Tabs&apos;;
import TabItem from &apos;@theme/TabItem&apos;;

import NginxProxyManager from &apos;./tab-nginx/NginxProxyManager.md&apos;;
import SelfSigned from &apos;./tab-nginx/SelfSigned.md&apos;;
import LetsEncrypt from &apos;./tab-nginx/LetsEncrypt.md&apos;;
import Windows from &apos;./tab-nginx/Windows.md&apos;;

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx 代理管理器">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Let&apos;s Encrypt">
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

设置 HTTPS 后，可通过以下地址安全访问 Open WebUI：

- [https://localhost](https://localhost)

如果使用域名，请确保您的 DNS 记录已正确配置。对于生产环境，建议使用 Let&apos;s Encrypt 以获取受信任的 SSL 证书。

---
