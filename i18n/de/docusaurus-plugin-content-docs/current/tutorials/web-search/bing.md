---
sidebar_position: 1
title: "Bing"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie mitwirken? Schauen Sie sich das Beitragstutorial an.
:::

## Bing-API

### Einrichtung

1. Navigieren Sie zum [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch) und erstellen Sie eine neue Ressource. Nach der Erstellung werden Sie zur Ressourcenübersichtsseite weitergeleitet. Wählen Sie dort "Hier klicken, um Schlüssel zu verwalten." ![Hier klicken, um Schlüssel zu verwalten](https://github.com/user-attachments/assets/dd2a3c67-d6a7-4198-ba54-67a3c8acff6d)
2. Finden Sie auf der Schlüsselverwaltungsseite Schlüssel1 oder Schlüssel2 und kopieren Sie den gewünschten Schlüssel.
3. Öffnen Sie das Open WebUI Admin Panel, wechseln Sie zur Registerkarte Einstellungen und wählen Sie dann Websuche aus.
4. Aktivieren Sie die Option Websuche und setzen Sie die Suchmaschine auf bing.
5. Füllen Sie `SearchApi API Key` mit dem `API-Schlüssel`, den Sie im Schritt 2 aus dem [AzurePortal](https://portal.azure.com/#create/Microsoft.BingSearch)-Dashboard kopiert haben.
6. Klicken Sie auf `Speichern`.
