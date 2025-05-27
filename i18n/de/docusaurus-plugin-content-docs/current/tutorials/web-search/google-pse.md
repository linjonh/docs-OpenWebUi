---
sidebar_position: 5
title: "Google PSE"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

## Google PSE API

### Einrichtung

1. Gehen Sie zu Google Developers, nutzen Sie [Programmable Search Engine](https://developers.google.com/custom-search) und melden Sie sich an oder erstellen Sie ein Konto.
2. Gehen Sie zum [Control Panel](https://programmablesearchengine.google.com/controlpanel/all) und klicken Sie auf die Schaltfläche `Hinzufügen`.
3. Geben Sie einen Namen für die Suchmaschine ein, passen Sie die anderen Eigenschaften nach Ihren Bedürfnissen an, bestätigen Sie, dass Sie kein Roboter sind, und klicken Sie auf die Schaltfläche `Erstellen`.
4. Generieren Sie einen `API-Schlüssel` und erhalten Sie die `Suchmaschinen-ID`. (Verfügbar, nachdem die Engine erstellt wurde)
5. Öffnen Sie mit dem `API-Schlüssel` und der `Suchmaschinen-ID` das `Open WebUI Admin Panel`, klicken Sie auf den Reiter `Einstellungen` und dann auf `Websuche`.
6. Aktivieren Sie `Websuche` und setzen Sie `Web Suchmaschine` auf `google_pse`.
7. Füllen Sie im Feld `Google PSE API-Schlüssel` den `API-Schlüssel` ein sowie die `Google PSE Engine Id` (# 4).
8. Klicken Sie auf `Speichern`.

![Open WebUI Admin Panel](/images/tutorial_google_pse1.png)

#### Hinweis

Sie müssen `Websuche` im Eingabefeld aktivieren, indem Sie die Plus-Schaltfläche (`+`) verwenden.
Das Web durchsuchen ;-)

![Websuche aktivieren](/images/tutorial_google_pse2.png)
