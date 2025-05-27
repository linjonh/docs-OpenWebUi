---
sidebar_position: 0
title: "🤖 Modelle"
---

Der Abschnitt `Modelle` innerhalb des `Workspace` von Open WebUI ist ein leistungsstarkes Werkzeug, mit dem Sie benutzerdefinierte Modelle erstellen und verwalten können, die auf bestimmte Zwecke zugeschnitten sind. Dieser Abschnitt dient als zentrale Anlaufstelle für all Ihre Modelfiles und bietet eine Vielzahl von Funktionen, um Ihre Modelle zu bearbeiten, zu klonen, zu teilen, zu exportieren und auszublenden.

### Verwaltung von Modelfiles

Im Abschnitt `Modelle` können Sie die folgenden Aktionen an Ihren Modelfiles durchführen:

* **Bearbeiten**: Tauchen Sie in die Details Ihres Modelfiles ein und nehmen Sie Änderungen an dessen Charakter und mehr vor.
* **Klonen**: Erstellen Sie eine Kopie eines Modelfiles, die mit `-clone` an die geklonte `Model-ID` angehängt wird. Beachten Sie, dass Sie kein Basismodell klonen können; Sie müssen zuerst ein Modell erstellen, bevor Sie es klonen.
* **Teilen**: Teilen Sie Ihr Modelfile mit der Open WebUI-Community, indem Sie auf die Schaltfläche `Teilen` klicken. Dies wird Sie zu [https://openwebui.com/models/create](https://openwebui.com/models/create) weiterleiten.
* **Exportieren**: Laden Sie den `.json`-Export des Modelfiles auf Ihren PC herunter.
* **Ausblenden**: Blenden Sie das Modelfile aus der Modell-Auswahlliste im Dropdown-Menü innerhalb des Chats aus.

### Bearbeitung von Modelfiles

Beim Bearbeiten eines Modelfiles können Sie die folgenden Einstellungen anpassen:

* **Avatar-Foto**: Laden Sie ein Avatar-Foto hoch, um Ihr Modelfile darzustellen.
* **Modellname**: Ändern Sie den Namen Ihres Modelfiles.
* **System-Prompt**: Geben Sie einen optionalen System-Prompt für Ihr Modelfile an.
* **Modellparameter**: Passen Sie die Parameter Ihres Modelfiles an.
* **Prompt-Vorschläge**: Fügen Sie Prompts hinzu, die auf einer neuen Chat-Seite angezeigt werden.
* **Dokumente**: Fügen Sie Dokumente zum Modelfile hinzu (immer RAG [Retrieval Augmented Generation]).
* **Werkzeuge, Filter und Aktionen**: Wählen Sie die Werkzeuge, Filter und Aktionen aus, die für das Modelfile verfügbar sein sollen.
* **Vision**: Aktivieren Sie `Vision` für Multi-Modals.
* **Tags**: Fügen Sie Tags zum Modelfile hinzu, die neben dem Modellnamen im Dropdown-Menü der Modell-Auswahl angezeigt werden.

### Modellentdeckung und Import/Export

Der Abschnitt `Modelle` enthält auch Funktionen zum Importieren und Exportieren von Modellen:

* **Modelle importieren**: Verwenden Sie diese Schaltfläche, um Modelle aus einer .json-Datei oder anderen Quellen zu importieren.
* **Modelle exportieren**: Verwenden Sie diese Schaltfläche, um alle Ihre Modelfiles in einer einzigen .json-Datei zu exportieren.

Um Modelle herunterzuladen, navigieren Sie zu den **Ollama-Einstellungen** im Tab „Connections“.
Alternativ können Sie Modelle auch direkt durch Eingabe eines Befehls wie `ollama run hf.co/[Modellersteller]/[Modellname]` im Dropdown-Menü der Modellauswahl herunterladen.
Diese Aktion erstellt eine Schaltfläche mit der Bezeichnung "Pull [Model Name]" zum Herunterladen.

### Wechsel zwischen Modellen

   **Beispiel**: Wechsel zwischen **Mistral**, **LLaVA** und **GPT-3.5** in einer Multi-Stage-Aufgabe

* **Szenario**: Eine mehrstufige Konversation umfasst verschiedene Aufgabenarten, wie das Starten mit einfachen FAQs, das Interpretieren eines Bildes und anschließend das Generieren einer kreativen Antwort.
* **Grund für den Wechsel**: Der Benutzer kann die spezifischen Stärken jedes Modells für jede Phase nutzen:
  * **Mistral** für allgemeine Fragen, um Rechenzeit und Kosten zu reduzieren.
  * **LLaVA** für visuelle Aufgaben, um Erkenntnisse aus bildbasierten Daten zu gewinnen.
  * **GPT-3.5** für die Generierung anspruchsvollerer und nuancierter Sprache.
* **Prozess**: Der Benutzer wechselt je nach Aufgabenart zwischen Modellen, um Effizienz und Antwortqualität zu maximieren.

    **Wie?**:
    1. **Modell auswählen**: Wählen Sie innerhalb der Chat-Oberfläche die gewünschten Modelle aus dem Dropdown-Menü des Modellwechslers aus. Sie können bis zu zwei Modelle gleichzeitig auswählen, und beide Antworten werden generiert. Anschließend können Sie mit den Pfeilen vorwärts und rückwärts zwischen ihnen navigieren.
    2. **Kontextbewahrung**: Open WebUI bewahrt den Gesprächskontext über Modellwechsel hinweg, um reibungslose Übergänge zu ermöglichen.
