---
sidebar_position: 13
title: "🔰 Anpassbare Banner"
---

Übersicht
---------

Open WebUI bietet eine Funktion, die Administratoren ermöglicht, anpassbare Banner mit Persistenz in der Datei `config.json` zu erstellen. Diese Banner können Optionen für Inhalt, Hintergrundfarbe (Info, Warnung, Fehler oder Erfolg) und Abweisbarkeit bieten. Banner sind nur für angemeldete Benutzer zugänglich, um die Vertraulichkeit sensibler Informationen zu gewährleisten.

Banner über das Admin-Panel konfigurieren
---------------------------------------

Um Banner über das Admin-Panel zu konfigurieren, gehen Sie wie folgt vor:

1. Melden Sie sich als Administrator bei Ihrer Open WebUI-Instanz an.
2. Navigieren Sie zu `Admin Panel` -> `Einstellungen` -> `Schnittstelle`.
3. Suchen Sie die Option `Banners` direkt oberhalb der Option `Standard-Prompt-Vorschläge`.
4. Klicken Sie auf das `+`-Symbol, um ein neues Banner hinzuzufügen.
5. Wählen Sie den Bannertyp aus und legen Sie den Bannertext fest.
6. Wählen Sie aus, ob das Banner abweisbar sein soll oder nicht.
7. Legen Sie den Zeitstempel für das Banner fest (optional).
8. Drücken Sie `Speichern` am unteren Rand der Seite, um das Banner zu speichern.

Banner über Umgebungsvariablen konfigurieren
------------------------------------------

Alternativ können Banner über Umgebungsvariablen konfiguriert werden. Dazu müssen Sie die Umgebungsvariable `WEBUI_BANNERS` mit einer Liste von Wörterbüchern im folgenden Format setzen:

```json
[{"id": "string","type": "string [info, success, warning, error]","title": "string","content": "string","dismissible": False,"timestamp": 1000}]
```

Weitere Informationen zur Konfiguration von Umgebungsvariablen in Open WebUI finden Sie unter [Konfiguration von Umgebungsvariablen](https://docs.openwebui.com/getting-started/env-configuration#webui_banners).

Beschreibung der Umgebungsvariablen
-----------------------------------

* `WEBUI_BANNERS`:
  * Typ: Liste von Dictionaries
  * Standardwert: `[]`
  * Beschreibung: Liste von Bannern, die den Benutzern angezeigt werden sollen.

Banner-Optionen
----------------

* `id`: Einzigartige Kennung des Banners.
* `type`: Hintergrundfarbe des Banners (Info, Erfolg, Warnung, Fehler).
* `title`: Titel des Banners.
* `content`: Inhalt des Banners.
* `dismissible`: Gibt an, ob das Banner abweisbar ist oder nicht.
* `timestamp`: Zeitstempel für das Banner (optional).

FAQ
----

* F: Kann ich Banner über das Admin-Panel konfigurieren?
A: Ja, Sie können Banner über das Admin-Panel konfigurieren, indem Sie zu `Admin Panel` -> `Einstellungen` -> `Schnittstelle` navigieren und auf das `+`-Symbol klicken, um ein neues Banner hinzuzufügen.
* F: Kann ich Banner über Umgebungsvariablen konfigurieren?
A: Ja, Sie können Banner über Umgebungsvariablen konfigurieren, indem Sie die Umgebungsvariable `WEBUI_BANNERS` mit einer Liste von Wörterbüchern setzen.
* F: Wie lautet das Format für die Umgebungsvariable `WEBUI_BANNERS`?
A: Das Format für die Umgebungsvariable `WEBUI_BANNERS` ist eine Liste von Wörterbüchern mit den folgenden Schlüsseln: `id`, `type`, `title`, `content`, `dismissible` und `timestamp`.
* F: Kann ich Banner abweisbar machen?
A: Ja, Sie können Banner abweisbar machen, indem Sie den Schlüssel `dismissible` in der Bannerkonfiguration auf `True` setzen oder die Abweisbarkeit eines Banners innerhalb der Benutzeroberfläche umschalten.
