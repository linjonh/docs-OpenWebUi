---
sidebar_position: 3
title: "🔐 Gruppen"
---

Gruppen ermöglichen Administratoren,
* Berechtigungen mehreren Benutzern gleichzeitig zuzuweisen, was das Zugriffmanagement vereinfacht
* den Zugriff auf bestimmte Ressourcen (Modelle, Werkzeuge usw.) zu beschränken, indem deren Zugang auf „privat“ gesetzt und der Zugriff für bestimmte Gruppen geöffnet wird
* Den Zugriff einer Gruppe auf eine Ressource entweder „lesen“ oder „schreiben“ (Schreibzugriff impliziert Lesen) zu spezifizieren

:::info
Beachten Sie, dass das Berechtigungsmodell permissiv ist. Wenn ein Benutzer Mitglied von zwei Gruppen ist, die unterschiedliche Berechtigungen für eine Ressource definieren, wird die am meisten permissive Berechtigung angewendet.
:::

### Gruppenstruktur

Jede Gruppe in Open WebUI enthält:

* Eine eindeutige Kennung
* Name und Beschreibung
* Besitzer-/Erstellerreferenz
* Liste der Mitglieder-Benutzer-IDs
* Berechtigungskonfiguration
* Zusätzliche Metadaten

### Gruppenverwaltung

Gruppen können:

* **Manuell erstellt** werden von Administratoren über die Benutzeroberfläche
* **Automatisch synchronisiert** werden von OAuth-Anbietern, wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` aktiviert ist
* **Automatisch erstellt** werden aus OAuth-Ansprüchen, wenn sowohl `ENABLE_OAUTH_GROUP_MANAGEMENT` als auch `ENABLE_OAUTH_GROUP_CREATION`
  aktiviert sind

### OAuth-Gruppenintegration

Wenn OAuth-Gruppenverwaltung aktiviert ist, wird die Mitgliedschaft von Benutzergruppen mit den in OAuth-Ansprüchen empfangenen Gruppen synchronisiert:

* Benutzer werden Gruppen in Open WebUI hinzugefügt, die ihren OAuth-Ansprüchen entsprechen
* Benutzer werden aus Gruppen entfernt, die nicht in ihren OAuth-Ansprüchen enthalten sind
* Mit aktiviertem `ENABLE_OAUTH_GROUP_CREATION` werden Gruppen aus OAuth-Ansprüchen, die in Open WebUI nicht existieren, automatisch
  erstellt

## Gruppenberechtigungen

Gruppen können verwendet werden, um Benutzern Berechtigungen bereitzustellen. Beispielsweise könnte eine Gruppe für „Datenwissenschaftler“ erstellt werden, die Lese- und Schreibzugriff auf alle Modelle, Wissensbasen und Werkzeuge hat.


## Ressourcen-Zugriffskontrolle für Gruppen

Open WebUI implementiert granulare Zugriffskontrollen für Ressourcen wie Modelle, Wissensbasen, Aufforderungen und Werkzeuge. Der Zugriff kann sowohl auf Benutzer- als auch Gruppenebene kontrolliert werden.

Um die Zugriffskontrolle für eine Ressource zu aktivieren, setzen Sie deren Zugang auf „privat“ und öffnen dann den Zugriff für bestimmte Gruppen.

### Zugriffskontrollstruktur

Ressourcen wie Wissensbasen verwenden eine Zugriffskontrollstruktur, die Les- und Schreibberechtigungen sowohl für Benutzer als auch für Gruppen definiert:

```json
{
  "read": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  },
  "write": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  }
}
```

Diese Struktur ermöglicht eine präzise Kontrolle darüber, wer spezifische Ressourcen anzeigen und ändern darf.
