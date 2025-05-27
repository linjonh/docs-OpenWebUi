---
sidebar_position: 25
title: "🔠 LibreTranslate-Integration"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient nur als Demonstration, wie Open WebUI für spezifische Anwendungsfälle angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial für Beiträge an.
:::

Übersicht
---------

LibreTranslate ist eine kostenlose und Open-Source-Maschinentranslations-API, die eine breite Palette von Sprachen unterstützt. LibreTranslate ist selbst gehostet, offline-fähig und einfach einzurichten und im Gegensatz zu anderen APIs ist es nicht auf proprietäre Anbieter wie Google oder Azure angewiesen, um Übersetzungen durchzuführen. Stattdessen wird die Übersetzungs-Engine durch die Open-Source-Bibliothek [Argos Translate](https://github.com/argosopentech/argos-translate) betrieben. Sie können LibreTranslate mit Open WebUI integrieren, um dessen maschinelle Übersetzungsfähigkeiten zu nutzen. Diese Dokumentation bietet eine Schritt-für-Schritt-Anleitung zur Einrichtung von LibreTranslate in Docker und zur Konfiguration der Integration in Open WebUI.

Einrichten von LibreTranslate in Docker
---------------------------------------

Um LibreTranslate in Docker einzurichten, führen Sie die folgenden Schritte aus:

### Schritt 1: Erstellen Sie eine Docker Compose-Datei

Erstellen Sie eine neue Datei namens `docker-compose.yml` in einem Verzeichnis Ihrer Wahl. Fügen Sie die folgende Konfiguration in die Datei ein:

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### Schritt 2: Erstellen Sie eine `stack.env`-Datei

Erstellen Sie eine neue Datei namens `stack.env` im selben Verzeichnis wie Ihre `docker-compose.yml`-Datei. Fügen Sie die folgende Konfiguration in die Datei ein:

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### Schritt 3: Führen Sie die Docker Compose Datei aus

Führen Sie den folgenden Befehl aus, um den LibreTranslate-Dienst zu starten:

```bash
docker-compose up -d
```

Dies startet den LibreTranslate-Dienst im abgetrennten Modus.

Konfigurieren der Integration in Open WebUI
------------------------------------------

Sobald Sie LibreTranslate in Docker ausgeführt haben, können Sie die Integration in Open WebUI konfigurieren. Es gibt mehrere Community-Integrationen, darunter:

* [LibreTranslate Filterfunktion](https://openwebui.com/f/iamg30/libretranslate_filter)
* [LibreTranslate Aktionsfunktion](https://openwebui.com/f/jthesse/libretranslate_action)
* [Mehrsprachige LibreTranslate Aktionsfunktion](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [LibreTranslate Filter-Pipeline](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

Wählen Sie die Integration, die Ihren Anforderungen am besten entspricht, und folgen Sie den Anweisungen, um sie in Open WebUI zu konfigurieren.

Unterstützte Sprachen für die LibreTranslate-Pipeline & -Funktion:
Im Grunde alle Sprachen, die in LibreTranslate enthalten sind, aber hier ist die Liste:
```
Albanisch, Arabisch, Aserbaidschanisch, Bengalisch, Bulgarisch, Katalanisch, Valencianisch, Chinesisch, Tschechisch, Dänisch, Niederländisch, Englisch, Flämisch, Esperanto, Estnisch, Finnisch, Französisch, Deutsch, Griechisch, Hebräisch, Hindi, Ungarisch, Indonesisch, Irisch, Italienisch, Japanisch, Koreanisch, Lettisch, Litauisch, Malaiisch, Persisch, Polnisch, Portugiesisch, Rumänisch, Moldawisch, Moldauisch, Russisch, Slowakisch, Slowenisch, Spanisch, Kastilisch, Schwedisch, Tagalog, Thailändisch, Türkisch, Ukrainisch, Urdu
```

Fehlerbehebung
---------------

* Stellen Sie sicher, dass der LibreTranslate-Dienst läuft und zugänglich ist.
* Überprüfen Sie, ob die Docker-Konfiguration korrekt ist.
* Prüfen Sie die LibreTranslate-Protokolle auf Fehler.

Vorteile der Integration
-----------------------

Die Integration von LibreTranslate in Open WebUI bietet mehrere Vorteile, darunter:

* Maschinelle Übersetzung für eine breite Palette von Sprachen.
* Verbesserte Textanalyse und -verarbeitung.
* Erweiterte Funktionen für sprachbezogene Aufgaben.

Fazit
------

Die Integration von LibreTranslate in Open WebUI ist ein einfacher Prozess, der die Funktionalität Ihrer Open WebUI-Instanz verbessern kann. Indem Sie die in dieser Dokumentation beschriebenen Schritte befolgen, können Sie LibreTranslate in Docker einrichten und die Integration in Open WebUI konfigurieren.
