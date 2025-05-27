---
sidebar_position: 200
title: "🔒 Nginxを使用したHTTPS"
---

:::warning
このチュートリアルはコミュニティの貢献によるものであり、Open WebUIチームによるサポートは提供されません。これは、ご自身の特定の利用例に合わせてOpen WebUIをカスタマイズする方法のデモとしてのみ提供されています。貢献したいですか？貢献方法についてのチュートリアルをご覧ください。
:::

# Nginxを使用したHTTPS

ユーザーとOpen WebUI間の安全な通信を確保することは非常に重要です。HTTPS (HyperText Transfer Protocol Secure)は、送信されるデータを暗号化し、それを盗聴や改ざんから保護します。リバースプロキシとしてNginxを構成することで、Open WebUIデプロイメントにシームレスにHTTPSを追加し、セキュリティと信頼性を向上させることができます。

このガイドでは、HTTPSを設定するための3つの方法を紹介します:

- **自己署名証明書**: 開発および内部使用に最適、Dockerを使用。
- **Lets Encrypt**: 信頼性の高いSSL証明書が必要な本番環境に最適、Dockerを使用。
- **Windows+自己署名**: Windows上で開発および内部使用向けの簡略化した手順、Docker不要。

ご自身のデプロイメントニーズに最適な方法を選んでください。


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
  <TabItem value="selfsigned" label="自己署名">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## 次のステップ

HTTPSの設定後、以下のURLから安全にOpen WebUIにアクセスしてください:

- [https://localhost](https://localhost)

ドメイン名を使用している場合はDNSレコードが正しく構成されていることを確認してください。本番環境では、信頼性の高いSSL証明書を取得するためにLets Encryptを使用することを推奨します。

---
