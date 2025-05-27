---
sidebar_position: 15
title: "SerpApi"
---

:::warnung
Dieses Tutorial ist ein Beitrag aus der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

## SerpApi API

[SerpApi](https://serpapi.com/) Extrahieren Sie Google und andere Suchmaschinen mit unserer schnellen, einfachen und vollständigen API. Jede vorhandene oder kommende SERP-Engine, die `organic_results` zurückgibt, wird unterstützt. Die Standard-Websuchmaschine ist `google`, sie kann jedoch in `bing`, `baidu`, `google_news`, `google_scholar`, `google_patents` und andere geändert werden.

### Einrichtung

1. Gehen Sie zu [SerpApi](https://serpapi.com/) und melden Sie sich an oder erstellen Sie ein neues Konto.
2. Gehen Sie zu `Dashboard` und kopieren Sie den API-Schlüssel.
3. Mit dem `API-Schlüssel` öffnen Sie das `Open WebUI Admin-Panel`, klicken Sie auf die Registerkarte `Einstellungen` und anschließend auf `Websuche`.
4. Aktivieren Sie `Websuche` und setzen Sie die `Web-Suchmaschine` auf `serpapi`.
5. Füllen Sie `SerpApi API-Schlüssel` mit dem `API-Schlüssel` aus, den Sie in Schritt 2 aus dem [SerpApi](https://serpapi.com/) Dashboard kopiert haben.
6. [Optional] Geben Sie den Namen der `SerpApi-Engine` ein, die Sie abfragen möchten. Beispiel, `google`, `bing`, `baidu`, `google_news`, `google_videos`, `google_scholar` und `google_patents.` Standardmäßig ist sie auf `google` eingestellt. Finden Sie weitere Optionen in der [SerpApi-Dokumentation](https://serpapi.com/dashboard).
7. Klicken Sie auf `Speichern`.

![Open WebUI Admin-Panel](/images/tutorial_serpapi_search.png)

#### Hinweis

Sie müssen die `Websuche` im Eingabefeld aktivieren, um das Web mit [SerpApi](https://serpapi.com/) Engines zu durchsuchen.

![Websuche aktivieren](/images/enable_web_search.png)
