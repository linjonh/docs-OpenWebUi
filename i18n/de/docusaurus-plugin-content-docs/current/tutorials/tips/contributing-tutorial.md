---
sidebar_position: 2
title: "🤝 Tutorials Beitragen"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Beitragen an.
:::

# Tutorials Beitragen

Wir schätzen Ihr Interesse, Tutorials zur Dokumentation von Open WebUI beizutragen. Folgen Sie den unten stehenden Schritten, um Ihre Umgebung einzurichten und Ihr Tutorial einzureichen.

## Schritte

1. **Forken Sie das `openwebui/docs` GitHub Repository**

   - Navigieren Sie zum [Open WebUI Docs Repository](https://github.com/open-webui/docs) auf GitHub.
   - Klicken Sie oben rechts auf die Schaltfläche **Fork**, um eine Kopie unter Ihrem GitHub-Account zu erstellen.

2. **GitHub Actions aktivieren**

   - Navigieren Sie im geforkten Repository zur Registerkarte **Actions**.
   - Falls notwendig, aktivieren Sie GitHub Actions und folgen Sie den Anweisungen auf dem Bildschirm.

3. **GitHub Pages aktivieren**

   - Gehen Sie zu **Settings** > **Pages** in Ihrem geforkten Repository.
   - Wählen Sie unter **Source** den Branch, den Sie bereitstellen möchten (z. B. `main`), und den Ordner (z. B. `/docs`) aus.
   - Klicken Sie auf **Save**, um GitHub Pages zu aktivieren.

4. **GitHub Umgebungsvariablen konfigurieren**

   - Gehen Sie in Ihrem geforkten Repository zu **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Fügen Sie die folgenden Umgebungsvariablen hinzu:
     - `BASE_URL`, eingestellt auf `/docs` (oder Ihre ausgewählte Basis-URL für den Fork).
     - `SITE_URL`, eingestellt auf `https://<Ihr-GitHub-Benutzername>.github.io/`.

### 📝 Aktualisieren des GitHub Pages Workflows und der Konfigurationsdatei

Falls Sie die Bereitstellungseinstellungen an Ihre benutzerdefinierte Umgebung anpassen müssen, gehen Sie wie folgt vor:

a. **Aktualisieren Sie `.github/workflows/gh-pages.yml`**

- Fügen Sie die Umgebungsvariablen für `BASE_URL` und `SITE_URL` bei Bedarf dem Build-Schritt hinzu:

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **Ändern Sie `docusaurus.config.ts` zur Verwendung von Umgebungsvariablen**

- Aktualisieren Sie `docusaurus.config.ts`, um diese Umgebungsvariablen mit Standardwerten für lokale oder direkte Bereitstellungen zu verwenden:

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "ChatGPT-Style WebUI für LLMs (früher Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- Diese Einrichtung stellt konsistentes Bereitstellungsverhalten für Forks und benutzerdefinierte Setups sicher.

5. **Führen Sie den GitHub Workflow `gh-pages` aus**

   - Gehen Sie zur Registerkarte **Actions** und suchen Sie den Workflow `gh-pages`.
   - Starten Sie den Workflow manuell, falls nötig, oder er wird möglicherweise automatisch anhand Ihrer Setupeinstellungen ausgeführt.

6. **Öffnen Sie Ihre geforkte Kopie**

   - Besuchen Sie `https://<Ihr-GitHub-Benutzername>.github.io/<BASE_URL>`, um Ihre geforkte Dokumentation zu sehen.

7. **Entwerfen Sie Ihre Änderungen**

   - Navigieren Sie in Ihrem geforkten Repository zum entsprechenden Verzeichnis (z. B. `docs/tutorial/`).
   - Erstellen Sie eine neue Markdown-Datei für Ihr Tutorial oder bearbeiten Sie vorhandene Dateien.
   - Stellen Sie sicher, dass Ihr Tutorial das Banner für nicht unterstützte Inhalte enthält.

8. **Reichen Sie einen Pull Request ein**

   - Sobald Ihr Tutorial fertig ist, committen Sie Ihre Änderungen in Ihr geforktes Repository.
   - Navigieren Sie zum ursprünglichen Repository `open-webui/docs`.
   - Klicken Sie auf **New Pull Request** und wählen Sie Ihren Fork und Branch als Quelle aus.
   - Geben Sie einen aussagekräftigen Titel und eine Beschreibung für Ihren PR an.
   - Reichen Sie den Pull Request zur Überprüfung ein.

## Wichtig

Von der Community beigetragene Tutorials müssen Folgendes enthalten:

```
:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Beitragen an.
:::
```

---

:::tip So testen Sie Docusaurus lokal
Sie können Ihre Docusaurus-Seite lokal mit den folgenden Befehlen testen:

```bash
npm install   # Installieren von Abhängigkeiten
npm run build # Build der Seite für die Produktion
```

Dies hilft Ihnen, Fehler vor der Bereitstellung zu erkennen.
:::

---
