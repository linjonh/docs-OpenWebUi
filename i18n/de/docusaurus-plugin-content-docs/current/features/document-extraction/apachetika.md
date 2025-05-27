---
sidebar_position: 4000
title: "🪶 Apache Tika Extraction"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für einen spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Sehen Sie sich das Tutorial zur Mitwirkung an.
:::

## 🪶 Apache Tika Extraction

Diese Dokumentation bietet eine Schritt-für-Schritt-Anleitung zur Integration von Apache Tika in Open WebUI. Apache Tika ist ein Toolkit für die Inhaltsanalyse, das verwendet werden kann, um Metadaten und Textinhalte aus mehr als tausend verschiedenen Dateitypen zu erkennen und zu extrahieren. Alle diese Dateitypen können über eine einzige Schnittstelle analysiert werden, was Tika für die Indexierung von Suchmaschinen, Inhaltsanalyse, Übersetzung und vieles mehr nützlich macht.

Voraussetzungen
----------------

* Open WebUI-Instanz
* Docker auf Ihrem System installiert
* Docker-Netzwerk für Open WebUI eingerichtet

Integrationsschritte
----------------

### Schritt 1: Erstellen Sie eine Docker-Compose-Datei oder führen Sie den Docker-Befehl für Apache Tika aus

Sie haben zwei Optionen, Apache Tika auszuführen:

**Option 1: Verwendung von Docker Compose**

Erstellen Sie eine neue Datei namens `docker-compose.yml` im selben Verzeichnis wie Ihre Open WebUI-Instanz. Fügen Sie die folgende Konfiguration zur Datei hinzu:

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

Führen Sie die Docker-Compose-Datei mit dem folgenden Befehl aus:

```bash
docker-compose up -d
```

**Option 2: Verwendung des Docker Run-Befehls**

Alternativ können Sie Apache Tika mit dem folgenden Docker-Befehl ausführen:

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

Beachten Sie, dass Sie, wenn Sie den Docker Run-Befehl verwenden, das `--network`-Flag angeben müssen, wenn Sie den Container im selben Netzwerk wie Ihre Open WebUI-Instanz ausführen möchten.

### Schritt 2: Konfigurieren Sie Open WebUI zur Verwendung von Apache Tika

Um Apache Tika als Kontextextraktions-Engine in Open WebUI zu verwenden, führen Sie die folgenden Schritte aus:

* Melden Sie sich bei Ihrer Open WebUI-Instanz an.
* Navigieren Sie zum Menü `Admin-Panel`.
* Klicken Sie auf `Einstellungen`.
* Klicken Sie auf den Tab `Dokumente`.
* Ändern Sie die Dropdown-Liste der Standardinhaltsextraktions-Engine auf `Tika`.
* Aktualisieren Sie die URL der Kontextextraktions-Engine auf `http://tika:9998`.
* Speichern Sie die Änderungen.

 Überprüfung von Apache Tika in Docker
=====================================

Um zu überprüfen, ob Apache Tika in einer Docker-Umgebung korrekt funktioniert, können Sie diese Schritte ausführen:

### 1. Starten Sie den Docker-Container von Apache Tika

Stellen Sie zuerst sicher, dass der Docker-Container von Apache Tika läuft. Sie können ihn mit dem folgenden Befehl starten:

```bash
docker run -p 9998:9998 apache/tika
```

Dieser Befehl startet den Apache Tika-Container und ordnet Port 9998 vom Container Port 9998 auf Ihrem lokalen Rechner zu.

### 2. Überprüfen Sie, ob der Server läuft

Sie können überprüfen, ob der Apache Tika-Server läuft, indem Sie eine GET-Anfrage senden:

```bash
curl -X GET http://localhost:9998/tika
```

Dieser Befehl sollte die folgende Antwort zurückgeben:

```
This is Tika Server. Please PUT
```

### 3. Überprüfen Sie die Integration

Alternativ können Sie auch versuchen, eine Datei zur Analyse zu senden, um die Integration zu testen. Sie können Apache Tika testen, indem Sie eine Datei zur Analyse mit dem `curl`-Befehl senden:

```bash
curl -T test.txt http://localhost:9998/tika
```

Ersetzen Sie `test.txt` durch den Pfad zu einer Textdatei auf Ihrem lokalen Rechner.

Apache Tika antwortet mit den erkannten Metadaten und dem Typ des Inhalts der Datei.

### Ein Skript zur Überprüfung von Apache Tika verwenden

Wenn Sie den Überprüfungsprozess automatisieren möchten, sendet dieses Skript eine Datei an Apache Tika und überprüft die Antwort auf die erwarteten Metadaten. Wenn die Metadaten vorhanden sind, gibt das Skript eine Erfolgsmeldung zusammen mit den Metadaten der Datei aus; andernfalls gibt es eine Fehlermeldung und die Antwort von Apache Tika aus.

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # Senden Sie die Datei an Apache Tika und überprüfen Sie die Ausgabe
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tika hat die Datei erfolgreich analysiert.")
            print("Antwort von Apache Tika:")
            print(response.text)
        else:
            print("Fehler bei der Analyse der Datei:")
            print(f"Statuscode: {response.status_code}")
            print(f"Antwort von Apache Tika: {response.text}")
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # Ersetzen Sie dies durch den Pfad zu Ihrer Datei
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

Anweisungen zum Ausführen des Skripts:

### Voraussetzungen

* Python 3.x muss auf Ihrem System installiert sein
* Die `requests`-Bibliothek muss installiert sein (Sie können sie mit pip installieren: `pip install requests`)
* Apache Tika Docker-Container muss laufen (verwenden Sie den Befehl `docker run -p 9998:9998 apache/tika`)
* Ersetzen Sie `"test.txt"` durch den Pfad zur Datei, die Sie an Apache Tika senden möchten

### Ausführung des Skripts

1. Speichern Sie das Skript unter dem Namen `verify_tika.py` (z. B. mit einem Texteditor wie Notepad oder Sublime Text)
2. Öffnen Sie ein Terminal oder eine Eingabeaufforderung
3. Navigieren Sie mit dem Befehl `cd` zu dem Verzeichnis, in dem Sie das Skript gespeichert haben
4. Führen Sie das Skript mit folgendem Befehl aus: `python verify_tika.py`
5. Das Skript wird eine Nachricht ausgeben, die angibt, ob Apache Tika ordnungsgemäß funktioniert

Hinweis: Wenn Sie auf Probleme stoßen, stellen Sie sicher, dass der Apache Tika-Container ordnungsgemäß läuft und dass die Datei an die richtige URL gesendet wird.

### Fazit

Wenn Sie diese Schritte befolgen, können Sie überprüfen, ob Apache Tika in einer Docker-Umgebung ordnungsgemäß funktioniert. Sie können die Einrichtung testen, indem Sie eine Datei zur Analyse senden, überprüfen, ob der Server mit einer GET-Anfrage läuft, oder ein Skript verwenden, um den Prozess zu automatisieren. Bei Problemen stellen Sie sicher, dass der Apache Tika-Container korrekt läuft und die Datei an die richtige URL gesendet wird.

Fehlerbehebung
--------------

* Stellen Sie sicher, dass der Apache Tika-Dienst läuft und von der Open WebUI-Instanz aus zugänglich ist.
* Überprüfen Sie die Docker-Logs auf Fehler oder Probleme im Zusammenhang mit dem Apache Tika-Dienst.
* Stellen Sie sicher, dass die URL der Kontextextraktions-Engine in Open WebUI korrekt konfiguriert ist.

Vorteile der Integration
----------------------

Die Integration von Apache Tika in Open WebUI bietet mehrere Vorteile, darunter:

* **Verbesserte Metadatenextraktion**: Die fortschrittlichen Metadatenextraktionsfunktionen von Apache Tika können Ihnen helfen, genaue und relevante Daten aus Ihren Dateien zu extrahieren.
* **Unterstützung für mehrere Dateiformate**: Apache Tika unterstützt eine Vielzahl von Dateiformaten und ist damit eine ideale Lösung für Organisationen, die mit unterschiedlichen Dateitypen arbeiten.
* **Erweiterte Inhaltsanalyse**: Die fortschrittlichen Inhaltsanalysemöglichkeiten von Apache Tika können Ihnen helfen, wertvolle Erkenntnisse aus Ihren Dateien zu gewinnen.

Fazit
----------

Die Integration von Apache Tika in Open WebUI ist ein unkomplizierter Prozess, der die Metadatenextraktionsfähigkeiten Ihrer Open WebUI-Instanz verbessern kann. Wenn Sie die Schritte in dieser Dokumentation befolgen, können Sie Apache Tika problemlos als Kontextextraktions-Engine für Open WebUI einrichten.
