---
sidebar_position: 17
title: "🪝 Webhook-Integrationen"
---

Übersicht
--------

Open WebUI stellt eine Webhook-Funktion bereit, die es Ihnen ermöglicht, automatisch Benachrichtigungen zu erhalten, wenn sich neue Benutzer in Ihrer Instanz registrieren. Dies geschieht durch Bereitstellung einer Webhook-URL für Open WebUI, welches dann Benachrichtigungen an diese URL sendet, sobald ein neues Benutzerkonto erstellt wird.

Konfiguration von Webhooks in Open WebUI
---------------------------------

Sie müssen eine Webhook-URL von einem externen Dienst, der Webhooks unterstützt, wie z. B. einem Discord-Kanal oder einem Slack-Arbeitsbereich erhalten. Diese URL wird verwendet, um Benachrichtigungen von Open WebUI zu empfangen.

Um Webhooks in Open WebUI zu konfigurieren, haben Sie zwei Optionen:

### Option 1: Konfiguration über die Admin-Oberfläche

1. Melden Sie sich als Administrator bei Ihrer Open WebUI-Instanz an.
2. Navigieren Sie zum `Admin-Panel`.
3. Klicken Sie auf die Registerkarte `Einstellungen` oben.
4. Navigieren Sie dort zum Abschnitt `Allgemein` der Einstellung im Admin-Panel.
5. Suchen Sie das Feld `Webhook-URL` und geben Sie die Webhook-URL ein.
6. Speichern Sie die Änderungen.

### Option 2: Konfiguration über Umgebungsvariablen

Alternativ können Sie die Webhook-URL durch Festlegen der Umgebungsvariablen `WEBHOOK_URL` konfigurieren. Weitere Informationen zu Umgebungsvariablen in Open WebUI finden Sie unter [Konfiguration der Umgebungsvariablen](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url).

### Schritt 3: Verifizieren des Webhooks

Um zu überprüfen, ob der Webhook korrekt funktioniert, erstellen Sie ein neues Benutzerkonto in Open WebUI. Wenn der Webhook korrekt konfiguriert ist, sollten Sie eine Benachrichtigung an der angegebenen Webhook-URL erhalten.

Format der Webhook-Nutzdaten
----------------------

Die von Open WebUI gesendeten Webhook-Nutzdaten bestehen aus einfachem Text und enthalten eine Benachrichtigung über das neue Benutzerkonto. Das Format der Nutzdaten lautet wie folgt:

```
Neuer Benutzer registriert: <Benutzername>
```

Wenn sich beispielsweise ein Benutzer namens "Tim" registriert, würde die gesendete Nutzdaten-Nachricht lauten:

```
Neuer Benutzer registriert: Tim
```

Fehlerbehebung
--------------

* Stellen Sie sicher, dass die Webhook-URL korrekt und richtig formatiert ist.
* Vergewissern Sie sich, dass der Webhook-Dienst aktiviert und korrekt konfiguriert ist.
* Überprüfen Sie die Open WebUI-Protokolle auf Fehler im Zusammenhang mit dem Webhook.
* Stellen Sie sicher, dass die Verbindung nicht durch eine Firewall oder einen Proxy unterbrochen bzw. blockiert wurde.
* Der Webhook-Server könnte vorübergehend nicht verfügbar sein oder mit hoher Latenz arbeiten.
* Wenn der Webhook-Schlüssel vom Dienst bereitgestellt wurde, überprüfen Sie, ob der API-Schlüssel ungültig, abgelaufen oder widerrufen wurde.

Hinweis: Die Webhook-Funktion in Open WebUI wird ständig weiterentwickelt, und wir planen, in Zukunft weitere Funktionen und Ereignistypen hinzuzufügen.
