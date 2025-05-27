---
sidebar_position: 16
title: "Yacy"
---

:::warning
Dieses Tutorial ist ein Community-Beitrag und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial für Beiträge an.
:::

## Yacy API

### Einrichtung

1. Navigieren Sie zu: `Admin Panel` -> `Einstellungen` -> `Websuche`
2. Aktivieren Sie `Websuche aktivieren`
3. Wählen Sie in der Dropdown-Liste `Web-Suchmaschine` die Option `yacy`
4. Setzen Sie `Yacy-Instanz-URL` auf eines der folgenden Beispiele:

    * `http://yacy:8090` (unter Verwendung des Container-Namens und des freigegebenen Ports, geeignet für Docker-basierte Setups)
    * `http://host.docker.internal:8090` (unter Verwendung des `host.docker.internal` DNS-Namens und des Host-Ports, geeignet für Docker-basierte Setups)
    * `https://<yacy.local>:8443` (unter Verwendung eines lokalen Domainnamens, geeignet für den lokalen Netzwerkzugriff)
    * `https://yacy.example.com` (unter Verwendung eines benutzerdefinierten Domainnamens für eine selbst gehostete Yacy-Instanz, geeignet für öffentlichen oder privaten Zugriff)
    * `https://yacy.example.com:8443` (unter Verwendung von HTTPS über den Standard-Yacy-HTTPS-Port)

5. Optional können Sie Ihren Yacy-Benutzernamen und Ihr Passwort eingeben, wenn für Ihre Yacy-Instanz eine Authentifizierung erforderlich ist. Wenn beide Felder leer gelassen werden, wird die Digest-Authentifizierung übersprungen
6. Drücken Sie speichern

![Open WebUI Admin-Panel zeigt Yacy-Konfiguration](/images/tutorial_yacy.png)
