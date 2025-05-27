---
sidebar_position: 3
title: "🔎 Anleitung zur Verwendung von Open WebUI RAG"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

# Anleitung: RAG mit Open WebUI-Dokumentation konfigurieren

In diesem Tutorial erfahren Sie, wie Sie **Retrieval-Augmented Generation (RAG)** mit Open WebUI verwenden, um reale Dokumentationen als Wissensdatenbank zu laden. Wir zeigen Ihnen, wie Sie die neueste **Open WebUI-Dokumentation** als Beispiel für diese Einrichtung verwenden können.

---

## Übersicht

### Was ist RAG?

Retrieval-Augmented Generation (RAG) kombiniert **LLMs** mit **abgerufenem Wissen** aus externen Quellen. Das System ruft relevante Daten aus hochgeladenen Dokumenten oder Wissensdatenbanken ab, um die Qualität und Genauigkeit der Antworten zu verbessern.

Dieses Tutorial demonstriert, wie man:

- Die neueste Open WebUI-Dokumentation als Wissensdatenbank hochlädt.
- Einen benutzerdefinierten Modell damit verbindet.
- Die Wissensdatenbank abfragt, um bessere Unterstützung zu erhalten.

---

## Einrichtung

### Schritt-für-Schritt Einrichtung: Open WebUI-Dokumentation als Wissensdatenbank

Folgen Sie diesen Schritten, um RAG mit **Open WebUI-Dokumentation** einzurichten:

1. **Dokumentation herunterladen**:
   - Laden Sie die neueste Dokumentation herunter:
     [https://github.com/open-webui/docs/archive/refs/heads/main.zip](https://github.com/open-webui/docs/archive/refs/heads/main.zip)

2. **Dateien extrahieren**:
   - Extrahieren Sie die `main.zip`-Datei, um alle Dokumentationsdateien zu erhalten.

3. **Markdown-Dateien finden**:
   - Finden Sie im extrahierten Ordner alle Dateien mit den Erweiterungen `.md` und `.mdx` (Tipp: nach `*.md*` suchen).

4. **Eine Wissensdatenbank erstellen**:
   - Navigieren Sie zu **Workspace** > **Knowledge** > **+ Create a Knowledge Base**.
   - Benennen Sie die Wissensdatenbank: `Open WebUI-Dokumentation`
   - Zweck: **Unterstützung**

   > Klicken Sie auf **Create Knowledge**.

5. **Dateien hochladen**:
   - Ziehen Sie die `.md`- und `.mdx`-Dateien aus dem extrahierten Ordner in die Wissensdatenbank **Open WebUI-Dokumentation**.

---

## Modell erstellen und konfigurieren

### Ein benutzerdefiniertes Modell mit der Wissensdatenbank erstellen

1. **Zu Modelle navigieren**:
   - Gehen Sie zu **Workspace** > **Models** > **+ Add New Model**.

2. **Modell konfigurieren**:
   - **Name**: `Open WebUI`
   - **Basismodell**: *(Wählen Sie das entsprechende Llama oder ein anderes verfügbares Modell)*
   - **Wissensquelle**: Wählen Sie **Open WebUI-Dokumentation** aus dem Dropdown-Menü.

3. **Modell speichern**.

---

## Beispiele und Nutzung

### Open WebUI-Dokumentationsmodell abfragen

1. **Einen neuen Chat starten**:
   - Navigieren Sie zu **New Chat** und wählen Sie das Modell `Open WebUI` aus.

2. **Beispielfragen**:

   ```
   Benutzer: "Wie konfiguriere ich Umgebungsvariablen?"
   System: "Siehe Abschnitt 3.2: Verwenden Sie die `.env`-Datei, um Konfigurationen zu verwalten."
   ```

   ```
   Benutzer: "Wie aktualisiere ich Open WebUI mit Docker?"
   System: "Siehe `docker/updating.md`: Verwenden Sie `docker pull` und starten Sie den Container neu."
   ```

   Mit dem RAG-fähigen Modell ruft das System die relevantesten Abschnitte aus der Dokumentation ab, um Ihre Frage zu beantworten.

---

## Nächste Schritte

### Nächste Schritte

- **Mehr Wissen hinzufügen**: Erweitern Sie Ihre Wissensdatenbank, indem Sie weitere Dokumente hinzufügen.

---

Mit dieser Einrichtung können Sie die **Open WebUI-Dokumentation** effektiv nutzen, um Benutzer durch die Abfrage relevanter Informationen für ihre Fragen zu unterstützen. Viel Spaß beim Erstellen und Abfragen Ihrer benutzerdefinierten wissensverstärkten Modelle!
