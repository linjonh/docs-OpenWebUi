---
sidebar_position: 11
title: "🔎 Abfrage-unterstützte Generierung (RAG)"
---

:::warning

Wenn Sie **Ollama** verwenden, beachten Sie, dass es standardmäßig eine **Kontextlänge von 2048 Tokens** hat. Dies bedeutet, dass abgerufene Daten **überhaupt nicht verwendet werden könnten**, da sie nicht in das verfügbare Kontextfenster passen. Um die **Leistung der Abfrage-unterstützten Generierung (RAG)** zu verbessern, sollten Sie die Kontextlänge in den Ollama-Modelleinstellungen auf **8192+ Tokens** erhöhen.

:::


Die Abfrage-unterstützte Generierung (RAG) ist eine hochmoderne Technologie, die die Konversationsfähigkeiten von Chatbots durch die Einbindung von Kontext aus verschiedenen Quellen verbessert. Sie funktioniert, indem relevante Informationen aus einer Vielzahl von Quellen wie lokalen und entfernten Dokumenten, Webinhalten und sogar Multimedia-Quellen wie YouTube-Videos abgerufen werden. Der abgerufene Text wird dann mit einer vordefinierten RAG-Vorlage kombiniert und dem Benutzereingabepräfix hinzugefügt, um eine fundiertere und kontextuell relevantere Antwort zu liefern.

Einer der wichtigsten Vorteile von RAG ist seine Fähigkeit, Informationen aus verschiedenen Quellen zu nutzen und zu integrieren, was es zu einer idealen Lösung für komplexe Gesprächsszenarien macht. Zum Beispiel kann RAG relevante Informationen aus einer bestimmten Dokument- oder Webseitenquelle abrufen und in die Chat-Antwort integrieren, wenn ein Benutzer eine entsprechende Frage stellt. Außerdem kann RAG Informationen aus Multimedia-Quellen wie YouTube-Videos abrufen und einbinden, indem es beispielsweise Transkripte oder Untertitel dieser Videos analysiert, relevante Informationen extrahiert und sie in die Chat-Antwort integriert.




## Lokale und entfernte RAG-Integration

Lokale Dokumente müssen zuerst im Dokumentenbereich des Arbeitsbereichs hochgeladen werden, um sie mithilfe des `#`-Symbols vor einer Abfrage zugänglich zu machen. Klicken Sie auf die Format-URL, die über dem Chatfeld erscheint. Nach der Auswahl erscheint ein Dokumentensymbol über `Nachricht senden`, das eine erfolgreiche Abrufung anzeigt.

Sie können auch Dokumente in den Arbeitsbereich laden, indem Sie eine Aufforderung mit `#`, gefolgt von einer URL starten. Dies kann helfen, Webinhalte direkt in Ihre Gespräche einzubinden.

## Websuche für RAG

Für die Integration von Webinhalten starten Sie eine Abfrage im Chat mit `#`, gefolgt von der Ziel-URL. Klicken Sie auf die Format-URL, die in dem Feld über dem Chatfeld erscheint. Nach der Auswahl erscheint ein Dokumentensymbol über `Nachricht senden`, das eine erfolgreiche Abrufung anzeigt. Open WebUI ruft Informationen von der URL ab und analysiert sie, wenn möglich.

:::tip
Webseiten enthalten oft überflüssige Informationen wie Navigation und Footer. Um bessere Ergebnisse zu erzielen, verlinken Sie auf eine rohe oder leserfreundliche Version der Seite.
:::

## Anpassung der RAG-Vorlage

Passen Sie die RAG-Vorlage über das Menü `Admin-Panel` > `Einstellungen` > `Dokumente` an.

## Unterstützung für RAG-Einbettungen

Ändern Sie das RAG-Einbettungsmodell direkt über das Menü `Admin-Panel` > `Einstellungen` > `Dokumente`. Diese Funktion unterstützt Ollama- und OpenAI-Modelle, sodass Sie die Dokumentenverarbeitung nach Ihren Anforderungen verbessern können.

## Zitierungen in der RAG-Funktion

Die RAG-Funktion ermöglicht es Benutzern, den Kontext von Dokumenten, die in LLMs eingebracht werden, mit zusätzlichen Zitierungen einfach nachzuverfolgen. Dies gewährleistet Transparenz und Verantwortlichkeit bei der Verwendung externer Quellen in Ihren Chats.

## Verbesserte RAG-Pipeline

Das aktivierbare Hybridsuch-Subfeature für unsere RAG-Einbettungsfunktion verbessert die RAG-Funktionalität über `BM25`, mit Re-Ranking durch `CrossEncoder` und konfigurierbaren Relevanzscore-Schwellenwerten. Dies bietet eine präzisere und maßgeschneiderte RAG-Erfahrung für Ihren spezifischen Anwendungsfall.

## YouTube RAG-Pipeline

Die dedizierte RAG-Pipeline zur Zusammenfassung von YouTube-Videos über Video-URLs ermöglicht eine reibungslose Interaktion mit Video-Transkriptionen direkt. Diese innovative Funktion ermöglicht es Ihnen, Videoinhalte in Ihre Chats einzubinden und so Ihr Gesprächserlebnis weiter zu bereichern.

## Dokumenten-Parsing

Eine Vielzahl von Parsern extrahiert Inhalte aus lokalen und entfernten Dokumenten. Weitere Informationen finden Sie in der [`get_loader`](https://github.com/open-webui/open-webui/blob/2fa94956f4e500bf5c42263124c758d8613ee05e/backend/apps/rag/main.py#L328)-Funktion.

## Google Drive-Integration

In Verbindung mit einem Google-Cloud-Projekt, das die Google-Picker-API und die Google-Drive-API aktiviert hat, ermöglicht diese Funktion Benutzern den direkten Zugriff auf ihre Drive-Dateien über die Chat-Oberfläche. Benutzer können Dokumente, Folien, Tabellen und mehr hochladen und sie als Kontext für Ihre Chats verwenden. Kann im Menü `Admin-Panel` > `Einstellungen` > `Dokumente` aktiviert werden. Um diese Funktion zu nutzen, müssen [`GOOGLE_DRIVE_API_KEY und GOOGLE_DRIVE_CLIENT_ID`](https://github.com/open-webui/docs/blob/main/docs/getting-started/env-configuration.md)-Umgebungsvariablen gesetzt werden.

### Detaillierte Anweisungen
1. Erstellen Sie einen OAuth 2.0-Client und konfigurieren Sie sowohl die berechtigten JavaScript-Ursprünge als auch die berechtigte Redirect-URI auf die URL (einschließlich Port, falls vorhanden), die Sie verwenden, um auf Ihre Open-WebUI-Instanz zuzugreifen.
1. Notieren Sie sich die Client-ID, die mit diesem OAuth-Client verknüpft ist.
1. Stellen Sie sicher, dass sowohl die Google Drive API als auch die Google Picker API für Ihr Projekt aktiviert sind.
1. Setzen Sie Ihre App (Projekt) außerdem auf 'Testen' und fügen Sie Ihre Google Drive-E-Mail zur Benutzerliste hinzu.
1. Legen Sie den Berechtigungsumfang so fest, dass alles eingeschlossen ist, was diese APIs bieten. Und da sich die App im Testmodus befindet, ist keine Verifizierung durch Google erforderlich, um der App den Zugriff auf die Daten der begrenzten Testbenutzer zu ermöglichen.
1. Gehen Sie zur Google Picker API-Seite und klicken Sie auf die Schaltfläche 'Anmeldedaten erstellen'.
1. Erstellen Sie einen API-Schlüssel und wählen Sie unter 'Anwendungsbeschränkungen' die Option Websites. Fügen Sie dann die URL Ihrer Open-WebUI-Instanz hinzu, dieselbe wie in den Einstellungen für 'Autorisierte JavaScript-Quellen' und 'Autorisierte Weiterleitungs-URIs' im Schritt 1.
1. Richten Sie API-Beschränkungen für den API-Schlüssel ein, sodass nur auf Google Drive API und Google Picker API zugegriffen werden kann.
1. Richten Sie die Umgebungsvariable `GOOGLE_DRIVE_CLIENT_ID` auf die Client-ID des OAuth-Clients aus Schritt 2 ein.
1. Richten Sie die Umgebungsvariable `GOOGLE_DRIVE_API_KEY` auf den im Schritt 7 eingerichteten API-Schlüsselwert ein (NICHT das OAuth-Client-Geheimnis aus Schritt 2).
1. Richten Sie den `GOOGLE_REDIRECT_URI` auf die URL meiner Open-WebUI-Instanz ein (einschließlich des Ports, falls vorhanden).
1. Starten Sie dann Ihre Open-WebUI-Instanz mit diesen drei Umgebungsvariablen neu.
1. Stellen Sie anschließend sicher, dass Google Drive unter `Admin Panel` < `Settings` < `Documents` < `Google Drive` aktiviert ist.
