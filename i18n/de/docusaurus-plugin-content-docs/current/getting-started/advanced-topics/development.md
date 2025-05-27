---
sidebar_position: 5
title: "🛠️ Lokale Entwicklungsanleitung"
---

# Bereit, zum Open WebUI beizutragen? Legen wir los! 🚀

Bereit, in die Entwicklung von Open WebUI einzutauchen? Dieser umfassende Leitfaden führt Sie schnell und einfach durch die Einrichtung Ihrer **lokalen Entwicklungsumgebung**. Egal, ob Sie ein erfahrener Entwickler sind oder gerade erst anfangen, wir helfen Ihnen, das Frontend anzupassen, das Backend zu verbessern und zur Zukunft von Open WebUI beizutragen! Lassen Sie uns Ihre Entwicklungsumgebung in einfachen, detaillierten Schritten einrichten!

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Ihr System diese Mindestanforderungen erfüllt:

- **Betriebssystem:** Linux (oder WSL unter Windows), Windows 11 oder macOS. *(Empfohlen für beste Kompatibilität)*
- **Python:** Version **3.11 oder höher**. *(Erforderlich für Backend-Dienste)*
- **Node.js:** Version **22.10 oder höher**. *(Erforderlich für Frontend-Entwicklung)*
- **IDE (empfohlen):** Wir empfehlen die Verwendung einer IDE wie [VSCode](https://code.visualstudio.com/) zum Bearbeiten von Code, Debuggen und Zugriff auf ein integriertes Terminal. Natürlich können Sie auch Ihre bevorzugte IDE verwenden, wenn Sie eine haben!
- **[Optional] GitHub Desktop:** Für eine einfachere Verwaltung des Git-Repositories, insbesondere wenn Sie mit Git-Befehlen in der Konsole weniger vertraut sind, sollten Sie [GitHub Desktop](https://desktop.github.com/) installieren.

## Einrichtung Ihrer lokalen Umgebung

Wir richten sowohl das Frontend (Benutzeroberfläche) als auch das Backend (API und Serverlogik) von Open WebUI ein.

### 1. Repository klonen

Verwenden Sie zunächst `git clone`, um das Open WebUI-Repository auf Ihren lokalen Rechner herunterzuladen. Dadurch wird eine lokale Kopie des Projekts auf Ihrem Computer erstellt.

1. **Öffnen Sie Ihr Terminal** (oder Git Bash, wenn Sie auf Windows arbeiten und Git Bash verwenden).
2. **Navigieren Sie zu dem Verzeichnis**, in dem Sie das Open WebUI-Projekt speichern möchten.
3. **Klonen Sie das Repository:** Führen Sie den folgenden Befehl aus:

```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

   Der Befehl `git clone` lädt die Projektdateien von GitHub herunter. Der Befehl `cd open-webui` navigiert dann in das neu erstellte Projektverzeichnis.

### 2. Frontend-Einrichtung (Benutzeroberfläche)

Fangen wir mit der Einrichtung der Benutzeroberfläche an (das, was Sie in Ihrem Browser sehen):

1. **Umgebungsvariablen konfigurieren:**
   - Kopieren Sie die Beispieldatei für Umgebungsvariablen in `.env`:

     ```bash
     cp -RPp .env.example .env
     ```

     Dieser Befehl kopiert die Datei `.env.example` in eine neue Datei mit dem Namen `.env`. Die Datei `.env` ist der Ort, an dem Sie die Umgebungsvariablen für das Frontend konfigurieren.

   - **Anpassen von `.env`**: Öffnen Sie die Datei `.env` in Ihrem Code-Editor (z.B. VSCode). Diese Datei enthält Konfigurationsvariablen für das Frontend, wie z. B. API-Endpunkte und andere Einstellungen. Für die lokale Entwicklung sind die Standardeinstellungen in `.env.example` normalerweise ausreichend. Sie können sie jedoch nach Bedarf anpassen.

  **Wichtig:** Vermeiden Sie, sensible Informationen in `.env` zu committen, wenn Sie Ihren Code wieder ins Repository einpflegen.

1. **Frontend-Abhängigkeiten installieren:**
   - **Navigieren Sie in das Frontend-Verzeichnis:** Falls Sie sich nicht bereits im Projekt-Root-Verzeichnis (`open-webui`) befinden, stellen Sie sicher, dass Sie dorthin navigieren.

     ```bash
     # Falls Sie sich nicht im Projekt-Root befinden:
     cd open-webui
     ```

   - Installieren Sie die benötigten JavaScript-Pakete:

     ```bash
     npm install
     ```

     Dieser Befehl verwendet `npm` (Node Package Manager), um die Datei `package.json` im Projektstammverzeichnis zu lesen und alle benötigten JavaScript-Bibliotheken und -Werkzeuge herunterzuladen, die für das Frontend erforderlich sind. Dies kann einige Minuten dauern, abhängig von Ihrer Internetverbindung.

2. **Frontend-Entwicklungsserver starten:**

     ```bash
     npm run dev
     ```

     Dieser Befehl startet den Frontend-Entwicklungsserver. Wenn die Schritte erfolgreich waren, wird normalerweise angezeigt, dass der Server läuft, und es wird eine lokale URL bereitgestellt.

     🎉 **Auf das Frontend zugreifen:** Öffnen Sie Ihren Webbrowser und gehen Sie zu [http://localhost:5173](http://localhost:5173). Sie sollten eine Nachricht sehen, die angibt, dass das Frontend von Open WebUI läuft und auf das Backend wartet. Keine Sorge wegen dieser Nachricht! Lassen Sie uns als nächstes das Backend einrichten. **Lassen Sie dieses Terminal im Hintergrund laufen** – es dient Ihrem Frontend!

### 3. Backend-Einrichtung (API und Server)

Für eine reibungslosere Entwicklungserfahrung **empfehlen wir dringend**, separate Terminalinstanzen für Ihre Frontend- und Backend-Prozesse zu verwenden. Dies hält Ihre Arbeitsabläufe organisiert und erleichtert die Verwaltung jeder Anwendungskomponente unabhängig voneinander.

**Warum separate Terminals?**

- **Prozesstrennung:** Die Entwicklungsserver für Frontend und Backend sind separate Programme. Wenn sie in separaten Terminals ausgeführt werden, greifen sie nicht gegenseitig ein und ermöglichen unabhängige Neustarts oder Stops.
- **Klarere Protokolle und Ausgaben:** Jeder Terminal zeigt die Protokolle und Ausgaben spezifisch für entweder das Frontend oder Backend an. Dies erleichtert das Debugging und Monitoring erheblich, da Sie nicht durch vermischte Protokolle navigieren müssen.
- **Reduzierte Terminal-Unordnung:** Das Mischen von Frontend- und Backend-Befehlen in einem einzigen Terminal kann verwirrend sein. Separate Terminals halten Ihre Befehls-Historie und aktive Prozesse organisiert.
- **Verbesserte Arbeitsablauf-Effizienz:** Sie können an Frontend-Aufgaben arbeiten (wie `npm run dev` ausführen) in einem Terminal und gleichzeitig Backend-Aufgaben verwalten (wie den Server starten oder Protokolle überprüfen) in einem anderen, ohne ständig den Kontext innerhalb eines einzigen Terminals wechseln zu müssen.

**Verwendung der integrierten Terminals von VSCode (empfohlen):**

Die terminalintegrierte Funktion von VSCode erleichtert die Verwaltung mehrerer Terminals erheblich. Hier erfahren Sie, wie Sie sie für die Trennung von Frontend und Backend nutzen können:

1. **Frontend-Terminal (Haben Sie wahrscheinlich bereits):** Wenn Sie die Schritte zur Frontend-Einrichtung befolgt haben, haben Sie wahrscheinlich bereits ein Terminal im Projekt-Stammverzeichnis (`open-webui` Verzeichnis) in VSCode geöffnet. Hier führen Sie Ihre Frontend-Befehle aus (`npm run dev` usw.). Stellen Sie sicher, dass Sie sich für die nächsten Schritte im `open-webui` Verzeichnis befinden, falls Sie dies noch nicht sind.

2. **Backend-Terminal (Öffnen Sie ein neues):**
   - Gehen Sie in VSCode zu **Terminal > Neues Terminal** (oder verwenden Sie die Abkürzung `Ctrl+Shift+` unter Windows/Linux oder `Cmd+Shift+` unter macOS). Dies öffnet ein neues integriertes Terminalfenster.
   - **Navigieren Sie zum `backend` Verzeichnis:** Verwenden Sie in diesem *neuen* Terminal den Befehl `cd backend`, um das Verzeichnis zu dem `backend` Ordner innerhalb Ihres Projekts zu wechseln. Dies stellt sicher, dass alle Backend-relevanten Befehle im richtigen Kontext ausgeführt werden.

   Nun haben Sie **zwei separate Terminal-Instanzen innerhalb von VSCode**: eine für das Frontend (wahrscheinlich im `open-webui` Verzeichnis) und eine speziell für das Backend (im `backend` Verzeichnis). Sie können zwischen diesen Terminals in VSCode leicht wechseln, um Ihre Frontend- und Backend-Prozesse unabhängig zu verwalten. Diese Einrichtung wird für eine klarere und effizientere Entwicklungsumgebung stark empfohlen.

**Schritte zur Backend-Einrichtung (in Ihrem *backend* Terminal):**

1. **Navigieren Sie zum Backend-Verzeichnis:** (Sie sollten bereits im `backend` Verzeichnis in Ihrem *neuen* Terminal aus dem vorherigen Schritt sein). Falls nicht, führen Sie aus:

   ```bash
   cd backend
   ```

2. **Erstellen und Aktivieren einer Conda-Umgebung (empfohlen):**
   - Wir empfehlen dringend, Conda zur Verwaltung von Python-Abhängigkeiten und zur Isolation Ihrer Projektumgebung zu verwenden. Dies verhindert Konflikte mit anderen Python-Projekten auf Ihrem System und stellt sicher, dass Sie die richtige Python-Version und Bibliotheken haben.

     ```bash
     conda create --name open-webui python=3.11
     conda activate open-webui
     ```

     - `conda create --name open-webui python=3.11`: Dieser Befehl erstellt eine neue Conda-Umgebung namens `open-webui` mit Python Version 3.11. Falls Sie eine andere Python 3.11.x Version ausgewählt haben, ist das in Ordnung.
     - `conda activate open-webui`: Dieser Befehl aktiviert die neu erstellte Conda-Umgebung. Sobald aktiviert, ändert sich Ihr Terminal-Prompt normalerweise, um anzuzeigen, dass Sie sich in der `open-webui` Umgebung befinden (z.B. könnte es `(open-webui)` am Anfang der Zeile anzeigen).
  
    **Stellen Sie sicher, dass Sie die Umgebung in Ihrem Backend-Terminal aktivieren, bevor Sie fortfahren.**

     *(Die Verwendung von Conda ist optional, wird aber dringend empfohlen, um Python-Abhängigkeiten zu verwalten und Konflikte zu vermeiden.)* Wenn Sie sich entscheiden, Conda nicht zu verwenden, stellen Sie sicher, dass Sie Python 3.11 oder höher verwenden und fahren Sie mit dem nächsten Schritt fort, beachten Sie jedoch mögliche Abhängigkeitskonflikte.

1. **Installieren Sie Backend-Abhängigkeiten:**
     - In Ihrem *backend* Terminal (und mit der aktiven Conda-Umgebung, falls Sie Conda verwenden), führen Sie aus:

     ```bash
     pip install -r requirements.txt -U
     ```

     Mit diesem Befehl verwendet `pip` (Python-Paket-Installer), um die `requirements.txt`-Datei im `backend` Verzeichnis zu lesen. `requirements.txt` listet alle Python-Bibliotheken auf, die das Backend zum Laufen benötigt. `pip install` lädt diese Bibliotheken herunter und installiert sie in Ihrer aktiven Python-Umgebung (Ihrer Conda-Umgebung, falls Sie sie verwenden, oder Ihrer systemweiten Python-Umgebung ansonsten). Der `-U` Parameter stellt sicher, dass Sie die neuesten kompatiblen Versionen der Bibliotheken erhalten.

2. **Starten Sie den Backend-Entwicklungsserver:**
     - Führen Sie in Ihrem *backend* Terminal Folgendes aus:

     ```bash
     sh dev.sh
     ```

     Dieser Befehl führt das `dev.sh`-Skript aus. Dieses Skript enthält wahrscheinlich den Befehl, um den Backend-Entwicklungsserver zu starten. *(Sie können die `dev.sh`-Datei in Ihrem Code-Editor öffnen und untersuchen, um den genauen auszuführenden Befehl zu sehen, falls Sie neugierig sind.)* Der Backend-Server wird normalerweise starten und einige Ausgaben im Terminal drucken.

     📄 **Erkunden Sie die API-Dokumentation:** Sobald das Backend läuft, können Sie die automatisch generierte API-Dokumentation in Ihrem Webbrowser unter [http://localhost:8080/docs](http://localhost:8080/docs) aufrufen. Diese Dokumentation ist äußerst wertvoll, um die Backend-API-Endpunkte zu verstehen, wie Sie mit dem Backend interagieren können und welche Daten erwartet und zurückgegeben werden. Halten Sie diese Dokumentation griffbereit, während Sie entwickeln!

🎉 **Herzlichen Glückwunsch!** Wenn Sie alle Schritte befolgt haben, sollten jetzt sowohl die Frontend- als auch die Backend-Entwicklungsserver lokal laufen. Kehren Sie zu Ihrem Browser-Tab zurück, in dem Sie das Frontend aufgerufen haben (normalerweise [http://localhost:5173](http://localhost:5173)). **Aktualisieren Sie die Seite.** Sie sollten nun die vollständige Open WebUI-Anwendung in Ihrem Browser sehen, verbunden mit Ihrem lokalen Backend!

## Häufige Probleme beheben

Hier sind Lösungen für einige häufige Probleme, die während der Einrichtung oder Entwicklung auftreten können:

### 💥 "FATAL ERROR: Reached Heap Limit" (Frontend)

Dieser Fehler, der oft während der Frontend-Entwicklung auftritt, zeigt an, dass Node.js während des Build-Prozesses nicht genug Speicher zur Verfügung hat, insbesondere bei der Arbeit mit großen Frontend-Anwendungen.

**Lösung:** Erhöhen Sie die Heap-Größe von Node.js, um Node.js mehr Speicher zur Verfügung zu stellen. Sie haben zwei Optionen:

1. **Die Verwendung von `NODE_OPTIONS` Umgebungseinstellungen (Empfohlen für die Entwicklung):**
   - Dies ist eine temporäre Möglichkeit, um das Speicherlimit für die aktuelle Terminal-Sitzung zu erhöhen. Bevor Sie `npm run dev` oder `npm run build` in Ihrem *Frontend*-Terminal ausführen, setzen Sie die Umgebungsvariable `NODE_OPTIONS`:

     ```bash
     export NODE_OPTIONS="--max-old-space-size=4096" # Für Linux/macOS (bash, zsh)
     # set NODE_OPTIONS=--max-old-space-size=4096 # Für Windows (Command Prompt)
     # $env:NODE_OPTIONS="--max-old-space-size=4096" # Für Windows (PowerShell)
     npm run dev
     ```

     Wählen Sie den für Ihr Betriebssystem und Terminal passenden Befehl aus. `4096` entspricht 4 GB Speicher. Sie können diesen Wert bei Bedarf weiter erhöhen (z. B. `8192` für 8 GB). Diese Einstellung gilt nur für die im aktuellen Terminal ausgeführten Befehle.

2. **Änderung der `Dockerfile` (Für Docker-Umgebungen):**
   - Wenn Sie mit Docker arbeiten, können Sie die Umgebungsvariable `NODE_OPTIONS` dauerhaft in Ihrer `Dockerfile` setzen. Dies ist nützlich für eine konsistente Speicherzuordnung in Docker-Umgebungen, wie im ursprünglichen Leitfadenbeispiel gezeigt:

     ```dockerfile
     ENV NODE_OPTIONS=--max-old-space-size=4096
     ```

   - **Ausreichend RAM zuweisen:** Unabhängig von der Methode stellen Sie sicher, dass Ihr System oder Docker-Container über genügend freien RAM für Node.js verfügt. **Mindestens 4 GB RAM werden empfohlen**, und für größere Projekte oder komplexe Builds könnte mehr erforderlich sein. Schließen Sie unnötige Anwendungen, um RAM freizugeben.

### ⚠️ Port-Konflikte (Frontend & Backend)

Wenn Sie Fehler im Zusammenhang mit Ports sehen, wie "Adresse bereits in Verwendung" oder "Port bereits belegt", bedeutet dies, dass eine andere Anwendung auf Ihrem System bereits den Port `5173` (Standard für Frontend) oder `8080` (Standard für Backend) verwendet. Nur eine Anwendung kann einen spezifischen Port gleichzeitig verwenden.

**Lösung:**

1. **Den Konfliktprozess identifizieren:** Sie müssen herausfinden, welche Anwendung den benötigten Port verwendet.
   - **Linux/macOS:** Öffnen Sie ein neues Terminal und verwenden Sie die Befehle `lsof` oder `netstat`:
     - `lsof -i :5173` (oder `:8080` für den Backend-Port)
     - `netstat -tulnp | grep 5173` (oder `8080`)
     Diese Befehle zeigen die Prozess-ID (PID) und den Namen des Prozesses an, der den angegebenen Port verwendet.
   - **Windows:** Öffnen Sie die Eingabeaufforderung oder PowerShell als Administrator und verwenden Sie `netstat` oder `Get-NetTCPConnection`:
     - `netstat -ano | findstr :5173` (oder `:8080`) (Eingabeaufforderung)
     - `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess` (PowerShell)
     Diese Befehle zeigen ebenfalls die PID des Prozesses, der den Port verwendet, an.

2. **Den Konfliktprozess beenden:** Sobald Sie die Prozess-ID (PID) identifiziert haben, können Sie die Anwendung stoppen, die diesen Port verwendet. **Seien Sie vorsichtig beim Beenden von Prozessen, insbesondere wenn Sie nicht sicher sind, was sie sind.**
   - **Linux/macOS:** Verwenden Sie den Befehl `kill`: `kill <PID>` (ersetzen Sie `<PID>` durch die tatsächliche Prozess-ID). Wenn der Prozess mit `kill` nicht beendet wird, können Sie `kill -9 <PID>` (force kill) verwenden, aber gehen Sie vorsichtig damit um.
   - **Windows:** Verwenden Sie den Befehl `taskkill` in der Eingabeaufforderung oder PowerShell als Administrator: `taskkill /PID <PID> /F` (ersetzen Sie `<PID>` durch die Prozess-ID). Der `/F`-Schalter erzwingt die Beendigung.

3. **Alternativ Ports ändern (Fortgeschritten):**
   - Wenn Sie den Konfliktprozess nicht beenden können (z. B. handelt es sich um einen benötigten Systemdienst), können Sie Open WebUI so konfigurieren, dass andere Ports für Frontend und/oder Backend verwendet werden. Dies erfordert üblicherweise Anpassungen an Konfigurationsdateien.
     - **Frontend-Port:** Überprüfen Sie die Dokumentation oder Konfigurationsdateien des Frontends (oft in `vite.config.js` oder ähnlichen), wie der Entwicklungsserver-Port geändert werden kann. Möglicherweise müssen Sie auch die `.env`-Datei anpassen, wenn das Frontend Umgebungsvariablen für den Port verwendet.
     - **Backend-Port:** Untersuchen Sie das Skript `dev.sh` oder die Backend-Konfigurationsdateien, um zu sehen, wie der Backend-Port festgelegt ist. Möglicherweise müssen Sie den Startbefehl oder eine Konfigurationsdatei ändern, um den Backend-Port zu ändern. Wenn Sie den Backend-Port ändern, müssen Sie wahrscheinlich die `.env`-Datei des Frontends aktualisieren, um auf die neue Backend-URL zu verweisen.

### 🔄 Hot-Reload funktioniert nicht

Hot-Reload (oder hot module replacement - HMR) ist eine fantastische Entwicklungsfunktion, die Ihren Browser automatisch aktualisiert, wenn Sie Änderungen am Code vornehmen. Wenn es nicht funktioniert, kann dies Ihren Entwicklungsablauf erheblich verlangsamen.

**Schritte zur Fehlerbehebung:**

1. **Entwicklungsserver überprüfen:** Überprüfen Sie doppelt, dass sowohl `npm run dev` (Frontend) als auch `sh dev.sh` (Backend) in ihren jeweiligen Terminals ausgeführt werden und keine Fehler aufgetreten sind. Achten Sie auf Nachrichten in der Terminalausgabe, die darauf hinweisen, dass sie ausgeführt werden und sich im "Watch-Modus" oder "Entwicklungsmodus" befinden. Wenn Fehler auftreten, beheben Sie diese zuerst.
2. **Prüfen Sie auf Watch-Modus/HMR-Nachrichten:** Wenn die Entwicklungsserver starten, sollten sie normalerweise Nachrichten im Terminal ausgeben, die anzeigen, dass Hot-Reload oder Watch-Modus aktiviert ist. Suchen Sie nach Phrasen wie "HMR aktiviert", "beobachtet Dateiänderungen" oder ähnlichem. Wenn Sie diese Nachrichten nicht sehen, könnte ein Konfigurationsproblem vorliegen.
3. **Browser-Cache:** Manchmal kann der Cache Ihres Browsers verhindern, dass Sie die neuesten Änderungen sehen, selbst wenn Hot-Reload funktioniert. Versuchen Sie eine **hard refresh** in Ihrem Browser:
   - **Windows/Linux:** Ctrl+Shift+R
   - **macOS:** Cmd+Shift+R
   - Alternativ können Sie versuchen, den Browser-Cache zu leeren oder das Frontend in einem privaten/Inkognito-Browserfenster zu öffnen.
4. **Abhängigkeitsprobleme (Frontend):** Veraltete oder beschädigte Frontend-Abhängigkeiten können manchmal das Hot-Reload stören. Versuchen Sie, Ihre Frontend-Abhängigkeiten zu aktualisieren:
   - Führen Sie in Ihrem *Frontend*-Terminal aus:
  
     ```bash
     rm -rf node_modules && npm install
     ```

     Dieser Befehl löscht das Verzeichnis `node_modules` (wo Abhängigkeiten gespeichert sind) und installiert sie anschließend neu. Dies kann Probleme beheben, die durch beschädigte oder veraltete Pakete verursacht wurden.
5. **Backend-Neustart erforderlich (Bei Backend-Änderungen):** Hot-Reload funktioniert normalerweise am besten für Änderungen am Frontend-Code (UI, Styling, Komponenten). Bei erheblichen Änderungen am Backend-Code (insbesondere Änderungen an der Serverlogik, API-Endpunkten oder Abhängigkeiten) müssen Sie möglicherweise den **Backend-Server manuell neu starten** (indem Sie `sh dev.sh` in Ihrem Backend-Terminal stoppen und erneut ausführen). Hot-Reload für Backend-Änderungen ist oft weniger zuverlässig oder nicht automatisch in vielen Backend-Entwicklungs-Setups konfiguriert.
6. **IDE/Editor-Probleme:** In seltenen Fällen können Probleme mit Ihrer IDE oder Ihrem Code-Editor verhindern, dass Dateiänderungen von den Entwicklungsservern korrekt erkannt werden. Versuchen Sie, Ihre IDE neu zu starten oder sicherzustellen, dass Dateien korrekt gespeichert werden.
7. **Konfigurationsprobleme (Fortgeschritten):** Wenn keine der oben genannten Schritte funktionieren, könnte ein komplexeres Konfigurationsproblem mit der Frontend- oder Backend-Entwicklungsserver-Einrichtung vorliegen. Konsultieren Sie die Projektdokumentation, Konfigurationsdateien (z. B. `vite.config.js` für das Frontend, Backend-Server-Konfigurationsdateien) oder suchen Sie Unterstützung von der Open WebUI-Community oder den Betreuern.

## Beitrag zu Open WebUI leisten

Wir heißen Ihre Beiträge zu Open WebUI herzlich willkommen! Ihre Hilfe ist wertvoll, um dieses Projekt noch besser zu machen. Hier ist eine kurze Anleitung für einen reibungslosen und effektiven Beitragsworkflow:

1. **Verstehen Sie die Projektstruktur:** Nehmen Sie sich etwas Zeit, um sich mit der Verzeichnisstruktur des Projekts vertraut zu machen, insbesondere die Ordner `frontend` und `backend`. Sehen Sie sich den Code, die Konfigurationsdateien und die Dokumentation an, um einen Eindruck davon zu erhalten, wie alles organisiert ist.
2. **Beginnen Sie mit kleinen Beiträgen:** Wenn Sie neu im Projekt sind, sollten Sie erwägen, mit kleineren Beiträgen zu beginnen, wie:
   - **Verbesserungen der Dokumentation:** Korrigieren Sie Tippfehler, klären Sie Erklärungen, fügen Sie der Dokumentation weitere Details hinzu.
   - **Fehlerbehebungen:** Beheben Sie gemeldete Fehler oder Probleme.
   - **Kleine UI-Verbesserungen:** Verbessern Sie das Styling, beheben Sie kleinere Layoutprobleme.
   Diese kleineren Beiträge sind eine großartige Möglichkeit, sich mit der Codebasis und dem Beitragsprozess vertraut zu machen.
3. **Diskutieren Sie größere Änderungen zuerst:** Wenn Sie eine bedeutende neue Funktion implementieren oder umfangreiche Änderungen vornehmen möchten, wird dringend empfohlen, **Ihre Ideen zuerst mit den Projektbetreuern oder der Community zu diskutieren.** Sie können dies tun, indem Sie:
   - **Ein Issue öffnen** im GitHub-Repository, um Ihre Funktion oder Änderung vorzuschlagen.
   - **Den Open WebUI Community-Kanälen beitreten** (falls verfügbar, überprüfen Sie die README-Datei des Projekts oder die Website auf Links) und Ihre Ideen dort diskutieren.
   Dies hilft sicherzustellen, dass Ihr Beitrag mit den Zielen des Projekts übereinstimmt und verschwendete Arbeiten an Funktionen vermeidet, die möglicherweise nicht zusammengeführt werden.
4. **Erstellen Sie einen separaten Branch für Ihre Arbeit:** **Niemals direkt in den `dev`-Branch committen.** Erstellen Sie immer einen neuen Branch für jede Funktion oder Fehlerbehebung, an der Sie arbeiten. Dies hält Ihre Änderungen isoliert und erleichtert die Verwaltung und das Einreichen von Pull-Requests.
   - Um einen neuen Branch zu erstellen (z. B. mit dem Namen `my-feature-branch`), basierend auf dem `dev`-Branch:
  
     ```bash
     git checkout dev
     git pull origin dev # Stellen Sie sicher, dass Ihr lokaler dev-Branch auf dem neuesten Stand ist
     git checkout -b mein-feature-branch
     ```

5. **Änderungen häufig committen und klare Commit-Nachrichten schreiben:** Machen Sie kleine, logische Commits, während Sie Features entwickeln oder Bugs beheben. **Schreiben Sie klare und prägnante Commit-Nachrichten**, die erläutern, welche Änderungen Sie vorgenommen haben und warum. Gute Commit-Nachrichten erleichtern das Verständnis der Änderungshistorie und sind essenziell für die Zusammenarbeit.
   - Beispiel für eine gute Commit-Nachricht: `Fix: Tippfehler in der Dokumentation für das Backend-Setup korrigiert`
   - Beispiel für eine gute Commit-Nachricht: `Feat: Benutzerprofilseite mit grundlegender Informationsanzeige implementiert`
6. **Regelmäßige Synchronisierung mit dem `dev`-Branch:** Während Sie an Ihrem Branch arbeiten, synchronisieren Sie diesen regelmäßig mit den neuesten Änderungen des `dev`-Branches, um spätere Merge-Konflikte zu minimieren:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout mein-feature-branch
   git merge dev
   ```

   Lösen Sie auftretende Merge-Konflikte während des Schritts `git merge`.
7. **Tests (falls verfügbar) vor dem Push ausführen:** Obwohl diese Anleitung keine spezifischen Testverfahren für Open WebUI beschreibt, ist es eine gute Praxis, alle verfügbaren Tests vor dem Pushen Ihres Codes auszuführen. Überprüfen Sie die Dokumentation des Projekts oder `package.json` (für das Frontend) und Backend-Dateien auf testbezogene Befehle (z. B. `npm run test`, `pytest`, etc.). Das Ausführen von Tests hilft sicherzustellen, dass Ihre Änderungen keine Regressionen eingeführt oder bestehende Funktionen beschädigt haben.
8. **Pull-Request (PR) einreichen:** Sobald Sie Ihre Arbeit abgeschlossen, getestet (falls zutreffend) und bereit sind, Ihre Änderungen beizutragen, reichen Sie einen Pull-Request (PR) in den `dev`-Branch des Open WebUI-Repositorys auf GitHub ein.
   - **Gehen Sie zum Open WebUI-Repositorium auf GitHub.**
   - **Navigieren Sie zu Ihrem Branch.**
   - **Klicken Sie auf die Schaltfläche "Contribute" oder "Pull Request"** (normalerweise grün).
   - **Füllen Sie das PR-Formular aus:**
     - **Titel:** Geben Sie Ihrem PR einen klaren und beschreibenden Titel, der Ihre Änderungen zusammenfasst (z. B. "Fix: Problem mit der Validierung des Login-Formulars behoben").
     - **Beschreibung:** Geben Sie eine detailliertere Beschreibung Ihrer Änderungen, des zu lösenden Problems (falls zutreffend) und des relevanten Kontextes. Verlinken Sie auf mögliche verwandte Issues, falls vorhanden.
   - **Reichen Sie den PR ein.**

   Projekt-Maintainer werden Ihren Pull-Request überprüfen, Feedback geben und möglicherweise Ihre Änderungen mergen. Seien Sie offen für Feedback und bereit, auf Anfrage Änderungen vorzunehmen.

**Vielen Dank, dass Sie diese umfassende Anleitung gelesen haben und für Ihr Interesse an der Mitarbeit an Open WebUI! Wir freuen uns auf Ihre Beiträge und darauf, Sie als Teil der Open WebUI-Community willkommen zu heißen!** 🎉 Viel Erfolg beim Programmieren!
