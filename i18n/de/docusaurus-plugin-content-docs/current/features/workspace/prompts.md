---
sidebar_position: 2
title: "📚 Eingabeaufforderungen"
---

Der Bereich `Eingabeaufforderungen` in der `Arbeitsumgebung` innerhalb Open WebUI ermöglicht Benutzern, benutzerdefinierte Eingaben zu erstellen, zu verwalten und zu teilen. Diese Funktion vereinfacht die Interaktionen mit KI-Modellen, indem häufig verwendete Eingaben gespeichert und einfach über Schrägstrichbefehle zugänglich gemacht werden.

### Verwaltung von Eingabeaufforderungen

Die Oberfläche für Eingabeaufforderungen bietet mehrere wichtige Funktionen zur Verwaltung Ihrer benutzerdefinierten Aufforderungen:

* **Erstellen**: Entwerfen Sie neue Eingabeaufforderungen mit anpassbaren Titeln, Zugriffsebenen und Inhalten.
* **Teilen**: Teilen Sie Eingabeaufforderungen mit anderen Benutzern basierend auf konfigurierten Zugriffsberechtigungen.
* **Zugriffskontrolle**: Legen Sie Sichtbarkeit und Nutzungsberechtigungen für jede Eingabeaufforderung fest (siehe [Berechtigungen](./permissions.md) für weitere Details).
* **Schrägstrichbefehle**: Greifen Sie schnell auf Eingabeaufforderungen zu, indem Sie benutzerdefinierte Schrägstrichbefehle während Chatsitzungen verwenden.

### Erstellen und Bearbeiten von Eingabeaufforderungen

Beim Erstellen oder Bearbeiten einer Eingabeaufforderung können Sie die folgenden Einstellungen konfigurieren:

* **Titel**: Geben Sie Ihrer Eingabeaufforderung einen beschreibenden Namen zur einfachen Identifikation.
* **Zugriff**: Legen Sie die Zugriffsebene fest, um zu kontrollieren, wer die Eingabeaufforderung sehen und verwenden kann.
* **Befehl**: Definieren Sie einen Schrägstrichbefehl, der die Eingabeaufforderung auslöst (z. B. `/zusammenfassen`).
* **Aufforderungsinhalt**: Schreiben Sie den eigentlichen Text der Aufforderung, der an das Modell gesendet wird.

### Variablen in Eingabeaufforderungen

Open WebUI unterstützt dynamische Variablen, die in Ihren Eingabeaufforderungen enthalten sein können:

* **Zwischenablage-Inhalt**: Verwenden Sie `{{CLIPBOARD}}`, um Inhalte aus Ihrer Zwischenablage einzufügen.
* **Datum und Uhrzeit**:
  * `{{CURRENT_DATE}}`: Aktuelles Datum
  * `{{CURRENT_DATETIME}}`: Aktuelles Datum und Uhrzeit
  * `{{CURRENT_TIME}}`: Aktuelle Uhrzeit
  * `{{CURRENT_TIMEZONE}}`: Aktuelle Zeitzone
  * `{{CURRENT_WEEKDAY}}`: Aktueller Wochentag
* **Benutzerinformationen**:
  * `{{USER_NAME}}`: Name des aktuellen Benutzers
  * `{{USER_LANGUAGE}}`: Vom Benutzer ausgewählte Sprache
  * `{{USER_LOCATION}}`: Standort des Benutzers (erfordert HTTPS und Einstellungen > Benutzeroberfläche umschalten)

### Richtlinien zur Verwendung von Variablen

* Variablen mit doppelten geschweiften Klammern einschließen: `{{variable}}`
* Die Variable `{{USER_LOCATION}}` erfordert:
  * Eine sichere HTTPS-Verbindung
  * Aktivierung der Funktion unter Einstellungen > Benutzeroberfläche
* Die Variable `{{CLIPBOARD}}` erfordert eine Zugriffsberechtigung auf die Zwischenablage Ihres Geräts

### Zugriffskontrolle und Berechtigungen

Die Verwaltung von Eingabeaufforderungen wird durch die folgenden Berechtigungseinstellungen gesteuert:

* **Zugriff auf Eingabeaufforderungen**: Benutzer benötigen die Berechtigung `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`, um Eingabeaufforderungen zu erstellen und zu verwalten.
* Weitere Informationen zur Konfiguration von Berechtigungen finden Sie in der [Berechtigungsdokumentation](./permissions.md).

### Beste Praktiken

* Verwenden Sie klare, beschreibende Titel für Ihre Eingabeaufforderungen
* Erstellen Sie intuitive Schrägstrichbefehle, die den Zweck der Aufforderung widerspiegeln
* Dokumentieren Sie spezifische Anforderungen oder erwartete Eingaben in der Beschreibung der Eingabeaufforderung
* Testen Sie Aufforderungen mit verschiedenen Variablenkombinationen, um sicherzustellen, dass sie wie beabsichtigt funktionieren
* Überlegen Sie sich die Zugriffsebenen sorgfältig, wenn Sie Aufforderungen mit anderen Benutzern teilen – öffentliches Teilen bedeutet, dass sie automatisch für alle Benutzer angezeigt werden, wenn sie `/` in einem Chat eingeben; vermeiden Sie daher, zu viele zu erstellen.
