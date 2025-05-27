---
sidebar_position: 200
title: "🔒 使用 Nginx 配置 HTTPS"
---

:::warning
本教程係社群貢獻，並非由 Open WebUI 團隊提供支持。此教程僅作為如何根據具體使用場景自定義 Open WebUI 嘅操作示範。如果想參與貢獻，請查看相關貢獻教程。
:::

# 使用 Nginx 配置 HTTPS

確保用戶同 Open WebUI 之間通訊嘅安全至關重要。HTTPS（超文本傳輸安全協議）會加密傳輸數據，從而保護數據免受窺探和篡改。通過配置 Nginx 作為反向代理，可以輕鬆為 Open WebUI 部署添加 HTTPS，從而提高安全性同可信度。

本指南提供三種設置 HTTPS 嘅方法：

- **自簽名憑證**：適合開發及內部使用，使用 Docker。
- **Lets Encrypt**：適合需要可信 SSL 憑證嘅生產環境，使用 Docker。
- **Windows+自簽名**：針對 Windows 上開發及內部使用嘅簡化指引，唔需要 Docker。

根據需要選擇最適合你嘅部署方法。


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
  <TabItem value="selfsigned" label="自簽名憑證">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## 下一步

設置好 HTTPS 之後，可以通過以下連結安全訪問 Open WebUI：

- [https://localhost](https://localhost)

如果使用域名，請確保已正確配置 DNS 記錄。對於生產環境，建議使用 Lets Encrypt 獲取可信 SSL 憑證。

---
