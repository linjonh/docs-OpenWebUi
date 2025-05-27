---
sidebar_position: 4
title: "🗨️ Chat Teilen"
---

### Community Sharing aktivieren

Um das Community Sharing zu aktivieren, führen Sie die folgenden Schritte aus:

1. Navigieren Sie als **Admin** zur **Admin Panel**-Seite.
2. Klicken Sie auf den **Einstellungen**-Tab.
3. Schalten Sie **Community Sharing aktivieren** im Tab **Allgemein** ein.

:::note
**Hinweis:** Nur Admins können die Option **Community Sharing aktivieren** umschalten. Wenn diese Option deaktiviert ist, sehen Benutzer und Admins nicht die Option **Im Open WebUI Community teilen**, um ihre Chats zu teilen. Community Sharing muss von einem Admin aktiviert werden, damit Benutzer Chats in der Open WebUI-Community teilen können.
:::

Dies aktiviert das Community Sharing für alle Benutzer Ihrer Open WebUI-Instanz.

### Chats teilen

Um einen Chat zu teilen:

1. Wählen Sie die Chat-Konversation aus, die Sie teilen möchten.
2. Klicken Sie auf die 3-Punkte, die erscheinen, wenn Sie den Mauszeiger über den gewünschten Chat bewegen.
3. Klicken Sie dann auf die Option **Teilen**.
4. Wählen Sie entweder **Im Open WebUI Community teilen** (wenn **Community Sharing aktivieren** von einem **Admin** eingeschaltet wurde) oder **Link kopieren**.

#### Teilen in der Open WebUI Community

Wenn Sie `Im Open WebUI Community teilen` auswählen:

* Öffnet sich ein neuer Tab, in dem Sie Ihren Chat als Snapshot auf der Open WebUI-Community-Website hochladen können (https://openwebui.com/chats/upload).
* Sie können festlegen, wer Ihren hochgeladenen Chat sehen kann, indem Sie eine der folgenden Zugriffseinstellungen wählen:
  * **Privat**: Nur Sie können auf diesen Chat zugreifen.
  * **Öffentlich**: Jeder im Internet kann die Nachrichten im Chat-Snapshot sehen.
  * **Öffentlich, gesamte Historie**: Jeder im Internet kann die gesamte Regenerationshistorie Ihres Chats sehen.

:::note
Hinweis: Sie können den Berechtigungsgrad Ihrer geteilten Chats jederzeit auf der Community-Plattform von Ihrem openwebui.com-Konto aus ändern.

**Derzeit können geteilte Chats auf der Community-Website nicht über die Suche gefunden werden. In zukünftigen Updates wird jedoch geplant, öffentliche Chats für die Öffentlichkeit auffindbar zu machen, wenn ihre Berechtigung auf `Öffentlich` oder `Öffentlich, gesamte Historie` gesetzt ist.**
:::

Beispiel für einen geteilten Chat auf der Community-Plattform-Website: https://openwebui.com/c/iamg30/5e3c569f-905e-4d68-a96d-8a99cc65c90f

#### Einen Share-Link kopieren

Wenn Sie `Link kopieren` auswählen, wird ein einzigartiger Share-Link generiert, den Sie mit anderen teilen können.

**Wichtige Überlegungen:**

* Der geteilte Chat enthält nur Nachrichten, die zum Zeitpunkt der Erstellung des Links vorhanden waren. Neue Nachrichten, die nach der Erstellung des Links im Chat gesendet werden, werden nicht eingeschlossen, es sei denn, der Link wird gelöscht und durch einen neuen Link ersetzt.
* Der generierte Share-Link fungiert als statischer Snapshot des Chats zum Zeitpunkt der Link-Erstellung.
* Um den geteilten Chat anzuzeigen, müssen Benutzer:
  1. Ein Konto bei der Open WebUI-Instanz haben, bei der der Link generiert wurde.
  2. Bei ihrem Konto auf dieser Instanz angemeldet sein.
* Wenn ein Benutzer versucht, auf den geteilten Link ohne Anmeldung zuzugreifen, wird er zur Login-Seite umgeleitet, um sich anzumelden, bevor er den geteilten Chat ansehen kann.

### Geteilte Chats ansehen

Um einen geteilten Chat anzusehen:

1. Stellen Sie sicher, dass Sie bei einem Konto bei der Open WebUI-Instanz angemeldet sind, bei der der Chat geteilt wurde.
2. Klicken Sie auf den Ihnen bereitgestellten geteilten Link.
3. Der Chat wird in einem schreibgeschützten Format angezeigt.
4. Wenn der Admin der Open WebUI-Instanz, von der der geteilte Link geteilt wurde, Text-to-Speech eingerichtet hat, kann es einen Audio-Button geben, um Nachrichten laut vorlesen zu lassen (situationsbedingt).

### Geteilte Chats aktualisieren

Um einen geteilten Chat zu aktualisieren:

1. Wählen Sie die Chat-Konversation aus, die Sie teilen möchten.
2. Klicken Sie auf die 3-Punkte, die erscheinen, wenn Sie den Mauszeiger über den gewünschten Chat bewegen.
3. Klicken Sie auf die Option **Teilen**.
4. Die **Teilen Chat**-Modal sollte anders aussehen, wenn Sie zuvor einen Chat geteilt haben.

Die **Teilen Chat**-Modal enthält folgende Optionen:

* **vorher**: Öffnet einen neuen Tab, um den zuvor geteilten Chat vom Share-Link aus anzusehen.
* **diesen Link löschen**: Löscht den Share-Link des Chats und zeigt die ursprüngliche Teilen-Chat-Modal an.
* **Im Open WebUI Community teilen**: Öffnet einen neuen Tab für https://openwebui.com/chats/upload, mit dem Chat, der als Snapshot geteilt werden kann.
* **Aktualisieren und Link kopieren**: Aktualisiert den Snapshot des Chats des zuvor geteilten Links und kopiert ihn in die Zwischenablage Ihres Geräts.

### Geteilte Chats löschen

Um einen geteilten Chat-Link zu löschen:

1. Wählen Sie die Chat-Konversation aus, für die Sie den geteilten Link löschen möchten.
2. Klicken Sie auf die 3-Punkte, die erscheinen, wenn Sie den Mauszeiger über den gewünschten Chat bewegen.
3. Klicken Sie auf die Option **Teilen**.
4. Die **Teilen Chat**-Modal sollte anders aussehen, wenn Sie zuvor einen Chat geteilt haben.
5. Klicken Sie auf **diesen Link löschen**.

Sobald der Link gelöscht ist, ist er nicht mehr gültig, und Benutzer können den geteilten Chat nicht mehr ansehen.

:::note
**Hinweis:** Chats, die auf der Community-Plattform geteilt wurden, können nicht gelöscht werden. Um den Zugriff eines auf der Community-Plattform geteilten Chats zu ändern:
:::

1. Melden Sie sich bei Ihrem Open WebUI-Konto auf openwebui.com an.
2. Klicken Sie oben rechts auf der Website auf Ihren Benutzernamen.
3. Klicken Sie auf **Chats**.
4. Klicken Sie auf den Chat, für den Sie die Berechtigungen ändern möchten.
5. Scrollen Sie zum unteren Ende des Chats und aktualisieren Sie dessen Berechtigungsstufe.
6. Klicken Sie auf die Schaltfläche **Chat aktualisieren**.
