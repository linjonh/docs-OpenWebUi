---
sidebar_position: 9
title: "SearchApi"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

## SearchApi API

[SearchApi](https://searchapi.io) ist eine Sammlung von Echtzeit-SERP-APIs. Jede bestehende oder zukünftige SERP-Engine, die `organic_results` zurückgibt, wird unterstützt. Die standardmäßige Web-Suchmaschine ist `google`, kann jedoch auf `bing`, `baidu`, `google_news`, `bing_news`, `google_scholar`, `google_patents` und andere geändert werden.

### Einrichtung

1. Gehen Sie zu [SearchApi](https://searchapi.io) und melden Sie sich an oder erstellen Sie ein neues Konto.
2. Gehen Sie zu `Dashboard` und kopieren Sie den API-Schlüssel.
3. Öffnen Sie mit dem `API-Schlüssel` das `Open WebUI Admin Panel`, klicken Sie auf den Tab `Einstellungen` und dann auf `Websuche`.
4. Aktivieren Sie `Websuche` und setzen Sie `Web-Suchmaschine` auf `searchapi`.
5. Füllen Sie `SearchApi API-Schlüssel` mit dem `API-Schlüssel` aus, den Sie im Schritt 2 vom [SearchApi](https://www.searchapi.io/) Dashboard kopiert haben.
6. [Optional] Geben Sie den Namen der `SearchApi-Engine` ein, die Sie abfragen möchten. Beispiel: `google`, `bing`, `baidu`, `google_news`, `bing_news`, `google_videos`, `google_scholar` und `google_patents`. Standardmäßig ist sie auf `google` gesetzt.
7. Klicken Sie auf `Speichern`.

![Open WebUI Admin Panel](/images/tutorial_searchapi_search.png)

#### Hinweis

Sie müssen `Websuche` im Eingabefeld aktivieren, indem Sie die Plus-Taste (`+`) verwenden, um das Web mit den Suchmaschinen von [SearchApi](https://www.searchapi.io/) zu durchsuchen.

![Websuche aktivieren](/images/enable_web_search.png)
