---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie einen Beitrag leisten? Schauen Sie sich das Beitrags-Tutorial an.
:::

## 👁️ Mistral OCR

Diese Dokumentation bietet eine Schritt-für-Schritt-Anleitung zur Integration von Mistral OCR mit Open WebUI. Mistral OCR ist eine optische Zeichenerkennungsbibliothek, die entwickelt wurde, um Text aus einer Vielzahl von bildbasierten Dateiformaten – einschließlich gescannter PDFs, Bilder und handgeschriebener Dokumente – in strukturierte Daten wie JSON oder einfachen Text zu extrahieren. Mit erweiterten Funktionen für die mehrsprachige Texterkennung, Layoutanalyse und Handschriftinterpretation vereinfacht Mistral OCR den Prozess der Digitalisierung und Verarbeitung von Dokumenten für KI-Anwendungen wie Suche, Zusammenfassung und Datenextraktion durch eine robuste und anpassbare Schnittstelle.

Voraussetzungen
------------

* Open WebUI-Instanz
* Mistral AI-Konto

Integrationsschritte
----------------

### Schritt 1: Registrieren oder Anmelden bei der Mistral AI-Konsole

* Gehen Sie zu `https://console.mistral.ai`
* Befolgen Sie die Anweisungen des Prozesses
* Nach erfolgreicher Autorisierung sollten Sie auf der Startseite der Konsole willkommen geheißen werden

### Schritt 2: Einen API-Schlüssel generieren

* Gehen Sie zu `API-Schlüssel` oder `https://console.mistral.ai/api-keys`
* Erstellen Sie einen neuen Schlüssel und sorgen Sie dafür, dass Sie ihn kopieren

### Schritt 3: Konfigurieren Sie Open WebUI zur Verwendung von Mistral OCR

* Melden Sie sich bei Ihrer Open WebUI-Instanz an.
* Navigieren Sie zum Menü `Administrationsbereich` Einstellungen.
* Klicken Sie auf `Einstellungen`.
* Klicken Sie auf den Tab `Dokumente`.
* Ändern Sie das Dropdown-Menü für die `Standard`-Inhaltsextraktionsmaschine zu `Mistral OCR`.
* Fügen Sie den API-Schlüssel in das Feld ein
* Speichern Sie den Administrationsbereich.

Mistral OCR verifizieren
=====================================

Um zu überprüfen, ob Mistral OCR im Skript korrekt funktioniert, lesen Sie bitte `https://docs.mistral.ai/capabilities/document/`


### Fazit

Die Integration von Mistral OCR mit Open WebUI ist eine einfache und effektive Möglichkeit, die Dokumentenverarbeitungs- und Inhaltsausführungsfunktionen zu verbessern. Durch Befolgen der Schritte in dieser Anleitung können Sie Mistral OCR als Standard-Extraktionsmaschine einrichten und dessen erweiterte Funktionen zur Texterkennung nutzen. Nach der Konfiguration ermöglicht Mistral OCR leistungsstarkes, mehrsprachiges Dokumenten-Parsen mit Unterstützung für verschiedene Formate, wodurch KI-gesteuerte Dokumentenanalysemöglichkeiten in Open WebUI verbessert werden.
