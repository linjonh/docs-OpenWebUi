---
sidebar_position: 3
title: "🔑 Rollen"
---

Open WebUI implementiert ein strukturiertes rollenbasiertes Zugriffskontrollsystem mit drei primären Benutzerrollen:

| **Rolle**      | **Beschreibung**                                   | **Standarderstellung**           |
|---------------|---------------------------------------------------|----------------------------------|
| Administrator | Systemadministrator mit vollständiger Kontrolle   | Erstes Benutzerkonto             |
| Regulärer Benutzer | Standardbenutzer mit eingeschränkten Berechtigungen | Nachfolgende genehmigte Benutzer |
| Ausstehend     | Nicht genehmigter Benutzer, der auf Aktivierung durch den Administrator wartet | Neue Registrierungen (konfigurierbar) |

### Rollenzuweisung

* **Erster Benutzer:** Das erste Konto, das in einer neuen Open WebUI-Instanz erstellt wird, erhält automatisch Administratorrechte.
  Berechtigungen.
* **Nachfolgende Benutzer:** Neue Benutzerregistrierungen erhalten eine Standardrolle basierend auf der `DEFAULT_USER_ROLE`-
  Konfiguration.

Die Standardrolle für neue Registrierungen kann mit der Umgebungsvariable `DEFAULT_USER_ROLE` konfiguriert werden:

```.dotenv
DEFAULT_USER_ROLE=pending  # Optionen: pending, user, admin
```

Wenn auf „pending“ gesetzt, müssen neue Benutzer manuell von einem Administrator genehmigt werden, bevor sie Zugang zum System erhalten.

## Benutzergruppen

Gruppen erlauben Administratoren:
* Berechtigungen an mehrere Benutzer gleichzeitig zu vergeben, was die Zugriffsverwaltung vereinfacht
* Zugriff auf spezifische Ressourcen (Modelle, Tools usw.) zu beschränken, indem ihr Zugriff auf „privat“ gesetzt wird und dann
Zugang für bestimmte Gruppen geöffnet wird
* Der Gruppenzugriff auf eine Ressource kann als „lesen“ oder „schreiben“ definiert werden

### Gruppenstruktur

Jede Gruppe in Open WebUI enthält:

* Eine eindeutige Kennung
* Name und Beschreibung
* Referenz auf den Eigentümer/Ersteller
* Liste der Mitglieds-Benutzer-IDs
* Berechtigungskonfiguration
* Weitere Metadaten

### Gruppenverwaltung

Gruppen können:

* **Manuell erstellt** werden von Administratoren über die Benutzeroberfläche
* **Automatisch synchronisiert** werden von OAuth-Anbietern, wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` aktiviert ist
* **Automatisch erstellt** werden aus OAuth-Ansprüchen, wenn sowohl `ENABLE_OAUTH_GROUP_MANAGEMENT` als auch `ENABLE_OAUTH_GROUP_CREATION`
  aktiviert sind

### OAuth-Gruppenintegration

Wenn das OAuth-Gruppenmanagement aktiviert ist, wird die Mitgliedschaft von Benutzern in Gruppen mit den über OAuth-Ansprüche empfangenen Gruppen synchronisiert:

* Benutzer werden zu Open WebUI-Gruppen hinzugefügt, die ihren OAuth-Ansprüchen entsprechen
* Benutzer werden aus Gruppen entfernt, die in ihren OAuth-Ansprüchen nicht vorhanden sind
* Mit `ENABLE_OAUTH_GROUP_CREATION` aktivierte Gruppen aus OAuth-Ansprüchen, die in Open WebUI nicht existieren, werden automatisch
  erstellt
