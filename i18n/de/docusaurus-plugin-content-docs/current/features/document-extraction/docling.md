---
sidebar_position: 4000
title: "🐤 Docling Dokumentextraktion"
---

:::warnung
Dieses Tutorial ist ein Community-Beitrag und wird nicht vom Open-WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Sie Open WebUI für Ihren spezifischen Anwendungsfall anpassen können. Möchten Sie beitragen? Sehen Sie sich das Tutorial für Beiträge an.
:::

## 🐤 Docling Dokumentextraktion

Diese Dokumentation bietet eine Schritt-für-Schritt-Anleitung zur Integration von Docling in Open WebUI. Docling ist eine Dokumentenverarbeitungsbibliothek, die dazu dient, eine Vielzahl von Dateiformaten - einschließlich PDFs, Word-Dokumenten, Tabellenkalkulationen, HTML und Bilder - in strukturierte Daten wie JSON oder Markdown zu transformieren. Mit integrierter Unterstützung für Layout-Erkennung, Tabellenanalyse und sprachbewusste Verarbeitung vereinfacht Docling die Dokumentenvorbereitung für KI-Anwendungen wie Suche, Zusammenfassung und abfragegestützte Generation, alles über eine einheitliche und erweiterbare Schnittstelle.

Voraussetzungen
----------------

* Open WebUI Instanz
* Docker auf Ihrem System installiert
* Docker-Netzwerk für Open WebUI eingerichtet

Integrationsschritte
---------------------

### Schritt 1: Führen Sie den Docker-Befehl für Docling-Serve aus

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*Mit GPU-Unterstützung:
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### Schritt 2: Konfigurieren Sie Open WebUI zur Nutzung von Docling

* Melden Sie sich bei Ihrer Open WebUI Instanz an.
* Gehen Sie zum Menü „Admin Panel“-Einstellungen.
* Klicken Sie auf „Einstellungen“.
* Klicken Sie auf die Registerkarte „Dokumente“.
* Ändern Sie die Dropdown-Liste „Standard“ für die Inhaltsextraktions-Engine auf „Docling“.
* Aktualisieren Sie die URL der Kontextextraktions-Engine auf `http://host.docker.internal:5001`.
* Speichern Sie die Änderungen.

Überprüfung von Docling in Docker
=================================

Um zu überprüfen, ob Docling in einer Docker-Umgebung ordnungsgemäß funktioniert, können Sie die folgenden Schritte ausführen:

### 1. Starten Sie den Docling Docker-Container

Stellen Sie zunächst sicher, dass der Docling Docker-Container läuft. Sie können ihn mit folgendem Befehl starten:

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

Dieser Befehl startet den Docling-Container und weist Port 5001 des Containers Port 5001 auf Ihrem lokalen Rechner zu.

### 2. Überprüfen Sie, ob der Server läuft

* Gehen Sie zu `http://127.0.0.1:5001/ui/`
* Die URL sollte zu einer UI führen, um Docling zu verwenden

### 3. Überprüfen Sie die Integration

* Sie können versuchen, einige Dateien über die UI hochzuladen, und es sollte eine Ausgabe im MD-Format oder Ihrem gewünschten Format zurückgeben

### Fazit

Die Integration von Docling in Open WebUI ist eine einfache und effektive Möglichkeit, Dokumentenverarbeitungs- und Inhaltsextraktionskapazitäten zu verbessern. Indem Sie die Schritte in dieser Anleitung befolgen, können Sie Docling als Standard-Extraktions-Engine einrichten und überprüfen, dass es reibungslos in einer Docker-Umgebung funktioniert. Nach der Konfiguration ermöglicht Docling leistungsstarke, formatunabhängige Dokumentenanalyse, um fortgeschrittenere KI-Funktionen in Open WebUI zu unterstützen.
