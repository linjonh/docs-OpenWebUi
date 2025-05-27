---
sidebar_position: 200
title: "🔒 HTTPS mit Nginx"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open-WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Sie Open WebUI für Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

# HTTPS mit Nginx

Die Sicherstellung einer sicheren Kommunikation zwischen Ihren Benutzern und der Open WebUI ist von größter Bedeutung. HTTPS (HyperText Transfer Protocol Secure) verschlüsselt die übermittelten Daten und schützt diese vor Abhören und Manipulation. Durch die Konfiguration von Nginx als Reverse-Proxy können Sie HTTPS nahtlos zu Ihrer Open-WebUI-Implementierung hinzufügen und sowohl die Sicherheit als auch die Vertrauenswürdigkeit erhöhen.

Dieser Leitfaden bietet drei Methoden, um HTTPS einzurichten:

- **Selbstsignierte Zertifikate**: Ideal für Entwicklung und interne Nutzung unter Verwendung von Docker.
- **Lets Encrypt**: Perfekt für Produktionsumgebungen, die vertrauenswürdige SSL-Zertifikate erfordern, unter Verwendung von Docker.
- **Windows+Selbstsigniert**: Vereinfachte Anweisungen für Entwicklung und interne Nutzung unter Windows, kein Docker erforderlich.

Wählen Sie die Methode, die Ihren Bereitstellungsanforderungen am besten entspricht.


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
  <TabItem value="selfsigned" label="Selbstsigniert">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## Nächste Schritte

Nachdem Sie HTTPS eingerichtet haben, greifen Sie sicher auf Open WebUI zu unter:

- [https://localhost](https://localhost)

Stellen Sie sicher, dass Ihre DNS-Einträge korrekt konfiguriert sind, wenn Sie einen Domainnamen verwenden. Für Produktionsumgebungen wird empfohlen, Lets Encrypt für vertrauenswürdige SSL-Zertifikate zu verwenden.

---
