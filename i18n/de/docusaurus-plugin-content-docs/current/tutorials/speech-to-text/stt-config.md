---
sidebar_position: 1
title: "🗨️  Konfiguration"
---

Die Open Web UI unterstützt sowohl lokale, browserbasierte als auch entfernte Sprache-zu-Text-Funktionen.

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## Cloud-/Remote-Sprache-zu-Text-Anbieter

Die folgenden Sprache-zu-Text-Anbieter in der Cloud werden derzeit unterstützt. API-Schlüssel können als Umgebungsvariablen (OpenAI) oder auf der Administrator-Einstellungsseite (beide Schlüssel) konfiguriert werden.

 | Dienst  | API-Schlüssel erforderlich |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 Die WebAPI bietet STT über den integrierten Browser-STT-Anbieter.

## Konfigurieren Ihres STT-Anbieters

Um einen Sprache-zu-Text-Anbieter zu konfigurieren:

- Navigieren Sie zu den Administrator-Einstellungen
- Wählen Sie Audio
- Geben Sie einen API-Schlüssel an und wählen Sie ein Modell aus der Dropdown-Liste aus

![alt text](/images/tutorials/stt/stt-config.png)

## Benutzereinstellungen

Zusätzlich zu den Instanz-Einstellungen, die im Administrations-Panel bereitgestellt werden, gibt es auch einige Benutzereinstellungen, die zusätzliche Funktionalität bieten können.

*   **STT-Einstellungen:** Enthält Einstellungen im Zusammenhang mit der Sprache-zu-Text-Funktionalität.
*   **Sprache-zu-Text-Engine:** Bestimmt die Engine, die für die Spracherkennung verwendet wird (Standard oder Web API).
 

![alt text](/images/tutorials/stt/user-settings.png)

## Verwendung von STT

Sprache-zu-Text bietet eine hocheffiziente Möglichkeit, Eingabeaufforderungen mit Ihrer Stimme zu "schreiben", und funktioniert sowohl auf Desktop- als auch auf mobilen Geräten zuverlässig.

Um STT zu verwenden, klicken Sie einfach auf das Mikrofon-Symbol:

![alt text](/images/tutorials/stt/stt-operation.png)

Eine Live-Audiowellenform zeigt eine erfolgreiche Sprachaufnahme an:

![alt text](/images/tutorials/stt/stt-in-progress.png)

## STT-Modusbetrieb

Sobald Ihre Aufnahme begonnen hat, können Sie:

- Auf das Häkchen-Symbol klicken, um die Aufnahme zu speichern (wenn automatisches Senden nach Abschluss aktiviert ist, wird sie gesendet; andernfalls können Sie manuell senden)
- Wenn Sie die Aufnahme abbrechen möchten (zum Beispiel, um eine neue Aufnahme zu starten), können Sie auf das x-Symbol klicken, um die Aufnahmeoberfläche zu verlassen

![alt text](/images/tutorials/stt/endstt.png)
