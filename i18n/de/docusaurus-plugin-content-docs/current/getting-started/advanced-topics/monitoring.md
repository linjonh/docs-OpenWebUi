---
sidebar_position: 6
title: "📊 Überwachen Sie Ihr Open WebUI"
---

# Halten Sie Ihr Open WebUI gesund mit Überwachung 🩺

Das Überwachen Ihrer Open WebUI-Instanz ist entscheidend, um sicherzustellen, dass sie zuverlässig läuft, gute Leistung bietet und Sie Probleme schnell erkennen und beheben können. Dieser Leitfaden beschreibt drei Überwachungsstufen, von grundlegenden Verfügbarkeitsprüfungen bis hin zu umfassenden Modellantworttests.

**Warum Überwachen?**

* **Sicherstellen der Betriebszeit:** Erkennen Sie Ausfälle und Dienstunterbrechungen proaktiv.
* **Leistungsanalysen:** Verfolgen Sie Antwortzeiten und identifizieren Sie potenzielle Engpässe.
* **Früherkennung von Problemen:** Erkennen Sie Schwierigkeiten, bevor sie die Benutzer erheblich beeinträchtigen.
* **Seelenruhe:** Gewinnen Sie das Vertrauen, dass Ihre Open WebUI-Instanz reibungslos funktioniert.

## 🚦 Überwachungsstufen

Wir behandeln drei Überwachungsstufen, von grundlegenden bis hin zu umfassenderen:

1. **Grundlegende Gesundheitsprüfung:** Überprüft, ob der Open WebUI-Dienst läuft und antwortet.
2. **Modell-Verbindungsprüfung:** Bestätigt, dass Open WebUI Ihre konfigurierten Modelle verbinden und auflisten kann.
3. **Modellantworttests (Tiefgehende Gesundheitsprüfung):** Stellt sicher, dass Modelle tatsächlich Anfragen verarbeiten und Antworten generieren können.

## Stufe 1: Endpoint für grundlegende Gesundheitsprüfung ✅

Die einfachste Überwachungsstufe ist die Überprüfung des `/health` Endpunkts. Dieser Endpunkt ist öffentlich zugänglich (keine Authentifizierung erforderlich) und gibt einen `200 OK` Statuscode zurück, wenn der Open WebUI-Dienst ordnungsgemäß läuft.

**Wie testen:**

Sie können `curl` oder einen anderen HTTP-Client verwenden, um diesen Endpunkt zu überprüfen:

```bash
   # Grundlegende Gesundheitsprüfung - keine Authentifizierung erforderlich
   curl https://your-open-webui-instance/health
```

**Erwartete Ausgabe:** Eine erfolgreiche Gesundheitsprüfung liefert einen `200 OK` HTTP-Statuscode zurück. Der Inhalt des Antwortkörpers ist normalerweise für eine grundlegende Gesundheitsprüfung nicht wichtig.

### Verwenden von Uptime Kuma für grundlegende Gesundheitsprüfungen 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) ist ein fantastisches, quelloffenes und einfach zu verwendendes selbst gehostetes Tool zur Überwachung der Betriebszeit. Es wird dringend empfohlen zur Überwachung von Open WebUI.

**Schritte zur Einrichtung in Uptime Kuma:**

1. **Neuen Monitor hinzufügen:** Klicken Sie in Ihrem Uptime Kuma-Dashboard auf „Neuen Monitor hinzufügen“.
2. **Monitoreinstellungen konfigurieren:**
   * **Monitortyp:** Wählen Sie „HTTP(s)“.
   * **Name:** Geben Sie Ihrem Monitor einen aussagekräftigen Namen, z. B. „Open WebUI Gesundheitsprüfung“.
   * **URL:** Geben Sie die URL des Gesundheitsprüfungsendpunkts ein: `http://your-open-webui-instance:8080/health` (Ersetzen Sie `your-open-webui-instance:8080` durch Ihre tatsächliche Open WebUI-Adresse und Port).
   * **Überwachungsintervall:** Legen Sie die Häufigkeit der Prüfungen fest (z. B. `60 Sekunden` für jede Minute).
   * **Anzahl der Wiederholungen:** Legen Sie die Anzahl der Wiederholungen fest, bevor der Dienst als ausgefallen betrachtet wird (z. B. `3` Wiederholungen).

**Was diese Prüfung verifiziert:**

* **Verfügbarkeit des Webservers:** Stellt sicher, dass der Webserver (z. B. Nginx, Uvicorn) auf Anfragen reagiert.
* **Anwendung läuft:** Bestätigt, dass die Open WebUI-Anwendung selbst läuft und initialisiert ist.
* **Grundlegende Datenbankkonnektivität:** Enthält normalerweise einen grundlegenden Test, um sicherzustellen, dass die Anwendung eine Verbindung zur Datenbank herstellen kann.

## Stufe 2: Open WebUI Modell-Verbindung 🔗

Um über die grundlegende Verfügbarkeit hinauszugehen, können Sie den Endpunkt `/api/models` überwachen. Dieser Endpunkt **erfordert Authentifizierung** und überprüft, ob Open WebUI erfolgreich mit Ihren konfigurierten Modellanbietern (z. B. Ollama, OpenAI) kommunizieren und eine Liste verfügbarer Modelle abrufen kann.

**Warum Modellverbindung überwachen?**

* **Probleme mit Modellanbietern:** Erkennen Sie Probleme mit Ihren Modellanbieterdiensten (z. B. API-Ausfälle, Authentifizierungsprobleme).
* **Konfigurationsfehler:** Identifizieren Sie Fehler in den Einstellungen der Modellanbieter innerhalb von Open WebUI.
* **Sicherstellen der Modellverfügbarkeit:** Bestätigen Sie, dass die Modelle, von denen Sie erwarten, dass sie verfügbar sind, tatsächlich für Open WebUI zugänglich sind.

**API-Endpunkt Details:**

Siehe die [Open WebUI API-Dokumentation](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models) für vollständige Details zum Endpunkt `/api/models` und dessen Antwortstruktur.

**Wie testen mit `curl` (authentifiziert):**

Sie benötigen einen API-Schlüssel, um auf diesen Endpunkt zugreifen zu können. Siehe den Abschnitt „Einrichtung der Authentifizierung“ unten für Anweisungen zum Erstellen eines API-Schlüssels.

```bash
   # Authentifizierte Modell-Verbindungsprüfung
   curl -H "Authorization: Bearer YOUR_API_KEY" https://your-open-webui-instance/api/models
```

*(Ersetzen Sie `YOUR_API_KEY` durch Ihren tatsächlichen API-Schlüssel und `your-open-webui-instance` durch Ihre Open WebUI-Adresse.)*

**Erwartete Ausgabe:** Eine erfolgreiche Anfrage liefert einen `200 OK` Statuscode zurück und eine JSON-Antwort, die eine Liste von Modellen enthält.

### Einrichtung der Authentifizierung für API-Schlüssel 🔑

Bevor Sie den Endpunkt `/api/models` überwachen können, müssen Sie API-Schlüssel in Open WebUI aktivieren und einen erstellen:

1. **API-Schlüssel aktivieren (Administrator erforderlich):**
   * Melden Sie sich als Administrator bei Open WebUI an.
   * Gehen Sie zu **Admin Einstellungen** (normalerweise im oberen rechten Menü) > **Allgemein**.
   * Finden Sie die Einstellung "API-Schlüssel aktivieren" und **schalten Sie sie EIN**.
   * Klicken Sie auf **Änderungen speichern**.

2. **Einen API-Schlüssel generieren (Benutzereinstellungen):**
   * Gehen Sie zu Ihren **Benutzereinstellungen** (normalerweise durch Klicken auf Ihr Profil-Symbol oben rechts).
   * Navigieren Sie zum Abschnitt **Konto**.
   * Klicken Sie auf **Neuen API-Schlüssel generieren**.
   * Geben Sie dem API-Schlüssel einen beschreibenden Namen (z. B. "Monitoring API-Schlüssel").
   * **Kopieren Sie den generierten API-Schlüssel** und bewahren Sie ihn sicher auf. Sie benötigen ihn für Ihr Monitoring-Setup.

   *(Optional, aber empfohlen):* Erwägen Sie aus Sicherheitsgründen die Erstellung eines **nicht-administrativen Benutzerkontos**, das speziell für das Monitoring genutzt wird, und generieren Sie einen API-Schlüssel für diesen Benutzer. Dadurch wird der potenzielle Schaden im Falle eines kompromittierten Monitoring-API-Schlüssels begrenzt.

   *Wenn Sie keine Option zur API-Schlüssel-Generierung in Ihren Einstellungen sehen, kontaktieren Sie Ihren Open WebUI-Administrator, um sicherzustellen, dass API-Schlüssel aktiviert sind.*

### Nutzung von Uptime Kuma für Modell-Konnektivitäts-Monitoring 🐻

1. **Erstellen Sie einen neuen Monitor in Uptime Kuma:**
   * Monitor-Typ: "HTTP(s) - JSON-Abfrage".
   * Name: "Open WebUI Modell-Konnektivitäts-Check".
   * URL: `http://your-open-webui-instance:8080/api/models` (Ersetzen Sie mit Ihrer URL).
   * Methode: "GET".
   * Erwar-Statuscode: `200`.

2. **Konfigurieren Sie die JSON-Abfrage (Modellliste überprüfen):**
   * **JSON-Abfrage:**  `$count(data[*])>0`
     * **Erklärung:** Diese JSONata-Abfrage überprüft, ob das `data`-Array in der API-Antwort (das die Liste der Modelle enthält) eine Anzahl größer als 0 hat. Mit anderen Worten wird überprüft, ob mindestens ein Modell zurückgegeben wird.
   * **Erwartet Wert:** `true` (Die Abfrage sollte `true` zurückgeben, wenn Modelle gelistet sind).

3. **Authentifizierungs-Header hinzufügen:**
   * Im Abschnitt "Header" der Uptime Kuma Monitor-Konfiguration klicken Sie auf "Header hinzufügen".
   * **Header-Name:** `Authorization`
   * **Header-Wert:** `Bearer YOUR_API_KEY` (Ersetzen Sie `YOUR_API_KEY` durch den generierten API-Schlüssel).

4. **Überwachungsintervall einstellen:**  Empfohlenes Intervall: `300 Sekunden` (5 Minuten) oder länger, da sich Modelllisten normalerweise nicht sehr häufig ändern.

**Alternative JSON-Abfragen (Fortgeschritten):**

Sie können spezifischere JSONata-Abfragen verwenden, um bestimmte Modelle oder Anbieter zu prüfen. Hier sind einige Beispiele:

* **Überprüfung auf mindestens ein Ollama-Modell:**  `$count(data[owned_by=ollama])>0`
* **Überprüfen, ob ein bestimmtes Modell existiert (z. B. gpt-4o):** `$exists(data[id=gpt-4o])`
* **Überprüfen, ob mehrere spezifische Modelle existieren (z. B. gpt-4o und gpt-4o-mini):** `$count(data[id in [gpt-4o, gpt-4o-mini]]) = 2`

Sie können Ihre JSONata-Abfragen unter [jsonata.org](https://try.jsonata.org/) mithilfe einer Beispiel-API-Antwort testen und verfeinern, um sicherzustellen, dass sie wie erwartet funktionieren.

## Stufe 3: Modell-Antwort-Test (Tiefen-Gesundheitsüberprüfung) 🤖

Für das umfassendste Monitoring können Sie testen, ob Modelle tatsächlich in der Lage sind, Anforderungen zu verarbeiten und Antworten zu generieren. Dies umfasst das Senden einer einfachen Chat-Completion-Anfrage an den `/api/chat/completions` Endpunkt.

**Warum Modellantworten testen?**

* **End-to-End-Verifizierung:** Bestätigt, dass die gesamte Modellpipeline funktioniert, von der API-Anfrage bis zur Modellantwort.
* **Probleme beim Modell-Laden:** Erkennt Probleme, wenn bestimmte Modelle nicht geladen oder nicht reagiert werden.
* **Fehler in der Backend-Verarbeitung:** Erfasst Fehler in der Backend-Logik, die verhindern könnten, dass Modelle Abschlüsse generieren.

**Wie testet man mit `curl` (Authentifizierte POST-Anfrage):**

Dieser Test erfordert einen API-Schlüssel und sendet eine POST-Anfrage mit einem einfachen Nachricht an den Chat-Completion-Endpunkt.

```bash
# Modellantwort-Test - authentifizierte POST-Anfrage
curl -X POST https://your-open-webui-instance/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
    "messages": [{"role": "user", "content": "Antworte mit dem Wort HEALTHY"}],
    "model": "llama3.1",  # Ersetzen Sie durch ein Modell, von dem Sie erwarten, dass es verfügbar ist
    "temperature": 0      # Temperatur auf 0 setzen für konsistente Antworten
  }
```

*(Ersetzen Sie `YOUR_API_KEY`, `your-open-webui-instance` und `llama3.1` durch Ihre tatsächlichen Werte.)*

**Erwartetes Ergebnis:** Eine erfolgreiche Anfrage gibt den Statuscode `200 OK` zurück und eine JSON-Antwort, in der ein Chat-Abschluss enthalten ist. Sie können überprüfen, ob die Antwort das Wort "HEALTHY" enthält (oder eine ähnliche erwartete Antwort basierend auf Ihrer Eingabeaufforderung).

**Die Einrichtung einer Überwachung der Stufe 3 in Uptime Kuma würde die Konfiguration eines HTTP(s)-Monitors mit einer POST-Anfrage, einem JSON-Body, Authentifizierungs-Header und möglicherweise einer JSON-Abfrage zur Validierung des Antwortinhalts erfordern. Dies ist eine fortgeschrittene Einrichtung und kann entsprechend Ihren spezifischen Anforderungen angepasst werden.**

Durch die Implementierung dieser Überwachungsstufen können Sie proaktiv die Gesundheit, Zuverlässigkeit und Leistung Ihrer Open WebUI-Instanz sicherstellen und ein durchgehend positives Erlebnis für Benutzer bieten.
