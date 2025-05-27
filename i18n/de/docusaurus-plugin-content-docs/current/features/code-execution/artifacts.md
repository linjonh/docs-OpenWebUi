---
sidebar_position: 1
title: "🏺 Artefakte"
---


# Was sind Artefakte und wie nutze ich sie in Open WebUI?

Artefakte in Open WebUI sind eine innovative Funktion, die von Claude.AIs Artefakten inspiriert ist und es Ihnen ermöglicht, mit bedeutenden und eigenständigen Inhalten, die von einem LLM innerhalb eines Chats generiert werden, zu interagieren. Sie ermöglichen es Ihnen, umfangreiche Inhalte separat von der Hauptkonversation zu betrachten, zu bearbeiten, darauf aufzubauen oder darauf zu verweisen, was das Arbeiten mit komplexen Ergebnissen erleichtert und sicherstellt, dass wichtige Informationen später erneut abgerufen werden können.

## Wann verwendet Open WebUI Artefakte?

Open WebUI erstellt ein Artefakt, wenn der generierte Inhalt bestimmte, für unsere Plattform angepasste Kriterien erfüllt:

1. **Darstellbar**: Damit der Inhalt als Artefakt angezeigt werden kann, muss er ein Format haben, das von Open WebUI für die Darstellung unterstützt wird. Dazu gehören:

* Einseitige HTML-Websites
* SVG-Bilder (Scalable Vector Graphics)
* Vollständige Webseiten, die HTML, JavaScript und CSS im selben Artefakt enthalten. Beachten Sie, dass HTML erforderlich ist, wenn eine vollständige Webseite generiert wird.
* ThreeJS-Visualisierungen und andere JavaScript-Visualisierungsbibliotheken wie D3.js.

Andere Inhaltstypen wie Dokumente (Markdown oder Klartext), Codeausschnitte und React-Komponenten werden von Open WebUI nicht als Artefakte dargestellt.

## Wie erstellt das Modell von Open WebUI Artefakte?

Um Artefakte in Open WebUI zu nutzen, muss ein Modell Inhalte bereitstellen, die den Renderprozess auslösen, um ein Artefakt zu erstellen. Dies beinhaltet die Generierung von gültigem HTML-, SVG-Code oder anderen unterstützten Formaten zur Artefaktdarstellung. Wenn der generierte Inhalt die oben genannten Kriterien erfüllt, wird er von Open WebUI als interaktives Artefakt angezeigt.

## Wie nutze ich Artefakte in Open WebUI?

Wenn Open WebUI ein Artefakt erstellt, wird der Inhalt in einem dedizierten Artefakte-Fenster rechts neben dem Hauptchat angezeigt. So interagieren Sie mit Artefakten:

* **Bearbeiten und Iterieren**: Bitten Sie ein LLM im Chat, den Inhalt zu bearbeiten oder zu überarbeiten, und diese Updates werden direkt im Artefakte-Fenster angezeigt. Sie können mit dem Versionsauswahlwerkzeug unten links am Artefakt zwischen Versionen wechseln. Jede Bearbeitung erstellt eine neue Version, sodass Sie Änderungen mit dem Versionsauswahlwerkzeug verfolgen können.
* **Aktualisierungen**: Open WebUI kann ein vorhandenes Artefakt basierend auf Ihren Nachrichten aktualisieren. Das Artefakte-Fenster zeigt den neuesten Inhalt an.
* **Aktionen**: Greifen Sie auf zusätzliche Aktionen für das Artefakt zu, wie das Kopieren des Inhalts oder das Öffnen des Artefakts im Vollbildmodus, die sich unten rechts am Artefakt befinden.

## Bearbeiten von Artefakten

1. **Gezielte Aktualisierungen**: Beschreiben Sie, was Sie ändern möchten und wo. Zum Beispiel:

* "Ändern Sie die Farbe der Balken im Diagramm von Blau auf Rot."
* "Aktualisieren Sie den Titel des SVG-Bildes auf Neuer Titel."

2. **Komplette Überarbeitungen**: Fordern Sie größere Änderungen an, die die meisten Inhalte betreffen, für umfassende Umstrukturierungen oder mehrere Abschnittsaktualisierungen. Zum Beispiel:

* "Überarbeiten Sie diese einseitige HTML-Website zu einer Zielseite."
* "Gestalten Sie dieses SVG so um, dass es mithilfe von ThreeJS animiert ist."

**Beste Praktiken**:

* Seien Sie spezifisch, welchen Teil des Artefakts Sie ändern möchten.
* Verweisen Sie auf eindeutigen, identifizierbaren Text rund um die gewünschte Änderung für gezielte Aktualisierungen.
* Überlegen Sie, ob eine kleine Aktualisierung oder eine komplette Überarbeitung für Ihre Bedürfnisse geeigneter ist.

## Anwendungsfälle

Artefakte in Open WebUI ermöglichen verschiedenen Teams, hochwertige Arbeitsprodukte schnell und effizient zu erstellen. Hier sind einige Beispiele, die auf unsere Plattform zugeschnitten sind:

* **Designer**:
  * Erstellen Sie interaktive SVG-Grafiken für UI/UX-Design.
  * Entwerfen Sie einseitige HTML-Webseiten oder Zielseiten.
* **Entwickler**: Erstellen Sie einfache HTML-Prototypen oder generieren Sie SVG-Symbole für Projekte.
* **Marketingfachleute**:
  * Gestalten Sie Kampagnen-Zielseiten mit Leistungskennzahlen.
  * Erstellen Sie SVG-Grafiken für Werbekreative oder Social-Media-Beiträge.

## Beispiele für Projekte, die Sie mit den Artefakten von Open WebUI erstellen können

Artefakte in Open WebUI ermöglichen verschiedenen Teams und Einzelpersonen, hochwertige Arbeitsprodukte schnell und effizient zu erstellen. Hier sind einige Beispiele, die auf unsere Plattform zugeschnitten sind, um die Vielseitigkeit der Artefakte hervorzuheben und Sie zu inspirieren, deren Potenzial zu erkunden:

1. **Interaktive Visualisierungen**

* Verwendete Komponenten: ThreeJS, D3.js und SVG
* Vorteile: Erstellen Sie überzeugende Datenstorys mit interaktiven Visualisierungen. Mit den Artefakten von Open WebUI können Sie zwischen Versionen wechseln, um unterschiedliche Visualisierungskonzepte zu testen und Änderungen leichter zu verfolgen.

Beispielprojekt: Erstellen Sie ein interaktives Liniendiagramm mit ThreeJS, um Aktienkurse im Zeitverlauf zu visualisieren. Aktualisieren Sie die Farben und Skalen des Diagramms in separaten Versionen, um verschiedene Visualisierungsstrategien zu vergleichen.

2. **Einseitige Webanwendungen**

* Verwendete Komponenten: HTML, CSS und JavaScript
* Vorteile: Entwickeln Sie einseitige Webanwendungen direkt innerhalb von Open WebUI. Bearbeiten und überarbeiten Sie die Inhalte mithilfe gezielter Aktualisierungen und kompletter Überarbeitungen.

Beispielprojekt: Entwerfen Sie eine To-Do-Listen-App mit einer Benutzeroberfläche, die mit HTML und CSS erstellt wurde. Verwenden Sie JavaScript, um interaktive Funktionen hinzuzufügen. Aktualisieren Sie das Layout und die UI/UX der App durch gezielte Updates und vollständige Überarbeitungen.

3. **Animierte SVG-Grafiken**

* Verwendete Komponenten: SVG und ThreeJS
* Vorteile: Erstellen Sie ansprechende animierte SVG-Grafiken für Marketingkampagnen, soziale Medien oder Webdesign. Mit Open WebUIs Artifacts können Sie die Grafiken in einem einzigen Fenster bearbeiten und iterieren.

Beispielprojekt: Entwerfen Sie ein animiertes SVG-Logo für eine Unternehmensmarke. Verwenden Sie ThreeJS, um Animationseffekte hinzuzufügen, und nutzen Sie Open WebUIs gezielte Updates, um die Farben und das Design des Logos zu verfeinern.

4. **Webseitenprototypen**

* Verwendete Komponenten: HTML, CSS und JavaScript
* Vorteile: Erstellen und testen Sie Webseitenprototypen direkt in Open WebUI. Wechseln Sie zwischen Versionen, um unterschiedliche Designansätze zu vergleichen und den Prototyp zu verfeinern.

Beispielprojekt: Entwickeln Sie einen Prototyp für eine neue E-Commerce-Website mit HTML, CSS und JavaScript. Verwenden Sie Open WebUIs gezielte Updates, um die Navigation, das Layout und die UI/UX zu verbessern.

5. **Interaktive Geschichten**

* Verwendete Komponenten: HTML, CSS und JavaScript
* Vorteile: Erstellen Sie interaktive Geschichten mit Scrolleffekten, Animationen und anderen interaktiven Elementen. Open WebUIs Artifacts ermöglichen es Ihnen, die Geschichte zu verfeinern und verschiedene Versionen zu testen.

Beispielprojekt: Entwickeln Sie eine interaktive Geschichte über die Geschichte eines Unternehmens, indem Sie Scrolleffekte und Animationen nutzen, um den Leser zu fesseln. Verwenden Sie gezielte Updates, um die Erzählung der Geschichte zu verfeinern, und Open WebUIs Versionsauswahl, um verschiedene Versionen zu testen.
